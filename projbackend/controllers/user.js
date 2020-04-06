const User = require('../models/user');
const Order = require('../models/order');

exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypted_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllUser = (req, res) => {
    User.find().exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "user not found"
            })
        }
        return res.json(user);
    })
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (error, user) => {
            if (error) {
                return res.status(400).json({
                    error: "Updating was not successfull"
                })
            }
            user.salt = undefined;
            user.encrypted_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    )
};

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id}).populate("user", "_id name").exec((err, order) => {
        if (err) {
            return res.status(400).json({
                err: "No order i this account"
            })
        }
        return res.json(order);
    })
};

exports.pushOrderPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactionId: req.body.order.transactionId
        })
    });
    //store in this DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    "err": "Unable to save purchase list"
                })
            }
            next();
        }
    )
};

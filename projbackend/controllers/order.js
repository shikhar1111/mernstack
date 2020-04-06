const {Order, ProductCart} = require("../models/order");

exports.getOrderByID = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    err: "No order found"
                })
            }
            req.order = order;
            next();
        })
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body);
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                err: "Order not saved"
            })
        }
        res.json(order);
    })
};

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((error, order) => {
            if (error) {
                return res.status(400).json({
                    error: "Order not found"
                })
            }
            res.json(order);
        })
};

exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    err: "Cannot update user status"
                })
            }
        }
    )
};

exports.getStatusOrder = (req, res) => {
    res.json(Order.Schema.path("status").enumValues);
};

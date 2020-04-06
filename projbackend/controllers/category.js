const Category = require('../models/category');

exports.getCategoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                err: "NOt found in database"
            })
        }
        req.category = cate;
        next();
    })
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save category"
            })
        }
        res.json({category});
    })
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, category) => {
        if (err) {
            return res.status(400).json({
                err: "No such category"
            })
        }
        res.json(category);
    })
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                err: "Failed to updated such category"
            })
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    let category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to delete category"
            })
        }
        res.json({"message": "Category deleted"});
    })
};

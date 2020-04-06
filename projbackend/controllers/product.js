const Products = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductByID = (req, res, next, id) => {
    Products.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: "No product"
                })
            }
            req.product = product;
            next();
        })
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: "NOt able to create product"
            })
        }

        const {name, description, price, category, stock} = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                err: "Please enter all details of product"
            })
        }

        let product = new Products(fields);
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        console.log(product);

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: "Product not saved"
                })
            }
            res.json(product);
        })
    })
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: "NOt able to create product"
            })
        }

        let product = req.product;
        product = _.extend(product, fields);


        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        console.log(product);

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: "Product not updated"
                })
            }
            res.json(product);
        })
    })
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, product) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to delete product"
            })
        }
        res.json({"message": "Product deleted"});
    })
};

exports.getAllProducts = (req, res) => {
    let limit = (req.query.limit ? parseInt(req.query.limit) : 8);
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Products.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: "Product not found"
                })
            }
            res.json(product);
        })
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod - count, sold: +prod.count}}
            }
        }
    });
    Products.bulkWrite(myOperations, {}, (err, result) => {
        if (err) {
            return res.status(400).json({
                err: "bulk operation failed"
            })
        }
        next();
    })
};

exports.getAllUniqueCategories = (req, res) => {
    Products.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                err: "No category found"
            })
        }
        res.json(category);
    })
};

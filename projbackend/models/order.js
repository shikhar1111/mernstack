const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number
    },
    price: {
        type: Number
    }
});

const ProductCart = mongoose.model("ProductCartSchema", ProductCartSchema);

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "",
        enum: ["Cancelled","Shipped","Processing","Received","Delivered"]
    }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order, ProductCart};

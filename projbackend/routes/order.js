const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserByID, pushOrderPurchaseList} = require("../controllers/user");
const {getOrderByID, createOrder, getAllOrders, getStatusOrder,updateStatus} = require("../controllers/order");
const {updateStock} = require("../controllers/product");

router.param("userId", getUserByID);
router.param("orderId", getOrderByID);
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderPurchaseList, updateStock, createOrder);
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin, getStatusOrder);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports = router;

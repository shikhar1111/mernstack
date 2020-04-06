const express = require('express');
const router = express.Router();

const {getCategoryByID, createCategory, getCategory, getAllCategory, removeCategory, updateCategory} = require('../controllers/category');
const {isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth');
const {getUserByID} = require('../controllers/user');

router.param("userId", getUserByID);
router.param("categoryId", getCategoryByID);

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;

const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// all pathes here starts with /admin
router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products/new', adminController.createNewProduct);

module.exports = router;

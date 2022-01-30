const Product = require('../models/product.model');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getAllProducts,
}

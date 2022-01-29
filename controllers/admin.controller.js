const Product = require("../models/product.model");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', { products });
    } catch (error) {
        next();
        return;
    }
}

const getNewProduct = (req, res) => {
    res.render('admin/products/new-product');
}

const createNewProduct = async (req, res, next) => {
    const product = new Product({ 
        ...req.body,
        image: req.file.filename,
    });
    
    try {
        await product.save();        
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct,
}

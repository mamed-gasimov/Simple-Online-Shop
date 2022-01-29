const Product = require("../models/product.model");

const getProducts = (req, res) => {
    res.render('admin/products/all-products');
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

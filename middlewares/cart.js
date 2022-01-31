const Cart = require("../models/cart.model");

const initializeCart = (req, res, next) => {
    let cart;

    if (!req.session.cart) {
        cart = new Cart();
    } else {
        const { items, totalQuantity, totalPrice } = req.session.cart;
        cart = new Cart(items, totalQuantity, totalPrice);
    }

    res.locals.cart = cart;
    next();
}

module.exports = initializeCart;

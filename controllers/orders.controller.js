const Order = require("../models/order.model");
const User = require("../models/user.model");

const getOrders = (req, res) => {
    res.render('customer/orders/all-orders');
}

const addOrder = async (req, res, next) => {
    const { cart } = res.locals;
    try {
        const userDocument = await User.findById(res.locals.uid);
        const order = new Order(cart, userDocument);
        await order.save();
    } catch (error) {
        return next(error);
    }

    req.session.cart = null;

    res.redirect('/orders');
}

module.exports = {
    getOrders,
    addOrder,
}

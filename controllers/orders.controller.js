require('custom-env').env('staging')
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

const Order = require("../models/order.model");
const User = require("../models/user.model");

async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render('customer/orders/all-orders', {
          orders: orders,
        });
    } catch (error) {
        next(error);
    }
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

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.items.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: +item.product.price.toFixed(2) * 100,
                },
                quantity: item.quantity,
            }
        }),
        mode: 'payment',
        success_url: `http://localhost:3000/orders/success`,
        cancel_url: `http://localhost:3000/orders/failure`,
    });
    
    res.redirect(303, session.url);
}

const getSuccess = (req, res) => {
    res.render('customer/orders/success');
}

const getFailure = (req, res) => {
    res.render('customer/orders/failure');
}

module.exports = {
    getOrders,
    addOrder,
    getSuccess,
    getFailure,
}

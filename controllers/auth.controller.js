const User = require('../models/user.model');

const getSignup = (req, res) => {
    res.render('customer/auth/signup');
}

const signup = async (req, res) => {
    const { email, password, fullname, street, postal, city } = req.body;
    const user = new User(email, password, fullname, street, postal, city);
    await user.signup();
    res.redirect('/login');
}

const getLogin = (req, res) => {
    res.render('customer/auth/login');
}

module.exports = {
    getSignup,
    signup,
    getLogin,
}

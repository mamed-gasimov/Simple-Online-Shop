const User = require('../models/user.model');
const authUtil = require('../util/authentication');

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

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);

    const existingUser = await user.getUserWithSameEmail();
    if (!existingUser) {
        res.redirect('/login');
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    if (!passwordIsCorrect) {
        res.redirect('/login');
        return;
    }

    authUtil.createUserSession(req, existingUser, () => {
        res.redirect('/');
    });
}

const logout = (req, res) => {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
}

module.exports = {
    getSignup,
    signup,
    getLogin,
    login,
    logout,
}

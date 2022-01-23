const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

const getSignup = (req, res) => {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            fullname: '',
            street: '',
            postal: '',
            city: '',
        }
    }

    res.render('customer/auth/signup', { inputData: sessionData });
}

const signup = async (req, res, next) => {
    const { email, password, fullname, street, postal, city } = req.body;
    const enteredData = { email, password, fullname, street, postal, city }
    const confirmEmail = req.body['confirm-email'];

    if (!validation.userDetailsAreValid(email, password, fullname, street, postal, city) ||
        !validation.emailIsConfirmed(email, confirmEmail)
    ) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: 'Please check your input.',
            ...enteredData,
            confirmEmail,
        }, () => {
            res.redirect('/signup');
        });
        return;
    }

    const user = new User(email, password, fullname, street, postal, city);

    try {
        const existsAlready = await user.existsAlready();
        if (existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage: 'User exists already!',
                ...enteredData,
                confirmEmail,
            }, () => {
                res.redirect('/signup');
            })
            return;
        }
        await user.signup();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/login');
}

const getLogin = (req, res) => {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
        }
    }

    res.render('customer/auth/login', { inputData: sessionData });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    let existingUser;
    let passwordIsCorrect;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: 'Invalid credentials - please check your email and password!',
        email: user.email,
    }

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        });
        return;
    }

    try {
        passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    } catch (error) {
        next(error);
        return;
    }

    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        });
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

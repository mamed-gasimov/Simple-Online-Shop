const addCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // method csrfToken on request object is available beacause of csurf package
    next();
}

module.exports = addCsrfToken;

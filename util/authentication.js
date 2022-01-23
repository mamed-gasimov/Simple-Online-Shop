const createUserSession = (req, user, action) => {
    req.session.uid = user._id.toString();
    req.session.save(action); 
    // save method from express-session package, it will execute action when session saving on db will be done
}

const destroyUserAuthSession = (req) => {
    req.session.uid = null;
}

module.exports = {
    createUserSession,
    destroyUserAuthSession,
}

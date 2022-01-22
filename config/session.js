const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDbStore = mongoDbStore(expressSession);
    const store = new MongoDbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'simple-online-shop',
    });
    return store;
}

const createSessionConfig = () => {
    return {
        secret: 'secret-string-here',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000 // for 2 days session will stay alive, 
            // if not given value, session will die when browser will be closed
        }
    }
}

module.exports = createSessionConfig;

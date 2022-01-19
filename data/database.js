const mongodb = require('mongodb');

const { MongoClient } = mongodb;

let database;

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('simple-online-shop');
}

const getDb = () => {
    if (!database) {
        throw new Error('You must connect first!');
    }
    return database;
}

module.exports = {
    getDb,
    connectToDatabase,
}

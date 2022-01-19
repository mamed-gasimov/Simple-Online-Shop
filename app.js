const path = require('path');
const express = require('express');
const authRoutes = require('./routes/auth.routes');

const db = require('./data/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

db.connectToDatabase()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Failed to connect to the database!');
        console.log(error);
    });

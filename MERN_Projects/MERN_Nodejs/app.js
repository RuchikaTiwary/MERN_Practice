const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find route !!");
    throw (error);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

// mongodb://Ruchika:mern123@cluster0-shard-00-00.r4q4p.mongodb.net:27017,cluster0-shard-00-01.r4q4p.mongodb.net:27017,cluster0-shard-00-02.r4q4p.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-podww0-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect('mongodb://Ruchika:mern123@cluster0-shard-00-00.r4q4p.mongodb.net:27017,cluster0-shard-00-01.r4q4p.mongodb.net:27017,cluster0-shard-00-02.r4q4p.mongodb.net:27017/places?ssl=true&replicaSet=atlas-podww0-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
    app.listen(9000);
}).catch((err) => {
    console.log(err);
});
// app.listen(9000);






/*const fs = require('fs');

const userName = "Ruchika";

fs.writeFile('user-data.txt', 'Name:' + userName, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Wrote file !!");
})*/


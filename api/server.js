const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
//const registrationRoutes = require('./route');
const bcrypt = require('bcryptjs');
let Registration = require('./schema/User');
let RouteNames = require("./constants/constants");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use("./schema/User", registrationRoutes);

//NOTE  Registration route
app.post(RouteNames.register, function (req, res) {
    let register = new Registration(req.body);
    register.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store to database");
        });
});

// Login Router
app.post(RouteNames.login, function (req, res) {
    Registration.findOne({ user_name: req.body.user_name })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});

// Username validation Router
app.post(RouteNames.validate, function (req, res) {
  //res.send('Got a POST request')
  Registration.findOne({ user_name: req.body.user_name })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
});

// Get allData
app.post(RouteNames.data, function (req, res) {
    Registration.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

module.exports = app
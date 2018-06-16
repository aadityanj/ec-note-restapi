const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const passport = require('./passport')
const cors = require('cors')
const router = express.Router();
const auth = require('./../routes/auth');
const userRoute = require('./../routes/user.route');

module.exports = function (app) {
    app.use(helmet());

    app.use(cors())

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
        next();
    });

    app.use(passport.passport.initialize());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(router);
    
    app.use('/auth', auth(router, passport));

    app.use('/user', userRoute)

    return app;
}
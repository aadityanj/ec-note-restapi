const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const passport = require('./passport')
const cors = require('cors')
const router = express.Router();
const auth = require('./../routes/auth');
const userRoute = require('./../routes/user.route');
const noteRoute = require('./../routes/note.route');
const morgan = require('morgan');

module.exports = function (app) {
    app.use(helmet());

    app.use(morgan('combined'));

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

    app.use('/user',passport.passport.authenticate('jwt', {
        session: false
    }), userRoute)

    app.use('/note',passport.passport.authenticate('jwt', {
        session: false
    }), noteRoute)

    return app;
}
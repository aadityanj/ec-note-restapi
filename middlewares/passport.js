const passport = require("passport");
const passportJWT = require("passport-jwt");
const Sequelize = require('sequelize');
const User = require('./../models').User;
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const Op = Sequelize.Op;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'godspeed123';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.findOne({
        where:{
            id: jwt_payload.id
        },
        attributes: {
            exclude:  ['password']
        },
    }).then( user => { 
        if(user){   
            next(null, user); 
        }else{
            // console.log("failed");
            return next(null, false)
        }
    }).catch(error => {
        
        next(error)
    });
});

passport.use(strategy);

module.exports.passport = passport;
module.exports.jwtOptions = jwtOptions;
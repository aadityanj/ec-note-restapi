const jwt = require('jsonwebtoken');
const User = require('./../models').User;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require('./../controllers/user.controller')

module.exports = function exports(router, passport){
    
    router.post('/login', function (req, res){
        User.findOne({
            where:{
                [Op.or]:[{userName: req.body.userName}, {emailId: req.body.emailId}] 
            }
        }).then( user => { 
            if(user){  
                bcrypt.compare(req.body.password, user.password).then(function (s) {
                    if(s){
                        var payload = {
                            id: user.id,
                            emp_id: user.emp_id
                        };
                        var token = jwt.sign(payload, passport.jwtOptions.secretOrKey, { expiresIn: '1 days' });
                        res.json({
                            token: token
                        });
                    }else{
                        res.status(401).send();
                    }
                });
            }else{
                res.status(401).send();
                console.log("failed counting users");
            }
        }).catch(error => {
            //res.status(401);
            console.log(error);
            res.status(401).send();
        });
    })

    router.post('/create',  userController.createUser );

    return router;
    
};


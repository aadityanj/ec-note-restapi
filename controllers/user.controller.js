const User = require('./../models').User;
const bcrypt = require('bcrypt');

module.exports = {
    
    createUser(req, res) {
        bcrypt.hash(req.body.password, 10).then(function (hash) {
            req.body.password = hash;
            User.create(req.body).then((results)=>{
                res.send(results);
            }).catch( (error) => {
               // console.log(error);
                res.status(400).send(error.errors)
            })
        });
    },

    getUser(req, res) {
        let id = req.params.id;
        User.findOne({
            where:{
                emp_id: id
            },
            attributes: {
                exclude:  ['password']
              }
        }).then( (results) => {
            res.send(results);
        }).catch(error => {
            //console.log(error);
            res.status(400).send("Bad Request");    
        })
    },
    

    updateUser(req, res) {
        let id = req.params.id;
        if(req.body.password){
            bcrypt.hash(req.body.password, 10).then(function (hash) {
                req.body.password = hash;
                User.update(req.body,{
                    where:{
                        emp_id: id
                    },
                    attributes: {
                        exclude:  ['password']
                    }
                }).then( (results) => {
                    res.send(results);
                }).catch(error => {
                    console.log(error);
                    res.status(400).send(error.errors)
                })
            });
        }else{
            User.update(req.body,{
                where:{
                    emp_id: id
                },
                attributes: {
                    exclude:  ['password']
                }
            }).then( (results) => {
                res.send(results);
            }).catch(error => {
                console.log(error);
                res.status(400).send(error.errors)  
            })
        }
    }
    
}
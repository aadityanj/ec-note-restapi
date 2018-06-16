const userController = require('./../controllers/user.controller')
var express = require('express')
var router = express.Router()

router.post('/',  userController.createUser );

router.get('/:id',  userController.getUser );

router.put('/:id',  userController.updateUser );

module.exports = router

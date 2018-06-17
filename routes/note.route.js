const noteController = require('./../controllers/note.controller')
var express = require('express')
var router = express.Router()

router.post('/',  noteController.createNote );

router.get('/all', noteController.getNotes);

module.exports = router

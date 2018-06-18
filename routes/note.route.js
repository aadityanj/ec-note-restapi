const noteController = require('./../controllers/note.controller')
var express = require('express')
var router = express.Router()

router.post('/',  noteController.createNote );

router.put('/:id',  noteController.updateNote );

router.get('/all', noteController.getNotes);

router.put('/trash', noteController.moveToTrash);

module.exports = router

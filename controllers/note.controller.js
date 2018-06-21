const Note = require('./../models').Note;
const Revision = require('./../models').Revision;
const moment  = require('moment');
const Op = require('sequelize').Op;

module.exports = {
    
    createNote(req, res) {
        if (req.body.title) {
            req.body.userId = req.user.id;
            req.body.status = '1';
            req.body.notes = '';
            Note.create(req.body).then((results)=>{
                res.send(results);
            }).catch( (error) => {
                console.log(error);
                res.status(400).send(error.errors)
            })
        } else {
            res.send(400).send("Bad Request");
        }
    },

    getNotes(req, res){
        Note.findAll({
            where:{
                userId: req.user.id,
                status: '1'
            },
            order: [
                ['updatedAt','DESC'] 
            ]
        }).then( (results) => {
            res.send(results);
        }).catch(error => {
            //console.log(error);
            res.status(400).send("Bad Request");    
        })
    },

    moveToTrash(req, res) {
        if(req.body.id){
            let request = {status: '0'};
            Note.update(request,{
                where:{
                    userId: req.user.id,
                    id: req.body.id
                }
            }).then( (results) => {
                res.send(results);
            }).catch(error => {
                //console.log(error);
                res.status(400).send(error.errors)  
            })  
        }
    },
    
    /*
        To do's 
            storage optimization
            Improve validation and error handlers
            Increase revision timing
    */
    updateNote(req, res) {
        const id = req.params.id;
        console.log(id);
        if(id) {
            Note.update(req.body, {
                where:{
                    userId: req.user.id,
                    id: parseInt(id)
                }
            }).then( () => {
                Revision.findAndCountAll({
                    where: {
                        'updatedAt': {
                            [Op.between]: [moment.utc().format('YYYY-MM-DD'), moment.utc().add(1, 'day').format('YYYY-MM-DD')]
                        },
                        noteId: id
                    },
                    order: [ ['updatedAt', 'DESC'] ],
                    limit: 1
                }).then( (result) => {
                    let rev = {};
                    rev.noteId = id;
                    rev.revisedNote = req.body.notes;
                    let a = moment.utc();
                    console.log(result.count, result.rows.length);
                    if (result.count > 0 && result.rows.length > 0 && a.diff(moment.utc(result.rows[0].updatedAt), 'minutes') < 1 ) {
                        Revision.update({revisedNote: req.body.notes}, {
                            where :{
                                noteId: id,
                                id: result.rows[0].id
                             }
                        }).then( (updateRes) => {
                            res.send("Updated");
                        });
                    } else {    
                        Revision.create(rev).then( (createRes) => {
                            console.log(createRes);
                            res.send("Updated");
                        });
                    }
                });
            }).catch( (err) => {
                res.status(400).send(err);
                console.log(err);
            });
        }
    },

    getHistory(req, res){
        const id = req.params.id;
        Revision.findAll({
            where:{
                noteId: id
            },
            order: [
                ['updatedAt','DESC'] 
            ]
        }).then( (results) => {
            res.send(results);
        }).catch(error => {
            console.log(error);
            res.status(400).send("Bad Request");    
        })
    }

     /* 
        To Do's
            Improve validation and error handlers
            Add proper response status code
    */
}

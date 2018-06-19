const Note = require('./../models').Note;
const Revision = require('./../models').Revision;
const RevisionHistory = require('./../models').Revision_History;
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
                module.exports.createRevision(req.body.notes, id).then( (revisionId) =>{
                    module.exports.createRevisionHistory(revisionId, req.body.changes).then( () =>{
                        res.send("updated");
                    });
                });
            });    
        }
    },

    /* 
        Create one revision every day 
        if already revision found on that day, It simply updates that.
    */
    createRevision(notes, id){
        return new Promise((resolve, reject) => {
            Revision.count({
            where: {
                'createdAt': {
                    [Op.between]: [moment().format('YYYY-MM-DD'), moment().add(1, 'day').format('YYYY-MM-DD')]
                },
                'noteId': id
            }
        }).then((rc) => {

            let revision = {};
            revision.revisedNote = notes;
            revision.noteId = id;
            if (rc == 0) {
                Revision.create(revision).then (res => {
                    console.log("returning ",res.dataValues.id );
                    resolve(res.dataValues.id);
                });
            } else {
                Revision.update({revisedNote: notes},{
                    where: {
                        'createdAt': {
                            [Op.between]: [moment().format('YYYY-MM-DD'), moment().add(1, 'day').format('YYYY-MM-DD')]
                        },
                        'noteId': id
                    }
                }).then( (res) =>{
                    Revision.findOne({
                        where: {
                            'createdAt': {
                                [Op.gt]: moment().format('YYYY-MM-DD'),
                                [Op.lt]: moment().add(1, 'day').format('YYYY-MM-DD')
                            },
                            'noteId': id
                        }
                     }).then(res => {
                        console.log("returning ",res.dataValues.id );
                         resolve(res.dataValues.id);
                     })
                });
            }   
        })
       });  
    },

    /* 
        Create a revision history for every revisions
        Create an history when the last updated history is greater than 1 minute
    */
    createRevisionHistory(id, changes) {
        return new Promise((resolve, reject) => {
            Revision.count({
                where: {
                    'updatedAt': {
                        [Op.between]: [moment().subtract(1, 'minute').utcOffset("+05:30").format(), moment().utcOffset("+05:30").format() ]
                    },
                    'id': id
                }
            }).then( count => { 
                console.log("Revision history Count", count);
                let history = {};
                history.history = changes;
                history.revisionId  = id
                if (count == 0) {
                    RevisionHistory.create(history).then (res => {
                        resolve();
                    });
                } else  if(count > 0){
                    RevisionHistory.update({revisedNote: notes},{
                        where: {
                            'createdAt': {
                                [Op.between]: [moment().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
                            },
                            'revisionId': id
                        }
                    }).then( (res) =>{
                        resolve();
                    });
                }   
            }).catch( (err) => {
                console.log(err);
                reject();
            })
        });  
    }   
}

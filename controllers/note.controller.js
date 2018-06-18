const Note = require('./../models').Note;

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
                console.log(error);
                res.status(400).send(error.errors)  
            })  
        }
    },

    updateNote(req, res) {
        let id = req.params.id;
        if(id){
            Note.update(req.body, {
                where:{
                    userId: req.user.id,
                    id: id
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
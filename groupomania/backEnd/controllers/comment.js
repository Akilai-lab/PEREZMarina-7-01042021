const Comment = require ('../models/commentaires');
//const Posts = require ('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Comments = require('../models/commentaires');

//route post
exports.answerPost = async (req , res, next) =>{
    //route pour récupérer le commentaire
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //req.body est vide
    const commentObject = req.body;
    console.log(commentObject.message);
    console.log(commentObject.postId)
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        //on récupére bien le corps de la requête mais elle n'est pas récupérée par la bdd
        Comment.create({ 
            'message': commentObject.message, 
            'date': date,
            'time': hours,
            'userId' : userId,
            'postId': commentObject.postId
        })
        .then(() => {
            console.log('je suis là');
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        })
};

//route get
exports.callbackAnswer = async (req , res, next) =>{
    Comment.findAll()
    .then(commentaire => {
        commentaire.forEach((Comment) => {
            console.log(commentaire.postId);
            console.log(commentaire.message);
            console.log(commentaire.media);
            console.log(commentaire.date);
        });
        res.send(commentaire);
        res.sendStatus(200);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    })
};
//modifyComment
exports.modifyComment = async (req , res, next) =>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const handleSuccessfulDeletion = () => {
        res.sendStatus(200);
    }
    const handleError = (error) => {
        error => res.status(500).json({ error })
    }
    console.log(req.body);
    Comments.findOne({ where: { id: req.body.id, userId: userId } })
    .then(comment => {
        // Check if record exists in db
        comment.update({
            message: req.body.message
        })
        console.log('re hey');
        console.log(comment);
        res.send(comment);
    })
    //.then(handleSuccessfulDeletion)
    .catch(handleError)
    User.findOne({
        where:{
            status : 1,
            id : userId
        }
    })
    .then(user => {
        if(user.status === 1) {
            Comments.findOne({ where: { id: req.body.id} })
            .then(comment => {
                // Check if record exists in db
                comment.update({
                    message: req.body.message
                })
                console.log('re hey');
                console.log(comment);
                res.send(comment);
            })
            //.then(handleSuccessfulDeletion)
            .catch(handleError)
        }
    })
};
exports.deleteComment = async (req , res, next) =>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(req.body);
    //la requête est 'pending'
    //les données envoyées sont
        //la date, 
            //l'id du commentaire
                //le message
                    //le postId
                        //le userId
    //il faut donc faire une recherche où le id  === id
        //et utiliser la fonction destroy
    User.findOne({ where: {id: userId} })
    .then(user=> {
        console.log(user.status)
        if(user.status === 1 ) {
            Comment.destroy({
                where: {
                    id : req.body.idcom.id
                }
            })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        } if(user.status === 0) {
            Comment.destroy({
                where: {
                    id : req.body.idcom.id,
                    userId: userId
                }
            })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));        
        }
    })
    .catch(error => res.status(500).json({ error }));
};
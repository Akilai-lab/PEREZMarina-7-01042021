const auth = require('../middleware/auth');
const Posts = require ('../models/posts');
const User = require('../models/users');
const Comment = require ('../models/commentaires');
const jwt = require('jsonwebtoken');
const fs = require('fs');
exports.posts = async (req , res, next) =>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const postsObject = req.body;
    console.log(postsObject);
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    console.log(date);
    var d = new Date();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(hours);
    
    Posts.create({ //Cannot read property 'filename' of undefined
        'message': postsObject.message, 
        'date': date,
        'time':hours,
        'media': `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //(node:13208) UnhandledPromiseRejectionWarning: ReferenceError: userId is not defined
        'userId' : userId
    })
    .then(() => {
        console.log(userId);
        //console.log(Posts);
        res.sendStatus(200);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
    
};

exports.editPost = async (req, res, next) => {
    // on souhaite récupérer le dernier index inséré dans la base de données et l'utiliser
    /*const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;*/
    //statut 404 unautorized
        console.log('je suis ici')
        const posts = Posts.findAll()
        .then(posts => {
            console.log('et je suis là')
            console.log(posts);
            posts.forEach((Posts) => {
                postId = Posts.id;
                //media = String(Posts.media);
                console.log(postId);
                console.log(Posts.message);
                console.log(Posts.media);
                console.log(Posts.date);
                console.log(Posts.postId)
            });
            res.send(posts);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        })
};
exports.modifyPost = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(req.body);

    const handleSuccessfulDeletion = () => {
        res.sendStatus(200);
    }
    const handleError = (error) => {
        error => res.status(500).json({ error })
    }
    //console.log(req.body.email);
    let picture = req.body.picture;
    console.log(picture);
    Posts.findOne({ where: { id: req.body.postId, userId: userId } })
    .then(post => {
        // Check if record exists in db
        post.update({
            message: req.body.message,
            media : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        console.log(post);
        res.send(post);
        //en soit ca marche sauf que le post qui change n'est pas celui qui a le bon id
    })
    //.then(handleSuccessfulDeletion)
    .catch(handleError)
};
exports.deletePost = async (req, res, next) => {
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

        //il faut à la suppression du post
        //supprimer aussi les commentaires qui ont le même postId
        //on supprime les commentaires qui ont le même postId
        console.log('test 2');
        console.log(req.body.idpost.id);
        console.log('test 2');
        User.findOne({ where: {id: userId} })
        .then(user=> {
            console.log(user.status)
            if(user.status === 1 ) {
                Comment.destroy({
                    where : {
                        id : req.body.idpost.id
                    }
                })
                //l'id est bien le bon, par contre le commentaire ne se supprime pas et donne null au postId
                Posts.destroy({
                    where: {
                        id : req.body.idpost.id
                    }
                })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
            if(user.status === 0) {
                Comment.destroy({
                    where : {
                        id : req.body.idpost.id
                    }
                })
                Posts.destroy({
                    where: {
                        id : req.body.idpost.id,
                        userId: userId
                    }
                })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    };
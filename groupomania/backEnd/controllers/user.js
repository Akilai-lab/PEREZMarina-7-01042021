const User = require ('../models/users');
const Posts = require ('../models/posts');
const Account = require('../models/account'); 
const Comment = require ('../models/commentaires');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

    //on va créer un objet qui va avoir les variables envoyées dans la requête body
exports.signup = async (req, res, next) => {
    //let stat;
    //créer une condition qui dit que si status est 
      //undefined === ce n'est pas un admin
      //true === c'est un admin
      /*if(req.body.checkedNames === undefined) {
        stat = 1;
      }
      console.log(stat)*/
    bcrypt.hash( req.body.password , 10)
    .then( hash => {
         User.create({ //Cannot read property 'INTEGER' of undefined
             'name': req.body.name, 
             'userName': req.body.userName,
             'lastName': req.body.lastName,
             'mail': req.body.email,
             'password':hash,
             'status': 0
         })
         .then(() => {
             console.log(User);
             res.send(200);
             /**Création d'un account à l'inscription d'un utilisateur */
         })
         .catch(error => {
             console.log(error);
             res.status(400).json({ error })
         });
     })
};
let idUser;
exports.login = async (req, res, next) => {
        User.findOne({ where: {mail: req.body.email} })
        //on fait une recherche pour comparer l'adresse mail tapée dans le formulaire et 
        //celles dans la base de données
        .then(User => {
          console.log(User.password);
            //on crée un paramètre user 
            //console.log(user); 
            idUser = User.id;
            console.log(idUser)
            if (!User) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
            .then(() => {
              //si c'est valide alors
              console.log(res);
              if (bcrypt.compare(req.body.password, User.password)===false) {
                //sinon on retourne une erreur d'authentification
                return res.status(401).json({ error: "erreur d'authentification" });
              }
              res.status(200).json({
                  /*"userId": User.id,*/
                  token: jwt.sign(
                    { userId: User.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
              });
              console.log('hy');
              console.log(idUser)
                //Erreur: le paramètre WHERE "mail" a une valeur "non définie" non valide
                //userId = user.id;
              })
            .catch(error =>{
              console.log(error)
              res.status(500).json({ error })
          })
          .catch(error => res.status(500).json({ error }));
        })
};
exports.getAllUsers = async (req, res, next) => {
  User.findAll()
  .then(user=>{
    //console.log(user)
    res.send(user);
  })
  .catch(error => res.status(500).json({ error }));
};
exports.getInfo = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  console.log(userId)
  User.findOne({ where: {id: userId} })
  .then(user=>{
    console.log(user)
    res.send(user);
  })
  .catch(error => res.status(500).json({ error }));

  /** Affiche dans postman
   * {
      "id": 4,
      "status": true,
      "lastName": "Marina",
      "name": "PEREZ",
      "userName": "Akilai",
      "mail": "aki******@********fr",
      "password": "$2b$10$BQj5hjLSF2KwNz4kJWjcxO33/76dNEnpA4wZ0mICAkqSP5ENy2y6q"
    }
   */
  //la fonction fonctionne avec postman mais pas avec le local
};
exports.deleteUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  // Fonction qui permet de supprimer:
  /*
    quand un user est connecté :
      ses posts, ses commentaires et son compte
  */
  const handleSuccessfulDeletion = () => {
    res.send(200);
  }
  const handleError = (error) => {
    error => res.status(500).json({ error })
  }
  User.findOne({ where: {id: userId} })
  .then(user=>{
    if(user.status === 0){
      Posts.destroy({
        //l'id est celui de l'userId
          where: {
            userId:userId
          }
        })
        .then(() => 
          Comment.destroy({
          //l'id est celui de l'userId
            where: {
              userId:userId
            }
          })
        )
        .then(() => 
          User.destroy({
            where: {
              //l'id est celui de l'userId
              id: userId
            }
          })
        )
        .then(handleSuccessfulDeletion)
        .catch(handleError)
    }
    if(user.status === 1){
      Posts.destroy()
        .then(() => 
          Comment.destroy()
        )
        .then(() => 
          User.destroy()
        )
        .then(handleSuccessfulDeletion)
        .catch(handleError)
    }
  })
  .catch(error => res.status(500).json({ error }));
  //créer une fonction de suppression d'un autre compte par un admin
  //à savoir qu'un admin est un user dont le status est = 0
  //donc on va chercher dans la base de données un user qui a comme status : 0
};
exports.deleteAnyUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  // Fonction qui permet de supprimer:
  /*
    quand un user est connecté :
      ses posts, ses commentaires et son compte
  */
  const handleSuccessfulDeletion = () => {
    res.send(200);
  }
  const handleError = (error) => {
    error => res.status(500).json({ error })
  }
  User.findOne({ where: {id: userId} })
  .then(user=>{
    console.log(userId);
    // donne 1
    if(user.status === 1){
      console.log(req.body.iduser);
      //donne 5
      Posts.destroy({
        where : {
          userId : req.body.iduser
        }
      })
      .then(() => 
        Comment.destroy({
          where : {
            userId : req.body.iduser
          }
        })
      )
      //pending
      .then(() => 
        User.destroy({
          where : {
            id : req.body.iduser
          }
        })
      )
      //pending
      .then(handleSuccessfulDeletion)
      .catch(handleError)
    }
  })
  .catch(error => res.status(500).json({ error }));
  //créer une fonction de suppression d'un autre compte par un admin
  //à savoir qu'un admin est un user dont le status est = 0
  //donc on va chercher dans la base de données un user qui a comme status : 0
} 
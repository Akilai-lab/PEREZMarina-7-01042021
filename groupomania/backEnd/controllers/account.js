const User = require ('../models/users');
const Account = require('../models/account'); 
const jwt = require('jsonwebtoken');

  //idShow route get
exports.idShow = async (req, res, next) => {
  //Recuper varaible URL Id User
  console.log('test');
  //console.log(req.params.id);
  User.findOne({ where: {id: req.params.id} })
  //User.findByPk(req.params.id)
  .then(user=>{
    //console.log(user)
    //res.send(user);
    console.log(user)
    res.status(200);
    res.send(user)
  })
  .catch(error => res.status(500).json({ error }));
};

//idShow route post
exports.postPicture = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;

  const postsObject = req.body;
  console.log(postsObject);
  Account.create({ 
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
exports.getPicture= async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  const account = Account.findOne({ where: { userId:userId} })
        .then(profil => {
            console.log('et je suis là')
            console.log(profil);
            /*profil.forEach((Account) => {
              console.log(Account.media);
            });*/
            res.send(profil);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        })
}

exports.postDescription = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  console.log(req.body)
  const handleSuccessfulDeletion = () => {
    res.sendStatus(200);
  }
  const handleError = (error) => {
    error => res.status(500).json({ error })
  }
  //console.log(req.body.email);
  let test = req.body.textDescription;
  console.log(test);
  Account.findOne({ where: { userId: userId } })
  .then(description => {
    // Check if record exists in db
    let scndTest = test
    description.update({
        textDescription: scndTest
    })
    console.log(description);
    res.send(description);
  })
  //.then(handleSuccessfulDeletion)
  .catch(handleError)
};
//modifyAccount

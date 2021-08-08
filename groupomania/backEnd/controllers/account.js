const User = require ('../models/users');
const Account = require('../models/account'); 
const jwt = require('jsonwebtoken');
const fs = require('fs');
exports.idShow = async (req, res, next) => {
  User.findOne({ where: {id: req.params.id} })
  .then(user=>{
    res.status(200);
    res.send(user);
    res.send('user');
  })
  .catch(error => res.status(500).json({ error }));
};

exports.postPicture = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  const postsObject = req.body;
  Account.findOne({
    where: {
      userId : userId
    }
  })
  .then(account => {
    if(!account) {
      Account.create({ 
        'media': `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        'userId' : userId
      })
      .then( accountUser => {
        User.findOne({where:{id: userId}})
        .then(user => {
          console.log(accountUser.id)
          user.update({
            'accountId': accountUser.id
          })
        })
        res.sendStatus(200);
      })
      .catch(error => {
          console.log(error);
          res.status(400).json({ error })
      });
    }
    const filename = account.media.split("/images/")[1];
    console.log(filename);
    fs.unlink(`images/${filename}`, function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });
    console.log(filename);
        account.update({
          'media': `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(() => {
          res.status(200).json();
        })
        .catch(error => {
          res.status(400).json({ error })
        })
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
            res.send(profil);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        })
};
exports.getAllPictures = async (req, res, next) => {
  Account.findAll()
  .then(account=>{
    console.log(account);
    res.send(account);
  })
  .catch(error => res.status(500).json({ error }));
};
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
  let test;
  console.log(test);
  Account.findOne({ where: { userId: userId } })
  .then(description => {
    if(!description) {
      Account.create({ 
        'textDescription': req.body.textDescription,
        'userId' : userId
      })
      .then(accountUser => {
        User.findOne({where:{id: userId}})
        .then(user => {
          console.log(accountUser.id)
          user.update({
            'accountId': accountUser.id
          })
        })
        console.log(Account)
          res.sendStatus(200);
      })
      .catch(error => {
          console.log(error);
          res.status(400).json({ error })
      });
    }
    test = description.textDescription;
    if(test != "") {
      description.update({
        'textDescription': req.body.textDescription
      });
      console.log(description)
    }
  })
  .catch(handleError)
};

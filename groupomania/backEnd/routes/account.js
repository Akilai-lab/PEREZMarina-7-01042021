const express = require('express');
const router = express.Router();

const account = require('../controllers/account');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/all', account.getAllPictures);
router.get('/:id', account.idShow);
router.get('/', auth, multer, account.getPicture);
router.post('/', auth, multer, account.postPicture);
router.put('/', auth, multer,account.postDescription);
// router.get('/id/{userId}', users.idShow);
/*router.post('/api/user', auth, userCtrl.signup);
//on va créer une route qui va envoyer des données à la bdd pour l'inscription
router.post('/login', auth, userCtrl.login);*/
//on va créer une route qui va envoyer des données à la bdd pour la connection
module.exports = router;
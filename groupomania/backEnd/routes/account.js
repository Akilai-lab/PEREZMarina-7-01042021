const express = require('express');
const router = express.Router();

const users = require('../controllers/account');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:id', users.idShow);
router.get('/', auth, multer, users.getPicture);
router.post('/', auth, multer, users.postPicture);
router.put('/picture', auth, multer, users.putPicture);
router.put('/', auth, multer,users.postDescription);
// router.get('/id/{userId}', users.idShow);
/*router.post('/api/user', auth, userCtrl.signup);
//on va créer une route qui va envoyer des données à la bdd pour l'inscription
router.post('/login', auth, userCtrl.login);*/
//on va créer une route qui va envoyer des données à la bdd pour la connection
module.exports = router;
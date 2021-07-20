const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', users.getInfo);
router.get('/all', users.getAllUsers);
router.post('/signup', users.signup);
router.post('/login' ,users.login);
router.delete('/deleteAccount', users.deleteUser);
router.delete('/deleteAnyAccount', auth, users.deleteAnyUser);
//deleteAnyUser
/*router.post('/api/user', auth, userCtrl.signup);
//on va créer une route qui va envoyer des données à la bdd pour l'inscription
router.post('/login', auth, userCtrl.login);*/
//on va créer une route qui va envoyer des données à la bdd pour la connection
module.exports = router;
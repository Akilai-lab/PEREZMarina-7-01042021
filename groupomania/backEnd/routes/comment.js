const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('./../controllers/comment.js');

router.get('/' , multer, commentCtrl.callbackAnswer);
//router.post('/' , auth, multer, postCtrl.posts);
router.post('/', auth, multer, commentCtrl.answerPost);
router.put('/', auth, multer, commentCtrl.modifyComment);
router.delete('/deleteComment', auth, commentCtrl.deleteComment);
//avec le middleware auth j'ai une erreur d'authentification alors qu'avec les 
//routes post aucun soucis
module.exports = router;
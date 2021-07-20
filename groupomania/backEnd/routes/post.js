const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('./../controllers/post.js');

router.get('/' , multer, postCtrl.editPost);
router.post('/' , auth, multer, postCtrl.posts);
router.put('/', auth, multer, postCtrl.modifyPost);
router.delete('/deletePost', auth, postCtrl.deletePost);
module.exports = router;
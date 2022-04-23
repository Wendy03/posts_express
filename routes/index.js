const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/', function (req, res, next) {
  PostsControllers.getPosts(req, res);
});

router.post('/', function (req, res, next) {
  PostsControllers.createPost(req, res);
});

router.delete('/', function (req, res, next) {
  PostsControllers.deletePosts(req, res);
});

router.delete('/:id', function (req, res, next) {
  PostsControllers.deleteOnePost(req, res);
});

router.patch('/:id', function (req, res, next) {
  PostsControllers.editPost(req, res);
});

module.exports = router;

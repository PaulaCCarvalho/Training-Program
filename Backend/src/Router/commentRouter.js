
const commentRouter = require('express').Router();
const {CommentController} = require('../Controller');
const commentController = new CommentController();

commentRouter
    .get('/comentario', commentController.find)
    .post('/comentario', commentController.add)
    .get('/comentario/:id', commentController.findOne)
    .put('/comentario/', commentController.alter)
    .delete('/comentario/:id', commentController.delete)

module.exports = commentRouter;

const likeRouter = require('express').Router(); 
const {LikeController} = require('../Controller');
const likeController = new LikeController();

likeRouter
.post('/like', likeController.add)
.get('/like/soucao/:solution', likeController.sum)

module.exports = likeRouter;
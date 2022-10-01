const imgRouter = require('express').Router();
const imgController = new ImgController();

module.exports = imgRouter
    .post('/img', imgController.upload);


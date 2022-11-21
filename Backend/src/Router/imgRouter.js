const imgRouter = require('express').Router();
const express = require('express');
const {ImgController} = require('../Controller')
const imgController = new ImgController();

imgRouter.get('/img/:filename', imgController.download);

module.exports = imgRouter

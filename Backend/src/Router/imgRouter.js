const imgRouter = require('express').Router();
const express = require('express');
const {ImgController} = require('../Controller')
const imgController = new ImgController();


module.exports = imgRouter
    .use('/img', express.static('../Database/uploads'));
    

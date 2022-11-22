const { TagController } = require('../Controller');

const tagRouter = require('express').Router();
const tagController = new TagController();

tagRouter
    .get('/tags', tagController.find)
    .get('/tags/:id', tagController.findOne)
    .post('/tags', tagController.add)
    .delete('/tags/:id', tagController.delete)

module.exports = tagRouter;

const solutionRouter = require('express').Router();
const {SolutionController} = require('../Controller');
const solutionController = new SolutionController();

solutionRouter
    .get('/solucao', solutionController.find)
    .post('/solucao', solutionController.add)
    .get('/solucao/:id', solutionController.findOne)
    .get('/:id/solucao', solutionController.findByMember)
    // .put('/solucao/', solutionController.alter)
    // .delete('/solucao/:id', solutionController.delete)

module.exports = solutionRouter;
const Router = require('express');
const {ChallengeController} = require('../Controller'); 
const challengeRouter = Router();
const challengeController = new ChallengeController();

challengeRouter
    .post('/desafio', challengeController.add)
    .get('/desafio/:id', challengeController.findOne)
    .get('/desafio', challengeController.find)
    .put('/desafio/:id', challengeController.alter)
    .delete('/desafio/:id', challengeController.delete)

module.exports = challengeRouter;
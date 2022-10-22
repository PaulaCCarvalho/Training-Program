const Router = require('express');
const {ChallengeController} = require('../Controller'); 
const { verifyToken } = require('../Middleware/Authentication');
const challengeRouter = Router();
const challengeController = new ChallengeController();

challengeRouter
    .post('/desafio', verifyToken, challengeController.add)
    .get('/desafio/:id', challengeController.findOne)
    .get('/desafio', challengeController.find)
    .put('/desafio/:id', verifyToken, challengeController.alter)
    .delete('/desafio/:id', verifyToken, challengeController.delete)

module.exports = challengeRouter;
const Router = require('express');
const {ChallengeController} = require('../Controller'); 
const challengeRouter = Router();
const challengeController = new ChallengeController();

challengeRouter.get('/desafio', challengeController.add)

module.exports = challengeRouter;
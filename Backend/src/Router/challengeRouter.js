const Router = require('express');
const {ChallengeController} = require('../Controller'); 
const multer = require('multer')
const { verifyToken } = require('../Middleware/Authentication');
const path = require('path')
const challengeRouter = Router();
const challengeController = new ChallengeController();

const storage = multer.diskStorage({
    destination: function (req, file,cb){
        cb (null, `./src/Database/uploads/`)
    }, 

    filename: function(req, file, cb){
        cb(null,  Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})


challengeRouter
    .post('/desafio', verifyToken, upload.single('capa'), challengeController.add)
    .get('/desafio/:id', challengeController.findOne)
    .get('/desafio', challengeController.find)
    .put('/desafio/:id', verifyToken, challengeController.alter)
    .delete('/desafio/:id', verifyToken, challengeController.delete)

module.exports = challengeRouter;
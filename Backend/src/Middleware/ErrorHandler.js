const {ApplicationError} = require('../Error');

module.exports = (req, res, next) => {
    const error = req.error;
    console.log(error)
    if(error instanceof ApplicationError){
        return res.status(error.code).send(error.message);
    }
    res.status(500).send('Erro no Servidor');
}
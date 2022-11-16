const {ApplicationError} = require('../Error');

module.exports = (req, res, next) => {
    const error = req.error;
    if(error === undefined)
    {
        return res.status(500).send('Erro Desconhecido');
    }
    console.log(error)
    if(error instanceof ApplicationError){
        return res.status(error.code).send(error.message);
    }
    res.status(500).send('Erro no Servidor');
}
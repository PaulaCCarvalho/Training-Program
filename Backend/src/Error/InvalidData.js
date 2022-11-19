const ApplicationError = require('./ApplicationError');

class InvalidData extends ApplicationError {

    constructor(){
        super('Dados inválidos', 406);
    }
}

module.exports = InvalidData;

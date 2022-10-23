const ApplicationError = require('./ApplicationError');

class LoginError extends ApplicationError {

    constructor(){
        super('Email ou senha Invalidos', 400);
    }
}

module.exports = LoginError;

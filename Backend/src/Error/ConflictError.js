const ApplicationError = require("./ApplicationError");

class ClonflictError extends ApplicationError {

    constructor(){
        super('Os dados enviados conflitão com os do servidor', 409);
    }
}

module.exports = ClonflictError;
const ApplicationError = require("./ApplicationError");

class NotFoundError extends ApplicationError{

    constructor(entity = ''){
        super(`${entity} not found`, 404);
    }
}

module.exports = NotFoundError;
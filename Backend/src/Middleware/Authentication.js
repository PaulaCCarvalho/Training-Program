const DAO = require('../Database');

module.exports = {
    verifyToken: async (req, res, next) => {
        if(req.headers.authorization === undefined) res.status(403).end();
        const tokenId = req.headers.authorization.split(' ')[1];
        const token = await DAO.find('tokens', 1, {id: tokenId});
        if(token.length === 0){
            res.status(403).end();
        } else {
            DAO.alter('tokens', {created_at: new Date(), id: tokenId})
            next();
        } 
    }
}
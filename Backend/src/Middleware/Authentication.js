const DAO = require('../Database');

module.exports = {
    verifyToken: async (req, res, next) => {
        if(req.headers.authorization === undefined) return res.status(403).end();
        const tokenId = req.headers.authorization.split(' ')[1];
        const token = await DAO.find('tokens', 1, {id: tokenId});
        if(token.length === 0){
            return res.status(403).end();
        }
        const user = await DAO.find('members', 1, {id: token[0].member_id});
        if(user[0].isAdm || user[0].id === req.body.id){
            DAO.alter('tokens', {created_at: new Date(), id: tokenId})
            next();
        } else {
            res.status(403).end();
        } 
    }
}
const { Like } = require("../Model");

class LikeController {

    async add(req, res, next){
        try {
            const like = new Like();
            like.insert(req.body);
            await like.add();
            res.end();
        } catch (error) {
            req.error = error;
            next();
        }

    }

    async sum(req, res, next){
        try {
            const like = new Like();
            like.insert(req.params);
            
        } catch (error) {
            req.error = error;
            next();
        }
    }

}

module.exports = LikeController;
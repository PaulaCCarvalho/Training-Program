const {Comment} = require('../Model');

class CommentController {
    
    async add(req, res, next){
        try {
            const comment = new Comment()
            comment.insert(req.body);
            await comment.save();
            res.status(201).end();
        } catch (error) {
            req.error = error;
            next();
        }
    }

    async find(req, res, next){
        try {
            const comment = new Comment();
            const {page, id, ...params} = req.query;
            const comments = await comment.find(params, page, id);
            res.json(comments);
        } catch (error) {
            req.error = error;
            next();
        }
    }

    async findOne(req, res, next){
        try {
            const comment = new Comment();
            const {comments: resp}  = await comment.find({id: req.params.id});
            res.json(resp[0]); 
        } catch (error) {
            req.error = error;
            next();
        }    
    }

    async findByMember(req, res, next){
        try {
            const comment = new Comment();
            const comments  = await comment.findByMember({member_id: req.params.id}, req.query.page, req.query.id);
            res.json(comments); 
        } catch (error) {
            req.error = error;
            next();
        }    
    }

    async alter(req, res, next){
        try {
            const params = req.body;
            const comment = new Comment();
            await comment.alter(params);
            res.status(204).end();
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async delete(req, res, next){
        try{
            const {id} = req.params;
            const comment = new Comment();
            await comment.delete(id)
            res.status(204).end();
        }catch(error){
            req.error = error;
            next()
        }
    }
}

module.exports = CommentController;
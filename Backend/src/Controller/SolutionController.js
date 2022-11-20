const {Solution} = require('../Model');

class SolutionController {
    
    async add(req, res, next){
        try {
            const solution = new Solution()
            solution.insert(req.body);
            await solution.save();
            res.status(201).end();
        } catch (error) {
            req.error = error;
            next();
        }
    }

    async find(req, res, next){
        try {
            const solution = new Solution();
            const {page, id, ...params} = req.query;
            const solutions = await solution.find(params, page, id);
            res.json(solutions);
        } catch (error) {
            req.error = error;
            next();
        }
    }

    async findOne(req, res, next){
        try {
            const solution = new Solution();
            const {solutions: resp}  = await solution.find({id: req.params.id});
            res.json(resp[0]); 
        } catch (error) {
            req.error = error;
            next();
        }    
    }

    async findByMember(req, res, next){
        try {
            const solution = new Solution();
            const solutions  = await solution.findByMember({member_id: req.params.id}, req.query.page, req.query.id);
            res.json(solutions); 
        } catch (error) {
            req.error = error;
            next();
        }    
    }

    async alter(req, res, next){
        try {
            const params = req.body;
            const solution = new Solution();
            await solution.alter(params);
            res.status(204).end();
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async delete(req, res, next){
        try{
            const {id} = req.params;
            const solution = new Solution();
            await solution.delete(id)
            res.status(204).end();
        }catch(error){
            req.error = error;
            next()
        }
    }
}

module.exports = SolutionController;
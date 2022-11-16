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
            const solutions = await solution.find(req.query);
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
            const solutions  = await solution.findByMember({id: req.params.id}, req.query.page);
            res.json(solutions); 
        } catch (error) {
            req.error = error;
            next();
        }    
    }

    alter(){

    }

    delete(){

    }
}

module.exports = SolutionController;
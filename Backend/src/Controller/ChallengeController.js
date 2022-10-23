const {Challenge} = require('../Model');

class ChallengeController {
    async add(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert(req.body)
            await challenge.save()
            res.status(201).send()
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async findOne(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert(req.params);
            const ObjClg = await challenge.find(req.query)
            res.json(ObjClg[0]);
        } catch (error) {
            req.error = error;
            next()            
        }
    }

    async find(req, res, next){
        try {
            const challenge = new Challenge();
            const {page, trash, nivel, tags, ...params} = req.query
            if(nivel !== '' && nivel !== undefined) params.nivel = nivel.split(',');
            if(tags !== '' && nivel !== undefined) params.nome = tags.split(',');
            const challenges = await challenge.find(params, page, trash);
            const count = await challenge.count(params);
            res.json({count, challenges});
        } catch (error) {
            req.error = error;
            next()            
        }
    }

    async alter(req, res, next){
        try{
            const challenge = new Challenge();
            challenge.insert({...req.body, id: req.params.id})
            await challenge.alter()
            res.status(204).send()
        } catch(error){
            req.error = error;
            next()
        }
    }

    async delete(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert({id: req.params.id})
            await challenge.delete();            
            res.status(204).send();
        } catch (error) {
            req.error = error;
            next()
        }
    }
}

module.exports = ChallengeController;
const {Challenge} = require('../Model');

class ChallengeController {
    async add(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert(req.body)
            await challenge.save()
            res.status(204).send()
        } catch (error) {
            console.log(error);
            res.status(400).send()
        }
    }

    async findOne(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert(req.params);
            const ObjClg = await challenge.find(req.query)
            res.json(ObjClg[0]);
        } catch (error) {
            console.log(error);
            res.status(400).send();            
        }
    }

    async find(req, res, next){
        try {
            const challenge = new Challenge();
            const {page, trash, nivel, tags, ...params} = req.query
            if(nivel !== undefined) params.nivel = nivel.split(',');
            if(tags !== undefined) params.nome = tags.split(',');
            const challenges = await challenge.find(params, page, trash);
            const count = await challenge.count(params);
            res.json({count, challenges});
        } catch (error) {
            console.log(error);
            res.status(400).send();            
        }
    }

    async alter(req, res, next){
        try{
            const challenge = new Challenge();
            challenge.insert({...req.body, id: req.params.id})
            challenge.alter()
            res.status(204).send()
        } catch(error){
            res.status(400).send();
        }
    }

    async delete(req, res, next){
        try {
            const challenge = new Challenge();
            challenge.insert({id: req.params.id})
            await challenge.delete();            
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = ChallengeController;
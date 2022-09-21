const {Challenge} = require('../Model');

class ChallengeController {
    async add(req, res, next){
        req.body
        const challenge = new Challenge();
        try {
            challenge.insert(req.body)
            const response = await challenge.save()
            res.json(response)
        } catch (error) {
            res.status(400).send()
        }
    }

    async findOne(req, res, next){
        const challenge = new Challenge();
        console.log(req.params);
        challenge.insert(req.params);
        challenge.find()
    }

    async find(req, res, next){
        try {
            const challenge = new Challenge();
            const challenges = await challenge.find(req.query)
            res.json(challenges);
        } catch (error) {
            res.status(400).send();            
        }
    }
}

module.exports = ChallengeController;
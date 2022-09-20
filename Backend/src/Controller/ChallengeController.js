const {Challenge} = require('../Model')

class ChallengeController {
    add(req, res){
        const challenge = new Challenge();
        const sql = challenge.save()
        res.send(sql)
    }
}

module.exports = ChallengeController;
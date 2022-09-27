const {Tag} = require("../Model");

class TagController {

    async add (req, res, next){
        try {
            const tag = new Tag();
            tag.insert(req.body);
            await tag.save();
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }

    async find(req, res, next){
        try {
            const tag = new Tag();
            const tags = await tag.find(req.page);
            res.json(tags)
        } catch (error) {
            res.send();
        }
    }

    async findOne(req, res, next){
        try {
            const tag = new Tag();
            const objTag = await tag.find(1, {id: req.params.id});
            res.json(objTag);
        } catch (error) {
            res.status(400).send();
        }
    }

}

module.exports = TagController;
const {Tag} = require("../Model");

class TagController {

    async add (req, res, next){
        try {
            const tag = new Tag();
            tag.insert(req.body);
            await tag.save();
            res.status(201).send();
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async find(req, res, next){
        try {
            const tag = new Tag();
            const tags = await tag.find();
            res.json(tags)
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async findOne(req, res, next){
        try {
            const tag = new Tag();
            const objTag = await tag.find(1, {id: req.params.id});
            res.json(objTag);
        } catch (error) {
            req.error = error;
            next()
        }
    }

}

module.exports = TagController;
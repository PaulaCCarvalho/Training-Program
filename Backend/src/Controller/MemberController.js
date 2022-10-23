const {Member} = require('../Model');

class MemberController {

    async login(req, res, next) {
        try {
            const member = new Member();
            const token = await member.login(req.headers.username, req.headers.password);
            res.json(token);
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }
    async add(req, res, next) {
        try {
            const member = new Member();
            member.insert(req.body);
            await member.save();
            const token = await member.login(req.body.email, req.body.senha)
            res.status(201).json(token);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async find(req, res, next) {
        try {
            const member = new Member();
            const members = await member.find()
            res.json(members);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async findOne(req, res, next) {
        try {
            const member = new Member();
            const memberResp = await member.find(req.params)
            const {senha, ...memberformated} = memberResp[0]
            res.json(memberformated);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async alter(req, res, next) {
        try {
            const {links, ...params} = req.body;
            const member = new Member();
            await member.alter(params, links)
            console.log(req.body)
            res.status(204).end();
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = MemberController;
const {Member} = require('../Model');

class MemberController {

    async login(req, res, next) {
        try {
            const member = new Member();
            const token = await member.login(req.headers.username, req.headers.password);
            res.json(token);
        } catch (error) {
            req.error = error;
            next()
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
            req.error = error;
            next()
        }
    }

    async find(req, res, next) {
        try {
            const member = new Member();
            const {page, search, id, ...params} = req.query; 
            const members = await member.find(params, page, search, id);
            res.json(members);
        } catch (error) {
            req.error = error;
            next()
        }
    }

    async findOne(req, res, next) {
        try {
            const member = new Member();
            const { members: memberResp }= await member.find(req.params)
            const {...memberformated} = memberResp[0]
            res.json(memberformated);
        } catch (error) {
            req.error = error;
            next()
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
            req.error = error;
            next()
        }
    }

    async delete(req, res, next){
        try{
            const {id} = req.params;
            console.log('id: ', id)
            const member = new Member();
            await member.delete(id)
            res.status(204).end();
        }catch(error){
            req.error = error;
            next()
        }
    }
}

module.exports = MemberController;
const DAO = require('../Database');
const jwt = require('jsonwebtoken');
const {LoginError, NotFoundError} = require('../Error')

class Member {

    constructor() {
        this.db = DAO;
    }

    insert({ nome, senha, email }) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }

    async save() {
        await this.db.add('members', this);
    }

    async find(params = {}) {
        const members = await this.db.find('members', 1, params, 10);
        if(members.length === 0) throw new NotFoundError('member');
        for(const member of members){
            delete member.senha;
            member.links = await this.db.find('links', 1, {member_id: member.id}, 10, false, false, 'titulo, url');
        }
        return members;
    }

    async alter(params, links = []){
        await this.db.alter('members', params);
        await this.db.destroy('links', {member_id: params.id})
        for(const link of links){
            await this.db.add('links', {...link, member_id: params.id});
        }
    }

    async login(username, password) {
        const [user] = await this.db.find('members', 1, {email: username});
        if(user === undefined) throw new LoginError();
        if(user.senha !== password){
            throw new LoginError();
        }
        const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (3600 * 24), data: 'foo'}, 'secret')
        const now = new Date();
        await this.db.add('tokens', {id: token, member_id: user.id, created_at: now})
        return token
    }
}

module.exports = Member;
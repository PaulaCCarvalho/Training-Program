const DAO = require('../Database');
const jwt = require('jsonwebtoken');

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
        return await this.db.find('members', 1, params, 10)
    }

    async login(username, password) {
        const [user] = await this.db.find('members', 1, {email: username});
        if(user.senha !== password){
            throw new Error('invalid Login')
        }
        return jwt.sign({exp: Math.floor(Date.now() / 1000) + (3600 * 24), data: 'foo'}, 'secret')
    }
}

module.exports = Member;
const DAO = require('../Database');
const jwt = require('jsonwebtoken');
const {LoginError, NotFoundError, ApplicationError, ConflictError} = require('../Error')

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
        try {
            await this.db.add('members', this);
        } catch (error) {

            console.log(error)
            if(error.errno == 1062)
                throw new ConflictError();
            else 
            throw new ApplicationError();
        }
    }

    async find(params = {}, page = 1, search, id) {
        const offset = (page - 1) * 10;  
        let members = await this.db.find(
            'members',
            1,
            params,
            100000,
            [
                {table: 'solutions', refTo: 'a', refKey:'id', selfKey: 'member_id'},
                {table: 'challenges', refTo: 'b', refKey:'challenge_id', selfKey: 'id'}
            ],
            false,
            'a.id, a.nome, a.email, a.isAdm, a.bio, a.foto, sum( IF( b.nota is NULL, 0, IF( ((b.nota) * c.nivel * 10) < 0, 0, (b.nota) * c.nivel * 10) ) ) as pontuacao, count(b.id) as numSolutions',
            undefined,
            'a.id',
            'pontuacao DESC'
        );
        if(members.length === 0) throw new NotFoundError('member');
        const retMem = [];
        const re = new RegExp(search, 'i');
        if(search){
            members = members.filter( member => re.test(member.nome))
        }
        for(let i = offset; (i < offset + 10) && (i < members.length); i++)
        {
            members[i].ranking = i + 1;
            members[i].links = await this.db.find('links', 1, {member_id: members[i].id}, 10);
            retMem.push(members[i]);
        }
        let curMember = {};
        for(const [i, member] of members.entries()){
            if(member.id == id) {
                curMember = {...member};
                curMember.links =  await this.db.find('links', 1, {member_id: members[i].id}, 10);
                curMember.ranking = i + 1;
                break;
            } 
        }

        console.log("TURN AROUND: ",curMember)
        return {curMember, members: retMem, count: members.length};
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
        return {token, isAdm: user.isAdm, id: user.id}
    }

    async delete(id){
        await this.db.destroy('members', {id});
    }
}

module.exports = Member;
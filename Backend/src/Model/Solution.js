const DAO = require("../Database");
const { NotFoundError, InvalidData } = require("../Error");
const Like = require("./Like");

class Solution {

    constructor() {
        this.db = DAO;
    }

    insert({id, linkCode, descricao, foiAvaliado, nota, challenge_id, member_id}){
        this.id = id;
        this.member_id = member_id;
        this.linkCode = linkCode;
        this.descricao = descricao;
        this.foiAvaliado = foiAvaliado;
        this.nota = nota;
        this.challenge_id = challenge_id;
    }

    async save(){
        try {
            await this.db.add('solutions', this);
        } catch (error) {
            throw new InvalidData();
        }
    }

    async find(params, page = 1, member){
        const solutions = await this.db.find('solutions', page, params, 10, [{table: 'members', refTo: 'a', refKey:'member_id', selfKey: 'id'}], false, 'a.id, b.nome, b.id as idMember, b.foto, a.linkCode, a.nota, a.descricao');
        const [{num: count}] = await this.db.find('solutions', page, params, 1000000000, false, false, 'count(id) as num');
        const likes = await this.db.find('solutions', page, params, 10, [{table: 'curtida_solution', refTo: 'a', refKey:'id', selfKey: 'id_solution'}], false, 'a.id, SUM(b.positive) as num', undefined, 'a.id', 'a.id');
        for(let i in solutions){
            solutions[i].likes = Number(likes[i].num)
            solutions[i].hasLiked = await (new Like).insert({member, solution: solutions[i].id}).hasLiked();
        }
        return {count, solutions};
    }

    async findByMember(params, page = 1){
        const solutions = await this.db.find('members', page, params, 5, [{table: 'solutions', refTo: 'a', refKey:'id', selfKey: 'member_id'}, {table: 'challenges', refTo: 'b', refKey:'challenge_id', selfKey: 'id'}], false, 'b.id, c.nome, a.foto, b.linkCode, b.nota, b.descricao');
        if(solutions.length === 0) throw new NotFoundError('solution');
        const [{num: count}] = await this.db.find('members', page, params, 5, [{table: 'solutions', refTo: 'a', refKey:'id', selfKey: 'member_id'}], false, 'count(a.id) as num');
        const likes = await this.db.find('solutions', page, [], 10, [{table: 'curtida_solution', refTo: 'a', refKey:'id', selfKey: 'id_solution'}], false, 'a.id, SUM(b.positive) as num', undefined, 'a.id', 'a.id');
        for(let i in solutions){
            solutions[i].likes = Number(likes[i].num)
            solutions[i].hasLiked = await (new Like).insert({member: params.id, solution: solutions[i].id}).hasLiked();
        }
        return {count, solutions};
    }

    async alter(params){
        await this.db.alter('solutions', params);
    }

    async delete(id){
        await this.db.destroy('solutions', {id});
    }
}

module.exports = Solution;
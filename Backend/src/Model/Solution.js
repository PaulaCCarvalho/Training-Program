const DAO = require("../Database");
const { NotFoundError } = require("../Error");

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
        await this.db.add('solutions', this);
    }

    async find(params){
        const solutions = await this.db.find('solutions', 1, params, 10, false, false);
        const [{num: count}] = await this.db.find('solutions', 1, params, 10, false, false, 'count(id) as num');
        return {count, solutions};
    }

    async findByMember(params, page = 1){
        const solutions = await this.db.find('members', page, params, 5, [{table: 'solutions', refTo: 'a', refKey:'id', selfKey: 'member_id'}], false, 'a.nome, a.foto, b.linkCode, b.nota, b.descricao');
        if(solutions.length === 0) throw new NotFoundError('solution');
        const [{num: count}] = await this.db.find('members', page, params, 5, [{table: 'solutions', refTo: 'a', refKey:'id', selfKey: 'member_id'}], false, 'count(a.id) as num');
        return {solutions, count}
    }
}

module.exports = Solution;
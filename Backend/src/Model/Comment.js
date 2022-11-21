const DAO = require("../Database");
const { NotFoundError, InvalidData } = require("../Error");
const Like = require("./Like");

class Comment {

    constructor() {
        this.db = DAO;
    }

    insert({id, id_solution, id_member, body}){
        this.id = id;
        this.id_member = id_member;
        this.id_solution = id_solution;
        this.body = body;
    }

    async save(){
        try {
            await this.db.add('comments', this);
        } catch (error) {
            throw new InvalidData();
        }
    }

    async find(params, page = 1, member){
        const comments = await this.db.find('comments', page, params, 10, [{table: 'members', refTo: 'a', refKey:'id_member', selfKey: 'id'}], false, 'a.id, a.body, b.nome, b.id as idMember, b.foto');
        const [{num: count}] = await this.db.find('comments', 1, params, 1000000000, false, false, 'count(id) as num');
        const likes = await this.db.find('comments', page, params, 10, [{table: 'curtida_comment', refTo: 'a', refKey:'id', selfKey: 'id_comment'}], false, 'a.id, SUM(b.positive) as num', undefined, 'a.id', 'a.id');
        for(let i in comments){
            comments[i].likes = Number(likes[i].num);
            comments[i].hasLiked = await (new Like).insert({member, ref: comments[i].id, type:'comment'}).hasLiked();
        }
        return {count, comments};
    }

    async alter(params){
        try {
            await this.db.alter('comments', params);
        } catch (error) {
            throw new InvalidData();
        }
    }

    async delete(id){
        await this.db.destroy('comments', {id});
    }
}

module.exports = Comment;
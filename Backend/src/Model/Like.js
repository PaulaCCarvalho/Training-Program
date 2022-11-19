const DAO = require("../Database");

class Like {

    constructor() {
        this.db = DAO;
    }

    insert({id, member, solution, positive}){
        this.id = id;
        this.id_members = member;
        this.id_solution = solution;
        this.positive = positive;
        return this;
    }

    async hasLiked(){
        const like = await this.db.find('curtida_solution', 1, {id_members: this.id_members, id_solution: this.id_solution}, 1, false);
        if(like.length === 0) return false;
        this.insert({
            id: like[0].id,
            member: like[0].id_members,
            solution: like[0].id_solution,
            positive: this.positive === like[0].positive? 0 : this.positive
        });
        return like[0].positive; 
    }

    async add(){
        const hasLiked = await this.hasLiked();
        if(hasLiked !== false){
            this.db.alter('curtida_solution', this)
        } else {
            this.db.add('curtida_solution', this);
        }
    }

    async remove(){
        const hasLiked = await this.hasLiked();
        if(hasLiked){
            this.db.destroy('curtida_solution', {id_members: this.member, id_solution: solution})
        }
    }

    async sum (){
        const sum = await this.db.find('curtida_solution', 1, {id_solution: this.id_solution}, 100000, false, false, 'count(*) as num');
        const [{num}] = sum
        return num;
    }
}

module.exports = Like;
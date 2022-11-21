const DAO = require("../Database");
const { InvalidData } = require("../Error");

class Like {

    constructor() {
        this.db = DAO;
    }

    insert({id, member, ref, positive, type = 'solution'}){
        this.id = id;
        this.id_members = member;
        this.ref = ref;
        this.positive = positive;
        this.type = type;
        return this;
    }

    async hasLiked(){
        const like = await this.db.find(`curtida_${this.type}`, 1, {id_members: this.id_members, [`id_${this.type}`]: this.ref}, 1, false);
        if(like.length === 0) return false;
        this.insert({
            id: like[0].id,
            member: like[0].id_members,
            ref: like[0][`id_${this.type}`],
            positive: this.positive === like[0].positive? 0 : this.positive,
            type: this.type
        });
        return like[0].positive; 
    }

    async add(){
        const hasLiked = await this.hasLiked();
        const type = this.type;
        this[`id_${type}`] = this.ref;
        delete this.ref;
        delete this.type;
        try{
            if(hasLiked !== false){
                await this.db.alter(`curtida_${type}`, this)
            } else {
                await this.db.add(`curtida_${type}`, this);
            }
        }catch(error){
            throw new InvalidData();
        }
    }

    async remove(){
        const hasLiked = await this.hasLiked();
        if(hasLiked){
            this.db.destroy(`curtida_${this.type}`, {id_members: this.member, [`id_${this.type}`]: this.ref});
        }
    }

    async sum (){
        const sum = await this.db.find(`curtida_${this.type}`, 1, {[`id_${this.type}`]: this.ref}, 100000, false, false, 'count(*) as num');
        const [{num}] = sum
        return num;
    }
}

module.exports = Like;
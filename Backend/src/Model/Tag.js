const DAO = require("../Database");

class Tag {

    constructor() {
        this.db = DAO;
    }

    insert({id, nome}){
        this.id = id;
        this.nome = nome;
    }

    async find(page, params){
        return await this.db.find('tags', page, {}, 30, false, false) 
    }

    async delete(id){
        await this.db.destroy('tags', {id});
    }

    async save(){
       await this.db.add('tags', this);
    }
}

module.exports = Tag;
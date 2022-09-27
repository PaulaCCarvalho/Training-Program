const DAO = require("../Database");

class Tag {

    constructor() {
        this.db = DAO;
    }

    insert({id, nome}){
        this.id = id;
        this.nome = nome;
    }

    find(page, params){
        return this.db.find('tags', page, params) 
    }

    async save(){
        this.db.add('tags', this);
    }
}

module.exports = Tag;
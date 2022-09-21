const dao = require('../Database');

class Challenge {

    constructor(){
        this.db = dao;
    }
    
    insert({nome, descricao, nivel, tema, tags, imagens, capa}) {
        this.nome = nome;
        this.descricao = descricao;
        this.nivel = nivel;
        this.tema = tema;
        this.tags = tags;
        this.imagens = imagens;
        this.capa = capa;
    }

    async save(){
        try {
            return await this.db.add('challenges', this)
        } catch (error) {
            throw error;            
        }
    }

    async find(page = 1){
        try {
            return await this.db.find('challenges', {available: 1} , page)
        } catch (error) {
            throw error;            
        }
    }
}

module.exports = Challenge;
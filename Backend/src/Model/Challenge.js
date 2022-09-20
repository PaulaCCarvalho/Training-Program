const dao = require('../Database');

class Challenge {
    
    constructor({nome, descricao, nivel, tema, tags, imagens, capa}) {
        this.nome = nome;
        this.descricao = descricao;
        this.nivel = nivel;
        this.tema = tema;
        this.tags = tags;
        this.imagens = imagens;
        this.capa = capa;
        this.db = dao;
    }

    save(){
        return this.db.add('challanges', {casa: 'telhado', num: 12, aaaa: 'asokda'});
    }
    
}

module.exports = Challenge;
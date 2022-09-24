const dao = require('../Database');

class Challenge {

    constructor() {
        this.db = dao;
    }

    insert({ nome, descricao, nivel, tema, tags, imagens, capa, id }) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.nivel = nivel;
        this.tema = tema;
        this.tags = tags;
        this.imagens = imagens;
        this.capa = capa;
    }

    async save() {
        return await this.db.add('challenges', this)
    }

    async find(page = 1, trash = false) {
        const params = {available: !trash}
        if(this.id !== undefined) params.id = this.id;
        return await this.db.find('challenges', params, page);
    }

    async alter() {
        await this.db.alter('challenges', this);
    }

    async delete() {
        console.log(this)
        await this.db.delete('challenges', this.id);
    }
}

module.exports = Challenge;
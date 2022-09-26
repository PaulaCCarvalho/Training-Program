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
        const {insertId} = await this.db.add('challenges', this);
        this.imagens.forEach(async image => {
            await this.db.add('images', {path: image})
        });
        this.tags.forEach(async tag => {
            await this.db.add('challenges_tags  ', {challenge_id: insertId, tag_id: tag})
        });
    }

    async find(page = 1, trash = false) {
        const params = {available: !trash};
        if(this.id !== undefined) params.id = this.id;
        const challenges = await this.db.find('challenges', params, page);
        for(const challenge of challenges){
            const images = await this.db.find('images', {challenge_id: challenge.id}, 1, 5)
            const img = images.map(image => image.path);
            challenge.imagens = img;
            const tags = await this.db.find('tags')
        };
        return challenges;
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
const DAO = require('../Database');

class Challenge {

    constructor() {
        this.db = DAO;
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
        const { insertId } = await this.db.add('challenges', this);
        /*this.imagens.forEach(async image => {
            await this.db.add('images', {path: image})
        }); */
        this.tags.forEach(async tag => {
            await this.db.add('challenges_tags  ', { challenge_id: insertId, tag_id: tag })
        });
    }

    async find(query) {
        const { page, trash, ...oQuery } = query;
        const params = { available: !trash, ...oQuery };
        if (this.id !== undefined) params.id = this.id;
        const challenges = await this.db.find('challenges', page, params, 12);
        for (const challenge of challenges) {
            const images = await this.db.find('images', 1, { challenge_id: challenge.id }, 5);
            challenge.imagens = images.map(image => image.path);
            const tags = await this.db.find('challenges_tags', 1, { challenge_id: challenge.id }, 5, { table: 'tags', a: 'tag_id', b: 'id' });
            challenge.tags = tags.map(tag => {
                return { id: tag.id, nome: tag.nome }
            });
            delete challenge.available;
        };
        return challenges;
    }

    async count(query) {
        const {trash, ...params} = query
        const result = await this.db.getSum('challenges', params);
        return result[0].num;
    }

    async alter() {
        await this.db.alter('challenges', this);
        if (this.imagens !== undefined) {
            this.db.destroy('images', { challenge_id: this.id });
            for (const image of this.imagens) {
                await this.db.add('images', { challenge_id: this.id, path: image });
            }
        }
        if (this.tags !== undefined) {
            await this.db.destroy('challenges_tags', { challenge_id: this.id });
            for (const tag of this.tags) {
                await this.db.add('challenges_tags', { challenge_id: this.id, tag_id: tag })
            }

        }
    }

    async delete() {
        await this.db.delete('challenges', this.id);
    }
}

module.exports = Challenge;
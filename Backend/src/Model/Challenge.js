const DAO = require('../Database');
const { NotFoundError } = require('../Error');

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
        this.capa = capa;
    }

    async save() {
        const { insertId } = await this.db.add('challenges', this);
        this.tags.forEach(async tag => {
            await this.db.add('challenges_tags  ', { challenge_id: insertId, tag_id: tag })
        });
    }

    async find(paramsQ, page, trash, search) {
        const params = { available: !trash, ...paramsQ };
        if (this.id !== undefined) params.id = this.id;
        const challenges = await this.db.find(
            'challenges',
            page,
            params,
            12,
            [
                {
                    table: 'challenges_tags',
                    refTo: 'a',
                    refKey: 'id',
                    selfKey: 'challenge_id',
                },
                {
                    table: 'tags',
                    refTo: 'b', 
                    refKey: 'tag_id',
                    selfKey: 'id'
                }
            ],
            true,
            'a.id AS id, a.nome AS nome, a.descricao AS descricao, a.nivel AS nivel, a.tema AS tema, a.capa AS capa', 
            search
        );
        if(challenges.length === 0) throw new NotFoundError('Challenge')
        for (const challenge of challenges) {
            const tags = await this.db.find(
                'challenges_tags',
                1,
                { challenge_id: challenge.id },
                5,
                [{ table: 'tags', refTo: 'a', refKey: 'tag_id', selfKey: 'id' }]
);
            challenge.tags = tags.map(tag => {
                return { id: tag.id, nome: tag.nome }
            });
            delete challenge.available;
        };
        return challenges;
    }

    async count(params, search) {
        const result = await this.db.find(
            'challenges',
            1,
            {...params, available: true},
            1000000000,
            [
                {
                    table: 'challenges_tags',
                    refTo: 'a',
                    refKey: 'id',
                    selfKey: 'challenge_id',
                },
                {
                    table: 'tags',
                    refTo: 'b', 
                    refKey: 'tag_id',
                    selfKey: 'id'
                }
            ],
            false,
            'COUNT (DISTINCT a.id) as num',
            search
        );
        return result[0].num;
    }

    async alter() {
        await this.db.alter('challenges', this);
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
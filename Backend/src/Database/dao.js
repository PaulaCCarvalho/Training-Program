const connection = require('./connection');

module.exports = {
    add(table, params) {
        return new Promise((resolve, reject) => {
            const paramsObj = {}
            for (const key in params) {
                if (
                    key === 'db'   ||
                    key === 'tags' ||
                    key === 'imagens'
                ) continue;
                paramsObj[key] = params[key]
            }
            const sql = `INSERT INTO ${table} SET ?`;
            connection.query(sql, paramsObj, (error, values, fields) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },

    find(table, params, page = 1, limit = 10, join) {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * 10
            const formatedParamsList = [];
            for(const key in params){
                formatedParamsList.push(`${key}=${params[key]}`)            
            }
            const joinformated = ''
            if(join !== undefined){
                `JOIN ${join.table} as b on a.tag_id=b.id`
            }
            const formatedParams = formatedParamsList.join(' AND ');
            const sql = `SELECT * FROM ${table} as a WHERE ${formatedParams} LIMIT ${offset},${limit}`;
            connection.query(sql, Object.values(params), (error, values) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },

    alter(table, params) {
        return new Promise((resolve, reject) => {
            const paramsObj = {}
            for (const key in params) {
                if (
                    params[key] === undefined ||
                    key === 'db'              ||
                    key === 'tags'            ||
                    key === 'imagens'
                ) continue;
                    paramsObj[key] = params[key]
            }
            const sql = `UPDATE ${table} SET ? WHERE id=${params.id}`;
            connection.query(sql, paramsObj, (error, values) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },

    delete(table, id) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${table} SET available=0 WHERE id=${id}`;
            connection.query(sql, (error, values) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    }
}
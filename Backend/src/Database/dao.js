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

    find(table, params, page) {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * 10
            const sql = `SELECT * FROM ${table} WHERE ${Object.keys(params).length === 1 ? 'available=?' : 'available=? AND id=?'} LIMIT ${offset},10`;
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
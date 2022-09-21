const connection = require('./connection');

module.exports = {
    add(table, params){
        return new Promise((resolve , reject) => {
            const paramsObj = {}
            for(const key in params){
                if (
                    key === 'db'   ||
                    key === 'tags' || 
                    key === 'imagens'
                ) continue;
                paramsObj[key] = params[key]
            }
            const sql = `INSERT INTO ${table} SET ?`;
            connection.query(sql, paramsObj, (error, values) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },

    find(table, params, page){
        return new Promise((resolve , reject) => {
            const sql = `SELECT * FROM ${table} WHERE ?`;
            connection.query(sql, params, (error, values) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },

    alter(){

    },

    delete(){

    }
}
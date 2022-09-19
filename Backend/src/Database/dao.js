const connection = require('./connection');

module.exports = {
    add(table, params = []){
        const sql = `INSERT INTO ${table} (${params.keys}) VALUES (${params.values})`;
        return sql;
        connection.query(sql, (values, error) => { })
    }
}
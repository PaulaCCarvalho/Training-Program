const connection = require('./connection');

function diferentiateStrig(param, key, ref = 'a'){
    // if(param === '') return ''
    return typeof param === 'string' ?
                        `${ref}.${key}='${param}'` : 
                        `${ref}.${key}=${param}`
}

function handleWhereClause(params, search) {
    const formatedParamsList = [];
        for(const key in params){
            if(params[key] === undefined) continue;
            if(key === 'tags') continue;
            let output = '';
            if(params[key] instanceof Array){
                const outputArray = [];
                for(const value of params[key]){
                    outputArray.push(diferentiateStrig(value, key, key === 'nome'? 'c':'a'));
                }
                output += '(    ' + outputArray.join(' OR ') + ' )';
            } else {
                output += diferentiateStrig(params[key], key);
            }          
            formatedParamsList.push(output);
        }
        search && formatedParamsList.push(`a.nome LIKE '%${search}%'`);
    return formatedParamsList;
}

module.exports = {
    add(table, params) {
        return new Promise((resolve, reject) => {
            const paramsObj = {}
            for (const key in params) {
                if (
                    key === 'db'   ||
                    key === 'tags' ||
                    key === 'imagens' ||
                    params[key] === null ||
                    params[key] === undefined ||
                    (key === 'id' && typeof params[key] !== 'string')
                ) continue;
                paramsObj[key] = params[key]
            }
            const sql = `INSERT INTO ${table} SET ?`;
            console.log(sql);
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

    getSum(table, params){
        return new Promise((resolve, reject) => {
            let formatedParams = '';
            if(Object.keys(params).length !== 0) {
                const formatedParamsList = handleWhereClause(params);
                formatedParams = 'WHERE ' + formatedParamsList.join(' AND ');
            }
            const sql = `SELECT COUNT(*) as num FROM ${table} ${formatedParams}`;
            console.log(sql);
            connection.query(sql, (error, results) => {
                if(error){
                    reject(error);
                } else {
                    resolve(results)
                }
            })
        })
    },

    find(table, page = 1, params, limit = 10, join = false, distinct = false, retrieve = '*', search, groupBy = false, orderBy = false) {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit
            let formatedParams = '';
            const haveParams = Object.keys(params).length + (search === undefined ? 0 : 1)
            if(haveParams !== 0) {
                const formatedParamsList = handleWhereClause(params, search);
                formatedParams = 'WHERE ' + formatedParamsList.join(' AND ');
            }
            let joinformated = '';
            if(join !== false){
                alphabet = 'bcdefghijklmnopqrstuvwxyz';
                for(const i in join){

                     joinformated += ` LEFT JOIN ${join[i].table} as ${alphabet[i]} on ${join[i].refTo}.${join[i].refKey}=${alphabet[i]}.${join[i].selfKey}`;
                }
            }
            let distinctFormated = ''
            if(distinct === true){
                distinctFormated = 'DISTINCT';
            }
            let = groupByFormated = '';
            if(groupBy){
                groupByFormated = 'GROUP BY ' + groupBy;
            }
            let = orderByFormated = '';
            if(orderBy){
                orderByFormated = 'ORDER BY ' + orderBy;
            }
            const sql = `SELECT ${distinctFormated} ${retrieve} FROM ${table} as a ${joinformated} ${formatedParams} ${groupByFormated} ${orderByFormated} LIMIT ${offset},${limit}`;
            console.log(sql)
            connection.query(sql, (error, values) => {
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
                    key === 'imagens'         ||
                    key === 'id'
                ) continue;
                    paramsObj[key] = params[key]
            }
            const sql = `UPDATE ${table} SET ? WHERE id='${params.id}'`;
            console.log(sql);
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
            console.log(sql);
            connection.query(sql, (error, values) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },
     
    destroy(table, param) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table} WHERE ?`;
            console.log(sql);
            connection.query(sql, param, (error, values) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(values);
                }
            })
        })
    },
     
    query(sql) {
        return new Promise((resolve, reject) => {
            console.log(sql);
            connection.query(sql, param, (error, values) => {
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
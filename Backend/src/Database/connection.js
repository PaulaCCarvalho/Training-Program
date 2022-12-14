const mysql = require('mysql2');
const config = {
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DATABASE,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
};

module.exports = mysql.createPool(config);
const {Pool} = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'lycan',
    port: 5432,
    database: 'jwttutorial'
});

module.exports = pool;
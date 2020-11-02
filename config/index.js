require('dotenv').config();
const assert = require('assert');

const { 
    NODE_ENV,
    PORT,
    HOST,
    BASE_API,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER,
    SQL_PORT
} = process.env;

assert(PORT, 'PORT IS REQUIRED');
assert(HOST, 'HOST IS REQUIRED');

module.exports = {
    nodeEnv: NODE_ENV,
    port: PORT,
    host: HOST,
    baseAPI: BASE_API,
    sql:{
        host: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        port: SQL_PORT
    }
};
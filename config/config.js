const dotenv = require("dotenv").config();
const mysql2 = require('mysql2');
const dbDatabase = "mediconcen";
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbDatabase,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectModule: mysql2,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbDatabase + "-test",
        host: process.env.DB_HOST,
        logging: null,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbDatabase,
        host: process.env.DB_HOST,
    },
};

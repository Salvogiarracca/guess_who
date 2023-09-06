'use strict';

const sqlite3 = require('sqlite3');
require("dotenv").config();

const db = new sqlite3.Database(`./db/${process.env.DB_NAME}`, err => {
    if (err) throw err;
});

module.exports = db;
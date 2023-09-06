'use strict';

const db = require('../db/connection');

const getAll = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM properties";
        db.all(sql, (err, rows) =>{
            if(err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

exports.getAll = getAll;
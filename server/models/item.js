'use strict';
const db = require("../db/connection");

const getById = id => {
    return new Promise((resolve, reject)=>{
        const sql = "SELECT id, name FROM items WHERE id=?"
        db.get(sql, [id], function (err, row){
            if(err)
                reject(err);
            resolve(row);
        })
    })
}

const getByName = name => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM items WHERE name=?";
        db.get(sql, [name], function (err, row){
            if(err)
                reject(err);
            resolve(row);
        })
    })
}

const getN = num => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DISTINCT * FROM items ORDER BY RANDOM() LIMIT ?"
        db.all(sql, [num], function (err, rows){
            if(err)
                reject(err)
            resolve(rows)
        })
    })
}

exports.getById = getById;
exports.getByName = getByName;
exports.getN = getN;
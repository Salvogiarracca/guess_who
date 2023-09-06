'use strict';
const db = require("../db/connection");

const getByUser = user => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM matches WHERE user=?";
        db.all(sql, [user], function (err, rows) {
            if (err)
                reject(err)
            resolve(rows)
        })
    })
}

const newMatch = game => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO matches (user, date, state, secret_item, difficulty, score) VALUES (?,?,?,?,?,?)"
        console.log(game)
        db.run(sql, [game.user, game.date, game.state, game.secret_item, game.difficulty, game.score], function (err) {
            if (err)
                reject(err);
            resolve(this.lastID);
        })
    })
}

const getById = id => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM matches WHERE id=?"
        db.get(sql, [id], function (err, row) {
            if (err)
                reject(err);
            resolve(row);
        })
    })
}

const completeMatch = (id, result) => {
    return new Promise((resolve, reject) => {
        const newState = "Complete";
        const score = 0;
        if (result) {
            const sql = "UPDATE matches SET state = ? WHERE id = ?"
            db.run(sql, [newState, id], function (err) {
                if (err)
                    reject(err)
            })
        } else {
            const sql = "UPDATE matches SET state = ?, score = ? WHERE id = ?"
            db.run(sql, [newState, score, id], function (err) {
                if (err)
                    reject(err)
            })
        }
        if (this.changes === 0) {
            reject({message: "Record not found"});
        } else {
            resolve({message: "Game Finished"});
        }
    })
}

const decreaseScore = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE matches SET score = score - 1 WHERE id=?"
        db.run(sql, [id], function (err) {
            if (err)
                reject(err)
            if (this.changes === 0) {
                reject({message: "Record not found"});
            } else {
                resolve({message: "Score decreased by one"});
            }
        })
    })
}

const deleteMatch = id => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM matches WHERE id=?";
        db.run(sql, [id], function (err) {
            if (err)
                reject(err)
            if (this.changes === 0) {
                reject({message: "Record not found"});
            } else {
                resolve({message: "Database cleared"});
            }
        })
    })
}

const updateSequence = (tableName) =>{
    return new Promise((resolve, reject)=>{
        db.run("UPDATE sqlite_sequence SET seq = seq - 1 WHERE name = ?",
            [tableName], function (err){
                if (err)
                    reject(err)
                if (this.changes === 0) {
                    reject({message: "Record not found"});
                } else {
                    resolve({message: "Sequence updated"});
                }
            })
    })
}

exports.getByUser = getByUser;
exports.newMatch = newMatch;
exports.getById = getById;
exports.decreaseScore = decreaseScore;
exports.completeMatch = completeMatch;
// exports.setScore = setScore;
exports.deleteMatch = deleteMatch;
exports.updateSequence = updateSequence;
'use strict';
const db = require("../db/connection");

const getByUser = user => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM matches WHERE user=? AND status = ?";
        db.all(sql, [user, "Complete"], function (err, rows) {
            if (err)
                reject(err)
            resolve(rows)
        })
    })
}

const newMatch = game => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO matches (user, date, status, secret_item, difficulty, score) VALUES (?,?,?,?,?,?)"
        db.run(sql, [game.user, game.date, game.status, game.secret_item, game.difficulty, game.score], function (err) {
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
        const newStatus = "Complete";
        const score = 0;
        if (result) {
            const sql = "UPDATE matches SET status = ? WHERE id = ?"
            db.run(sql, [newStatus, id], function (err) {
                if (err)
                    reject(err)
            })
        } else {
            const sql = "UPDATE matches SET status = ?, score = ? WHERE id = ?"
            db.run(sql, [newStatus, score, id], function (err) {
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

const getTotalScore = (user) =>{
    return new Promise((resolve, reject) => {
        const sql = "SELECT SUM(score) AS totalScore FROM matches WHERE user = ? AND status = ?"
        db.get(sql, [user, "Complete"], function (err, row){
            if(err)
                reject(err)
            resolve(row)
        })
    })
}

exports.getByUser = getByUser;
exports.newMatch = newMatch;
exports.getById = getById;
exports.decreaseScore = decreaseScore;
exports.completeMatch = completeMatch;
exports.deleteMatch = deleteMatch;
exports.getTotalScore = getTotalScore;
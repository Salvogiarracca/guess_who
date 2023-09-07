'use strict';

const db = require("../db/connection");
const crypto = require("crypto");

function find(username, password){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email=?";
        db.get(sql, [username], (err, row) => {
           if(err){
               reject(err);
           } else {
               if(!row){
                   reject("Invalid username and/or password");
               } else {
                   const providedSalted = crypto.scryptSync(password, row.salt, 32);
                   if (!providedSalted){
                       reject("Invalid username and/or password");
                   }
                   const equal = crypto.timingSafeEqual(
                       providedSalted,
                       Buffer.from(row.hash, "hex"),
                   );
                   if(equal){
                       resolve({...row, hash: undefined, salt: undefined});
                   } else {
                       reject("Invalid username and/or password");
                   }
               }
           }
        });
    });
}
exports.find = find;
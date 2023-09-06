'use strict';

const db = require("../db/connection");
const Game = require("../models/game");

const Item = require("../models/item.js")
const {decreaseScore, completeMatch, getByUser, deleteMatch, updateSequence} = require("../models/game");
const dayjs = require("dayjs");
const yup = require("yup");
const {number} = require("yup");

const getMatches = async (req, res) => {
    try{
        const user = req.user;
        const matches = await getByUser(user.name);
        return res.status(200).json({matches: matches, message: "OK"})
    } catch (e) {
        res.status(500).json({error: "Internal server error"});
    }
}

const startGame = async (req, res) => {
    try{
        const bodySchema = yup.object(
            {
                difficulty: yup.number().integer().min(1).max(3)
            }
        )
        const user = req.user? req.user.name : "guest";
        const {difficulty} = bodySchema.validateSync(req.body);
        const max = (difficulty * 12) - 1;
        const min = 0;
        const items = await Item.getN(difficulty * 12);
        const secretItem = items[Math.floor(Math.random() * (max-min) - min)]
        const properties = Object.keys(secretItem).slice(3)

        const currentProperties = properties.map(property => {
            const values = [...new Set(items.map(item => item[property]))];
            return { name: property, values }
        })
        const game = {
            user: user,
            date: dayjs().format("YYYY-MM-DD"),
            state: "Incomplete",
            secret_item: secretItem.name,
            difficulty: difficulty,
            score: difficulty * 12
        }
        const gameId = await Game.newMatch(game);
        return res.status(200).json({id: gameId, items: items, properties: currentProperties, message: "done"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"});
    }
}

const checkProperty = async (req, res) => {
    try{
        const currProperty = req.body;
        const gameId = req.params.id;
        const currMatch = await Game.getById(gameId);
        const item = await Item.getByName(currMatch.secret_item);
        const result = (currProperty.value === item[currProperty.name]);
        if (currMatch.score > 0)  //!result &&
            await decreaseScore(gameId);
        return res.status(200).json({result: result, message: "ok"});
    }catch (e) {
        res.status(500).json({error: "Unable to process the request"});
    }
}

const checkItem = async (req, res) => {
    try {
        const gameId = req.params.id;
        const itemName = req.body.name;
        const user = req.user? req.user.name : "guest";


        const currMatch = await Game.getById(gameId);
        const result = (itemName === currMatch.secret_item);

        const message = await completeMatch(gameId, result);

        const completedMatch = await Game.getById(gameId);
        console.log(completedMatch)


        if(user === "guest"){
            await deleteMatch(gameId);
            await updateSequence("matches")
        }

        return res.status(200).json({game:completedMatch, result: result, message: message.message});
    } catch (e) {
        res.status(500).json({error: "Unable to process the request"});
    }
}

exports.getMatches = getMatches;
exports.startGame = startGame;
exports.checkProperty = checkProperty;
exports.checkItem = checkItem;
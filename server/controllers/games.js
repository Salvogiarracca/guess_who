'use strict';

const db = require("../db/connection");
const Game = require("../models/game");

const Item = require("../models/item.js")
const {decreaseScore, completeMatch, getByUser, deleteMatch, updateSequence, getTotalScore} = require("../models/game");
const dayjs = require("dayjs");
const yup = require("yup");
const {number} = require("yup");

const getMatches = async (req, res) => {
    try{
        const user = req.user;
        const matches = await getByUser(user.name);
        const {totalScore} = await getTotalScore(user.name);
        return res.status(200).json({matches: matches, totalScore: totalScore, message: "OK"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"});
    }
}

const startGame = async (req, res) => {
    try{
        const bodySchema = yup.object(
            {
                difficulty: yup
                    .number()
                    .integer()
                    .min(1, "Difficulty must be at least 1")
                    .max(3, "Difficulty must be at most 3")
            }
        )
        const {difficulty} = bodySchema.validateSync(req.body);
        const user = req.user? req.user.name : "guest";
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
            status: "Incomplete",
            secret_item: secretItem.name,
            difficulty: difficulty,
            score: difficulty * 12
        }
        const gameId = await Game.newMatch(game);
        return res.status(200).json({id: gameId, items: items, properties: currentProperties, message: "done"})
    } catch (e) {
        res.status(e.errors? 400 : 500).json({message: e.errors? e.errors[0] : e.message});
    }
}

const checkProperty = async (req, res) => {
    try{
        const paramSchema =  yup
                    .number()
                    .integer()
                    .required("Id is required")

        const gameId = paramSchema.validateSync(req.params.id);

        const bodySchema = yup
            .object({
                name: yup
                    .string()
                    .required("Name of the property is required"),
                value: yup
                    .string()
                    .required("Value of the property is required")
            })
        const currProperty = bodySchema.validateSync(req.body);

        const currMatch = await Game.getById(gameId);
        const item = await Item.getByName(currMatch.secret_item);
        const result = (currProperty.value === item[currProperty.name]);

        if (currMatch.score > 0)
            await decreaseScore(gameId);

        return res.status(200).json({result: result, message: "ok"});
    }catch (e) {
        res.status(e.errors? 400 : 500).json({message: e.errors? e.errors[0] : e.message});
    }
}

const checkItem = async (req, res) => {
    try {
        const paramSchema =  yup
            .number()
            .integer()
            .required("Id is required")

        const gameId = paramSchema.validateSync(req.params.id);
        const bodySchema = yup
            .string()
            .required("ItemName is required")

        const itemName = bodySchema.validateSync(req.body.name);

        const user = req.user? req.user.name : "guest";

        const currMatch = await Game.getById(gameId);
        if(currMatch.status === "Complete" ){
            throw new Error("Cannot modify a concluded match");
        }

        const result = (itemName === currMatch.secret_item);


        const message = await completeMatch(gameId, result);

        const completedMatch = await Game.getById(gameId);


        if(user === "guest"){
            await deleteMatch(gameId);
            await updateSequence("matches")
        }

        return res.status(200).json({game:completedMatch, result: result, message: message.message});
    } catch (e) {
        res.status(e.errors? 400 : 500).json({message: e.errors? e.errors[0] : e.message});
    }
}

exports.getMatches = getMatches;
exports.startGame = startGame;
exports.checkProperty = checkProperty;
exports.checkItem = checkItem;
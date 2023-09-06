const db = require("../db/connection");
const Item = require("../models/item")

const getItems = async (req, res) => {
    try {
        const response = await Item.getAll();
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({error: "Internal server error"});
    }
};


const getNItems = async (req, res) => {
    try {
        const num = req.body.num;
        console.log(num)
        const response = await Item.getN(num);
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({error: "Internal server error"});
    }
}


exports.getItems = getItems;
exports.getNItems = getNItems;
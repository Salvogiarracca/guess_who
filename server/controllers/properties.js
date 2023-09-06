'use strict';

const db = require("../db/connection");
const Property = require("../models/property");

const getProperties = async (req, res) => {
    try{
        const response = await Property.getAll();
        response.map(p => {
            p.values = p.values.split(",");
        });
        return res.status(200).json(response);
    } catch (e){
        console.error(e);
        res.status(500).json({error: "Internal server error"});
    }
}

0

exports.getProperties = getProperties;
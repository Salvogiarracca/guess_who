'use strict';
import {useContext} from "react";
import GameContext from "../../contexts/gameContext.js";

export const useItemsList = () => {
    const {items} = useContext(GameContext);

    // const properties = ['sex', 'skin', 'job', 'alive', 'glasses', 'eyes', 'hair', 'beard'];
    // const currentProperties = properties.map(property => {
    //     const values = [...new Set(items.map(item => item[property]))];
    //     return { name: property, values }
    // })

    return {
        items
    };
};
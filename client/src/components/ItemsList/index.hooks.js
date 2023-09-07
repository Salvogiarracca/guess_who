'use strict';
import {useContext} from "react";
import GameContext from "../../contexts/gameContext.js";

export const useItemsList = () => {
    const {items} = useContext(GameContext);

    return {
        items
    };
};
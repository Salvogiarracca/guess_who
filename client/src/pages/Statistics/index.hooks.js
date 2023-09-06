'use strict';

import {useEffect, useState} from "react";
import {getGames} from "../../apis/games.js";

export const useStatistics = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames()
            .then(res =>{
                console.log(res)
                setGames(res.data.matches)
            })
    }, []);

    return {
        games
    }

}
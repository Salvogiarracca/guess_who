'use strict';

import {useEffect, useState} from "react";
import {getGames} from "../../apis/games.js";

export const useStatistics = setShowStats => {
    const [games, setGames] = useState([]);
    const [totScore, setTotScore] = useState(0);

    useEffect(() => {
        getGames()
            .then(res =>{
                setShowStats(false);
                console.log(res)
                setGames(res.data.matches)
                setTotScore(res.data.totalScore)
            })
            .catch(e => console.log(e))
    }, []);

    return {
        games,
        totScore
    }

}
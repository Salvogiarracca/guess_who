import {useEffect, useState} from "react";
import {checkSession, doLogOut} from "./apis/users.js";

export default function useApp(){
    const [user, setUser] = useState(null);
    const [difficulty, setDifficulty] = useState(undefined)
    const [gameId, setGameId] = useState(-1);
    const [items, setItems] = useState([]);
    const [properties, setProperties] = useState([]);
    const [guess, setGuess] = useState("");
    const [showStats, setShowStats] = useState(true);

    useEffect(() => {
        checkSession()
            .then(res => setUser(res))
            .catch(()=> console.log("No credentials"))
    }, []);

    const handleLogout = () => {
        doLogOut().then(() => {
            setUser(null);
        });
    };

    return {
        user,
        setUser,
        handleLogout,
        items,
        setItems,
        properties,
        setProperties,
        gameId,
        setGameId,
        difficulty,
        setDifficulty,
        guess,
        setGuess,
        showStats,
        setShowStats
    }
}
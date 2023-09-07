import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import GameContext from "../../contexts/gameContext.js";

export const useHome = setShowStats => {
    const {difficulty, setDifficulty} = useContext(GameContext);
    const navigate = useNavigate();
    const modalities = [
        'Easy',
        'Medium',
        'Hard'
    ];

    useEffect(() => {
        setShowStats(true)
    }, []);

    const handleDifficulty = (d) => {
        switch (d) {
            case "Easy": {
                setDifficulty(1);
                break;
            }
            case "Medium": {
                setDifficulty(2);
                break;
            }
            case "Hard": {
                setDifficulty(3);
                break;
            }
        }
        navigate("/play")
    }


    return {
        difficulty,
        modalities,
        navigate,
        handleDifficulty
    }
}
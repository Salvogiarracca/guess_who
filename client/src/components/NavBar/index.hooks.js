import {useContext, useState} from "react";
import UserContext from "../../contexts/userContext.js";
import {useNavigate} from "react-router-dom";
import GameContext from "../../contexts/gameContext.js";

export const useNavBar = () => {
    const { handleLogout, user} = useContext(UserContext);
    const { showStats } = useContext(GameContext);
    // const [showStats, setShowStats] = useState(false);
    const navigate = useNavigate();

    return { navigate, user, handleLogout, showStats }
}
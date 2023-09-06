import {useContext} from "react";
import UserContext from "../../contexts/userContext.js";
import {useNavigate} from "react-router-dom";

export const useNavBar = () => {
    const { handleLogout, user} = useContext(UserContext);
    const navigate = useNavigate();

    return { navigate, user, handleLogout }
}
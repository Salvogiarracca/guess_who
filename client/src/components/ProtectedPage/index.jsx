import {useContext} from "react";
import UserContext from "../../contexts/userContext.js";
import {Navigate, useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useContext(UserContext);
    // const navigate = useNavigate();

    if(!user){

        return <Navigate to={"/login"}/>;
    }

    return children;
}

export default ProtectedRoute;
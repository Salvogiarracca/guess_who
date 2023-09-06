'use strict';
import { useForm } from "react-hook-form";

import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import UserContext from "../../contexts/userContext.js";
import {checkLogIn} from "../../apis/users.js";

function useLogin({ setUser }){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        return () => {
            if(user){
                navigate("/");
            }
        };
    }, []);

    const formData = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { handleSubmit } = formData;

    const onSubmit = e => {
        handleSubmit(async data => {
           try {
               const { username, password } = data;
               const user = await checkLogIn(username, password);
               setUser(user);
               navigate("/");
           } catch (e) {
               formData.reset();
           }
        })(e);
    };

    return {
        formData,
        onSubmit,
    };
}

export default useLogin;
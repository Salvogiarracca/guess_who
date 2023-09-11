'use strict';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {checkLogIn} from "../../apis/users.js";

const schema = yup.object({
    email: yup
        .string()
        .typeError("Insert email")
        .required("No email provided")
        .email("Email is not valid"),
    password: yup
        .string()
        .typeError("Insert password")
        .required("No password provided"),
});

function useLogin({ setUser }){
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        },
    });
    async function onSubmit(data) {
        try {
            const { email, password } = data;
            const user = await checkLogIn(email, password);
            setUser(user);
            navigate("/");
        } catch (error) {
            setError("root.serverError", {
                type: "401",
                message: "Wrong username and/or password",
            });
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        navigate,
        errors,
        dirtyFields
    };
}

export default useLogin;
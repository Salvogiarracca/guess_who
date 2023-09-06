'use strict';
import { useFormContext } from "react-hook-form";

export const useFormEmailField = () => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();
    return {
        defaultValues,
        control,
        errors,
    };
};
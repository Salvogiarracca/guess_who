'use strict';
import {useFormContext} from "react-hook-form";

export const useFormPassword = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return { control, errors}
};
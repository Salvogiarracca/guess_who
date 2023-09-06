'use strict';

import {useEffect, useState} from "react";

export const useProperty = (property) => {
    const name = property.name;

    const [values, setValues] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    // const { checkSelection } = useGame();

    useEffect(() => {
        setValues(property.values);
        if (property.values.length<2)
            setIsDisabled(true)
    }, [property.values.length, property.values]);

    return { name, values, isDisabled, setIsDisabled}
}
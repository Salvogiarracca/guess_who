'use strict';

import {useNavigate} from "react-router-dom";

export const useItem = (item) => {
    const name = item.name;
    const image_name = item.image_name;
    const sex = item.sex;
    const glasses = item.glasses;
    const skin = item.skin;
    const job = item.job;
    const alive = item.alive;
    const eyes = item.eyes;
    const hair = item.hair;
    const beard = item.beard;
    const navigate = useNavigate();





    return {name, image_name, sex, glasses, skin, job, alive, eyes, hair, beard, navigate};
};

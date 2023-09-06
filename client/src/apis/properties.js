'use strict';
import {api} from "./connection.js";

export const getProperties = async () => {
    try {
        const result = await api.get("/properties", {
            withCredentials: true,
        });
        if (result.status !== 200) {
            throw new Error(result?.data?.error);
        }
        return result;
    } catch (e) {
        return e?.response?.data?.error
    }
};
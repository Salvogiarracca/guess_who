'use strict';
import { api } from "./connection"

export const getItems = async () => {
    try {
        const result = await api.get("/items", {
           withCredentials: true,
        });
        if (result.status !== 200) {
            throw new Error(result?.data?.error);
        }
        return result;
    } catch (e) {
        return e.response.data.error
    }
};
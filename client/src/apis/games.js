'use strict';
import {api} from "./connection"

export const getGames = async () => {
    try{
        const result = await api.get("/games", {
            withCredentials: true,
        })
        if(result.status !== 200){
            throw new Error(result?.data?.error);
        }
        return result;
    }catch (e) {
        e?.response?.data?.message
    }
}

export const startGame = async (difficulty) => {
    try{
        const result = await api.post("/games", {
            difficulty: difficulty,
        }, {
            withCredentials: true,
        })
        if (result.status !== 200){
            throw new Error(result?.data?.error);
        }
        return result;
    } catch (e) {
        e?.response?.data?.message
    }
}
export const checkProperty = async (id, property) => {
    try{
        const result = await api.put(`/games/${id}/property`, property, {
            withCredentials: true
        });
        if (result.status !== 200){
            throw new Error(result?.data?.error);
        }
        return result;
    }catch (e) {
        return e.message;
    }
}

export const endGame = async (id ,item) => {
    try {
        console.log(id, item)
        const result = await api.put(`/games/${id}/item`, item, {
            withCredentials: true
        })
        if (result.status !== 200){
            throw new Error(result?.data?.error);
        }
        return result;
    } catch (e) {
        return e.message;
    }
}
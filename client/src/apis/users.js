'use strict';
import {api} from "./connection.js";

export async function checkLogIn(username, password) {
    try {
        const response = await api.post(`/session`, {
            username: username,
            password: password,
        });
        if (response.status === 200) {
            return response?.data?.user;
        } else {
            throw new Error("Cannot process the request");
        }
    } catch (e) {
        if (e?.response?.status === 401) {
            throw new Error("Invalid username and/or password");
        } else {
            throw new Error("Cannot process the request");
        }
    }
}

export async function checkSession() {
    try {
        const response = await api.get("/session/current", {
            withCredentials: true,
        });
        if (response.status === 200) {
            return response?.data?.user;
        } else {
            throw new Error("Cannot process the request");
        }
    } catch (e) {
        if (e?.response?.status === 401) {
            throw new Error("Invalid username and/or password");
        } else {
            throw new Error("Cannot process the request");
        }
    }
}

export async function doLogOut() {
    const response = await api.delete("/logout", {
        withCredentials: true,
    });
    if (response.status === 200) {
        return response?.data;
    } else {
        throw new Error("Cannot do logout");
    }
}
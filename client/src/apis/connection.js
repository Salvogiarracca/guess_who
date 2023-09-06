'use strict';

import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: `${API}`,
    timeout: 5000,
    withCredentials: true,
    headers: {},
});
//throw new Error("ESTE ES EL axiosClient.js QUE SE ESTA EJECUTANDO");

import axios from "axios";

const api = axios.create({
    baseURL: "https://api-harrypotter.miniweb.ar/harrypotter"
});

// request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;

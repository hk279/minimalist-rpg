import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        if (token && config.headers) {
            config.headers = { "Authorization": "Bearer " + token };
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios; 
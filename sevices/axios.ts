import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any): AxiosInstance {
    const { "app.accessToken": accessToken } = parseCookies(ctx);

    const api = axios.create({
        baseURL: "http://ec2-18-191-8-30.us-east-2.compute.amazonaws.com",
    });


    api.interceptors.request.use((config) => {
        return config;
    });

    if (accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    return api;
}
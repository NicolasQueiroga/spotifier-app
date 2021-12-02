import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any): AxiosInstance {
  const { "api.accessToken": accessToken } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://0.0.0.0:8000",
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (accessToken)
    api.defaults.headers.common["Authorization"] = `Token ${accessToken}`;

  return api;
}

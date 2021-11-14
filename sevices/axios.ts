import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any): AxiosInstance {
  const { "app.accessToken": accessToken } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://ec2-3-137-174-177.us-east-2.compute.amazonaws.com",
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (accessToken) {
    console.log(accessToken)
    api.defaults.headers.common["Authorization"] = `Token ${accessToken}`;
  }

  return api;
}

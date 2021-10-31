import axios, { AxiosInstance } from "axios";

export async function getSpotifyClient(accessToken: string): Promise<AxiosInstance> {
    const spotify = axios.create({
        baseURL: "https://api.spotify.com/v1",
    });

    spotify.interceptors.request.use((config) => {
        return config;
    });

    if (accessToken)
        spotify.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return spotify;
}

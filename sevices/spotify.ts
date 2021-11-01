import axios, { AxiosInstance } from "axios";

async function getToken(): Promise<string> {
    const {data:res} = await axios.get('http://localhost:3000/api/auth/session');
    const token = res.user.accessToken;
    return token;
}

export async function getSpotifyClient(): Promise<AxiosInstance> {
    const spotify = axios.create({
        baseURL: "https://api.spotify.com/v1",
    });

    spotify.interceptors.request.use((config) => {
        return config;
    });

    const accessToken = await getToken()
    if (accessToken)
        spotify.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return spotify;
}

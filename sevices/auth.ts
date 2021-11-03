import { api } from "./api";

export async function recoverUserInformation(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const response = await api.get("/auth/restricted");

  return {
    user: response.data,
  };
}

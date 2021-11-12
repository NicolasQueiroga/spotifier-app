import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../sevices/api";
import router from "next/router";
import { getCookieParser } from "next/dist/server/api-utils";

export interface ReponseProps {
  token: string;
}

export async function signIn({ email, password }: SignInData): Promise<void> {
  try {
    const { data: response }: any = await api.post("/auth/token/login/", {
      email,
      password,
    });

    const token: ReponseProps = response.auth_token;
    console.log(token.token);
    setCookie(undefined, "app.accessToken", token.token, {
      maxAge: 60 * 60 * 1,
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
    router.push("/user/bookmarks");
  } catch (error: any) {
    return error.response;
  }
}

export async function signUp(signUpData: SignUpData): Promise<void> {
  try {
    const { data: response }: any = await api.post("/auth/users/", {
      ...signUpData,
    });
    await signIn(signUpData);
  } catch (error: any) {
    return error.response;
  }
}

export async function logOut(): Promise<void> {
  try {
    destroyCookie(undefined, "app.accessToken");
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
  router.push("/");
}

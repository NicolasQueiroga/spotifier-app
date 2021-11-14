import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../sevices/api";
import router from "next/router";
import { getCookieParser } from "next/dist/server/api-utils";

export async function signin({ email, password }: SignInData): Promise<void> {
  try {
    const { data: response } = await api.post("/auth/token/login/", {
      email,
      password,
    });

    const token = response.auth_token as string;
    console.log("authcontext token ", token);
    setCookie(undefined, "app.accessToken", token, {
      maxAge: 60 * 60 * 1,
      path: "/",
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    await signin(signUpData);
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

import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../sevices/api";
import router from "next/router";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  region: string;
  state: string;
  gender: string;
  phoneNumber: string;
};

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  re_password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  // country: string;
  // region: string;
  // state: string;
  // gender: string;
}

// type AuthContextType = {
//     setLoading: Dispatch<SetStateAction<boolean>>;
//     user: User;
//     isAuthenticated: boolean;
//     signIn: (data: SignInData) => Promise<void>;
//     signUp: (data: SignUpData) => Promise<void>;
//     logOut: () => Promise<void>;
// };

// interface AuthProviderProps {
//     children: ReactChild;
// }

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
    setCookie(undefined, "app.accessToken", token.token, {
      maxAge: 60 * 60 * 1,
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
    router.push("/user");
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

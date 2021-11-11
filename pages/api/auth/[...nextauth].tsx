import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
var qs = require("qs");

async function getToken(token: any) {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + process.env.BASIC_AUTH_TOKEN,
    },
  };

  const param = {
    grant_type: "refresh_token",
    refresh_token: token.refreshToken,
  };

  try {
    const { data: response }: any = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(param),
      header
    );
    token.accessToken = response.access_token;
    token.accessTokenExpires = Date.now() + response.expires_in * 1000;
    token.refreshToken = response.refresh_token ?? token.refreshToken;
  } catch (error: any) {
    return error;
  }
}

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope:
        "user-read-private,user-read-playback-state,user-read-recently-played,user-read-email,user-read-currently-playing,user-top-read",
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.refresh_token = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in! * 1000;
        token.accessToken = account.accessToken;
      }
      await getToken(token);
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});

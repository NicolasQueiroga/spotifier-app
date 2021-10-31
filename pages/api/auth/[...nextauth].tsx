import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Spotify({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            scope: 'user-read-private,user-read-playback-state,user-read-recently-played,user-read-email,user-read-currently-playing,user-top-read',
        })
    ],
    callbacks: {
        async jwt(token, _, account) {
            if (account) {
                token.id = account.id
                token.accessToken = account.accessToken
            }
            return token
        },
        async session(session, user) {
            session.user = user
            return session
        }
    },
});
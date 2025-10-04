import { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: AuthOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID!,
            clientSecret: process.env.COGNITO_CLIENT_SECRET!,
            issuer: process.env.COGNITO_ISSUER!,
        })
    ],
    
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: "/",
        error: "/error",
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // check this later
            // session.accessToken = token.accessToken;
            return session;
        },
    },
};


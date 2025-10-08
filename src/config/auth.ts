import { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: AuthOptions = {
    providers: [
        CognitoProvider({
            clientId: String(process.env.COGNITO_CLIENT_ID),
            clientSecret: String(process.env.COGNITO_CLIENT_SECRET),
            issuer: String(process.env.COGNITO_ISSUER),
        })
    ],
    
    secret: String(process.env.NEXTAUTH_SECRET),
    pages: {
        signIn: "/",
        error: "/error",
    },
    callbacks: {
        async jwt({ token, account }) {
            console.log("ACCOUNT", account)
            console.log("TOKEN", token)
            
            // Solo se ejecuta en el primer login cuando account existe
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            return token;
        },
        async session({ session, token }) {
            // Pasar los tokens a la sesión del cliente
            session.accessToken = token.accessToken as string;
            session.idToken = token.idToken as string;
            session.refreshToken = token.refreshToken as string;
            session.expiresAt = token.expiresAt as number;
            
            console.log("SESSION", session)
            console.log("TOKEN", token)
            return session;
        },
    },
};


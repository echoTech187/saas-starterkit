import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

// Extend the User and Session types
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: number | string;
            email: string;
            username: string;
            fullname: string;
            slug: string;
            image: string;
            isNewUser?: boolean;
        } & DefaultSession["user"];
        accessToken?: string;
        error?: "RefreshAccessTokenError";
        isNewUser?: boolean;
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the Credentials provider's `authorize` callback.
     */
    interface User {
        id: number | string;
        email: string;
        username: string;
        fullname: string;
        slug: string;
        image: string;
        token?: string; // This is the access token from your backend
        refreshToken?: string;
        expiresAt?: number;
        code?: string;
        provider?: string;
        isNewUser?: boolean;
    }
}

// Extend the JWT type
declare module "next-auth/jwt" {
    /**
     * Returned by the `jwt` callback and stored in the JWT session
     */
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        isNewUser?: boolean;
        user: {
            id: number | string;
            email: string;
            username: string;
            fullname: string;
            slug: string;
            image: string;
            isNewUser?: boolean;
        };
        error?: "RefreshAccessTokenError";
    }
}

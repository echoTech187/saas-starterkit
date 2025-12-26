/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { authUseCase } from "@/di/modules"
import { setToken } from "@/lib/utils/auth"
import { cookies } from "next/headers"
import { randomInt } from "crypto"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                if (!credentials) {
                    return {
                        success: false,
                        message: "Data login tidak lengkap.",
                        errors: { username: ["Data login tidak lengkap."], password: ["Data login tidak lengkap."] },
                    };
                }
                const result = await authUseCase.execute(credentials.username, credentials.password);
                if (result.success && result.token) {
                    const user: any = {
                        id: result?.user?.id,
                        username: result?.username,
                        fullname: result?.user?.fullname,
                        email: result?.user?.email,
                        phone_number: result.user?.phone_number,
                        slug: result.user?.slug,
                        image: "",
                        token: result.token
                    }

                    return user;
                } else {
                    return {
                        success: false,
                        message: result.message,
                        errors: result.errors,
                    };
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            profile(profile) {
                return {
                    id: profile.sub,
                    slug: profile.sub,
                    username: profile.email.split('@')[0],
                    fullname: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    // The token is handled in the jwt callback
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
        newUser: "/register"
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        signIn: async ({ user, account, profile }) => {

            if (account?.provider === "google" && account?.type === "oauth") {
                if (!profile?.email) {
                    // Deny access if the Google profile doesn't have an email.
                    return false;
                }

                // Check if the user already exists in your database.
                const userExists = await authUseCase.checkUserByEmail(profile.email);
                if (userExists.exists) {
                    return true;
                } else {
                    const codeVerification = randomInt(100000, 999999).toString();
                    const user = {
                        providerAccountId: account.providerAccountId,
                        provider: account.provider,
                        type: account.type,
                        username: profile?.email?.split('@')[0],
                        fullname: profile?.name,
                        email: profile?.email,
                        image: profile?.image,
                        code: codeVerification,
                    }
                    const result = await authUseCase.register(user);
                    if (!result.success) return false;
                    const storeCookies = await cookies();
                    storeCookies.set("codeVerification", JSON.stringify(user), {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60, // 1 jam
                    });

                    return `/new-password`; // Redirect to a page where the user can set a new password


                }
            } else if (account?.provider === "credentials" && account?.type === "credentials") {
                if (!user.email) return false
                return true;
            }
            return false;
        },

        async jwt({ token, user, account, profile }) {
            // `user` and `account` are only passed on initial sign-in
            if (account && user) {
                let sessionToken: string | undefined;

                if (account.provider === 'credentials') {
                    // For credentials, the token is already on the user object from authorize()
                    sessionToken = (user as any).token;
                } else if (account.provider === 'google') {
                    // For Google, we use the id_token from the account
                    const userInfo = {
                        providerAccountId: account.providerAccountId,
                        provider: account.provider,
                        type: account.type,
                        username: profile?.email?.split('@')[0],
                        fullname: profile?.name,
                        email: profile?.email,
                        image: user.image,
                    }
                    const loginwithgoogle = await authUseCase.loginWithGoogle(userInfo);
                    sessionToken = loginwithgoogle.token;
                }

                if (sessionToken) {
                    // Persist the token and user data into the JWT
                    token.accessToken = sessionToken;
                    token.user = user;

                    // Set cookies only on initial sign-in
                    try {
                        const storeCookies = await cookies();
                        storeCookies.set("user", JSON.stringify(user));
                        await setToken(sessionToken);
                    } catch (error) {
                        console.error("Error setting cookies in JWT callback", error);
                    }
                }
            }

            return token;
        },
        async session({ session, token }) {
            // The token now contains the user data and backend access token
            // We pass it to the session object so it's available on the client
            if (token) {
                session.user = (token as any).user;
                (session as any).accessToken = (token as any).accessToken;
            }

            return session;
        }
    }
})

export { handler as GET, handler as POST }
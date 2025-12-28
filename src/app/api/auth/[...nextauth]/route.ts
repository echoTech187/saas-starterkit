import NextAuth, { User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { authUseCase } from "@/di/modules"

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
                    throw new Error("Invalid credentials");
                }
                const result = await authUseCase.execute(credentials?.username, credentials?.password);
                if (result.success && result.user) {
                    return {
                        id: result.user?.id,
                        username: result.user?.username,
                        fullname: result.user?.fullname,
                        email: result.user?.email,
                        token: result.token,
                        image: result.user?.image
                    } as unknown as User;
                }
                throw new Error(result.message);
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
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
            if (account?.provider === "google") {
                if (!profile?.email) {
                    return false;
                }
                const userExists = await authUseCase.loginWithGoogle(user);
                if (userExists.success) {
                    user.token = userExists.token;
                    return true;
                } else {
                    const result = await authUseCase.registerWithGoogle(user);
                    if (!result.success) return false;
                    return `/new-password`;
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user as User;
                session.accessToken = token.accessToken as string;
            }
            return session;
        }
    }
})

export { handler as GET, handler as POST }
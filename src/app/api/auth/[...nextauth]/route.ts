/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { Account, NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { authUseCase } from "@/di/modules"

export const authOptions: NextAuthOptions = {
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
                        token: result.token || result.accessToken,
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
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            if (account?.provider === "google") {
                if (!profile?.email) {
                    return false;
                }
                const userExist = await authUseCase.checkUserByEmail(profile?.email);
                if (userExist.exists) {
                    const result = await authUseCase.loginWithGoogle(user);
                    if (result.success) {
                        user.token = result.token || result.accessToken;
                        user.isNewUser = false;
                        if (account) {
                            (account as Account).accessToken = user.token;
                        }
                        return true;
                    }
                    return true;
                } else {
                    const result = await authUseCase.registerWithGoogle(user);
                    if (!result.success) {
                        return false;
                    } else {
                        user.token = result.token || result.accessToken;
                        user.isNewUser = true;
                        if (account) {
                            (account as Account).accessToken = user.token;
                            (account as Account).isNewUser = true;
                        }
                        return true;
                    }
                }
            } else {
                if (!user.token) return false;
                user.token = user.token;
                return true;
            }
        },
        async jwt({ token, user, account, trigger, session }) {
            if (user) {
                token.user = user;
                token.accessToken = user.token || (account as any)?.accessToken;
                token.code = user.code;
                token.isNewUser = user.isNewUser || (account as any)?.isNewUser;
                if (session?.activeWorkspaceId) {
                    token.activeWorkspaceId = session.activeWorkspaceId;
                    token.activeWorkspaceSlug = session.activeWorkspaceSlug;
                    token.activeWorkspaceRole = session.activeWorkspaceRole;
                }
            }
            if (trigger === "update" && session?.isNewUser === false) {
                token.isNewUser = false;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.isNewUser = token.isNewUser;
                session.activeWorkspaceId = token.activeWorkspaceId as string | number | undefined;
                session.activeWorkspaceSlug = token.activeWorkspaceSlug as string | undefined;
                session.activeWorkspaceRole = token.activeWorkspaceRole as "OWNER" | "ADMIN" | "MEMBER" | undefined;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, handler as DELETE, handler as PUT, handler as PATCH }
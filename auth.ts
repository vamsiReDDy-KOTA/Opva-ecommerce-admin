import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prismadb from "./lib/prismadb";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from 'bcryptjs';
import { LoginSchema } from "./schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    adapter: PrismaAdapter(prismadb),
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            authorize: async (credentials) => {
                console.log("credentials", credentials);
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user: any = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    console.log(passwordMatch, "=== password")
                    if (passwordMatch) return user;
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {

        // async signIn({ user, account }) {
        //     console.log("Signing in", user, account);
        //     if (account?.provider !== "credentials") return true;

        //     const existingUser = await getUserById(user?.id)

        //     if (!existingUser?.emailVerified) return false

        //     // Todo: Add 2fa check

        //     return true;
        // },

        async signIn({ user, account }) {
            console.log("Signing in", user, account);
            if (account?.provider !== "credentials") return true;

            // const existingUser = await getUserById(user?.id);
            // if (!existingUser?.emailVerified) return false; // This could cause AccessDenied

            // Additional checks can be added here
            return true;
        },
        async jwt({ token, user }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Keep this for debugging
});
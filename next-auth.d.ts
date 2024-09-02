import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role?: string; // Add your custom field here
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role?: string; // Add your custom field here
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role?: string; // Add your custom field here
    }
}

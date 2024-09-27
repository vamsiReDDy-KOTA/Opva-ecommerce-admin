"use server"
import prismadb from "@/lib/prismadb";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prismadb.user.findUnique({ // Use 'user' to match your Prisma model name
            where: { email },
        });
        // console.log("user", user);
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prismadb.user.findUnique({ // Use 'user' to match your Prisma model name
            where: { id },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};

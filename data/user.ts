import prismadb from "@/lib/prismadb";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prismadb.user.findUnique({ // Use 'user' instead of 'users'
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prismadb.user.findUnique({ // Use 'user' instead of 'users'
            where: { id },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};
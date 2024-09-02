import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react"; // Correct import for signIn
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    try {
        const result = await signIn("credentials", {
            redirect: false, // Ensure redirect is handled manually
            email,
            password,
        });

        if (result?.error) {
            return { error: result.error };
        }

        // Handle success, e.g., redirect to a different page
        return { success: true };
    } catch (error) {
        console.log("error1", error);
        return { error: "Something went wrong!" };
    }
}

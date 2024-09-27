import { sendVerificationEmail } from "@/data/mail";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { error } from "console";
import { signIn } from "next-auth/react"; // Correct import for signIn
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    console.log("password", password)

    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email dose not exist!" }
    }

    // if (!existingUser.emailVerified) {
    //     console.log("hello===================")
    //     const verificaionToken: any = await generateVerificationToken(existingUser.email)

    //     console.log("verificaionToken: ", verificaionToken)
    //     await sendVerificationEmail(
    //         verificaionToken.email,
    //         verificaionToken.token
    //     )
    //     return { success: "Confirmation email sent!" }
    // }



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

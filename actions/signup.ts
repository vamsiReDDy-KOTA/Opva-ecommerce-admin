"use server";

import * as z from "zod"
import bcrypt from "bcryptjs"
import { SignUpSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { error } from "console";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/data/mail";

export const Signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values);


    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await prismadb.user.create({
        data: {
            name,
            email,
            password: hashedPassword,

        }
    })



    // TODO: Send verification token email

    const verificaionToken: any = await generateVerificationToken(email)

    await sendVerificationEmail(verificaionToken?.email, verificaionToken?.token)

    return { success: "Confirmation email sent!" }
}
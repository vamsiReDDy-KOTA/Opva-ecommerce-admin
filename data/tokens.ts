"use server"

import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verficiation-token";
import prismadb from "@/lib/prismadb";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email)

    console.log('existingToken', existingToken)
    if (existingToken) {
        await prismadb.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificaionToken = await prismadb.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificaionToken
}
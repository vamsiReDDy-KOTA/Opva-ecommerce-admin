import prismadb from "@/lib/prismadb";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificaionToken = await prismadb.verificationToken.findUnique({
            where: { token }
        })

        return verificaionToken
    } catch (error) {
        return null
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificaionToken = await prismadb.verificationToken.findFirst({
            where: { email }
        })

        console.log("verificaionToken", verificaionToken)

        return verificaionToken
    } catch (error) {
        return null
    }
}


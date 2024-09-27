"use server"

import prismadb from "@/lib/prismadb"


export const createStore = async (name: string, userId: string) => {
    try {
        // throw new Error("xxx")
        const store = await prismadb.store.create({
            data: {
                userId: userId,
                name: name,
            }
        })

        return store
    }
    catch (err) {
        return err
    }
}

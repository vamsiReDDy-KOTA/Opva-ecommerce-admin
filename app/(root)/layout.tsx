// import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userId = '2'

    if (!userId) {
        redirect('/auth/login')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }

    return ((
        <>
            {children}
        </>
    ))
}
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React, { use } from "react";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {
        storeId: string;
    }
}) {
    const userId = "2"

    if (!userId) {
        redirect('/api/login');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
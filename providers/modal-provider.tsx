"use client"

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [ismounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!ismounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    )
}
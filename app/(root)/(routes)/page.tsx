"use client"

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/Hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);
    return (

        <div className="p-4">
            {/* <Modal isOpen title="test" description="Test descrtiption" onClose={() => { console.log('Modal closed'); }}>
                Children
            </Modal> */}

            Root Page
        </div>
        // <main className="flex h-full flex-col items-center justify-center">
        //     <div className="space-y-6 text-center" >
        //         <h1 className={cn("text-6xl font-semibold")} >
        //             Auth
        //         </h1>
        //         <p className="text-lg" >
        //             A simple authentication service
        //         </p>
        //         <div>
        //             <LoginButton>
        //                 <Button variant="secondary" size="lg" >
        //                     Sign in
        //                 </Button>
        //             </LoginButton>
        //         </div>
        //     </div>
        // </main>

    );
}

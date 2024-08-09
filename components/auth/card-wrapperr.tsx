"use client";

import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
 } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref : string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-full max-w-[400px] max-auto shadow-md flex-col">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            {/* You can add more elements here like header, footer, etc. */}
            <CardContent>
                {children}
            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social/>
                    </CardFooter>
                )
            }
        </Card>
    );
}

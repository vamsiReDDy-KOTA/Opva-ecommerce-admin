"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        }];
    return (

        <nav className={cn('flex gap-3 items-center space-x-4 lg:space-x-15', className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn('text-sm font-medium transition-colors hover:text-primary',
                        route.active ? "text-black dark:text-white" : 'text-muted-foreground')}
                >
                    {route.label}
                </Link>
            ))}
        </nav>


    )
}
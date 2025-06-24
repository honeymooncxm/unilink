"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const getTitle = (pathname: string) => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/schedule')) return 'Schedule';
    if (pathname.startsWith('/clubs')) return 'Clubs';
    if (pathname.startsWith('/profile')) return 'Profile';
    return 'UniLink';
}

export function AppHeader() {
    const pathname = usePathname();
    const title = getTitle(pathname);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
            <div className="container flex h-16 items-center">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="flex flex-1 items-center justify-center md:justify-between">
                    <h1 className="text-xl font-bold">{title}</h1>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}

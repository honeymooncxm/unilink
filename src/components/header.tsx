"use client";

import { usePathname } from "next/navigation";

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
        <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
            <div className="container flex h-16 items-center justify-center">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
        </header>
    )
}

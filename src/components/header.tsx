"use client";

import { UniLinkLogo } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm transition-colors duration-300">
            <div className="container flex h-16 items-center justify-between">
                <UniLinkLogo className="size-8" />
                <ThemeToggle />
            </div>
        </header>
    )
}

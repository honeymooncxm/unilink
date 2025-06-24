"use client";

import { UniLinkLogo } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm transition-colors duration-300">
            <div className="container flex h-16 items-center justify-between">
                <UniLinkLogo className="size-8" />
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

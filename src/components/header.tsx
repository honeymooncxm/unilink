"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { MainNav } from "./main-nav";
import { UniLinkLogo } from "./icons";

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
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <UniLinkLogo className="size-8" />
                        <h1 className="text-lg font-semibold">UniLink</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <MainNav />
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
                    <div className="container flex h-16 items-center">
                        <div className="md:hidden">
                            <SidebarTrigger />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold hidden md:block">{title}</h1>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>
            </SidebarInset>
      </SidebarProvider>
    )
}

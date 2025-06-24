import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { UniLinkLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UniLink Schedule',
  description: 'A stunning university platform to streamline student appointments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <UniLinkLogo className="size-8 text-primary" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-sidebar-foreground">UniLink</h1>
                  <p className="text-xs text-sidebar-foreground/70">Schedule</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                {/* Placeholder for page title or breadcrumbs */}
              </div>
              <Button variant="ghost" size="icon">
                <Search className="size-5" />
              </Button>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

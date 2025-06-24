import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { MainNav } from '@/components/main-nav';
import { UniLinkLogo } from '@/components/icons';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'UniLink',
  description: 'A stunning university platform to streamline student appointments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="relative flex min-h-screen w-full">
              <Sidebar className="hidden md:flex">
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
              <div className="flex flex-1 flex-col md:pl-[16rem]">
                <AppHeader />
                <main className="flex-1 container py-6 pb-20 md:pb-6">{children}</main>
              </div>
            </div>
            <BottomNav />
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Users, User as ProfileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-primary text-primary-foreground/70 md:bg-background md:text-foreground md:border-t">
      <div className="container grid h-16 max-w-lg grid-cols-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
              pathname === item.href
                ? "text-primary md:text-primary"
                : "hover:text-primary/90 md:hover:text-primary/90"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

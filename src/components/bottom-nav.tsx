"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Users, User as ProfileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

const navItems = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/schedule", labelKey: "nav.schedule", icon: CalendarDays },
  { href: "/clubs", labelKey: "nav.clubs", icon: Users },
  { href: "/profile", labelKey: "nav.profile", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-primary text-primary-foreground/70 transition-colors duration-300">
      <div className="container grid h-16 max-w-lg grid-cols-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
              pathname === item.href
                ? "text-primary-foreground"
                : "hover:text-primary-foreground/90"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{t(item.labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

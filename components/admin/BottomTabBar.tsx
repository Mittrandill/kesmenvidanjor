"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/admin/nav-items";

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 border-t border-black/5 bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {navItems.map((tab) => {
        const active =
          tab.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex min-w-0 flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium transition-colors",
              active ? "text-brand-600" : "text-ink-500",
            )}
          >
            <Icon name={tab.icon} size={22} weight={active ? "fill" : "regular"} />
            <span className="truncate w-full text-center">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

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
      className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-5 border-t border-black/5 bg-white lg:hidden"
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
              "flex min-w-0 min-h-[56px] flex-col items-center justify-center gap-1 px-0.5 py-2 text-[10px] font-medium transition-colors active:bg-black/5",
              active ? "text-brand-600" : "text-ink-500",
            )}
          >
            <Icon name={tab.icon} size={23} weight={active ? "fill" : "regular"} />
            <span className="truncate w-full text-center">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

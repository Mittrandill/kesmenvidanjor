"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/admin/nav-items";

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex w-56 shrink-0 flex-col gap-1 border-r border-black/5 bg-white p-4">
      {navItems.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-50 text-brand-600"
                : "text-ink-600 hover:bg-black/5",
            )}
          >
            <Icon name={item.icon} size={20} weight={active ? "fill" : "regular"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

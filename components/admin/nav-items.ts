import type { IconName } from "@/components/ui/Icon";

export const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Özet", icon: "House" },
  { href: "/admin/randevular", label: "Randevular", icon: "CalendarBlank" },
  { href: "/admin/satislar", label: "Satışlar", icon: "CurrencyCircleDollar" },
  { href: "/admin/musteriler", label: "Müşteriler", icon: "Users" },
  { href: "/admin/hesaplar", label: "Hesaplar", icon: "Bank" },
];

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { primaryContact } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/bolgeler", label: "Bölgeler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Üst bilgi barı */}
      <div className="bg-ink-900 text-snow/90 text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Icon name="Clock" size={16} className="text-amber-glow" />
            7/24 Kesintisiz Vidanjör Hizmeti
          </span>
          <a
            href={`tel:${primaryContact.phoneRaw}`}
            className="inline-flex items-center gap-1.5 font-semibold hover:text-amber-glow transition-colors"
          >
            <Icon name="Phone" size={16} className="text-amber-glow" />
            {primaryContact.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Ana navigasyon */}
      <div className="bg-white/95 backdrop-blur border-b border-black/5 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Kesmen Vidanjör ana sayfa">
            <Image
              src="/images/logo.png"
              alt="Çeşme Kesmen Vidanjör logosu"
              width={1030}
              height={977}
              priority
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Masaüstü nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-ink-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryContact.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              <Icon name="Phone" size={18} />
              Hemen Ara
            </a>
            <button
              type="button"
              aria-label="Menü"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-xl text-ink-900 hover:bg-black/5"
            >
              <Icon name={open ? "X" : "List"} size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* Mobil menü */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-black/5 bg-white"
            >
              <div className="px-4 py-3 flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-3 rounded-lg text-base font-medium text-ink-800",
                      "hover:bg-brand-50 hover:text-brand-700 transition-colors",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

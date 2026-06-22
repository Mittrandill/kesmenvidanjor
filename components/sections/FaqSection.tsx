"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqs } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export function FaqSection({
  items = faqs,
  title = "Sıkça Sorulan Sorular",
}: {
  items?: FaqItem[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            SSS
          </p>
          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-ink-900 text-balance">
            {title}
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl ring-1 transition-colors",
                  isOpen ? "ring-brand-200 bg-brand-50/40" : "ring-black/5 bg-snow",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink-900">{f.q}</span>
                  <Icon
                    name="CaretDown"
                    size={20}
                    weight="bold"
                    className={cn(
                      "shrink-0 text-brand-600 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-ink-600 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

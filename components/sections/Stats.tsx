"use client";

import { motion } from "motion/react";
import { stats } from "@/lib/site-config";

export function Stats() {
  return (
    <section className="relative bg-ink-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 120 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-amber-glow">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm text-white/75 font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

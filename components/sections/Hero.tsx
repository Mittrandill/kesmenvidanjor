"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig, services } from "@/lib/site-config";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Icon } from "@/components/ui/Icon";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-gradient text-white">
      {/* Arka plan görseli */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt={`${siteConfig.name} ${siteConfig.vehicle.model} vidanjör`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-40 lg:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium ring-1 ring-white/15"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-glow opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-glow" />
            </span>
            7/24 Açık · Çeşme ve Tüm Çevre Bölgeler
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance"
          >
            Çeşme&apos;de{" "}
            <span className="text-amber-glow">7/24 Vidanjör</span> Hizmeti
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 text-lg text-white/85 leading-relaxed max-w-xl"
          >
            Foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu.
            Modern {siteConfig.vehicle.model} vidanjörümüzle hızlı, hijyenik ve
            uygun fiyatlı çözüm. Aradığınız an yola çıkıyoruz.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8"
          >
            <CtaButtons />
          </motion.div>

          {/* Hizmet rozetleri */}
          <motion.ul
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {services.map((s) => (
              <li
                key={s.slug}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3.5 py-2 text-sm font-medium ring-1 ring-white/10"
              >
                <Icon name={s.icon} size={18} className="text-amber-glow" />
                {s.shortName}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

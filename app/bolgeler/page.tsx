import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/lib/site-config";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Hizmet Bölgelerimiz — Çeşme ve Çevresi",
  description:
    "Çeşme, Ilıca, Alaçatı, Reisdere, Şifne, Çiftlikköy, Ovacık, Germiyan, Ildırı ve Dalyan'da 7/24 vidanjör hizmeti veriyoruz.",
  alternates: { canonical: "/bolgeler" },
};

export default function BolgelerPage() {
  return (
    <>
      <PageHero
        title="Hizmet Bölgelerimiz"
        subtitle="Çeşme ilçesinin tamamında 7/24 vidanjör hizmeti. Bölgenize tıklayarak detayları görün."
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Bölgeler", href: "/bolgeler" },
        ]}
      />
      <section className="py-16 lg:py-20 bg-snow">
        <div className="mx-auto max-w-7xl px-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.05}>
              <Link
                href={`/bolgeler/${r.slug}`}
                className="group flex flex-col h-full rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon name="MapPin" size={26} />
                  </span>
                  <h2 className="text-lg font-bold text-ink-900">{r.name}</h2>
                </div>
                <p className="mt-4 text-sm text-ink-600 leading-relaxed flex-1">
                  {r.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {r.name} vidanjör
                  <Icon
                    name="CaretRight"
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}

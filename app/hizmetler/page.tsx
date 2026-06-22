import type { Metadata } from "next";
import { services, siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Hizmetlerimiz — Foseptik, Kanal Açma, Rogar, Havuz Suyu",
  description:
    "Çeşme ve çevresinde foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu hizmetleri. 7/24 modern vidanjör ile profesyonel çözüm.",
  alternates: { canonical: "/hizmetler" },
};

export default function HizmetlerPage() {
  return (
    <>
      <PageHero
        title="Vidanjör Hizmetlerimiz"
        subtitle={`${siteConfig.vehicle.model} vidanjörümüzle Çeşme ve çevresinde tüm atık su ve temizlik çözümlerini tek elden sunuyoruz.`}
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
        ]}
      />
      <section className="py-16 lg:py-20 bg-snow">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <ServiceCard service={s} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}

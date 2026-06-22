import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, whyUs } from "@/lib/site-config";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/sections/Stats";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Hakkımızda — Çeşme Kesmen Vidanjör",
  description:
    "Çeşme Kesmen Vidanjör; yılların tecrübesi, modern Ford Cargo 2520 aracı ve 7/24 hizmet anlayışıyla Çeşme ve çevresinin güvenilir vidanjör firması.",
  alternates: { canonical: "/hakkimizda" },
};

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        subtitle="Çeşme ve çevresinin güvenilir vidanjör firması."
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Hakkımızda", href: "/hakkimizda" },
        ]}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-xl">
              <Image
                src="/images/hero.png"
                alt={`${siteConfig.name} ${siteConfig.vehicle.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-extrabold text-ink-900">
              Çeşme&apos;nin Güvenilir Vidanjörü
            </h2>
            <div className="mt-5 space-y-4 text-ink-600 leading-relaxed">
              <p>
                <strong className="text-ink-900">{siteConfig.name}</strong> olarak
                Çeşme ve çevresinde foseptik çekimi, kanal açma, rogar temizliği ve
                havuz suyu dolumu hizmetleri sunuyoruz. Yılların tecrübesi ve müşteri
                memnuniyetini ön planda tutan çalışma anlayışımızla bölgenin tercih
                edilen firmasıyız.
              </p>
              <p>
                Modern ve yüksek kapasiteli {siteConfig.vehicle.model} vidanjörümüzle
                işlerinizi hızlı, temiz ve hijyenik şekilde tamamlıyoruz. Yaz
                sezonunda yoğunlaşan talebe rağmen 7/24 ulaşılabilir olmamız sayesinde
                acil durumlarınızda yanınızdayız.
              </p>
              <p>
                Şeffaf fiyatlandırma, güler yüzlü ekip ve çevreye duyarlı çalışma
                prensibiyle hizmet veriyoruz. Çeşme, Ilıca, Alaçatı ve tüm çevre
                bölgelerde bir telefon kadar yakınınızdayız.
              </p>
            </div>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {whyUs.slice(0, 4).map((w) => (
                <li key={w.title} className="flex items-center gap-2.5">
                  <Icon name="CheckCircle" size={22} className="text-brand-600 shrink-0" />
                  <span className="text-sm font-medium text-ink-800">{w.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Stats />
      <CtaSection />
    </>
  );
}

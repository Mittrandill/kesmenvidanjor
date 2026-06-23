import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { regions, services, getRegion, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ bolge: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bolge: string }>;
}): Promise<Metadata> {
  const { bolge } = await params;
  const region = getRegion(bolge);
  if (!region) return {};
  const title = `${region.name} Vidanjör | 7/24 Foseptik & Kanal Açma`;
  return {
    title,
    description: `${region.name} bölgesinde 7/24 vidanjör hizmeti. Foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu. ${region.intro}`,
    alternates: { canonical: `/bolgeler/${region.slug}` },
    openGraph: { title, description: region.intro },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ bolge: string }>;
}) {
  const { bolge } = await params;
  const region = getRegion(bolge);
  if (!region) notFound();

  const url = `${siteConfig.url}/bolgeler/${region.slug}`;

  const regionFaqs = [
    {
      q: `${region.name} bölgesinde vidanjör ne kadar sürede gelir?`,
      a: `${region.name} ve çevresine en kısa sürede ulaşıyoruz. Acil durumlarda öncelik vererek 7/24 hizmet sağlıyoruz.`,
    },
    {
      q: `${region.name}'de hangi hizmetleri veriyorsunuz?`,
      a: `${region.name} bölgesinde foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu hizmetlerini sunuyoruz.`,
    },
    {
      q: `${region.name} vidanjör fiyatları ne kadar?`,
      a: `Fiyat; mesafe ve atık miktarına göre değişir. Net fiyat için bizi arayın, ücretsiz bilgi veriyoruz.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Ana Sayfa", url: siteConfig.url },
              { name: "Bölgeler", url: `${siteConfig.url}/bolgeler` },
              { name: region.name, url },
            ]),
          ),
        }}
      />

      <PageHero
        title={`${region.name} Vidanjör Hizmeti`}
        subtitle={region.intro}
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Bölgeler", href: "/bolgeler" },
          { name: region.name, href: `/bolgeler/${region.slug}` },
        ]}
      />

      <section className="py-16 lg:py-20 bg-snow">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ink-900">
              {region.name} Bölgesinde Vidanjör Hizmetlerimiz
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              {region.name} ve çevresinde 7/24 hizmet veriyoruz. Aşağıdaki
              hizmetlerden ihtiyacınız olana tıklayarak detayları görebilir, hemen
              teklif alabilirsiniz.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <ServiceCard
                  service={s}
                  href={`/${region.slug}/${s.slug}`}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>

          {/* Diğer bölgeler */}
          <div className="mt-14">
            <h3 className="text-lg font-bold text-ink-900">Diğer Hizmet Bölgeleri</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {regions
                .filter((r) => r.slug !== region.slug)
                .map((r) => (
                  <Link
                    key={r.slug}
                    href={`/bolgeler/${r.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink-700 ring-1 ring-black/5 hover:bg-brand-600 hover:text-white transition-colors"
                  >
                    <Icon name="MapPin" size={16} />
                    {r.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(regionFaqs)) }}
      />
      <FaqSection items={regionFaqs} title={`${region.name} — Sıkça Sorulan Sorular`} />
      <CtaSection title={`${region.name}'de Vidanjör mü Lazım?`} />
    </>
  );
}

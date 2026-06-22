import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  regions,
  services,
  getRegion,
  getService,
  siteConfig,
} from "@/lib/site-config";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { FaqSection } from "@/components/sections/FaqSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.flatMap((r) =>
    services.map((s) => ({ bolge: r.slug, hizmet: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bolge: string; hizmet: string }>;
}): Promise<Metadata> {
  const { bolge, hizmet } = await params;
  const region = getRegion(bolge);
  const service = getService(hizmet);
  if (!region || !service) return {};
  const title = `${region.name} ${service.name} | 7/24 Vidanjör`;
  return {
    title,
    description: `${region.name} ${service.name.toLowerCase()} hizmeti. ${service.summary} ${region.name} ve çevresinde 7/24 hizmet — hemen arayın.`,
    alternates: { canonical: `/${region.slug}/${service.slug}` },
    openGraph: { title, description: service.summary },
  };
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ bolge: string; hizmet: string }>;
}) {
  const { bolge, hizmet } = await params;
  const region = getRegion(bolge);
  const service = getService(hizmet);
  if (!region || !service) notFound();

  const url = `${siteConfig.url}/${region.slug}/${service.slug}`;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const comboFaqs = [
    {
      q: `${region.name} ${service.name.toLowerCase()} fiyatı ne kadar?`,
      a: `${region.name} bölgesinde ${service.name.toLowerCase()} ücreti; mesafe ve iş kapsamına göre değişir. Net ve uygun fiyat için bizi arayın.`,
    },
    {
      q: `${region.name}'de ne kadar sürede gelirsiniz?`,
      a: `${region.name} ve çevresine en kısa sürede ulaşıyoruz. Acil ${service.name.toLowerCase()} taleplerinde 7/24 öncelikli hizmet veriyoruz.`,
    },
    {
      q: `Hafta sonu ${service.name.toLowerCase()} yapıyor musunuz?`,
      a: `Evet, ${region.name} bölgesinde hafta içi, hafta sonu ve tatil günleri dahil 7/24 hizmet veriyoruz.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              `${region.name} ${service.name}`,
              `${region.name} bölgesinde ${service.summary}`,
              url,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Ana Sayfa", url: siteConfig.url },
              { name: region.name, url: `${siteConfig.url}/bolgeler/${region.slug}` },
              { name: service.name, url },
            ]),
          ),
        }}
      />

      <PageHero
        title={`${region.name} ${service.name}`}
        subtitle={`${region.name} ve çevresinde 7/24 ${service.name.toLowerCase()} hizmeti. ${service.tagline}.`}
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: region.name, href: `/bolgeler/${region.slug}` },
          { name: service.name, href: `/${region.slug}/${service.slug}` },
        ]}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                <Icon name={service.icon} size={30} />
              </span>
              <h2 className="text-2xl font-extrabold text-ink-900">
                {region.name} {service.name}
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed text-[15px]">
              <p>
                <strong className="text-ink-900">{region.name}</strong> bölgesinde{" "}
                {service.name.toLowerCase()} hizmeti arıyorsanız doğru yerdesiniz.{" "}
                {region.intro}
              </p>
              {service.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                {region.name} ve çevresindeki ev, villa, site, otel ve işyerlerine
                modern {siteConfig.vehicle.model} vidanjörümüzle hızlı ve hijyenik
                hizmet veriyoruz. 7/24 ulaşılabilir olmamız sayesinde acil
                durumlarda bile bekletmeden çözüm sunuyoruz.
              </p>
            </div>

            <h3 className="mt-10 text-xl font-bold text-ink-900">
              {region.name} {service.name} Hizmetimizin Avantajları
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-xl bg-snow p-3.5 ring-1 ring-black/5"
                >
                  <Icon name="CheckCircle" size={22} className="text-brand-600 shrink-0" />
                  <span className="text-sm font-medium text-ink-800">{f}</span>
                </li>
              ))}
            </ul>

            {/* Aynı bölgede diğer hizmetler */}
            <h3 className="mt-10 text-xl font-bold text-ink-900">
              {region.name}&apos;de Diğer Hizmetlerimiz
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${region.slug}/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-snow px-3.5 py-2 text-sm font-medium text-ink-700 ring-1 ring-black/5 hover:bg-brand-600 hover:text-white transition-colors"
                >
                  <Icon name={s.icon} size={16} />
                  {region.name} {s.shortName}
                </Link>
              ))}
            </div>
          </div>

          {/* Yan panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-ink-gradient text-white p-7 shadow-xl">
              <h3 className="text-xl font-bold">
                {region.name} {service.shortName} İçin Arayın
              </h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">
                7/24 hizmetinizdeyiz. Tek telefonla {region.name}&apos;de hızlı çözüm.
              </p>
              <CtaButtons
                className="mt-5"
                size="md"
                message={`Merhaba, ${region.name} bölgesinde ${service.name} hizmeti almak istiyorum.`}
              />
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(comboFaqs)) }}
      />
      <FaqSection
        items={comboFaqs}
        title={`${region.name} ${service.name} — Sıkça Sorulan Sorular`}
      />
    </>
  );
}

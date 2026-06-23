import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, regions, getService, siteConfig } from "@/lib/site-config";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { FaqSection } from "@/components/sections/FaqSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ hizmet: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hizmet: string }>;
}): Promise<Metadata> {
  const { hizmet } = await params;
  const service = getService(hizmet);
  if (!service) return {};
  const title = `Çeşme ${service.name} | 7/24 Vidanjör`;
  return {
    title,
    description: `Çeşme ve çevresinde ${service.name.toLowerCase()} hizmeti. ${service.summary} Hemen arayın, 7/24 hizmetinizdeyiz.`,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: { title, description: service.summary },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ hizmet: string }>;
}) {
  const { hizmet } = await params;
  const service = getService(hizmet);
  if (!service) notFound();

  const url = `${siteConfig.url}/hizmetler/${service.slug}`;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service.name, service.summary, url)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Ana Sayfa", url: siteConfig.url },
              { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
              { name: service.name, url },
            ]),
          ),
        }}
      />

      <PageHero
        title={`Çeşme ${service.name}`}
        subtitle={service.tagline}
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          { name: service.name, href: `/hizmetler/${service.slug}` },
        ]}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          {/* İçerik */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                <Icon name={service.icon} size={30} />
              </span>
              <h2 className="text-2xl font-extrabold text-ink-900">{service.name}</h2>
            </div>

            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed text-[15px]">
              {service.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-bold text-ink-900">Neler Sunuyoruz?</h3>
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

            {/* Bölge bağlantıları (long-tail iç linkleme) */}
            <h3 className="mt-10 text-xl font-bold text-ink-900">
              {service.name} Hizmeti Verdiğimiz Bölgeler
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {regions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}/${service.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-snow px-3.5 py-2 text-sm font-medium text-ink-700 ring-1 ring-black/5 hover:bg-brand-600 hover:text-white transition-colors"
                >
                  <Icon name="MapPin" size={16} />
                  {r.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Yan panel CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-ink-gradient text-white p-7 shadow-xl">
              <h3 className="text-xl font-bold">Hemen Teklif Alın</h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">
                7/24 hizmetinizdeyiz. Arayın, en kısa sürede adresinizdeyiz.
              </p>
              <CtaButtons className="mt-5" size="md" />

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-amber-glow">Diğer Hizmetler</p>
                <ul className="mt-3 space-y-2">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/hizmetler/${s.slug}`}
                        className="flex items-center gap-2 text-sm text-white/85 hover:text-amber-glow transition-colors"
                      >
                        <Icon name={s.icon} size={18} className="text-amber-glow" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <FaqSection />
    </>
  );
}

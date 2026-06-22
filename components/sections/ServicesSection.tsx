import { services } from "@/lib/site-config";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesSection({
  title = "Vidanjör Hizmetlerimiz",
  subtitle = "Çeşme ve çevresinde ihtiyacınız olan tüm atık su ve temizlik çözümleri tek elden.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id="hizmetler" className="py-20 lg:py-24 bg-snow">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Hizmetler
          </p>
          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-ink-900 text-balance">
            {title}
          </h2>
          <p className="mt-4 text-ink-600">{subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <ServiceCard service={s} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

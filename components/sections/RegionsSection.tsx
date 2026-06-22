import Link from "next/link";
import { regions } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function RegionsSection() {
  return (
    <section id="bolgeler" className="py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Hizmet Bölgeleri
          </p>
          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-ink-900 text-balance">
            Çeşme&apos;nin Her Noktasındayız
          </h2>
          <p className="mt-4 text-ink-600">
            Aşağıdaki tüm bölgelerde 7/24 vidanjör hizmeti veriyoruz. Bölgenize
            tıklayarak detayları görebilirsiniz.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {regions.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.04}>
              <Link
                href={`/bolgeler/${r.slug}`}
                className="group flex items-center gap-2.5 rounded-xl bg-snow px-4 py-3.5 ring-1 ring-black/5 transition-all hover:bg-brand-600 hover:ring-brand-600 hover:shadow-lg"
              >
                <Icon
                  name="MapPin"
                  size={20}
                  className="text-brand-600 group-hover:text-white shrink-0"
                />
                <span className="font-semibold text-ink-800 group-hover:text-white">
                  {r.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

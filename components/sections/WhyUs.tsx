import { whyUs } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function WhyUs() {
  return (
    <section className="py-20 lg:py-24 bg-snow">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Neden Biz?
          </p>
          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-ink-900 text-balance">
            Çeşme&apos;nin Güvenilir Vidanjörü
          </h2>
          <p className="mt-4 text-ink-600">
            Yılların tecrübesi, modern ekipman ve 7/24 ulaşılabilirlikle yanınızdayız.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 h-full">
                <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md shadow-brand-600/25">
                  <Icon name={item.icon} size={26} />
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

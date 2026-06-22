import { contacts } from "@/lib/site-config";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function CtaSection({
  title = "Vidanjör mü Lazım? Hemen Arayın!",
  text = "Çeşme ve çevresinde 7/24 hizmetinizdeyiz. Tek telefonla hızlı çözüm.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-balance">
            {title}
          </h2>
          <p className="mt-4 text-white/85 text-lg">{text}</p>

          <div className="mt-8 flex justify-center">
            <CtaButtons />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {contacts.map((c) => (
              <a
                key={c.phoneRaw}
                href={`tel:${c.phoneRaw}`}
                className="inline-flex items-center gap-2 text-lg font-bold hover:text-amber-glow transition-colors"
              >
                <Icon name="Phone" size={22} className="text-amber-glow" />
                <span className="font-normal text-white/70 text-sm">{c.name}:</span>
                {c.phoneDisplay}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { siteConfig, contacts, waLink } from "@/lib/site-config";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "İletişim — Çeşme Kesmen Vidanjör",
  description:
    "Çeşme Kesmen Vidanjör iletişim. 7/24 telefon, WhatsApp ve e-posta ile bize ulaşın. Foseptik, kanal açma ve vidanjör hizmetleri için hemen arayın.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <>
      <PageHero
        title="İletişim"
        subtitle="7/24 hizmetinizdeyiz. Telefon, WhatsApp veya formu kullanarak bize ulaşın; en kısa sürede dönüş yapalım."
        crumbs={[
          { name: "Ana Sayfa", href: "/" },
          { name: "İletişim", href: "/iletisim" },
        ]}
      />

      <section className="py-16 lg:py-20 bg-snow">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10">
          {/* İletişim bilgileri */}
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900">Bize Ulaşın</h2>
            <p className="mt-3 text-ink-600">
              Acil durumlar için doğrudan telefonla aramanız en hızlı çözümdür.
            </p>

            <div className="mt-8 space-y-4">
              {contacts.map((c) => (
                <div
                  key={c.phoneRaw}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                      <Icon name="Phone" size={26} />
                    </span>
                    <div>
                      <p className="text-sm text-ink-500">{c.name}</p>
                      <a
                        href={`tel:${c.phoneRaw}`}
                        className="text-lg font-bold text-ink-900 hover:text-brand-600"
                      >
                        {c.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <a
                    href={waLink(c.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} WhatsApp`}
                    className="grid place-items-center w-11 h-11 rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-colors"
                  >
                    <Icon name="WhatsappLogo" size={24} />
                  </a>
                </div>
              ))}

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5 hover:ring-brand-200 transition"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                  <Icon name="EnvelopeSimple" size={26} />
                </span>
                <div>
                  <p className="text-sm text-ink-500">E-posta</p>
                  <p className="text-lg font-bold text-ink-900">{siteConfig.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5 hover:ring-brand-200 transition"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                  <Icon name="InstagramLogo" size={26} />
                </span>
                <div>
                  <p className="text-sm text-ink-500">Instagram</p>
                  <p className="text-lg font-bold text-ink-900">
                    @{siteConfig.instagramHandle}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                  <Icon name="Clock" size={26} />
                </span>
                <div>
                  <p className="text-sm text-ink-500">Çalışma Saatleri</p>
                  <p className="text-lg font-bold text-ink-900">7 Gün 24 Saat Açık</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-black/5 shadow-sm">
            <h2 className="text-2xl font-extrabold text-ink-900">Teklif / Randevu Formu</h2>
            <p className="mt-2 text-ink-600 text-sm">
              Formu doldurun, en kısa sürede sizi arayalım.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

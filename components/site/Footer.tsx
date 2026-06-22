import Link from "next/link";
import {
  siteConfig,
  contacts,
  services,
  regions,
  primaryContact,
  waLink,
} from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-snow/80">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Marka */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-700 text-white">
              <Icon name="Truck" size={24} />
            </span>
            <span className="font-extrabold text-white text-lg tracking-tight">
              KESMEN VİDANJÖR
            </span>
          </div>
          <p className="text-sm leading-relaxed text-snow/70">
            {siteConfig.description}
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-600 transition-colors"
            >
              <Icon name="InstagramLogo" size={20} />
            </a>
            <a
              href={waLink(primaryContact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] transition-colors"
            >
              <Icon name="WhatsappLogo" size={20} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="E-posta"
              className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-amber-soft transition-colors"
            >
              <Icon name="EnvelopeSimple" size={20} />
            </a>
          </div>
        </div>

        {/* Hizmetler */}
        <div>
          <h3 className="text-white font-bold mb-4">Hizmetlerimiz</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="hover:text-amber-glow transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bölgeler */}
        <div>
          <h3 className="text-white font-bold mb-4">Hizmet Bölgeleri</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/bolgeler/${r.slug}`}
                  className="hover:text-amber-glow transition-colors"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="text-white font-bold mb-4">İletişim</h3>
          <ul className="space-y-3 text-sm">
            {contacts.map((c) => (
              <li key={c.phoneRaw}>
                <a
                  href={`tel:${c.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-amber-glow transition-colors"
                >
                  <Icon name="Phone" size={18} className="text-amber-glow shrink-0" />
                  <span>
                    <span className="block text-snow/60 text-xs">{c.name}</span>
                    <span className="font-semibold text-white">{c.phoneDisplay}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-amber-glow transition-colors"
              >
                <Icon name="EnvelopeSimple" size={18} className="text-amber-glow shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="MapPin" size={18} className="text-amber-glow shrink-0" />
              {siteConfig.address.locality}, {siteConfig.address.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-snow/60">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>Çeşme · Ilıca · Alaçatı ve tüm çevre bölgelerde 7/24 hizmet.</p>
        </div>
      </div>
    </footer>
  );
}

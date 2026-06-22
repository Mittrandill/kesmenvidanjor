<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Çeşme Kesmen Vidanjör

SEO odaklı vidanjör hizmeti tanıtım sitesi. Next.js 16 (App Router) + React 19 + Tailwind v4 + Motion + Phosphor (fill) ikonlar.

## Mimari
- **`lib/site-config.ts`** — TEK KAYNAK. Marka, telefon/WhatsApp, hizmetler, bölgeler, SSS, istatistikler. İçerik değişiklikleri buradan yapılır.
- **`lib/seo.ts`** — schema.org JSON-LD üreticileri (LocalBusiness/Plumber, Service, FAQPage, Breadcrumb).
- **`components/ui`** — Icon (Phosphor fill eşleyici), Reveal (Motion scroll), CtaButtons, ServiceCard, PageHero.
- **`components/sections`** — Hero, Services, Regions, WhyUs, Stats, Faq, Cta.
- **`components/site`** — Header, Footer, FloatingActions.

## Rotalar (hepsi SSG)
- `/`, `/hizmetler`, `/bolgeler`, `/hakkimizda`, `/iletisim`
- `/hizmetler/[hizmet]` (4), `/bolgeler/[bolge]` (10), `/[bolge]/[hizmet]` (40 long-tail)
- `dynamicParams = false` → tanımsız slug 404. `app/sitemap.ts` + `app/robots.ts` programatik.
- İletişim formu → `app/api/contact/route.ts` → Resend (`RESEND_API_KEY` yoksa loglar, hata vermez).

## Notlar
- Hero görseli `public/images/hero.jpg` (şu an geçici placeholder — gerçek AI üretimi ile değiştirilecek).
- Renkler: bordo (`brand-*`) + amber (`amber-glow`) + koyu (`ink-*`). Kar/kış teması YOK.
- Faz 2: Supabase + auth ile `/admin` (randevu + cari takibi).

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { localBusinessJsonLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Çeşme 7/24 Vidanjör, Foseptik & Kanal Açma`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Çeşme vidanjör",
    "Çeşme foseptik çekimi",
    "Çeşme kanal açma",
    "Alaçatı vidanjör",
    "Ilıca vidanjör",
    "rogar temizliği",
    "havuz suyu dolumu",
    "7/24 vidanjör",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Çeşme 7/24 Vidanjör Hizmeti`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero.png",
        width: 1456,
        height: 1092,
        alt: `${siteConfig.name} — ${siteConfig.vehicle.model}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Çeşme 7/24 Vidanjör`,
    description: siteConfig.description,
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={jakarta.variable}>
      <body className="min-h-screen bg-white text-ink-800 antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18265036171"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18265036171');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}

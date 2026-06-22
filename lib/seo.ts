// SEO yardımcıları: schema.org JSON-LD üreticileri
import { siteConfig, contacts, regions, services, faqs } from "./site-config";

const sameAs = [siteConfig.instagram];

// LocalBusiness — tüm sayfalarda (layout) kullanılır
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/hero.png`,
    telephone: contacts[0].phoneRaw,
    priceRange: "₺₺",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: regions.map((r) => ({
      "@type": "City",
      name: r.name,
    })),
    contactPoint: contacts.map((c) => ({
      "@type": "ContactPoint",
      telephone: c.phoneRaw,
      contactType: "customer service",
      name: c.name,
      areaServed: "TR",
      availableLanguage: "Turkish",
    })),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
    })),
    sameAs,
  };
}

export function serviceJsonLd(serviceName: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    url,
    serviceType: serviceName,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: regions.map((r) => ({ "@type": "City", name: r.name })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

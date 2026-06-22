// Çeşme Kesmen Vidanjör — tek kaynak (single source of truth)
// Tüm sayfalar, metadata, schema.org ve sitemap bu dosyadan beslenir.

export const siteConfig = {
  name: "Çeşme Kesmen Vidanjör",
  shortName: "Kesmen Vidanjör",
  legalName: "Çeşme Kesmen Vidanjör",
  description:
    "Çeşme ve çevresinde 7/24 vidanjör hizmeti. Foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu. Hızlı, profesyonel ve uygun fiyatlı.",
  slogan: "Çeşme'de 7/24 Vidanjör Hizmeti",
  url: "https://cesmekesmenvidanjor.com",
  email: "info@cesmekesmenvidanjor.com",
  instagram: "https://instagram.com/cesmekesmenvidanjor",
  instagramHandle: "cesmekesmenvidanjor",
  vehicle: {
    model: "Ford Cargo 2520",
    plate: "22 AL 1115",
  },
  // Konum (Çeşme merkez yaklaşık koordinat — Google için)
  geo: { lat: 38.3236, lng: 26.3056 },
  address: {
    locality: "Çeşme",
    region: "İzmir",
    country: "TR",
  },
} as const;

export type ContactPerson = {
  name: string;
  phoneDisplay: string;
  phoneRaw: string; // tel: için
  whatsapp: string; // wa.me için (90...)
};

export const contacts: ContactPerson[] = [
  {
    name: "Özer Kesmen",
    phoneDisplay: "0530 601 99 59",
    phoneRaw: "+905306019959",
    whatsapp: "905306019959",
  },
  {
    name: "Ergin Kesmen",
    phoneDisplay: "0538 525 04 09",
    phoneRaw: "+905385250409",
    whatsapp: "905385250409",
  },
];

// Birincil iletişim (header / hero / FAB)
export const primaryContact = contacts[0];

export const waMessage =
  "Merhaba, Çeşme Kesmen Vidanjör'den vidanjör hizmeti almak istiyorum.";

export function waLink(whatsapp: string, message: string = waMessage) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// HİZMETLER
// ---------------------------------------------------------------------------

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: string; // Phosphor ikon anahtarı (components/ui/Icon.tsx ile eşlenir)
  tagline: string;
  summary: string; // kart / liste açıklaması
  description: string[]; // hizmet sayfası paragrafları
  features: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "foseptik-cekimi",
    name: "Foseptik Çekimi",
    shortName: "Foseptik",
    icon: "Truck",
    tagline: "Hızlı ve hijyenik foseptik boşaltma",
    summary:
      "Dolmuş foseptik ve atık su çukurlarını güçlü vakum sistemiyle hızlı ve kokusuz şekilde boşaltıyoruz.",
    description: [
      "Çeşme ve çevresinde dolan foseptik çukurlarınızı modern vidanjörümüzle hızlı, temiz ve kokusuz bir şekilde boşaltıyoruz. Yüksek kapasiteli vakum sistemimiz sayesinde işlemi kısa sürede tamamlıyor, çevreye zarar vermeden atıkları güvenle uzaklaştırıyoruz.",
      "Ev, villa, site, otel, restoran ve işyerleri için periyodik foseptik çekim hizmeti veriyoruz. Yaz sezonunda yoğunlaşan talepte bile 7/24 ulaşılabilir olmamız sayesinde bekletmeden hizmet alırsınız.",
    ],
    features: [
      "Yüksek kapasiteli vakum ile hızlı boşaltma",
      "Kokusuz ve hijyenik çalışma",
      "Ev, villa, site, otel ve işyeri",
      "Periyodik bakım anlaşmaları",
    ],
    keywords: ["foseptik çekimi", "foseptik boşaltma", "vidanjör", "atık su çekimi"],
  },
  {
    slug: "kanal-acma",
    name: "Kanal Açma",
    shortName: "Kanal Açma",
    icon: "Wrench",
    tagline: "Tıkanan kanalları anında açıyoruz",
    summary:
      "Tıkanmış pis su kanallarını ve gider hatlarını profesyonel ekipmanlarla hızlıca açıyoruz.",
    description: [
      "Tıkanan kanalizasyon ve gider hatlarınızı basınçlı su ve profesyonel kanal açma ekipmanlarıyla hızlıca açıyoruz. Mutfak, banyo, tuvalet ve ana gider hatlarındaki tıkanıklıkları kalıcı şekilde gideriyoruz.",
      "Acil durumlarda 7/24 hizmet veriyoruz; taşma ve koku problemine yol açmadan en kısa sürede çözüm üretiyoruz.",
    ],
    features: [
      "Basınçlı su ile tıkanıklık açma",
      "Mutfak, banyo ve ana hat giderleri",
      "Acil 7/24 müdahale",
      "Kalıcı ve temiz çözüm",
    ],
    keywords: ["kanal açma", "tıkanıklık açma", "gider açma", "kanalizasyon açma"],
  },
  {
    slug: "rogar-temizligi",
    name: "Rogar Temizliği",
    shortName: "Rogar Temizliği",
    icon: "Drop",
    tagline: "Rogar ve baca temizliğinde uzman",
    summary:
      "Dolmuş rogarları ve atık su bacalarını temizleyip kötü kokuların önüne geçiyoruz.",
    description: [
      "Dolmuş ve tıkanmış rogarlarınızı, atık su bacalarınızı güçlü vakum ve basınçlı su sistemiyle eksiksiz temizliyoruz. Birikmiş katı atık ve çamuru çekerek hattın yeniden sağlıklı çalışmasını sağlıyoruz.",
      "Düzenli rogar temizliği taşma, koku ve tıkanıklık problemlerini önler. Site, apartman ve işyerleri için periyodik temizlik hizmeti sunuyoruz.",
    ],
    features: [
      "Vakum + basınçlı su ile derin temizlik",
      "Çamur ve katı atık tahliyesi",
      "Koku ve taşma önleme",
      "Site ve apartman çözümleri",
    ],
    keywords: ["rogar temizliği", "baca temizliği", "rogar açma", "atık su bacası"],
  },
  {
    slug: "havuz-suyu-dolumu",
    name: "Havuz Suyu Dolumu",
    shortName: "Havuz Suyu",
    icon: "SwimmingPool",
    tagline: "Temiz su ile hızlı havuz dolumu",
    summary:
      "Villa ve sitelerin yüzme havuzlarını temiz tankerle hızlı ve sorunsuz dolduruyoruz.",
    description: [
      "Çeşme, Alaçatı ve çevresindeki villa ve sitelerin yüzme havuzlarını temiz su tankerimizle hızlı bir şekilde dolduruyoruz. Sezon açılışında ve su seviyesi düşen havuzlarda bekletmeden hizmet alırsınız.",
      "Hijyenik tankerimiz ve yüksek hacimli taşıma kapasitemiz sayesinde havuzunuzu en kısa sürede kullanıma hazır hale getiriyoruz.",
    ],
    features: [
      "Temiz ve hijyenik su taşıma",
      "Villa ve site havuzları",
      "Sezon açılışı hızlı dolum",
      "Yüksek hacimli tanker",
    ],
    keywords: ["havuz suyu dolumu", "havuz suyu", "tankerle su taşıma", "havuz doldurma"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// HİZMET BÖLGELERİ
// ---------------------------------------------------------------------------

export type Region = {
  slug: string;
  name: string;
  intro: string; // bölge sayfası girişi (yerel bağlam)
};

export const regions: Region[] = [
  {
    slug: "cesme",
    name: "Çeşme",
    intro:
      "Çeşme merkez ve tüm mahallelerinde 7/24 vidanjör hizmeti veriyoruz. Yoğun yaz sezonunda bile hızlı müdahale ediyoruz.",
  },
  {
    slug: "ilica",
    name: "Ilıca",
    intro:
      "Ilıca'daki villa, site ve otellerde foseptik çekimi ve kanal açma taleplerine kısa sürede yanıt veriyoruz.",
  },
  {
    slug: "alacati",
    name: "Alaçatı",
    intro:
      "Alaçatı'daki butik oteller, taş evler ve villalar için hijyenik foseptik ve havuz suyu dolumu hizmeti sunuyoruz.",
  },
  {
    slug: "reisdere",
    name: "Reisdere",
    intro:
      "Reisdere ve çevresindeki konutlarda foseptik çekimi, rogar ve kanal temizliğini hızlıca yapıyoruz.",
  },
  {
    slug: "sifne",
    name: "Şifne",
    intro:
      "Şifne bölgesindeki tatil evleri ve işletmeler için 7/24 vidanjör ve atık su çözümleri sağlıyoruz.",
  },
  {
    slug: "ciftlikkoy",
    name: "Çiftlikköy",
    intro:
      "Çiftlikköy'de foseptik çekimi, kanal açma ve rogar temizliği için güvenilir vidanjör hizmeti veriyoruz.",
  },
  {
    slug: "ovacik",
    name: "Ovacık",
    intro:
      "Ovacık ve çevresindeki villalarda foseptik boşaltma ve havuz suyu dolumu taleplerinizi hızla karşılıyoruz.",
  },
  {
    slug: "germiyan",
    name: "Germiyan",
    intro:
      "Germiyan köyü ve çevresindeki konutlar için ekonomik ve hızlı vidanjör hizmeti sunuyoruz.",
  },
  {
    slug: "ildiri",
    name: "Ildırı",
    intro:
      "Ildırı'daki evler ve işletmelerde foseptik çekimi ve kanal açma hizmetini bekletmeden gerçekleştiriyoruz.",
  },
  {
    slug: "dalyan",
    name: "Dalyan",
    intro:
      "Dalyan bölgesindeki konut ve işyerlerinde 7/24 foseptik, rogar ve kanal açma hizmeti veriyoruz.",
  },
];

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug);
}

// ---------------------------------------------------------------------------
// SSS (genel) — FAQPage schema + SSS bölümü
// ---------------------------------------------------------------------------

export const faqs = [
  {
    q: "Çeşme'de vidanjör fiyatları ne kadar?",
    a: "Fiyat; bölge, mesafe ve çekilecek atık miktarına göre değişir. En doğru ve net fiyat için bizi telefonla arayabilir veya WhatsApp'tan ulaşabilirsiniz; ücretsiz bilgi veriyoruz.",
  },
  {
    q: "7/24 hizmet veriyor musunuz?",
    a: "Evet. Hafta içi, hafta sonu ve resmi tatiller dahil 7 gün 24 saat acil vidanjör hizmeti veriyoruz.",
  },
  {
    q: "Ne kadar sürede gelirsiniz?",
    a: "Çeşme ve çevre bölgelerde talebinizin yoğunluğuna göre genellikle kısa sürede adresinize ulaşıyoruz. Acil durumlarda öncelik veriyoruz.",
  },
  {
    q: "Hangi bölgelere hizmet veriyorsunuz?",
    a: "Çeşme, Ilıca, Alaçatı, Reisdere, Şifne, Çiftlikköy, Ovacık, Germiyan, Ildırı ve Dalyan başta olmak üzere Çeşme ilçesinin tamamına hizmet veriyoruz.",
  },
  {
    q: "Hangi hizmetleri sunuyorsunuz?",
    a: "Foseptik çekimi, kanal açma, rogar temizliği ve havuz suyu dolumu hizmetlerini modern vidanjörümüzle profesyonel olarak sunuyoruz.",
  },
];

// İstatistik widget'ları
export const stats = [
  { value: "7/24", label: "Kesintisiz Hizmet" },
  { value: "10+", label: "Hizmet Bölgesi" },
  { value: "15+", label: "Yıllık Tecrübe" },
  { value: "%100", label: "Müşteri Memnuniyeti" },
];

// "Neden biz" maddeleri
export const whyUs = [
  {
    icon: "Clock",
    title: "7/24 Acil Hizmet",
    text: "Gece gündüz, hafta sonu ve tatil demeden her an ulaşabileceğiniz vidanjör hizmeti.",
  },
  {
    icon: "Lightning",
    title: "Hızlı Müdahale",
    text: "Çeşme ve çevresinde kısa sürede adresinize ulaşır, işi bekletmeden çözeriz.",
  },
  {
    icon: "ShieldCheck",
    title: "Hijyenik & Temiz",
    text: "Kokusuz, temiz ve çevreye duyarlı çalışma prensibiyle hizmet veriyoruz.",
  },
  {
    icon: "Tag",
    title: "Uygun Fiyat",
    text: "Şeffaf fiyatlandırma, sürpriz maliyet yok. Aradığınızda net bilgi alırsınız.",
  },
  {
    icon: "Truck",
    title: "Modern Araç",
    text: "Yüksek kapasiteli Ford Cargo 2520 vidanjörümüzle güçlü ve verimli çözüm.",
  },
  {
    icon: "Handshake",
    title: "Güvenilir Ekip",
    text: "Yılların tecrübesiyle işini bilen, güler yüzlü ve güvenilir bir ekip.",
  },
];

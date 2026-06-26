// Google Ads dönüşüm takibi
// Label'ları Google Ads → Hedefler → Dönüşümler'den alıp buraya yapıştır
const ADS_ID = "AW-18265036171";

export const CONVERSION_LABELS = {
  phone: "",     // Google Ads'ten alacağın label, örn: "AbCdEfGhI"
  whatsapp: "",  // Google Ads'ten alacağın label, örn: "JkLmNoPqR"
};

function fireConversion(label: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const sendTo = label ? `${ADS_ID}/${label}` : ADS_ID;
  gtag("event", "conversion", { send_to: sendTo });
}

export const trackPhoneClick = () => fireConversion(CONVERSION_LABELS.phone);
export const trackWhatsAppClick = () => fireConversion(CONVERSION_LABELS.whatsapp);

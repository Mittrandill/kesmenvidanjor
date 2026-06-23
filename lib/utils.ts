import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Türkiye yaz saati uygulamasını 2016'da kaldırdı, yıl boyu UTC+3 sabit —
// bu yüzden tarih kütüphanesi yerine sabit ofset yeterli ve doğru.
const ISTANBUL_OFFSET = "+03:00";

/** ISO timestamptz değerini <input type="datetime-local"> için İstanbul saatine çevirir. */
export function toIstanbulInputValue(iso: string) {
  const istanbulMs = new Date(iso).getTime() + 3 * 60 * 60 * 1000;
  return new Date(istanbulMs).toISOString().slice(0, 16);
}

/** <input type="datetime-local"> değerini (İstanbul saati) doğru UTC instant'a çevirir. */
export function fromIstanbulInputValue(value: string) {
  return new Date(`${value}:00${ISTANBUL_OFFSET}`).toISOString();
}

/** "Bugün" sınırlarını İstanbul takvim gününe göre UTC ISO aralığı olarak döner. */
export function getIstanbulTodayRange() {
  const istanbulNow = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const y = istanbulNow.getUTCFullYear();
  const m = istanbulNow.getUTCMonth();
  const d = istanbulNow.getUTCDate();
  const start = new Date(Date.UTC(y, m, d) - 3 * 60 * 60 * 1000).toISOString();
  const end = new Date(Date.UTC(y, m, d + 1) - 3 * 60 * 60 * 1000).toISOString();
  return { start, end };
}

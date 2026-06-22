import { primaryContact, waLink, waMessage } from "@/lib/site-config";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  message?: string;
  size?: "md" | "lg";
};

// Çift CTA: Hemen Ara + WhatsApp. Tüm sayfalarda kullanılır.
export function CtaButtons({ className, message = waMessage, size = "lg" }: Props) {
  const pad = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm";
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      <a
        href={`tel:${primaryContact.phoneRaw}`}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white",
          "bg-brand-600 hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/30",
          pad,
        )}
      >
        <Icon name="Phone" size={20} />
        Hemen Ara
      </a>
      <a
        href={waLink(primaryContact.whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
          "bg-[#25D366] hover:bg-[#1ebe5b] text-white transition-colors shadow-lg shadow-[#25D366]/30",
          pad,
        )}
      >
        <Icon name="WhatsappLogo" size={20} />
        WhatsApp
      </a>
    </div>
  );
}

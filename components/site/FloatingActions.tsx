"use client";

import { motion } from "motion/react";
import { primaryContact, waLink } from "@/lib/site-config";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/gtag";
import { Icon } from "@/components/ui/Icon";

// Sağ altta yüzen WhatsApp + Ara butonları (her sayfada)
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
      <motion.a
        href={waLink(primaryContact.whatsapp)}
        onClick={trackWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yaz"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        className="grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40"
      >
        <Icon name="WhatsappLogo" size={30} />
      </motion.a>
      <motion.a
        href={`tel:${primaryContact.phoneRaw}`}
        onClick={trackPhoneClick}
        aria-label="Hemen ara"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        className="grid place-items-center w-14 h-14 rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/40"
      >
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-brand-600 opacity-60 animate-ping" />
        <Icon name="Phone" size={28} className="relative" />
      </motion.a>
    </div>
  );
}

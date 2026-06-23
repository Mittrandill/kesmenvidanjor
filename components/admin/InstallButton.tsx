"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

    function handler(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone) return null;

  if (deferredPrompt) {
    return (
      <button
        type="button"
        onClick={async () => {
          await deferredPrompt.prompt();
          await deferredPrompt.userChoice;
          setDeferredPrompt(null);
        }}
        className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-black/5"
      >
        <Icon name="DownloadSimple" size={18} />
        <span>Uygulamayı Yükle</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setShowIosTip((v) => !v)}
          aria-label="Ana ekrana ekle"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-black/5"
        >
          <Icon name="ShareFat" size={18} />
          <span>Ana Ekrana Ekle</span>
        </button>
        {showIosTip && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl bg-ink-900 p-3 text-xs leading-relaxed text-white shadow-lg">
            Bu paneli ana ekranınıza eklemek için: Safari&apos;nin araç çubuğundaki{" "}
            <strong>Paylaş</strong> düğmesine dokunun (adres çubuğunun yanında veya
            ekranın altındaki menüde bulunur), ardından açılan listeden{" "}
            <strong>&quot;Ana Ekrana Ekle&quot;</strong>yi seçin.
          </div>
        )}
      </div>
    );
  }

  return null;
}

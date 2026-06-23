"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@/components/ui/Icon";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-black/15" />
            <div className="flex items-center justify-between px-5 pt-3 pb-1">
              <h2 className="text-base font-bold text-ink-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="grid place-items-center w-8 h-8 rounded-full text-ink-500 hover:bg-black/5"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="px-5 pb-6 pt-3">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

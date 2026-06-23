"use client";

import { useTransition } from "react";
import { BottomSheet } from "@/components/admin/BottomSheet";
import { Icon } from "@/components/ui/Icon";

export function ConfirmSheet({
  open,
  onClose,
  title,
  message,
  confirmLabel = "Onayla",
  danger = false,
  action,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  action: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await action();
      onClose();
    });
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {danger && (
            <span className="grid shrink-0 place-items-center w-10 h-10 rounded-full bg-brand-50 text-brand-600">
              <Icon name="Warning" size={20} />
            </span>
          )}
          <p className="text-sm leading-relaxed text-ink-600">{message}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={handleConfirm}
            className={
              danger
                ? "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
                : "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
            }
          >
            {pending ? "İşleniyor..." : confirmLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-3.5 text-sm font-medium text-ink-500 hover:bg-black/5"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

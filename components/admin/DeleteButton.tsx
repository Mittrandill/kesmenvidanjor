"use client";

import { useState } from "react";
import { ConfirmSheet } from "@/components/admin/ConfirmSheet";
import { Icon } from "@/components/ui/Icon";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Sil"
        className="grid place-items-center w-9 h-9 rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
      >
        <Icon name="Trash" size={16} />
      </button>
      <ConfirmSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Kaydı Sil"
        message={confirmMessage}
        confirmLabel="Sil"
        danger
        action={action}
      />
    </>
  );
}

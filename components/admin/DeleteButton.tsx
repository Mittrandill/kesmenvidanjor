"use client";

import { Icon } from "@/components/ui/Icon";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="Sil"
        className="grid place-items-center w-8 h-8 rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
      >
        <Icon name="Trash" size={16} />
      </button>
    </form>
  );
}

"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-green-500" : "bg-black/15",
        disabled ? "opacity-60" : "cursor-pointer",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

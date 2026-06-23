import { cn } from "@/lib/utils";

const config = {
  planlandi: { label: "Planlandı", cls: "bg-amber-50 text-amber-700" },
  tamamlandi: { label: "Tamamlandı", cls: "bg-green-50 text-green-700" },
  iptal: { label: "İptal", cls: "bg-black/5 text-ink-500" },
} as const;

export function StatusBadge({
  status,
}: {
  status: "planlandi" | "tamamlandi" | "iptal";
}) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        c.cls,
      )}
    >
      {c.label}
    </span>
  );
}

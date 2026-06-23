import { cn } from "@/lib/utils";

const formatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
});

const typeLabel: Record<string, string> = {
  borc: "Hizmet Bedeli",
  tahsilat: "Tahsilat",
  iade: "İade",
};

export function LedgerEntryListItem({
  entry,
}: {
  entry: {
    id: number;
    entry_type: "borc" | "tahsilat" | "iade";
    amount: number;
    description: string | null;
    created_at: string;
  };
}) {
  const increasesDebt = entry.entry_type !== "tahsilat";

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <div className="min-w-0">
        <p className="font-semibold text-ink-900">{typeLabel[entry.entry_type]}</p>
        <p className="text-sm text-ink-500 truncate">
          {dateFormatter.format(new Date(entry.created_at))}
          {entry.description ? ` · ${entry.description}` : ""}
        </p>
      </div>
      <p
        className={cn(
          "font-bold shrink-0",
          increasesDebt ? "text-brand-600" : "text-green-600",
        )}
      >
        {increasesDebt ? "+" : "-"}
        {formatter.format(entry.amount)}
      </p>
    </div>
  );
}

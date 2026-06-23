import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export function AccountListItem({
  account,
}: {
  account: { id: number; name: string; type: "kasa" | "banka"; balance: number };
}) {
  return (
    <Link
      href={`/admin/hesaplar/${account.id}`}
      className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 hover:ring-brand-200 transition"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
          <Icon name={account.type === "kasa" ? "Wallet" : "Bank"} size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-ink-900 truncate">{account.name}</p>
          <p className="text-sm text-ink-500">
            {account.type === "kasa" ? "Kasa" : "Banka"}
          </p>
        </div>
      </div>
      <p className="font-bold text-ink-900 shrink-0">
        {currencyFormatter.format(account.balance)}
      </p>
    </Link>
  );
}

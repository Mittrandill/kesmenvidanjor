import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSale } from "@/app/admin/(authed)/satislar/actions";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" });
const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export function SaleListItem({
  sale,
}: {
  sale: {
    id: number;
    customer_id: number;
    customer_name?: string;
    description: string | null;
    amount: number;
    created_at: string;
    invoice_required: boolean;
    invoice_number: string | null;
  };
}) {
  const invoicePending = sale.invoice_required && !sale.invoice_number;

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <Link
        href={`/admin/satislar/${sale.id}`}
        className="flex items-center gap-3 p-4 hover:bg-black/[0.015]"
      >
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
          <Icon name="Receipt" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink-900 truncate">
            {sale.customer_name ?? "—"}
          </p>
          <p className="text-sm text-ink-500 truncate">
            {sale.description ?? "—"} · {dateFormatter.format(new Date(sale.created_at))}
          </p>
          {invoicePending && (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
              <Icon name="WarningCircle" size={12} />
              Fatura Bekliyor
            </span>
          )}
        </div>
        <p className="shrink-0 font-bold text-brand-600">
          {currencyFormatter.format(sale.amount)}
        </p>
      </Link>
      <div className="flex items-center justify-end border-t border-black/5 px-2 py-1">
        <DeleteButton
          action={deleteSale.bind(null, sale.id)}
          confirmMessage="Bu satış kaydını silmek istediğinize emin misiniz?"
        />
      </div>
    </div>
  );
}

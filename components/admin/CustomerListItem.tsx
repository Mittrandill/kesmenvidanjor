import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BalanceDisplay } from "@/components/admin/BalanceDisplay";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCustomer } from "@/app/admin/(authed)/musteriler/actions";

export function CustomerListItem({
  customer,
}: {
  customer: {
    id: number;
    name: string;
    phone: string | null;
    region: string | null;
    balance: number;
  };
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <Link
        href={`/admin/musteriler/${customer.id}`}
        className="flex items-center justify-between gap-3 p-4 hover:bg-black/[0.015]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
            <Icon name="Users" size={22} />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink-900 truncate">{customer.name}</p>
            <p className="text-sm text-ink-500 truncate">
              {customer.phone ?? "—"}
              {customer.region ? ` · ${customer.region}` : ""}
            </p>
          </div>
        </div>
        <BalanceDisplay balance={customer.balance} size="sm" />
      </Link>
      <div className="flex items-center justify-end border-t border-black/5 px-2 py-1">
        <DeleteButton
          action={deleteCustomer.bind(null, customer.id)}
          confirmMessage={`${customer.name} silinsin mi? Müşteriye ait TÜM randevu ve cari hareket geçmişi de silinecektir. Bu işlem geri alınamaz.`}
        />
      </div>
    </div>
  );
}

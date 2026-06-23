import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/ui/Icon";
import { SaleEditForm } from "@/components/admin/SaleEditForm";
import { EditSheetTrigger } from "@/components/admin/EditSheetTrigger";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateSale, deleteSale } from "@/app/admin/(authed)/satislar/actions";

export const metadata: Metadata = { title: "Satış Detayı", robots: { index: false } };

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});
const typeLabel: Record<string, string> = {
  borc: "Hizmet Bedeli (Borç)",
  tahsilat: "Tahsilat",
  iade: "İade",
};

export default async function SatisDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const saleId = Number(id);

  const supabase = await createClient();
  const [{ data: sale }, { data: customers }, { data: accounts }] = await Promise.all([
    supabase
      .from("ledger_entries")
      .select(
        "id,customer_id,entry_type,amount,description,created_at,payment_method,account_id,invoice_required,invoice_number,customers(name)",
      )
      .eq("id", saleId)
      .single(),
    supabase.from("customers").select("id,name").order("name", { ascending: true }),
    supabase.from("accounts").select("id,name").order("name", { ascending: true }),
  ]);

  if (!sale) {
    notFound();
  }

  const boundUpdate = updateSale.bind(null, saleId);
  const boundDelete = deleteSale.bind(null, saleId);

  return (
    <div className="space-y-4 max-w-lg">
      <Link
        href="/admin/satislar"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Satışlar
      </Link>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-extrabold text-ink-900">
            {sale.customers?.name ?? "—"}
          </h1>
          <p className="text-xl font-extrabold text-brand-600">
            {currencyFormatter.format(sale.amount)}
          </p>
        </div>

        <dl className="mt-4 space-y-2 border-t border-black/5 pt-4 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Tip</dt>
            <dd className="text-ink-800">{typeLabel[sale.entry_type]}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Açıklama</dt>
            <dd className="text-ink-800">{sale.description ?? "—"}</dd>
          </div>
          {sale.entry_type === "borc" && sale.invoice_required && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-500">Fatura</dt>
              <dd className="text-ink-800">
                {sale.invoice_number ? (
                  sale.invoice_number
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-600">
                    <Icon name="WarningCircle" size={14} />
                    Fatura Bekliyor
                  </span>
                )}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-4 flex gap-2">
          <EditSheetTrigger sheetTitle="Kaydı Düzenle">
            <SaleEditForm
              action={boundUpdate}
              customers={customers ?? []}
              accounts={accounts ?? []}
              defaultValues={{
                customer_id: sale.customer_id,
                entry_type: sale.entry_type,
                amount: sale.amount,
                description: sale.description,
                payment_method: sale.payment_method,
                account_id: sale.account_id,
                invoice_required: sale.invoice_required,
                invoice_number: sale.invoice_number,
              }}
            />
          </EditSheetTrigger>
          <DeleteButton
            action={boundDelete}
            confirmMessage="Bu kaydı silmek istediğinize emin misiniz?"
          />
        </div>
      </div>
    </div>
  );
}

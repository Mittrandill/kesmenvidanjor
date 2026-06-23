import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/ui/Icon";
import { SaleEditForm } from "@/components/admin/SaleEditForm";
import { updateSale } from "@/app/admin/(authed)/satislar/actions";

export const metadata: Metadata = { title: "Satışı Düzenle", robots: { index: false } };

export default async function SatisDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const saleId = Number(id);

  const supabase = await createClient();
  const [{ data: sale }, { data: customers }] = await Promise.all([
    supabase
      .from("ledger_entries")
      .select("id,customer_id,entry_type,amount,description")
      .eq("id", saleId)
      .single(),
    supabase.from("customers").select("id,name").order("name", { ascending: true }),
  ]);

  if (!sale) {
    notFound();
  }

  const boundUpdate = updateSale.bind(null, saleId);

  return (
    <div className="space-y-4 max-w-lg">
      <Link
        href="/admin/satislar"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Satışlar
      </Link>
      <h1 className="text-xl font-extrabold text-ink-900">Kaydı Düzenle</h1>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <SaleEditForm
          action={boundUpdate}
          customers={customers ?? []}
          defaultValues={{
            customer_id: sale.customer_id,
            entry_type: sale.entry_type,
            amount: sale.amount,
            description: sale.description,
          }}
        />
      </div>
    </div>
  );
}

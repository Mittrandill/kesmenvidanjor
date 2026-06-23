import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SaleForm } from "@/components/admin/SaleForm";
import { createSale } from "@/app/admin/(authed)/satislar/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Yeni Satış", robots: { index: false } };

export default async function YeniSatisPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("id,name")
    .order("name", { ascending: true });

  return (
    <div className="space-y-4 max-w-lg pb-20 lg:pb-0">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Özet
      </Link>
      <h1 className="text-xl font-extrabold text-ink-900">Yeni Satış</h1>
      <p className="text-sm text-ink-500">
        Randevu oluşturmadan doğrudan bir hizmet bedelini müşterinin cari
        hesabına işleyin.
      </p>

      {customers && customers.length > 0 ? (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <SaleForm action={createSale} customers={customers} />
        </div>
      ) : (
        <p className="rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Önce bir müşteri eklemelisiniz.{" "}
          <Link href="/admin/musteriler/yeni" className="text-brand-600 font-semibold">
            Müşteri ekle
          </Link>
        </p>
      )}
    </div>
  );
}

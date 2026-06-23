import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/ui/Icon";
import { BalanceDisplay } from "@/components/admin/BalanceDisplay";
import { CustomerForm } from "@/components/admin/CustomerForm";
import { AppointmentListItem } from "@/components/admin/AppointmentListItem";
import { LedgerEntryListItem } from "@/components/admin/LedgerEntryListItem";
import { LedgerEntryForm } from "@/components/admin/LedgerEntryForm";
import {
  updateCustomer,
  createLedgerEntry,
} from "@/app/admin/(authed)/musteriler/actions";

export const metadata: Metadata = { title: "Müşteri Detayı", robots: { index: false } };

export default async function MusteriDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customerId = Number(id);

  const supabase = await createClient();
  const [
    { data: customer },
    { data: balanceRow },
    { data: appointments },
    { data: ledgerEntries },
  ] = await Promise.all([
    supabase.from("customers").select("*").eq("id", customerId).single(),
    supabase
      .from("customer_balances")
      .select("balance")
      .eq("customer_id", customerId)
      .maybeSingle(),
    supabase
      .from("appointments")
      .select("id,customer_id,service_slug,scheduled_at,status")
      .eq("customer_id", customerId)
      .order("scheduled_at", { ascending: false })
      .limit(5),
    supabase
      .from("ledger_entries")
      .select("id,entry_type,amount,description,created_at")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (!customer) {
    notFound();
  }

  const boundUpdate = updateCustomer.bind(null, customerId);
  const boundCreateLedgerEntry = createLedgerEntry.bind(null, customerId);

  return (
    <div className="space-y-6 max-w-lg">
      <Link
        href="/admin/musteriler"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Müşteriler
      </Link>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-ink-900">{customer.name}</h1>
            <p className="mt-1 text-sm text-ink-500">
              {customer.phone ?? "—"}
              {customer.region ? ` · ${customer.region}` : ""}
            </p>
          </div>
          <BalanceDisplay balance={balanceRow?.balance ?? 0} />
        </div>
      </div>

      <LedgerEntryForm action={boundCreateLedgerEntry} />

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-500">Cari Hareketler</h2>
          {ledgerEntries && ledgerEntries.length > 0 && (
            <Link
              href={`/admin/satislar?customer_id=${customerId}`}
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              Satış Geçmişini Gör →
            </Link>
          )}
        </div>
        {ledgerEntries && ledgerEntries.length > 0 ? (
          <div className="space-y-2">
            {ledgerEntries.map((entry) => (
              <LedgerEntryListItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm text-ink-500 ring-1 ring-black/5">
            Henüz cari hareket yok.
          </p>
        )}
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-500">Randevu Geçmişi</h2>
          {appointments && appointments.length > 0 && (
            <Link
              href={`/admin/randevular?customer_id=${customerId}`}
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              Tüm Randevuları Gör →
            </Link>
          )}
        </div>
        {appointments && appointments.length > 0 ? (
          <div className="space-y-2">
            {appointments.map((a) => (
              <AppointmentListItem key={a.id} appointment={a} showCustomer={false} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm text-ink-500 ring-1 ring-black/5">
            Henüz randevu yok.
          </p>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h2 className="mb-4 text-sm font-semibold text-ink-500">Müşteriyi Düzenle</h2>
        <CustomerForm
          action={boundUpdate}
          defaultValues={customer}
          submitLabel="Değişiklikleri Kaydet"
        />
      </section>
    </div>
  );
}

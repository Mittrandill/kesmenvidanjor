import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getIstanbulTodayRange } from "@/lib/utils";
import { StatCard } from "@/components/admin/StatCard";
import { AppointmentListItem } from "@/components/admin/AppointmentListItem";
import { LedgerEntryListItem } from "@/components/admin/LedgerEntryListItem";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Özet", robots: { index: false } };

const formatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { start, end } = getIstanbulTodayRange();

  const [
    { data: todayAppointments },
    { count: planlandiCount },
    { data: balances },
    { data: recentLedgerEntries },
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select("id,customer_id,service_slug,scheduled_at,status,customers(name)")
      .gte("scheduled_at", start)
      .lt("scheduled_at", end)
      .order("scheduled_at", { ascending: true }),
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "planlandi"),
    supabase.from("customer_balances").select("balance"),
    supabase
      .from("ledger_entries")
      .select("id,entry_type,amount,description,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalPendingBalance = (balances ?? [])
    .map((b) => b.balance ?? 0)
    .filter((b) => b > 0)
    .reduce((sum, b) => sum + b, 0);

  const todayList = (todayAppointments ?? []).map((a) => ({
    id: a.id,
    customer_id: a.customer_id,
    customer_name: a.customers?.name,
    service_slug: a.service_slug,
    scheduled_at: a.scheduled_at,
    status: a.status,
  }));

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-extrabold text-ink-900">Özet</h1>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-ink-500">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/admin/randevular/yeni"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="Plus" size={16} weight="bold" />
            Yeni Randevu
          </Link>
          <Link
            href="/admin/satislar/yeni"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="Plus" size={16} weight="bold" />
            Yeni Satış
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Bugünkü Randevu"
          value={String(todayList.length)}
          icon="CalendarBlank"
          tone="brand"
        />
        <StatCard
          label="Planlanan Randevu"
          value={String(planlandiCount ?? 0)}
          icon="Clock"
          tone="amber"
        />
        <StatCard
          label="Bekleyen Tahsilat"
          value={formatter.format(totalPendingBalance)}
          icon="CurrencyCircleDollar"
          tone="brand"
        />
        <StatCard
          label="Son Hareketler"
          value={String(recentLedgerEntries?.length ?? 0)}
          icon="List"
        />
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-ink-500">Bugünkü Randevular</h2>
        {todayList.length > 0 ? (
          <div className="space-y-2">
            {todayList.map((a) => (
              <AppointmentListItem key={a.id} appointment={a} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm text-ink-500 ring-1 ring-black/5">
            Bugün için randevu yok.
          </p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-ink-500">Son Cari Hareketler</h2>
        {recentLedgerEntries && recentLedgerEntries.length > 0 ? (
          <div className="space-y-2">
            {recentLedgerEntries.map((entry) => (
              <LedgerEntryListItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm text-ink-500 ring-1 ring-black/5">
            Henüz cari hareket yok.
          </p>
        )}
      </section>
    </div>
  );
}

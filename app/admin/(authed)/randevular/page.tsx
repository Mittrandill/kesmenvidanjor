import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { AppointmentListItem } from "@/components/admin/AppointmentListItem";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Randevular", robots: { index: false } };

type Status = "planlandi" | "tamamlandi" | "iptal";

const tabs: { value: Status | "tumu"; label: string }[] = [
  { value: "tumu", label: "Tümü" },
  { value: "planlandi", label: "Planlandı" },
  { value: "tamamlandi", label: "Tamamlandı" },
  { value: "iptal", label: "İptal" },
];

export default async function RandevularPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = (status as Status | undefined) ?? undefined;

  const supabase = await createClient();
  let query = supabase
    .from("appointments")
    .select("id,customer_id,service_slug,scheduled_at,status,customers(name)")
    .order("scheduled_at", { ascending: false });

  if (activeStatus) {
    query = query.eq("status", activeStatus);
  }

  const { data: appointments } = await query;

  const list = (appointments ?? []).map((a) => ({
    id: a.id,
    customer_id: a.customer_id,
    customer_name: a.customers?.name,
    service_slug: a.service_slug,
    scheduled_at: a.scheduled_at,
    status: a.status,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink-900">Randevular</h1>
        <Link
          href="/admin/randevular/yeni"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Icon name="Plus" size={16} weight="bold" />
          Yeni Randevu
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive =
            tab.value === "tumu" ? !activeStatus : activeStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={
                tab.value === "tumu"
                  ? "/admin/randevular"
                  : `/admin/randevular?status=${tab.value}`
              }
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-600 text-white"
                  : "bg-white text-ink-600 ring-1 ring-black/10",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Bu durumda randevu bulunamadı.
        </p>
      ) : (
        <div className="space-y-2">
          {list.map((a) => (
            <AppointmentListItem key={a.id} appointment={a} />
          ))}
        </div>
      )}
    </div>
  );
}

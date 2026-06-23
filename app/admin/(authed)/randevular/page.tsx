import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/lib/site-config";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAppointment } from "@/app/admin/(authed)/randevular/actions";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Randevular", robots: { index: false } };

type Status = "planlandi" | "tamamlandi" | "iptal";

const tabs: { value: Status | "tumu"; label: string }[] = [
  { value: "tumu", label: "Tümü" },
  { value: "planlandi", label: "Planlandı" },
  { value: "tamamlandi", label: "Tamamlandı" },
  { value: "iptal", label: "İptal" },
];

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
});

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
    .select("id,customer_id,service_slug,scheduled_at,region,status,customers(name)")
    .order("scheduled_at", { ascending: false });

  if (activeStatus) {
    query = query.eq("status", activeStatus);
  }

  const { data: appointments } = await query;
  const list = appointments ?? [];

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
        <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="px-4 py-3 whitespace-nowrap">Müşteri</th>
                <th className="px-4 py-3 whitespace-nowrap">Hizmet</th>
                <th className="px-4 py-3 whitespace-nowrap">Tarih / Saat</th>
                <th className="px-4 py-3 whitespace-nowrap">Bölge</th>
                <th className="px-4 py-3 whitespace-nowrap">Durum</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const service = getService(a.service_slug);
                return (
                  <tr
                    key={a.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-ink-900">
                      {a.customers?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {service?.name ?? a.service_slug}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {dateFormatter.format(new Date(a.scheduled_at))}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {a.region ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/randevular/${a.id}`}
                          aria-label="Düzenle"
                          className="grid place-items-center w-8 h-8 rounded-lg text-ink-500 hover:bg-black/5 hover:text-brand-600"
                        >
                          <Icon name="PencilSimple" size={16} />
                        </Link>
                        <DeleteButton
                          action={deleteAppointment.bind(null, a.id)}
                          confirmMessage="Bu randevuyu kalıcı olarak silmek istediğinize emin misiniz?"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

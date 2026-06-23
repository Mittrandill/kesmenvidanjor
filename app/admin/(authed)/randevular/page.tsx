import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/lib/site-config";
import { AppointmentRow } from "@/components/admin/AppointmentRow";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { RowActions } from "@/components/admin/RowActions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AppointmentCard } from "@/components/admin/AppointmentCard";
import { Pagination } from "@/components/admin/Pagination";
import { deleteAppointment } from "@/app/admin/(authed)/randevular/actions";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Randevular", robots: { index: false } };

type Status = "planlandi" | "tamamlandi" | "iptal";
const PAGE_SIZE = 20;

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
  searchParams: Promise<{ status?: string; page?: string; customer_id?: string }>;
}) {
  const { status, page: pageParam, customer_id: customerIdParam } = await searchParams;
  const activeStatus = (status as Status | undefined) ?? undefined;
  const customerId = customerIdParam ? Number(customerIdParam) : undefined;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  let query = supabase
    .from("appointments")
    .select("id,customer_id,service_slug,scheduled_at,region,status,customers(name)", {
      count: "exact",
    })
    .order("scheduled_at", { ascending: false })
    .range(from, to);

  if (activeStatus) {
    query = query.eq("status", activeStatus);
  }
  if (customerId) {
    query = query.eq("customer_id", customerId);
  }

  const { data: appointments, count } = await query;
  const list = appointments ?? [];
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (activeStatus) params.set("status", activeStatus);
    if (customerId) params.set("customer_id", String(customerId));
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/admin/randevular?${qs}` : "/admin/randevular";
  }

  const customerName = list[0]?.customers?.name;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-ink-900">Randevular</h1>
          {customerId && (
            <p className="mt-0.5 text-sm text-ink-500">
              {customerName ? `${customerName} müşterisinin randevuları` : "Filtrelendi"} ·{" "}
              <Link href="/admin/randevular" className="text-brand-600 hover:underline">
                Tüm Randevular
              </Link>
            </p>
          )}
        </div>
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
          const href =
            tab.value === "tumu"
              ? customerId
                ? `/admin/randevular?customer_id=${customerId}`
                : "/admin/randevular"
              : `/admin/randevular?status=${tab.value}${customerId ? `&customer_id=${customerId}` : ""}`;
          return (
            <Link
              key={tab.value}
              href={href}
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
        <>
          <div className="hidden lg:block overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
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
                    <AppointmentRow key={a.id} id={a.id}>
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
                        <StatusSelect id={a.id} status={a.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <RowActions>
                          <DeleteButton
                            action={deleteAppointment.bind(null, a.id)}
                            confirmMessage="Bu randevuyu kalıcı olarak silmek istediğinize emin misiniz?"
                          />
                        </RowActions>
                      </td>
                    </AppointmentRow>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden space-y-2">
            {list.map((a) => (
              <AppointmentCard
                key={a.id}
                appointment={{
                  id: a.id,
                  customer_id: a.customer_id,
                  customer_name: a.customers?.name,
                  service_slug: a.service_slug,
                  scheduled_at: a.scheduled_at,
                  region: a.region,
                  status: a.status,
                }}
              />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
        </>
      )}
    </div>
  );
}

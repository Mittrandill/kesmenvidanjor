import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Pagination } from "@/components/admin/Pagination";
import { deleteSale } from "@/app/admin/(authed)/satislar/actions";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Satışlar", robots: { index: false } };

const PAGE_SIZE = 20;
const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" });
const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export default async function SatislarPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; customer_id?: string }>;
}) {
  const { page: pageParam, customer_id: customerIdParam } = await searchParams;
  const customerId = customerIdParam ? Number(customerIdParam) : undefined;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  let query = supabase
    .from("ledger_entries")
    .select(
      "id,amount,description,created_at,related_appointment_id,customer_id,customers(name)",
      { count: "exact" },
    )
    .eq("entry_type", "borc")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (customerId) {
    query = query.eq("customer_id", customerId);
  }

  const { data: sales, count } = await query;
  const list = sales ?? [];
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  const customerName = list[0]?.customers?.name;

  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (customerId) params.set("customer_id", String(customerId));
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/admin/satislar?${qs}` : "/admin/satislar";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-ink-900">Satışlar</h1>
          {customerId && (
            <p className="mt-0.5 text-sm text-ink-500">
              {customerName ? `${customerName} müşterisinin satışları` : "Filtrelendi"} ·{" "}
              <Link href="/admin/satislar" className="text-brand-600 hover:underline">
                Tüm Satışlar
              </Link>
            </p>
          )}
        </div>
        <Link
          href="/admin/satislar/yeni"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Icon name="Plus" size={16} weight="bold" />
          Yeni Satış
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Henüz satış kaydı yok.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3 whitespace-nowrap">Tarih</th>
                  <th className="px-4 py-3 whitespace-nowrap">Müşteri</th>
                  <th className="px-4 py-3 whitespace-nowrap">Açıklama</th>
                  <th className="px-4 py-3 whitespace-nowrap">Tutar</th>
                  <th className="px-4 py-3 whitespace-nowrap">Randevu</th>
                  <th className="px-4 py-3 whitespace-nowrap text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {dateFormatter.format(new Date(s.created_at))}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-ink-900">
                      <Link
                        href={`/admin/musteriler/${s.customer_id}`}
                        className="hover:text-brand-600"
                      >
                        {s.customers?.name ?? "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{s.description ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-brand-600">
                      {currencyFormatter.format(s.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {s.related_appointment_id ? (
                        <Link
                          href={`/admin/randevular/${s.related_appointment_id}`}
                          className="text-brand-600 hover:underline"
                        >
                          #{s.related_appointment_id}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/satislar/${s.id}`}
                          aria-label="Düzenle"
                          className="grid place-items-center w-8 h-8 rounded-lg text-ink-500 hover:bg-black/5 hover:text-brand-600"
                        >
                          <Icon name="PencilSimple" size={16} />
                        </Link>
                        <DeleteButton
                          action={deleteSale.bind(null, s.id)}
                          confirmMessage="Bu satış kaydını silmek istediğinize emin misiniz?"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
        </>
      )}
    </div>
  );
}

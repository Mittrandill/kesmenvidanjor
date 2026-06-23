import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BalanceDisplay } from "@/components/admin/BalanceDisplay";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CustomerListItem } from "@/components/admin/CustomerListItem";
import { Pagination } from "@/components/admin/Pagination";
import { deleteCustomer } from "@/app/admin/(authed)/musteriler/actions";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Müşteriler", robots: { index: false } };

const PAGE_SIZE = 20;

export default async function MusterilerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data: customers, count } = await supabase
    .from("customers")
    .select("id,name,phone,region", { count: "exact" })
    .order("name", { ascending: true })
    .range(from, to);

  const ids = (customers ?? []).map((c) => c.id);
  const { data: balances } =
    ids.length > 0
      ? await supabase.from("customer_balances").select("customer_id,balance").in(
          "customer_id",
          ids,
        )
      : { data: [] };

  const balanceMap = new Map(
    (balances ?? []).map((b) => [b.customer_id, b.balance ?? 0]),
  );
  const list = (customers ?? []).map((c) => ({
    ...c,
    balance: balanceMap.get(c.id) ?? 0,
  }));
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  function buildHref(targetPage: number) {
    return targetPage > 1 ? `/admin/musteriler?page=${targetPage}` : "/admin/musteriler";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink-900">Müşteriler</h1>
        <Link
          href="/admin/musteriler/yeni"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Icon name="Plus" size={16} weight="bold" />
          Yeni Müşteri
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Henüz müşteri eklenmemiş.
        </p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3 whitespace-nowrap">Ad Soyad</th>
                  <th className="px-4 py-3 whitespace-nowrap">Telefon</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bölge</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bakiye</th>
                  <th className="px-4 py-3 whitespace-nowrap text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-ink-900">
                      <Link
                        href={`/admin/musteriler/${c.id}`}
                        className="hover:text-brand-600"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {c.phone ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {c.region ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <BalanceDisplay balance={c.balance} size="sm" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/musteriler/${c.id}`}
                          aria-label="Düzenle"
                          className="grid place-items-center w-8 h-8 rounded-lg text-ink-500 hover:bg-black/5 hover:text-brand-600"
                        >
                          <Icon name="PencilSimple" size={16} />
                        </Link>
                        <DeleteButton
                          action={deleteCustomer.bind(null, c.id)}
                          confirmMessage={`${c.name} silinsin mi? Müşteriye ait TÜM randevu ve cari hareket geçmişi de silinecektir. Bu işlem geri alınamaz.`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden space-y-2">
            {list.map((c) => (
              <CustomerListItem key={c.id} customer={c} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
        </>
      )}
    </div>
  );
}

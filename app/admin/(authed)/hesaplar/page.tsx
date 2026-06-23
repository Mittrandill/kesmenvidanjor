import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AccountListItem } from "@/components/admin/AccountListItem";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Hesaplar", robots: { index: false } };

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export default async function HesaplarPage() {
  const supabase = await createClient();
  const [{ data: accounts }, { data: balances }] = await Promise.all([
    supabase.from("accounts").select("id,name,type").order("name", { ascending: true }),
    supabase.from("account_balances").select("account_id,balance"),
  ]);

  const balanceMap = new Map(
    (balances ?? []).map((b) => [b.account_id, b.balance ?? 0]),
  );
  const list = (accounts ?? []).map((a) => ({
    ...a,
    balance: balanceMap.get(a.id) ?? 0,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink-900">Hesaplar</h1>
        <Link
          href="/admin/hesaplar/yeni"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Icon name="Plus" size={16} weight="bold" />
          Yeni Hesap
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Henüz hesap eklenmemiş.
        </p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3 whitespace-nowrap">Hesap Adı</th>
                  <th className="px-4 py-3 whitespace-nowrap">Tip</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bakiye</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-ink-900">
                      <Link href={`/admin/hesaplar/${a.id}`} className="hover:text-brand-600">
                        {a.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                      {a.type === "kasa" ? "Kasa" : "Banka"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-ink-900">
                      {currencyFormatter.format(a.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden space-y-2">
            {list.map((a) => (
              <AccountListItem key={a.id} account={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

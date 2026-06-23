import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CustomerListItem } from "@/components/admin/CustomerListItem";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Müşteriler", robots: { index: false } };

export default async function MusterilerPage() {
  const supabase = await createClient();
  const [{ data: customers }, { data: balances }] = await Promise.all([
    supabase
      .from("customers")
      .select("id,name,phone,region")
      .order("name", { ascending: true }),
    supabase.from("customer_balances").select("customer_id,balance"),
  ]);

  const balanceMap = new Map(
    (balances ?? []).map((b) => [b.customer_id, b.balance ?? 0]),
  );
  const list = (customers ?? []).map((c) => ({
    ...c,
    balance: balanceMap.get(c.id) ?? 0,
  }));

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
        <div className="space-y-2">
          {list.map((c) => (
            <CustomerListItem key={c.id} customer={c} />
          ))}
        </div>
      )}
    </div>
  );
}

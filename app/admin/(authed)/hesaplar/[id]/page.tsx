import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/ui/Icon";
import { EditSheetTrigger } from "@/components/admin/EditSheetTrigger";
import { AccountForm } from "@/components/admin/AccountForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import {
  updateAccount,
  deleteAccount,
} from "@/app/admin/(authed)/hesaplar/actions";

export const metadata: Metadata = { title: "Hesap Detayı", robots: { index: false } };

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});
const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" });

export default async function HesapDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accountId = Number(id);

  const supabase = await createClient();
  const [{ data: account }, { data: balanceRow }, { data: entries }] = await Promise.all([
    supabase.from("accounts").select("*").eq("id", accountId).single(),
    supabase
      .from("account_balances")
      .select("balance")
      .eq("account_id", accountId)
      .maybeSingle(),
    supabase
      .from("ledger_entries")
      .select("id,entry_type,amount,description,created_at,customers(name)")
      .eq("account_id", accountId)
      .order("created_at", { ascending: false })
      .limit(15),
  ]);

  if (!account) {
    notFound();
  }

  const boundUpdate = updateAccount.bind(null, accountId);
  const boundDelete = deleteAccount.bind(null, accountId);

  return (
    <div className="space-y-6 max-w-lg">
      <Link
        href="/admin/hesaplar"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Hesaplar
      </Link>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-ink-900">{account.name}</h1>
            <p className="mt-1 text-sm text-ink-500">
              {account.type === "kasa" ? "Kasa" : "Banka"}
            </p>
          </div>
          <p className="text-2xl font-extrabold text-ink-900">
            {currencyFormatter.format(balanceRow?.balance ?? 0)}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <EditSheetTrigger sheetTitle="Hesabı Düzenle">
            <AccountForm
              action={boundUpdate}
              defaultValues={{ name: account.name, type: account.type }}
              submitLabel="Değişiklikleri Kaydet"
            />
          </EditSheetTrigger>
          <DeleteButton
            action={boundDelete}
            confirmMessage={`${account.name} hesabını silmek istediğinize emin misiniz? Bu hesaba bağlı hareketler silinmez, sadece hesap etiketi kaldırılır.`}
          />
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-ink-500">Hareketler</h2>
        {entries && entries.length > 0 ? (
          <div className="space-y-2">
            {entries.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900 truncate">
                    {e.customers?.name ?? "—"}
                  </p>
                  <p className="text-sm text-ink-500 truncate">
                    {dateFormatter.format(new Date(e.created_at))}
                    {e.description ? ` · ${e.description}` : ""}
                  </p>
                </div>
                <p
                  className={
                    e.entry_type === "tahsilat"
                      ? "font-bold text-green-600 shrink-0"
                      : "font-bold text-brand-600 shrink-0"
                  }
                >
                  {e.entry_type === "tahsilat" ? "+" : "-"}
                  {currencyFormatter.format(e.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm text-ink-500 ring-1 ring-black/5">
            Henüz hareket yok.
          </p>
        )}
      </section>
    </div>
  );
}

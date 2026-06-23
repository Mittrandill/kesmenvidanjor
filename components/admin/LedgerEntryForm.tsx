"use client";

import { useActionState, useState } from "react";
import { BottomSheet } from "@/components/admin/BottomSheet";
import { Icon } from "@/components/ui/Icon";
import { useFormSuccess } from "@/lib/use-form-success";
import type { FormState } from "@/app/admin/(authed)/musteriler/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function LedgerEntryForm({
  action,
  accounts,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  accounts: { id: number; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [entryType, setEntryType] = useState<"tahsilat" | "borc" | "iade">("tahsilat");
  const [state, formAction, pending] = useActionState(action, undefined);
  useFormSuccess(pending, Boolean(state?.error), () => setOpen(false));
  const isPayment = entryType === "tahsilat" || entryType === "iade";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-2xl bg-white p-4 font-semibold text-ink-900 ring-1 ring-black/5 hover:ring-brand-200"
      >
        <Icon name="HandCoins" size={20} className="text-brand-600" />
        Tahsilat Ekle
      </button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Tahsilat Ekle">
        <form action={formAction} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              className={inputCls}
              name="entry_type"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value as typeof entryType)}
            >
              <option value="tahsilat">Tahsilat</option>
              <option value="borc">Hizmet Bedeli (Borç)</option>
              <option value="iade">İade</option>
            </select>
            <input
              className={inputCls}
              type="number"
              step="0.01"
              min="0"
              name="amount"
              placeholder="Tutar (₺)"
              required
            />
          </div>

          {isPayment && (
            <div className="grid grid-cols-2 gap-3">
              <select className={inputCls} name="payment_method" defaultValue="nakit">
                <option value="nakit">Nakit</option>
                <option value="pos">POS</option>
                <option value="havale">Havale</option>
              </select>
              <select className={inputCls} name="account_id" defaultValue="" required>
                <option value="" disabled>
                  Hesap seçin
                </option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <input
            className={inputCls}
            name="description"
            placeholder="Açıklama (opsiyonel)"
          />
          {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "Ekleniyor..." : "Hareketi Ekle"}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}

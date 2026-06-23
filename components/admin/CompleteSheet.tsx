"use client";

import { useActionState, useState } from "react";
import { BottomSheet } from "@/components/admin/BottomSheet";
import { Switch } from "@/components/admin/Switch";
import type { FormState } from "@/app/admin/(authed)/randevular/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function CompleteSheet({
  open,
  onClose,
  action,
}: {
  open: boolean;
  onClose: () => void;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [invoiceRequired, setInvoiceRequired] = useState(false);
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <BottomSheet open={open} onClose={onClose} title="Randevuyu Tamamla">
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-800">
            Hizmet Bedeli (₺) *
          </label>
          <input
            className={inputCls}
            type="number"
            step="0.01"
            min="0"
            name="amount"
            placeholder="0,00"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-800">
            Açıklama
          </label>
          <input className={inputCls} name="description" placeholder="Opsiyonel" />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/[0.02] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-ink-900">Fatura Gerekli</p>
            <p className="text-xs text-ink-500">Sonra fatura no eklemeniz hatırlatılır</p>
          </div>
          <Switch checked={invoiceRequired} onChange={setInvoiceRequired} />
          <input
            type="hidden"
            name="invoice_required"
            value={invoiceRequired ? "true" : "false"}
          />
        </div>
        {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Kaydediliyor..." : "Tamamlandı Olarak İşaretle"}
        </button>
      </form>
    </BottomSheet>
  );
}

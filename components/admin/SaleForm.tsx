"use client";

import { useActionState, useState } from "react";
import { services } from "@/lib/site-config";
import { Switch } from "@/components/admin/Switch";
import { FormActionBar } from "@/components/admin/FormActionBar";
import type { FormState } from "@/app/admin/(authed)/satislar/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function SaleForm({
  action,
  customers,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  customers: { id: number; name: string }[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [invoiceRequired, setInvoiceRequired] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Müşteri *
        </label>
        <select className={inputCls} name="customer_id" defaultValue="" required>
          <option value="" disabled>
            Seçiniz
          </option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Hizmet *
          </label>
          <select className={inputCls} name="service_slug" defaultValue="" required>
            <option value="" disabled>
              Seçiniz
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Tutar (₺) *
          </label>
          <input
            className={inputCls}
            type="number"
            step="0.01"
            min="0"
            name="amount"
            placeholder="0,00"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">Not</label>
        <input
          className={inputCls}
          name="note"
          placeholder="Eklemek istediğiniz bilgi (opsiyonel)"
        />
      </div>

      <div className="space-y-3 rounded-xl bg-black/[0.02] px-4 py-3">
        <div className="flex items-center justify-between">
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
        {invoiceRequired && (
          <input
            className={inputCls}
            name="invoice_number"
            placeholder="Fatura No (kesildiyse şimdi de girebilirsiniz)"
          />
        )}
      </div>

      {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}

      <FormActionBar>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Kaydediliyor..." : "Satışı Kaydet"}
        </button>
      </FormActionBar>
    </form>
  );
}

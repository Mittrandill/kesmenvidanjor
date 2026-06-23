"use client";

import { useActionState, useState } from "react";
import { useFormSuccess } from "@/lib/use-form-success";
import { Switch } from "@/components/admin/Switch";
import type { FormState } from "@/app/admin/(authed)/satislar/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function SaleEditForm({
  action,
  customers,
  accounts,
  defaultValues,
  onSuccess,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  customers: { id: number; name: string }[];
  accounts: { id: number; name: string }[];
  defaultValues: {
    customer_id: number;
    entry_type: "borc" | "tahsilat" | "iade";
    amount: number;
    description: string | null;
    payment_method: "nakit" | "pos" | "havale" | null;
    account_id: number | null;
    invoice_required: boolean;
    invoice_number: string | null;
  };
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  useFormSuccess(pending, Boolean(state?.error), onSuccess);
  const [entryType, setEntryType] = useState(defaultValues.entry_type);
  const [invoiceRequired, setInvoiceRequired] = useState(defaultValues.invoice_required);
  const isPayment = entryType === "tahsilat" || entryType === "iade";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Müşteri *
        </label>
        <select
          className={inputCls}
          name="customer_id"
          defaultValue={defaultValues.customer_id}
          required
        >
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
            Tip *
          </label>
          <select
            className={inputCls}
            name="entry_type"
            value={entryType}
            onChange={(e) => setEntryType(e.target.value as typeof entryType)}
          >
            <option value="borc">Hizmet Bedeli (Borç)</option>
            <option value="tahsilat">Tahsilat</option>
            <option value="iade">İade</option>
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
            defaultValue={defaultValues.amount}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Açıklama
        </label>
        <input
          className={inputCls}
          name="description"
          defaultValue={defaultValues.description ?? ""}
        />
      </div>

      {isPayment && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              Ödeme Yöntemi *
            </label>
            <select
              className={inputCls}
              name="payment_method"
              defaultValue={defaultValues.payment_method ?? "nakit"}
              required={isPayment}
            >
              <option value="nakit">Nakit</option>
              <option value="pos">POS</option>
              <option value="havale">Havale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              Hesap *
            </label>
            <select
              className={inputCls}
              name="account_id"
              defaultValue={defaultValues.account_id ?? ""}
              required={isPayment}
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {entryType === "borc" && (
        <div className="space-y-3 rounded-xl bg-black/[0.02] px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-900">Fatura Gerekli</p>
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
              defaultValue={defaultValues.invoice_number ?? ""}
              placeholder="Fatura No"
            />
          )}
        </div>
      )}

      {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
      </button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/(authed)/satislar/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function SaleEditForm({
  action,
  customers,
  defaultValues,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  customers: { id: number; name: string }[];
  defaultValues: {
    customer_id: number;
    entry_type: "borc" | "tahsilat" | "iade";
    amount: number;
    description: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

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
            defaultValue={defaultValues.entry_type}
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

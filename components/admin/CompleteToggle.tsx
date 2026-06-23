"use client";

import { useActionState, useState } from "react";
import { Switch } from "@/components/admin/Switch";
import type { FormState } from "@/app/admin/(authed)/randevular/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function CompleteToggle({
  action,
  completed,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  completed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(action, undefined);

  if (completed) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4 ring-1 ring-green-200">
        <span className="font-semibold text-green-700">Randevu Tamamlandı</span>
        <Switch checked disabled />
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-ink-900">Randevuyu Tamamla</span>
        <Switch checked={open} onChange={setOpen} />
      </div>
      {open && (
        <form action={formAction} className="space-y-3 border-t border-black/5 pt-3">
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
          {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {pending ? "Kaydediliyor..." : "Onayla"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-3 text-sm font-medium text-ink-500 hover:bg-black/5"
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

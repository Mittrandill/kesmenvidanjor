"use client";

import { useActionState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FormState } from "@/app/admin/(authed)/randevular/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function CompleteAppointmentForm({
  action,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <details className="rounded-2xl bg-green-50 ring-1 ring-green-200 p-4">
      <summary className="flex cursor-pointer items-center gap-2 font-semibold text-green-700">
        <Icon name="CheckCircle" size={20} />
        Randevuyu Tamamla
      </summary>
      <form action={formAction} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Açıklama
          </label>
          <input className={inputCls} name="description" placeholder="Opsiyonel" />
        </div>
        {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
        >
          {pending ? "Kaydediliyor..." : "Tamamlandı Olarak İşaretle"}
        </button>
      </form>
    </details>
  );
}

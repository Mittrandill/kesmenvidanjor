"use client";

import { useActionState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FormState } from "@/app/admin/(authed)/musteriler/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function LedgerEntryForm({
  action,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <details className="rounded-2xl bg-white ring-1 ring-black/5 p-4">
      <summary className="flex cursor-pointer items-center gap-2 font-semibold text-ink-900">
        <Icon name="Plus" size={20} className="text-brand-600" />
        Manuel Hareket Ekle
      </summary>
      <form ref={formRef} action={formAction} className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <select className={inputCls} name="entry_type" defaultValue="tahsilat">
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
        <input
          className={inputCls}
          name="description"
          placeholder="Açıklama (opsiyonel)"
        />
        {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Ekleniyor..." : "Hareketi Ekle"}
        </button>
      </form>
    </details>
  );
}

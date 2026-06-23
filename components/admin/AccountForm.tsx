"use client";

import { useActionState } from "react";
import { useFormSuccess } from "@/lib/use-form-success";
import { FormActionBar } from "@/components/admin/FormActionBar";
import type { FormState } from "@/app/admin/(authed)/hesaplar/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function AccountForm({
  action,
  defaultValues,
  submitLabel,
  onSuccess,
  sticky,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: { name: string; type: "kasa" | "banka" };
  submitLabel: string;
  onSuccess?: () => void;
  sticky?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  useFormSuccess(pending, Boolean(state?.error), onSuccess);

  const submitButton = (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Kaydediliyor..." : submitLabel}
    </button>
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">
          Hesap Adı *
        </label>
        <input
          className={inputCls}
          name="name"
          defaultValue={defaultValues?.name}
          placeholder="Kasa, İş Bankası, Garanti POS..."
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">Tip *</label>
        <select
          className={inputCls}
          name="type"
          defaultValue={defaultValues?.type ?? "kasa"}
        >
          <option value="kasa">Kasa (Nakit)</option>
          <option value="banka">Banka</option>
        </select>
      </div>
      {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}
      {sticky ? <FormActionBar>{submitButton}</FormActionBar> : submitButton}
    </form>
  );
}

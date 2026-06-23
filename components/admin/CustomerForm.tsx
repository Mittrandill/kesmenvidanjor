"use client";

import { useActionState } from "react";
import { regions } from "@/lib/site-config";
import { useFormSuccess } from "@/lib/use-form-success";
import { FormActionBar } from "@/components/admin/FormActionBar";
import type { FormState } from "@/app/admin/(authed)/musteriler/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

type Props = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: {
    name: string;
    phone: string | null;
    region: string | null;
    address: string | null;
    notes: string | null;
  };
  submitLabel: string;
  onSuccess?: () => void;
  sticky?: boolean;
};

export function CustomerForm({
  action,
  defaultValues,
  submitLabel,
  onSuccess,
  sticky,
}: Props) {
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
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Ad Soyad *
        </label>
        <input
          className={inputCls}
          name="name"
          defaultValue={defaultValues?.name}
          placeholder="Müşteri adı"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Telefon
          </label>
          <input
            className={inputCls}
            name="phone"
            defaultValue={defaultValues?.phone ?? ""}
            placeholder="05XX XXX XX XX"
            inputMode="tel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Bölge
          </label>
          <input
            className={inputCls}
            name="region"
            list="region-options"
            defaultValue={defaultValues?.region ?? ""}
            placeholder="Çeşme, Alaçatı..."
          />
          <datalist id="region-options">
            {regions.map((r) => (
              <option key={r.slug} value={r.name} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Adres
        </label>
        <input
          className={inputCls}
          name="address"
          defaultValue={defaultValues?.address ?? ""}
          placeholder="Açık adres"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Not
        </label>
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          name="notes"
          defaultValue={defaultValues?.notes ?? ""}
          placeholder="Eklemek istediğiniz bilgi"
        />
      </div>

      {state?.error && <p className="text-sm text-brand-600">{state.error}</p>}

      {sticky ? <FormActionBar>{submitButton}</FormActionBar> : submitButton}
    </form>
  );
}

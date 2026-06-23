"use client";

import { useActionState } from "react";
import { services, regions } from "@/lib/site-config";
import { toIstanbulInputValue } from "@/lib/utils";
import { useFormSuccess } from "@/lib/use-form-success";
import { FormActionBar } from "@/components/admin/FormActionBar";
import type { FormState } from "@/app/admin/(authed)/randevular/actions";

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

type Props = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  customers: { id: number; name: string }[];
  defaultValues?: {
    customer_id: number;
    service_slug: string;
    scheduled_at: string;
    region: string | null;
    notes: string | null;
  };
  submitLabel: string;
  onSuccess?: () => void;
  sticky?: boolean;
};

export function AppointmentForm({
  action,
  customers,
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
          Müşteri *
        </label>
        <select
          className={inputCls}
          name="customer_id"
          defaultValue={defaultValues?.customer_id ?? ""}
          required
        >
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
          <select
            className={inputCls}
            name="service_slug"
            defaultValue={defaultValues?.service_slug ?? ""}
            required
          >
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
            Tarih / Saat *
          </label>
          <input
            className={inputCls}
            type="datetime-local"
            name="scheduled_at"
            defaultValue={
              defaultValues
                ? toIstanbulInputValue(defaultValues.scheduled_at)
                : undefined
            }
            required
          />
        </div>
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

"use client";

import { useState } from "react";
import { Switch } from "@/components/admin/Switch";
import { CompleteSheet } from "@/components/admin/CompleteSheet";
import type { FormState } from "@/app/admin/(authed)/randevular/actions";

export function CompleteToggle({
  action,
  completed,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  completed: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (completed) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4 ring-1 ring-green-200">
        <span className="font-semibold text-green-700">Randevu Tamamlandı</span>
        <Switch checked disabled />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <span className="font-semibold text-ink-900">Randevuyu Tamamla</span>
      <Switch checked={open} onChange={setOpen} />
      <CompleteSheet open={open} onClose={() => setOpen(false)} action={action} />
    </div>
  );
}

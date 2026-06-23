"use client";

import { useState } from "react";
import { ConfirmSheet } from "@/components/admin/ConfirmSheet";
import { Icon } from "@/components/ui/Icon";
import { cancelAppointment } from "@/app/admin/(authed)/randevular/actions";

export function CancelAppointmentButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-black/10 hover:ring-brand-200"
      >
        <Icon name="X" size={16} />
        Randevuyu İptal Et
      </button>
      <ConfirmSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Randevuyu İptal Et"
        message="Bu randevuyu iptal etmek istediğinize emin misiniz?"
        confirmLabel="İptal Et"
        danger
        action={() => cancelAppointment(id)}
      />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmSheet } from "@/components/admin/ConfirmSheet";
import { CompleteSheet } from "@/components/admin/CompleteSheet";
import {
  completeAppointment,
  cancelAppointment,
} from "@/app/admin/(authed)/randevular/actions";

export function StatusSelect({
  id,
  status,
}: {
  id: number;
  status: "planlandi" | "tamamlandi" | "iptal";
}) {
  const router = useRouter();
  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (status !== "planlandi") {
    return <StatusBadge status={status} />;
  }

  const boundComplete = completeAppointment.bind(null, id);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    e.target.value = "planlandi";
    if (value === "tamamlandi") setCompleteOpen(true);
    else if (value === "iptal") setCancelOpen(true);
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <select
        value="planlandi"
        onChange={handleChange}
        className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"
      >
        <option value="planlandi">Planlandı</option>
        <option value="tamamlandi">Tamamlandı</option>
        <option value="iptal">İptal</option>
      </select>

      <CompleteSheet
        open={completeOpen}
        onClose={() => {
          setCompleteOpen(false);
          router.refresh();
        }}
        action={boundComplete}
      />
      <ConfirmSheet
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Randevuyu İptal Et"
        message="Bu randevuyu iptal etmek istediğinize emin misiniz?"
        confirmLabel="İptal Et"
        danger
        action={async () => {
          await cancelAppointment(id);
          router.refresh();
        }}
      />
    </div>
  );
}

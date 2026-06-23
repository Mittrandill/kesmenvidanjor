"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBadge } from "@/components/admin/StatusBadge";
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
  const [pending, setPending] = useState(false);

  if (status !== "planlandi") {
    return <StatusBadge status={status} />;
  }

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "planlandi") return;

    if (value === "tamamlandi") {
      const amountStr = window.prompt("Hizmet bedeli (₺):");
      if (amountStr === null) {
        e.target.value = "planlandi";
        return;
      }
      const amount = Number(amountStr.replace(",", "."));
      if (!amount || amount <= 0) {
        alert("Geçerli bir tutar girin.");
        e.target.value = "planlandi";
        return;
      }
      setPending(true);
      const fd = new FormData();
      fd.set("amount", String(amount));
      fd.set("description", "");
      const result = await completeAppointment(id, undefined, fd);
      setPending(false);
      if (result?.error) {
        alert(result.error);
        e.target.value = "planlandi";
        return;
      }
      router.refresh();
    } else if (value === "iptal") {
      if (!confirm("Bu randevuyu iptal etmek istediğinize emin misiniz?")) {
        e.target.value = "planlandi";
        return;
      }
      setPending(true);
      await cancelAppointment(id);
      setPending(false);
      router.refresh();
    }
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      disabled={pending}
      className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs font-medium text-ink-700 outline-none focus:border-brand-500 disabled:opacity-60"
    >
      <option value="planlandi">Planlandı</option>
      <option value="tamamlandi">Tamamlandı</option>
      <option value="iptal">İptal</option>
    </select>
  );
}

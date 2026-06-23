import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AppointmentForm } from "@/components/admin/AppointmentForm";
import { CompleteToggle } from "@/components/admin/CompleteToggle";
import {
  updateAppointment,
  completeAppointment,
  cancelAppointment,
} from "@/app/admin/(authed)/randevular/actions";

export const metadata: Metadata = { title: "Randevu Detayı", robots: { index: false } };

export default async function RandevuDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointmentId = Number(id);

  const supabase = await createClient();
  const [{ data: appointment }, { data: customers }] = await Promise.all([
    supabase
      .from("appointments")
      .select("id,customer_id,service_slug,scheduled_at,region,notes,status,customers(name)")
      .eq("id", appointmentId)
      .single(),
    supabase.from("customers").select("id,name").order("name", { ascending: true }),
  ]);

  if (!appointment) {
    notFound();
  }

  const boundUpdate = updateAppointment.bind(null, appointmentId);
  const boundComplete = completeAppointment.bind(null, appointmentId);
  const boundCancel = cancelAppointment.bind(null, appointmentId);

  return (
    <div className="space-y-4 max-w-lg">
      <Link
        href="/admin/randevular"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Randevular
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink-900">
          {appointment.customers?.name ?? "Randevu"}
        </h1>
        <StatusBadge status={appointment.status} />
      </div>

      <a
        href={`/admin/randevular/${appointmentId}/ics`}
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-black/10 hover:ring-brand-200"
      >
        <Icon name="CalendarBlank" size={16} />
        Takvime Ekle
      </a>

      {appointment.status !== "iptal" && (
        <div className="space-y-3">
          <CompleteToggle
            action={boundComplete}
            completed={appointment.status === "tamamlandi"}
          />
          {appointment.status === "planlandi" && (
            <form action={boundCancel}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-black/10 hover:ring-brand-200"
              >
                <Icon name="X" size={16} />
                Randevuyu İptal Et
              </button>
            </form>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h2 className="mb-4 text-sm font-semibold text-ink-500">Randevuyu Düzenle</h2>
        <AppointmentForm
          action={boundUpdate}
          customers={customers ?? []}
          defaultValues={{
            customer_id: appointment.customer_id,
            service_slug: appointment.service_slug,
            scheduled_at: appointment.scheduled_at,
            region: appointment.region,
            notes: appointment.notes,
          }}
          submitLabel="Değişiklikleri Kaydet"
        />
      </div>
    </div>
  );
}

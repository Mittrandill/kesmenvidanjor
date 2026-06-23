import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AppointmentForm } from "@/components/admin/AppointmentForm";
import { EditSheetTrigger } from "@/components/admin/EditSheetTrigger";
import { CompleteToggle } from "@/components/admin/CompleteToggle";
import { CancelAppointmentButton } from "@/components/admin/CancelAppointmentButton";
import {
  updateAppointment,
  completeAppointment,
} from "@/app/admin/(authed)/randevular/actions";

export const metadata: Metadata = { title: "Randevu Detayı", robots: { index: false } };

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
});

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
  const service = getService(appointment.service_slug);

  return (
    <div className="space-y-4 max-w-lg">
      <Link
        href="/admin/randevular"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Randevular
      </Link>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-extrabold text-ink-900">
            {appointment.customers?.name ?? "Randevu"}
          </h1>
          <StatusBadge status={appointment.status} />
        </div>

        <dl className="mt-4 space-y-2 border-t border-black/5 pt-4 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Hizmet</dt>
            <dd className="text-ink-800">{service?.name ?? appointment.service_slug}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Tarih</dt>
            <dd className="text-ink-800">
              {dateFormatter.format(new Date(appointment.scheduled_at))}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Bölge</dt>
            <dd className="text-ink-800">{appointment.region ?? "—"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-500">Not</dt>
            <dd className="text-ink-800">{appointment.notes ?? "—"}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <EditSheetTrigger sheetTitle="Randevuyu Düzenle">
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
          </EditSheetTrigger>
          <a
            href={`/admin/randevular/${appointmentId}/ics`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-black/10 hover:ring-brand-200"
          >
            <Icon name="CalendarBlank" size={16} />
            Takvime Ekle
          </a>
        </div>
      </div>

      {appointment.status !== "iptal" && (
        <div className="space-y-3">
          <CompleteToggle
            action={boundComplete}
            completed={appointment.status === "tamamlandi"}
          />
          {appointment.status === "planlandi" && (
            <CancelAppointmentButton id={appointmentId} />
          )}
        </div>
      )}
    </div>
  );
}

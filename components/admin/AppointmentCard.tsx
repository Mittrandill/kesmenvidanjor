import Link from "next/link";
import { getService } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAppointment } from "@/app/admin/(authed)/randevular/actions";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function AppointmentCard({
  appointment,
}: {
  appointment: {
    id: number;
    customer_id: number;
    customer_name?: string;
    service_slug: string;
    scheduled_at: string;
    region: string | null;
    status: "planlandi" | "tamamlandi" | "iptal";
  };
}) {
  const service = getService(appointment.service_slug);

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <Link
        href={`/admin/randevular/${appointment.id}`}
        className="flex items-center gap-3 p-4 hover:bg-black/[0.015]"
      >
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
          <Icon name="CalendarBlank" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink-900 truncate">
            {appointment.customer_name ?? "—"}
          </p>
          <p className="text-sm text-ink-500 truncate">
            {service?.name ?? appointment.service_slug} ·{" "}
            {dateFormatter.format(new Date(appointment.scheduled_at))}
          </p>
          {appointment.region && (
            <p className="text-xs text-ink-400 truncate">{appointment.region}</p>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 border-t border-black/5 px-4 py-2">
        <StatusSelect id={appointment.id} status={appointment.status} />
        <DeleteButton
          action={deleteAppointment.bind(null, appointment.id)}
          confirmMessage="Bu randevuyu kalıcı olarak silmek istediğinize emin misiniz?"
        />
      </div>
    </div>
  );
}

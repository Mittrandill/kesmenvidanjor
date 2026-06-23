import Link from "next/link";
import { getService } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/admin/StatusBadge";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function AppointmentListItem({
  appointment,
  showCustomer = true,
}: {
  appointment: {
    id: number;
    customer_id: number;
    customer_name?: string;
    service_slug: string;
    scheduled_at: string;
    status: "planlandi" | "tamamlandi" | "iptal";
  };
  showCustomer?: boolean;
}) {
  const service = getService(appointment.service_slug);

  return (
    <Link
      href={`/admin/randevular/${appointment.id}`}
      className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 hover:ring-brand-200 transition"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
          <Icon name="CalendarBlank" size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-ink-900 truncate">
            {showCustomer && appointment.customer_name
              ? appointment.customer_name
              : (service?.name ?? appointment.service_slug)}
          </p>
          <p className="text-sm text-ink-500 truncate">
            {showCustomer && appointment.customer_name
              ? (service?.name ?? appointment.service_slug)
              : null}
            {showCustomer && appointment.customer_name ? " · " : ""}
            {dateFormatter.format(new Date(appointment.scheduled_at))}
          </p>
        </div>
      </div>
      <StatusBadge status={appointment.status} />
    </Link>
  );
}

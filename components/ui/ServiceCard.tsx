import Link from "next/link";
import type { Service } from "@/lib/site-config";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  href,
  className,
}: {
  service: Service;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href ?? `/hizmetler/${service.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200",
        className,
      )}
    >
      <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={service.icon} size={30} />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink-900">{service.name}</h3>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">
        {service.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Detaylar
        <Icon
          name="CaretRight"
          size={16}
          weight="bold"
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

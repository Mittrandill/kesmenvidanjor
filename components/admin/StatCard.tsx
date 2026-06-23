import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: IconName;
  tone?: "brand" | "amber" | "default";
}) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <span
        className={cn(
          "grid place-items-center w-10 h-10 rounded-xl",
          tone === "brand" && "bg-brand-50 text-brand-600",
          tone === "amber" && "bg-amber-50 text-amber-600",
          tone === "default" && "bg-black/5 text-ink-600",
        )}
      >
        <Icon name={icon} size={20} />
      </span>
      <p className="mt-3 text-2xl font-extrabold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
    </div>
  );
}

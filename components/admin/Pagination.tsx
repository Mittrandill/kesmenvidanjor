import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex items-center justify-between pt-1">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={prevDisabled}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 ring-1 ring-black/10 hover:bg-black/5",
          prevDisabled && "pointer-events-none opacity-40",
        )}
      >
        <Icon name="ArrowLeft" size={16} />
        Önceki
      </Link>
      <span className="text-sm text-ink-500">
        Sayfa {page} / {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={nextDisabled}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 ring-1 ring-black/10 hover:bg-black/5",
          nextDisabled && "pointer-events-none opacity-40",
        )}
      >
        Sonraki
        <Icon name="CaretRight" size={16} />
      </Link>
    </div>
  );
}

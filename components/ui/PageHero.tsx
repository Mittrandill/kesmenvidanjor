import Link from "next/link";
import { Icon } from "./Icon";

export type Crumb = { name: string; href: string };

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {crumbs.map((c, i) => (
              <span key={c.href} className="inline-flex items-center gap-1.5">
                {i > 0 && <Icon name="CaretRight" size={14} className="text-white/40" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-amber-glow transition-colors">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-white">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/85 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

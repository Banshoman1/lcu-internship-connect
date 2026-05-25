// Deep-blue page banner used by Map / Internships / Applications / Profile pages.
import type { ReactNode } from "react";

export function PageHero({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm md:text-base opacity-90">{subtitle}</p>}
        </div>
        {action}
      </div>
    </section>
  );
}

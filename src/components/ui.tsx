import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import type { Metric } from "@/content/projects";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * Section opener: a drawn hairline, a mono index and eyebrow on one line,
 * then the serif title. Every section on the site starts the same way —
 * the rhythm is what makes it read as one publication.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  /** `raised` puts the section on a panel; `base` leaves it on the grid. */
  tone = "base",
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title?: string;
  tone?: "base" | "raised";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 border-t border-line py-20 sm:py-28 ${tone === "raised" ? "band" : ""}`}
    >
      <Container>
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="label text-muted">{index}</span>
            <span className="label text-accent">{eyebrow}</span>
          </div>
        </Reveal>
        {title && (
          <Reveal delay={60}>
            <h2 id={`${id}-title`} className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
              {title}
            </h2>
          </Reveal>
        )}
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}

export function TagList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1.5 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className="font-mono text-[11px] text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Three numbers, big and serif. The part recruiters actually remember. */
export function Metrics({ metrics, className = "" }: { metrics: Metric[]; className?: string }) {
  return (
    <dl className={`grid gap-8 sm:grid-cols-3 ${className}`}>
      {metrics.map((m, i) => (
        <Reveal key={m.label} delay={i * 70}>
          <div className="border-t border-line pt-4">
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <span className="display block text-3xl text-fg sm:text-4xl">{m.value}</span>
              <span className="mt-2 block max-w-[22ch] text-sm leading-snug text-muted">{m.label}</span>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

const base =
  "inline-flex items-center gap-2 rounded-card px-5 py-3 text-sm font-semibold transition-all duration-300";

export const buttons = {
  // Teal on ink, with the accent glow on hover. One loud element per screen.
  primary: `${base} bg-accent text-accent-ink hover:shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--accent)_65%,transparent)]`,
  ghost: `${base} border border-line text-fg hover:border-accent hover:text-accent`,
};

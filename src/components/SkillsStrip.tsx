import { tech } from "@/content/tech";

/**
 * Continuous marquee of tech marks under the hero.
 *
 * The list is rendered twice and the track slides exactly -50%, so the second
 * copy lands where the first started and the loop is seamless. Pauses on
 * hover, and `prefers-reduced-motion` stops it entirely (handled in CSS).
 */
export function SkillsStrip() {
  return (
    <div className="marquee border-y border-line py-7">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group" aria-hidden={copy === 1}>
            {tech.map((t) => (
              <li key={t.name} className="group flex shrink-0 flex-col items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  /* No `color` means a black-brand mark: inherit the theme
                     foreground so it stays visible in both themes. */
                  className={`size-8 ${t.color ? "" : "text-fg"}`}
                  style={t.color ? { color: t.color } : undefined}
                  fill="currentColor"
                  aria-hidden
                >
                  <path d={t.path} />
                </svg>
                <span className="font-mono text-[10px] text-muted transition-colors duration-300 group-hover:text-fg">
                  {t.name}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

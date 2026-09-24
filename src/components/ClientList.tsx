import Link from "next/link";
import type { Role } from "@/content/profile";
import type { Project } from "@/content/projects";
import { TagList } from "./ui";
import { Reveal } from "./Reveal";
import { BrowserFrame } from "./BrowserFrame";
import { ArrowRightIcon } from "./Icons";

export type ClientEntry = Role & Pick<Project, "shots" | "live">;

/**
 * Freelance work, shown as the thing itself rather than a client logo: the
 * live site in browser chrome with the phone view tucked in beside it. A logo
 * says who paid; the screenshot says what was delivered.
 */
export function ClientList({ items }: { items: ClientEntry[] }) {
  return (
    <ol className="grid gap-4">
      {items.map((job, i) => (
        <Reveal
          as="li"
          key={`${job.company}-${job.role}`}
          delay={i * 60}
          className="grid items-center gap-10 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] text-muted">{job.period}</p>
            <h3 className="mt-3 text-lg">
              {job.role}
              <span className="text-muted"> · {job.company}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted prose-lead">
              {job.summary}
            </p>
            <TagList items={job.stack} className="mt-3" />

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              {job.href && (
                <Link
                  href={job.href}
                  className="group inline-flex items-center gap-2 text-accent transition-opacity hover:opacity-75"
                >
                  Read case study
                  <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              {job.live && (
                <a
                  href={job.live.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {job.live.label} ↗
                </a>
              )}
            </div>
          </div>

          {job.shots && (
            /* Bottom padding leaves room for the phone shot, which hangs
               below the desktop frame by design. */
            <div className="pb-6 md:col-span-7">
              {job.href ? (
                <Link
                  href={job.href}
                  aria-label={`${job.company} case study`}
                  className="block transition-transform duration-500 hover:-translate-y-1"
                >
                  <BrowserFrame {...job.shots} url={job.live?.label} />
                </Link>
              ) : (
                <BrowserFrame {...job.shots} url={job.live?.label} />
              )}
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

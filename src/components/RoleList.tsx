import Image from "next/image";
import Link from "next/link";
import type { Role } from "@/content/profile";
import { TagList } from "./ui";
import { Reveal } from "./Reveal";
import { ArrowRightIcon } from "./Icons";

/**
 * One mark, sized to fit a fixed box. `fill` rather than declared dimensions
 * because the files have different intrinsic ratios: object-contain scales a
 * wide wordmark and a square icon to the same optical size inside one box,
 * instead of letting the wide one dwarf the rest.
 */
function Logo({ src, job, className = "" }: { src: string; job: Role; className?: string }) {
  const style =
    job.logoStyle === "plain" ? "logo-plain" : job.logoStyle === "light" ? "mark-light" : "mark";

  return (
    <Image
      src={src}
      alt={job.company}
      fill
      sizes="150px"
      className={`object-contain object-left md:object-center ${className} ${style}`}
    />
  );
}

/**
 * Shared timeline for employment and freelance. Same shape either way, so the
 * two sections read as one history split in two, rather than two designs.
 */
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ol>
      {roles.map((job, i) => (
        <Reveal
          as="li"
          key={`${job.company}-${job.role}`}
          delay={i * 50}
          className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] text-muted">{job.period}</p>
            {job.logo && (
              <div className="relative mt-4 h-14 w-[150px] md:mx-auto">
                <Logo src={job.logo} job={job} className={job.logoLight ? "on-dark" : ""} />
                {job.logoLight && <Logo src={job.logoLight} job={job} className="on-light" />}
              </div>
            )}
          </div>

          <div className="md:col-span-9">
            <h3 className="text-lg">
              {job.role}
              <span className="text-muted"> · {job.company}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted prose-lead">
              {job.summary}
            </p>
            <TagList items={job.stack} className="mt-3" />
            {job.href && (
              <Link
                href={job.href}
                className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-75"
              >
                Read case study
                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

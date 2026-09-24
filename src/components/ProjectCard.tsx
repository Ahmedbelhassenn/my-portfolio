import Image from "next/image";
import Link from "next/link";
import { TagList } from "./ui";
import { ArrowRightIcon } from "./Icons";

export type CardItem = {
  title: string;
  period: string;
  summary: string;
  stack: readonly string[];
  /** Live site if there is one, otherwise the case study, otherwise nothing. */
  href?: string;
  linkLabel?: string;
  external?: boolean;
  thumb?: { src: string; alt: string; width: number; height: number };
};

/**
 * Compact project card: title, dates, a couple of sentences, the stack, and
 * one link. Deliberately light — the long-form version lives on its own page
 * for the projects that have one.
 */
export function ProjectCard({ item }: { item: CardItem }) {
  const link = item.href && (
    item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-75"
      >
        {item.linkLabel ?? "Website"} ↗
      </a>
    ) : (
      <Link
        href={item.href}
        className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-75"
      >
        {item.linkLabel ?? "Read more"}
        <ArrowRightIcon className="transition-transform duration-300 group-hover/link:translate-x-1" />
      </Link>
    )
  );

  return (
    <article className="card flex h-full flex-col p-6">
      {item.thumb && (
        <div className="card-flat mb-5 overflow-hidden">
          <Image
            src={item.thumb.src}
            alt={item.thumb.alt}
            width={item.thumb.width}
            height={item.thumb.height}
            sizes="(max-width: 640px) 100vw, 45vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="heading text-lg">{item.title}</h3>
        <span className="shrink-0 font-mono text-[11px] text-muted">{item.period}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted prose-lead">{item.summary}</p>

      <TagList items={item.stack} className="mt-5" />

      {/* Pushed to the bottom so links line up across a row of cards. */}
      <div className="mt-auto">{link}</div>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Container, Metrics, TagList } from "@/components/ui";
import { Reveal, Rule } from "@/components/Reveal";
import { BrowserFrame } from "@/components/BrowserFrame";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.client}`,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-16">
      <Container className="pt-10 sm:pt-14">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeftIcon className="transition-transform duration-300 group-hover:-translate-x-1" />
          All work
        </Link>

        <header className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span className="label text-accent">{project.index}</span>
                <span className="label text-muted">
                  {project.client} · {project.kind}
                </span>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="display mt-6 text-4xl sm:text-6xl">{project.title}</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted prose-lead">
                {project.tagline}
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="md:col-span-4 md:justify-self-end md:text-right">
            <div className="flex flex-col gap-5 border-t border-line pt-5 md:border-t-0 md:pt-0">
              <div>
                <p className="label text-muted">Timeline</p>
                <p className="mt-2 text-sm">{project.period}</p>
              </div>
              {project.live && project.live.href !== "#" && (
                <div>
                  <p className="label text-muted">Live</p>
                  <a
                    href={project.live.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm text-accent transition-opacity hover:opacity-70"
                  >
                    {project.live.label} ↗
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </header>

        {/* Hero visual: the screenshot if there is one, the architecture if not. */}
        <Reveal delay={120} className="mt-16 sm:mt-20">
          {project.shots ? (
            <BrowserFrame
              desk={project.shots.desk}
              mob={project.shots.mob}
              url={project.live?.label}
              priority
            />
          ) : (
            <div className="card p-6 sm:p-10">
              <p className="label mb-6 text-muted">Architecture</p>
              <FlowDiagram steps={project.flow} />
            </div>
          )}
        </Reveal>

        <div className="mt-24 sm:mt-32">
          <Metrics metrics={project.metrics} />
        </div>

        <div className="mt-24 grid gap-20 sm:mt-32 sm:gap-24">
          <Block index="01" title="The problem">
            <p>{project.problem}</p>
          </Block>

          <Block index="02" title="My role">
            <p>{project.role}</p>
            <TagList items={project.stack} className="mt-6" />
          </Block>

          {/* Screenshot projects haven't shown their architecture yet. */}
          {project.shots && (
            <Block index="03" title="How it's built">
              <FlowDiagram steps={project.flow} />
            </Block>
          )}

          <Block index={project.shots ? "04" : "03"} title="Key decisions">
            {/* Separate cards rather than one hairline-divided slab: each
                decision is its own argument and reads better boxed. */}
            <ol className="grid gap-3">
              {project.decisions.map((d, i) => (
                <li key={d.title} className="card p-6 sm:p-7">
                  <span className="label text-accent">0{i + 1}</span>
                  <h3 className="heading mt-3 text-xl text-fg">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{d.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block index={project.shots ? "05" : "04"} title="The hard part">
            <h3 className="heading text-2xl text-fg">{project.challenge.title}</h3>
            <p className="mt-4">{project.challenge.body}</p>
          </Block>

          <Block index={project.shots ? "06" : "05"} title="Outcome">
            <ul className="grid gap-4">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-4 border-t border-line pt-4">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {/* Mobile shot gets its own moment — it's half the work on these projects. */}
        {project.shots?.mob && (
          <Reveal className="mt-24 sm:mt-32">
            <Rule />
            <p className="label mt-5 text-muted">On a phone</p>
            <div className="mt-8 max-w-[260px]">
              <div className="card overflow-hidden rounded-[18px]">
                <Image
                  src={project.shots.mob.src}
                  alt={project.shots.mob.alt}
                  width={project.shots.mob.width}
                  height={project.shots.mob.height}
                  sizes="260px"
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-28">
          <Link
            href={`/work/${next.slug}`}
            className="group grid gap-4 border-t border-line pt-8 md:grid-cols-12"
          >
            <div className="md:col-span-3">
              <p className="label text-muted">Next</p>
            </div>
            <div className="flex items-baseline justify-between gap-6 md:col-span-9">
              <h2 className="display text-3xl transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                {next.title}
              </h2>
              <ArrowRightIcon className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </Link>
        </Reveal>
      </Container>
    </article>
  );
}

/** Numbered two-column block: mono label left, prose right. */
function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="grid gap-5 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="label text-accent">{index}</span>
          <h2 className="label text-muted">{title}</h2>
        </div>
      </div>
      <div className="max-w-2xl leading-relaxed text-muted prose-lead md:col-span-9">{children}</div>
    </Reveal>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  about,
  credentials,
  education,
  employment,
  freelance,
  profile,
} from "@/content/profile";
import { alsoBuilt, projects } from "@/content/projects";
import { Container, Section, buttons } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ProjectCard, type CardItem } from "@/components/ProjectCard";
import { RoleList } from "@/components/RoleList";
import { ClientList, type ClientEntry } from "@/components/ClientList";
import { SkillsStrip } from "@/components/SkillsStrip";
import { ArrowRightIcon, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

/* The Projects section: the technical work, as compact cards. MML and the
   video portfolio are not here — they are client engagements and live in
   Freelance, so nothing is listed twice. */
const CLIENT_SLUGS = new Set(["mml", "ayoub-kahlaoui"]);

const projectCards: CardItem[] = [
  ...projects
    .filter((p) => !CLIENT_SLUGS.has(p.slug))
    .map((p) => ({
      title: p.title,
      period: p.period,
      summary: p.tagline,
      stack: p.stack,
      href: p.live && p.live.href !== "#" ? p.live.href : `/work/${p.slug}`,
      linkLabel: p.live && p.live.href !== "#" ? p.live.label : "Read more",
      external: Boolean(p.live && p.live.href !== "#"),
    })),
  ...alsoBuilt.map((a) => ({
    title: a.title,
    period: a.year,
    summary: a.note,
    stack: a.stack,
  })),
];

/* Freelance rows show the site itself, so each entry is joined to its case
   study for the screenshots and the live URL. */
const clientEntries: ClientEntry[] = freelance.map((job) => {
  const slug = job.href?.replace("/work/", "");
  const project = projects.find((p) => p.slug === slug);
  return { ...job, shots: project?.shots, live: project?.live };
});

export default function Home() {
  return (
    <>
      <Hero />
      <Marks />

      <Section
        id="about"
        index="01"
        eyebrow="About"
        title="ICT engineer from SUP'COM, building backend systems."
        tone="raised"
      >
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="card aspect-4/5 overflow-hidden">
              <Image
                src={profile.photo.src}
                alt={`${profile.name}, software engineer`}
                width={profile.photo.width}
                height={profile.photo.height}
                sizes="(max-width: 768px) 80vw, 34vw"
                className="size-full object-cover object-top saturate-[0.85] contrast-[1.05] transition-all duration-700 hover:saturate-100"
              />
            </div>
            <p className="label mt-4 text-muted">{profile.location}</p>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal delay={80}>
              <div className="space-y-4 leading-relaxed text-muted prose-lead">
                {about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-10">
              <p className="label text-muted">Education</p>
              <ul className="mt-5 grid gap-4">
                {education.map((e) => (
                  <li key={e.school} className="border-t border-line pt-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-sm font-semibold">{e.school}</span>
                      <span className="font-mono text-[11px] text-muted">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{e.degree}</p>
                    {e.logo && (
                      <Image
                        src={e.logo}
                        alt={e.school}
                        width={140}
                        height={56}
                        className="mark mt-3 h-7 w-auto"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180} className="mt-10">
              <p className="label text-muted">Credentials</p>
              <ul className="mt-5 grid gap-4">
                {credentials.map((c) => (
                  <li key={c.label} className="border-t border-line pt-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-sm font-semibold">
                        {c.href ? (
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {c.label} ↗
                          </a>
                        ) : (
                          c.label
                        )}
                      </span>
                      <span className="font-mono text-[11px] text-muted">{c.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="experience" index="02" eyebrow="Experience" title="Where I've been employed.">
        <RoleList roles={employment} />
      </Section>

      <Section
        id="freelance"
        index="03"
        eyebrow="Freelance"
        title="Client work, delivered independently."
        tone="raised"
      >
        <ClientList items={clientEntries} />
      </Section>

      <Section id="projects" index="04" eyebrow="Projects" title="Things I've built.">
        <ul className="grid gap-5 sm:grid-cols-2">
          {projectCards.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 60} className="h-full">
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Contact />
    </>
  );
}

function Hero() {
  return (
    // Full viewport minus the 4rem sticky header. `svh` rather than `vh` so
    // mobile browser chrome doesn't push the CTAs off-screen. Height is only
    // forced from md up; on a phone the content sets its own height.
    <section className="relative flex items-center md:min-h-[calc(100svh-4rem)]">
      <Container className="w-full py-16 md:py-10">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label text-accent">
                {profile.role} · {profile.focus}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-5 text-[2.5rem] text-pretty sm:text-5xl lg:text-[3.35rem]">
                {profile.greeting} <span className="inline-block">👋</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl leading-relaxed text-muted prose-lead">{profile.intro}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/#projects" className={buttons.primary}>
                  See my work <ArrowRightIcon />
                </Link>
                <a href={profile.cvPath} target="_blank" rel="noreferrer" className={buttons.ghost}>
                  <FileIcon /> CV
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid size-11 place-items-center rounded-card border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-11 place-items-center rounded-card border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hidden on phones: the About section already shows the portrait,
              and here it would push the CTAs below the fold. */}
          <Reveal delay={320} className="hidden md:col-span-5 md:block">
            <figure className="relative mx-auto w-full max-w-[260px] md:ml-auto md:mr-0 md:max-w-[340px]">
              {/* Soft accent bloom behind the portrait so it sits in the page
                  rather than on top of it. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-full opacity-45 blur-3xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 60% 30%, color-mix(in srgb, var(--accent) 34%, transparent), transparent 72%)",
                }}
              />
              {/* Anchored to the top: the source has almost no headroom above
                  the head, so any downward offset clips it. All the cropping
                  from this full-length shot happens at the bottom instead. */}
              <div className="card aspect-[4/5] overflow-hidden md:aspect-auto md:h-[52svh] md:max-h-[520px] md:min-h-[340px]">
                <Image
                  src={profile.photo.src}
                  alt={`${profile.name}, software engineer`}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  priority
                  sizes="(max-width: 768px) 260px, 340px"
                  className="size-full object-cover object-top saturate-[0.9] contrast-[1.04] transition-all duration-700 hover:saturate-100"
                />
              </div>
              <figcaption className="label mt-4 text-center text-muted md:text-right">
                {profile.location}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>

      {/* Anchors the bottom of a full-height hero and says there is more. */}
      <Link
        href="/#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted transition-colors duration-300 hover:text-accent md:flex"
      >
        <span className="label">About me</span>
        <span aria-hidden className="font-mono text-xs">
          ↓
        </span>
      </Link>
    </section>
  );
}

function Marks() {
  return (
    <Reveal>
      <SkillsStrip />
    </Reveal>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="band scroll-mt-20 border-t border-line py-24 sm:py-36"
    >
      <Container>
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="label text-muted">05</span>
            <span className="label text-accent">Contact</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="contact-title" className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
            Building something that has to stay up? Let&apos;s talk.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-lg leading-relaxed text-muted prose-lead">
            I&apos;m {profile.availability.toLowerCase()}. Email is the fastest way to reach me. I
            usually reply within a day.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={buttons.primary}>
              <MailIcon /> {profile.email}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={buttons.ghost}
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.cvPath} target="_blank" rel="noreferrer" className={buttons.ghost}>
              <FileIcon /> Download CV
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

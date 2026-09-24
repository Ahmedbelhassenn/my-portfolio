import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/#about", label: "About", index: "01" },
  { href: "/#experience", label: "Experience", index: "02" },
  { href: "/#projects", label: "Projects", index: "03" },
  { href: "/#freelance", label: "Freelance", index: "04" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm tracking-tight transition-opacity hover:opacity-70">
          {profile.name}
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-1.5 rounded-card px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  <span className="font-mono text-[10px] text-line transition-colors duration-300 group-hover:text-accent">
                    {item.index}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-card px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
          >
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

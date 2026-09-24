"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";

type NavItem = { href: string; label: string; index: string };

/**
 * Below `lg` the section links collapse behind a menu button. The panel is
 * positioned against the sticky header, so it drops down from under it.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Crossing into the desktop layout leaves no button to close the panel.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid size-9 place-items-center rounded-card text-muted transition-colors duration-300 hover:text-fg"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-line/60 bg-bg/95 backdrop-blur-xl"
        >
          <ul className="mx-auto grid w-full max-w-6xl px-5 py-3 sm:px-8">
            {items.map((item) => (
              <li key={item.href} className="border-t border-line/60 first:border-t-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 py-4 text-base text-muted transition-colors duration-300 hover:text-fg"
                >
                  <span className="font-mono text-[11px] text-line transition-colors duration-300 group-hover:text-accent">
                    {item.index}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

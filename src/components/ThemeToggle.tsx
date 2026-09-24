"use client";

import { MoonIcon, SunIcon } from "./Icons";

/**
 * Dark is the default and the art direction; light is a courtesy. The class
 * is therefore `.light`, added by the inline script in layout.tsx before
 * first paint so there is never a flash of the wrong theme.
 */
export function ThemeToggle() {
  const toggle = () => {
    const isLight = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid size-9 place-items-center rounded-card text-muted transition-colors duration-300 hover:text-fg"
    >
      <SunIcon className="hidden [:root.light_&]:block" />
      <MoonIcon className="[:root.light_&]:hidden" />
    </button>
  );
}

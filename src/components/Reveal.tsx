"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Releases `.reveal` elements when they scroll into view.
 *
 * One observer per element, disconnected after it fires — a reveal is a
 * one-way door, and re-animating on scroll-up is the thing that makes
 * these sites feel restless. `prefers-reduced-motion` is handled in CSS,
 * so there is nothing to branch on here.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger, in ms. Feed it index * 60 inside a list. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already past it on load (deep link, restored scroll): show immediately.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.dataset.shown = "true";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** The hairline that draws itself in. Used to open each section. */
export function Rule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={`rule ${className}`} />;
}

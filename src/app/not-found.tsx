import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-40">
      <p className="label text-accent">404</p>
      <h1 className="display mt-6 text-5xl sm:text-6xl">This page doesn&apos;t exist.</h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block font-mono text-sm text-accent transition-opacity hover:opacity-70"
      >
        ← Back to home
      </Link>
    </Container>
  );
}

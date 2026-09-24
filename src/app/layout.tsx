import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { profile } from "@/content/profile";
import "./globals.css";

/* Plus Jakarta Sans carries everything you read, from body copy up to the
   largest headline. JetBrains Mono handles the technical labels (indices,
   years, stacks) where a fixed width helps scanning. */
const sans = Plus_Jakarta_Sans({ variable: "--font-sans-family", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-family", subsets: ["latin"] });

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.metaDescription,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description: profile.metaDescription,
    url: "/",
    siteName: profile.name,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description: profile.metaDescription },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
};

/* Dark is the default art direction, so only an explicit opt-in flips it.
   Runs before first paint — no flash. */
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()`;

/** Person schema, so search results show a person rather than a page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Sfax", addressCountry: "TN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "SUP'COM — Higher School of Communication of Tunis" },
  knowsAbout: ["Backend engineering", "Distributed systems", "Payment systems", "Node.js", "TypeScript", "Kubernetes"],
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Reveals start at opacity 0 and are released by JS. Without this the
            whole site is a blank page when a script fails or is blocked. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.rule{transform:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-card focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import Image from "next/image";
import type { Shot } from "@/content/projects";

/**
 * A desktop screenshot in a browser chrome, with the phone shot tucked into
 * the lower-right corner — the same treatment as the studio site, so client
 * work reads as client work at a glance.
 */
export function BrowserFrame({
  desk,
  mob,
  url,
  priority = false,
}: {
  desk: Shot;
  mob?: Shot;
  url?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      <div className="card overflow-hidden">
        {/* Chrome: three dots and the address, in mono. */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-3 py-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
          </span>
          {url && (
            <span className="ml-1 truncate font-mono text-[10px] text-muted" aria-hidden>
              {url}
            </span>
          )}
        </div>
        <Image
          src={desk.src}
          alt={desk.alt}
          width={desk.width}
          height={desk.height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="w-full"
        />
      </div>

      {mob && (
        <div className="card absolute -bottom-6 -right-3 hidden w-[18%] overflow-hidden rounded-[10px] sm:block">
          <Image
            src={mob.src}
            alt={mob.alt}
            width={mob.width}
            height={mob.height}
            sizes="18vw"
            /* Loads with the desktop shot rather than popping in after it —
               they read as one image. */
            priority={priority}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

import { Fragment } from "react";
import type { FlowStep } from "@/content/projects";

/**
 * Architecture as a flow, drawn from data: horizontal on desktop, vertical on
 * a phone. This is the visual for backend systems, where there is no screen
 * worth showing — and it is the thing engineers read first.
 */
export function FlowDiagram({
  steps,
  /** `vertical` for narrow columns — five boxes squeezed into half a row
      wrap into unreadable slivers. Full-width diagrams stay horizontal. */
  orientation = "responsive",
}: {
  steps: FlowStep[];
  orientation?: "responsive" | "vertical";
}) {
  const vertical = orientation === "vertical";

  return (
    <ol
      aria-label="Architecture flow"
      className={`flex flex-col items-stretch gap-1.5 ${vertical ? "" : "md:flex-row"}`}
    >
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && (
            <li aria-hidden className={`flex items-center text-line ${vertical ? "pl-4" : "justify-center md:px-1"}`}>
              <span className={`font-mono text-xs ${vertical ? "" : "md:hidden"}`}>↓</span>
              {!vertical && <span className="hidden font-mono text-xs md:inline">→</span>}
            </li>
          )}
          <li
            className={`card-flat flex-1 px-4 py-3 ${
              vertical ? "flex items-baseline justify-between gap-4" : ""
            }`}
          >
            <span className="block text-sm font-medium text-fg">{step.label}</span>
            {step.detail && (
              <span
                className={`block font-mono text-[10px] leading-snug text-muted ${
                  vertical ? "shrink-0 text-right" : "mt-1"
                }`}
              >
                {step.detail}
              </span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

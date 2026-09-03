"use client";

import { useEffect, useRef, useState } from "react";
import { CaseCard } from "@/components/CaseCard";
import { nonprofitWork } from "@/lib/content";

export function WorkMore() {
  const [open, setOpen] = useState(false);
  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    firstRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <>
      <div
        id="nonprofit-work"
        className={open ? "work-more-panel is-open" : "work-more-panel"}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="work-more-panel-inner" ref={firstRef}>
          {nonprofitWork.map((job) => (
            <CaseCard
              key={job.id}
              id={job.id}
              href={`/work/${job.id}`}
              title={job.company}
              kicker={job.role}
              whisper={job.whisper}
              accent={job.accent}
            />
          ))}
        </div>
      </div>
      {open ? null : (
        <div className="show-more-wrap">
          <button
            type="button"
            className="show-more"
            aria-expanded={false}
            aria-controls="nonprofit-work"
            onClick={() => setOpen(true)}
          >
            <span className="show-more-label">Show more</span>
            <span className="show-more-chevron" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

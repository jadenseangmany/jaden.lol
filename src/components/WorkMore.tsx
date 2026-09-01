"use client";

import { useState } from "react";
import { CaseCard } from "@/components/CaseCard";
import { BloomUnit } from "@/components/bloom/Bloom";
import { nonprofitWork, roleMeta } from "@/lib/content";

export function WorkMore() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BloomUnit
        id="work-more"
        variant="meadow"
        pinOnClick={false}
        className="work-more-unit"
      >
        <button
          type="button"
          className="work-more"
          aria-expanded={open}
          aria-controls="nonprofit-work"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="whisper">( nonprofit )</span>
          <span className="work-more-copy">
            <span className="bloom-title">More</span>
            <span className="meta">Non profit</span>
          </span>
        </button>
      </BloomUnit>
      <div id="nonprofit-work" className="work-more-panel" hidden={!open}>
        <div className="card-grid">
          {nonprofitWork.map((job) => (
            <CaseCard
              key={job.id}
              id={job.id}
              href={`/work/${job.id}`}
              title={job.company}
              kicker={job.role}
              summary={job.summary}
              meta={roleMeta(job)}
              whisper={job.whisper}
              accent={job.accent}
            />
          ))}
        </div>
      </div>
    </>
  );
}

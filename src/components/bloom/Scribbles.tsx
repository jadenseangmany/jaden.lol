import type { BloomVariant } from "./Bloom";

const paths = [
  [
    "M24 168 C 140 168 210 24 776 36",
    "M392 12 L392 188",
    "M48 96 L132 96",
  ],
  [
    "M12 48 C 180 12 420 210 788 92",
    "M28 8 L28 192",
    "M640 24 L760 24",
  ],
  [
    "M40 180 C 260 40 520 40 760 176",
    "M200 16 L200 184",
    "M620 40 L740 40",
  ],
] as const;

function seedIndex(seed: string) {
  const total = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % paths.length;
}

export function Scribbles({ seed }: { seed: string; variant: BloomVariant }) {
  const set = paths[seedIndex(seed)] ?? paths[0];

  return (
    <svg viewBox="-40 -30 880 260" preserveAspectRatio="none" aria-hidden="true">
      {set.map((d) => (
        <path
          key={d}
          className="scribble-path"
          pathLength={1}
          d={d}
        />
      ))}
      <path
        className="scribble-path"
        pathLength={1}
        d="M16 16 L28 16 M16 16 L16 28"
      />
    </svg>
  );
}

"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  type ReactElement,
  type ReactNode,
} from "react";

const GLYPHS =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789#%?*";
const SKIP = new Set(["svg", "path", "br", "hr", "img", "canvas", "video"]);

export type BloomField = {
  x: number;
  y: number;
  radius: number;
  sourceId: string;
};

export function circleHitsRect(
  rect: DOMRect,
  x: number,
  y: number,
  radius: number,
) {
  const qx = Math.min(Math.max(x, rect.left), rect.right);
  const qy = Math.min(Math.max(y, rect.top), rect.bottom);
  const dx = x - qx;
  const dy = y - qy;
  return dx * dx + dy * dy <= radius * radius;
}

function randomGlyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0] ?? "?";
}

function graphemes(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
      text,
    )].map((part) => part.segment);
  }
  return [...text];
}

const BloomChar = memo(function BloomChar({ ch }: { ch: string }) {
  return (
    <span data-bloom-char="" data-glyph={ch}>
      {ch}
    </span>
  );
});

function CharLine({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let i = 0;
  for (const ch of graphemes(text)) {
    if (/\s/.test(ch)) {
      nodes.push(ch);
      continue;
    }
    nodes.push(<BloomChar key={i} ch={ch} />);
    i += 1;
  }
  return <>{nodes}</>;
}

export function BloomText({ text }: { text: string }) {
  return <CharLine text={text} />;
}

export function wrapBloomChars(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (child == null || typeof child === "boolean") return child;
    if (typeof child === "string" || typeof child === "number") {
      return <CharLine text={String(child)} />;
    }
    if (!isValidElement(child)) return child;
    if (typeof child.type === "string" && SKIP.has(child.type)) return child;
    const props = child.props as {
      children?: ReactNode;
      className?: unknown;
      "data-bloom-char"?: string;
    };
    if (props["data-bloom-char"] != null) return child;
    const className =
      typeof props.className === "string"
        ? props.className
        : Array.isArray(props.className)
          ? props.className.filter(Boolean).join(" ")
          : "";
    if (/\b(skill-items|stat-items)\b/.test(className)) return child;
    if (props.children == null) return child;
    return cloneElement(child as ReactElement<{ children?: ReactNode }>, {
      children: wrapBloomChars(props.children),
    });
  });
}

function clearCharTimer(el: HTMLElement) {
  const timer = el.dataset.timer;
  if (timer) window.clearTimeout(Number(timer));
  delete el.dataset.timer;
}

export function releaseChar(el: HTMLElement) {
  clearCharTimer(el);
  delete el.dataset.scrambling;
  el.textContent = el.dataset.glyph ?? "";
  el.classList.remove("is-bloom");
}

export function scrambleChar(
  el: HTMLElement,
  delayMs: number,
  reduced: boolean,
) {
  const original = el.dataset.glyph ?? el.textContent ?? "";
  clearCharTimer(el);
  if (reduced) {
    el.textContent = original;
    el.classList.add("is-bloom");
    delete el.dataset.scrambling;
    return;
  }

  el.dataset.scrambling = "1";
  const ticks = 10 + Math.min((delayMs / 20) | 0, 8);
  let n = 0;

  const tick = () => {
    if (el.dataset.scrambling !== "1") return;
    n += 1;
    if (n >= ticks) {
      el.textContent = original;
      el.classList.add("is-bloom");
      delete el.dataset.scrambling;
      delete el.dataset.timer;
      return;
    }
    el.textContent = randomGlyph();
    el.dataset.timer = String(window.setTimeout(tick, 18));
  };

  el.dataset.timer = String(window.setTimeout(tick, delayMs));
}

export function releaseAllChars(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-bloom-char]").forEach(releaseChar);
}

const SKIP_WRAP = new Set([
  "SCRIPT",
  "STYLE",
  "TEXTAREA",
  "INPUT",
  "SVG",
  "NOSCRIPT",
  "CODE",
]);

export function wrapLooseText(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !/[^\s]/.test(node.nodeValue)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (SKIP_WRAP.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (
        parent.closest(
          "[data-bloom-char], .nurture-toggle, .bloom-settings, .pill-sizer, .skip-link, .route-cover, .skill-items, .stat-items, .listening-hours, .listening-ask, .horizon, .about-photo, svg",
        )
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const text of nodes) {
    const value = text.nodeValue ?? "";
    const frag = document.createDocumentFragment();
    for (const ch of graphemes(value)) {
      if (/\s/.test(ch)) {
        frag.append(ch);
        continue;
      }
      const span = document.createElement("span");
      span.dataset.bloomChar = "";
      span.dataset.glyph = ch;
      span.textContent = ch;
      frag.append(span);
    }
    text.replaceWith(frag);
  }
}

export function syncUnitChars(
  unit: HTMLElement,
  field: BloomField | "all" | null,
  reduced: boolean,
) {
  const root = unit.querySelector(".bloom-content") ?? unit;
  const chars = [
    ...root.querySelectorAll<HTMLElement>("[data-bloom-char]"),
  ].filter((el) => {
    const cycle = el.closest(".hero-cycle");
    if (!cycle) return true;
    return root.classList.contains("hero-cycle") && root.contains(el);
  });

  if (field === null) {
    chars.forEach(releaseChar);
    return;
  }

  chars.forEach((el, index) => {
    const active =
      el.classList.contains("is-bloom") || el.dataset.scrambling === "1";
    const covered =
      field === "all" ||
      circleHitsRect(el.getBoundingClientRect(), field.x, field.y, field.radius);

    if (covered && !active) {
      scrambleChar(el, Math.min(index, 16) * 20, reduced);
    } else if (!covered && active) {
      releaseChar(el);
    }
  });
}

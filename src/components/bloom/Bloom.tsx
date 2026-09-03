"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  circleHitsRect,
  syncUnitChars,
  wrapBloomChars,
  type BloomField,
} from "./chars";

export function bloomCursorRadius() {
  if (typeof document === "undefined") return 16;
  return document.documentElement.classList.contains("bloom-cursor-hot")
    ? 20
    : 16;
}

const STORAGE_KEY = "jaden.bloom";

export const BLOOM_MODES = ["hybrid", "nurture", "simple"] as const;
export type BloomMode = (typeof BLOOM_MODES)[number];

export function nextBloomMode(mode: BloomMode): BloomMode {
  const index = BLOOM_MODES.indexOf(mode);
  return BLOOM_MODES[(index + 1) % BLOOM_MODES.length] ?? "hybrid";
}

function isBloomMode(value: unknown): value is BloomMode {
  return value === "hybrid" || value === "nurture" || value === "simple";
}

type BloomSettings = {
  mode: BloomMode;
  fullBloom: boolean;
};

function settingsOf(mode: BloomMode): BloomSettings {
  return { mode, fullBloom: mode === "nurture" };
}

type BloomStore = {
  field: BloomField | null;
  pinnedId: string | null;
  mode: BloomMode;
  fullBloom: boolean;
};

const DEFAULT_STORE: BloomStore = {
  field: null,
  pinnedId: null,
  mode: "hybrid",
  fullBloom: false,
};

type BloomContextValue = {
  getSnapshot: () => BloomStore;
  subscribe: (listener: () => void) => () => void;
  subscribeSettings: (listener: () => void) => () => void;
  getSettingsSnapshot: () => BloomSettings;
  register: (id: string, el: HTMLElement | null) => void;
  placeField: (x: number, y: number, sourceId: string, radius: number) => void;
  clearField: (sourceId: string) => void;
  togglePin: (id: string) => void;
  setMode: (mode: BloomMode) => void;
  cycleMode: () => void;
};

export function applyBloomDom(mode: BloomMode) {
  const root = document.documentElement;
  root.style.setProperty("--bloom-scale", "1");
  root.classList.remove("bloom-off");
  root.classList.toggle("full-bloom", mode === "nurture");
  root.classList.toggle("bloom-simple", mode === "simple");
  root.dataset.bloomMode = mode;
}

function persistMode(mode: BloomMode) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode }));
  } catch {
    /* ignore quota / private mode */
  }
}

function readStoredMode(): BloomMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "hybrid";
    const parsed = JSON.parse(raw) as {
      mode?: unknown;
      fullBloom?: unknown;
      nurture?: unknown;
    };
    if (isBloomMode(parsed.mode)) return parsed.mode;
    if (parsed.fullBloom === true || parsed.nurture === true) return "nurture";
    return "hybrid";
  } catch {
    return "hybrid";
  }
}

const BloomContext = createContext<BloomContextValue | null>(null);

export function BloomProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<BloomStore>({ ...DEFAULT_STORE });
  const listenersRef = useRef(new Set<() => void>());
  const settingsListenersRef = useRef(new Set<() => void>());
  const settingsRef = useRef(settingsOf("hybrid"));
  const unitsRef = useRef(new Map<string, HTMLElement>());

  const emit = useCallback(() => {
    listenersRef.current.forEach((listener) => listener());
  }, []);

  const getSnapshot = useCallback(() => storeRef.current, []);

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const subscribeSettings = useCallback((listener: () => void) => {
    settingsListenersRef.current.add(listener);
    return () => {
      settingsListenersRef.current.delete(listener);
    };
  }, []);

  const getSettingsSnapshot = useCallback(() => settingsRef.current, []);

  const emitSettings = useCallback((mode: BloomMode) => {
    if (settingsRef.current.mode === mode) return;
    settingsRef.current = settingsOf(mode);
    settingsListenersRef.current.forEach((listener) => listener());
  }, []);

  const register = useCallback((id: string, el: HTMLElement | null) => {
    if (el) unitsRef.current.set(id, el);
    else unitsRef.current.delete(id);
  }, []);

  const placeField = useCallback(
    (x: number, y: number, sourceId: string, radius: number) => {
      if (storeRef.current.mode !== "hybrid") return;
      storeRef.current = { ...storeRef.current, field: { x, y, radius, sourceId } };
      emit();
    },
    [emit],
  );

  const clearField = useCallback(
    (sourceId: string) => {
      const current = storeRef.current.field;
      if (!current || current.sourceId !== sourceId) return;
      storeRef.current = { ...storeRef.current, field: null };
      emit();
    },
    [emit],
  );

  const togglePin = useCallback(
    (id: string) => {
      if (storeRef.current.mode !== "hybrid") return;
      const pinnedId = storeRef.current.pinnedId === id ? null : id;
      storeRef.current = { ...storeRef.current, pinnedId };
      emit();
    },
    [emit],
  );

  const setMode = useCallback(
    (mode: BloomMode) => {
      persistMode(mode);
      const from = storeRef.current.mode;
      const fullBloom = mode === "nurture";
      if (mode === "nurture" || mode === "simple") applyBloomDom(mode);
      else if (from !== "nurture") applyBloomDom("hybrid");
      storeRef.current = {
        ...storeRef.current,
        mode,
        fullBloom,
        field: mode === "hybrid" ? storeRef.current.field : null,
        pinnedId: mode === "hybrid" ? storeRef.current.pinnedId : null,
      };
      emit();
      emitSettings(mode);
    },
    [emit, emitSettings],
  );

  const cycleMode = useCallback(() => {
    setMode(nextBloomMode(storeRef.current.mode));
  }, [setMode]);

  useEffect(() => {
    const mode = readStoredMode();
    applyBloomDom(mode);
    storeRef.current = {
      ...storeRef.current,
      mode,
      fullBloom: mode === "nurture",
    };
    emit();
    settingsRef.current = settingsOf(mode);
    settingsListenersRef.current.forEach((listener) => listener());
  }, [emit]);

  useEffect(() => {
    let raf = 0;
    let next: { x: number; y: number } | null = null;

    function flush() {
      raf = 0;
      const point = next;
      next = null;
      const current = storeRef.current.field;
      if (!point || !current) return;

      const under = document
        .elementFromPoint(point.x, point.y)
        ?.closest("[data-bloom-id]");

      if (under instanceof HTMLElement) {
        const sourceId = under.getAttribute("data-bloom-id");
        if (!sourceId) return;
        const radius = bloomCursorRadius();
        storeRef.current = {
          ...storeRef.current,
          field: { x: point.x, y: point.y, radius, sourceId },
        };
        emit();
        return;
      }

      let stillNear = false;
      for (const el of unitsRef.current.values()) {
        if (
          circleHitsRect(
            el.getBoundingClientRect(),
            point.x,
            point.y,
            current.radius,
          )
        ) {
          stillNear = true;
          break;
        }
      }

      storeRef.current = {
        ...storeRef.current,
        field: stillNear
          ? { ...current, x: point.x, y: point.y }
          : null,
      };
      emit();
    }

    function onMove(event: PointerEvent) {
      if (!storeRef.current.field || storeRef.current.mode !== "hybrid") return;
      next = { x: event.clientX, y: event.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    }

    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (!storeRef.current.pinnedId) return;
      storeRef.current = { ...storeRef.current, pinnedId: null };
      emit();
    }

    function onPointerDown(event: PointerEvent) {
      const pinnedId = storeRef.current.pinnedId;
      if (!pinnedId) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const unit = target.closest("[data-bloom-id]");
      if (unit?.getAttribute("data-bloom-id") === pinnedId) return;
      storeRef.current = { ...storeRef.current, pinnedId: null };
      emit();
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [emit]);

  const value = useMemo(
    () => ({
      getSnapshot,
      subscribe,
      subscribeSettings,
      getSettingsSnapshot,
      register,
      placeField,
      clearField,
      togglePin,
      setMode,
      cycleMode,
    }),
    [
      getSnapshot,
      subscribe,
      subscribeSettings,
      getSettingsSnapshot,
      register,
      placeField,
      clearField,
      togglePin,
      setMode,
      cycleMode,
    ],
  );

  return <BloomContext.Provider value={value}>{children}</BloomContext.Provider>;
}

export function useBloom() {
  const ctx = useContext(BloomContext);
  if (!ctx) {
    throw new Error("useBloom must be used within BloomProvider");
  }
  return ctx;
}

export function useBloomSnapshot() {
  const { subscribeSettings, getSettingsSnapshot } = useBloom();
  return useSyncExternalStore(
    subscribeSettings,
    getSettingsSnapshot,
    getSettingsSnapshot,
  );
}

export type BloomVariant = "meadow" | "split" | "paper" | "nav";

type BloomUnitProps = {
  id: string;
  variant?: BloomVariant;
  pinOnClick?: boolean;
  decodeAll?: boolean;
  className?: string;
  children: ReactNode;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <BloomUnit
      id={id}
      variant="meadow"
      pinOnClick={false}
      decodeAll
      className="section-heading"
    >
      <h2 className="section-title">{children}</h2>
    </BloomUnit>
  );
}

export function BloomUnit({
  id,
  variant = "meadow",
  pinOnClick = true,
  decodeAll = true,
  className,
  children,
}: BloomUnitProps) {
  const { subscribe, getSnapshot, register, placeField, clearField, togglePin } =
    useBloom();
  const unitRef = useRef<HTMLDivElement>(null);
  const decoded = useMemo(() => wrapBloomChars(children), [children]);

  useEffect(() => {
    const unit = unitRef.current;
    if (unit) register(id, unit);
    return () => register(id, null);
  }, [id, register]);

  useEffect(() => {
    const unit = unitRef.current;
    if (!unit) return;

    const sync = () => {
      const { field, pinnedId, fullBloom, mode } = getSnapshot();
      if (mode === "simple") {
        unit.removeAttribute("data-bloom");
        unit.removeAttribute("data-decode");
        syncUnitChars(unit, null, true);
        return;
      }
      if (
        fullBloom ||
        document.documentElement.classList.contains("full-bloom")
      ) {
        unit.removeAttribute("data-bloom");
        return;
      }
      const pinned = pinnedId === id;
      const isSource = field?.sourceId === id;
      const wasDecode = unit.hasAttribute("data-decode");
      const active = pinned || Boolean(isSource);

      unit.toggleAttribute("data-bloom", active);
      unit.toggleAttribute("data-decode", active);

      if (!active && !wasDecode) return;

      const reduced = prefersReducedMotion();
      if (active) {
        syncUnitChars(unit, "all", reduced, true);
      } else {
        syncUnitChars(unit, null, reduced);
      }
    };

    sync();
    return subscribe(sync);
  }, [getSnapshot, id, subscribe]);

  useEffect(() => {
    const unit = unitRef.current;
    return () => {
      if (unit) syncUnitChars(unit, null, true);
    };
  }, []);

  const pointAt = useCallback(
    (clientX: number, clientY: number) => {
      if (getSnapshot().mode !== "hybrid") return;
      placeField(
        clientX,
        clientY,
        id,
        bloomCursorRadius(),
      );
    },
    [getSnapshot, id, placeField],
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!pinOnClick || getSnapshot().mode !== "hybrid") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePin(id);
    }
  }

  function onPointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Element) {
      const nextUnit = next.closest("[data-bloom-id]");
      if (nextUnit?.getAttribute("data-bloom-id") === id) return;
    }
    clearField(id);
  }

  return (
    <div
      ref={unitRef}
      className={cn("bloom-unit", `bloom-unit--${variant}`, className)}
      data-bloom-id={id}
      data-pin={pinOnClick ? "true" : undefined}
      tabIndex={pinOnClick ? 0 : undefined}
      onPointerEnter={(event) => pointAt(event.clientX, event.clientY)}
      onPointerMove={(event) => pointAt(event.clientX, event.clientY)}
      onPointerLeave={onPointerLeave}
      onFocusCapture={() => {
        const unit = unitRef.current;
        if (!unit) return;
        const box = unit.getBoundingClientRect();
        placeField(
          box.left + box.width * 0.5,
          box.top + box.height * 0.4,
          id,
          bloomCursorRadius(),
        );
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          clearField(id);
        }
      }}
      onClick={(event) => {
        if (!pinOnClick || getSnapshot().mode !== "hybrid") return;
        if ((event.target as HTMLElement).closest("a")) return;
        togglePin(id);
      }}
      onKeyDown={onKeyDown}
    >
      <div className="bloom-content">{decoded}</div>
    </div>
  );
}

"use client";

const STORAGE_KEY = "jaden.theme";

export type SiteTheme = "dark" | "light";

function persistTheme(theme: SiteTheme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
}

export function applyTheme(theme: SiteTheme) {
  const root = document.documentElement;

  function commit() {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    persistTheme(theme);
  }

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    commit();
    return;
  }

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(commit);
    return;
  }

  root.classList.add("theme-animate");
  commit();
  window.setTimeout(() => {
    root.classList.remove("theme-animate");
  }, 600);
}

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <circle cx="8" cy="8" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <path
        d="M12.6 10.2A5.1 5.1 0 0 1 6.2 3.4 5.2 5.2 0 1 0 12.6 10.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light and dark"
      onClick={() => {
        const next =
          document.documentElement.dataset.theme === "light" ? "dark" : "light";
        applyTheme(next);
      }}
    >
      <span className="theme-icon theme-icon-sun">
        <SunIcon />
      </span>
      <span className="theme-icon theme-icon-moon">
        <MoonIcon />
      </span>
    </button>
  );
}

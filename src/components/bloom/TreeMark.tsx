export function TreeMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M18 26.5V10.5M18 10.5C18 10.5 13.8 13 12.6 17.2C11.8 20.1 14.4 21.4 18 20.2M18 10.5C18 10.5 22.2 13 23.4 17.2C24.2 20.1 21.6 21.4 18 20.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

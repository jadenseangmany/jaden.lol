import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-main">
      <div className="frame">
        <h1 className="page-title">Not found</h1>
        <p className="case-card-summary">That page is not on this site.</p>
        <p>
          <Link className="back-link" href="/">
            Home
          </Link>
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container section">
      <p className="eyebrow">404 · LET’S GET YOU BACK ON TRACK</p>
      <h1>This page took a different path.</h1>
      <p className="lede">
        The link may have changed. You can explore coverage options or ask Steve
        for help.
      </p>
      <div className="actions" style={{ marginTop: 30 }}>
        <Link className="button" href="/">
          Back to home
        </Link>
        <Link className="button button-outline" href="/contact">
          Contact Steve
        </Link>
      </div>
    </div>
  );
}

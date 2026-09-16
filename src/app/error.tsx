"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container section">
      <h1>Something didn’t load correctly.</h1>
      <p className="lede">
        Please try again. If you were completing a form, delivery has not been
        confirmed.
      </p>
      <button className="button" onClick={reset} style={{ marginTop: 25 }}>
        Try again
      </button>
    </div>
  );
}

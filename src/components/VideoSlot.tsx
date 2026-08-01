import { useState } from "react";
import { Play } from "lucide-react";
import { content } from "../content";

/**
 * The demo video. Every branch reserves the same 16:9 box, so switching
 * `content.demo` between a placeholder, a self-hosted file and a hosted embed
 * never shifts the layout (and never costs a CLS point).
 *
 * The hosted branches are click-to-load: nothing is requested from YouTube or
 * Loom until the visitor actually asks for the video.
 */
export function VideoSlot() {
  const demo = content.demo;
  const [activated, setActivated] = useState(false);

  const frame =
    "relative aspect-video w-full overflow-hidden rounded-lg border border-hairline bg-surface";

  if (demo.kind === "file") {
    return (
      <div className={frame}>
        <video
          className="size-full"
          controls
          preload="metadata"
          playsInline
          {...(demo.poster ? { poster: demo.poster } : {})}
        >
          <source src={demo.src} type="video/mp4" />
          Your browser cannot play embedded video.{" "}
          <a href={demo.src}>Download the walkthrough instead.</a>
        </video>
      </div>
    );
  }

  if (demo.kind === "youtube" || demo.kind === "loom") {
    const src =
      demo.kind === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${demo.id}?autoplay=1&rel=0`
        : `https://www.loom.com/embed/${demo.id}?autoplay=1`;

    if (activated) {
      return (
        <div className={frame}>
          <iframe
            className="size-full"
            src={src}
            title="SixRise — 90-second product walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        className={`${frame} group cursor-pointer text-left`}
      >
        <Grid />
        <Center>
          <PlayBadge />
          <p className="mt-4 font-mono text-xs tracking-[0.14em] text-ink-2 uppercase">
            Play the 90-second walkthrough
          </p>
          <p className="mt-1.5 font-mono text-[0.6875rem] text-ink-3">
            loads from {demo.kind === "youtube" ? "YouTube" : "Loom"} on click
          </p>
        </Center>
      </button>
    );
  }

  /* Placeholder — clearly marked, never pretending to be a video. */
  return (
    <div className={frame} role="img" aria-label="Demo video placeholder — the 90-second walkthrough has not been added yet">
      <Grid />
      <Center>
        <PlayBadge muted />
        <p className="mt-4 font-mono text-xs tracking-[0.14em] text-ink-2 uppercase">
          90-second walkthrough
        </p>
        <p className="mt-1.5 font-mono text-[0.6875rem] text-ink-3">
          video slot — recording drops in here
        </p>
      </Center>
    </div>
  );
}

function Grid() {
  return (
    <div
      aria-hidden="true"
      className="plot-grid pointer-events-none absolute inset-0"
    />
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {children}
    </div>
  );
}

function PlayBadge({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-14 items-center justify-center rounded-full border transition-colors duration-200 ${
        muted
          ? "border-hairline-strong text-ink-3"
          : "border-signal/40 bg-signal-dim text-signal group-hover:border-signal/70"
      }`}
    >
      <Play className="size-5 translate-x-px" strokeWidth={1.5} fill="currentColor" />
    </span>
  );
}

import { ArrowUpRight, Play } from "lucide-react";
import { content } from "../content";
import { Container } from "./Section";
import { VideoSlot } from "./VideoSlot";

export function Hero() {
  const { eyebrow, headline, primaryCta, secondaryCta, videoCaption } =
    content.hero;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="plot-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="eyebrow flex items-center gap-2.5">
          <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
          {eyebrow}
        </p>

        <h1 className="mt-8 max-w-4xl">
          <span className="block font-mono text-sm font-medium tracking-[0.34em] text-ink-2 uppercase">
            {content.name}
          </span>
          {/* The wordmark and the sentence are separate blocks visually, but
              they run together in the accessible name without this. */}
          <span className="sr-only"> — </span>
          <span className="mt-5 block text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-ink sm:text-5xl lg:text-[3.4rem]">
            {headline.lead}
            {" — "}
            <span className="font-mono text-[0.82em] font-medium tracking-tight text-ink-2">
              {headline.engines.join(", ")}
            </span>
            {" — "}
            <span className="text-ink-2">{headline.tail}</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#demo"
            className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm bg-signal px-5 py-3 font-mono text-xs font-medium tracking-[0.1em] text-canvas uppercase transition-opacity duration-200 hover:opacity-90"
          >
            <Play aria-hidden="true" className="size-4" fill="currentColor" strokeWidth={0} />
            {primaryCta}
          </a>

          <a
            href={content.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm border border-hairline-strong px-5 py-3 font-mono text-xs font-medium tracking-[0.1em] text-ink uppercase transition-colors duration-200 hover:border-ink-3 hover:bg-surface"
          >
            {secondaryCta}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </a>
        </div>

        <div id="demo" className="mt-14 scroll-mt-24">
          <VideoSlot />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-2">
            {videoCaption}
          </p>
        </div>
      </Container>
    </div>
  );
}

import type { ReactNode } from "react";
import { content, type Metric } from "../content";
import { Container } from "./Section";
import { Dumbbell, DumbbellPending } from "./Dumbbell";

/**
 * The hero metric.
 *
 * Two rules carried over from the product itself, because they are the reason
 * the number is worth anything:
 *
 *   1. No data is a STATE, never a zero. A missing rate renders as "no data
 *      this period" — coalescing it to 0 would show a fabricated regression for
 *      what was only a flaky engine. There is no `?? 0` in this file.
 *   2. The copy is observational. "Recommendation rate — before X, after Y."
 *      Never "uplift caused by", because the measurement is shop-level and
 *      cannot be attributed to any individual fix.
 *
 * The pending state deliberately shows the *shape* of the eventual reading —
 * the hero figure slot, the axis, both endpoints — with every value struck out
 * as unmeasured. It is a designed empty state, not a gap.
 */
export function MetricBand() {
  const metric = content.metric;

  return (
    <section
      aria-labelledby="metric-title"
      className="relative border-y border-hairline bg-surface"
    >
      <div
        aria-hidden="true"
        className="plot-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative py-20 sm:py-28">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
            {metric.label}
          </p>
          <StatusChip status={metric.status} />
        </div>

        <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          {metric.status === "pending" ? (
            <PendingCopy metric={metric} />
          ) : (
            <LiveCopy metric={metric} />
          )}

          <Plot
            caption={
              metric.status === "pending"
                ? "no reading yet"
                : `${metric.engine} · ${metric.panelSize} queries`
            }
          >
            {metric.status === "pending" ? (
              <DumbbellPending />
            ) : metric.preRate !== null && metric.postRate !== null ? (
              <Dumbbell pre={metric.preRate} post={metric.postRate} />
            ) : (
              <NoDataPlot />
            )}
          </Plot>
        </div>

        <p className="mt-12 max-w-2xl border-t border-hairline pt-5 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
          {metric.method}
        </p>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function StatusChip({ status }: { status: Metric["status"] }) {
  const pending = status === "pending";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-3 uppercase">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${pending ? "bg-ink-3" : "bg-signal"}`}
      />
      {pending ? "Pending" : "Measured"}
    </span>
  );
}

/** The framed plot area. Giving the mark a border and its own padding is what
 *  makes an endpoint sitting at 0% read as the end of an axis rather than as a
 *  stray dot at the edge of the page. */
function Plot({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-canvas px-6 pt-5 pb-6 sm:px-8 sm:pb-8">
      <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-3 uppercase">
          Recommendation rate
        </span>
        <span className="font-mono text-[0.625rem] text-ink-3">{caption}</span>
      </div>
      {children}
    </div>
  );
}

/** The hero figure and its unit. One slot serves both states, so the pending
 *  page shows exactly where the real number will land — and an empty slot reads
 *  as reserved rather than as a number that happens to be missing. */
function HeroFigure({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="mt-8">
      <p className="font-mono text-6xl leading-none font-semibold tracking-tight text-signal sm:text-7xl">
        {value}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-3 uppercase">
        {unit}
      </p>
    </div>
  );
}

/** The same slot, empty. A dashed frame the size of the figure it is waiting
 *  for — unmistakably a reserved space, and impossible to read as a value. */
function HeroFigureSlot({ unit }: { unit: string }) {
  return (
    <div className="mt-8">
      <span
        className="flex h-16 w-36 items-center justify-center rounded-sm border border-dashed border-hairline-strong font-mono text-2xl text-ink-3 sm:h-20 sm:w-44"
        role="img"
        aria-label="No figure yet"
      >
        —
      </span>
      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-3 uppercase">
        {unit}
      </p>
    </div>
  );
}

function PendingCopy({
  metric,
}: {
  metric: Extract<Metric, { status: "pending" }>;
}) {
  return (
    <div>
      <h2
        id="metric-title"
        className="text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-ink sm:text-4xl"
      >
        {metric.headline}
      </h2>

      <HeroFigureSlot unit="percentage points" />

      <p className="mt-8 max-w-[56ch] text-sm leading-relaxed text-ink-2">
        {metric.note}
      </p>

      <p className="mt-5 inline-flex items-center gap-2.5 rounded-sm border border-hairline bg-canvas px-3 py-2 font-mono text-xs tracking-wide">
        <span className="text-ink-3">settled figure due</span>
        <span className="text-ink">{metric.dueLabel}</span>
      </p>
    </div>
  );
}

function LiveCopy({ metric }: { metric: Extract<Metric, { status: "live" }> }) {
  const { preRate, postRate } = metric;
  const hasBothSides = preRate !== null && postRate !== null;

  return (
    <div>
      <h2
        id="metric-title"
        className="text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-ink sm:text-4xl"
      >
        {metric.headline}
      </h2>

      {hasBothSides ? (
        <>
          <HeroFigure
            value={formatDelta(postRate - preRate)}
            unit="percentage points"
          />
          <p className="mt-8 max-w-[56ch] text-sm leading-relaxed text-ink-2">
            Recommendation rate on {metric.engine} — before{" "}
            <span className="font-mono text-ink">{preRate}%</span>, after{" "}
            <span className="font-mono text-ink">{postRate}%</span>, over a
            pinned panel of {metric.panelSize} queries.
          </p>
        </>
      ) : (
        <>
          <HeroFigureSlot unit="no data this period" />
          <p className="mt-8 max-w-[56ch] text-sm leading-relaxed text-ink-2">
            {metric.engine} returned no usable result on one side of the
            comparison, so there is no delta to report. That is not a decline —
            it is an absence of measurement, and it is shown as one.
          </p>
        </>
      )}

      <p className="mt-5 inline-flex items-center gap-2.5 rounded-sm border border-hairline bg-canvas px-3 py-2 font-mono text-xs tracking-wide">
        <span className="text-ink-3">measured</span>
        <span className="text-ink">{metric.measuredAtLabel}</span>
        <span className="text-ink-3">
          · after {metric.fixesMeasured}{" "}
          {metric.fixesMeasured === 1 ? "fix" : "fixes"} went live
        </span>
      </p>
    </div>
  );
}

function NoDataPlot() {
  return (
    <div className="flex h-32 items-center justify-center">
      <p className="font-mono text-xs tracking-[0.14em] text-ink-3 uppercase">
        no data this period
      </p>
    </div>
  );
}

function formatDelta(delta: number): string {
  const sign = delta > 0 ? "+" : delta < 0 ? "−" : "";
  const magnitude = Math.abs(delta);
  return `${sign}${Number.isInteger(magnitude) ? magnitude : magnitude.toFixed(1)}`;
}

/**
 * A before → after reading of ONE rate.
 *
 * Deliberately not a bar chart: a single pair of values on one measure is a
 * dumbbell with a hero figure, not two bars. The "before" endpoint is neutral
 * ink and the "after" endpoint carries the one signal colour — emphasis, so the
 * eye lands on the thing that moved.
 *
 * Drawn with layout primitives rather than a chart library. The axis always
 * starts at zero, and the upper bound is shown, so the length of the segment
 * cannot overstate the movement.
 */

const TRACK = "absolute top-1/2 -translate-y-1/2";

export function DumbbellPending() {
  return (
    <figure className="mt-5">
      <div className="relative h-24" aria-hidden="true">
        <div className={`${TRACK} h-px w-full bg-hairline`} />
        <div
          className={`${TRACK} h-px w-full border-t border-dashed border-hairline-strong`}
        />
        <Endpoint position={0} tone="empty" label="before" value="——%" side="below" />
        <Endpoint position={100} tone="empty" label="after" value="——%" side="above" />
      </div>

      <div
        aria-hidden="true"
        className="mt-1 flex justify-between border-t border-hairline pt-2 font-mono text-[0.6875rem] text-ink-3"
      >
        <span>0%</span>
        <span>——%</span>
      </div>

      <figcaption className="sr-only">
        No settled reading yet. Both the before and after recommendation rates
        are unmeasured.
      </figcaption>
    </figure>
  );
}

export function Dumbbell({
  pre,
  post,
  unit = "%",
}: {
  pre: number;
  post: number;
  unit?: string;
}) {
  /* Zero-based axis with headroom, rounded up to a readable step. */
  const rawMax = Math.max(pre, post, 1);
  const step = rawMax <= 20 ? 5 : rawMax <= 50 ? 10 : 25;
  const axisMax = Math.max(step, Math.ceil((rawMax * 1.25) / step) * step);

  const scale = (v: number) => (v / axisMax) * 100;
  const prePos = scale(pre);
  const postPos = scale(post);
  const rose = post >= pre;

  return (
    <figure className="mt-5">
      <div className="relative h-24">
        <div className={`${TRACK} h-px w-full bg-hairline`} aria-hidden="true" />
        <div
          aria-hidden="true"
          className={`${TRACK} h-[3px] rounded-full ${rose ? "bg-signal" : "bg-ink-3"}`}
          style={{
            left: `${Math.min(prePos, postPos)}%`,
            width: `${Math.abs(postPos - prePos)}%`,
          }}
        />
        <Endpoint
          position={prePos}
          tone="neutral"
          label="before"
          value={`${format(pre)}${unit}`}
          side="below"
        />
        <Endpoint
          position={postPos}
          tone={rose ? "signal" : "neutral"}
          label="after"
          value={`${format(post)}${unit}`}
          side="above"
        />
      </div>

      <div
        aria-hidden="true"
        className="mt-1 flex justify-between border-t border-hairline pt-2 font-mono text-[0.6875rem] text-ink-3"
      >
        <span>0{unit}</span>
        <span>
          {axisMax}
          {unit}
        </span>
      </div>

      {/* The same numbers, reachable without reading the mark. */}
      <figcaption className="sr-only">
        Recommendation rate before the fixes went live: {format(pre)}
        {unit}. After: {format(post)}
        {unit}.
      </figcaption>
    </figure>
  );
}

function format(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function Endpoint({
  position,
  tone,
  label,
  value,
  side,
}: {
  position: number;
  tone: "signal" | "neutral" | "empty";
  label: string;
  value: string;
  side: "above" | "below";
}) {
  const dot =
    tone === "signal"
      ? "border-signal bg-signal"
      : tone === "neutral"
        ? "border-ink-2 bg-ink-2"
        : "border-hairline-strong bg-canvas";

  /* Endpoints sit at 0% and 100% too, so the label is nudged inward at the
     extremes rather than being centred off the edge of the plot. */
  const anchor =
    position <= 6
      ? "left-0 translate-x-0 text-left"
      : position >= 94
        ? "right-0 translate-x-0 text-right"
        : "-translate-x-1/2 text-center";
  const anchorStyle =
    position <= 6 || position >= 94 ? {} : { left: `${position}%` };

  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${dot}`}
        style={{ left: `${position}%` }}
      />
      <span
        className={`absolute whitespace-nowrap ${anchor} ${
          side === "above" ? "top-1" : "bottom-1"
        }`}
        style={anchorStyle}
      >
        <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-ink-3 uppercase">
          {label}
        </span>
        <span
          className={`block font-mono text-base font-medium ${
            tone === "signal" ? "text-signal" : tone === "empty" ? "text-ink-3" : "text-ink"
          }`}
        >
          {value}
        </span>
      </span>
    </>
  );
}

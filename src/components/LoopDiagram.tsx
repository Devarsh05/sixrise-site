import type { Step } from "../content";

/**
 * The audit → fix → verify loop, hand-drawn as inline SVG. No diagram library,
 * no image asset. Strokes inherit `currentColor` so the diagram themes with the
 * page; the one signal colour marks only the return path, because closing the
 * loop is the whole idea.
 *
 * Rendered at >= 768px only. Below that the same four steps render as a
 * vertical list (scaling this down makes the labels illegible), and in both
 * cases the captions exist as real text — the diagram is never the only carrier
 * of the information.
 */

const NODE = 64;
const CENTERS = [120, 360, 600, 840] as const;
const TOP = 30;
const MID = TOP + NODE / 2;

/* The return path runs OUTSIDE the node columns — its vertical legs sit clear
   of the stage labels, which are centred under each node. Routing it through
   the columns puts a dashed line straight through the word "INTERROGATE". */
const RETURN_Y = 172;
const RETURN_LEFT = 46;
const RETURN_RIGHT = 914;

export function LoopDiagram({ steps }: { steps: Step[] }) {
  return (
    <svg
      viewBox="0 0 960 200"
      className="w-full text-ink-3"
      role="img"
      aria-labelledby="loop-title loop-desc"
    >
      <title id="loop-title">The SixRise loop</title>
      <desc id="loop-desc">
        Four stages connected left to right — {steps.map((s) => s.title).join(", ")} —
        with a return path from the last stage back to the first, so each
        verified result becomes the baseline for the next scan.
      </desc>

      <defs>
        <marker
          id="loop-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
        <marker
          id="loop-arrow-signal"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-signal" />
        </marker>
      </defs>

      {/* Connectors between adjacent stages. */}
      {CENTERS.slice(0, -1).map((c, i) => {
        const next = CENTERS[i + 1] ?? c;
        return (
          <line
            key={`c-${i}`}
            x1={c + NODE / 2 + 14}
            y1={MID}
            x2={next - NODE / 2 - 20}
            y2={MID}
            stroke="currentColor"
            strokeWidth="1"
            markerEnd="url(#loop-arrow)"
          />
        );
      })}

      {/* The return path: the verified result becomes the next baseline. */}
      <path
        d={`M ${CENTERS[3] + NODE / 2 + 8} ${MID}
            H ${RETURN_RIGHT}
            V ${RETURN_Y}
            H ${RETURN_LEFT}
            V ${MID}
            H ${CENTERS[0] - NODE / 2 - 10}`}
        fill="none"
        className="stroke-signal"
        strokeWidth="1"
        strokeDasharray="3 4"
        markerEnd="url(#loop-arrow-signal)"
      />
      <rect
        x="326"
        y={RETURN_Y - 10}
        width="308"
        height="20"
        className="fill-canvas"
      />
      <text
        x="480"
        y={RETURN_Y + 5}
        textAnchor="middle"
        className="fill-signal font-mono"
        fontSize="14"
        letterSpacing="1"
      >
        the result becomes the next baseline
      </text>

      {/* Stages. */}
      {steps.map((step, i) => {
        const cx = CENTERS[i] ?? 0;
        return (
          <g key={step.id}>
            <rect
              x={cx - NODE / 2}
              y={TOP}
              width={NODE}
              height={NODE}
              rx="6"
              className="fill-surface"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x={cx}
              y={MID + 5}
              textAnchor="middle"
              className="fill-ink-3 font-mono"
              fontSize="14"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            <text
              x={cx}
              y={TOP + NODE + 30}
              textAnchor="middle"
              className="fill-ink font-mono"
              fontSize="17"
              letterSpacing="1.6"
            >
              {step.title.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

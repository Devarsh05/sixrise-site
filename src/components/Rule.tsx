/**
 * A full-bleed section boundary drawn as a measuring rule: one hairline with
 * evenly-spaced ticks hanging off it. This is the page's structural motif —
 * it is what makes the layout read as an instrument rather than as a stack of
 * cards. Decorative only.
 */
export function Rule({ ticks = 24 }: { ticks?: number }) {
  return (
    <div aria-hidden="true" className="relative w-full">
      <div className="h-px w-full bg-hairline" />
      <div className="flex h-2 w-full justify-between overflow-hidden">
        {Array.from({ length: ticks }, (_, i) => (
          <span
            key={i}
            className={`w-px bg-hairline ${i % 4 === 0 ? "h-2" : "h-1"}`}
          />
        ))}
      </div>
    </div>
  );
}

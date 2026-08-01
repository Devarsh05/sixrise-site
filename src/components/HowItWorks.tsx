import { content } from "../content";
import { Eyebrow, Section } from "./Section";
import { LoopDiagram } from "./LoopDiagram";

export function HowItWorks() {
  const { eyebrow, title, lede, steps, loopNote } = content.howItWorks;

  return (
    <Section id="how-it-works" labelledBy="how-title">
      <Eyebrow>{eyebrow}</Eyebrow>

      <div className="mt-8 grid gap-x-16 gap-y-5 lg:grid-cols-[1fr_1fr]">
        <h2
          id="how-title"
          className="text-2xl font-semibold tracking-[-0.015em] text-balance text-ink sm:text-3xl"
        >
          {title}
        </h2>
        <p className="max-w-[62ch] text-base leading-relaxed text-ink-2 lg:pt-1">
          {lede}
        </p>
      </div>

      {/* Diagram — wide viewports only. */}
      <div className="mt-14 hidden md:block">
        <LoopDiagram steps={steps} />
      </div>

      {/* Captions. On >= 768px these sit under the diagram as a four-column
          key; below it they ARE the diagram, as a vertical run. */}
      <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:mt-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.id} className="bg-canvas p-6">
            <p className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.16em] text-ink-3 uppercase">
              <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
            </p>
            <h3 className="mt-4 font-mono text-sm font-medium tracking-[0.1em] text-ink uppercase">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{step.plain}</p>
            <p className="mt-4 border-t border-hairline pt-3 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
              {step.technical}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6 flex items-start gap-2.5 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
        <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-signal" />
        {loopNote}
      </p>
    </Section>
  );
}

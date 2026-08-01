import { content } from "../content";
import { Eyebrow, Section } from "./Section";

export function Engineering() {
  const { eyebrow, title, lede, pillars } = content.engineering;

  return (
    <Section id="engineering" labelledBy="eng-title" className="border-t border-hairline">
      <Eyebrow>{eyebrow}</Eyebrow>

      <div className="mt-8 grid gap-x-16 gap-y-5 lg:grid-cols-[1fr_1fr]">
        <h2
          id="eng-title"
          className="text-2xl font-semibold tracking-[-0.015em] text-balance text-ink sm:text-3xl"
        >
          {title}
        </h2>
        <p className="max-w-[62ch] text-base leading-relaxed text-ink-2 lg:pt-1">
          {lede}
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-2">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="bg-canvas p-7 transition-colors duration-200 sm:p-9 hover:bg-surface"
          >
            <p className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.16em] text-ink-3 uppercase">
              <span className="text-ink-2">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
              {pillar.kicker}
            </p>

            <h3 className="mt-5 text-lg leading-snug font-semibold tracking-[-0.01em] text-ink sm:text-xl">
              {pillar.title}
            </h3>

            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-ink-2">
              {pillar.body}
            </p>

            <p className="mt-6 border-t border-hairline pt-4 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
              {pillar.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

import { content } from "../content";
import { Eyebrow, Section } from "./Section";

export function Problem() {
  const { eyebrow, lines } = content.problem;
  const [first, ...rest] = lines;

  return (
    <Section labelledBy="problem-title">
      <Eyebrow>{eyebrow}</Eyebrow>

      <div className="mt-8 grid gap-x-16 gap-y-6 lg:grid-cols-[1.1fr_1fr]">
        <h2
          id="problem-title"
          className="text-2xl leading-[1.25] font-semibold tracking-[-0.015em] text-balance text-ink sm:text-3xl lg:text-[2.1rem]"
        >
          {first}
        </h2>

        <div className="max-w-[62ch] space-y-4 lg:pt-1.5">
          {rest.map((line) => (
            <p key={line} className="text-base leading-relaxed text-ink-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

import { content } from "../content";
import { Eyebrow, Section } from "./Section";

export function TechStack() {
  const { eyebrow, title, groups } = content.stack;

  return (
    <Section labelledBy="stack-title" className="border-t border-hairline">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2
        id="stack-title"
        className="mt-8 text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-3xl"
      >
        {title}
      </h2>

      <dl className="mt-12 space-y-8">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-4 border-t border-hairline pt-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <dt className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-3 uppercase">
              {group.label}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-hairline bg-surface px-2.5 py-1.5 font-mono text-xs text-ink-2"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

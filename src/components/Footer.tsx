import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { content, isPlaceholder } from "../content";
import { Container } from "./Section";
import { Rule } from "./Rule";

export function Footer() {
  const { name, linkedin, year, note } = content.footer;
  const namePending = isPlaceholder(name);
  const linkedinPending = isPlaceholder(linkedin);

  return (
    <footer className="relative border-t border-hairline">
      <Rule />

      <Container className="py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm tracking-[0.2em] text-ink uppercase">
              {content.name}
            </p>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-2">
              {note}
            </p>
            <p className="mt-6 text-sm text-ink-3">
              Built by{" "}
              {namePending ? (
                <Placeholder>your full name</Placeholder>
              ) : (
                <span className="text-ink">{name}</span>
              )}
              , {year}.
            </p>
          </div>

          <nav aria-label="Elsewhere" className="flex flex-col gap-2">
            <FooterLink
              href={content.links.github}
              icon={<Github aria-hidden="true" className="size-4" strokeWidth={1.5} />}
            >
              View on GitHub
            </FooterLink>

            {linkedinPending ? (
              <span className="inline-flex min-h-11 items-center gap-2.5 px-3 py-2.5 font-mono text-xs tracking-wide text-ink-3">
                <Linkedin aria-hidden="true" className="size-4" strokeWidth={1.5} />
                LinkedIn <Placeholder>url</Placeholder>
              </span>
            ) : (
              <FooterLink
                href={linkedin}
                icon={<Linkedin aria-hidden="true" className="size-4" strokeWidth={1.5} />}
              >
                LinkedIn
              </FooterLink>
            )}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-sm px-3 py-2.5 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-200 hover:bg-surface hover:text-ink"
    >
      {icon}
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 text-ink-3 transition-colors duration-200 group-hover:text-ink-2"
        strokeWidth={1.5}
      />
    </a>
  );
}

/** A field that has not been filled in yet, shown as such rather than as a
 *  broken link or an invented value. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-hairline-strong px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-3">
      {children}
    </span>
  );
}

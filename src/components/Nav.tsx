import { Github } from "lucide-react";
import { content } from "../content";
import { Container } from "./Section";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <Container>
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="font-mono text-sm font-medium tracking-[0.2em] text-ink uppercase"
          >
            {content.name}
          </a>

          <div className="flex items-center gap-1">
            {content.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hidden items-center px-3 py-3 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-200 hover:text-ink sm:inline-flex"
              >
                {link.label}
              </a>
            ))}

            <a
              href={content.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-hairline px-3.5 py-2.5 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-200 hover:border-hairline-strong hover:text-ink"
            >
              <Github aria-hidden="true" className="size-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">GitHub</span>
              <span className="sr-only sm:hidden">View SixRise on GitHub</span>
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}

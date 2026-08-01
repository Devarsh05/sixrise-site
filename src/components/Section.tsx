import type { ReactNode } from "react";

/** The page's one horizontal measure. Every section shares it so the hairline
 *  grid stays aligned from top to bottom. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      {...(id ? { id } : {})}
      {...(labelledBy ? { "aria-labelledby": labelledBy } : {})}
      className={`py-20 sm:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** The mono kicker that opens every section. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-2.5">
      <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
      {children}
    </p>
  );
}

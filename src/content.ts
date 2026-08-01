/* =============================================================================
 * EDIT ME — this file is the only place any copy, link or number lives.
 *
 * Four blanks are waiting to be filled in. Search for "TODO" to find them:
 *
 *   1. THE DEMO VIDEO  → `demo`. Set `kind` to "file", "youtube" or "loom" and
 *                        fill in the source. Until then the page renders a
 *                        clearly-labelled placeholder frame.
 *   2. THE HERO METRIC → `metric`. Swap `status: "pending"` for the
 *                        `status: "live"` shape (a filled-in example sits right
 *                        above it, commented out) once a settled figure exists.
 *                        Do not invent a number.
 *   3. YOUR NAME       → `footer.name`
 *   4. YOUR LINKEDIN   → `footer.linkedin`
 *
 * `content` is annotated with the `SiteContent` interface below, so a missing
 * or misspelled field is a compile error rather than a blank spot on the page.
 * Run `npm run typecheck` after editing.
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

/** How the demo video is served. Every variant reserves the same 16:9 box, so
 *  swapping between them never shifts the layout. */
export type Demo =
  | { kind: "placeholder" }
  | { kind: "file"; src: string; poster?: string }
  | { kind: "youtube"; id: string }
  | { kind: "loom"; id: string };

/** The hero metric. A discriminated union, so "not measured yet" is a
 *  first-class designed state rather than a missing number. */
export type Metric =
  | {
      status: "pending";
      label: string;
      headline: string;
      note: string;
      dueLabel: string;
      method: string;
    }
  | {
      status: "live";
      label: string;
      headline: string;
      /** Recommendation rate before the fixes went live, as a percentage.
       *  `null` means the engine returned no data — it is NOT zero. */
      preRate: number | null;
      /** Recommendation rate after the fixes went live, as a percentage. */
      postRate: number | null;
      engine: string;
      panelSize: number;
      fixesMeasured: number;
      measuredAtLabel: string;
      method: string;
    };

export interface Step {
  id: string;
  title: string;
  /** One sentence a non-specialist can read. */
  plain: string;
  /** The same idea stated the way an engineer would. */
  technical: string;
}

export interface Pillar {
  kicker: string;
  title: string;
  body: string;
  detail: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  links: { github: string };
  nav: NavLink[];
  hero: {
    eyebrow: string;
    headline: { lead: string; engines: string[]; tail: string };
    primaryCta: string;
    secondaryCta: string;
    videoCaption: string;
  };
  demo: Demo;
  problem: { eyebrow: string; lines: string[] };
  howItWorks: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: Step[];
    loopNote: string;
  };
  metric: Metric;
  engineering: {
    eyebrow: string;
    title: string;
    lede: string;
    pillars: Pillar[];
  };
  stack: { eyebrow: string; title: string; groups: StackGroup[] };
  footer: {
    name: string;
    linkedin: string;
    year: number;
    note: string;
  };
}

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

export const content: SiteContent = {
  name: "SixRise",

  links: {
    github: "https://github.com/Devarsh05/quixly",
  },

  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Engineering", href: "#engineering" },
  ],

  hero: {
    eyebrow: "Shopify app / AI commerce",

    /* The value proposition, in three pieces so the engine names can carry
     * their own typographic weight.
     *
     * NOTE: `tail` says "proves the revenue lift". What the verifier actually
     * measures is the recommendation rate (share of model) — which is what the
     * metric band directly below the hero reports. To make the headline match
     * the measurement exactly, use one of:
     *     tail: "and proves the lift."
     *     tail: "and measures what moved."
     */
    headline: {
      lead: "Gets Shopify merchants recommended by AI shopping assistants",
      engines: ["ChatGPT", "Perplexity", "Gemini"],
      tail: "and proves the revenue lift.",
    },

    primaryCta: "Watch the demo",
    secondaryCta: "View on GitHub",

    /** Why this page exists at all. */
    videoCaption:
      "SixRise runs inside the Shopify admin, behind OAuth — there is no public URL to click. So here is the 90-second walkthrough instead.",
  },

  /* 1. TODO — the demo video.
   *
   *    Drop the file at `public/demo.mp4` and use:
   *        demo: { kind: "file", src: "/demo.mp4", poster: "/demo-poster.jpg" },
   *    or point at a hosted copy:
   *        demo: { kind: "youtube", id: "dQw4w9WgXcQ" },
   *        demo: { kind: "loom", id: "0123456789abcdef0123456789abcdef" },
   *
   *    The hosted variants load nothing from the third party until the visitor
   *    actually clicks play.
   */
  demo: { kind: "placeholder" },

  problem: {
    eyebrow: "The problem",
    lines: [
      "AI shopping engines rank on structured product data, not on page design.",
      "Most catalogs read as marketing prose with no specification an engine can parse — so the engine recommends a competitor instead.",
      "And the merchant never finds out, because nothing reports which assistant named whom, or why.",
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "One loop: audit, fix, verify.",
    lede: "The agent runs against a fixed panel of buyer-intent queries, so every change is measured against the same yardstick that found the gap.",
    steps: [
      {
        id: "interrogate",
        title: "Interrogate",
        plain:
          "Ask the engines what a real buyer would ask, and count how often this store gets named versus its competitors.",
        technical: "share of model over a pinned query panel",
      },
      {
        id: "diagnose",
        title: "Diagnose",
        plain:
          "Read the catalog the way an engine reads it, and find the missing structured data behind each competitor win.",
        technical: "per-product rubric, three-state spec model",
      },
      {
        id: "propose",
        title: "Propose",
        plain:
          "Draft fixes from the merchant's own source data — never invented — and hold every one behind an approval gate.",
        technical: "before/after diff and source per fix",
      },
      {
        id: "verify",
        title: "Verify",
        plain:
          "Re-run the identical panel once the fixes are live, and report what actually moved.",
        technical: "per-engine delta vs a pinned pre-publish baseline",
      },
    ],
    loopNote:
      "The loop then closes: the next scan starts from the newly-measured baseline.",
  },

  /* 2. TODO — the hero metric.
   *
   *    Leave this as `pending` until a settled measurement exists. When it
   *    does, replace the whole object with the `live` shape:
   *
   *    metric: {
   *      status: "live",
   *      label: "Share of model",
   *      headline: "Recommendation rate on a real catalog",
   *      preRate: 12.5,
   *      postRate: 21.9,
   *      engine: "Perplexity Sonar",
   *      panelSize: 24,
   *      fixesMeasured: 2,
   *      measuredAtLabel: "August 4, 2026",
   *      method:
   *        "Per-engine recommendation rate over a pinned query panel, measured against a pre-publish baseline.",
   *    },
   *
   *    `preRate` / `postRate` accept `null`, meaning "the engine returned no
   *    data this period". Null renders as exactly that — never as 0%, and never
   *    as a decline.
   */
  metric: {
    status: "pending",
    label: "Share of model",
    headline: "Measurement in progress",
    note: "The verifier holds a 168-hour settle window before a reading counts. Below it no engine has re-crawled, so a delta would measure nothing at all — and a number that measures nothing is worse than no number.",
    dueLabel: "August 4, 2026",
    method:
      "Per-engine recommendation rate over a pinned query panel, measured against a pre-publish baseline.",
  },

  engineering: {
    eyebrow: "Engineering",
    title: "Six decisions the product rests on.",
    lede: "Most of the work in an agent that writes to somebody else's live storefront is not the model call. It is everything that keeps the model from doing damage.",
    pillars: [
      {
        kicker: "Architecture",
        title: "Two services, one contract",
        body: "A deliberately thin TypeScript shell owns the Shopify surface — OAuth, session storage, webhooks, the embedded admin UI — and nothing else. A Python FastAPI and LangGraph agent owns every business decision. They meet over a single shared-secret internal API, so there is no product logic in the shell to drift out of sync.",
        detail: "app/ → React Router 7 · agent/ → FastAPI + LangGraph",
      },
      {
        kicker: "Grounding",
        title: "It cannot invent a product attribute",
        body: "The optimizer may enrich and restructure what a merchant already wrote. It may never originate a spec, a GTIN or a review. Every proposed fix carries a before/after diff and the source field it was derived from — and claims of absence are guarded exactly as hard as claims of presence, because a false “this product doesn’t state its roast level” slips past a human approver: it reads as advice rather than as a diff.",
        detail: "grounding guard, plus deterministic recovery before any absence claim",
      },
      {
        kicker: "Safety",
        title: "An approval gate, and writes that verify themselves",
        body: "Nothing reaches a merchant’s store without an explicit approval, and a 200 from Shopify is not treated as success — a mutation can return 200 with errors in its payload, or land nothing at all. Every write is confirmed by a separate re-read of the live product. A two-layer staleness gate refuses to append to a description the merchant edited after approving it.",
        detail: "propose → approve → publish → re-read → verified",
      },
      {
        kicker: "Custody",
        title: "One refresh authority, under a lock",
        body: "Shopify offline tokens expire hourly, and minting a new one immediately invalidates the previous refresh token — so two rotations racing don’t lose an update, they break the chain and force the merchant to reinstall. Exactly one code path is allowed to refresh, serialised per shop by a Postgres advisory lock. The agent stores no Shopify token at all; it borrows short-lived ones.",
        detail: "pg_advisory_xact_lock per shop · agent holds zero credentials",
      },
      {
        kicker: "Data",
        title: "One database, two migration tools",
        body: "Prisma owns the session schema, because the Shopify session adapter requires it. Alembic owns everything else. Each is fenced to its own Postgres schema, because their drift detection is independent and mutually destructive — unfenced, each sees the other’s tables as drift and generates a DROP.",
        detail: "schema `shopify` → Prisma · schema `public` → Alembic",
      },
      {
        kicker: "Measurement",
        title: "Honest verification, or none at all",
        body: "Uplift is a per-engine delta against a pinned pre-publish baseline, on the same query panel that found the gap. No data is a distinct state and never a zero, because rendering a flaky engine as 0% shows a merchant a regression that never happened. A shop-level delta is never attributed to an individual fix: one correlational observation cannot become N causal claims.",
        detail: "grain: (run_id, engine) · settle window: 168h",
      },
    ],
  },

  stack: {
    eyebrow: "Built with",
    title: "Tech stack",
    groups: [
      {
        label: "App shell",
        items: [
          "TypeScript",
          "React Router 7",
          "Shopify App Bridge",
          "Polaris",
          "Prisma",
        ],
      },
      {
        label: "Agent",
        items: ["Python", "FastAPI", "LangGraph", "Arq", "Pydantic", "Alembic"],
      },
      {
        label: "Infrastructure",
        items: ["Postgres", "Redis", "Docker", "Northflank", "Neon", "Upstash"],
      },
      {
        label: "Models",
        items: ["Perplexity Sonar", "OpenAI"],
      },
    ],
  },

  footer: {
    /* 3. TODO — your full name, as you want it printed. */
    name: "TODO: your full name",
    /* 4. TODO — your LinkedIn profile URL. Until it is filled in the footer
     *    renders a visible placeholder chip instead of a broken link. */
    linkedin: "TODO: https://www.linkedin.com/in/your-handle",
    year: 2026,
    note: "SixRise is an embedded Shopify app. This page exists because the product itself lives behind a merchant login.",
  },
};

/** True when a TODO field has not been filled in yet. */
export function isPlaceholder(value: string): boolean {
  return value.trimStart().startsWith("TODO");
}

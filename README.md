# sixrise.app — public landing page

The public, no-login page for **SixRise**, a Shopify embedded app. Every real route in the
product sits behind `authenticate.admin` and only renders inside the Shopify admin iframe
after OAuth, so there is no URL a visitor can click to see it. This page is the substitute:
a demo video, the architecture story, and a link to the source.

Static single page. **No backend, no API routes, no database, no auth, no environment
variables.** `npm install` → `npm run build` → deploy.

---

## Editing the content

**Everything editable lives in [`src/content.ts`](src/content.ts).** No copy, link or number
is written anywhere else — you should never have to hunt through JSX.

Four blanks are waiting there, each marked `TODO`:

| # | Field | What to do |
|---|---|---|
| 1 | `demo` | Point it at the video. See below. |
| 2 | `metric` | Swap `status: "pending"` for the `status: "live"` shape once a settled figure exists. A filled-in example sits directly above it, commented out. |
| 3 | `footer.name` | Your full name, as you want it printed. |
| 4 | `footer.linkedin` | Your LinkedIn profile URL. |

Until 3 and 4 are filled in, the footer renders a visible dashed placeholder rather than a
broken link. `content.ts` is typed against the `SiteContent` interface in the same file, so a
half-finished edit fails `npm run typecheck` instead of quietly shipping a blank spot.

### Dropping in the demo video

Self-hosted (simplest — the file is served from the same origin, so nothing third-party
loads):

```ts
demo: { kind: "file", src: "/demo.mp4", poster: "/demo-poster.jpg" },
```

…with the file saved to `public/demo.mp4`. Vercel serves static assets fine at this size;
keep it under ~50 MB and encode as H.264 MP4 for universal playback.

Hosted:

```ts
demo: { kind: "youtube", id: "dQw4w9WgXcQ" },
demo: { kind: "loom",    id: "0123456789abcdef0123456789abcdef" },
```

Both hosted variants are **click-to-load** — nothing is requested from YouTube or Loom until
the visitor actually presses play. All four variants reserve the identical 16:9 box, so
switching between them never shifts the layout.

### The hero metric

It stays `pending` until a real settled measurement exists. **Do not invent a number.** The
pending state is designed, not broken: it shows the hero-figure slot, the axis and both
endpoints with every value struck out as unmeasured, and explains the 168-hour settle window.

Two rules are carried over from the product's own verifier and are enforced in
`src/components/MetricBand.tsx`:

- **A missing rate is `null`, and `null` renders as "no data this period"** — never as `0%`,
  and never as a decline. There is no `?? 0` in the read path. Coalescing here would show a
  fabricated regression for what was only a flaky engine.
- **The copy is observational** — "recommendation rate — before X, after Y". Never "uplift
  caused by": the measurement is shop-level and cannot be attributed to an individual fix.

### The OG preview image

`public/og.png` is a 1200×630 capture of the hero, used for link previews on LinkedIn,
Slack and X. If the headline copy changes, regenerate it: run `npm run preview`, open the
site at a 1200×630 viewport, and screenshot the top of the page over the existing file.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build into dist/
npm run preview    # serve the built output
```

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4. Fonts (IBM Plex Sans / Mono) are
bundled from `@fontsource`, not fetched from a CDN — **the page makes zero third-party
requests**, and there is no font-swap reflow.

---

## Deploying to Vercel

1. Push this directory to its own GitHub repository.
2. Vercel → **Add New → Project** → import the repo.
3. The **Vite** preset is detected automatically:
   - Build command `npm run build`
   - Output directory `dist`
   - Install command `npm install`
   - **Environment variables: none.**
4. Deploy, and confirm the generated `*.vercel.app` URL renders correctly **before** touching
   any DNS.

---

## Attaching the custom domain (sixrise.app)

### 1. Add the domain in Vercel

Project → **Settings → Domains** → add `sixrise.app`, then add `www.sixrise.app`. Set one to
redirect to the other; apex-primary (`www` → `sixrise.app`) is the usual choice.

### 2. Create the DNS records at the registrar

Vercel shows a **domain card** for each domain with the exact records it expects.

| Host | Type | Value |
|---|---|---|
| `@` (apex, `sixrise.app`) | `A` | the IP shown on the domain card |
| `www` | `CNAME` | the hostname shown on the domain card |

**Copy the values off the card, not out of a guide — including this one.** Vercel's
verification checks for the exact record it issued for *your* project. Most projects show the
general-purpose anycast IP `76.76.21.21` and `cname.vercel-dns.com`, and those still work;
newer projects are assigned a project-specific IP (e.g. `216.198.79.1`) and a per-project
CNAME target (e.g. `d1d4fc829fe7bc7c.vercel-dns-017.com`).

An apex domain cannot use a CNAME, which is why the root is an `A` record. If you would
rather not manage records by hand, the alternative is to delegate the whole domain to
Vercel's nameservers.

### 3. Certificates and CAA

Vercel provisions the TLS certificate automatically once DNS resolves — there is nothing to
do. Two things can silently block it:

- **A restrictive `CAA` record.** If the domain has `CAA` records at all, they must permit
  Let's Encrypt, or issuance fails. No `CAA` record is fine.
- **DNS not yet propagated.** Give it a few minutes before assuming something is wrong.

### 4. `.app` is HTTPS-only

The `.app` TLD is on the **HSTS preload list**, so browsers refuse plain HTTP for it outright
— there is no http→https redirect to fall back on. In practice:

- Never publish or share an `http://sixrise.app` link; it will simply fail.
- In the window between DNS propagating and the certificate issuing, the domain will look
  broken rather than merely insecure. That is expected; wait it out.

References: [A records and CAA on
Vercel](https://vercel.com/kb/guide/a-record-and-caa-with-vercel) ·
[Adding a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)

---

## Notes on the build

- **Accessibility was measured, not assumed.** Every distinct foreground/background/size
  combination on the page was checked against WCAG AA in the browser; `--color-ink-3` was
  lightened from `#6b7280` to `#7a8593` because it came out at 4.07:1 on the canvas, under
  the 4.5:1 floor, and it carries most of the page's small mono text.
- **The how-it-works diagram is hand-authored inline SVG** (`src/components/LoopDiagram.tsx`)
  with no diagram library and no image asset. It renders at ≥768px only; below that the same
  four steps render as a vertical list, because scaling the SVG down makes its labels
  illegible. In both cases the captions exist as real text, so the diagram is never the only
  carrier of the information.
- **The before/after mark is a dumbbell, not a bar chart** — a single pair of values on one
  measure. Its axis always starts at zero and shows its upper bound, so the segment length
  cannot overstate the movement. Drawn with layout primitives; no chart library.
- `prefers-reduced-motion: reduce` suppresses every transition and smooth scroll.

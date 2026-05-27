@AGENTS.md

# TealWave Solutions — Site Documentation

## Project Overview
Marketing site for TealWave Solutions, a delivery & operational consulting firm. Built as a Next.js static export — 4 pages, animation-heavy, fully responsive.

- **Repo:** `subduxion/` folder
- **Deploy:** `npm run build` → upload `/out` folder to server
- **Config:** `output: "export"`, `trailingSlash: true` in `next.config.ts`

---

## Tech Stack
- **Next.js 16**, React 19, TypeScript
- **Tailwind CSS v4** — mobile-first, breakpoint `md:` = 768px
- **Framer Motion v12** — scroll animations, sticky sections, page transitions

---

## Fonts & Colors

### Fonts
| Usage | Family | Inline style |
|---|---|---|
| Headings, body, buttons | Satoshi | `fontFamily: "'Satoshi', sans-serif"` |
| Labels, breadcrumbs, section tags | Roboto Mono | `fontFamily: "var(--font-roboto-mono), monospace"` |

Constants defined per page: `const SATOSHI = "'Satoshi', sans-serif"` and `const ROBOTO_MONO = "var(--font-roboto-mono), monospace"`

### Colors
- Brand teal: `#069494`
- Dark background: `#0f0f0f`
- Light card background: `#f9f9f9`, `#f3f3f3`
- Borders / dividers: `#e5e5e5`, `#d2d2d2`
- Text: `text-neutral-900` (primary), `text-neutral-500` (secondary)

---

## Style Standards
- **Section breadcrumb labels:** Roboto Mono, 14px, weight 400, `tracking-[0.1em]`, `text-neutral-400`/500, uppercase
- **Button text:** Satoshi, 18px, weight 500
- **Button with arrow:** `flex items-center rounded-sm overflow-hidden` + text span + `w-8 h-8` or `w-10 h-10` icon span
- **Cut-corner card style:** `clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)"`

---

## Pages

### Home (`app/page.tsx`)
1. **Nav** — fixed, logo + desktop links + CTA button + hamburger (mobile)
2. **Hero** — headline, two images, two CTA buttons
3. **Services/Capabilities** — 4 cards (2 large, 2 small) with PNG icons + scroll reveal
4. **ChallengesSection** — sticky scroll, 4 floating alert pills, central headline
5. **Solutions** — 6-item grid of problem statements
6. **ProcessSection** — 4-step sticky scroll (desktop) / vertical list (mobile)
7. **About** — Ivana info, image, "About Us" button (`w-2/3 md:w-1/2`), "Not sure where to start?" card
8. **Footer** — dark bg, CTA row (`pt-24` mobile), 4-column links grid (`grid-cols-1 md:grid-cols-4`)

### Services (`app/services/page.tsx`)
1. Nav + Hero
2. **Service sections** — 4 alternating text/image sections (text always first on mobile)
3. **Solutions** — same 6-item grid as home
4. **About Us section** — Ivana info + "Not sure where to start?" card
5. Footer

### About (`app/about/page.tsx`)
1. Nav
2. **Two-column layout** — images with TileReveal + text
3. Footer

### Contact (`app/contact/page.tsx`)
1. Nav
2. **Left** — "Book a discovery call" card + "Email us directly" card (vertical: title → description → button)
3. **Right** — contact form (mailto submission)
4. Footer

---

## Components

### Shared (`app/components/`)
- **`TransitionLink`** — intercepts clicks, triggers full-screen overlay before navigating
- **`PageTransitionProvider`** — context that wraps the app, manages transition state

### Inline Components (defined per page, same pattern on all pages)

| Component | Description |
|---|---|
| `SplitText` | Splits text into words, animates each word on scroll with `useInView` |
| `ScrambleLink` | Scrambles letters on hover, reveals character-by-character |
| `CalendlyModal` | Scrollable overlay with Calendly iframe; tap outside or Escape to close |
| `ChallengesSection` | Sticky scroll section with 4 floating pills; `isMobile` state for pill positions |
| `ProcessSection` | Desktop: sticky scroll with opacity transitions; Mobile: static vertical list |
| `TileReveal` | Grid of tiles fades away to reveal image underneath |
| `FadeInColumn` | Simple fade-in with configurable delay |
| `FolderTab` | Decorative folder-tab SVG above section labels |
| `ArrowIcon` | Reusable animated arrow SVG for buttons |

---

## CalendlyModal Pattern (all 4 pages)
```tsx
<div className="fixed inset-0 z-[200]">
  <div className="absolute inset-0 bg-black/75" />
  <div className="absolute inset-0 overflow-y-auto" onClick={onClose}>
    <div className="flex min-h-full items-start justify-center p-4 py-8">
      <div ... onClick={e => e.stopPropagation()}>
        // close button + iframe (no marginTop, marginLeft/Bottom -48px)
      </div>
    </div>
  </div>
</div>
```

---

## Responsive Patterns

### Mobile Nav
- Hamburger button: `w-10 h-10 border border-neutral-300 rounded-sm`, animated X with framer-motion
- "Get in touch" CTA always visible on mobile: `border border-neutral-300 md:border-0 md:bg-neutral-900`
- Menu overlay: `fixed top-[72px]` full screen, `bg-[#f9f9f9]`, items with `border-b border-neutral-200`
- Nav hides on scroll: `navHidden && !menuOpen` (stays visible when menu is open)

### Footer (all pages)
- CTA row: `pt-24 pb-12 md:py-20`
- Button: `w-auto` (no flex-1 on text span)
- Links grid: `grid-cols-1 md:grid-cols-4`

### Cards (mobile)
- Layout: title → description → button (vertical stack, not side-by-side)
- "About Us" / "Book a Call" buttons: `w-2/3 md:w-1/2`

---

## Public Assets

### Icons (PNG, used in capability cards on home page)
- `magnifying-glass.png` — card 1 (Delivery Stabilization Sprint)
- `target.png` — card 2 (Fractional Head of Delivery)
- `chain.png` — card 3 (Ways of Working Workshops)
- `gear.png` — card 4 (AI Workflow & Operational Optimization)

### Images
- `hero1.jpg`, `hero2.jpg` — home hero section
- `services-1.jpg` … `services-4.jpg` — service section images
- `ivana.jpeg` — about section on home & services
- `ivana-about.jpeg` — about page
- `footer-g.jpg` — footer background gradient overlay
- `logo.svg` — site logo in nav

---

## Build & Deploy
```bash
npm run build   # generates /out static export
# upload /out folder contents to web server
```

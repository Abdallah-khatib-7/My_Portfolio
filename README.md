# Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![License](https://img.shields.io/badge/License-Portfolio-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

> From schema to deployment.

A personal developer portfolio, built and coded from scratch rather than templated — real project case studies pulled from actual README source, a live GitHub stats panel that never goes stale, an interactive tech-stack section with 3D tilt and cursor-tracked glow, and a full accessibility and performance pass before launch.

Built by **Abdallah Khatib** — Computer Science graduate, Lebanese International University.

---

## 🌐 Live Demo

| | URL |
|---|---|
| **Site** | [my-portfolio-5a8975.shpit.uk](https://my-portfolio-5a8975.shpit.uk/) |

> Deployed on [Shipyard](https://shipyard.shpit.uk) — a static-site deployment platform built from scratch, which is also one of the six projects featured on this site. Push to `main`, and the portfolio ships itself.

---

## Table of Contents

- [About](#about)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Architecture Decisions](#architecture-decisions-worth-knowing)
- [Project Structure](#-project-structure)
- [Running Locally](#-running-locally)
- [Known Limitations](#known-limitations--honest-caveats)
- [About the Author](#-about)

---

## About

Most portfolios are a template with the name swapped out. This one is a real frontend build, treated with the same care as the production systems it showcases — a genuine component architecture, a real design system built on Tailwind v4 tokens, and project case-study pages generated from the *actual* README source of each featured project rather than a rewritten marketing summary.

It went through a full audit-and-remediation cycle before launch: accessibility (keyboard navigation, ARIA states), a real performance bug (an unbounded animation loop that was re-rendering the page forever), duplicate data bugs, a broken sticky nav, and missing social-share metadata were all found and fixed — documented the same way the "Known limitations" sections on the project pages are, rather than quietly patched and forgotten.

---

## ✨ Key Features

### 📖 Real Project Case Studies
- Each of the six featured projects has a full detail page — overview, key features, architecture decisions, tech stack, security, and known limitations
- Content is generated from each project's actual `README.md` (stored alongside the site in `project-docs/`), not paraphrased marketing copy — sections that don't exist in a given README are honestly relabeled (e.g. a project's "Key Business Logic" section stands in for "Architecture Decisions" where the source material doesn't have one) rather than invented
- Sticky in-page section navigation tracks scroll position across long case studies

### 🖼️ Live Website Previews, Not Screenshots
- Hovering a project row renders a real, freshly generated screenshot of the live site (via a screenshot-on-demand service), not a static image that goes stale
- A defensive three-tier fallback chain — live screenshot → GitHub OpenGraph card → numbered placeholder — means a preview can never render as a blank or broken box, even if a project has no live URL or the screenshot service fails

### 📊 GitHub Stats That Actually Update
- A live stats panel (contribution streak, contribution graph, language breakdown) pulls from third-party GitHub stats generators
- Cache-busted per load so the panel reflects current data instead of a browser-cached snapshot from a previous visit

### 🎛️ Interactive Tech Stack
- Category-filterable grid (Frontend / Backend / Database / Infrastructure / Languages) that reflows with a layout animation rather than a hard cut
- Per-card 3D tilt and a cursor-tracked glow, both computed from real-time pointer position — automatically disabled on touch devices in favor of a tap-friendly scale, rather than leaving a stuck hover state
- Staggered spring entrance animation on scroll into view

### ♿ Accessibility & Robustness
- Every interactive element (project row expansion, filter tabs) is keyboard-operable with proper `aria-expanded` / `aria-pressed` state, not just mouse-clickable
- A catch-all route renders a real 404 page for any unknown URL instead of a blank screen
- `prefers-reduced-motion` and touch-vs-hover are both detected and respected rather than assumed

### 📱 Mobile-First Navigation
- A dedicated hamburger menu below the tablet breakpoint, rather than simply hiding links with no replacement

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tooling |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first styling, CSS-first `@theme` design tokens |
| Framer Motion | Layout animations, scroll-triggered reveals, spring-based motion values |
| GSAP | Supplementary scroll/marquee animation |
| React Router (`HashRouter`) | Client-side routing for project detail pages |
| Custom hooks | `useTypewriter` (hero text), touch/hover detection, mouse-position tracking for the tilt/glow effect |
| Icon sources | devicon, Simple Icons, and Lobehub's static SVG set, covering the full tech-stack grid |

---

## Architecture decisions worth knowing

- **Case-study content is data-driven, not hand-written per page.** `data.js` derives each project's detail-page content structurally, with per-project overrides (`architectureTitle`, `limitationsTitle`, `securityTitle`) so a project whose README has no "Architecture Decisions" section renders an honestly-labeled substitute instead of a page pretending to have content it doesn't.

- **`flattenStack` de-duplicates by design.** A technology used in two categories in a project's README (e.g. TypeScript appearing under both its Backend and Frontend sections) is wrapped in a `Set` before rendering, so it appears once on the homepage tag row and never produces a duplicate React key.

- **Preview images fail safe, never blank.** The preview chain is screenshot service → GitHub OpenGraph card → numbered placeholder, each a real fallback for the one before it — a project with no live URL, or a screenshot request that times out, still always renders *something*, never an empty box.

- **The hover-follow effect uses motion values, not React state.** An earlier version tracked cursor position in React state via a `requestAnimationFrame` loop that never stopped, re-rendering the whole section on every frame even when off-screen. It was replaced with Framer Motion's `useMotionValue` / `useSpring` writing straight to a DOM transform — the browser's compositor handles the animation, and React never re-renders for it at all.

- **Routing uses `HashRouter`, not `BrowserRouter`.** The site deploys to static hosting (Shipyard) that doesn't currently support SPA fallback rewrites. `HashRouter` keeps every route resolvable on a hard refresh or a shared deep link without needing server-side rewrite rules — the trade-off is a `#` in project detail URLs, which was judged worth it over a routing 404 in production.

- **Social preview tags use the real, absolute deployed domain.** `og:image` and `og:url` are set to the actual `my-portfolio-5a8975.shpit.uk` origin rather than a relative path — some link-preview crawlers (LinkedIn's and Facebook's notably) resolve relative OG paths inconsistently, so the tags are absolute from the start rather than "working by accident" on more lenient parsers.

---

## 📁 Project Structure

```
my-portfolio/
└── frontend/
    ├── project-docs/
    │   ├── shipyard.md          Real README source, used to generate that project's case study
    │   ├── rakiz.md
    │   ├── aceit.md
    │   ├── tawla.md
    │   ├── pharmacare.md
    │   └── jarvis.md
    ├── public/
    │   ├── favicon.svg
    │   ├── profile-picture.jpg   Absolute-URL OG/Twitter share image
    │   └── Abdallah-Khatib-CV.pdf
    ├── src/
    │   ├── components/
    │   │   ├── Nav.jsx            Desktop nav + mobile hamburger menu
    │   │   ├── Hero.jsx           Typewriter tagline, CV download, WhatsApp CTA
    │   │   ├── About.jsx          Stats row (systems built, live count, experience)
    │   │   ├── Work.jsx           Project list, hover preview, keyboard-accessible expand
    │   │   ├── ProjectCard.jsx    Individual project row
    │   │   ├── PreviewImage.jsx   Screenshot → OG card → placeholder fallback chain
    │   │   ├── Stack.jsx          Filterable, tilt/glow-animated tech stack grid
    │   │   ├── GithubStats.jsx    Live, cache-busted GitHub stats panel
    │   │   ├── Currently.jsx
    │   │   ├── Marquee.jsx
    │   │   ├── Contact.jsx
    │   │   └── Reveal.jsx         Shared scroll-in animation wrapper
    │   ├── pages/
    │   │   └── ProjectDetail.jsx  Full case-study page + 404 state
    │   ├── hooks/
    │   │   └── useTypewriter.js
    │   ├── data.js                Project data, derived stack flattening, slug helpers
    │   ├── App.jsx
    │   ├── main.jsx                HashRouter + route definitions
    │   └── index.css              Tailwind v4 import + @theme design tokens
    ├── index.html                 OG/Twitter meta tags
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- Git

### 1. Clone and install
```bash
git clone https://github.com/Abdallah-khatib-7/My_Portfolio.git
cd My_Portfolio/frontend
npm install
```

### 2. Run
```bash
npm run dev
# App running on http://localhost:5173
```

### 3. Build
```bash
npm run build
npm run preview
```

No environment variables or backend services are required — this is a fully static site.

---

## Known limitations / honest caveats

These are deliberate, documented decisions — not oversights.

- **Project content is static, not CMS-driven.** Adding or updating a featured project means editing `data.js` and dropping in a new README under `project-docs/` directly — there's no admin panel or database behind it, which is the right amount of tooling for six projects, not sixty.
- **GitHub stats depend on third-party generator uptime.** The live stats panel relies on public, free-tier stat-generation services that are occasionally rate-limited or briefly unavailable; the panel is cache-busted to stay fresh when they're up, but has no control over their availability.
- **`HashRouter` means project URLs carry a `#`.** A conscious trade-off for zero-config static-host compatibility (see Architecture Decisions above) over the cleaner URLs `BrowserRouter` would give with server-side rewrite support.
- **Icon sources are third-party CDNs.** The tech-stack grid's icons are pulled from public icon CDNs rather than bundled locally; one source is pinned to `@latest` rather than a fixed version, which is simple but means an upstream change could theoretically alter an icon's appearance without a corresponding commit here.
- **No automated test suite.** Correctness here was verified through manual QA, a full structural audit, and headless browser console monitoring (checking for render loops and accessibility issues) rather than unit or integration tests — a reasonable trade-off for a portfolio site, not a production system handling user data.

---

## 👨‍💻 About

I'm Abdallah Khatib, a Computer Science graduate from Lebanese International University. This portfolio exists to show the same standard I hold the six projects on it to — real architecture, honest documentation of what isn't finished, and a deploy pipeline (my own, via Shipyard) rather than a one-click template host.

📧 abdallah.khatib2003@gmail.com
🐙 [github.com/Abdallah-khatib-7](https://github.com/Abdallah-khatib-7)
💼 [linkedin.com/in/abdallah-khatib-8b0499349](https://www.linkedin.com/in/abdallah-khatib-8b0499349)

---

## 📄 License

This project is for portfolio and demonstration purposes. All rights reserved © 2026 Abdallah Khatib.
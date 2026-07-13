export const marqueeItems = [
  "NODE.JS",
  "TYPESCRIPT",
  "REACT",
  "DOCKER",
  "AWS",
  "MYSQL",
  "REDIS",
  "SOCKET.IO",
  "CLOUDFLARE",
  "MONGODB",
  "STRIPE",
  "OPENAI",
  "NGINX",
];

// ─────────────────────────────────────────────────────────────────────────────
// All `details` content below is taken from each project's real README in
// profile/project-docs/. Where a README lacks a section (see architectureTitle /
// limitationsTitle overrides), the closest real section is used and re-labelled
// honestly rather than invented.
// ─────────────────────────────────────────────────────────────────────────────

const rawProjects = [
  {
    name: "Shipyard",
    tagline: "Push a repo, get a live URL — a real deployment platform on real infrastructure.",
    description:
      "Built around the genuinely hard part: running untrusted code safely. A GitHub webhook triggers a build inside an isolated, disposable Docker container — hard CPU/memory/timeout limits, no network path to anything else, destroyed unconditionally when done. Output goes to S3 and is served on a live subdomain within seconds via a Cloudflare Worker + KV edge router, replacing what would otherwise be one DNS record per deployment. Build logs stream to the browser line by line over Socket.io, sanitized so a build tool's own terminal spinner doesn't turn into garbage on screen.",
    status: "LIVE",
    live: true,
    liveUrl: "https://shipyard.shpit.uk",
    repoUrl: "https://github.com/Abdallah-khatib-7/Shipyard",
    color: "linear-gradient(135deg, #ef7f3f, #f2a65a)",
    details: {
      tagline: "Push to main. It ships itself.",
      overview:
        "Shipyard exists to answer a specific engineering question properly: what does it actually take to run other people's code safely, on demand, at low cost? Not \"runs a script in a subprocess,\" but correctly — a fresh container per build, hard CPU/memory/time limits, no network path to anything else running on the host, and unconditional teardown whether the build succeeds, fails, or times out. It was built backend-first: the webhook receiver, build queue, and container runner proven working end to end before a single page of frontend existed, then deployed to real production infrastructure rather than left as a \"works on my machine\" demo. Every real-world failure encountered along the way — a cross-platform npm lockfile mismatch, a monorepo with no root package.json, garbled terminal output from a build tool's own progress spinner, an IAM boundary silently blocking S3 writes, a shared Redis queue raced by two backends — was fixed as a real, distinct bug against real infrastructure.",
      stats: [
        { value: "5", label: "MySQL tables" },
        { value: "1", label: "container per build" },
        { value: "4", label: "lockfile managers supported" },
        { value: "1", label: "wildcard DNS record" },
      ],
      keyFeatures: [
        {
          icon: "🐳",
          title: "Isolated, Disposable Builds",
          description:
            "Every build runs in a fresh Docker container, destroyed unconditionally afterward — success, failure, or timeout. Resource limits are enforced by the Docker daemon itself, not just declared in config: a memory cap with swap disabled so it can't be bypassed, a CPU cap, a process-count limit, all capabilities dropped, and no-new-privileges set. An isolated bridge network allows outbound git clone / npm install but gives no route to any other container or service on the host, and a hard wall-clock timeout kills anything that overruns.",
        },
        {
          icon: "🔎",
          title: "Zero-Config Detection",
          description:
            "Auto-detects package.json at the repo root or inside frontend/ for monorepos — intentionally scoped to those two locations rather than scanning arbitrary folders. The right install command is inferred from whichever lockfile is present (npm ci, yarn install --frozen-lockfile, pnpm install --frozen-lockfile, or plain npm install). If npm ci fails specifically because the lockfile doesn't match package.json for this platform — a real gap when a lockfile is generated on Windows/Mac and built on Linux — it falls back to npm install rather than hard-failing.",
        },
        {
          icon: "⚙️",
          title: "Per-Repo Build Overrides",
          description:
            "Install command, build command, and output directory can each be set per repo, overriding auto-detection. The output directory is validated against path traversal (../, .git) at the API level — a malicious override could otherwise copy the repo's embedded GitHub access token into the public deployment.",
        },
        {
          icon: "📡",
          title: "Real-Time Everything",
          description:
            "Build logs stream to the browser over an authenticated Socket.io connection as the container produces them, not polled after the fact. Raw container output is sanitized before it is ever stored or streamed: ANSI escape sequences and carriage-return-driven progress-spinner noise are stripped and collapsed into clean, human-readable lines. One-click copy of the full build log.",
        },
        {
          icon: "🌐",
          title: "Edge-Routed Subdomains",
          description:
            "A single wildcard Cloudflare DNS record plus a Cloudflare Worker replace what would otherwise be one DNS record per deployment. The Worker resolves a subdomain to its S3 prefix via a KV lookup and proxies the request directly, so new deployments go live the moment the KV entry is written — no DNS propagation wait. Old deployments and orphaned containers are cleaned up hourly.",
        },
        {
          icon: "🔐",
          title: "Real Multi-User Auth",
          description:
            "GitHub OAuth login with JWT access and refresh tokens. Every repo, build, and deployment endpoint verifies the resource actually belongs to the requesting user. Per-user concurrent-build and hourly-build-count quotas are enforced server-side.",
        },
      ],
      techStack: [
        {
          group: "Backend",
          items: [
            "Node.js", "Express", "TypeScript", "MySQL (mysql2)", "Redis", "BullMQ",
            "Socket.io", "Dockerode", "Passport (GitHub OAuth)", "@octokit/rest",
            "jsonwebtoken", "Zod", "node-cron", "strip-ansi", "express-rate-limit",
          ],
        },
        {
          group: "Frontend",
          items: [
            "React 19", "TypeScript", "Vite", "React Router", "Zustand",
            "Tailwind CSS v4", "Framer Motion", "GSAP + ScrollTrigger",
            "socket.io-client", "Radix UI", "Lucide React",
          ],
        },
        {
          group: "Infrastructure",
          items: [
            "AWS EC2", "AWS RDS (MySQL)", "AWS S3", "Cloudflare Pages",
            "Cloudflare Workers + KV", "Redis Cloud", "nginx", "Certbot", "systemd",
          ],
        },
      ],
      architectureDecisions: [
        {
          title: "One build, one container, always",
          description:
            "No container is ever reused across builds or across users. This is the actual security boundary the whole platform rests on, not a performance nicety — reuse would mean one user's build could theoretically observe leftover state from another's.",
        },
        {
          title: "Build queue, not synchronous builds",
          description:
            "A webhook firing enqueues a BullMQ job and returns immediately; the HTTP response never blocks on a build actually running.",
        },
        {
          title: "Builds run on the same host as the API, not a separate compute service",
          description:
            "Dockerode connects to the local Docker daemon on whatever machine the backend runs on. There is no Fargate/ECS task-launch integration in the current implementation, despite an ECS cluster and ECR repo having been provisioned early on — that infrastructure exists but is unused by the running code. This is called out explicitly rather than left implied, since the tech stack badges could otherwise overstate it. Wiring builds through the ECS/Fargate APIs is the real next step if this needed to scale past one server's build capacity.",
        },
        {
          title: "Edge routing over per-deployment DNS",
          description:
            "The original design created one Cloudflare DNS CNAME per deployment, all pointing at the same S3 website-endpoint root — which meant every subdomain actually served the bucket root, not its own deployment. This was caught in testing and replaced with a Cloudflare Worker + KV namespace: one wildcard DNS record total, with the Worker resolving each subdomain's real S3 prefix from KV at request time.",
        },
        {
          title: "npm ci failures get one, narrow fallback",
          description:
            "If npm ci fails for any reason other than a specific, detected lockfile-platform mismatch, the build fails for real — no blanket catch-all retry. The fallback exists because a lockfile generated on Windows/Mac can legitimately omit Linux-only optional dependencies that a Linux build container needs; that's not a broken repo, it's a real cross-platform gap.",
        },
        {
          title: "Output directory overrides are validated, not just accepted",
          description:
            "A user-supplied output-directory override is checked against path traversal and rejects anything resolving outside the build workspace or into .git — because the repo is cloned using a URL with an embedded, short-lived GitHub access token, and a careless or malicious override could otherwise copy that token into the public deployment.",
        },
        {
          title: "Log capture is sanitized once, centrally",
          description:
            "Raw container stdout/stderr contains real terminal control sequences — cursor movement, carriage-return progress spinners — that read as garbage if stored or streamed as-is. These are stripped and collapsed at the single point logs are captured from the container, not patched per call site.",
        },
        {
          title: "Only one backend may run against the production Redis queue at a time",
          description:
            "BullMQ workers compete for jobs first-come; running a local dev backend against production's Redis causes jobs to be silently grabbed and failed by whichever process reaches them first, surfacing to the user only as a confusing stuck build. This was hit directly during deployment testing, and is why local dev defaults to a distinct queue prefix.",
        },
        {
          title: "Least-privilege IAM, not \"full access and hope\"",
          description:
            "The production IAM user is scoped to exactly three S3 actions (PutObject, GetObject, DeleteObject) plus ListBucket, on exactly one bucket — not the broad managed full-access policies used during early development. ECR and ECS full-access policies were removed entirely once it was confirmed the running code never calls either API.",
        },
      ],
      security: [
        "GitHub OAuth login; JWT access + refresh tokens",
        "Every repo/build/deployment endpoint checks the resource actually belongs to the requesting user — ownership is never assumed client-side",
        "Webhook receiver verifies GitHub's HMAC signature before enqueueing anything",
        "Build containers: all Linux capabilities dropped, no-new-privileges, isolated bridge network, hard memory/CPU/process caps, hard wall-clock timeout",
        "Output directory overrides validated against path traversal, preventing the repo's embedded GitHub token from being copied into a public deployment",
        "Production IAM user scoped to four S3 actions on exactly one bucket — no ECR, no ECS, no other buckets, no full-access managed policies",
        "Production RDS is not publicly reachable — only accessible from the backend's own EC2 security group",
        "trust proxy configured correctly so rate limiting reads the real client IP behind the reverse proxy, not the proxy's own address",
      ],
      knownLimitations: [
        "No custom domains. Only *.shpit.uk subdomains are supported. Cloudflare's SSL-for-SaaS custom hostname feature was evaluated but carries a real per-domain cost ($2/month) and meaningful complexity that doesn't fit Shipyard's positioning as free hosting for people without a domain.",
        "Builds run on a single EC2 host, not real elastic compute. An ECS cluster and ECR repository were provisioned early, but the running code never calls either API — a real capacity ceiling, not an oversight.",
        "No PR/branch preview deployments. Every push to the connected branch builds and deploys; there's no preview-URL-per-pull-request workflow yet.",
        "No one-click rollback. Old build output stays in S3 and old deployment rows stay in the database, but nothing re-points a subdomain at a previous deployment.",
        "No build caching between deploys. Every build installs from scratch in a fresh container — correct for the isolation guarantee, slower than a platform that caches node_modules.",
        "Shared Redis instance. The BullMQ queue runs on Redis shared with a separate project, isolated by key prefix rather than a dedicated instance.",
        "t3.micro is a genuine memory constraint. With MySQL moved to RDS the backend has real headroom, but it's still a 1GB instance — an unusually large build could hit the ceiling.",
      ],
    },
  },

  {
    name: "Rakiz",
    tagline: "Bank-grade multi-currency wallet with double-entry bookkeeping and AI fraud review.",
    description:
      "Built the way a bank would actually build one: every financial mutation flows through a single ledger function performing SELECT FOR UPDATE row locking on both wallets in a consistent order, writing a matching debit and credit, committing only once both sides are correct. Idempotency keys are checked in Redis before the database is ever touched. Refresh tokens rotate on every use with family-based revocation — presenting an already-revoked token kills every session in that family, not just the one.",
    status: "LIVE",
    live: true,
    liveUrl: "https://rakiz-mocha.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/rakiz",
    color: "linear-gradient(135deg, #10b981, #34d399)",
    details: {
      tagline: "Rakiz — Arabic for \"pillar\" or \"foundation.\"",
      overview:
        "Rakiz exists to answer a simple question properly: what does it actually take to move money between people correctly? Not \"looks right in a demo,\" but correctly — every debit has a matching credit, every transfer is provably idempotent, every balance read reflects a row-locked committed state, and every account action leaves an audit trail. It was built phase by phase, backend first: the ledger and double-entry bookkeeping before any UI existed to display a balance; authentication, session rotation, and fraud rules before a single dollar moved; then a full custom frontend — landing page, every authenticated page, real-time notifications, an AI insights layer, and an admin panel — wired against that backend rather than mocked against assumptions about it.",
      stats: [
        { value: "13", label: "MySQL tables" },
        { value: "6", label: "currencies supported" },
        { value: "3", label: "bill-split types" },
        { value: "2", label: "MongoDB collections" },
      ],
      keyFeatures: [
        {
          icon: "💰",
          title: "Multi-Currency Wallets",
          description:
            "Hold balances in six currencies (USD, EUR, LBP, SAR, AED, GBP). Wallets are created lazily on first use or explicitly on demand. Every amount is stored as DECIMAL(18,8) — never a float — across every financial table. Exchange between your own wallets at live Frankfurter.app rates, or at fixed rates for the SAR/AED government pegs and a documented LBP snapshot.",
        },
        {
          icon: "⚡",
          title: "Instant Transfers",
          description:
            "Send to any user by email or phone number from one auto-detecting field. Cross-currency sends convert automatically at the live or fixed rate. Every send requires a client-generated idempotency key, checked in Redis before any database write, so a retried request can never double-execute. The free tier is capped at 20 sends and 5 splits per month, enforced server-side rather than hidden in the UI.",
        },
        {
          icon: "🤝",
          title: "Bill Splitting & Payment Links",
          description:
            "Three split types — equal, custom amount, and percentage — with a live settlement progress bar showing how much of the total has actually been paid. Payment links can be fixed- or open-amount, single-use or reusable, with an optional expiry and a public pay page that anyone can view without an account. Payment requests support pay, decline, and cancel with separate sent/received views.",
        },
        {
          icon: "🧠",
          title: "AI Financial Insights",
          description:
            "On-demand monthly spending summaries, savings suggestions generated from real transaction data, and anomaly detection that flags unusual activity within a month. Natural-language transaction search hands the model a bounded window of the user's own transactions and asks it to match against them — it never touches the database directly.",
        },
        {
          icon: "🔐",
          title: "Security & Account Control",
          description:
            "Refresh token rotation with family tracking — reusing a revoked token kills every session in that family. Device fingerprinting is bound to every session, with an active session list offering per-session and sign-out-everywhere revocation. Stored IP addresses are AES-256-GCM encrypted at rest, and a login from a new IP triggers an automatic email alert.",
        },
        {
          icon: "🛡️",
          title: "Admin Panel & Fraud Queue",
          description:
            "User search, freeze/suspend/reactivate, and manual balance adjustment with a required, fully audit-logged reason. A revenue overview covers user counts per tier, transaction totals, and fees collected. The fraud queue is filterable by status, and opening a flag triggers a real-time AI analysis of the actual linked transaction and the user's recent history — producing a grounded explanation and a concrete recommendation, generated fresh per incident rather than a static rule description.",
        },
      ],
      techStack: [
        {
          group: "Backend",
          items: [
            "Node.js", "Express 5", "MySQL 8 (mysql2)", "MongoDB (Mongoose)",
            "Redis (ioredis)", "Socket.io", "jsonwebtoken", "bcrypt", "zxcvbn",
            "Passport (Google OAuth)", "Joi", "Helmet", "express-rate-limit",
            "crypto-js (AES-256-GCM)", "Stripe", "OpenAI", "Resend", "AWS SDK (S3)",
            "Multer", "Winston",
          ],
        },
        {
          group: "Frontend",
          items: [
            "React 19", "TypeScript", "Vite", "React Router", "Zustand",
            "Tailwind CSS v4", "Framer Motion", "GSAP + ScrollTrigger", "MapLibre GL",
            "socket.io-client", "Radix UI", "Lucide React",
          ],
        },
        {
          group: "Infrastructure",
          items: [
            "AWS EC2", "AWS S3", "Docker", "nginx", "Certbot", "Vercel",
            "MongoDB Atlas", "Redis Cloud", "Stripe", "Resend", "Cloudflare DNS",
          ],
        },
      ],
      architectureDecisions: [
        {
          title: "Double-entry ledger, one chokepoint",
          description:
            "Every financial mutation — sends, splits, exchanges, link payments, admin adjustments — flows through a single transfer() function, which performs SELECT FOR UPDATE row locking on both wallets in a consistent order to avoid deadlocks, writes a matching debit and credit, and only commits once both sides are correct. Fraud checks, audit logging, real-time emits, and notifications all fire after commit, never blocking or partially applying a transaction.",
        },
        {
          title: "Idempotency is enforced before the database is touched",
          description:
            "A client-generated key is checked against Redis first; a cache hit returns the original result instead of reprocessing.",
        },
        {
          title: "Currency exchange reuses the peer-to-peer transfer path",
          description:
            "Exchanging between your own wallets calls the exact same transfer() function as a send to another person, just with the same user as both sender and receiver — inheriting the same locking, double-entry bookkeeping, and audit trail with no separate, less-tested code path.",
        },
        {
          title: "JWT refresh rotation with family tracking",
          description:
            "Each refresh issues a new token and revokes the old one. If a revoked token is ever presented again — a sign of theft or reuse — the entire token family is killed, not just that one session.",
        },
        {
          title: "AI never gets raw database access",
          description:
            "Natural-language search hands the model a bounded list of the user's own transactions and asks it to return matching IDs; the fraud-flag explainer hands it the specific flagged transaction plus recent history. Neither path lets the model construct or run a query itself.",
        },
        {
          title: "Stripe webhooks always return 200",
          description:
            "Internal processing issues are logged, not surfaced as webhook failures — this avoids Stripe's retry loop turning a logging hiccup into duplicate event processing.",
        },
        {
          title: "Route protection is layered, not assumed",
          description:
            "RequireAuth gates every authenticated page; RequireAdmin additionally gates /admin. A logged-out visitor hitting a protected URL directly is redirected to /login before any page content renders, not after a failed API call.",
        },
      ],
      security: [
        "bcrypt password hashing (cost factor 12), with zxcvbn strength scoring at registration and password change",
        "JWT access + refresh tokens; refresh tokens rotate on every use with family-based revocation on reuse detection",
        "Device fingerprinting bound to every session, with full active-session visibility and revocation",
        "Every financial mutation wrapped in a MySQL transaction with SELECT FOR UPDATE row locks on both wallets",
        "Idempotency keys checked in Redis before any transfer is processed",
        "AES-256-GCM encryption at rest for stored IP addresses",
        "Layered rate limiting: global, per-user, per-endpoint, and progressive login lockout",
        "Stripe webhook signature verification against the raw request body, mounted before the global JSON parser so the raw bytes survive",
        "Admin routes gated by authentication and an explicit server-side role check — never client-side only",
        "Port 5000 closed at the EC2 security group level — the backend is only reachable via nginx on 443",
      ],
      knownLimitations: [
        "No SMS phone verification. Phone numbers can be added and used as a send target, but they're unverified by design. Real SMS OTP (Twilio Verify) was scoped and costed (~$0.05/verification, no viable free tier) and deliberately deferred.",
        "LBP exchange rate is a fixed snapshot, not live. Frankfurter.app doesn't carry LBP at all; the rate in use (89,000/USD as of June 2026) will drift as Lebanon's real market rate moves.",
        "No yearly Stripe billing. The pricing toggle displays yearly prices for comparison, but only monthly Stripe price IDs exist — both CTAs route through monthly checkout.",
        "Contact form is visual-only — no backend endpoint sends it anywhere yet.",
        "No standalone logo/icon design. RAKIZ appears as a typographic wordmark throughout; a minimal SVG favicon was added for deployment, but no full brand mark was designed.",
      ],
    },
  },

  {
    name: "AceIt",
    tagline: "Full-stack SaaS interview coach — CV scoring, AI mock interviews, and a self-updating roadmap.",
    description:
      "CV analysis that scores your resume out of 100 like a real ATS system, breaking it into formatting, content, and keyword sub-scores. AI mock interviews generate 7 tailored questions per session with strict no-repeat logic — every question asked is fed back to the model so it's physically impossible to repeat one. Three subscription tiers enforced at the API level, not just the UI. CVs stored in a fully private S3 bucket, only ever accessible via a pre-signed URL with a 1-hour expiry.",
    status: "LIVE",
    live: true,
    liveUrl: "https://ace-it-eight.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/AceIt",
    color: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    details: {
      tagline: null,
      overview:
        "I built AceIt because there was no single platform that combined honest CV analysis, live AI interview practice, skill testing, and a personalized improvement plan in one place. So I built it myself — from the database schema to the deployment pipeline. AceIt is not a generic interview tool: it was designed around the real job-seeking workflow of a developer, from uploading a CV and getting brutally honest ATS feedback, to going through a full mock interview session with an AI that never repeats a question, to tracking progress over time with detailed reports and a personal roadmap that updates automatically after every session.",
      stats: [
        { value: "9", label: "database tables" },
        { value: "7", label: "questions per interview" },
        { value: "3", label: "subscription tiers" },
        { value: "100", label: "point ATS score" },
      ],
      keyFeatures: [
        {
          icon: "📄",
          title: "CV Review",
          description:
            "Upload a CV as a PDF — extracted and analyzed entirely server-side. The AI scores it out of 100 exactly like a real ATS system, with a full breakdown into formatting, content, and keyword scores, and identifies missing keywords, specific weaknesses, and actionable improvements. Every weakness auto-generates a roadmap item. Past reviews are saved and accessible with one click, and the CV itself is stored securely on S3 behind pre-signed URL access.",
        },
        {
          icon: "🧠",
          title: "AI Interview",
          description:
            "Choose your major, job title, experience level, and years of experience, and the AI generates seven tailored questions — technical, behavioral, and situational. Strict no-repeat logic passes every asked question back to the AI so it can never generate the same one twice in a session. Each answer is scored out of 10 with specific feedback and the ideal answer revealed, ending in a full report: overall score, hire recommendation, top strengths, areas to improve, and recommended resources.",
        },
        {
          icon: "⚡",
          title: "Skill Quizzes",
          description:
            "AI-generated multiple-choice quizzes tailored to your exact job title and tech stack, in 5, 10, 15, or 20 question lengths. After submission you get a full breakdown of every question — your answer, the correct answer, right or wrong. Wrong answers automatically generate roadmap improvement items, and past quizzes stay fully clickable for review.",
        },
        {
          icon: "🗺️",
          title: "Self-Updating Roadmap",
          description:
            "Auto-populated from every CV review, interview session, and quiz you complete, with items sorted high → medium → low priority. Filter by status (all / pending / done) and by source type (CV / interview / quiz), mark items done with a strikethrough animation, and track overall completion with live stats per priority level.",
        },
        {
          icon: "📊",
          title: "Reports & PDF Export",
          description:
            "A full performance dashboard across all three features, with an overall score card combining CV, interview, and quiz averages, plus separate tabs for each with summary banners and full session lists. Every session row shows a mini score bar and is clickable. Pro users can export a professional PDF report with full stats, session history, and recent activity.",
        },
        {
          icon: "💳",
          title: "Subscription Plans",
          description:
            "Three tiers enforced at the API level, not just in the UI: Free (1 CV review, 1 interview, 3 quizzes), Basic at $9.99/month (5, 5, 20 plus full reports), and Pro at $19.99/month (unlimited everything, PDF export, priority support). Subscriptions can be cancelled from settings, returning the user to the free plan immediately.",
        },
      ],
      techStack: [
        {
          group: "Backend",
          items: [
            "Node.js", "Express", "MySQL 8", "JWT (jsonwebtoken)", "bcryptjs",
            "OpenAI API (GPT-4o-mini)", "AWS SDK (S3)", "Multer", "pdf2json",
            "express-rate-limit", "helmet", "Docker + docker-compose",
          ],
        },
        {
          group: "Frontend",
          items: [
            "React 18", "Vite", "Framer Motion", "React Router v6", "Axios",
            "React Hot Toast", "jsPDF", "Lucide React",
          ],
        },
        {
          group: "Infrastructure",
          items: [
            "AWS EC2 (eu-north-1)", "AWS S3 (eu-north-1)", "Aiven MySQL", "Vercel",
            "nginx", "SSL",
          ],
        },
      ],
      // AceIt's README has no "Architecture decisions" section; this is its
      // "Key Business Logic" table, which is the closest real equivalent.
      architectureTitle: "Key business logic",
      architectureDecisions: [
        {
          title: "No-repeat questions",
          description:
            "Every question asked in a session is passed back to the AI on the next call — it is physically impossible for the AI to repeat a question within a session.",
        },
        {
          title: "Free tier enforcement",
          description:
            "Usage is tracked per user, per feature in the database, and limits are checked in the controller before any AI call is made — so an over-limit request never reaches OpenAI in the first place.",
        },
        {
          title: "CV extraction never touches disk",
          description:
            "The PDF is uploaded to memory (never written to disk), text is extracted server-side with pdf2json, and only then is it sent to OpenAI.",
        },
        {
          title: "S3 access is private by default",
          description:
            "The bucket is fully private — files are only ever accessible via pre-signed URLs with a 1-hour expiry.",
        },
        {
          title: "Roadmap auto-generation",
          description:
            "Every CV weakness, every interview area-to-improve, and every wrong quiz answer automatically creates a roadmap item, so the roadmap reflects everything the product knows about a user rather than the last feature they opened.",
        },
        {
          title: "Subscription enforcement at the controller, not the UI",
          description:
            "Plan limits are checked at the controller level — a Pro user who downgrades cannot bypass limits by calling the API directly.",
        },
        {
          title: "Password policy enforced at the API",
          description:
            "A new password must differ from the current one, enforced at the API level rather than only in the UI.",
        },
      ],
      security: [
        "JWT authentication on every protected route — no exceptions",
        "bcrypt password hashing with 10 salt rounds",
        "Rate limiting: 10 login attempts per 15 minutes, 500 API calls per 15 minutes",
        "AWS S3 private bucket — zero public access, pre-signed URLs expire after 1 hour",
        "SQL injection prevention via parameterized queries on every single database call",
        "Global error handler — never exposes stack traces, SQL errors, or internal details in production",
        "CORS restricted to the frontend origin only; Helmet.js security headers on all responses",
        "3-step account deletion with password re-confirmation",
      ],
      // AceIt's README has no "Known limitations" section; these are drawn from
      // its documented mock-payment flow and its Roadmap of unbuilt features.
      limitationsTitle: "Scope & roadmap — documented, not hidden",
      knownLimitations: [
        "Payments are a mock flow, not a real processor. The upgrade path includes a full mock payment UI — animated card preview, formatters, and a 2-second processing simulation — but no real charge is made. Stripe / Tap Payments integration is the documented next step.",
        "No voice-based interview mode yet — answers are typed, not spoken.",
        "No LinkedIn job import. Pasting a job URL to have the AI tailor questions to that exact listing is scoped but not built.",
        "No company-specific interview packs (Google/Meta/Amazon style) yet.",
        "No interview recording with playback and AI analysis.",
        "No mobile app — the React Native client is on the roadmap, not shipped.",
      ],
    },
  },

  {
    name: "Tawla",
    tagline: "Multi-tenant, real-time restaurant POS covering every role from owner to delivery driver.",
    description:
      "A single deployment serving unlimited restaurants with complete data isolation — every table, order, and user scoped to a restaurant ID, so cross-restaurant data leakage is structurally impossible, not just policy. Five roles covered end to end: owner dashboard with a live revenue counter and floor plan, a kitchen display that turns orders red past 15 minutes, a waiter interface with split billing and AI-suggested upsells, and a delivery flow with real-time driver assignment.",
    status: "LIVE",
    live: true,
    liveUrl: "https://tawla-ecru.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/restaurant-pos",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
    details: {
      tagline: null,
      overview:
        "Tawla (Arabic for \"table\") is a complete SaaS restaurant point-of-sale platform built from scratch. It is not a generic POS adapted for food — it was designed around the actual daily workflow of a Lebanese restaurant, covering every role from the owner to the waiter to the kitchen staff to the delivery operator. The system is multi-tenant: a single deployment serves multiple restaurants simultaneously with complete data isolation between them, each with its own menu, staff, tables, orders, and analytics.",
      stats: [
        { value: "13", label: "database tables" },
        { value: "5", label: "staff roles" },
        { value: "3", label: "AI suggestions per order" },
        { value: "4", label: "max deliveries per driver" },
      ],
      keyFeatures: [
        {
          icon: "🏢",
          title: "Multi-Tenant SaaS Architecture",
          description:
            "A single deployment serves unlimited restaurants with complete data isolation — every table, order, and user is scoped to a restaurant_id. Restaurant owners apply online and are reviewed and approved from a separate Super Admin panel, which auto-generates the owner account on approval. Licensing is a one-time payment model rather than a subscription.",
        },
        {
          icon: "👑",
          title: "Super Admin Platform",
          description:
            "A command center completely separate from restaurant staff: review every restaurant application with full detail, approve or reject with a reason, track payment status (cash or card) with a history that never disappears, and activate or deactivate any restaurant behind a required reason and 2-step confirmation.",
        },
        {
          icon: "🍽️",
          title: "Owner Dashboard & Reports",
          description:
            "A live revenue counter that animates as orders come in, a real-time floor plan showing every table's status, and a live order ticker with waiter, table, amount, and status. Reports cover today's revenue, a weekly dine-in vs delivery area chart, revenue by category, top 10 best sellers, and a full discount log showing who applied what, on which table, original vs final total.",
        },
        {
          icon: "🔴",
          title: "Kitchen Display",
          description:
            "A dark, high-contrast display designed for kitchen screens, showing all active dine-in and delivery orders in one grid. Each card shows table number (or customer name), waiter, and elapsed time — and any order older than 15 minutes turns red with an URGENT badge. Individual items can be tapped to mark ready, and Socket.io pushes new orders and status changes instantly with no refresh.",
        },
        {
          icon: "🚚",
          title: "Delivery Management",
          description:
            "Create delivery orders with full customer info while browsing the menu inline. The delivery fee is automatic — $3 under $60, free at $60 and above. Drivers are tracked by active delivery count with a hard maximum of 4 simultaneous orders, their status flipping between Available and On Road automatically, and every status change pushed live to both owner and delivery operator screens.",
        },
        {
          icon: "🤖",
          title: "Tawla AI",
          description:
            "Activated before a waiter sends an order, Tawla AI reads the restaurant's live menu — prices, categories, availability — analyzes the current order, and suggests exactly 3 complementary items based on food pairings, a missing drink, a missing dessert, or popular combos. A special rule prioritizes items that push a $50–59 order to $60 for free delivery. Each restaurant's AI only ever sees its own menu.",
        },
      ],
      techStack: [
        {
          group: "Backend",
          items: [
            "Node.js", "Express", "MySQL 8 (mysql2)", "Socket.io",
            "JWT (jsonwebtoken)", "bcryptjs", "OpenAI SDK (GPT-3.5)", "Nodemailer",
            "express-validator", "express-rate-limit", "helmet",
          ],
        },
        {
          group: "Frontend",
          items: [
            "React 18", "Vite", "Tailwind CSS v4", "Framer Motion", "Recharts",
            "Socket.io Client", "React Router v6", "Axios", "React Hot Toast",
            "Lucide React",
          ],
        },
      ],
      // Tawla's README has no "Architecture decisions" section; this is its
      // "Key Business Logic" table, which is the closest real equivalent.
      architectureTitle: "Key business logic",
      architectureDecisions: [
        {
          title: "Restaurant scoping on every query",
          description:
            "Every database query includes restaurant_id — making cross-restaurant data access impossible rather than merely discouraged. This is the property the entire multi-tenant model rests on.",
        },
        {
          title: "One Socket.io room per restaurant",
          description:
            "Each restaurant gets its own room (kitchen_{restaurant_id}). A new dine-in order reaches that kitchen instantly, a new delivery order reaches both kitchen and delivery operator, and a driver assignment updates the operator's screen without a refresh — solving ordering latency and tenant isolation with the same mechanism.",
        },
        {
          title: "Delivery fee and driver capacity",
          description:
            "$3 flat if the food total is under $60, free at $60 or above. A driver may hold a maximum of 4 active deliveries — the system blocks assignment beyond that, and a driver's status auto-sets to On Road when assigned and back to Available once all deliveries resolve.",
        },
        {
          title: "Discount guardrails",
          description:
            "A discount above 40% triggers a confirmation modal, and 100% triggers an extra warning. The discount percentage and amount are saved to the database, final_total is updated, and the discount is reflected in reports — so revenue accuracy survives the intervention.",
        },
        {
          title: "Item cancellation is state-gated",
          description:
            "An item can only be cancelled while still pending — once the kitchen has started preparing it, cancellation is blocked.",
        },
        {
          title: "Staff email domain enforcement",
          description:
            "Staff emails are auto-generated as name@owner_domain.com, so a restaurant's staff accounts always match its own domain.",
        },
        {
          title: "AI is scoped to a single restaurant's menu",
          description:
            "Tawla AI only ever sees the menu of the restaurant it is serving, with the free-delivery nudge applied at the $50–59 order band.",
        },
      ],
      security: [
        "JWT on every protected route",
        "restaurant_id scoped on every database query — cross-restaurant data access is structurally impossible",
        "bcrypt password hashing (10 salt rounds)",
        "Rate limiting: 50 login attempts / 15 min, 500 API calls / 15 min, 10 applications / hour",
        "Global error handler — no stack traces or SQL errors in production",
        "Input validation on critical routes via express-validator",
        "SQL injection prevention via parameterized queries on every query",
        "CORS restricted to the frontend origin; Helmet.js security headers",
        "Inactive restaurants blocked at the login level",
        "2-step confirmation for destructive actions",
      ],
      // Tawla's README has no "Known limitations" section; these are its
      // documented Roadmap of unbuilt features plus stated scope decisions.
      limitationsTitle: "Scope & roadmap — documented, not hidden",
      knownLimitations: [
        "Drivers have no system login. They are registered for assignment tracking only — the delivery operator manages their status on their behalf.",
        "No menu item photos. Cloudinary integration for item images is scoped but not built.",
        "No push notifications. A PWA push layer is on the roadmap, not shipped.",
        "No inventory management module — stock is not tracked against menu items.",
        "No multi-branch support. A single owner cannot yet run multiple locations under one account.",
        "No PDF receipt generation or Excel report export — receipts print via the browser dialog.",
        "No customer loyalty system.",
      ],
    },
  },

  {
    name: "PharmaCare",
    tagline: "Pharmacy management built from 5+ years behind an actual pharmacy counter.",
    description:
      "Not a generic inventory app — built around the real daily workflow of a Lebanese pharmacy. Medications are tracked by both brand name and active ingredient, so searching an ingredient surfaces every available alternative brand. Prescriptions calculate insurance coverage automatically and deduct stock the moment they're dispensed. An AI assistant has live context on the exact inventory — stock levels, prices, expiry dates — and always recommends FEFO (first expiry, first out) rather than generic advice.",
    status: "LIVE",
    live: true,
    liveUrl: "https://pharmacy-system-wine.vercel.app",
    // The deployment serves HTML (HTTP 200), but thum.io's headless capture of it
    // renders a blank white page — a 2KB all-white PNG returned as HTTP 200, at
    // every wait/size variant tried. Because that is a *successful* image load,
    // onError never fires and no fallback can catch it. So skip the screenshot
    // for this project and use its GitHub OpenGraph card instead.
    screenshot: false,
    repoUrl: "https://github.com/Abdallah-khatib-7/pharmacy-system",
    color: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    details: {
      tagline: "A complete, production-ready pharmacy management system built by a pharmacist, for pharmacists.",
      overview:
        "PharmaCare is a closed, professional pharmacy management system built from 5 years of real pharmacy experience. It handles everything from inventory management to AI-powered drug consultations — designed around the actual daily workflow of a Lebanese pharmacy. Access is restricted to authorized pharmacy staff only: the pharmacy owner registers as Admin and creates accounts for their pharmacists, with no public registration.",
      stats: [
        { value: "9", label: "database tables" },
        { value: "15", label: "unit low-stock threshold" },
        { value: "90", label: "day expiry window" },
        { value: "2", label: "access roles" },
      ],
      keyFeatures: [
        {
          icon: "💊",
          title: "Inventory by Ingredient, Not Just Brand",
          description:
            "Medications are tracked by both brand name and active ingredient, with multiple brands linked under one generic (Profinal, Advil, Brufen → all under Ibuprofen). Searching any active ingredient surfaces every available alternative brand in stock — the single change that makes the system match how a pharmacist actually thinks. Purchase price and selling price are tracked in USD, and every medication is linked to a specific supplier.",
        },
        {
          icon: "📋",
          title: "Prescriptions & Insurance",
          description:
            "Full prescription creation with patient, doctor, diagnosis, and date, supporting multiple medications per prescription with individual instructions. Insurance coverage is calculated automatically from the company name and coverage percentage to derive the patient's share. Stock is deducted automatically when a prescription is marked dispensed, and validation blocks dispensing anything already out of stock.",
        },
        {
          icon: "📦",
          title: "Orders & Purchase Entry",
          description:
            "Purchase orders are created against a specific supplier and only show that supplier's medications. When an order arrives, the Purchase Entry flow verifies each item's quantity and expiry date before confirming, and stock is incremented automatically when the order is marked received. Order status tracks Pending → Processing → Received / Cancelled.",
        },
        {
          icon: "🔔",
          title: "Smart Alerts",
          description:
            "Low stock alerts at or below 15 units, colour-coded by severity, and expiry alerts for anything within 90 days with days remaining shown. Alerts can be filtered by supplier, ingredient, stock level, or expiry urgency, dismissed for 3, 7, 14, or 30 days, and exported to PDF filtered by supplier — ready to send straight to a rep.",
        },
        {
          icon: "🤖",
          title: "PharmaCare AI",
          description:
            "Powered by OpenAI with live inventory context — it knows the exact stock, prices, expiry dates, and suppliers on hand. It recommends FEFO (First Expiry, First Out) automatically and answers professionally, without consumer-facing \"consult a doctor\" disclaimers, because its users are trained pharmacy staff.",
        },
        {
          icon: "🧮",
          title: "Dosage Calculator",
          description:
            "Weight-based dosage calculation in mg/kg/day with automatic volume calculation for liquid medications. It supports renal impairment adjustments (mild, moderate, severe), a pediatric flag for under-18 patients, and a pregnancy warning flag — and shows its calculation steps transparently rather than just producing a final number, so a pharmacist can verify it. A FEFO alert fires if the selected medication is expiring soon.",
        },
      ],
      techStack: [
        {
          group: "Backend",
          items: [
            "Node.js", "Express", "MySQL 8 (mysql2)", "JWT (jsonwebtoken)",
            "bcryptjs", "OpenAI SDK (GPT-3.5)", "cors",
          ],
        },
        {
          group: "Frontend",
          items: [
            "React 18", "Vite", "Tailwind CSS v4", "React Router v6", "Axios",
            "jsPDF + AutoTable", "Context API", "Lucide React",
          ],
        },
      ],
      // PharmaCare's README has no "Architecture decisions" section; this is its
      // "Key Business Logic" table, which is the closest real equivalent.
      architectureTitle: "Key business logic",
      architectureDecisions: [
        {
          title: "Stock deduction on dispense",
          description:
            "When a prescription moves to dispensed, stock decreases by the prescribed quantity — the stock level is a consequence of the workflow, not a number someone remembers to update.",
        },
        {
          title: "Stock increment on receipt",
          description:
            "When a purchase order is marked received, stock increases by the ordered quantity, after the Purchase Entry flow has verified each item's real quantity and expiry.",
        },
        {
          title: "Stock validation blocks impossible dispensing",
          description:
            "A prescription cannot be created against a medication whose stock is zero — the invalid state is refused rather than recorded.",
        },
        {
          title: "FEFO — First Expiry, First Out",
          description:
            "The AI always recommends selling the nearest-expiry batch first, because it is given live expiry data rather than generic advice.",
        },
        {
          title: "Insurance calculation",
          description:
            "The patient's share is derived as Total × (1 − coverage%), computed by the system rather than typed in by hand.",
        },
        {
          title: "Dosage calculation",
          description:
            "Volume = (Weight × Dose per kg ÷ Frequency) ÷ Concentration × Volume — shown step by step so the result can be verified rather than trusted.",
        },
        {
          title: "Per-user, time-based alert dismissal",
          description:
            "A dismissed alert is dismissed only for that user and only for the chosen period — it returns automatically once the dismiss window elapses.",
        },
      ],
      security: [
        "All routes except /api/auth/* require a valid JWT token",
        "Role-based access control — Admin vs Pharmacist, verified server-side via middleware",
        "Passwords never stored in plain text — bcrypt hashed (10 salt rounds)",
        "JWT tokens expire after 24 hours",
        "API keys and database credentials stored in .env — never committed to Git",
        "SQL injection prevented via parameterized queries",
        "CORS configured for the frontend origin only",
      ],
      // PharmaCare's README has no "Known limitations" section; these are scope
      // decisions stated explicitly elsewhere in the README.
      limitationsTitle: "Scope & design decisions — documented, not hidden",
      knownLimitations: [
        "Closed system by design — there is no public registration. The pharmacy owner registers as Admin and creates every pharmacist account.",
        "PharmaCare AI uses session-based memory — each conversation starts fresh, with no recall across sessions.",
        "AI responses are written for trained pharmacy staff and deliberately omit consumer-facing \"consult a doctor\" disclaimers.",
        "Low-stock and expiry thresholds are fixed at 15 units and 90 days rather than being configurable per pharmacy.",
        "Prices are tracked in USD only.",
      ],
    },
  },

  {
    name: "JARVIS",
    tagline: "A local agentic AI assistant that actually uses tools — not a chatbot with a CLI skin.",
    description:
      "The agentic loop is the actual product, not a chat window bolted onto a shell. Every AI call goes through a single provider-agnostic adapter interface, so the app itself is provider-blind — adding Claude or Gemini later is one new file, not a rewrite. Real OpenAI function-calling wired as a genuine multi-turn loop: the model calls a tool, the result feeds back into context, and it either calls another tool or answers in text, bounded by a hard turn ceiling with a graceful fallback.",
    status: "In Development",
    live: false,
    liveUrl: null,
    repoUrl: "https://github.com/Abdallah-khatib-7/Jarvis",
    color: "linear-gradient(135deg, #6c5ce7, #a78bfa)",
    details: {
      tagline: "Just A Rather Very Intelligent System.",
      overview:
        "Most \"AI terminal tools\" are really just a chat window bolted onto a shell. JARVIS is built the other way around: the agentic loop is the product. You describe what you want, the model decides which tool answers that — reading a file, searching the project tree, checking a GitHub PR, searching the web — runs it, and reasons over the real result. Nothing is hardcoded to a specific phrase or command shape. It is local-first by design: no hosted backend, no multi-tenant server, no central database — each person runs their own copy, with their own SQLite file and their own API keys. The tradeoff is deliberate: no hosting bill, no \"your data on our servers,\" and every user's JARVIS is genuinely theirs.",
      stats: [
        { value: "2", label: "SQLite tables" },
        { value: "8", label: "tools available" },
        { value: "4", label: "selectable personalities" },
        { value: "1", label: "provider adapter interface" },
      ],
      keyFeatures: [
        {
          icon: "🤖",
          title: "Real Agentic Tool Use",
          description:
            "A provider-agnostic AI adapter layer means the app talks to one internal interface and never directly to a vendor SDK, so adding Claude/Gemini/DeepSeek later is a new adapter file, not a rewrite. OpenAI function-calling is wired as a genuine multi-turn loop: the model calls a tool, the result feeds back into context, and it either calls another tool or answers in text — bounded by a hard turn ceiling with a graceful no-tools fallback. Tools ship as { ok, output } results dispatched through one central registry.",
        },
        {
          icon: "🛠️",
          title: "Tools Available Today",
          description:
            "read_file returns content with real line numbers prefixed so JARVIS can reference exact lines instead of guessing. list_directory and search_files let it find files itself rather than being told the path, skipping node_modules/.git/dist. web_search runs live queries via Serper. A GitHub connector covers search, repo listing, PRs and issues read-only — with issue creation and commenting gated behind an on-screen preview panel before anything posts.",
        },
        {
          icon: "🧠",
          title: "Smart, Age-Aware Onboarding",
          description:
            "Freeform Q&A seeds JARVIS's memory of you — name, gender, age, role, education, self-description. Age inference is handled with care: under 18, JARVIS guesses you're in high school and asks you to confirm rather than interrogating cold. A hard age gate at 16 gives one warning on invalid input, then triggers a real animated self-destruct countdown; under-16 gets a respectful farewell. Both paths cleanly delete the account and its memory, with no orphaned rows.",
        },
        {
          icon: "🎭",
          title: "Selectable Personality",
          description:
            "Four distinct voices — cool and cinematic, warm and witty, playful and cheeky, serious and professional — defined once in a shared registry and used everywhere. The first greeting always speaks in the default cinematic voice, then the user picks their preferred tone, avoiding a wasted regeneration call. The chosen personality is injected into every system prompt for the rest of every session, not just the welcome message.",
        },
        {
          icon: "🖥️",
          title: "Cinematic Terminal Identity",
          description:
            "A boot sequence with a glitch-resolve title animation — ASCII art assembling out of scrambled noise rather than a static print — followed by staggered boot-status lines and a typewriter tagline reveal. Every response types out character by character in cyan, except code blocks, which print instantly and untouched so formatting never breaks.",
        },
        {
          icon: "💬",
          title: "Persistent Chat Loop",
          description:
            "Not a one-shot script but a genuine ongoing conversation with running history, so JARVIS remembers what you said three messages ago. Every reply speaks in your chosen personality and is aware of everything from onboarding, injected fresh into the system prompt each session. A thinking spinner with rotating phrases covers tool-use latency instead of a silent hang.",
        },
      ],
      techStack: [
        {
          group: null,
          items: [
            "Node.js 18+", "TypeScript 5", "tsx", "better-sqlite3 (WAL)", "bcrypt",
            "OpenAI SDK", "Inquirer.js", "Chalk", "Ora", "Figlet",
            "Gradient-string", "@octokit/rest", "Serper", "dotenv",
          ],
        },
      ],
      architectureDecisions: [
        {
          title: "Provider adapter, not a vendor SDK call",
          description:
            "Every AI call goes through AIProvider — one shared interface (chat(messages) → string). openai.ts is the only file that knows OpenAI's actual request shape; the rest of the app is provider-blind. Adding a second provider later means one new adapter file translating the same interface, never touching the tools, the chat loop, or the personality system.",
        },
        {
          title: "Tools are pure functions, dispatched centrally",
          description:
            "Every tool returns { ok, output } and never throws past its own boundary — a missing file becomes a readable message, not a stack trace. registry.ts is the single place mapping an AI-requested tool name to the real function that runs it. The AI only ever sees a name, a description, and a parameter schema; it never touches real code directly.",
        },
        {
          title: "Memory is key/value, not fixed columns",
          description:
            "Onboarding facts, personality choice, anything JARVIS learns about a user — all stored as (user_id, key, value) rows with an upsert on conflict. Adding a new fact the app cares about is zero schema changes, ever.",
        },
        {
          title: "Destructive actions are architecturally separate from read actions",
          description:
            "Reading, searching, and listing require no confirmation. Anything that would modify or delete is scoped from day one to require a typed confirm-phrase echoing the specific action back, never a password re-prompt. This boundary is enforced by which functions exist, not by a runtime check that could be bypassed.",
        },
        {
          title: "Local-only, by design, not by limitation",
          description:
            "No server, no shared auth, no multi-tenant anything. jarvis.db lives next to the source, resolved via a fixed path derived from the module's own location — not the caller's working directory — so the database is always found in the same place regardless of how the process was launched.",
        },
        {
          title: "Age-gate deletion is transactional",
          description:
            "Removing an under-16 or repeatedly-invalid-age account wipes both the users row and every memory row tied to it inside a single better-sqlite3 transaction — either both succeed or neither does. No orphaned memory rows pointing at a user that no longer exists.",
        },
      ],
      // JARVIS's README has no dedicated Security section; these are the
      // security properties stated explicitly elsewhere in it.
      securityTitle: "Security properties",
      security: [
        "bcrypt-hashed passwords at cost factor 12, stored in local SQLite with WAL mode",
        "Password confirmation on signup and capped wrong-password attempts on login",
        "Destructive tools require a typed confirm-phrase that echoes the specific action back — enforced by which functions exist, not a bypassable runtime check",
        "GitHub writes (issue creation, commenting) are gated behind an on-screen preview panel before anything posts",
        "Age-gate account deletion is transactional — the user row and every memory row are removed together or not at all",
        "Local-first: no hosted backend and no central database — data never leaves the user's machine except for model calls",
        ".env is gitignored — API keys are never committed and never leave the machine",
      ],
      knownLimitations: [
        "GitHub token is shared, not per-user. In a multi-account local install, every user currently pulls the same GITHUB_TOKEN from .env. This needs to move to a per-session or keytar-backed credential before it's genuinely multi-user safe — flagged, not yet fixed.",
        "No execution tools yet. JARVIS can read and reason about code but can't run it — \"does this file have errors\" gets an honest best-effort read-through, not a real compiler answer, until tsc/shell execution tools exist.",
        "No file-write tools yet. edit_file and delete_file are scoped and designed (confirm-phrase gated) but not built — JARVIS is currently read-only on your filesystem.",
        "Single AI provider. Only OpenAI is wired up today; the adapter layer is built to make adding others straightforward, but Claude/Gemini/DeepSeek don't exist yet.",
        "No shared-key token cap enforcement yet. The 75k/day shared-key model is specified but not implemented — today, every local user with the shared .env key has unlimited use.",
      ],
    },
  },
];

// URL-safe, lowercase, hyphenated. Collapses any run of non-alphanumerics to a
// single hyphen so slugs stay stable if a project name gains punctuation.
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function githubOgImage(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

// Live screenshot of the deployed site, via thum.io (no API key). The target URL
// is appended raw — thum.io expects it unencoded, including its scheme.
function screenshotImage(liveUrl) {
  return `https://image.thum.io/get/width/800/crop/600/${liveUrl}`;
}

// Ordered list of preview candidates, tried top to bottom; the UI advances to the
// next one on load error and shows a num/name placeholder if all of them fail.
//
// A screenshot is only attempted when the project is live, actually has a URL,
// and hasn't opted out via `screenshot: false`. The opt-out exists because a
// thum.io capture that renders blank still returns HTTP 200 with a valid (white)
// PNG — the browser fires `onload`, not `onerror`, so no runtime fallback can
// catch it. The only reliable fix for that case is to not request it at all.
function previewSourcesFor(p) {
  const sources = [];
  if (p.live && p.liveUrl && p.screenshot !== false) {
    sources.push(screenshotImage(p.liveUrl));
  }
  const og = githubOgImage(p.repoUrl);
  if (og) sources.push(og);
  return sources;
}

// The grouped techStack in `details` is the single source of truth; the flat
// `stack` used by the homepage tags is derived from it, so the two can't drift.
function flattenStack(techStack) {
  return techStack.flatMap((group) => group.items);
}

export const projects = rawProjects.map((p, i) => {
  const stack = flattenStack(p.details.techStack);
  return {
    ...p,
    slug: slugify(p.name),
    num: String(i + 1).padStart(2, "0"),
    badge: p.status === "LIVE" ? "LIVE" : p.status.toUpperCase(),
    ctaLabel: "Visit live",
    stack,
    stackPreview: stack.slice(0, 4),
    moreCount: "+" + (stack.length - 4) + " more",
    previewSources: previewSourcesFor(p),
  };
});

const duplicateSlugs = projects
  .map((p) => p.slug)
  .filter((slug, i, all) => all.indexOf(slug) !== i);
if (duplicateSlugs.length) {
  throw new Error(`data.js: duplicate project slug(s): ${duplicateSlugs.join(", ")}`);
}

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

// The order the filter tabs render in. "All" is prepended by the UI.
export const stackCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Infrastructure",
  "Languages",
];

// [name, category, slug, colorOrUrl, invert]
// slug "GLYPH" means there's no icon — render colorOrUrl as a text glyph instead.
const rawStack = [
  ["HTML5", "Frontend", "html5", "E34F26"],
  ["CSS", "Frontend", "css", "663399"],
  ["React", "Frontend", "react", "61DAFB"],
  ["Vite", "Frontend", "vite", "646CFF"],
  ["Tailwind CSS", "Frontend", "tailwindcss", "06B6D4"],
  ["Framer Motion", "Frontend", "framer", "f5efe8"],
  // Distinct from Framer Motion: GSAP + ScrollTrigger does the scroll-driven work.
  ["GSAP", "Frontend", "gsap", "0AE448"],
  ["React Router", "Frontend", "reactrouter", "CA4245"],
  // simple-icons has no Zustand icon; devicon does (already a source here, see AWS/Java).
  // Its artwork is near-black (#090706), so it needs inverting on the dark background.
  ["Zustand", "Frontend", null, "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg", true],
  ["Radix UI", "Frontend", "radixui", "f5efe8"],
  ["MapLibre GL", "Frontend", "maplibre", "396CB2"],
  ["Node.js", "Backend", "nodedotjs", "5FA04E"],
  ["Express", "Backend", "express", "f5efe8"],
  ["Socket.io", "Backend", "socketdotio", "f5efe8"],
  ["JWT", "Backend", "jsonwebtokens", "f5efe8"],
  ["Passport / OAuth", "Backend", "passport", "34E27A"],
  // No bcrypt icon exists in any of the icon sources used here; its hash prefix
  // is the recognisable mark, so it renders as a text glyph like Assembly/Prolog.
  ["bcrypt", "Backend", "GLYPH", "$2b$"],
  ["Zod", "Backend", "zod", "3E67B1"],
  // Kept separate from Zod on purpose — Rakiz validates with Joi, Shipyard with Zod.
  ["Joi", "Backend", "GLYPH", "✓{}"],
  // No icon for either: BullMQ borrows Redis (the queue it's backed by), and
  // Octokit borrows GitHub (the API it wraps).
  ["BullMQ", "Backend", "redis", "FF4438"],
  ["Octokit", "Backend", "github", "f5efe8"],
  ["Winston / Morgan", "Backend", "GLYPH", ">_"],
  ["Stripe", "Backend", "stripe", "635BFF"],
  ["OpenAI API", "Backend", null, "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg", true],
  // Separate from "OpenAI API" above: that's a plain completion call, this is the
  // multi-turn tool-calling loop JARVIS is built around. Same icon, different thing.
  ["Agentic Tool-Use", "Backend", null, "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg", true],
  ["MySQL", "Database", "mysql", "4479A1"],
  ["MongoDB", "Database", "mongodb", "47A248"],
  ["Redis", "Database", "redis", "FF4438"],
  ["SQLite", "Database", "sqlite", "4DB6E8"],
  ["Docker", "Infrastructure", "docker", "2496ED"],
  // Deliberately kept alongside the generic Docker entry above: Dockerode is the
  // programmatic daemon control Shipyard's build isolation is actually built on.
  // No icon of its own, so it borrows Docker's.
  ["Dockerode", "Infrastructure", "docker", "2496ED"],
  ["AWS", "Infrastructure", null, "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"],
  ["nginx", "Infrastructure", "nginx", "009639"],
  ["Cloudflare", "Infrastructure", "cloudflare", "F38020"],
  ["Vercel", "Infrastructure", "vercel", "f5efe8"],
  ["npm", "Infrastructure", "npm", "CB3837"],
  ["Git", "Infrastructure", "git", "F05032"],
  ["JavaScript", "Languages", "javascript", "F7DF1E"],
  ["TypeScript", "Languages", "typescript", "3178C6"],
  ["Java", "Languages", null, "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
  ["C++", "Languages", "cplusplus", "00599C"],
  ["Assembly", "Languages", "GLYPH", ".asm"],
  ["Prolog", "Languages", "GLYPH", "?-"],
  // Not a language as such — CS fundamentals. Grouped here because it's the
  // closest of the five categories; move it if you'd rather it sat elsewhere.
  ["Data Structures & Algorithms", "Languages", "GLYPH", "O(n)"],
];

export const stackItems = rawStack.map(([name, category, slug, colorOrUrl, invert]) => {
  const isGlyph = slug === "GLYPH";
  const icon = isGlyph ? null : slug ? `https://cdn.simpleicons.org/${slug}/${colorOrUrl}` : colorOrUrl;
  return {
    name,
    category,
    icon,
    glyph: isGlyph ? colorOrUrl : null,
    invert: Boolean(invert),
  };
});

export const currently = [
  "Shipyard is live — real container isolation, real EC2/RDS/Cloudflare deployment",
  "Building JARVIS — my own local agentic AI assistant, in active development",
  "Deepening my knowledge of AWS, Docker, and cloud architecture",
  "Next: SMS-verified phone payments and yearly billing for Rakiz, voice interviews for AceIt",
  "Open to full-stack developer opportunities",
];

export const typedLines = [
  "Full-stack developer 🇱🇧",
  "I build complete products",
  "Real infra. Real users.",
  "Production, not localhost",
];

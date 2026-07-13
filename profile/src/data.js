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

const rawProjects = [
  {
    name: "Shipyard",
    tagline: "Push a repo, get a live URL — a real deployment platform on real infrastructure.",
    description:
      "Built around the genuinely hard part: running untrusted code safely. A GitHub webhook triggers a build inside an isolated, disposable Docker container — hard CPU/memory/timeout limits, no network path to anything else, destroyed unconditionally when done. Output goes to S3 and is served on a live subdomain within seconds via a Cloudflare Worker + KV edge router, replacing what would otherwise be one DNS record per deployment. Build logs stream to the browser line by line over Socket.io, sanitized so a build tool's own terminal spinner doesn't turn into garbage on screen. Deployed on real production infrastructure — EC2 + nginx + Certbot for the API, RDS for the database, Cloudflare Pages for the frontend — with least-privilege IAM scoped to only the AWS actions the app actually uses.",
    stack: [
      "Node.js", "Express", "TypeScript", "MySQL (RDS)", "Redis", "BullMQ",
      "Docker", "Dockerode", "Socket.io", "React", "Cloudflare Workers",
      "Cloudflare KV", "Cloudflare Pages", "AWS EC2/S3/RDS", "nginx", "Certbot",
    ],
    live: true,
    liveUrl: "https://shipyard.shpit.uk",
    repoUrl: "https://github.com/Abdallah-khatib-7/Shipyard",
    color: "linear-gradient(135deg, #ef7f3f, #f2a65a)",
  },
  {
    name: "Rakiz",
    tagline: "Bank-grade multi-currency wallet with double-entry bookkeeping and AI fraud review.",
    description:
      "Built the way a bank would actually build one: every financial mutation flows through a single ledger function performing SELECT FOR UPDATE row locking on both wallets in a consistent order, writing a matching debit and credit, committing only once both sides are correct. Idempotency keys are checked in Redis before the database is ever touched. Refresh tokens rotate on every use with family-based revocation — presenting an already-revoked token kills every session in that family, not just the one. Six currencies, instant transfers, three types of bill splitting, shareable payment links, Stripe subscriptions, and an admin fraud queue where flags get a real AI-generated explanation and recommendation, not a static rule description. Dockerized backend on EC2 behind nginx with real SSL; frontend on Vercel.",
    stack: [
      "Node.js", "Express", "MySQL", "MongoDB", "Redis", "Socket.io", "React",
      "TypeScript", "Stripe", "OpenAI API", "AWS S3/EC2", "Docker", "nginx",
    ],
    live: true,
    liveUrl: "https://rakiz-mocha.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/rakiz",
    color: "linear-gradient(135deg, #10b981, #34d399)",
  },
  {
    name: "AceIt",
    tagline: "Full-stack SaaS interview coach — CV scoring, AI mock interviews, and a self-updating roadmap.",
    description:
      "CV analysis that scores your resume out of 100 like a real ATS system, breaking it into formatting, content, and keyword sub-scores. AI mock interviews generate 7 tailored questions per session with strict no-repeat logic — every question asked is fed back to the model so it's physically impossible to repeat one. Skill quizzes, a roadmap that auto-populates from every CV weakness, interview gap, and wrong quiz answer, and a full reports dashboard with a PDF export for Pro users. Three subscription tiers enforced at the API level, not just the UI — a downgraded user can't bypass limits by calling the API directly. CVs stored in a fully private S3 bucket, only ever accessible via a pre-signed URL with a 1-hour expiry. Deployed on AWS EC2 behind nginx with SSL, frontend on Vercel.",
    stack: [
      "Node.js", "Express", "MySQL", "React", "Framer Motion", "OpenAI API",
      "AWS S3", "AWS EC2", "Docker", "JWT", "Multer", "jsPDF",
    ],
    live: true,
    liveUrl: "https://ace-it-eight.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/AceIt",
    color: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  },
  {
    name: "Tawla",
    tagline: "Multi-tenant, real-time restaurant POS covering every role from owner to delivery driver.",
    description:
      "A single deployment serving unlimited restaurants with complete data isolation — every table, order, and user scoped to a restaurant ID, so cross-restaurant data leakage is structurally impossible, not just policy. Five roles covered end to end: owner dashboard with a live revenue counter and floor plan, a kitchen display that turns orders red past 15 minutes, a waiter interface with split billing and AI-suggested upsells, and a delivery flow with real-time driver assignment. Every restaurant gets its own Socket.io room — a new order reaches the kitchen the instant it's placed, no polling, no refresh. Tawla AI reads a restaurant's live menu and suggests exactly 3 complementary items per order, with a special rule that nudges $50-59 orders toward the $60 free-delivery threshold.",
    stack: [
      "Node.js", "Express", "MySQL", "React", "Socket.io", "OpenAI API",
      "Tailwind CSS", "Framer Motion", "Recharts", "JWT",
    ],
    live: true,
    liveUrl: "https://tawla-ecru.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/restaurant-pos",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    name: "PharmaCare",
    tagline: "Pharmacy management built from 5+ years behind an actual pharmacy counter.",
    description:
      "Not a generic inventory app — built around the real daily workflow of a Lebanese pharmacy. Medications are tracked by both brand name and active ingredient, so searching an ingredient surfaces every available alternative brand. Prescriptions calculate insurance coverage automatically and deduct stock the moment they're dispensed, with validation that blocks dispensing anything already out of stock. An AI assistant has live context on the exact inventory — stock levels, prices, expiry dates — and always recommends FEFO (first expiry, first out) rather than generic advice. A weight-based dosage calculator handles renal impairment adjustments and pediatric/pregnancy flags, showing its calculation steps transparently rather than just a final number.",
    stack: ["Node.js", "Express", "MySQL", "React", "Tailwind CSS", "OpenAI API", "JWT", "jsPDF"],
    live: true,
    liveUrl: "https://pharmacy-system-wine.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/pharmacy-system",
    color: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
  },
  {
    name: "JARVIS",
    tagline: "A local agentic AI assistant that actually uses tools — not a chatbot with a CLI skin.",
    description:
      "The agentic loop is the actual product, not a chat window bolted onto a shell. Every AI call goes through a single provider-agnostic adapter interface, so the app itself is provider-blind — adding Claude or Gemini later is one new file, not a rewrite. Real OpenAI function-calling wired as a genuine multi-turn loop: the model calls a tool, the result feeds back into context, and it either calls another tool or answers in text, bounded by a hard turn ceiling with a graceful fallback. An age-aware onboarding flow infers whether you're likely under 18 from context before asking outright, with a real hard age gate at 16 enforced by a transactional account-and-memory deletion — never an orphaned row. Ships as a global npm package: one command, any machine, no server, no shared backend, no hosting bill.",
    stack: [
      "Node.js", "TypeScript", "better-sqlite3", "OpenAI API", "Inquirer.js",
      "Ora", "Figlet", "bcrypt", "Octokit",
    ],
    live: true,
    npm: true,
    liveUrl: "https://www.npmjs.com/package/@abdallahkh7/jarvis",
    repoUrl: "https://github.com/Abdallah-khatib-7/Jarvis",
    color: "linear-gradient(135deg, #6c5ce7, #a78bfa)",
  },
];

function githubOgImage(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

export const projects = rawProjects.map((p, i) => ({
  ...p,
  num: String(i + 1).padStart(2, "0"),
  badge: p.npm ? "LIVE ON NPM" : "LIVE",
  ctaLabel: p.npm ? "View on npm" : "Visit live",
  stackPreview: p.stack.slice(0, 4),
  moreCount: "+" + (p.stack.length - 4) + " more",
  previewImage: githubOgImage(p.repoUrl),
}));

const rawStack = [
  ["HTML5", "html5", "E34F26"],
  ["CSS", "css", "663399"],
  ["JavaScript", "javascript", "F7DF1E"],
  ["TypeScript", "typescript", "3178C6"],
  ["React", "react", "61DAFB"],
  ["Tailwind CSS", "tailwindcss", "06B6D4"],
  ["Framer Motion", "framer", "f5efe8"],
  ["Node.js", "nodedotjs", "5FA04E"],
  ["Express", "express", "f5efe8"],
  ["Socket.io", "socketdotio", "f5efe8"],
  ["JWT", "jsonwebtokens", "f5efe8"],
  ["MySQL", "mysql", "4479A1"],
  ["MongoDB", "mongodb", "47A248"],
  ["Redis", "redis", "FF4438"],
  ["SQLite", "sqlite", "4DB6E8"],
  ["Docker", "docker", "2496ED"],
  ["AWS", null, "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"],
  ["nginx", "nginx", "009639"],
  ["Cloudflare", "cloudflare", "F38020"],
  ["Vercel", "vercel", "f5efe8"],
  ["Stripe", "stripe", "635BFF"],
  ["OpenAI API", null, "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg", true],
  ["npm", "npm", "CB3837"],
  ["Git", "git", "F05032"],
  ["Java", null, "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
  ["C++", "cplusplus", "00599C"],
  ["Assembly", "GLYPH", ".asm"],
  ["Prolog", "GLYPH", "?-"],
  ["Data Structures & Algorithms", "GLYPH", "O(n)"],
];

export const stackItems = rawStack.map(([name, slug, colorOrUrl, invert]) => {
  const isGlyph = slug === "GLYPH";
  const icon = isGlyph ? null : slug ? `https://cdn.simpleicons.org/${slug}/${colorOrUrl}` : colorOrUrl;
  return { name, icon, glyph: isGlyph ? colorOrUrl : null, invert: Boolean(invert) };
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
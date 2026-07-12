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
    tagline:
      "Push a repo, get a live URL — a real deployment platform on real infrastructure.",
    description:
      "Built around the genuinely hard part: running untrusted code safely. A GitHub webhook triggers a build inside an isolated, disposable Docker container — hard CPU/memory/timeout limits, no network path to anything else, destroyed when done. Output goes to S3 and is served on a live subdomain within seconds via a Cloudflare Worker + KV edge router, with build logs streamed to the browser line by line over Socket.io. Deployed on EC2 + nginx + Certbot, RDS, and Cloudflare Pages.",
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "MySQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Dockerode",
      "Socket.io",
      "React",
      "Cloudflare Workers",
      "Cloudflare KV",
      "AWS EC2/S3/RDS",
      "nginx",
    ],
    live: true,
    liveUrl: "https://shipyard.shpit.uk",
    repoUrl: "https://github.com/Abdallah-khatib-7/Shipyard",
  },
  {
    name: "JARVIS",
    tagline:
      "A local agentic AI assistant that actually uses tools — not a chatbot with a CLI skin.",
    description:
      "A real agentic loop built from scratch: animated boot sequence, local SQLite identity and memory, selectable personality, and genuine multi-turn tool use — reading and editing files, searching the project and the web, working with GitHub — all through real function-calling against a provider-agnostic adapter layer. Ships as a global npm package: one command, any machine, no server.",
    stack: [
      "Node.js",
      "TypeScript",
      "SQLite",
      "OpenAI API",
      "Inquirer.js",
      "Ora",
      "Figlet",
    ],
    live: true,
    npm: true,
    liveUrl: "https://www.npmjs.com/package/@abdallahkh7/jarvis",
    repoUrl: "https://github.com/Abdallah-khatib-7/Jarvis",
  },
  {
    name: "Rakiz",
    tagline:
      "Bank-grade multi-currency wallet with double-entry bookkeeping and AI fraud review.",
    description:
      "Built the way a bank would build one: double-entry ledger with row-level locking, idempotent transfers, JWT refresh rotation with family-based revocation, AES-256 encryption at rest. Six currencies, instant transfers, three types of bill splitting, shareable payment links, Stripe subscriptions, and an admin panel where fraud flags get a real AI-generated explanation. Dockerized backend on EC2 behind nginx with SSL; frontend on Vercel.",
    stack: [
      "Node.js",
      "Express",
      "MySQL",
      "MongoDB",
      "Redis",
      "Socket.io",
      "React",
      "TypeScript",
      "Stripe",
      "OpenAI API",
      "AWS S3/EC2",
      "Docker",
      "nginx",
    ],
    live: true,
    liveUrl: "https://rakiz-mocha.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/rakiz",
  },
  {
    name: "AceIt",
    tagline:
      "Full-stack SaaS interview coach — CV analysis, AI mock interviews, real ATS scoring.",
    description:
      "The most complete interview prep platform — CV analysis with real ATS scoring, AI mock interviews that never repeat questions, skill quizzes, personalized roadmaps, and PDF reports. Complete subscription system, AWS S3 file storage, Docker deployment on EC2, HTTPS with nginx + Let's Encrypt.",
    stack: [
      "Node.js",
      "Express",
      "MySQL",
      "React",
      "OpenAI API",
      "AWS S3",
      "AWS EC2",
      "Docker",
      "Framer Motion",
    ],
    live: true,
    liveUrl: "https://ace-it-eight.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/AceIt",
  },
  {
    name: "Tawla",
    tagline: "Multi-tenant, real-time restaurant POS for Lebanese restaurants.",
    description:
      "A complete restaurant management platform serving multiple restaurants simultaneously with full data isolation. Every role covered — owner, waiter, kitchen, delivery operator. Real-time orders with Socket.io, AI-powered upsell suggestions, split billing, delivery management with driver tracking, and live analytics.",
    stack: [
      "Node.js",
      "Express",
      "MySQL",
      "React",
      "Socket.io",
      "OpenAI API",
      "Tailwind CSS",
      "Framer Motion",
    ],
    live: true,
    liveUrl: "https://tawla-ecru.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/restaurant-pos",
  },
  {
    name: "PharmaCare",
    tagline:
      "Pharmacy management built from 5+ years behind an actual pharmacy counter.",
    description:
      "A complete pharmacy management system built around the real daily workflow of a pharmacy — prescription management, inventory tracking, patient records, and AI-powered drug interaction checking.",
    stack: ["Node.js", "Express", "MySQL", "React", "OpenAI API"],
    live: true,
    liveUrl: "https://pharmacy-system-wine.vercel.app",
    repoUrl: "https://github.com/Abdallah-khatib-7/pharmacy-system",
  },
];

export const projects = rawProjects.map((p, i) => ({
  ...p,
  num: String(i + 1).padStart(2, "0"),
  badge: p.npm ? "LIVE ON NPM" : "LIVE",
  ctaLabel: p.npm ? "View on npm" : "Visit live",
  stackPreview: p.stack.slice(0, 4),
  moreCount: "+" + (p.stack.length - 4) + " more",
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
  [
    "AWS",
    null,
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  ],
  ["nginx", "nginx", "009639"],
  ["Cloudflare", "cloudflare", "F38020"],
  ["Vercel", "vercel", "f5efe8"],
  ["Stripe", "stripe", "635BFF"],
  [
    "OpenAI API",
    null,
    "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg",
    true,
  ],
  ["npm", "npm", "CB3837"],
  ["Git", "git", "F05032"],
  [
    "Java",
    null,
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  ],
  ["C++", "cplusplus", "00599C"],
  ["Assembly", "GLYPH", ".asm"],
  ["Prolog", "GLYPH", "?-"],
  ["Data Structures & Algorithms", "GLYPH", "O(n)"],
];

export const stackItems = rawStack.map(([name, slug, colorOrUrl, invert]) => {
  const isGlyph = slug === "GLYPH";
  const icon = isGlyph
    ? null
    : slug
    ? `https://cdn.simpleicons.org/${slug}/${colorOrUrl}`
    : colorOrUrl;
  return {
    name,
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

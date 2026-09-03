export const site = {
  name: "Jaden Seangmany",
  greeting: "Super nice to meet you! I'm Jaden.",
  role: "Software engineer",
  heroLines: [
    "I'm a software engineer!",
    "I'm super curious",
    "Going out to festivals and concerts are my 5-2",
    "Music is always playing in my head",
    "I strive to take full ownership",
    "Making software is fun",
  ],
  pronouns: "He/Him",
  photo: "/jaden.jpg",
  wordmark: "jaden",
  tld: ".lol",
  email: "jadenseangmany@gmail.com",
  phone: "858-282-8040",
  phoneHref: "tel:+18582828040",
  linkedin: "https://linkedin.com/in/jadenseangmany",
  github: "https://github.com/jadenseangmany",
  resumeHref: "/jaden-seangmany-resume.pdf",
} as const;

export type HeroGreeting = {
  id: string;
  lang: string;
  text: string;
};

export const heroGreetings: readonly HeroGreeting[] = [
  {
    id: "en",
    lang: "en",
    text: "Super nice to meet you! I'm Jaden.",
  },
  {
    id: "ja",
    lang: "ja",
    text: "会えて超嬉しいです！ジェイデンです。",
  },
  {
    id: "ko",
    lang: "ko",
    text: "만나서 너무 반가워요! 제이든이에요.",
  },
  {
    id: "zh",
    lang: "zh-Hans",
    text: "见到你真是太高兴了！我是杰登。",
  },
  {
    id: "sv",
    lang: "sv",
    text: "Jättekul att träffas! Jag heter Jaden.",
  },
  {
    id: "fi",
    lang: "fi",
    text: "Super kiva tavata! Olen Jaden.",
  },
  {
    id: "nb",
    lang: "nb",
    text: "Super hyggelig å møte deg! Jeg heter Jaden.",
  },
  {
    id: "de",
    lang: "de",
    text: "Super nett, dich kennenzulernen! Ich bin Jaden.",
  },
  {
    id: "gsw",
    lang: "gsw",
    text: "Super schön dich kennenzuelerne! Ich bi de Jaden.",
  },
  {
    id: "fr",
    lang: "fr",
    text: "Super content de te rencontrer ! Je m'appelle Jaden.",
  },
  {
    id: "it",
    lang: "it",
    text: "Super felice di conoscerti! Sono Jaden.",
  },
  {
    id: "is",
    lang: "is",
    text: "Super gaman að kynnast þér! Ég heiti Jaden.",
  },
  {
    id: "tl",
    lang: "tl",
    text: "Super saya makilala ka! Ako si Jaden.",
  },
  {
    id: "es",
    lang: "es",
    text: "¡Súper encantado de conocerte! Soy Jaden.",
  },
  {
    id: "mi",
    lang: "mi",
    text: "Tino koa ki te tūtaki i a koe! Ko Jaden tōku ingoa.",
  },
  {
    id: "haw",
    lang: "haw",
    text: "Hauʻoli nui e hui me ʻoe! ʻO Jaden koʻu inoa.",
  },
  {
    id: "ms",
    lang: "ms",
    text: "Super gembira jumpa awak! Saya Jaden.",
  },
  {
    id: "en-SG",
    lang: "en-SG",
    text: "Super nice to meet you lah! I'm Jaden.",
  },
  {
    id: "en-GB",
    lang: "en-GB",
    text: "Well nice to meet you, yeah? I'm Jaden.",
  },
  {
    id: "th",
    lang: "th",
    text: "ดีใจที่ได้รู้จักมาก ๆ ครับ ผมชื่อเจเดน",
  },
  {
    id: "en-AU",
    lang: "en-AU",
    text: "G'day! Super nice to meet ya. I'm Jaden.",
  },
];

function shuffle<T>(items: readonly T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = next[i]!;
    next[i] = next[j]!;
    next[j] = current;
  }
  return next;
}

export function createShuffleCycle<T>(
  items: readonly T[],
  first: T,
  same: (a: T, b: T) => boolean = Object.is,
) {
  const rest = items.filter((item) => !same(item, first));
  let deck: T[] = rest.length > 0 ? [first, ...shuffle(rest)] : [first];
  let index = 0;

  return {
    current(): T {
      return deck[index]!;
    },
    next(): T {
      const previous = deck[index]!;
      if (index + 1 < deck.length) {
        index += 1;
        return deck[index]!;
      }
      deck = shuffle([...items]);
      if (deck.length > 1 && same(deck[0]!, previous)) {
        const swapAt = deck.findIndex(
          (item, i) => i > 0 && !same(item, previous),
        );
        if (swapAt > 0) {
          const head = deck[0]!;
          deck[0] = deck[swapAt]!;
          deck[swapAt] = head;
        }
      }
      index = 0;
      return deck[0]!;
    },
  };
}

export function createGreetingCycle() {
  return createShuffleCycle(
    heroGreetings,
    heroGreetings[0]!,
    (a, b) => a.id === b.id,
  );
}

export function createHeroLineCycle() {
  return createShuffleCycle(site.heroLines, site.heroLines[0]!);
}

export const education = {
  school: "University of California, San Diego",
  degrees: [
    "M.S. Machine Learning & Data Science",
    "B.S. Computer Engineering",
    "B.S. Cognitive Science (w/ spec in Machine Learning & Neural Computation)",
  ],
  dates: "2023 – 2028",
} as const;

export type AwardItem = {
  id: string;
  title: string;
  amount?: string;
};

export const awards: readonly AwardItem[] = [
  { id: "provost", title: "Provost Honors" },
  { id: "padovani", title: "Padovani Scholarship", amount: "$20,000" },
  {
    id: "chancellor",
    title: "Chancellor's Study Abroad Scholarship",
    amount: "$5,000",
  },
  {
    id: "diamondhacks",
    title: "DiamondHacks Hackathon 2026 Winner",
    amount: "$1,000",
  },
];

export type PaperItem = {
  id: string;
  title: string;
  venue: string;
  year: string;
  href: string;
};

export const papers: readonly PaperItem[] = [
  {
    id: "metawepp",
    title:
      "metaWEPP: leveraging biobank-scale intra-species phylogenies for near-haplotype resolution in metagenomic analysis",
    venue: "NAR Genomics and Bioinformatics",
    year: "2026",
    href: "https://academic.oup.com/nargab/article/8/3/lqag080/8739580?login=false",
  },
];

export type Proof = {
  value: string;
  label: string;
};

export type CaseSection = {
  title: string;
  copy: string;
};

export type WorkItem = {
  id: string;
  company: string;
  location: string;
  role: string;
  dates: string;
  whisper: string;
  summary: string;
  accent: "meadow" | "sage" | "denim" | "pollen";
  proof: readonly Proof[];
  stack: readonly string[];
  sections: readonly CaseSection[];
};

export const work: readonly WorkItem[] = [
  {
    id: "capital-one",
    company: "Capital One",
    location: "Richmond, VA",
    role: "Software Engineering Intern",
    dates: "Jun 2026 – Aug 2026",
    whisper: "( intern )",
    summary: "Service agreement monitoring across 1B+ documents, $3.9M annually.",
    accent: "meadow",
    proof: [
      { value: "1B+", label: "documents" },
      { value: "$3.9M", label: "saved annually" },
      { value: "60X", label: "speedup" },
    ],
    stack: [
      "Apache Spark",
      "Databricks",
      "Jenkins",
      "AWS IAM",
      "Secrets Manager",
    ],
    sections: [
      {
        title: "Monitoring",
        copy: "Designed a service agreement monitoring system to detect risks, processing 1B+ documents, saving $3.9M annually.",
      },
      {
        title: "Query generation",
        copy: "Developed a query generation engine in Apache Spark, adding modularity and user friendly onboarding to new configs.",
      },
      {
        title: "Delivery",
        copy: "Built a CI/CD pipeline for Databricks using Jenkins and AWS IAM/Secrets Manager, streamlining job deployment.",
      },
      {
        title: "Scale",
        copy: "Scaled cluster infrastructure to handle mass data volume, optimized via Thread Pool Executor for a 60X speedup.",
      },
    ],
  },
  {
    id: "cubic",
    company: "Cubic Corporation",
    location: "San Diego, CA",
    role: "Software Engineering Intern",
    dates: "Jun 2025 – Dec 2025",
    whisper: "( intern )",
    summary: "C# GUI talking to FPGA registers for real-time waveform masking.",
    accent: "denim",
    proof: [
      { value: "Real-time", label: "waveform masking" },
      { value: "Months", label: "debugging time saved" },
    ],
    stack: ["C#", "Python", "VHDL", "Vivado", "ModelSim"],
    sections: [
      {
        title: "Interface",
        copy: "Led full-stack development of a C# GUI interfacing with FPGA registers for real-time waveform masking.",
      },
      {
        title: "Pipelines",
        copy: "Built Python automation pipelines to convert register maps into XML, saving months of cumulative debugging time.",
      },
      {
        title: "Hardware",
        copy: "Collaborated with hardware engineers using VHDL, Vivado, and ModelSim to validate RF systems.",
      },
    ],
  },
  {
    id: "cdc",
    company: "CDC: Centers for Disease Control and Prevention",
    location: "San Diego, CA",
    role: "Undergraduate Researcher, Turakhia Lab",
    dates: "Sep 2024 – Jan 2026",
    whisper: "( research )",
    summary: "metaWEPP. 16M+ reads, 99% classification accuracy.",
    accent: "sage",
    proof: [
      { value: "16M+", label: "reads" },
      { value: "99%", label: "accuracy" },
      { value: "2X", label: "speedup" },
    ],
    stack: ["Snakemake", "Python", "GitHub Actions", "Docker"],
    sections: [
      {
        title: "metaWEPP",
        copy: "Built metaWEPP, a Snakemake/Python metagenomics data workflow for discovering and analyzing novel viruses.",
      },
      {
        title: "Publication",
        copy: "Co-authored a paper accepted to ISMB 2026, and NAR Genomics, top bioinformatics conferences and journals.",
      },
      {
        title: "Classification",
        copy: "Tuned hyperparameters to add support for over 16 million reads and achieved 99% classification accuracy.",
      },
      {
        title: "Automation",
        copy: "Automated CI/CD with GitHub Actions, built Docker images, and parallelized workflows, achieving a 2X speedup.",
      },
    ],
  },
];

export const nonprofitWork: readonly WorkItem[] = [
  {
    id: "associated-students",
    company: "Associated Students",
    location: "La Jolla, CA",
    role: "Data Analyst",
    dates: "",
    whisper: "( nonprofit )",
    summary: "Data analyst at Associated Students.",
    accent: "sage",
    proof: [],
    stack: [],
    sections: [
      {
        title: "Role",
        copy: "Data analyst at Associated Students.",
      },
    ],
  },
  {
    id: "ucsd-health",
    company: "UC San Diego Health",
    location: "San Diego, CA",
    role: "Lead Developer",
    dates: "",
    whisper: "( nonprofit )",
    summary: "Lead developer at UC San Diego Health.",
    accent: "denim",
    proof: [],
    stack: [],
    sections: [
      {
        title: "Role",
        copy: "Lead developer at UC San Diego Health.",
      },
    ],
  },
  {
    id: "cogsci",
    company: "UCSD Cognitive Science Department",
    location: "La Jolla, CA",
    role: "Course Development Researcher",
    dates: "",
    whisper: "( nonprofit )",
    summary:
      "Course development researcher in the UCSD Cognitive Science Department.",
    accent: "pollen",
    proof: [],
    stack: [],
    sections: [
      {
        title: "Role",
        copy: "Course development researcher in the UCSD Cognitive Science Department.",
      },
    ],
  },
];

export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  subtitle: string;
  dates: string;
  whisper: string;
  summary: string;
  accent: "meadow" | "sage" | "denim" | "pollen" | "split";
  featured?: boolean;
  proof: readonly Proof[];
  stack: readonly string[];
  sections: readonly CaseSection[];
  links?: readonly ProjectLink[];
};

export const projects: readonly ProjectItem[] = [
  {
    id: "agentux",
    name: "AgentUX",
    subtitle: "1st Place, Wildcard Track @ DiamondHacks 2026",
    dates: "Apr 2026",
    whisper: "( project )",
    summary:
      "1st Place, Wildcard Track at DiamondHacks 2026. Agentic usability testing among 400+ competitors.",
    accent: "split",
    featured: true,
    proof: [
      { value: "1st Place", label: "Wildcard Track" },
      { value: "400+", label: "competitors" },
      { value: "10+", label: "parallel personas" },
      { value: "85%+", label: "known issues found" },
    ],
    stack: [
      "FastAPI",
      "Browser Use",
      "Gemini",
      "Playwright",
      "WebSocket",
      "Chrome Extension",
    ],
    links: [
      { href: "https://github.com/jadenseangmany/agentux", label: "GitHub" },
      { href: "https://www.agentux.dev/", label: "agentux.dev" },
    ],
    sections: [
      {
        title: "Outcome",
        copy: "1st Place, Wildcard Track at DiamondHacks 2026 (largest hackathon in San Diego) among 400+ competitors.",
      },
      {
        title: "Product",
        copy: "Platform that automates usability testing with user customizable agentic personas tailored to target audiences.",
      },
      {
        title: "Orchestration",
        copy: "Orchestrated 10+ parallel personas via Browser Use cloud agents, detecting 85%+ of known usability issues.",
      },
      {
        title: "Scores",
        copy: "Built a FastAPI + WebSocket pipeline, parsing agent trajectories into real-time confusion/hesitation scores.",
      },
      {
        title: "Fixes",
        copy: "Validated Gemini-generated CSS/JS fixes via Playwright screenshots, injected live via Chrome content scripts.",
      },
    ],
  },
  {
    id: "decidr",
    name: "Decidr",
    subtitle: "Soon on the App Store",
    dates: "",
    whisper: "( project )",
    summary:
      "Mobile app that picks a nearby restaurant using rating-count weighted scoring. Soon on the App Store.",
    accent: "meadow",
    proof: [{ value: "Soon", label: "App Store" }],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Express",
      "MongoDB",
      "Yelp API",
    ],
    links: [
      { href: "https://github.com/jadenseangmany/decidr", label: "GitHub" },
    ],
    sections: [
      {
        title: "Product",
        copy: "Decidr picks a nearby restaurant so a group does not have to argue about where to eat. If the first pick is wrong, reroll for another option.",
      },
      {
        title: "Scoring",
        copy: "A rating-count weighted algorithm scores nearby places so a 4.8 with three reviews does not beat a 4.5 with thousands of reviews.",
      },
      {
        title: "Stack",
        copy: "React Native and Expo on the client. Express, TypeScript, MongoDB, and the Yelp API on the server.",
      },
    ],
  },
  {
    id: "acm-ai-site",
    name: "ACM AI Site",
    subtitle: "7,000+ users, 1,000+ new users every year",
    dates: "",
    whisper: "( project )",
    summary:
      "Official website of ACM AI at UC San Diego. 7,000+ users, 1,000+ new users every year.",
    accent: "denim",
    proof: [
      { value: "7,000+", label: "users" },
      { value: "1,000+", label: "new users a year" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Ant Design",
      "React Router",
      "Express",
      "Chart.js",
      "Axios",
    ],
    links: [
      { href: "https://github.com/acmucsd/acm-ai-site", label: "GitHub" },
      { href: "https://ai.acmucsd.com", label: "ai.acmucsd.com" },
    ],
    sections: [
      {
        title: "Site",
        copy: "Official website of ACM AI at UC San Diego, an inclusive community of students interested in artificial intelligence.",
      },
      {
        title: "Reach",
        copy: "7,000+ users, with 1,000+ new users every year.",
      },
    ],
  },
  {
    id: "promptshield",
    name: "PromptShield",
    subtitle: "Published on the Chrome Web Store",
    dates: "",
    whisper: "( project )",
    summary:
      "Chrome extension that blocks sensitive data from being submitted to ChatGPT. Published on the Chrome Web Store.",
    accent: "sage",
    proof: [{ value: "Published", label: "Chrome Web Store" }],
    stack: ["JavaScript", "Chrome Extension", "Manifest V3"],
    links: [
      {
        href: "https://github.com/jadenseangmany/PromptShield",
        label: "GitHub",
      },
    ],
    sections: [
      {
        title: "Product",
        copy: "PromptShield scans ChatGPT messages and pastes in the browser and blocks credit cards, Social Security numbers, API keys, and other sensitive data before submit.",
      },
      {
        title: "Privacy",
        copy: "Detection runs locally. No analytics and no external requests.",
      },
    ],
  },
  {
    id: "diabeatit",
    name: "Diabeatit Lunchbox",
    subtitle: "Type 2 diabetes education game",
    dates: "",
    whisper: "( project )",
    summary:
      "Unity lunchbox mini-game that teaches children aged 8 to 13 how food choices relate to Type 2 diabetes prevention.",
    accent: "pollen",
    proof: [],
    stack: ["Unity", "C#", "WebGL"],
    links: [
      {
        href: "https://github.com/jadenseangmany/Diabeatit-Lunchbox-Minigame-SP25",
        label: "GitHub",
      },
      {
        href: "https://play.unity.com/en/games/65a3232a-14d8-4455-867d-29180369e56f/lunch-boxwebgl",
        label: "Play",
      },
    ],
    sections: [
      {
        title: "Client",
        copy: "Built with guidance from Dr. Charles Goldberg, a clinical professor at UC San Diego, as an educational tool for Type 2 diabetes prevention.",
      },
      {
        title: "Goal",
        copy: "A fun game for children aged 8 to 13 that simulates packing a nutritious lunch and teaching how nutrients and balance contribute to well-being.",
      },
      {
        title: "Lunchbox",
        copy: "Players learn food categories, nutrients, and health benefits, then build a balanced meal with real-time feedback that rewards thoughtful choices.",
      },
      {
        title: "Why",
        copy: "Unlike Type 1 diabetes, Type 2 is preventable. Diabeatit turns nutrition and activity into an age-appropriate game so children can meet the topic in places like a clinic waiting room.",
      },
    ],
  },
];

export const leadership: readonly WorkItem[] = [
  {
    id: "acm-ai",
    company: "ACM AI",
    location: "San Diego, CA",
    role: "President",
    dates: "May 2025 – Present",
    whisper: "( lead )",
    summary:
      "25+ board members, 30+ events, 10,000+ students every year.",
    accent: "meadow",
    proof: [
      { value: "25+", label: "board members" },
      { value: "30+", label: "events" },
      { value: "10,000+", label: "students a year" },
      { value: "200+", label: "national competitors" },
      { value: "$5,000+", label: "in prizes" },
    ],
    stack: [],
    sections: [
      {
        title: "Board",
        copy: "Led a team of 25+ board members to host 30+ events for over 10,000 students every year.",
      },
      {
        title: "Initiatives",
        copy: "Designed several initiatives (networking, workshops, socials) with an expected growth of AI community engagement by 3X.",
      },
      {
        title: "Competitions",
        copy: "Managed the AI competitions platform, hosting 200+ national competitors and awarding over $5,000 in prizes.",
      },
    ],
  },
  {
    id: "eces",
    company: "ECES",
    location: "La Jolla, CA",
    role: "Vice President",
    dates: "",
    whisper: "( lead )",
    summary: "Electrical & Computer Engineering Society at UC San Diego.",
    accent: "denim",
    proof: [],
    stack: [],
    sections: [
      {
        title: "Role",
        copy: "Vice President of ECES, the Electrical & Computer Engineering Society.",
      },
    ],
  },
  {
    id: "ucsd-ta",
    company: "CSE Department @ UCSD",
    location: "San Diego, CA",
    role: "Undergraduate Teaching Assistant",
    dates: "Sep 2025 – Dec 2025",
    whisper: "( teach )",
    summary: "250+ students. +15% project scores. Highest evaluations on record.",
    accent: "pollen",
    proof: [
      { value: "250+", label: "students" },
      { value: "+15%", label: "project scores" },
      { value: "Highest", label: "evaluations on record" },
    ],
    stack: ["TypeScript", "HTML/CSS", "Python"],
    sections: [
      {
        title: "Labs",
        copy: "Supported weekly labs for 250+ students on TypeScript and HTML/CSS, improving average project scores by 15%.",
      },
      {
        title: "Grading",
        copy: "Developed Python scripts to streamline grading and feedback, earning the highest course evaluations on record.",
      },
      {
        title: "Staff",
        copy: "Collaborated with instructional staff to iterate on lab design and align learning objectives across multiple sections.",
      },
    ],
  },
];

export type InvolvementItem = {
  id: string;
  company: string;
  role: string;
  summary: string;
  whisper: string;
  accent: "meadow" | "sage" | "denim" | "pollen";
};

export const leadershipPins: readonly InvolvementItem[] = [
  {
    id: "aws-campus-ambassador",
    company: "AWS",
    role: "Campus Ambassador",
    summary: "Campus Ambassador at AWS.",
    whisper: "( extra )",
    accent: "sage",
  },
];

export const otherInvolvement: readonly InvolvementItem[] = [
  {
    id: "next-gen-innovator",
    company: "Apple",
    role: "Next-Gen Innovator Program",
    summary: "Next-Gen Innovator Program at Apple.",
    whisper: "( extra )",
    accent: "pollen",
  },
  {
    id: "mastercard-mentorship",
    company: "Mastercard",
    role: "Mentorship Program",
    summary: "Mentorship program at Mastercard.",
    whisper: "( extra )",
    accent: "denim",
  },
  {
    id: "acm-projects-mentor",
    company: "ACM",
    role: "Projects Mentor",
    summary: "Projects Mentor at ACM.",
    whisper: "( extra )",
    accent: "meadow",
  },
];

export const skills = [
  {
    label: "Languages",
    items:
      "Golang, Java, Python, C#/.NET, SQL, JavaScript/TypeScript, C/C++, OpenCL, CUDA, Swift",
  },
  {
    label: "Web",
    items:
      "Flask/FastAPI, Node.js/Express.js, Next/React, JUnit/Jest, Expo/React Native, MongoDB, DynamoDB",
  },
  {
    label: "Tools",
    items:
      "Git, CI/CD (GitHub Actions), Docker, Kubernetes, Linux/Unix, AWS, Antigravity, Databricks",
  },
  {
    label: "Machine learning",
    items:
      "XGBoost, PyTorch, TensorFlow, Pandas, HuggingFace, GenAI, LLMs, NLTK",
  },
] as const;

export type FunItem = {
  id: string;
  href: string;
  title: string;
  kicker: string;
  summary: string;
  whisper: string;
  accent: "meadow" | "split";
};

export const fun: readonly FunItem[] = [
  {
    id: "listening",
    href: "/listening",
    title: "Spotify Stats",
    kicker: "Music",
    summary:
      "All of my listening data, some visualizations, and some other fun stats.",
    whisper: "( listening )",
    accent: "split",
  },
  {
    id: "matcha",
    href: "/matcha",
    title: "Matcha",
    kicker: "Blog",
    summary:
      "A rranked matcha blog of all the matcha I tried all over the world.",
    whisper: "( matcha )",
    accent: "meadow",
  },
];

export const nav = [
  { href: "/", hash: "#home", label: "Home", id: "nav-home" },
  { href: "/#work", hash: "#work", label: "Work", id: "nav-work" },
  {
    href: "/#projects",
    hash: "#projects",
    label: "Projects",
    id: "nav-projects",
  },
  { href: "/about", hash: null, label: "About", id: "nav-about" },
] as const;

export function roleMeta(item: Pick<WorkItem, "location" | "dates">) {
  if (item.location && item.dates) return `${item.location} · ${item.dates}`;
  return item.location || item.dates;
}

export function getWork(id: string) {
  return (
    work.find((item) => item.id === id) ??
    nonprofitWork.find((item) => item.id === id)
  );
}

export function getLeadership(id: string) {
  return leadership.find((item) => item.id === id);
}

export function getProject(id: string) {
  return projects.find((item) => item.id === id);
}

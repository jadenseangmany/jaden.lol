export const site = {
  name: "Jaden Seangmany",
  greeting: "Super nice to meet you! I'm Jaden.",
  role: "Software engineer",
  heroLines: [
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

const OTHER_GREETING = 20 / 18;

export type HeroGreeting = {
  id: string;
  lang: string;
  text: string;
  weight: number;
};

export const heroGreetings: readonly HeroGreeting[] = [
  {
    id: "en",
    lang: "en",
    text: "Super nice to meet you! I'm Jaden.",
    weight: 40,
  },
  {
    id: "ja",
    lang: "ja",
    text: "会えて超嬉しいです！ジェイデンです。",
    weight: 20,
  },
  {
    id: "ko",
    lang: "ko",
    text: "만나서 너무 반가워요! 제이든이에요.",
    weight: 20,
  },
  {
    id: "zh",
    lang: "zh-Hans",
    text: "见到你真是太高兴了！我是杰登。",
    weight: OTHER_GREETING,
  },
  {
    id: "sv",
    lang: "sv",
    text: "Jättekul att träffas! Jag heter Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "fi",
    lang: "fi",
    text: "Super kiva tavata! Olen Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "nb",
    lang: "nb",
    text: "Super hyggelig å møte deg! Jeg heter Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "de",
    lang: "de",
    text: "Super nett, dich kennenzulernen! Ich bin Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "gsw",
    lang: "gsw",
    text: "Super schön dich kennenzuelerne! Ich bi de Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "fr",
    lang: "fr",
    text: "Super content de te rencontrer ! Je m'appelle Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "it",
    lang: "it",
    text: "Super felice di conoscerti! Sono Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "is",
    lang: "is",
    text: "Super gaman að kynnast þér! Ég heiti Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "tl",
    lang: "tl",
    text: "Super saya makilala ka! Ako si Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "es",
    lang: "es",
    text: "¡Súper encantado de conocerte! Soy Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "mi",
    lang: "mi",
    text: "Tino koa ki te tūtaki i a koe! Ko Jaden tōku ingoa.",
    weight: OTHER_GREETING,
  },
  {
    id: "haw",
    lang: "haw",
    text: "Hauʻoli nui e hui me ʻoe! ʻO Jaden koʻu inoa.",
    weight: OTHER_GREETING,
  },
  {
    id: "ms",
    lang: "ms",
    text: "Super gembira jumpa awak! Saya Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "en-SG",
    lang: "en-SG",
    text: "Super nice to meet you lah! I'm Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "en-GB",
    lang: "en-GB",
    text: "Well nice to meet you, yeah? I'm Jaden.",
    weight: OTHER_GREETING,
  },
  {
    id: "th",
    lang: "th",
    text: "ดีใจที่ได้รู้จักมาก ๆ ครับ ผมชื่อเจเดน",
    weight: OTHER_GREETING,
  },
  {
    id: "en-AU",
    lang: "en-AU",
    text: "G'day! Super nice to meet ya. I'm Jaden.",
    weight: OTHER_GREETING,
  },
];

export function nextHeroGreeting(current: HeroGreeting): HeroGreeting {
  for (let i = 0; i < 8; i += 1) {
    const next = pickWeightedGreeting();
    if (next.id !== current.id) return next;
  }
  return pickWeightedGreeting();
}

function pickWeightedGreeting(): HeroGreeting {
  const total = heroGreetings.reduce((sum, item) => sum + item.weight, 0);
  let ticket = Math.random() * total;
  for (const item of heroGreetings) {
    ticket -= item.weight;
    if (ticket <= 0) return item;
  }
  return heroGreetings[0]!;
}

export function nextHeroLineIndex(current: number) {
  const length = site.heroLines.length;
  if (length < 2) return 0;
  let next = (Math.random() * (length - 1)) | 0;
  if (next >= current) next += 1;
  return next;
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

export type ProjectItem = {
  id: string;
  name: string;
  subtitle: string;
  dates: string;
  whisper: string;
  summary: string;
  accent: "split";
  featured: boolean;
  proof: readonly Proof[];
  stack: readonly string[];
  sections: readonly CaseSection[];
};

export const projects: readonly ProjectItem[] = [
  {
    id: "agentux",
    name: "AgentUX",
    subtitle: "Agentic UX Testing Platform",
    dates: "Apr 2026",
    whisper: "( project )",
    summary:
      "DiamondHacks 2026 winner. Agentic usability testing among 400+ competitors.",
    accent: "split",
    featured: true,
    proof: [
      { value: "Winner", label: "DiamondHacks 2026" },
      { value: "400+", label: "competitors" },
      { value: "10+", label: "parallel personas" },
      { value: "85%+", label: "known issues found" },
    ],
    stack: [
      "FastAPI",
      "Browser Use",
      "Anthropic API",
      "Playwright",
      "WebSocket",
      "Gemini",
    ],
    sections: [
      {
        title: "Outcome",
        copy: "Winner at DiamondHacks 2026 (largest hackathon in San Diego) among 400+ competitors.",
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
  title: string;
  kicker: string;
  summary: string;
  whisper: string;
  accent: "meadow" | "sage" | "denim" | "pollen";
};

export const involvement: readonly InvolvementItem[] = [
  {
    id: "next-gen-innovator",
    title: "Next-Gen Innovator Program",
    kicker: "Apple",
    summary: "Next-Gen Innovator Program at Apple.",
    whisper: "( extra )",
    accent: "pollen",
  },
  {
    id: "mastercard-mentorship",
    title: "Mastercard Mentorship Program",
    kicker: "Mastercard",
    summary: "Mentorship program at Mastercard.",
    whisper: "( extra )",
    accent: "denim",
  },
  {
    id: "aws-campus-ambassador",
    title: "AWS Campus Ambassador",
    kicker: "AWS",
    summary: "Campus Ambassador at AWS.",
    whisper: "( extra )",
    accent: "sage",
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

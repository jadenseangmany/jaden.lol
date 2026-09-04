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

export const bio = {
  intro:
    "Hey! Thanks for viewing my page! I love focusing on fun things in life, and to me, that means going to raves, building fun stuff, trying new eats, meeting new people, and hanging out with friends and family.",
  chat: "I love to chat about anything, so just send me a message in any of my contact information and I will likely respond immediately! And be sure to check out my ",
} as const;

export const personalFacts: readonly { label: string; value: string }[] = [
  {
    label: "Home",
    value: "San Diego, California but born in Texas",
  },
  {
    label: "Favorite food",
    value: "Melon bread",
  },
  {
    label: "Fun fact",
    value: "I have 8 cats in my house and I've been to 28 countries",
  },
  {
    label: "Hobbies",
    value:
      "Rock climbing, badminton, golfing, travelling, reading webtoons/manwha/manga & watching anime/movies, music/concerts/raves, geometry dash, cafes!!",
  },
];

export type Proof = {
  value: string;
  label: string;
};

export type CaseSection = {
  title: string;
  copy: string | readonly string[];
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
        title: "Problem",
        copy: [
          "Formal usability testing is slow and expensive. Recruitment, scripts, and lab time put it out of reach for small teams.",
          "That was concrete for us. We were designing a site for a sports nonprofit, sent surveys, and planned tests. Nobody responded. We tested on friends and roommates instead, and knew we were not hearing from real users.",
          "AgentUX exists so a team can run persona-based tests on any website from a Chrome side panel, in minutes, without a research budget.",
        ],
      },
      {
        title: "What we built",
        copy: [
          "I built AgentUX with Manjusri Gobiraj, Alice Lan, and Khang Nguyen at DiamondHacks 2026. We took 1st Place in the Wildcard Track among 400+ competitors.",
          "The product is a Manifest V3 side panel talking to a FastAPI backend. The backend runs a seven-step pipeline: summarize the page, generate tasks, assign them to personas, execute in parallel on Browser Use cloud agents, parse confusion from the traces, suggest CSS and JS fixes, then apply only what a human approves.",
          "Personas include first-time visitors, elderly users, and custom ones you write. Ten or more can run at once. Live logs stream over WebSocket, color-coded by persona, with embedded live browser sessions so you can watch them get stuck.",
        ],
      },
      {
        title: "How it works",
        copy: [
          "Gemini turns a page summary into tasks you can edit or delete before anything runs. Each persona then navigates on its own.",
          "The scoring engine reads agent output for hesitation, backtracks, retries, errors, frustration, and misclicks, then rolls those signals into a confusion heatmap and usability, accessibility, and clarity scores.",
          "Suggested fixes are screenshot-checked with Playwright before they show up in Results. Approved edits save per domain in Chrome storage and re-inject on reload. You can also copy a structured prompt of every issue into an IDE.",
        ],
      },
      {
        title: "Challenges",
        copy: [
          "Parallel cloud agents are useless if the panel goes dark. We had to keep REST, WebSockets, and the extension message relay in one progress model so setup, live feed, and results stayed one run.",
          "Agent traces are prose, not click events. Scoring had to extract element hints and signal types from language, then aggregate them across personas without pretending the log was a perfect instrumentation feed.",
          "LLM CSS and JS can look right and still break the page. Playwright before and after shots, plus human approval, were the only way we were willing to persist a fix.",
          "All of that had to ship in a 24-hour hackathon. We were still debugging while standing in line for food.",
        ],
      },
      {
        title: "Impact",
        copy: [
          "On known issues, the parallel personas found 85%+. Different personas failed in different places, which is the point of running them together instead of one scripted walkthrough.",
          "The intended users are small businesses, nonprofits, and students who cannot staff a research pipeline. The landing site is agentux.dev.",
        ],
      },
      {
        title: "What I learned",
        copy: [
          "A usability score is only as good as the signals you can actually extract. Keyword traces are a start. They are not a substitute for real session replay.",
          "Generated UI patches need a visual check and a person in the loop before they become durable. Shipping apply without approve would have been the wrong demo.",
          "The product idea was the constraint. If testing requires a lab, most teams will skip it. The architecture had to fit in a side panel.",
        ],
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
      "Google Maps",
    ],
    links: [
      { href: "https://github.com/jadenseangmany/decidr", label: "GitHub" },
    ],
    sections: [
      {
        title: "Problem",
        copy: [
          "Groups stall on where to eat. Someone names a 4.8 with three reviews. Someone else names a 4.5 with thousands. Nobody wants to pick wrong, so nobody picks.",
          "Decidr is meant to end that loop. Open the app, get one nearby restaurant, reroll if it is wrong.",
        ],
      },
      {
        title: "What I built",
        copy: [
          "I built Decidr with ACM Hack Project Team 3: Khang Nguyen, Tom Situ, Sarthak Kapoor, Christine Le, Hoang Lam, and Katelyn Li.",
          "The client is React Native and Expo in TypeScript. The server is Express talking to MongoDB, the Yelp Fusion API, and Google Maps for driving time. Users can filter by distance, cuisine, and price, then walk a ranked list instead of arguing over a map.",
          "It is headed to the App Store and Google Play.",
        ],
      },
      {
        title: "How it works",
        copy: [
          "The server pulls up to 50 nearby Yelp businesses, then sorts them with a review-count weighted rating. Each place is pulled toward the local average until it has enough reviews (we used 100 as the trust threshold), so a thin 4.8 does not beat a well-reviewed 4.5.",
          "Reroll is an index into that ranked list, wrapping around the bounds, so the next tap is the next strong option rather than a new random draw from the whole city.",
          "When we have the user's coordinates, we attach driving time from Google Maps so the pick is not only high-rated, it is actually reachable.",
        ],
      },
      {
        title: "Challenges",
        copy: [
          "Raw Yelp stars are a bad ranking. The hard part was encoding credibility without hiding new places forever. Shrinking toward the local mean was the compromise we could explain and ship.",
          "Location is messy on a phone. The API has to accept a named location or a lat/lng pair, convert miles to a Yelp radius cap, and still fail clearly when neither is present.",
          "Always returning the top row makes reroll feel broken. Ranking first, then stepping through the list, kept quality without repeating the same restaurant.",
        ],
      },
      {
        title: "Impact",
        copy: [
          "Decidr turns a group deadlock into one recommendation with an obvious next action. Filters for cuisine, price, and distance keep the pick inside constraints people actually have.",
          "The next step is the store listing. The GitHub repo is the current source of truth until that ships.",
        ],
      },
      {
        title: "What I learned",
        copy: [
          "A recommender for friends is a ranking problem, not a search UI. If the first result is statistically noisy, the whole app feels like a coin flip.",
          "Variety has to be designed. Random from the full set throws away the ranking. Indexing a sorted list keeps both.",
          "Client and server stay honest when the product is location plus a third-party API. The phone collects context. The server owns scoring, secrets, and driving time.",
        ],
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
        title: "Problem",
        copy: [
          "ACM AI is an inclusive community of students at UC San Diego interested in artificial intelligence. Workshops, competitions, socials, and projects only work if people can find them, join them, and come back next year.",
          "A Discord and a quarterly flyer do not scale to thousands of students. The org needed a public site that is also a membership surface.",
        ],
      },
      {
        title: "What I built",
        copy: [
          "ai.acmucsd.com is the official ACM AI site. I lead the org as president, and I treat this site as the product people actually touch: about, events, competitions, projects, and account login and registration.",
          "The frontend is React and TypeScript with Ant Design and React Router, talking to a separate API over Axios. Chart.js shows competition and community stats. Local development wires to an Express API and a MongoDB container.",
          "The repo is maintained by ACM AI's development team. New pages have to land as routes in App.tsx so the site stays one app as board members turn over.",
        ],
      },
      {
        title: "How it works",
        copy: [
          "Public pages cover the org, events, competitions, and projects. Auth pages handle login, registration, and password reset so members have a durable account instead of a one-off form.",
          "Workshop material lives in the ACM AI wiki, linked from the site, so talks from AI School (data preprocessing, computer vision, deep learning) stay reachable after the quarter ends.",
        ],
      },
      {
        title: "Challenges",
        copy: [
          "This is a long-lived Create React App codebase with rewired webpack, Less, and Ant Design. Shipping a feature means respecting an architecture that predates the current board.",
          "The site and the API are separate. Local setup needs a Mongo container and a director-gated backend, which is the right split for student credentials, yet it makes onboarding slower than a single repo.",
          "Student orgs rotate. If routing, content, and contribution rules are implicit, the site rots between presidents. Making the path to a new page obvious was part of keeping it alive.",
        ],
      },
      {
        title: "Impact",
        copy: [
          "The site serves 7,000+ users, with 1,000+ new users every year. That is the funnel into workshops, competitions, and projects for the org.",
          "As president I also run the board and events side (25+ board members, 30+ events, 10,000+ students a year). The site is how that scale stays legible to someone who has never heard of ACM AI.",
        ],
      },
      {
        title: "What I learned",
        copy: [
          "Org software is a maintenance problem. The useful work is often a route, a copy pass, or an API contract that the next developer can find.",
          "Reach is the metric that matters here, not novelty in the stack. 7,000+ accounts means broken auth or a missing events page is a community failure, not a side project bug.",
          "Leading the org and owning the site are the same job from the reader's side. They do not care which repo shipped the button. They care that the event exists and they can join.",
        ],
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
        title: "Problem",
        copy: [
          "People paste into ChatGPT the same way they paste into Notes. Credit cards, Social Security numbers, API keys, and passwords go out with one Enter.",
          "Once that text hits the model, you do not get it back. PromptShield is a last chance to stop the send.",
        ],
      },
      {
        title: "What I built",
        copy: [
          "PromptShield is a Manifest V3 Chrome extension I published on the Chrome Web Store. It injects into chat.openai.com and chatgpt.com, scans the prompt and pastes, and blocks submit when it finds sensitive data.",
          "Detection covers six categories: Luhn-validated credit cards, Social Security numbers with area/group/serial checks, phone numbers, emails, API keys (OpenAI, AWS, GitHub, Stripe, Slack, and similar prefixes), and plaintext passwords.",
          "A warning overlay names what was found. You can go back and edit, or redact and send. Categories toggle in the popup. A status badge on the page shows whether protection is on.",
        ],
      },
      {
        title: "How it works",
        copy: [
          "The detector is a local pattern engine. Cards have to pass Luhn. SSNs reject 000, 666, and 9xx area numbers, plus all-zero groups and serials. Keys match known prefixes rather than any long token.",
          "The content script intercepts Enter (without Shift) and send-button clicks in the capture phase, before ChatGPT handles them. Paste is scanned the same way. ChatGPT's input is a contenteditable prompt box, not a quiet textarea, so read and write have to speak both DOM shapes.",
          "Redaction replaces matches with labeled placeholders and re-submits. Nothing leaves the machine. There are no analytics, no tracking, and no network calls from the extension.",
        ],
      },
      {
        title: "Challenges",
        copy: [
          "ChatGPT's DOM moves. The script has to find #prompt-textarea, a contenteditable, or a textarea, and a send button by test id or aria-label. Tight selectors die. Loose selectors fire on the wrong control.",
          "Interception has to win the event race. Listening in capture, and using a processing flag so redact-and-send does not recurse, was the difference between a block and a no-op.",
          "False positives make people uninstall. Luhn and SSN structure rules exist so a long number is not treated like a card. The remaining tension is emails and phones, which are sensitive in some prompts and the whole point of others, which is why categories are toggleable.",
        ],
      },
      {
        title: "Impact",
        copy: [
          "The extension is published on the Chrome Web Store, so protection is an install rather than a developer-mode load.",
          "The privacy claim is the product. If PromptShield uploaded prompts to score them, it would be another place to leak. Local patterns are slower to evolve and safer to trust.",
        ],
      },
      {
        title: "What I learned",
        copy: [
          "A content script on a site you do not own is a contract with someone else's markup. Defensive queries and capture-phase listeners are the job, not polish.",
          "Security UX has to offer a path through the block. Redact and send keeps the workflow. A dead-end warning trains people to disable the tool.",
          "Zero data collection is a design constraint. It ruled out a server-side model and forced the detector to be boring, inspectable JavaScript.",
        ],
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
        title: "Problem",
        copy: [
          "Type 2 diabetes is preventable. Type 1 is not. Kids still meet the topic late, if at all, and the science is easy to flatten into eat this, not that.",
          "Dr. Charles Goldberg, a clinical professor at UC San Diego, asked for an educational tool that could live in places like a clinic waiting room: short, age-appropriate, and actually fun for children 8 to 13.",
        ],
      },
      {
        title: "What I built",
        copy: [
          "Diabeatit is a larger educational game with mini-games around meals, movement, and moderation. I worked on the Lunchbox mini-game, a Spring 2025 continuation of an earlier lunch-packing prototype, in Unity and C# with a WebGL build.",
          "The team split into Development, Design, and Operations. Development continued Lunchbox. Design prototyped Sugar Savers, a two-team insulin and glucose game on a body map, inspired by Among Us, that was not this repo's ship target.",
          "Lunchbox is playable on Unity Play as Lunch-BoxWebGL.",
        ],
      },
      {
        title: "How it works",
        copy: [
          "Players see food categories, nutrients, and what those nutrients do, then pack a lunch. The scoring cares about balance across groups, not a single hero food.",
          "Feedback is real-time. You can change the box and watch the score move, which is the lesson: thoughtful choices compound, and you get to revise.",
          "The waiting-room constraint shaped the loop. A session has to teach something before a name is called, which is why WebGL and a tight packing puzzle mattered more than a long campaign.",
        ],
      },
      {
        title: "Challenges",
        copy: [
          "Clinical accuracy and an 8-year-old audience fight each other. We had to talk about Type 2 prevention without fear, and without implying diabetes is a moral failure.",
          "A high score that only rewards restriction teaches the wrong habit. The design wants balance across food groups, with room to adjust after feedback rather than a fail state.",
          "Two workstreams in one quarter (Lunchbox in development, Sugar Savers in design) meant protecting the playable path. Lunchbox had to remain a complete mini-game even while the broader Diabeatit story was still being invented.",
        ],
      },
      {
        title: "Impact",
        copy: [
          "The game gives clinics and classrooms a way to put Type 2 prevention in a child's hands instead of a pamphlet. Packing a lunch is a concrete action they already understand.",
          "Guidance from Dr. Goldberg kept the content aligned with how this is actually taught, not how engineers guess it should be taught.",
        ],
      },
      {
        title: "What I learned",
        copy: [
          "Educational games fail when the mechanic and the lesson disagree. If the fun is speed and the lesson is balance, players learn speed.",
          "Client work with a clinician is a constraint on tone. Every sentence in the UI is part of the medical communication, not flavor text.",
          "Shipping a mini-game inside a larger vision means cutting. Lunchbox had to be complete on its own. Sugar Savers could stay a prototype without blocking the WebGL build.",
        ],
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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# jaden.lol

Personal portfolio for Jaden Seangmany. Next.js App Router, React, TypeScript, Tailwind.

The site has two visual states that must always coexist:

1. **Rest** — Vercel / Geist. Monochrome, grid, still, readable.
2. **Bloom** — Porter Robinson *Nurture*. Color, serif, grain, organic motion.

Duality (simple/complex, bland/elegant, static/animated) is ideology for how the system behaves. It is not page copy. Do not render those pairings.

Rest is the default. Bloom is earned. Never ship a page that is fully Nurture, and never ship a page that never blooms.

---

## Reader

Recruiters, hiring managers, and engineers. They need to know who Jaden is, what he has shipped, and whether to reach out — in under a minute, with the option to audit details.

**Strongest supported answer:** Jaden is a software engineer (UCSD, internships at Capital One and Cubic, CDC research, ACM AI president) who builds systems that are precise in structure and alive in the details.

If the reader saw only the first viewport, they should remember the name, the role, and that the surface can come alive. Work, leadership, and projects live immediately below. About is a separate page.

---

## Duality model

Treat rest and bloom as one system with two modes, not two themes the user toggles.

| | Rest (Vercel) | Bloom (Nurture) |
|---|---|---|
| When | Default, idle, reading | Hover, keyboard focus, or click/tap on an important unit |
| Mood | Precise, calm, technical | Electric, relaxing, organic |
| Color | Black, white, gray | Meadow greens, pollen yellow, petal white, denim |
| Type | Geist Sans + Geist Mono | Instrument Serif for the whole unit |
| Motion | Still | Soft growth, path-draw, grain, color wash |
| Surfaces | Flat canvas, hairline rules | Painterly field, paper grain, scribble overlays |

**Important units** (the only things that bloom): primary nav links, the hero identity block, each work card, each leadership and student-involvement card, each project card, Fun cards (listening, matcha), each matcha ranking card, matcha visit heroes, the about portrait and name, each award row, each paper, the contact/email action. Section titles may bloom when the field covers them. Work, leadership, project, Fun cards, and papers navigate on click instead of pinning. Student-involvement cards and award rows pin.

When a unit blooms, **every line inside it** can switch to Nurture type (title, role, body, dates, stack). Do not leave body copy in Geist while the heading serifs.

The bloom atmosphere is the **cursor itself**: a looking-up canopy sunburst at the pointer, not a trailing meadow orb. Letters under that cursor scramble, then decipher in place into Instrument Serif. Neighboring units the cursor covers can decode at the same time. Full bloom paints a procedural three.js canopy behind the page (worm’s-eye forest, Nurture scribbles) that travels as the reader scrolls.

Click/tap **pins** bloom on units that stay on the page (hero, about portrait and name, student-involvement cards, award rows, contact). Work, leadership, project, Fun cards, and papers navigate instead of pinning. Focus-visible must bloom; do not rely on hover alone.

A quiet **nurture** control in the masthead turns on the page-wide Nurture field. It is opt-in: a top-to-bottom scramble that settles into Instrument Serif and the canopy, then continues at a steady speed as the reader scrolls. It is not the default, and it is not a theme switcher. Hover bloom and the glow cursor stay on; there is no bloom on/off or size control.

**Do not** autoplay Nurture on load or on scroll. **Do not** leave hover bloom on after the pointer leaves unless it is pinned. Nurture only happens when the reader turns it on.

Respect `prefers-reduced-motion: reduce`: keep the color/type shift, drop path-draw, grain animation, and large layout motion.

---

## Design plan

### Composition

Landing page plus case routes. Shared 12-column outer grid (6 tablet, 4 mobile). Hairline column rules may exist in rest as a quiet Vercel cue; they should recede or dissolve in a bloomed unit.

1. **Masthead** — Overlay on the hero. Wordmark `jaden.lol` left. Resume, email, and `nurture` right. Primary nav lives in the hero pill, not here.
2. **Opening** — Full first viewport, centered. On `/`, the greeting scrambles between `Super nice to meet you! I'm Jaden.` and the same line in other languages. The line under it scrambles on the same beat, every 4 to 8 seconds. English is 40%, Japanese 20%, Korean 20%, and the rest share 20%. Then a glass capsule nav (Home, Work, Projects, About). The pill starts in the hero and **follows on scroll** (fixed to the top). Glow is white in rest and Nurture meadow/pollen on hover. Hovering the name turns the pointer into the canopy bloom.
3. **Work** — Hairline cards for Capital One, CDC, and Cubic. Rest is grayscale. Hover/focus colorizes the field and serifs the type. Click opens `/work/[id]`. A hairline **More** control labeled Non profit reveals Associated Students, UC San Diego Health, and UCSD Cognitive Science.
4. **Leadership + Student Involvement** — ACM AI President, ECES Vice President, CSE Department TA, Next-Gen Innovator Program, Mastercard Mentorship Program, and AWS Campus Ambassador. Leadership cards open `/leadership/[id]`. Involvement cards pin. Not in the pill.
5. **Projects** — Same card system. AgentUX is the featured card and opens `/projects/agentux`.
6. **Fun** — Two cards after projects: Listening (`/listening`) and Matcha (`/matcha`). Same card system. Not in the pill.
7. **About** — Not on the landing page. Pill **About** sweeps a meadow cover top to bottom, then `/about` (portrait top left, full name, He/Him, education, awards, papers, skills). Portrait is grayscale in rest and color on hover/focus/pin. Award rows pin. Papers open the journal link. Skills stay rest (lookup, not a moment). No coursework on the page.
8. **Case pages** — Proof first, then sections from `content.ts`. No invented metrics.
9. **Matcha ranking** — Hairline cards with a shop photo and rank. Click opens `/matcha/[id]`, a visit page for the blog and photos. Write copy in `src/lib/matcha.ts` (`body`). Cover photos live in `public/matcha/{id}.jpg`. Extra visit photos go in `public/matcha/{id}/`. Do not invent tasting notes.
10. **Close** — Email, GitHub, LinkedIn, phone as text links. Quiet footer. No Vercel triangle, no fake brand chrome.

Reject: centered generic hero, badge pills, nested cards-in-cards, icon tiles, gradient text, auto-playing typewriter, marquee, particle libraries, stock photos of the album, and a visible light/dark switcher. Dark rest is the product. One-level hairline case cards are allowed.

### Stack

- Next.js App Router, React Server Components by default.
- Client components only for bloom state, pointer/focus, and pinned interaction.
- Tailwind for layout and rest tokens. Bloom motion lives in CSS, SVG, canvas, and a procedural three.js canopy for full bloom (CSS cannot express the looking-up forest). Do not use the photograph as a background.
- `next/font`: Geist, Geist Mono, Instrument Serif.
- Content in `src/lib/content.ts` — resume facts live in one module, not scattered in JSX.
- No `vbg-*` Vercel report classes, no Vercel wordmark. This is Jaden’s site that *borrows judgment* from Vercel, not a Vercel-authored page.

### Build order

1. Tokens, fonts, grid, rest chrome.
2. Bloom primitive (`BloomUnit`) used by every interactive region.
3. Content module from the resume.
4. Opening, work cards, project cards, about page, case pages, close.
5. Motion, grain, scribbles, reduced-motion, keyboard, mobile pin.

---

## Styling guidelines

### Rest palette (default)

Monochrome. Color is not used in rest except as bloom’s absence.

| Token | Value | Use |
|---|---|---|
| `--rest-bg` | `#000000` | Page canvas |
| `--rest-bg-elevated` | `#0A0A0A` | Subtle elevation if spacing is not enough |
| `--rest-fg` | `#EDEDED` | Primary text |
| `--rest-fg-muted` | `#888888` | Meta, dates, locations |
| `--rest-fg-faint` | `#555555` | Rules, placeholders |
| `--rest-border` | `rgba(255,255,255,0.08)` | Hairlines |
| `--rest-border-strong` | `rgba(255,255,255,0.18)` | Hover chrome in rest (before bloom) |

### Bloom palette (Nurture)

Derived from *Nurture* live art and cover: saturated meadow, pollen, petal, denim, forest ink. Painterly, not flat brand green.

| Token | Value | Use |
|---|---|---|
| `--bloom-meadow` | `#3D9A55` | Primary wash |
| `--bloom-meadow-deep` | `#1E4A2C` | Shadow / lower field |
| `--bloom-lime` | `#8FBF4A` | Highlight grass |
| `--bloom-sage` | `#A8C984` | Soft fill |
| `--bloom-pollen` | `#FFDD57` | Scarce accent (never large fills) |
| `--bloom-petal` | `#F7F4EE` | Text on meadow |
| `--bloom-denim` | `#A2C2E1` | Cool anchor, links in bloom |
| `--bloom-lavender` | `#C5B8D4` | Optional clothing/shadow note |
| `--bloom-ink` | `#142018` | Text on light bloom |
| `--bloom-paper` | `#F3F0E8` | Light bloom variant (hero name, nav) |
| `--bloom-charcoal` | `#121212` | Dark sky edge inside a bloom |

A bloomed unit may use a **dark-sky / green-field** split (tour poster) or a **full meadow** (cover). Prefer meadow wash for rows; reserve the diagonal split for the hero or featured project so the move stays rare.

Grain: fine film-grain overlay, 4–8% opacity, only in bloom, masked so it follows the field not a rectangle.

Scribbles: 1px hairlines that can extend past the unit. Draw with `stroke-dashoffset`. No thick doodle brushes, no emoji, no `(oOo)` as body copy. A small circled tree mark is allowed once in a bloomed hero or footer.

Atmosphere: the bloom **is the cursor**. A canopy sunburst sits on the pointer with no follow-lag. It may cover neighboring text, but it must not fill the section. Full bloom is the exception: a procedural forest behind the page, with Nurture hairlines streaking through it.

### Typography

Match Geist roles. Do not invent extra sizes.

**Rest (Vercel)**

- Geist Sans for prose, headings, labels, nav, dates, locations, counts, and financial figures.
- Geist Mono only for short tokens: the wordmark `.lol`, skill lists, project stack identifiers. Not for dates, locations, or nav utilities.
- Roles: `heading-64` for the name; `heading-24` for section turns; `heading-20` / `heading-16` for role and company titles; `copy-16` for the lede; `copy-14` for body; `label-14` for nav; `label-13` for meta (with tabular numerals).
- Heading weight 600 (500 for subtle job titles). Body regular. Sentence case. No all-caps eyebrows.

**Bloom (Nurture)**

- Instrument Serif for **all** text inside the bloomed unit: title, role, lede, bullets, dates, stack.
- Titles: lowercase, letter-spacing `0.08em`–`0.18em`. Roles may go italic. Body stays sentence case with slightly looser tracking so it stays readable.
- Parentheses as Nurture language: `( work )` only as a whisper, never wrapping every heading.
- Do not mix more than these three families.

### Grid, space, surfaces

- 12 / 6 / 4 columns. Reading measure ~60–68 characters. Experience rows may span 12.
- Spacing on a 4px base. Within a group: 8–16px. Between groups: 24–32px. Section turns: 64–96px. Chapter-scale gap only between opening and work, and before the close.
- One gap owner per group. Children do not stack extra margins.
- Hierarchy from type, alignment, and space. Hairline borders to group a row, not cards-in-cards.
- Radius 0 or 6px max. Bloom does not grow rounded “pills.”
- Open space must frame the focal object. Do not leave an empty third column because the grid has twelve cells.

### Motion

Default is stillness. Bloom motion must feel like growth and weather, not UI chrome.

- Color wash: 400–700ms, `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out). Field may ease into a slight perspective tilt.
- Type family swap on the whole unit: ~500ms. Avoid layout shift; reserve title line-height for both faces.
- Scribble draw: 800–1400ms, staggered, only on enter.
- Grain may drift slowly; pause on reduced motion.
- No bounce, no parallax scroll, no marquee, no looping pulse on idle units.
- Pin/unpin should reverse cleanly. Do not leave orphaned dash offsets.

### Copy and content rules

- Facts only from `src/lib/content.ts` (sourced from the resume). Do not invent titles, metrics, employers, or dates.
- Voice: direct, technically literate, no hype, no “passionate about.” Personality comes from rest/bloom, not slogans.
- Avoid em dashes in UI copy (Vercel restraint). Use commas, periods, or “yet.”
- Numbers stay exact: `$3.9M`, `1B+`, `60X`, `99%`, `10,000`, `400+`.
- Links: email, LinkedIn, GitHub, resume. Do not add socials that are not in the resume.

### Accessibility

- Real headings, landmarks, skip link, visible focus.
- Bloom is not information: a user who never hovers must still get every fact.
- Contrast: rest is AA on black. Bloom text uses `--bloom-petal` on meadow or `--bloom-ink` on paper; never pollen-on-lime.
- Keyboard: Tab moves through bloomable units; focus blooms; Enter/Space pins.
- Touch targets ≥ 44px for pins and links.

### What not to do

- Do not implement the official Vercel report shell (`vbg-report`, wordmark, triangle).
- Do not use the supplied album screenshots as UI backgrounds (copyright, and they flatten the idea into a moodboard). Recreate the *language* of Nurture in CSS/SVG.
- Do not make bloom a site-wide theme toggle. Nurture is an explicit masthead control, never the default.
- Do not bloom every list item at once.
- Do not sacrifice scanability for atmosphere. If a bloomed row is harder to read than rest, the bloom failed.

---

## Resume content (source of truth)

Keep this in sync with `src/lib/content.ts`. If they drift, the TypeScript module wins for the site; update both.

**Identity**

- Jaden Seangmany
- Pronouns: He/Him
- Phone: 858-282-8040
- Email: jadenseangmany@gmail.com
- LinkedIn: https://linkedin.com/in/jadenseangmany
- GitHub: https://github.com/jadenseangmany

**Education** — UC San Diego. M.S. Machine Learning & Data Science, B.S. Computer Engineering, B.S. Cognitive Science (w/ spec in Machine Learning & Neural Computation). 2023 – 2028.

**Awards**

1. Provost Honors
2. Padovani Scholarship ($20,000)
3. Chancellor's Study Abroad Scholarship ($5,000)
4. DiamondHacks Hackathon 2026 Winner ($1,000)

**Papers** — Gangwar, Xu, Seangmany, et al. metaWEPP: leveraging biobank-scale intra-species phylogenies for near-haplotype resolution in metagenomic analysis. NAR Genomics and Bioinformatics, 2026. https://academic.oup.com/nargab/article/8/3/lqag080/8739580?login=false

**Experience** (newest first)

1. Capital One, Richmond, VA — Software Engineering Intern, June 2026 – August 2026. Service agreement monitoring (1B+ documents, $3.9M annually). Spark query generation engine. Databricks CI/CD (Jenkins, AWS IAM/Secrets Manager). Cluster scale, Thread Pool Executor, 60X speedup.
2. CDC / Turakhia Lab, San Diego, CA — Undergraduate Researcher, September 2024 – January 2026. metaWEPP (Snakemake/Python). Co-author ISMB 2026 and NAR Genomics. 16M+ reads, 99% classification accuracy. GHA, Docker, 2X speedup.
3. Cubic Corporation, San Diego, CA — Software Engineering Intern, June 2025 – December 2025. C# GUI + FPGA registers, waveform masking. Python register-map → XML pipelines. VHDL, Vivado, ModelSim with hardware engineers.

**Non profit** (titles only; no invented dates or metrics)

1. Associated Students — Data Analyst
2. UC San Diego Health — Lead Developer
3. UCSD Cognitive Science Department — Course Development Researcher

**Leadership + Student Involvement**

1. ACM AI President, May 2025 – Present. 25+ board, 30+ events, 10,000+ students/year. Competitions platform, 200+ national competitors, $5,000+ prizes.
2. ECES Vice President. ECES is the Electrical & Computer Engineering Society.
3. CSE Department @ UCSD — Undergraduate Teaching Assistant, September 2025 – December 2025. 250+ students, TypeScript and HTML/CSS, +15% project scores. Python grading scripts. Highest course evaluations on record.
4. Next-Gen Innovator Program (Apple)
5. Mastercard Mentorship Program
6. AWS Campus Ambassador

**Project** — AgentUX (April 2026). DiamondHacks 2026 winner, 400+ competitors. FastAPI, Browser Use, Anthropic API, Playwright. Agentic UX testing, 10+ parallel personas, 85%+ of known usability issues, WebSocket confusion/hesitation scores, Gemini + Playwright fix validation.

**Skills** — Languages: Golang, Java, Python, C#/.NET, SQL, JavaScript/TypeScript, C/C++, OpenCL, CUDA, Swift. Web: Flask/FastAPI, Node/Express, Next/React, JUnit/Jest, Expo/React Native, MongoDB, DynamoDB. Tools: Git, GHA, Docker, Kubernetes, Linux, AWS, Antigravity, Databricks. ML: XGBoost, PyTorch, TensorFlow, Pandas, HuggingFace, GenAI, LLMs, NLTK.

---

## File map

```
AGENTS.md                 ← this file
src/app/layout.tsx        fonts, metadata, chrome
src/app/page.tsx          landing composition
src/app/about/page.tsx
src/app/work/[slug]/page.tsx
src/app/leadership/[slug]/page.tsx
src/app/projects/[slug]/page.tsx
src/app/listening/page.tsx
src/app/matcha/page.tsx
src/app/matcha/[slug]/page.tsx
src/app/globals.css       tokens, grain, scribble, bloom keyframes
src/lib/content.ts        resume facts
src/lib/matcha.ts         matcha ranking and visit copy
src/lib/spotify.ts        live listening snapshot
src/lib/listening-history.ts
src/data/listening-history.json
public/listening-catalog.json
src/components/Listening.tsx
src/components/ListeningExplorer.tsx
src/components/listening-ui.tsx
scripts/spotify-token.mjs
scripts/spotify-history.py
src/components/Matcha.tsx
src/components/MatchaVisit.tsx
src/components/Fun.tsx
src/components/bloom/Bloom.tsx
src/components/bloom/FullBloom.tsx
src/components/bloom/CanopyBackground.tsx
src/components/bloom/canopy-scene.ts
src/components/bloom/BloomCursor.tsx
src/components/NurtureToggle.tsx
src/components/PillNav.tsx
src/components/Header.tsx
src/components/Hero.tsx
src/components/HeroGreeting.tsx
src/components/HeroRole.tsx
src/components/useScrambleCycle.ts
src/components/Work.tsx
src/components/WorkMore.tsx
src/components/Leadership.tsx
src/components/Projects.tsx
src/components/CaseCard.tsx
src/components/CaseStudy.tsx
src/components/About.tsx
src/components/Footer.tsx
src/components/SiteChrome.tsx
src/components/RouteCover.tsx
public/jaden.jpg
```

When changing visuals, update the tokens and BloomUnit first. When changing facts, update `content.ts` (and this section). Do not restyle one section into a one-off Nurture page.

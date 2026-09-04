<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# jaden.lol

Personal portfolio for Jaden Seangmany. Next.js App Router, React, TypeScript, Tailwind.

The site has two visual languages that coexist, plus an explicit simple rest:

1. **Rest** — Vercel / Geist. Monochrome, grid, still, readable.
2. **Bloom** — Porter Robinson *Nurture*. Color, serif, grain, organic motion.

Duality (simple/complex, bland/elegant, static/animated) is ideology for how the system behaves. It is not page copy. Do not render those pairings.

A masthead control cycles **hybrid**, **nurture**, and **simple**. Simple is the default. Never ship hybrid as fully Nurture, and never remove bloom from hybrid.

---

## Reader

Recruiters, hiring managers, and engineers. They need to know who Jaden is, what he has shipped, and whether to reach out — in under a minute, with the option to audit details.

**Strongest supported answer:** Jaden is a software engineer (UCSD, internships at Capital One and Cubic, CDC research, ACM AI president) who builds systems that are precise in structure and alive in the details.

If the reader saw only the first viewport, they should remember the name, the role, and that the surface can come alive. Work, leadership, and projects live immediately below. About is a separate page.

---

## Duality model

Treat rest and bloom as one system with two modes, not two themes, except for the masthead cycle.

**Hybrid** — Rest until hover, focus, or pin. Hover scrambles, then Instrument Serif. Canopy cursor. Work rows sweep a meadow wash.

**Nurture** — Opt-in page-wide field. Top-to-bottom scramble into Instrument Serif and the procedural canopy, then the canopy keeps pace with scroll.

**Simple** (default) — Vercel rest only. No scramble, no canopy cursor, no Instrument swap. Row hover is a light grey wash.

| | Rest (Vercel) | Bloom (Nurture) |
|---|---|---|
| When | Default in hybrid and all of simple | Hover, keyboard focus, or click/tap on an important unit in hybrid; all of nurture |
| Mood | Precise, calm, technical | Electric, relaxing, organic |
| Color | Black, white, gray | Meadow greens, pollen yellow, petal white, denim |
| Type | Geist Sans + Geist Mono | Instrument Serif for the whole unit |
| Motion | Still | Soft growth, path-draw, grain, color wash |
| Surfaces | Flat canvas, hairline rules | Painterly field, paper grain, scribble overlays |

**Important units** (the only things that bloom in hybrid): primary nav links, the hero identity block, each work row, each leadership row, each other-involvement row, each project row, Fun rows (listening, matcha), each matcha ranking card, matcha visit heroes, the about portrait and name, each paper, the contact/email action. Section titles may bloom when the field covers them. Work, leadership, project, Fun rows, and papers navigate on click instead of pinning. Other-involvement rows and the AWS campus ambassador row pin. Award rows stay rest.

When a unit blooms, **every line inside it** can switch to Nurture type (title, role, body, dates, stack). Do not leave body copy in Geist while the heading serifs.

The bloom atmosphere is the **cursor itself**: a looking-up canopy sunburst at the pointer, not a trailing meadow orb. Over a clickable unit it grows and pulses. Hovering a unit scrambles the whole unit together, then it settles into Instrument Serif. Work rows also sweep a meadow wash left to right. The hero identity does not fill with a green glow; Nurture hairlines draw outward from it. Full bloom paints a procedural three.js canopy behind the page (worm’s-eye forest, Nurture scribbles) that travels as the reader scrolls.

Click/tap **pins** bloom on units that stay on the page (hero, about portrait and name, other-involvement rows, AWS campus ambassador, contact). Work, leadership, project, Fun rows, and papers navigate instead of pinning. Focus-visible must bloom; do not rely on hover alone.

A quiet masthead control cycles `hybrid` / `nurture` / `simple`. Simple is the default. Nurture is the page-wide field. Hybrid blooms on hover. Simple is Vercel-still: no scramble, grey row hover, no canopy cursor. The control shows the current mode. A sun/moon control beside it toggles light and dark rest. Dark is the default. On a first visit, a green hairline arrow points at the mode word with “try clicking here!”

**Do not** autoplay Nurture on load or on scroll. **Do not** leave hover bloom on after the pointer leaves unless it is pinned. Nurture only happens when the reader turns it on. Simple is opt-in rest.

Respect `prefers-reduced-motion: reduce`: keep the color/type shift, drop path-draw, grain animation, and large layout motion.

---

## Design plan

### Composition

Landing page plus case routes. Shared 12-column outer grid (6 tablet, 4 mobile). Hairline column rules may exist in rest as a quiet Vercel cue; they should recede or dissolve in a bloomed unit.

1. **Masthead** — Overlay on the hero. Wordmark `jaden.lol` left. Resume, email, the mode control (`hybrid` / `nurture` / `simple`), and a sun/moon theme toggle right, with the same gap between all four. Primary nav lives in the hero pill, not here. First visit only: a green Nurture hairline arrow under the mode word says `try clicking here!`
2. **Opening** — Full first viewport, centered. On `/` in hybrid, the greeting starts as `Super nice to meet you! I'm Jaden.` and the line under it starts as `I'm a software engineer!`. They scramble together every 4 to 8 seconds. Each list is a shuffle without replacement: every greeting and every line appears once per cycle before the deck reshuffles, and the new cycle does not start on the line that just ended. Reload always returns to English plus `I'm a software engineer!`. Simple freezes that first pair with no scramble. Then a glass capsule nav (Home, Work, Projects, About). The pill starts in the hero and **follows on scroll** (fixed to the top). A rest glow sits behind the active section (scroll on `/`, route elsewhere). Hover and focus lighten the label only and do not move that glow. Hovering the name turns the pointer into the canopy bloom.
3. **Work** — Full-width hairline rows in the Vercel careers pattern, in this order: Capital One, Cubic, CDC. Company is the title, role is the muted line under it. Row copy has 24px inline padding (between-group). `( intern )` / `( research )` tags sit to the left of **Read more** and appear only in nurture, or in hybrid while the row is highlighted. No dates or summaries in the list. Click opens `/work/[id]`. Below the list, Geist **Show more** (not a job row) reveals Associated Students, UC San Diego Health, and UCSD Cognitive Science. The trigger disappears; the extra rows ease in. No Show Less.
4. **Leadership** — Same row system: ACM AI President, ECES Vice President, CSE Department TA, and AWS Campus Ambassador. Leadership rows open `/leadership/[id]` with Read more. AWS pins and has no pill. Not in the pill nav.
5. **Projects** — Same row system. Company-style title, muted subtitle, Geist Mono stack tags on the row. AgentUX, Decidr, ACM AI Site, PromptShield, and Diabeatit Lunchbox each open `/projects/[id]`.
6. **Other Involvement** — Below projects. Pin rows, company as the white title, program as the muted line: Apple / Next-Gen Innovator Program, Mastercard / Mentorship Program, ACM / Projects Mentor.
7. **Papers** — After other involvement on the landing page. Same hairline rows. Open the journal link with Read more. Not in the pill.
8. **Awards** — After papers. Hairline rows. Stay rest and do not bloom.
9. **Fun** — Last landing section. Two destination rows: Listening (`/listening`) and Matcha (`/matcha`). Same hairline row system as work. Not in the pill.
10. **About** — Not on the landing page. Pill **About** sweeps a meadow cover top to bottom, then `/about` (portrait top left, full name, He/Him, bio, personal facts, Countries, education, skills). Portrait is grayscale in rest and color on hover/focus/pin. Education uses the same hairline rows. Personal facts stay rest, same labeled rows as skills. Countries group by region with text links to `/travel/[id]`. Write visit copy in `src/lib/travel.ts` (`body`). Do not invent trip notes. Skills stay rest (lookup, not a moment). No papers or awards on About. No coursework on the page.
11. **Case pages** — Proof first, then sections from `content.ts`. Project cases are long-form from the READMEs and given briefs: problem, build, challenges, impact, learned. They also link out to GitHub and live URLs from `content.ts`. No invented metrics.
12. **Matcha ranking** — Hairline cards with a shop photo and a Top N label (Top 1, Top 2). Do not print “of N”. Click opens `/matcha/[id]`, a visit page for the blog and photos. Write copy in `src/lib/matcha.ts` (`body`). Cover photos live in `public/matcha/{id}.jpg`. Extra visit photos go in `public/matcha/{id}/`. Do not invent tasting notes. Current top four: 12matcha, rōk, Chagee, Molly Tea.
13. **Close** — Email, GitHub, LinkedIn, phone as text links. Quiet footer. No Vercel triangle, no fake brand chrome.

Reject: centered generic hero, badge pills, nested cards-in-cards, icon tiles, gradient text, auto-playing typewriter, marquee, particle libraries, and stock photos of the album. Dark rest is the default product. A masthead sun/moon toggles light rest. One-level hairline case cards are allowed.

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
- Roles: `heading-64` for the name; `heading-40` for section turns; `heading-20` / `heading-16` for role and company titles; `copy-16` for the lede; `copy-14` for body; `label-14` for nav; `label-13` for meta (with tabular numerals).
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
- Do not default to nurture or hybrid. Simple is the default. The masthead cycles hybrid / nurture / simple.
- Do not bloom every list item at once.
- Do not sacrifice scanability for atmosphere. If a bloomed row is harder to read than rest, the bloom failed.
- Do not overlay `( intern )` style whispers on neighboring rows. Keep tags in the row, next to Read more, visible only in nurture or while the row is highlighted in hybrid.
- Do not change the Read more pill’s size or typeface on hover.
- Do not fill the hero identity with a green glow. Use Nurture hairline streaks that draw outward.
- Do not bloom award rows.

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
- Home: San Diego, California, born in Texas
- Favorite food: Melon bread
- Fun fact: 8 cats, 29 countries
- Hobbies: Rock climbing, badminton, golfing, travelling, webtoons/manwha/manga, anime/movies, music/concerts/raves, Geometry Dash, cafes

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

**Leadership**

1. ACM AI President, May 2025 – Present. 25+ board, 30+ events, 10,000+ students/year. Competitions platform, 200+ national competitors, $5,000+ prizes.
2. ECES Vice President. ECES is the Electrical & Computer Engineering Society.
3. CSE Department @ UCSD — Undergraduate Teaching Assistant, September 2025 – December 2025. 250+ students, TypeScript and HTML/CSS, +15% project scores. Python grading scripts. Highest course evaluations on record.
4. AWS Campus Ambassador

**Other Involvement**

1. Apple — Next-Gen Innovator Program
2. Mastercard — Mentorship Program
3. ACM — Projects Mentor

**Projects**

1. AgentUX (April 2026). 1st Place, Wildcard Track @ DiamondHacks 2026, 400+ competitors. GitHub: https://github.com/jadenseangmany/agentux. Live: https://www.agentux.dev/. FastAPI, Browser Use, Gemini, Playwright, WebSocket, Chrome Extension. Agentic UX testing, 10+ parallel personas, 85%+ of known usability issues.
2. Decidr. Soon on the App Store. GitHub: https://github.com/jadenseangmany/decidr. React Native, Expo, TypeScript, Express, MongoDB, Yelp API, Google Maps. Location-based restaurant picker with rating-count weighted scoring.
3. ACM AI Site. 7,000+ users, 1,000+ new users every year. GitHub: https://github.com/acmucsd/acm-ai-site. Live: https://ai.acmucsd.com. React, TypeScript, Ant Design, React Router, Express, Chart.js.
4. PromptShield. Published on the Chrome Web Store. GitHub: https://github.com/jadenseangmany/PromptShield. JavaScript, Chrome Extension, Manifest V3. Blocks sensitive data from ChatGPT locally.
5. Diabeatit Lunchbox. GitHub: https://github.com/jadenseangmany/Diabeatit-Lunchbox-Minigame-SP25. Play: https://play.unity.com/en/games/65a3232a-14d8-4455-867d-29180369e56f/lunch-boxwebgl. Unity, C#, WebGL. Educational lunch-packing game for children 8–13 on Type 2 diabetes prevention, with guidance from Dr. Charles Goldberg at UC San Diego.

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
src/app/travel/[slug]/page.tsx
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
src/components/Papers.tsx
src/components/Awards.tsx
src/components/Countries.tsx
src/components/TravelNote.tsx
src/lib/travel.ts
src/components/bloom/Bloom.tsx
src/components/bloom/FullBloom.tsx
src/components/bloom/CanopyBackground.tsx
src/components/bloom/canopy-scene.ts
src/components/bloom/BloomCursor.tsx
src/components/bloom/HeroStreaks.tsx
src/components/NurtureToggle.tsx
src/components/ThemeToggle.tsx
src/components/ModeHint.tsx
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
src/components/Involvement.tsx
src/components/CaseCard.tsx
src/components/CaseStudy.tsx
src/components/About.tsx
src/components/Footer.tsx
src/components/SiteChrome.tsx
src/components/RouteCover.tsx
public/jaden.jpg
```

When changing visuals, update the tokens and BloomUnit first. When changing facts, update `content.ts` (and this section). Do not restyle one section into a one-off Nurture page.

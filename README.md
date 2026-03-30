# Shehabul Islam Sawraz — Portfolio

Personal portfolio site built with vanilla HTML, CSS & JavaScript. No frameworks — runs as a static GitHub Pages site.

**Live:** [sawraz-is.github.io](https://sawraz-is.github.io)

---

## File Structure

```
index.html              Main markup (all sections)
palette-config.js       Default palette config (edit via CLI)
set-palette.sh          CLI to permanently change default palette
css/
  base.css              CSS variables, reset, typography, buttons
  components.css        Navbar, footer, modal, cursor, loader, terminal, palette
  sections.css          All section-specific styles
  palettes.css          9 switchable color palettes (light + dark)
  responsive.css        Breakpoints: 480px, 768px, 1024px
js/
  loader.js             Terminal-style boot sequence (once per session)
  cursor.js             Custom dot + ring cursor with lerp trail
  theme.js              Light/dark toggle + palette system
  nav.js                Scroll shadow, progress bar, mobile drawer
  animations.js         Intersection Observer fade-up + counter animation
  typewriter.js          Cycling roles in hero section
  tilt.js               3D perspective tilt on project cards (VanillaTilt)
  magnetic.js           Magnetic pull on hero CTA buttons
  palette.js            Command palette (Ctrl+K / Cmd+K)
  scramble.js           Text decode effect on section titles
  modal.js              Project detail modal on card click
  contact.js            Formspree form submission
  terminal.js           Hidden terminal easter egg (20+ commands)
  confetti.js           "hire" easter egg confetti burst
```

---

## Color Palettes

9 palettes available, switchable at runtime or permanently for deployment.

| ID | Name | Light | Dark |
|---|---|---|---|
| `ash-crimson` | Ash & Crimson | Typeset | Ink on void |
| `steel-blue` | Steel Blue | Blueprint | Deep focus |
| `amber-gold` | Amber Gold | Clean workshop | Night lab |
| `calibrated-paper` | Calibrated Paper | Calibrated paper | Deep substrate |
| `graphite-sage` | Graphite & Sage | Lab bench | Scope trace |
| `carbon-teal` | Carbon & Teal | Whiteboard | Logic analyzer |
| `parchment-ochre` | Parchment & Ochre | Ruled notebook | Amber lamp |
| `midnight-phosphor` | Midnight Phosphor | Clean forest | Retro green terminal |
| `obsidian-copper` | Obsidian & Copper | Warm stone | Oxidized metal |

### Switching palettes (visitors — temporary)

Visitors can switch via:
- **Ctrl+K / Cmd+K** (command palette) → type "palette" → pick one
- **Backtick** (terminal) → `palette list` / `palette set carbon-teal`

Their choice is saved in `localStorage` and persists across visits.

### Changing the default palette (owner — permanent)

```bash
# List all palettes with current default
./set-palette.sh list

# Set a new default
./set-palette.sh steel-blue

# Reset to Ash & Crimson
./set-palette.sh reset

# Deploy the change
git add palette-config.js
git commit -m "chore: set default palette to steel-blue"
git push
```

**Priority order:** visitor's localStorage > `palette-config.js` > hardcoded fallback (ash-crimson)

---

## Easter Eggs & Hidden Features

| Trigger | What happens |
|---|---|
| Type **`hire`** anywhere | Confetti burst animation |
| Press **`` ` ``** (backtick) | Opens a hidden terminal with 20+ commands |
| Press **Ctrl+K** / **Cmd+K** | VS Code-style command palette |
| **View page source** | ASCII art greeting for curious developers |

### Terminal Commands

```
Navigation:  whoami, ls projects, cat <project>, cat research, skills, experience, education
Actions:     open github, open linkedin, ssh hire, theme, contact
Palette:     palette, palette list, palette set <id>, palette reset
Fun:         neofetch, fortune, date, echo <text>, history, pwd, sudo hire
System:      clear, exit
```

---

## Sections

1. **Navbar** — Glassmorphism, hamburger mobile drawer, theme toggle
2. **Hero** — Typewriter roles, floating dots, magnetic CTA buttons, shortcut hints
3. **About** — Avatar + bio + PhD chip + 4 animated stat cards
4. **Education** — BUET + Dhaka College cards
5. **Skills** — 6 categories with staggered pop-in pill animations
6. **Experience** — Vertical timeline with Iron Software (L1 → L2 promotion), OpenRefactory, Limbics AI
7. **Projects** — 11 cards with 3D tilt, click-to-open detail modal
8. **Research** — IEEE publication + undergraduate thesis
9. **Achievements** — Affiliations + awards grid
10. **Contact** — Direct links + Formspree contact form
11. **Footer** — Social links + back-to-top

---

## Setup

1. Clone the repo
2. Replace `YOUR_FORM_ID` in the contact form (`index.html`) with your [Formspree](https://formspree.io) endpoint
3. Push to `main` branch — GitHub Pages serves `index.html` automatically

### Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Plus Jakarta Sans, Space Grotesk
- Font Awesome 6 (CDN)
- VanillaTilt.js (CDN)
- No build step, no bundler, no framework

---

## Dynamic Features

- Light/dark mode with system preference detection + localStorage persistence
- 3px scroll progress bar
- Intersection Observer for fade-up, skill pop-in, stat counters, text scramble
- Custom cursor with lerp ring trail (desktop only)
- Magnetic buttons on hero CTAs
- 3D tilt + specular glare on project cards
- Terminal boot sequence loader (once per session, skippable)
- Section title decode/scramble animation
- Subtle noise grain overlay

---

Built by Shehabul Islam Sawraz

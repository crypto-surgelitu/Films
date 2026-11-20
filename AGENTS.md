# STYLE REFERENCE: Crayon Capital (YouTube Channel ID: UCP9RPj_BG0vit2TNM7LuRxA)

## What We Copy (Style Only)
- Flat 2D vector illustration aesthetic
- Thick black outlines (3-4px) on all characters and props
- Simple character design: round head, dot eyes, line mouth, no neck
- Side-view perspective (2D platformer style)
- Limited color palette per scene (max 5 colors + black/white)
- Smooth frame-by-frame animation (30fps, no slideshow)
- Bold text overlays in thumbnails (white text, black outline)
- Character expressions through eyebrow angle and mouth curve only

## What We DON'T Copy
- Their finance/business content (we do tech/survival fiction)
- Their specific character design (we have AnalogAndy with vest/headphones)
- Their color palette (we use dark backgrounds + cyan accent)
- Their thumbnail composition (we adapt for survival theme)

## Animation Quality Standards
- NO AI slop: No gradients on characters, no 3D effects, no realistic textures
- NO jittery movement: Every frame must be intentional
- NO generic stock assets: Everything is custom SVG or code-drawn
- Premium feel: Smooth easing, proper squash/stretch, cinematic timing

## Thumbnail Style (Crayon Capital Adapted)
- Character on left side, reacting to scene
- Bold white text with black outline (Impact or similar)
- Dark background with one bright accent element
- 1920x1080, high contrast, readable at small sizes

---

# AGENTS.md - AnalogAndy Project Rules

## 1. Project Identity
- **Name:** AnalogAndy
- **Niche:** Tech/Survival Fiction (Serialized).
- **Vibe:** Clinical, calm, second-person narration ("You").
- **Reference:** "Crayon Capital" meets "Beanie Survives".

## 2. Visual Style (CRITICAL - NO AI SLOP)
- **Aesthetic:** Premium Flat 2D Vector.
- **Outlines:** Thick, bold black strokes (3px - 4px).
- **Colors:** Limited palette. Slate Grey, Electric Blue, White, Brown (Vest). NO gradients. NO realistic textures. NO 3D.
- **Character (Andy):** Round white head, brown tactical vest, grey headphones around neck, red tie.
- **Asset Rule:** The character art is a pre-made SVG at `app/public/analog-andy.svg`. NEVER attempt to redraw the character using SVG paths. ONLY import and transform the existing SVG.

## 3. Animation Physics
- **Motion:** Snappy, intentional, and smooth.
- **Easing:** Use `spring` for entrances (bouncy, premium feel) and `bezier` for movement.
- **Forbidden:** No jittery movement. No random floating. Every movement must have a purpose (e.g., pointing, walking, reacting).
- **Technique:** Use Remotion's `interpolate()` and `useCurrentFrame()` for all motion.

## 4. Coding Constraints
- **Language:** TypeScript / React (Remotion v4+).
- **Structure:** Modular components. One file per scene element.
- **Context:** ALWAYS read `app/.agents/skills/remotion-best-practices` before writing animation code.
- **Anti-Hallucination:** If you do not know a Remotion API, STOP and ask. Do not invent props.

## 5. Workflow
1. Read `AGENTS.md` before every task.
2. Check `app/src/` for existing components before creating new ones.
3. Output clean, commented code.

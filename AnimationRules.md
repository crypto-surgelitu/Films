# CLAUDE.md - AnalogAndy Animation Rules

## FORMAT
- Resolution: 1920x1080, 30fps
- Duration: 2-3 minutes per episode
- Aspect: Cinematic bars (thin black bars top/bottom)
- Audio: No voiceover in animation layer (voiceover added in post)
- Method: Everything drawn in code via Remotion. No AI video generation. No stock footage.

## VISUAL STYLE (Crayon Capital Reference)
- Backgrounds: Very dark (#1A1A1A to #2D2D2D) with thin grey floor line (#4A4A4A, 2px)
- Perspective: Side-on view, like a 2D platformer game
- Lighting: Diegetic only. Light sources are objects in scene (lamp, phone screen, street light, moon, spotlight). Big soft glows using radial gradients.
- Props: Simple flat shapes with thin wobbly grey outlines (#696969, 2px). No realistic textures.

## CHARACTER DESIGN (AnalogAndy)
- Head: Large round circle, white fill (#F5F0E1), thick black outline (#1A1A1A, 4px)
- Face: Two dot eyes (black, 6px), one line per eyebrow (black, 3px), one curved line for mouth (black, 3px). Emotion comes from eyebrow angle.
- Body: No visible neck. Head sits directly on torso.
- Torso: Brown tactical vest (#8B4513) over white shirt (#FFFFFF). Red tie (#C0392B) hanging loose.
- Limbs: Long noodle arms/legs, black stroke (3px), no fingers/hands detail.
- Signature: Grey headphones (#696969) around neck, antenna spikes on left ear cup.
- Pose library: standing, walking, prying, sitting, pointing (right index finger up).

## THE SHADOW (Audience-Proxy Skeptic)
- Same body shape as Andy but pure black (#000000), 20% taller.
- Glowing outline in accent color (#00D4FF cyan, 3px with blur) and two slit eyes.
- Role: He asks the naive, obvious, or skeptical question the viewer is thinking ('But why would anyone pay for that?', 'Wait, isn't that illegal?'). Andy then answers him simply.

## TEXT & TYPOGRAPHY
- Font: Comic Neue (import via Google Fonts in index.html)
- Narrator text: Small (24px), white (#FFFFFF), top-center, max 8 words, fade in/out over 2 seconds
- Shadow text: Accent color (#00D4FF), appears beside shadow character, typewriter effect

## GAME FEEL ELEMENTS
- Rep counter: Pops on screen when Andy repeats an action (e.g., "Attempt #3")
- Inventory: After Day 1, Andy keeps one visible item (tool, bottle, etc.) for rest of film
- Impact effects: Big hits get speed lines (white streaks) and screen flash (white overlay, 2 frames)
- Running scenes: City/background scrolls past behind Andy (parallax effect)

## ANIMATION RULES
- Motion: Smooth on every frame. NEVER a slideshow of static images.
- Easing: Use `spring` for entrances (bouncy), `bezier` for movement.
- Technique: Squash and stretch on impacts. Anticipation before big movements.
- Camera: Locked position mostly. Slow push-ins (scale 1.0 to 1.1 over 60 frames) on emotional moments. Hard cuts to close-ups of objects.
- Timing: Calm shots hold 4-8 seconds. Montage shots ~1 second each.

## TITLE CARD (Last 12 seconds)
- Film's one-word title types on letter-by-letter in big white letters (72px, bold)
- Wavy underline in accent color (#00D4FF) draws beneath
- Then: one white line (subtitle), one short accent color line (tagline)
- Fade to black over 2 seconds

## TECHNICAL CONSTRAINTS
- All animations use Remotion's `useCurrentFrame()` and `interpolate()`
- Import character SVG from `app/public/analog-andy.svg` - never redraw in code
- Backgrounds are static SVG plates imported from `app/public/bg-[scene].svg`
- Use `@remotion/spring` for all spring animations
- Use `@remotion/transitions` for scene transitions

## EXPLAINER FORMAT (Crayon Capital model)

* Each video answers ONE specific tech question (software, hardware, or tech-history).
* Structure = 5 beats: (1) Loaded hook question/absurd contrast, (2) Host (Andy) reacts visually, (3) Shadow asks the naive viewer question, Andy answers simply, (4) Diagram-driven breakdown (one flat-2D visual per concept), (5) The "why it matters" takeaway.
* Tone: Calm, curious, second-person ("you"), "explained like you're 5" simplification. No drama, no disaster.
* Replace the DAY counter with a SECTION/CHAPTER marker (top-left, "Part X of Y" or "Concept 1/3").
* Title-card block stays (last 12s, one-word topic types in, wavy underline) but the word is the TOPIC (e.g., "GPS", "SERVERS"), not a disaster.

## THUMBNAIL RULES

* Andy's face reacting big on the left + one glowing object of curiosity on the right + 3–5 word bold white title with black outline + dark bg + single bright accent. Readable at 120px.

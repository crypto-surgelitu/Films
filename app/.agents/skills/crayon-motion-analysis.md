# Crayon Motion Analysis — AnalogAndy Style Rules

Derived from `pro-animation-techniques.md` spring physics and camera patterns,
adapted for the flat-2D "Crayon Capital" aesthetic defined in `CLAUDE.md` and `AGENTS.md`.

---

## 1. Text Fade Pattern

All on-screen text (narrator captions, day counter, rep counter) fades in
over **20–30 frames**. Text must **never** appear instantly.

```tsx
const opacity = interpolate(frame, [startFrame, startFrame + 25], [0, 1], {
  extrapolateRight: "clamp",
});
```

- Narrator text (top-center, 24px white): 25-frame fade, hold for duration, 25-frame fade out.
- Shadow text (#00D4FF cyan): typewriter reveal, then 20-frame opacity fade on each character.
- Day counter ("DAY X"): 20-frame fade at episode start, stays persistent.

---

## 2. Character Idle Animation

When AnalogAndy is standing still, apply a subtle **2px vertical bob** on a
**60-frame loop** using spring physics from the pro file.

```tsx
// Looping bob using spring damping from pro-animation-techniques §2.3
const loopFrame = frame % 60;
const bob = spring({
  fps,
  frame: loopFrame,
  config: {
    damping: 200,
  },
});
const translateY = interpolate(bob, [0, 1], [0, -2]); // 2px upward bob
```

- The bob is **always** applied when Andy is in a standing or sitting pose.
- Walking and prying poses override the bob with their own motion curves.
- The bob must feel organic — never mechanical or jittery.

---

## 3. Camera Rules

The camera is **locked in place 90% of the time**. Movement is reserved for
emotional beats only.

### 3.1 Slow Push-In (Emotional Beats)

Scale from **1.0 → 1.08** over **60 frames** using eased interpolation.
Derived from the pro file's push-cut defaults (§1.1: `outgoingScale: 1.04`,
`incomingEndScale: 1.07`), adapted for our longer hold times.

```tsx
const pushIn = interpolate(frame, [startFrame, startFrame + 60], [1.0, 1.08], {
  extrapolateRight: "clamp",
  easing: Easing.out(Easing.quad),
});

// Apply to scene container
<div style={{ transform: `scale(${pushIn})` }}>
```

- Use **only** on: Andy's internal conflict moments, Shadow appearances, emotional
  turning points.
- Never exceed scale 1.1. Never use on diagram/explainer scenes.

### 3.2 Hard Cuts (Diagram Scenes)

For diagram or object close-up scenes, use **instant hard cuts** with no
transition. Derived from the pro file's push-cut timing (§1.3):

```tsx
// 11-frame transition, outgoing punch at frame 5
const TRANSITION_DURATION_IN_FRAMES = 11;
const OUTGOING_PUNCH_FRAMES = 5;
const CUT_PROGRESS = OUTGOING_PUNCH_FRAMES / TRANSITION_DURATION_IN_FRAMES;
```

- Hard cuts are used for: object close-ups, diagram reveals, scene resets.
- Calm narrative shots hold **4–8 seconds** before any cut.
- Montage sequences use **~1-second** shots with hard cuts between.

---

## 4. Shadow Entrance

The Shadow (Andy's inner voice) enters via a **spring-based slide from the
right edge** of frame, using the bouncy entrance config from the pro file (§2.1).

```tsx
const shadowSlide = spring({
  fps,
  frame: frame - shadowStartFrame,
  config: {
    damping: 200,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
  },
});

const translateX = interpolate(shadowSlide, [0, 1], [400, 0]); // slide in from +400px right
```

- The Shadow is **pure black (#000000)** with a **cyan glow outline (#00D4FF, 3px with blur)**.
- The Shadow is **20% taller** than Andy.
- The glow pulse uses the pro file's glow pattern (§3.3): `radius: 100, intensity: 1.7`.
- On exit, reverse the spring (slide back to +400px right).

---

## Summary Table

| Element           | Technique           | Duration / Value        | Source             |
|-------------------|---------------------|-------------------------|--------------------|
| Text fade         | `interpolate` opacity | 20–30 frames          | CLAUDE.md §Text    |
| Idle bob          | `spring` + loop     | 2px / 60-frame loop     | Pro file §2.3      |
| Camera push-in    | `interpolate` scale | 1.0→1.08 / 60 frames   | Pro file §1.1      |
| Hard cut          | Instant transition  | 11 frames / cut at 5    | Pro file §1.3      |
| Shadow entrance   | `spring` translateX | damping:200 stiff:100   | Pro file §2.1      |
| Shadow glow       | `glow()` effect     | radius:100 intensity:1.7| Pro file §3.3      |

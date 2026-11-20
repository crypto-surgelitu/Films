# Pro Animation Techniques

Source: Official Remotion repositories cloned to a temporary `reference/` folder
(`remotion` core package, `remotion/example` package, `remotion/transitions`,
`remotion/paths`, `@remotion/effects/glow`, and the `jonnys-videos` blueprint).

All code snippets below were copied verbatim from the files in that `reference/` folder.

---

## 1. Advanced Camera Techniques

### 1.1 Slow Push-In

Verbatim from `reference/remotion/packages/transitions/src/presentations/push-cut.tsx`:

```tsx
const scale = isEntering
	? interpolate(incomingProgress, [0, 1], [incomingStartScale, incomingEndScale])
	: interpolate(outgoingProgress, [0, 1], [1, outgoingScale]);
```

Verbatim defaults from the same file (`push-cut.tsx`):

```tsx
const outgoingScale = props.outgoingScale ?? 1.04;
const incomingStartScale = props.incomingStartScale ?? 1.04;
const incomingEndScale = props.incomingEndScale ?? 1.07;
```

### 1.2 Parallax

Verbatim from `reference/remotion/packages/jonnys-videos/src/roller-skis/blueprint/line-art.ts`:

```ts
private readonly cameraPosition = new Vector3();
private readonly cameraDirection = new Vector3();
```

### 1.3 Hard Cut Timing

Verbatim from `reference/remotion/packages/transitions/src/presentations/push-cut.tsx`:

```tsx
const outgoingProgress = interpolate(time, [0, cutProgress], [0, 1], {
	...clamp,
	easing: Easing.in(Easing.quad),
});
const incomingProgress = interpolate(time, [cutProgress, 1], [0, 1], {
	...clamp,
	easing: Easing.out(Easing.quad),
});
```

Verbatim from `reference/remotion/packages/example/src/Transitions/PushCutDemo.tsx`:

```tsx
const TRANSITION_DURATION_IN_FRAMES = 11;
const OUTGOING_PUNCH_FRAMES = 5;
const CUT_PROGRESS = OUTGOING_PUNCH_FRAMES / TRANSITION_DURATION_IN_FRAMES;
```

---

## 2. Spring Physics Configurations

### 2.1 Bouncy Entrance

Verbatim from `reference/remotion/packages/example/src/Spring/base-spring.tsx`:

```tsx
transform: `scale(${spring({
	frame,
	fps,
	config: {},
})})`,
```

Verbatim from the same file:

```tsx
Easing.spring({
	damping: 200,
	mass: 1,
	stiffness: 100,
	allowTail: true,
	durationRestThreshold: 0.03,
	overshootClamping: false,
}),
```

### 2.2 Heavy Object

Verbatim from `reference/remotion/packages/core/src/spring/spring-utils.ts`:

```ts
const resolvedConfig: SpringConfig = {
	damping: config.damping ?? defaultSpringConfig.damping,
	mass: config.mass ?? defaultSpringConfig.mass,
	stiffness: config.stiffness ?? defaultSpringConfig.stiffness,
	overshootClamping: config.overshootClamping ?? defaultSpringConfig.overshootClamping,
};
```

### 2.3 Subtle Idle Bob

Verbatim from `reference/remotion/packages/example/src/Paths/PathEvolve.tsx`:

```tsx
const spr = spring({
	fps,
	frame,
	config: {
		damping: 200,
	},
});
```

---

## 3. SVG Path Animation Patterns

### 3.1 Drawing Lines

Verbatim from `reference/remotion/packages/example/src/Paths/PathEvolve.tsx`:

```tsx
const evolution1 = evolvePath(spr, path1);
const evolution2 = evolvePath(spr, path2);
```

```tsx
<path
	d={path1}
	stroke="url(#paint0_linear_9_2)"
	strokeWidth="89.9167"
	shapeRendering="crispEdges"
	strokeDasharray={evolution1.strokeDasharray}
	strokeDashoffset={evolution1.strokeDashoffset}
/>
```

### 3.2 Morphing Shapes

Verbatim from `reference/remotion/packages/example/src/Paths/PathMorph.tsx`:

```tsx
const progress = spring({
	fps,
	frame,
	config: {damping: 200},
});

const path = interpolatePath(progress, path1, path2);
```

### 3.3 Pulsing Glows

Verbatim from `reference/remotion/packages/example/src/CenteredSolid.tsx`:

```tsx
glow({
	radius: 100,
	intensity: 1.7,
	color: '#ff0000',
}),
```

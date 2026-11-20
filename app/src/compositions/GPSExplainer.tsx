import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
  Img,
  staticFile,
  spring,
} from "remotion";

// ---------------------------------------------------------------------------
// Pose type and file mapping
// ---------------------------------------------------------------------------
type Pose = "phone" | "pointing" | "skeptical" | "smirk";

const POSE_FILES: Record<Pose, string> = {
  phone: "poses/andy-phone.png",
  pointing: "poses/andy-pointing.png",
  skeptical: "poses/andy-skeptical.png",
  smirk: "poses/andy-smirk.png",
};

// ---------------------------------------------------------------------------
// CharacterWithPose
// Renders the base Andy PNG and crossfades to a specific pose over 15 frames.
// Applies the 2px idle bob (60-frame spring loop) from crayon-motion-analysis.
// ---------------------------------------------------------------------------
const CROSSFADE_DURATION = 15;

export const CharacterWithPose: React.FC<{
  pose: Pose;
  frame: number;
}> = ({ pose, frame }) => {
  const { fps } = useVideoConfig();

  // --- 15-frame crossfade: base fades out, pose fades in ---
  const poseOpacity = interpolate(frame, [0, CROSSFADE_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const baseOpacity = 1 - poseOpacity;

  // --- 2px idle bob on a 60-frame spring loop (crayon-motion-analysis §2) ---
  const loopFrame = frame % 60;
  const bob = spring({
    fps,
    frame: loopFrame,
    config: {
      damping: 200,
    },
  });
  const translateY = interpolate(bob, [0, 1], [0, -2]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        position: "relative",
        width: 260,
        height: 400,
      }}
    >
      {/* Base character (fades out during crossfade) */}
      <Img
        src={staticFile("poses/analog-andy.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: baseOpacity,
        }}
      />
      {/* Pose overlay (fades in during crossfade) */}
      <Img
        src={staticFile(POSE_FILES[pose])}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: poseOpacity,
        }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Deterministic star positions (seeded once, never re-randomized per frame)
// ---------------------------------------------------------------------------
const STARS = Array.from({ length: 50 }, (_, i) => ({
  left: ((i * 37 + 13) % 100),           // pseudo-random spread 0-100%
  top: ((i * 53 + 7) % 60),              // confined to top 60%
  size: 2 + ((i * 17) % 3),              // 2-4px
}));

// ---------------------------------------------------------------------------
// GPSExplainer — Main composition (Scene 1 + Scene 2)
// ---------------------------------------------------------------------------
export const GPSExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ================================================================
          SCENE 1 — "Your phone knows exactly where you are." (0–1350)
          ================================================================ */}
      <Sequence from={0} durationInFrames={1350}>
        <Scene1 />
      </Sequence>

      {/* ================================================================
          SCENE 2 — "It's not magic. It's geometry." (1350–2700)
          ================================================================ */}
      <Sequence from={1350} durationInFrames={1350}>
        <Scene2 />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// SCENE 1
// ---------------------------------------------------------------------------
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera push-in: very subtle 1.0 → 1.05 over the full scene
  const cameraScale = interpolate(frame, [0, 1350], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Narrator text fade-in over 30 frames (crayon-motion-analysis §1)
  const textOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phone glow pulse: gentle opacity oscillation on a 90-frame cycle
  const glowOpacity = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.8, 1, 0.8],
  );

  return (
    <AbsoluteFill>
      {/* Dark background */}
      <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }} />

      {/* Camera push-in wrapper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          transformOrigin: "center bottom",
        }}
      >
        {/* Floor line */}
        <div
          style={{
            position: "absolute",
            top: "70%",
            width: "100%",
            height: "2px",
            backgroundColor: "#4A4A4A",
          }}
        />

        {/* Phone glow behind character */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "70%",
            transform: "translate(-50%, -65%)",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.22) 0%, rgba(0,0,0,0) 70%)",
            opacity: glowOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Character — phone pose, anchored on the floor line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "70%",
            transform: "translate(-50%, -100%)",
          }}
        >
          <CharacterWithPose pose="phone" frame={frame} />
        </div>
      </div>

      {/* Narrator text — top center */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Comic Neue', cursive",
          fontSize: 24,
          color: "#FFFFFF",
          opacity: textOpacity,
          pointerEvents: "none",
        }}
      >
        Your phone knows exactly where you are.
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// SCENE 2
// ---------------------------------------------------------------------------
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  // Narrator text fade-in over 30 frames (relative to scene start)
  const textOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Dark background */}
      <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }} />

      {/* Starry sky — 50 deterministic dots in the top 60% */}
      {STARS.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Floor line */}
      <div
        style={{
          position: "absolute",
          top: "70%",
          width: "100%",
          height: "2px",
          backgroundColor: "#4A4A4A",
        }}
      />

      {/* Character — pointing pose, with 15-frame crossfade handled internally */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "70%",
          transform: "translate(-50%, -100%)",
        }}
      >
        <CharacterWithPose pose="pointing" frame={frame} />
      </div>

      {/* Narrator text — top center */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Comic Neue', cursive",
          fontSize: 24,
          color: "#FFFFFF",
          opacity: textOpacity,
          pointerEvents: "none",
        }}
      >
        It's not magic. It's geometry.
      </div>
    </AbsoluteFill>
  );
};

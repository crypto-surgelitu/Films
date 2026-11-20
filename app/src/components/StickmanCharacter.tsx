import React from "react";

export type StickmanPose = "standing" | "walking" | "prying";

export type StickmanCharacterProps = {
  /** The pose of the character. @default "standing" */
  pose?: StickmanPose;
};

const STICK = {
  stroke: "#000000",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
};

/**
 * "AnalogAndy" — a pure SVG stick figure used for programmatic video generation.
 */
export const StickmanCharacter: React.FC<StickmanCharacterProps> = ({
  pose = "standing",
}: StickmanCharacterProps) => {
  // Limb endpoints per pose (shoulders ~y=172, hips ~y=275, head center ~(150, 88))
  let leftArmX2 = 108;
  let leftArmY2 = 292;
  let rightArmX2 = 192;
  let rightArmY2 = 292;
  let leftLegX2 = 128;
  let leftLegY2 = 448;
  let rightLegX2 = 172;
  let rightLegY2 = 448;

  if (pose === "walking") {
    // Arms swing opposite ways, legs alternate forward/back.
    leftArmX2 = 98;
    leftArmY2 = 292;
    rightArmX2 = 208;
    rightArmY2 = 268;
    leftLegX2 = 98;
    leftLegY2 = 448;
    rightLegX2 = 182;
    rightLegY2 = 448;
  } else if (pose === "prying") {
    // Hunched stance: arms braced forward against resistance, wide-ish squat.
    leftArmX2 = 84;
    leftArmY2 = 162;
    rightArmX2 = 216;
    rightArmY2 = 162;
    leftLegX2 = 116;
    leftLegY2 = 448;
    rightLegX2 = 184;
    rightLegY2 = 448;
  }

  return (
    <svg
      viewBox="0 0 300 500"
      width={300}
      height={500}
      fill="none"
      role="img"
      aria-label="AnalogAndy"
    >
      {/* Legs */}
      <line {...STICK} x1={135} y1={275} x2={leftLegX2} y2={leftLegY2} />
      <line {...STICK} x1={165} y1={275} x2={rightLegX2} y2={rightLegY2} />

      {/* Brown tactical vest */}
      <rect x={105} y={168} width={90} height={112} rx={12} fill="#8B4513" />

      {/* Arms */}
      <line {...STICK} x1={120} y1={172} x2={leftArmX2} y2={leftArmY2} />
      <line {...STICK} x1={180} y1={172} x2={rightArmX2} y2={rightArmY2} />

      {/* Neck */}
      <line {...STICK} x1={150} y1={132} x2={150} y2={168} />

      {/* Round white head with thick black stroke */}
      <circle cx={150} cy={88} r={45} fill="#FFFFFF" {...STICK} />

      {/* Grey headphones around the neck */}
      <path
        d="M 112 140 Q 150 60 188 140"
        fill="none"
        stroke="#696969"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <circle cx={112} cy={140} r={11} fill="#696969" />
      <circle cx={188} cy={140} r={11} fill="#696969" />
    </svg>
  );
};

export default StickmanCharacter;

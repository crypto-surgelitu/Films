import { CalculateMetadataFunction, Composition } from "remotion";
import { GPSExplainer } from "./compositions/GPSExplainer";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <>
      {/* Original placeholder */}
      <Composition
        id="MyComp"
        component={MyComponent}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
        calculateMetadata={calculateMetadata}
      />
      {/* GPS Illusion — Scene 1 + Scene 2 (2700 frames = 90s at 30fps) */}
      <Composition
        id="GPSExplainer"
        component={GPSExplainer}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

export const MyComponent: React.FC<Props> = () => {
  return null;
};

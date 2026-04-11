import { Composition } from "remotion";
import { GemelVideo } from "./GemelVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="GemelVideo"
      component={GemelVideo}
      durationInFrames={1800} // 60 seconds at 30fps
      fps={30}
      width={1080}
      height={1920} // vertical 9:16 for social media
    />
  );
};

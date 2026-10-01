import { Composition, Folder } from "remotion";
import { IvanVideo } from "./IvanVideo";
import { Hello } from "./scenes/Hello";
import { Purpose } from "./scenes/Purpose";
import { Blocks } from "./scenes/Blocks";
import { Zones } from "./scenes/Zones";
import { Yellow } from "./scenes/Yellow";
import { Evidence } from "./scenes/Evidence";
import { Final } from "./scenes/Final";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Ivan-Vertical"
        component={IvanVideo}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition
          id="Hello"
          component={Hello}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Purpose"
          component={Purpose}
          durationInFrames={105}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Blocks"
          component={Blocks}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Zones"
          component={Zones}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Yellow"
          component={Yellow}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Evidence"
          component={Evidence}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Final"
          component={Final}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};

import { TransitionSeries } from "@remotion/transitions";
import { Html5Audio, staticFile, useCurrentFrame } from "remotion";
import { VoiceFrame } from "./VoiceContext";
import { Hello } from "./scenes/Hello";
import { Purpose } from "./scenes/Purpose";
import { Blocks } from "./scenes/Blocks";
import { Zones } from "./scenes/Zones";
import { Yellow } from "./scenes/Yellow";
import { Evidence } from "./scenes/Evidence";
import { Final } from "./scenes/Final";
export const IvanVideo = () => {
  const frame = useCurrentFrame();
  return (
    <VoiceFrame.Provider value={frame}>
      <Html5Audio src={staticFile("ivan-voice.wav")} />
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={75}
          name="01 — Знакомьтесь, Иван"
        >
          <Hello />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={105}
          name="02 — AI-помощник"
        >
          <Purpose />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={210}
          name="03 — Пять блоков"
        >
          <Blocks />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={120}
          name="04 — Четыре зоны"
        >
          <Zones />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={90}
          name="05 — Жёлтая зона"
        >
          <Yellow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={150}
          name="06 — Доказательства"
        >
          <Evidence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          durationInFrames={90}
          name="07 — Продолжение"
        >
          <Final />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </VoiceFrame.Provider>
  );
};

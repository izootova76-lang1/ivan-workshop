import React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { IvanFace } from "./IvanFace";

const fontFamily = "Manrope";
void loadFont({
  family: "Manrope",
  url: staticFile("manrope-cyrillic.woff2"),
  weight: "200 800",
});
void loadFont({
  family: "Manrope",
  url: staticFile("manrope-latin.woff2"),
  weight: "200 800",
});
export const Stage: React.FC<{ children: React.ReactNode; room?: boolean }> = ({
  children,
  room = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#071323",
        fontFamily,
        color: "#f8f5ed",
        overflow: "hidden",
      }}
    >
      {room && (
        <CanvasImage
          src={staticFile("ivan-night.png")}
          style={{
            position: "absolute",
            width: 1080,
            height: 1920,
            objectFit: "cover",
            objectPosition: "43% center",
            opacity: 0.3,
            filter: "blur(14px)",
            scale: interpolate(frame, [0, durationInFrames], [1.06, 1.12]),
          }}
        />
      )}
      <Interactive.Div
        name="Голубой свет"
        style={{
          position: "absolute",
          left: -450,
          top: 350,
          width: 1000,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#3d79851f,transparent 68%)",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["0px -70px", "90px 30px"],
          ),
        }}
      />
      <Interactive.Div
        name="Ламповый свет"
        style={{
          position: "absolute",
          right: -450,
          top: 500,
          width: 1100,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#ffac4557,transparent 67%)",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["0px 80px", "-50px -20px"],
          ),
        }}
      />
      <CanvasImage
        src={staticFile("light-ribbons.svg")}
        style={{
          position: "absolute",
          width: 1500,
          height: 1800,
          left: -210,
          top: 20,
          opacity: 0.14,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: interpolate(
            frame,
            [0, 9, durationInFrames - 8, durationInFrames - 1],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export const Ivan: React.FC<{
  top?: number;
  height?: number;
  dim?: number;
}> = ({ top = 530, height = 1110, dim = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const imageScale = Math.max(1080 / 1448, height / 1086);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: 1080,
        height,
        objectFit: "cover",
        objectPosition: "43% center",
        opacity: dim,
        maskImage:
          "linear-gradient(to bottom,transparent,#000 12%,#000 75%,transparent)",
        scale: interpolate(frame, [0, durationInFrames], [1, 1.055]),
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1448 * imageScale,
          height: 1086 * imageScale,
          left: (1080 - 1448 * imageScale) * 0.43,
          top: (height - 1086 * imageScale) / 2,
        }}
      >
        <CanvasImage
          src={staticFile("ivan-night.png")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <IvanFace />
      </div>
    </div>
  );
};
export const Glass: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  gold?: boolean;
}> = ({ children, style, gold }) => (
  <div
    style={{
      background: gold
        ? "linear-gradient(135deg,#9e6b328c,#322d28eb)"
        : "linear-gradient(135deg,#3e718b7d,#112840d9)",
      border: `2px solid ${gold ? "#ffe2a6" : "#a9dfff75"}`,
      borderRadius: 32,
      boxShadow: `inset 0 2px 0 #ffffff55,0 0 16px ${gold ? "#ffa83b45" : "#28b7ff08"},0 24px 45px #0004`,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Symbol: React.FC<{ kind: number; color?: string }> = ({
  kind,
  color = "#8de0ff",
}) => {
  const shapes = [
    <>
      <circle cx="40" cy="40" r="28" />
      <path d="m52 27-8 19-17 7 8-20Z" />
    </>,
    <>
      <rect x="13" y="10" width="43" height="56" rx="7" />
      <path d="M25 24h20M25 36h20M25 48h12" />
      <path d="m51 44 20 13-20 13Z" />
    </>,
    <>
      <path d="M10 68h62M17 58V44h12v14m10 0V30h12v28m10 0V15h12v43M12 31 36 12l14 8L68 5" />
    </>,
    <>
      <path d="M12 15h46v35H31L17 64V50h-5Z" />
      <path d="M35 26c-10-11-20 4 0 16 20-12 10-27 0-16Z" />
    </>,
    <>
      <circle cx="40" cy="40" r="23" />
      <path d="M40 5v11m0 48v11M5 40h11m48 0h11M14 14l10 10m32 32 10 10M14 66l10-10m32-32 10-10" />
      <path d="m25 49 6-18 6 18m-9-6h7m10-12v18m-4-18h8m-8 18h8" />
    </>,
  ];
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${color}70)` }}
    >
      {shapes[kind]}
    </svg>
  );
};
export const ZoneSymbol: React.FC<{ index: number; color: string }> = ({
  index,
  color,
}) => {
  const shapes = [
    <>
      <rect x="8" y="12" width="19" height="19" rx="4" />
      <rect x="51" y="7" width="19" height="19" rx="4" />
      <rect x="15" y="52" width="19" height="19" rx="4" />
      <rect x="55" y="48" width="19" height="19" rx="4" />
    </>,
    <>
      <circle cx="13" cy="60" r="8" />
      <circle cx="66" cy="18" r="8" />
      <path d="M21 60h15V42m14-13h16v-3" />
      <path d="M36 42V29h14" strokeDasharray="3 7" />
    </>,
    <>
      <path d="M20 20h40v40H20Zm0 0 40 40" />
      <circle cx="20" cy="20" r="8" />
      <circle cx="60" cy="20" r="8" />
      <circle cx="20" cy="60" r="8" />
      <circle cx="60" cy="60" r="8" />
    </>,
    <>
      <path d="m16 40 24-25 24 25-24 25Z" />
      <path d="M40 15v50M16 40h48M65 4v13m-6-6h12" />
      <circle cx="40" cy="40" r="8" />
    </>,
  ];
  return (
    <svg
      viewBox="0 0 80 80"
      width="126"
      height="126"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 13px ${color}8c)` }}
    >
      {shapes[index]}
    </svg>
  );
};

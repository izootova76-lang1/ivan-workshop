import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Ivan } from "../Stage";
export const Hello = () => {
  const frame = useCurrentFrame();
  return (
    <Stage room>
      <Ivan top={480} height={1230} />
      <Interactive.Div
        name="Знакомство"
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 170,
          fontSize: 91,
          fontWeight: 800,
          lineHeight: 1.14,
          letterSpacing: -3,
          translate: interpolate(frame, [0, 18], ["0px 35px", "0px 0px"], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Знакомьтесь,
        <br />
        <span style={{ fontSize: 172, color: "#ffdc8a" }}>Иван</span>
        <span style={{ color: "#76dfff", fontSize: 94 }}> ✳</span>
      </Interactive.Div>
      <Interactive.Div
        name="Первая реплика"
        style={{
          position: "absolute",
          left: 105,
          right: 105,
          bottom: 175,
          fontSize: 45,
          textAlign: "center",
          color: "#e4edf2",
        }}
      >
        Смотрит строго.
        <br />
        Но вообще-то он добрый.
      </Interactive.Div>
    </Stage>
  );
};

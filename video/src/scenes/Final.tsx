import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Ivan } from "../Stage";
export const Final = () => {
  const frame = useCurrentFrame();
  return (
    <Stage room>
      <Ivan top={380} height={1210} />
      <Interactive.Div
        name="Название Мастерской"
        style={{
          position: "absolute",
          top: 170,
          left: 85,
          right: 85,
          fontSize: 87,
          lineHeight: 1.18,
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        Мастерская
        <br />
        <span style={{ color: "#ffe0a0" }}>ИИзотовой</span>
      </Interactive.Div>
      <Interactive.Div
        name="Ему подавай доказательства."
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          bottom: 215,
          padding: "36px 20px",
          fontSize: 55,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.25,
          color: "#142233",
          background: "linear-gradient(135deg,#ffe29a,#f3b44f)",
          borderRadius: 27,
          boxShadow: "0 14px 35px #0004,inset 0 2px 0 #fff9",
          scale: interpolate(frame, [0, 18], [0.94, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Ему подавай
        <br />
        доказательства.
      </Interactive.Div>
    </Stage>
  );
};

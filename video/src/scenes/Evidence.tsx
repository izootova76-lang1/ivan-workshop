import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Ivan, Glass } from "../Stage";
export const Evidence = () => {
  const frame = useCurrentFrame();
  return (
    <Stage room>
      <Ivan top={75} height={1030} />
      <Glass
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 930,
          padding: "48px 48px 54px",
        }}
      >
        <Interactive.Div
          name="Настоящий Иван"
          style={{
            fontSize: 65,
            fontWeight: 800,
            lineHeight: 1.22,
            color: "#ffe0a0",
          }}
        >
          Настоящий Иван
          <br />
          работает строже.
        </Interactive.Div>
        <Interactive.Div
          name="На слово не верит"
          style={{
            fontSize: 54,
            lineHeight: 1.35,
            marginTop: 35,
            opacity: interpolate(frame, [22, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Он не верит вам
          <br />
          на слово —
        </Interactive.Div>
        <Interactive.Div
          name="Доказательства"
          style={{
            fontSize: 61,
            fontWeight: 800,
            lineHeight: 1.25,
            marginTop: 27,
            color: "#94e7ff",
            opacity: interpolate(frame, [48, 62], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ему подавай
          <br />
          доказательства 😄
        </Interactive.Div>
      </Glass>
    </Stage>
  );
};

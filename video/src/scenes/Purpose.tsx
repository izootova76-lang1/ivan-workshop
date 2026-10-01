import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Ivan, Glass } from "../Stage";
export const Purpose = () => {
  const frame = useCurrentFrame();
  return (
    <Stage room>
      <Ivan top={90} height={1070} />
      <Glass
        style={{
          position: "absolute",
          top: 1080,
          left: 80,
          right: 80,
          padding: "48px 48px 54px",
        }}
      >
        <Interactive.Div
          name="Назначение Ивана"
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.24,
            translate: interpolate(frame, [0, 14], ["0px 20px", "0px 0px"], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span style={{ color: "#8de4ff" }}>AI-помощник</span>
          <br />
          для экспресс-
          <br />
          диагностики
          <br />
          каналов
        </Interactive.Div>
      </Glass>
    </Stage>
  );
};

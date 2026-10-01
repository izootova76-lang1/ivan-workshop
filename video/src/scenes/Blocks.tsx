import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Glass, Symbol } from "../Stage";
const labels = [
  "Позиционирование",
  "Контентная система",
  "Коммерческая часть",
  "Доверие и отличимость",
  "Готовность к AI\nи автоматизации",
];
export const Blocks = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Interactive.Div
        name="Пять блоков"
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 155,
          fontSize: 86,
          fontWeight: 800,
          lineHeight: 1.18,
        }}
      >
        На что
        <br />
        смотрит <span style={{ color: "#ffdc8a" }}>Иван</span>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 460,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {labels.map((label, i) => (
          <Interactive.Div
            key={label}
            name={label}
            style={{
              opacity: interpolate(frame, [i * 20, i * 20 + 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [i * 20, i * 20 + 14],
                ["65px 0px", "0px 0px"],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              ),
            }}
          >
            <Glass
              style={{
                minHeight: 174,
                padding: "32px 32px",
                display: "flex",
                gap: 25,
                alignItems: "center",
              }}
            >
              <Symbol kind={i} color={i % 2 ? "#ffda93" : "#8de4ff"} />
              <span
                style={{
                  fontSize: 24,
                  color: "#b6cddd",
                  alignSelf: "flex-start",
                  paddingTop: 6,
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontSize: 43,
                  fontWeight: 700,
                  lineHeight: 1.28,
                  whiteSpace: "pre-line",
                  flex: 1,
                }}
              >
                {label}
              </span>
            </Glass>
          </Interactive.Div>
        ))}
      </div>
      <Interactive.Div
        name="Системный взгляд"
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          bottom: 190,
          fontSize: 43,
          color: "#c4dbe8",
          textAlign: "center",
        }}
      >
        Пять точек. Одна система.
      </Interactive.Div>
    </Stage>
  );
};

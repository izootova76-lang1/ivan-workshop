import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, Glass, ZoneSymbol } from "../Stage";
export const Yellow = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Interactive.Div
        name="Жёлтый свет"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 47%,#ffc04a4f,transparent 65%)",
          opacity: interpolate(frame, [0, 24], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Жёлтая зона"
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 225,
          fontSize: 98,
          fontWeight: 800,
          lineHeight: 1.15,
          color: "#ffe1a0",
        }}
      >
        Жёлтая зона
      </Interactive.Div>
      <Glass
        gold
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 475,
          padding: "75px 60px",
          textAlign: "center",
        }}
      >
        <ZoneSymbol index={1} color="#ffd576" />
        <Interactive.Div
          name="Основа уже есть"
          style={{
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.28,
            marginTop: 45,
          }}
        >
          Основа уже есть.
        </Interactive.Div>
        <Interactive.Div
          name="Полки не подписаны"
          style={{
            fontSize: 62,
            lineHeight: 1.35,
            marginTop: 35,
            color: "#fff0d0",
          }}
        >
          Но полки пока
          <br />
          не подписаны. 😄
        </Interactive.Div>
      </Glass>
      <Interactive.Div
        name="Следующий шаг"
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          bottom: 235,
          fontSize: 47,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Пора связать детали
        <br />в одну ясную систему.
      </Interactive.Div>
    </Stage>
  );
};

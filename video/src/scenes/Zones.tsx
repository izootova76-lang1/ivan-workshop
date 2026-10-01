import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Stage, ZoneSymbol } from "../Stage";
export const Zones = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Interactive.Div
        name="Цветовые зоны"
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 170,
          fontSize: 87,
          fontWeight: 800,
          lineHeight: 1.18,
        }}
      >
        А потом
        <br />
        появляется <span style={{ color: "#8de4ff" }}>цвет</span>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          top: 535,
          left: 85,
          right: 85,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {["Красная", "Жёлтая", "Зелёная", "Синяя"].map((name, i) => {
          const color = ["#ff8b7e", "#ffd576", "#7be8ae", "#79dbff"][i];
          return (
            <Interactive.Div
              key={name}
              name={name + " зона"}
              style={{
                height: 370,
                borderRadius: 30,
                border: `2px solid ${color}`,
                background: `linear-gradient(135deg,${color}24,#102237ca)`,
                boxShadow: `inset 0 2px 0 #ffffff4d,0 0 35px ${color}28`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 35,
                opacity: interpolate(frame, [i * 9, i * 9 + 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <ZoneSymbol index={i} color={color} />
              <span style={{ fontSize: 45, fontWeight: 700 }}>{name}</span>
            </Interactive.Div>
          );
        })}
      </div>
      <Interactive.Div
        name="Смысл цвета"
        style={{
          position: "absolute",
          bottom: 175,
          left: 100,
          right: 100,
          fontSize: 44,
          lineHeight: 1.45,
          textAlign: "center",
        }}
      >
        Цвет — не оценка человека.
        <br />
        <span style={{ color: "#ffd576" }}>Это состояние системы.</span>
      </Interactive.Div>
    </Stage>
  );
};

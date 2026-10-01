import { useCurrentFrame } from "remotion";
import { useVoiceFrame } from "./VoiceContext";
import { voiceEnvelope } from "./voice-envelope";

// Coordinates match the original 1448 × 1086 artwork. Only the electronic
// display is redrawn: no head, body, hand or background pixels are warped.
export const IvanFace = () => {
  const local = useCurrentFrame();
  const global = useVoiceFrame();
  const frame = global ?? local;
  const blinks = [43, 136, 592, 701, 803];
  const blink = blinks.some((at) => Math.abs(frame - at) <= 2);
  const level = global === null ? 0 : (voiceEnvelope[frame] ?? 0);
  const mouth = level < 0.045 ? 0 : level < 0.42 ? 1 : 2;
  const strict = global !== null && frame >= 600 && frame < 750;
  const drift = Math.sin(frame / 38) * 1.5;
  return (
    <svg
      viewBox="0 0 1448 1086"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        <radialGradient id="ivan-display">
          <stop stopColor="#10171e" />
          <stop offset="1" stopColor="#05090e" />
        </radialGradient>
        <pattern
          id="ivan-pixels"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.55" fill="#31647d" opacity=".25" />
        </pattern>
        <filter
          id="ivan-soft-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path
        d="M603 291 Q647 279 706 298 L802 332 Q857 357 847 413 L822 493 Q809 534 781 534 L591 482 Q543 470 545 430 L567 345 Q575 307 603 291Z"
        fill="url(#ivan-display)"
      />
      <path
        d="M603 291 Q647 279 706 298 L802 332 Q857 357 847 413 L822 493 Q809 534 781 534 L591 482 Q543 470 545 430 L567 345 Q575 307 603 291Z"
        fill="url(#ivan-pixels)"
      />
      <g
        style={{ translate: `${drift}px ${Math.sin(frame / 47)}px` }}
        fill="none"
        stroke="#91edff"
        strokeLinecap="round"
      >
        <g strokeWidth="14" style={{ filter: "drop-shadow(0 0 10px #00b9ff)" }}>
          <path
            d={
              blink
                ? "M599 407 Q633 424 670 426"
                : strict
                  ? "M599 403 Q636 374 670 424"
                  : "M598 403 Q618 353 648 378 Q676 395 670 424"
            }
          />
          <path
            d={
              blink
                ? "M754 454 Q780 466 809 478"
                : strict
                  ? "M754 451 Q788 427 809 474"
                  : "M754 451 Q775 406 798 430 Q815 446 809 474"
            }
          />
        </g>
        <g
          transform="translate(703 470) rotate(17)"
          strokeWidth="3.5"
          style={{ filter: "drop-shadow(0 0 5px #00b9ff)" }}
        >
          {mouth === 0 ? (
            <path d="M-23 -3 Q0 19 23 -3" />
          ) : (
            <ellipse
              cx="0"
              cy="3"
              rx={mouth === 1 ? 13 : 17}
              ry={mouth === 1 ? 7 : 12}
              fill="#092437"
            />
          )}
        </g>
      </g>
      <circle
        cx="766"
        cy="196"
        r="23"
        fill="#39d9ff"
        opacity={0.1 + 0.12 * (0.5 + 0.5 * Math.sin(frame / 24))}
        filter="url(#ivan-soft-glow)"
      />
      <circle
        cx="766"
        cy="196"
        r="13"
        fill="#b4f9ff"
        opacity={0.1 + 0.22 * (0.5 + 0.5 * Math.sin(frame / 24))}
      />
    </svg>
  );
};

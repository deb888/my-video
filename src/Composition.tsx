import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

const FPS = 30;
const DURATION = 15 * FPS;

const skills = [
  { name: "AI/ML Engineering", pct: 90, color: "#FF006E" },
  { name: "LangChain / LangGraph", pct: 90, color: "#FFBE0B" },
  { name: "MCP / A2A Protocols", pct: 85, color: "#00C853" },
  { name: "AWS Bedrock", pct: 85, color: "#FF9900" },
  { name: "React Native", pct: 88, color: "#61DAFB" },
  { name: "Kubernetes / Terraform", pct: 90, color: "#326CE5" },
  { name: "OpenClaw", pct: 92, color: "#FF006E" },
  { name: "Angular 18+", pct: 90, color: "#DD0031" },
];

const typingLines = [
  "LangChain → LangGraph → Deep Agents",
  "MCP → A2A → Agent Protocols",
  "Terraform → K8s → vLLM Deployments",
  "Fullstack → AI DevOps → Neural Stack",
];

const BG = "#0a0a0f";
const CYAN = "#00ffe7";
const PINK = "#ff006e";

export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="MyComp"
      component={SiteBackground}
      durationInFrames={DURATION}
      fps={FPS}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};

const SiteBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({
    frame: Math.min(frame, 150),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const nameSpring = spring({
    frame: Math.min(frame, 45),
    fps,
    config: { damping: 14, mass: 0.4, stiffness: 120 },
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typingIndex = Math.min(
    Math.floor((frame - 70) / 45),
    typingLines.length - 1
  );
  const typingFrame = Math.max(0, frame - 70 - typingIndex * 45);
  const typingProgress = interpolate(typingFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const currentTypingLine =
    typingIndex >= 0 && typingIndex < typingLines.length
      ? typingLines[typingIndex]
      : typingLines[typingLines.length - 1];
  const visibleChars = Math.floor(typingProgress * currentTypingLine.length);

  const glitchOffset = interpolate(Math.sin(frame * 3), [-1, 1], [-2, 2]);
  const glitchVisible =
    frame < 80 && Math.sin(frame * 7) > 0.6;

  const cornerFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scanlineOpacity = 0.03 + 0.02 * Math.sin(frame * 0.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@700;900&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 255, 231, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 231, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 231, ${scanlineOpacity}) 2px, transparent 3px)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(10, 10, 15, 0.8) 60%, #0a0a0f 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 24,
          left: 32,
          opacity: cornerFade,
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            color: CYAN,
            fontSize: 20,
            letterSpacing: 3,
            textShadow: `0 0 8px ${CYAN}4d`,
          }}
        >
          <span style={{ color: PINK }}>&gt;</span> deb888
        </span>
      </div>

      {[
        { top: 24, left: 32, bt: 1, bb: 0, bl: 1, br: 0 },
        { top: 24, right: 32, bt: 1, bb: 0, bl: 0, br: 1 },
        { bottom: 24, left: 32, bt: 0, bb: 1, bl: 1, br: 0 },
        { bottom: 24, right: 32, bt: 0, bb: 1, bl: 0, br: 1 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            borderColor: `${CYAN}40`,
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth: pos.bt,
            borderBottomWidth: pos.bb,
            borderLeftWidth: pos.bl,
            borderRightWidth: pos.br,
            opacity: cornerFade,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 60,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#8b8b9e",
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 8,
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Hello, I'm
        </div>

        <div style={{ position: "relative", marginBottom: 12 }}>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: 2,
              color: "#e8e8ee",
              textShadow: `0 0 30px ${CYAN}26`,
              transform: `scale(${nameSpring})`,
              opacity: nameSpring,
            }}
          >
            {glitchVisible && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: glitchOffset,
                  width: "100%",
                  height: "100%",
                  color: CYAN,
                  clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                }}
              >
                Bruce Deb
              </div>
            )}
            {glitchVisible && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: -glitchOffset,
                  width: "100%",
                  height: "100%",
                  color: PINK,
                  clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                }}
              >
                Bruce Deb
              </div>
            )}
            Bruce Deb
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            color: "#8b8b9e",
            fontWeight: 300,
            letterSpacing: 2,
            marginBottom: 16,
            opacity: titleOpacity,
          }}
        >
          AI Developer · Fullstack Architect · AI DevOps Engineer
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: CYAN,
            textShadow: `0 0 6px ${CYAN}26`,
            minHeight: 24,
            opacity: subtitleOpacity,
            marginBottom: 24,
          }}
        >
          <span style={{ color: PINK, opacity: 0.7 }}>$</span>{" "}
          {currentTypingLine.substring(0, visibleChars)}
          {typingIndex < typingLines.length && (
            <span
              style={{
                color: CYAN,
                textShadow: `0 0 8px ${CYAN}`,
                opacity: 0.5 + 0.5 * Math.sin(frame * 6),
              }}
            >
              _
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            maxWidth: 560,
            opacity: interpolate(frame, [80, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {skills.slice(0, 8).map((s, i) => {
            const delay = 100 + i * 5;
            const sScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 14, mass: 0.3, stiffness: 150 },
            });
            return (
              <div
                key={s.name}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: CYAN,
                  background: `${CYAN}0a`,
                  border: `1px solid ${CYAN}1a`,
                  padding: "4px 10px",
                  transform: `scale(${sScale})`,
                  opacity: sScale,
                  whiteSpace: "nowrap",
                }}
              >
                {s.name}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 80,
            height: 340,
            backgroundColor: "#12121a",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            border: "1px solid #1c1c2e",
            boxShadow: `0 0 40px ${PINK}18`,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${barProgress * 100}%`,
              background: `linear-gradient(to top, ${PINK}, #533483)`,
              borderRadius: 12,
              boxShadow: `0 0 30px ${PINK}40`,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 40,
            fontWeight: 900,
            color: "#e8e8ee",
            letterSpacing: 3,
            textShadow: `0 0 20px ${PINK}40`,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {Math.round(barProgress * 100)}%
        </div>
      </div>
    </AbsoluteFill>
  );
};

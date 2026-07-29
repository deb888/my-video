import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {};

const calcMetadata: CalculateMetadataFunction<Props> = () => ({});

const FPS = 30;
const PER_EXAMPLE = 70;
const EXAMPLES = [
  { dog: "🐕", name: "Golden Retriever", color: "#E6A817" },
  { dog: "🐩", name: "Poodle", color: "#FF6B9D" },
  { dog: "🐕‍🦺", name: "Labrador", color: "#4ECDC4" },
  { dog: "🦮", name: "German Shepherd", color: "#FF8C42" },
];

export const DogHighFiveComp: React.FC = () => (
  <Composition
    id="DogHighFive"
    component={DogHighFive}
    durationInFrames={15 * FPS}
    fps={FPS}
    width={1280}
    height={720}
    calculateMetadata={calcMetadata}
  />
);

const DogHighFive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showIndex = Math.min(
    Math.max(0, Math.floor((frame - 70) / PER_EXAMPLE)),
    EXAMPLES.length - 1,
  );
  const exampleFrame = Math.max(0, frame - 70 - showIndex * PER_EXAMPLE);

  const titleOpacity = interpolate(frame, [0, 20, 60, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame: Math.min(frame, 25),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #FFD93D, #FF6B6B)",
        fontFamily: "'Nunito', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <Audio
        src={staticFile("carefree.mp3")}
        volume={0.5}
        durationInFrames={15 * FPS}
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;800;900&display=swap"
        rel="stylesheet"
      />

      {[...Array(8)].map((_, i) => {
        const p = i / 8;
        const angle = p * Math.PI * 2 + frame * 0.01;
        const r = 280 + Math.sin(frame * 0.02 + i) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 640 + Math.cos(angle) * r - 12,
              top: 360 + Math.sin(angle) * r - 12,
              fontSize: 20,
              opacity: 0.15 + 0.1 * Math.sin(frame * 0.03 + i * 2),
              transform: `rotate(${frame * 0.5 + i * 45}deg)`,
            }}
          >
            🐾
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: titleOpacity,
          scale: String(titleScale),
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 12 }}>🐕🖐️</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          Dogs Giving High Fives
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            marginTop: 8,
          }}
        >
          Example compilation
        </div>
      </div>

      {EXAMPLES.map((ex, i) => {
        if (i !== showIndex) return null;
        const localFrame = exampleFrame;

        const fadeIn = interpolate(localFrame, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const handSpring = spring({
          frame: localFrame,
          fps,
          config: { damping: 8, mass: 0.5, stiffness: 180 },
        });
        const handX = interpolate(handSpring, [0, 1], [200, 0]);

        const dogSpring = spring({
          frame: localFrame,
          fps,
          config: { damping: 10, mass: 0.4, stiffness: 200 },
        });
        const dogX = interpolate(dogSpring, [0, 1], [-200, 0]);

        const slapFrame = 18;
        const slapScale = spring({
          frame: Math.max(0, localFrame - slapFrame),
          fps,
          config: { damping: 6, mass: 0.3, stiffness: 300 },
        });
        const starOpacity = interpolate(
          localFrame,
          [slapFrame - 3, slapFrame + 2, slapFrame + 15],
          [0, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: fadeIn,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 100,
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                Example {i + 1}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#fff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                {ex.name}
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 100,
                  transform: `translateX(${dogX}px)`,
                  transition: "none",
                }}
              >
                {ex.dog}
              </div>
              <div
                style={{
                  fontSize: 64,
                  transform: `scale(${slapScale}) translateX(${handX}px)`,
                  transition: "none",
                  opacity: interpolate(
                    localFrame,
                    [0, slapFrame - 1, slapFrame, slapFrame + 4],
                    [1, 1, 0.6, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ),
                }}
              >
                🖐️
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -80%)",
                fontSize: 60,
                opacity: starOpacity,
                scale: String(slapScale),
              }}
            >
              ✨
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 18,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                opacity: interpolate(localFrame, [30, 50], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {localFrame < slapFrame
                ? "Approaching..."
                : "Good dog! 🐾"}
            </div>
          </div>
        );
      })}

      {frame > 70 + EXAMPLES.length * PER_EXAMPLE - 30 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            opacity: interpolate(
              frame,
              [
                70 + EXAMPLES.length * PER_EXAMPLE - 30,
                70 + EXAMPLES.length * PER_EXAMPLE,
              ],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 12 }}>🐾</div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#fff",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            That's a good dog!
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              marginTop: 8,
            }}
          >
            Every dog deserves a high five 🖐️
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

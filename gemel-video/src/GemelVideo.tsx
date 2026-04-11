import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Load Rubik font locally (Hebrew + Latin)
const fontFaceStyle = `
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 100 900;
    src: url('${staticFile("fonts/rubik-hebrew.woff2")}') format('woff2');
    unicode-range: U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
  }
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 100 900;
    src: url('${staticFile("fonts/rubik-latin.woff2")}') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = fontFaceStyle;
  document.head.appendChild(style);
}

const fontFamily = "Rubik, sans-serif";

const FPS = 30;
const BG_DARK = "#0f172a";
const BG_CARD = "#1e293b";
const GOLD = "#f59e0b";
const GOLD_LIGHT = "#fcd34d";
const WHITE = "#f8fafc";
const MUTED = "#94a3b8";
const GREEN = "#10b981";

// ---- Utility: fade + slide up ----
const useFadeSlide = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
    durationInFrames: duration,
  });
  return {
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
  };
};

// ---- Scene 1: Hook ----
const SceneHook: React.FC = () => {
  const title = useFadeSlide(5, 25);
  const sub = useFadeSlide(20, 25);
  const cta = useFadeSlide(35, 25);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BG_DARK} 0%, #1a1040 100%)`,
        direction: "rtl",
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "80px 60px",
        gap: 40,
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
        }}
      />

      <div style={{ ...title, textAlign: "center" }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: GOLD,
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          המתנה הכי טובה
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.3,
          }}
        >
          לילד שלנו 🎁
        </div>
      </div>

      <div
        style={{
          ...sub,
          fontSize: 34,
          color: MUTED,
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 800,
        }}
      >
        חשבתם פעם מה תהיה המתנה הכי גדולה שתוכלו לתת לילד שלכם כשיגיע לגיל{" "}
        <span style={{ color: GOLD_LIGHT, fontWeight: 700 }}>18?</span>
      </div>

      <div
        style={{
          ...cta,
          fontSize: 42,
          fontWeight: 700,
          color: WHITE,
          textAlign: "center",
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        לא הטלפון הכי חדש.
        <br />
        החופש לבחור.
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 2: Problem ----
const SceneProblem: React.FC = () => {
  const title = useFadeSlide(5, 20);
  const body = useFadeSlide(20, 20);
  const warn = useFadeSlide(38, 20);

  return (
    <AbsoluteFill
      style={{
        background: BG_DARK,
        direction: "rtl",
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "80px 60px",
        gap: 48,
      }}
    >
      <div style={{ ...title, fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center" }}>
        הבעיה 🏦
      </div>

      <div
        style={{
          ...body,
          background: BG_CARD,
          borderRadius: 28,
          padding: "48px 52px",
          fontSize: 34,
          color: MUTED,
          lineHeight: 1.8,
          textAlign: "center",
          maxWidth: 900,
          borderRight: `6px solid ${GOLD}`,
        }}
      >
        רובנו חוסכים לילדים ב
        <span style={{ color: WHITE, fontWeight: 700 }}> תוכניות חיסכון בבנק </span>
        — וזה מרגיש בטוח.
        <br />
        <br />
        אבל האינפלציה והריביות הנמוכות?
      </div>

      <div
        style={{
          ...warn,
          fontSize: 46,
          fontWeight: 900,
          color: "#ef4444",
          textAlign: "center",
        }}
      >
        📉 הכסף שוכב ולא עובד.
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 3: Solution ----
const BenefitCard: React.FC<{
  emoji: string;
  title: string;
  text: string;
  delay: number;
}> = ({ emoji, title, text, delay }) => {
  const style = useFadeSlide(delay, 18);
  return (
    <div
      style={{
        ...style,
        background: BG_CARD,
        borderRadius: 24,
        padding: "36px 44px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 24,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 48 }}>{emoji}</div>
      <div>
        <div style={{ fontSize: 34, fontWeight: 700, color: GOLD, marginBottom: 10 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: MUTED, lineHeight: 1.6 }}>{text}</div>
      </div>
    </div>
  );
};

const SceneSolution: React.FC = () => {
  const title = useFadeSlide(3, 18);

  return (
    <AbsoluteFill
      style={{
        background: BG_DARK,
        direction: "rtl",
        fontFamily,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        padding: "80px 60px",
        gap: 36,
      }}
    >
      <div style={{ ...title, fontSize: 50, fontWeight: 900, color: WHITE, textAlign: "center" }}>
        קופת גמל להשקעה ✨
      </div>

      <BenefitCard
        emoji="🔓"
        title="נזילות מלאה"
        text="הכסף זמין תמיד — לבר מצווה, לטיול, לכל מה שצריך."
        delay={15}
      />
      <BenefitCard
        emoji="📈"
        title="ניהול מקצועי"
        text="מנהלי השקעות עובדים בשבילכם. פוטנציאל תשואה גבוה בהרבה מהבנק."
        delay={30}
      />
      <BenefitCard
        emoji="🎁"
        title="הטבת מס מדהימה"
        text="שמירה עד פנסיה = קצבה פטורה ממס לחלוטין."
        delay={45}
      />
    </AbsoluteFill>
  );
};

// ---- Scene 4: Compound Interest ----
const SceneCompound: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = useFadeSlide(5, 20);
  const body = useFadeSlide(20, 20);

  const BAR_W = 500;
  const bankProgress = spring({ frame: frame - 30, fps, config: { damping: 20 } });
  const gemelProgress = spring({ frame: frame - 45, fps, config: { damping: 20 } });

  const bankHeight = interpolate(bankProgress, [0, 1], [0, 180]);
  const gemelHeight = interpolate(gemelProgress, [0, 1], [0, 420]);

  return (
    <AbsoluteFill
      style={{
        background: BG_DARK,
        direction: "rtl",
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "80px 60px",
        gap: 48,
      }}
    >
      <div style={{ ...title, fontSize: 50, fontWeight: 900, color: WHITE, textAlign: "center" }}>
        כוח הריבית דריבית 💰
      </div>

      <div style={{ ...body, fontSize: 30, color: MUTED, textAlign: "center", lineHeight: 1.7 }}>
        ₪300 בחודש × 18 שנה
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", flexDirection: "row", gap: 80, alignItems: "flex-end" }}>
        {/* Bank */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 26, color: WHITE, fontWeight: 700 }}>~₪75,000</div>
          <div
            style={{
              width: 140,
              height: bankHeight,
              background: "#475569",
              borderRadius: "12px 12px 0 0",
            }}
          />
          <div style={{ fontSize: 24, color: MUTED }}>בנק</div>
        </div>

        {/* Gemel */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 26, color: GOLD_LIGHT, fontWeight: 700 }}>~₪175,000+</div>
          <div
            style={{
              width: 140,
              height: gemelHeight,
              background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
              borderRadius: "12px 12px 0 0",
            }}
          />
          <div style={{ fontSize: 24, color: GOLD }}>קופת גמל</div>
        </div>
      </div>

      <div
        style={{
          fontSize: 28,
          color: GREEN,
          fontWeight: 700,
          textAlign: "center",
          opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        ✓ הזמן הוא הנכס הכי חשוב שלכם
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 5: CTA ----
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = spring({ frame, fps, config: { damping: 8, stiffness: 60 } });
  const title = useFadeSlide(5, 20);
  const body = useFadeSlide(20, 20);
  const btn = useFadeSlide(38, 20);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #1a1040 0%, ${BG_DARK} 100%)`,
        direction: "rtl",
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "80px 60px",
        gap: 48,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -300,
          left: -300,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
        }}
      />

      <div style={{ ...title, fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center" }}>
        אל תחכו למחר ⏰
      </div>

      <div
        style={{
          ...body,
          fontSize: 34,
          color: MUTED,
          textAlign: "center",
          lineHeight: 1.8,
          maxWidth: 860,
        }}
      >
        פתחו קופת גמל להשקעה עוד היום —
        <br />
        אפילו ב-
        <span style={{ color: GOLD_LIGHT, fontWeight: 700 }}>200 שקל בחודש.</span>
        <br />
        <br />
        העתיד שלהם מתחיל
        <br />
        <span style={{ color: WHITE, fontWeight: 700 }}>בהחלטה שלכם עכשיו.</span>
      </div>

      <div
        style={{
          ...btn,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
          borderRadius: 100,
          padding: "28px 72px",
          fontSize: 36,
          fontWeight: 700,
          color: BG_DARK,
          transform: `scale(${interpolate(pulse, [0, 1], [0.95, 1])})`,
        }}
      >
        פתחו קופת גמל עוד היום
      </div>
    </AbsoluteFill>
  );
};

// ---- Main Composition ----
export const GemelVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {/* Background music */}
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 30, 1770, 1800], [0, 0.35, 0.35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
        loop
      />

      {/* Scene 1: Hook — 0:00–0:12 */}
      <Sequence from={0} durationInFrames={360} premountFor={30}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Problem — 0:12–0:22 */}
      <Sequence from={360} durationInFrames={300} premountFor={30}>
        <SceneProblem />
      </Sequence>

      {/* Scene 3: Solution — 0:22–0:38 */}
      <Sequence from={660} durationInFrames={480} premountFor={30}>
        <SceneSolution />
      </Sequence>

      {/* Scene 4: Compound Interest — 0:38–0:50 */}
      <Sequence from={1140} durationInFrames={360} premountFor={30}>
        <SceneCompound />
      </Sequence>

      {/* Scene 5: CTA — 0:50–1:00 */}
      <Sequence from={1500} durationInFrames={300} premountFor={30}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bubblegum Bliss palette
        bubblegum: "#FFA5D6",
        blush: "#FFD6EE",
        ivory: "#FFF0F1",
        rose: "#ECD2E0",
        peri: "#CED1F8",
        lavender: "#A7ABDE",
        // Neutrals
        ink: "#17141D",
        paper: "#FCFAFB",
        plum: "#302A4B",
        // Derived: AA-contrast text tones on paper
        "ink-soft": "#4A4458",
        "pink-deep": "#A3286C",
        "lav-deep": "#555AA6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: { tightest: "-0.042em" },
      maxWidth: { frame: "1440px" },
      keyframes: {
        orbit: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        counter: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(-360deg)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        twinkle: { "0%,100%": { transform: "scale(.7) rotate(0deg)", opacity: ".5" }, "50%": { transform: "scale(1) rotate(45deg)", opacity: "1" } },
        scrolldot: { "0%": { transform: "translateY(0)", opacity: "0" }, "30%": { opacity: "1" }, "100%": { transform: "translateY(22px)", opacity: "0" } },
      },
      animation: {
        orbit: "orbit 48s linear infinite",
        counter: "counter 48s linear infinite",
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        twinkle: "twinkle 3.6s ease-in-out infinite",
        scrolldot: "scrolldot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

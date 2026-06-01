/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.34)",
        glow: "0 0 44px rgba(125, 211, 252, 0.24)"
      },
      keyframes: {
        bgFade: {
          "0%": { opacity: "0.2", transform: "scale(1.015)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(125, 211, 252, 0.18)" },
          "50%": { boxShadow: "0 0 0 10px rgba(125, 211, 252, 0)" }
        }
      },
      animation: {
        bgFade: "bgFade 900ms ease-out both",
        riseIn: "riseIn 700ms ease-out both",
        pulseRing: "pulseRing 2.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

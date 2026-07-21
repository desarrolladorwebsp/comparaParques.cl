/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#1E3A2B",
        "brand-orange": "#E67E22",
        "brand-light": "#F8F9FA",
        "brand-muted": "#E9ECEF",
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(30, 58, 43, 0.35)",
        lift: "0 22px 60px -24px rgba(30, 58, 43, 0.42)",
        glow: "0 16px 40px -18px rgba(230, 126, 34, 0.55)",
      },
      backgroundImage: {
        "dot-pattern":
          "radial-gradient(rgba(30,58,43,0.09) 1px, transparent 1px)",
        "dot-pattern-light":
          "radial-gradient(rgba(248,249,250,0.14) 1px, transparent 1px)",
        "grid-pattern":
          "linear-gradient(rgba(30,58,43,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,43,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-md": "18px 18px",
        "grid-md": "28px 28px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        float: "float 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

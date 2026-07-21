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
    },
  },
  plugins: [],
};

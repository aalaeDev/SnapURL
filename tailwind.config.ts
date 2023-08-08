import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      discord: "#5865F2",
      main: { DEFAULT: "#24A1FC" },
      neutral: {
        100: "#FBFBFA",
        200: "#A4A1C8",
        600: "#262347",
        900: "#100F1C",
      },
    },
  },
  plugins: [],
} satisfies Config;

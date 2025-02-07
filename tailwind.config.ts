import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      danger: { DEFAULT: "#fe4b4b" },
      transparent: "transparent",
      main: { DEFAULT: "#24A1FC" },
      neutral: {
        100: "#FBFBFA",
        200: "#A4A1C8",
        600: "#262347",
        400: "#7773AF",
        900: "#100F1C",
      },
    },
  },
  plugins: [],
} satisfies Config;

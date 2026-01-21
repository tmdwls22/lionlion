import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oh: {
          bg: "#FFC62A",
          bg2: "#FFB000",
          accent: "#FF6A2A",
          ink: "#111111",
          muted: "#5A5A5A",
          card: "#FFFFFF",
          border: "rgba(17,17,17,0.08)",
        },
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

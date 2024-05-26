import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        desktop: '1440 x 1024',
        tablets: '744 x 1133',
        phone: '430 x 932, 375 x 812',
      },
      colors: {
        'blue': '#1fb6ff',
        'light-blue':'F6F6F6',
        'purple': '#7e5bef',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      darkMode: {
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#3b82f6",
        background: "#0e172a",
        text: "#ffffff",
      },
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      }
    },
  },
  plugins: [],
};

export default config;

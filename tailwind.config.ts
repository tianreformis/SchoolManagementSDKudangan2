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
      colors: {
        lamaSky:"#FEF9E1",
        lamaSkyLight:"#E5D0AC",
        lamaPurple:"#A31D1D",
        lamaPurpleLight:"#6D2323",
        lamaYellow:"#ECF0F1",
        lamaYellowLight:"#ECF0F1",        
      },
      colorsBackup: {
        lamaSky:"#C3EBFA",
        lamaSkyLight:"#EDF9FD",
        lamaPurple:"#CFCEFF",
        lamaPurpleLight:"#F1F0FF",
        lamaYellow:"#FAE27C",
        lamaYellowLight:"#FEFCE8",
        tianDarkColor:"",

        tianLightColor : "#ECF0F1",
      },
    },
  },
  plugins: [],
};
export default config;

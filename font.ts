// fonts.ts
import { Inter, Neuton } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const neuton = Neuton({
  weight: ["200", "300", "400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-neuton",
});

// Local fonts - paths should be relative to this file
// Make sure your fonts are in public/fonts/ folder
export const orelegaOne = localFont({
  src: [
    {
      path: "./public/fonts/OrelegaOne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-orelega",
});

export const gurajada = localFont({
  src: [
    {
      path: "./public/fonts/Gurajada-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gurajada",
});

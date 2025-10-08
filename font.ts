// fonts.ts
import { Inter, Neuton, Lora } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
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

export const timesRoman = localFont({
  src: [
    {
      path: "./public/fonts/times.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-times-roman",
});

export const imbue = localFont({
  src: [
    {
      path: "./public/fonts/Imbue.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-imbue",
});

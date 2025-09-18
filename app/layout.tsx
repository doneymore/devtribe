import type { Metadata } from "next";
import "./globals.css";
import { gurajada, inter, neuton, orelegaOne } from "@/font";
import StoreProvider from "./lib/providers/storeProvider";

export const metadata: Metadata = {
  title: "Secneedle",
  description: "Your comprehensive cybersecurity resource directory",
  icons: {
    icon: "/secneedle.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable} 
        ${neuton.variable} 
        ${orelegaOne.variable} 
        ${gurajada.variable}
      `}
    >
      <body className="font-inter antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

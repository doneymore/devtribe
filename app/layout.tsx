import type { Metadata } from "next";
import "./globals.css";
import { gurajada, inter, neuton, orelegaOne } from "@/font";
import StoreProvider from "./lib/providers/storeProvider";
import { Navbar } from "./component/reusable/landingpage/navItem";
import Footer from "./component/reusable/landingpage/footer";
import ConditionalFooter from "./component/reusable/conditionalFooter";

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
        <StoreProvider>
          <Navbar />
          {children}
          <ConditionalFooter />
        </StoreProvider>
      </body>
    </html>
  );
}

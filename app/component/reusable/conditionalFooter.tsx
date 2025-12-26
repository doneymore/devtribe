"use client";

import { usePathname } from "next/navigation";
import Footer from "./landingpage/footer";
import PortfolioFooter from "./porfolio/portfolioFooter";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Only show footer on portfolio page
  const isPortfolioPage = pathname === "/pages/portfolioScreen";
  const isAboutUs = pathname === "/pages/contactScreen"

  if (isPortfolioPage || isAboutUs) {
    return <PortfolioFooter />;
  }

  return <Footer />;
}

"use client";

import { usePathname } from "next/navigation";
import Footer from "./landingpage/footer";
import PortfolioFooter from "./porfolio/portfolioFooter";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Only show footer on portfolio page
  const isPortfolioPage = pathname === "/pages/portfolioScreen";

  if (isPortfolioPage) {
    return <PortfolioFooter />;
  }

  return <Footer />;
}

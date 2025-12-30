import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [
      "i.ytimg.com",
      "yt3.ggpht.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
    ],
  },
  // Disable error overlay
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // This will prevent errors from showing in production
  productionBrowserSourceMaps: false,
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

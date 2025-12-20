import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com',"upload.wikimedia.org", "images.unsplash.com"],
  },
};

export default nextConfig;

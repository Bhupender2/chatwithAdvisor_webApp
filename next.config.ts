import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chat.neetadvisor.com",
      },
    ],
  },
};

export default nextConfig;

//Why Next.js does this?

// Security + optimization.

// Next Image:

// optimizes images
// caches images
// lazy loads
// transforms formats

// So Next wants explicit allowed domains.

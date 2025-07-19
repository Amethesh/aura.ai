import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.civitai.com",
      },
      {
        protocol: "https",
        hostname: "bflplaygroundstore.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nvbssjoomsozojofygor.supabase.co",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      }
    ],
  },
};

export default nextConfig;

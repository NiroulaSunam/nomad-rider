import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // image domain of uploadthing's
      },
    ],
  },
};

export default nextConfig;

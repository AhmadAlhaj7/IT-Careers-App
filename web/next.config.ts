import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1MB — too small for a roadmap cover image upload.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;

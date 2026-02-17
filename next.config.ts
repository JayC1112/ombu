import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pupgxrsvbptybumzuydr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  // Security headers are handled in vercel.json
};

export default nextConfig;

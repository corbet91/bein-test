import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['media.beincom.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL_DEVELOP: process.env.NEXT_PUBLIC_API_URL_DEVELOP,
  },
};

export default nextConfig;

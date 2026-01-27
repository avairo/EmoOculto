import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/EmoOculto",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

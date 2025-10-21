import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/next-qrcode" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/next-qrcode/" : "",
};

export default nextConfig;

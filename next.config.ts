import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "d2sucgbhjy7j1n.cloudfront.net",
      "kom-uploads.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;

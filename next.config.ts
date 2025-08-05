import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    serverActions: {
      bodySizeLimit: '2mb' // أو القيمة التي تناسبك مثل '5mb' أو '20mb'
    }
  },

  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;

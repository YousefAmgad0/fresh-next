import type { NextConfig } from "next";

/*
nvalid src prop (https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg) on `next/image`, hostname "ecommerce.routemisr.com" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
*/
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/**",
      },
      
    ],
  },
  reactCompiler: true,
};

export default nextConfig;

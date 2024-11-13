import type { NextConfig } from "next"

// https://example.com/images/smartphone-x.jpg
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com", // Add the new hostname
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig

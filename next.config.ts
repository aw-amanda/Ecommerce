import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/Ecommerce",
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}

export default nextConfig

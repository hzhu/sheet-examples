/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs-assets.developer.apple.com",
        pathname: "/published/**",
      },
    ],
  },
};

export default nextConfig;

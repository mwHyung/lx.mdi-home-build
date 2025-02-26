/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

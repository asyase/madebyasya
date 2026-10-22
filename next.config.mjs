/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: deploys to Vercel as-is, or to any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;

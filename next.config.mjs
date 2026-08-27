/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages hosts this project below /HEB-Portfolio.
  ...(process.env.GITHUB_ACTIONS === "true"
    ? { basePath: "/HEB-Portfolio", assetPrefix: "/HEB-Portfolio/" }
    : {}),
};

export default nextConfig;

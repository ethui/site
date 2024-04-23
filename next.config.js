/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["@ethui/form"],
  images: {
    unoptimized: true
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Fix for CSS extraction error
  webpack: (config) => {
    return config;
  },
  // Ensure experimental features don't cause issues
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig 
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
  // Configuración para imágenes
  images: {
    domains: [
      // Dominio de Vercel Blob
      "public.blob.vercel-storage.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

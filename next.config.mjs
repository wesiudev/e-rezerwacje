/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "wesiudev.netlify.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.gencraft.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

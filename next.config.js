/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 360,
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig

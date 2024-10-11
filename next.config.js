/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/add-issues',
          destination: '/add-issues',
        },
      ];
    },
  };
  
  module.exports = nextConfig;
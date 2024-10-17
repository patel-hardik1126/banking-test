/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 1000, // Poll every second
          aggregateTimeout: 300, // Delay rebuilding by 300ms after changes
        };
      }
      return config;
    }
  };
  
  module.exports = nextConfig;
  
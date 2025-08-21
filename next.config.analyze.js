const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = require('./next.config.ts');

module.exports = withBundleAnalyzer(nextConfig); 
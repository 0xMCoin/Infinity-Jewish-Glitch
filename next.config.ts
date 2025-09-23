import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "react-icons",
      "framer-motion",
      "lucide-react",
    ],
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rodolfotherat.xyz",
      },
      {
        protocol: "https",
        hostname: "www.rodolfotherat.xyz",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
  turbopack: { root: path.join(__dirname, "..") },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            enforce: true,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
            priority: 5,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            chunks: "all",
            priority: 20,
          },
          icons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: "react-icons",
            chunks: "all",
            priority: 20,
          },
        },
      };

      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.resolve.modules = ["node_modules"];
      config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx"];
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
  transpilePackages: [],
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;

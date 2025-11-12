import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true, // Activado para usar useCache [10]
  },
  // ... otras configuraciones
};

export default nextConfig;

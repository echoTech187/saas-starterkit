import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/",
    resolveAlias: {
      '~*': '*',
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "/",
    resolveAlias: {
      '~*': '*',
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  reactStrictMode: true,
  devIndicators: false
};

export default nextConfig;

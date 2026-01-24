/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),

    resolveAlias: {
      '~*': '*',
      underscore: 'lodash',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  outputFileTracingRoot: process.cwd(),
  reactStrictMode: true,
  devIndicators: false
};

export default nextConfig;

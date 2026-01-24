import path from 'path';
import fs from 'fs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
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
  webpack: (config: any) => {
    // Dynamically find the project root by searching for package.json
    let currentDir = process.cwd();
    let projectRoot = currentDir;
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, 'package.json'))) {
        projectRoot = currentDir;
        break;
      }
      currentDir = path.dirname(currentDir);
    }

    config.resolve.modules = [
      path.resolve(projectRoot, 'node_modules'),
      'node_modules',
    ];
    return config;
  },
  reactStrictMode: true,
  devIndicators: false
};

export default nextConfig;

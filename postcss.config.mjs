const config = {
  plugins: {
    "@tailwindcss/postcss": { config: require.resolve('tailwindcss/package.json').replace(/(\\|\/)package\.json$/, '') },
  },
};

export default config;

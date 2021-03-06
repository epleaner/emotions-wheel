module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    production: {
      plugins: ['emotion'],
    },
    development: {
      plugins: [['emotion']],
    },
  },
};

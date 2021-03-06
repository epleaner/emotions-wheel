require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      })
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, 'src/components'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@middleware': path.resolve(__dirname, 'src/middleware'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@static': path.resolve(__dirname, 'src/static'),
        '@schemas': path.resolve(__dirname, 'src/schemas'),
        '@stores': path.resolve(__dirname, 'src/stores'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
      },
    };

    return config;
  },
};

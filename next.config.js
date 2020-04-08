require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        Components: path.resolve(__dirname, "src/components"),
        Helpers: path.resolve(__dirname, "src/helpers"),
        Styles: path.resolve(__dirname, "src/styles"),
        Contexts: path.resolve(__dirname, "src/contexts"),
      },
    };

    return config;
  },
};

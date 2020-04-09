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
        "@components": path.resolve(__dirname, "src/components"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@middleware": path.resolve(__dirname, "src/middleware"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@lib": path.resolve(__dirname, "src/lib"),
      },
    };

    return config;
  },
};

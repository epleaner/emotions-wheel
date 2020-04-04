const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        components: path.resolve(__dirname, "src/components"),
        helpers: path.resolve(__dirname, "src/helpers")
      }
    };

    return config;
  }
};

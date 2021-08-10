const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "desktop"),
  publicPath: process.env.NODE_ENV === "production" ? "./desktop/" : "",
};

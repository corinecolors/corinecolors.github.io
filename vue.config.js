const path = require("path");

var assetsPath = "assets";
var desktop = "desktop";

module.exports = {
  outputDir: path.resolve(__dirname, desktop),
  publicPath: process.env.NODE_ENV === "production" ? `./${desktop}/` : "",
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "",
  assetsDir: assetsPath,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true,
      });
  },
  // chainWebpack: (config) => {
  //   config
  //     .plugin('html')
  //     .tap(() => [{
  //       template: path.resolve('index.html'),
  //     }]);
  // },

  // publicPath: process.env.NODE_ENV === "production" ? `./` : "",
};

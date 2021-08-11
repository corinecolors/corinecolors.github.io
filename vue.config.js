const path = require("path");

var assetsPath = "assets";
var desktop = "desktop";

module.exports = {
  outputDir: path.resolve(__dirname, desktop),
  publicPath: process.env.NODE_ENV === "production" ? `./${desktop}/` : "",
  assetsDir: assetsPath,
  lintOnSave: true,
  // chainWebpack: (config) => {
  //   config
  //     .plugin('html')
  //     .tap(() => [{
  //       template: path.resolve('index.html'),
  //     }]);
  // },

  // publicPath: process.env.NODE_ENV === "production" ? `./` : "",

};

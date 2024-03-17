const path = require("path");

module.exports = {
  mode: "development",
  entry: "./debug/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "debug"),
  },
};

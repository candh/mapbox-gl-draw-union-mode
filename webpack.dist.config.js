const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "UnionMode",
    libraryTarget: "umd",
    libraryExport: "default"
  },
};

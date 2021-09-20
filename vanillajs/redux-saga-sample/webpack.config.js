const path = require("path");
const webpack = require("webpack"); //to access built-in plugins

const componentConfig = {
  name: "component",
  entry: "./src/counter.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /counter.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};

const initConfig = {
  name: "init",
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "app.init.js",
    path: path.resolve(__dirname, "dist")
  }
};

module.exports = [componentConfig, initConfig];

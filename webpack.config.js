const path = require('path');
const webpack = require('webpack');

let inputFolderPath = "ScoreBootstrapUI\\js\\";
let outputFolderPath = "dist\\";
let bundleName = "bundle.js";

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }],
      }
    ],
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
  ],
  context: path.resolve(__dirname, inputFolderPath),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, outputFolderPath),
    filename: bundleName,
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
};

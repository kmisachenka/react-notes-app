const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "/public/static"),
    publicPath: "static/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: [/\.js?$/, /\.jsx?$/],
        loader: 'eslint',
        include: path.join(__dirname, "src")
      }
    ],
    loaders: [
      {
        test: [/\.js$/, /\.jsx/],
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, "src")

      },
      {
        test: /\.css$/,
        loaders: ["style", "css", "autoprefixer"],
        include: path.join(__dirname, "src")
      }
    ],
    eslint: {
      configFile: path.join(__dirname, '.eslintrc'),
      failOnWarning: false,
      failOnError: true
    },
  }
};

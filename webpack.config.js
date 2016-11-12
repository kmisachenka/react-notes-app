const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public/static",
    publicPath: "static/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, 'src')

      },
      {
        test: /\.jsx/,
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "autoprefixer-loader"],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};

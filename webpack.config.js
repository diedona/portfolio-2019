const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/scripts/main.js',
    index: './src/scripts/index.js',
    objetivos: './src/scripts/objetivos.js'
  },

  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|bmp|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {

          }
        }
      },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery' 
    }),
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ['main', 'index']
    }),
    new htmlWebpackPlugin({
      template: "./src/objetivos.html",
      filename: "./objetivos.html",
      chunks: ['main', 'objetivos']
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
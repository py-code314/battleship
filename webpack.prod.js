
// webpack.prod.js
const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
// Extract CSS code from JS files
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//  Minify CSS file in HTML
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// JS file minimizer
const TerserPlugin = require('terser-webpack-plugin')
// Handle HTML files
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Remove old files
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Minify link CSS file in HTML
      new TerserPlugin(), // Minify JS file
      new HtmlWebpackPlugin({
        template: './src/template.html',
        // Minify HTML
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],

  module: {
    rules: [
      // Load CSS
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          'css-loader',
        ], // Turn CSS into CommonJS
      },
    ],
  },
})

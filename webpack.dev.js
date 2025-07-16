
// webpack.dev.js
const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
// Handle HTML files
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Plugin for HTML files
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],

  // Dev server code
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: ['./src/template.html'],
    liveReload: true,
  },

  module: {
    rules: [
      // Load CSS
      {
        test: /\.css$/i,
        use: [
          'style-loader', // Inject styles into DOM
          'css-loader', // Turn CSS into CommonJS
        ],
      },
    ],
  },
})

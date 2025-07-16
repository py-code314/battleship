/* eslint-disable no-unused-vars */
// webpack.common.js
const path = require('path')

module.exports = {
  // Entry file/s
  entry: {
    main: './src/index.js',
  },

  module: {
    rules: [
      // Load image files in HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // Import images into JS files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // for babel
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
}

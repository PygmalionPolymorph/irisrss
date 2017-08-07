const path = require('path');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');


module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src'),
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'IrisRSS',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'http://localhost:8080/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    allowedHosts: [
      '192.168.69.69',
      'peach',
    ],
    host: '0.0.0.0',
  },
};

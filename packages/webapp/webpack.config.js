const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
  },
  plugins: [
    new HTMLPlugin({
      template: 'src/index.html'
    }),
    new Dotenv(),
    // new BundleAnalyzer(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};

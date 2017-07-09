var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    allowedHosts: [
      '192.168.69.69',
      'peach'
    ],
    host: '0.0.0.0',
  }
};

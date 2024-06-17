const path = require('path');

module.exports = {
  entry: './scripts/content.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
    ]
  },
};
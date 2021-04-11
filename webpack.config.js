const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    a: './src/a.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].test.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
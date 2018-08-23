const path = require('path');

module.exports = {
 entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
  	path: path.join(process.cwd(), './public'),
  	filename: 'main.js'
  }
};
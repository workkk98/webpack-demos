const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
    ]
  },
  externals: {
    // require('data') is external and available
    //  on the global var data
    'data': 'data',
    'jquery': '$',
    // subtract: ['./math', 'subtract'],
    'fs-extra': 'commonjs2 fs-extra'
  }
};

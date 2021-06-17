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
    'index-cmd2-js': 'commonjs2 ./const.js'
  }
};

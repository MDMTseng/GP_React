var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = "production";

module.exports = {
  entry: './src/script.js',
  output: { path: __dirname, filename: 'bundle.js' },
  devtool: (process.env.NODE_ENV !== "production")?
    "inline-sourcemap" : null,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};

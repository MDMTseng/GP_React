var debug = process.env.NODE_ENV !== "production" ;
module.exports = {
  entry: './src/script.js',
  output: { path: __dirname, filename: 'bundle.js' },
  devtool: debug? "inline-sourcemap" : null,
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

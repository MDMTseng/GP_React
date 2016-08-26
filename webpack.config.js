var path = require('path');
var webpack = require('webpack');
var WebpackShellPlugin = require('./src/MISC/WebpackShellPlugin.js');
//console.log(process.env.FOO);
//process.env.NODE_ENV = "production";

var PluginSets = [];

if(process.env.NODE_ENV === "production")
{
  PluginSets.push(new webpack.optimize.OccurenceOrderPlugin());

  PluginSets.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));

  PluginSets.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }));


}
if(process.env.NOTIMON_PRJ === "deploy")
{
  PluginSets.push(new WebpackShellPlugin({
    onBuildStart: ['echo "WebpackShellPlugin is working"'],
    onBuildEnd: ['echo "Start to deploy to Android proj" && sh deployToAndroidUI.sh && echo "deploy OK"']
  }));
}

module.exports = {
  entry: './src/script.js',
  output: { path: __dirname, filename: 'bundle.js' },
  devtool: (process.env.NODE_ENV !== "production")?"inline-sourcemap" : null,
  plugins:PluginSets,
  module: {
    loaders: [
      {

        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.json$/, loader: 'json' },
    ]
  },
};

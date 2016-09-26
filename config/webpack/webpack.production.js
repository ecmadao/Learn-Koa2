const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = module.exports = require('./webpack.main.js');

config.output.filename = "[name].bundle.[hash].js";
config.plugins.push(
  new ExtractTextPlugin("[name].bundle.[hash].css", {
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: 'common.bundle.[hash].js',
    minChunks: 5
  })
);

config.debug = false;
config.devtool = "cheap-source-map";

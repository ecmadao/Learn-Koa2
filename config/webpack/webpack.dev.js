const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = module.exports = require('./webpack.main.js');

config.plugins.push(
  new ExtractTextPlugin("[name].bundle.css", {
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: 'common.bundle.js',
    minChunks: 5
  })
);

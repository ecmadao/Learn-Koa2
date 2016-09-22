const webpack = require("webpack");
const path = require("path");
const PATH = require("./build_path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const postcssReporter = require("postcss-reporter");

module.exports = {
  context: PATH.ROOT_PATH,
  entry: {
    index: './app/frontend/javascripts/entry/index.js'
  },
  output: {
    path: PATH.BUILD_PATH,
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {test: require.resolve("jquery"), loader: "expose?jQuery"},
      {test: require.resolve("jquery"), loader: "expose?$"},
      // {test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less")},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: ["babel-loader"],
        query: {
          presets: ["es2015", "react"]
        }
      },
      // image & font
      {test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: "url-loader?limit=8192&name=[name].[ext]"},
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?limit=8192&name=[name].[ext]"}
    ]
  },
  postcss: function() {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      cssnext({autoprefixer: {browsers: "ie >= 9, ..."}}),
      postcssReporter({clearMessages: true})
    ];
  },
  plugins: [
    new ExtractTextPlugin("[name].bundle.css", {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: "cheap-module-eval-source-map",
}

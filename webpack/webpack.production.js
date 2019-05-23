const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const common = require("./webpack.common");

module.exports = () => {
  const { ENV_VARIABLE = `A value from process.env` } = process.env;
  return merge(common, {
    devtool: "source-map",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "../dist/js"),
      filename: "[name].[chunkhash].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: true
        })
      ]
    },
    stats: {
      errors: true,
      errorDetails: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "../index.html",
        ENV_VARIABLE
      })
    ]
  });
};

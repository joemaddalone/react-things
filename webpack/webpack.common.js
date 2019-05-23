const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				parser: {
					amd: false
				}
			}
		]
	},
	resolve: {
		extensions: ['.js']
	},
	plugins: [
		new CaseSensitivePathsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({ options: {} }),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};


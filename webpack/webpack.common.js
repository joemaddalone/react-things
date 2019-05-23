const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true
						}
					},
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: loader => [
							  require( 'postcss-import' )( {
								  root: loader.resourcePath,
							  } ),
							  require( 'postcss-preset-env' )( {
								  stage: 0,
								  nesting: true
							  } ),
							  require( 'autoprefixer' )(),
							  require( 'cssnano' )( {
								  autoprefixer: false
							  } ),
							  require( 'postcss-flexbugs-fixes' )()
						  ],
						},
					},
				]
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


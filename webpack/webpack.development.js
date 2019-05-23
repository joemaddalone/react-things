const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const publicPath = "/";

module.exports = () => {
	const port = 9999;
	const { ENV_VARIABLE = `A value from process.env` } = process.env;

	return merge(common, {
		devtool: "inline-source-map",
		mode: "development",
		output: {
			path: path.join(__dirname, publicPath),
			publicPath,
			filename: "[name].js"
		},
		devServer: {
			publicPath,
			hot: true,
			inline: true,
			historyApiFallback: {
				disableDotRule: true,
				index: `${publicPath}index.html`
			},
			port
		},
		resolve: {
			alias: {
				"react-dom": "@hot-loader/react-dom"
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: path.resolve(__dirname, `.${publicPath}index.html`),
				ENV_VARIABLE
			}),
			new webpack.NamedModulesPlugin()
		]
	});
};

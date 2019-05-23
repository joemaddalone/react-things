const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prod = require("./webpack.production");

module.exports = () => {
	return merge(prod(), {
		mode: 'production',
		plugins: [
			new BundleAnalyzerPlugin()
		]
	});
};

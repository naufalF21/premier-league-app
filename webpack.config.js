const webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	workboxPlugin = require('workbox-webpack-plugin'),
	WebpackPWAManifest = require('webpack-pwa-manifest');

module.exports = {
	entry: {
		main: './src/index.js',
		profile: './src/profile.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
				},
			},
			/* rules global style */
			{
				test: /\.css$/,
				include: [/node_modules/, /styles/],
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				include: [/src/],
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['main'],
		}),
		new HtmlWebpackPlugin({
			template: './src/profile.html',
			filename: 'profile.html',
			chunks: ['profile'],
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new workboxPlugin.InjectManifest({
			swSrc: './src/sw.js',
			swDest: 'sw.js',
		}),
	],
};

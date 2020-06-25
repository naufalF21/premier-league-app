const webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	workboxPlugin = require('workbox-webpack-plugin'),
	WebpackPWAManifest = require('webpack-pwa-manifest'),
	FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
		new WebpackPWAManifest({
			gcm_sender_id: '47967080645',
			name: 'Premier League App',
			short_name: 'PL App',
			lang: 'en-US',
			start_url: '/',
			display: 'standalone',
			theme_color: '#38003C',
			background_color: '#FFF',
			icons: [
				{
					src: path.resolve('./src/assets/icon/icon.png'),
					size: [96, 128, 192, 256, 384, 512],
				},
			],
		}),
		new FaviconsWebpackPlugin('./src/assets/icon/icon.png'),
		new workboxPlugin.InjectManifest({
			swSrc: './src/sw.js',
			swDest: 'sw.js',
		}),
	],
};

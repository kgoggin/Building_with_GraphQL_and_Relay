var webpack = require('webpack');

module.exports = {
	context: __dirname + '/source',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./js/index.js'
	],
	output: {
		path: __dirname + '/build/js',
		filename: 'bundle.js',
		publicPath: '/js'
	},
	devServer: {
		contentBase: './build/js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
		]
	}
}

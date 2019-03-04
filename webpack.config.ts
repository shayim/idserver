const path = require('path')
const NodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.ts/,
			use: ['ts-loader']
		}]
	},
	plugins: [
		new NodemonPlugin()
	],
	externals: [
		new NodeExternals()
	],
	resolve: {
		extensions: ['.ts', '.js']
	},
	mode: 'development',
	target: 'node',
	watch: true
}

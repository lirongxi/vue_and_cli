'use strict';

//引入路径插件
const path = require('path');

//引入模板渲染插件
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//指定入口
	entry: {
		main: './main.js'
	},
	//指定出口
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'build.js'
	},
	module: {
		//对应文件加载器
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader!autoprefixer-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
		}, {
			test: /\.(jpg|ttf|svg|png)$/,
			loader: 'url-loader?limit=4096'
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/, //排除路径
			//更为推荐的方式是在。bablerc文件中配置以下设置
			options: { //将es6代码转换成浏览器都支持的es5代码
				presets: ['es2015'],
				plugins: ['transform-runtime']
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html'
		})
	]
};
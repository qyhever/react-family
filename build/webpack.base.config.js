const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
// 启动多核构建
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre', // 保证在 babel-loader 之前处理
  include: [resolve('src')],
  options: {
     formatter: require('eslint-friendly-formatter')
  }
})

module.exports = {
	resolve: {
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ['babel-loader?cacheDirectory=true']
        use: ['happypack/loader?id=happy-babel-js']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
		]
	},
	plugins: [
		new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('public/dll/mainfist.json')
    })
	]
}
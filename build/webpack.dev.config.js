const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// hash 整个项目有文件更改就会更新
// chunkhash 根据入口文件、依赖关系构建对应的 chunk
// contenthash 针对文件内容级别

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    app: ['@babel/polyfill', resolve('src/index.js')]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  devtool: config.dev.devtool,
  devServer: {
    publicPath: config.dev.assetsPublicPath,
    clientLogLevel: 'warning',
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    hot: true,
    inline: true,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 终端只输出初始启动信息。来自 webpack 的错误或警告在终端不可见。
    quiet: true,
    historyApiFallback: true,
    // 使用文件系统(file system)获取文件改动的通知
    watchOptions: {
      poll: 2000, // 每2秒检查一次文件变动
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        exclude: /src/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      templateParameters: {
        PUBLIC_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 在热加载时直接返回更新文件名，而不是文件的id。
    new webpack.NamedModulesPlugin() // HMR shows correct file names in console on update.
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

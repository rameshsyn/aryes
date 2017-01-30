const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join, resolve } = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const config = {
  devtool: env === 'production' ? 'source-map' : 'eval',
  context: resolve(__dirname, 'client'),
  entry: {
    main: env === 'production' ? [
      'babel-polyfill',
      './scripts'
    ] : [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './scripts'
    ],
    style: './styles/style.scss'
  },
  output: {
    path: join(__dirname, 'build'),
    filename: 'scripts/[name].js',
    publicPath: '/static'
  },
  resolve: {
    extensions: [
      '',
      '.scss',
      '.css',
      '.js',
      '.jsx'
    ],
    modules: [
      'client',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: env === 'production' ? [
          'babel-loader'
        ] : [
          'react-hot-loader/webpack',
          'babel-loader'
        ]
      }, {
        test: /(\.s?css)$/,
        loader: env === 'production' ? ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader') : ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader')
      }, {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'file-loader?name=/assets/images/[name].[ext]'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=/assets/fonts/[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: env === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false
    }),
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify(env)
    } })
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('scripts/commons.js'),
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify(env)
    } })
  ]
}

module.exports = config

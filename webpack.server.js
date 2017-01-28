const { resolve, join } = require('path');
const webpack = require('webpack');
const ExternalsPlugin = require('webpack-externals-plugin');

const config = {
  entry: [
    './server',
  ],
  output: {
    path: join(__dirname, 'build'),
    filename: 'scripts/server.bundle.js',
    publicPath: '/static/',
  },
  devtool: 'source-map',
  target: 'async-node',
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
    modules: [
      './server',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, 'server'),
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|sass|scss|less)$/),
    new ExternalsPlugin({
      type: 'commonjs',
      include: join(__dirname, '/node_modules/'),
    }),
  ],
};

module.exports = config;

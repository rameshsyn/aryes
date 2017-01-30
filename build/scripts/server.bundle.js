/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
  /******/ 	var installedModules = {}
/******/
/******/ 	// The require function
  /******/ 	function __webpack_require__ (moduleId) {
/******/
/******/ 		// Check if module is in cache
    /******/ 		if (installedModules[moduleId])
    /******/ 			{
      return installedModules[moduleId].exports
    }
/******/
/******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			exports: {},
      /******/ 			id: moduleId,
      /******/ 			loaded: false
    /******/ 		}
/******/
/******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
/******/
/******/ 		// Flag the module as loaded
    /******/ 		module.loaded = true
/******/
/******/ 		// Return the exports of the module
    /******/ 		return module.exports
  /******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules
/******/
/******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules
/******/
/******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = '/static/'
/******/
/******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(0)
/******/ })([
/* 0 */
  /***/ function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1)

/***/
  },
/* 1 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (__dirname) {
      'use strict'

      var _express = __webpack_require__(2)

      var _express2 = _interopRequireDefault(_express)

      var _bodyParser = __webpack_require__(3)

      var _bodyParser2 = _interopRequireDefault(_bodyParser)

      var _expressReactViews = __webpack_require__(4)

      var _expressReactViews2 = _interopRequireDefault(_expressReactViews)

      var _morgan = __webpack_require__(5)

      var _morgan2 = _interopRequireDefault(_morgan)

      var _path = __webpack_require__(6)

      var _controllers = __webpack_require__(7)

      var _controllers2 = _interopRequireDefault(_controllers)

      function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

	// import compression from 'compression';
      var app = (0, _express2.default)()
      var port = process.env.PORT || 4000

	// Development Mode

      if (process.env.NODE_ENV === 'development') {
	  // Webpack Hot reload
	  var webpack = __webpack_require__(8)
	  var webpackConfig = __webpack_require__(9)
	  var webpackDevMiddleware = __webpack_require__(11)
	  var webpackHotMiddleware = __webpack_require__(12)
	  var compiler = webpack(webpackConfig)
	  app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath,
	    stats: {
	      colors: true
	    }
	  }))
	  app.use(webpackHotMiddleware(compiler))

	  // Logger
	  app.use((0, _morgan2.default)('dev'))
      }

	// View Engine setup

      app.set('views', (0, _path.join)(__dirname, 'views'))
      app.set('view engine', 'jsx')
      app.engine('jsx', _expressReactViews2.default.createEngine({
	  beautify: process.env.NODE_ENV === 'development',
	  babel: {
	    presets: ['es2015', 'stage-3', 'react'],
	    plugins: [['transform-runtime'], ['transform-class-properties', { spec: true }], ['transform-es2015-classes']]
	  }
      }))

	// Middlewares

	// app.use(compression({ level: 9, threshold: 0, filter: () => true }));
      app.use(_bodyParser2.default.json({ limit: '1mb' }))
      app.use(_bodyParser2.default.urlencoded({ limit: '1mb', extended: false }))
      app.use('/static', _express2.default.static('./build'))

	// Routes

      app.use('*', _controllers2.default)

	// Server Listening ...
      app.listen(port, function (err) {
	  if (err) throw err
	  console.log('App is running at http://localhost:' + port)
      })
    /* WEBPACK VAR INJECTION */ }.call(exports, 'server'))

/***/
  },
/* 2 */
  /***/ function (module, exports) {
    module.exports = require('express')

/***/
  },
/* 3 */
  /***/ function (module, exports) {
    module.exports = require('body-parser')

/***/
  },
/* 4 */
  /***/ function (module, exports) {
    module.exports = require('express-react-views')

/***/
  },
/* 5 */
  /***/ function (module, exports) {
    module.exports = require('morgan')

/***/
  },
/* 6 */
  /***/ function (module, exports) {
    module.exports = require('path')

/***/
  },
/* 7 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
	  value: true
    })

    var _express = __webpack_require__(2)

    var router = (0, _express.Router)()

    router.get('/', function (req, res) {
	  return res.render('index', {
	    title: 'Aryes | An Educational Institution management system',
	    description: ''
	  })
    })

    exports.default = router

/***/
  },
/* 8 */
  /***/ function (module, exports) {
    module.exports = require('webpack')

/***/
  },
/* 9 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (__dirname) {
      const ExtractTextPlugin = __webpack_require__(10)
      const { join, resolve } = __webpack_require__(6)
      const webpack = __webpack_require__(8)

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

  /* WEBPACK VAR INJECTION */
    }.call(exports, ''))

/***/
  },
/* 10 */
  /***/ function (module, exports) {
    module.exports = require('extract-text-webpack-plugin')

/***/
  },
/* 11 */
  /***/ function (module, exports) {
    module.exports = require('webpack-dev-middleware')

/***/
  },
/* 12 */
  /***/ function (module, exports) {
    module.exports = require('webpack-hot-middleware')

/***/
  }
/******/ ])
// # sourceMappingURL=server.bundle.js.map

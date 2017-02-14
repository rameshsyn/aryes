/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _express = __webpack_require__(2);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(3);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _compression = __webpack_require__(4);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _expressReactViews = __webpack_require__(5);
	
	var _expressReactViews2 = _interopRequireDefault(_expressReactViews);
	
	var _morgan = __webpack_require__(6);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _path = __webpack_require__(7);
	
	var _controllers = __webpack_require__(8);
	
	var _controllers2 = _interopRequireDefault(_controllers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _express2.default)();
	var port = process.env.PORT || 4000;
	
	// Development Mode
	
	if (process.env.NODE_ENV === 'development') {
	  // Webpack Hot reload
	  var webpack = __webpack_require__(29);
	  var webpackConfig = __webpack_require__(30);
	  var webpackDevMiddleware = __webpack_require__(32);
	  var webpackHotMiddleware = __webpack_require__(33);
	  var compiler = webpack(webpackConfig);
	  app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath,
	    stats: {
	      colors: true
	    }
	  }));
	  app.use(webpackHotMiddleware(compiler));
	
	  // Logger
	  app.use((0, _morgan2.default)('dev'));
	}
	
	// View Engine setup
	
	app.set('views', (0, _path.join)(__dirname, 'views'));
	app.set('view engine', 'jsx');
	app.engine('jsx', _expressReactViews2.default.createEngine({
	  beautify: process.env.NODE_ENV === 'development',
	  babel: {
	    presets: ['es2015', 'stage-3', 'react'],
	    plugins: [['transform-runtime'], ['transform-class-properties', { spec: true }], ['transform-es2015-classes']]
	  }
	}));
	
	// Middlewares
	
	app.use((0, _compression2.default)({ level: 9, threshold: 0, filter: function filter() {
	    return true;
	  } }));
	app.use(_bodyParser2.default.json({ limit: '1mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '1mb', extended: false }));
	app.use('/static', _express2.default.static('./build'));
	
	// Routes
	
	app.use('/', _controllers2.default);
	
	// Server Listening ...
	app.listen(port, function (err) {
	  if (err) throw err;
	  console.log('App is running at http://localhost:' + port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-react-views");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(2);
	
	var _expressGraphql = __webpack_require__(9);
	
	var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
	
	var _graphql = __webpack_require__(10);
	
	var _graphql2 = _interopRequireDefault(_graphql);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = (0, _express.Router)();
	
	router.use('/graphql', (0, _expressGraphql2.default)({
	  schema: _graphql2.default,
	  graphiql: process.env.NODE_ENV === 'development'
	}));
	
	router.get('*', function (req, res) {
	  return res.render('index', {
	    title: 'Aryes | Educational Institution management system',
	    description: ''
	  });
	});
	
	exports.default = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(11);
	
	var _queries = __webpack_require__(12);
	
	var _queries2 = _interopRequireDefault(_queries);
	
	var _mutations = __webpack_require__(28);
	
	var _mutations2 = _interopRequireDefault(_mutations);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Get all graphQL Query types
	exports.default = new _graphql.GraphQLSchema({
	  query: new _graphql.GraphQLObjectType({
	    name: 'RootQuery',
	    description: 'A root query',
	    fields: _queries2.default
	  })
	});
	
	// Get all graphQL mutation types

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(13);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _session_query = __webpack_require__(14);
	
	var _session_query2 = _interopRequireDefault(_session_query);
	
	var _types = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Send types to query types
	// Get particular query types
	var SessionQuery = (0, _session_query2.default)(_types.SessionType);
	
	// Make available all the query types a single object
	
	
	// Get types
	exports.default = (0, _extends3.default)({}, SessionQuery);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (sessionType) {
	  return {
	    session: {
	      type: sessionType,
	      resolve: function resolve() {
	        return _models.Session.findOne({ 'instructor': 'ramesh' }, function (err, session) {
	          if (err) throw err;
	          return {
	            time: session.time,
	            instructor: session.instructor
	          };
	        });
	      }
	    }
	  };
	};
	
	var _models = __webpack_require__(15);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Admin = exports.Institution = exports.Service = exports.Offer = exports.Staff = exports.Room = exports.Inquiry = exports.Session = exports.Student = undefined;
	
	var _mongoose = __webpack_require__(16);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _student = __webpack_require__(17);
	
	var _student2 = _interopRequireDefault(_student);
	
	var _session = __webpack_require__(18);
	
	var _session2 = _interopRequireDefault(_session);
	
	var _inquiry = __webpack_require__(19);
	
	var _inquiry2 = _interopRequireDefault(_inquiry);
	
	var _room = __webpack_require__(20);
	
	var _room2 = _interopRequireDefault(_room);
	
	var _staff = __webpack_require__(21);
	
	var _staff2 = _interopRequireDefault(_staff);
	
	var _offer = __webpack_require__(22);
	
	var _offer2 = _interopRequireDefault(_offer);
	
	var _service_info = __webpack_require__(23);
	
	var _service_info2 = _interopRequireDefault(_service_info);
	
	var _institution_info = __webpack_require__(24);
	
	var _institution_info2 = _interopRequireDefault(_institution_info);
	
	var _admin = __webpack_require__(25);
	
	var _admin2 = _interopRequireDefault(_admin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_mongoose2.default.connect('mongodb://localhost:27017/aryes');
	
	// use native promises
	_mongoose2.default.Promise = global.Promise;
	var Student = (0, _student2.default)(_mongoose2.default);
	var Session = (0, _session2.default)(_mongoose2.default);
	var Inquiry = (0, _inquiry2.default)(_mongoose2.default);
	var Room = (0, _room2.default)(_mongoose2.default);
	var Staff = (0, _staff2.default)(_mongoose2.default);
	var Offer = (0, _offer2.default)(_mongoose2.default);
	var Service = (0, _service_info2.default)(_mongoose2.default);
	var Institution = (0, _institution_info2.default)(_mongoose2.default);
	var Admin = (0, _admin2.default)(_mongoose2.default);
	
	// new Institution({
	//   name: 'fdsf',
	//   contact: [{
	//     email: 'exa@fjk.com',
	//     phone: '5435345',
	//     social_links: ['aryes']
	//   }],
	//   location: 'bhaktapur'
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Service({
	//   category: 'tuition',
	//   services: [{
	//     id: 'ff',
	//     name: 'class 10',
	//     description: 'jfkjdlsjfkjdkljf',
	//     cost: 600,
	//     category: 'tuition'
	//   }]
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Offer({
	//   name: 'initial payment',
	//   discount: 25
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Staff({
	//   name: 'ramesh',
	//   contact: '6454645465',
	//   salary: [{
	//     service_id: '4343',
	//     amount: 45454
	//   }],
	//   position: 'teacher'
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Room({
	//   name: 'nice room'
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Inquiry({
	//   name: 'ramesh',
	//   address: 'nepal',
	//   academic_level: 'bachelor',
	//   services: [],
	//   available_time: ['5-8'],
	//   contact: '44545454545',
	//   remarks: 'fixed'
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Session({
	//   time: '5-7',
	//   instructor: 'ramesh',
	//   active_rooms: [{
	//     room_id: 'id1',
	//     service_id: 'id3'
	//   }]
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	// new Student({
	//   basic_info: {
	//     name: 'ramesh syangtan',
	//     address: 'bhaktapur',
	//     school_name: 'sanothimi',
	//     academic_level: 'bachelor'
	//   },
	//   contact_info: {
	//     phone_num: '9843578426',
	//     email: 'rameshsyangtan92@gmail.com'
	//   },
	//   enrollment_info: {
	//     date: Date.now(),
	//     services: [],
	//     sessions: [],
	//     rooms: []
	//   },
	//   payment_info: {
	//     done: true,
	//     installments: [{
	//       date: Date.now(),
	//       amount: 1200
	//     }],
	//     offers: [],
	//     discount: 0
	//   }
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	// })
	
	exports.Student = Student;
	exports.Session = Session;
	exports.Inquiry = Inquiry;
	exports.Room = Room;
	exports.Staff = Staff;
	exports.Offer = Offer;
	exports.Service = Service;
	exports.Institution = Institution;
	exports.Admin = Admin;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var StudentSchema = new Schema({
	    basic_info: {
	      name: {
	        type: String,
	        required: true
	      },
	      address: String,
	      school_name: String,
	      academic_level: String
	    },
	    contact_info: {
	      phone_num: {
	        type: String,
	        required: true
	      },
	      email: String
	    },
	    enrollment_info: {
	      date: {
	        type: Date,
	        required: true
	      },
	      services: [{
	        service_id: String
	      }],
	      sessions: [{
	        session_id: String
	      }],
	      rooms: [{
	        room_id: String
	      }]
	    },
	    payment_info: {
	      done: Boolean,
	      installments: [{
	        date: Date,
	        amount: Number
	      }],
	      offers: [String],
	      discount: Number
	    }
	  });
	  return mongoose.model('student', StudentSchema);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var SessionSchema = new Schema({
	    time: String,
	    instructor: String,
	    active_rooms: [{
	      room_id: String,
	      service_id: String
	    }]
	  });
	  return mongoose.model('session', SessionSchema);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var InquirySchema = new Schema({
	    name: String,
	    address: String,
	    academic_level: String,
	    services: Array,
	    available_time: [String],
	    contact: String,
	    remarks: String
	  });
	  return mongoose.model('inquiry', InquirySchema);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var RoomSchema = new Schema({
	    name: String
	  });
	  return mongoose.model('room', RoomSchema);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var StaffSchema = new Schema({
	    name: String,
	    contact: String,
	    salary: [{
	      service_id: String,
	      amount: Number
	    }],
	    position: String
	  });
	  return mongoose.model('staff', StaffSchema);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var OfferSchema = new Schema({
	    name: String,
	    discount: Number
	  });
	  return mongoose.model('offer', OfferSchema);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var ServiceSchema = new Schema({
	    category: String,
	    services: [{
	      id: String,
	      name: String,
	      description: String,
	      cost: Number,
	      category: String
	    }]
	  });
	  return mongoose.model('service', ServiceSchema);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var InstitutionSchema = new Schema({
	    name: String,
	    contact: [{
	      email: String,
	      phone: String,
	      social_links: [String]
	    }],
	    location: String
	  });
	  return mongoose.model('institution', InstitutionSchema);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var AdminSchema = new Schema({
	    name: String,
	    username: String,
	    email: String,
	    password: String,
	    preferences: Array
	  });
	  return mongoose.model('admin', AdminSchema);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(11);
	
	var _session_type = __webpack_require__(27);
	
	var _session_type2 = _interopRequireDefault(_session_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// hold all imports
	var types = {
	  GraphQLObjectType: _graphql.GraphQLObjectType,
	  GraphQLString: _graphql.GraphQLString,
	  GraphQLID: _graphql.GraphQLID,
	  GraphQLInt: _graphql.GraphQLInt,
	  GraphQLBoolean: _graphql.GraphQLBoolean,
	  GraphQLList: _graphql.GraphQLList,
	  GraphQLNonNull: _graphql.GraphQLNonNull
	};
	
	// pass all imports as object (type)
	
	
	// Get types
	var SessionType = (0, _session_type2.default)(types);
	
	// make available all the types
	exports.default = {
	  SessionType: SessionType
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var GraphQLObjectType = _ref.GraphQLObjectType,
	      GraphQLString = _ref.GraphQLString;
	
	  return new GraphQLObjectType({
	    name: 'Session',
	    description: 'A session list',
	    fields: {
	      time: {
	        type: GraphQLString,
	        description: 'A session time period'
	      },
	      instructor: {
	        type: GraphQLString,
	        description: 'An instructor for a session'
	      }
	    }
	  });
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// Mutations
	"use strict";

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {const ExtractTextPlugin = __webpack_require__(31)
	const { join, resolve } = __webpack_require__(7)
	const webpack = __webpack_require__(29)
	
	const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
	
	const config = {
	  devtool: env === 'production' ? 'source-map' : 'inline-source-map',
	  context: resolve(__dirname, 'client'),
	  entry: {
	    main: env === 'production' ? [
	      'babel-polyfill',
	      './'
	    ] : [
	      'babel-polyfill',
	      'webpack-hot-middleware/client',
	      './'
	    ]
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
	    ],
	    alias: {
	      animate: resolve(__dirname, 'node_modules/animate.css/animate.css'),
	      fontAwesome: resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.css')
	    }
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
	        loader: env === 'production' ? ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader') : 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
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
	    new webpack.DefinePlugin({ 'process.env': {
	      NODE_ENV: JSON.stringify(env)
	    } })
	  ]
	}
	
	module.exports = config
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map
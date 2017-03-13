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
	  var webpack = __webpack_require__(67);
	  var webpackConfig = __webpack_require__(68);
	  var webpackDevMiddleware = __webpack_require__(70);
	  var webpackHotMiddleware = __webpack_require__(71);
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
	
	var _extends2 = __webpack_require__(11);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _graphql = __webpack_require__(12);
	
	var _institution_info_query = __webpack_require__(13);
	
	var _institution_info_query2 = _interopRequireDefault(_institution_info_query);
	
	var _offer_query = __webpack_require__(32);
	
	var _offer_query2 = _interopRequireDefault(_offer_query);
	
	var _session_query = __webpack_require__(34);
	
	var _session_query2 = _interopRequireDefault(_session_query);
	
	var _product_query = __webpack_require__(41);
	
	var _product_query2 = _interopRequireDefault(_product_query);
	
	var _student_query = __webpack_require__(42);
	
	var _student_query2 = _interopRequireDefault(_student_query);
	
	var _room_query = __webpack_require__(45);
	
	var _room_query2 = _interopRequireDefault(_room_query);
	
	var _staff_query = __webpack_require__(46);
	
	var _staff_query2 = _interopRequireDefault(_staff_query);
	
	var _service_category_query = __webpack_require__(47);
	
	var _service_category_query2 = _interopRequireDefault(_service_category_query);
	
	var _position_query = __webpack_require__(48);
	
	var _position_query2 = _interopRequireDefault(_position_query);
	
	var _expenditure_types_query = __webpack_require__(49);
	
	var _expenditure_types_query2 = _interopRequireDefault(_expenditure_types_query);
	
	var _inquiry_query = __webpack_require__(51);
	
	var _inquiry_query2 = _interopRequireDefault(_inquiry_query);
	
	var _expenditure_query = __webpack_require__(53);
	
	var _expenditure_query2 = _interopRequireDefault(_expenditure_query);
	
	var _offer_mutation = __webpack_require__(55);
	
	var _offer_mutation2 = _interopRequireDefault(_offer_mutation);
	
	var _institution_info_mutation = __webpack_require__(56);
	
	var _institution_info_mutation2 = _interopRequireDefault(_institution_info_mutation);
	
	var _service_category_mutation = __webpack_require__(57);
	
	var _service_category_mutation2 = _interopRequireDefault(_service_category_mutation);
	
	var _product_mutation = __webpack_require__(58);
	
	var _product_mutation2 = _interopRequireDefault(_product_mutation);
	
	var _room_mutation = __webpack_require__(59);
	
	var _room_mutation2 = _interopRequireDefault(_room_mutation);
	
	var _staff_mutation = __webpack_require__(60);
	
	var _staff_mutation2 = _interopRequireDefault(_staff_mutation);
	
	var _session_mutation = __webpack_require__(61);
	
	var _session_mutation2 = _interopRequireDefault(_session_mutation);
	
	var _student_mutation = __webpack_require__(62);
	
	var _student_mutation2 = _interopRequireDefault(_student_mutation);
	
	var _position_mutation = __webpack_require__(63);
	
	var _position_mutation2 = _interopRequireDefault(_position_mutation);
	
	var _expenditure_types_mutation = __webpack_require__(64);
	
	var _expenditure_types_mutation2 = _interopRequireDefault(_expenditure_types_mutation);
	
	var _inquiry_mutation = __webpack_require__(65);
	
	var _inquiry_mutation2 = _interopRequireDefault(_inquiry_mutation);
	
	var _expenditure_mutation = __webpack_require__(66);
	
	var _expenditure_mutation2 = _interopRequireDefault(_expenditure_mutation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Get all graphQL mutation types
	
	
	// Get all graphQL Query types
	exports.default = new _graphql.GraphQLSchema({
	  query: new _graphql.GraphQLObjectType({
	    name: 'RootQuery',
	    description: 'A root query',
	    fields: (0, _extends3.default)({}, _session_query2.default, _institution_info_query2.default, _offer_query2.default, _product_query2.default, _student_query2.default, _room_query2.default, _staff_query2.default, _service_category_query2.default, _position_query2.default, _expenditure_types_query2.default, _inquiry_query2.default, _expenditure_query2.default)
	  }),
	  mutation: new _graphql.GraphQLObjectType({
	    name: 'RootMutation',
	    description: 'A root mutation',
	    fields: (0, _extends3.default)({}, _offer_mutation2.default, _institution_info_mutation2.default, _service_category_mutation2.default, _product_mutation2.default, _room_mutation2.default, _staff_mutation2.default, _session_mutation2.default, _student_mutation2.default, _position_mutation2.default, _expenditure_types_mutation2.default, _inquiry_mutation2.default, _expenditure_mutation2.default)
	  })
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _institution_info_type = __webpack_require__(31);
	
	var _institution_info_type2 = _interopRequireDefault(_institution_info_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  institution_info: {
	    type: _institution_info_type2.default,
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Institution.findOne({}, function (err, institution) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(institution);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Expenditure = exports.ExpenditureTypes = exports.Position = exports.ServiceCat = exports.Admin = exports.Institution = exports.Product = exports.Offer = exports.Staff = exports.Room = exports.Inquiry = exports.Session = exports.Student = undefined;
	
	var _mongoose = __webpack_require__(16);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _index = __webpack_require__(17);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _student_model = __webpack_require__(18);
	
	var _student_model2 = _interopRequireDefault(_student_model);
	
	var _session_model = __webpack_require__(19);
	
	var _session_model2 = _interopRequireDefault(_session_model);
	
	var _inquiry_model = __webpack_require__(20);
	
	var _inquiry_model2 = _interopRequireDefault(_inquiry_model);
	
	var _staff_model = __webpack_require__(21);
	
	var _staff_model2 = _interopRequireDefault(_staff_model);
	
	var _product_model = __webpack_require__(22);
	
	var _product_model2 = _interopRequireDefault(_product_model);
	
	var _admin_model = __webpack_require__(23);
	
	var _admin_model2 = _interopRequireDefault(_admin_model);
	
	var _institution_info_model = __webpack_require__(24);
	
	var _institution_info_model2 = _interopRequireDefault(_institution_info_model);
	
	var _service_category_model = __webpack_require__(25);
	
	var _service_category_model2 = _interopRequireDefault(_service_category_model);
	
	var _position_model = __webpack_require__(26);
	
	var _position_model2 = _interopRequireDefault(_position_model);
	
	var _room_model = __webpack_require__(27);
	
	var _room_model2 = _interopRequireDefault(_room_model);
	
	var _offer_model = __webpack_require__(28);
	
	var _offer_model2 = _interopRequireDefault(_offer_model);
	
	var _expenditure_types_model = __webpack_require__(29);
	
	var _expenditure_types_model2 = _interopRequireDefault(_expenditure_types_model);
	
	var _expenditure_model = __webpack_require__(30);
	
	var _expenditure_model2 = _interopRequireDefault(_expenditure_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// MongoDB connection
	
	
	// Configuration
	_mongoose2.default.connect('mongodb://test:test@ds129050.mlab.com:29050/aryes-test');
	
	// Use native promises
	
	
	// mongoose schemas
	_mongoose2.default.Promise = global.Promise;
	
	// Pass mongoose to all schemas
	var Student = (0, _student_model2.default)(_mongoose2.default);
	var Session = (0, _session_model2.default)(_mongoose2.default);
	var Inquiry = (0, _inquiry_model2.default)(_mongoose2.default);
	var Room = (0, _room_model2.default)(_mongoose2.default);
	var Staff = (0, _staff_model2.default)(_mongoose2.default);
	var Offer = (0, _offer_model2.default)(_mongoose2.default);
	var Product = (0, _product_model2.default)(_mongoose2.default);
	var Institution = (0, _institution_info_model2.default)(_mongoose2.default);
	var Admin = (0, _admin_model2.default)(_mongoose2.default);
	var ServiceCat = (0, _service_category_model2.default)(_mongoose2.default);
	var Position = (0, _position_model2.default)(_mongoose2.default);
	var ExpenditureTypes = (0, _expenditure_types_model2.default)(_mongoose2.default);
	var Expenditure = (0, _expenditure_model2.default)(_mongoose2.default);
	
	exports.Student = Student;
	exports.Session = Session;
	exports.Inquiry = Inquiry;
	exports.Room = Room;
	exports.Staff = Staff;
	exports.Offer = Offer;
	exports.Product = Product;
	exports.Institution = Institution;
	exports.Admin = Admin;
	exports.ServiceCat = ServiceCat;
	exports.Position = Position;
	exports.ExpenditureTypes = ExpenditureTypes;
	exports.Expenditure = Expenditure;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
		"db": {
			"name": "aryes"
		}
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
	  var StudentSchema = new Schema({
	    basic_info: {
	      name: {
	        type: String
	      },
	      address: String,
	      school: String,
	      academic_level: String
	    },
	    contact_info: {
	      phone: {
	        type: String
	      },
	      email: String
	    },
	    enrollment_info: {
	      date: {
	        type: Date
	      },
	      products: [{
	        type: Schema.Types.ObjectId,
	        ref: 'product'
	      }],
	      sessions: [{
	        type: Schema.Types.ObjectId,
	        ref: 'session'
	      }]
	    },
	    payment_info: {
	      done: Boolean,
	      installments: [{
	        date: Date,
	        amount: Number
	      }],
	      offers: [{
	        type: Schema.Types.ObjectId,
	        ref: 'offer'
	      }],
	      discount: Number
	    }
	  });
	  return mongoose.model('student', StudentSchema);
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
	  var SessionSchema = new Schema({
	    name: {
	      type: String,
	      required: true
	    },
	    timePeriod: {
	      type: String,
	      required: true
	    },
	    product: {
	      type: Schema.Types.ObjectId,
	      ref: 'product',
	      required: true
	    },
	    instructor: {
	      type: Schema.Types.ObjectId,
	      ref: 'staff',
	      required: true
	    },
	    room: {
	      type: Schema.Types.ObjectId,
	      ref: 'room',
	      required: true
	    },
	    students: [{
	      type: Schema.Types.ObjectId,
	      ref: 'student'
	    }],
	    active: Boolean
	  });
	  return mongoose.model('session', SessionSchema);
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
	  var InquirySchema = new Schema({
	    name: String,
	    date: Date,
	    academic_level: String,
	    services: [{
	      type: Schema.Types.ObjectId,
	      ref: 'product'
	    }],
	    available_time: [String],
	    contact: String,
	    status: {
	      fixed: Boolean,
	      informed: Number
	    }
	  });
	  return mongoose.model('inquiry', InquirySchema);
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
	      product_id: {
	        type: Schema.Types.ObjectId,
	        ref: 'product'
	      },
	      date: Date,
	      amount: Number
	    }],
	    position: [{
	      type: Schema.Types.ObjectId,
	      ref: 'position'
	    }]
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
	  var ServiceSchema = new Schema({
	    name: {
	      type: String,
	      required: true
	    },
	    description: String,
	    cost: {
	      type: Number,
	      required: true
	    },
	    category: {
	      type: Schema.Types.ObjectId,
	      ref: 'servicecat',
	      required: true
	    },
	    date_created: {
	      type: Date,
	      required: true
	    }
	  });
	  return mongoose.model('product', ServiceSchema);
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
	    contact: {
	      email: String,
	      phone: String
	    },
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
	  var ServiceCatSchema = new Schema({
	    name: String,
	    label: String,
	    description: String
	  });
	  return mongoose.model('servicecat', ServiceCatSchema);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var PositionSchema = new Schema({
	    name: String,
	    description: String
	  });
	  return mongoose.model('position', PositionSchema);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var RoomSchema = new Schema({
	    name: String,
	    studentComp: Number
	  });
	  return mongoose.model('room', RoomSchema);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var OfferSchema = new Schema({
	    code: {
	      type: String,
	      required: true
	    },
	    description: String,
	    discount: {
	      type: Number,
	      required: true
	    },
	    date_created: Date,
	    active: Boolean
	  });
	  return mongoose.model('offer', OfferSchema);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var ExpenditureTypeSchema = new Schema({
	    name: String,
	    label: String
	  });
	  return mongoose.model('expendituretype', ExpenditureTypeSchema);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (mongoose) {
	  var Schema = mongoose.Schema;
	  var ExpenditureSchema = new Schema({
	    date: Date,
	    type: {
	      type: Schema.Types.ObjectId,
	      ref: 'expendituretype'
	    },
	    purpose: String,
	    amount: Number,
	    by: String
	  });
	  return mongoose.model('expenditure', ExpenditureSchema);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'institution_info',
	  description: 'Institution Information',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString,
	      description: 'Unique id'
	    },
	    name: {
	      type: _graphql.GraphQLString,
	      description: 'A name of an institution'
	    },
	    location: {
	      type: _graphql.GraphQLString,
	      description: 'Location of an institution'
	    },
	    contact: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'institution_contact_info',
	        description: 'Contact Information',
	        fields: {
	          phone: {
	            type: _graphql.GraphQLString,
	            description: 'Official phone number'
	          },
	          email: {
	            type: _graphql.GraphQLString,
	            description: 'Email address'
	          }
	        }
	      })
	    }
	  }
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _offer_type = __webpack_require__(33);
	
	var _offer_type2 = _interopRequireDefault(_offer_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  offer: {
	    type: new _graphql.GraphQLList(_offer_type2.default),
	    args: {
	      id: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      // find offer as argument if argument is specified
	      var query = params.id ? { _id: params.id } : {};
	      return new _promise2.default(function (resolve, reject) {
	        _models.Offer.find(query, function (err, offer) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(offer);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'offer',
	  description: 'A list of offer',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString,
	      description: 'An unique id generated by mongodb'
	    },
	    code: {
	      type: _graphql.GraphQLString,
	      description: 'A code for particular offer'
	    },
	    description: {
	      type: _graphql.GraphQLString,
	      description: 'An offer explanation'
	    },
	    discount: {
	      type: _graphql.GraphQLInt,
	      description: 'Discount percentage for the offer'
	    },
	    active: {
	      type: _graphql.GraphQLBoolean,
	      description: 'A status of offer'
	    },
	    date_created: {
	      type: _graphql.GraphQLString,
	      description: 'A date when offer is created'
	    }
	  }
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _session_type = __webpack_require__(35);
	
	var _session_type2 = _interopRequireDefault(_session_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  session: {
	    type: new _graphql.GraphQLList(_session_type2.default),
	    args: {
	      _id: {
	        type: _graphql.GraphQLString
	      },
	      active: {
	        type: _graphql.GraphQLBoolean
	      },
	      timePeriod: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Session.find(params).populate('instructor').populate('room').populate('students').populate('product').exec(function (err, session) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(session);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _staff_type = __webpack_require__(36);
	
	var _staff_type2 = _interopRequireDefault(_staff_type);
	
	var _room_type = __webpack_require__(38);
	
	var _room_type2 = _interopRequireDefault(_room_type);
	
	var _product_type = __webpack_require__(39);
	
	var _product_type2 = _interopRequireDefault(_product_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'session',
	  description: 'A session list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    timePeriod: {
	      type: _graphql.GraphQLString
	    },
	    product: {
	      type: _product_type2.default
	    },
	    instructor: {
	      type: _staff_type2.default
	    },
	    room: {
	      type: _room_type2.default
	    },
	    active: {
	      type: _graphql.GraphQLBoolean
	    },
	    students: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'session_student',
	        fields: {
	          id: {
	            type: _graphql.GraphQLString
	          }
	        }
	      })
	    }
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _position_type = __webpack_require__(37);
	
	var _position_type2 = _interopRequireDefault(_position_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'staff',
	  description: 'A staff list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    contact: {
	      type: _graphql.GraphQLString
	    },
	    salary: {
	      type: new _graphql.GraphQLList(new _graphql.GraphQLObjectType({
	        name: 'staff_salary',
	        fields: {
	          product_id: {
	            type: _graphql.GraphQLString
	          },
	          date: {
	            type: _graphql.GraphQLString
	          },
	          amount: {
	            type: _graphql.GraphQLInt
	          }
	        }
	      }))
	    },
	    position: {
	      type: _position_type2.default
	    }
	  }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'position',
	  description: 'Position Information',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    description: {
	      type: _graphql.GraphQLString
	    }
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'room',
	  description: 'A room list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    studentComp: {
	      type: _graphql.GraphQLInt
	    }
	  }
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _service_category_type = __webpack_require__(40);
	
	var _service_category_type2 = _interopRequireDefault(_service_category_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'product',
	  description: 'product list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString,
	      description: 'product id'
	    },
	    name: {
	      type: _graphql.GraphQLString,
	      description: 'product name'
	    },
	    description: {
	      type: _graphql.GraphQLString,
	      description: 'product description'
	    },
	    cost: {
	      type: _graphql.GraphQLInt,
	      description: 'product cost'
	    },
	    category: {
	      type: _service_category_type2.default,
	      description: 'product category'
	    },
	    date_created: {
	      type: _graphql.GraphQLString,
	      description: 'A product created date'
	    }
	  }
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'service_category',
	  description: 'Category Information',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString,
	      description: 'Name of Category'
	    },
	    label: {
	      type: _graphql.GraphQLString,
	      description: 'label for the category'
	    },
	    description: {
	      type: _graphql.GraphQLString,
	      description: 'Category description'
	    }
	  }
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _product_type = __webpack_require__(39);
	
	var _product_type2 = _interopRequireDefault(_product_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  product: {
	    type: new _graphql.GraphQLList(_product_type2.default),
	    args: {
	      id: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var query = params.id ? { _id: params.id } : {};
	      return new _promise2.default(function (resolve, reject) {
	        _models.Product.find(query).populate('category').exec(function (err, product) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(product);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _student_type = __webpack_require__(43);
	
	var _student_type2 = _interopRequireDefault(_student_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  student: {
	    name: 'student',
	    type: new _graphql.GraphQLList(_student_type2.default),
	    args: {
	      id: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var query = params.id ? { _id: params.id } : {};
	      return new _promise2.default(function (resolve, reject) {
	        _models.Student.find(query).populate('enrollment_info.products').populate('enrollment_info.sessions').populate('payment_info.offers').exec(function (err, student) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(student);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _product_type = __webpack_require__(39);
	
	var _product_type2 = _interopRequireDefault(_product_type);
	
	var _session_type = __webpack_require__(35);
	
	var _session_type2 = _interopRequireDefault(_session_type);
	
	var _offer_type = __webpack_require__(33);
	
	var _offer_type2 = _interopRequireDefault(_offer_type);
	
	var _payment_type = __webpack_require__(44);
	
	var _payment_type2 = _interopRequireDefault(_payment_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'student',
	  description: 'student information',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    basic_info: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'basic_info',
	        description: 'Basic student information',
	        fields: {
	          name: {
	            type: _graphql.GraphQLString
	          },
	          address: {
	            type: _graphql.GraphQLString
	          },
	          school: {
	            type: _graphql.GraphQLString
	          },
	          academic_level: {
	            type: _graphql.GraphQLString
	          }
	        }
	      })
	    },
	    contact_info: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'contact_info',
	        description: 'Student contact information',
	        fields: {
	          phone: {
	            type: _graphql.GraphQLString
	          },
	          email: {
	            type: _graphql.GraphQLString
	          }
	        }
	      })
	    },
	    enrollment_info: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'enrollment_info',
	        description: 'Student enrollment information',
	        fields: {
	          date: {
	            type: _graphql.GraphQLString
	          },
	          products: {
	            type: new _graphql.GraphQLList(_product_type2.default)
	          },
	          sessions: {
	            type: new _graphql.GraphQLList(_session_type2.default)
	          }
	        }
	      })
	    },
	    payment_info: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'payment_info',
	        description: 'Student payment information',
	        fields: {
	          done: {
	            type: _graphql.GraphQLBoolean
	          },
	          installments: {
	            type: new _graphql.GraphQLList(_payment_type2.default)
	          },
	          offers: {
	            type: new _graphql.GraphQLList(_offer_type2.default)
	          },
	          discount: {
	            type: _graphql.GraphQLInt
	          }
	        }
	      })
	    }
	  }
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'payment',
	  description: 'Installments',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString,
	      description: 'An unique id generated by mongodb'
	    },
	    date: {
	      type: _graphql.GraphQLString
	    },
	    amount: {
	      type: _graphql.GraphQLInt
	    }
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _room_type = __webpack_require__(38);
	
	var _room_type2 = _interopRequireDefault(_room_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  room: {
	    type: new _graphql.GraphQLList(_room_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Room.find({}).exec(function (err, room) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(room);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _staff_type = __webpack_require__(36);
	
	var _staff_type2 = _interopRequireDefault(_staff_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  staff: {
	    type: new _graphql.GraphQLList(_staff_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Staff.find({}).populate('position').exec(function (err, staff) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(staff);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _service_category_type = __webpack_require__(40);
	
	var _service_category_type2 = _interopRequireDefault(_service_category_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  category: {
	    type: new _graphql.GraphQLList(_service_category_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.ServiceCat.find({}).exec(function (err, category) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(category);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _position_type = __webpack_require__(37);
	
	var _position_type2 = _interopRequireDefault(_position_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  position: {
	    type: new _graphql.GraphQLList(_position_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Position.find({}, function (err, position) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(position);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _expenditure_types_type = __webpack_require__(50);
	
	var _expenditure_types_type2 = _interopRequireDefault(_expenditure_types_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  expenditureTypes: {
	    type: new _graphql.GraphQLList(_expenditure_types_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.ExpenditureTypes.find({}).exec(function (err, expenditureTypes) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(expenditureTypes);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'expenditure_type',
	  description: 'A Expediture types list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    label: {
	      type: _graphql.GraphQLString
	    }
	  }
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _inquiry_type = __webpack_require__(52);
	
	var _inquiry_type2 = _interopRequireDefault(_inquiry_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  inquiry: {
	    type: new _graphql.GraphQLList(_inquiry_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Inquiry.find({}).populate('product').exec(function (err, inquiry) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(inquiry);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _product_type = __webpack_require__(39);
	
	var _product_type2 = _interopRequireDefault(_product_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'inquiry',
	  description: 'A inquiry list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    name: {
	      type: _graphql.GraphQLString
	    },
	    date: {
	      type: _graphql.GraphQLString
	    },
	    academic_level: {
	      type: _graphql.GraphQLString
	    },
	    contact: {
	      type: _graphql.GraphQLString
	    },
	    services: {
	      type: new _graphql.GraphQLList(_product_type2.default)
	    },
	    available_time: {
	      type: new _graphql.GraphQLList(_graphql.GraphQLString)
	    },
	    status: {
	      type: new _graphql.GraphQLObjectType({
	        name: 'status',
	        fields: {
	          fixed: {
	            type: _graphql.GraphQLBoolean
	          },
	          informed: {
	            type: _graphql.GraphQLInt
	          }
	        }
	      })
	    }
	  }
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _expenditure_type = __webpack_require__(54);
	
	var _expenditure_type2 = _interopRequireDefault(_expenditure_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  expenditure: {
	    type: new _graphql.GraphQLList(_expenditure_type2.default),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Expenditure.find({}).populate('type').exec(function (err, expenditure) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(expenditure);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _graphql = __webpack_require__(12);
	
	var _expenditure_types_type = __webpack_require__(50);
	
	var _expenditure_types_type2 = _interopRequireDefault(_expenditure_types_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _graphql.GraphQLObjectType({
	  name: 'expenditure',
	  description: 'A expenditure list',
	  fields: {
	    id: {
	      type: _graphql.GraphQLString
	    },
	    date: {
	      type: _graphql.GraphQLString
	    },
	    purpose: {
	      type: _graphql.GraphQLString
	    },
	    amount: {
	      type: _graphql.GraphQLInt
	    },
	    type: {
	      type: _expenditure_types_type2.default
	    },
	    by: {
	      type: _graphql.GraphQLString
	    }
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _extends2 = __webpack_require__(11);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _models = __webpack_require__(15);
	
	var _offer_type = __webpack_require__(33);
	
	var _offer_type2 = _interopRequireDefault(_offer_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewOffer: {
	    type: _offer_type2.default,
	    args: (0, _extends3.default)({}, _offer_type2.default.getFields()),
	    resolve: function resolve(root, params, options) {
	      var newOffer = params;
	      newOffer.date_created = Date.now();
	      newOffer.active = true;
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Offer(newOffer).save(function (err, offer) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(offer);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _institution_info_type = __webpack_require__(31);
	
	var _institution_info_type2 = _interopRequireDefault(_institution_info_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  updateInstitutionInfo: {
	    type: _institution_info_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      location: {
	        type: _graphql.GraphQLString
	      },
	      email: {
	        type: _graphql.GraphQLString
	      },
	      phone: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Institution.findOne({}, function (err, info) {
	          if (err) {
	            reject(err);
	          } else {
	            if (!info) {
	              new _models.Institution(params).save(function (err, institution) {
	                if (err) {
	                  reject(err);
	                } else {
	                  resolve(institution);
	                }
	              });
	            } else {
	              info.name = params.name;
	              info.location = params.location;
	              info.contact = {
	                email: params.email,
	                phone: params.phone
	              };
	              info.save(function (err) {
	                if (err) {
	                  reject(err);
	                } else {
	                  resolve(info);
	                }
	              });
	            }
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _service_category_type = __webpack_require__(40);
	
	var _service_category_type2 = _interopRequireDefault(_service_category_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewCategory: {
	    type: _service_category_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      label: {
	        type: _graphql.GraphQLString
	      },
	      description: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.ServiceCat(params).save(function (err, category) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(category);
	          }
	        });
	      });
	    }
	  },
	  updateCategory: {
	    type: _service_category_type2.default,
	    args: {
	      id: {
	        type: _graphql.GraphQLString
	      },
	      name: {
	        type: _graphql.GraphQLString
	      },
	      label: {
	        type: _graphql.GraphQLString
	      },
	      description: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var id = params.id,
	          name = params.name,
	          label = params.label,
	          description = params.description;
	
	      return new _promise2.default(function (resolve, reject) {
	        _models.ServiceCat.findOne({ _id: id }).exec(function (err, category) {
	          if (err) {
	            reject(err);
	          } else {
	            category.name = name;
	            category.label = label;
	            category.description = description;
	            category.save(function (err, category) {
	              if (err) {
	                reject(err);
	              } else {
	                resolve(category);
	              }
	            });
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _product_type = __webpack_require__(39);
	
	var _product_type2 = _interopRequireDefault(_product_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewProduct: {
	    type: _product_type2.default,
	    args: {
	      name: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'product name'
	      },
	      description: {
	        type: _graphql.GraphQLString,
	        description: 'product description'
	      },
	      cost: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
	        description: 'product cost'
	      },
	      category: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'product category'
	      },
	      date_created: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'product created date'
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Product(params).save(function (err, product) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(product);
	          }
	        });
	      });
	    }
	  },
	  updateProduct: {
	    type: _product_type2.default,
	    args: {
	      id: {
	        type: _graphql.GraphQLString,
	        description: 'product id'
	      },
	      name: {
	        type: _graphql.GraphQLString,
	        description: 'product name'
	      },
	      description: {
	        type: _graphql.GraphQLString
	      },
	      cost: {
	        type: _graphql.GraphQLInt,
	        description: 'product cost'
	      },
	      category: {
	        type: _graphql.GraphQLString,
	        description: 'product category'
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var name = params.name,
	          cost = params.cost,
	          description = params.description,
	          category = params.category;
	
	      return new _promise2.default(function (resolve, reject) {
	        _models.Product.findOne({ _id: params.id }).exec(function (err, product) {
	          if (err) {
	            reject(err);
	          } else {
	            product.name = name;
	            product.cost = cost;
	            product.description = description;
	            product.category = category;
	            product.save(function (err, product) {
	              if (err) {
	                reject(err);
	              } else {
	                resolve(product);
	              }
	            });
	          }
	        });
	      });
	    }
	  },
	  deleteProduct: {
	    type: _product_type2.default,
	    args: {
	      id: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Product.findOne({ _id: params.id }).exec(function (err, product) {
	          if (err) {
	            reject(err);
	          } else {
	            product.remove(function (err) {
	              if (err) {
	                reject(err);
	              } else {
	                resolve(product);
	              }
	            });
	          }
	        });
	      });
	    }
	
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _room_type = __webpack_require__(38);
	
	var _room_type2 = _interopRequireDefault(_room_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewRoom: {
	    type: _room_type2.default,
	    args: _room_type2.default.getFields(),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Room(params).save(function (err, room) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(room);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _staff_type = __webpack_require__(36);
	
	var _staff_type2 = _interopRequireDefault(_staff_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewStaff: {
	    type: _staff_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      position: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      },
	      contact: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Staff(params).save(function (err, staff) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(staff);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _session_type = __webpack_require__(35);
	
	var _session_type2 = _interopRequireDefault(_session_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewSession: {
	    type: _session_type2.default,
	    args: {
	      name: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      instructor: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      timePeriod: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      room: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      product: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      // New session is treated as an active one
	      params.active = true;
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Session(params).save(function (err, session) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(session);
	          }
	        });
	      });
	    }
	  },
	  updateSession: {
	    type: _session_type2.default,
	    args: {
	      id: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      name: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      instructor: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      timePeriod: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      room: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      product: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      },
	      active: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var id = params.id,
	          name = params.name,
	          instructor = params.instructor,
	          timePeriod = params.timePeriod,
	          room = params.room,
	          product = params.product,
	          active = params.active;
	
	      return new _promise2.default(function (resolve, reject) {
	        _models.Session.findOne({ _id: id }).exec(function (err, session) {
	          if (err) {
	            reject(err);
	          } else {
	            session.name = name;
	            session.instructor = instructor;
	            session.timePeriod = timePeriod;
	            session.room = room;
	            session.product = product;
	            session.active = active;
	            session.save(function (err, session) {
	              if (err) {
	                reject(err);
	              } else {
	                resolve(session);
	              }
	            });
	          }
	        });
	      });
	    }
	  },
	  deleteSession: {
	    type: _session_type2.default,
	    args: {
	      id: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        _models.Session.findOne({ _id: params.id }).exec(function (err, session) {
	          if (err) {
	            reject(err);
	          } else {
	            session.remove(function (err) {
	              if (err) {
	                reject(err);
	              } else {
	                resolve(session);
	              }
	            });
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _student_type = __webpack_require__(43);
	
	var _student_type2 = _interopRequireDefault(_student_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewStudent: {
	    type: _student_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      academic_level: {
	        type: _graphql.GraphQLString
	      },
	      school: {
	        type: _graphql.GraphQLString
	      },
	      address: {
	        type: _graphql.GraphQLString
	      },
	      phone: {
	        type: _graphql.GraphQLString
	      },
	      email: {
	        type: _graphql.GraphQLString
	      },
	      date: {
	        type: _graphql.GraphQLString
	      },
	      products: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      },
	      sessions: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      },
	      offers: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      var newStudent = {
	        basic_info: {
	          name: params.name,
	          academic_level: params.academic_level,
	          school: params.school,
	          address: params.address
	        },
	        contact_info: {
	          phone: params.phone,
	          email: params.email
	        },
	        enrollment_info: {
	          date: params.date,
	          products: params.products,
	          sessions: params.sessions
	        },
	        payment_info: {
	          offers: params.offers
	        }
	      };
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Student(newStudent).save(function (err, student) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(student);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _position_type = __webpack_require__(37);
	
	var _position_type2 = _interopRequireDefault(_position_type);
	
	var _graphql = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewPosition: {
	    type: _position_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      description: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Position(params).save(function (err, position) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(position);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _models = __webpack_require__(15);
	
	var _expenditure_types_type = __webpack_require__(50);
	
	var _expenditure_types_type2 = _interopRequireDefault(_expenditure_types_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewExpenditureTypes: {
	    type: _expenditure_types_type2.default,
	    args: _expenditure_types_type2.default.getFields(),
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.ExpenditureTypes(params).save(function (err, expenditureTypes) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(expenditureTypes);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _inquiry_type = __webpack_require__(52);
	
	var _inquiry_type2 = _interopRequireDefault(_inquiry_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewInquiry: {
	    type: _inquiry_type2.default,
	    args: {
	      name: {
	        type: _graphql.GraphQLString
	      },
	      academic_level: {
	        type: _graphql.GraphQLString
	      },
	      contact: {
	        type: _graphql.GraphQLString
	      },
	      services: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      },
	      date: {
	        type: _graphql.GraphQLString
	      },
	      available_time: {
	        type: new _graphql.GraphQLList(_graphql.GraphQLString)
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Inquiry(params).save(function (err, inquiry) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(inquiry);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(14);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _graphql = __webpack_require__(12);
	
	var _models = __webpack_require__(15);
	
	var _expenditure_type = __webpack_require__(54);
	
	var _expenditure_type2 = _interopRequireDefault(_expenditure_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  addNewExpenditure: {
	    type: _expenditure_type2.default,
	    args: {
	      date: {
	        type: _graphql.GraphQLString
	      },
	      purpose: {
	        type: _graphql.GraphQLString
	      },
	      amount: {
	        type: _graphql.GraphQLInt
	      },
	      type: {
	        type: _graphql.GraphQLString
	      },
	      by: {
	        type: _graphql.GraphQLString
	      }
	    },
	    resolve: function resolve(root, params, options) {
	      return new _promise2.default(function (resolve, reject) {
	        new _models.Expenditure(params).save(function (err, expenditure) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(expenditure);
	          }
	        });
	      });
	    }
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {const ExtractTextPlugin = __webpack_require__(69)
	const { join, resolve } = __webpack_require__(7)
	const webpack = __webpack_require__(67)
	
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
/* 69 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map
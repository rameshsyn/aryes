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
	  var webpack = __webpack_require__(40);
	  var webpackConfig = __webpack_require__(41);
	  var webpackDevMiddleware = __webpack_require__(43);
	  var webpackHotMiddleware = __webpack_require__(44);
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
	
	var _queries = __webpack_require__(13);
	
	var _mutations = __webpack_require__(38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Get all graphQL Query types
	exports.default = new _graphql.GraphQLSchema({
	  query: new _graphql.GraphQLObjectType({
	    name: 'RootQuery',
	    description: 'A root query',
	    fields: (0, _extends3.default)({}, _queries.SessionQuery, _queries.OfferQuery, _queries.InstitutionQuery)
	  }),
	  mutation: new _graphql.GraphQLObjectType({
	    name: 'RootMutation',
	    description: 'A root mutation',
	    fields: (0, _extends3.default)({}, _mutations.OfferMutation)
	  })
	});
	
	// Get all graphQL mutation types

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
	exports.ServiceCatQuery = exports.ContactQuery = exports.InstitutionQuery = exports.OfferQuery = exports.SessionQuery = undefined;
	
	var _graphql = __webpack_require__(12);
	
	var _session_query = __webpack_require__(14);
	
	var _session_query2 = _interopRequireDefault(_session_query);
	
	var _offer_query = __webpack_require__(27);
	
	var _offer_query2 = _interopRequireDefault(_offer_query);
	
	var _institution_info_query = __webpack_require__(29);
	
	var _institution_info_query2 = _interopRequireDefault(_institution_info_query);
	
	var _contact_query = __webpack_require__(30);
	
	var _contact_query2 = _interopRequireDefault(_contact_query);
	
	var _service_category_query = __webpack_require__(31);
	
	var _service_category_query2 = _interopRequireDefault(_service_category_query);
	
	var _types = __webpack_require__(32);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// hold all imports
	
	
	// Get particular query types
	var builtInTypes = {
	  GraphQLObjectType: _graphql.GraphQLObjectType,
	  GraphQLString: _graphql.GraphQLString,
	  GraphQLID: _graphql.GraphQLID,
	  GraphQLInt: _graphql.GraphQLInt,
	  GraphQLBoolean: _graphql.GraphQLBoolean,
	  GraphQLList: _graphql.GraphQLList,
	  GraphQLNonNull: _graphql.GraphQLNonNull
	};
	
	// Send custom and built in types to query types
	
	// Get types
	var SessionQuery = (0, _session_query2.default)(_types.SessionType, builtInTypes);
	var OfferQuery = (0, _offer_query2.default)(_types.OfferType, builtInTypes);
	var InstitutionQuery = (0, _institution_info_query2.default)(_types.InstitutionType, builtInTypes);
	var ContactQuery = (0, _contact_query2.default)(_types.ContactType, builtInTypes);
	var ServiceCatQuery = (0, _service_category_query2.default)(_types.ServiceCatType, builtInTypes);
	
	// Make available all the query types a single object
	
	function test() {
	  return {
	    SessionQuery: SessionQuery,
	    OfferQuery: OfferQuery,
	    InstitutionQuery: InstitutionQuery,
	    ContactQuery: ContactQuery,
	    ServiceCatQuery: ServiceCatQuery
	  };
	}
	exports.SessionQuery = SessionQuery;
	exports.OfferQuery = OfferQuery;
	exports.InstitutionQuery = InstitutionQuery;
	exports.ContactQuery = ContactQuery;
	exports.ServiceCatQuery = ServiceCatQuery;
	exports.default = test;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (sessionType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    session: {
	      type: new GraphQLList(sessionType),
	      args: {
	        instructor: {
	          type: GraphQLString,
	          description: 'A name of a instructor'
	        }
	      },
	      resolve: function resolve(root, params, options) {
	        return _models.Session.find({ 'instructor': params.instructor }, function (err, session) {
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
	
	var _index = __webpack_require__(17);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _student_model = __webpack_require__(18);
	
	var _student_model2 = _interopRequireDefault(_student_model);
	
	var _session_model = __webpack_require__(19);
	
	var _session_model2 = _interopRequireDefault(_session_model);
	
	var _inquiry_model = __webpack_require__(20);
	
	var _inquiry_model2 = _interopRequireDefault(_inquiry_model);
	
	var _room_model = __webpack_require__(21);
	
	var _room_model2 = _interopRequireDefault(_room_model);
	
	var _staff_model = __webpack_require__(22);
	
	var _staff_model2 = _interopRequireDefault(_staff_model);
	
	var _offer_model = __webpack_require__(23);
	
	var _offer_model2 = _interopRequireDefault(_offer_model);
	
	var _service_info_model = __webpack_require__(24);
	
	var _service_info_model2 = _interopRequireDefault(_service_info_model);
	
	var _institution_info_model = __webpack_require__(25);
	
	var _institution_info_model2 = _interopRequireDefault(_institution_info_model);
	
	var _admin_model = __webpack_require__(26);
	
	var _admin_model2 = _interopRequireDefault(_admin_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// MongoDB connection
	
	
	// Configuration
	_mongoose2.default.connect('mongodb://localhost:27017/' + _index2.default.db.name);
	
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
	var Service = (0, _service_info_model2.default)(_mongoose2.default);
	var Institution = (0, _institution_info_model2.default)(_mongoose2.default);
	var Admin = (0, _admin_model2.default)(_mongoose2.default);
	
	// import mongoose from 'mongoose'
	
	// // Configuration
	// import config from '../config'
	
	// // mongoose schemas
	// import student from './management/student'
	// import session from './management/session'
	// import inquiry from './management/inquiry'
	// import room from './management/room'
	// import staff from './management/staff'
	// import offer from './service/offer'
	// import service from './service/service_info'
	// import institution from './institution/institution_info'
	// import admin from './admin/admin'
	
	// // MongoDB connection
	// mongoose.connect(`mongodb://localhost:27017/${config.db.name}`)
	
	// // Use native promises
	// mongoose.Promise = global.Promise
	
	// // Pass mongoose to all schemas
	// const Student = student(mongoose)
	// const Session = session(mongoose)
	// const Inquiry = inquiry(mongoose)
	// const Room = room(mongoose)
	// const Staff = staff(mongoose)
	// const Offer = offer(mongoose)
	// const Service = service(mongoose)
	// const Institution = institution(mongoose)
	// const Admin = admin(mongoose)
	
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
	//   code: 'CONNECTION',
	//   discount: 60,
	//   date_created: Date.now(),
	//   active: false,
	//   description: 'An offer for a relative'
	// }).save((err) => {
	//   if (err) throw err
	//   console.log('saved')
	//  })
	
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
/* 19 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
	      phone: String
	    }],
	    location: String,
	    sevice_category: [{
	      name: String,
	      description: String
	    }]
	  });
	  return mongoose.model('institution', InstitutionSchema);
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(28);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = function (offerType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    offer: {
	      type: new GraphQLList(offerType),
	      args: {
	        id: {
	          type: GraphQLString
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
	};
	
	var _models = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(28);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = function (institutionType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    institution_info: {
	      type: institutionType,
	      resolve: function resolve(root, params, options) {
	        // find offer as argument if argument is specified
	        var query = params.id ? { _id: params.id } : {};
	        return new _promise2.default(function (resolve, reject) {
	          resolve({
	            name: 'something',
	            location: 'bhaktapur'
	          });
	        });
	      }
	    }
	  };
	};
	
	var _models = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(28);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = function (contactType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    contact: {
	      type: contactType,
	      resolve: function resolve(root, params, options) {
	        // find offer as argument if argument is specified
	        var query = params.id ? { _id: params.id } : {};
	        return new _promise2.default(function (resolve, reject) {
	          resolve({
	            phone: '4545154545',
	            email: 'fasdfasdfsadfd@fjdkjf.com'
	          });
	        });
	      }
	    }
	  };
	};
	
	var _models = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(28);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = function (serviceCatType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    service_category: {
	      type: serviceCatType,
	      resolve: function resolve(root, params, options) {
	        // find offer as argument if argument is specified
	        var query = params.id ? { _id: params.id } : {};
	        return new _promise2.default(function (resolve, reject) {
	          resolve({
	            name: 'something',
	            description: 'some description'
	          });
	        });
	      }
	    }
	  };
	};
	
	var _models = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ServiceCatType = exports.ContactType = exports.InstitutionType = exports.OfferType = exports.SessionType = undefined;
	
	var _graphql = __webpack_require__(12);
	
	var _session_type = __webpack_require__(33);
	
	var _session_type2 = _interopRequireDefault(_session_type);
	
	var _offer_type = __webpack_require__(34);
	
	var _offer_type2 = _interopRequireDefault(_offer_type);
	
	var _institution_info_type = __webpack_require__(35);
	
	var _institution_info_type2 = _interopRequireDefault(_institution_info_type);
	
	var _contact_type = __webpack_require__(36);
	
	var _contact_type2 = _interopRequireDefault(_contact_type);
	
	var _service_category_type = __webpack_require__(37);
	
	var _service_category_type2 = _interopRequireDefault(_service_category_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// hold all imports
	var builtInTypes = {
	  GraphQLObjectType: _graphql.GraphQLObjectType,
	  GraphQLString: _graphql.GraphQLString,
	  GraphQLID: _graphql.GraphQLID,
	  GraphQLInt: _graphql.GraphQLInt,
	  GraphQLBoolean: _graphql.GraphQLBoolean,
	  GraphQLList: _graphql.GraphQLList,
	  GraphQLNonNull: _graphql.GraphQLNonNull
	};
	
	// pass all imports as object to types
	
	
	// Get types
	var SessionType = (0, _session_type2.default)(builtInTypes);
	var OfferType = (0, _offer_type2.default)(builtInTypes);
	var InstitutionType = (0, _institution_info_type2.default)(builtInTypes);
	var ContactType = (0, _contact_type2.default)(builtInTypes);
	var ServiceCatType = (0, _service_category_type2.default)(builtInTypes);
	
	// make available all the types
	exports.SessionType = SessionType;
	exports.OfferType = OfferType;
	exports.InstitutionType = InstitutionType;
	exports.ContactType = ContactType;
	exports.ServiceCatType = ServiceCatType;

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var GraphQLObjectType = _ref.GraphQLObjectType,
	      GraphQLString = _ref.GraphQLString,
	      GraphQLInt = _ref.GraphQLInt,
	      GraphQLBoolean = _ref.GraphQLBoolean;
	
	  return new GraphQLObjectType({
	    name: 'offer',
	    description: 'A list of offer',
	    fields: {
	      id: {
	        type: GraphQLString,
	        description: 'An unique id generated by mongodb'
	      },
	      code: {
	        type: GraphQLString,
	        description: 'A code for particular offer'
	      },
	      description: {
	        type: GraphQLString,
	        description: 'An offer explanation'
	      },
	      discount: {
	        type: GraphQLInt,
	        description: 'Discount percentage for the offer'
	      },
	      active: {
	        type: GraphQLBoolean,
	        description: 'A status of offer'
	      },
	      date_created: {
	        type: GraphQLString,
	        description: 'A date when offer is created'
	      }
	    }
	  });
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var GraphQLObjectType = _ref.GraphQLObjectType,
	      GraphQLString = _ref.GraphQLString;
	
	  return new GraphQLObjectType({
	    name: 'institution_info',
	    description: 'Institution Information',
	    fields: {
	      name: {
	        type: GraphQLString,
	        description: 'A name of an institution'
	      },
	      location: {
	        type: GraphQLString,
	        description: 'Location of an institution'
	      }
	    }
	  });
	};
	
	var _queries = __webpack_require__(13);
	
	var test = _interopRequireWildcard(_queries);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	console.log(test);

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var GraphQLObjectType = _ref.GraphQLObjectType,
	      GraphQLString = _ref.GraphQLString;
	
	  return new GraphQLObjectType({
	    name: 'contact_info',
	    description: 'Contact Information',
	    fields: {
	      phone: {
	        type: GraphQLString,
	        description: 'Official phone number'
	      },
	      email: {
	        type: GraphQLString,
	        description: 'Email address'
	      }
	    }
	  });
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var GraphQLObjectType = _ref.GraphQLObjectType,
	      GraphQLString = _ref.GraphQLString;
	
	  return new GraphQLObjectType({
	    name: 'service_category_info',
	    description: 'Category Information',
	    fields: {
	      name: {
	        type: GraphQLString,
	        description: 'Name of Category'
	      },
	      description: {
	        type: GraphQLString,
	        description: 'Category description'
	      }
	    }
	  });
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.OfferMutation = undefined;
	
	var _graphql = __webpack_require__(12);
	
	var _offer_mutation = __webpack_require__(39);
	
	var _offer_mutation2 = _interopRequireDefault(_offer_mutation);
	
	var _types = __webpack_require__(32);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// hold all imports
	
	
	// Get particular query types
	var builtInTypes = {
	  GraphQLObjectType: _graphql.GraphQLObjectType,
	  GraphQLString: _graphql.GraphQLString,
	  GraphQLID: _graphql.GraphQLID,
	  GraphQLInt: _graphql.GraphQLInt,
	  GraphQLBoolean: _graphql.GraphQLBoolean,
	  GraphQLList: _graphql.GraphQLList,
	  GraphQLNonNull: _graphql.GraphQLNonNull
	};
	
	// Send custom and built in types to query types
	
	
	// Get types
	// Mutations
	
	var OfferMutation = (0, _offer_mutation2.default)(_types.OfferType, builtInTypes);
	
	// Make available all the query types a single object
	exports.OfferMutation = OfferMutation;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(28);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _extends2 = __webpack_require__(11);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.default = function (offerType, _ref) {
	  var GraphQLString = _ref.GraphQLString,
	      GraphQLList = _ref.GraphQLList;
	
	  return {
	    addNewOffer: {
	      type: offerType,
	      args: (0, _extends3.default)({}, offerType.getFields()),
	      resolve: function resolve(root, params, options) {
	        var offer = params;
	        offer.date_created = Date.now();
	        offer.active = true;
	        return new _promise2.default(function (resolve, reject) {
	          new _models.Offer(offer).save(function (err, user) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(user);
	            }
	          });
	        });
	      }
	    }
	  };
	};
	
	var _models = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {const ExtractTextPlugin = __webpack_require__(42)
	const { join, resolve } = __webpack_require__(7)
	const webpack = __webpack_require__(40)
	
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
/* 42 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map
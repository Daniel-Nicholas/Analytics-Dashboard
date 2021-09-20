/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/counter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/counter.js":
/*!************************!*\
  !*** ./src/counter.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Counter =\n/*#__PURE__*/\nfunction (_HTMLElement) {\n  _inherits(Counter, _HTMLElement);\n\n  function Counter() {\n    var _this;\n\n    _classCallCheck(this, Counter);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this));\n\n    _defineProperty(_assertThisInitialized(_this), \"shadowRoot\", null);\n\n    _defineProperty(_assertThisInitialized(_this), \"btnIncrementAsync\", void 0);\n\n    _defineProperty(_assertThisInitialized(_this), \"btnIncrement\", void 0);\n\n    _defineProperty(_assertThisInitialized(_this), \"btnDecrement\", void 0);\n\n    _defineProperty(_assertThisInitialized(_this), \"storeDisplay\", void 0);\n\n    _defineProperty(_assertThisInitialized(_this), \"storeUnsubscribeFn\", null);\n\n    _defineProperty(_assertThisInitialized(_this), \"broadcastAPI\", UWF.API.Broadcast.init());\n\n    return _this;\n  }\n\n  _createClass(Counter, [{\n    key: \"connectedCallback\",\n    value: function connectedCallback() {\n      var _this2 = this;\n\n      this.innerHTML = getTemplate();\n      this.init();\n      var store;\n\n      if (UWF.Store.exists(\"reduxSagaSample\")) {\n        store = UWF.Store.get(\"reduxSagaSample\");\n        this.initStoreSubscribe(store);\n      } else {\n        this.broadcastAPI.subscribe(\"reduxSagaSampleStoreCreated\", function (store) {\n          _this2.initStoreSubscribe(store);\n        });\n      }\n    }\n  }, {\n    key: \"disconnectedCallback\",\n    value: function disconnectedCallback() {\n      // unsubscribe from store listeners\n      UWF.Store.unsubscribe(this.storeUnsubscribeFn);\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      this.btnIncrementAsync = document.getElementById(\"btnIncrementAsync\");\n      this.btnIncrement = document.getElementById(\"btnIncrement\");\n      this.btnDecrement = document.getElementById(\"btnDecrement\");\n      this.storeDisplay = document.getElementById(\"storeDisplay\");\n    }\n  }, {\n    key: \"initStoreSubscribe\",\n    value: function initStoreSubscribe(store) {\n      var _this3 = this;\n\n      this.storeUnsubscribeFn = store.subscribe(function () {\n        _this3.updateState(store.getState());\n      }); // Set button callbacks\n\n      this.btnIncrementAsync.addEventListener(\"click\", function () {\n        // This action triggers an effect from redux-saga\n        // See sagas/sagas.js\n        store.dispatch({\n          type: \"INCREMENT_ASYNC\"\n        });\n      });\n      this.btnIncrement.addEventListener(\"click\", function () {\n        store.dispatch({\n          type: \"INCREMENT\"\n        });\n      });\n      this.btnDecrement.addEventListener(\"click\", function () {\n        store.dispatch({\n          type: \"DECREMENT\"\n        });\n      });\n    }\n  }, {\n    key: \"updateState\",\n    value: function updateState(state) {\n      this.storeDisplay.innerHTML = state.count;\n    }\n  }]);\n\n  return Counter;\n}(_wrapNativeSuper(HTMLElement)); // Define Web Component\n\n\ncustomElements.define(\"saga-counter\", Counter); // Returns html to use in component\n\nfunction getTemplate() {\n  return \"\\n      <div class='neo-widget' style='height:100%'>\\n      <div class='neo-widget__header neo-icon-chat-outbound'>Counter</div>\\n      <div class='neo-widget__content neo-widget__content--indented'>\\n       <div class='neo-empty-state'>\\n          <h2>Value held in store:</h2>\\n          <h1 id='storeDisplay'></h1>\\n        </div>\\n      </div>\\n      <div class='neo-widget__footer'>\\n          <button class='neo-btn neo-btn--primary' id='btnIncrementAsync'>Increment after 1 second</button>\\n          <button class='neo-btn neo-btn--primary' id='btnIncrement'>Increment</button>\\n          <button class='neo-btn neo-btn--primary' id='btnDecrement'>Decrement</button>\\n      </div>\\n    </div>\";\n}\n\n//# sourceURL=webpack:///./src/counter.js?");

/***/ })

/******/ });
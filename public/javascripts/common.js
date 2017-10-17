/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		14:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"arv","1":"asutused","2":"doc","3":"docs","4":"documentLib","5":"journal","6":"kontod","7":"nomenclature","8":"project","9":"smk","10":"sorder","11":"tunnus","12":"vmk","13":"vorder"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

	module.exports = ReactDOM;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	  var isValidElement = function isValidElement(object) {
	    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(12)();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) {
	    return [];
	};

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(8);
	var assign = __webpack_require__(9);

	var ReactPropTypesSecret = __webpack_require__(10);
	var checkPropTypes = __webpack_require__(11);

	module.exports = function (isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (!manualPropTypeCallCache[cacheKey] &&
	          // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(7);
	  var warning = __webpack_require__(8);
	  var ReactPropTypesSecret = __webpack_require__(10);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(10);

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var XDispatcher = __webpack_require__(15),
	    XStore = __webpack_require__(16);

	//#build

	/**
	 * Fluxify class that will be used as a singleton.
	 * Initializes the dispatcher and the store.
	 * Also set the Promise object if it is globally available.
	 */
	var Fluxify = function Fluxify() {
		Object.defineProperty(this, 'dispatcher', {
			value: new XDispatcher()
		});

		this.stores = {};

		if (typeof Promise != 'undefined') {
			this.promisify(Promise);
		}
	};

	Fluxify.prototype = {
		/**
	  * Create a new store. If an id is passed in the options,
	  * the store will be registered in the dispatcher and saved
	  * in fluxify.stores[id].
	  *
	  * @param  {Object} options {id, initialState, actionCallback}
	  * @return {XStore}
	  */
		createStore: function createStore(options) {
			var store = new XStore(options);

			// If the store has an id, register it in Fluxify and in the dispatcher
			if (store._id) {
				this.stores[store._id] = store;
				this.dispatcher.registerStore(store._id, store);
			}

			return store;
		},

		/**
	  * Executes an action. The arguments of this function will be available
	  * for the action callbacks registered in the dispatcher.
	  * @return { Promise } A promise that is resolved when all the action callbacks
	  *                   have finished.
	  */
		doAction: function doAction() {
			return this.dispatcher.dispatch.apply(this.dispatcher, arguments);
		},

		/**
	  * If ES6 Promise object is not defined globally or polyfilled, a Promise object
	  * can be given to fluxify in order to make it work, using this method.
	  *
	  * @param  { Promise } Promise ES6 Promise compatible object
	  * @return { undefined }
	  */
		promisify: function promisify(Promise) {
			this._Promise = Promise;
			this.dispatcher._Promise = Promise;
		}
	};

	//#build

	module.exports = new Fluxify();

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	//#build

	/**
	 * The asynchronous dispatcher compatible with Facebook's flux dispatcher
	 * http://facebook.github.io/flux/docs/dispatcher.html
	 *
	 * Dispatch actions to the registered callbacks, those action can be
	 * asynchronous if they return a Promise.
	 */

	var XDispatcher = function XDispatcher() {
		this._callbacks = {};
		this._dispatchQueue = [];
		this._currentDispatch = false;
		this._ID = 1;

		if (typeof Promise != 'undefined') {
			this._Promise = Promise;
		}
	};

	XDispatcher.prototype = {

		/**
	  * Register a callback that will be called when an action is dispatched.
	  *
	  * @param  {String | Function}   id  If a string is passed, it will be the id of the callback.
	  *                  If a function is passed, it will be used as callback, and id is generated
	  *                  automatically.
	  * @param  {Function} callback If an id is passed as a first argument, this will be the callback.
	  * @return {String}            The id of the callback to be used with the waitFor method.
	  */
		register: function register(id, callback) {
			var ID = id;

			// If the callback is the first parameter
			if (typeof id == 'function') {
				ID = 'ID_' + this._ID;
				callback = id;
			}

			this._callbacks[ID] = callback;
			this._ID++;

			return ID;
		},

		/**
	  * Register a XStore in the dispacher. XStores has a method called callback. The dispatcher
	  * register that function as a regular callback.
	  *
	  * @param  {String} id     The id for the store to be used in the waitFor method.
	  * @param  {XStore} xStore Store to register in the dispatcher
	  * @return {String}        The id of the callback to be used with the waitFor method.
	  */
		registerStore: function registerStore(id, xStore) {

			Object.defineProperty(xStore, '_dispatcher', {
				value: this
			});

			return this.register(id, xStore.callback);
		},

		/**
	  * Unregister a callback given its id.
	  *
	  * @param  {String} id Callback/Store id
	  * @return {undefined}
	  */
		unregister: function unregister(id) {
			delete this._callbacks[id];
		},

		/**
	  * Creates a promise and waits for the callbacks specified to complete before resolve it.
	  * If it is used by an actionCallback, the promise should be resolved to let other callbacks
	  * wait for it if needed.
	  *
	  * Be careful of not to wait by a callback that is waiting by the current callback, or the
	  * promises will never fulfill.
	  *
	  * @param  {String<Array>|String} ids The id or ids of the callbacks/stores to wait for.
	  * @return {Promise} A promise to be resolved when the specified callbacks are completed.
	  */
		waitFor: function waitFor(ids) {
			var promises = [],
			    i = 0;

			if (!Array.isArray(ids)) ids = [ids];

			for (; i < ids.length; i++) {
				if (this._promises[ids[i]]) promises.push(this._promises[ids[i]]);
			}

			if (!promises.length) return this._Promise.resolve();

			return this._Promise.all(promises);
		},

		/**
	  * Dispatches an action to all the registered callbacks/stores.
	  *
	  * If a second action is dispatched while there is a dispatch on, it will be
	  * enqueued an dispatched after the current one.
	  *
	  * @return { Promise } A promise to be resolved when all the callbacks have finised.
	  */
		dispatch: function dispatch() {
			var me = this,
			    dispatchArguments = arguments,
			    promise,
			    dequeue;

			if (!this._Promise) throw new TypeError('No promises.');

			// If we are in the middle of a dispatch, enqueue the dispatch
			if (this._currentDispatch) {

				// Dispatch after the current one
				promise = this._currentDispatch.then(function () {
					return me._dispatch.apply(me, dispatchArguments);
				});

				// Enqueue, set the chain as the current promise and return
				this._dispatchQueue.push(promise);
				return this._currentDispatch = promise;
			}

			return this._currentDispatch = this._dispatch.apply(me, dispatchArguments);
		},

		/**
	  * Dispatches an action inmediatelly.
	  *
	  * @return {Promise} A promise to be resolved when all the callbacks have finised.
	  */
		_dispatch: function _dispatch() {
			var me = this,
			    dispatchArguments = arguments,
			    promises = [];

			this._promises = [];

			// A closure is needed for the callback id
			Object.keys(this._callbacks).forEach(function (id) {

				// All the promises must be set in me._promises before trying to resolve
				// in order to make waitFor work ok
				me._promises[id] = me._Promise.resolve().then(function () {
					return me._callbacks[id].apply(me, dispatchArguments);
				}).catch(function (err) {
					console.error(err.stack || err);
				});

				promises.push(me._promises[id]);
			});

			//
			var dequeue = function dequeue() {
				me._dispatchQueue.shift();
				if (!me._dispatchQueue.length) me._currentDispatch = false;
			};

			return this._Promise.all(promises).then(dequeue, dequeue);
		},

		/**
	  * Is this dispatcher currently dispatching.
	  *
	  * @return {Boolean}
	  */
		isDispatching: function isDispatching() {
			return !!this._dispatchQueue.length;
		}

	};

	//#build

	module.exports = XDispatcher;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var XEmitter = __webpack_require__(17),
	    xUtils = __webpack_require__(18);

	//#build

	var Store = XEmitter._extend({
		initialize: function initialize(props) {
			if (!props) return this.props = {};

			this.props = {};
			for (var p in props) {
				this.props[p] = props[p];
			}
		},

		get: function get(prop) {
			return this.props[prop];
		},

		set: function set(prop, value) {
			var props = prop,
			    updates = [],
			    previousValue,
			    p;

			if (typeof value != 'undefined') {
				props = {};
				props[prop] = value;
			}

			for (p in props) {
				if (this.props[p] != props[p]) {
					previousValue = this.props[p];
					this.props[p] = props[p];
					updates.push({
						prop: p,
						previousValue: previousValue,
						value: props[p]
					});
				}
			}

			if (updates.length) this.emit('change', updates);
		}
	});

	var XStore = XEmitter._extend({
		initialize: function initialize(options) {
			var me = this,
			    opts = options || {},
			    store = new Store(opts.initialState),
			    actionType,
			    stateProp;

			// Store id
			if (options.id) {
				Object.defineProperty(this, '_id', {
					value: options.id
				});
			}

			// Register action callbacks in the store
			Object.defineProperties(this, {
				_callbacks: {
					writable: true,
					configurable: true,
					value: {}
				},
				addActionCallbacks: {
					value: function value(clbks) {
						for (actionType in clbks) {
							me._callbacks[actionType] = clbks[actionType].bind(this, store);
						}
					}
				},

				// Callback for register in the dispatcher
				callback: {
					value: function () {
						var actionType = arguments[0],
						    args = [].slice.call(arguments, 1);

						if (this._callbacks[actionType]) {
							// The callbacks are already bound to this xStore and the mutable store
							return this._callbacks[actionType].apply(this, args);
						}

						return true;
					}.bind(this)
				}
			});

			this.addActionCallbacks(opts.actionCallbacks || {});

			// Create inmmutable properties
			var addProperty = function addProperty(propName, value) {
				Object.defineProperty(me, propName, {
					enumerable: true,
					configurable: false,
					get: function get() {
						return store.get(propName);
					}
				});
			};

			if (opts.initialState) {
				for (stateProp in opts.initialState) {
					addProperty(stateProp, opts.initialState[stateProp]);
				}
			}

			// Emit on store change
			store.on('change', function (updates) {
				var updatesLength = updates.length,
				    update,
				    i;

				for (i = 0; i < updatesLength; i++) {
					update = updates[i];

					// If the property is new, add it to the xStore
					if (!me.hasOwnProperty(update.prop)) addProperty(update.prop, update.value);

					me.emit('change:' + update.prop, update.value, update.previousValue);
				}

				me.emit('change', updates);
			});
		},

		getState: function getState() {
			// Clone the store properties
			return xUtils._extend({}, this);
		},

		waitFor: function waitFor(ids) {
			// The xDispatcher adds itself as a property
			// when the xStore is registered
			return this._dispatcher.waitFor(ids);
		}
	});

	//#build

	module.exports = XStore;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var xUtils = __webpack_require__(18);

	//#build

	var XEmitter = function XEmitter() {
		Object.defineProperty(this, '_events', {
			value: {}
		});

		if (typeof this.initialize == 'function') this.initialize.apply(this, arguments);
	};

	// The prototype methods are stored in a different object
	// and applied as non enumerable properties later
	var emitterPrototype = {
		on: function on(eventName, listener, once) {
			var listeners = this._events[eventName] || [];

			listeners.push({ callback: listener, once: once });
			this._events[eventName] = listeners;

			return this;
		},

		once: function once(eventName, listener) {
			this.on(eventName, listener, true);
		},

		off: function off(eventName, listener) {
			if (typeof eventName == 'undefined') {
				this._events = {};
			} else if (typeof listener == 'undefined') {
				this._events[eventName] = [];
			} else {
				var listeners = this._events[eventName] || [],
				    i;

				for (i = listeners.length - 1; i >= 0; i--) {
					if (listeners[i].callback === listener) listeners.splice(i, 1);
				}
			}

			return this;
		},

		trigger: function trigger(eventName) {
			var args = [].slice.call(arguments, 1),
			    listeners = this._events[eventName] || [],
			    onceListeners = [],
			    i,
			    listener;

			// Call listeners
			for (i = 0; i < listeners.length; i++) {
				listener = listeners[i];

				if (listener.callback) listener.callback.apply(null, args);else {
					// If there is not a callback, remove!
					listener.once = true;
				}

				if (listener.once) onceListeners.push(i);
			}

			// Remove listeners marked as once
			for (i = onceListeners.length - 1; i >= 0; i--) {
				listeners.splice(onceListeners[i], 1);
			}

			return this;
		}
	};

	// EventEmitter methods
	xUtils._extend(emitterPrototype, {
		addListener: emitterPrototype.on,
		removeListener: emitterPrototype.off,
		removeAllListeners: emitterPrototype.off,
		emit: emitterPrototype.trigger
	});

	// Methods are not enumerable so, when the stores are
	// extended with the emitter, they can be iterated as
	// hashmaps
	XEmitter.prototype = {};
	for (var method in emitterPrototype) {
		Object.defineProperty(XEmitter.prototype, method, {
			value: emitterPrototype[method]
		});
	}

	// Extend method for 'inheritance', nod to backbone.js
	Object.defineProperty(XEmitter, '_extend', {
		value: function value(protoProps) {
			var parent = this,
			    child;

			if (protoProps && protoProps.hasOwnProperty(constructor)) {
				child = protoProps.constructor;
			} else {
				child = function child() {
					return parent.apply(this, arguments);
				};
			}

			xUtils._extend(child, parent);

			var Surrogate = function Surrogate() {
				// Again the constructor is also defined as not enumerable
				Object.defineProperty(this, 'constructor', {
					value: child
				});
			};
			Surrogate.prototype = parent.prototype;
			child.prototype = new Surrogate();

			// All the extending methods need to be also
			// non enumerable properties
			if (protoProps) {
				for (var p in protoProps) {
					if (p != 'constructor') {
						Object.defineProperty(child.prototype, p, {
							value: protoProps[p]
						});
					}
				}
			}

			child.__super__ = parent.prototype;

			return child;
		}
	});

	//#build

	module.exports = XEmitter;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';

	//#build

	var xUtils = {
		// Object extend, Nod to underscore.js
		_extend: function _extend(obj) {
			var source, prop;

			for (var i = 0; i < arguments.length; i++) {
				source = arguments[i];
				for (prop in source) {
					obj[prop] = source[prop];
				}
			}

			return obj;
		}
	};

	//#build

	module.exports = xUtils;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14),
	    PageLabel = __webpack_require__(20),
	    styles = __webpack_require__(22);

	var Form = function (_React$PureComponent) {
	    _inherits(Form, _React$PureComponent);

	    function Form(props) {
	        _classCallCheck(this, Form);

	        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	        _this.state = {
	            pages: _this.props.pages
	        };
	        _this.handlePageClick = _this.handlePageClick.bind(_this);

	        return _this;
	    }

	    _createClass(Form, [{
	        key: 'handlePageClick',
	        value: function handlePageClick(page) {

	            if (this.props.handlePageClick) {
	                this.props.handlePageClick(page);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var pages = this.state.pages;

	            return React.createElement(
	                'div',
	                null,
	                pages.map(function (page, idx) {
	                    return React.createElement(PageLabel, {
	                        key: idx,
	                        active: idx == 0 ? true : false,
	                        handlePageClick: _this2.handlePageClick,
	                        page: page,
	                        disabled: _this2.props.disabled,
	                        ref: 'page-' + idx });
	                }),
	                React.createElement(
	                    'div',
	                    { style: styles.page },
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return Form;
	}(React.PureComponent);

	;

	Form.propTypes = {
	    pages: PropTypes.array.isRequired,
	    handlePageClick: PropTypes.func,
	    disabled: PropTypes.bool
	};

	Form.defaultProps = {
	    disabled: false.valueOf(),
	    pages: []
	};

	module.exports = Form;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(21);

	var PageLabel = function (_React$PureComponent) {
	    _inherits(PageLabel, _React$PureComponent);

	    function PageLabel(props) {
	        _classCallCheck(this, PageLabel);

	        var _this = _possibleConstructorReturn(this, (PageLabel.__proto__ || Object.getPrototypeOf(PageLabel)).call(this, props));

	        _this.state = {
	            disabled: props.disabled
	        };

	        _this.handleClick = _this.handleClick.bind(_this);

	        return _this;
	    }

	    _createClass(PageLabel, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ disabled: nextProps.disabled });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick() {
	            // обработчик на событие клик, подгружаем связанный документ

	            if (this.state.disabled) {
	                return;
	            }

	            var page = this.props.page;

	            if (this.props.handlePageClick) {
	                this.props.handlePageClick(page);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var page = this.props.page,
	                style = Object.assign({}, styles.pageLabel, this.props.active ? { backgroundColor: 'white' } : {});

	            return React.createElement(
	                'label',
	                { style: style,
	                    disabled: this.state.disabled,
	                    ref: 'pageLabel',
	                    onClick: this.handleClick },
	                page.pageName
	            );
	        }
	    }]);

	    return PageLabel;
	}(React.PureComponent);

	PageLabel.propTypes = {
	    handlePageClick: PropTypes.func,
	    page: PropTypes.object.isRequired,
	    disabled: PropTypes.bool,
	    active: PropTypes.bool
	};

	PageLabel.defaultProps = {
	    disabled: false,
	    active: true
	};

	module.exports = PageLabel;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    pageLabel: {
	        border: '1px solid black',
	        borderRadius: '3px',
	        borderBottom: '1px solid white',
	        margin: '2px',
	        padding: '2px 10px 2px 10px'
	    }
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    page: {
	        border: '1px solid black',
	        borderRadius: '3px'
	    },
	    icons: {
	        add: 'images/icons/add.png',
	        edit: 'images/icons/edit.png',
	        delete: 'images/icons/delete.png',
	        filter: 'images/icons/filter.png',
	        print: 'images/icons/print.png',
	        ok: 'images/icons/ok.png',
	        cancel: 'images/icons/cancel.png'
	    }
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(24);

	var Input = function (_React$PureComponent) {
	    _inherits(Input, _React$PureComponent);

	    function Input(props) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

	        _this.state = {
	            value: props.value || '',
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        return _this;
	    }

	    _createClass(Input, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value, readOnly: nextProps.readOnly });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(e) {
	            var fieldValue = e.target.value;
	            this.setState({ value: fieldValue });

	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, fieldValue);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputPlaceHolder = this.props.placeholder || this.props.title,
	                inputStyle = Object.assign({}, styles.input, this.props.width ? { width: this.props.width } : {}, this.state.readOnly ? styles.readOnly : {});

	            return React.createElement(
	                'div',
	                { style: styles.wrapper },
	                React.createElement(
	                    'label',
	                    { style: styles.label, htmlFor: this.props.name, ref: 'label' },
	                    this.props.title
	                ),
	                React.createElement('input', { type: 'text',
	                    id: this.props.name,
	                    ref: 'input',
	                    style: inputStyle,
	                    name: this.props.name,
	                    value: this.state.value,
	                    readOnly: this.state.readOnly,
	                    title: this.props.title,
	                    pattern: this.props.pattern,
	                    placeholder: inputPlaceHolder,
	                    onChange: this.onChange,
	                    disabled: this.props.disabled
	                })
	            );
	        }
	    }]);

	    return Input;
	}(React.PureComponent);

	Input.propTypes = {
	    name: PropTypes.string.isRequired,
	    value: PropTypes.string,
	    readOnly: PropTypes.bool,
	    disabled: PropTypes.bool,
	    valid: PropTypes.bool,
	    placeholder: PropTypes.string,
	    pattern: PropTypes.string,
	    title: PropTypes.string
	};

	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    value: '',
	    title: ''
	};

	module.exports = Input;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%',
	        marginLeft: '5px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(26);

	var InputDate = function (_React$PureComponent) {
	    _inherits(InputDate, _React$PureComponent);

	    function InputDate(props) {
	        _classCallCheck(this, InputDate);

	        var _this = _possibleConstructorReturn(this, (InputDate.__proto__ || Object.getPrototypeOf(InputDate)).call(this, props));

	        _this.state = {
	            value: props.value || '',
	            readOnly: props.readOnly
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        return _this;
	    }

	    _createClass(InputDate, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value, readOnly: nextProps.readOnly });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(e) {
	            var fieldValue = e.target.value,
	                validation = this.validate(fieldValue);

	            if (fieldValue == null) {
	                // если значение нул, то пусть будет nul
	                validation = true;
	            }

	            if (validation) {
	                this.setState({ value: fieldValue });

	                if (this.props.onChange) {
	                    // если задан обработчик, вернем его
	                    this.props.onChange(this.props.name, fieldValue);
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputPlaceHolder = this.props.placeholder || this.props.title,
	                inputStyle = Object.assign({}, styles.input, this.props.width ? { width: this.props.width } : {}, this.state.readOnly ? styles.readOnly : {});

	            return React.createElement(
	                'div',
	                { style: styles.wrapper },
	                React.createElement(
	                    'label',
	                    { style: styles.label, htmlFor: this.props.name, ref: 'label' },
	                    this.props.title
	                ),
	                React.createElement('input', { type: 'date',
	                    name: this.props.name,
	                    ref: 'input',
	                    value: this.state.value,
	                    readOnly: this.state.readOnly,
	                    title: this.props.title,
	                    pattern: this.props.pattern,
	                    placeholder: inputPlaceHolder,
	                    min: this.props.min,
	                    max: this.props.max,
	                    onChange: this.onChange,
	                    disabled: this.props.disabled
	                })
	            );
	        }
	    }, {
	        key: 'validate',
	        value: function validate(value) {
	            var result = true;

	            // проверка на мин , мах
	            if (this.props.min && this.props.max && value) {
	                var dateValue = new Date(value);
	                result = dateValue > this.props.min && dateValue < this.props.max;
	            }

	            return result;
	        }
	    }]);

	    return InputDate;
	}(React.PureComponent);

	InputDate.propTypes = {
	    name: PropTypes.string.isRequired,
	    value: PropTypes.string,
	    min: PropTypes.string,
	    max: PropTypes.string,
	    readOnly: PropTypes.bool,
	    disabled: PropTypes.bool,
	    valid: PropTypes.bool,
	    pattern: PropTypes.string,
	    width: PropTypes.string,
	    title: PropTypes.string,
	    placeholder: PropTypes.string

	};

	InputDate.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    title: ''
	};

	module.exports = InputDate;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13),
	    styles = __webpack_require__(28);

	var PropTypes = __webpack_require__(3);

	var Input = function (_React$PureComponent) {
	    _inherits(Input, _React$PureComponent);

	    function Input(props) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

	        _this.state = {
	            value: props.value,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        return _this;
	    }

	    _createClass(Input, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value, readOnly: nextProps.readOnly });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(e) {
	            var fieldValue = e.target.value;
	            this.setState({ value: fieldValue });

	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, fieldValue);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputPlaceHolder = this.props.placeholder || this.props.name,
	                inputStyle = Object.assign({}, styles.input, this.props.width ? { width: this.props.width } : {}, this.state.readOnly ? styles.readOnly : {}),
	                inputMinValue = this.props.min,
	                inputMaxValue = this.props.max;

	            return React.createElement(
	                'div',
	                { style: styles.wrapper },
	                React.createElement(
	                    'label',
	                    { style: styles.label, htmlFor: this.props.name, ref: 'label' },
	                    this.props.title
	                ),
	                React.createElement('input', { type: 'number',
	                    id: this.props.name,
	                    ref: 'input',
	                    style: inputStyle,
	                    name: this.props.name,
	                    value: this.state.value,
	                    readOnly: this.state.readOnly,
	                    title: this.props.title,
	                    pattern: '\\d+(\\.\\d{2})?',
	                    placeholder: inputPlaceHolder,
	                    onChange: this.onChange,
	                    min: inputMinValue,
	                    max: inputMaxValue,
	                    step: '0.01',

	                    disabled: this.props.disabled
	                })
	            );
	        }
	    }]);

	    return Input;
	}(React.PureComponent);

	Input.propTypes = {
	    name: PropTypes.string.isRequired,
	    value: PropTypes.number,
	    readOnly: PropTypes.bool,
	    disabled: PropTypes.bool,
	    valid: PropTypes.bool,
	    placeholder: PropTypes.string,
	    pattern: PropTypes.string,
	    title: PropTypes.string,
	    min: PropTypes.number,
	    max: PropTypes.number
	};

	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    min: -999999999,
	    max: 999999999
	};

	module.exports = Input;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%',
	        marginLeft: '5px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14),
	    InputText = __webpack_require__(23),
	    styles = __webpack_require__(30);

	var DocCommon = function (_React$PureComponent) {
	    _inherits(DocCommon, _React$PureComponent);

	    function DocCommon(props) {
	        _classCallCheck(this, DocCommon);

	        var _this = _possibleConstructorReturn(this, (DocCommon.__proto__ || Object.getPrototypeOf(DocCommon)).call(this, props));

	        _this.state = {
	            readOnly: props.readOnly,
	            data: _this.props.data
	        };
	        return _this;
	    }

	    _createClass(DocCommon, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // при изменении, поменяет состояние (передаст дальше режим редактирования)
	            this.setState({ readOnly: nextProps.readOnly });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            /*
	                    var data = this.props.data,
	                        bpm = data.bpm || [],
	                        actualStepData = bpm.filter((step) => {
	                            // текущий шаг БП
	                            if (step.actualStep) {
	                                return step;
	                            }
	                        }),
	                        executers = actualStepData.map((stepData)=> {
	                            // найдем исполнителей
	                            return stepData.actors || {name: 'AUTHOR'};
	                        });
	            */
	            var data = this.state.data;

	            return React.createElement(
	                'div',
	                { ref: 'wrapper', style: styles.wrapper },
	                React.createElement(InputText, { ref: 'id',
	                    title: 'Id',
	                    name: 'id',
	                    value: data.id.toString(),
	                    disabled: true,
	                    width: '75%' }),
	                React.createElement(InputText, { ref: 'created',
	                    title: 'Created',
	                    name: 'created',
	                    value: data.created.toString(),
	                    disabled: true,
	                    width: '75%' }),
	                React.createElement(InputText, { ref: 'lastupdate',
	                    title: 'Updated',
	                    name: 'lastupdate',
	                    value: data.lastupdate.toString(),
	                    disabled: true,
	                    width: '75%' }),
	                React.createElement(InputText, { ref: 'status',
	                    title: 'Status',
	                    name: 'status',
	                    value: data.status,
	                    disabled: true,
	                    width: '75%' })
	            );
	        }
	    }, {
	        key: 'onChangeHandler',
	        value: function onChangeHandler(inputName, inputValue) {
	            // обработчик изменений
	            var data = flux.stores.docStore.data;
	            data[inputName] = inputValue;
	            // задать новое значение поля
	            flux.doAction('dataChange', data);
	        }
	    }]);

	    return DocCommon;
	}(React.PureComponent);

	DocCommon.propTypes = {
	    readOnly: PropTypes.bool,
	    data: PropTypes.object.isRequired
	};

	DocCommon.defaultProps = {
	    readOnly: true
	};

	module.exports = DocCommon;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'flex',
	        flexDirection: 'row',
	        width: '100%',
	        justifyContent: 'flex-start'
	    }
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14),
	    styles = __webpack_require__(32);

	//    InputText = require('./doc-input-text.jsx');

	var Select = function (_React$PureComponent) {
	    _inherits(Select, _React$PureComponent);

	    function Select(props) {
	        _classCallCheck(this, Select);

	        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

	        _this.state = {
	            value: props.value /* здесь по значению ИД */
	            , readOnly: props.readOnly,
	            disabled: props.disabled,
	            data: props.data,
	            fieldValue: props.value /*здесь по значени поля collId */
	            , btnDelete: props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        _this.btnDelClick = _this.btnDelClick.bind(_this);

	        return _this;
	    }

	    _createClass(Select, [{
	        key: 'findFieldValue',
	        value: function findFieldValue(data, collId, value) {
	            var _this2 = this;

	            // привяжет к значеню поля
	            // надо привязать данные
	            data.forEach(function (row) {
	                if (row[collId] == value) {
	                    _this2.setState({ value: row[collId], fieldValue: row[collId] });
	                    return;
	                }
	            }, this);
	        }
	    }, {
	        key: 'getValueById',
	        value: function getValueById(collId, rowId) {
	            var _this3 = this;

	            // вернет значения поля по выбранному ИД

	            var fieldValue = void 0,
	                data = this.state.data;

	            data.forEach(function (row) {
	                if (row[collId] == rowId) {
	                    fieldValue = row[collId];
	                    _this3.setState({ fieldValue: fieldValue });
	                    return;
	                }
	            }, this);

	            return fieldValue;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                value: nextProps.value,
	                readOnly: nextProps.readOnly, data: nextProps.data
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.collId && this.props.collId !== 'id') {
	                // ищем ИД по значению поля
	                this.findFieldValue(this.state.data, this.props.collId, this.props.value);
	            }
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(e) {
	            var fieldValue = e.target.value;

	            if (fieldValue == '') {
	                fieldValue = null;
	            }

	            if (this.props.collId) {
	                // найдем по ид значение поля в collId
	                fieldValue = this.getValueById(this.props.collId, fieldValue);
	            }
	            // сохраним ид как value
	            this.setState({ value: e.target.value, fieldValue: fieldValue });

	            if (this.props.onChange) {
	                // смотрим к чему привязан селект и отдаим его наверх
	                this.props.onChange(this.props.name, fieldValue); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	            }
	        }

	        /*
	            shouldComponentUpdate(nextProps, nextState) {
	                // @todo добавить проверку на изменение состояния
	                return true;
	            }
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;

	            var dataOptions = this.state.data || [],
	                inputClassName = this.props.className || 'doc-input',
	                inputReadOnly = this.state.readOnly || false,
	                inputPlaceHolder = this.props.placeholder || this.props.title,
	                Options = null,
	                inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

	            if (!this.state.value) {
	                // добавим пустую строку в массив
	                // проверим наличие пустой строки в массиве

	                var emptyObj = dataOptions.filter(function (obj) {
	                    if (obj.id === 0) {
	                        return obj;
	                    }
	                });

	                if (!emptyObj || emptyObj.length == 0) {
	                    dataOptions.splice(0, 0, { id: 0, kood: '', name: '' });
	                }
	            }

	            var dataValue = dataOptions.filter(function (item) {
	                if (item[_this4.props.collId] === _this4.state.value) {
	                    return item;
	                }
	            }, this);

	            if (dataOptions.length) {
	                Options = dataOptions.map(function (item, index) {

	                    if (typeof item == 'array') {
	                        item = item[0];
	                    }
	                    var key = 'option-' + index;
	                    return React.createElement(
	                        'option',
	                        { value: item[_this4.props.collId], key: key, ref: key },
	                        ' ',
	                        item.name,
	                        ' '
	                    );
	                }, this);
	                inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	            } else {
	                Options = React.createElement(
	                    'option',
	                    { value: 0, key: Math.random() },
	                    ' Empty '
	                );
	            }

	            var inputStyle = Object.assign({}, styles.input, inputReadOnly ? {} : styles.hide, inputReadOnly ? styles.readOnly : {}),
	                selectStyle = Object.assign({}, styles.select, inputReadOnly ? styles.hide : {}, inputReadOnly ? styles.readOnly : {}),
	                buttonStyle = Object.assign({}, styles.button, this.props.btnDelete ? {} : styles.hide);

	            return React.createElement(
	                'div',
	                { style: styles.wrapper, ref: 'wrapper' },
	                React.createElement(
	                    'label',
	                    { ref: 'label', style: styles.label,
	                        htmlFor: this.props.name },
	                    this.props.title
	                ),
	                React.createElement('input', { type: 'text', id: this.props.name,
	                    style: inputStyle,
	                    ref: 'input',
	                    value: inputDefaultValue,
	                    readOnly: true }),
	                React.createElement(
	                    'select',
	                    { ref: 'select',
	                        style: selectStyle,
	                        value: this.state.value,
	                        id: this.props.name,
	                        onChange: this.onChange },
	                    Options
	                ),
	                React.createElement(
	                    'button',
	                    { ref: 'button',
	                        style: buttonStyle,
	                        onClick: this.btnDelClick },
	                    'Delete'
	                )
	            );
	        }
	    }, {
	        key: 'btnDelClick',
	        value: function btnDelClick(event) {
	            // по вызову кнопку удалить, обнуляет значение
	            this.setState({ value: '' });
	            this.onChange(event);
	        }
	    }]);

	    return Select;
	}(React.PureComponent);

	Select.propTypes = {
	    data: PropTypes.array,
	    readOnly: PropTypes.bool,
	    disabled: PropTypes.bool,
	    btnDelete: PropTypes.bool,
	    libs: PropTypes.string,
	    collId: PropTypes.string,
	    title: PropTypes.string,
	    placeholder: PropTypes.string
	};

	Select.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    btnDelete: false,
	    value: 0,
	    collId: 'id',
	    title: ''
	};

	module.exports = Select;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'

	    },
	    input: {
	        width: '70%',
	        marginLeft: '5px'

	    },
	    hide: {
	        display: 'none'
	    },
	    select: {
	        width: '60%',
	        marginLeft: '5px'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    },
	    button: {
	        width: '10%'
	    }

	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13),
	    styles = __webpack_require__(34);

	var PropTypes = __webpack_require__(3);

	var Input = function (_React$PureComponent) {
	    _inherits(Input, _React$PureComponent);

	    function Input(props) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

	        _this.state = {
	            value: props.value || '',
	            readOnly: true,
	            disabled: props.disabled || true
	        };

	        _this.onChange = _this.onChange.bind(_this);

	        return _this;
	    }

	    _createClass(Input, [{
	        key: 'onChange',
	        value: function onChange(e) {
	            var fieldValue = e.target.value;

	            this.setState({ value: fieldValue });
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, fieldValue);
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputPlaceHolder = this.props.placeholder || this.props.title,
	                inputStyle = Object.assign({}, styles.input, this.props.width ? { width: this.props.width } : {}, this.state.readOnly ? styles.readOnly : {});

	            return React.createElement(
	                'div',
	                { style: styles.wrapper },
	                React.createElement(
	                    'label',
	                    { htmlFor: this.props.name, ref: 'label',
	                        style: styles.label },
	                    React.createElement(
	                        'span',
	                        null,
	                        this.props.title
	                    )
	                ),
	                React.createElement('textarea', {
	                    style: inputStyle,
	                    ref: 'input',
	                    id: this.props.name,
	                    name: this.props.name,
	                    value: this.state.value,
	                    readOnly: this.props.readOnly,
	                    title: this.props.title,
	                    placeholder: inputPlaceHolder,
	                    onChange: this.onChange,
	                    disabled: this.props.disabled
	                })
	            );
	        }
	    }]);

	    return Input;
	}(React.PureComponent);

	;

	Input.propTypes = {
	    name: PropTypes.string.isRequired,
	    value: PropTypes.string,
	    readOnly: PropTypes.bool,
	    disabled: PropTypes.bool,
	    valid: PropTypes.bool,
	    placeholder: PropTypes.string,
	    title: PropTypes.string
	};

	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    title: ''
	};

	module.exports = Input;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '100%'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '98%',
	        flexDirection: 'column'
	    },
	    label: {
	        margin: '5px'
	    }
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(36),
	    keydown = __webpack_require__(37),
	    KEYS = [38, 40]; // мониторим только стрелки вверх и внизх

	var isExists = function isExists(object, prop) {
	    var result = false;
	    if (prop in object) {
	        result = true;
	    }
	    return result;
	};

	//@keydown @todo

	var DataGrid = function (_React$PureComponent) {
	    _inherits(DataGrid, _React$PureComponent);

	    function DataGrid(props) {
	        _classCallCheck(this, DataGrid);

	        var _this = _possibleConstructorReturn(this, (DataGrid.__proto__ || Object.getPrototypeOf(DataGrid)).call(this, props));

	        _this.state = {
	            gridColumns: _this.props.gridColumns,
	            gridData: _this.props.gridData,
	            activeRow: 0,
	            activeColumn: '',
	            sort: {
	                name: null,
	                direction: null
	            }
	        };
	        _this.handleGridHeaderClick.bind(_this);
	        _this.handleCellDblClick.bind(_this);
	        _this.handleKeyDown.bind(_this);
	        _this.prepareTableRow = _this.prepareTableRow.bind(_this);

	        return _this;
	    }

	    _createClass(DataGrid, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // надем по по props.value индекс активной строки
	            if (this.props.value) {
	                var index = this.getGridRowIndexById(this.props.value);
	                this.setState({ activeRow: index });
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ gridColumns: nextProps.gridColumns, gridData: nextProps.gridData });
	        }

	        /*
	            shouldComponentUpdate(nextProps, nextState) {
	                // @todo добавить проверку на изменение состояния
	                return true;
	            }
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            var className = 'th';
	            /*
	             self = this;
	             onKeyDown: this.handleKeyPress('Down'),
	             onDoubleClick: this.handleCellDblClick(),
	             */

	            return React.createElement(
	                'div',
	                { style: { height: 'inherit' } },
	                React.createElement(
	                    'div',
	                    { style: styles.header },
	                    React.createElement(
	                        'table',
	                        { ref: 'dataGridTable', style: styles.headerTable },
	                        React.createElement(
	                            'tbody',
	                            null,
	                            React.createElement(
	                                'tr',
	                                null,
	                                this.prepareTableHeader()
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: styles.wrapper },
	                    React.createElement(
	                        'table',
	                        { style: styles.mainTable },
	                        React.createElement(
	                            'tbody',
	                            null,
	                            React.createElement(
	                                'tr',
	                                { style: { visibility: 'collapse' } },
	                                this.prepareTableHeader(true)
	                            ),
	                            this.prepareTableRow()
	                        )
	                    )
	                )
	            );
	        } // render


	    }, {
	        key: 'getGridRowIndexById',
	        value: function getGridRowIndexById(docId) {
	            // ищем индех в массиве данных
	            var index = 0,
	                data = this.props.gridData;

	            if (docId) {
	                for (var i = 0; i < data.length; i++) {
	                    var row = data[i];
	                    if (row && data[i]['id'] == docId) {
	                        index = i;
	                        break;
	                    }
	                }
	            }
	            return index;
	        }
	    }, {
	        key: 'handleCellClick',
	        value: function handleCellClick(idx) {
	            // отрабатывает событи клика по ячейке

	            this.setState({
	                activeRow: idx
	            });

	            var action = this.props.onChangeAction || null;

	            if (this.props.gridData.length > 0) {
	                var docId = this.props.gridData[idx].id;

	                if (this.props.onClick) {
	                    this.props.onClick(action, docId, idx);
	                }
	            }
	        }
	    }, {
	        key: 'handleCellDblClick',
	        value: function handleCellDblClick(idx) {
	            // отметим активную строку и вызовен обработчик события dblClick
	            this.handleCellClick(idx);
	            if (this.props.onDblClick) {
	                this.props.onDblClick();
	            }
	        }
	    }, {
	        key: 'handleGridHeaderClick',
	        value: function handleGridHeaderClick(name) {
	            var sort = this.state.sort;
	            if (sort.name === name) {
	                sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
	            } else {
	                sort = {
	                    name: name,
	                    direction: 'asc'
	                };
	            }

	            var sortBy = [{ column: sort.name, direction: sort.direction }];

	            this.setState({
	                activeColumn: name,
	                sort: sort
	            });

	            if (this.props.onHeaderClick) {
	                this.props.onHeaderClick(sortBy);
	            }
	        }
	    }, {
	        key: 'handleKeyDown',
	        value: function handleKeyDown(e) {
	            // реакция на клавиатуру
	            var rowIndex = this.state.activeRow;
	            switch (e.which) {
	                case 40:
	                    // вниз, увеличим активную строку на + 1
	                    rowIndex++;

	                    if (this.state.gridData.length < rowIndex) {
	                        // вернем прежнее значение
	                        rowIndex = this.state.activeRow;
	                    }
	                    break;
	                case 38:
	                    // вниз, увеличим активную строку на - 1
	                    rowIndex--;
	                    rowIndex = rowIndex < 0 ? 0 : rowIndex;
	                    break;
	            }
	            this.setState({
	                activeRow: rowIndex
	            });
	        }
	    }, {
	        key: 'prepareTableRow',
	        value: function prepareTableRow() {
	            var _this2 = this;

	            return this.state.gridData.map(function (row, rowIndex) {
	                var setRowActive = {},
	                    objectIndex = 'tr-' + rowIndex,
	                    activeRow = _this2.state.activeRow;

	                var rowObject = React.createElement(
	                    'tr',
	                    {
	                        ref: objectIndex,
	                        onClick: _this2.handleCellClick.bind(_this2, rowIndex),
	                        onDoubleClick: _this2.handleCellDblClick.bind(_this2, rowIndex),
	                        onKeyDown: _this2.handleKeyDown.bind(_this2),
	                        style: Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused : {}),
	                        key: objectIndex },
	                    _this2.state.gridColumns.map(function (column, columnIndex) {
	                        var cellIndex = 'td-' + rowIndex + '-' + columnIndex;

	                        var display = (isExists(column, 'show') ? column.show : true) ? true : false,
	                            width = isExists(column, 'width') ? column.width : '100%',
	                            style = Object.assign({}, styles.td, !display ? { display: 'none' } : {}, { width: width });

	                        return React.createElement(
	                            'td',
	                            { style: style, ref: cellIndex, key: cellIndex },
	                            row[column.id]
	                        );
	                    })
	                );
	                return rowObject;
	            }, this);
	        }
	    }, {
	        key: 'prepareTableHeader',
	        value: function prepareTableHeader(isHidden) {
	            var _this3 = this;

	            var gridColumns = this.props.gridColumns,
	                className = 'th';

	            return gridColumns.map(function (column, index) {
	                var headerIndex = 'th-' + index;

	                var headerStyle = 'th';
	                if (isHidden) {
	                    headerStyle = 'thHidden';
	                }

	                var display = (isExists(column, 'show') ? column.show : true) ? true : false,
	                    width = isExists(column, 'width') ? column.width : '100%',
	                    style = Object.assign({}, styles[headerStyle], !display ? { display: 'none' } : {}, { width: width }),
	                    activeColumn = _this3.state.activeColumn,
	                    iconType = _this3.state.sort.direction,
	                    imageStyleAsc = Object.assign({}, styles.image, activeColumn == column.id && iconType == 'asc' ? {} : { display: 'none' }),
	                    imageStyleDesc = Object.assign({}, styles.image, activeColumn == column.id && iconType == 'desc' ? {} : { display: 'none' });

	                // установить видимость
	                return React.createElement(
	                    'th',
	                    {
	                        style: style,
	                        ref: headerIndex,
	                        key: headerIndex,
	                        onClick: _this3.handleGridHeaderClick.bind(_this3, column.id) },
	                    React.createElement(
	                        'span',
	                        null,
	                        column.name
	                    ),
	                    isHidden ? React.createElement('img', { ref: 'imageAsc', style: imageStyleAsc, src: styles.icons['asc'] }) : null,
	                    isHidden ? React.createElement('img', { ref: 'imageDesc', style: imageStyleDesc, src: styles.icons['desc'] }) : null
	                );
	            }, this);
	        }
	    }]);

	    return DataGrid;
	}(React.PureComponent);
	/*
	DataGrid.propTypes = {
	    gridColumns: PropTypes.array.isRequired,
	    gridData: PropTypes.array.isRequired,
	    onChangeAction: PropTypes.string,
	    onClick: PropTypes.func,
	    onDblClick: PropTypes.func,
	    onHeaderClick: PropTypes.func,
	    activeRow: PropTypes.number
	}
	*/

	DataGrid.defaultProps = {
	    gridColumns: [],
	    gridData: []
	};

	module.exports = DataGrid;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    mainTable: {
	        tableLayout: 'fixed',
	        width: '70%',
	        position: 'relative',
	        top: '-30px'
	    },
	    headerTable: {
	        tableLayout: 'fixed',
	        width: '70%'
	    },
	    th: {
	        borderBottom: '1px solid black',
	        backgroundColor: 'grey',
	        height: '50px',
	        border: '1px solid lightgray',
	        display: 'table-cell'
	    },

	    thHidden: {
	        borderBottom: '1px solid black',
	        backgroundColor: 'grey',
	        height: '1px',
	        border: '1px solid lightgray',
	        display: 'table-cell'
	    },

	    tr: {
	        backgroundColor: 'white'
	    },

	    focused: {
	        backgroundColor: 'lightblue'
	    },

	    td: {
	        border: '1px solid lightgray',
	        display: 'table-cell',
	        paddingLeft: '5px'
	    },

	    icons: {
	        asc: '/images/icons/sort-alpha-asc.png',
	        desc: '/images/icons/sort-alpha-desc.png'
	    },

	    image: {
	        margin: '1px'
	    },

	    wrapper: {
	        height: 'inherit',
	        overflow: 'scroll'
	    },

	    header: {
	        overflow: 'scroll',
	        overflowX: 'hidden'

	    }

	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ALL_PRINTABLE_KEYS = exports.ALL_KEYS = exports.Keys = exports.setBinding = exports.keydownScoped = exports.default = undefined;

	var _decorators = __webpack_require__(38);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_decorators).default;
	  }
	});
	Object.defineProperty(exports, 'keydownScoped', {
	  enumerable: true,
	  get: function get() {
	    return _decorators.keydownScoped;
	  }
	});

	var _store = __webpack_require__(40);

	Object.defineProperty(exports, 'setBinding', {
	  enumerable: true,
	  get: function get() {
	    return _store.setBinding;
	  }
	});

	var _keys = __webpack_require__(42);

	Object.defineProperty(exports, 'Keys', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_keys).default;
	  }
	});
	Object.defineProperty(exports, 'ALL_KEYS', {
	  enumerable: true,
	  get: function get() {
	    return _keys.ALL_KEYS;
	  }
	});
	Object.defineProperty(exports, 'ALL_PRINTABLE_KEYS', {
	  enumerable: true,
	  get: function get() {
	    return _keys.ALL_PRINTABLE_KEYS;
	  }
	});

	__webpack_require__(101);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.keydownScoped = undefined;

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}; /**
	    * @module decorators
	    *
	    */

	var _class_decorator = __webpack_require__(39);

	var _class_decorator2 = _interopRequireDefault(_class_decorator);

	var _method_decorator = __webpack_require__(99);

	var _method_decorator2 = _interopRequireDefault(_method_decorator);

	var _method_decorator_scoped = __webpack_require__(100);

	var _method_decorator_scoped2 = _interopRequireDefault(_method_decorator_scoped);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * noopDecorator
	 *
	 * @access private
	 * @return {undefined} Returns `undefined` so that the original undecorated instance/method is used
	 */
	function noopDecorator() {
	  return undefined;
	}

	/**
	 * _decorator
	 *
	 * @access private
	 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
	 * @param {Array} ...args Remainder of arguments passed in
	 * @return {Function} The decorated class or method
	 */
	function _decorator(methodFn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  // check the first argument to see if it's a user-supplied keycode or array
	  // of keycodes, or if it's the wrapped class or method
	  var testArg = args[0];
	  var isArray = Array.isArray(testArg);

	  // if the test argument is not an object or function, it is user-supplied
	  // keycodes. else there are no arguments and it's just the wrapped class
	  if (isArray || ~['string', 'number', 'symbol'].indexOf(typeof testArg === 'undefined' ? 'undefined' : _typeof(testArg))) {
	    var keys = isArray ? testArg : args;

	    // return the decorator function, which on the next call will look for
	    // the presence of a method name to determine if this is a wrapped method
	    // or component
	    return function (target, methodName, descriptor) {
	      return methodName ? methodFn({ target: target, descriptor: descriptor, keys: keys }) : (0, _class_decorator2.default)(target, keys);
	    };
	  } else {
	    var WrappedComponent = args[0];
	    var methodName = args[1];

	    // method decorators without keycode (which) arguments are not allowed.
	    if (WrappedComponent && !methodName) {
	      return _class_decorator2.default.apply(undefined, args);
	    } else {
	      console.warn(methodName + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
	      return noopDecorator;
	    }
	  }
	}

	/**
	 * keydownScoped
	 *
	 * Method decorator that will look for changes to its targeted component's
	 * `keydown` props to decide when to trigger, rather than responding directly
	 * to keydown events. This lets you specify a @keydown decorated class higher
	 * up in the view hierarchy for larger scoping of keydown events, or for
	 * programmatically sending keydown events as props into the components in order
	 * to trigger decorated methods with matching keys.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydownScoped() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return _decorator.apply(undefined, [_method_decorator_scoped2.default].concat(args));
	}

	/**
	 * keydown
	 *
	 * The main decorator and default export, handles both classes and methods.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydown() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }

	  return _decorator.apply(undefined, [_method_decorator2.default].concat(args));
	}

	exports.default = keydown;
	exports.keydownScoped = keydownScoped;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(40);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(96);

	var _keys = __webpack_require__(42);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /**
	   * @module componentWrapper
	   *
	   */

	/**
	 * componentWrapper
	 *
	 * @access public
	 * @param {object} WrappedComponent React component class to be wrapped
	 * @param {array} [keys] The key(s) bound to the class
	 * @return {object} The higher-order function that wraps the decorated class
	 */
	function componentWrapper(WrappedComponent) {
	  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _keys.ALL_KEYS;

	  var KeyBoardHelper = function (_React$Component) {
	    _inherits(KeyBoardHelper, _React$Component);

	    function KeyBoardHelper(props) {
	      _classCallCheck(this, KeyBoardHelper);

	      var _this = _possibleConstructorReturn(this, (KeyBoardHelper.__proto__ || Object.getPrototypeOf(KeyBoardHelper)).call(this, props));

	      _this.state = {
	        event: null
	      };
	      return _this;
	    }

	    _createClass(KeyBoardHelper, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        (0, _event_handlers.onMount)(this);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        (0, _event_handlers.onUnmount)(this);
	      }
	    }, {
	      key: 'handleKeyDown',
	      value: function handleKeyDown(event) {
	        var _this2 = this;

	        // to simulate a keypress, set the event and then clear it in the callback
	        this.setState({ event: event }, function () {
	          return _this2.setState({ event: null });
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { keydown: this.state }));
	      }
	    }]);

	    return KeyBoardHelper;
	  }(_react2.default.Component);

	  _store2.default.setBinding({ keys: [].concat(keys), fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype });

	  return KeyBoardHelper;
	}

	exports.default = componentWrapper;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	exports._resetStore = _resetStore;

	var _match_keys = __webpack_require__(41);

	var _match_keys2 = _interopRequireDefault(_match_keys);

	var _parse_keys = __webpack_require__(94);

	var _parse_keys2 = _interopRequireDefault(_parse_keys);

	var _uuid = __webpack_require__(95);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	} /**
	   * @module store
	   *
	   */

	/**
	 * private
	 *
	 */

	// dict for class prototypes => bindings
	var _handlers = new Map();

	// all mounted instances that have keybindings
	var _instances = new Set();

	// for testing
	function _resetStore() {
	  _handlers.clear();
	  _instances.clear();
	}

	/**
	 * public
	 *
	 */

	var Store = {

	  /**
	   * activate
	   *
	   * @access public
	   * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
	   */
	  activate: function activate(instances) {
	    var instancesArray = [].concat(instances);

	    // if no components were found as ancestors of the event target,
	    // effectively deactivate keydown handling by capping the set of instances
	    // with `null`.
	    if (!instancesArray.length) {
	      _instances.add(null);
	    } else {
	      _instances.delete(null);

	      // deleting and then adding the instance(s) has the effect of sorting the set
	      // according to instance activation (ascending)
	      instancesArray.forEach(function (instance) {
	        _instances.delete(instance);
	        _instances.add(instance);
	      });
	    }
	  },

	  /**
	   * deleteInstance
	   *
	   * @access public
	   * @param {object} target Instantiated class that extended React.Component
	   * @return {boolean} The value set.has( target ) would have returned prior to deletion
	   */
	  deleteInstance: function deleteInstance(target) {
	    _instances.delete(target);
	  },
	  findBindingForEvent: function findBindingForEvent(event) {
	    if (!_instances.has(null)) {
	      var keyMatchesEvent = function keyMatchesEvent(keySet) {
	        return (0, _match_keys2.default)({ keySet: keySet, event: event });
	      };

	      // loop through instances in reverse activation order so that most
	      // recently activated instance gets first dibs on event
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = [].concat(_toConsumableArray(_instances)).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var instance = _step.value;

	          var bindings = this.getBinding(instance.constructor.prototype);
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var _step2$value = _slicedToArray(_step2.value, 2),
	                  keySets = _step2$value[0],
	                  fn = _step2$value[1];

	              if (keySets.some(keyMatchesEvent)) {
	                // return when matching keybinding is found - i.e. only one
	                // keybound component can respond to a given key code. to get around this,
	                // scope a common ancestor component class with @keydown and use
	                // @keydownScoped to bind the duplicate keys in your child components
	                // (or just inspect nextProps.keydown.event).
	                return { fn: fn, instance: instance };
	              }
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	    return null;
	  },

	  /**
	   * getBinding
	   *
	   * @access public
	   * @param {object} target Class used as key in dict of key bindings
	   * @return {object} The object containing bindings for the given class
	   */
	  getBinding: function getBinding(_ref) {
	    var __reactKeydownUUID = _ref.__reactKeydownUUID;

	    return _handlers.get(__reactKeydownUUID);
	  },

	  /**
	   * getInstances
	   *
	   * @access public
	   * @return {set} All stored instances (all mounted component instances with keybindings)
	   */
	  getInstances: function getInstances() {
	    return _instances;
	  },

	  /**
	   * isEmpty
	   *
	   * @access public
	   * @return {number} Size of the set of all stored instances
	   */
	  isEmpty: function isEmpty() {
	    return !_instances.size;
	  },

	  /**
	   * setBinding
	   *
	   * @access public
	   * @param {object} args All arguments necessary to set the binding
	   * @param {array} args.keys Key codes that should trigger the fn
	   * @param {function} args.fn The callback to be triggered when given keys are pressed
	   * @param {object} args.target The decorated class
	   */
	  setBinding: function setBinding(_ref2) {
	    var keys = _ref2.keys,
	        fn = _ref2.fn,
	        target = _ref2.target;

	    var keySets = (0, _parse_keys2.default)(keys);

	    var __reactKeydownUUID = target.__reactKeydownUUID;

	    if (!__reactKeydownUUID) {
	      target.__reactKeydownUUID = (0, _uuid2.default)();
	      _handlers.set(target.__reactKeydownUUID, new Map([[keySets, fn]]));
	    } else {
	      _handlers.get(__reactKeydownUUID).set(keySets, fn);
	    }
	  }
	};

	exports.default = Store;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(42);

	var PRINTABLE_CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()-_+=[]\\{}|;\':",./<>?£';

	var modKeys = Object.keys(_keys.modifiers);

	function matchKeys(_ref) {
	  var keySet = _ref.keySet,
	      event = _ref.event;
	  var key = keySet.key,
	      _keySet$modifiers = keySet.modifiers,
	      modifiers = _keySet$modifiers === undefined ? [] : _keySet$modifiers;

	  var keysMatch = void 0;

	  keysMatch = key === _keys.ALL_KEYS;

	  if (key === _keys.ALL_PRINTABLE_KEYS) {
	    if (event.key) {
	      // Modern browsers implement `key`, so if `key` is length 1, we have a match. e.g. 'a' for the
	      // a key, or '2' for the 2 key. All other non-printable characters have names, e.g. 'Enter' or 'Backspace'.
	      keysMatch = event.key.length === 1;
	    } else {
	      // For browsers that do no support `event.key`, we test against a list of characters
	      var pressedChar = String.fromCharCode(event.charCode);
	      keysMatch = PRINTABLE_CHARACTERS.indexOf(pressedChar) >= 0;
	    }
	  }

	  if (key === event.which) {
	    var evtModKeys = modKeys.filter(function (modKey) {
	      return event[modKey + 'Key'];
	    }).sort();
	    keysMatch = modifiers.length === evtModKeys.length && modifiers.every(function (modKey, index) {
	      return evtModKeys[index] === modKey;
	    });
	  }

	  return keysMatch;
	}

	exports.default = matchKeys;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ALL_PRINTABLE_KEYS = exports.ALL_KEYS = exports.modifiers = undefined;

	__webpack_require__(43);

	// TODO: Need better, more complete, and more methodical key definitions

	var Keys = {
	  backspace: 8,
	  del: 46,
	  delete: 46,
	  tab: 9,
	  enter: 13,
	  'return': 13,
	  esc: 27,
	  space: 32,
	  left: 37,
	  up: 38,
	  right: 39,
	  down: 40,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221
	};

	// Add uppercase versions of keys above for backwards compatibility
	Object.keys(Keys).forEach(function (key) {
	  return Keys[key.toUpperCase()] = Keys[key];
	});

	'0123456789'.split('').forEach(function (num, index) {
	  return Keys[num] = index + 48;
	});

	'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter, index) {
	  Keys[letter] = index + 65;
	  Keys[letter.toLowerCase()] = index + 65;
	});

	// fn keys
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (item, index) {
	  return Keys['f' + index] = 111 + index;
	});

	var modifiers = exports.modifiers = {
	  control: 'ctrl',
	  ctrl: 'ctrl',
	  shift: 'shift',
	  meta: 'meta',
	  cmd: 'meta',
	  command: 'meta',
	  option: 'alt',
	  alt: 'alt'
	};

	var ALL_KEYS = exports.ALL_KEYS = Symbol('ALL_KEYS');

	var ALL_PRINTABLE_KEYS = exports.ALL_PRINTABLE_KEYS = Symbol('ALL_PRINTABLE_KEYS');

	exports.default = Keys;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(44);
	__webpack_require__(92);
	module.exports = __webpack_require__(50).Symbol;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var global = __webpack_require__(45);
	var has = __webpack_require__(46);
	var DESCRIPTORS = __webpack_require__(47);
	var $export = __webpack_require__(49);
	var redefine = __webpack_require__(59);
	var META = __webpack_require__(63).KEY;
	var $fails = __webpack_require__(48);
	var shared = __webpack_require__(64);
	var setToStringTag = __webpack_require__(65);
	var uid = __webpack_require__(60);
	var wks = __webpack_require__(66);
	var wksExt = __webpack_require__(67);
	var wksDefine = __webpack_require__(68);
	var enumKeys = __webpack_require__(70);
	var isArray = __webpack_require__(85);
	var anObject = __webpack_require__(53);
	var toIObject = __webpack_require__(73);
	var toPrimitive = __webpack_require__(57);
	var createDesc = __webpack_require__(58);
	var _create = __webpack_require__(86);
	var gOPNExt = __webpack_require__(89);
	var $GOPD = __webpack_require__(91);
	var $DP = __webpack_require__(52);
	var $keys = __webpack_require__(71);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(90).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(84).f = $propertyIsEnumerable;
	  __webpack_require__(83).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(69)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
	  wks(es6Symbols[j++]);
	}for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
	  wksDefine(wellKnownSymbols[k++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) {
	      if (SymbolRegistry[key] === sym) return key;
	    }
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(51)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
	// eslint-disable-next-line no-new-func
	: Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	"use strict";

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(48)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(45);
	var core = __webpack_require__(50);
	var hide = __webpack_require__(51);
	var redefine = __webpack_require__(59);
	var ctx = __webpack_require__(61);
	var PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(52);
	var createDesc = __webpack_require__(58);
	module.exports = __webpack_require__(47) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(53);
	var IE8_DOM_DEFINE = __webpack_require__(55);
	var toPrimitive = __webpack_require__(57);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(47) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(54);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = !__webpack_require__(47) && !__webpack_require__(48)(function () {
	  return Object.defineProperty(__webpack_require__(56)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(54);
	var document = __webpack_require__(45).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(54);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(45);
	var hide = __webpack_require__(51);
	var has = __webpack_require__(46);
	var SRC = __webpack_require__(60)('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	__webpack_require__(50).inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    hide(O, key, val);
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	'use strict';

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(62);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var META = __webpack_require__(60)('meta');
	var isObject = __webpack_require__(54);
	var has = __webpack_require__(46);
	var setDesc = __webpack_require__(52).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(48)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(45);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(52).f;
	var has = __webpack_require__(46);
	var TAG = __webpack_require__(66)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(64)('wks');
	var uid = __webpack_require__(60);
	var _Symbol = __webpack_require__(45).Symbol;
	var USE_SYMBOL = typeof _Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.f = __webpack_require__(66);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(45);
	var core = __webpack_require__(50);
	var LIBRARY = __webpack_require__(69);
	var wksExt = __webpack_require__(67);
	var defineProperty = __webpack_require__(52).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = false;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(71);
	var gOPS = __webpack_require__(83);
	var pIE = __webpack_require__(84);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(72);
	var enumBugKeys = __webpack_require__(82);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(46);
	var toIObject = __webpack_require__(73);
	var arrayIndexOf = __webpack_require__(77)(false);
	var IE_PROTO = __webpack_require__(81)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(74);
	var defined = __webpack_require__(76);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(75);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	"use strict";

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(73);
	var toLength = __webpack_require__(78);
	var toAbsoluteIndex = __webpack_require__(80);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	      // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(79);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	"use strict";

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(79);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var shared = __webpack_require__(64)('keys');
	var uid = __webpack_require__(60);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	'use strict';

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	"use strict";

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	"use strict";

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(75);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(53);
	var dPs = __webpack_require__(87);
	var enumBugKeys = __webpack_require__(82);
	var IE_PROTO = __webpack_require__(81)('IE_PROTO');
	var Empty = function Empty() {/* empty */};
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(56)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(88).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(52);
	var anObject = __webpack_require__(53);
	var getKeys = __webpack_require__(71);

	module.exports = __webpack_require__(47) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var document = __webpack_require__(45).document;
	module.exports = document && document.documentElement;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(73);
	var gOPN = __webpack_require__(90).f;
	var toString = {}.toString;

	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(72);
	var hiddenKeys = __webpack_require__(82).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var pIE = __webpack_require__(84);
	var createDesc = __webpack_require__(58);
	var toIObject = __webpack_require__(73);
	var toPrimitive = __webpack_require__(57);
	var has = __webpack_require__(46);
	var IE8_DOM_DEFINE = __webpack_require__(55);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(47) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()

	var classof = __webpack_require__(93);
	var test = {};
	test[__webpack_require__(66)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(59)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(75);
	var TAG = __webpack_require__(66)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(42);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function parseKeys(keysArray) {
	  return keysArray.map(function (key) {
	    var keySet = { key: key };
	    if (typeof key === 'string') {
	      var keyString = key.toLowerCase().trim();
	      var matches = keyString.split(/\s?\+\s?/);
	      keySet = matches.length === 1 ? { key: _keys2.default[keyString] } : {
	        key: _keys2.default[matches.pop()],
	        modifiers: matches.map(function (modKey) {
	          return _keys.modifiers[modKey];
	        }).sort()
	      };
	    }
	    return keySet;
	  });
	}

	exports.default = parseKeys;

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = uuid;
	// Counter being incremented. JS is single-threaded, so it'll Just Work™.
	var __counter = 1;

	/**
	 * Returns a process-wide unique identifier.
	 */
	function uuid() {
	  return "uid-" + __counter++;
	}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onUnmount = exports.onMount = undefined;
	exports._onClick = _onClick;
	exports._onKeyDown = _onKeyDown;
	exports._shouldConsider = _shouldConsider;

	var _dom_helpers = __webpack_require__(97);

	var _dom_helpers2 = _interopRequireDefault(_dom_helpers);

	var _listeners = __webpack_require__(98);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _store = __webpack_require__(40);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	} /* eslint-disable no-use-before-define */
	/**
	 * @module eventHandlers
	 *
	 */

	/**
	 * private
	 *
	 */

	/**
	 * _onClick
	 *
	 * @access private
	 * @param {object} event The click event object
	 * @param {object} event.target The DOM node from the click event
	 */
	function _onClick(_ref) {
	  var target = _ref.target;

	  _store2.default.activate([].concat(_toConsumableArray(_store2.default.getInstances())).reduce(_dom_helpers2.default.findContainerNodes(target), []).sort(_dom_helpers2.default.sortByDOMPosition).map(function (item) {
	    return item.instance;
	  }));
	}

	/**
	 * _onKeyDown: The keydown event callback
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {number} event.which The key code (which) received from the keydown event
	 */
	function _onKeyDown(event) {
	  var forceConsider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (forceConsider || _shouldConsider(event)) {
	    var _ref2 = _store2.default.findBindingForEvent(event) || {},
	        fn = _ref2.fn,
	        instance = _ref2.instance;

	    if (fn) {
	      fn.call(instance, event);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * _shouldConsider: Conditions for proceeding with key event handling
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {object} event.target The node origin of the event
	 * @return {boolean} Whether to continue procesing the keydown event
	 */
	function _shouldConsider(_ref3) {
	  var ctrlKey = _ref3.ctrlKey,
	      target = _ref3.target;

	  return ctrlKey || !~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(target.tagName) && (!target.getAttribute || target.getAttribute('role') !== 'textbox');
	}

	/**
	 * public
	 *
	 */

	/**
	 * onMount
	 *
	 * @access public
	 */
	function onMount(instance) {
	  _store2.default.activate(instance);
	  _listeners2.default.bindKeys(_onKeyDown);
	  _listeners2.default.bindClicks(_onClick);
	  _dom_helpers2.default.bindFocusables(instance, _store2.default.activate);
	}

	/**
	 * onUnmount
	 *
	 * @access public
	 */
	function onUnmount(instance) {
	  _store2.default.deleteInstance(instance);
	  if (_store2.default.isEmpty()) {
	    _listeners2.default.unbindClicks(_onClick);
	    _listeners2.default.unbindKeys(_onKeyDown);
	  }
	}

	exports.onMount = onMount;
	exports.onUnmount = onUnmount;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var focusableSelector = 'a[href], button, input, object, select, textarea, [tabindex]';

	/**
	 * bindFocusables: Find any focusable child elements of the component instance and
	 * add an onFocus handler to focus our keydown handlers on the parent component
	 * when user keys applies focus to the element.
	 *
	 * NOTE: One limitation of this right now is that if you tab out of the
	 * component, _focusedInstance will still be set until next click or mount or
	 * controlled focus.
	 *
	 * @access public
	 * @param {object} instance The key-bound component instance
	 * @param {callback} activateOnFocus The fn to fire when element is focused
	 */
	/**
	 * @module domHelpers
	 *
	 */
	function bindFocusables(instance, activateOnFocus) {
	  if (document.querySelectorAll) {
	    var node = _reactDom2.default.findDOMNode(instance);
	    if (node) {
	      var focusables = node.querySelectorAll(focusableSelector);
	      if (focusables.length) {
	        var onFocus = function onFocus(element) {
	          var onFocusPrev = element.onfocus;
	          return function (event) {
	            activateOnFocus(instance);
	            if (onFocusPrev) onFocusPrev.call(element, event);
	          };
	        };
	        Array.prototype.slice.call(focusables).forEach(function (element) {
	          return element.onfocus = onFocus(element);
	        });
	      }
	    }
	  }
	}

	/**
	 * findContainerNodes: Called by our click handler to find instances with nodes
	 * that are equal to or that contain the click target. Any that pass this test
	 * will be recipients of the next keydown event.
	 *
	 * @access public
	 * @param {object} target The click event.target DOM element
	 * @return {function} Reducer function
	 */
	function findContainerNodes(target) {
	  return function (memo, instance) {
	    try {
	      var node = _reactDom2.default.findDOMNode(instance);
	      if (node && (node === target || node.contains(target))) {
	        memo.push({ instance: instance, node: node });
	      }
	    } finally {
	      return memo;
	    }
	  };
	}

	/**
	 * sortByDOMPosition: Called by our click handler to sort a list of instances
	 * according to least -> most nested. This is so that if multiple keybound
	 * instances have nodes that are ancestors of the click target, they will be
	 * sorted to let the instance closest to the click target get first dibs on the
	 * next key down event.
	 */
	function sortByDOMPosition(a, b) {
	  return a.node.compareDocumentPosition(b.node) === 10 ? 1 : -1;
	}

	exports.default = { bindFocusables: bindFocusables, findContainerNodes: findContainerNodes, sortByDOMPosition: sortByDOMPosition };

/***/ }),
/* 98 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module Listeners
	 *
	 */

	// flag for whether click listener has been bound to document
	var _clicksBound = false;

	// flag for whether keydown listener has been bound to document
	var _keysBound = false;

	var Listeners = {
	  /**
	   * _bindKeys
	   *
	   * @access public
	   */
	  bindKeys: function bindKeys(callback) {
	    if (!_keysBound) {
	      document.addEventListener('keydown', callback);
	      _keysBound = true;
	    }
	  },

	  /**
	   * unbindKeys
	   *
	   * @access public
	   */
	  unbindKeys: function unbindKeys(callback) {
	    if (_keysBound) {
	      document.removeEventListener('keydown', callback);
	      _keysBound = false;
	    }
	  },

	  /**
	   * bindClicks
	   *
	   * @access public
	   */
	  bindClicks: function bindClicks(callback) {
	    if (!_clicksBound) {
	      document.addEventListener('click', callback, true);
	      _clicksBound = true;
	    }
	  },

	  /**
	   * unbindClicks
	   *
	   * @access public
	   */
	  unbindClicks: function unbindClicks(callback) {
	    if (_clicksBound) {
	      document.removeEventListener('click', callback, true);
	      _clicksBound = false;
	    }
	  }
	};

	exports.default = Listeners;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}; /**
	    * @module methodWrapper
	    *
	    */

	var _store = __webpack_require__(40);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(96);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * _isReactKeyDown
	 *
	 * @access private
	 * @param {object} event The possibly synthetic event passed as an argument with
	 * the method invocation.
	 * @return {boolean}
	 */
	function _isReactKeyDown(event) {
	  return event && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object' && event.nativeEvent instanceof window.KeyboardEvent && event.type === 'keydown';
	}

	/**
	 * methodWrapper
	 *
	 * @access public
	 * @param {object} args All arguments necessary for wrapping method
	 * @param {object} args.target The decorated class
	 * @param {object} args.descriptor Method descriptor
	 * @param {array} args.keys The array of keys bound to the given method
	 * @return {object} The method descriptor
	 */
	function methodWrapper(_ref) {
	  var target = _ref.target,
	      descriptor = _ref.descriptor,
	      keys = _ref.keys;

	  var fn = descriptor.value;

	  // if we haven't already created a binding for this class (via another
	  // decorated method), wrap these lifecycle methods.
	  if (!_store2.default.getBinding(target)) {
	    var componentDidMount = target.componentDidMount,
	        componentWillUnmount = target.componentWillUnmount;

	    target.componentDidMount = function () {
	      (0, _event_handlers.onMount)(this);
	      if (componentDidMount) return componentDidMount.call(this);
	    };

	    target.componentWillUnmount = function () {
	      (0, _event_handlers.onUnmount)(this);
	      if (componentWillUnmount) return componentWillUnmount.call(this);
	    };
	  }

	  // add this binding of keys and method to the target's bindings
	  _store2.default.setBinding({ keys: keys, target: target, fn: fn });

	  descriptor.value = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var maybeEvent = args[0];

	    if (_isReactKeyDown(maybeEvent)) {
	      // proxy method in order to use @keydown as filter for keydown events coming
	      // from an actual onKeyDown binding (as identified by react's addition of
	      // 'nativeEvent' + type === 'keydown')
	      if (!maybeEvent.ctrlKey) {
	        // we already whitelist shortcuts with ctrl modifiers so if we were to
	        // fire it again here the method would trigger twice. see https://github.com/glortho/react-keydown/issues/38
	        return (0, _event_handlers._onKeyDown)(maybeEvent, true);
	      }
	    } else if (!maybeEvent || !(maybeEvent instanceof window.KeyboardEvent) || maybeEvent.type !== 'keydown') {
	      // if our first argument is a keydown event it is being handled by our
	      // binding system. if it's anything else, just pass through.
	      return fn.call.apply(fn, [this].concat(args));
	    }
	  };

	  return descriptor;
	}

	exports.default = methodWrapper;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _match_keys = __webpack_require__(41);

	var _match_keys2 = _interopRequireDefault(_match_keys);

	var _parse_keys = __webpack_require__(94);

	var _parse_keys2 = _interopRequireDefault(_parse_keys);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * methodWrapperScoped
	 *
	 * @access public
	 * @param {object} args All args necessary for decorating the method
	 * @param {object} args.target The decorated method's class object
	 * @param {object} args.descriptor The method's descriptor object
	 * @param {array} args.keys The key codes bound to the decorated method
	 * @return {object} The method's descriptor object
	 */
	/**
	 * @module methodWrapperScoped
	 *
	 */
	function methodWrapperScoped(_ref) {
	  var target = _ref.target,
	      descriptor = _ref.descriptor,
	      keys = _ref.keys;
	  var componentWillReceiveProps = target.componentWillReceiveProps;

	  var fn = descriptor.value;
	  if (!keys) {
	    console.warn(fn + ': keydownScoped requires one or more keys');
	  } else {

	    /**
	     * _shouldTrigger
	     *
	     * @access private
	     * @param {object} thisProps Exsting props from the wrapped component
	     * @param {object} thisProps.keydown The namespaced state from the higher-order
	     * component (class_decorator)
	     * @param {object} nextProps The incoming props from the wrapped component
	     * @param {object} nextProps.keydown The namescaped state from the higher-order
	     * component (class_decorator)
	     * @param {array} keys The keys bound to the decorated method
	     * @return {boolean} Whether all tests have passed
	     */
	    var _shouldTrigger = function _shouldTrigger(keydownThis, keydownNext) {
	      if (!(keydownNext && keydownNext.event && !keydownThis.event)) return false;

	      return keySets.some(function (keySet) {
	        return (0, _match_keys2.default)({ keySet: keySet, event: keydownNext.event });
	      });
	    };

	    // wrap the component's lifecycle method to intercept key codes coming down
	    // from the wrapped/scoped component up the view hierarchy. if new keydown
	    // event has arrived and the key codes match what was specified in the
	    // decorator, call the wrapped method.


	    var keySets = (0, _parse_keys2.default)(keys);target.componentWillReceiveProps = function (nextProps) {
	      var keydownNext = nextProps.keydown;
	      var keydownThis = this.props.keydown;

	      if (_shouldTrigger(keydownThis, keydownNext)) {
	        return fn.call(this, keydownNext.event);
	      }

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
	    };
	  }

	  return descriptor;
	}

	exports.default = methodWrapperScoped;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

	'use strict';

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

	if (!Array.from) {
	  Array.from = function () {
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number === 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };

	    // The length property of the from method is 1.
	    return function from(arrayLike /*, mapFn, thisArg */) {
	      // 1. Let C be the this value.
	      var C = this;

	      // 2. Let items be ToObject(arrayLike).
	      var items = Object(arrayLike);

	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError("Array.from requires an array-like object - not null or undefined");
	      }

	      // 4. If mapfn is undefined, then let mapping be false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. else
	        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }

	        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }

	      // 10. Let lenValue be Get(items, "length").
	      // 11. Let len be ToLength(lenValue).
	      var len = toLength(items.length);

	      // 13. If IsConstructor(C) is true, then
	      // 13. a. Let A be the result of calling the [[Construct]] internal method 
	      // of C with an argument list containing the single item len.
	      // 14. a. Else, Let A be ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 16. Let k be 0.
	      var k = 0;
	      // 17. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Let putStatus be Put(A, "length", len, true).
	      A.length = len;
	      // 20. Return A.
	      return A;
	    };
	  }();
	}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13);;
	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'add';

	var ButtonRegisterAdd = function (_React$PureComponent) {
	    _inherits(ButtonRegisterAdd, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterAdd(props) {
	        _classCallCheck(this, ButtonRegisterAdd);

	        return _possibleConstructorReturn(this, (ButtonRegisterAdd.__proto__ || Object.getPrototypeOf(ButtonRegisterAdd)).call(this, props));
	    }

	    _createClass(ButtonRegisterAdd, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('add');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    value: 'Add',
	                    ref: 'btnAdd',
	                    style: styles.button,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterAdd;
	}(React.PureComponent);

	;

	/*
	ButtonRegisterAdd.propTypes = {
	    onClick: PropTypes.func.isRequired
	}
	*/

	ButtonRegisterAdd.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterAdd;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    button: {
	        background: 'white',
	        margin: '2px'
	    },
	    icons: {
	        add: '/images/icons/add.png',
	        edit: '/images/icons/edit.png',
	        delete: '/images/icons/delete.png',
	        filter: '/images/icons/filter.png',
	        print: '/images/icons/print.png',
	        ok: '/images/icons/ok.png',
	        cancel: '/images/icons/cancel.png',
	        save: '/images/icons/save.png',
	        execute: '/images/icons/execute.png',
	        start: '/images/icons/start.png',
	        login: '/images/icons/login.png',
	        account: '/images/icons/account.png',
	        rekv: '/images/icons/rekv.png'

	    }
	};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13);;
	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(103);

	var Button = function (_React$PureComponent) {
	    _inherits(Button, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function Button(props) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.state = {
	            disabled: _this.props.disabled
	        };
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'handleClick',
	        value: function handleClick() {
	            this.props.onClick();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // visibility
	            var propStyle = 'style' in this.props ? this.props.style : {},
	                style = Object.assign({}, styles.button, { display: this.props.show ? 'inline' : 'none' }, propStyle);

	            return React.createElement(
	                'button',
	                {
	                    disabled: this.state.disabled,
	                    ref: 'button',
	                    style: style,
	                    onClick: this.handleClick },
	                this.props.children,
	                this.props.value
	            );
	        }
	    }]);

	    return Button;
	}(React.PureComponent);

	;

	Button.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    value: PropTypes.string.isRequired,
	    style: PropTypes.object
	};

	Button.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = Button;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'edit';

	var ButtonRegisterEdit = function (_React$PureComponent) {
	    _inherits(ButtonRegisterEdit, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterEdit(props) {
	        _classCallCheck(this, ButtonRegisterEdit);

	        var _this = _possibleConstructorReturn(this, (ButtonRegisterEdit.__proto__ || Object.getPrototypeOf(ButtonRegisterEdit)).call(this, props));

	        _this.state = {
	            disabled: _this.props.disabled
	        };
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }

	    _createClass(ButtonRegisterEdit, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('edit');
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ disabled: nextProps.disabled });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    value: 'Edit',
	                    ref: 'btnEdit',
	                    show: this.props.show,
	                    disabled: this.state.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterEdit;
	}(React.PureComponent);

	;

	/*
	ButtonRegisterEdit.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    disabled: PropTypes.bool
	}
	*/

	ButtonRegisterEdit.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterEdit;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'delete';

	var ButtonRegisterDelete = function (_React$PureComponent) {
	    _inherits(ButtonRegisterDelete, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterDelete(props) {
	        _classCallCheck(this, ButtonRegisterDelete);

	        return _possibleConstructorReturn(this, (ButtonRegisterDelete.__proto__ || Object.getPrototypeOf(ButtonRegisterDelete)).call(this, props));
	    }

	    _createClass(ButtonRegisterDelete, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('delete');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    value: 'Delete',
	                    ref: 'btnDelete',
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterDelete;
	}(React.PureComponent);

	;

	/*
	ButtonRegisterDelete.propTypes = {
	    onClick: PropTypes.func.isRequired
	}
	*/

	ButtonRegisterDelete.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterDelete;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);
	var Select = __webpack_require__(31);
	var Text = __webpack_require__(33);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14);

	var SelectTextWidget = function (_React$PureComponent) {
	    _inherits(SelectTextWidget, _React$PureComponent);

	    function SelectTextWidget(props) {
	        _classCallCheck(this, SelectTextWidget);

	        var _this = _possibleConstructorReturn(this, (SelectTextWidget.__proto__ || Object.getPrototypeOf(SelectTextWidget)).call(this, props));

	        _this.state = {
	            value: props.value,
	            description: '', // пойдет в текстовую область
	            libData: []
	        };
	        _this.handleSelectOnChange = _this.handleSelectOnChange.bind(_this);
	        return _this;
	    }

	    _createClass(SelectTextWidget, [{
	        key: 'handleSelectOnChange',
	        value: function handleSelectOnChange(e, name, value) {
	            // отработаем событие и поменяем состояние
	            if (this.state.libData) {
	                var selg = this.getDescriptionBySelectValue(this.state.libData) || null;
	                this.setState({ value: value, description: selg });
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // создаем обработчик события на изменение библиотек.
	            var self = this;
	            // будем отслеживать момент когда справочник будет загружен
	            flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	                var vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue),
	                    // will watch libs change (from server)
	                data = newValue.filter(function (item) {
	                    if (item.id === self.props.libs) {
	                        return item;
	                    }
	                }),
	                    lib = data[0].data,
	                    selg = data[0].data.length ? self.getDescriptionBySelectValue(lib).toString() : '';
	                self.setState({ libData: lib, description: selg });
	            });
	        }
	    }, {
	        key: 'getDescriptionBySelectValue',
	        value: function getDescriptionBySelectValue(libData) {
	            var _this2 = this;

	            // найдем в справочнике описание и установим его состояние
	            var libRow = libData.filter(function (lib) {

	                if (lib.id == _this2.props.value) {
	                    return lib;
	                }
	            }),
	                selg = '',
	                selgObject = libRow.length ? libRow[0].details : '';

	            for (var property in selgObject) {
	                if (selgObject.hasOwnProperty(property)) {
	                    // интересуют только "собственные" свойства объекта
	                    selg = selg + property + ':' + selgObject[property];
	                }
	            }
	            return selg;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(Select, { className: this.props.className,
	                    ref: 'select',
	                    title: this.props.title,
	                    name: this.props.name,
	                    libs: this.props.libs,
	                    value: this.props.value,
	                    defaultValue: this.props.defaultValue,
	                    placeholder: this.props.placeholder || this.props.title,
	                    readOnly: this.props.readOnly,
	                    onChange: this.handleSelectOnChange
	                }),
	                React.createElement(Text, { ref: 'text',
	                    name: 'muud',
	                    placeholder: 'DokProp',
	                    value: this.state.description,
	                    readOnly: true,
	                    disabled: true
	                })
	            );
	        }
	    }]);

	    return SelectTextWidget;
	}(React.PureComponent);

	SelectTextWidget.propTypes = {
	    value: PropTypes.number,
	    name: PropTypes.string.isRequired,
	    title: PropTypes.string,
	    libs: PropTypes.string,
	    defaultValue: PropTypes.string,
	    readOnly: PropTypes.bool,
	    placeholder: PropTypes.string
	};

	SelectTextWidget.defaultProps = {
	    readOnly: false,
	    title: ''
	};

	module.exports = SelectTextWidget;

/***/ }),
/* 108 */
/***/ (function(module, exports) {

	'use strict';

	var relatedDocuments = function relatedDocuments(self) {
	    // формируем зависимости
	    var relatedDocuments = self.state.relations;
	    if (relatedDocuments.length > 0) {
	        relatedDocuments.forEach(function (doc) {
	            if (doc.id) {
	                // проверим на уникальность списка документов
	                var isExists = self.pages.find(function (page) {
	                    if (!page.docId) {
	                        return false;
	                    } else {
	                        return page.docId == doc.id && page.docTypeId == doc.doc_type;
	                    }
	                });

	                if (!isExists) {
	                    // в массиве нет, добавим ссылку на документ
	                    self.pages.push({ docTypeId: doc.doc_type, docId: doc.id, pageName: doc.name + ' id:' + doc.id });
	                }
	            }
	        });
	    }
	};

	module.exports = relatedDocuments;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(110),
	    React = __webpack_require__(13);

	var ToolBarContainer = function (_React$Component) {
	    _inherits(ToolBarContainer, _React$Component);

	    function ToolBarContainer(props) {
	        _classCallCheck(this, ToolBarContainer);

	        return _possibleConstructorReturn(this, (ToolBarContainer.__proto__ || Object.getPrototypeOf(ToolBarContainer)).call(this, props));
	    }

	    _createClass(ToolBarContainer, [{
	        key: 'render',
	        value: function render() {
	            var style = Object.assign({}, styles.toolBarContainerStyle, styles[this.props.position]);
	            return React.createElement(
	                'div',
	                { id: 'toolBarContainer',
	                    ref: 'toolBarContainer',
	                    style: style },
	                this.props.children
	            );
	        }
	    }]);

	    return ToolBarContainer;
	}(React.Component);

	ToolBarContainer.propTypes = {
	    position: PropTypes.string
	};

	ToolBarContainer.defaultProps = {
	    position: 'right'
	};

	module.exports = ToolBarContainer;

/***/ }),
/* 110 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black'
	    },

	    right: {
	        justifyContent: 'flex-end'
	    },

	    left: {
	        justifyContent: 'flex-start'
	    }

	};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    ToolbarContainer = __webpack_require__(109),
	    BtnStart = __webpack_require__(112),
	    BtnLogin = __webpack_require__(113),
	    BtnRekv = __webpack_require__(114),
	    BtnAccount = __webpack_require__(115);

	var style = __webpack_require__(116);

	var MenuToolBar = function (_React$PureComponent) {
	    _inherits(MenuToolBar, _React$PureComponent);

	    function MenuToolBar(props) {
	        _classCallCheck(this, MenuToolBar);

	        var _this = _possibleConstructorReturn(this, (MenuToolBar.__proto__ || Object.getPrototypeOf(MenuToolBar)).call(this, props));

	        _this.state = {
	            logedIn: props.userData ? true : false
	        };

	        _this.btnStartClick = _this.btnStartClick.bind(_this);
	        _this.btnLoginClick = _this.btnLoginClick.bind(_this);

	        return _this;
	    }

	    _createClass(MenuToolBar, [{
	        key: 'render',
	        value: function render() {

	            var isEditMode = this.props.edited,
	                toolbarParams = {
	                btnStart: {
	                    show: this.props.params['btnStart'].show,
	                    disabled: isEditMode
	                },
	                btnLogin: {
	                    show: true,
	                    disabled: false
	                },
	                btnAccount: {
	                    show: this.state.logedIn,
	                    disabled: false
	                },
	                btnRekv: {
	                    show: this.state.logedIn,
	                    disabled: false
	                }

	            };

	            return React.createElement(
	                'div',
	                { style: style['container'] },
	                React.createElement(
	                    ToolbarContainer,
	                    {
	                        ref: 'menuToolbarContainer',
	                        position: 'left' },
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(BtnStart, { ref: 'btnStart',
	                            onClick: this.btnStartClick,
	                            show: toolbarParams['btnStart'].show,
	                            disabled: toolbarParams['btnStart'].disabled }),
	                        React.createElement(BtnRekv, { ref: 'btnRekv',
	                            value: this.props.userData ? this.props.userData.asutus : '',
	                            onClick: this.btnRekvClick,
	                            show: toolbarParams['btnRekv'].show,
	                            disabled: toolbarParams['btnRekv'].disabled }),
	                        React.createElement(BtnAccount, { ref: 'btnAccount',
	                            value: this.props.userData ? this.props.userData.userName : '',
	                            onClick: this.btnAccountClick,
	                            show: toolbarParams['btnAccount'].show,
	                            disabled: toolbarParams['btnAccount'].disabled }),
	                        React.createElement(BtnLogin, { ref: 'btnLogin',
	                            value: this.state.logedIn ? 'LogOut' : 'LogIn',
	                            onClick: this.btnLoginClick,
	                            show: toolbarParams['btnLogin'].show,
	                            disabled: toolbarParams['btnLogin'].disabled })
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'btnStartClick',
	        value: function btnStartClick() {
	            // обработчик для кнопки Start
	            if (this.props.btnStartClick) {
	                this.props.btnStartClick();
	            }

	            if (document) {
	                document.location.href = '/documents';
	            }
	        }
	    }, {
	        key: 'btnLoginClick',
	        value: function btnLoginClick() {

	            if (this.state.logedIn) {
	                this.setState({ logedIn: false });
	                document.location.href = '/logout';
	            } else {
	                document.location.href = '/login';
	            }
	        }
	    }, {
	        key: 'btnAccountClick',
	        value: function btnAccountClick() {
	            console.log('btnAccount');
	        }
	    }, {
	        key: 'btnRekvClick',
	        value: function btnRekvClick() {
	            if (document) {
	                document.location.href = '/changeDepartment';
	            }
	        }
	    }]);

	    return MenuToolBar;
	}(React.PureComponent);

	MenuToolBar.propTypes = {
	    edited: PropTypes.bool,
	    params: PropTypes.object.isRequired,
	    logedIn: PropTypes.bool
	};

	MenuToolBar.defaultProps = {
	    edited: false,
	    logedIn: false,
	    params: {
	        btnStart: {
	            show: true
	        }
	    }
	};

	module.exports = MenuToolBar;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'start';

	var ButtonRegisterStart = function (_React$PureComponent) {
	    _inherits(ButtonRegisterStart, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterStart(props) {
	        _classCallCheck(this, ButtonRegisterStart);

	        return _possibleConstructorReturn(this, (ButtonRegisterStart.__proto__ || Object.getPrototypeOf(ButtonRegisterStart)).call(this, props));
	    }

	    _createClass(ButtonRegisterStart, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('start');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    value: '',
	                    ref: 'btnStart',
	                    style: styles.button,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterStart;
	}(React.PureComponent);

	;
	/*
	ButtonRegisterStart.propTypes = {
	    onClick: PropTypes.func.isRequired
	}
	*/

	ButtonRegisterStart.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterStart;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13);
	;
	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'login';

	var ButtonLogin = function (_React$PureComponent) {
	    _inherits(ButtonLogin, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonLogin(props) {
	        _classCallCheck(this, ButtonLogin);

	        var _this = _possibleConstructorReturn(this, (ButtonLogin.__proto__ || Object.getPrototypeOf(ButtonLogin)).call(this, props));

	        _this.state = {
	            value: props.value || 'LogIn'
	        };

	        return _this;
	    }

	    _createClass(ButtonLogin, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('login');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var value = this.state.value;

	            return React.createElement(
	                Button,
	                {
	                    value: value,
	                    ref: 'btnLogin',
	                    style: styles.button,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonLogin;
	}(React.PureComponent);

	;

	ButtonLogin.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    value: PropTypes.string
	};

	ButtonLogin.defaultProps = {
	    disabled: false,
	    show: true,
	    value: 'LogOut'
	};

	module.exports = ButtonLogin;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13);
	;
	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'rekv';

	var ButtonRekv = function (_React$PureComponent) {
	    _inherits(ButtonRekv, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRekv(props) {
	        _classCallCheck(this, ButtonRekv);

	        var _this = _possibleConstructorReturn(this, (ButtonRekv.__proto__ || Object.getPrototypeOf(ButtonRekv)).call(this, props));

	        _this.state = {
	            value: props.value
	        };

	        return _this;
	    }

	    _createClass(ButtonRekv, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('rekv');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var value = this.state.value;

	            return React.createElement(
	                Button,
	                {
	                    value: this.props.value,
	                    ref: 'btnRekv',
	                    style: styles.button,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRekv;
	}(React.PureComponent);

	;

	ButtonRekv.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    value: PropTypes.string
	};

	ButtonRekv.defaultProps = {
	    disabled: false,
	    show: true,
	    value: ''
	};

	module.exports = ButtonRekv;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(13);
	;
	var PropTypes = __webpack_require__(3);

	var styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'account';

	var ButtonAccount = function (_React$PureComponent) {
	    _inherits(ButtonAccount, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonAccount(props) {
	        _classCallCheck(this, ButtonAccount);

	        var _this = _possibleConstructorReturn(this, (ButtonAccount.__proto__ || Object.getPrototypeOf(ButtonAccount)).call(this, props));

	        _this.state = {
	            value: props.value
	        };

	        return _this;
	    }

	    _createClass(ButtonAccount, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ value: nextProps.value });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick('account');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var value = this.state.value;

	            return React.createElement(
	                Button,
	                {
	                    value: value,
	                    ref: 'btnAccount',
	                    style: styles.button,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonAccount;
	}(React.PureComponent);

	;

	ButtonAccount.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    value: PropTypes.string
	};

	ButtonAccount.defaultProps = {
	    disabled: false,
	    show: true,
	    value: ''
	};

	module.exports = ButtonAccount;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        margin: '10px 0'
	    }
	};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14),
	    ToolbarContainer = __webpack_require__(109),
	    BtnAdd = __webpack_require__(102),
	    BtnEdit = __webpack_require__(105),
	    BtnSave = __webpack_require__(118),
	    BtnCancel = __webpack_require__(119),
	    BtnPrint = __webpack_require__(120),
	    TaskWidget = __webpack_require__(121);

	var DocToolBar = function (_React$PureComponent) {
	    _inherits(DocToolBar, _React$PureComponent);

	    function DocToolBar(props) {
	        _classCallCheck(this, DocToolBar);

	        var _this = _possibleConstructorReturn(this, (DocToolBar.__proto__ || Object.getPrototypeOf(DocToolBar)).call(this, props));

	        _this.btnEditClick = _this.btnEditClick.bind(_this);
	        _this.btnAddClick = _this.btnAddClick.bind(_this);
	        _this.btnSaveClick = _this.btnSaveClick.bind(_this);
	        _this.btnCancelClick = _this.btnCancelClick.bind(_this);
	        _this.btnPrintClick = _this.btnPrintClick.bind(_this);
	        _this.handleButtonTask = _this.handleButtonTask.bind(_this);
	        _this.handleSelectTask = _this.handleSelectTask.bind(_this);

	        return _this;
	    }

	    _createClass(DocToolBar, [{
	        key: 'render',
	        value: function render() {
	            var isEditMode = this.props.edited,
	                isDocDisabled = this.props.docStatus == 2 ? true : false,
	                docId = flux.stores.docStore.data.id || 0,
	                toolbarParams = {
	                btnAdd: {
	                    show: !isEditMode,
	                    disabled: isEditMode
	                },
	                btnEdit: {
	                    show: !isEditMode,
	                    disabled: isDocDisabled
	                },
	                btnPrint: {
	                    show: true,
	                    disabled: true
	                },
	                btnSave: {
	                    show: isEditMode,
	                    disabled: false
	                },
	                btnCancel: {
	                    show: isEditMode && docId !== 0,
	                    disabled: false
	                }
	            };

	            return React.createElement(
	                ToolbarContainer,
	                { ref: 'toolbarContainer' },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(BtnAdd, { ref: 'btnAdd', onClick: this.btnAddClick, show: toolbarParams['btnAdd'].show,
	                        disabled: toolbarParams['btnAdd'].disabled }),
	                    React.createElement(BtnEdit, { ref: 'btnEdit', onClick: this.btnEditClick, show: toolbarParams['btnEdit'].show,
	                        disabled: toolbarParams['btnEdit'].disabled }),
	                    React.createElement(BtnSave, { ref: 'btnSave', onClick: this.btnSaveClick, show: toolbarParams['btnSave'].show,
	                        disabled: toolbarParams['btnSave'].disabled }),
	                    React.createElement(BtnCancel, { ref: 'btnCancel', onClick: this.btnCancelClick, show: toolbarParams['btnCancel'].show,
	                        disabled: toolbarParams['btnCancel'].disabled }),
	                    React.createElement(BtnPrint, { ref: 'btnPrint', onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show,
	                        disabled: toolbarParams['btnPrint'].disabled }),
	                    this.props.bpm.length ? React.createElement(TaskWidget, { ref: 'taskWidget',
	                        taskList: this.props.bpm,
	                        handleSelectTask: this.handleSelectTask,
	                        handleButtonTask: this.handleButtonTask
	                    }) : null
	                )
	            );
	        }
	    }, {
	        key: 'btnAddClick',
	        value: function btnAddClick() {
	            console.log('btnAddClick called');
	            // обработчик для кнопки Add
	            // отправим извещение наверх
	            //        this.props.onClick(this.name);
	            flux.doAction('docIdChange', 0);
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }
	    }, {
	        key: 'btnEditClick',
	        value: function btnEditClick() {
	            // обработчик для кнопки Edit
	            // переводим документ в режим редактирования, сохранен = false
	            if (!this.props.docStatus || this.props.docStatus < 2) {
	                flux.doAction('editedChange', true);
	                flux.doAction('savedChange', false);
	            }
	        }
	    }, {
	        key: 'btnPrintClick',
	        value: function btnPrintClick() {
	            console.log('print called');
	        }
	    }, {
	        key: 'btnSaveClick',
	        value: function btnSaveClick() {
	            // обработчик для кнопки Save
	            // валидатор

	            var validationMessage = this.props.validator ? this.props.validator() : 'validator do not exists',
	                isValid = this.props.validator ? !this.props.validator() : true;

	            if (isValid) {
	                // если прошли валидацию, то сохранеям
	                flux.doAction('saveData');
	                flux.doAction('editedChange', false);
	                flux.doAction('savedChange', true);
	            }
	        }
	    }, {
	        key: 'btnCancelClick',
	        value: function btnCancelClick() {
	            console.log('btnCancelClick');
	            // обработчик для кнопки Cancel
	            if (this.props.eventHandler) {
	                this.props.eventHandler('CANCEL');
	            }

	            flux.doAction('editedChange', false);
	            flux.doAction('savedChange', true);
	        }
	    }, {
	        key: 'handleButtonTask',
	        value: function handleButtonTask(task) {
	            // метод вызывается при выборе задачи
	            //@todo Закончить

	            flux.doAction('executeTask', task);
	        }
	    }, {
	        key: 'handleSelectTask',
	        value: function handleSelectTask(e) {
	            // метод вызывается при выборе задачи
	            //@todo Закончить
	            var taskValue = e.target.value;
	        }
	    }]);

	    return DocToolBar;
	}(React.PureComponent);

	DocToolBar.propTypes = {
	    bpm: PropTypes.array,
	    edited: PropTypes.bool,
	    docStatus: PropTypes.number,
	    validator: PropTypes.func
	};

	DocToolBar.defaultProps = {
	    bpm: [],
	    edited: false,
	    docStatus: 0
	};

	module.exports = DocToolBar;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'save';

	var ButtonRegisterSave = function (_React$PureComponent) {
	    _inherits(ButtonRegisterSave, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterSave(props) {
	        _classCallCheck(this, ButtonRegisterSave);

	        var _this = _possibleConstructorReturn(this, (ButtonRegisterSave.__proto__ || Object.getPrototypeOf(ButtonRegisterSave)).call(this, props));

	        _this.state = {
	            disabled: props.disabled
	        };
	        return _this;
	    }

	    _createClass(ButtonRegisterSave, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ disabled: nextProps.disabled });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    ref: 'btnSave',
	                    value: 'Save',
	                    show: this.props.show,
	                    disabled: this.state.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterSave;
	}(React.PureComponent);

	;

	ButtonRegisterSave.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    disabled: PropTypes.bool
	};

	ButtonRegisterSave.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterSave;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'cancel';

	var ButtonRegisterCancel = function (_React$PureComponent) {
	    _inherits(ButtonRegisterCancel, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterCancel(props) {
	        _classCallCheck(this, ButtonRegisterCancel);

	        var _this = _possibleConstructorReturn(this, (ButtonRegisterCancel.__proto__ || Object.getPrototypeOf(ButtonRegisterCancel)).call(this, props));

	        _this.state = {
	            disabled: props.disabled
	        };
	        return _this;
	    }

	    _createClass(ButtonRegisterCancel, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ disabled: nextProps.disabled });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    ref: 'btnCancel',
	                    value: 'Cancel',
	                    show: this.props.show,
	                    disabled: this.state.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterCancel;
	}(React.PureComponent);

	;

	ButtonRegisterCancel.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    disabled: PropTypes.bool
	};

	ButtonRegisterCancel.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterCancel;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'print';

	var ButtonRegisterPrint = function (_React$PureComponent) {
	    _inherits(ButtonRegisterPrint, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        _classCallCheck(this, ButtonRegisterPrint);

	        return _possibleConstructorReturn(this, (ButtonRegisterPrint.__proto__ || Object.getPrototypeOf(ButtonRegisterPrint)).call(this, props));
	    }

	    _createClass(ButtonRegisterPrint, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    ref: 'btnPrint',
	                    value: 'Print',
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterPrint;
	}(React.PureComponent);

	;
	/*
	ButtonRegisterPrint.propTypes = {
	    onClick: PropTypes.func.isRequired
	}
	*/

	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    Button = __webpack_require__(122),
	    styles = __webpack_require__(123);

	var TaskWidget = function (_React$PureComponent) {
	    _inherits(TaskWidget, _React$PureComponent);

	    function TaskWidget(props) {
	        _classCallCheck(this, TaskWidget);

	        var _this = _possibleConstructorReturn(this, (TaskWidget.__proto__ || Object.getPrototypeOf(TaskWidget)).call(this, props));

	        var tasks = props.taskList || [];

	        if (!tasks[0].status) {
	            tasks[0].status = 'opened';
	        }

	        _this.state = {
	            taskList: tasks
	        };
	        _this.handleSelectTask = _this.handleSelectTask.bind(_this);
	        _this.handleButtonTask = _this.handleButtonTask.bind(_this);
	        return _this;
	    }

	    _createClass(TaskWidget, [{
	        key: 'render',
	        value: function render() {
	            var tasks = this.state.taskList.filter(function (task) {
	                if (task.status === 'opened') {
	                    return task;
	                }
	            });

	            if (!tasks) return React.createElement('div', null);

	            return React.createElement(
	                'div',
	                { style: styles.wrapper },
	                tasks.length > 1 ? React.createElement(
	                    'select',
	                    {
	                        className: 'ui-c2',
	                        onChange: this.handleSelectTask,
	                        show: true,
	                        ref: 'selectTask' },
	                    tasks.map(function (taskName, index) {
	                        var key = 'option-' + index;
	                        React.createElement(
	                            'option',
	                            { value: 0, key: key, ref: key },
	                            ' ',
	                            taskName.name,
	                            ' '
	                        );
	                    })
	                ) : React.createElement(Button, {
	                    ref: 'buttonTask',
	                    className: 'ui-c2',
	                    onClick: this.handleButtonTask,
	                    show: tasks.length == 1 ? true : false,
	                    value: tasks.length == 1 ? tasks[0].name : '' })
	            );
	        }
	    }, {
	        key: 'handleSelectTask',
	        value: function handleSelectTask(e) {
	            var taskName = e.target.value;
	            this.props.handleSelectTask(taskName);
	        }
	    }, {
	        key: 'handleButtonTask',
	        value: function handleButtonTask() {
	            // найдем актуальную задачу
	            var actualTask = this.state.taskList.filter(function (task) {
	                if (task.actualStep) {
	                    return task;
	                }
	            }),
	                task = actualTask.map(function (task) {
	                return task.action;
	            }); // оставим только название процедуры
	            this.props.handleButtonTask(task);
	        }
	    }, {
	        key: 'getDefaultTask',
	        value: function getDefaultTask() {
	            return [{ step: 0, name: 'Start', action: 'start', status: 'opened' }];
	        }
	    }]);

	    return TaskWidget;
	}(React.PureComponent);

	TaskWidget.propTypes = {
	    taskList: PropTypes.array,
	    handleButtonTask: PropTypes.func.isRequired,
	    handleSelectTask: PropTypes.func.isRequired
	};

	TaskWidget.defaultProps = {
	    taskList: []
	};
	module.exports = TaskWidget;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'execute';

	var ButtonRegisterExecute = function (_React$PureComponent) {
	    _inherits(ButtonRegisterExecute, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterExecute(props) {
	        _classCallCheck(this, ButtonRegisterExecute);

	        var _this = _possibleConstructorReturn(this, (ButtonRegisterExecute.__proto__ || Object.getPrototypeOf(ButtonRegisterExecute)).call(this, props));

	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }

	    _createClass(ButtonRegisterExecute, [{
	        key: 'handleClick',
	        value: function handleClick() {
	            this.props.onClick();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                Button,
	                {
	                    ref: 'btnExecute',
	                    value: this.props.value,
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: this.handleClick },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterExecute;
	}(React.PureComponent);

	;

	ButtonRegisterExecute.propTypes = {
	    onClick: PropTypes.func.isRequired,
	    value: PropTypes.string.isRequired
	};

	ButtonRegisterExecute.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterExecute;

/***/ }),
/* 123 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'inline-flex'
	    }
	};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(14);

	var validateForm = function validateForm(self, reqFields, data) {
	    // валидация формы
	    var warning = null,
	        requiredFields = reqFields || [],
	        notRequiredFields = [],
	        notMinMaxRule = [];

	    if (!data) {
	        data = flux.stores.docStore.data;
	    }

	    requiredFields.forEach(function (field) {
	        if (field.name in data) {

	            var value = data[field.name];

	            if (!value) {
	                notRequiredFields.push(field.name);
	            }
	            // проверка на мин . макс значения

	            // || value && value > props.max
	            var checkValue = false;

	            switch (field.type) {
	                case 'D':
	                    var controlledValueD = Date.parse(value);
	                    if (field.min && controlledValueD < field.min && field.max && controlledValueD > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	                case 'N':
	                    var controlledValueN = Number(value);

	                    if (field.min && controlledValueN === 0 || field.min && controlledValueN < field.min && field.max && controlledValueN > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	            }
	            if (checkValue) {
	                notMinMaxRule.push(field.name);
	            }
	        }
	    });

	    if (notRequiredFields.length > 0) {
	        warning = 'puudub vajalikud andmed (' + notRequiredFields.join(', ') + ') ';
	    }

	    if (notMinMaxRule.length > 0) {
	        warning = warning ? warning : '' + ' min/max on vale(' + notMinMaxRule.join(', ') + ') ';
	    }

	    return warning; // вернем извещение об итогах валидации
	};

	module.exports = validateForm;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    Button = __webpack_require__(104),
	    buttonStyles = __webpack_require__(103),
	    styles = __webpack_require__(126);

	var ModalPage = function (_React$PureComponent) {
	    _inherits(ModalPage, _React$PureComponent);

	    function ModalPage(props) {
	        _classCallCheck(this, ModalPage);

	        var _this = _possibleConstructorReturn(this, (ModalPage.__proto__ || Object.getPrototypeOf(ModalPage)).call(this, props));

	        _this.handleBtnClick.bind(_this);
	        _this.changeVisibilityModalPage.bind(_this);
	        _this.state = {
	            show: _this.props.show
	        };
	        return _this;
	    }

	    _createClass(ModalPage, [{
	        key: 'changeVisibilityModalPage',
	        value: function changeVisibilityModalPage() {
	            var visibility = this.state.show;
	            this.setState({ show: !visibility });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ show: nextProps.show });
	        }
	    }, {
	        key: 'handleBtnClick',
	        value: function handleBtnClick(btnEvent) {
	            // закрываем окно и если передан обработчик, отдаем туда данные
	            this.changeVisibilityModalPage();
	            if (this.props.modalPageBtnClick) {
	                this.props.modalPageBtnClick(btnEvent);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // если передан атрибу modalObjects = ['btnOk','btnCancel']
	            var hideBtnOk = this.props.modalObjects.indexOf('btnOk') == -1 ? false : true,
	                // управление кнопкой Ок
	            hideBtnCancel = this.props.modalObjects.indexOf('btnCancel') == -1 ? false : true,
	                // управление кнопкой Cancel
	            displayModal = this.state.show ? 'flex' : 'none',
	                pagePosition = this.props.position,
	                containerStyle = Object.assign({}, styles.container, { display: displayModal }, { justifyContent: pagePosition });

	            return React.createElement(
	                'div',
	                { ref: 'container', style: containerStyle },
	                React.createElement(
	                    'div',
	                    { style: styles.modalPage, ref: 'modalPageContainer' },
	                    React.createElement(
	                        'div',
	                        { style: styles.header, ref: 'modalPageHeader' },
	                        React.createElement(
	                            'span',
	                            { ref: 'headerName', style: styles.headerName },
	                            ' ',
	                            this.props.modalPageName,
	                            ' '
	                        ),
	                        React.createElement(Button, { style: styles.buttonClose, ref: 'btnClose', onClick: this.changeVisibilityModalPage.bind(this), value: 'x' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: styles.modalPageContent, ref: 'modalPageContent' },
	                        this.props.children
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: styles.modalFooter, ref: 'modalPageButtons' },
	                        hideBtnOk ? React.createElement(
	                            Button,
	                            {
	                                ref: 'btnOk',
	                                value: 'Ok',
	                                style: styles.modalPageButtons,
	                                width: 'width' in styles.modalPageButtons ? styles.modalPageButtons.width : null,
	                                height: 'height' in styles.modalPageButtons ? styles.modalPageButtons.height : null,
	                                onClick: this.handleBtnClick.bind(this, 'Ok'),
	                                id: 'btnOk' },
	                            React.createElement('img', { ref: 'image', src: buttonStyles.icons['ok'] })
	                        ) : null,
	                        React.createElement('div', { style: styles.buttonsSeparator }),
	                        hideBtnCancel ? React.createElement(
	                            Button,
	                            {
	                                ref: 'btnCancel',
	                                value: 'Cancel',
	                                width: 'width' in styles.modalPageButtons ? styles.modalPageButtons.width : null,
	                                height: 'height' in styles.modalPageButtons ? styles.modalPageButtons.height : null,
	                                onClick: this.handleBtnClick.bind(this, 'Cancel'),
	                                className: 'modalPageButtons',
	                                id: 'btnCancel' },
	                            React.createElement('img', { ref: 'image', src: buttonStyles.icons['cancel'] })
	                        ) : null
	                    )
	                )
	            );
	        }
	    }]);

	    return ModalPage;
	}(React.PureComponent);
	/*
	ModalPage.propTypes = {
	    modalPageName: PropTypes.string.isRequired,
	    modalPageBtnClick: PropTypes.func.isRequired,
	    show: PropTypes.bool,
	    position: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
	}
	*/

	ModalPage.defaultProps = {
	    modalPageName: 'defaulName',
	    modalObjects: ['btnOk', 'btnCancel'],
	    position: 'center',
	    show: false
	};

	module.exports = ModalPage;

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        position: 'fixed',
	        top: '0',
	        left: 0,
	        right: 0,
	        bottom: 0,
	        backgroundColor: 'rgba(255, 255, 255, 0.25)',
	        display: 'flex',
	        justifyContent: 'center'
	    },
	    modalPage: {
	        position: 'absolute',
	        border: '1px solid black',
	        background: 'white',
	        margin: '8px',
	        borderRadius: '4px',
	        outline: 'none',
	        display: 'flex',
	        flexDirection: 'column',
	        alignSelf: 'center'
	    },
	    modalPageContent: {
	        padding: '10px',
	        margin: '10px'
	    },
	    header: {
	        height: '30px',
	        width: '100%',
	        border: '1px solid darkgray',
	        background: 'lightgray',
	        display: 'flex',
	        justifyContent: 'space-between'
	    },

	    headerName: {
	        color: 'white',
	        alignSelf: 'center',
	        marginLeft: '10px'
	    },

	    modalFooter: {
	        alignSelf: 'center',
	        display: 'flex',
	        marginBotton: '10px'
	    },

	    modalPageButtons: {
	        height: '30px',
	        width: '100px',
	        marginBottom: '10px'
	    },

	    buttonsSeparator: {
	        width: '10px'
	    },

	    buttonClose: {
	        borderRadius: '50%',
	        backgroundColor: 'lightgray',
	        border: 'none',
	        fontWeight: '900'

	    },

	    left: {
	        right: 'auto',
	        left: '0'
	    },

	    right: {
	        left: 'auto',
	        right: '0'
	    }

	};

/***/ }),
/* 127 */,
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(14);

	var docStore = flux.createStore({
	    id: 'docStore',
	    initialState: {
	        gridCellEdited: 0, // отслеживаем в гриде редактируемую ячейку
	        data: [],
	        details: [], // данные на грид
	        relations: [], // данные на связанные документы
	        gridConfig: [], // конфигурация грида
	        gridName: '',
	        docId: 0,
	        deleted: false,
	        edited: false,
	        saved: true,
	        gridRowId: 0,
	        libs: [{
	            id: 'asutused',
	            data: [],
	            params: []
	            //                data:[{id:1, name:"Asutus 1"},{id:2, name:"Asutus 2"},{id:3, name:"Asutus 3"} ]
	        }, {
	            id: 'nomenclature',
	            data: [],
	            params: []
	        }, {
	            id: 'kontod',
	            data: [],
	            params: []
	        }, {
	            id: 'project',
	            data: [],
	            params: []
	        }, {
	            id: 'tunnus',
	            data: [],
	            params: []
	        }, {
	            id: 'aa',
	            data: [],
	            params: []
	        }, {
	            id: 'kassa',
	            data: [],
	            params: []
	        }, {
	            id: 'arvedSisse',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }, {
	            id: 'arvedValja',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }, {
	            id: 'users',
	            data: [],
	            params: []
	        }, {
	            id: 'dokProps',
	            data: [],
	            params: [null, null],
	            fields: ['doc_type_id', 'rekvid'] // тип документа и ид учреждения
	        }],
	        bpm: [], // данные БП документа
	        task: {}, // текущая задача
	        backup: {} // хранит неизмененное состояние документа
	    },
	    actionCallbacks: {
	        backupChange: function backupChange(updater, value) {
	            // хранит начальные данных документа
	            updater.set({ backup: value });
	        },

	        setLibsFilter: function setLibsFilter(updater, libName, filter) {

	            // ищем справочник
	            var libs = this.libs;

	            for (var i = 0; i < libs.length; i++) {
	                if (libs[i].id == libName) {
	                    if (filter) {
	                        libs[i].filter = filter;
	                        flux.doAction('loadLibs', libName); //новые данные
	                    }
	                    break;
	                }
	            }
	        },
	        gridRowIdChange: function gridRowIdChange(updater, value) {
	            //           console.log('gridRowIdChange called:' + value);
	            updater.set({ gridRowId: value });
	        },
	        loadLibs: function loadLibs(updater, libsToUpdate) {
	            var _this = this;

	            // грузим справочники
	            var libs = this.libs.filter(function (item) {
	                if (!libsToUpdate || item.id == libsToUpdate) {
	                    return item;
	                }
	            });

	            // вызываем обновление справочника с сервера
	            libs.forEach(function (item) {
	                var libParams = [];
	                if (item.params) {
	                    libParams = item.params;
	                    // установим параметры для запроса
	                    for (var i = 0; i < libParams.length; i++) {
	                        libParams[i] = _this.data[item.fields[i]];
	                    }
	                }
	                _loadLibs(item.id, libParams);
	            });
	        },
	        saveData: function saveData(updater) {
	            saveDoc();
	        },
	        executeTask: function executeTask(updater, task) {
	            _executeTask(task);
	        },
	        deleteDoc: function deleteDoc(updater) {
	            _deleteDoc();
	        },
	        gridCellEditedChange: function gridCellEditedChange(updater, value) {
	            //           console.log('called gridCellEditedChange:' + value);
	            updater.set({ gridCellEdited: value });
	        },
	        docIdChange: function docIdChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            // чистим данные грида
	            try {
	                //               console.log('docIdChange', value);
	                updater.set({ docId: value });
	            } catch (e) {
	                console.error('docIdChange viga', e);
	            }
	        },
	        dataChange: function dataChange(updater, value) {
	            // Отслеживает загрузку данных документа
	            updater.set({ data: value });

	            if (typeof value.arvid !== 'undefinite') {
	                // если контрагент отсутсвует, то и параметр контрагента также обнулим
	                value.arvid = value.asutusid ? value.arvid : null;
	                // зададим параметры для справочника счетов
	                //flux.doAction('setLibsFilter', 'arvedSisse', [value.asutusid, value.arvid]);
	            }
	        },
	        bpmChange: function bpmChange(updater, value) {
	            // Загрузка БП
	            //            console.log('bpmChange', value);
	            updater.set({ bpm: value });
	        },
	        relationsChange: function relationsChange(updater, value) {
	            // Отслеживает загрузку данных зависимостей документа
	            updater.set({ relations: value });
	        },
	        detailsChange: function detailsChange(updater, value) {
	            // Отслеживает загрузку данных грида документа
	            updater.set({ details: value });
	        },
	        gridConfigChange: function gridConfigChange(updater, value) {
	            // Отслеживает загрузку конфигурации грида
	            updater.set({ gridConfig: value });
	        },
	        deletedChange: function deletedChange(updater, value) {
	            // была вызвана кнопка Delete
	            updater.set({ deleted: value });
	        },
	        editedChange: function editedChange(updater, value) {
	            // Меняется режим редактирования документа
	            updater.set({ edited: value });
	        },
	        savedChange: function savedChange(updater, value) {
	            // Отслеживает изменения в данных и из сохранение
	            updater.set({ saved: value });
	        },
	        libsChange: function libsChange(updater, value) {
	            // Отслеживает изменения в справочниках
	            //            console.log('libsChange called', value);
	            if (value) {
	                updater.set({ libs: value });
	            }
	        },
	        gridNameChange: function gridNameChange(updater, value) {
	            updater.set({ gridName: value });
	        },
	        requery: function requery(action, params) {
	            return _requery(action, JSON.stringify(params));
	        }
	    }
	});

	function _deleteDoc() {
	    // вызывает метод удаления документа
	    // вернемся в регистр
	    //requery('delete', null);
	    document.location = '/documents';
	};

	function _executeTask(task) {
	    /*
	     Выполнит запрос на исполнение задачи
	     */

	    var tasksParameters = {
	        docId: docStore.data.id,
	        tasks: task,
	        doc_type_id: docStore.data.doc_type_id
	    };

	    //   console.log('executeTask:', task, tasksParameters);

	    _requery('execute', JSON.stringify(tasksParameters), function (err, data) {
	        if (err || data.result == 'Error') {
	            return err;
	        }

	        try {
	            //            console.log('executeTask arrived docStore.data.id, docStore.docId, data',docStore.data.id,docStore.docId,  data);

	            // при успешном выполнении задачи, выполнить перегрузку документа (временно)
	            //@todo подтянуть изменения без перегрузки страницы
	            reloadDocument(docStore.data.id);
	        } catch (e) {
	            console.error('requery, reloadDocument', e);
	        }
	    });
	};

	function saveDoc() {
	    // вызывает метод сохранения документа
	    var saveData = {
	        id: docStore.data.id,
	        doc_type_id: docStore.data.doc_type_id, // вынесено для подгрузки модели
	        data: docStore.data,
	        details: docStore.details
	    };

	    _requery('save', JSON.stringify(saveData), function (err, data) {
	        if (err) return err;

	        try {
	            var newId = data[0].id;
	            // обновим ид
	            saveData.data.id = newId;

	            flux.doAction('dataChange', saveData.data); //новые данные
	            flux.doAction('docIdChange', newId); // новое ид
	            flux.doAction('savedChange', true); // устанавливаем режим сохранен
	            flux.doAction('editedChange', false); // устанавливаем режим сохранен


	            // reload document
	            reloadDocument(newId); //@todo выполнить перегрузку данных перез перегрузки страницы
	        } catch (e) {
	            console.error('tekkis viga', e);
	        }
	    });

	    /*
	       requery('saveAndSelect', JSON.stringify(saveData), function(err, data) {
	     if (err) return err;
	       try {
	     if (data.id !== saveData.data.id) {
	     // обновим ид
	     saveData.data.id = data.id;
	     flux.doAction( 'dataChange', saveData.data ); //новые данные
	     }
	     flux.doAction( 'docIdChange', data.id ); // новое ид
	     flux.doAction( 'savedChange', true ); // устанавливаем режим сохранен
	     flux.doAction( 'editedChange', false ); // устанавливаем режим сохранен
	     } catch(e) {
	     console.error;
	     }
	       });
	     */
	};

	function reloadDocument(docId) {
	    // reload document

	    if (docId) {
	        var url = "/document/" + docStore.data.doc_type_id + docId;
	        document.location.href = url;
	    }
	}

	function _loadLibs(libraryName, libParams) {
	    try {

	        _requery('selectAsLibs', JSON.stringify({ doc_type_id: libraryName, id: 0, params: libParams }), function (err, data) {
	            if (err) throw err;

	            var newLibs = docStore.libs.map(function (item) {
	                // ищем данные справолчника, которые обновили
	                var returnData = item;

	                if (item.id == libraryName) {
	                    returnData.data = data;
	                }
	                return returnData;
	            });

	            if (newLibs.length > 0) {
	                flux.doAction('libsChange', newLibs); // пишем изменения в хранилище
	            }
	        });
	    } catch (e) {
	        console.error('tekkis viga', e);
	    }
	}

	function _requery(action, parameters, callback) {
	    // метод обеспечит получение данных от сервера
	    if (!window.jQuery) {
	        return;
	    }

	    var URL = '/api/doc';
	    $.ajax({
	        url: URL,
	        type: "POST",
	        dataType: 'json',
	        data: {
	            action: action,
	            data: parameters
	        },
	        cache: false,
	        success: function (data) {
	            // должны получить объект
	            try {
	                callback(null, data);
	            } catch (e) {
	                console.error('Requery error:', e);
	            }
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	            return callback(err, null);
	        }.bind(this)
	    });
	};

	module.exports = docStore;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDA5MGVmZTM0NDliZmM2OTA1M2I4Iiwid2VicGFjazovLy8uL34vcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvZmx1eGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveFN0b3JlLmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94VXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2UtbGFiZWwvcGFnZS1sYWJlbC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uL2RvYy1jb21tb24uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvY2xhc3NfZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L3N0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9tYXRjaF9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9lczYvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3drcy1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9wYXJzZV9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2V2ZW50X2hhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9kb21faGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvbGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21lbnUtdG9vbGJhci9tZW51LXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zdGFydC9idXR0b24tcmVnaXN0ZXItc3RhcnQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1sb2dpbi9idXR0b24tbG9naW4uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWt2L2J1dHRvbi1yZWt2LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tYWNjb3VudC9idXR0b24tYWNjb3VudC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tZW51LXRvb2xiYXIvbWVudS10b29sYmFyLnN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy10b29sYmFyL2RvYy10b29sYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC9idXR0b24tcmVnaXN0ZXItY2FuY2VsLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9zdG9yZXMvZG9jX3N0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0aWYobW9yZU1vZHVsZXNbMF0pIHtcbiBcdFx0XHRpbnN0YWxsZWRNb2R1bGVzWzBdID0gMDtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MTQ6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcblxuIFx0XHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgKHtcIjBcIjpcImFydlwiLFwiMVwiOlwiYXN1dHVzZWRcIixcIjJcIjpcImRvY1wiLFwiM1wiOlwiZG9jc1wiLFwiNFwiOlwiZG9jdW1lbnRMaWJcIixcIjVcIjpcImpvdXJuYWxcIixcIjZcIjpcImtvbnRvZFwiLFwiN1wiOlwibm9tZW5jbGF0dXJlXCIsXCI4XCI6XCJwcm9qZWN0XCIsXCI5XCI6XCJzbWtcIixcIjEwXCI6XCJzb3JkZXJcIixcIjExXCI6XCJ0dW5udXNcIixcIjEyXCI6XCJ2bWtcIixcIjEzXCI6XCJ2b3JkZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIjtcbiBcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDkwZWZlMzQ0OWJmYzY5MDUzYjgiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yICYmIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmplY3QpKSA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSkoKTtcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gW107XG59O1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnLyc7XG59O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDA7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlclxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChmYWxzZSwgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgKyAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICsgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgMykge1xuICAgICAgICAgICAgd2FybmluZyhmYWxzZSwgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgKyAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgKyAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgKyAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICsgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsIHByb3BGdWxsTmFtZSwgY29tcG9uZW50TmFtZSk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICsgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSwgaSk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgKyAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgKyAnXFxuVmFsaWQga2V5czogJyArIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwcm9wVmFsdWUpKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwcm9wVmFsdWUpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmJqcy9saWIvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgX3R5cGVvZih0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSkpO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGVycm9yKSk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChmYWxzZSwgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgKyAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJyk7XG4gIH07XG4gIHNoaW0uaXNSZXF1aXJlZCA9IHNoaW07XG4gIGZ1bmN0aW9uIGdldFNoaW0oKSB7XG4gICAgcmV0dXJuIHNoaW07XG4gIH07XG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogc2hpbSxcbiAgICBib29sOiBzaGltLFxuICAgIGZ1bmM6IHNoaW0sXG4gICAgbnVtYmVyOiBzaGltLFxuICAgIG9iamVjdDogc2hpbSxcbiAgICBzdHJpbmc6IHNoaW0sXG4gICAgc3ltYm9sOiBzaGltLFxuXG4gICAgYW55OiBzaGltLFxuICAgIGFycmF5T2Y6IGdldFNoaW0sXG4gICAgZWxlbWVudDogc2hpbSxcbiAgICBpbnN0YW5jZU9mOiBnZXRTaGltLFxuICAgIG5vZGU6IHNoaW0sXG4gICAgb2JqZWN0T2Y6IGdldFNoaW0sXG4gICAgb25lT2Y6IGdldFNoaW0sXG4gICAgb25lT2ZUeXBlOiBnZXRTaGltLFxuICAgIHNoYXBlOiBnZXRTaGltLFxuICAgIGV4YWN0OiBnZXRTaGltXG4gIH07XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBlbXB0eUZ1bmN0aW9uO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9zcmMveERpc3BhdGNoZXInKSxcbiAgICBYU3RvcmUgPSByZXF1aXJlKCcuL3NyYy94U3RvcmUnKTtcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIEZsdXhpZnkgY2xhc3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24uXHJcbiAqIEluaXRpYWxpemVzIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgc3RvcmUuXHJcbiAqIEFsc28gc2V0IHRoZSBQcm9taXNlIG9iamVjdCBpZiBpdCBpcyBnbG9iYWxseSBhdmFpbGFibGUuXHJcbiAqL1xudmFyIEZsdXhpZnkgPSBmdW5jdGlvbiBGbHV4aWZ5KCkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rpc3BhdGNoZXInLCB7XG5cdFx0dmFsdWU6IG5ldyBYRGlzcGF0Y2hlcigpXG5cdH0pO1xuXG5cdHRoaXMuc3RvcmVzID0ge307XG5cblx0aWYgKHR5cGVvZiBQcm9taXNlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0dGhpcy5wcm9taXNpZnkoUHJvbWlzZSk7XG5cdH1cbn07XG5cbkZsdXhpZnkucHJvdG90eXBlID0ge1xuXHQvKipcclxuICAqIENyZWF0ZSBhIG5ldyBzdG9yZS4gSWYgYW4gaWQgaXMgcGFzc2VkIGluIHRoZSBvcHRpb25zLFxyXG4gICogdGhlIHN0b3JlIHdpbGwgYmUgcmVnaXN0ZXJlZCBpbiB0aGUgZGlzcGF0Y2hlciBhbmQgc2F2ZWRcclxuICAqIGluIGZsdXhpZnkuc3RvcmVzW2lkXS5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMge2lkLCBpbml0aWFsU3RhdGUsIGFjdGlvbkNhbGxiYWNrfVxyXG4gICogQHJldHVybiB7WFN0b3JlfVxyXG4gICovXG5cdGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZShvcHRpb25zKSB7XG5cdFx0dmFyIHN0b3JlID0gbmV3IFhTdG9yZShvcHRpb25zKTtcblxuXHRcdC8vIElmIHRoZSBzdG9yZSBoYXMgYW4gaWQsIHJlZ2lzdGVyIGl0IGluIEZsdXhpZnkgYW5kIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0aWYgKHN0b3JlLl9pZCkge1xuXHRcdFx0dGhpcy5zdG9yZXNbc3RvcmUuX2lkXSA9IHN0b3JlO1xuXHRcdFx0dGhpcy5kaXNwYXRjaGVyLnJlZ2lzdGVyU3RvcmUoc3RvcmUuX2lkLCBzdG9yZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRXhlY3V0ZXMgYW4gYWN0aW9uLiBUaGUgYXJndW1lbnRzIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGVcclxuICAqIGZvciB0aGUgYWN0aW9uIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyLlxyXG4gICogQHJldHVybiB7IFByb21pc2UgfSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrc1xyXG4gICogICAgICAgICAgICAgICAgICAgaGF2ZSBmaW5pc2hlZC5cclxuICAqL1xuXHRkb0FjdGlvbjogZnVuY3Rpb24gZG9BY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaC5hcHBseSh0aGlzLmRpc3BhdGNoZXIsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJZiBFUzYgUHJvbWlzZSBvYmplY3QgaXMgbm90IGRlZmluZWQgZ2xvYmFsbHkgb3IgcG9seWZpbGxlZCwgYSBQcm9taXNlIG9iamVjdFxyXG4gICogY2FuIGJlIGdpdmVuIHRvIGZsdXhpZnkgaW4gb3JkZXIgdG8gbWFrZSBpdCB3b3JrLCB1c2luZyB0aGlzIG1ldGhvZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHsgUHJvbWlzZSB9IFByb21pc2UgRVM2IFByb21pc2UgY29tcGF0aWJsZSBvYmplY3RcclxuICAqIEByZXR1cm4geyB1bmRlZmluZWQgfVxyXG4gICovXG5cdHByb21pc2lmeTogZnVuY3Rpb24gcHJvbWlzaWZ5KFByb21pc2UpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0XHR0aGlzLmRpc3BhdGNoZXIuX1Byb21pc2UgPSBQcm9taXNlO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbHV4aWZ5KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvZmx1eGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIFRoZSBhc3luY2hyb25vdXMgZGlzcGF0Y2hlciBjb21wYXRpYmxlIHdpdGggRmFjZWJvb2sncyBmbHV4IGRpc3BhdGNoZXJcclxuICogaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L2RvY3MvZGlzcGF0Y2hlci5odG1sXHJcbiAqXHJcbiAqIERpc3BhdGNoIGFjdGlvbnMgdG8gdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLCB0aG9zZSBhY3Rpb24gY2FuIGJlXHJcbiAqIGFzeW5jaHJvbm91cyBpZiB0aGV5IHJldHVybiBhIFByb21pc2UuXHJcbiAqL1xuXG52YXIgWERpc3BhdGNoZXIgPSBmdW5jdGlvbiBYRGlzcGF0Y2hlcigpIHtcblx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdHRoaXMuX2Rpc3BhdGNoUXVldWUgPSBbXTtcblx0dGhpcy5fY3VycmVudERpc3BhdGNoID0gZmFsc2U7XG5cdHRoaXMuX0lEID0gMTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuWERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nIHwgRnVuY3Rpb259ICAgaWQgIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB0aGUgaWQgb2YgdGhlIGNhbGxiYWNrLlxyXG4gICogICAgICAgICAgICAgICAgICBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrLCBhbmQgaWQgaXMgZ2VuZXJhdGVkXHJcbiAgKiAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHkuXHJcbiAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgSWYgYW4gaWQgaXMgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQsIHRoaXMgd2lsbCBiZSB0aGUgY2FsbGJhY2suXHJcbiAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcihpZCwgY2FsbGJhY2spIHtcblx0XHR2YXIgSUQgPSBpZDtcblxuXHRcdC8vIElmIHRoZSBjYWxsYmFjayBpcyB0aGUgZmlyc3QgcGFyYW1ldGVyXG5cdFx0aWYgKHR5cGVvZiBpZCA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRJRCA9ICdJRF8nICsgdGhpcy5fSUQ7XG5cdFx0XHRjYWxsYmFjayA9IGlkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NhbGxiYWNrc1tJRF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9JRCsrO1xuXG5cdFx0cmV0dXJuIElEO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBYU3RvcmUgaW4gdGhlIGRpc3BhY2hlci4gWFN0b3JlcyBoYXMgYSBtZXRob2QgY2FsbGVkIGNhbGxiYWNrLiBUaGUgZGlzcGF0Y2hlclxyXG4gICogcmVnaXN0ZXIgdGhhdCBmdW5jdGlvbiBhcyBhIHJlZ3VsYXIgY2FsbGJhY2suXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIGlkIGZvciB0aGUgc3RvcmUgdG8gYmUgdXNlZCBpbiB0aGUgd2FpdEZvciBtZXRob2QuXHJcbiAgKiBAcGFyYW0gIHtYU3RvcmV9IHhTdG9yZSBTdG9yZSB0byByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyU3RvcmU6IGZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmUoaWQsIHhTdG9yZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHhTdG9yZSwgJ19kaXNwYXRjaGVyJywge1xuXHRcdFx0dmFsdWU6IHRoaXNcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLnJlZ2lzdGVyKGlkLCB4U3RvcmUuY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogVW5yZWdpc3RlciBhIGNhbGxiYWNrIGdpdmVuIGl0cyBpZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIENhbGxiYWNrL1N0b3JlIGlkXHJcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgKi9cblx0dW5yZWdpc3RlcjogZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuXHRcdGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogQ3JlYXRlcyBhIHByb21pc2UgYW5kIHdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBjb21wbGV0ZSBiZWZvcmUgcmVzb2x2ZSBpdC5cclxuICAqIElmIGl0IGlzIHVzZWQgYnkgYW4gYWN0aW9uQ2FsbGJhY2ssIHRoZSBwcm9taXNlIHNob3VsZCBiZSByZXNvbHZlZCB0byBsZXQgb3RoZXIgY2FsbGJhY2tzXHJcbiAgKiB3YWl0IGZvciBpdCBpZiBuZWVkZWQuXHJcbiAgKlxyXG4gICogQmUgY2FyZWZ1bCBvZiBub3QgdG8gd2FpdCBieSBhIGNhbGxiYWNrIHRoYXQgaXMgd2FpdGluZyBieSB0aGUgY3VycmVudCBjYWxsYmFjaywgb3IgdGhlXHJcbiAgKiBwcm9taXNlcyB3aWxsIG5ldmVyIGZ1bGZpbGwuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nPEFycmF5PnxTdHJpbmd9IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYWxsYmFja3Mvc3RvcmVzIHRvIHdhaXQgZm9yLlxyXG4gICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gdGhlIHNwZWNpZmllZCBjYWxsYmFja3MgYXJlIGNvbXBsZXRlZC5cclxuICAqL1xuXHR3YWl0Rm9yOiBmdW5jdGlvbiB3YWl0Rm9yKGlkcykge1xuXHRcdHZhciBwcm9taXNlcyA9IFtdLFxuXHRcdCAgICBpID0gMDtcblxuXHRcdGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcblxuXHRcdGZvciAoOyBpIDwgaWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fcHJvbWlzZXNbaWRzW2ldXSkgcHJvbWlzZXMucHVzaCh0aGlzLl9wcm9taXNlc1tpZHNbaV1dKTtcblx0XHR9XG5cblx0XHRpZiAoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX1Byb21pc2UucmVzb2x2ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIGFsbCB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3Mvc3RvcmVzLlxyXG4gICpcclxuICAqIElmIGEgc2Vjb25kIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHdoaWxlIHRoZXJlIGlzIGEgZGlzcGF0Y2ggb24sIGl0IHdpbGwgYmVcclxuICAqIGVucXVldWVkIGFuIGRpc3BhdGNoZWQgYWZ0ZXIgdGhlIGN1cnJlbnQgb25lLlxyXG4gICpcclxuICAqIEByZXR1cm4geyBQcm9taXNlIH0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZSxcblx0XHQgICAgZGVxdWV1ZTtcblxuXHRcdGlmICghdGhpcy5fUHJvbWlzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gcHJvbWlzZXMuJyk7XG5cblx0XHQvLyBJZiB3ZSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLCBlbnF1ZXVlIHRoZSBkaXNwYXRjaFxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGlzcGF0Y2gpIHtcblxuXHRcdFx0Ly8gRGlzcGF0Y2ggYWZ0ZXIgdGhlIGN1cnJlbnQgb25lXG5cdFx0XHRwcm9taXNlID0gdGhpcy5fY3VycmVudERpc3BhdGNoLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2Rpc3BhdGNoLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gRW5xdWV1ZSwgc2V0IHRoZSBjaGFpbiBhcyB0aGUgY3VycmVudCBwcm9taXNlIGFuZCByZXR1cm5cblx0XHRcdHRoaXMuX2Rpc3BhdGNoUXVldWUucHVzaChwcm9taXNlKTtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSBwcm9taXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSB0aGlzLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24gaW5tZWRpYXRlbGx5LlxyXG4gICpcclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRfZGlzcGF0Y2g6IGZ1bmN0aW9uIF9kaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZXMgPSBbXTtcblxuXHRcdHRoaXMuX3Byb21pc2VzID0gW107XG5cblx0XHQvLyBBIGNsb3N1cmUgaXMgbmVlZGVkIGZvciB0aGUgY2FsbGJhY2sgaWRcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jYWxsYmFja3MpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cblx0XHRcdC8vIEFsbCB0aGUgcHJvbWlzZXMgbXVzdCBiZSBzZXQgaW4gbWUuX3Byb21pc2VzIGJlZm9yZSB0cnlpbmcgdG8gcmVzb2x2ZVxuXHRcdFx0Ly8gaW4gb3JkZXIgdG8gbWFrZSB3YWl0Rm9yIHdvcmsgb2tcblx0XHRcdG1lLl9wcm9taXNlc1tpZF0gPSBtZS5fUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBtZS5fY2FsbGJhY2tzW2lkXS5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyci5zdGFjayB8fCBlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByb21pc2VzLnB1c2gobWUuX3Byb21pc2VzW2lkXSk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdHZhciBkZXF1ZXVlID0gZnVuY3Rpb24gZGVxdWV1ZSgpIHtcblx0XHRcdG1lLl9kaXNwYXRjaFF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIW1lLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aCkgbWUuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5fUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGVxdWV1ZSwgZGVxdWV1ZSk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJcyB0aGlzIGRpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxyXG4gICpcclxuICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgKi9cblx0aXNEaXNwYXRjaGluZzogZnVuY3Rpb24gaXNEaXNwYXRjaGluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aDtcblx0fVxuXG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhEaXNwYXRjaGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94RGlzcGF0Y2hlci5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhFbWl0dGVyID0gcmVxdWlyZSgnLi94RW1pdHRlcicpLFxuICAgIHhVdGlscyA9IHJlcXVpcmUoJy4veFV0aWxzJyk7XG5cbi8vI2J1aWxkXG5cbnZhciBTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKHByb3BzKSB7XG5cdFx0aWYgKCFwcm9wcykgcmV0dXJuIHRoaXMucHJvcHMgPSB7fTtcblxuXHRcdHRoaXMucHJvcHMgPSB7fTtcblx0XHRmb3IgKHZhciBwIGluIHByb3BzKSB7XG5cdFx0XHR0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdFx0fVxuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24gZ2V0KHByb3ApIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wc1twcm9wXTtcblx0fSxcblxuXHRzZXQ6IGZ1bmN0aW9uIHNldChwcm9wLCB2YWx1ZSkge1xuXHRcdHZhciBwcm9wcyA9IHByb3AsXG5cdFx0ICAgIHVwZGF0ZXMgPSBbXSxcblx0XHQgICAgcHJldmlvdXNWYWx1ZSxcblx0XHQgICAgcDtcblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHByb3BzID0ge307XG5cdFx0XHRwcm9wc1twcm9wXSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdGZvciAocCBpbiBwcm9wcykge1xuXHRcdFx0aWYgKHRoaXMucHJvcHNbcF0gIT0gcHJvcHNbcF0pIHtcblx0XHRcdFx0cHJldmlvdXNWYWx1ZSA9IHRoaXMucHJvcHNbcF07XG5cdFx0XHRcdHRoaXMucHJvcHNbcF0gPSBwcm9wc1twXTtcblx0XHRcdFx0dXBkYXRlcy5wdXNoKHtcblx0XHRcdFx0XHRwcm9wOiBwLFxuXHRcdFx0XHRcdHByZXZpb3VzVmFsdWU6IHByZXZpb3VzVmFsdWUsXG5cdFx0XHRcdFx0dmFsdWU6IHByb3BzW3BdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh1cGRhdGVzLmxlbmd0aCkgdGhpcy5lbWl0KCdjaGFuZ2UnLCB1cGRhdGVzKTtcblx0fVxufSk7XG5cbnZhciBYU3RvcmUgPSBYRW1pdHRlci5fZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgb3B0cyA9IG9wdGlvbnMgfHwge30sXG5cdFx0ICAgIHN0b3JlID0gbmV3IFN0b3JlKG9wdHMuaW5pdGlhbFN0YXRlKSxcblx0XHQgICAgYWN0aW9uVHlwZSxcblx0XHQgICAgc3RhdGVQcm9wO1xuXG5cdFx0Ly8gU3RvcmUgaWRcblx0XHRpZiAob3B0aW9ucy5pZCkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfaWQnLCB7XG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmlkXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBSZWdpc3RlciBhY3Rpb24gY2FsbGJhY2tzIGluIHRoZSBzdG9yZVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRcdF9jYWxsYmFja3M6IHtcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHt9XG5cdFx0XHR9LFxuXHRcdFx0YWRkQWN0aW9uQ2FsbGJhY2tzOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShjbGJrcykge1xuXHRcdFx0XHRcdGZvciAoYWN0aW9uVHlwZSBpbiBjbGJrcykge1xuXHRcdFx0XHRcdFx0bWUuX2NhbGxiYWNrc1thY3Rpb25UeXBlXSA9IGNsYmtzW2FjdGlvblR5cGVdLmJpbmQodGhpcywgc3RvcmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbGJhY2sgZm9yIHJlZ2lzdGVyIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0XHRjYWxsYmFjazoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBhY3Rpb25UeXBlID0gYXJndW1lbnRzWzBdLFxuXHRcdFx0XHRcdCAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2NhbGxiYWNrc1thY3Rpb25UeXBlXSkge1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGNhbGxiYWNrcyBhcmUgYWxyZWFkeSBib3VuZCB0byB0aGlzIHhTdG9yZSBhbmQgdGhlIG11dGFibGUgc3RvcmVcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRBY3Rpb25DYWxsYmFja3Mob3B0cy5hY3Rpb25DYWxsYmFja3MgfHwge30pO1xuXG5cdFx0Ly8gQ3JlYXRlIGlubW11dGFibGUgcHJvcGVydGllc1xuXHRcdHZhciBhZGRQcm9wZXJ0eSA9IGZ1bmN0aW9uIGFkZFByb3BlcnR5KHByb3BOYW1lLCB2YWx1ZSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBwcm9wTmFtZSwge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RvcmUuZ2V0KHByb3BOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGlmIChvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0Zm9yIChzdGF0ZVByb3AgaW4gb3B0cy5pbml0aWFsU3RhdGUpIHtcblx0XHRcdFx0YWRkUHJvcGVydHkoc3RhdGVQcm9wLCBvcHRzLmluaXRpYWxTdGF0ZVtzdGF0ZVByb3BdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBFbWl0IG9uIHN0b3JlIGNoYW5nZVxuXHRcdHN0b3JlLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAodXBkYXRlcykge1xuXHRcdFx0dmFyIHVwZGF0ZXNMZW5ndGggPSB1cGRhdGVzLmxlbmd0aCxcblx0XHRcdCAgICB1cGRhdGUsXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHVwZGF0ZXNMZW5ndGg7IGkrKykge1xuXHRcdFx0XHR1cGRhdGUgPSB1cGRhdGVzW2ldO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBuZXcsIGFkZCBpdCB0byB0aGUgeFN0b3JlXG5cdFx0XHRcdGlmICghbWUuaGFzT3duUHJvcGVydHkodXBkYXRlLnByb3ApKSBhZGRQcm9wZXJ0eSh1cGRhdGUucHJvcCwgdXBkYXRlLnZhbHVlKTtcblxuXHRcdFx0XHRtZS5lbWl0KCdjaGFuZ2U6JyArIHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUsIHVwZGF0ZS5wcmV2aW91c1ZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0bWUuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0Z2V0U3RhdGU6IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuXHRcdC8vIENsb25lIHRoZSBzdG9yZSBwcm9wZXJ0aWVzXG5cdFx0cmV0dXJuIHhVdGlscy5fZXh0ZW5kKHt9LCB0aGlzKTtcblx0fSxcblxuXHR3YWl0Rm9yOiBmdW5jdGlvbiB3YWl0Rm9yKGlkcykge1xuXHRcdC8vIFRoZSB4RGlzcGF0Y2hlciBhZGRzIGl0c2VsZiBhcyBhIHByb3BlcnR5XG5cdFx0Ly8gd2hlbiB0aGUgeFN0b3JlIGlzIHJlZ2lzdGVyZWRcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci53YWl0Rm9yKGlkcyk7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveFN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFhFbWl0dGVyID0gZnVuY3Rpb24gWEVtaXR0ZXIoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2V2ZW50cycsIHtcblx0XHR2YWx1ZToge31cblx0fSk7XG5cblx0aWYgKHR5cGVvZiB0aGlzLmluaXRpYWxpemUgPT0gJ2Z1bmN0aW9uJykgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBUaGUgcHJvdG90eXBlIG1ldGhvZHMgYXJlIHN0b3JlZCBpbiBhIGRpZmZlcmVudCBvYmplY3Rcbi8vIGFuZCBhcHBsaWVkIGFzIG5vbiBlbnVtZXJhYmxlIHByb3BlcnRpZXMgbGF0ZXJcbnZhciBlbWl0dGVyUHJvdG90eXBlID0ge1xuXHRvbjogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBsaXN0ZW5lciwgb25jZSkge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblxuXHRcdGxpc3RlbmVycy5wdXNoKHsgY2FsbGJhY2s6IGxpc3RlbmVyLCBvbmNlOiBvbmNlIH0pO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b25jZTogZnVuY3Rpb24gb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0dGhpcy5vbihldmVudE5hbWUsIGxpc3RlbmVyLCB0cnVlKTtcblx0fSxcblxuXHRvZmY6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0aWYgKHR5cGVvZiBldmVudE5hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGxpc3RlbmVyID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnNbaV0uY2FsbGJhY2sgPT09IGxpc3RlbmVyKSBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lKSB7XG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG5cdFx0ICAgIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdLFxuXHRcdCAgICBvbmNlTGlzdGVuZXJzID0gW10sXG5cdFx0ICAgIGksXG5cdFx0ICAgIGxpc3RlbmVyO1xuXG5cdFx0Ly8gQ2FsbCBsaXN0ZW5lcnNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyLmNhbGxiYWNrKSBsaXN0ZW5lci5jYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm90IGEgY2FsbGJhY2ssIHJlbW92ZSFcblx0XHRcdFx0bGlzdGVuZXIub25jZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsaXN0ZW5lci5vbmNlKSBvbmNlTGlzdGVuZXJzLnB1c2goaSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVycyBtYXJrZWQgYXMgb25jZVxuXHRcdGZvciAoaSA9IG9uY2VMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2Uob25jZUxpc3RlbmVyc1tpXSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cbi8vIEV2ZW50RW1pdHRlciBtZXRob2RzXG54VXRpbHMuX2V4dGVuZChlbWl0dGVyUHJvdG90eXBlLCB7XG5cdGFkZExpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9uLFxuXHRyZW1vdmVMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdHJlbW92ZUFsbExpc3RlbmVyczogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdGVtaXQ6IGVtaXR0ZXJQcm90b3R5cGUudHJpZ2dlclxufSk7XG5cbi8vIE1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlIHNvLCB3aGVuIHRoZSBzdG9yZXMgYXJlXG4vLyBleHRlbmRlZCB3aXRoIHRoZSBlbWl0dGVyLCB0aGV5IGNhbiBiZSBpdGVyYXRlZCBhc1xuLy8gaGFzaG1hcHNcblhFbWl0dGVyLnByb3RvdHlwZSA9IHt9O1xuZm9yICh2YXIgbWV0aG9kIGluIGVtaXR0ZXJQcm90b3R5cGUpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kLCB7XG5cdFx0dmFsdWU6IGVtaXR0ZXJQcm90b3R5cGVbbWV0aG9kXVxuXHR9KTtcbn1cblxuLy8gRXh0ZW5kIG1ldGhvZCBmb3IgJ2luaGVyaXRhbmNlJywgbm9kIHRvIGJhY2tib25lLmpzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIsICdfZXh0ZW5kJywge1xuXHR2YWx1ZTogZnVuY3Rpb24gdmFsdWUocHJvdG9Qcm9wcykge1xuXHRcdHZhciBwYXJlbnQgPSB0aGlzLFxuXHRcdCAgICBjaGlsZDtcblxuXHRcdGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuaGFzT3duUHJvcGVydHkoY29uc3RydWN0b3IpKSB7XG5cdFx0XHRjaGlsZCA9IHByb3RvUHJvcHMuY29uc3RydWN0b3I7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkID0gZnVuY3Rpb24gY2hpbGQoKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0eFV0aWxzLl9leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cblx0XHR2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24gU3Vycm9nYXRlKCkge1xuXHRcdFx0Ly8gQWdhaW4gdGhlIGNvbnN0cnVjdG9yIGlzIGFsc28gZGVmaW5lZCBhcyBub3QgZW51bWVyYWJsZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicsIHtcblx0XHRcdFx0dmFsdWU6IGNoaWxkXG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXHRcdGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuXHRcdC8vIEFsbCB0aGUgZXh0ZW5kaW5nIG1ldGhvZHMgbmVlZCB0byBiZSBhbHNvXG5cdFx0Ly8gbm9uIGVudW1lcmFibGUgcHJvcGVydGllc1xuXHRcdGlmIChwcm90b1Byb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHByb3RvUHJvcHMpIHtcblx0XHRcdFx0aWYgKHAgIT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZC5wcm90b3R5cGUsIHAsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm90b1Byb3BzW3BdXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRW1pdHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveEVtaXR0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbnZhciB4VXRpbHMgPSB7XG5cdC8vIE9iamVjdCBleHRlbmQsIE5vZCB0byB1bmRlcnNjb3JlLmpzXG5cdF9leHRlbmQ6IGZ1bmN0aW9uIF9leHRlbmQob2JqKSB7XG5cdFx0dmFyIHNvdXJjZSwgcHJvcDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRmb3IgKHByb3AgaW4gc291cmNlKSB7XG5cdFx0XHRcdG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IHhVdGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveFV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9mb3JtLXN0eWxlcycpO1xuXG52YXIgRm9ybSA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhGb3JtLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBGb3JtKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb3JtKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRm9ybS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZvcm0pKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYWdlczogX3RoaXMucHJvcHMucGFnZXNcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuaGFuZGxlUGFnZUNsaWNrID0gX3RoaXMuaGFuZGxlUGFnZUNsaWNrLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRm9ybSwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlUGFnZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVBhZ2VDbGljayhwYWdlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKHBhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBwYWdlcyA9IHRoaXMuc3RhdGUucGFnZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgcGFnZXMubWFwKGZ1bmN0aW9uIChwYWdlLCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogaWR4ID09IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVQYWdlQ2xpY2s6IF90aGlzMi5oYW5kbGVQYWdlQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF90aGlzMi5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3BhZ2UtJyArIGlkeCB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLnBhZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRm9ybTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbjtcblxuRm9ybS5wcm9wVHlwZXMgPSB7XG4gICAgcGFnZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGhhbmRsZVBhZ2VDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG59O1xuXG5Gb3JtLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UudmFsdWVPZigpLFxuICAgIHBhZ2VzOiBbXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4XG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9wYWdlLWxhYmVsLXN0eWxlcycpO1xuXG52YXIgUGFnZUxhYmVsID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFBhZ2VMYWJlbCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gUGFnZUxhYmVsKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQYWdlTGFiZWwpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChQYWdlTGFiZWwuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihQYWdlTGFiZWwpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWRcbiAgICAgICAgfTtcblxuICAgICAgICBfdGhpcy5oYW5kbGVDbGljayA9IF90aGlzLmhhbmRsZUNsaWNrLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUGFnZUxhYmVsLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlzYWJsZWQ6IG5leHRQcm9wcy5kaXNhYmxlZCB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINGB0L7QsdGL0YLQuNC1INC60LvQuNC6LCDQv9C+0LTQs9GA0YPQttCw0LXQvCDRgdCy0Y/Qt9Cw0L3QvdGL0Lkg0LTQvtC60YPQvNC10L3RglxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKHBhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2UsXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMucGFnZUxhYmVsLCB0aGlzLnByb3BzLmFjdGl2ZSA/IHsgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnIH0gOiB7fSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdwYWdlTGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrIH0sXG4gICAgICAgICAgICAgICAgcGFnZS5wYWdlTmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBQYWdlTGFiZWw7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG5QYWdlTGFiZWwucHJvcFR5cGVzID0ge1xuICAgIGhhbmRsZVBhZ2VDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGFnZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhY3RpdmU6IFByb3BUeXBlcy5ib29sXG59O1xuXG5QYWdlTGFiZWwuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBhY3RpdmU6IHRydWVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdlTGFiZWw6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHdoaXRlJyxcbiAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzJweCAxMHB4IDJweCAxMHB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2UtbGFiZWwvcGFnZS1sYWJlbC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2U6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4J1xuICAgIH0sXG4gICAgaWNvbnM6IHtcbiAgICAgICAgYWRkOiAnaW1hZ2VzL2ljb25zL2FkZC5wbmcnLFxuICAgICAgICBlZGl0OiAnaW1hZ2VzL2ljb25zL2VkaXQucG5nJyxcbiAgICAgICAgZGVsZXRlOiAnaW1hZ2VzL2ljb25zL2RlbGV0ZS5wbmcnLFxuICAgICAgICBmaWx0ZXI6ICdpbWFnZXMvaWNvbnMvZmlsdGVyLnBuZycsXG4gICAgICAgIHByaW50OiAnaW1hZ2VzL2ljb25zL3ByaW50LnBuZycsXG4gICAgICAgIG9rOiAnaW1hZ2VzL2ljb25zL29rLnBuZycsXG4gICAgICAgIGNhbmNlbDogJ2ltYWdlcy9pY29ucy9jYW5jZWwucG5nJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0vZm9ybS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2lucHV0LXRleHQtc3R5bGVzJyk7XG5cbnZhciBJbnB1dCA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhJbnB1dCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSW5wdXQocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoSW5wdXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihJbnB1dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIHZhbGlkOiBwcm9wcy52YWxpZFxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKElucHV0LCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSwgcmVhZE9ubHk6IG5leHRQcm9wcy5yZWFkT25seSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25DaGFuZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZSkge1xuICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZmllbGRWYWx1ZSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LCB0aGlzLnByb3BzLndpZHRoID8geyB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCB9IDoge30sIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy53cmFwcGVyIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogJ2xhYmVsJyB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRpdGxlXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5zdGF0ZS5yZWFkT25seSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIElucHV0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHZhbGlkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwYXR0ZXJuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICB2YWxpZDogdHJ1ZSxcbiAgICB2YWx1ZTogJycsXG4gICAgdGl0bGU6ICcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQuanN4XG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9pbnB1dC1kYXRlLXN0eWxlcycpO1xuXG52YXIgSW5wdXREYXRlID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKElucHV0RGF0ZSwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSW5wdXREYXRlKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnB1dERhdGUpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChJbnB1dERhdGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihJbnB1dERhdGUpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUgfHwgJycsXG4gICAgICAgICAgICByZWFkT25seTogcHJvcHMucmVhZE9ubHlcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMub25DaGFuZ2UgPSBfdGhpcy5vbkNoYW5nZS5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhJbnB1dERhdGUsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbkNoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShlKSB7XG4gICAgICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKGZpZWxkVmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvdGD0LssINGC0L4g0L/Rg9GB0YLRjCDQsdGD0LTQtdGCIG51bFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZmllbGRWYWx1ZSB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40LosINCy0LXRgNC90LXQvCDQtdCz0L5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsIHRoaXMucHJvcHMud2lkdGggPyB7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoIH0gOiB7fSwgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLndyYXBwZXIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMubGFiZWwsIGh0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgcmVmOiAnbGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMuc3RhdGUucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMucHJvcHMubWluLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMucHJvcHMubWF4LFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndmFsaWRhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC90LAg0LzQuNC9ICwg0LzQsNGFXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5taW4gJiYgdGhpcy5wcm9wcy5tYXggJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZVZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhdGVWYWx1ZSA+IHRoaXMucHJvcHMubWluICYmIGRhdGVWYWx1ZSA8IHRoaXMucHJvcHMubWF4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIElucHV0RGF0ZTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbklucHV0RGF0ZS5wcm9wVHlwZXMgPSB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtYXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB2YWxpZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGF0dGVybjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3aWR0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZ1xuXG59O1xuXG5JbnB1dERhdGUuZGVmYXVsdFByb3BzID0ge1xuICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgdGl0bGU6ICcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9pbnB1dC1udW1iZXItc3R5bGVzJyk7XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBJbnB1dCA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhJbnB1dCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSW5wdXQocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoSW5wdXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihJbnB1dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIHZhbGlkOiBwcm9wcy52YWxpZFxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKElucHV0LCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSwgcmVhZE9ubHk6IG5leHRQcm9wcy5yZWFkT25seSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25DaGFuZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZSkge1xuICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZmllbGRWYWx1ZSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsIHRoaXMucHJvcHMud2lkdGggPyB7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoIH0gOiB7fSwgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9KSxcbiAgICAgICAgICAgICAgICBpbnB1dE1pblZhbHVlID0gdGhpcy5wcm9wcy5taW4sXG4gICAgICAgICAgICAgICAgaW5wdXRNYXhWYWx1ZSA9IHRoaXMucHJvcHMubWF4O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMud3JhcHBlciB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5sYWJlbCwgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCByZWY6ICdsYWJlbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5zdGF0ZS5yZWFkT25seSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46ICdcXFxcZCsoXFxcXC5cXFxcZHsyfSk/JyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBtaW46IGlucHV0TWluVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG1heDogaW5wdXRNYXhWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogJzAuMDEnLFxuXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gSW5wdXQ7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG5JbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsaWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBhdHRlcm46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1heDogUHJvcFR5cGVzLm51bWJlclxufTtcblxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgbWluOiAtOTk5OTk5OTk5LFxuICAgIG1heDogOTk5OTk5OTk5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4J1xuICAgIH0sXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfSxcbiAgICByZWFkT25seToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjNFRkVGJ1xuICAgIH0sXG4gICAgd3JhcHBlcjoge1xuICAgICAgICBtYXJnaW46ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnOTUlJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgd2lkdGg6ICczMCUnLFxuICAgICAgICBtYXJnaW46ICc1cHgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vLi4vaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZG9jLWNvbW1vbi1zdHlsZXMnKTtcblxudmFyIERvY0NvbW1vbiA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhEb2NDb21tb24sIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIERvY0NvbW1vbihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG9jQ29tbW9uKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRG9jQ29tbW9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRG9jQ29tbW9uKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IHByb3BzLnJlYWRPbmx5LFxuICAgICAgICAgICAgZGF0YTogX3RoaXMucHJvcHMuZGF0YVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKERvY0NvbW1vbiwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCwg0L/QvtC80LXQvdGP0LXRgiDRgdC+0YHRgtC+0Y/QvdC40LUgKNC/0LXRgNC10LTQsNGB0YIg0LTQsNC70YzRiNC1INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjylcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnBtID0gZGF0YS5icG0gfHwgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbFN0ZXBEYXRhID0gYnBtLmZpbHRlcigoc3RlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0YLQtdC60YPRidC40Lkg0YjQsNCzINCR0J9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVycyA9IGFjdHVhbFN0ZXBEYXRhLm1hcCgoc3RlcERhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L3QsNC50LTQtdC8INC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXBEYXRhLmFjdG9ycyB8fCB7bmFtZTogJ0FVVEhPUid9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHJlZjogJ3dyYXBwZXInLCBzdHlsZTogc3R5bGVzLndyYXBwZXIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwgeyByZWY6ICdpZCcsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnSWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICc3NSUnIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7IHJlZjogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmNyZWF0ZWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNzUlJyB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwgeyByZWY6ICdsYXN0dXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdVcGRhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2xhc3R1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5sYXN0dXBkYXRlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzc1JScgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHsgcmVmOiAnc3RhdHVzJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdGF0dXMnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3RhdHVzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICc3NSUnIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbkNoYW5nZUhhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2VIYW5kbGVyKGlucHV0TmFtZSwgaW5wdXRWYWx1ZSkge1xuICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LjQt9C80LXQvdC10L3QuNC5XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XG4gICAgICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIERvY0NvbW1vbjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbkRvY0NvbW1vbi5wcm9wVHlwZXMgPSB7XG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuRG9jQ29tbW9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICByZWFkT25seTogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NDb21tb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vc2VsZWN0LXN0eWxlcycpO1xuXG4vLyAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xuXG52YXIgU2VsZWN0ID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFNlbGVjdCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gU2VsZWN0KHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZWxlY3QpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChTZWxlY3QuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTZWxlY3QpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUgLyog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqL1xuICAgICAgICAgICAgLCByZWFkT25seTogcHJvcHMucmVhZE9ubHksXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICBkYXRhOiBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgZmllbGRWYWx1ZTogcHJvcHMudmFsdWUgLyrQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90Lgg0L/QvtC70Y8gY29sbElkICovXG4gICAgICAgICAgICAsIGJ0bkRlbGV0ZTogcHJvcHMuYnRuRGVsZXRlIC8qINC10YHQu9C4INC40YHRgtC40L3Rgywg0YLQviDRgNC40YHRg9C10Lwg0YDRj9C00L7QvCDQutC90L7Qv9C60YMg0LTQu9GPINC+0YfQuNGB0YLQutC4INC30L3QsNGH0LXQvdC40Y8qL1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5EZWxDbGljayA9IF90aGlzLmJ0bkRlbENsaWNrLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoU2VsZWN0LCBbe1xuICAgICAgICBrZXk6ICdmaW5kRmllbGRWYWx1ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kRmllbGRWYWx1ZShkYXRhLCBjb2xsSWQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgLy8g0L/RgNC40LLRj9C20LXRgiDQuiDQt9C90LDRh9C10L3RjiDQv9C+0LvRj1xuICAgICAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgdmFsdWU6IHJvd1tjb2xsSWRdLCBmaWVsZFZhbHVlOiByb3dbY29sbElkXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRWYWx1ZUJ5SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWVCeUlkKGNvbGxJZCwgcm93SWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDQstC10YDQvdC10YIg0LfQvdCw0YfQtdC90LjRjyDQv9C+0LvRjyDQv9C+INCy0YvQsdGA0LDQvdC90L7QvNGDINCY0JRcblxuICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gcm93SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJvd1tjb2xsSWRdO1xuICAgICAgICAgICAgICAgICAgICBfdGhpczMuc2V0U3RhdGUoeyBmaWVsZFZhbHVlOiBmaWVsZFZhbHVlIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBuZXh0UHJvcHMucmVhZE9ubHksIGRhdGE6IG5leHRQcm9wcy5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQmNCUINC/0L4g0LfQvdCw0YfQtdC90LjRjiDQv9C+0LvRj1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkVmFsdWUodGhpcy5zdGF0ZS5kYXRhLCB0aGlzLnByb3BzLmNvbGxJZCwgdGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNvbGxJZCkge1xuICAgICAgICAgICAgICAgIC8vINC90LDQudC00LXQvCDQv9C+INC40LQg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQsiBjb2xsSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdGhpcy5nZXRWYWx1ZUJ5SWQodGhpcy5wcm9wcy5jb2xsSWQsIGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC0INC60LDQuiB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSwgZmllbGRWYWx1ZTogZmllbGRWYWx1ZSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLypcclxuICAgICAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGRhdGFPcHRpb25zID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxuICAgICAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXG4gICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlOyAvLyDQlNCw0LTQuNC8INC00LXRhNC+0LvRgtC90L7QtSDQt9C90LDRh9C10L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsCwg0YfRgtC+0LEg0L/QvtC60LDRgtGMINC10LPQviDRgdGA0LDQt9GDLCDQtNC+INC/0L7QtNCz0YDRg9C30LrQuCDQsdC40LHQu9C40L7RgtC10LrQuFxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyDQtNC+0LHQsNCy0LjQvCDQv9GD0YHRgtGD0Y4g0YHRgtGA0L7QutGDINCyINC80LDRgdGB0LjQslxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0L/Rg9GB0YLQvtC5INGB0YLRgNC+0LrQuCDQsiDQvNCw0YHRgdC40LLQtVxuXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5T2JqID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5pZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlbXB0eU9iaiB8fCBlbXB0eU9iai5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT3B0aW9ucy5zcGxpY2UoMCwgMCwgeyBpZDogMCwga29vZDogJycsIG5hbWU6ICcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtW190aGlzNC5wcm9wcy5jb2xsSWRdID09PSBfdGhpczQuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gZGF0YU9wdGlvbnMubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gJ29wdGlvbi0nICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBpdGVtW190aGlzNC5wcm9wcy5jb2xsSWRdLCBrZXk6IGtleSwgcmVmOiBrZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlID0gZGF0YVZhbHVlLmxlbmd0aCA+IDAgPyBkYXRhVmFsdWVbMF0ubmFtZSA6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ29wdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKSB9LFxuICAgICAgICAgICAgICAgICAgICAnIEVtcHR5ICdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaW5wdXRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5pbnB1dCwgaW5wdXRSZWFkT25seSA/IHt9IDogc3R5bGVzLmhpZGUsIGlucHV0UmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fSksXG4gICAgICAgICAgICAgICAgc2VsZWN0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuc2VsZWN0LCBpbnB1dFJlYWRPbmx5ID8gc3R5bGVzLmhpZGUgOiB7fSwgaW5wdXRSZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9KSxcbiAgICAgICAgICAgICAgICBidXR0b25TdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5idXR0b24sIHRoaXMucHJvcHMuYnRuRGVsZXRlID8ge30gOiBzdHlsZXMuaGlkZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy53cmFwcGVyLCByZWY6ICd3cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnbGFiZWwnLCBzdHlsZTogc3R5bGVzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIGlkOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpbnB1dERlZmF1bHRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnc2VsZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzZWxlY3RTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlIH0sXG4gICAgICAgICAgICAgICAgICAgIE9wdGlvbnNcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogYnV0dG9uU3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkRlbENsaWNrIH0sXG4gICAgICAgICAgICAgICAgICAgICdEZWxldGUnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRGVsQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuRGVsQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIC8vINC/0L4g0LLRi9C30L7QstGDINC60L3QvtC/0LrRgyDRg9C00LDQu9C40YLRjCwg0L7QsdC90YPQu9GP0LXRgiDQt9C90LDRh9C10L3QuNC1XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6ICcnIH0pO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gU2VsZWN0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgICBkYXRhOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBidG5EZWxldGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxpYnM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5TZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgYnRuRGVsZXRlOiBmYWxzZSxcbiAgICB2YWx1ZTogMCxcbiAgICBjb2xsSWQ6ICdpZCcsXG4gICAgdGl0bGU6ICcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzk1JSdcblxuICAgIH0sXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4J1xuXG4gICAgfSxcbiAgICBoaWRlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICAgIHdpZHRoOiAnNjAlJyxcbiAgICAgICAgbWFyZ2luTGVmdDogJzVweCdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9LFxuICAgIGJ1dHRvbjoge1xuICAgICAgICB3aWR0aDogJzEwJSdcbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3Qtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi90ZXh0LWFyZWEtc3R5bGVzJyk7XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBJbnB1dCA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhJbnB1dCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSW5wdXQocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoSW5wdXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihJbnB1dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkIHx8IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoSW5wdXQsIFt7XG4gICAgICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZmllbGRWYWx1ZSB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsIHRoaXMucHJvcHMud2lkdGggPyB7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoIH0gOiB7fSwgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLndyYXBwZXIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICB7IGh0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgcmVmOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5sYWJlbCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIElucHV0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG5JbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsaWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICB2YWxpZDogdHJ1ZSxcbiAgICB0aXRsZTogJydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4XG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5OCUnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9kYXRhLWdyaWQtc3R5bGVzJyksXG4gICAga2V5ZG93biA9IHJlcXVpcmUoJ3JlYWN0LWtleWRvd24nKSxcbiAgICBLRVlTID0gWzM4LCA0MF07IC8vINC80L7QvdC40YLQvtGA0LjQvCDRgtC+0LvRjNC60L4g0YHRgtGA0LXQu9C60Lgg0LLQstC10YDRhSDQuCDQstC90LjQt9GFXG5cbnZhciBpc0V4aXN0cyA9IGZ1bmN0aW9uIGlzRXhpc3RzKG9iamVjdCwgcHJvcCkge1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAocHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vQGtleWRvd24gQHRvZG9cblxudmFyIERhdGFHcmlkID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKERhdGFHcmlkLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBEYXRhR3JpZChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGF0YUdyaWQpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChEYXRhR3JpZC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERhdGFHcmlkKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IF90aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxuICAgICAgICAgICAgZ3JpZERhdGE6IF90aGlzLnByb3BzLmdyaWREYXRhLFxuICAgICAgICAgICAgYWN0aXZlUm93OiAwLFxuICAgICAgICAgICAgYWN0aXZlQ29sdW1uOiAnJyxcbiAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVHcmlkSGVhZGVyQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmhhbmRsZUNlbGxEYmxDbGljay5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMucHJlcGFyZVRhYmxlUm93ID0gX3RoaXMucHJlcGFyZVRhYmxlUm93LmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRGF0YUdyaWQsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAgICAgLy8g0L3QsNC00LXQvCDQv9C+INC/0L4gcHJvcHMudmFsdWUg0LjQvdC00LXQutGBINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0R3JpZFJvd0luZGV4QnlJZCh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlUm93OiBpbmRleCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdyaWRDb2x1bW5zOiBuZXh0UHJvcHMuZ3JpZENvbHVtbnMsIGdyaWREYXRhOiBuZXh0UHJvcHMuZ3JpZERhdGEgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0b2RvINC00L7QsdCw0LLQuNGC0Ywg0L/RgNC+0LLQtdGA0LrRgyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDRgdC+0YHRgtC+0Y/QvdC40Y9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAndGgnO1xuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleVByZXNzKCdEb3duJyksXHJcbiAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrOiB0aGlzLmhhbmRsZUNlbGxEYmxDbGljaygpLFxyXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBoZWlnaHQ6ICdpbmhlcml0JyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5oZWFkZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2RhdGFHcmlkVGFibGUnLCBzdHlsZTogc3R5bGVzLmhlYWRlclRhYmxlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0Ym9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUYWJsZUhlYWRlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLndyYXBwZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMubWFpblRhYmxlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0Ym9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHZpc2liaWxpdHk6ICdjb2xsYXBzZScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUYWJsZUhlYWRlcih0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlVGFibGVSb3coKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSAvLyByZW5kZXJcblxuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRHcmlkUm93SW5kZXhCeUlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpIHtcbiAgICAgICAgICAgIC8vINC40YnQtdC8INC40L3QtNC10YUg0LIg0LzQsNGB0YHQuNCy0LUg0LTQsNC90L3Ri9GFXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmdyaWREYXRhO1xuXG4gICAgICAgICAgICBpZiAoZG9jSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgZGF0YVtpXVsnaWQnXSA9PSBkb2NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUNlbGxDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDZWxsQ2xpY2soaWR4KSB7XG4gICAgICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHQvtCx0YvRgtC4INC60LvQuNC60LAg0L/QviDRj9GH0LXQudC60LVcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZlUm93OiBpZHhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiB8fCBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmlkRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gdGhpcy5wcm9wcy5ncmlkRGF0YVtpZHhdLmlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soYWN0aW9uLCBkb2NJZCwgaWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUNlbGxEYmxDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDZWxsRGJsQ2xpY2soaWR4KSB7XG4gICAgICAgICAgICAvLyDQvtGC0LzQtdGC0LjQvCDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRgyDQuCDQstGL0LfQvtCy0LXQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyBkYmxDbGlja1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDZWxsQ2xpY2soaWR4KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGJsQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlR3JpZEhlYWRlckNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUdyaWRIZWFkZXJDbGljayhuYW1lKSB7XG4gICAgICAgICAgICB2YXIgc29ydCA9IHRoaXMuc3RhdGUuc29ydDtcbiAgICAgICAgICAgIGlmIChzb3J0Lm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBzb3J0LmRpcmVjdGlvbiA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3J0ID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdhc2MnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNvcnRCeSA9IFt7IGNvbHVtbjogc29ydC5uYW1lLCBkaXJlY3Rpb246IHNvcnQuZGlyZWN0aW9uIH1dO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhY3RpdmVDb2x1bW46IG5hbWUsXG4gICAgICAgICAgICAgICAgc29ydDogc29ydFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uSGVhZGVyQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uSGVhZGVyQ2xpY2soc29ydEJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlS2V5RG93bicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICAgICAgICAgIC8vINGA0LXQsNC60YbQuNGPINC90LAg0LrQu9Cw0LLQuNCw0YLRg9GA0YNcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlUm93O1xuICAgICAgICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLQvdC40LcsINGD0LLQtdC70LjRh9C40Lwg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YMg0L3QsCArIDFcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXgrKztcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5ncmlkRGF0YS5sZW5ndGggPCByb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdC8INC/0YDQtdC20L3QtdC1INC30L3QsNGH0LXQvdC40LVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0luZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVSb3c7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLQvdC40LcsINGD0LLQtdC70LjRh9C40Lwg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YMg0L3QsCAtIDFcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXggPSByb3dJbmRleCA8IDAgPyAwIDogcm93SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZlUm93OiByb3dJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXBhcmVUYWJsZVJvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlVGFibGVSb3coKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ3JpZERhdGEubWFwKGZ1bmN0aW9uIChyb3csIHJvd0luZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNldFJvd0FjdGl2ZSA9IHt9LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RJbmRleCA9ICd0ci0nICsgcm93SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVJvdyA9IF90aGlzMi5zdGF0ZS5hY3RpdmVSb3c7XG5cbiAgICAgICAgICAgICAgICB2YXIgcm93T2JqZWN0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ3RyJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBvYmplY3RJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IF90aGlzMi5oYW5kbGVDZWxsQ2xpY2suYmluZChfdGhpczIsIHJvd0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s6IF90aGlzMi5oYW5kbGVDZWxsRGJsQ2xpY2suYmluZChfdGhpczIsIHJvd0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogX3RoaXMyLmhhbmRsZUtleURvd24uYmluZChfdGhpczIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy50ciwgYWN0aXZlUm93ID09PSByb3dJbmRleCA/IHN0eWxlcy5mb2N1c2VkIDoge30pLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBvYmplY3RJbmRleCB9LFxuICAgICAgICAgICAgICAgICAgICBfdGhpczIuc3RhdGUuZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4sIGNvbHVtbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2VsbEluZGV4ID0gJ3RkLScgKyByb3dJbmRleCArICctJyArIGNvbHVtbkluZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzcGxheSA9IChpc0V4aXN0cyhjb2x1bW4sICdzaG93JykgPyBjb2x1bW4uc2hvdyA6IHRydWUpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gaXNFeGlzdHMoY29sdW1uLCAnd2lkdGgnKSA/IGNvbHVtbi53aWR0aCA6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy50ZCwgIWRpc3BsYXkgPyB7IGRpc3BsYXk6ICdub25lJyB9IDoge30sIHsgd2lkdGg6IHdpZHRoIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlLCByZWY6IGNlbGxJbmRleCwga2V5OiBjZWxsSW5kZXggfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dbY29sdW1uLmlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiByb3dPYmplY3Q7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncHJlcGFyZVRhYmxlSGVhZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBhcmVUYWJsZUhlYWRlcihpc0hpZGRlbikge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBncmlkQ29sdW1ucyA9IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoJztcblxuICAgICAgICAgICAgcmV0dXJuIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBoZWFkZXJJbmRleCA9ICd0aC0nICsgaW5kZXg7XG5cbiAgICAgICAgICAgICAgICB2YXIgaGVhZGVyU3R5bGUgPSAndGgnO1xuICAgICAgICAgICAgICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJTdHlsZSA9ICd0aEhpZGRlbic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3BsYXkgPSAoaXNFeGlzdHMoY29sdW1uLCAnc2hvdycpID8gY29sdW1uLnNob3cgOiB0cnVlKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBpc0V4aXN0cyhjb2x1bW4sICd3aWR0aCcpID8gY29sdW1uLndpZHRoIDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlc1toZWFkZXJTdHlsZV0sICFkaXNwbGF5ID8geyBkaXNwbGF5OiAnbm9uZScgfSA6IHt9LCB7IHdpZHRoOiB3aWR0aCB9KSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29sdW1uID0gX3RoaXMzLnN0YXRlLmFjdGl2ZUNvbHVtbixcbiAgICAgICAgICAgICAgICAgICAgaWNvblR5cGUgPSBfdGhpczMuc3RhdGUuc29ydC5kaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3R5bGVBc2MgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW1hZ2UsIGFjdGl2ZUNvbHVtbiA9PSBjb2x1bW4uaWQgJiYgaWNvblR5cGUgPT0gJ2FzYycgPyB7fSA6IHsgZGlzcGxheTogJ25vbmUnIH0pLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlRGVzYyA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5pbWFnZSwgYWN0aXZlQ29sdW1uID09IGNvbHVtbi5pZCAmJiBpY29uVHlwZSA9PSAnZGVzYycgPyB7fSA6IHsgZGlzcGxheTogJ25vbmUnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICd0aCcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogaGVhZGVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGhlYWRlckluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogX3RoaXMzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKF90aGlzMywgY29sdW1uLmlkKSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5uYW1lXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZUFzYycsIHN0eWxlOiBpbWFnZVN0eWxlQXNjLCBzcmM6IHN0eWxlcy5pY29uc1snYXNjJ10gfSkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2VEZXNjJywgc3R5bGU6IGltYWdlU3R5bGVEZXNjLCBzcmM6IHN0eWxlcy5pY29uc1snZGVzYyddIH0pIDogbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBEYXRhR3JpZDtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG4vKlxyXG5EYXRhR3JpZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBncmlkRGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZUFjdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25EYmxDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkhlYWRlckNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGFjdGl2ZVJvdzogUHJvcFR5cGVzLm51bWJlclxyXG59XHJcbiovXG5cbkRhdGFHcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBncmlkQ29sdW1uczogW10sXG4gICAgZ3JpZERhdGE6IFtdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFHcmlkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeFxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWFpblRhYmxlOiB7XG4gICAgICAgIHRhYmxlTGF5b3V0OiAnZml4ZWQnLFxuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0b3A6ICctMzBweCdcbiAgICB9LFxuICAgIGhlYWRlclRhYmxlOiB7XG4gICAgICAgIHRhYmxlTGF5b3V0OiAnZml4ZWQnLFxuICAgICAgICB3aWR0aDogJzcwJSdcbiAgICB9LFxuICAgIHRoOiB7XG4gICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2dyZXknLFxuICAgICAgICBoZWlnaHQ6ICc1MHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgIGRpc3BsYXk6ICd0YWJsZS1jZWxsJ1xuICAgIH0sXG5cbiAgICB0aEhpZGRlbjoge1xuICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmV5JyxcbiAgICAgICAgaGVpZ2h0OiAnMXB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgIGRpc3BsYXk6ICd0YWJsZS1jZWxsJ1xuICAgIH0sXG5cbiAgICB0cjoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcbiAgICB9LFxuXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfSxcblxuICAgIHRkOiB7XG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknLFxuICAgICAgICBkaXNwbGF5OiAndGFibGUtY2VsbCcsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAnNXB4J1xuICAgIH0sXG5cbiAgICBpY29uczoge1xuICAgICAgICBhc2M6ICcvaW1hZ2VzL2ljb25zL3NvcnQtYWxwaGEtYXNjLnBuZycsXG4gICAgICAgIGRlc2M6ICcvaW1hZ2VzL2ljb25zL3NvcnQtYWxwaGEtZGVzYy5wbmcnXG4gICAgfSxcblxuICAgIGltYWdlOiB7XG4gICAgICAgIG1hcmdpbjogJzFweCdcbiAgICB9LFxuXG4gICAgd3JhcHBlcjoge1xuICAgICAgICBoZWlnaHQ6ICdpbmhlcml0JyxcbiAgICAgICAgb3ZlcmZsb3c6ICdzY3JvbGwnXG4gICAgfSxcblxuICAgIGhlYWRlcjoge1xuICAgICAgICBvdmVyZmxvdzogJ3Njcm9sbCcsXG4gICAgICAgIG92ZXJmbG93WDogJ2hpZGRlbidcblxuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFMTF9QUklOVEFCTEVfS0VZUyA9IGV4cG9ydHMuQUxMX0tFWVMgPSBleHBvcnRzLktleXMgPSBleHBvcnRzLnNldEJpbmRpbmcgPSBleHBvcnRzLmtleWRvd25TY29wZWQgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfZGVjb3JhdG9ycyA9IHJlcXVpcmUoJy4vZGVjb3JhdG9ycycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2RlZmF1bHQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWNvcmF0b3JzKS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAna2V5ZG93blNjb3BlZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9kZWNvcmF0b3JzLmtleWRvd25TY29wZWQ7XG4gIH1cbn0pO1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi9zdG9yZScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3NldEJpbmRpbmcnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RvcmUuc2V0QmluZGluZztcbiAgfVxufSk7XG5cbnZhciBfa2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdLZXlzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfa2V5cykuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0FMTF9LRVlTJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2tleXMuQUxMX0tFWVM7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBTExfUFJJTlRBQkxFX0tFWVMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfa2V5cy5BTExfUFJJTlRBQkxFX0tFWVM7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL2xpYi9hcnJheS5mcm9tJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mMiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmtleWRvd25TY29wZWQgPSB1bmRlZmluZWQ7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YyKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mMihvYmopO1xufTsgLyoqXG4gICAgKiBAbW9kdWxlIGRlY29yYXRvcnNcbiAgICAqXG4gICAgKi9cblxudmFyIF9jbGFzc19kZWNvcmF0b3IgPSByZXF1aXJlKCcuL2NsYXNzX2RlY29yYXRvcicpO1xuXG52YXIgX2NsYXNzX2RlY29yYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc19kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3IgPSByZXF1aXJlKCcuL21ldGhvZF9kZWNvcmF0b3InKTtcblxudmFyIF9tZXRob2RfZGVjb3JhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkID0gcmVxdWlyZSgnLi9tZXRob2RfZGVjb3JhdG9yX3Njb3BlZCcpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07XG59XG5cbi8qKlxuICogbm9vcERlY29yYXRvclxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybiB7dW5kZWZpbmVkfSBSZXR1cm5zIGB1bmRlZmluZWRgIHNvIHRoYXQgdGhlIG9yaWdpbmFsIHVuZGVjb3JhdGVkIGluc3RhbmNlL21ldGhvZCBpcyB1c2VkXG4gKi9cbmZ1bmN0aW9uIG5vb3BEZWNvcmF0b3IoKSB7XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogX2RlY29yYXRvclxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kRm4gVGhlIG1ldGhvZCB3cmFwcGVyIHRvIGRlbGVnYXRlIHRvLCBiYXNlZCBvbiB3aGV0aGVyIHVzZXIgaGFzIHNwZWNpZmllZCBhIHNjb3BlZCBkZWNvcmF0b3Igb3Igbm90XG4gKiBAcGFyYW0ge0FycmF5fSAuLi5hcmdzIFJlbWFpbmRlciBvZiBhcmd1bWVudHMgcGFzc2VkIGluXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGRlY29yYXRlZCBjbGFzcyBvciBtZXRob2RcbiAqL1xuZnVuY3Rpb24gX2RlY29yYXRvcihtZXRob2RGbikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIC8vIGNoZWNrIHRoZSBmaXJzdCBhcmd1bWVudCB0byBzZWUgaWYgaXQncyBhIHVzZXItc3VwcGxpZWQga2V5Y29kZSBvciBhcnJheVxuICAvLyBvZiBrZXljb2Rlcywgb3IgaWYgaXQncyB0aGUgd3JhcHBlZCBjbGFzcyBvciBtZXRob2RcbiAgdmFyIHRlc3RBcmcgPSBhcmdzWzBdO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGVzdEFyZyk7XG5cbiAgLy8gaWYgdGhlIHRlc3QgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCBvciBmdW5jdGlvbiwgaXQgaXMgdXNlci1zdXBwbGllZFxuICAvLyBrZXljb2Rlcy4gZWxzZSB0aGVyZSBhcmUgbm8gYXJndW1lbnRzIGFuZCBpdCdzIGp1c3QgdGhlIHdyYXBwZWQgY2xhc3NcbiAgaWYgKGlzQXJyYXkgfHwgflsnc3RyaW5nJywgJ251bWJlcicsICdzeW1ib2wnXS5pbmRleE9mKHR5cGVvZiB0ZXN0QXJnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0ZXN0QXJnKSkpIHtcbiAgICB2YXIga2V5cyA9IGlzQXJyYXkgPyB0ZXN0QXJnIDogYXJncztcblxuICAgIC8vIHJldHVybiB0aGUgZGVjb3JhdG9yIGZ1bmN0aW9uLCB3aGljaCBvbiB0aGUgbmV4dCBjYWxsIHdpbGwgbG9vayBmb3JcbiAgICAvLyB0aGUgcHJlc2VuY2Ugb2YgYSBtZXRob2QgbmFtZSB0byBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhIHdyYXBwZWQgbWV0aG9kXG4gICAgLy8gb3IgY29tcG9uZW50XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIG1ldGhvZE5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICAgIHJldHVybiBtZXRob2ROYW1lID8gbWV0aG9kRm4oeyB0YXJnZXQ6IHRhcmdldCwgZGVzY3JpcHRvcjogZGVzY3JpcHRvciwga2V5czoga2V5cyB9KSA6ICgwLCBfY2xhc3NfZGVjb3JhdG9yMi5kZWZhdWx0KSh0YXJnZXQsIGtleXMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdmFyIFdyYXBwZWRDb21wb25lbnQgPSBhcmdzWzBdO1xuICAgIHZhciBtZXRob2ROYW1lID0gYXJnc1sxXTtcblxuICAgIC8vIG1ldGhvZCBkZWNvcmF0b3JzIHdpdGhvdXQga2V5Y29kZSAod2hpY2gpIGFyZ3VtZW50cyBhcmUgbm90IGFsbG93ZWQuXG4gICAgaWYgKFdyYXBwZWRDb21wb25lbnQgJiYgIW1ldGhvZE5hbWUpIHtcbiAgICAgIHJldHVybiBfY2xhc3NfZGVjb3JhdG9yMi5kZWZhdWx0LmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXRob2ROYW1lICsgJzogTWV0aG9kIGRlY29yYXRvcnMgbXVzdCBoYXZlIGtleWNvZGUgYXJndW1lbnRzLCBzbyB0aGUgZGVjb3JhdG9yIGZvciB0aGlzIG1ldGhvZCB3aWxsIG5vdCBkbyBhbnl0aGluZycpO1xuICAgICAgcmV0dXJuIG5vb3BEZWNvcmF0b3I7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICoga2V5ZG93blNjb3BlZFxuICpcbiAqIE1ldGhvZCBkZWNvcmF0b3IgdGhhdCB3aWxsIGxvb2sgZm9yIGNoYW5nZXMgdG8gaXRzIHRhcmdldGVkIGNvbXBvbmVudCdzXG4gKiBga2V5ZG93bmAgcHJvcHMgdG8gZGVjaWRlIHdoZW4gdG8gdHJpZ2dlciwgcmF0aGVyIHRoYW4gcmVzcG9uZGluZyBkaXJlY3RseVxuICogdG8ga2V5ZG93biBldmVudHMuIFRoaXMgbGV0cyB5b3Ugc3BlY2lmeSBhIEBrZXlkb3duIGRlY29yYXRlZCBjbGFzcyBoaWdoZXJcbiAqIHVwIGluIHRoZSB2aWV3IGhpZXJhcmNoeSBmb3IgbGFyZ2VyIHNjb3Bpbmcgb2Yga2V5ZG93biBldmVudHMsIG9yIGZvclxuICogcHJvZ3JhbW1hdGljYWxseSBzZW5kaW5nIGtleWRvd24gZXZlbnRzIGFzIHByb3BzIGludG8gdGhlIGNvbXBvbmVudHMgaW4gb3JkZXJcbiAqIHRvIHRyaWdnZXIgZGVjb3JhdGVkIG1ldGhvZHMgd2l0aCBtYXRjaGluZyBrZXlzLlxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge0FycmF5fSAuLi5hcmdzICBBbGwgKG9yIG5vKSBhcmd1bWVudHMgcGFzc2VkIGluIGZyb20gZGVjb3JhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBkZWNvcmF0ZWQgY2xhc3Mgb3IgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGtleWRvd25TY29wZWQoKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIF9kZWNvcmF0b3IuYXBwbHkodW5kZWZpbmVkLCBbX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkMi5kZWZhdWx0XS5jb25jYXQoYXJncykpO1xufVxuXG4vKipcbiAqIGtleWRvd25cbiAqXG4gKiBUaGUgbWFpbiBkZWNvcmF0b3IgYW5kIGRlZmF1bHQgZXhwb3J0LCBoYW5kbGVzIGJvdGggY2xhc3NlcyBhbmQgbWV0aG9kcy5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtBcnJheX0gLi4uYXJncyAgQWxsIChvciBubykgYXJndW1lbnRzIHBhc3NlZCBpbiBmcm9tIGRlY29yYXRpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZGVjb3JhdGVkIGNsYXNzIG9yIG1ldGhvZFxuICovXG5mdW5jdGlvbiBrZXlkb3duKCkge1xuICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgfVxuXG4gIHJldHVybiBfZGVjb3JhdG9yLmFwcGx5KHVuZGVmaW5lZCwgW19tZXRob2RfZGVjb3JhdG9yMi5kZWZhdWx0XS5jb25jYXQoYXJncykpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBrZXlkb3duO1xuZXhwb3J0cy5rZXlkb3duU2NvcGVkID0ga2V5ZG93blNjb3BlZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfXJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO2lmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmUnKTtcblxudmFyIF9zdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yZSk7XG5cbnZhciBfZXZlbnRfaGFuZGxlcnMgPSByZXF1aXJlKCcuLi9ldmVudF9oYW5kbGVycycpO1xuXG52YXIgX2tleXMgPSByZXF1aXJlKCcuLi9saWIva2V5cycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTtcbn1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1yZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihzdXBlckNsYXNzKSkpO1xuICB9c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTtpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IC8qKlxuICAgKiBAbW9kdWxlIGNvbXBvbmVudFdyYXBwZXJcbiAgICpcbiAgICovXG5cbi8qKlxuICogY29tcG9uZW50V3JhcHBlclxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge29iamVjdH0gV3JhcHBlZENvbXBvbmVudCBSZWFjdCBjb21wb25lbnQgY2xhc3MgdG8gYmUgd3JhcHBlZFxuICogQHBhcmFtIHthcnJheX0gW2tleXNdIFRoZSBrZXkocykgYm91bmQgdG8gdGhlIGNsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBoaWdoZXItb3JkZXIgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgZGVjb3JhdGVkIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIGNvbXBvbmVudFdyYXBwZXIoV3JhcHBlZENvbXBvbmVudCkge1xuICB2YXIga2V5cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogX2tleXMuQUxMX0tFWVM7XG5cbiAgdmFyIEtleUJvYXJkSGVscGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoS2V5Qm9hcmRIZWxwZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gS2V5Qm9hcmRIZWxwZXIocHJvcHMpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBLZXlCb2FyZEhlbHBlcik7XG5cbiAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChLZXlCb2FyZEhlbHBlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEtleUJvYXJkSGVscGVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgZXZlbnQ6IG51bGxcbiAgICAgIH07XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEtleUJvYXJkSGVscGVyLCBbe1xuICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uTW91bnQpKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgKDAsIF9ldmVudF9oYW5kbGVycy5vblVubW91bnQpKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2hhbmRsZUtleURvd24nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgLy8gdG8gc2ltdWxhdGUgYSBrZXlwcmVzcywgc2V0IHRoZSBldmVudCBhbmQgdGhlbiBjbGVhciBpdCBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV2ZW50OiBldmVudCB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5zZXRTdGF0ZSh7IGV2ZW50OiBudWxsIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IGtleWRvd246IHRoaXMuc3RhdGUgfSkpO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBLZXlCb2FyZEhlbHBlcjtcbiAgfShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuICBfc3RvcmUyLmRlZmF1bHQuc2V0QmluZGluZyh7IGtleXM6IFtdLmNvbmNhdChrZXlzKSwgZm46IEtleUJvYXJkSGVscGVyLnByb3RvdHlwZS5oYW5kbGVLZXlEb3duLCB0YXJnZXQ6IEtleUJvYXJkSGVscGVyLnByb3RvdHlwZSB9KTtcblxuICByZXR1cm4gS2V5Qm9hcmRIZWxwZXI7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbXBvbmVudFdyYXBwZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2NsYXNzX2RlY29yYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107dmFyIF9uID0gdHJ1ZTt2YXIgX2QgPSBmYWxzZTt2YXIgX2UgPSB1bmRlZmluZWQ7dHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7X2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1yZXR1cm4gX2FycjtcbiAgfXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5leHBvcnRzLl9yZXNldFN0b3JlID0gX3Jlc2V0U3RvcmU7XG5cbnZhciBfbWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4vbGliL21hdGNoX2tleXMnKTtcblxudmFyIF9tYXRjaF9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hdGNoX2tleXMpO1xuXG52YXIgX3BhcnNlX2tleXMgPSByZXF1aXJlKCcuL2xpYi9wYXJzZV9rZXlzJyk7XG5cbnZhciBfcGFyc2Vfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZV9rZXlzKTtcblxudmFyIF91dWlkID0gcmVxdWlyZSgnLi9saWIvdXVpZCcpO1xuXG52YXIgX3V1aWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXVpZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1yZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59IC8qKlxuICAgKiBAbW9kdWxlIHN0b3JlXG4gICAqXG4gICAqL1xuXG4vKipcbiAqIHByaXZhdGVcbiAqXG4gKi9cblxuLy8gZGljdCBmb3IgY2xhc3MgcHJvdG90eXBlcyA9PiBiaW5kaW5nc1xudmFyIF9oYW5kbGVycyA9IG5ldyBNYXAoKTtcblxuLy8gYWxsIG1vdW50ZWQgaW5zdGFuY2VzIHRoYXQgaGF2ZSBrZXliaW5kaW5nc1xudmFyIF9pbnN0YW5jZXMgPSBuZXcgU2V0KCk7XG5cbi8vIGZvciB0ZXN0aW5nXG5mdW5jdGlvbiBfcmVzZXRTdG9yZSgpIHtcbiAgX2hhbmRsZXJzLmNsZWFyKCk7XG4gIF9pbnN0YW5jZXMuY2xlYXIoKTtcbn1cblxuLyoqXG4gKiBwdWJsaWNcbiAqXG4gKi9cblxudmFyIFN0b3JlID0ge1xuXG4gIC8qKlxuICAgKiBhY3RpdmF0ZVxuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gaW5zdGFuY2UgSW5zdGFudGlhdGVkIGNsYXNzIHRoYXQgZXh0ZW5kZWQgUmVhY3QuQ29tcG9uZW50LCB0byBiZSBmb2N1c2VkIHRvIHJlY2VpdmUga2V5ZG93biBldmVudHNcbiAgICovXG4gIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZShpbnN0YW5jZXMpIHtcbiAgICB2YXIgaW5zdGFuY2VzQXJyYXkgPSBbXS5jb25jYXQoaW5zdGFuY2VzKTtcblxuICAgIC8vIGlmIG5vIGNvbXBvbmVudHMgd2VyZSBmb3VuZCBhcyBhbmNlc3RvcnMgb2YgdGhlIGV2ZW50IHRhcmdldCxcbiAgICAvLyBlZmZlY3RpdmVseSBkZWFjdGl2YXRlIGtleWRvd24gaGFuZGxpbmcgYnkgY2FwcGluZyB0aGUgc2V0IG9mIGluc3RhbmNlc1xuICAgIC8vIHdpdGggYG51bGxgLlxuICAgIGlmICghaW5zdGFuY2VzQXJyYXkubGVuZ3RoKSB7XG4gICAgICBfaW5zdGFuY2VzLmFkZChudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2luc3RhbmNlcy5kZWxldGUobnVsbCk7XG5cbiAgICAgIC8vIGRlbGV0aW5nIGFuZCB0aGVuIGFkZGluZyB0aGUgaW5zdGFuY2UocykgaGFzIHRoZSBlZmZlY3Qgb2Ygc29ydGluZyB0aGUgc2V0XG4gICAgICAvLyBhY2NvcmRpbmcgdG8gaW5zdGFuY2UgYWN0aXZhdGlvbiAoYXNjZW5kaW5nKVxuICAgICAgaW5zdGFuY2VzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgX2luc3RhbmNlcy5kZWxldGUoaW5zdGFuY2UpO1xuICAgICAgICBfaW5zdGFuY2VzLmFkZChpbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIGRlbGV0ZUluc3RhbmNlXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgSW5zdGFudGlhdGVkIGNsYXNzIHRoYXQgZXh0ZW5kZWQgUmVhY3QuQ29tcG9uZW50XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRoZSB2YWx1ZSBzZXQuaGFzKCB0YXJnZXQgKSB3b3VsZCBoYXZlIHJldHVybmVkIHByaW9yIHRvIGRlbGV0aW9uXG4gICAqL1xuICBkZWxldGVJbnN0YW5jZTogZnVuY3Rpb24gZGVsZXRlSW5zdGFuY2UodGFyZ2V0KSB7XG4gICAgX2luc3RhbmNlcy5kZWxldGUodGFyZ2V0KTtcbiAgfSxcbiAgZmluZEJpbmRpbmdGb3JFdmVudDogZnVuY3Rpb24gZmluZEJpbmRpbmdGb3JFdmVudChldmVudCkge1xuICAgIGlmICghX2luc3RhbmNlcy5oYXMobnVsbCkpIHtcbiAgICAgIHZhciBrZXlNYXRjaGVzRXZlbnQgPSBmdW5jdGlvbiBrZXlNYXRjaGVzRXZlbnQoa2V5U2V0KSB7XG4gICAgICAgIHJldHVybiAoMCwgX21hdGNoX2tleXMyLmRlZmF1bHQpKHsga2V5U2V0OiBrZXlTZXQsIGV2ZW50OiBldmVudCB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBpbnN0YW5jZXMgaW4gcmV2ZXJzZSBhY3RpdmF0aW9uIG9yZGVyIHNvIHRoYXQgbW9zdFxuICAgICAgLy8gcmVjZW50bHkgYWN0aXZhdGVkIGluc3RhbmNlIGdldHMgZmlyc3QgZGlicyBvbiBldmVudFxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoX2luc3RhbmNlcykpLnJldmVyc2UoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuZ2V0QmluZGluZyhpbnN0YW5jZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGJpbmRpbmdzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBfc3RlcDIkdmFsdWUgPSBfc2xpY2VkVG9BcnJheShfc3RlcDIudmFsdWUsIDIpLFxuICAgICAgICAgICAgICAgICAga2V5U2V0cyA9IF9zdGVwMiR2YWx1ZVswXSxcbiAgICAgICAgICAgICAgICAgIGZuID0gX3N0ZXAyJHZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgIGlmIChrZXlTZXRzLnNvbWUoa2V5TWF0Y2hlc0V2ZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB3aGVuIG1hdGNoaW5nIGtleWJpbmRpbmcgaXMgZm91bmQgLSBpLmUuIG9ubHkgb25lXG4gICAgICAgICAgICAgICAgLy8ga2V5Ym91bmQgY29tcG9uZW50IGNhbiByZXNwb25kIHRvIGEgZ2l2ZW4ga2V5IGNvZGUuIHRvIGdldCBhcm91bmQgdGhpcyxcbiAgICAgICAgICAgICAgICAvLyBzY29wZSBhIGNvbW1vbiBhbmNlc3RvciBjb21wb25lbnQgY2xhc3Mgd2l0aCBAa2V5ZG93biBhbmQgdXNlXG4gICAgICAgICAgICAgICAgLy8gQGtleWRvd25TY29wZWQgdG8gYmluZCB0aGUgZHVwbGljYXRlIGtleXMgaW4geW91ciBjaGlsZCBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgLy8gKG9yIGp1c3QgaW5zcGVjdCBuZXh0UHJvcHMua2V5ZG93bi5ldmVudCkuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZm46IGZuLCBpbnN0YW5jZTogaW5zdGFuY2UgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogZ2V0QmluZGluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IENsYXNzIHVzZWQgYXMga2V5IGluIGRpY3Qgb2Yga2V5IGJpbmRpbmdzXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG9iamVjdCBjb250YWluaW5nIGJpbmRpbmdzIGZvciB0aGUgZ2l2ZW4gY2xhc3NcbiAgICovXG4gIGdldEJpbmRpbmc6IGZ1bmN0aW9uIGdldEJpbmRpbmcoX3JlZikge1xuICAgIHZhciBfX3JlYWN0S2V5ZG93blVVSUQgPSBfcmVmLl9fcmVhY3RLZXlkb3duVVVJRDtcblxuICAgIHJldHVybiBfaGFuZGxlcnMuZ2V0KF9fcmVhY3RLZXlkb3duVVVJRCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldEluc3RhbmNlc1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcmV0dXJuIHtzZXR9IEFsbCBzdG9yZWQgaW5zdGFuY2VzIChhbGwgbW91bnRlZCBjb21wb25lbnQgaW5zdGFuY2VzIHdpdGgga2V5YmluZGluZ3MpXG4gICAqL1xuICBnZXRJbnN0YW5jZXM6IGZ1bmN0aW9uIGdldEluc3RhbmNlcygpIHtcbiAgICByZXR1cm4gX2luc3RhbmNlcztcbiAgfSxcblxuICAvKipcbiAgICogaXNFbXB0eVxuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFNpemUgb2YgdGhlIHNldCBvZiBhbGwgc3RvcmVkIGluc3RhbmNlc1xuICAgKi9cbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gIV9pbnN0YW5jZXMuc2l6ZTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0QmluZGluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gYXJncyBBbGwgYXJndW1lbnRzIG5lY2Vzc2FyeSB0byBzZXQgdGhlIGJpbmRpbmdcbiAgICogQHBhcmFtIHthcnJheX0gYXJncy5rZXlzIEtleSBjb2RlcyB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSBmblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhcmdzLmZuIFRoZSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiBnaXZlbiBrZXlzIGFyZSBwcmVzc2VkXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnRhcmdldCBUaGUgZGVjb3JhdGVkIGNsYXNzXG4gICAqL1xuICBzZXRCaW5kaW5nOiBmdW5jdGlvbiBzZXRCaW5kaW5nKF9yZWYyKSB7XG4gICAgdmFyIGtleXMgPSBfcmVmMi5rZXlzLFxuICAgICAgICBmbiA9IF9yZWYyLmZuLFxuICAgICAgICB0YXJnZXQgPSBfcmVmMi50YXJnZXQ7XG5cbiAgICB2YXIga2V5U2V0cyA9ICgwLCBfcGFyc2Vfa2V5czIuZGVmYXVsdCkoa2V5cyk7XG5cbiAgICB2YXIgX19yZWFjdEtleWRvd25VVUlEID0gdGFyZ2V0Ll9fcmVhY3RLZXlkb3duVVVJRDtcblxuICAgIGlmICghX19yZWFjdEtleWRvd25VVUlEKSB7XG4gICAgICB0YXJnZXQuX19yZWFjdEtleWRvd25VVUlEID0gKDAsIF91dWlkMi5kZWZhdWx0KSgpO1xuICAgICAgX2hhbmRsZXJzLnNldCh0YXJnZXQuX19yZWFjdEtleWRvd25VVUlELCBuZXcgTWFwKFtba2V5U2V0cywgZm5dXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaGFuZGxlcnMuZ2V0KF9fcmVhY3RLZXlkb3duVVVJRCkuc2V0KGtleVNldHMsIGZuKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3Qvc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfa2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG52YXIgUFJJTlRBQkxFX0NIQVJBQ1RFUlMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVp+IUAjJCVeJiooKS1fKz1bXVxcXFx7fXw7XFwnOlwiLC4vPD4/wqMnO1xuXG52YXIgbW9kS2V5cyA9IE9iamVjdC5rZXlzKF9rZXlzLm1vZGlmaWVycyk7XG5cbmZ1bmN0aW9uIG1hdGNoS2V5cyhfcmVmKSB7XG4gIHZhciBrZXlTZXQgPSBfcmVmLmtleVNldCxcbiAgICAgIGV2ZW50ID0gX3JlZi5ldmVudDtcbiAgdmFyIGtleSA9IGtleVNldC5rZXksXG4gICAgICBfa2V5U2V0JG1vZGlmaWVycyA9IGtleVNldC5tb2RpZmllcnMsXG4gICAgICBtb2RpZmllcnMgPSBfa2V5U2V0JG1vZGlmaWVycyA9PT0gdW5kZWZpbmVkID8gW10gOiBfa2V5U2V0JG1vZGlmaWVycztcblxuICB2YXIga2V5c01hdGNoID0gdm9pZCAwO1xuXG4gIGtleXNNYXRjaCA9IGtleSA9PT0gX2tleXMuQUxMX0tFWVM7XG5cbiAgaWYgKGtleSA9PT0gX2tleXMuQUxMX1BSSU5UQUJMRV9LRVlTKSB7XG4gICAgaWYgKGV2ZW50LmtleSkge1xuICAgICAgLy8gTW9kZXJuIGJyb3dzZXJzIGltcGxlbWVudCBga2V5YCwgc28gaWYgYGtleWAgaXMgbGVuZ3RoIDEsIHdlIGhhdmUgYSBtYXRjaC4gZS5nLiAnYScgZm9yIHRoZVxuICAgICAgLy8gYSBrZXksIG9yICcyJyBmb3IgdGhlIDIga2V5LiBBbGwgb3RoZXIgbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzIGhhdmUgbmFtZXMsIGUuZy4gJ0VudGVyJyBvciAnQmFja3NwYWNlJy5cbiAgICAgIGtleXNNYXRjaCA9IGV2ZW50LmtleS5sZW5ndGggPT09IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGRvIG5vIHN1cHBvcnQgYGV2ZW50LmtleWAsIHdlIHRlc3QgYWdhaW5zdCBhIGxpc3Qgb2YgY2hhcmFjdGVyc1xuICAgICAgdmFyIHByZXNzZWRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5jaGFyQ29kZSk7XG4gICAgICBrZXlzTWF0Y2ggPSBQUklOVEFCTEVfQ0hBUkFDVEVSUy5pbmRleE9mKHByZXNzZWRDaGFyKSA+PSAwO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkgPT09IGV2ZW50LndoaWNoKSB7XG4gICAgdmFyIGV2dE1vZEtleXMgPSBtb2RLZXlzLmZpbHRlcihmdW5jdGlvbiAobW9kS2V5KSB7XG4gICAgICByZXR1cm4gZXZlbnRbbW9kS2V5ICsgJ0tleSddO1xuICAgIH0pLnNvcnQoKTtcbiAgICBrZXlzTWF0Y2ggPSBtb2RpZmllcnMubGVuZ3RoID09PSBldnRNb2RLZXlzLmxlbmd0aCAmJiBtb2RpZmllcnMuZXZlcnkoZnVuY3Rpb24gKG1vZEtleSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBldnRNb2RLZXlzW2luZGV4XSA9PT0gbW9kS2V5O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGtleXNNYXRjaDtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gbWF0Y2hLZXlzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL21hdGNoX2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFMTF9QUklOVEFCTEVfS0VZUyA9IGV4cG9ydHMuQUxMX0tFWVMgPSBleHBvcnRzLm1vZGlmaWVycyA9IHVuZGVmaW5lZDtcblxucmVxdWlyZSgnY29yZS1qcy9lczYvc3ltYm9sJyk7XG5cbi8vIFRPRE86IE5lZWQgYmV0dGVyLCBtb3JlIGNvbXBsZXRlLCBhbmQgbW9yZSBtZXRob2RpY2FsIGtleSBkZWZpbml0aW9uc1xuXG52YXIgS2V5cyA9IHtcbiAgYmFja3NwYWNlOiA4LFxuICBkZWw6IDQ2LFxuICBkZWxldGU6IDQ2LFxuICB0YWI6IDksXG4gIGVudGVyOiAxMyxcbiAgJ3JldHVybic6IDEzLFxuICBlc2M6IDI3LFxuICBzcGFjZTogMzIsXG4gIGxlZnQ6IDM3LFxuICB1cDogMzgsXG4gIHJpZ2h0OiAzOSxcbiAgZG93bjogNDAsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxXG59O1xuXG4vLyBBZGQgdXBwZXJjYXNlIHZlcnNpb25zIG9mIGtleXMgYWJvdmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5PYmplY3Qua2V5cyhLZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIEtleXNba2V5LnRvVXBwZXJDYXNlKCldID0gS2V5c1trZXldO1xufSk7XG5cbicwMTIzNDU2Nzg5Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobnVtLCBpbmRleCkge1xuICByZXR1cm4gS2V5c1tudW1dID0gaW5kZXggKyA0ODtcbn0pO1xuXG4nQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIsIGluZGV4KSB7XG4gIEtleXNbbGV0dGVyXSA9IGluZGV4ICsgNjU7XG4gIEtleXNbbGV0dGVyLnRvTG93ZXJDYXNlKCldID0gaW5kZXggKyA2NTtcbn0pO1xuXG4vLyBmbiBrZXlzXG5bMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgcmV0dXJuIEtleXNbJ2YnICsgaW5kZXhdID0gMTExICsgaW5kZXg7XG59KTtcblxudmFyIG1vZGlmaWVycyA9IGV4cG9ydHMubW9kaWZpZXJzID0ge1xuICBjb250cm9sOiAnY3RybCcsXG4gIGN0cmw6ICdjdHJsJyxcbiAgc2hpZnQ6ICdzaGlmdCcsXG4gIG1ldGE6ICdtZXRhJyxcbiAgY21kOiAnbWV0YScsXG4gIGNvbW1hbmQ6ICdtZXRhJyxcbiAgb3B0aW9uOiAnYWx0JyxcbiAgYWx0OiAnYWx0J1xufTtcblxudmFyIEFMTF9LRVlTID0gZXhwb3J0cy5BTExfS0VZUyA9IFN5bWJvbCgnQUxMX0tFWVMnKTtcblxudmFyIEFMTF9QUklOVEFCTEVfS0VZUyA9IGV4cG9ydHMuQUxMX1BSSU5UQUJMRV9LRVlTID0gU3ltYm9sKCdBTExfUFJJTlRBQkxFX0tFWVMnKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gS2V5cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9lczYvc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7XG4gICAgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiB3cmFwKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIF90eXBlb2YoJFN5bWJvbC5pdGVyYXRvcikgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICh0eXBlb2YgaXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGl0KSkgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfXJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9cmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkge1xuICAgICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICB9cmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH1yZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9cmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBfU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAkc2V0KHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID1cbi8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4naGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KSB7XG4gIHdrcyhlczZTeW1ib2xzW2orK10pO1xufWZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykge1xuICB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcbn0kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIF9mb3Ioa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKSA/IFN5bWJvbFJlZ2lzdHJ5W2tleV0gOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSB7XG4gICAgICBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICAgIH1cbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiB1c2VTZXR0ZXIoKSB7XG4gICAgc2V0dGVyID0gdHJ1ZTtcbiAgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiB1c2VTaW1wbGUoKSB7XG4gICAgc2V0dGVyID0gZmFsc2U7XG4gIH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgaWYgKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICB9cmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYgKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCRyZXBsYWNlcikgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aCA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG46IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIDc7XG4gICAgfSB9KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICRleHBvcnQodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7IC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7IC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7LyogZW1wdHkgKi99XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiAodHlwZW9mIGl0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpdCkpID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiA3O1xuICAgIH0gfSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4gIC8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkgLyogLi4uYXJncyAqL3tcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gc2V0TWV0YShpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICAgIHc6IHt9IC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gICAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIGZhc3RLZXkoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gKHR5cGVvZiBpdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaXQpKSA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAgIC8vIHJldHVybiBvYmplY3QgSURcbiAgfXJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gZ2V0V2VhayhpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9cmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiBvbkZyZWV6ZShpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBfU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgX1N5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPSBVU0VfU1lNQk9MICYmIF9TeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBfU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fd2tzLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciByZXN1bHQgPSBnZXRLZXlzKGl0KTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmIChnZXRTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KTtcbiAgICB2YXIgaXNFbnVtID0gcElFLmY7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKHN5bWJvbHMubGVuZ3RoID4gaSkge1xuICAgICAgaWYgKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKSByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfXJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0ta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykge1xuICAgIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICAgIH1cbiAgICB9cmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJy5zcGxpdCgnLCcpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHsvKiBlbXB0eSAqL307XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBfY3JlYXRlRGljdCA9IGZ1bmN0aW9uIGNyZWF0ZURpY3QoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIF9jcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkge1xuICAgIGRlbGV0ZSBfY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgfXJldHVybiBfY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IF9jcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIH1yZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yod2luZG93KSkgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiBnZXRXaW5kb3dOYW1lcyhpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsvKiBlbXB0eSAqL31cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxuXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciB0ZXN0ID0ge307XG50ZXN0W3JlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmICh0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKSB7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXJndW1lbnRzO1xufSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiB0cnlHZXQoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7LyogZW1wdHkgKi99XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICA6IEFSRyA/IGNvZihPKVxuICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2tleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxudmFyIF9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2tleXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLZXlzKGtleXNBcnJheSkge1xuICByZXR1cm4ga2V5c0FycmF5Lm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtleVNldCA9IHsga2V5OiBrZXkgfTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBrZXlTdHJpbmcgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IGtleVN0cmluZy5zcGxpdCgvXFxzP1xcK1xccz8vKTtcbiAgICAgIGtleVNldCA9IG1hdGNoZXMubGVuZ3RoID09PSAxID8geyBrZXk6IF9rZXlzMi5kZWZhdWx0W2tleVN0cmluZ10gfSA6IHtcbiAgICAgICAga2V5OiBfa2V5czIuZGVmYXVsdFttYXRjaGVzLnBvcCgpXSxcbiAgICAgICAgbW9kaWZpZXJzOiBtYXRjaGVzLm1hcChmdW5jdGlvbiAobW9kS2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF9rZXlzLm1vZGlmaWVyc1ttb2RLZXldO1xuICAgICAgICB9KS5zb3J0KClcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBrZXlTZXQ7XG4gIH0pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBwYXJzZUtleXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvcGFyc2Vfa2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdXVpZDtcbi8vIENvdW50ZXIgYmVpbmcgaW5jcmVtZW50ZWQuIEpTIGlzIHNpbmdsZS10aHJlYWRlZCwgc28gaXQnbGwgSnVzdCBXb3Jr4oSiLlxudmFyIF9fY291bnRlciA9IDE7XG5cbi8qKlxuICogUmV0dXJucyBhIHByb2Nlc3Mtd2lkZSB1bmlxdWUgaWRlbnRpZmllci5cbiAqL1xuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIFwidWlkLVwiICsgX19jb3VudGVyKys7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvdXVpZC5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMub25Vbm1vdW50ID0gZXhwb3J0cy5vbk1vdW50ID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5fb25DbGljayA9IF9vbkNsaWNrO1xuZXhwb3J0cy5fb25LZXlEb3duID0gX29uS2V5RG93bjtcbmV4cG9ydHMuX3Nob3VsZENvbnNpZGVyID0gX3Nob3VsZENvbnNpZGVyO1xuXG52YXIgX2RvbV9oZWxwZXJzID0gcmVxdWlyZSgnLi9saWIvZG9tX2hlbHBlcnMnKTtcblxudmFyIF9kb21faGVscGVyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb21faGVscGVycyk7XG5cbnZhciBfbGlzdGVuZXJzID0gcmVxdWlyZSgnLi9saWIvbGlzdGVuZXJzJyk7XG5cbnZhciBfbGlzdGVuZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpc3RlbmVycyk7XG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9cmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyoqXG4gKiBAbW9kdWxlIGV2ZW50SGFuZGxlcnNcbiAqXG4gKi9cblxuLyoqXG4gKiBwcml2YXRlXG4gKlxuICovXG5cbi8qKlxuICogX29uQ2xpY2tcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUgY2xpY2sgZXZlbnQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQudGFyZ2V0IFRoZSBET00gbm9kZSBmcm9tIHRoZSBjbGljayBldmVudFxuICovXG5mdW5jdGlvbiBfb25DbGljayhfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcblxuICBfc3RvcmUyLmRlZmF1bHQuYWN0aXZhdGUoW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShfc3RvcmUyLmRlZmF1bHQuZ2V0SW5zdGFuY2VzKCkpKS5yZWR1Y2UoX2RvbV9oZWxwZXJzMi5kZWZhdWx0LmZpbmRDb250YWluZXJOb2Rlcyh0YXJnZXQpLCBbXSkuc29ydChfZG9tX2hlbHBlcnMyLmRlZmF1bHQuc29ydEJ5RE9NUG9zaXRpb24pLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmluc3RhbmNlO1xuICB9KSk7XG59XG5cbi8qKlxuICogX29uS2V5RG93bjogVGhlIGtleWRvd24gZXZlbnQgY2FsbGJhY2tcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUga2V5ZG93biBldmVudCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC53aGljaCBUaGUga2V5IGNvZGUgKHdoaWNoKSByZWNlaXZlZCBmcm9tIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmZ1bmN0aW9uIF9vbktleURvd24oZXZlbnQpIHtcbiAgdmFyIGZvcmNlQ29uc2lkZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIGlmIChmb3JjZUNvbnNpZGVyIHx8IF9zaG91bGRDb25zaWRlcihldmVudCkpIHtcbiAgICB2YXIgX3JlZjIgPSBfc3RvcmUyLmRlZmF1bHQuZmluZEJpbmRpbmdGb3JFdmVudChldmVudCkgfHwge30sXG4gICAgICAgIGZuID0gX3JlZjIuZm4sXG4gICAgICAgIGluc3RhbmNlID0gX3JlZjIuaW5zdGFuY2U7XG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIGZuLmNhbGwoaW5zdGFuY2UsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogX3Nob3VsZENvbnNpZGVyOiBDb25kaXRpb25zIGZvciBwcm9jZWVkaW5nIHdpdGgga2V5IGV2ZW50IGhhbmRsaW5nXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIGtleWRvd24gZXZlbnQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQudGFyZ2V0IFRoZSBub2RlIG9yaWdpbiBvZiB0aGUgZXZlbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdG8gY29udGludWUgcHJvY2VzaW5nIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmZ1bmN0aW9uIF9zaG91bGRDb25zaWRlcihfcmVmMykge1xuICB2YXIgY3RybEtleSA9IF9yZWYzLmN0cmxLZXksXG4gICAgICB0YXJnZXQgPSBfcmVmMy50YXJnZXQ7XG5cbiAgcmV0dXJuIGN0cmxLZXkgfHwgIX5bJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUpICYmICghdGFyZ2V0LmdldEF0dHJpYnV0ZSB8fCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0ZXh0Ym94Jyk7XG59XG5cbi8qKlxuICogcHVibGljXG4gKlxuICovXG5cbi8qKlxuICogb25Nb3VudFxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKi9cbmZ1bmN0aW9uIG9uTW91bnQoaW5zdGFuY2UpIHtcbiAgX3N0b3JlMi5kZWZhdWx0LmFjdGl2YXRlKGluc3RhbmNlKTtcbiAgX2xpc3RlbmVyczIuZGVmYXVsdC5iaW5kS2V5cyhfb25LZXlEb3duKTtcbiAgX2xpc3RlbmVyczIuZGVmYXVsdC5iaW5kQ2xpY2tzKF9vbkNsaWNrKTtcbiAgX2RvbV9oZWxwZXJzMi5kZWZhdWx0LmJpbmRGb2N1c2FibGVzKGluc3RhbmNlLCBfc3RvcmUyLmRlZmF1bHQuYWN0aXZhdGUpO1xufVxuXG4vKipcbiAqIG9uVW5tb3VudFxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKi9cbmZ1bmN0aW9uIG9uVW5tb3VudChpbnN0YW5jZSkge1xuICBfc3RvcmUyLmRlZmF1bHQuZGVsZXRlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICBpZiAoX3N0b3JlMi5kZWZhdWx0LmlzRW1wdHkoKSkge1xuICAgIF9saXN0ZW5lcnMyLmRlZmF1bHQudW5iaW5kQ2xpY2tzKF9vbkNsaWNrKTtcbiAgICBfbGlzdGVuZXJzMi5kZWZhdWx0LnVuYmluZEtleXMoX29uS2V5RG93bik7XG4gIH1cbn1cblxuZXhwb3J0cy5vbk1vdW50ID0gb25Nb3VudDtcbmV4cG9ydHMub25Vbm1vdW50ID0gb25Vbm1vdW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZXZlbnRfaGFuZGxlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O1xufVxuXG52YXIgZm9jdXNhYmxlU2VsZWN0b3IgPSAnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgb2JqZWN0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdJztcblxuLyoqXG4gKiBiaW5kRm9jdXNhYmxlczogRmluZCBhbnkgZm9jdXNhYmxlIGNoaWxkIGVsZW1lbnRzIG9mIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgYW5kXG4gKiBhZGQgYW4gb25Gb2N1cyBoYW5kbGVyIHRvIGZvY3VzIG91ciBrZXlkb3duIGhhbmRsZXJzIG9uIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiB3aGVuIHVzZXIga2V5cyBhcHBsaWVzIGZvY3VzIHRvIHRoZSBlbGVtZW50LlxuICpcbiAqIE5PVEU6IE9uZSBsaW1pdGF0aW9uIG9mIHRoaXMgcmlnaHQgbm93IGlzIHRoYXQgaWYgeW91IHRhYiBvdXQgb2YgdGhlXG4gKiBjb21wb25lbnQsIF9mb2N1c2VkSW5zdGFuY2Ugd2lsbCBzdGlsbCBiZSBzZXQgdW50aWwgbmV4dCBjbGljayBvciBtb3VudCBvclxuICogY29udHJvbGxlZCBmb2N1cy5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IGluc3RhbmNlIFRoZSBrZXktYm91bmQgY29tcG9uZW50IGluc3RhbmNlXG4gKiBAcGFyYW0ge2NhbGxiYWNrfSBhY3RpdmF0ZU9uRm9jdXMgVGhlIGZuIHRvIGZpcmUgd2hlbiBlbGVtZW50IGlzIGZvY3VzZWRcbiAqL1xuLyoqXG4gKiBAbW9kdWxlIGRvbUhlbHBlcnNcbiAqXG4gKi9cbmZ1bmN0aW9uIGJpbmRGb2N1c2FibGVzKGluc3RhbmNlLCBhY3RpdmF0ZU9uRm9jdXMpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHZhciBmb2N1c2FibGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZVNlbGVjdG9yKTtcbiAgICAgIGlmIChmb2N1c2FibGVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgb25Gb2N1cyA9IGZ1bmN0aW9uIG9uRm9jdXMoZWxlbWVudCkge1xuICAgICAgICAgIHZhciBvbkZvY3VzUHJldiA9IGVsZW1lbnQub25mb2N1cztcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBhY3RpdmF0ZU9uRm9jdXMoaW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKG9uRm9jdXNQcmV2KSBvbkZvY3VzUHJldi5jYWxsKGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQub25mb2N1cyA9IG9uRm9jdXMoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGZpbmRDb250YWluZXJOb2RlczogQ2FsbGVkIGJ5IG91ciBjbGljayBoYW5kbGVyIHRvIGZpbmQgaW5zdGFuY2VzIHdpdGggbm9kZXNcbiAqIHRoYXQgYXJlIGVxdWFsIHRvIG9yIHRoYXQgY29udGFpbiB0aGUgY2xpY2sgdGFyZ2V0LiBBbnkgdGhhdCBwYXNzIHRoaXMgdGVzdFxuICogd2lsbCBiZSByZWNpcGllbnRzIG9mIHRoZSBuZXh0IGtleWRvd24gZXZlbnQuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGhlIGNsaWNrIGV2ZW50LnRhcmdldCBET00gZWxlbWVudFxuICogQHJldHVybiB7ZnVuY3Rpb259IFJlZHVjZXIgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZmluZENvbnRhaW5lck5vZGVzKHRhcmdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gKG1lbW8sIGluc3RhbmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICAgIGlmIChub2RlICYmIChub2RlID09PSB0YXJnZXQgfHwgbm9kZS5jb250YWlucyh0YXJnZXQpKSkge1xuICAgICAgICBtZW1vLnB1c2goeyBpbnN0YW5jZTogaW5zdGFuY2UsIG5vZGU6IG5vZGUgfSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBzb3J0QnlET01Qb3NpdGlvbjogQ2FsbGVkIGJ5IG91ciBjbGljayBoYW5kbGVyIHRvIHNvcnQgYSBsaXN0IG9mIGluc3RhbmNlc1xuICogYWNjb3JkaW5nIHRvIGxlYXN0IC0+IG1vc3QgbmVzdGVkLiBUaGlzIGlzIHNvIHRoYXQgaWYgbXVsdGlwbGUga2V5Ym91bmRcbiAqIGluc3RhbmNlcyBoYXZlIG5vZGVzIHRoYXQgYXJlIGFuY2VzdG9ycyBvZiB0aGUgY2xpY2sgdGFyZ2V0LCB0aGV5IHdpbGwgYmVcbiAqIHNvcnRlZCB0byBsZXQgdGhlIGluc3RhbmNlIGNsb3Nlc3QgdG8gdGhlIGNsaWNrIHRhcmdldCBnZXQgZmlyc3QgZGlicyBvbiB0aGVcbiAqIG5leHQga2V5IGRvd24gZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIHNvcnRCeURPTVBvc2l0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGEubm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihiLm5vZGUpID09PSAxMCA/IDEgOiAtMTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0geyBiaW5kRm9jdXNhYmxlczogYmluZEZvY3VzYWJsZXMsIGZpbmRDb250YWluZXJOb2RlczogZmluZENvbnRhaW5lck5vZGVzLCBzb3J0QnlET01Qb3NpdGlvbjogc29ydEJ5RE9NUG9zaXRpb24gfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9kb21faGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQG1vZHVsZSBMaXN0ZW5lcnNcbiAqXG4gKi9cblxuLy8gZmxhZyBmb3Igd2hldGhlciBjbGljayBsaXN0ZW5lciBoYXMgYmVlbiBib3VuZCB0byBkb2N1bWVudFxudmFyIF9jbGlja3NCb3VuZCA9IGZhbHNlO1xuXG4vLyBmbGFnIGZvciB3aGV0aGVyIGtleWRvd24gbGlzdGVuZXIgaGFzIGJlZW4gYm91bmQgdG8gZG9jdW1lbnRcbnZhciBfa2V5c0JvdW5kID0gZmFsc2U7XG5cbnZhciBMaXN0ZW5lcnMgPSB7XG4gIC8qKlxuICAgKiBfYmluZEtleXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIGJpbmRLZXlzOiBmdW5jdGlvbiBiaW5kS2V5cyhjYWxsYmFjaykge1xuICAgIGlmICghX2tleXNCb3VuZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNhbGxiYWNrKTtcbiAgICAgIF9rZXlzQm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogdW5iaW5kS2V5c1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKi9cbiAgdW5iaW5kS2V5czogZnVuY3Rpb24gdW5iaW5kS2V5cyhjYWxsYmFjaykge1xuICAgIGlmIChfa2V5c0JvdW5kKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2FsbGJhY2spO1xuICAgICAgX2tleXNCb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogYmluZENsaWNrc1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKi9cbiAgYmluZENsaWNrczogZnVuY3Rpb24gYmluZENsaWNrcyhjYWxsYmFjaykge1xuICAgIGlmICghX2NsaWNrc0JvdW5kKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrLCB0cnVlKTtcbiAgICAgIF9jbGlja3NCb3VuZCA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiB1bmJpbmRDbGlja3NcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIHVuYmluZENsaWNrczogZnVuY3Rpb24gdW5iaW5kQ2xpY2tzKGNhbGxiYWNrKSB7XG4gICAgaWYgKF9jbGlja3NCb3VuZCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgICBfY2xpY2tzQm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpc3RlbmVycztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9saXN0ZW5lcnMuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mMiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YyKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mMihvYmopO1xufTsgLyoqXG4gICAgKiBAbW9kdWxlIG1ldGhvZFdyYXBwZXJcbiAgICAqXG4gICAgKi9cblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG52YXIgX2V2ZW50X2hhbmRsZXJzID0gcmVxdWlyZSgnLi4vZXZlbnRfaGFuZGxlcnMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07XG59XG5cbi8qKlxuICogX2lzUmVhY3RLZXlEb3duXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIHBvc3NpYmx5IHN5bnRoZXRpYyBldmVudCBwYXNzZWQgYXMgYW4gYXJndW1lbnQgd2l0aFxuICogdGhlIG1ldGhvZCBpbnZvY2F0aW9uLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gX2lzUmVhY3RLZXlEb3duKGV2ZW50KSB7XG4gIHJldHVybiBldmVudCAmJiAodHlwZW9mIGV2ZW50ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihldmVudCkpID09PSAnb2JqZWN0JyAmJiBldmVudC5uYXRpdmVFdmVudCBpbnN0YW5jZW9mIHdpbmRvdy5LZXlib2FyZEV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJztcbn1cblxuLyoqXG4gKiBtZXRob2RXcmFwcGVyXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIEFsbCBhcmd1bWVudHMgbmVjZXNzYXJ5IGZvciB3cmFwcGluZyBtZXRob2RcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnRhcmdldCBUaGUgZGVjb3JhdGVkIGNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5kZXNjcmlwdG9yIE1ldGhvZCBkZXNjcmlwdG9yXG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzLmtleXMgVGhlIGFycmF5IG9mIGtleXMgYm91bmQgdG8gdGhlIGdpdmVuIG1ldGhvZFxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgbWV0aG9kIGRlc2NyaXB0b3JcbiAqL1xuZnVuY3Rpb24gbWV0aG9kV3JhcHBlcihfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldCxcbiAgICAgIGRlc2NyaXB0b3IgPSBfcmVmLmRlc2NyaXB0b3IsXG4gICAgICBrZXlzID0gX3JlZi5rZXlzO1xuXG4gIHZhciBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgLy8gaWYgd2UgaGF2ZW4ndCBhbHJlYWR5IGNyZWF0ZWQgYSBiaW5kaW5nIGZvciB0aGlzIGNsYXNzICh2aWEgYW5vdGhlclxuICAvLyBkZWNvcmF0ZWQgbWV0aG9kKSwgd3JhcCB0aGVzZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgaWYgKCFfc3RvcmUyLmRlZmF1bHQuZ2V0QmluZGluZyh0YXJnZXQpKSB7XG4gICAgdmFyIGNvbXBvbmVudERpZE1vdW50ID0gdGFyZ2V0LmNvbXBvbmVudERpZE1vdW50LFxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCA9IHRhcmdldC5jb21wb25lbnRXaWxsVW5tb3VudDtcblxuICAgIHRhcmdldC5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Nb3VudCkodGhpcyk7XG4gICAgICBpZiAoY29tcG9uZW50RGlkTW91bnQpIHJldHVybiBjb21wb25lbnREaWRNb3VudC5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0YXJnZXQuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uVW5tb3VudCkodGhpcyk7XG4gICAgICBpZiAoY29tcG9uZW50V2lsbFVubW91bnQpIHJldHVybiBjb21wb25lbnRXaWxsVW5tb3VudC5jYWxsKHRoaXMpO1xuICAgIH07XG4gIH1cblxuICAvLyBhZGQgdGhpcyBiaW5kaW5nIG9mIGtleXMgYW5kIG1ldGhvZCB0byB0aGUgdGFyZ2V0J3MgYmluZGluZ3NcbiAgX3N0b3JlMi5kZWZhdWx0LnNldEJpbmRpbmcoeyBrZXlzOiBrZXlzLCB0YXJnZXQ6IHRhcmdldCwgZm46IGZuIH0pO1xuXG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIG1heWJlRXZlbnQgPSBhcmdzWzBdO1xuXG4gICAgaWYgKF9pc1JlYWN0S2V5RG93bihtYXliZUV2ZW50KSkge1xuICAgICAgLy8gcHJveHkgbWV0aG9kIGluIG9yZGVyIHRvIHVzZSBAa2V5ZG93biBhcyBmaWx0ZXIgZm9yIGtleWRvd24gZXZlbnRzIGNvbWluZ1xuICAgICAgLy8gZnJvbSBhbiBhY3R1YWwgb25LZXlEb3duIGJpbmRpbmcgKGFzIGlkZW50aWZpZWQgYnkgcmVhY3QncyBhZGRpdGlvbiBvZlxuICAgICAgLy8gJ25hdGl2ZUV2ZW50JyArIHR5cGUgPT09ICdrZXlkb3duJylcbiAgICAgIGlmICghbWF5YmVFdmVudC5jdHJsS2V5KSB7XG4gICAgICAgIC8vIHdlIGFscmVhZHkgd2hpdGVsaXN0IHNob3J0Y3V0cyB3aXRoIGN0cmwgbW9kaWZpZXJzIHNvIGlmIHdlIHdlcmUgdG9cbiAgICAgICAgLy8gZmlyZSBpdCBhZ2FpbiBoZXJlIHRoZSBtZXRob2Qgd291bGQgdHJpZ2dlciB0d2ljZS4gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9nbG9ydGhvL3JlYWN0LWtleWRvd24vaXNzdWVzLzM4XG4gICAgICAgIHJldHVybiAoMCwgX2V2ZW50X2hhbmRsZXJzLl9vbktleURvd24pKG1heWJlRXZlbnQsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIW1heWJlRXZlbnQgfHwgIShtYXliZUV2ZW50IGluc3RhbmNlb2Ygd2luZG93LktleWJvYXJkRXZlbnQpIHx8IG1heWJlRXZlbnQudHlwZSAhPT0gJ2tleWRvd24nKSB7XG4gICAgICAvLyBpZiBvdXIgZmlyc3QgYXJndW1lbnQgaXMgYSBrZXlkb3duIGV2ZW50IGl0IGlzIGJlaW5nIGhhbmRsZWQgYnkgb3VyXG4gICAgICAvLyBiaW5kaW5nIHN5c3RlbS4gaWYgaXQncyBhbnl0aGluZyBlbHNlLCBqdXN0IHBhc3MgdGhyb3VnaC5cbiAgICAgIHJldHVybiBmbi5jYWxsLmFwcGx5KGZuLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG1ldGhvZFdyYXBwZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4uL2xpYi9tYXRjaF9rZXlzJyk7XG5cbnZhciBfbWF0Y2hfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRjaF9rZXlzKTtcblxudmFyIF9wYXJzZV9rZXlzID0gcmVxdWlyZSgnLi4vbGliL3BhcnNlX2tleXMnKTtcblxudmFyIF9wYXJzZV9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlX2tleXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTtcbn1cblxuLyoqXG4gKiBtZXRob2RXcmFwcGVyU2NvcGVkXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIEFsbCBhcmdzIG5lY2Vzc2FyeSBmb3IgZGVjb3JhdGluZyB0aGUgbWV0aG9kXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy50YXJnZXQgVGhlIGRlY29yYXRlZCBtZXRob2QncyBjbGFzcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLmRlc2NyaXB0b3IgVGhlIG1ldGhvZCdzIGRlc2NyaXB0b3Igb2JqZWN0XG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzLmtleXMgVGhlIGtleSBjb2RlcyBib3VuZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZFxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgbWV0aG9kJ3MgZGVzY3JpcHRvciBvYmplY3RcbiAqL1xuLyoqXG4gKiBAbW9kdWxlIG1ldGhvZFdyYXBwZXJTY29wZWRcbiAqXG4gKi9cbmZ1bmN0aW9uIG1ldGhvZFdyYXBwZXJTY29wZWQoX3JlZikge1xuICB2YXIgdGFyZ2V0ID0gX3JlZi50YXJnZXQsXG4gICAgICBkZXNjcmlwdG9yID0gX3JlZi5kZXNjcmlwdG9yLFxuICAgICAga2V5cyA9IF9yZWYua2V5cztcbiAgdmFyIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSB0YXJnZXQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcztcblxuICB2YXIgZm4gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBpZiAoIWtleXMpIHtcbiAgICBjb25zb2xlLndhcm4oZm4gKyAnOiBrZXlkb3duU2NvcGVkIHJlcXVpcmVzIG9uZSBvciBtb3JlIGtleXMnKTtcbiAgfSBlbHNlIHtcblxuICAgIC8qKlxuICAgICAqIF9zaG91bGRUcmlnZ2VyXG4gICAgICpcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGhpc1Byb3BzIEV4c3RpbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGhpc1Byb3BzLmtleWRvd24gVGhlIG5hbWVzcGFjZWQgc3RhdGUgZnJvbSB0aGUgaGlnaGVyLW9yZGVyXG4gICAgICogY29tcG9uZW50IChjbGFzc19kZWNvcmF0b3IpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcyBUaGUgaW5jb21pbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzLmtleWRvd24gVGhlIG5hbWVzY2FwZWQgc3RhdGUgZnJvbSB0aGUgaGlnaGVyLW9yZGVyXG4gICAgICogY29tcG9uZW50IChjbGFzc19kZWNvcmF0b3IpXG4gICAgICogQHBhcmFtIHthcnJheX0ga2V5cyBUaGUga2V5cyBib3VuZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgYWxsIHRlc3RzIGhhdmUgcGFzc2VkXG4gICAgICovXG4gICAgdmFyIF9zaG91bGRUcmlnZ2VyID0gZnVuY3Rpb24gX3Nob3VsZFRyaWdnZXIoa2V5ZG93blRoaXMsIGtleWRvd25OZXh0KSB7XG4gICAgICBpZiAoIShrZXlkb3duTmV4dCAmJiBrZXlkb3duTmV4dC5ldmVudCAmJiAha2V5ZG93blRoaXMuZXZlbnQpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBrZXlTZXRzLnNvbWUoZnVuY3Rpb24gKGtleVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9tYXRjaF9rZXlzMi5kZWZhdWx0KSh7IGtleVNldDoga2V5U2V0LCBldmVudDoga2V5ZG93bk5leHQuZXZlbnQgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gd3JhcCB0aGUgY29tcG9uZW50J3MgbGlmZWN5Y2xlIG1ldGhvZCB0byBpbnRlcmNlcHQga2V5IGNvZGVzIGNvbWluZyBkb3duXG4gICAgLy8gZnJvbSB0aGUgd3JhcHBlZC9zY29wZWQgY29tcG9uZW50IHVwIHRoZSB2aWV3IGhpZXJhcmNoeS4gaWYgbmV3IGtleWRvd25cbiAgICAvLyBldmVudCBoYXMgYXJyaXZlZCBhbmQgdGhlIGtleSBjb2RlcyBtYXRjaCB3aGF0IHdhcyBzcGVjaWZpZWQgaW4gdGhlXG4gICAgLy8gZGVjb3JhdG9yLCBjYWxsIHRoZSB3cmFwcGVkIG1ldGhvZC5cblxuXG4gICAgdmFyIGtleVNldHMgPSAoMCwgX3BhcnNlX2tleXMyLmRlZmF1bHQpKGtleXMpO3RhcmdldC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgdmFyIGtleWRvd25OZXh0ID0gbmV4dFByb3BzLmtleWRvd247XG4gICAgICB2YXIga2V5ZG93blRoaXMgPSB0aGlzLnByb3BzLmtleWRvd247XG5cbiAgICAgIGlmIChfc2hvdWxkVHJpZ2dlcihrZXlkb3duVGhpcywga2V5ZG93bk5leHQpKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGtleWRvd25OZXh0LmV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykgcmV0dXJuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuY2FsbC5hcHBseShjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLCBbdGhpcywgbmV4dFByb3BzXS5jb25jYXQoYXJncykpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gbWV0aG9kV3JhcHBlclNjb3BlZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvcl9zY29wZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDYsIDIyLjEuMi4xXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZnJvbVxuXG5pZiAoIUFycmF5LmZyb20pIHtcbiAgQXJyYXkuZnJvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciBpc0NhbGxhYmxlID0gZnVuY3Rpb24gaXNDYWxsYWJsZShmbikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9O1xuICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gKG51bWJlciA+IDAgPyAxIDogLTEpICogTWF0aC5mbG9vcihNYXRoLmFicyhudW1iZXIpKTtcbiAgICB9O1xuICAgIHZhciBtYXhTYWZlSW50ZWdlciA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gICAgdmFyIHRvTGVuZ3RoID0gZnVuY3Rpb24gdG9MZW5ndGgodmFsdWUpIHtcbiAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcbiAgICB9O1xuXG4gICAgLy8gVGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiB0aGUgZnJvbSBtZXRob2QgaXMgMS5cbiAgICByZXR1cm4gZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyosIG1hcEZuLCB0aGlzQXJnICovKSB7XG4gICAgICAvLyAxLiBMZXQgQyBiZSB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgIHZhciBDID0gdGhpcztcblxuICAgICAgLy8gMi4gTGV0IGl0ZW1zIGJlIFRvT2JqZWN0KGFycmF5TGlrZSkuXG4gICAgICB2YXIgaXRlbXMgPSBPYmplY3QoYXJyYXlMaWtlKTtcblxuICAgICAgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxuICAgICAgaWYgKGFycmF5TGlrZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBtYXBmbiBpcyB1bmRlZmluZWQsIHRoZW4gbGV0IG1hcHBpbmcgYmUgZmFsc2UuXG4gICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xuICAgICAgdmFyIFQ7XG4gICAgICBpZiAodHlwZW9mIG1hcEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyA1LiBlbHNlXG4gICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKCFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb206IHdoZW4gcHJvdmlkZWQsIHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA1LiBiLiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgIFQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxuICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxuICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgIC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cbiAgICAgIC8vIDEzLiBhLiBMZXQgQSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kIFxuICAgICAgLy8gb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxuICAgICAgLy8gMTQuIGEuIEVsc2UsIExldCBBIGJlIEFycmF5Q3JlYXRlKGxlbikuXG4gICAgICB2YXIgQSA9IGlzQ2FsbGFibGUoQykgPyBPYmplY3QobmV3IEMobGVuKSkgOiBuZXcgQXJyYXkobGVuKTtcblxuICAgICAgLy8gMTYuIExldCBrIGJlIDAuXG4gICAgICB2YXIgayA9IDA7XG4gICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxuICAgICAgdmFyIGtWYWx1ZTtcbiAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xuICAgICAgICBpZiAobWFwRm4pIHtcbiAgICAgICAgICBBW2tdID0gdHlwZW9mIFQgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oa1ZhbHVlLCBrKSA6IG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW2tdID0ga1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGsgKz0gMTtcbiAgICAgIH1cbiAgICAgIC8vIDE4LiBMZXQgcHV0U3RhdHVzIGJlIFB1dChBLCBcImxlbmd0aFwiLCBsZW4sIHRydWUpLlxuICAgICAgQS5sZW5ndGggPSBsZW47XG4gICAgICAvLyAyMC4gUmV0dXJuIEEuXG4gICAgICByZXR1cm4gQTtcbiAgICB9O1xuICB9KCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTs7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ2FkZCc7XG5cbnZhciBCdXR0b25SZWdpc3RlckFkZCA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhCdXR0b25SZWdpc3RlckFkZCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyQWRkKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdXR0b25SZWdpc3RlckFkZCk7XG5cbiAgICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChCdXR0b25SZWdpc3RlckFkZC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvblJlZ2lzdGVyQWRkKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCdXR0b25SZWdpc3RlckFkZCwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygnYWRkJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgQnV0dG9uLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBZGQnLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5BZGQnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLmJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmhhbmRsZUNsaWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb25zW0lDT05dIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvblJlZ2lzdGVyQWRkO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG4vKlxyXG5CdXR0b25SZWdpc3RlckFkZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbn1cclxuKi9cblxuQnV0dG9uUmVnaXN0ZXJBZGQuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyQWRkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeFxuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJ1dHRvbjoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICcvaW1hZ2VzL2ljb25zL2FkZC5wbmcnLFxuICAgICAgICBlZGl0OiAnL2ltYWdlcy9pY29ucy9lZGl0LnBuZycsXG4gICAgICAgIGRlbGV0ZTogJy9pbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJy9pbWFnZXMvaWNvbnMvZmlsdGVyLnBuZycsXG4gICAgICAgIHByaW50OiAnL2ltYWdlcy9pY29ucy9wcmludC5wbmcnLFxuICAgICAgICBvazogJy9pbWFnZXMvaWNvbnMvb2sucG5nJyxcbiAgICAgICAgY2FuY2VsOiAnL2ltYWdlcy9pY29ucy9jYW5jZWwucG5nJyxcbiAgICAgICAgc2F2ZTogJy9pbWFnZXMvaWNvbnMvc2F2ZS5wbmcnLFxuICAgICAgICBleGVjdXRlOiAnL2ltYWdlcy9pY29ucy9leGVjdXRlLnBuZycsXG4gICAgICAgIHN0YXJ0OiAnL2ltYWdlcy9pY29ucy9zdGFydC5wbmcnLFxuICAgICAgICBsb2dpbjogJy9pbWFnZXMvaWNvbnMvbG9naW4ucG5nJyxcbiAgICAgICAgYWNjb3VudDogJy9pbWFnZXMvaWNvbnMvYWNjb3VudC5wbmcnLFxuICAgICAgICByZWt2OiAnL2ltYWdlcy9pY29ucy9yZWt2LnBuZydcblxuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpOztcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKTtcblxudmFyIEJ1dHRvbiA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhCdXR0b24sIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b24ocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvbik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJ1dHRvbi5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvbikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5oYW5kbGVDbGljayA9IF90aGlzLmhhbmRsZUNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBfdGhpcy5wcm9wcy5kaXNhYmxlZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvbiwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICAgIHZhciBwcm9wU3R5bGUgPSAnc3R5bGUnIGluIHRoaXMucHJvcHMgPyB0aGlzLnByb3BzLnN0eWxlIDoge30sXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuYnV0dG9uLCB7IGRpc3BsYXk6IHRoaXMucHJvcHMuc2hvdyA/ICdpbmxpbmUnIDogJ25vbmUnIH0sIHByb3BTdHlsZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGljayB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b247XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG47XG5cbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuXG5CdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ2VkaXQnO1xuXG52YXIgQnV0dG9uUmVnaXN0ZXJFZGl0ID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvblJlZ2lzdGVyRWRpdCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRWRpdChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uUmVnaXN0ZXJFZGl0KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJFZGl0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQnV0dG9uUmVnaXN0ZXJFZGl0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IF90aGlzLnByb3BzLmRpc2FibGVkXG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZUNsaWNrID0gX3RoaXMuaGFuZGxlQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnV0dG9uUmVnaXN0ZXJFZGl0LCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdlZGl0Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J0bkVkaXQnLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuaGFuZGxlQ2xpY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl0gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQnV0dG9uUmVnaXN0ZXJFZGl0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG4vKlxyXG5CdXR0b25SZWdpc3RlckVkaXQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbFxyXG59XHJcbiovXG5cbkJ1dHRvblJlZ2lzdGVyRWRpdC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3c6IHRydWVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJFZGl0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWVkaXQvYnV0dG9uLXJlZ2lzdGVyLWVkaXQuanN4XG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXG4gICAgSUNPTiA9ICdkZWxldGUnO1xuXG52YXIgQnV0dG9uUmVnaXN0ZXJEZWxldGUgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQnV0dG9uUmVnaXN0ZXJEZWxldGUsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckRlbGV0ZShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uUmVnaXN0ZXJEZWxldGUpO1xuXG4gICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJEZWxldGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25SZWdpc3RlckRlbGV0ZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnV0dG9uUmVnaXN0ZXJEZWxldGUsIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soJ2RlbGV0ZScpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnRGVsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnYnRuRGVsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmhhbmRsZUNsaWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb25zW0lDT05dIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvblJlZ2lzdGVyRGVsZXRlO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG4vKlxyXG5CdXR0b25SZWdpc3RlckRlbGV0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbn1cclxuKi9cblxuQnV0dG9uUmVnaXN0ZXJEZWxldGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRGVsZXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS9idXR0b24tcmVnaXN0ZXItZGVsZXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIvLyDQstC40LTQttC10YIsINC+0LHRitC10LTQuNC90Y/RjtGJ0LjQuSDRgdC10LvQtdC60YIg0Lgg0YLQtdC60YHRgi4g0LIg0YLQtdC60YHRgtC1INC+0YLRgNCw0LbQsNGO0YLQvNGPINC00LDQvdC90YvQtSwg0YHQstGP0LfQsNC90L3Ri9C1INGBINGB0LXQu9C10LrRgtC+0Lxcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xudmFyIFNlbGVjdCA9IHJlcXVpcmUoJy4uL3NlbGVjdC9zZWxlY3QuanN4Jyk7XG52YXIgVGV4dCA9IHJlcXVpcmUoJy4uL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4Jyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFNlbGVjdFRleHRXaWRnZXQgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoU2VsZWN0VGV4dFdpZGdldCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gU2VsZWN0VGV4dFdpZGdldChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2VsZWN0VGV4dFdpZGdldCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFNlbGVjdFRleHRXaWRnZXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTZWxlY3RUZXh0V2lkZ2V0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLCAvLyDQv9C+0LnQtNC10YIg0LIg0YLQtdC60YHRgtC+0LLRg9GOINC+0LHQu9Cw0YHRgtGMXG4gICAgICAgICAgICBsaWJEYXRhOiBbXVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVTZWxlY3RPbkNoYW5nZSA9IF90aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFNlbGVjdFRleHRXaWRnZXQsIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZVNlbGVjdE9uQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdE9uQ2hhbmdlKGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCDRgdC+0LHRi9GC0LjQtSDQuCDQv9C+0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubGliRGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxnID0gdGhpcy5nZXREZXNjcmlwdGlvbkJ5U2VsZWN0VmFsdWUodGhpcy5zdGF0ZS5saWJEYXRhKSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUsIGRlc2NyaXB0aW9uOiBzZWxnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INCx0LjQsdC70LjQvtGC0LXQui5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vINCx0YPQtNC10Lwg0L7RgtGB0LvQtdC20LjQstCw0YLRjCDQvNC+0LzQtdC90YIg0LrQvtCz0LTQsCDRgdC/0YDQsNCy0L7Rh9C90LjQuiDQsdGD0LTQtdGCINC30LDQs9GA0YPQttC10L1cbiAgICAgICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciB2YXN0dXMgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3VmFsdWUuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGxpYiA9IGRhdGFbMF0uZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZyA9IGRhdGFbMF0uZGF0YS5sZW5ndGggPyBzZWxmLmdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZShsaWIpLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgbGliRGF0YTogbGliLCBkZXNjcmlwdGlvbjogc2VsZyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZXNjcmlwdGlvbkJ5U2VsZWN0VmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlKGxpYkRhdGEpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQtSDQvtC/0LjRgdCw0L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LjQvCDQtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNC1XG4gICAgICAgICAgICB2YXIgbGliUm93ID0gbGliRGF0YS5maWx0ZXIoZnVuY3Rpb24gKGxpYikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGxpYi5pZCA9PSBfdGhpczIucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzZWxnID0gJycsXG4gICAgICAgICAgICAgICAgc2VsZ09iamVjdCA9IGxpYlJvdy5sZW5ndGggPyBsaWJSb3dbMF0uZGV0YWlscyA6ICcnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzZWxnT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGdPYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINC40L3RgtC10YDQtdGB0YPRjtGCINGC0L7Qu9GM0LrQviBcItGB0L7QsdGB0YLQstC10L3QvdGL0LVcIiDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXG4gICAgICAgICAgICAgICAgICAgIHNlbGcgPSBzZWxnICsgcHJvcGVydHkgKyAnOicgKyBzZWxnT2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnc2VsZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5wcm9wcy5saWJzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHJlZjogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbXV1ZCcsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRG9rUHJvcCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBTZWxlY3RUZXh0V2lkZ2V0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuU2VsZWN0VGV4dFdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxpYnM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuU2VsZWN0VGV4dFdpZGdldC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgIHRpdGxlOiAnJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RUZXh0V2lkZ2V0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2Nwcm9wL2RvY3Byb3AuanN4XG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlbGF0ZWREb2N1bWVudHMgPSBmdW5jdGlvbiByZWxhdGVkRG9jdW1lbnRzKHNlbGYpIHtcbiAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxuICAgIHZhciByZWxhdGVkRG9jdW1lbnRzID0gc2VsZi5zdGF0ZS5yZWxhdGlvbnM7XG4gICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICByZWxhdGVkRG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgICAgaWYgKGRvYy5pZCkge1xuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgdmFyIGlzRXhpc3RzID0gc2VsZi5wYWdlcy5maW5kKGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0cykge1xuICAgICAgICAgICAgICAgICAgICAvLyDQsiDQvNCw0YHRgdC40LLQtSDQvdC10YIsINC00L7QsdCw0LLQuNC8INGB0YHRi9C70LrRgyDQvdCwINC00L7QutGD0LzQtdC90YJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWdlcy5wdXNoKHsgZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVsYXRlZERvY3VtZW50cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4XG4vLyBtb2R1bGUgaWQgPSAxMDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi90b29sYmFyLWNvbnRhaW5lci1zdHlsZXMnKSxcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBUb29sQmFyQ29udGFpbmVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoVG9vbEJhckNvbnRhaW5lciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBUb29sQmFyQ29udGFpbmVyKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUb29sQmFyQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFRvb2xCYXJDb250YWluZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihUb29sQmFyQ29udGFpbmVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUb29sQmFyQ29udGFpbmVyLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRvb2xCYXJDb250YWluZXJTdHlsZSwgc3R5bGVzW3RoaXMucHJvcHMucG9zaXRpb25dKTtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgaWQ6ICd0b29sQmFyQ29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAndG9vbEJhckNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZSB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVG9vbEJhckNvbnRhaW5lcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuVG9vbEJhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cblRvb2xCYXJDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIHBvc2l0aW9uOiAncmlnaHQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xCYXJDb250YWluZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRvb2xCYXJDb250YWluZXJTdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snXG4gICAgfSxcblxuICAgIHJpZ2h0OiB7XG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnXG4gICAgfSxcblxuICAgIGxlZnQ6IHtcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0J1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeCcpLFxuICAgIEJ0blN0YXJ0ID0gcmVxdWlyZSgnLi8uLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0YXJ0L2J1dHRvbi1yZWdpc3Rlci1zdGFydC5qc3gnKSxcbiAgICBCdG5Mb2dpbiA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1sb2dpbi9idXR0b24tbG9naW4uanN4JyksXG4gICAgQnRuUmVrdiA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWt2L2J1dHRvbi1yZWt2LmpzeCcpLFxuICAgIEJ0bkFjY291bnQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tYWNjb3VudC9idXR0b24tYWNjb3VudC5qc3gnKTtcblxudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tZW51LXRvb2xiYXIuc3R5bGVzJyk7XG5cbnZhciBNZW51VG9vbEJhciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhNZW51VG9vbEJhciwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gTWVudVRvb2xCYXIocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1lbnVUb29sQmFyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTWVudVRvb2xCYXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNZW51VG9vbEJhcikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvZ2VkSW46IHByb3BzLnVzZXJEYXRhID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMuYnRuU3RhcnRDbGljayA9IF90aGlzLmJ0blN0YXJ0Q2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0bkxvZ2luQ2xpY2sgPSBfdGhpcy5idG5Mb2dpbkNsaWNrLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTWVudVRvb2xCYXIsIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cbiAgICAgICAgICAgIHZhciBpc0VkaXRNb2RlID0gdGhpcy5wcm9wcy5lZGl0ZWQsXG4gICAgICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5TdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnBhcmFtc1snYnRuU3RhcnQnXS5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuTG9naW46IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5BY2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUubG9nZWRJbixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5SZWt2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUubG9nZWRJbixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZVsnY29udGFpbmVyJ10gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBUb29sYmFyQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdtZW51VG9vbGJhckNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blN0YXJ0LCB7IHJlZjogJ2J0blN0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0blN0YXJ0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuU3RhcnQnXS5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0b29sYmFyUGFyYW1zWydidG5TdGFydCddLmRpc2FibGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5SZWt2LCB7IHJlZjogJ2J0blJla3YnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnVzZXJEYXRhID8gdGhpcy5wcm9wcy51c2VyRGF0YS5hc3V0dXMgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0blJla3ZDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0b29sYmFyUGFyYW1zWydidG5SZWt2J10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuUmVrdiddLmRpc2FibGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BY2NvdW50LCB7IHJlZjogJ2J0bkFjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnVzZXJEYXRhID8gdGhpcy5wcm9wcy51c2VyRGF0YS51c2VyTmFtZSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuQWNjb3VudENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFjY291bnQnXS5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0b29sYmFyUGFyYW1zWydidG5BY2NvdW50J10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkxvZ2luLCB7IHJlZjogJ2J0bkxvZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5sb2dlZEluID8gJ0xvZ091dCcgOiAnTG9nSW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuTG9naW5DbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0b29sYmFyUGFyYW1zWydidG5Mb2dpbiddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRvb2xiYXJQYXJhbXNbJ2J0bkxvZ2luJ10uZGlzYWJsZWQgfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2J0blN0YXJ0Q2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuU3RhcnRDbGljaygpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU3RhcnRcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmJ0blN0YXJ0Q2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmJ0blN0YXJ0Q2xpY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvZG9jdW1lbnRzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuTG9naW5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5Mb2dpbkNsaWNrKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5sb2dlZEluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZ2VkSW46IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ291dCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuQWNjb3VudENsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ0bkFjY291bnRDbGljaygpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidG5BY2NvdW50Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2J0blJla3ZDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5SZWt2Q2xpY2soKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy9jaGFuZ2VEZXBhcnRtZW50JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBNZW51VG9vbEJhcjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbk1lbnVUb29sQmFyLnByb3BUeXBlcyA9IHtcbiAgICBlZGl0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHBhcmFtczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGxvZ2VkSW46IFByb3BUeXBlcy5ib29sXG59O1xuXG5NZW51VG9vbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZWRpdGVkOiBmYWxzZSxcbiAgICBsb2dlZEluOiBmYWxzZSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgYnRuU3RhcnQ6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudVRvb2xCYXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21lbnUtdG9vbGJhci9tZW51LXRvb2xiYXIuanN4XG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXG4gICAgSUNPTiA9ICdzdGFydCc7XG5cbnZhciBCdXR0b25SZWdpc3RlclN0YXJ0ID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvblJlZ2lzdGVyU3RhcnQsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlclN0YXJ0KHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdXR0b25SZWdpc3RlclN0YXJ0KTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJ1dHRvblJlZ2lzdGVyU3RhcnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25SZWdpc3RlclN0YXJ0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCdXR0b25SZWdpc3RlclN0YXJ0LCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdzdGFydCcpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnYnRuU3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLmJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmhhbmRsZUNsaWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb25zW0lDT05dIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvblJlZ2lzdGVyU3RhcnQ7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG47XG4vKlxyXG5CdXR0b25SZWdpc3RlclN0YXJ0LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG4qL1xuXG5CdXR0b25SZWdpc3RlclN0YXJ0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvdzogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlclN0YXJ0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0YXJ0L2J1dHRvbi1yZWdpc3Rlci1zdGFydC5qc3hcbi8vIG1vZHVsZSBpZCA9IDExMlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG47XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ2xvZ2luJztcblxudmFyIEJ1dHRvbkxvZ2luID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvbkxvZ2luLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICAvLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXG4gICAgZnVuY3Rpb24gQnV0dG9uTG9naW4ocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvbkxvZ2luKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uTG9naW4uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25Mb2dpbikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSB8fCAnTG9nSW4nXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCdXR0b25Mb2dpbiwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBuZXh0UHJvcHMudmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soJ2xvZ2luJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgQnV0dG9uLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5Mb2dpbicsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZXMuYnV0dG9uLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuaGFuZGxlQ2xpY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl0gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQnV0dG9uTG9naW47XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG47XG5cbkJ1dHRvbkxvZ2luLnByb3BUeXBlcyA9IHtcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5CdXR0b25Mb2dpbi5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3c6IHRydWUsXG4gICAgdmFsdWU6ICdMb2dPdXQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbkxvZ2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLWxvZ2luL2J1dHRvbi1sb2dpbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG47XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ3Jla3YnO1xuXG52YXIgQnV0dG9uUmVrdiA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhCdXR0b25SZWt2LCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICAvLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVrdihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uUmVrdik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJ1dHRvblJla3YuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25SZWt2KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCdXR0b25SZWt2LCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygncmVrdicpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc3RhdGUudmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5SZWt2JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5oYW5kbGVDbGljayhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2UnLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b25SZWt2O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG5CdXR0b25SZWt2LnByb3BUeXBlcyA9IHtcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5CdXR0b25SZWt2LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvdzogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVrdjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWt2L2J1dHRvbi1yZWt2LmpzeFxuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbjtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxuICAgIElDT04gPSAnYWNjb3VudCc7XG5cbnZhciBCdXR0b25BY2NvdW50ID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvbkFjY291bnQsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b25BY2NvdW50KHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdXR0b25BY2NvdW50KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uQWNjb3VudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvbkFjY291bnQpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvbkFjY291bnQsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogbmV4dFByb3BzLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdhY2NvdW50Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgQnV0dG9uLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5BY2NvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5oYW5kbGVDbGljayhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2UnLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b25BY2NvdW50O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG5CdXR0b25BY2NvdW50LnByb3BUeXBlcyA9IHtcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5CdXR0b25BY2NvdW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvdzogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uQWNjb3VudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1hY2NvdW50L2J1dHRvbi1hY2NvdW50LmpzeFxuLy8gbW9kdWxlIGlkID0gMTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBtYXJnaW46ICcxMHB4IDAnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbWVudS10b29sYmFyL21lbnUtdG9vbGJhci5zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBUb29sYmFyQ29udGFpbmVyID0gcmVxdWlyZSgnLi8uLi90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcbiAgICBCdG5BZGQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4JyksXG4gICAgQnRuRWRpdCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxuICAgIEJ0blNhdmUgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3gnKSxcbiAgICBCdG5DYW5jZWwgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItY2FuY2VsL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwuanN4JyksXG4gICAgQnRuUHJpbnQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxuICAgIFRhc2tXaWRnZXQgPSByZXF1aXJlKCcuLy4uL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCcpO1xuXG52YXIgRG9jVG9vbEJhciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhEb2NUb29sQmFyLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBEb2NUb29sQmFyKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEb2NUb29sQmFyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRG9jVG9vbEJhci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERvY1Rvb2xCYXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuYnRuRWRpdENsaWNrID0gX3RoaXMuYnRuRWRpdENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5BZGRDbGljayA9IF90aGlzLmJ0bkFkZENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5TYXZlQ2xpY2sgPSBfdGhpcy5idG5TYXZlQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0bkNhbmNlbENsaWNrID0gX3RoaXMuYnRuQ2FuY2VsQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0blByaW50Q2xpY2sgPSBfdGhpcy5idG5QcmludENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVCdXR0b25UYXNrID0gX3RoaXMuaGFuZGxlQnV0dG9uVGFzay5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGFuZGxlU2VsZWN0VGFzayA9IF90aGlzLmhhbmRsZVNlbGVjdFRhc2suYmluZChfdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhEb2NUb29sQmFyLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIGlzRWRpdE1vZGUgPSB0aGlzLnByb3BzLmVkaXRlZCxcbiAgICAgICAgICAgICAgICBpc0RvY0Rpc2FibGVkID0gdGhpcy5wcm9wcy5kb2NTdGF0dXMgPT0gMiA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkb2NJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEuaWQgfHwgMCxcbiAgICAgICAgICAgICAgICB0b29sYmFyUGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdE1vZGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0bkVkaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0RvY0Rpc2FibGVkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5QcmludDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuU2F2ZToge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0bkNhbmNlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlICYmIGRvY0lkICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBUb29sYmFyQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHsgcmVmOiAndG9vbGJhckNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BZGQsIHsgcmVmOiAnYnRuQWRkJywgb25DbGljazogdGhpcy5idG5BZGRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0b29sYmFyUGFyYW1zWydidG5BZGQnXS5kaXNhYmxlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5FZGl0LCB7IHJlZjogJ2J0bkVkaXQnLCBvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLmRpc2FibGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blNhdmUsIHsgcmVmOiAnYnRuU2F2ZScsIG9uQ2xpY2s6IHRoaXMuYnRuU2F2ZUNsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5TYXZlJ10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0b29sYmFyUGFyYW1zWydidG5TYXZlJ10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuQ2FuY2VsLCB7IHJlZjogJ2J0bkNhbmNlbCcsIG9uQ2xpY2s6IHRoaXMuYnRuQ2FuY2VsQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkNhbmNlbCddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQ2FuY2VsJ10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuUHJpbnQsIHsgcmVmOiAnYnRuUHJpbnQnLCBvbkNsaWNrOiB0aGlzLmJ0blByaW50Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0b29sYmFyUGFyYW1zWydidG5QcmludCddLmRpc2FibGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmJwbS5sZW5ndGggPyBSZWFjdC5jcmVhdGVFbGVtZW50KFRhc2tXaWRnZXQsIHsgcmVmOiAndGFza1dpZGdldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrTGlzdDogdGhpcy5wcm9wcy5icG0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RUYXNrOiB0aGlzLmhhbmRsZVNlbGVjdFRhc2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVCdXR0b25UYXNrOiB0aGlzLmhhbmRsZUJ1dHRvblRhc2tcbiAgICAgICAgICAgICAgICAgICAgfSkgOiBudWxsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuQWRkQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuQWRkQ2xpY2soKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnRuQWRkQ2xpY2sgY2FsbGVkJyk7XG4gICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IEFkZFxuICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMubmFtZSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIDApO1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRWRpdENsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ0bkVkaXRDbGljaygpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggRWRpdFxuICAgICAgICAgICAgLy8g0L/QtdGA0LXQstC+0LTQuNC8INC00L7QutGD0LzQtdC90YIg0LIg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDRgdC+0YXRgNCw0L3QtdC9ID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9wcy5kb2NTdGF0dXMgfHwgdGhpcy5wcm9wcy5kb2NTdGF0dXMgPCAyKSB7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2J0blByaW50Q2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuUHJpbnRDbGljaygpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmludCBjYWxsZWQnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuU2F2ZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ0blNhdmVDbGljaygpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU2F2ZVxuICAgICAgICAgICAgLy8g0LLQsNC70LjQtNCw0YLQvtGAXG5cbiAgICAgICAgICAgIHZhciB2YWxpZGF0aW9uTWVzc2FnZSA9IHRoaXMucHJvcHMudmFsaWRhdG9yID8gdGhpcy5wcm9wcy52YWxpZGF0b3IoKSA6ICd2YWxpZGF0b3IgZG8gbm90IGV4aXN0cycsXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdG9yID8gIXRoaXMucHJvcHMudmFsaWRhdG9yKCkgOiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC/0YDQvtGI0LvQuCDQstCw0LvQuNC00LDRhtC40Y4sINGC0L4g0YHQvtGF0YDQsNC90LXRj9C8XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZURhdGEnKTtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuQ2FuY2VsQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuQ2FuY2VsQ2xpY2soKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnRuQ2FuY2VsQ2xpY2snKTtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggQ2FuY2VsXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5ldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmV2ZW50SGFuZGxlcignQ0FOQ0VMJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUJ1dHRvblRhc2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQnV0dG9uVGFzayh0YXNrKSB7XG4gICAgICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAvL0B0b2RvINCX0LDQutC+0L3Rh9C40YLRjFxuXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdleGVjdXRlVGFzaycsIHRhc2spO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVTZWxlY3RUYXNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdFRhc2soZSkge1xuICAgICAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgLy9AdG9kbyDQl9Cw0LrQvtC90YfQuNGC0YxcbiAgICAgICAgICAgIHZhciB0YXNrVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBEb2NUb29sQmFyO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuRG9jVG9vbEJhci5wcm9wVHlwZXMgPSB7XG4gICAgYnBtOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZWRpdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkb2NTdGF0dXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdmFsaWRhdG9yOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuRG9jVG9vbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYnBtOiBbXSxcbiAgICBlZGl0ZWQ6IGZhbHNlLFxuICAgIGRvY1N0YXR1czogMFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NUb29sQmFyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci9kb2MtdG9vbGJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ3NhdmUnO1xuXG52YXIgQnV0dG9uUmVnaXN0ZXJTYXZlID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvblJlZ2lzdGVyU2F2ZSwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyU2F2ZShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uUmVnaXN0ZXJTYXZlKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJTYXZlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQnV0dG9uUmVnaXN0ZXJTYXZlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnV0dG9uUmVnaXN0ZXJTYXZlLCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J0blNhdmUnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NhdmUnLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuaGFuZGxlQ2xpY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl0gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQnV0dG9uUmVnaXN0ZXJTYXZlO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG5CdXR0b25SZWdpc3RlclNhdmUucHJvcFR5cGVzID0ge1xuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG59O1xuXG5CdXR0b25SZWdpc3RlclNhdmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyU2F2ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zYXZlL2J1dHRvbi1yZWdpc3Rlci1zYXZlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxuICAgIElDT04gPSAnY2FuY2VsJztcblxudmFyIEJ1dHRvblJlZ2lzdGVyQ2FuY2VsID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEJ1dHRvblJlZ2lzdGVyQ2FuY2VsLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICAvLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJDYW5jZWwocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvblJlZ2lzdGVyQ2FuY2VsKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJDYW5jZWwuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25SZWdpc3RlckNhbmNlbCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvblJlZ2lzdGVyQ2FuY2VsLCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J0bkNhbmNlbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmhhbmRsZUNsaWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb25zW0lDT05dIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvblJlZ2lzdGVyQ2FuY2VsO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuO1xuXG5CdXR0b25SZWdpc3RlckNhbmNlbC5wcm9wVHlwZXMgPSB7XG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2xcbn07XG5cbkJ1dHRvblJlZ2lzdGVyQ2FuY2VsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvdzogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckNhbmNlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC5qc3hcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ3ByaW50JztcblxudmFyIEJ1dHRvblJlZ2lzdGVyUHJpbnQgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQnV0dG9uUmVnaXN0ZXJQcmludCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyUHJpbnQocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvblJlZ2lzdGVyUHJpbnQpO1xuXG4gICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJQcmludC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvblJlZ2lzdGVyUHJpbnQpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvblJlZ2lzdGVyUHJpbnQsIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBCdXR0b24sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5QcmludCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnUHJpbnQnLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuaGFuZGxlQ2xpY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl0gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQnV0dG9uUmVnaXN0ZXJQcmludDtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbjtcbi8qXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcbiovXG5cbkJ1dHRvblJlZ2lzdGVyUHJpbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyUHJpbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeFxuLy8gbW9kdWxlIGlkID0gMTIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUuanN4JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi90YXNrLXdpZGdldC1zdHlsZXMnKTtcblxudmFyIFRhc2tXaWRnZXQgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoVGFza1dpZGdldCwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gVGFza1dpZGdldChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGFza1dpZGdldCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFRhc2tXaWRnZXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihUYXNrV2lkZ2V0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIHZhciB0YXNrcyA9IHByb3BzLnRhc2tMaXN0IHx8IFtdO1xuXG4gICAgICAgIGlmICghdGFza3NbMF0uc3RhdHVzKSB7XG4gICAgICAgICAgICB0YXNrc1swXS5zdGF0dXMgPSAnb3BlbmVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdGFza0xpc3Q6IHRhc2tzXG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZVNlbGVjdFRhc2sgPSBfdGhpcy5oYW5kbGVTZWxlY3RUYXNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVCdXR0b25UYXNrID0gX3RoaXMuaGFuZGxlQnV0dG9uVGFzay5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUYXNrV2lkZ2V0LCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHRhc2tzID0gdGhpcy5zdGF0ZS50YXNrTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICBpZiAodGFzay5zdGF0dXMgPT09ICdvcGVuZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXRhc2tzKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy53cmFwcGVyIH0sXG4gICAgICAgICAgICAgICAgdGFza3MubGVuZ3RoID4gMSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdzZWxlY3QnLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1jMicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVTZWxlY3RUYXNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3NlbGVjdFRhc2snIH0sXG4gICAgICAgICAgICAgICAgICAgIHRhc2tzLm1hcChmdW5jdGlvbiAodGFza05hbWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gJ29wdGlvbi0nICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGtleToga2V5LCByZWY6IGtleSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApIDogUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnYnV0dG9uVGFzaycsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWMyJyxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25UYXNrLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0YXNrcy5sZW5ndGggPT0gMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRhc2tzLmxlbmd0aCA9PSAxID8gdGFza3NbMF0ubmFtZSA6ICcnIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVTZWxlY3RUYXNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdFRhc2soZSkge1xuICAgICAgICAgICAgdmFyIHRhc2tOYW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVNlbGVjdFRhc2sodGFza05hbWUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVCdXR0b25UYXNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvblRhc2soKSB7XG4gICAgICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LDQutGC0YPQsNC70YzQvdGD0Y4g0LfQsNC00LDRh9GDXG4gICAgICAgICAgICB2YXIgYWN0dWFsVGFzayA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suYWN0dWFsU3RlcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YXNrID0gYWN0dWFsVGFzay5tYXAoZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5hY3Rpb247XG4gICAgICAgICAgICB9KTsgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0L/RgNC+0YbQtdC00YPRgNGLXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUJ1dHRvblRhc2sodGFzayk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldERlZmF1bHRUYXNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldERlZmF1bHRUYXNrKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7IHN0ZXA6IDAsIG5hbWU6ICdTdGFydCcsIGFjdGlvbjogJ3N0YXJ0Jywgc3RhdHVzOiAnb3BlbmVkJyB9XTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBUYXNrV2lkZ2V0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuVGFza1dpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdGFza0xpc3Q6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGhhbmRsZVNlbGVjdFRhc2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cblRhc2tXaWRnZXQuZGVmYXVsdFByb3BzID0ge1xuICAgIHRhc2tMaXN0OiBbXVxufTtcbm1vZHVsZS5leHBvcnRzID0gVGFza1dpZGdldDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdGFzay13aWRnZXQvdGFzay13aWRnZXQuanN4XG4vLyBtb2R1bGUgaWQgPSAxMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXG4gICAgSUNPTiA9ICdleGVjdXRlJztcblxudmFyIEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZSA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhCdXR0b25SZWdpc3RlckV4ZWN1dGUsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckV4ZWN1dGUocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5oYW5kbGVDbGljayA9IF90aGlzLmhhbmRsZUNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZSwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J0bkV4ZWN1dGUnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGljayB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2UnLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b25SZWdpc3RlckV4ZWN1dGU7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG47XG5cbkJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm9wVHlwZXMgPSB7XG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5CdXR0b25SZWdpc3RlckV4ZWN1dGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtKHNlbGYsIHJlcUZpZWxkcywgZGF0YSkge1xuICAgIC8vINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXG4gICAgdmFyIHdhcm5pbmcgPSBudWxsLFxuICAgICAgICByZXF1aXJlZEZpZWxkcyA9IHJlcUZpZWxkcyB8fCBbXSxcbiAgICAgICAgbm90UmVxdWlyZWRGaWVsZHMgPSBbXSxcbiAgICAgICAgbm90TWluTWF4UnVsZSA9IFtdO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xuICAgIH1cblxuICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIGlmIChmaWVsZC5uYW1lIGluIGRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YVtmaWVsZC5uYW1lXTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vdFJlcXVpcmVkRmllbGRzLnB1c2goZmllbGQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC90LAg0LzQuNC9IC4g0LzQsNC60YEg0LfQvdCw0YfQtdC90LjRj1xuXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSAmJiB2YWx1ZSA+IHByb3BzLm1heFxuICAgICAgICAgICAgdmFyIGNoZWNrVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkVmFsdWVEID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC5taW4gJiYgY29udHJvbGxlZFZhbHVlRCA8IGZpZWxkLm1pbiAmJiBmaWVsZC5tYXggJiYgY29udHJvbGxlZFZhbHVlRCA+IGZpZWxkLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkVmFsdWVOID0gTnVtYmVyKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZU4gPT09IDAgfHwgZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZU4gPCBmaWVsZC5taW4gJiYgZmllbGQubWF4ICYmIGNvbnRyb2xsZWRWYWx1ZU4gPiBmaWVsZC5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub3RNaW5NYXhSdWxlLnB1c2goZmllbGQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub3RSZXF1aXJlZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSAncHV1ZHViIHZhamFsaWt1ZCBhbmRtZWQgKCcgKyBub3RSZXF1aXJlZEZpZWxkcy5qb2luKCcsICcpICsgJykgJztcbiAgICB9XG5cbiAgICBpZiAobm90TWluTWF4UnVsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nID8gd2FybmluZyA6ICcnICsgJyBtaW4vbWF4IG9uIHZhbGUoJyArIG5vdE1pbk1heFJ1bGUuam9pbignLCAnKSArICcpICc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdhcm5pbmc7IC8vINCy0LXRgNC90LXQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L7QsSDQuNGC0L7Qs9Cw0YUg0LLQsNC70LjQtNCw0YbQuNC4XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL21peGluL3ZhbGlkYXRlRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxuICAgIGJ1dHRvblN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9tb2RhbHBhZ2Utc3R5bGVzJyk7XG5cbnZhciBNb2RhbFBhZ2UgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoTW9kYWxQYWdlLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBNb2RhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGFsUGFnZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE1vZGFsUGFnZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZGFsUGFnZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuY2hhbmdlVmlzaWJpbGl0eU1vZGFsUGFnZS5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzaG93OiBfdGhpcy5wcm9wcy5zaG93XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTW9kYWxQYWdlLCBbe1xuICAgICAgICBrZXk6ICdjaGFuZ2VWaXNpYmlsaXR5TW9kYWxQYWdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHlNb2RhbFBhZ2UoKSB7XG4gICAgICAgICAgICB2YXIgdmlzaWJpbGl0eSA9IHRoaXMuc3RhdGUuc2hvdztcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93OiAhdmlzaWJpbGl0eSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IG5leHRQcm9wcy5zaG93IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVCdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVCdG5DbGljayhidG5FdmVudCkge1xuICAgICAgICAgICAgLy8g0LfQsNC60YDRi9Cy0LDQtdC8INC+0LrQvdC+INC4INC10YHQu9C4INC/0LXRgNC10LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6LCDQvtGC0LTQsNC10Lwg0YLRg9C00LAg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVZpc2liaWxpdHlNb2RhbFBhZ2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VCdG5DbGljayhidG5FdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C10YDQtdC00LDQvSDQsNGC0YDQuNCx0YMgbW9kYWxPYmplY3RzID0gWydidG5PaycsJ2J0bkNhbmNlbCddXG4gICAgICAgICAgICB2YXIgaGlkZUJ0bk9rID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuT2snKSA9PSAtMSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60L7QuSDQntC6XG4gICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuQ2FuY2VsJykgPT0gLTEgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0LkgQ2FuY2VsXG4gICAgICAgICAgICBkaXNwbGF5TW9kYWwgPSB0aGlzLnN0YXRlLnNob3cgPyAnZmxleCcgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgcGFnZVBvc2l0aW9uID0gdGhpcy5wcm9wcy5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5jb250YWluZXIsIHsgZGlzcGxheTogZGlzcGxheU1vZGFsIH0sIHsganVzdGlmeUNvbnRlbnQ6IHBhZ2VQb3NpdGlvbiB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyByZWY6ICdjb250YWluZXInLCBzdHlsZTogY29udGFpbmVyU3R5bGUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLm1vZGFsUGFnZSwgcmVmOiAnbW9kYWxQYWdlQ29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuaGVhZGVyLCByZWY6ICdtb2RhbFBhZ2VIZWFkZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2hlYWRlck5hbWUnLCBzdHlsZTogc3R5bGVzLmhlYWRlck5hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHN0eWxlOiBzdHlsZXMuYnV0dG9uQ2xvc2UsIHJlZjogJ2J0bkNsb3NlJywgb25DbGljazogdGhpcy5jaGFuZ2VWaXNpYmlsaXR5TW9kYWxQYWdlLmJpbmQodGhpcyksIHZhbHVlOiAneCcgfSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLm1vZGFsUGFnZUNvbnRlbnQsIHJlZjogJ21vZGFsUGFnZUNvbnRlbnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5tb2RhbEZvb3RlciwgcmVmOiAnbW9kYWxQYWdlQnV0dG9ucycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5PayA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQnV0dG9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnYnRuT2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ09rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ3dpZHRoJyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyA/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLndpZHRoIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnaGVpZ2h0JyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyA/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLmhlaWdodCA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzLCAnT2snKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdidG5PaycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBidXR0b25TdHlsZXMuaWNvbnNbJ29rJ10gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmJ1dHRvbnNTZXBhcmF0b3IgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdXR0b24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5DYW5jZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0NhbmNlbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnd2lkdGgnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zID8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMud2lkdGggOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICdoZWlnaHQnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zID8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMuaGVpZ2h0IDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsICdDYW5jZWwnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnbW9kYWxQYWdlQnV0dG9ucycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnYnRuQ2FuY2VsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2UnLCBzcmM6IGJ1dHRvblN0eWxlcy5pY29uc1snY2FuY2VsJ10gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE1vZGFsUGFnZTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG4vKlxyXG5Nb2RhbFBhZ2UucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBzaG93OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAnZmxleC1zdGFydCcsICdmbGV4LWVuZCddKSxcclxufVxyXG4qL1xuXG5Nb2RhbFBhZ2UuZGVmYXVsdFByb3BzID0ge1xuICAgIG1vZGFsUGFnZU5hbWU6ICdkZWZhdWxOYW1lJyxcbiAgICBtb2RhbE9iamVjdHM6IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ10sXG4gICAgcG9zaXRpb246ICdjZW50ZXInLFxuICAgIHNob3c6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogJzAnLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICB9LFxuICAgIG1vZGFsUGFnZToge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luOiAnOHB4JyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInXG4gICAgfSxcbiAgICBtb2RhbFBhZ2VDb250ZW50OiB7XG4gICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgICAgbWFyZ2luOiAnMTBweCdcbiAgICB9LFxuICAgIGhlYWRlcjoge1xuICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGRhcmtncmF5JyxcbiAgICAgICAgYmFja2dyb3VuZDogJ2xpZ2h0Z3JheScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJ1xuICAgIH0sXG5cbiAgICBoZWFkZXJOYW1lOiB7XG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnMTBweCdcbiAgICB9LFxuXG4gICAgbW9kYWxGb290ZXI6IHtcbiAgICAgICAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBtYXJnaW5Cb3R0b246ICcxMHB4J1xuICAgIH0sXG5cbiAgICBtb2RhbFBhZ2VCdXR0b25zOiB7XG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMTBweCdcbiAgICB9LFxuXG4gICAgYnV0dG9uc1NlcGFyYXRvcjoge1xuICAgICAgICB3aWR0aDogJzEwcHgnXG4gICAgfSxcblxuICAgIGJ1dHRvbkNsb3NlOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Z3JheScsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICBmb250V2VpZ2h0OiAnOTAwJ1xuXG4gICAgfSxcblxuICAgIGxlZnQ6IHtcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzAnXG4gICAgfSxcblxuICAgIHJpZ2h0OiB7XG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICcwJ1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY1N0b3JlID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgaWQ6ICdkb2NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGdyaWRDZWxsRWRpdGVkOiAwLCAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INCyINCz0YDQuNC00LUg0YDQtdC00LDQutGC0LjRgNGD0LXQvNGD0Y4g0Y/Rh9C10LnQutGDXG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICBkZXRhaWxzOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0LPRgNC40LRcbiAgICAgICAgcmVsYXRpb25zOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0YHQstGP0LfQsNC90L3Ri9C1INC00L7QutGD0LzQtdC90YLRi1xuICAgICAgICBncmlkQ29uZmlnOiBbXSwgLy8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINCz0YDQuNC00LBcbiAgICAgICAgZ3JpZE5hbWU6ICcnLFxuICAgICAgICBkb2NJZDogMCxcbiAgICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICAgIGVkaXRlZDogZmFsc2UsXG4gICAgICAgIHNhdmVkOiB0cnVlLFxuICAgICAgICBncmlkUm93SWQ6IDAsXG4gICAgICAgIGxpYnM6IFt7XG4gICAgICAgICAgICBpZDogJ2FzdXR1c2VkJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTpbe2lkOjEsIG5hbWU6XCJBc3V0dXMgMVwifSx7aWQ6MiwgbmFtZTpcIkFzdXR1cyAyXCJ9LHtpZDozLCBuYW1lOlwiQXN1dHVzIDNcIn0gXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ25vbWVuY2xhdHVyZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdrb250b2QnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAncHJvamVjdCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0dW5udXMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYWEnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAna2Fzc2EnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYXJ2ZWRTaXNzZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2FzdXR1c2lkJywgJ2FydmlkJ10gLy8g0LjQtCDQutC+0L3RgtGALdCw0LPQtdC90YLQsCDQuCDQvdC+0LzQtdGAINGB0YfQtdGC0LBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhcnZlZFZhbGphJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnYXN1dHVzaWQnLCAnYXJ2aWQnXSAvLyDQuNC0INC60L7QvdGC0YAt0LDQs9C10L3RgtCwINC4INC90L7QvNC10YAg0YHRh9C10YLQsFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3VzZXJzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2Rva1Byb3BzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnZG9jX3R5cGVfaWQnLCAncmVrdmlkJ10gLy8g0YLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuCDQuNC0INGD0YfRgNC10LbQtNC10L3QuNGPXG4gICAgICAgIH1dLFxuICAgICAgICBicG06IFtdLCAvLyDQtNCw0L3QvdGL0LUg0JHQnyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgdGFzazoge30sIC8vINGC0LXQutGD0YnQsNGPINC30LDQtNCw0YfQsFxuICAgICAgICBiYWNrdXA6IHt9IC8vINGF0YDQsNC90LjRgiDQvdC10LjQt9C80LXQvdC10L3QvdC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1INC00L7QutGD0LzQtdC90YLQsFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIGJhY2t1cENoYW5nZTogZnVuY3Rpb24gYmFja3VwQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDRhdGA0LDQvdC40YIg0L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvRhSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgYmFja3VwOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMaWJzRmlsdGVyOiBmdW5jdGlvbiBzZXRMaWJzRmlsdGVyKHVwZGF0ZXIsIGxpYk5hbWUsIGZpbHRlcikge1xuXG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDRgdC/0YDQsNCy0L7Rh9C90LjQulxuICAgICAgICAgICAgdmFyIGxpYnMgPSB0aGlzLmxpYnM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaWJzW2ldLmlkID09IGxpYk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlic1tpXS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsIGxpYk5hbWUpOyAvL9C90L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBncmlkUm93SWRDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRSb3dJZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkUm93SWRDaGFuZ2UgY2FsbGVkOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRSb3dJZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRMaWJzOiBmdW5jdGlvbiBsb2FkTGlicyh1cGRhdGVyLCBsaWJzVG9VcGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpYnNUb1VwZGF0ZSB8fCBpdGVtLmlkID09IGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQvtCx0L3QvtCy0LvQtdC90LjQtSDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGBINGB0LXRgNCy0LXRgNCwXG4gICAgICAgICAgICBsaWJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbGliUGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpYlBhcmFtcyA9IGl0ZW0ucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQt9Cw0L/RgNC+0YHQsFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYlBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zW2ldID0gX3RoaXMuZGF0YVtpdGVtLmZpZWxkc1tpXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2xvYWRMaWJzKGl0ZW0uaWQsIGxpYlBhcmFtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2F2ZURhdGE6IGZ1bmN0aW9uIHNhdmVEYXRhKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHNhdmVEb2MoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhlY3V0ZVRhc2s6IGZ1bmN0aW9uIGV4ZWN1dGVUYXNrKHVwZGF0ZXIsIHRhc2spIHtcbiAgICAgICAgICAgIF9leGVjdXRlVGFzayh0YXNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlRG9jOiBmdW5jdGlvbiBkZWxldGVEb2ModXBkYXRlcikge1xuICAgICAgICAgICAgX2RlbGV0ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBncmlkQ2VsbEVkaXRlZENoYW5nZTogZnVuY3Rpb24gZ3JpZENlbGxFZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGVkIGdyaWRDZWxsRWRpdGVkQ2hhbmdlOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRDZWxsRWRpdGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jSWRDaGFuZ2U6IGZ1bmN0aW9uIGRvY0lkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vINGH0LjRgdGC0LjQvCDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2NJZENoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY0lkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkb2NJZENoYW5nZSB2aWdhJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmFydmlkICE9PSAndW5kZWZpbml0ZScpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQutC+0L3RgtGA0LDQs9C10L3RgiDQvtGC0YHRg9GC0YHQstGD0LXRgiwg0YLQviDQuCDQv9Cw0YDQsNC80LXRgtGAINC60L7QvdGC0YDQsNCz0LXQvdGC0LAg0YLQsNC60LbQtSDQvtCx0L3Rg9C70LjQvFxuICAgICAgICAgICAgICAgIHZhbHVlLmFydmlkID0gdmFsdWUuYXN1dHVzaWQgPyB2YWx1ZS5hcnZpZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDQtNC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGB0YfQtdGC0L7QslxuICAgICAgICAgICAgICAgIC8vZmx1eC5kb0FjdGlvbignc2V0TGlic0ZpbHRlcicsICdhcnZlZFNpc3NlJywgW3ZhbHVlLmFzdXR1c2lkLCB2YWx1ZS5hcnZpZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBicG1DaGFuZ2U6IGZ1bmN0aW9uIGJwbUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0JfQsNCz0YDRg9C30LrQsCDQkdCfXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdicG1DaGFuZ2UnLCB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGJwbTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGF0aW9uc0NoYW5nZTogZnVuY3Rpb24gcmVsYXRpb25zQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC30LDQs9GA0YPQt9C60YMg0LTQsNC90L3Ri9GFINC30LDQstC40YHQuNC80L7RgdGC0LXQuSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgcmVsYXRpb25zOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGV0YWlsc0NoYW5nZTogZnVuY3Rpb24gZGV0YWlsc0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQs9GA0LjQtNCwINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZXRhaWxzOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZENvbmZpZ0NoYW5nZTogZnVuY3Rpb24gZ3JpZENvbmZpZ0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC60L7QvdGE0LjQs9GD0YDQsNGG0LjQuCDQs9GA0LjQtNCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRDb25maWc6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVkQ2hhbmdlOiBmdW5jdGlvbiBkZWxldGVkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQsdGL0LvQsCDQstGL0LfQstCw0L3QsCDQutC90L7Qv9C60LAgRGVsZXRlXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRlbGV0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlZGl0ZWRDaGFuZ2U6IGZ1bmN0aW9uIGVkaXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0JzQtdC90Y/QtdGC0YHRjyDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGVkaXRlZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdmVkQ2hhbmdlOiBmdW5jdGlvbiBzYXZlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0LTQsNC90L3Ri9GFINC4INC40Lcg0YHQvtGF0YDQsNC90LXQvdC40LVcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc2F2ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsaWJzQ2hhbmdlOiBmdW5jdGlvbiBsaWJzQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQsiDRgdC/0YDQsNCy0L7Rh9C90LjQutCw0YVcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpYnNDaGFuZ2UgY2FsbGVkJywgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBsaWJzOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZE5hbWVDaGFuZ2U6IGZ1bmN0aW9uIGdyaWROYW1lQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWROYW1lOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVyeTogZnVuY3Rpb24gcmVxdWVyeShhY3Rpb24sIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIF9yZXF1ZXJ5KGFjdGlvbiwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gX2RlbGV0ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAvLyDQstC10YDQvdC10LzRgdGPINCyINGA0LXQs9C40YHRgtGAXG4gICAgLy9yZXF1ZXJ5KCdkZWxldGUnLCBudWxsKTtcbiAgICBkb2N1bWVudC5sb2NhdGlvbiA9ICcvZG9jdW1lbnRzJztcbn07XG5cbmZ1bmN0aW9uIF9leGVjdXRlVGFzayh0YXNrKSB7XG4gICAgLypcclxuICAgICDQktGL0L/QvtC70L3QuNGCINC30LDQv9GA0L7RgSDQvdCwINC40YHQv9C+0LvQvdC10L3QuNC1INC30LDQtNCw0YfQuFxyXG4gICAgICovXG5cbiAgICB2YXIgdGFza3NQYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jU3RvcmUuZGF0YS5pZCxcbiAgICAgICAgdGFza3M6IHRhc2ssXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkXG4gICAgfTtcblxuICAgIC8vICAgY29uc29sZS5sb2coJ2V4ZWN1dGVUYXNrOicsIHRhc2ssIHRhc2tzUGFyYW1ldGVycyk7XG5cbiAgICBfcmVxdWVyeSgnZXhlY3V0ZScsIEpTT04uc3RyaW5naWZ5KHRhc2tzUGFyYW1ldGVycyksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVyciB8fCBkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2V4ZWN1dGVUYXNrIGFycml2ZWQgZG9jU3RvcmUuZGF0YS5pZCwgZG9jU3RvcmUuZG9jSWQsIGRhdGEnLGRvY1N0b3JlLmRhdGEuaWQsZG9jU3RvcmUuZG9jSWQsICBkYXRhKTtcblxuICAgICAgICAgICAgLy8g0L/RgNC4INGD0YHQv9C10YjQvdC+0Lwg0LLRi9C/0L7Qu9C90LXQvdC40Lgg0LfQsNC00LDRh9C4LCDQstGL0L/QvtC70L3QuNGC0Ywg0L/QtdGA0LXQs9GA0YPQt9C60YMg0LTQvtC60YPQvNC10L3RgtCwICjQstGA0LXQvNC10L3QvdC+KVxuICAgICAgICAgICAgLy9AdG9kbyDQv9C+0LTRgtGP0L3Rg9GC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCx0LXQtyDQv9C10YDQtdCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLXG4gICAgICAgICAgICByZWxvYWREb2N1bWVudChkb2NTdG9yZS5kYXRhLmlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVxdWVyeSwgcmVsb2FkRG9jdW1lbnQnLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2F2ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YHQvtGF0YDQsNC90LXQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwXG4gICAgdmFyIHNhdmVEYXRhID0ge1xuICAgICAgICBpZDogZG9jU3RvcmUuZGF0YS5pZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1N0b3JlLmRhdGEuZG9jX3R5cGVfaWQsIC8vINCy0YvQvdC10YHQtdC90L4g0LTQu9GPINC/0L7QtNCz0YDRg9C30LrQuCDQvNC+0LTQtdC70LhcbiAgICAgICAgZGF0YTogZG9jU3RvcmUuZGF0YSxcbiAgICAgICAgZGV0YWlsczogZG9jU3RvcmUuZGV0YWlsc1xuICAgIH07XG5cbiAgICBfcmVxdWVyeSgnc2F2ZScsIEpTT04uc3RyaW5naWZ5KHNhdmVEYXRhKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbmV3SWQgPSBkYXRhWzBdLmlkO1xuICAgICAgICAgICAgLy8g0L7QsdC90L7QstC40Lwg0LjQtFxuICAgICAgICAgICAgc2F2ZURhdGEuZGF0YS5pZCA9IG5ld0lkO1xuXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgc2F2ZURhdGEuZGF0YSk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgbmV3SWQpOyAvLyDQvdC+0LLQvtC1INC40LRcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgdHJ1ZSk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgZmFsc2UpOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cblxuXG4gICAgICAgICAgICAvLyByZWxvYWQgZG9jdW1lbnRcbiAgICAgICAgICAgIHJlbG9hZERvY3VtZW50KG5ld0lkKTsgLy9AdG9kbyDQstGL0L/QvtC70L3QuNGC0Ywg0L/QtdGA0LXQs9GA0YPQt9C60YMg0LTQsNC90L3Ri9GFINC/0LXRgNC10Lcg0L/QtdGA0LXQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd0ZWtraXMgdmlnYScsIGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKlxyXG4gICAgICAgcmVxdWVyeSgnc2F2ZUFuZFNlbGVjdCcsIEpTT04uc3RyaW5naWZ5KHNhdmVEYXRhKSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICAgaWYgKGVycikgcmV0dXJuIGVycjtcclxuICAgICAgIHRyeSB7XHJcbiAgICAgaWYgKGRhdGEuaWQgIT09IHNhdmVEYXRhLmRhdGEuaWQpIHtcclxuICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQuNC0XHJcbiAgICAgc2F2ZURhdGEuZGF0YS5pZCA9IGRhdGEuaWQ7XHJcbiAgICAgZmx1eC5kb0FjdGlvbiggJ2RhdGFDaGFuZ2UnLCBzYXZlRGF0YS5kYXRhICk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICB9XHJcbiAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCApOyAvLyDQvdC+0LLQvtC1INC40LRcclxuICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCB0cnVlICk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxyXG4gICAgIGZsdXguZG9BY3Rpb24oICdlZGl0ZWRDaGFuZ2UnLCBmYWxzZSApOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cclxuICAgICB9IGNhdGNoKGUpIHtcclxuICAgICBjb25zb2xlLmVycm9yO1xyXG4gICAgIH1cclxuICAgICAgIH0pO1xyXG4gICAgICovXG59O1xuXG5mdW5jdGlvbiByZWxvYWREb2N1bWVudChkb2NJZCkge1xuICAgIC8vIHJlbG9hZCBkb2N1bWVudFxuXG4gICAgaWYgKGRvY0lkKSB7XG4gICAgICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIGRvY1N0b3JlLmRhdGEuZG9jX3R5cGVfaWQgKyBkb2NJZDtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9sb2FkTGlicyhsaWJyYXJ5TmFtZSwgbGliUGFyYW1zKSB7XG4gICAgdHJ5IHtcblxuICAgICAgICBfcmVxdWVyeSgnc2VsZWN0QXNMaWJzJywgSlNPTi5zdHJpbmdpZnkoeyBkb2NfdHlwZV9pZDogbGlicmFyeU5hbWUsIGlkOiAwLCBwYXJhbXM6IGxpYlBhcmFtcyB9KSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGlicyA9IGRvY1N0b3JlLmxpYnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8g0LjRidC10Lwg0LTQsNC90L3Ri9C1INGB0L/RgNCw0LLQvtC70YfQvdC40LrQsCwg0LrQvtGC0L7RgNGL0LUg0L7QsdC90L7QstC40LvQuFxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5EYXRhID0gaXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IGxpYnJhcnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkRhdGEuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdMaWJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdsaWJzQ2hhbmdlJywgbmV3TGlicyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Rla2tpcyB2aWdhJywgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfcmVxdWVyeShhY3Rpb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgVVJMID0gJy9hcGkvZG9jJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1ldGVyc1xuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVxdWVyeSBlcnJvcjonLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJy9lcnJvcicsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL3N0b3Jlcy9kb2Nfc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWEE7QUFDQTtBQUNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==
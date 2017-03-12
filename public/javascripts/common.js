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
/******/ 			modules[moduleId] = moreModules[moduleId];
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
/******/ 		2:0
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

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"doc","1":"docs"}[chunkId]||chunkId) + ".js";
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
/******/ ({

/***/ 4:
/***/ function(module, exports) {

	module.exports = React;

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XDispatcher = __webpack_require__(6),
	    XStore = __webpack_require__(7);

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

/***/ },

/***/ 6:
/***/ function(module, exports) {

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

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XEmitter = __webpack_require__(8),
	    xUtils = __webpack_require__(9);

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

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var xUtils = __webpack_require__(9);

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

/***/ },

/***/ 9:
/***/ function(module, exports) {

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

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4);

	const modalPage = React.createClass({displayName: "modalPage",
	    handleBtnClick: function(btnEvent) {
	        this.props.modalPageBtnClick(btnEvent);
	    },

	    propTypes: {
	        modalPageName: React.PropTypes.string.isRequired,
	        modalPageBtnClick: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function() {
	        return {
	            modalPageName: 'defaulName',
	            modalObjects: ['btnOk', 'btnCancel']
	        }
	    },

	    render: function() {
	        let hideBtnOk =  this.props.modalObjects.indexOf('btnOk') == -1 ? false: true, // управление кнопкой Ок
	            hideBtnCancel =  this.props.modalObjects.indexOf('btnCancel') == -1 ? false: true; // управление кнопкой Cancel

	        return (
	            React.createElement("div", {className: "modalPage"}, 
	                React.createElement("div", {id: "modalPage"}, 
	                    React.createElement("div", {id: "header"}, 
	                        React.createElement("span", {id: "headerName"}, " ", this.props.modalPageName, " ")
	                    ), 
	                    React.createElement("div", {id: "modalPageContent"}, 
	                        this.props.children
	                    ), 

	                    React.createElement("div", {id: "modalPageButtons"}, 
	                        hideBtnOk ?
	                        React.createElement("button", {
	                            onClick: this.handleBtnClick.bind(this,'Ok'), 
	                            className: "modalPageButtons", 
	                            id: "btnOk"}, " Ok"
	                            ) : null, 
	                        
	                        hideBtnCancel ?
	                        React.createElement("button", {
	                            onClick: this.handleBtnClick.bind(this,'Cancel'), 
	                            className: "modalPageButtons", 
	                            id: "btnCancel"}, " Cancel"
	                        ): null
	                        
	                    )
	                )
	            )
	        )
	    }
	});


	module.exports = modalPage;

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDIwMzA1ZWRjMzUwMzdkYzNlZDVjIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9mbHV4aWZ5LmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pXG4gXHRcdFx0XHRjYWxsYmFja3MucHVzaC5hcHBseShjYWxsYmFja3MsIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0aWYobW9yZU1vZHVsZXNbMF0pIHtcbiBcdFx0XHRpbnN0YWxsZWRNb2R1bGVzWzBdID0gMDtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MjowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyAoe1wiMFwiOlwiZG9jXCIsXCIxXCI6XCJkb2NzXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIwMzA1ZWRjMzUwMzdkYzNlZDVjIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWERpc3BhdGNoZXIgPSByZXF1aXJlKCcuL3NyYy94RGlzcGF0Y2hlcicpLFxuICAgIFhTdG9yZSA9IHJlcXVpcmUoJy4vc3JjL3hTdG9yZScpO1xuXG4vLyNidWlsZFxuXG4vKipcclxuICogRmx1eGlmeSBjbGFzcyB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHNpbmdsZXRvbi5cclxuICogSW5pdGlhbGl6ZXMgdGhlIGRpc3BhdGNoZXIgYW5kIHRoZSBzdG9yZS5cclxuICogQWxzbyBzZXQgdGhlIFByb21pc2Ugb2JqZWN0IGlmIGl0IGlzIGdsb2JhbGx5IGF2YWlsYWJsZS5cclxuICovXG52YXIgRmx1eGlmeSA9IGZ1bmN0aW9uIEZsdXhpZnkoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGlzcGF0Y2hlcicsIHtcblx0XHR2YWx1ZTogbmV3IFhEaXNwYXRjaGVyKClcblx0fSk7XG5cblx0dGhpcy5zdG9yZXMgPSB7fTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLnByb21pc2lmeShQcm9taXNlKTtcblx0fVxufTtcblxuRmx1eGlmeS5wcm90b3R5cGUgPSB7XG5cdC8qKlxyXG4gICogQ3JlYXRlIGEgbmV3IHN0b3JlLiBJZiBhbiBpZCBpcyBwYXNzZWQgaW4gdGhlIG9wdGlvbnMsXHJcbiAgKiB0aGUgc3RvcmUgd2lsbCBiZSByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyIGFuZCBzYXZlZFxyXG4gICogaW4gZmx1eGlmeS5zdG9yZXNbaWRdLlxyXG4gICpcclxuICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyB7aWQsIGluaXRpYWxTdGF0ZSwgYWN0aW9uQ2FsbGJhY2t9XHJcbiAgKiBAcmV0dXJuIHtYU3RvcmV9XHJcbiAgKi9cblx0Y3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKG9wdGlvbnMpIHtcblx0XHR2YXIgc3RvcmUgPSBuZXcgWFN0b3JlKG9wdGlvbnMpO1xuXG5cdFx0Ly8gSWYgdGhlIHN0b3JlIGhhcyBhbiBpZCwgcmVnaXN0ZXIgaXQgaW4gRmx1eGlmeSBhbmQgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRpZiAoc3RvcmUuX2lkKSB7XG5cdFx0XHR0aGlzLnN0b3Jlc1tzdG9yZS5faWRdID0gc3RvcmU7XG5cdFx0XHR0aGlzLmRpc3BhdGNoZXIucmVnaXN0ZXJTdG9yZShzdG9yZS5faWQsIHN0b3JlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBFeGVjdXRlcyBhbiBhY3Rpb24uIFRoZSBhcmd1bWVudHMgb2YgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGF2YWlsYWJsZVxyXG4gICogZm9yIHRoZSBhY3Rpb24gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgaW4gdGhlIGRpc3BhdGNoZXIuXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBhY3Rpb24gY2FsbGJhY2tzXHJcbiAgKiAgICAgICAgICAgICAgICAgICBoYXZlIGZpbmlzaGVkLlxyXG4gICovXG5cdGRvQWN0aW9uOiBmdW5jdGlvbiBkb0FjdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoLmFwcGx5KHRoaXMuZGlzcGF0Y2hlciwgYXJndW1lbnRzKTtcblx0fSxcblxuXHQvKipcclxuICAqIElmIEVTNiBQcm9taXNlIG9iamVjdCBpcyBub3QgZGVmaW5lZCBnbG9iYWxseSBvciBwb2x5ZmlsbGVkLCBhIFByb21pc2Ugb2JqZWN0XHJcbiAgKiBjYW4gYmUgZ2l2ZW4gdG8gZmx1eGlmeSBpbiBvcmRlciB0byBtYWtlIGl0IHdvcmssIHVzaW5nIHRoaXMgbWV0aG9kLlxyXG4gICpcclxuICAqIEBwYXJhbSAgeyBQcm9taXNlIH0gUHJvbWlzZSBFUzYgUHJvbWlzZSBjb21wYXRpYmxlIG9iamVjdFxyXG4gICogQHJldHVybiB7IHVuZGVmaW5lZCB9XHJcbiAgKi9cblx0cHJvbWlzaWZ5OiBmdW5jdGlvbiBwcm9taXNpZnkoUHJvbWlzZSkge1xuXHRcdHRoaXMuX1Byb21pc2UgPSBQcm9taXNlO1xuXHRcdHRoaXMuZGlzcGF0Y2hlci5fUHJvbWlzZSA9IFByb21pc2U7XG5cdH1cbn07XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsdXhpZnkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9mbHV4aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIFRoZSBhc3luY2hyb25vdXMgZGlzcGF0Y2hlciBjb21wYXRpYmxlIHdpdGggRmFjZWJvb2sncyBmbHV4IGRpc3BhdGNoZXJcclxuICogaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L2RvY3MvZGlzcGF0Y2hlci5odG1sXHJcbiAqXHJcbiAqIERpc3BhdGNoIGFjdGlvbnMgdG8gdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLCB0aG9zZSBhY3Rpb24gY2FuIGJlXHJcbiAqIGFzeW5jaHJvbm91cyBpZiB0aGV5IHJldHVybiBhIFByb21pc2UuXHJcbiAqL1xuXG52YXIgWERpc3BhdGNoZXIgPSBmdW5jdGlvbiBYRGlzcGF0Y2hlcigpIHtcblx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdHRoaXMuX2Rpc3BhdGNoUXVldWUgPSBbXTtcblx0dGhpcy5fY3VycmVudERpc3BhdGNoID0gZmFsc2U7XG5cdHRoaXMuX0lEID0gMTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuWERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nIHwgRnVuY3Rpb259ICAgaWQgIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB0aGUgaWQgb2YgdGhlIGNhbGxiYWNrLlxyXG4gICogICAgICAgICAgICAgICAgICBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrLCBhbmQgaWQgaXMgZ2VuZXJhdGVkXHJcbiAgKiAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHkuXHJcbiAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgSWYgYW4gaWQgaXMgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQsIHRoaXMgd2lsbCBiZSB0aGUgY2FsbGJhY2suXHJcbiAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcihpZCwgY2FsbGJhY2spIHtcblx0XHR2YXIgSUQgPSBpZDtcblxuXHRcdC8vIElmIHRoZSBjYWxsYmFjayBpcyB0aGUgZmlyc3QgcGFyYW1ldGVyXG5cdFx0aWYgKHR5cGVvZiBpZCA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRJRCA9ICdJRF8nICsgdGhpcy5fSUQ7XG5cdFx0XHRjYWxsYmFjayA9IGlkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NhbGxiYWNrc1tJRF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9JRCsrO1xuXG5cdFx0cmV0dXJuIElEO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBYU3RvcmUgaW4gdGhlIGRpc3BhY2hlci4gWFN0b3JlcyBoYXMgYSBtZXRob2QgY2FsbGVkIGNhbGxiYWNrLiBUaGUgZGlzcGF0Y2hlclxyXG4gICogcmVnaXN0ZXIgdGhhdCBmdW5jdGlvbiBhcyBhIHJlZ3VsYXIgY2FsbGJhY2suXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIGlkIGZvciB0aGUgc3RvcmUgdG8gYmUgdXNlZCBpbiB0aGUgd2FpdEZvciBtZXRob2QuXHJcbiAgKiBAcGFyYW0gIHtYU3RvcmV9IHhTdG9yZSBTdG9yZSB0byByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyU3RvcmU6IGZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmUoaWQsIHhTdG9yZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHhTdG9yZSwgJ19kaXNwYXRjaGVyJywge1xuXHRcdFx0dmFsdWU6IHRoaXNcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLnJlZ2lzdGVyKGlkLCB4U3RvcmUuY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogVW5yZWdpc3RlciBhIGNhbGxiYWNrIGdpdmVuIGl0cyBpZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIENhbGxiYWNrL1N0b3JlIGlkXHJcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgKi9cblx0dW5yZWdpc3RlcjogZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuXHRcdGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogQ3JlYXRlcyBhIHByb21pc2UgYW5kIHdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBjb21wbGV0ZSBiZWZvcmUgcmVzb2x2ZSBpdC5cclxuICAqIElmIGl0IGlzIHVzZWQgYnkgYW4gYWN0aW9uQ2FsbGJhY2ssIHRoZSBwcm9taXNlIHNob3VsZCBiZSByZXNvbHZlZCB0byBsZXQgb3RoZXIgY2FsbGJhY2tzXHJcbiAgKiB3YWl0IGZvciBpdCBpZiBuZWVkZWQuXHJcbiAgKlxyXG4gICogQmUgY2FyZWZ1bCBvZiBub3QgdG8gd2FpdCBieSBhIGNhbGxiYWNrIHRoYXQgaXMgd2FpdGluZyBieSB0aGUgY3VycmVudCBjYWxsYmFjaywgb3IgdGhlXHJcbiAgKiBwcm9taXNlcyB3aWxsIG5ldmVyIGZ1bGZpbGwuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nPEFycmF5PnxTdHJpbmd9IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYWxsYmFja3Mvc3RvcmVzIHRvIHdhaXQgZm9yLlxyXG4gICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gdGhlIHNwZWNpZmllZCBjYWxsYmFja3MgYXJlIGNvbXBsZXRlZC5cclxuICAqL1xuXHR3YWl0Rm9yOiBmdW5jdGlvbiB3YWl0Rm9yKGlkcykge1xuXHRcdHZhciBwcm9taXNlcyA9IFtdLFxuXHRcdCAgICBpID0gMDtcblxuXHRcdGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcblxuXHRcdGZvciAoOyBpIDwgaWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fcHJvbWlzZXNbaWRzW2ldXSkgcHJvbWlzZXMucHVzaCh0aGlzLl9wcm9taXNlc1tpZHNbaV1dKTtcblx0XHR9XG5cblx0XHRpZiAoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX1Byb21pc2UucmVzb2x2ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIGFsbCB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3Mvc3RvcmVzLlxyXG4gICpcclxuICAqIElmIGEgc2Vjb25kIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHdoaWxlIHRoZXJlIGlzIGEgZGlzcGF0Y2ggb24sIGl0IHdpbGwgYmVcclxuICAqIGVucXVldWVkIGFuIGRpc3BhdGNoZWQgYWZ0ZXIgdGhlIGN1cnJlbnQgb25lLlxyXG4gICpcclxuICAqIEByZXR1cm4geyBQcm9taXNlIH0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZSxcblx0XHQgICAgZGVxdWV1ZTtcblxuXHRcdGlmICghdGhpcy5fUHJvbWlzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gcHJvbWlzZXMuJyk7XG5cblx0XHQvLyBJZiB3ZSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLCBlbnF1ZXVlIHRoZSBkaXNwYXRjaFxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGlzcGF0Y2gpIHtcblxuXHRcdFx0Ly8gRGlzcGF0Y2ggYWZ0ZXIgdGhlIGN1cnJlbnQgb25lXG5cdFx0XHRwcm9taXNlID0gdGhpcy5fY3VycmVudERpc3BhdGNoLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2Rpc3BhdGNoLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gRW5xdWV1ZSwgc2V0IHRoZSBjaGFpbiBhcyB0aGUgY3VycmVudCBwcm9taXNlIGFuZCByZXR1cm5cblx0XHRcdHRoaXMuX2Rpc3BhdGNoUXVldWUucHVzaChwcm9taXNlKTtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSBwcm9taXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSB0aGlzLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24gaW5tZWRpYXRlbGx5LlxyXG4gICpcclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRfZGlzcGF0Y2g6IGZ1bmN0aW9uIF9kaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZXMgPSBbXTtcblxuXHRcdHRoaXMuX3Byb21pc2VzID0gW107XG5cblx0XHQvLyBBIGNsb3N1cmUgaXMgbmVlZGVkIGZvciB0aGUgY2FsbGJhY2sgaWRcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jYWxsYmFja3MpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cblx0XHRcdC8vIEFsbCB0aGUgcHJvbWlzZXMgbXVzdCBiZSBzZXQgaW4gbWUuX3Byb21pc2VzIGJlZm9yZSB0cnlpbmcgdG8gcmVzb2x2ZVxuXHRcdFx0Ly8gaW4gb3JkZXIgdG8gbWFrZSB3YWl0Rm9yIHdvcmsgb2tcblx0XHRcdG1lLl9wcm9taXNlc1tpZF0gPSBtZS5fUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBtZS5fY2FsbGJhY2tzW2lkXS5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyci5zdGFjayB8fCBlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByb21pc2VzLnB1c2gobWUuX3Byb21pc2VzW2lkXSk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdHZhciBkZXF1ZXVlID0gZnVuY3Rpb24gZGVxdWV1ZSgpIHtcblx0XHRcdG1lLl9kaXNwYXRjaFF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIW1lLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aCkgbWUuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5fUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGVxdWV1ZSwgZGVxdWV1ZSk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJcyB0aGlzIGRpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxyXG4gICpcclxuICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgKi9cblx0aXNEaXNwYXRjaGluZzogZnVuY3Rpb24gaXNEaXNwYXRjaGluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aDtcblx0fVxuXG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhEaXNwYXRjaGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94RGlzcGF0Y2hlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBYRW1pdHRlciA9IHJlcXVpcmUoJy4veEVtaXR0ZXInKSxcbiAgICB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgU3RvcmUgPSBYRW1pdHRlci5fZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShwcm9wcykge1xuXHRcdGlmICghcHJvcHMpIHJldHVybiB0aGlzLnByb3BzID0ge307XG5cblx0XHR0aGlzLnByb3BzID0ge307XG5cdFx0Zm9yICh2YXIgcCBpbiBwcm9wcykge1xuXHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdH1cblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uIGdldChwcm9wKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHNbcHJvcF07XG5cdH0sXG5cblx0c2V0OiBmdW5jdGlvbiBzZXQocHJvcCwgdmFsdWUpIHtcblx0XHR2YXIgcHJvcHMgPSBwcm9wLFxuXHRcdCAgICB1cGRhdGVzID0gW10sXG5cdFx0ICAgIHByZXZpb3VzVmFsdWUsXG5cdFx0ICAgIHA7XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRwcm9wcyA9IHt9O1xuXHRcdFx0cHJvcHNbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gcHJvcHMpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzW3BdICE9IHByb3BzW3BdKSB7XG5cdFx0XHRcdHByZXZpb3VzVmFsdWUgPSB0aGlzLnByb3BzW3BdO1xuXHRcdFx0XHR0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdFx0XHRcdHVwZGF0ZXMucHVzaCh7XG5cdFx0XHRcdFx0cHJvcDogcCxcblx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRcdHZhbHVlOiBwcm9wc1twXVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodXBkYXRlcy5sZW5ndGgpIHRoaXMuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdH1cbn0pO1xuXG52YXIgWFN0b3JlID0gWEVtaXR0ZXIuX2V4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIG9wdHMgPSBvcHRpb25zIHx8IHt9LFxuXHRcdCAgICBzdG9yZSA9IG5ldyBTdG9yZShvcHRzLmluaXRpYWxTdGF0ZSksXG5cdFx0ICAgIGFjdGlvblR5cGUsXG5cdFx0ICAgIHN0YXRlUHJvcDtcblxuXHRcdC8vIFN0b3JlIGlkXG5cdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2lkJywge1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5pZFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVnaXN0ZXIgYWN0aW9uIGNhbGxiYWNrcyBpbiB0aGUgc3RvcmVcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRfY2FsbGJhY2tzOiB7XG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB7fVxuXHRcdFx0fSxcblx0XHRcdGFkZEFjdGlvbkNhbGxiYWNrczoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2xia3MpIHtcblx0XHRcdFx0XHRmb3IgKGFjdGlvblR5cGUgaW4gY2xia3MpIHtcblx0XHRcdFx0XHRcdG1lLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0gPSBjbGJrc1thY3Rpb25UeXBlXS5iaW5kKHRoaXMsIHN0b3JlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGxiYWNrIGZvciByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxuXHRcdFx0Y2FsbGJhY2s6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgYWN0aW9uVHlwZSA9IGFyZ3VtZW50c1swXSxcblx0XHRcdFx0XHQgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0pIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBjYWxsYmFja3MgYXJlIGFscmVhZHkgYm91bmQgdG8gdGhpcyB4U3RvcmUgYW5kIHRoZSBtdXRhYmxlIHN0b3JlXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQWN0aW9uQ2FsbGJhY2tzKG9wdHMuYWN0aW9uQ2FsbGJhY2tzIHx8IHt9KTtcblxuXHRcdC8vIENyZWF0ZSBpbm1tdXRhYmxlIHByb3BlcnRpZXNcblx0XHR2YXIgYWRkUHJvcGVydHkgPSBmdW5jdGlvbiBhZGRQcm9wZXJ0eShwcm9wTmFtZSwgdmFsdWUpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZSwgcHJvcE5hbWUsIHtcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0b3JlLmdldChwcm9wTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRpZiAob3B0cy5pbml0aWFsU3RhdGUpIHtcblx0XHRcdGZvciAoc3RhdGVQcm9wIGluIG9wdHMuaW5pdGlhbFN0YXRlKSB7XG5cdFx0XHRcdGFkZFByb3BlcnR5KHN0YXRlUHJvcCwgb3B0cy5pbml0aWFsU3RhdGVbc3RhdGVQcm9wXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRW1pdCBvbiBzdG9yZSBjaGFuZ2Vcblx0XHRzdG9yZS5vbignY2hhbmdlJywgZnVuY3Rpb24gKHVwZGF0ZXMpIHtcblx0XHRcdHZhciB1cGRhdGVzTGVuZ3RoID0gdXBkYXRlcy5sZW5ndGgsXG5cdFx0XHQgICAgdXBkYXRlLFxuXHRcdFx0ICAgIGk7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB1cGRhdGVzTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dXBkYXRlID0gdXBkYXRlc1tpXTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgcHJvcGVydHkgaXMgbmV3LCBhZGQgaXQgdG8gdGhlIHhTdG9yZVxuXHRcdFx0XHRpZiAoIW1lLmhhc093blByb3BlcnR5KHVwZGF0ZS5wcm9wKSkgYWRkUHJvcGVydHkodXBkYXRlLnByb3AsIHVwZGF0ZS52YWx1ZSk7XG5cblx0XHRcdFx0bWUuZW1pdCgnY2hhbmdlOicgKyB1cGRhdGUucHJvcCwgdXBkYXRlLnZhbHVlLCB1cGRhdGUucHJldmlvdXNWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdG1lLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGdldFN0YXRlOiBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcblx0XHQvLyBDbG9uZSB0aGUgc3RvcmUgcHJvcGVydGllc1xuXHRcdHJldHVybiB4VXRpbHMuX2V4dGVuZCh7fSwgdGhpcyk7XG5cdH0sXG5cblx0d2FpdEZvcjogZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcblx0XHQvLyBUaGUgeERpc3BhdGNoZXIgYWRkcyBpdHNlbGYgYXMgYSBwcm9wZXJ0eVxuXHRcdC8vIHdoZW4gdGhlIHhTdG9yZSBpcyByZWdpc3RlcmVkXG5cdFx0cmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIud2FpdEZvcihpZHMpO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvc3JjL3hTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgWEVtaXR0ZXIgPSBmdW5jdGlvbiBYRW1pdHRlcigpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZXZlbnRzJywge1xuXHRcdHZhbHVlOiB7fVxuXHR9KTtcblxuXHRpZiAodHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSAnZnVuY3Rpb24nKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbi8vIFRoZSBwcm90b3R5cGUgbWV0aG9kcyBhcmUgc3RvcmVkIGluIGEgZGlmZmVyZW50IG9iamVjdFxuLy8gYW5kIGFwcGxpZWQgYXMgbm9uIGVudW1lcmFibGUgcHJvcGVydGllcyBsYXRlclxudmFyIGVtaXR0ZXJQcm90b3R5cGUgPSB7XG5cdG9uOiBmdW5jdGlvbiBvbihldmVudE5hbWUsIGxpc3RlbmVyLCBvbmNlKSB7XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuXG5cdFx0bGlzdGVuZXJzLnB1c2goeyBjYWxsYmFjazogbGlzdGVuZXIsIG9uY2U6IG9uY2UgfSk7XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnM7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRvbmNlOiBmdW5jdGlvbiBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHR0aGlzLm9uKGV2ZW50TmFtZSwgbGlzdGVuZXIsIHRydWUpO1xuXHR9LFxuXG5cdG9mZjogZnVuY3Rpb24gb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbGlzdGVuZXIgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gbGlzdGVuZXIpIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUpIHtcblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcblx0XHQgICAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sXG5cdFx0ICAgIG9uY2VMaXN0ZW5lcnMgPSBbXSxcblx0XHQgICAgaSxcblx0XHQgICAgbGlzdGVuZXI7XG5cblx0XHQvLyBDYWxsIGxpc3RlbmVyc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuXG5cdFx0XHRpZiAobGlzdGVuZXIuY2FsbGJhY2spIGxpc3RlbmVyLmNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO2Vsc2Uge1xuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBub3QgYSBjYWxsYmFjaywgcmVtb3ZlIVxuXHRcdFx0XHRsaXN0ZW5lci5vbmNlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGxpc3RlbmVyLm9uY2UpIG9uY2VMaXN0ZW5lcnMucHVzaChpKTtcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgbGlzdGVuZXJzIG1hcmtlZCBhcyBvbmNlXG5cdFx0Zm9yIChpID0gb25jZUxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0bGlzdGVuZXJzLnNwbGljZShvbmNlTGlzdGVuZXJzW2ldLCAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuLy8gRXZlbnRFbWl0dGVyIG1ldGhvZHNcbnhVdGlscy5fZXh0ZW5kKGVtaXR0ZXJQcm90b3R5cGUsIHtcblx0YWRkTGlzdGVuZXI6IGVtaXR0ZXJQcm90b3R5cGUub24sXG5cdHJlbW92ZUxpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9mZixcblx0cmVtb3ZlQWxsTGlzdGVuZXJzOiBlbWl0dGVyUHJvdG90eXBlLm9mZixcblx0ZW1pdDogZW1pdHRlclByb3RvdHlwZS50cmlnZ2VyXG59KTtcblxuLy8gTWV0aG9kcyBhcmUgbm90IGVudW1lcmFibGUgc28sIHdoZW4gdGhlIHN0b3JlcyBhcmVcbi8vIGV4dGVuZGVkIHdpdGggdGhlIGVtaXR0ZXIsIHRoZXkgY2FuIGJlIGl0ZXJhdGVkIGFzXG4vLyBoYXNobWFwc1xuWEVtaXR0ZXIucHJvdG90eXBlID0ge307XG5mb3IgKHZhciBtZXRob2QgaW4gZW1pdHRlclByb3RvdHlwZSkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIucHJvdG90eXBlLCBtZXRob2QsIHtcblx0XHR2YWx1ZTogZW1pdHRlclByb3RvdHlwZVttZXRob2RdXG5cdH0pO1xufVxuXG4vLyBFeHRlbmQgbWV0aG9kIGZvciAnaW5oZXJpdGFuY2UnLCBub2QgdG8gYmFja2JvbmUuanNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShYRW1pdHRlciwgJ19leHRlbmQnLCB7XG5cdHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwcm90b1Byb3BzKSB7XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMsXG5cdFx0ICAgIGNoaWxkO1xuXG5cdFx0aWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eShjb25zdHJ1Y3RvcikpIHtcblx0XHRcdGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3Rvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQgPSBmdW5jdGlvbiBjaGlsZCgpIHtcblx0XHRcdFx0cmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR4VXRpbHMuX2V4dGVuZChjaGlsZCwgcGFyZW50KTtcblxuXHRcdHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbiBTdXJyb2dhdGUoKSB7XG5cdFx0XHQvLyBBZ2FpbiB0aGUgY29uc3RydWN0b3IgaXMgYWxzbyBkZWZpbmVkIGFzIG5vdCBlbnVtZXJhYmxlXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnN0cnVjdG9yJywge1xuXHRcdFx0XHR2YWx1ZTogY2hpbGRcblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0U3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG5cdFx0Y2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG5cdFx0Ly8gQWxsIHRoZSBleHRlbmRpbmcgbWV0aG9kcyBuZWVkIHRvIGJlIGFsc29cblx0XHQvLyBub24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG5cdFx0aWYgKHByb3RvUHJvcHMpIHtcblx0XHRcdGZvciAodmFyIHAgaW4gcHJvdG9Qcm9wcykge1xuXHRcdFx0XHRpZiAocCAhPSAnY29uc3RydWN0b3InKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLnByb3RvdHlwZSwgcCwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHByb3RvUHJvcHNbcF1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhFbWl0dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbnZhciB4VXRpbHMgPSB7XG5cdC8vIE9iamVjdCBleHRlbmQsIE5vZCB0byB1bmRlcnNjb3JlLmpzXG5cdF9leHRlbmQ6IGZ1bmN0aW9uIF9leHRlbmQob2JqKSB7XG5cdFx0dmFyIHNvdXJjZSwgcHJvcDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRmb3IgKHByb3AgaW4gc291cmNlKSB7XG5cdFx0XHRcdG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IHhVdGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveFV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxuY29uc3QgbW9kYWxQYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIm1vZGFsUGFnZVwiLFxyXG4gICAgaGFuZGxlQnRuQ2xpY2s6IGZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VCdG5DbGljayhidG5FdmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG1vZGFsUGFnZU5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzOiBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBoaWRlQnRuT2sgPSAgdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuT2snKSA9PSAtMSA/IGZhbHNlOiB0cnVlLCAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60L7QuSDQntC6XHJcbiAgICAgICAgICAgIGhpZGVCdG5DYW5jZWwgPSAgdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuQ2FuY2VsJykgPT0gLTEgPyBmYWxzZTogdHJ1ZTsgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0LkgQ2FuY2VsXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJoZWFkZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7aWQ6IFwiaGVhZGVyTmFtZVwifSwgXCIgXCIsIHRoaXMucHJvcHMubW9kYWxQYWdlTmFtZSwgXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQ29udGVudFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQnV0dG9uc1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5PayA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsJ09rJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5Pa1wifSwgXCIgT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5DYW5jZWwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzLCdDYW5jZWwnKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibW9kYWxQYWdlQnV0dG9uc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImJ0bkNhbmNlbFwifSwgXCIgQ2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsUGFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlLmpzeFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9
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
/******/ 		8:0
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

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"arv","1":"doc","2":"docs","3":"journal","4":"smk","5":"sorder","6":"vmk","7":"vorder"}[chunkId]||chunkId) + ".js";
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
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XDispatcher = __webpack_require__(5),
	    XStore = __webpack_require__(6);

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XEmitter = __webpack_require__(7),
	    xUtils = __webpack_require__(8);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var xUtils = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    PageLabel = __webpack_require__(10),
	    styles = __webpack_require__(12);

	var ____Class7=React.PureComponent;for(var ____Class7____Key in ____Class7){if(____Class7.hasOwnProperty(____Class7____Key)){Form[____Class7____Key]=____Class7[____Class7____Key];}}var ____SuperProtoOf____Class7=____Class7===null?null:____Class7.prototype;Form.prototype=Object.create(____SuperProtoOf____Class7);Form.prototype.constructor=Form;Form.__superConstructor__=____Class7;
	    function Form(props) {"use strict";
	        ____Class7.call(this,props);
	        this.state = {
	            pages: this.props.pages
	        };
	        this.handlePageClick = this.handlePageClick.bind(this);

	    }

	    Object.defineProperty(Form.prototype,"handlePageClick",{writable:true,configurable:true,value:function(page) {"use strict";

	        if (this.props.handlePageClick) {
	            this.props.handlePageClick(page);
	        }
	    }});

	    Object.defineProperty(Form.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let pages = this.state.pages;

	        return (
	            React.createElement("div", null, 
	                pages.map(function(page, idx)  {
	                        return React.createElement(PageLabel, {
	                            key: idx, 
	                            active: idx == 0 ? true: false, 
	                            handlePageClick: this.handlePageClick, 
	                            page: page, 
	                            disabled: this.props.disabled, 
	                            ref: 'page-' + idx})
	                    }.bind(this)
	                ), 
	                React.createElement("div", {style: styles.page}, 
	                        this.props.children
	                )
	            )
	        )
	    }});

	;


	Form.PropTypes = {
	    pages: React.PropTypes.object.isRequired,
	    handlePageClick: React.PropTypes.func,
	    disabled: React.PropTypes.bool
	}


	Form.defaultProps = {
	    disabled: false
	}

	module.exports = Form;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    styles = __webpack_require__(11);

	var ____Classt=React.PureComponent;for(var ____Classt____Key in ____Classt){if(____Classt.hasOwnProperty(____Classt____Key)){PageLabel[____Classt____Key]=____Classt[____Classt____Key];}}var ____SuperProtoOf____Classt=____Classt===null?null:____Classt.prototype;PageLabel.prototype=Object.create(____SuperProtoOf____Classt);PageLabel.prototype.constructor=PageLabel;PageLabel.__superConstructor__=____Classt;
	    function PageLabel(props) {
	        ____Classt.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }

	        this.handleClick = this.handleClick.bind(this);

	    }

	    Object.defineProperty(PageLabel.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled});
	    }});


	    Object.defineProperty(PageLabel.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        // обработчик на событие клик, подгружаем связанный документ

	        if (this.state.disabled) {
	            return;
	        }

	        let page = this.props.page;

	        if (this.props.handlePageClick) {
	            this.props.handlePageClick(page);
	        }
	    }});


	    Object.defineProperty(PageLabel.prototype,"render",{writable:true,configurable:true,value:function() {
	        let page = this.props.page,
	            style = Object.assign({},styles.pageLabel, this.props.active  ? {backgroundColor:'white'}: {})

	        return React.createElement("label", {style: style, 
	                      disabled: this.state.disabled, 
	                      ref: "pageLabel", 
	                      onClick: this.handleClick}, 
	            page.pageName
	        )
	    }});



	PageLabel.PropTypes = {
	    handlePageClick: React.PropTypes.func,
	    page: React.PropTypes.object.isRequired,
	    disabled: React.PropTypes.bool,
	    active: React.PropTypes.bool
	};


	PageLabel.defaultProps = {
	    disabled: false,
	    active: true
	}


	module.exports = PageLabel;

/***/ },
/* 11 */
/***/ function(module, exports) {

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

/***/ },
/* 12 */
/***/ function(module, exports) {

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(14);

	var ____Class8=React.PureComponent;for(var ____Class8____Key in ____Class8){if(____Class8.hasOwnProperty(____Class8____Key)){Input[____Class8____Key]=____Class8[____Class8____Key];}}var ____SuperProtoOf____Class8=____Class8===null?null:____Class8.prototype;Input.prototype=Object.create(____SuperProtoOf____Class8);Input.prototype.constructor=Input;Input.__superConstructor__=____Class8;
	    function Input(props) {"use strict";
	        ____Class8.call(this,props);
	        this.state = {
	            value: props.value,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value, readOnly:nextProps.readOnly})
	    }});

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        console.log('onChange', e.target);
	        let fieldValue = e.target.value;
	        this.setState({value: fieldValue});


	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let inputPlaceHolder = this.props.placeholder || this.props.title,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	            React.createElement("div", {style: styles.wrapper}, 
	                React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                    this.props.title
	                ), 
	                    React.createElement("input", {type: "text", 
	                           id: this.props.name, 
	                           ref: "input", 
	                           style: inputStyle, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: this.state.readOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           onChange: this.onChange, 
	                           disabled: this.props.disabled}
	                    )

	            ))
	    }});


	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    pattern: React.PropTypes.string,
	    title: React.PropTypes.string
	}


	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    title: ''
	}

	module.exports = Input;

/***/ },
/* 14 */
/***/ function(module, exports) {

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    styles = __webpack_require__(16);

	var ____Class9=React.PureComponent;for(var ____Class9____Key in ____Class9){if(____Class9.hasOwnProperty(____Class9____Key)){InputDate[____Class9____Key]=____Class9[____Class9____Key];}}var ____SuperProtoOf____Class9=____Class9===null?null:____Class9.prototype;InputDate.prototype=Object.create(____SuperProtoOf____Class9);InputDate.prototype.constructor=InputDate;InputDate.__superConstructor__=____Class9;

	    function InputDate(props) {
	        ____Class9.call(this,props);
	        this.state = {
	            value: this.props.value,
	            readOnly: this.props.readOnly
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    Object.defineProperty(InputDate.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
	    }});

	    Object.defineProperty(InputDate.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	        let fieldValue = e.target.value,
	            validation = this.validate(fieldValue);

	        if (fieldValue == null) {
	            // если значение нул, то пусть будет nul
	            validation = true;
	        }

	        if (validation) {
	            this.setState({value: fieldValue});

	            if (this.props.onChange) {
	                // если задан обработчик, вернем его
	                this.props.onChange(this.props.name, fieldValue);
	            }
	        }

	    }});

	    Object.defineProperty(InputDate.prototype,"render",{writable:true,configurable:true,value:function() {
	        let inputPlaceHolder = this.props.placeholder || this.props.title,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	        React.createElement("div", {style: styles.wrapper}, 
	            React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                this.props.title
	            ), 

	            React.createElement("input", {type: "date", 
	                   name: this.props.name, 
	                   ref: "input", 
	                   value: this.state.value, 
	                   readOnly: this.state.readOnly, 
	                   title: this.props.title, 
	                   pattern: this.props.pattern, 
	                   placeholder: inputPlaceHolder, 
	                   min: this.props.min, 
	                   max: this.props.max, 
	                   onChange: this.onChange, 
	                   disabled: this.props.disabled}
	            )
	        ))
	    }});

	    Object.defineProperty(InputDate.prototype,"validate",{writable:true,configurable:true,value:function(value) {
	        let result = true;

	        // проверка на мин , мах
	        if (this.props.min && this.props.max && value) {
	            let dateValue = new Date(value);
	            result = (dateValue > this.props.min && dateValue < this.props.max);
	        }

	        return result;
	    }});



	InputDate.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.objectOf(Date),
	    min: React.PropTypes.objectOf(Date),
	    max: React.PropTypes.objectOf(Date),
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    pattern: React.PropTypes.string,
	    width: React.PropTypes.string,
	    title: React.PropTypes.string,
	    placeholder: React.PropTypes.string

	}


	InputDate.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    title: ''
	}


	module.exports = InputDate;

/***/ },
/* 16 */
/***/ function(module, exports) {

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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(18);

	var ____Classa=React.PureComponent;for(var ____Classa____Key in ____Classa){if(____Classa.hasOwnProperty(____Classa____Key)){Input[____Classa____Key]=____Classa[____Classa____Key];}}var ____SuperProtoOf____Classa=____Classa===null?null:____Classa.prototype;Input.prototype=Object.create(____SuperProtoOf____Classa);Input.prototype.constructor=Input;Input.__superConstructor__=____Classa;
	    function Input(props) {"use strict";
	        ____Classa.call(this,props);
	        this.state = {
	            value: props.value,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value, readOnly:nextProps.readOnly})
	    }});

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;
	        this.setState({value: fieldValue});


	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            ),
	            inputMinValue = this.props.min,
	            inputMaxValue = this.props.max;


	        return (
	            React.createElement("div", {style: styles.wrapper}, 
	                React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                    this.props.title
	                ), 
	                React.createElement("input", {type: "number", 
	                       id: this.props.name, 
	                       ref: "input", 
	                       style: inputStyle, 
	                       name: this.props.name, 
	                       value: this.state.value, 
	                       readOnly: this.state.readOnly, 
	                       title: this.props.title, 
	                       pattern: "\\d+(\\.\\d{2})?", 
	                       placeholder: inputPlaceHolder, 
	                       onChange: this.onChange, 
	                       min: inputMinValue, 
	                       max: inputMaxValue, 
	                       step: "0.01", 

	                       disabled: this.props.disabled}
	                )

	            ))
	    }});


	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    pattern: React.PropTypes.string,
	    title: React.PropTypes.string,
	    min: React.PropTypes.number,
	    max: React.PropTypes.number
	}


	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    min: -999999999,
	    max: 999999999
	}

	module.exports = Input;

/***/ },
/* 18 */
/***/ function(module, exports) {

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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    InputText = __webpack_require__(13),
	    InputDateTime = __webpack_require__(20),
	    DocList = __webpack_require__(21),
	    styles = __webpack_require__(22);

	var ____Classb=React.PureComponent;for(var ____Classb____Key in ____Classb){if(____Classb.hasOwnProperty(____Classb____Key)){DocCommon[____Classb____Key]=____Classb[____Classb____Key];}}var ____SuperProtoOf____Classb=____Classb===null?null:____Classb.prototype;DocCommon.prototype=Object.create(____SuperProtoOf____Classb);DocCommon.prototype.constructor=DocCommon;DocCommon.__superConstructor__=____Classb;
	    function DocCommon(props) {"use strict";
	        ____Classb.call(this,props);
	        this.state = {
	            readOnly: props.readOnly,
	            data: this.props.data
	        }
	    }

	    Object.defineProperty(DocCommon.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        // при изменении, поменяет состояние (передаст дальше режим редактирования)
	        this.setState({readOnly:nextProps.readOnly })
	    }});

	    Object.defineProperty(DocCommon.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
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
	        let data = this.state.data;

	        return (
	            React.createElement("div", {ref: "wrapper", style: styles.wrapper}, 
	                            React.createElement(InputText, {ref: "id", 
	                                       title: "Id", 
	                                       name: "id", 
	                                       value: data.id, 
	                                       disabled: "true", 
	                                       width: "75%"}), 
	                            React.createElement(InputText, {ref: "created", 
	                                       title: "Created", 
	                                       name: "created", 
	                                       value: data.created, 
	                                       disabled: "true", width: "75%"}), 
	                            React.createElement(InputText, {ref: "lastupdate", 
	                                       title: "Updated", 
	                                       name: "lastupdate", 
	                                       value: data.lastupdate, 
	                                       disabled: "true", width: "75%"}), 
	                            React.createElement(InputText, {ref: "status", 
	                                       title: "Status", 
	                                       name: "status", 
	                                       value: data.status, 
	                                       disabled: "true", 
	                                       width: "75%"})
	            )
	        );
	    }});

	    Object.defineProperty(DocCommon.prototype,"onChangeHandler",{writable:true,configurable:true,value:function(inputName, inputValue) {"use strict";
	        // обработчик изменений
	        let data = flux.stores.docStore.data;
	        data[inputName] = inputValue;
	        // задать новое значение поля
	        flux.doAction('dataChange', data);
	    }});


	DocCommon.PropTypes = {
	    readOnly: React.PropTypes.bool,
	    data: React.PropTypes.object.isRequired
	}

	DocCommon.defaultProps = {
	    readOnly: true
	}

	module.exports = DocCommon;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const InputDateTime = React.createClass({displayName: "InputDateTime",
	    getInitialState: function() {
	        return {value: this.props.value, readOnly: true, disabled: this.props.disabled || true};
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;
	//        console.log('componentWillMount' + this.props.name);
	/*
	        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // отслеживаем создание нового документа
	                var data = flux.stores.docStore.data,
	                    value = data[self.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    self.setState({value:0});
	                } else {
	                    self.setState({value:value});
	                }
	            }
	        });
	*/

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	 //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue});
	            }
	        });

	        flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	            if (newValue !== previousValue) {

	                var data = newValue,
	                    fieldValue = data[self.props.name];

	                self.setState({value: fieldValue});
	            }
	        });
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть
	        var returnvalue = (nextState.value !== this.state.value ||
	        nextState.readOnly !== this.state.readOnly ||
	        nextState.disabled !== this.state.disabled);

	 //       console.log('vastus:' + returnvalue);
	        return returnvalue;

	    },

	    onChange: function(e) {
	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data;

	        this.setState({value: fieldValue});
	        data[this.props.name] = fieldValue;

	        // задать новое значение поля
	        flux.doAction('dataChange', data);
	    },

	    render: function() {
	        console.log('props:' + JSON.stringify(this.props));
	        var inputClassName =this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name;

	         if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }

	        if (inputDisabled == 'true') {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", null, this.props.title), 
	                    React.createElement("input", {type: "datetime-local", 
	                              className: inputClassName, 
	                              name: this.props.name, 
	                              value: this.state.value, 
	                              readOnly: inputReadOnly, 
	                              title: this.props.title, 
	                              pattern: this.props.pattern, 
	                              placeholder: inputPlaceHolder, 
	                              onChange: this.onChange, 
	                              disabled: true}
	                    )
	                ))
	        } else {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", null, this.props.title), 
	                    React.createElement("input", {type: "datetime-local", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           onChange: this.onChange}
	                    )
	                ))
	        }
	    }
	});

	module.exports = InputDateTime;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),

	    List = React.createClass({displayName: "List",
	        getInitialState: function () {
	            return {
	                readOnly: this.props.readOnly,
	                disabled: this.props.disabled,
	                data: this.props.data,
	                clicked: 0
	            }
	        },

	        getDefaultProps: function () {
	            return {
	                readOnly: true,
	                data: [],
	                disabled: false,
	                title: '',
	                name: 'My default List',
	                className: ''
	            }
	        },

	        /*  componentWillMount: ()=> {
	         // создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	         let self = this;

	         flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	         if (newValue !== previousValue) {
	         var data = flux.stores.docStore.data,
	         value = data[self.props.name];
	         if (newValue == 0) {
	         // совый документ
	         self.setState({value: 0});
	         } else {
	         self.setState({value: value});
	         }
	         }
	         });

	         flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	         if (newValue !== previousValue) {
	         self.setState({readOnly: !newValue, disabled: !newValue});
	         }
	         });

	         flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	         var vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	         // will watch libs change (from server)
	         var data = newValue.filter(function (item) {
	         if (item.id === self.props.libs) {
	         return item;
	         }
	         });

	         if (data && data.length > 0) {
	         self.setState({data: data[0].data});
	         }
	         });
	         },
	         */

	        handleLiClick: function (index) {
	            this.setState({
	                clicked: index
	            });
	        },


	        handleClickBtnDeleteExecutor: function (index) {
	            let data = this.state.data;
	            console.log('list btn delete', index);
	        },

	        handleClickBtnAddExecutor: function (index) {
	            let data = this.state.data;
	            console.log('list btn add', index);

	        },

	        componentWillReceiveProps: function(nextProps) {
	            // при изменении срежима редактирования, поменяет состояние виджета
	            this.setState({readOnly:nextProps.readOnly })
	        },

	        render: function () {

	            let data = this.state.data || [],
	                inputClassName = this.props.className || 'doc-input form-widget',
	                inputReadOnly = this.state.readOnly || false,
	                inputPlaceHolder = this.props.placeholder || this.props.name,
	                Options = null;

	            // создадим список значений
	            if (data.length) {
	                Options = data.map(function (item, index) {
	                    let className = this.props.className;

	                    if (typeof item == 'array') {
	                        item = item[0];
	                    }

	                    if (this.state.index == index && !this.state.readOnly ) {
	                        // выделим в списке значение, при условии, что режим редактирования это позволяет
	                        className = className + ' focused';
	                    }
	                    return (
	                        React.createElement("li", {
	                            key: Math.random(), 
	                            className: className, 
	                            onClick: this.handleLiClick.bind(this, index)
	                        }, item.name
	                        )
	                    )
	                }, this);
	            }

	            let widget = React.createElement("ul", {
	                name: this.props.name, 
	                style: {width: '100%', height: '100%'}}, 
	                Options
	            );


	            return React.createElement("div", {className: "form-widget"}, 
	                React.createElement("div", {style: {display: "flex"}}, 
	                    React.createElement("label", {style: {paddingRight: "5px"}}, " ", this.props.title), 
	                    this.state.readOnly ? null : React.createElement("input", {type: "button", value: " Add ", onClick: this.handleClickBtnAddExecutor}), 
	                    this.state.readOnly ? null : React.createElement("input", {type: "button", value: " Delete ", onClick: this.handleClickBtnDeleteExecutor})
	                ), 
	                widget
	            )
	        }

	    });

	module.exports = List;


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'flex',
	        flexDirection: 'row',
	        width: '100%',
	        justifyContent: 'flex-start'
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    styles = __webpack_require__(24);

	//    InputText = require('./doc-input-text.jsx');

	var ____Classl=React.PureComponent;for(var ____Classl____Key in ____Classl){if(____Classl.hasOwnProperty(____Classl____Key)){Select[____Classl____Key]=____Classl[____Classl____Key];}}var ____SuperProtoOf____Classl=____Classl===null?null:____Classl.prototype;Select.prototype=Object.create(____SuperProtoOf____Classl);Select.prototype.constructor=Select;Select.__superConstructor__=____Classl;
	    function Select(props) {
	        ____Classl.call(this,props);
	        this.state = {
	            value: props.value/* здесь по значению ИД */,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            data: props.data,
	            fieldValue: props.value /*здесь по значени поля collId */,
	            btnDelete: props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/
	        };
	        this.onChange = this.onChange.bind(this);
	        this.btnDelClick = this.btnDelClick.bind(this);

	    }

	    Object.defineProperty(Select.prototype,"findFieldValue",{writable:true,configurable:true,value:function(data, collId, value) {
	        // привяжет к значеню поля
	        // надо привязать данные
	        data.forEach(function(row)  {
	            if (row[collId] == value) {
	                this.setState({value: row[collId], fieldValue: row[collId]});
	                return;
	            }
	        }.bind(this), this);

	    }});

	    Object.defineProperty(Select.prototype,"getValueById",{writable:true,configurable:true,value:function(collId, rowId) {
	        // вернет значения поля по выбранному ИД

	        let fieldValue,
	            data = this.state.data;

	        data.forEach(function(row)  {
	            if (row[collId] == rowId) {
	                fieldValue = row[collId];
	                this.setState({fieldValue: fieldValue});
	                return;
	            }
	        }.bind(this), this);

	        return fieldValue;
	    }});

	    Object.defineProperty(Select.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({
	            value: nextProps.value,
	            readOnly: nextProps.readOnly, data: nextProps.data
	        });
	    }});

	    Object.defineProperty(Select.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        if (this.props.collId && this.props.collId !== 'id') {
	            // ищем ИД по значению поля
	            this.findFieldValue(this.state.data, this.props.collId, this.props.value);
	        }
	    }});

	    Object.defineProperty(Select.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	        let fieldValue = e.target.value;

	        if (fieldValue == '') {
	            fieldValue = null;
	        }

	        if (this.props.collId) {
	            // найдем по ид значение поля в collId
	            fieldValue = this.getValueById(this.props.collId, fieldValue);
	        }
	        // сохраним ид как value
	        this.setState({value: e.target.value, fieldValue: fieldValue});

	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(this.props.name, fieldValue); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }

	    }});

	/*
	    shouldComponentUpdate(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }
	*/

	    Object.defineProperty(Select.prototype,"render",{writable:true,configurable:true,value:function() {
	        let dataOptions = this.state.data || [],
	            inputClassName = this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputPlaceHolder = this.props.placeholder || this.props.title,
	            Options = null,
	            inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

	        if (!this.state.value) { // добавим пустую строку в массив
	            // проверим наличие пустой строки в массиве

	            let emptyObj = dataOptions.filter(function(obj)  {
	                if (obj.id === 0) {
	                    return obj;
	                }
	            });

	            if (!emptyObj || emptyObj.length == 0) {
	                dataOptions.splice(0, 0, {id: 0, kood: '', name: ''});
	            }
	        }


	        let dataValue = dataOptions.filter(function(item)  {
	            if (item[this.props.collId] === this.state.value) {
	                return item;
	            }
	        }.bind(this), this);

	        if (dataOptions.length) {
	            Options = dataOptions.map(function(item, index)  {

	                if (typeof item == 'array') {
	                    item = item[0];
	                }
	                let key = 'option-' + index;
	                return React.createElement("option", {value: item[this.props.collId], key: key, ref: key}, " ", item.name, " ")
	            }.bind(this), this);
	            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	        } else {
	            Options = React.createElement("option", {value: 0, key: Math.random()}, " Empty ")
	        }

	        let inputStyle = Object.assign({}, styles.input, inputReadOnly ? {} : styles.hide,
	            inputReadOnly ? styles.readOnly: {}),
	            selectStyle = Object.assign({}, styles.select, inputReadOnly ? styles.hide : {}, inputReadOnly ? styles.readOnly: {}),
	            buttonStyle = Object.assign({}, styles.button, this.props.btnDelete ? {} : styles.hide)

	        return (
	            React.createElement("div", {style: styles.wrapper, ref: "wrapper"}, 
	            React.createElement("label", {ref: "label", style: styles.label, 
	                   htmlFor: this.props.name}, this.props.title
	            ), 

	            React.createElement("input", {type: "text", id: this.props.name, 
	                   style: inputStyle, 
	                   ref: "input", 
	                   value: inputDefaultValue, 
	                   readOnly: true}), 

	            React.createElement("select", {ref: "select", 
	                    style: selectStyle, 
	                    value: this.state.value, 
	                    id: this.props.name, 
	                    onChange: this.onChange}, Options
	            ), 
	            React.createElement("button", {ref: "button", 
	                    style: buttonStyle, 
	                    onClick: this.btnDelClick}, 
	                "Delete"
	            )
	        ))
	    }});

	    Object.defineProperty(Select.prototype,"btnDelClick",{writable:true,configurable:true,value:function(event) {
	        // по вызову кнопку удалить, обнуляет значение
	        this.setState({value: ''});
	        this.onChange(event);
	    }});


	Select.PropTypes = {
	    data: React.PropTypes.array,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    btnDelete: React.PropTypes.bool,
	    libs:React.PropTypes.string,
	    collId: React.PropTypes.string,
	    title: React.PropTypes.string,
	    placeholder: React.PropTypes.string
	}

	Select.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    btnDelete: false,
	    value: 0,
	    collId: 'id',
	    title: ''
	}

	module.exports = Select;


/***/ },
/* 24 */
/***/ function(module, exports) {

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

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(26);

	var ____Classc=React.PureComponent;for(var ____Classc____Key in ____Classc){if(____Classc.hasOwnProperty(____Classc____Key)){Input[____Classc____Key]=____Classc[____Classc____Key];}}var ____SuperProtoOf____Classc=____Classc===null?null:____Classc.prototype;Input.prototype=Object.create(____SuperProtoOf____Classc);Input.prototype.constructor=Input;Input.__superConstructor__=____Classc;
	    function Input(props) {"use strict";
	        ____Classc.call(this,props);
	        this.state = {
	            value: this.props.value, readOnly: true, disabled: this.props.disabled || true
	        };

	        this.onChange = this.onChange.bind(this);

	    }

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;

	        this.setState({value: fieldValue});
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value})
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        const inputPlaceHolder = this.props.placeholder || this.props.title,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	            React.createElement("div", {style: styles.wrapper}, 

	                React.createElement("label", {htmlFor: this.props.name, ref: "label", 
	                       style: styles.label}, React.createElement("span", null, this.props.title)
	                ), 

	                React.createElement("textarea", {
	                    style: inputStyle, 
	                    ref: "input", 
	                    id: this.props.name, 
	                    name: this.props.name, 
	                    value: this.state.value, 
	                    readOnly: this.props.readOnly, 
	                    title: this.props.title, 
	                    placeholder: inputPlaceHolder, 
	                    onChange: this.onChange, 
	                    disabled: this.props.disabled}
	                )
	            ))
	    }});


	;

	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    title: React.PropTypes.string
	}

	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    title: ''
	}


	module.exports = Input;

/***/ },
/* 26 */
/***/ function(module, exports) {

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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(28),
	    keydown = __webpack_require__(29),
	    KEYS = [ 38, 40]; // мониторим только стрелки вверх и внизх

	const isExists = function(object, prop)  {
	    let result = false;
	    if (prop in object) {
	        result = true;
	    }
	    return result;
	}

	//@keydown @todo
	var ____Classd=React.PureComponent;for(var ____Classd____Key in ____Classd){if(____Classd.hasOwnProperty(____Classd____Key)){DataGrid[____Classd____Key]=____Classd[____Classd____Key];}}var ____SuperProtoOf____Classd=____Classd===null?null:____Classd.prototype;DataGrid.prototype=Object.create(____SuperProtoOf____Classd);DataGrid.prototype.constructor=DataGrid;DataGrid.__superConstructor__=____Classd;
	    function DataGrid(props) {
	        ____Classd.call(this,props);
	        this.state = {
	            gridColumns: this.props.gridColumns,
	            gridData: this.props.gridData,
	            activeRow: 0,
	            activeColumn: '',
	            sort: {
	                name: null,
	                direction: null
	            }
	        }
	        this.handleGridHeaderClick.bind(this);
	        this.handleCellDblClick.bind(this);
	        this.handleKeyDown.bind(this);
	        this.prepareTableRow = this.prepareTableRow.bind(this);

	    }

	    Object.defineProperty(DataGrid.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        // надем по по props.value индекс активной строки
	        if (this.props.value) {
	           let index = this.getGridRowIndexById(this.props.value);
	           this.setState({activeRow: index});
	        }
	   }});

	    Object.defineProperty(DataGrid.prototype,"getGridRowIndexById",{writable:true,configurable:true,value:function(docId) {
	        // ищем индех в массиве данных
	        let index = 0,
	            data = this.props.gridData;

	        if (docId) {
	            for (let i = 0; i < data.length; i++) {
	                let row = data[i];
	                if (row && data[i]['id'] == docId) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellClick",{writable:true,configurable:true,value:function(idx) {
	        // отрабатывает событи клика по ячейке
	        this.setState({
	            activeRow: idx
	        });

	        if (this.props.gridData.length > 0 && this.props.onChangeAction) {
	            let docId = this.props.gridData[idx].id;

	            if (this.props.onClick) {
	                this.props.onClick(this.props.onChangeAction, docId)
	            }

	        }

	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellDblClick",{writable:true,configurable:true,value:function(idx) {
	        // отметим активную строку и вызовен обработчик события dblClick
	        this.handleCellClick(idx)
	        if (this.props.onDblClick) {
	            this.props.onDblClick();
	        }
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleGridHeaderClick",{writable:true,configurable:true,value:function(name) {
	        let  sort = this.state.sort;
	        if (sort.name === name) {
	            sort.direction = sort.direction === 'asc' ? 'desc': 'asc';
	        } else {
	            sort = {
	                name: name,
	                direction: 'asc'
	            }
	        }

	        let sortBy = [{column: sort.name, direction: sort.direction}];

	        this.setState({
	            activeColumn:name,
	            sort: sort
	        });

	        if (this.props.onHeaderClick) {
	            this.props.onHeaderClick(sortBy);
	        }

	    }});

	    Object.defineProperty(DataGrid.prototype,"handleKeyDown",{writable:true,configurable:true,value:function(e) {
	        // реакция на клавиатуру
	        let rowIndex = this.state.activeRow;
	        switch (e.which) {
	            case 40:
	                // вниз, увеличим активную строку на + 1
	                rowIndex++;

	                if (this.state.gridData.length < rowIndex) {
	                    // вернем прежнее значение
	                    rowIndex = this.state.activeRow
	                }
	                break;
	            case 38:
	                // вниз, увеличим активную строку на - 1
	                rowIndex--;
	                rowIndex = rowIndex < 0 ? 0: rowIndex;
	                break;
	        }
	         this.setState({
	             activeRow: rowIndex
	         });
	    }});

	    Object.defineProperty(DataGrid.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({gridColumns: nextProps.gridColumns, gridData:nextProps.gridData})
	    }});

	    Object.defineProperty(DataGrid.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }});

	    Object.defineProperty(DataGrid.prototype,"render",{writable:true,configurable:true,value:function() {
	        let className = 'th';
	        /*
	         self = this;
	         onKeyDown: this.handleKeyPress('Down'),
	         onDoubleClick: this.handleCellDblClick(),
	         */

	        return (React.createElement("table", {ref: "dataGridTable"}, 
	                React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        this.prepareTableHeader()
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    this.prepareTableRow()
	                )
	            )
	        );

	    }}); // render

	    Object.defineProperty(DataGrid.prototype,"prepareTableRow",{writable:true,configurable:true,value:function() {
	        return this.state.gridData.map(function(row, rowIndex)  {
	            let setRowActive = {},
	                objectIndex = 'tr-' + rowIndex,
	                activeRow = this.state.activeRow;

	            let rowObject = (React.createElement("tr", {
	                ref: objectIndex, 
	                onClick: this.handleCellClick.bind(this, rowIndex), 
	                onDoubleClick: this.handleCellDblClick.bind(this, rowIndex), 
	                onKeyDown: this.handleKeyDown.bind(this), 
	                style: Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused: {}), 
	                key: objectIndex}, 
	                
	                    this.state.gridColumns.map(function(column, columnIndex)  {
	                        let cellIndex = 'td-' + rowIndex + '-' + columnIndex;

	                        let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                            width = isExists(column, 'width') ? column.width: '100%',
	                            style = Object.assign({}, styles.td, !display ? {display: 'none'} : {}, {width: width});

	                        return (
	                            React.createElement("td", {style: style, ref: cellIndex, key: cellIndex}, 
	                                row[column.id]
	                            )
	                        );
	                    })
	                

	            ));
	                return rowObject;
	        }.bind(this), this);
	    }});

	    Object.defineProperty(DataGrid.prototype,"prepareTableHeader",{writable:true,configurable:true,value:function() {
	        let gridColumns = this.props.gridColumns,
	            className = 'th';

	        return gridColumns.map(function(column, index)  {
	            let headerIndex = 'th-' + index;

	             let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                 width = isExists(column, 'width') ? column.width: '100%',
	                 style = Object.assign({}, styles.th, !display ? {display: 'none'} : {}, {width: width}),
	                 activeColumn = this.state.activeColumn,
	                 iconType = this.state.sort.direction,
	                 imageStyleAsc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'asc' )  ? {}: {display: 'none'}),
	                 imageStyleDesc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'desc' )  ? {}: {display: 'none'})

	            // установить видимость
	            return React.createElement("th", {
	                style: style, 
	                ref: headerIndex, 
	                key: headerIndex, 
	                onClick: this.handleGridHeaderClick.bind(this, column.id)}, 
	                React.createElement("span", null, column.name), 
	                React.createElement("image", {ref: "imageAsc", style: imageStyleAsc, src: styles.icons['asc']}), 
	                React.createElement("image", {ref: "imageDesc", style: imageStyleDesc, src: styles.icons['desc']})
	            )
	        }.bind(this), this);
	    }});


	DataGrid.propTypes = {
	    gridColumns: React.PropTypes.array.isRequired,
	    gridData: React.PropTypes.array.isRequired,
	    onChangeAction: React.PropTypes.string,
	    onClick: React.PropTypes.func,
	    onDblClick: React.PropTypes.func,
	    onHeaderClick: React.PropTypes.func,
	    activeRow: React.PropTypes.number
	}


	DataGrid.defaultProps = {
	    gridColumns: [],
	    gridData: []
	};

	module.exports = DataGrid;


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    th: {
	        borderBottom: '1px solid black',
	        backgroundColor: 'grey',
	        height: '50px',
	        border: '1px solid lightgray'
	    },

	    tr: {
	        backgroundColor: 'white'
	    },

	    focused: {
	        backgroundColor: 'lightblue'
	    },

	    td: {
	        border: '1px solid lightgray'
	    },

	    icons: {
	        asc: '/images/icons/sort-alpha-asc.png',
	        desc: '/images/icons/sort-alpha-desc.png'
	    },

	    image: {
	        margin: '1px'
	    }

	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// polyfill array.from (mainly for IE)
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) {
	  return obj && obj.__esModule ? obj['default'] : obj;
	}

	__webpack_require__(30);

	// @keydown and @keydownScoped

	var _decorators = __webpack_require__(31);

	exports['default'] = _interopRequire(_decorators);
	Object.defineProperty(exports, 'keydownScoped', {
	  enumerable: true,
	  get: function get() {
	    return _decorators.keydownScoped;
	  }
	});

	// setBinding - only useful if you're not going to use decorators

	var _store = __webpack_require__(33);

	Object.defineProperty(exports, 'setBinding', {
	  enumerable: true,
	  get: function get() {
	    return _store.setBinding;
	  }
	});

	// Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter

	var _libKeys = __webpack_require__(34);

	exports.Keys = _interopRequire(_libKeys);

/***/ },
/* 30 */
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
	'use strict';

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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module decorators
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _class_decorator = __webpack_require__(32);

	var _class_decorator2 = _interopRequireDefault(_class_decorator);

	var _method_decorator = __webpack_require__(41);

	var _method_decorator2 = _interopRequireDefault(_method_decorator);

	var _method_decorator_scoped = __webpack_require__(42);

	var _method_decorator_scoped2 = _interopRequireDefault(_method_decorator_scoped);

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
	  // (method decorators must have keycode arguments).
	  if (isArray || ~['string', 'number'].indexOf(typeof testArg === 'undefined' ? 'undefined' : _typeof(testArg))) {
	    var _ret = function () {
	      var keys = isArray ? testArg : args;

	      // return the decorator function, which on the next call will look for
	      // the presence of a method name to determine if this is a wrapped method
	      // or component
	      return {
	        v: function v(target, methodName, descriptor) {
	          return methodName ? methodFn({ target: target, descriptor: descriptor, keys: keys }) : (0, _class_decorator2['default'])(target, keys);
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object') return _ret.v;
	  } else {
	    var methodName = args[1];

	    // method decorators without keycode (which) arguments are not allowed.
	    if (!methodName) {
	      return _class_decorator2['default'].apply(undefined, args);
	    } else {
	      console.warn(methodName + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
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

	  return _decorator.apply(undefined, [_method_decorator_scoped2['default']].concat(args));
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

	  return _decorator.apply(undefined, [_method_decorator2['default']].concat(args));
	}

	exports['default'] = keydown;
	exports.keydownScoped = keydownScoped;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module componentWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
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
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x2, _x3, _x4) {
	  var _again = true;_function: while (_again) {
	    var object = _x2,
	        property = _x3,
	        receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(38);

	/**
	 * componentWrapper
	 *
	 * @access public
	 * @param {object} WrappedComponent React component class to be wrapped
	 * @param {array} [keys] The key(s) bound to the class
	 * @return {object} The higher-order function that wraps the decorated class
	 */
	function componentWrapper(WrappedComponent) {
	  var keys = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  var KeyBoardHelper = function (_React$Component) {
	    _inherits(KeyBoardHelper, _React$Component);

	    function KeyBoardHelper(props) {
	      _classCallCheck(this, KeyBoardHelper);

	      _get(Object.getPrototypeOf(KeyBoardHelper.prototype), 'constructor', this).call(this, props);
	      this.state = {
	        event: null
	      };
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
	        var _this = this;

	        // to simulate a keypress, set the event and then clear it in the callback
	        this.setState({ event: event }, function () {
	          return _this.setState({ event: null });
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, { keydown: this.state }));
	      }
	    }]);

	    return KeyBoardHelper;
	  }(_react2['default'].Component);

	  _store2['default'].setBinding({ keys: keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype });

	  return KeyBoardHelper;
	}

	exports['default'] = componentWrapper;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module store
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
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
	        if (!_n && _i['return']) _i['return']();
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
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();

	exports._resetStore = _resetStore;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libKeys = __webpack_require__(34);

	var _libMatch_keys = __webpack_require__(35);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(36);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

	var _libUuid = __webpack_require__(37);

	var _libUuid2 = _interopRequireDefault(_libUuid);

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
	      _instances['delete'](null);

	      // deleting and then adding the instance(s) has the effect of sorting the set
	      // according to instance activation (ascending)
	      instancesArray.forEach(function (instance) {
	        _instances['delete'](instance);
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
	    _instances['delete'](target);
	  },

	  findBindingForEvent: function findBindingForEvent(event) {
	    if (!_instances.has(null)) {
	      var keyMatchesEvent = function keyMatchesEvent(keySet) {
	        return (0, _libMatch_keys2['default'])({ keySet: keySet, event: event });
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
	              var _step2$value = _slicedToArray(_step2.value, 2);

	              var keySets = _step2$value[0];
	              var fn = _step2$value[1];

	              if ((0, _libKeys.allKeys)(keySets) || keySets.some(keyMatchesEvent)) {
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
	              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                _iterator2['return']();
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
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
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
	    var keys = _ref2.keys;
	    var fn = _ref2.fn;
	    var target = _ref2.target;

	    var keySets = keys ? (0, _libParse_keys2['default'])(keys) : (0, _libKeys.allKeys)();
	    var __reactKeydownUUID = target.__reactKeydownUUID;

	    if (!__reactKeydownUUID) {
	      target.__reactKeydownUUID = (0, _libUuid2['default'])();
	      _handlers.set(target.__reactKeydownUUID, new Map([[keySets, fn]]));
	    } else {
	      _handlers.get(__reactKeydownUUID).set(keySets, fn);
	    }
	  }
	};

	exports['default'] = Store;

/***/ },
/* 34 */
/***/ function(module, exports) {

	// TODO: Need better, more complete, and more methodical key definitions

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.allKeys = allKeys;
	var Keys = {
	  backspace: 8,
	  del: 46,
	  'delete': 46,
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

	var modifiers = {
	  control: 'ctrl',
	  ctrl: 'ctrl',
	  shift: 'shift',
	  meta: 'meta',
	  cmd: 'meta',
	  command: 'meta',
	  option: 'alt',
	  alt: 'alt'
	};

	exports.modifiers = modifiers;

	function allKeys(arg) {
	  return arg ? arg.constructor === Symbol || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' : Symbol('allKeys');
	}

	exports['default'] = Keys;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _keys = __webpack_require__(34);

	var modKeys = Object.keys(_keys.modifiers);

	function matchKeys(_ref) {
	  var _ref$keySet = _ref.keySet;
	  var key = _ref$keySet.key;
	  var _ref$keySet$modifiers = _ref$keySet.modifiers;
	  var modifiers = _ref$keySet$modifiers === undefined ? [] : _ref$keySet$modifiers;
	  var event = _ref.event;

	  var keysMatch = false;
	  if (key === event.which) {
	    (function () {
	      var evtModKeys = modKeys.filter(function (modKey) {
	        return event[modKey + 'Key'];
	      }).sort();
	      keysMatch = modifiers.length === evtModKeys.length && modifiers.every(function (modKey, index) {
	        return evtModKeys[index] === modKey;
	      });
	    })();
	  }
	  return keysMatch;
	}

	exports['default'] = matchKeys;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _keys = __webpack_require__(34);

	var _keys2 = _interopRequireDefault(_keys);

	function parseKeys(keysArray) {
	  return keysArray.map(function (key) {
	    var keySet = { key: key };
	    if (typeof key === 'string') {
	      var keyString = key.toLowerCase().trim();
	      var matches = keyString.split(/\s?\+\s?/);
	      keySet = matches.length === 1 ? { key: _keys2['default'][keyString] } : {
	        key: _keys2['default'][matches.pop()],
	        modifiers: matches.map(function (modKey) {
	          return _keys.modifiers[modKey];
	        }).sort()
	      };
	    }
	    return keySet;
	  });
	}

	exports['default'] = parseKeys;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports) {

	// Counter being incremented. JS is single-threaded, so it'll Just Work™.
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = uuid;
	var __counter = 1;

	/**
	 * Returns a process-wide unique identifier.
	 */

	function uuid() {
	  return "uid-" + __counter++;
	}

	module.exports = exports["default"];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable no-use-before-define */
	/**
	 * @module eventHandlers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports._onClick = _onClick;
	exports._onKeyDown = _onKeyDown;
	exports._shouldConsider = _shouldConsider;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libDom_helpers = __webpack_require__(39);

	var _libDom_helpers2 = _interopRequireDefault(_libDom_helpers);

	var _libListeners = __webpack_require__(40);

	var _libListeners2 = _interopRequireDefault(_libListeners);

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

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

	  _store2['default'].activate([].concat(_toConsumableArray(_store2['default'].getInstances())).reduce(_libDom_helpers2['default'].findContainerNodes(target), []).sort(_libDom_helpers2['default'].sortByDOMPosition).map(function (item) {
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
	  var forceConsider = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  if (forceConsider || _shouldConsider(event)) {
	    var _ref2 = _store2['default'].findBindingForEvent(event) || {};

	    var fn = _ref2.fn;
	    var instance = _ref2.instance;

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
	 * @param {string} event.target.tagName The name of the element tag
	 * @param {number} event.target.which The key pressed
	 * @return {boolean} Whether to continue procesing the keydown event
	 */

	function _shouldConsider(_ref3) {
	  var ctrlKey = _ref3.ctrlKey;
	  var tagName = _ref3.target.tagName;

	  return !~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName) || ctrlKey;
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
	  // have to bump this to next event loop because component mounting routinely
	  // preceeds the dom click event that triggered the mount (wtf?)
	  setTimeout(function () {
	    return _store2['default'].activate(instance);
	  }, 0);
	  _libListeners2['default'].bindKeys(_onKeyDown);
	  _libListeners2['default'].bindClicks(_onClick);
	  _libDom_helpers2['default'].bindFocusables(instance, _store2['default'].activate);
	}

	/**
	 * onUnmount
	 *
	 * @access public
	 */
	function onUnmount(instance) {
	  _store2['default'].deleteInstance(instance);
	  if (_store2['default'].isEmpty()) {
	    _libListeners2['default'].unbindClicks(_onClick);
	    _libListeners2['default'].unbindKeys(_onKeyDown);
	  }
	}

	exports.onMount = onMount;
	exports.onUnmount = onUnmount;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module domHelpers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

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
	function bindFocusables(instance, activateOnFocus) {
	  if (document.querySelectorAll) {
	    var node = _reactDom2['default'].findDOMNode(instance);
	    if (node) {
	      var focusables = node.querySelectorAll(focusableSelector);
	      if (focusables.length) {
	        (function () {
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
	        })();
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
	      var node = _reactDom2['default'].findDOMNode(instance);
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

	exports['default'] = { bindFocusables: bindFocusables, findContainerNodes: findContainerNodes, sortByDOMPosition: sortByDOMPosition };
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * @module Listeners
	 *
	 */

	// flag for whether click listener has been bound to document
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
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
	      document.addEventListener('click', callback);
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
	      document.removeEventListener('click', callback);
	      _clicksBound = false;
	    }
	  }
	};

	exports['default'] = Listeners;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(38);

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
	  var target = _ref.target;
	  var descriptor = _ref.descriptor;
	  var keys = _ref.keys;

	  var fn = descriptor.value;

	  // if we haven't already created a binding for this class (via another
	  // decorated method), wrap these lifecycle methods.
	  if (!_store2['default'].getBinding(target)) {
	    (function () {
	      var componentDidMount = target.componentDidMount;
	      var componentWillUnmount = target.componentWillUnmount;

	      target.componentDidMount = function () {
	        (0, _event_handlers.onMount)(this);
	        if (componentDidMount) return componentDidMount.call(this);
	      };

	      target.componentWillUnmount = function () {
	        (0, _event_handlers.onUnmount)(this);
	        if (componentWillUnmount) return componentWillUnmount.call(this);
	      };
	    })();
	  }

	  // add this binding of keys and method to the target's bindings
	  _store2['default'].setBinding({ keys: keys, target: target, fn: fn });

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

	exports['default'] = methodWrapper;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapperScoped
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _libMatch_keys = __webpack_require__(35);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(36);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

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
	function _shouldTrigger(_ref, keydownNext) {
	  var keydownThis = _ref.keydown;

	  return keydownNext && keydownNext.event && !keydownThis.event;
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
	function methodWrapperScoped(_ref2) {
	  var target = _ref2.target;
	  var descriptor = _ref2.descriptor;
	  var keys = _ref2.keys;
	  var componentWillReceiveProps = target.componentWillReceiveProps;

	  var fn = descriptor.value;
	  if (!keys) {
	    console.warn(fn + ': keydownScoped requires one or more keys');
	  } else {
	    (function () {
	      var keySets = (0, _libParse_keys2['default'])(keys);

	      // wrap the component's lifecycle method to intercept key codes coming down
	      // from the wrapped/scoped component up the view hierarchy. if new keydown
	      // event has arrived and the key codes match what was specified in the
	      // decorator, call the wrapped method.
	      target.componentWillReceiveProps = function (nextProps) {
	        var keydown = nextProps.keydown;

	        if (_shouldTrigger(this.props, keydown)) {
	          if (keySets.some(function (keySet) {
	            return (0, _libMatch_keys2['default'])({ keySet: keySet, event: keydown.event });
	          })) {
	            return fn.call(this, keydown.event);
	          }
	        }

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
	      };
	    })();
	  }

	  return descriptor;
	}

	exports['default'] = methodWrapperScoped;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'add';


	var ____Classh=React.PureComponent;for(var ____Classh____Key in ____Classh){if(____Classh.hasOwnProperty(____Classh____Key)){ButtonRegisterAdd[____Classh____Key]=____Classh[____Classh____Key];}}var ____SuperProtoOf____Classh=____Classh===null?null:____Classh.prototype;ButtonRegisterAdd.prototype=Object.create(____SuperProtoOf____Classh);ButtonRegisterAdd.prototype.constructor=ButtonRegisterAdd;ButtonRegisterAdd.__superConstructor__=____Classh;
	// кнопка создания документа в регистрах
	    function ButtonRegisterAdd(props) {
	        ____Classh.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterAdd.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('add');
	    }});

	    Object.defineProperty(ButtonRegisterAdd.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Add", 
	            ref: "btnAdd", 
	            style: styles.button, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterAdd.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterAdd.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterAdd;

/***/ },
/* 44 */
/***/ function(module, exports) {

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
	        execute: '/images/icons/execute.png'
	    }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44);


	var ____Classx=React.PureComponent;for(var ____Classx____Key in ____Classx){if(____Classx.hasOwnProperty(____Classx____Key)){Button[____Classx____Key]=____Classx[____Classx____Key];}}var ____SuperProtoOf____Classx=____Classx===null?null:____Classx.prototype;Button.prototype=Object.create(____SuperProtoOf____Classx);Button.prototype.constructor=Button;Button.__superConstructor__=____Classx;
	// кнопка создания документа в регистрах
	    function Button(props) {
	        ____Classx.call(this,props);
	        this.handleClick = this.handleClick.bind(this);
	        this.state = {
	            disabled: this.props.disabled
	        }
	    }

	    Object.defineProperty(Button.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        this.props.onClick();
	    }});

	    Object.defineProperty(Button.prototype,"render",{writable:true,configurable:true,value:function() {
	        // visibility
	        let propStyle  = ('style' in this.props)? this.props.style: {},
	            style = Object.assign({}, styles.button, {display: this.props.show ? 'inline' : 'none'}, propStyle)

	        return React.createElement("button", {
	            disabled: this.state.disabled, 
	            ref: "button", 
	            style: style, 
	            onClick: this.handleClick}, 
	            this.props.children, 
	            this.props.value
	        )
	    }});

	;

	Button.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired,
	    style: React.PropTypes.object
	}


	Button.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = Button;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'edit';


	var ____Classj=React.PureComponent;for(var ____Classj____Key in ____Classj){if(____Classj.hasOwnProperty(____Classj____Key)){ButtonRegisterEdit[____Classj____Key]=____Classj[____Classj____Key];}}var ____SuperProtoOf____Classj=____Classj===null?null:____Classj.prototype;ButtonRegisterEdit.prototype=Object.create(____SuperProtoOf____Classj);ButtonRegisterEdit.prototype.constructor=ButtonRegisterEdit;ButtonRegisterEdit.__superConstructor__=____Classj;
	// кнопка создания документа в регистрах
	    function ButtonRegisterEdit(props) {
	        ____Classj.call(this,props);
	        this.state = {
	            disabled: this.props.disabled
	        }
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterEdit.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('edit');
	    }});

	    Object.defineProperty(ButtonRegisterEdit.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})

	    }});

	    Object.defineProperty(ButtonRegisterEdit.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Edit", 
	            ref: "btnEdit", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterEdit.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterEdit.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterEdit;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'delete';


	var ____Classk=React.PureComponent;for(var ____Classk____Key in ____Classk){if(____Classk.hasOwnProperty(____Classk____Key)){ButtonRegisterDelete[____Classk____Key]=____Classk[____Classk____Key];}}var ____SuperProtoOf____Classk=____Classk===null?null:____Classk.prototype;ButtonRegisterDelete.prototype=Object.create(____SuperProtoOf____Classk);ButtonRegisterDelete.prototype.constructor=ButtonRegisterDelete;ButtonRegisterDelete.__superConstructor__=____Classk;
	// кнопка создания документа в регистрах
	    function ButtonRegisterDelete(props) {
	        ____Classk.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterDelete.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('delete');
	    }});

	    Object.defineProperty(ButtonRegisterDelete.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Delete", 
	            ref: "btnDelete", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterDelete.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterDelete.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterDelete;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    Select = __webpack_require__(49),
	    Text = __webpack_require__(25);


	var ____Classe=React.PureComponent;for(var ____Classe____Key in ____Classe){if(____Classe.hasOwnProperty(____Classe____Key)){SelectTextWidget[____Classe____Key]=____Classe[____Classe____Key];}}var ____SuperProtoOf____Classe=____Classe===null?null:____Classe.prototype;SelectTextWidget.prototype=Object.create(____SuperProtoOf____Classe);SelectTextWidget.prototype.constructor=SelectTextWidget;SelectTextWidget.__superConstructor__=____Classe;
	    function SelectTextWidget(props) {
	        ____Classe.call(this,props);
	        this.state = {
	            value: props.value,
	            description: '', // пойдет в текстовую область
	            libData: []
	        };
	        this.handleSelectOnChange = this.handleSelectOnChange.bind(this);
	    }


	    Object.defineProperty(SelectTextWidget.prototype,"handleSelectOnChange",{writable:true,configurable:true,value:function(e, name, value) {
	        // отработаем событие и поменяем состояние
	        if (this.state.libData) {
	            let selg = this.getDescriptionBySelectValue(this.state.libData) || null;
	            this.setState({value: value, description: selg});
	        }
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	// создаем обработчик события на изменение библиотек.
	    const self = this;
	        // будем отслеживать момент когда справочник будет загружен
	        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	            let vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue),  // will watch libs change (from server)
	                data = newValue.filter(function(item)  {
	                    if (item.id === self.props.libs) {
	                        return item;
	                    }
	                }),
	                lib = data[0].data,
	                selg = data[0].data.length ? self.getDescriptionBySelectValue(lib).toString() : '';
	            self.setState({libData: lib, description: selg});
	        });
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"getDescriptionBySelectValue",{writable:true,configurable:true,value:function(libData) {
	        // найдем в справочнике описание и установим его состояние
	        let libRow = libData.filter(function(lib)  {

	                if (lib.id == this.props.value) {
	                    return lib;
	                }
	            }.bind(this)),
	            selg = '',
	            selgObject = libRow.length ? libRow[0].details : '';

	        for (let property in selgObject) {
	            if (selgObject.hasOwnProperty(property)) {
	                // интересуют только "собственные" свойства объекта
	                selg = selg + property + ':' + selgObject[property];
	            }
	        }
	        return selg;
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"render",{writable:true,configurable:true,value:function() {
	        return (
	            React.createElement("div", null, 
	                React.createElement(Select, {className: this.props.className, 
	                        ref: "select", 
	                        title: this.props.title, 
	                        name: this.props.name, 
	                        libs: this.props.libs, 
	                        value: this.props.value, 
	                        defaultValue: this.props.defaultValue, 
	                        placeholder: this.props.placeholder || this.props.title, 
	                        readOnly: this.props.readOnly, 
	                        onChange: this.handleSelectOnChange}
	                ), 
	                React.createElement(Text, {ref: "text", 
	                      name: "muud", 
	                      placeholder: "DokProp", 
	                      value: this.state.description, 
	                      readOnly: true, 
	                      disabled: 'true'}
	                )

	            )
	        );
	    }});


	SelectTextWidget.PropTypes = {
	    value: React.PropTypes.string,
	    name: React.PropTypes.string.isRequired,
	    title: React.PropTypes.string,
	    libs: React.PropTypes.array,
	    defaultValue: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    placeholder: React.PropTypes.string
	}


	SelectTextWidget.defaultProps = {
	    readOnly: false,
	    title: ''
	}

	module.exports = SelectTextWidget;



/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);
	//    InputText = require('./doc-input-text.jsx');

	const Select = React.createClass({displayName: "Select",
	    getInitialState: function () {
	        var libData = [];
	        var libs = flux.stores.docStore.libs,
	        // грузим данные из хранилища
	            data = libs.filter(function (item) {
	                if (item.id == this.props.libs) {
	                    return item;
	                }
	            }, this),
	            idValue = this.props.value; // для привязки данных

	        if (data && data.length > 0 && data[0].data) {
	            libData = data[0].data;
	        }

	        return {value: this.props.value /* здесь по значению ИД */,
	            readOnly: this.props.readOnly,
	            disabled: true,
	            data: libData || [],
	            fieldValue: this.props.value /*здесь по значени поля collId */,
	            brnDelete: this.props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/};
	    },

	    findFieldValue: function (data, collId, value) {
	        // привяжет к значеню поля
	        // надо привязать данные
	        // kood -> id
	        var id = 0;
	        data.forEach(function (row) {
	            if (row[collId] == value) {
	                id = row.id;
	//                return id;
	                this.setState({value: row.id, fieldValue: row[collId]});
	                return;
	            }
	        }, this);

	    },

	    getValueById: function(collId, rowId) {
	        // вернет значения поля по выбранному ИД

	        var fieldValue,
	            data = this.state.data;

	        data.forEach(function (row) {
	            if (row['id'] == rowId) {
	                fieldValue = row[collId];
	                this.setState({fieldValue: fieldValue});
	            }
	        }, this);

	    },

	    getDefaultProps: function () {
	        // покажет значение по умолчанию для виджета, пока грузится справочник
	        return {
	            defaultValue: null,
	            value: null,
	            title: null,
	            btnDelete: false
	        };
	    },

	    componentWillMount: function () {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                var data = flux.stores.docStore.data,
	                    value = data[self.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    self.setState({value: 0});
	                } else {
	                    self.setState({value: value});
	                }
	            }
	        });

	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue, disabled: !newValue});
	            }
	        });

	        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	            var vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	            // will watch libs change (from server)
	            var data = newValue.filter(function (item) {
	                if (item.id === self.props.libs) {
	                    return item;
	                }
	            });

	            if (data && data.length > 0) {
	                self.setState({data: data[0].data});
	            }
	        });
	    },

	    componentDidMount: function () {
	        if (this.props.collId && this.props.collId !== 'id') {
	            // ищем ИД по значению поля
	            this.findFieldValue(this.state.data, this.props.collId, this.props.value);
	        }

	    },

	    onChange: function (e) {

	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data,
	            propValue = data[this.props.name];

	        if (fieldValue == '') {
	            fieldValue = null;
	        }
	        
	        // найдем по ид значение поля в collId
	        this.getValueById(this.props.collId, fieldValue);
	        // сохраним ид как value

	        this.setState({value:fieldValue});

	        if (propValue !== 'undefined') {
	            // если используется привязка к данным
	            // получить значение
	            data[this.props.name] = fieldValue;
	            // задать новое значение поля
	            flux.doAction('dataChange', data);
	        }

	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(e, this.props.name, this.state.value); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }

	    },

	    render: function () {
	        var dataOptions = this.state.data || [],
	            inputClassName = this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            Options = null,
	            inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

	        if (this.props.dok) {
	            // оставим только заданый "справочник"
	            dataOptions = dataOptions.filter(function(item)  {
	                if (item.dok === this.props.dok) {
	                    return item;
	                }
	            }.bind(this))
	        }

	        if (!this.state.value) { // добавим пустую строку в массив
	            // проверим наличие пустой строки в массиве

	            let emptyObj = dataOptions.filter(function(obj)  {
	                if (obj.id === 0) {
	                    return obj;
	                }
	            });

	            if (!emptyObj || emptyObj.length == 0) {
	                dataOptions.splice(0, 0, {id: 0, kood: '', name: ''});
	            }

	        }

	        var dataValue = dataOptions.filter(function (item) {
	            if (item.id == this.state.value) {
	                return item;
	            }
	        }, this);

	        if (dataOptions.length) {
	            Options = dataOptions.map(function (item) {

	                if (typeof item == 'array') {
	                    item = item[0];
	                }
	                return React.createElement("option", {value: item.id, key: Math.random()}, item.name)
	            }, this);
	            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	        } else {
	            Options = React.createElement("option", {value: 0, key: Math.random()}, " Empty ")
	        }

	        var widget = React.createElement("select", {value: this.state.value, onChange: this.onChange, 
	                             style: {width:'100%', height:'100%'}}, Options); // если для грида, оставим только селект
	        
	        if (this.props.title) {
	            widget = (React.createElement("div", {className: "form-widget"}, 
	                React.createElement("label", {className: "form-widget-label"}, this.props.title, 
	                React.createElement("div", {style: {display:'inline-block'}}, 
	                    inputReadOnly ?
	                        React.createElement("input", {type: "text", className: "ui-c1 doc-input-readonly", value: inputDefaultValue, 
	                               readOnly: "true"}) : null, 
	                    inputReadOnly ? null :
	                        React.createElement("div", null, 
	                            React.createElement("select", {className: "ui-c2", value: this.state.value, onChange: this.onChange}, Options), 
	                            this.props.btnDelete ?
	                            React.createElement("button", {className: "ui-c1-button", onClick: this.btnDelClick}, " Delete ") : null
	                        )
	                    
	                )
	                )
	            ));
	        }
	        return React.createElement("div", null, widget)
	    },

	    btnDelClick: function(event) {
	        // по вызову кнопку удалить, обнуляет значение
	        this.setState({value:null});
	        this.onChange(event);
	    }
	});

	module.exports = Select;


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	const relatedDocuments = function(self)  {
	    // формируем зависимости
	    let relatedDocuments = self.state.relations;
	    if (relatedDocuments.length > 0) {
	        relatedDocuments.forEach(function(doc)  {
	            if (doc.id) {
	                // проверим на уникальность списка документов
	                let isExists = self.pages.find(function(page)  {
	                    if (!page.docId) {
	                        return false;
	                    } else {
	                        return page.docId == doc.id && page.docTypeId == doc.doc_type;
	                    }
	                });

	                if (!isExists) {
	                    // в массиве нет, добавим ссылку на документ
	                    self.pages.push({docTypeId: doc.doc_type, docId: doc.id, pageName: doc.name + ' id:' + doc.id})
	                }
	            }
	        });
	    }
	}

	module.exports = relatedDocuments;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const styles = __webpack_require__(52),
	    React = __webpack_require__(3);

	var ____Classg=React.Component;for(var ____Classg____Key in ____Classg){if(____Classg.hasOwnProperty(____Classg____Key)){ToolBarContainer[____Classg____Key]=____Classg[____Classg____Key];}}var ____SuperProtoOf____Classg=____Classg===null?null:____Classg.prototype;ToolBarContainer.prototype=Object.create(____SuperProtoOf____Classg);ToolBarContainer.prototype.constructor=ToolBarContainer;ToolBarContainer.__superConstructor__=____Classg;
	    function ToolBarContainer(props) {
	        ____Classg.call(this,props);
	    }

	    Object.defineProperty(ToolBarContainer.prototype,"render",{writable:true,configurable:true,value:function() {
	        let style = Object.assign({},styles.toolBarContainerStyle, styles[this.props.position] );
	        return (
	            React.createElement("div", {id: "toolBarContainer", style: style}, 
	                    this.props.children
	            )
	        );
	    }});


	ToolBarContainer.propTypes = {
	    position: React.PropTypes.string
	}


	ToolBarContainer.defaultProps = {
	    position: 'right'
	};

	module.exports = ToolBarContainer;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black'
	    },

	    right: {
	        justifyContent: 'flex-end',
	        marginLeft: '5px'
	    },

	    left: {
	        justifyContent: 'flex-start',
	        marginRight: '5px'
	    }

	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    ToolbarContainer = __webpack_require__(51),
	    BtnAdd = __webpack_require__(43),
	    BtnEdit = __webpack_require__(46),
	    BtnSave = __webpack_require__(54),
	    BtnCancel = __webpack_require__(55),
	    BtnPrint = __webpack_require__(56),
	    TaskWidget = __webpack_require__(57);

	var ____Classf=React.PureComponent;for(var ____Classf____Key in ____Classf){if(____Classf.hasOwnProperty(____Classf____Key)){DocToolBar[____Classf____Key]=____Classf[____Classf____Key];}}var ____SuperProtoOf____Classf=____Classf===null?null:____Classf.prototype;DocToolBar.prototype=Object.create(____SuperProtoOf____Classf);DocToolBar.prototype.constructor=DocToolBar;DocToolBar.__superConstructor__=____Classf;
	    function DocToolBar(props) {
	        ____Classf.call(this,props);

	        this.btnEditClick = this.btnEditClick.bind(this);
	        this.btnAddClick = this.btnAddClick.bind(this);
	        this.btnSaveClick = this.btnSaveClick.bind(this);
	        this.btnCancelClick = this.btnCancelClick.bind(this);
	        this.btnPrintClick = this.btnPrintClick.bind(this);
	        this.handleButtonTask = this.handleButtonTask.bind(this);
	        this.handleSelectTask = this.handleSelectTask.bind(this);

	    }

	    Object.defineProperty(DocToolBar.prototype,"render",{writable:true,configurable:true,value:function() {
	        let isEditMode = this.props.edited,
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
	                    show: isEditMode && docId !==0,
	                    disabled: false
	                }
	            };

	        return React.createElement(ToolbarContainer, {ref: "toolbarContainer"}, 
	            React.createElement("div", null, 
	                React.createElement(BtnAdd, {ref: "btnAdd", onClick: this.btnAddClick, show: toolbarParams['btnAdd'].show, 
	                        disabled: toolbarParams['btnAdd'].disabled}), 
	                React.createElement(BtnEdit, {ref: "btnEdit", onClick: this.btnEditClick, show: toolbarParams['btnEdit'].show, 
	                         disabled: toolbarParams['btnEdit'].disabled}), 
	                React.createElement(BtnSave, {ref: "btnSave", onClick: this.btnSaveClick, show: toolbarParams['btnSave'].show, 
	                         disabled: toolbarParams['btnSave'].disabled}), 
	                React.createElement(BtnCancel, {ref: "btnCancel", onClick: this.btnCancelClick, show: toolbarParams['btnCancel'].show, 
	                           disabled: toolbarParams['btnCancel'].disabled}), 
	                React.createElement(BtnPrint, {ref: "btnPrint", onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show, 
	                          disabled: toolbarParams['btnPrint'].disabled}), 
	                this.props.bpm ? React.createElement(TaskWidget, {ref: "taskWidget", 
	                                              taskList: this.props.bpm, 
	                                              handleSelectTask: this.handleSelectTask, 
	                                              handleButtonTask: this.handleButtonTask}
	                    ) : null

	            )
	        )
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnAddClick",{writable:true,configurable:true,value:function() {
	        console.log('btnAddClick called')
	        // обработчик для кнопки Add
	        // отправим извещение наверх
	//        this.props.onClick(this.name);
	        flux.doAction('docIdChange', 0);
	        flux.doAction('editedChange', true);
	        flux.doAction('savedChange', false);
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnEditClick",{writable:true,configurable:true,value:function() {
	        // обработчик для кнопки Edit
	        // переводим документ в режим редактирования, сохранен = false
	        if (!this.props.docStatus || this.props.docStatus < 2) {
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnPrintClick",{writable:true,configurable:true,value:function() {
	        console.log('print called');
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnSaveClick",{writable:true,configurable:true,value:function() {
	        // обработчик для кнопки Save
	        // валидатор

	        let validationMessage = this.props.validator ? this.props.validator() : 'validator do not exists',
	            isValid = this.props.validator ? !this.props.validator() : true;

	        if (isValid) {
	            // если прошли валидацию, то сохранеям
	            flux.doAction('saveData');
	            flux.doAction('editedChange', false);
	            flux.doAction('savedChange', true);

	        }
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnCancelClick",{writable:true,configurable:true,value:function() {
	        console.log('btnCancelClick');
	        // обработчик для кнопки Cancel
	        if (this.props.eventHandler) {
	            this.props.eventHandler('CANCEL');
	        }

	        flux.doAction('editedChange', false);
	        flux.doAction('savedChange', true);
	    }});

	    Object.defineProperty(DocToolBar.prototype,"handleButtonTask",{writable:true,configurable:true,value:function(task) {
	        // метод вызывается при выборе задачи
	        //@todo Закончить

	        flux.doAction('executeTask', task);
	    }});


	    Object.defineProperty(DocToolBar.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        // метод вызывается при выборе задачи
	        //@todo Закончить
	        const taskValue = e.target.value;
	    }});



	DocToolBar.PropTypes = {
	    bpm: React.PropTypes.array,
	    edited: React.PropTypes.bool,
	    docStatus: React.PropTypes.number,
	    validator: React.PropTypes.func
	}

	DocToolBar.defaultProps = {
	    bpm: [],
	    edited: false,
	    docStatus: 0
	}

	module.exports = DocToolBar;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'save';


	var ____Classu=React.PureComponent;for(var ____Classu____Key in ____Classu){if(____Classu.hasOwnProperty(____Classu____Key)){ButtonRegisterPrint[____Classu____Key]=____Classu[____Classu____Key];}}var ____SuperProtoOf____Classu=____Classu===null?null:____Classu.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classu);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classu;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classu.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }
	    }

	    Object.defineProperty(ButtonRegisterPrint.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnSave", 
	            value: "Save", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterPrint.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'cancel';


	var ____Classv=React.PureComponent;for(var ____Classv____Key in ____Classv){if(____Classv.hasOwnProperty(____Classv____Key)){ButtonRegisterCancel[____Classv____Key]=____Classv[____Classv____Key];}}var ____SuperProtoOf____Classv=____Classv===null?null:____Classv.prototype;ButtonRegisterCancel.prototype=Object.create(____SuperProtoOf____Classv);ButtonRegisterCancel.prototype.constructor=ButtonRegisterCancel;ButtonRegisterCancel.__superConstructor__=____Classv;
	// кнопка создания документа в регистрах
	    function ButtonRegisterCancel(props) {
	        ____Classv.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }
	    }

	    Object.defineProperty(ButtonRegisterCancel.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterCancel.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})
	    }});

	    Object.defineProperty(ButtonRegisterCancel.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnCancel", 
	            value: "Cancel", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterCancel.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterCancel.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterCancel;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'print';


	var ____Classr=React.PureComponent;for(var ____Classr____Key in ____Classr){if(____Classr.hasOwnProperty(____Classr____Key)){ButtonRegisterPrint[____Classr____Key]=____Classr[____Classr____Key];}}var ____SuperProtoOf____Classr=____Classr===null?null:____Classr.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classr);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classr;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classr.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterPrint.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnPrint", 
	            value: "Print", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterPrint.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    Button = __webpack_require__(58),
	    styles = __webpack_require__(59);

	var ____Classw=React.PureComponent;for(var ____Classw____Key in ____Classw){if(____Classw.hasOwnProperty(____Classw____Key)){TaskWidget[____Classw____Key]=____Classw[____Classw____Key];}}var ____SuperProtoOf____Classw=____Classw===null?null:____Classw.prototype;TaskWidget.prototype=Object.create(____SuperProtoOf____Classw);TaskWidget.prototype.constructor=TaskWidget;TaskWidget.__superConstructor__=____Classw;
	    function TaskWidget(props) {
	        ____Classw.call(this,props);
	        let tasks = props.taskList || [];


	        if (!tasks[0].status) {
	            tasks[0].status = 'opened';
	        }

	        this.state = {
	            taskList: tasks
	        };
	        this.handleSelectTask = this.handleSelectTask.bind(this);
	        this.handleButtonTask = this.handleButtonTask.bind(this);
	    }

	    Object.defineProperty(TaskWidget.prototype,"render",{writable:true,configurable:true,value:function() {
	        let tasks = this.state.taskList.filter(function(task)  {
	            if (task.status === 'opened') {
	                return task;
	            }
	        });

	        if (!tasks) return React.createElement("div", null)

	        return (React.createElement("div", {style: styles.wrapper}, 
	                tasks.length > 1 ?
	                    React.createElement("select", {
	                        className: "ui-c2", 
	                        onChange: this.handleSelectTask, 
	                        show: true, 
	                        ref: "selectTask"}, 
	                        
	                            tasks.map(function(taskName, index)  {
	                                let key = 'option-' + index;
	                                React.createElement("option", {value: 0, key: key, ref: key}, " ", taskName.name, " ")
	                            })
	                        
	                    ) : React.createElement(Button, {
	                        ref: "buttonTask", 
	                        className: "ui-c2", 
	                        onClick: this.handleButtonTask, 
	                        show: tasks.length == 1 ? true: false, 
	                        value: tasks.length == 1? tasks[0].name: ''})
	                
	            )

	        )
	    }});

	    Object.defineProperty(TaskWidget.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        let taskName = e.target.value;
	        this.props.handleSelectTask(taskName);
	    }});

	    Object.defineProperty(TaskWidget.prototype,"handleButtonTask",{writable:true,configurable:true,value:function() {
	        // найдем актуальную задачу
	        let actualTask = this.state.taskList.filter(function(task)  {
	                if (task.actualStep) {
	                    return task;
	                }
	            }),
	            task = actualTask.map(function(task)  {
	                return task.action
	            }); // оставим только название процедуры
	        this.props.handleButtonTask(task);
	    }});

	    Object.defineProperty(TaskWidget.prototype,"getDefaultTask",{writable:true,configurable:true,value:function() {
	        return [{step: 0, name: 'Start', action: 'start', status: 'opened'}]
	    }});



	TaskWidget.PropTypes = {
	    taskList: React.PropTypes.array.isRequired,
	    handleButtonTask: React.PropTypes.func.isRequired,
	    handleSelectTask: React.PropTypes.func.isRequired
	}


	module.exports = TaskWidget;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'execute';


	var ____Classy=React.PureComponent;for(var ____Classy____Key in ____Classy){if(____Classy.hasOwnProperty(____Classy____Key)){ButtonRegisterExecute[____Classy____Key]=____Classy[____Classy____Key];}}var ____SuperProtoOf____Classy=____Classy===null?null:____Classy.prototype;ButtonRegisterExecute.prototype=Object.create(____SuperProtoOf____Classy);ButtonRegisterExecute.prototype.constructor=ButtonRegisterExecute;ButtonRegisterExecute.__superConstructor__=____Classy;
	// кнопка создания документа в регистрах
	    function ButtonRegisterExecute(props) {
	        ____Classy.call(this,props);
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterExecute.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterExecute.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnExecute", 
	            value: this.props.value, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: this.handleClick}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterExecute.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired
	}


	ButtonRegisterExecute.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterExecute;

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'inline-flex'
	    }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(4);

	var validateForm = function validateForm(self, reqFields) {

	    // валидация формы
	    var warning = void 0,
	        requiredFields = reqFields || [],
	        notRequiredFields = [],
	        notMinMaxRule = [],
	        data = flux.stores.docStore.data;

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

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    Button = __webpack_require__(45),
	    buttonStyles = __webpack_require__(44),
	    styles = __webpack_require__(62);

	var ____Classi=React.PureComponent;for(var ____Classi____Key in ____Classi){if(____Classi.hasOwnProperty(____Classi____Key)){ModalPage[____Classi____Key]=____Classi[____Classi____Key];}}var ____SuperProtoOf____Classi=____Classi===null?null:____Classi.prototype;ModalPage.prototype=Object.create(____SuperProtoOf____Classi);ModalPage.prototype.constructor=ModalPage;ModalPage.__superConstructor__=____Classi;
	    function ModalPage(props) {
	        ____Classi.call(this,props);
	        this.handleBtnClick.bind(this);
	        this.closeModalPage.bind(this);
	        this.state = {
	            show: this.props.show
	        }
	    }

	    Object.defineProperty(ModalPage.prototype,"closeModalPage",{writable:true,configurable:true,value:function() {
	        this.setState({show:false});
	    }});

	    Object.defineProperty(ModalPage.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({show: nextProps.show});
	    }});

	    Object.defineProperty(ModalPage.prototype,"handleBtnClick",{writable:true,configurable:true,value:function(btnEvent) {
	        this.props.modalPageBtnClick(btnEvent);
	    }});

	    Object.defineProperty(ModalPage.prototype,"render",{writable:true,configurable:true,value:function() {
	        // если передан атрибу modalObjects = ['btnOk','btnCancel']
	        let hideBtnOk = this.props.modalObjects.indexOf('btnOk') == -1 ? false : true, // управление кнопкой Ок
	            hideBtnCancel = this.props.modalObjects.indexOf('btnCancel') == -1 ? false : true, // управление кнопкой Cancel
	            displayModal = this.state.show ? 'flex': 'none' ,
	            pagePosition =  this.props.position,
	            containerStyle = Object.assign({}, styles.container, {display: displayModal}, {justifyContent:pagePosition});

	        return (
	            React.createElement("div", {ref: "container", style: containerStyle}, 
	                React.createElement("div", {style: styles.modalPage, ref: "modalPageContainer"}, 
	                    React.createElement("div", {style: styles.header, ref: "modalPageHeader"}, 
	                        React.createElement("span", {ref: "headerName", style: styles.headerName}, " ", this.props.modalPageName, " "), 
	                        React.createElement(Button, {style: styles.buttonClose, ref: "btnClose", onClick: this.closeModalPage.bind(this), value: "x"})
	                    ), 
	                    React.createElement("div", {style: styles.modalPageContent, ref: "modalPageContent"}, 
	                        this.props.children
	                    ), 

	                    React.createElement("div", {style: styles.modalFooter, ref: "modalPageButtons"}, 
	                        hideBtnOk ?
	                            React.createElement(Button, {
	                                ref: "btnOk", 
	                                value: "Ok", 
	                                style: styles.modalPageButtons, 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Ok'), 
	                                id: "btnOk"}, 
	                                React.createElement("image", {ref: "image", src: buttonStyles.icons['ok']})
	                            ) : null, 
	                        
	                        React.createElement("div", {style: styles.buttonsSeparator}), 
	                        hideBtnCancel ?
	                            React.createElement(Button, {
	                                ref: "btnCancel", 
	                                value: "Cancel", 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Cancel'), 
	                                className: "modalPageButtons", 
	                                id: "btnCancel"}, 
	                                React.createElement("image", {ref: "image", src: buttonStyles.icons['cancel']})
	                            ) : null
	                        
	                    )
	                )
	            )
	        )
	    }});


	ModalPage.propTypes = {
	    modalPageName: React.PropTypes.string.isRequired,
	    modalPageBtnClick: React.PropTypes.func.isRequired,
	    show: React.PropTypes.bool,
	    position: React.PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
	}


	ModalPage.defaultProps = {
	    modalPageName: 'defaulName',
	    modalObjects: ['btnOk', 'btnCancel'],
	    position: 'center',
	    show: false
	}

	module.exports = ModalPage;

/***/ },
/* 62 */
/***/ function(module, exports) {

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

/***/ },
/* 63 */,
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(4);

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
	                flux.doAction('setLibsFilter', 'arvedSisse', [value.asutusid, value.arvid]);
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

	    requery('execute', JSON.stringify(tasksParameters), function (err, data) {
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

	    requery('save', JSON.stringify(saveData), function (err, data) {
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

	        requery('select', JSON.stringify({ doc_type_id: libraryName, id: 0, params: libParams }), function (err, data) {
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

	function requery(action, parameters, callback) {
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
	            callback(err, null);
	        }.bind(this)
	    });
	};

	module.exports = docStore;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGRlNzllMjJjZDQ5ODc1MTY1ZTNiIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9mbHV4aWZ5LmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0vZm9ybS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZXRpbWUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWxpc3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvY2xhc3NfZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L3N0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9tYXRjaF9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9wYXJzZV9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2V2ZW50X2hhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9kb21faGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvbGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zYXZlL2J1dHRvbi1yZWdpc3Rlci1zYXZlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItY2FuY2VsL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1wcmludC9idXR0b24tcmVnaXN0ZXItcHJpbnQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdGFzay13aWRnZXQvdGFzay13aWRnZXQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9taXhpbi92YWxpZGF0ZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2Utc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2Nfc3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pXG4gXHRcdFx0XHRjYWxsYmFja3MucHVzaC5hcHBseShjYWxsYmFja3MsIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0aWYobW9yZU1vZHVsZXNbMF0pIHtcbiBcdFx0XHRpbnN0YWxsZWRNb2R1bGVzWzBdID0gMDtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0ODowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyAoe1wiMFwiOlwiYXJ2XCIsXCIxXCI6XCJkb2NcIixcIjJcIjpcImRvY3NcIixcIjNcIjpcImpvdXJuYWxcIixcIjRcIjpcInNta1wiLFwiNVwiOlwic29yZGVyXCIsXCI2XCI6XCJ2bWtcIixcIjdcIjpcInZvcmRlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZTc5ZTIyY2Q0OTg3NTE2NWUzYiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9zcmMveERpc3BhdGNoZXInKSxcbiAgICBYU3RvcmUgPSByZXF1aXJlKCcuL3NyYy94U3RvcmUnKTtcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIEZsdXhpZnkgY2xhc3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24uXHJcbiAqIEluaXRpYWxpemVzIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgc3RvcmUuXHJcbiAqIEFsc28gc2V0IHRoZSBQcm9taXNlIG9iamVjdCBpZiBpdCBpcyBnbG9iYWxseSBhdmFpbGFibGUuXHJcbiAqL1xudmFyIEZsdXhpZnkgPSBmdW5jdGlvbiBGbHV4aWZ5KCkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rpc3BhdGNoZXInLCB7XG5cdFx0dmFsdWU6IG5ldyBYRGlzcGF0Y2hlcigpXG5cdH0pO1xuXG5cdHRoaXMuc3RvcmVzID0ge307XG5cblx0aWYgKHR5cGVvZiBQcm9taXNlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0dGhpcy5wcm9taXNpZnkoUHJvbWlzZSk7XG5cdH1cbn07XG5cbkZsdXhpZnkucHJvdG90eXBlID0ge1xuXHQvKipcclxuICAqIENyZWF0ZSBhIG5ldyBzdG9yZS4gSWYgYW4gaWQgaXMgcGFzc2VkIGluIHRoZSBvcHRpb25zLFxyXG4gICogdGhlIHN0b3JlIHdpbGwgYmUgcmVnaXN0ZXJlZCBpbiB0aGUgZGlzcGF0Y2hlciBhbmQgc2F2ZWRcclxuICAqIGluIGZsdXhpZnkuc3RvcmVzW2lkXS5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMge2lkLCBpbml0aWFsU3RhdGUsIGFjdGlvbkNhbGxiYWNrfVxyXG4gICogQHJldHVybiB7WFN0b3JlfVxyXG4gICovXG5cdGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZShvcHRpb25zKSB7XG5cdFx0dmFyIHN0b3JlID0gbmV3IFhTdG9yZShvcHRpb25zKTtcblxuXHRcdC8vIElmIHRoZSBzdG9yZSBoYXMgYW4gaWQsIHJlZ2lzdGVyIGl0IGluIEZsdXhpZnkgYW5kIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0aWYgKHN0b3JlLl9pZCkge1xuXHRcdFx0dGhpcy5zdG9yZXNbc3RvcmUuX2lkXSA9IHN0b3JlO1xuXHRcdFx0dGhpcy5kaXNwYXRjaGVyLnJlZ2lzdGVyU3RvcmUoc3RvcmUuX2lkLCBzdG9yZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRXhlY3V0ZXMgYW4gYWN0aW9uLiBUaGUgYXJndW1lbnRzIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGVcclxuICAqIGZvciB0aGUgYWN0aW9uIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyLlxyXG4gICogQHJldHVybiB7IFByb21pc2UgfSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrc1xyXG4gICogICAgICAgICAgICAgICAgICAgaGF2ZSBmaW5pc2hlZC5cclxuICAqL1xuXHRkb0FjdGlvbjogZnVuY3Rpb24gZG9BY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaC5hcHBseSh0aGlzLmRpc3BhdGNoZXIsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJZiBFUzYgUHJvbWlzZSBvYmplY3QgaXMgbm90IGRlZmluZWQgZ2xvYmFsbHkgb3IgcG9seWZpbGxlZCwgYSBQcm9taXNlIG9iamVjdFxyXG4gICogY2FuIGJlIGdpdmVuIHRvIGZsdXhpZnkgaW4gb3JkZXIgdG8gbWFrZSBpdCB3b3JrLCB1c2luZyB0aGlzIG1ldGhvZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHsgUHJvbWlzZSB9IFByb21pc2UgRVM2IFByb21pc2UgY29tcGF0aWJsZSBvYmplY3RcclxuICAqIEByZXR1cm4geyB1bmRlZmluZWQgfVxyXG4gICovXG5cdHByb21pc2lmeTogZnVuY3Rpb24gcHJvbWlzaWZ5KFByb21pc2UpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0XHR0aGlzLmRpc3BhdGNoZXIuX1Byb21pc2UgPSBQcm9taXNlO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbHV4aWZ5KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvZmx1eGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbi8qKlxyXG4gKiBUaGUgYXN5bmNocm9ub3VzIGRpc3BhdGNoZXIgY29tcGF0aWJsZSB3aXRoIEZhY2Vib29rJ3MgZmx1eCBkaXNwYXRjaGVyXHJcbiAqIGh0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vZmx1eC9kb2NzL2Rpc3BhdGNoZXIuaHRtbFxyXG4gKlxyXG4gKiBEaXNwYXRjaCBhY3Rpb25zIHRvIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrcywgdGhvc2UgYWN0aW9uIGNhbiBiZVxyXG4gKiBhc3luY2hyb25vdXMgaWYgdGhleSByZXR1cm4gYSBQcm9taXNlLlxyXG4gKi9cblxudmFyIFhEaXNwYXRjaGVyID0gZnVuY3Rpb24gWERpc3BhdGNoZXIoKSB7XG5cdHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuXHR0aGlzLl9kaXNwYXRjaFF1ZXVlID0gW107XG5cdHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHR0aGlzLl9JRCA9IDE7XG5cblx0aWYgKHR5cGVvZiBQcm9taXNlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0dGhpcy5fUHJvbWlzZSA9IFByb21pc2U7XG5cdH1cbn07XG5cblhEaXNwYXRjaGVyLnByb3RvdHlwZSA9IHtcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZyB8IEZ1bmN0aW9ufSAgIGlkICBJZiBhIHN0cmluZyBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdGhlIGlkIG9mIHRoZSBjYWxsYmFjay5cclxuICAqICAgICAgICAgICAgICAgICAgSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjaywgYW5kIGlkIGlzIGdlbmVyYXRlZFxyXG4gICogICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5LlxyXG4gICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIElmIGFuIGlkIGlzIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50LCB0aGlzIHdpbGwgYmUgdGhlIGNhbGxiYWNrLlxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIoaWQsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIElEID0gaWQ7XG5cblx0XHQvLyBJZiB0aGUgY2FsbGJhY2sgaXMgdGhlIGZpcnN0IHBhcmFtZXRlclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0SUQgPSAnSURfJyArIHRoaXMuX0lEO1xuXHRcdFx0Y2FsbGJhY2sgPSBpZDtcblx0XHR9XG5cblx0XHR0aGlzLl9jYWxsYmFja3NbSURdID0gY2FsbGJhY2s7XG5cdFx0dGhpcy5fSUQrKztcblxuXHRcdHJldHVybiBJRDtcblx0fSxcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgWFN0b3JlIGluIHRoZSBkaXNwYWNoZXIuIFhTdG9yZXMgaGFzIGEgbWV0aG9kIGNhbGxlZCBjYWxsYmFjay4gVGhlIGRpc3BhdGNoZXJcclxuICAqIHJlZ2lzdGVyIHRoYXQgZnVuY3Rpb24gYXMgYSByZWd1bGFyIGNhbGxiYWNrLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgIFRoZSBpZCBmb3IgdGhlIHN0b3JlIHRvIGJlIHVzZWQgaW4gdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICogQHBhcmFtICB7WFN0b3JlfSB4U3RvcmUgU3RvcmUgdG8gcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcclxuICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlclN0b3JlOiBmdW5jdGlvbiByZWdpc3RlclN0b3JlKGlkLCB4U3RvcmUpIHtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4U3RvcmUsICdfZGlzcGF0Y2hlcicsIHtcblx0XHRcdHZhbHVlOiB0aGlzXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RlcihpZCwgeFN0b3JlLmNhbGxiYWNrKTtcblx0fSxcblxuXHQvKipcclxuICAqIFVucmVnaXN0ZXIgYSBjYWxsYmFjayBnaXZlbiBpdHMgaWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCBDYWxsYmFjay9TdG9yZSBpZFxyXG4gICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICovXG5cdHVucmVnaXN0ZXI6IGZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcblx0XHRkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2lkXTtcblx0fSxcblxuXHQvKipcclxuICAqIENyZWF0ZXMgYSBwcm9taXNlIGFuZCB3YWl0cyBmb3IgdGhlIGNhbGxiYWNrcyBzcGVjaWZpZWQgdG8gY29tcGxldGUgYmVmb3JlIHJlc29sdmUgaXQuXHJcbiAgKiBJZiBpdCBpcyB1c2VkIGJ5IGFuIGFjdGlvbkNhbGxiYWNrLCB0aGUgcHJvbWlzZSBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gbGV0IG90aGVyIGNhbGxiYWNrc1xyXG4gICogd2FpdCBmb3IgaXQgaWYgbmVlZGVkLlxyXG4gICpcclxuICAqIEJlIGNhcmVmdWwgb2Ygbm90IHRvIHdhaXQgYnkgYSBjYWxsYmFjayB0aGF0IGlzIHdhaXRpbmcgYnkgdGhlIGN1cnJlbnQgY2FsbGJhY2ssIG9yIHRoZVxyXG4gICogcHJvbWlzZXMgd2lsbCBuZXZlciBmdWxmaWxsLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZzxBcnJheT58U3RyaW5nfSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FsbGJhY2tzL3N0b3JlcyB0byB3YWl0IGZvci5cclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2tzIGFyZSBjb21wbGV0ZWQuXHJcbiAgKi9cblx0d2FpdEZvcjogZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcblx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHQgICAgaSA9IDA7XG5cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cblx0XHRmb3IgKDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuX3Byb21pc2VzW2lkc1tpXV0pIHByb21pc2VzLnB1c2godGhpcy5fcHJvbWlzZXNbaWRzW2ldXSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFwcm9taXNlcy5sZW5ndGgpIHJldHVybiB0aGlzLl9Qcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9Qcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiB0byBhbGwgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzL3N0b3Jlcy5cclxuICAqXHJcbiAgKiBJZiBhIHNlY29uZCBhY3Rpb24gaXMgZGlzcGF0Y2hlZCB3aGlsZSB0aGVyZSBpcyBhIGRpc3BhdGNoIG9uLCBpdCB3aWxsIGJlXHJcbiAgKiBlbnF1ZXVlZCBhbiBkaXNwYXRjaGVkIGFmdGVyIHRoZSBjdXJyZW50IG9uZS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2UsXG5cdFx0ICAgIGRlcXVldWU7XG5cblx0XHRpZiAoIXRoaXMuX1Byb21pc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIHByb21pc2VzLicpO1xuXG5cdFx0Ly8gSWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBkaXNwYXRjaCwgZW5xdWV1ZSB0aGUgZGlzcGF0Y2hcblx0XHRpZiAodGhpcy5fY3VycmVudERpc3BhdGNoKSB7XG5cblx0XHRcdC8vIERpc3BhdGNoIGFmdGVyIHRoZSBjdXJyZW50IG9uZVxuXHRcdFx0cHJvbWlzZSA9IHRoaXMuX2N1cnJlbnREaXNwYXRjaC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG1lLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEVucXVldWUsIHNldCB0aGUgY2hhaW4gYXMgdGhlIGN1cnJlbnQgcHJvbWlzZSBhbmQgcmV0dXJuXG5cdFx0XHR0aGlzLl9kaXNwYXRjaFF1ZXVlLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gcHJvbWlzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gdGhpcy5fZGlzcGF0Y2guYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIGlubWVkaWF0ZWxseS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQgd2hlbiBhbGwgdGhlIGNhbGxiYWNrcyBoYXZlIGZpbmlzZWQuXHJcbiAgKi9cblx0X2Rpc3BhdGNoOiBmdW5jdGlvbiBfZGlzcGF0Y2goKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2VzID0gW107XG5cblx0XHR0aGlzLl9wcm9taXNlcyA9IFtdO1xuXG5cdFx0Ly8gQSBjbG9zdXJlIGlzIG5lZWRlZCBmb3IgdGhlIGNhbGxiYWNrIGlkXG5cdFx0T2JqZWN0LmtleXModGhpcy5fY2FsbGJhY2tzKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXG5cdFx0XHQvLyBBbGwgdGhlIHByb21pc2VzIG11c3QgYmUgc2V0IGluIG1lLl9wcm9taXNlcyBiZWZvcmUgdHJ5aW5nIHRvIHJlc29sdmVcblx0XHRcdC8vIGluIG9yZGVyIHRvIG1ha2Ugd2FpdEZvciB3b3JrIG9rXG5cdFx0XHRtZS5fcHJvbWlzZXNbaWRdID0gbWUuX1Byb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2NhbGxiYWNrc1tpZF0uYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9taXNlcy5wdXNoKG1lLl9wcm9taXNlc1tpZF0pO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHR2YXIgZGVxdWV1ZSA9IGZ1bmN0aW9uIGRlcXVldWUoKSB7XG5cdFx0XHRtZS5fZGlzcGF0Y2hRdWV1ZS5zaGlmdCgpO1xuXHRcdFx0aWYgKCFtZS5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGgpIG1lLl9jdXJyZW50RGlzcGF0Y2ggPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRlcXVldWUsIGRlcXVldWUpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSXMgdGhpcyBkaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICovXG5cdGlzRGlzcGF0Y2hpbmc6IGZ1bmN0aW9uIGlzRGlzcGF0Y2hpbmcoKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGg7XG5cdH1cblxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRGlzcGF0Y2hlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWEVtaXR0ZXIgPSByZXF1aXJlKCcuL3hFbWl0dGVyJyksXG4gICAgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFN0b3JlID0gWEVtaXR0ZXIuX2V4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUocHJvcHMpIHtcblx0XHRpZiAoIXByb3BzKSByZXR1cm4gdGhpcy5wcm9wcyA9IHt9O1xuXG5cdFx0dGhpcy5wcm9wcyA9IHt9O1xuXHRcdGZvciAodmFyIHAgaW4gcHJvcHMpIHtcblx0XHRcdHRoaXMucHJvcHNbcF0gPSBwcm9wc1twXTtcblx0XHR9XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbiBnZXQocHJvcCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzW3Byb3BdO1xuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gc2V0KHByb3AsIHZhbHVlKSB7XG5cdFx0dmFyIHByb3BzID0gcHJvcCxcblx0XHQgICAgdXBkYXRlcyA9IFtdLFxuXHRcdCAgICBwcmV2aW91c1ZhbHVlLFxuXHRcdCAgICBwO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0cHJvcHMgPSB7fTtcblx0XHRcdHByb3BzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIHByb3BzKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twXSAhPSBwcm9wc1twXSkge1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlID0gdGhpcy5wcm9wc1twXTtcblx0XHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdFx0XHR1cGRhdGVzLnB1c2goe1xuXHRcdFx0XHRcdHByb3A6IHAsXG5cdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZTogcHJvcHNbcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHVwZGF0ZXMubGVuZ3RoKSB0aGlzLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHR9XG59KTtcblxudmFyIFhTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKG9wdGlvbnMpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBvcHRzID0gb3B0aW9ucyB8fCB7fSxcblx0XHQgICAgc3RvcmUgPSBuZXcgU3RvcmUob3B0cy5pbml0aWFsU3RhdGUpLFxuXHRcdCAgICBhY3Rpb25UeXBlLFxuXHRcdCAgICBzdGF0ZVByb3A7XG5cblx0XHQvLyBTdG9yZSBpZFxuXHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19pZCcsIHtcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMuaWRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlZ2lzdGVyIGFjdGlvbiBjYWxsYmFja3MgaW4gdGhlIHN0b3JlXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0X2NhbGxiYWNrczoge1xuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHR2YWx1ZToge31cblx0XHRcdH0sXG5cdFx0XHRhZGRBY3Rpb25DYWxsYmFja3M6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNsYmtzKSB7XG5cdFx0XHRcdFx0Zm9yIChhY3Rpb25UeXBlIGluIGNsYmtzKSB7XG5cdFx0XHRcdFx0XHRtZS5fY2FsbGJhY2tzW2FjdGlvblR5cGVdID0gY2xia3NbYWN0aW9uVHlwZV0uYmluZCh0aGlzLCBzdG9yZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsYmFjayBmb3IgcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRcdGNhbGxiYWNrOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGFjdGlvblR5cGUgPSBhcmd1bWVudHNbMF0sXG5cdFx0XHRcdFx0ICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdKSB7XG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2tzIGFyZSBhbHJlYWR5IGJvdW5kIHRvIHRoaXMgeFN0b3JlIGFuZCB0aGUgbXV0YWJsZSBzdG9yZVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1thY3Rpb25UeXBlXS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZEFjdGlvbkNhbGxiYWNrcyhvcHRzLmFjdGlvbkNhbGxiYWNrcyB8fCB7fSk7XG5cblx0XHQvLyBDcmVhdGUgaW5tbXV0YWJsZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIGFkZFByb3BlcnR5ID0gZnVuY3Rpb24gYWRkUHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsIHByb3BOYW1lLCB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBzdG9yZS5nZXQocHJvcE5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0aWYgKG9wdHMuaW5pdGlhbFN0YXRlKSB7XG5cdFx0XHRmb3IgKHN0YXRlUHJvcCBpbiBvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0XHRhZGRQcm9wZXJ0eShzdGF0ZVByb3AsIG9wdHMuaW5pdGlhbFN0YXRlW3N0YXRlUHJvcF0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEVtaXQgb24gc3RvcmUgY2hhbmdlXG5cdFx0c3RvcmUub24oJ2NoYW5nZScsIGZ1bmN0aW9uICh1cGRhdGVzKSB7XG5cdFx0XHR2YXIgdXBkYXRlc0xlbmd0aCA9IHVwZGF0ZXMubGVuZ3RoLFxuXHRcdFx0ICAgIHVwZGF0ZSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdXBkYXRlc0xlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHVwZGF0ZSA9IHVwZGF0ZXNbaV07XG5cblx0XHRcdFx0Ly8gSWYgdGhlIHByb3BlcnR5IGlzIG5ldywgYWRkIGl0IHRvIHRoZSB4U3RvcmVcblx0XHRcdFx0aWYgKCFtZS5oYXNPd25Qcm9wZXJ0eSh1cGRhdGUucHJvcCkpIGFkZFByb3BlcnR5KHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUpO1xuXG5cdFx0XHRcdG1lLmVtaXQoJ2NoYW5nZTonICsgdXBkYXRlLnByb3AsIHVwZGF0ZS52YWx1ZSwgdXBkYXRlLnByZXZpb3VzVmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRtZS5lbWl0KCdjaGFuZ2UnLCB1cGRhdGVzKTtcblx0XHR9KTtcblx0fSxcblxuXHRnZXRTdGF0ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG5cdFx0Ly8gQ2xvbmUgdGhlIHN0b3JlIHByb3BlcnRpZXNcblx0XHRyZXR1cm4geFV0aWxzLl9leHRlbmQoe30sIHRoaXMpO1xuXHR9LFxuXG5cdHdhaXRGb3I6IGZ1bmN0aW9uIHdhaXRGb3IoaWRzKSB7XG5cdFx0Ly8gVGhlIHhEaXNwYXRjaGVyIGFkZHMgaXRzZWxmIGFzIGEgcHJvcGVydHlcblx0XHQvLyB3aGVuIHRoZSB4U3RvcmUgaXMgcmVnaXN0ZXJlZFxuXHRcdHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLndhaXRGb3IoaWRzKTtcblx0fVxufSk7XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gWFN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFhFbWl0dGVyID0gZnVuY3Rpb24gWEVtaXR0ZXIoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2V2ZW50cycsIHtcblx0XHR2YWx1ZToge31cblx0fSk7XG5cblx0aWYgKHR5cGVvZiB0aGlzLmluaXRpYWxpemUgPT0gJ2Z1bmN0aW9uJykgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBUaGUgcHJvdG90eXBlIG1ldGhvZHMgYXJlIHN0b3JlZCBpbiBhIGRpZmZlcmVudCBvYmplY3Rcbi8vIGFuZCBhcHBsaWVkIGFzIG5vbiBlbnVtZXJhYmxlIHByb3BlcnRpZXMgbGF0ZXJcbnZhciBlbWl0dGVyUHJvdG90eXBlID0ge1xuXHRvbjogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBsaXN0ZW5lciwgb25jZSkge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblxuXHRcdGxpc3RlbmVycy5wdXNoKHsgY2FsbGJhY2s6IGxpc3RlbmVyLCBvbmNlOiBvbmNlIH0pO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b25jZTogZnVuY3Rpb24gb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0dGhpcy5vbihldmVudE5hbWUsIGxpc3RlbmVyLCB0cnVlKTtcblx0fSxcblxuXHRvZmY6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0aWYgKHR5cGVvZiBldmVudE5hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGxpc3RlbmVyID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnNbaV0uY2FsbGJhY2sgPT09IGxpc3RlbmVyKSBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lKSB7XG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG5cdFx0ICAgIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdLFxuXHRcdCAgICBvbmNlTGlzdGVuZXJzID0gW10sXG5cdFx0ICAgIGksXG5cdFx0ICAgIGxpc3RlbmVyO1xuXG5cdFx0Ly8gQ2FsbCBsaXN0ZW5lcnNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyLmNhbGxiYWNrKSBsaXN0ZW5lci5jYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm90IGEgY2FsbGJhY2ssIHJlbW92ZSFcblx0XHRcdFx0bGlzdGVuZXIub25jZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsaXN0ZW5lci5vbmNlKSBvbmNlTGlzdGVuZXJzLnB1c2goaSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVycyBtYXJrZWQgYXMgb25jZVxuXHRcdGZvciAoaSA9IG9uY2VMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2Uob25jZUxpc3RlbmVyc1tpXSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cbi8vIEV2ZW50RW1pdHRlciBtZXRob2RzXG54VXRpbHMuX2V4dGVuZChlbWl0dGVyUHJvdG90eXBlLCB7XG5cdGFkZExpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9uLFxuXHRyZW1vdmVMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdHJlbW92ZUFsbExpc3RlbmVyczogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdGVtaXQ6IGVtaXR0ZXJQcm90b3R5cGUudHJpZ2dlclxufSk7XG5cbi8vIE1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlIHNvLCB3aGVuIHRoZSBzdG9yZXMgYXJlXG4vLyBleHRlbmRlZCB3aXRoIHRoZSBlbWl0dGVyLCB0aGV5IGNhbiBiZSBpdGVyYXRlZCBhc1xuLy8gaGFzaG1hcHNcblhFbWl0dGVyLnByb3RvdHlwZSA9IHt9O1xuZm9yICh2YXIgbWV0aG9kIGluIGVtaXR0ZXJQcm90b3R5cGUpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kLCB7XG5cdFx0dmFsdWU6IGVtaXR0ZXJQcm90b3R5cGVbbWV0aG9kXVxuXHR9KTtcbn1cblxuLy8gRXh0ZW5kIG1ldGhvZCBmb3IgJ2luaGVyaXRhbmNlJywgbm9kIHRvIGJhY2tib25lLmpzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIsICdfZXh0ZW5kJywge1xuXHR2YWx1ZTogZnVuY3Rpb24gdmFsdWUocHJvdG9Qcm9wcykge1xuXHRcdHZhciBwYXJlbnQgPSB0aGlzLFxuXHRcdCAgICBjaGlsZDtcblxuXHRcdGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuaGFzT3duUHJvcGVydHkoY29uc3RydWN0b3IpKSB7XG5cdFx0XHRjaGlsZCA9IHByb3RvUHJvcHMuY29uc3RydWN0b3I7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkID0gZnVuY3Rpb24gY2hpbGQoKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0eFV0aWxzLl9leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cblx0XHR2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24gU3Vycm9nYXRlKCkge1xuXHRcdFx0Ly8gQWdhaW4gdGhlIGNvbnN0cnVjdG9yIGlzIGFsc28gZGVmaW5lZCBhcyBub3QgZW51bWVyYWJsZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicsIHtcblx0XHRcdFx0dmFsdWU6IGNoaWxkXG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXHRcdGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuXHRcdC8vIEFsbCB0aGUgZXh0ZW5kaW5nIG1ldGhvZHMgbmVlZCB0byBiZSBhbHNvXG5cdFx0Ly8gbm9uIGVudW1lcmFibGUgcHJvcGVydGllc1xuXHRcdGlmIChwcm90b1Byb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHByb3RvUHJvcHMpIHtcblx0XHRcdFx0aWYgKHAgIT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZC5wcm90b3R5cGUsIHAsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm90b1Byb3BzW3BdXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRW1pdHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveEVtaXR0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG52YXIgeFV0aWxzID0ge1xuXHQvLyBPYmplY3QgZXh0ZW5kLCBOb2QgdG8gdW5kZXJzY29yZS5qc1xuXHRfZXh0ZW5kOiBmdW5jdGlvbiBfZXh0ZW5kKG9iaikge1xuXHRcdHZhciBzb3VyY2UsIHByb3A7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0c291cmNlID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0Zm9yIChwcm9wIGluIHNvdXJjZSkge1xuXHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSB4VXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgUGFnZUxhYmVsID0gcmVxdWlyZSgnLi4vcGFnZS1sYWJlbC9wYWdlLWxhYmVsLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9mb3JtLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzczc9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczdfX19fS2V5IGluIF9fX19DbGFzczcpe2lmKF9fX19DbGFzczcuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzN19fX19LZXkpKXtGb3JtW19fX19DbGFzczdfX19fS2V5XT1fX19fQ2xhc3M3W19fX19DbGFzczdfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNz1fX19fQ2xhc3M3PT09bnVsbD9udWxsOl9fX19DbGFzczcucHJvdG90eXBlO0Zvcm0ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczcpO0Zvcm0ucHJvdG90eXBlLmNvbnN0cnVjdG9yPUZvcm07Rm9ybS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3M3O1xyXG4gICAgZnVuY3Rpb24gRm9ybShwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzczcuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwYWdlczogdGhpcy5wcm9wcy5wYWdlc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVQYWdlQ2xpY2sgPSB0aGlzLmhhbmRsZVBhZ2VDbGljay5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsXCJoYW5kbGVQYWdlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihwYWdlKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljayhwYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgbGV0IHBhZ2VzID0gdGhpcy5zdGF0ZS5wYWdlcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgIHBhZ2VzLm1hcChmdW5jdGlvbihwYWdlLCBpZHgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2VMYWJlbCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpZHgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBpZHggPT0gMCA/IHRydWU6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVBhZ2VDbGljazogdGhpcy5oYW5kbGVQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogcGFnZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdwYWdlLScgKyBpZHh9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLnBhZ2V9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuO1xyXG5cclxuXHJcbkZvcm0uUHJvcFR5cGVzID0ge1xyXG4gICAgcGFnZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGhhbmRsZVBhZ2VDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkZvcm0uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS9mb3JtLmpzeFxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9wYWdlLWxhYmVsLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc3Q9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3RfX19fS2V5IGluIF9fX19DbGFzc3Qpe2lmKF9fX19DbGFzc3QuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzdF9fX19LZXkpKXtQYWdlTGFiZWxbX19fX0NsYXNzdF9fX19LZXldPV9fX19DbGFzc3RbX19fX0NsYXNzdF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N0PV9fX19DbGFzc3Q9PT1udWxsP251bGw6X19fX0NsYXNzdC5wcm90b3R5cGU7UGFnZUxhYmVsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N0KTtQYWdlTGFiZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yPVBhZ2VMYWJlbDtQYWdlTGFiZWwuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzdDtcclxuICAgIGZ1bmN0aW9uIFBhZ2VMYWJlbChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3QuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQYWdlTGFiZWwucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc2FibGVkOiBuZXh0UHJvcHMuZGlzYWJsZWR9KTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBhZ2VMYWJlbC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LosINC/0L7QtNCz0YDRg9C20LDQtdC8INGB0LLRj9C30LDQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVQYWdlQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVQYWdlQ2xpY2socGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGFnZUxhYmVsLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlLFxyXG4gICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVzLnBhZ2VMYWJlbCwgdGhpcy5wcm9wcy5hY3RpdmUgID8ge2JhY2tncm91bmRDb2xvcjond2hpdGUnfToge30pXHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge3N0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwicGFnZUxhYmVsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja30sIFxyXG4gICAgICAgICAgICBwYWdlLnBhZ2VOYW1lXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5QYWdlTGFiZWwuUHJvcFR5cGVzID0ge1xyXG4gICAgaGFuZGxlUGFnZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIHBhZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufTtcclxuXHJcblxyXG5QYWdlTGFiZWwuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgYWN0aXZlOiB0cnVlXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VMYWJlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLmpzeFxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdlTGFiZWw6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHdoaXRlJyxcbiAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzJweCAxMHB4IDJweCAxMHB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2UtbGFiZWwvcGFnZS1sYWJlbC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGFnZToge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICczcHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICdpbWFnZXMvaWNvbnMvYWRkLnBuZycsXG4gICAgICAgIGVkaXQ6ICdpbWFnZXMvaWNvbnMvZWRpdC5wbmcnLFxuICAgICAgICBkZWxldGU6ICdpbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJ2ltYWdlcy9pY29ucy9maWx0ZXIucG5nJyxcbiAgICAgICAgcHJpbnQ6ICdpbWFnZXMvaWNvbnMvcHJpbnQucG5nJyxcbiAgICAgICAgb2s6ICdpbWFnZXMvaWNvbnMvb2sucG5nJyxcbiAgICAgICAgY2FuY2VsOiAnaW1hZ2VzL2ljb25zL2NhbmNlbC5wbmcnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS9mb3JtLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9pbnB1dC10ZXh0LXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzczg9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczhfX19fS2V5IGluIF9fX19DbGFzczgpe2lmKF9fX19DbGFzczguaGFzT3duUHJvcGVydHkoX19fX0NsYXNzOF9fX19LZXkpKXtJbnB1dFtfX19fQ2xhc3M4X19fX0tleV09X19fX0NsYXNzOFtfX19fQ2xhc3M4X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczg9X19fX0NsYXNzOD09PW51bGw/bnVsbDpfX19fQ2xhc3M4LnByb3RvdHlwZTtJbnB1dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOCk7SW5wdXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUlucHV0O0lucHV0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczg7XHJcbiAgICBmdW5jdGlvbiBJbnB1dChwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzczguY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICB2YWxpZDogcHJvcHMudmFsaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHl9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25DaGFuZ2UnLCBlLnRhcmdldCk7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgbGV0IGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMudGl0bGUsXHJcbiAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLndpZHRoID8ge3dpZHRoOiB0aGlzLnByb3BzLndpZHRofSA6IHt9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5zdGF0ZS5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHBhdHRlcm46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59XHJcblxyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgdmFsaWQ6IHRydWUsXHJcbiAgICB0aXRsZTogJydcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeFxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vaW5wdXQtZGF0ZS1zdHlsZXMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3M5PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M5X19fX0tleSBpbiBfX19fQ2xhc3M5KXtpZihfX19fQ2xhc3M5Lmhhc093blByb3BlcnR5KF9fX19DbGFzczlfX19fS2V5KSl7SW5wdXREYXRlW19fX19DbGFzczlfX19fS2V5XT1fX19fQ2xhc3M5W19fX19DbGFzczlfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOT1fX19fQ2xhc3M5PT09bnVsbD9udWxsOl9fX19DbGFzczkucHJvdG90eXBlO0lucHV0RGF0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOSk7SW5wdXREYXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1JbnB1dERhdGU7SW5wdXREYXRlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczk7XHJcblxyXG4gICAgZnVuY3Rpb24gSW5wdXREYXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzOS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXREYXRlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0RGF0ZS5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShmaWVsZFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC90YPQuywg0YLQviDQv9GD0YHRgtGMINCx0YPQtNC10YIgbnVsXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6LCDQstC10YDQvdC10Lwg0LXQs9C+XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dERhdGUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMudGl0bGUsXHJcbiAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLndpZHRoID8ge3dpZHRoOiB0aGlzLnByb3BzLndpZHRofSA6IHt9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7c3R5bGU6IHN0eWxlcy5sYWJlbCwgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCByZWY6IFwibGFiZWxcIn0sIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnN0YXRlLnJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMucHJvcHMubWluLCBcclxuICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5wcm9wcy5tYXgsIFxyXG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dERhdGUucHJvdG90eXBlLFwidmFsaWRhdGVcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC90LAg0LzQuNC9ICwg0LzQsNGFXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWluICYmIHRoaXMucHJvcHMubWF4ICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlVmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChkYXRlVmFsdWUgPiB0aGlzLnByb3BzLm1pbiAmJiBkYXRlVmFsdWUgPCB0aGlzLnByb3BzLm1heCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5JbnB1dERhdGUuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihEYXRlKSxcclxuICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKERhdGUpLFxyXG4gICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoRGF0ZSksXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwYXR0ZXJuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG59XHJcblxyXG5cclxuSW5wdXREYXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgdGl0bGU6ICcnXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJSdcbiAgICB9LFxuICAgIGZvY3VzZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRibHVlJ1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0YzRUZFRidcbiAgICB9LFxuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzk1JSdcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICAgIHdpZHRoOiAnMzAlJyxcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vaW5wdXQtbnVtYmVyLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc2E9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2FfX19fS2V5IGluIF9fX19DbGFzc2Epe2lmKF9fX19DbGFzc2EuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzYV9fX19LZXkpKXtJbnB1dFtfX19fQ2xhc3NhX19fX0tleV09X19fX0NsYXNzYVtfX19fQ2xhc3NhX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2E9X19fX0NsYXNzYT09PW51bGw/bnVsbDpfX19fQ2xhc3NhLnByb3RvdHlwZTtJbnB1dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzYSk7SW5wdXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUlucHV0O0lucHV0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2E7XHJcbiAgICBmdW5jdGlvbiBJbnB1dChwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzc2EuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICB2YWxpZDogcHJvcHMudmFsaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHl9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCA/IHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aH0gOiB7fSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBpbnB1dE1pblZhbHVlID0gdGhpcy5wcm9wcy5taW4sXHJcbiAgICAgICAgICAgIGlucHV0TWF4VmFsdWUgPSB0aGlzLnByb3BzLm1heDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMuc3RhdGUucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBtaW46IGlucHV0TWluVmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG1heDogaW5wdXRNYXhWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHBhdHRlcm46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxyXG59XHJcblxyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgdmFsaWQ6IHRydWUsXHJcbiAgICBtaW46IC05OTk5OTk5OTksXHJcbiAgICBtYXg6IDk5OTk5OTk5OVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vLi4vaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlVGltZSA9IHJlcXVpcmUoJy4vLi4vZG9jLWlucHV0LWRhdGV0aW1lLmpzeCcpLFxyXG4gICAgRG9jTGlzdCA9IHJlcXVpcmUoJy4vLi4vZG9jLWlucHV0LWxpc3QuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1jb21tb24tc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzYj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzYl9fX19LZXkgaW4gX19fX0NsYXNzYil7aWYoX19fX0NsYXNzYi5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NiX19fX0tleSkpe0RvY0NvbW1vbltfX19fQ2xhc3NiX19fX0tleV09X19fX0NsYXNzYltfX19fQ2xhc3NiX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2I9X19fX0NsYXNzYj09PW51bGw/bnVsbDpfX19fQ2xhc3NiLnByb3RvdHlwZTtEb2NDb21tb24ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2IpO0RvY0NvbW1vbi5wcm90b3R5cGUuY29uc3RydWN0b3I9RG9jQ29tbW9uO0RvY0NvbW1vbi5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NiO1xyXG4gICAgZnVuY3Rpb24gRG9jQ29tbW9uKHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzYi5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NDb21tb24ucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8vINC/0YDQuCDQuNC30LzQtdC90LXQvdC40LgsINC/0L7QvNC10L3Rj9C10YIg0YHQvtGB0YLQvtGP0L3QuNC1ICjQv9C10YDQtdC00LDRgdGCINC00LDQu9GM0YjQtSDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6bmV4dFByb3BzLnJlYWRPbmx5IH0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY0NvbW1vbi5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuLypcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgYnBtID0gZGF0YS5icG0gfHwgW10sXHJcbiAgICAgICAgICAgIGFjdHVhbFN0ZXBEYXRhID0gYnBtLmZpbHRlcigoc3RlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0YLQtdC60YPRidC40Lkg0YjQsNCzINCR0J9cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGV4ZWN1dGVycyA9IGFjdHVhbFN0ZXBEYXRhLm1hcCgoc3RlcERhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0L3QsNC50LTQtdC8INC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXBEYXRhLmFjdG9ycyB8fCB7bmFtZTogJ0FVVEhPUid9O1xyXG4gICAgICAgICAgICB9KTtcclxuKi9cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcIndyYXBwZXJcIiwgc3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJjcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmNyZWF0ZWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtyZWY6IFwibGFzdHVwZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXBkYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0dXBkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5sYXN0dXBkYXRlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCB3aWR0aDogXCI3NSVcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7cmVmOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jQ29tbW9uLnByb3RvdHlwZSxcIm9uQ2hhbmdlSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlucHV0TmFtZSwgaW5wdXRWYWx1ZSkge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuVxyXG4gICAgICAgIGxldCBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuRG9jQ29tbW9uLlByb3BUeXBlcyA9IHtcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5Eb2NDb21tb24uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IHRydWVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NDb21tb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlVGltZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dERhdGVUaW1lXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIHJlYWRPbmx5OiB0cnVlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbE1vdW50JyArIHRoaXMucHJvcHMubmFtZSk7XHJcbi8qXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6MH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcblxyXG4gLy8gICAgICAgY29uc29sZS5sb2coJ3Zhc3R1czonICsgcmV0dXJudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncHJvcHM6JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKTtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPXRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXREaXNhYmxlZCA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZXRpbWUtbG9jYWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRldGltZS1sb2NhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGVUaW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZXRpbWUuanN4XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG5cclxuICAgIExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTGlzdFwiLFxyXG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdNeSBkZWZhdWx0IExpc3QnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogIGNvbXBvbmVudFdpbGxNb3VudDogKCk9PiB7XHJcbiAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgdmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICB2YXIgdmFzdHVzID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgLy8gd2lsbCB3YXRjaCBsaWJzIGNoYW5nZSAoZnJvbSBzZXJ2ZXIpXHJcbiAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcclxuICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGhhbmRsZUxpQ2xpY2s6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IGluZGV4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBoYW5kbGVDbGlja0J0bkRlbGV0ZUV4ZWN1dG9yOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaXN0IGJ0biBkZWxldGUnLCBpbmRleCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlQ2xpY2tCdG5BZGRFeGVjdXRvcjogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbGlzdCBidG4gYWRkJywgaW5kZXgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCDRgdGA0LXQttC40LzQsCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDQv9C+0LzQtdC90Y/QtdGCINGB0L7RgdGC0L7Rj9C90LjQtSDQstC40LTQttC10YLQsFxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0IGZvcm0td2lkZ2V0JyxcclxuICAgICAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgT3B0aW9ucyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyDRgdC+0LfQtNCw0LTQuNC8INGB0L/QuNGB0L7QuiDQt9C90LDRh9C10L3QuNC5XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgT3B0aW9ucyA9IGRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PSBpbmRleCAmJiAhdGhpcy5zdGF0ZS5yZWFkT25seSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LLRi9C00LXQu9C40Lwg0LIg0YHQv9C40YHQutC1INC30L3QsNGH0LXQvdC40LUsINC/0YDQuCDRg9GB0LvQvtCy0LjQuCwg0YfRgtC+INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyDRjdGC0L4g0L/QvtC30LLQvtC70Y/QtdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArICcgZm9jdXNlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IE1hdGgucmFuZG9tKCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9fSwgXHJcbiAgICAgICAgICAgICAgICBPcHRpb25zXHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2Rpc3BsYXk6IFwiZmxleFwifX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7c3R5bGU6IHtwYWRkaW5nUmlnaHQ6IFwiNXB4XCJ9fSwgXCIgXCIsIHRoaXMucHJvcHMudGl0bGUpLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgdmFsdWU6IFwiIEFkZCBcIiwgb25DbGljazogdGhpcy5oYW5kbGVDbGlja0J0bkFkZEV4ZWN1dG9yfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCB2YWx1ZTogXCIgRGVsZXRlIFwiLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrQnRuRGVsZXRlRXhlY3V0b3J9KVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICB3aWRnZXRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeFxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uL2RvYy1jb21tb24tc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9zZWxlY3Qtc3R5bGVzJyk7XHJcblxyXG4vLyAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xyXG5cclxudmFyIF9fX19DbGFzc2w9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2xfX19fS2V5IGluIF9fX19DbGFzc2wpe2lmKF9fX19DbGFzc2wuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbF9fX19LZXkpKXtTZWxlY3RbX19fX0NsYXNzbF9fX19LZXldPV9fX19DbGFzc2xbX19fX0NsYXNzbF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NsPV9fX19DbGFzc2w9PT1udWxsP251bGw6X19fX0NsYXNzbC5wcm90b3R5cGU7U2VsZWN0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NsKTtTZWxlY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yPVNlbGVjdDtTZWxlY3QuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzbDtcclxuICAgIGZ1bmN0aW9uIFNlbGVjdChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2wuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUvKiDQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90LjRjiDQmNCUICovLFxyXG4gICAgICAgICAgICByZWFkT25seTogcHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcclxuICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgZmllbGRWYWx1ZTogcHJvcHMudmFsdWUgLyrQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90Lgg0L/QvtC70Y8gY29sbElkICovLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IHByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi9cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5EZWxDbGljayA9IHRoaXMuYnRuRGVsQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJmaW5kRmllbGRWYWx1ZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHJvd1tjb2xsSWRdLCBmaWVsZFZhbHVlOiByb3dbY29sbElkXX0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJnZXRWYWx1ZUJ5SWRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihjb2xsSWQsIHJvd0lkKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC30L3QsNGH0LXQvdC40Y8g0L/QvtC70Y8g0L/QviDQstGL0LHRgNCw0L3QvdC+0LzRgyDQmNCUXHJcblxyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gcm93SWQpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSByb3dbY29sbElkXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkVmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5LCBkYXRhOiBuZXh0UHJvcHMuZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICBmaWVsZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbGxJZCkge1xyXG4gICAgICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0L/QviDQuNC0INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y8g0LIgY29sbElkXHJcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSB0aGlzLmdldFZhbHVlQnlJZCh0aGlzLnByb3BzLmNvbGxJZCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LjQtCDQutCw0LogdmFsdWVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWUsIGZpZWxkVmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH19KTtcclxuXHJcbi8qXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiovXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YU9wdGlvbnMgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnRpdGxlLFxyXG4gICAgICAgICAgICBPcHRpb25zID0gbnVsbCxcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTsgLy8g0JTQsNC00LjQvCDQtNC10YTQvtC70YLQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8g0LLQuNC00LbQtdGC0LAsINGH0YLQvtCxINC/0L7QutCw0YLRjCDQtdCz0L4g0YHRgNCw0LfRgywg0LTQviDQv9C+0LTQs9GA0YPQt9C60Lgg0LHQuNCx0LvQuNC+0YLQtdC60LhcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlKSB7IC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YMg0LIg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0L/Rg9GB0YLQvtC5INGB0YLRgNC+0LrQuCDQsiDQvNCw0YHRgdC40LLQtVxyXG5cclxuICAgICAgICAgICAgbGV0IGVtcHR5T2JqID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9iaikgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZW1wdHlPYmogfHwgZW1wdHlPYmoubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zLnNwbGljZSgwLCAwLCB7aWQ6IDAsIGtvb2Q6ICcnLCBuYW1lOiAnJ30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGRhdGFWYWx1ZSA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICBpZiAoaXRlbVt0aGlzLnByb3BzLmNvbGxJZF0gPT09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBPcHRpb25zID0gZGF0YU9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gJ29wdGlvbi0nICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IGl0ZW1bdGhpcy5wcm9wcy5jb2xsSWRdLCBrZXk6IGtleSwgcmVmOiBrZXl9LCBcIiBcIiwgaXRlbS5uYW1lLCBcIiBcIilcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSBkYXRhVmFsdWUubGVuZ3RoID4gMCA/IGRhdGFWYWx1ZVswXS5uYW1lIDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT3B0aW9ucyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiAwLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBcIiBFbXB0eSBcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LCBpbnB1dFJlYWRPbmx5ID8ge30gOiBzdHlsZXMuaGlkZSxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/IHN0eWxlcy5yZWFkT25seToge30pLFxyXG4gICAgICAgICAgICBzZWxlY3RTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5zZWxlY3QsIGlucHV0UmVhZE9ubHkgPyBzdHlsZXMuaGlkZSA6IHt9LCBpbnB1dFJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5OiB7fSksXHJcbiAgICAgICAgICAgIGJ1dHRvblN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmJ1dHRvbiwgdGhpcy5wcm9wcy5idG5EZWxldGUgPyB7fSA6IHN0eWxlcy5oaWRlKVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXIsIHJlZjogXCJ3cmFwcGVyXCJ9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtyZWY6IFwibGFiZWxcIiwgc3R5bGU6IHN0eWxlcy5sYWJlbCwgXHJcbiAgICAgICAgICAgICAgICAgICBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWV9LCB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZTogaW5wdXREZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWV9KSwgXHJcblxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtyZWY6IFwic2VsZWN0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzZWxlY3RTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfSwgT3B0aW9uc1xyXG4gICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7cmVmOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogYnV0dG9uU3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuRGVsQ2xpY2t9LCBcbiAgICAgICAgICAgICAgICBcIkRlbGV0ZVwiXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0LnByb3RvdHlwZSxcImJ0bkRlbENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9C+INCy0YvQt9C+0LLRgyDQutC90L7Qv9C60YMg0YPQtNCw0LvQuNGC0YwsINC+0LHQvdGD0LvRj9C10YIg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiAnJ30pO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblNlbGVjdC5Qcm9wVHlwZXMgPSB7XHJcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBidG5EZWxldGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgbGliczpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY29sbElkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59XHJcblxyXG5TZWxlY3QuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgdmFsaWQ6IHRydWUsXHJcbiAgICBidG5EZWxldGU6IGZhbHNlLFxyXG4gICAgdmFsdWU6IDAsXHJcbiAgICBjb2xsSWQ6ICdpZCcsXHJcbiAgICB0aXRsZTogJydcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzeFxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG5cbiAgICB9LFxuICAgIGlucHV0OiB7XG4gICAgICAgIHdpZHRoOiAnNzAlJyxcbiAgICAgICAgbWFyZ2luTGVmdDogJzVweCdcblxuICAgIH0sXG4gICAgaGlkZToge1xuICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9LFxuICAgIHNlbGVjdDoge1xuICAgICAgICB3aWR0aDogJzYwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICByZWFkT25seToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjNFRkVGJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgd2lkdGg6ICczMCUnLFxuICAgICAgICBtYXJnaW46ICc1cHgnXG4gICAgfSxcbiAgICBidXR0b246IHtcbiAgICAgICAgd2lkdGg6ICcxMCUnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi90ZXh0LWFyZWEtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzYz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzY19fX19LZXkgaW4gX19fX0NsYXNzYyl7aWYoX19fX0NsYXNzYy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NjX19fX0tleSkpe0lucHV0W19fX19DbGFzc2NfX19fS2V5XT1fX19fQ2xhc3NjW19fX19DbGFzc2NfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzYz1fX19fQ2xhc3NjPT09bnVsbD9udWxsOl9fX19DbGFzc2MucHJvdG90eXBlO0lucHV0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NjKTtJbnB1dC5wcm90b3R5cGUuY29uc3RydWN0b3I9SW5wdXQ7SW5wdXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzYztcclxuICAgIGZ1bmN0aW9uIElucHV0KHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzYy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCByZWFkT25seTogdHJ1ZSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy50aXRsZSxcclxuICAgICAgICAgICAgaW5wdXRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5pbnB1dCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGggPyB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGh9IDoge30sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5IDoge31cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcblxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLmxhYmVsfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGlucHV0U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuO1xyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbn1cclxuXHJcbklucHV0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgdGl0bGU6ICcnXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5OCUnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RhdGEtZ3JpZC1zdHlsZXMnKSxcclxuICAgIGtleWRvd24gPSByZXF1aXJlKCdyZWFjdC1rZXlkb3duJyksXHJcbiAgICBLRVlTID0gWyAzOCwgNDBdOyAvLyDQvNC+0L3QuNGC0L7RgNC40Lwg0YLQvtC70YzQutC+INGB0YLRgNC10LvQutC4INCy0LLQtdGA0YUg0Lgg0LLQvdC40LfRhVxyXG5cclxuY29uc3QgaXNFeGlzdHMgPSBmdW5jdGlvbihvYmplY3QsIHByb3ApICB7XHJcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICBpZiAocHJvcCBpbiBvYmplY3QpIHtcclxuICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy9Aa2V5ZG93biBAdG9kb1xyXG52YXIgX19fX0NsYXNzZD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzZF9fX19LZXkgaW4gX19fX0NsYXNzZCl7aWYoX19fX0NsYXNzZC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NkX19fX0tleSkpe0RhdGFHcmlkW19fX19DbGFzc2RfX19fS2V5XT1fX19fQ2xhc3NkW19fX19DbGFzc2RfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZD1fX19fQ2xhc3NkPT09bnVsbD9udWxsOl9fX19DbGFzc2QucHJvdG90eXBlO0RhdGFHcmlkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NkKTtEYXRhR3JpZC5wcm90b3R5cGUuY29uc3RydWN0b3I9RGF0YUdyaWQ7RGF0YUdyaWQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzZDtcclxuICAgIGZ1bmN0aW9uIERhdGFHcmlkKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzZC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgYWN0aXZlUm93OiAwLFxyXG4gICAgICAgICAgICBhY3RpdmVDb2x1bW46ICcnLFxyXG4gICAgICAgICAgICBzb3J0OiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVHcmlkSGVhZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNlbGxEYmxDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucHJlcGFyZVRhYmxlUm93ID0gdGhpcy5wcmVwYXJlVGFibGVSb3cuYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L3QsNC00LXQvCDQv9C+INC/0L4gcHJvcHMudmFsdWUg0LjQvdC00LXQutGBINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlUm93OiBpbmRleH0pO1xyXG4gICAgICAgIH1cclxuICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJnZXRHcmlkUm93SW5kZXhCeUlkXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZG9jSWQpIHtcclxuICAgICAgICAvLyDQuNGJ0LXQvCDQuNC90LTQtdGFINCyINC80LDRgdGB0LjQstC1INC00LDQvdC90YvRhVxyXG4gICAgICAgIGxldCBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmdyaWREYXRhO1xyXG5cclxuICAgICAgICBpZiAoZG9jSWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgZGF0YVtpXVsnaWQnXSA9PSBkb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUNlbGxDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+0LHRi9GC0Lgg0LrQu9C40LrQsCDQv9C+INGP0YfQtdC50LrQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmVSb3c6IGlkeFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmlkRGF0YS5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgICAgICAgbGV0IGRvY0lkID0gdGhpcy5wcm9wcy5ncmlkRGF0YVtpZHhdLmlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24sIGRvY0lkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUNlbGxEYmxDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLQvNC10YLQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC4INCy0YvQt9C+0LLQtdC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPIGRibENsaWNrXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDZWxsQ2xpY2soaWR4KVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRibENsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJoYW5kbGVHcmlkSGVhZGVyQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgbGV0ICBzb3J0ID0gdGhpcy5zdGF0ZS5zb3J0O1xyXG4gICAgICAgIGlmIChzb3J0Lm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgc29ydC5kaXJlY3Rpb24gPSBzb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYycgPyAnZGVzYyc6ICdhc2MnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAnYXNjJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc29ydEJ5ID0gW3tjb2x1bW46IHNvcnQubmFtZSwgZGlyZWN0aW9uOiBzb3J0LmRpcmVjdGlvbn1dO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlQ29sdW1uOm5hbWUsXHJcbiAgICAgICAgICAgIHNvcnQ6IHNvcnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25IZWFkZXJDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSGVhZGVyQ2xpY2soc29ydEJ5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJoYW5kbGVLZXlEb3duXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINGA0LXQsNC60YbQuNGPINC90LAg0LrQu9Cw0LLQuNCw0YLRg9GA0YNcclxuICAgICAgICBsZXQgcm93SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZVJvdztcclxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgKyAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmdyaWREYXRhLmxlbmd0aCA8IHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdC8INC/0YDQtdC20L3QtdC1INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgICAgICAgICByb3dJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlUm93XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgLSAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgcm93SW5kZXggPSByb3dJbmRleCA8IDAgPyAwOiByb3dJbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICBhY3RpdmVSb3c6IHJvd0luZGV4XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZENvbHVtbnM6IG5leHRQcm9wcy5ncmlkQ29sdW1ucywgZ3JpZERhdGE6bmV4dFByb3BzLmdyaWREYXRhfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSAndGgnO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5UHJlc3MoJ0Rvd24nKSxcclxuICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2soKSxcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwge3JlZjogXCJkYXRhR3JpZFRhYmxlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVRhYmxlSGVhZGVyKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUYWJsZVJvdygpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgIH19KTsgLy8gcmVuZGVyXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcInByZXBhcmVUYWJsZVJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdyaWREYXRhLm1hcChmdW5jdGlvbihyb3csIHJvd0luZGV4KSAge1xyXG4gICAgICAgICAgICBsZXQgc2V0Um93QWN0aXZlID0ge30sXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJbmRleCA9ICd0ci0nICsgcm93SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVSb3cgPSB0aGlzLnN0YXRlLmFjdGl2ZVJvdztcclxuXHJcbiAgICAgICAgICAgIGxldCByb3dPYmplY3QgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHtcclxuICAgICAgICAgICAgICAgIHJlZjogb2JqZWN0SW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDZWxsQ2xpY2suYmluZCh0aGlzLCByb3dJbmRleCksIFxyXG4gICAgICAgICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2suYmluZCh0aGlzLCByb3dJbmRleCksIFxyXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSwgXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRyLCBhY3RpdmVSb3cgPT09IHJvd0luZGV4ID8gc3R5bGVzLmZvY3VzZWQ6IHt9KSwgXHJcbiAgICAgICAgICAgICAgICBrZXk6IG9iamVjdEluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGNvbHVtbkluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbEluZGV4ID0gJ3RkLScgKyByb3dJbmRleCArICctJyArIGNvbHVtbkluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3BsYXkgPSAoaXNFeGlzdHMoY29sdW1uLCAnc2hvdycpID8gY29sdW1uLnNob3c6IHRydWUpID8gdHJ1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGlzRXhpc3RzKGNvbHVtbiwgJ3dpZHRoJykgPyBjb2x1bW4ud2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRkLCAhZGlzcGxheSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge30sIHt3aWR0aDogd2lkdGh9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwge3N0eWxlOiBzdHlsZSwgcmVmOiBjZWxsSW5kZXgsIGtleTogY2VsbEluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93W2NvbHVtbi5pZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dPYmplY3Q7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwicHJlcGFyZVRhYmxlSGVhZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoJztcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGluZGV4KSAge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVySW5kZXggPSAndGgtJyArIGluZGV4O1xyXG5cclxuICAgICAgICAgICAgIGxldCBkaXNwbGF5ID0gKGlzRXhpc3RzKGNvbHVtbiwgJ3Nob3cnKSA/IGNvbHVtbi5zaG93OiB0cnVlKSA/IHRydWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgIHdpZHRoID0gaXNFeGlzdHMoY29sdW1uLCAnd2lkdGgnKSA/IGNvbHVtbi53aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRoLCAhZGlzcGxheSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge30sIHt3aWR0aDogd2lkdGh9KSxcclxuICAgICAgICAgICAgICAgICBhY3RpdmVDb2x1bW4gPSB0aGlzLnN0YXRlLmFjdGl2ZUNvbHVtbixcclxuICAgICAgICAgICAgICAgICBpY29uVHlwZSA9IHRoaXMuc3RhdGUuc29ydC5kaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZUFzYyA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVzLmltYWdlLCAoYWN0aXZlQ29sdW1uID09IGNvbHVtbi5pZCAmJiBpY29uVHlwZSA9PSAnYXNjJyApICA/IHt9OiB7ZGlzcGxheTogJ25vbmUnfSksXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZURlc2MgPSBPYmplY3QuYXNzaWduKHt9LHN0eWxlcy5pbWFnZSwgKGFjdGl2ZUNvbHVtbiA9PSBjb2x1bW4uaWQgJiYgaWNvblR5cGUgPT0gJ2Rlc2MnICkgID8ge306IHtkaXNwbGF5OiAnbm9uZSd9KVxyXG5cclxuICAgICAgICAgICAgLy8g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlLCBcclxuICAgICAgICAgICAgICAgIHJlZjogaGVhZGVySW5kZXgsIFxyXG4gICAgICAgICAgICAgICAga2V5OiBoZWFkZXJJbmRleCwgXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKHRoaXMsIGNvbHVtbi5pZCl9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGNvbHVtbi5uYW1lKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZUFzY1wiLCBzdHlsZTogaW1hZ2VTdHlsZUFzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2FzYyddfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VEZXNjXCIsIHN0eWxlOiBpbWFnZVN0eWxlRGVzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2Rlc2MnXX0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcbkRhdGFHcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIGdyaWRDb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGdyaWREYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkRibENsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSGVhZGVyQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgYWN0aXZlUm93OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcbn1cclxuXHJcblxyXG5EYXRhR3JpZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBncmlkQ29sdW1uczogW10sXHJcbiAgICBncmlkRGF0YTogW11cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUdyaWQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0aDoge1xuICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmV5JyxcbiAgICAgICAgaGVpZ2h0OiAnNTBweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknXG4gICAgfSxcblxuICAgIHRyOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuICAgIH0sXG5cbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuXG4gICAgdGQ6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGxpZ2h0Z3JheSdcbiAgICB9LFxuXG4gICAgaWNvbnM6IHtcbiAgICAgICAgYXNjOiAnL2ltYWdlcy9pY29ucy9zb3J0LWFscGhhLWFzYy5wbmcnLFxuICAgICAgICBkZXNjOiAnL2ltYWdlcy9pY29ucy9zb3J0LWFscGhhLWRlc2MucG5nJ1xuICAgIH0sXG5cbiAgICBpbWFnZToge1xuICAgICAgICBtYXJnaW46ICcxcHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLy8gcG9seWZpbGwgYXJyYXkuZnJvbSAobWFpbmx5IGZvciBJRSlcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9ialsnZGVmYXVsdCddIDogb2JqO1xufVxuXG5yZXF1aXJlKCcuL2xpYi9hcnJheS5mcm9tJyk7XG5cbi8vIEBrZXlkb3duIGFuZCBAa2V5ZG93blNjb3BlZFxuXG52YXIgX2RlY29yYXRvcnMgPSByZXF1aXJlKCcuL2RlY29yYXRvcnMnKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX2ludGVyb3BSZXF1aXJlKF9kZWNvcmF0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAna2V5ZG93blNjb3BlZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9kZWNvcmF0b3JzLmtleWRvd25TY29wZWQ7XG4gIH1cbn0pO1xuXG4vLyBzZXRCaW5kaW5nIC0gb25seSB1c2VmdWwgaWYgeW91J3JlIG5vdCBnb2luZyB0byB1c2UgZGVjb3JhdG9yc1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi9zdG9yZScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3NldEJpbmRpbmcnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RvcmUuc2V0QmluZGluZztcbiAgfVxufSk7XG5cbi8vIEtleXMgLSB1c2UgdGhpcyB0byBmaW5kIGtleSBjb2RlcyBmb3Igc3RyaW5ncy4gZm9yIGV4YW1wbGU6IEtleXMuaiwgS2V5cy5lbnRlclxuXG52YXIgX2xpYktleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzJyk7XG5cbmV4cG9ydHMuS2V5cyA9IF9pbnRlcm9wUmVxdWlyZShfbGliS2V5cyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA2LCAyMi4xLjIuMVxuLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2Zyb21cbid1c2Ugc3RyaWN0JztcblxuaWYgKCFBcnJheS5mcm9tKSB7XG4gIEFycmF5LmZyb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIGlzQ2FsbGFibGUoZm4pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfTtcbiAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gICAgICB2YXIgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlciA9PT0gMCB8fCAhaXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG4gICAgfTtcbiAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICAgIHZhciB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKHZhbHVlKSB7XG4gICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcbiAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW4sIDApLCBtYXhTYWZlSW50ZWdlcik7XG4gICAgfTtcblxuICAgIC8vIFRoZSBsZW5ndGggcHJvcGVydHkgb2YgdGhlIGZyb20gbWV0aG9kIGlzIDEuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgICAgLy8gMS4gTGV0IEMgYmUgdGhlIHRoaXMgdmFsdWUuXG4gICAgICB2YXIgQyA9IHRoaXM7XG5cbiAgICAgIC8vIDIuIExldCBpdGVtcyBiZSBUb09iamVjdChhcnJheUxpa2UpLlxuICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7XG5cbiAgICAgIC8vIDMuIFJldHVybklmQWJydXB0KGl0ZW1zKS5cbiAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgbWFwZm4gaXMgdW5kZWZpbmVkLCB0aGVuIGxldCBtYXBwaW5nIGJlIGZhbHNlLlxuICAgICAgdmFyIG1hcEZuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB2b2lkIHVuZGVmaW5lZDtcbiAgICAgIHZhciBUO1xuICAgICAgaWYgKHR5cGVvZiBtYXBGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gNS4gZWxzZVxuICAgICAgICAvLyA1LiBhIElmIElzQ2FsbGFibGUobWFwZm4pIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG4gICAgICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNS4gYi4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICBUID0gYXJndW1lbnRzWzJdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDEwLiBMZXQgbGVuVmFsdWUgYmUgR2V0KGl0ZW1zLCBcImxlbmd0aFwiKS5cbiAgICAgIC8vIDExLiBMZXQgbGVuIGJlIFRvTGVuZ3RoKGxlblZhbHVlKS5cbiAgICAgIHZhciBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xuXG4gICAgICAvLyAxMy4gSWYgSXNDb25zdHJ1Y3RvcihDKSBpcyB0cnVlLCB0aGVuXG4gICAgICAvLyAxMy4gYS4gTGV0IEEgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZFxuICAgICAgLy8gb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxuICAgICAgLy8gMTQuIGEuIEVsc2UsIExldCBBIGJlIEFycmF5Q3JlYXRlKGxlbikuXG4gICAgICB2YXIgQSA9IGlzQ2FsbGFibGUoQykgPyBPYmplY3QobmV3IEMobGVuKSkgOiBuZXcgQXJyYXkobGVuKTtcblxuICAgICAgLy8gMTYuIExldCBrIGJlIDAuXG4gICAgICB2YXIgayA9IDA7XG4gICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxuICAgICAgdmFyIGtWYWx1ZTtcbiAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xuICAgICAgICBpZiAobWFwRm4pIHtcbiAgICAgICAgICBBW2tdID0gdHlwZW9mIFQgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oa1ZhbHVlLCBrKSA6IG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW2tdID0ga1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGsgKz0gMTtcbiAgICAgIH1cbiAgICAgIC8vIDE4LiBMZXQgcHV0U3RhdHVzIGJlIFB1dChBLCBcImxlbmd0aFwiLCBsZW4sIHRydWUpLlxuICAgICAgQS5sZW5ndGggPSBsZW47XG4gICAgICAvLyAyMC4gUmV0dXJuIEEuXG4gICAgICByZXR1cm4gQTtcbiAgICB9O1xuICB9KCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyoqXG4gKiBAbW9kdWxlIGRlY29yYXRvcnNcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9jbGFzc19kZWNvcmF0b3IgPSByZXF1aXJlKCcuL2NsYXNzX2RlY29yYXRvcicpO1xuXG52YXIgX2NsYXNzX2RlY29yYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc19kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3IgPSByZXF1aXJlKCcuL21ldGhvZF9kZWNvcmF0b3InKTtcblxudmFyIF9tZXRob2RfZGVjb3JhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkID0gcmVxdWlyZSgnLi9tZXRob2RfZGVjb3JhdG9yX3Njb3BlZCcpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkKTtcblxuLyoqXG4gKiBfZGVjb3JhdG9yXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RGbiBUaGUgbWV0aG9kIHdyYXBwZXIgdG8gZGVsZWdhdGUgdG8sIGJhc2VkIG9uIHdoZXRoZXIgdXNlciBoYXMgc3BlY2lmaWVkIGEgc2NvcGVkIGRlY29yYXRvciBvciBub3RcbiAqIEBwYXJhbSB7QXJyYXl9IC4uLmFyZ3MgUmVtYWluZGVyIG9mIGFyZ3VtZW50cyBwYXNzZWQgaW5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZGVjb3JhdGVkIGNsYXNzIG9yIG1ldGhvZFxuICovXG5mdW5jdGlvbiBfZGVjb3JhdG9yKG1ldGhvZEZuKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgLy8gY2hlY2sgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHNlZSBpZiBpdCdzIGEgdXNlci1zdXBwbGllZCBrZXljb2RlIG9yIGFycmF5XG4gIC8vIG9mIGtleWNvZGVzLCBvciBpZiBpdCdzIHRoZSB3cmFwcGVkIGNsYXNzIG9yIG1ldGhvZFxuICB2YXIgdGVzdEFyZyA9IGFyZ3NbMF07XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh0ZXN0QXJnKTtcblxuICAvLyBpZiB0aGUgdGVzdCBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uLCBpdCBpcyB1c2VyLXN1cHBsaWVkXG4gIC8vIGtleWNvZGVzLiBlbHNlIHRoZXJlIGFyZSBubyBhcmd1bWVudHMgYW5kIGl0J3MganVzdCB0aGUgd3JhcHBlZCBjbGFzc1xuICAvLyAobWV0aG9kIGRlY29yYXRvcnMgbXVzdCBoYXZlIGtleWNvZGUgYXJndW1lbnRzKS5cbiAgaWYgKGlzQXJyYXkgfHwgflsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIHRlc3RBcmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRlc3RBcmcpKSkge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtleXMgPSBpc0FycmF5ID8gdGVzdEFyZyA6IGFyZ3M7XG5cbiAgICAgIC8vIHJldHVybiB0aGUgZGVjb3JhdG9yIGZ1bmN0aW9uLCB3aGljaCBvbiB0aGUgbmV4dCBjYWxsIHdpbGwgbG9vayBmb3JcbiAgICAgIC8vIHRoZSBwcmVzZW5jZSBvZiBhIG1ldGhvZCBuYW1lIHRvIGRldGVybWluZSBpZiB0aGlzIGlzIGEgd3JhcHBlZCBtZXRob2RcbiAgICAgIC8vIG9yIGNvbXBvbmVudFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogZnVuY3Rpb24gdih0YXJnZXQsIG1ldGhvZE5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICByZXR1cm4gbWV0aG9kTmFtZSA/IG1ldGhvZEZuKHsgdGFyZ2V0OiB0YXJnZXQsIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IsIGtleXM6IGtleXMgfSkgOiAoMCwgX2NsYXNzX2RlY29yYXRvcjJbJ2RlZmF1bHQnXSkodGFyZ2V0LCBrZXlzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBpZiAoKHR5cGVvZiBfcmV0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihfcmV0KSkgPT09ICdvYmplY3QnKSByZXR1cm4gX3JldC52O1xuICB9IGVsc2Uge1xuICAgIHZhciBtZXRob2ROYW1lID0gYXJnc1sxXTtcblxuICAgIC8vIG1ldGhvZCBkZWNvcmF0b3JzIHdpdGhvdXQga2V5Y29kZSAod2hpY2gpIGFyZ3VtZW50cyBhcmUgbm90IGFsbG93ZWQuXG4gICAgaWYgKCFtZXRob2ROYW1lKSB7XG4gICAgICByZXR1cm4gX2NsYXNzX2RlY29yYXRvcjJbJ2RlZmF1bHQnXS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4obWV0aG9kTmFtZSArICc6IE1ldGhvZCBkZWNvcmF0b3JzIG11c3QgaGF2ZSBrZXljb2RlIGFyZ3VtZW50cywgc28gdGhlIGRlY29yYXRvciBmb3IgdGhpcyBtZXRob2Qgd2lsbCBub3QgZG8gYW55dGhpbmcnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBrZXlkb3duU2NvcGVkXG4gKlxuICogTWV0aG9kIGRlY29yYXRvciB0aGF0IHdpbGwgbG9vayBmb3IgY2hhbmdlcyB0byBpdHMgdGFyZ2V0ZWQgY29tcG9uZW50J3NcbiAqIGBrZXlkb3duYCBwcm9wcyB0byBkZWNpZGUgd2hlbiB0byB0cmlnZ2VyLCByYXRoZXIgdGhhbiByZXNwb25kaW5nIGRpcmVjdGx5XG4gKiB0byBrZXlkb3duIGV2ZW50cy4gVGhpcyBsZXRzIHlvdSBzcGVjaWZ5IGEgQGtleWRvd24gZGVjb3JhdGVkIGNsYXNzIGhpZ2hlclxuICogdXAgaW4gdGhlIHZpZXcgaGllcmFyY2h5IGZvciBsYXJnZXIgc2NvcGluZyBvZiBrZXlkb3duIGV2ZW50cywgb3IgZm9yXG4gKiBwcm9ncmFtbWF0aWNhbGx5IHNlbmRpbmcga2V5ZG93biBldmVudHMgYXMgcHJvcHMgaW50byB0aGUgY29tcG9uZW50cyBpbiBvcmRlclxuICogdG8gdHJpZ2dlciBkZWNvcmF0ZWQgbWV0aG9kcyB3aXRoIG1hdGNoaW5nIGtleXMuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7QXJyYXl9IC4uLmFyZ3MgIEFsbCAob3Igbm8pIGFyZ3VtZW50cyBwYXNzZWQgaW4gZnJvbSBkZWNvcmF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGRlY29yYXRlZCBjbGFzcyBvciBtZXRob2RcbiAqL1xuZnVuY3Rpb24ga2V5ZG93blNjb3BlZCgpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICByZXR1cm4gX2RlY29yYXRvci5hcHBseSh1bmRlZmluZWQsIFtfbWV0aG9kX2RlY29yYXRvcl9zY29wZWQyWydkZWZhdWx0J11dLmNvbmNhdChhcmdzKSk7XG59XG5cbi8qKlxuICoga2V5ZG93blxuICpcbiAqIFRoZSBtYWluIGRlY29yYXRvciBhbmQgZGVmYXVsdCBleHBvcnQsIGhhbmRsZXMgYm90aCBjbGFzc2VzIGFuZCBtZXRob2RzLlxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge0FycmF5fSAuLi5hcmdzICBBbGwgKG9yIG5vKSBhcmd1bWVudHMgcGFzc2VkIGluIGZyb20gZGVjb3JhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBkZWNvcmF0ZWQgY2xhc3Mgb3IgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGtleWRvd24oKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgcmV0dXJuIF9kZWNvcmF0b3IuYXBwbHkodW5kZWZpbmVkLCBbX21ldGhvZF9kZWNvcmF0b3IyWydkZWZhdWx0J11dLmNvbmNhdChhcmdzKSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGtleWRvd247XG5leHBvcnRzLmtleWRvd25TY29wZWQgPSBrZXlkb3duU2NvcGVkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZGVjb3JhdG9ycy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyoqXG4gKiBAbW9kdWxlIGNvbXBvbmVudFdyYXBwZXJcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfXJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94MiwgX3gzLCBfeDQpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7X2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgdmFyIG9iamVjdCA9IF94MixcbiAgICAgICAgcHJvcGVydHkgPSBfeDMsXG4gICAgICAgIHJlY2VpdmVyID0gX3g0O19hZ2FpbiA9IGZhbHNlO2lmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTt2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7aWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO2lmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF94MiA9IHBhcmVudDtfeDMgPSBwcm9wZXJ0eTtfeDQgPSByZWNlaXZlcjtfYWdhaW4gPSB0cnVlO2Rlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7Y29udGludWUgX2Z1bmN0aW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7XG4gICAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O2lmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfXJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdXBlckNsYXNzKSkpO1xuICB9c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTtpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG52YXIgX2V2ZW50X2hhbmRsZXJzID0gcmVxdWlyZSgnLi4vZXZlbnRfaGFuZGxlcnMnKTtcblxuLyoqXG4gKiBjb21wb25lbnRXcmFwcGVyXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50IFJlYWN0IGNvbXBvbmVudCBjbGFzcyB0byBiZSB3cmFwcGVkXG4gKiBAcGFyYW0ge2FycmF5fSBba2V5c10gVGhlIGtleShzKSBib3VuZCB0byB0aGUgY2xhc3NcbiAqIEByZXR1cm4ge29iamVjdH0gVGhlIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IHdyYXBzIHRoZSBkZWNvcmF0ZWQgY2xhc3NcbiAqL1xuZnVuY3Rpb24gY29tcG9uZW50V3JhcHBlcihXcmFwcGVkQ29tcG9uZW50KSB7XG4gIHZhciBrZXlzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgS2V5Qm9hcmRIZWxwZXIgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhLZXlCb2FyZEhlbHBlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBLZXlCb2FyZEhlbHBlcihwcm9wcykge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEtleUJvYXJkSGVscGVyKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoS2V5Qm9hcmRIZWxwZXIucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBldmVudDogbnVsbFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoS2V5Qm9hcmRIZWxwZXIsIFt7XG4gICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Nb3VudCkodGhpcyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uVW5tb3VudCkodGhpcyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnaGFuZGxlS2V5RG93bicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIC8vIHRvIHNpbXVsYXRlIGEga2V5cHJlc3MsIHNldCB0aGUgZXZlbnQgYW5kIHRoZW4gY2xlYXIgaXQgaW4gdGhlIGNhbGxiYWNrXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBldmVudDogZXZlbnQgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5zZXRTdGF0ZSh7IGV2ZW50OiBudWxsIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IGtleWRvd246IHRoaXMuc3RhdGUgfSkpO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBLZXlCb2FyZEhlbHBlcjtcbiAgfShfcmVhY3QyWydkZWZhdWx0J10uQ29tcG9uZW50KTtcblxuICBfc3RvcmUyWydkZWZhdWx0J10uc2V0QmluZGluZyh7IGtleXM6IGtleXMsIGZuOiBLZXlCb2FyZEhlbHBlci5wcm90b3R5cGUuaGFuZGxlS2V5RG93biwgdGFyZ2V0OiBLZXlCb2FyZEhlbHBlci5wcm90b3R5cGUgfSk7XG5cbiAgcmV0dXJuIEtleUJvYXJkSGVscGVyO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjb21wb25lbnRXcmFwcGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2NsYXNzX2RlY29yYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyoqXG4gKiBAbW9kdWxlIHN0b3JlXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTt2YXIgX24gPSB0cnVlO3ZhciBfZCA9IGZhbHNlO3ZhciBfZSA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO2lmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9cmV0dXJuIF9hcnI7XG4gIH1yZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbmV4cG9ydHMuX3Jlc2V0U3RvcmUgPSBfcmVzZXRTdG9yZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9cmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufVxuXG52YXIgX2xpYktleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzJyk7XG5cbnZhciBfbGliTWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4vbGliL21hdGNoX2tleXMnKTtcblxudmFyIF9saWJNYXRjaF9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYk1hdGNoX2tleXMpO1xuXG52YXIgX2xpYlBhcnNlX2tleXMgPSByZXF1aXJlKCcuL2xpYi9wYXJzZV9rZXlzJyk7XG5cbnZhciBfbGliUGFyc2Vfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJQYXJzZV9rZXlzKTtcblxudmFyIF9saWJVdWlkID0gcmVxdWlyZSgnLi9saWIvdXVpZCcpO1xuXG52YXIgX2xpYlV1aWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliVXVpZCk7XG5cbi8qKlxuICogcHJpdmF0ZVxuICogXG4gKi9cblxuLy8gZGljdCBmb3IgY2xhc3MgcHJvdG90eXBlcyA9PiBiaW5kaW5nc1xudmFyIF9oYW5kbGVycyA9IG5ldyBNYXAoKTtcblxuLy8gYWxsIG1vdW50ZWQgaW5zdGFuY2VzIHRoYXQgaGF2ZSBrZXliaW5kaW5nc1xudmFyIF9pbnN0YW5jZXMgPSBuZXcgU2V0KCk7XG5cbi8vIGZvciB0ZXN0aW5nXG5cbmZ1bmN0aW9uIF9yZXNldFN0b3JlKCkge1xuICBfaGFuZGxlcnMuY2xlYXIoKTtcbiAgX2luc3RhbmNlcy5jbGVhcigpO1xufVxuXG4vKipcbiAqIHB1YmxpY1xuICpcbiAqL1xuXG52YXIgU3RvcmUgPSB7XG5cbiAgLyoqXG4gICAqIGFjdGl2YXRlXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSBJbnN0YW50aWF0ZWQgY2xhc3MgdGhhdCBleHRlbmRlZCBSZWFjdC5Db21wb25lbnQsIHRvIGJlIGZvY3VzZWQgdG8gcmVjZWl2ZSBrZXlkb3duIGV2ZW50c1xuICAgKi9cbiAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKGluc3RhbmNlcykge1xuICAgIHZhciBpbnN0YW5jZXNBcnJheSA9IFtdLmNvbmNhdChpbnN0YW5jZXMpO1xuXG4gICAgLy8gaWYgbm8gY29tcG9uZW50cyB3ZXJlIGZvdW5kIGFzIGFuY2VzdG9ycyBvZiB0aGUgZXZlbnQgdGFyZ2V0LFxuICAgIC8vIGVmZmVjdGl2ZWx5IGRlYWN0aXZhdGUga2V5ZG93biBoYW5kbGluZyBieSBjYXBwaW5nIHRoZSBzZXQgb2YgaW5zdGFuY2VzXG4gICAgLy8gd2l0aCBgbnVsbGAuXG4gICAgaWYgKCFpbnN0YW5jZXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIF9pbnN0YW5jZXMuYWRkKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaW5zdGFuY2VzWydkZWxldGUnXShudWxsKTtcblxuICAgICAgLy8gZGVsZXRpbmcgYW5kIHRoZW4gYWRkaW5nIHRoZSBpbnN0YW5jZShzKSBoYXMgdGhlIGVmZmVjdCBvZiBzb3J0aW5nIHRoZSBzZXRcbiAgICAgIC8vIGFjY29yZGluZyB0byBpbnN0YW5jZSBhY3RpdmF0aW9uIChhc2NlbmRpbmcpXG4gICAgICBpbnN0YW5jZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBfaW5zdGFuY2VzWydkZWxldGUnXShpbnN0YW5jZSk7XG4gICAgICAgIF9pbnN0YW5jZXMuYWRkKGluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogZGVsZXRlSW5zdGFuY2VcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBJbnN0YW50aWF0ZWQgY2xhc3MgdGhhdCBleHRlbmRlZCBSZWFjdC5Db21wb25lbnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVGhlIHZhbHVlIHNldC5oYXMoIHRhcmdldCApIHdvdWxkIGhhdmUgcmV0dXJuZWQgcHJpb3IgdG8gZGVsZXRpb25cbiAgICovXG4gIGRlbGV0ZUluc3RhbmNlOiBmdW5jdGlvbiBkZWxldGVJbnN0YW5jZSh0YXJnZXQpIHtcbiAgICBfaW5zdGFuY2VzWydkZWxldGUnXSh0YXJnZXQpO1xuICB9LFxuXG4gIGZpbmRCaW5kaW5nRm9yRXZlbnQ6IGZ1bmN0aW9uIGZpbmRCaW5kaW5nRm9yRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoIV9pbnN0YW5jZXMuaGFzKG51bGwpKSB7XG4gICAgICB2YXIga2V5TWF0Y2hlc0V2ZW50ID0gZnVuY3Rpb24ga2V5TWF0Y2hlc0V2ZW50KGtleVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9saWJNYXRjaF9rZXlzMlsnZGVmYXVsdCddKSh7IGtleVNldDoga2V5U2V0LCBldmVudDogZXZlbnQgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBsb29wIHRocm91Z2ggaW5zdGFuY2VzIGluIHJldmVyc2UgYWN0aXZhdGlvbiBvcmRlciBzbyB0aGF0IG1vc3RcbiAgICAgIC8vIHJlY2VudGx5IGFjdGl2YXRlZCBpbnN0YW5jZSBnZXRzIGZpcnN0IGRpYnMgb24gZXZlbnRcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KF9pbnN0YW5jZXMpKS5yZXZlcnNlKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGluc3RhbmNlID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICB2YXIgYmluZGluZ3MgPSB0aGlzLmdldEJpbmRpbmcoaW5zdGFuY2UuY29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBiaW5kaW5nc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgX3N0ZXAyJHZhbHVlID0gX3NsaWNlZFRvQXJyYXkoX3N0ZXAyLnZhbHVlLCAyKTtcblxuICAgICAgICAgICAgICB2YXIga2V5U2V0cyA9IF9zdGVwMiR2YWx1ZVswXTtcbiAgICAgICAgICAgICAgdmFyIGZuID0gX3N0ZXAyJHZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgIGlmICgoMCwgX2xpYktleXMuYWxsS2V5cykoa2V5U2V0cykgfHwga2V5U2V0cy5zb21lKGtleU1hdGNoZXNFdmVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gd2hlbiBtYXRjaGluZyBrZXliaW5kaW5nIGlzIGZvdW5kIC0gaS5lLiBvbmx5IG9uZVxuICAgICAgICAgICAgICAgIC8vIGtleWJvdW5kIGNvbXBvbmVudCBjYW4gcmVzcG9uZCB0byBhIGdpdmVuIGtleSBjb2RlLiB0byBnZXQgYXJvdW5kIHRoaXMsXG4gICAgICAgICAgICAgICAgLy8gc2NvcGUgYSBjb21tb24gYW5jZXN0b3IgY29tcG9uZW50IGNsYXNzIHdpdGggQGtleWRvd24gYW5kIHVzZVxuICAgICAgICAgICAgICAgIC8vIEBrZXlkb3duU2NvcGVkIHRvIGJpbmQgdGhlIGR1cGxpY2F0ZSBrZXlzIGluIHlvdXIgY2hpbGQgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIC8vIChvciBqdXN0IGluc3BlY3QgbmV4dFByb3BzLmtleWRvd24uZXZlbnQpLlxuICAgICAgICAgICAgICAgIHJldHVybiB7IGZuOiBmbiwgaW5zdGFuY2U6IGluc3RhbmNlIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMlsncmV0dXJuJ10pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IyWydyZXR1cm4nXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvclsncmV0dXJuJ10pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvclsncmV0dXJuJ10oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldEJpbmRpbmdcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBDbGFzcyB1c2VkIGFzIGtleSBpbiBkaWN0IG9mIGtleSBiaW5kaW5nc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBvYmplY3QgY29udGFpbmluZyBiaW5kaW5ncyBmb3IgdGhlIGdpdmVuIGNsYXNzXG4gICAqL1xuICBnZXRCaW5kaW5nOiBmdW5jdGlvbiBnZXRCaW5kaW5nKF9yZWYpIHtcbiAgICB2YXIgX19yZWFjdEtleWRvd25VVUlEID0gX3JlZi5fX3JlYWN0S2V5ZG93blVVSUQ7XG5cbiAgICByZXR1cm4gX2hhbmRsZXJzLmdldChfX3JlYWN0S2V5ZG93blVVSUQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBnZXRJbnN0YW5jZXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHJldHVybiB7c2V0fSBBbGwgc3RvcmVkIGluc3RhbmNlcyAoYWxsIG1vdW50ZWQgY29tcG9uZW50IGluc3RhbmNlcyB3aXRoIGtleWJpbmRpbmdzKVxuICAgKi9cbiAgZ2V0SW5zdGFuY2VzOiBmdW5jdGlvbiBnZXRJbnN0YW5jZXMoKSB7XG4gICAgcmV0dXJuIF9pbnN0YW5jZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGlzRW1wdHlcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHJldHVybiB7bnVtYmVyfSBTaXplIG9mIHRoZSBzZXQgb2YgYWxsIHN0b3JlZCBpbnN0YW5jZXNcbiAgICovXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuICFfaW5zdGFuY2VzLnNpemU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldEJpbmRpbmdcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IGFyZ3MgQWxsIGFyZ3VtZW50cyBuZWNlc3NhcnkgdG8gc2V0IHRoZSBiaW5kaW5nXG4gICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3Mua2V5cyBLZXkgY29kZXMgdGhhdCBzaG91bGQgdHJpZ2dlciB0aGUgZm5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gYXJncy5mbiBUaGUgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gZ2l2ZW4ga2V5cyBhcmUgcHJlc3NlZFxuICAgKiBAcGFyYW0ge29iamVjdH0gYXJncy50YXJnZXQgVGhlIGRlY29yYXRlZCBjbGFzc1xuICAgKi9cbiAgc2V0QmluZGluZzogZnVuY3Rpb24gc2V0QmluZGluZyhfcmVmMikge1xuICAgIHZhciBrZXlzID0gX3JlZjIua2V5cztcbiAgICB2YXIgZm4gPSBfcmVmMi5mbjtcbiAgICB2YXIgdGFyZ2V0ID0gX3JlZjIudGFyZ2V0O1xuXG4gICAgdmFyIGtleVNldHMgPSBrZXlzID8gKDAsIF9saWJQYXJzZV9rZXlzMlsnZGVmYXVsdCddKShrZXlzKSA6ICgwLCBfbGliS2V5cy5hbGxLZXlzKSgpO1xuICAgIHZhciBfX3JlYWN0S2V5ZG93blVVSUQgPSB0YXJnZXQuX19yZWFjdEtleWRvd25VVUlEO1xuXG4gICAgaWYgKCFfX3JlYWN0S2V5ZG93blVVSUQpIHtcbiAgICAgIHRhcmdldC5fX3JlYWN0S2V5ZG93blVVSUQgPSAoMCwgX2xpYlV1aWQyWydkZWZhdWx0J10pKCk7XG4gICAgICBfaGFuZGxlcnMuc2V0KHRhcmdldC5fX3JlYWN0S2V5ZG93blVVSUQsIG5ldyBNYXAoW1trZXlTZXRzLCBmbl1dKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9oYW5kbGVycy5nZXQoX19yZWFjdEtleWRvd25VVUlEKS5zZXQoa2V5U2V0cywgZm4pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLy8gVE9ETzogTmVlZCBiZXR0ZXIsIG1vcmUgY29tcGxldGUsIGFuZCBtb3JlIG1ldGhvZGljYWwga2V5IGRlZmluaXRpb25zXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWxsS2V5cyA9IGFsbEtleXM7XG52YXIgS2V5cyA9IHtcbiAgYmFja3NwYWNlOiA4LFxuICBkZWw6IDQ2LFxuICAnZGVsZXRlJzogNDYsXG4gIHRhYjogOSxcbiAgZW50ZXI6IDEzLFxuICAncmV0dXJuJzogMTMsXG4gIGVzYzogMjcsXG4gIHNwYWNlOiAzMixcbiAgbGVmdDogMzcsXG4gIHVwOiAzOCxcbiAgcmlnaHQ6IDM5LFxuICBkb3duOiA0MCxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjFcbn07XG5cbi8vIEFkZCB1cHBlcmNhc2UgdmVyc2lvbnMgb2Yga2V5cyBhYm92ZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbk9iamVjdC5rZXlzKEtleXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gS2V5c1trZXkudG9VcHBlckNhc2UoKV0gPSBLZXlzW2tleV07XG59KTtcblxuJzAxMjM0NTY3ODknLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChudW0sIGluZGV4KSB7XG4gIHJldHVybiBLZXlzW251bV0gPSBpbmRleCArIDQ4O1xufSk7XG5cbidBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlciwgaW5kZXgpIHtcbiAgS2V5c1tsZXR0ZXJdID0gaW5kZXggKyA2NTtcbiAgS2V5c1tsZXR0ZXIudG9Mb3dlckNhc2UoKV0gPSBpbmRleCArIDY1O1xufSk7XG5cbi8vIGZuIGtleXNcblsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICByZXR1cm4gS2V5c1snZicgKyBpbmRleF0gPSAxMTEgKyBpbmRleDtcbn0pO1xuXG52YXIgbW9kaWZpZXJzID0ge1xuICBjb250cm9sOiAnY3RybCcsXG4gIGN0cmw6ICdjdHJsJyxcbiAgc2hpZnQ6ICdzaGlmdCcsXG4gIG1ldGE6ICdtZXRhJyxcbiAgY21kOiAnbWV0YScsXG4gIGNvbW1hbmQ6ICdtZXRhJyxcbiAgb3B0aW9uOiAnYWx0JyxcbiAgYWx0OiAnYWx0J1xufTtcblxuZXhwb3J0cy5tb2RpZmllcnMgPSBtb2RpZmllcnM7XG5cbmZ1bmN0aW9uIGFsbEtleXMoYXJnKSB7XG4gIHJldHVybiBhcmcgPyBhcmcuY29uc3RydWN0b3IgPT09IFN5bWJvbCB8fCAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgPT09ICdzeW1ib2wnIDogU3ltYm9sKCdhbGxLZXlzJyk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEtleXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9rZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbnZhciBtb2RLZXlzID0gT2JqZWN0LmtleXMoX2tleXMubW9kaWZpZXJzKTtcblxuZnVuY3Rpb24gbWF0Y2hLZXlzKF9yZWYpIHtcbiAgdmFyIF9yZWYka2V5U2V0ID0gX3JlZi5rZXlTZXQ7XG4gIHZhciBrZXkgPSBfcmVmJGtleVNldC5rZXk7XG4gIHZhciBfcmVmJGtleVNldCRtb2RpZmllcnMgPSBfcmVmJGtleVNldC5tb2RpZmllcnM7XG4gIHZhciBtb2RpZmllcnMgPSBfcmVmJGtleVNldCRtb2RpZmllcnMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3JlZiRrZXlTZXQkbW9kaWZpZXJzO1xuICB2YXIgZXZlbnQgPSBfcmVmLmV2ZW50O1xuXG4gIHZhciBrZXlzTWF0Y2ggPSBmYWxzZTtcbiAgaWYgKGtleSA9PT0gZXZlbnQud2hpY2gpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGV2dE1vZEtleXMgPSBtb2RLZXlzLmZpbHRlcihmdW5jdGlvbiAobW9kS2V5KSB7XG4gICAgICAgIHJldHVybiBldmVudFttb2RLZXkgKyAnS2V5J107XG4gICAgICB9KS5zb3J0KCk7XG4gICAgICBrZXlzTWF0Y2ggPSBtb2RpZmllcnMubGVuZ3RoID09PSBldnRNb2RLZXlzLmxlbmd0aCAmJiBtb2RpZmllcnMuZXZlcnkoZnVuY3Rpb24gKG1vZEtleSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGV2dE1vZEtleXNbaW5kZXhdID09PSBtb2RLZXk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBrZXlzTWF0Y2g7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1hdGNoS2V5cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL21hdGNoX2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfa2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG52YXIgX2tleXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfa2V5cyk7XG5cbmZ1bmN0aW9uIHBhcnNlS2V5cyhrZXlzQXJyYXkpIHtcbiAgcmV0dXJuIGtleXNBcnJheS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBrZXlTZXQgPSB7IGtleToga2V5IH07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIga2V5U3RyaW5nID0ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgdmFyIG1hdGNoZXMgPSBrZXlTdHJpbmcuc3BsaXQoL1xccz9cXCtcXHM/Lyk7XG4gICAgICBrZXlTZXQgPSBtYXRjaGVzLmxlbmd0aCA9PT0gMSA/IHsga2V5OiBfa2V5czJbJ2RlZmF1bHQnXVtrZXlTdHJpbmddIH0gOiB7XG4gICAgICAgIGtleTogX2tleXMyWydkZWZhdWx0J11bbWF0Y2hlcy5wb3AoKV0sXG4gICAgICAgIG1vZGlmaWVyczogbWF0Y2hlcy5tYXAoZnVuY3Rpb24gKG1vZEtleSkge1xuICAgICAgICAgIHJldHVybiBfa2V5cy5tb2RpZmllcnNbbW9kS2V5XTtcbiAgICAgICAgfSkuc29ydCgpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ga2V5U2V0O1xuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcGFyc2VLZXlzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvcGFyc2Vfa2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLy8gQ291bnRlciBiZWluZyBpbmNyZW1lbnRlZC4gSlMgaXMgc2luZ2xlLXRocmVhZGVkLCBzbyBpdCdsbCBKdXN0IFdvcmvihKIuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdXVpZDtcbnZhciBfX2NvdW50ZXIgPSAxO1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9jZXNzLXdpZGUgdW5pcXVlIGlkZW50aWZpZXIuXG4gKi9cblxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIFwidWlkLVwiICsgX19jb3VudGVyKys7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvdXVpZC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qKlxuICogQG1vZHVsZSBldmVudEhhbmRsZXJzXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5fb25DbGljayA9IF9vbkNsaWNrO1xuZXhwb3J0cy5fb25LZXlEb3duID0gX29uS2V5RG93bjtcbmV4cG9ydHMuX3Nob3VsZENvbnNpZGVyID0gX3Nob3VsZENvbnNpZGVyO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1yZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59XG5cbnZhciBfbGliRG9tX2hlbHBlcnMgPSByZXF1aXJlKCcuL2xpYi9kb21faGVscGVycycpO1xuXG52YXIgX2xpYkRvbV9oZWxwZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYkRvbV9oZWxwZXJzKTtcblxudmFyIF9saWJMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2xpYi9saXN0ZW5lcnMnKTtcblxudmFyIF9saWJMaXN0ZW5lcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliTGlzdGVuZXJzKTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxudmFyIF9zdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yZSk7XG5cbi8qKlxuICogcHJpdmF0ZVxuICpcbiAqL1xuXG4vKipcbiAqIF9vbkNsaWNrXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50LnRhcmdldCBUaGUgRE9NIG5vZGUgZnJvbSB0aGUgY2xpY2sgZXZlbnRcbiAqL1xuXG5mdW5jdGlvbiBfb25DbGljayhfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcblxuICBfc3RvcmUyWydkZWZhdWx0J10uYWN0aXZhdGUoW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShfc3RvcmUyWydkZWZhdWx0J10uZ2V0SW5zdGFuY2VzKCkpKS5yZWR1Y2UoX2xpYkRvbV9oZWxwZXJzMlsnZGVmYXVsdCddLmZpbmRDb250YWluZXJOb2Rlcyh0YXJnZXQpLCBbXSkuc29ydChfbGliRG9tX2hlbHBlcnMyWydkZWZhdWx0J10uc29ydEJ5RE9NUG9zaXRpb24pLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmluc3RhbmNlO1xuICB9KSk7XG59XG5cbi8qKlxuICogX29uS2V5RG93bjogVGhlIGtleWRvd24gZXZlbnQgY2FsbGJhY2tcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUga2V5ZG93biBldmVudCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC53aGljaCBUaGUga2V5IGNvZGUgKHdoaWNoKSByZWNlaXZlZCBmcm9tIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cblxuZnVuY3Rpb24gX29uS2V5RG93bihldmVudCkge1xuICB2YXIgZm9yY2VDb25zaWRlciA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzFdO1xuXG4gIGlmIChmb3JjZUNvbnNpZGVyIHx8IF9zaG91bGRDb25zaWRlcihldmVudCkpIHtcbiAgICB2YXIgX3JlZjIgPSBfc3RvcmUyWydkZWZhdWx0J10uZmluZEJpbmRpbmdGb3JFdmVudChldmVudCkgfHwge307XG5cbiAgICB2YXIgZm4gPSBfcmVmMi5mbjtcbiAgICB2YXIgaW5zdGFuY2UgPSBfcmVmMi5pbnN0YW5jZTtcblxuICAgIGlmIChmbikge1xuICAgICAgZm4uY2FsbChpbnN0YW5jZSwgZXZlbnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBfc2hvdWxkQ29uc2lkZXI6IENvbmRpdGlvbnMgZm9yIHByb2NlZWRpbmcgd2l0aCBrZXkgZXZlbnQgaGFuZGxpbmdcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUga2V5ZG93biBldmVudCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudC50YXJnZXQgVGhlIG5vZGUgb3JpZ2luIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50LnRhcmdldC50YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50IHRhZ1xuICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRhcmdldC53aGljaCBUaGUga2V5IHByZXNzZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdG8gY29udGludWUgcHJvY2VzaW5nIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cblxuZnVuY3Rpb24gX3Nob3VsZENvbnNpZGVyKF9yZWYzKSB7XG4gIHZhciBjdHJsS2V5ID0gX3JlZjMuY3RybEtleTtcbiAgdmFyIHRhZ05hbWUgPSBfcmVmMy50YXJnZXQudGFnTmFtZTtcblxuICByZXR1cm4gIX5bJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddLmluZGV4T2YodGFnTmFtZSkgfHwgY3RybEtleTtcbn1cblxuLyoqXG4gKiBwdWJsaWNcbiAqXG4gKi9cblxuLyoqXG4gKiBvbk1vdW50XG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gb25Nb3VudChpbnN0YW5jZSkge1xuICAvLyBoYXZlIHRvIGJ1bXAgdGhpcyB0byBuZXh0IGV2ZW50IGxvb3AgYmVjYXVzZSBjb21wb25lbnQgbW91bnRpbmcgcm91dGluZWx5XG4gIC8vIHByZWNlZWRzIHRoZSBkb20gY2xpY2sgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG1vdW50ICh3dGY/KVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3N0b3JlMlsnZGVmYXVsdCddLmFjdGl2YXRlKGluc3RhbmNlKTtcbiAgfSwgMCk7XG4gIF9saWJMaXN0ZW5lcnMyWydkZWZhdWx0J10uYmluZEtleXMoX29uS2V5RG93bik7XG4gIF9saWJMaXN0ZW5lcnMyWydkZWZhdWx0J10uYmluZENsaWNrcyhfb25DbGljayk7XG4gIF9saWJEb21faGVscGVyczJbJ2RlZmF1bHQnXS5iaW5kRm9jdXNhYmxlcyhpbnN0YW5jZSwgX3N0b3JlMlsnZGVmYXVsdCddLmFjdGl2YXRlKTtcbn1cblxuLyoqXG4gKiBvblVubW91bnRcbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICovXG5mdW5jdGlvbiBvblVubW91bnQoaW5zdGFuY2UpIHtcbiAgX3N0b3JlMlsnZGVmYXVsdCddLmRlbGV0ZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgaWYgKF9zdG9yZTJbJ2RlZmF1bHQnXS5pc0VtcHR5KCkpIHtcbiAgICBfbGliTGlzdGVuZXJzMlsnZGVmYXVsdCddLnVuYmluZENsaWNrcyhfb25DbGljayk7XG4gICAgX2xpYkxpc3RlbmVyczJbJ2RlZmF1bHQnXS51bmJpbmRLZXlzKF9vbktleURvd24pO1xuICB9XG59XG5cbmV4cG9ydHMub25Nb3VudCA9IG9uTW91bnQ7XG5leHBvcnRzLm9uVW5tb3VudCA9IG9uVW5tb3VudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2V2ZW50X2hhbmRsZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIvKipcbiAqIEBtb2R1bGUgZG9tSGVscGVyc1xuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIGZvY3VzYWJsZVNlbGVjdG9yID0gJ2FbaHJlZl0sIGJ1dHRvbiwgaW5wdXQsIG9iamVjdCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XSc7XG5cbi8qKlxuICogYmluZEZvY3VzYWJsZXM6IEZpbmQgYW55IGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50cyBvZiB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFuZFxuICogYWRkIGFuIG9uRm9jdXMgaGFuZGxlciB0byBmb2N1cyBvdXIga2V5ZG93biBoYW5kbGVycyBvbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICogd2hlbiB1c2VyIGtleXMgYXBwbGllcyBmb2N1cyB0byB0aGUgZWxlbWVudC5cbiAqXG4gKiBOT1RFOiBPbmUgbGltaXRhdGlvbiBvZiB0aGlzIHJpZ2h0IG5vdyBpcyB0aGF0IGlmIHlvdSB0YWIgb3V0IG9mIHRoZVxuICogY29tcG9uZW50LCBfZm9jdXNlZEluc3RhbmNlIHdpbGwgc3RpbGwgYmUgc2V0IHVudGlsIG5leHQgY2xpY2sgb3IgbW91bnQgb3JcbiAqIGNvbnRyb2xsZWQgZm9jdXMuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSBUaGUga2V5LWJvdW5kIGNvbXBvbmVudCBpbnN0YW5jZVxuICogQHBhcmFtIHtjYWxsYmFja30gYWN0aXZhdGVPbkZvY3VzIFRoZSBmbiB0byBmaXJlIHdoZW4gZWxlbWVudCBpcyBmb2N1c2VkXG4gKi9cbmZ1bmN0aW9uIGJpbmRGb2N1c2FibGVzKGluc3RhbmNlLCBhY3RpdmF0ZU9uRm9jdXMpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTJbJ2RlZmF1bHQnXS5maW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHZhciBmb2N1c2FibGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZVNlbGVjdG9yKTtcbiAgICAgIGlmIChmb2N1c2FibGVzLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvbkZvY3VzID0gZnVuY3Rpb24gb25Gb2N1cyhlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgb25Gb2N1c1ByZXYgPSBlbGVtZW50Lm9uZm9jdXM7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGFjdGl2YXRlT25Gb2N1cyhpbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGlmIChvbkZvY3VzUHJldikgb25Gb2N1c1ByZXYuY2FsbChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlcykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub25mb2N1cyA9IG9uRm9jdXMoZWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogZmluZENvbnRhaW5lck5vZGVzOiBDYWxsZWQgYnkgb3VyIGNsaWNrIGhhbmRsZXIgdG8gZmluZCBpbnN0YW5jZXMgd2l0aCBub2Rlc1xuICogdGhhdCBhcmUgZXF1YWwgdG8gb3IgdGhhdCBjb250YWluIHRoZSBjbGljayB0YXJnZXQuIEFueSB0aGF0IHBhc3MgdGhpcyB0ZXN0XG4gKiB3aWxsIGJlIHJlY2lwaWVudHMgb2YgdGhlIG5leHQga2V5ZG93biBldmVudC5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUaGUgY2xpY2sgZXZlbnQudGFyZ2V0IERPTSBlbGVtZW50XG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gUmVkdWNlciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBmaW5kQ29udGFpbmVyTm9kZXModGFyZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAobWVtbywgaW5zdGFuY2UpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG5vZGUgPSBfcmVhY3REb20yWydkZWZhdWx0J10uZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgICAgaWYgKG5vZGUgJiYgKG5vZGUgPT09IHRhcmdldCB8fCBub2RlLmNvbnRhaW5zKHRhcmdldCkpKSB7XG4gICAgICAgIG1lbW8ucHVzaCh7IGluc3RhbmNlOiBpbnN0YW5jZSwgbm9kZTogbm9kZSB9KTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIHNvcnRCeURPTVBvc2l0aW9uOiBDYWxsZWQgYnkgb3VyIGNsaWNrIGhhbmRsZXIgdG8gc29ydCBhIGxpc3Qgb2YgaW5zdGFuY2VzXG4gKiBhY2NvcmRpbmcgdG8gbGVhc3QgLT4gbW9zdCBuZXN0ZWQuIFRoaXMgaXMgc28gdGhhdCBpZiBtdWx0aXBsZSBrZXlib3VuZFxuICogaW5zdGFuY2VzIGhhdmUgbm9kZXMgdGhhdCBhcmUgYW5jZXN0b3JzIG9mIHRoZSBjbGljayB0YXJnZXQsIHRoZXkgd2lsbCBiZVxuICogc29ydGVkIHRvIGxldCB0aGUgaW5zdGFuY2UgY2xvc2VzdCB0byB0aGUgY2xpY2sgdGFyZ2V0IGdldCBmaXJzdCBkaWJzIG9uIHRoZVxuICogbmV4dCBrZXkgZG93biBldmVudC5cbiAqL1xuZnVuY3Rpb24gc29ydEJ5RE9NUG9zaXRpb24oYSwgYikge1xuICByZXR1cm4gYS5ub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIubm9kZSkgPT09IDEwID8gMSA6IC0xO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7IGJpbmRGb2N1c2FibGVzOiBiaW5kRm9jdXNhYmxlcywgZmluZENvbnRhaW5lck5vZGVzOiBmaW5kQ29udGFpbmVyTm9kZXMsIHNvcnRCeURPTVBvc2l0aW9uOiBzb3J0QnlET01Qb3NpdGlvbiB9O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvZG9tX2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qKlxuICogQG1vZHVsZSBMaXN0ZW5lcnNcbiAqXG4gKi9cblxuLy8gZmxhZyBmb3Igd2hldGhlciBjbGljayBsaXN0ZW5lciBoYXMgYmVlbiBib3VuZCB0byBkb2N1bWVudFxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBfY2xpY2tzQm91bmQgPSBmYWxzZTtcblxuLy8gZmxhZyBmb3Igd2hldGhlciBrZXlkb3duIGxpc3RlbmVyIGhhcyBiZWVuIGJvdW5kIHRvIGRvY3VtZW50XG52YXIgX2tleXNCb3VuZCA9IGZhbHNlO1xuXG52YXIgTGlzdGVuZXJzID0ge1xuICAvKipcbiAgICogX2JpbmRLZXlzXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuICBiaW5kS2V5czogZnVuY3Rpb24gYmluZEtleXMoY2FsbGJhY2spIHtcbiAgICBpZiAoIV9rZXlzQm91bmQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjYWxsYmFjayk7XG4gICAgICBfa2V5c0JvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIHVuYmluZEtleXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIHVuYmluZEtleXM6IGZ1bmN0aW9uIHVuYmluZEtleXMoY2FsbGJhY2spIHtcbiAgICBpZiAoX2tleXNCb3VuZCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNhbGxiYWNrKTtcbiAgICAgIF9rZXlzQm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIGJpbmRDbGlja3NcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIGJpbmRDbGlja3M6IGZ1bmN0aW9uIGJpbmRDbGlja3MoY2FsbGJhY2spIHtcbiAgICBpZiAoIV9jbGlja3NCb3VuZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgICBfY2xpY2tzQm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogdW5iaW5kQ2xpY2tzXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuICB1bmJpbmRDbGlja3M6IGZ1bmN0aW9uIHVuYmluZENsaWNrcyhjYWxsYmFjaykge1xuICAgIGlmIChfY2xpY2tzQm91bmQpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xuICAgICAgX2NsaWNrc0JvdW5kID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBMaXN0ZW5lcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9saXN0ZW5lcnMuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qKlxuICogQG1vZHVsZSBtZXRob2RXcmFwcGVyXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZScpO1xuXG52YXIgX3N0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0b3JlKTtcblxudmFyIF9ldmVudF9oYW5kbGVycyA9IHJlcXVpcmUoJy4uL2V2ZW50X2hhbmRsZXJzJyk7XG5cbi8qKlxuICogX2lzUmVhY3RLZXlEb3duXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIHBvc3NpYmx5IHN5bnRoZXRpYyBldmVudCBwYXNzZWQgYXMgYW4gYXJndW1lbnQgd2l0aFxuICogdGhlIG1ldGhvZCBpbnZvY2F0aW9uLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gX2lzUmVhY3RLZXlEb3duKGV2ZW50KSB7XG4gIHJldHVybiBldmVudCAmJiAodHlwZW9mIGV2ZW50ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihldmVudCkpID09PSAnb2JqZWN0JyAmJiBldmVudC5uYXRpdmVFdmVudCBpbnN0YW5jZW9mIHdpbmRvdy5LZXlib2FyZEV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJztcbn1cblxuLyoqXG4gKiBtZXRob2RXcmFwcGVyXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIEFsbCBhcmd1bWVudHMgbmVjZXNzYXJ5IGZvciB3cmFwcGluZyBtZXRob2RcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnRhcmdldCBUaGUgZGVjb3JhdGVkIGNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5kZXNjcmlwdG9yIE1ldGhvZCBkZXNjcmlwdG9yXG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzLmtleXMgVGhlIGFycmF5IG9mIGtleXMgYm91bmQgdG8gdGhlIGdpdmVuIG1ldGhvZFxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgbWV0aG9kIGRlc2NyaXB0b3JcbiAqL1xuZnVuY3Rpb24gbWV0aG9kV3JhcHBlcihfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBfcmVmLmRlc2NyaXB0b3I7XG4gIHZhciBrZXlzID0gX3JlZi5rZXlzO1xuXG4gIHZhciBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgLy8gaWYgd2UgaGF2ZW4ndCBhbHJlYWR5IGNyZWF0ZWQgYSBiaW5kaW5nIGZvciB0aGlzIGNsYXNzICh2aWEgYW5vdGhlclxuICAvLyBkZWNvcmF0ZWQgbWV0aG9kKSwgd3JhcCB0aGVzZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgaWYgKCFfc3RvcmUyWydkZWZhdWx0J10uZ2V0QmluZGluZyh0YXJnZXQpKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb21wb25lbnREaWRNb3VudCA9IHRhcmdldC5jb21wb25lbnREaWRNb3VudDtcbiAgICAgIHZhciBjb21wb25lbnRXaWxsVW5tb3VudCA9IHRhcmdldC5jb21wb25lbnRXaWxsVW5tb3VudDtcblxuICAgICAgdGFyZ2V0LmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uTW91bnQpKHRoaXMpO1xuICAgICAgICBpZiAoY29tcG9uZW50RGlkTW91bnQpIHJldHVybiBjb21wb25lbnREaWRNb3VudC5jYWxsKHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgdGFyZ2V0LmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uVW5tb3VudCkodGhpcyk7XG4gICAgICAgIGlmIChjb21wb25lbnRXaWxsVW5tb3VudCkgcmV0dXJuIGNvbXBvbmVudFdpbGxVbm1vdW50LmNhbGwodGhpcyk7XG4gICAgICB9O1xuICAgIH0pKCk7XG4gIH1cblxuICAvLyBhZGQgdGhpcyBiaW5kaW5nIG9mIGtleXMgYW5kIG1ldGhvZCB0byB0aGUgdGFyZ2V0J3MgYmluZGluZ3NcbiAgX3N0b3JlMlsnZGVmYXVsdCddLnNldEJpbmRpbmcoeyBrZXlzOiBrZXlzLCB0YXJnZXQ6IHRhcmdldCwgZm46IGZuIH0pO1xuXG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIG1heWJlRXZlbnQgPSBhcmdzWzBdO1xuXG4gICAgaWYgKF9pc1JlYWN0S2V5RG93bihtYXliZUV2ZW50KSkge1xuICAgICAgLy8gcHJveHkgbWV0aG9kIGluIG9yZGVyIHRvIHVzZSBAa2V5ZG93biBhcyBmaWx0ZXIgZm9yIGtleWRvd24gZXZlbnRzIGNvbWluZ1xuICAgICAgLy8gZnJvbSBhbiBhY3R1YWwgb25LZXlEb3duIGJpbmRpbmcgKGFzIGlkZW50aWZpZWQgYnkgcmVhY3QncyBhZGRpdGlvbiBvZlxuICAgICAgLy8gJ25hdGl2ZUV2ZW50JyArIHR5cGUgPT09ICdrZXlkb3duJylcbiAgICAgIGlmICghbWF5YmVFdmVudC5jdHJsS2V5KSB7XG4gICAgICAgIC8vIHdlIGFscmVhZHkgd2hpdGVsaXN0IHNob3J0Y3V0cyB3aXRoIGN0cmwgbW9kaWZpZXJzIHNvIGlmIHdlIHdlcmUgdG9cbiAgICAgICAgLy8gZmlyZSBpdCBhZ2FpbiBoZXJlIHRoZSBtZXRob2Qgd291bGQgdHJpZ2dlciB0d2ljZS4gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9nbG9ydGhvL3JlYWN0LWtleWRvd24vaXNzdWVzLzM4XG4gICAgICAgIHJldHVybiAoMCwgX2V2ZW50X2hhbmRsZXJzLl9vbktleURvd24pKG1heWJlRXZlbnQsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIW1heWJlRXZlbnQgfHwgIShtYXliZUV2ZW50IGluc3RhbmNlb2Ygd2luZG93LktleWJvYXJkRXZlbnQpIHx8IG1heWJlRXZlbnQudHlwZSAhPT0gJ2tleWRvd24nKSB7XG4gICAgICAvLyBpZiBvdXIgZmlyc3QgYXJndW1lbnQgaXMgYSBrZXlkb3duIGV2ZW50IGl0IGlzIGJlaW5nIGhhbmRsZWQgYnkgb3VyXG4gICAgICAvLyBiaW5kaW5nIHN5c3RlbS4gaWYgaXQncyBhbnl0aGluZyBlbHNlLCBqdXN0IHBhc3MgdGhyb3VnaC5cbiAgICAgIHJldHVybiBmbi5jYWxsLmFwcGx5KGZuLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1ldGhvZFdyYXBwZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyoqXG4gKiBAbW9kdWxlIG1ldGhvZFdyYXBwZXJTY29wZWRcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfbGliTWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4uL2xpYi9tYXRjaF9rZXlzJyk7XG5cbnZhciBfbGliTWF0Y2hfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJNYXRjaF9rZXlzKTtcblxudmFyIF9saWJQYXJzZV9rZXlzID0gcmVxdWlyZSgnLi4vbGliL3BhcnNlX2tleXMnKTtcblxudmFyIF9saWJQYXJzZV9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYlBhcnNlX2tleXMpO1xuXG4vKipcbiAqIF9zaG91bGRUcmlnZ2VyXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gdGhpc1Byb3BzIEV4c3RpbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzUHJvcHMua2V5ZG93biBUaGUgbmFtZXNwYWNlZCBzdGF0ZSBmcm9tIHRoZSBoaWdoZXItb3JkZXJcbiAqIGNvbXBvbmVudCAoY2xhc3NfZGVjb3JhdG9yKVxuICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcyBUaGUgaW5jb21pbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHMua2V5ZG93biBUaGUgbmFtZXNjYXBlZCBzdGF0ZSBmcm9tIHRoZSBoaWdoZXItb3JkZXJcbiAqIGNvbXBvbmVudCAoY2xhc3NfZGVjb3JhdG9yKVxuICogQHBhcmFtIHthcnJheX0ga2V5cyBUaGUga2V5cyBib3VuZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBhbGwgdGVzdHMgaGF2ZSBwYXNzZWRcbiAqL1xuZnVuY3Rpb24gX3Nob3VsZFRyaWdnZXIoX3JlZiwga2V5ZG93bk5leHQpIHtcbiAgdmFyIGtleWRvd25UaGlzID0gX3JlZi5rZXlkb3duO1xuXG4gIHJldHVybiBrZXlkb3duTmV4dCAmJiBrZXlkb3duTmV4dC5ldmVudCAmJiAha2V5ZG93blRoaXMuZXZlbnQ7XG59XG5cbi8qKlxuICogbWV0aG9kV3JhcHBlclNjb3BlZFxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncyBBbGwgYXJncyBuZWNlc3NhcnkgZm9yIGRlY29yYXRpbmcgdGhlIG1ldGhvZFxuICogQHBhcmFtIHtvYmplY3R9IGFyZ3MudGFyZ2V0IFRoZSBkZWNvcmF0ZWQgbWV0aG9kJ3MgY2xhc3Mgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5kZXNjcmlwdG9yIFRoZSBtZXRob2QncyBkZXNjcmlwdG9yIG9iamVjdFxuICogQHBhcmFtIHthcnJheX0gYXJncy5rZXlzIFRoZSBrZXkgY29kZXMgYm91bmQgdG8gdGhlIGRlY29yYXRlZCBtZXRob2RcbiAqIEByZXR1cm4ge29iamVjdH0gVGhlIG1ldGhvZCdzIGRlc2NyaXB0b3Igb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1ldGhvZFdyYXBwZXJTY29wZWQoX3JlZjIpIHtcbiAgdmFyIHRhcmdldCA9IF9yZWYyLnRhcmdldDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBfcmVmMi5kZXNjcmlwdG9yO1xuICB2YXIga2V5cyA9IF9yZWYyLmtleXM7XG4gIHZhciBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gdGFyZ2V0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM7XG5cbiAgdmFyIGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgaWYgKCFrZXlzKSB7XG4gICAgY29uc29sZS53YXJuKGZuICsgJzoga2V5ZG93blNjb3BlZCByZXF1aXJlcyBvbmUgb3IgbW9yZSBrZXlzJyk7XG4gIH0gZWxzZSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBrZXlTZXRzID0gKDAsIF9saWJQYXJzZV9rZXlzMlsnZGVmYXVsdCddKShrZXlzKTtcblxuICAgICAgLy8gd3JhcCB0aGUgY29tcG9uZW50J3MgbGlmZWN5Y2xlIG1ldGhvZCB0byBpbnRlcmNlcHQga2V5IGNvZGVzIGNvbWluZyBkb3duXG4gICAgICAvLyBmcm9tIHRoZSB3cmFwcGVkL3Njb3BlZCBjb21wb25lbnQgdXAgdGhlIHZpZXcgaGllcmFyY2h5LiBpZiBuZXcga2V5ZG93blxuICAgICAgLy8gZXZlbnQgaGFzIGFycml2ZWQgYW5kIHRoZSBrZXkgY29kZXMgbWF0Y2ggd2hhdCB3YXMgc3BlY2lmaWVkIGluIHRoZVxuICAgICAgLy8gZGVjb3JhdG9yLCBjYWxsIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgIHRhcmdldC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICB2YXIga2V5ZG93biA9IG5leHRQcm9wcy5rZXlkb3duO1xuXG4gICAgICAgIGlmIChfc2hvdWxkVHJpZ2dlcih0aGlzLnByb3BzLCBrZXlkb3duKSkge1xuICAgICAgICAgIGlmIChrZXlTZXRzLnNvbWUoZnVuY3Rpb24gKGtleVNldCkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfbGliTWF0Y2hfa2V5czJbJ2RlZmF1bHQnXSkoeyBrZXlTZXQ6IGtleVNldCwgZXZlbnQ6IGtleWRvd24uZXZlbnQgfSk7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGtleWRvd24uZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHJldHVybiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmNhbGwuYXBwbHkoY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcywgW3RoaXMsIG5leHRQcm9wc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjcmlwdG9yO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBtZXRob2RXcmFwcGVyU2NvcGVkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2FkZCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2g9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2hfX19fS2V5IGluIF9fX19DbGFzc2gpe2lmKF9fX19DbGFzc2guaGFzT3duUHJvcGVydHkoX19fX0NsYXNzaF9fX19LZXkpKXtCdXR0b25SZWdpc3RlckFkZFtfX19fQ2xhc3NoX19fX0tleV09X19fX0NsYXNzaFtfX19fQ2xhc3NoX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2g9X19fX0NsYXNzaD09PW51bGw/bnVsbDpfX19fQ2xhc3NoLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaCk7QnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyQWRkO0J1dHRvblJlZ2lzdGVyQWRkLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2g7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyQWRkKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzaC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdhZGQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkFkZFwiLCBcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkFkZFwiLCBcclxuICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJBZGQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4XG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJ1dHRvbjoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICcvaW1hZ2VzL2ljb25zL2FkZC5wbmcnLFxuICAgICAgICBlZGl0OiAnL2ltYWdlcy9pY29ucy9lZGl0LnBuZycsXG4gICAgICAgIGRlbGV0ZTogJy9pbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJy9pbWFnZXMvaWNvbnMvZmlsdGVyLnBuZycsXG4gICAgICAgIHByaW50OiAnL2ltYWdlcy9pY29ucy9wcmludC5wbmcnLFxuICAgICAgICBvazogJy9pbWFnZXMvaWNvbnMvb2sucG5nJyxcbiAgICAgICAgY2FuY2VsOiAnL2ltYWdlcy9pY29ucy9jYW5jZWwucG5nJyxcbiAgICAgICAgc2F2ZTogJy9pbWFnZXMvaWNvbnMvc2F2ZS5wbmcnLFxuICAgICAgICBleGVjdXRlOiAnL2ltYWdlcy9pY29ucy9leGVjdXRlLnBuZydcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3g9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3hfX19fS2V5IGluIF9fX19DbGFzc3gpe2lmKF9fX19DbGFzc3guaGFzT3duUHJvcGVydHkoX19fX0NsYXNzeF9fX19LZXkpKXtCdXR0b25bX19fX0NsYXNzeF9fX19LZXldPV9fX19DbGFzc3hbX19fX0NsYXNzeF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N4PV9fX19DbGFzc3g9PT1udWxsP251bGw6X19fX0NsYXNzeC5wcm90b3R5cGU7QnV0dG9uLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N4KTtCdXR0b24ucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvbjtCdXR0b24uX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzeDtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzeC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvbi5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdmlzaWJpbGl0eVxyXG4gICAgICAgIGxldCBwcm9wU3R5bGUgID0gKCdzdHlsZScgaW4gdGhpcy5wcm9wcyk/IHRoaXMucHJvcHMuc3R5bGU6IHt9LFxyXG4gICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5idXR0b24sIHtkaXNwbGF5OiB0aGlzLnByb3BzLnNob3cgPyAnaW5saW5lJyA6ICdub25lJ30sIHByb3BTdHlsZSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2t9LCBcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiwgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG47XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5cclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdlZGl0JztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzaj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzal9fX19LZXkgaW4gX19fX0NsYXNzail7aWYoX19fX0NsYXNzai5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NqX19fX0tleSkpe0J1dHRvblJlZ2lzdGVyRWRpdFtfX19fQ2xhc3NqX19fX0tleV09X19fX0NsYXNzaltfX19fQ2xhc3NqX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2o9X19fX0NsYXNzaj09PW51bGw/bnVsbDpfX19fQ2xhc3NqLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2opO0J1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJFZGl0O0J1dHRvblJlZ2lzdGVyRWRpdC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NqO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckVkaXQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NqLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soJ2VkaXQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSlcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiRWRpdFwiLCBcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkVkaXRcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyRWRpdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRWRpdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeFxuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdkZWxldGUnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NrPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NrX19fX0tleSBpbiBfX19fQ2xhc3NrKXtpZihfX19fQ2xhc3NrLmhhc093blByb3BlcnR5KF9fX19DbGFzc2tfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJEZWxldGVbX19fX0NsYXNza19fX19LZXldPV9fX19DbGFzc2tbX19fX0NsYXNza19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NrPV9fX19DbGFzc2s9PT1udWxsP251bGw6X19fX0NsYXNzay5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2spO0J1dHRvblJlZ2lzdGVyRGVsZXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlckRlbGV0ZTtCdXR0b25SZWdpc3RlckRlbGV0ZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NrO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckRlbGV0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2suY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygnZGVsZXRlJyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRGVsZXRlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJEZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5EZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckRlbGV0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8vINCy0LjQtNC20LXRgiwg0L7QsdGK0LXQtNC40L3Rj9GO0YnQuNC5INGB0LXQu9C10LrRgiDQuCDRgtC10LrRgdGCLiDQsiDRgtC10LrRgdGC0LUg0L7RgtGA0LDQttCw0Y7RgtC80Y8g0LTQsNC90L3Ri9C1LCDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0YHQtdC70LXQutGC0L7QvFxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHQgPSByZXF1aXJlKCcuLi90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCcpO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NlPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NlX19fX0tleSBpbiBfX19fQ2xhc3NlKXtpZihfX19fQ2xhc3NlLmhhc093blByb3BlcnR5KF9fX19DbGFzc2VfX19fS2V5KSl7U2VsZWN0VGV4dFdpZGdldFtfX19fQ2xhc3NlX19fX0tleV09X19fX0NsYXNzZVtfX19fQ2xhc3NlX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2U9X19fX0NsYXNzZT09PW51bGw/bnVsbDpfX19fQ2xhc3NlLnByb3RvdHlwZTtTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NlKTtTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1TZWxlY3RUZXh0V2lkZ2V0O1NlbGVjdFRleHRXaWRnZXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzZTtcclxuICAgIGZ1bmN0aW9uIFNlbGVjdFRleHRXaWRnZXQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NlLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsIC8vINC/0L7QudC00LXRgiDQsiDRgtC10LrRgdGC0L7QstGD0Y4g0L7QsdC70LDRgdGC0YxcclxuICAgICAgICAgICAgbGliRGF0YTogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0T25DaGFuZ2UgPSB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZSxcImhhbmRsZVNlbGVjdE9uQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCDRgdC+0LHRi9GC0LjQtSDQuCDQv9C+0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxpYkRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGcgPSB0aGlzLmdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZSh0aGlzLnN0YXRlLmxpYkRhdGEpIHx8IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZSwgZGVzY3JpcHRpb246IHNlbGd9KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdFRleHRXaWRnZXQucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LHQuNCx0LvQuNC+0YLQtdC6LlxyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g0LHRg9C00LXQvCDQvtGC0YHQu9C10LbQuNCy0LDRgtGMINC80L7QvNC10L3RgiDQutC+0LPQtNCwINGB0L/RgNCw0LLQvtGH0L3QuNC6INCx0YPQtNC10YIg0LfQsNCz0YDRg9C20LXQvVxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdmFzdHVzID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSwgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBsaWIgPSBkYXRhWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBzZWxnID0gZGF0YVswXS5kYXRhLmxlbmd0aCA/IHNlbGYuZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlKGxpYikudG9TdHJpbmcoKSA6ICcnO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtsaWJEYXRhOiBsaWIsIGRlc2NyaXB0aW9uOiBzZWxnfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdFRleHRXaWRnZXQucHJvdG90eXBlLFwiZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obGliRGF0YSkge1xyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsiDRgdC/0YDQsNCy0L7Rh9C90LjQutC1INC+0L/QuNGB0LDQvdC40LUg0Lgg0YPRgdGC0LDQvdC+0LLQuNC8INC10LPQviDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICBsZXQgbGliUm93ID0gbGliRGF0YS5maWx0ZXIoZnVuY3Rpb24obGliKSAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaWIuaWQgPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaWI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIHNlbGcgPSAnJyxcclxuICAgICAgICAgICAgc2VsZ09iamVjdCA9IGxpYlJvdy5sZW5ndGggPyBsaWJSb3dbMF0uZGV0YWlscyA6ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBzZWxnT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxnT2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjQvdGC0LXRgNC10YHRg9GO0YIg0YLQvtC70YzQutC+IFwi0YHQvtCx0YHRgtCy0LXQvdC90YvQtVwiINGB0LLQvtC50YHRgtCy0LAg0L7QsdGK0LXQutGC0LBcclxuICAgICAgICAgICAgICAgIHNlbGcgPSBzZWxnICsgcHJvcGVydHkgKyAnOicgKyBzZWxnT2JqZWN0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0VGV4dFdpZGdldC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInNlbGVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiB0aGlzLnByb3BzLmxpYnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVTZWxlY3RPbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7cmVmOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2tQcm9wXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZGVzY3JpcHRpb24sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICd0cnVlJ31cclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblNlbGVjdFRleHRXaWRnZXQuUHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxpYnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbn1cclxuXHJcblxyXG5TZWxlY3RUZXh0V2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIHRpdGxlOiAnJ1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdFRleHRXaWRnZXQ7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeFxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcbi8vICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4Jyk7XHJcblxyXG5jb25zdCBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGliRGF0YSA9IFtdO1xyXG4gICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0LTQsNC90L3Ri9C1INC40Lcg0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICAgICAgICAgIGRhdGEgPSBsaWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMpLFxyXG4gICAgICAgICAgICBpZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTsgLy8g0LTQu9GPINC/0YDQuNCy0Y/Qt9C60Lgg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdLmRhdGEpIHtcclxuICAgICAgICAgICAgbGliRGF0YSA9IGRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUgLyog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqLyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBsaWJEYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8q0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC4INC/0L7Qu9GPIGNvbGxJZCAqLyxcclxuICAgICAgICAgICAgYnJuRGVsZXRlOiB0aGlzLnByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi99O1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kRmllbGRWYWx1ZTogZnVuY3Rpb24gKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIC8vIGtvb2QgLT4gaWRcclxuICAgICAgICB2YXIgaWQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSByb3cuaWQ7XHJcbi8vICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiByb3cuaWQsIGZpZWxkVmFsdWU6IHJvd1tjb2xsSWRdfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFZhbHVlQnlJZDogZnVuY3Rpb24oY29sbElkLCByb3dJZCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQt9C90LDRh9C10L3QuNGPINC/0L7Qu9GPINC/0L4g0LLRi9Cx0YDQsNC90L3QvtC80YMg0JjQlFxyXG5cclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1snaWQnXSA9PSByb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJvd1tjb2xsSWRdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmllbGRWYWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXRgiDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDQstC40LTQttC10YLQsCwg0L/QvtC60LAg0LPRgNGD0LfQuNGC0YHRjyDRgdC/0YDQsNCy0L7Rh9C90LjQulxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIHByb3BWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgZmllbGRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQv9C+INC40LQg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQsiBjb2xsSWRcclxuICAgICAgICB0aGlzLmdldFZhbHVlQnlJZCh0aGlzLnByb3BzLmNvbGxJZCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC0INC60LDQuiB2YWx1ZVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQv9GA0LjQstGP0LfQutCwINC6INC00LDQvdC90YvQvFxyXG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSwgdGhpcy5zdGF0ZS52YWx1ZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBudWxsLFxyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlOyAvLyDQlNCw0LTQuNC8INC00LXRhNC+0LvRgtC90L7QtSDQt9C90LDRh9C10L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsCwg0YfRgtC+0LEg0L/QvtC60LDRgtGMINC10LPQviDRgdGA0LDQt9GDLCDQtNC+INC/0L7QtNCz0YDRg9C30LrQuCDQsdC40LHQu9C40L7RgtC10LrQuFxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kb2spIHtcclxuICAgICAgICAgICAgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC30LDQtNCw0L3Ri9C5IFwi0YHQv9GA0LDQstC+0YfQvdC40LpcIlxyXG4gICAgICAgICAgICBkYXRhT3B0aW9ucyA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZG9rID09PSB0aGlzLnByb3BzLmRvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUpIHsgLy8g0LTQvtCx0LDQstC40Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgyDQsiDQvNCw0YHRgdC40LJcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQv9GD0YHRgtC+0Lkg0YHRgtGA0L7QutC4INCyINC80LDRgdGB0LjQstC1XHJcblxyXG4gICAgICAgICAgICBsZXQgZW1wdHlPYmogPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbXB0eU9iaiB8fCBlbXB0eU9iai5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YU9wdGlvbnMuc3BsaWNlKDAsIDAsIHtpZDogMCwga29vZDogJycsIG5hbWU6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0YVZhbHVlID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgT3B0aW9ucyA9IGRhdGFPcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IGl0ZW0uaWQsIGtleTogTWF0aC5yYW5kb20oKX0sIGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlID0gZGF0YVZhbHVlLmxlbmd0aCA+IDAgPyBkYXRhVmFsdWVbMF0ubmFtZSA6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogMCwga2V5OiBNYXRoLnJhbmRvbSgpfSwgXCIgRW1wdHkgXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgd2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOicxMDAlJywgaGVpZ2h0OicxMDAlJ319LCBPcHRpb25zKTsgLy8g0LXRgdC70Lgg0LTQu9GPINCz0YDQuNC00LAsINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDRgdC10LvQtdC60YJcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50aXRsZSkge1xyXG4gICAgICAgICAgICB3aWRnZXQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7ZGlzcGxheTonaW5saW5lLWJsb2NrJ319LCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInVpLWMxIGRvYy1pbnB1dC1yZWFkb25seVwiLCB2YWx1ZTogaW5wdXREZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IFwidHJ1ZVwifSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID8gbnVsbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfSwgT3B0aW9ucyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5idG5EZWxldGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInVpLWMxLWJ1dHRvblwiLCBvbkNsaWNrOiB0aGlzLmJ0bkRlbENsaWNrfSwgXCIgRGVsZXRlIFwiKSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgd2lkZ2V0KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5EZWxDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9C+INCy0YvQt9C+0LLRgyDQutC90L7Qv9C60YMg0YPQtNCw0LvQuNGC0YwsINC+0LHQvdGD0LvRj9C10YIg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm51bGx9KTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4XG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCByZWxhdGVkRG9jdW1lbnRzID0gZnVuY3Rpb24oc2VsZikgIHtcclxuICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICBsZXQgcmVsYXRlZERvY3VtZW50cyA9IHNlbGYuc3RhdGUucmVsYXRpb25zO1xyXG4gICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbihkb2MpICB7XHJcbiAgICAgICAgICAgIGlmIChkb2MuaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdHMgPSBzZWxmLnBhZ2VzLmZpbmQoZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhZ2UuZG9jSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLmRvY0lkID09IGRvYy5pZCAmJiBwYWdlLmRvY1R5cGVJZCA9PSBkb2MuZG9jX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFnZXMucHVzaCh7ZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWxhdGVkRG9jdW1lbnRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3hcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdG9vbGJhci1jb250YWluZXItc3R5bGVzJyksXHJcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG52YXIgX19fX0NsYXNzZz1SZWFjdC5Db21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NnX19fX0tleSBpbiBfX19fQ2xhc3NnKXtpZihfX19fQ2xhc3NnLmhhc093blByb3BlcnR5KF9fX19DbGFzc2dfX19fS2V5KSl7VG9vbEJhckNvbnRhaW5lcltfX19fQ2xhc3NnX19fX0tleV09X19fX0NsYXNzZ1tfX19fQ2xhc3NnX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2c9X19fX0NsYXNzZz09PW51bGw/bnVsbDpfX19fQ2xhc3NnLnByb3RvdHlwZTtUb29sQmFyQ29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NnKTtUb29sQmFyQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Ub29sQmFyQ29udGFpbmVyO1Rvb2xCYXJDb250YWluZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzZztcclxuICAgIGZ1bmN0aW9uIFRvb2xCYXJDb250YWluZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NnLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRvb2xCYXJDb250YWluZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzdHlsZXMudG9vbEJhckNvbnRhaW5lclN0eWxlLCBzdHlsZXNbdGhpcy5wcm9wcy5wb3NpdGlvbl0gKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJ0b29sQmFyQ29udGFpbmVyXCIsIHN0eWxlOiBzdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuVG9vbEJhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XHJcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59XHJcblxyXG5cclxuVG9vbEJhckNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb29sQmFyQ29udGFpbmVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3hcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdG9vbEJhckNvbnRhaW5lclN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaydcbiAgICB9LFxuXG4gICAgcmlnaHQ6IHtcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcblxuICAgIGxlZnQ6IHtcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICc1cHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBUb29sYmFyQ29udGFpbmVyID0gcmVxdWlyZSgnLi8uLi90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcclxuICAgIEJ0bkFkZCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcclxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3gnKSxcclxuICAgIEJ0blNhdmUgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3gnKSxcclxuICAgIEJ0bkNhbmNlbCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC5qc3gnKSxcclxuICAgIEJ0blByaW50ID0gcmVxdWlyZSgnLi8uLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3gnKSxcclxuICAgIFRhc2tXaWRnZXQgPSByZXF1aXJlKCcuLy4uL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCcpO1xyXG5cclxudmFyIF9fX19DbGFzc2Y9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2ZfX19fS2V5IGluIF9fX19DbGFzc2Ype2lmKF9fX19DbGFzc2YuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzZl9fX19LZXkpKXtEb2NUb29sQmFyW19fX19DbGFzc2ZfX19fS2V5XT1fX19fQ2xhc3NmW19fX19DbGFzc2ZfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZj1fX19fQ2xhc3NmPT09bnVsbD9udWxsOl9fX19DbGFzc2YucHJvdG90eXBlO0RvY1Rvb2xCYXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2YpO0RvY1Rvb2xCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPURvY1Rvb2xCYXI7RG9jVG9vbEJhci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NmO1xyXG4gICAgZnVuY3Rpb24gRG9jVG9vbEJhcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2YuY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5FZGl0Q2xpY2sgPSB0aGlzLmJ0bkVkaXRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQ2xpY2sgPSB0aGlzLmJ0bkFkZENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5TYXZlQ2xpY2sgPSB0aGlzLmJ0blNhdmVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsQ2xpY2sgPSB0aGlzLmJ0bkNhbmNlbENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5QcmludENsaWNrID0gdGhpcy5idG5QcmludENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCdXR0b25UYXNrID0gdGhpcy5oYW5kbGVCdXR0b25UYXNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RUYXNrID0gdGhpcy5oYW5kbGVTZWxlY3RUYXNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpc0VkaXRNb2RlID0gdGhpcy5wcm9wcy5lZGl0ZWQsXHJcbiAgICAgICAgICAgIGlzRG9jRGlzYWJsZWQgPSB0aGlzLnByb3BzLmRvY1N0YXR1cyA9PSAyID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb2NJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEuaWQgfHwgMCxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0RvY0Rpc2FibGVkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuUHJpbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuU2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuQ2FuY2VsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogaXNFZGl0TW9kZSAmJiBkb2NJZCAhPT0wLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXJDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BZGQsIHtyZWY6IFwiYnRuQWRkXCIsIG9uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkVkaXQsIHtyZWY6IFwiYnRuRWRpdFwiLCBvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuU2F2ZSwge3JlZjogXCJidG5TYXZlXCIsIG9uQ2xpY2s6IHRoaXMuYnRuU2F2ZUNsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5TYXZlJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuU2F2ZSddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5DYW5jZWwsIHtyZWY6IFwiYnRuQ2FuY2VsXCIsIG9uQ2xpY2s6IHRoaXMuYnRuQ2FuY2VsQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkNhbmNlbCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQ2FuY2VsJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blByaW50LCB7cmVmOiBcImJ0blByaW50XCIsIG9uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYnBtID8gUmVhY3QuY3JlYXRlRWxlbWVudChUYXNrV2lkZ2V0LCB7cmVmOiBcInRhc2tXaWRnZXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTGlzdDogdGhpcy5wcm9wcy5icG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0VGFzazogdGhpcy5oYW5kbGVTZWxlY3RUYXNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUJ1dHRvblRhc2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFza31cclxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jVG9vbEJhci5wcm90b3R5cGUsXCJidG5BZGRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdidG5BZGRDbGljayBjYWxsZWQnKVxyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggQWRkXHJcbiAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXHJcbi8vICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5uYW1lKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIDApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0bkVkaXRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggRWRpdFxyXG4gICAgICAgIC8vINC/0LXRgNC10LLQvtC00LjQvCDQtNC+0LrRg9C80LXQvdGCINCyINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjywg0YHQvtGF0YDQsNC90LXQvSA9IGZhbHNlXHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvY1N0YXR1cyB8fCB0aGlzLnByb3BzLmRvY1N0YXR1cyA8IDIpIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jVG9vbEJhci5wcm90b3R5cGUsXCJidG5QcmludENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByaW50IGNhbGxlZCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0blNhdmVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU2F2ZVxyXG4gICAgICAgIC8vINCy0LDQu9C40LTQsNGC0L7RgFxyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdGlvbk1lc3NhZ2UgPSB0aGlzLnByb3BzLnZhbGlkYXRvciA/IHRoaXMucHJvcHMudmFsaWRhdG9yKCkgOiAndmFsaWRhdG9yIGRvIG5vdCBleGlzdHMnLFxyXG4gICAgICAgICAgICBpc1ZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0b3IgPyAhdGhpcy5wcm9wcy52YWxpZGF0b3IoKSA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0YDQvtGI0LvQuCDQstCw0LvQuNC00LDRhtC40Y4sINGC0L4g0YHQvtGF0YDQsNC90LXRj9C8XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVEYXRhJyk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0bkNhbmNlbENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2J0bkNhbmNlbENsaWNrJyk7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBDYW5jZWxcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ldmVudEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ldmVudEhhbmRsZXIoJ0NBTkNFTCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY1Rvb2xCYXIucHJvdG90eXBlLFwiaGFuZGxlQnV0dG9uVGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgLy9AdG9kbyDQl9Cw0LrQvtC90YfQuNGC0YxcclxuXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZXhlY3V0ZVRhc2snLCB0YXNrKTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY1Rvb2xCYXIucHJvdG90eXBlLFwiaGFuZGxlU2VsZWN0VGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgLy9AdG9kbyDQl9Cw0LrQvtC90YfQuNGC0YxcclxuICAgICAgICBjb25zdCB0YXNrVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuRG9jVG9vbEJhci5Qcm9wVHlwZXMgPSB7XHJcbiAgICBicG06IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIGVkaXRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkb2NTdGF0dXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICB2YWxpZGF0b3I6IFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbn1cclxuXHJcbkRvY1Rvb2xCYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgYnBtOiBbXSxcclxuICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICBkb2NTdGF0dXM6IDBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NUb29sQmFyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci9kb2MtdG9vbGJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnc2F2ZSc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3U9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3VfX19fS2V5IGluIF9fX19DbGFzc3Upe2lmKF9fX19DbGFzc3UuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzdV9fX19LZXkpKXtCdXR0b25SZWdpc3RlclByaW50W19fX19DbGFzc3VfX19fS2V5XT1fX19fQ2xhc3N1W19fX19DbGFzc3VfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdT1fX19fQ2xhc3N1PT09bnVsbD9udWxsOl9fX19DbGFzc3UucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3UpO0J1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyUHJpbnQ7QnV0dG9uUmVnaXN0ZXJQcmludC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3N1O1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlclByaW50KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzdS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc2FibGVkOiBuZXh0UHJvcHMuZGlzYWJsZWR9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuU2F2ZVwiLCBcclxuICAgICAgICAgICAgdmFsdWU6IFwiU2F2ZVwiLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJQcmludC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyUHJpbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnY2FuY2VsJztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzdj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzdl9fX19LZXkgaW4gX19fX0NsYXNzdil7aWYoX19fX0NsYXNzdi5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3N2X19fX0tleSkpe0J1dHRvblJlZ2lzdGVyQ2FuY2VsW19fX19DbGFzc3ZfX19fS2V5XT1fX19fQ2xhc3N2W19fX19DbGFzc3ZfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdj1fX19fQ2xhc3N2PT09bnVsbD9udWxsOl9fX19DbGFzc3YucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyQ2FuY2VsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N2KTtCdXR0b25SZWdpc3RlckNhbmNlbC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJDYW5jZWw7QnV0dG9uUmVnaXN0ZXJDYW5jZWwuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzdjtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJDYW5jZWwocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3N2LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckNhbmNlbC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyQ2FuY2VsLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJDYW5jZWwucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5DYW5jZWxcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkNhbmNlbFwiLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyQ2FuY2VsLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyQ2FuY2VsLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJDYW5jZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItY2FuY2VsL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwuanN4XG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ3ByaW50JztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzcj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzcl9fX19LZXkgaW4gX19fX0NsYXNzcil7aWYoX19fX0NsYXNzci5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NyX19fX0tleSkpe0J1dHRvblJlZ2lzdGVyUHJpbnRbX19fX0NsYXNzcl9fX19LZXldPV9fX19DbGFzc3JbX19fX0NsYXNzcl9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NyPV9fX19DbGFzc3I9PT1udWxsP251bGw6X19fX0NsYXNzci5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzcik7QnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJQcmludDtCdXR0b25SZWdpc3RlclByaW50Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3I7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyUHJpbnQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NyLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuUHJpbnRcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlByaW50XCIsIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJQcmludC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbn1cclxuXHJcblxyXG5CdXR0b25SZWdpc3RlclByaW50LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJQcmludDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1wcmludC9idXR0b24tcmVnaXN0ZXItcHJpbnQuanN4XG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vdGFzay13aWRnZXQtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzdz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzd19fX19LZXkgaW4gX19fX0NsYXNzdyl7aWYoX19fX0NsYXNzdy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3N3X19fX0tleSkpe1Rhc2tXaWRnZXRbX19fX0NsYXNzd19fX19LZXldPV9fX19DbGFzc3dbX19fX0NsYXNzd19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N3PV9fX19DbGFzc3c9PT1udWxsP251bGw6X19fX0NsYXNzdy5wcm90b3R5cGU7VGFza1dpZGdldC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdyk7VGFza1dpZGdldC5wcm90b3R5cGUuY29uc3RydWN0b3I9VGFza1dpZGdldDtUYXNrV2lkZ2V0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3c7XHJcbiAgICBmdW5jdGlvbiBUYXNrV2lkZ2V0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzdy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIGxldCB0YXNrcyA9IHByb3BzLnRhc2tMaXN0IHx8IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCF0YXNrc1swXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgdGFza3NbMF0uc3RhdHVzID0gJ29wZW5lZCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0YXNrTGlzdDogdGFza3NcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0VGFzayA9IHRoaXMuaGFuZGxlU2VsZWN0VGFzay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnV0dG9uVGFzayA9IHRoaXMuaGFuZGxlQnV0dG9uVGFzay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrV2lkZ2V0LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgIGlmICh0YXNrLnN0YXR1cyA9PT0gJ29wZW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghdGFza3MpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpXHJcblxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgICAgICB0YXNrcy5sZW5ndGggPiAxID9cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVTZWxlY3RUYXNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWxlY3RUYXNrXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrcy5tYXAoZnVuY3Rpb24odGFza05hbWUsIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSAnb3B0aW9uLScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogMCwga2V5OiBrZXksIHJlZjoga2V5fSwgXCIgXCIsIHRhc2tOYW1lLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJidXR0b25UYXNrXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFzaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRhc2tzLmxlbmd0aCA9PSAxID8gdHJ1ZTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGFza3MubGVuZ3RoID09IDE/IHRhc2tzWzBdLm5hbWU6ICcnfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1dpZGdldC5wcm90b3R5cGUsXCJoYW5kbGVTZWxlY3RUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCB0YXNrTmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlU2VsZWN0VGFzayh0YXNrTmFtZSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tXaWRnZXQucHJvdG90eXBlLFwiaGFuZGxlQnV0dG9uVGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsNC60YLRg9Cw0LvRjNC90YPRjiDQt9Cw0LTQsNGH0YNcclxuICAgICAgICBsZXQgYWN0dWFsVGFzayA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YXNrID0gYWN0dWFsVGFzay5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmFjdGlvblxyXG4gICAgICAgICAgICB9KTsgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0L/RgNC+0YbQtdC00YPRgNGLXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVCdXR0b25UYXNrKHRhc2spO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrV2lkZ2V0LnByb3RvdHlwZSxcImdldERlZmF1bHRUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFt7c3RlcDogMCwgbmFtZTogJ1N0YXJ0JywgYWN0aW9uOiAnc3RhcnQnLCBzdGF0dXM6ICdvcGVuZWQnfV1cclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuVGFza1dpZGdldC5Qcm9wVHlwZXMgPSB7XHJcbiAgICB0YXNrTGlzdDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgaGFuZGxlU2VsZWN0VGFzazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXNrV2lkZ2V0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC5qc3hcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZXhlY3V0ZSc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3k9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3lfX19fS2V5IGluIF9fX19DbGFzc3kpe2lmKF9fX19DbGFzc3kuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzeV9fX19LZXkpKXtCdXR0b25SZWdpc3RlckV4ZWN1dGVbX19fX0NsYXNzeV9fX19LZXldPV9fX19DbGFzc3lbX19fX0NsYXNzeV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N5PV9fX19DbGFzc3k9PT1udWxsP251bGw6X19fX0NsYXNzeS5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJFeGVjdXRlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N5KTtCdXR0b25SZWdpc3RlckV4ZWN1dGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRXhlY3V0ZTtCdXR0b25SZWdpc3RlckV4ZWN1dGUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzeTtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJFeGVjdXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzeS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckV4ZWN1dGUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5FeGVjdXRlXCIsIFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja30sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlckV4ZWN1dGUucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlL2J1dHRvbi1yZWdpc3Rlci1leGVjdXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oc2VsZiwgcmVxRmllbGRzKSB7XG5cbiAgICAvLyDQstCw0LvQuNC00LDRhtC40Y8g0YTQvtGA0LzRi1xuICAgIHZhciB3YXJuaW5nID0gdm9pZCAwLFxuICAgICAgICByZXF1aXJlZEZpZWxkcyA9IHJlcUZpZWxkcyB8fCBbXSxcbiAgICAgICAgbm90UmVxdWlyZWRGaWVsZHMgPSBbXSxcbiAgICAgICAgbm90TWluTWF4UnVsZSA9IFtdLFxuICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcblxuICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIGlmIChmaWVsZC5uYW1lIGluIGRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YVtmaWVsZC5uYW1lXTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vdFJlcXVpcmVkRmllbGRzLnB1c2goZmllbGQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC90LAg0LzQuNC9IC4g0LzQsNC60YEg0LfQvdCw0YfQtdC90LjRj1xuXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSAmJiB2YWx1ZSA+IHByb3BzLm1heFxuICAgICAgICAgICAgdmFyIGNoZWNrVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkVmFsdWVEID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC5taW4gJiYgY29udHJvbGxlZFZhbHVlRCA8IGZpZWxkLm1pbiAmJiBmaWVsZC5tYXggJiYgY29udHJvbGxlZFZhbHVlRCA+IGZpZWxkLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkVmFsdWVOID0gTnVtYmVyKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZU4gPT09IDAgfHwgZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZU4gPCBmaWVsZC5taW4gJiYgZmllbGQubWF4ICYmIGNvbnRyb2xsZWRWYWx1ZU4gPiBmaWVsZC5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub3RNaW5NYXhSdWxlLnB1c2goZmllbGQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub3RSZXF1aXJlZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSAncHV1ZHViIHZhamFsaWt1ZCBhbmRtZWQgKCcgKyBub3RSZXF1aXJlZEZpZWxkcy5qb2luKCcsICcpICsgJykgJztcbiAgICB9XG5cbiAgICBpZiAobm90TWluTWF4UnVsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nID8gd2FybmluZyA6ICcnICsgJyBtaW4vbWF4IG9uIHZhbGUoJyArIG5vdE1pbk1heFJ1bGUuam9pbignLCAnKSArICcpICc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdhcm5pbmc7IC8vINCy0LXRgNC90LXQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L7QsSDQuNGC0L7Qs9Cw0YUg0LLQsNC70LjQtNCw0YbQuNC4XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL21peGluL3ZhbGlkYXRlRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgYnV0dG9uU3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vbW9kYWxwYWdlLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc2k9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2lfX19fS2V5IGluIF9fX19DbGFzc2kpe2lmKF9fX19DbGFzc2kuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzaV9fX19LZXkpKXtNb2RhbFBhZ2VbX19fX0NsYXNzaV9fX19LZXldPV9fX19DbGFzc2lbX19fX0NsYXNzaV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NpPV9fX19DbGFzc2k9PT1udWxsP251bGw6X19fX0NsYXNzaS5wcm90b3R5cGU7TW9kYWxQYWdlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NpKTtNb2RhbFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1vZGFsUGFnZTtNb2RhbFBhZ2UuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzaTtcclxuICAgIGZ1bmN0aW9uIE1vZGFsUGFnZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2kuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsUGFnZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvd1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcImNsb3NlTW9kYWxQYWdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2UucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3c6IG5leHRQcm9wcy5zaG93fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZS5wcm90b3R5cGUsXCJoYW5kbGVCdG5DbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VCdG5DbGljayhidG5FdmVudCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQtdGB0LvQuCDQv9C10YDQtdC00LDQvSDQsNGC0YDQuNCx0YMgbW9kYWxPYmplY3RzID0gWydidG5PaycsJ2J0bkNhbmNlbCddXHJcbiAgICAgICAgbGV0IGhpZGVCdG5PayA9IHRoaXMucHJvcHMubW9kYWxPYmplY3RzLmluZGV4T2YoJ2J0bk9rJykgPT0gLTEgPyBmYWxzZSA6IHRydWUsIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQvtC5INCe0LpcclxuICAgICAgICAgICAgaGlkZUJ0bkNhbmNlbCA9IHRoaXMucHJvcHMubW9kYWxPYmplY3RzLmluZGV4T2YoJ2J0bkNhbmNlbCcpID09IC0xID8gZmFsc2UgOiB0cnVlLCAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60L7QuSBDYW5jZWxcclxuICAgICAgICAgICAgZGlzcGxheU1vZGFsID0gdGhpcy5zdGF0ZS5zaG93ID8gJ2ZsZXgnOiAnbm9uZScgLFxyXG4gICAgICAgICAgICBwYWdlUG9zaXRpb24gPSAgdGhpcy5wcm9wcy5wb3NpdGlvbixcclxuICAgICAgICAgICAgY29udGFpbmVyU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuY29udGFpbmVyLCB7ZGlzcGxheTogZGlzcGxheU1vZGFsfSwge2p1c3RpZnlDb250ZW50OnBhZ2VQb3NpdGlvbn0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiY29udGFpbmVyXCIsIHN0eWxlOiBjb250YWluZXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5tb2RhbFBhZ2UsIHJlZjogXCJtb2RhbFBhZ2VDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuaGVhZGVyLCByZWY6IFwibW9kYWxQYWdlSGVhZGVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge3JlZjogXCJoZWFkZXJOYW1lXCIsIHN0eWxlOiBzdHlsZXMuaGVhZGVyTmFtZX0sIFwiIFwiLCB0aGlzLnByb3BzLm1vZGFsUGFnZU5hbWUsIFwiIFwiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7c3R5bGU6IHN0eWxlcy5idXR0b25DbG9zZSwgcmVmOiBcImJ0bkNsb3NlXCIsIG9uQ2xpY2s6IHRoaXMuY2xvc2VNb2RhbFBhZ2UuYmluZCh0aGlzKSwgdmFsdWU6IFwieFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLm1vZGFsUGFnZUNvbnRlbnQsIHJlZjogXCJtb2RhbFBhZ2VDb250ZW50XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLm1vZGFsRm9vdGVyLCByZWY6IFwibW9kYWxQYWdlQnV0dG9uc1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5PayA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJidG5Pa1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPa1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoJ3dpZHRoJyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLndpZHRoOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICgnaGVpZ2h0JyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLmhlaWdodDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsICdPaycpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5Pa1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBidXR0b25TdHlsZXMuaWNvbnNbJ29rJ119KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5idXR0b25zU2VwYXJhdG9yfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImJ0bkNhbmNlbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJDYW5jZWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICgnd2lkdGgnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMud2lkdGg6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogKCdoZWlnaHQnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMuaGVpZ2h0OiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcywgJ0NhbmNlbCcpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibW9kYWxQYWdlQnV0dG9uc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5DYW5jZWxcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogYnV0dG9uU3R5bGVzLmljb25zWydjYW5jZWwnXX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuTW9kYWxQYWdlLnByb3BUeXBlcyA9IHtcclxuICAgIG1vZGFsUGFnZU5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgc2hvdzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ2ZsZXgtc3RhcnQnLCAnZmxleC1lbmQnXSksXHJcbn1cclxuXHJcblxyXG5Nb2RhbFBhZ2UuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgbW9kYWxQYWdlTmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgbW9kYWxPYmplY3RzOiBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddLFxyXG4gICAgcG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgc2hvdzogZmFsc2VcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4XG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgIH0sXG4gICAgbW9kYWxQYWdlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICc4cHgnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGFsaWduU2VsZjogJ2NlbnRlcidcbiAgICB9LFxuICAgIG1vZGFsUGFnZUNvbnRlbnQ6IHtcbiAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICBtYXJnaW46ICcxMHB4J1xuICAgIH0sXG4gICAgaGVhZGVyOiB7XG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgZGFya2dyYXknLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnbGlnaHRncmF5JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nXG4gICAgfSxcblxuICAgIGhlYWRlck5hbWU6IHtcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICcxMHB4J1xuICAgIH0sXG5cbiAgICBtb2RhbEZvb3Rlcjoge1xuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIG1hcmdpbkJvdHRvbjogJzEwcHgnXG4gICAgfSxcblxuICAgIG1vZGFsUGFnZUJ1dHRvbnM6IHtcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgICBtYXJnaW5Cb3R0b206ICcxMHB4J1xuICAgIH0sXG5cbiAgICBidXR0b25zU2VwYXJhdG9yOiB7XG4gICAgICAgIHdpZHRoOiAnMTBweCdcbiAgICB9LFxuXG4gICAgYnV0dG9uQ2xvc2U6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmF5JyxcbiAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICc5MDAnXG5cbiAgICB9LFxuXG4gICAgbGVmdDoge1xuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMCdcbiAgICB9LFxuXG4gICAgcmlnaHQ6IHtcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzAnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY1N0b3JlID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgaWQ6ICdkb2NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGdyaWRDZWxsRWRpdGVkOiAwLCAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INCyINCz0YDQuNC00LUg0YDQtdC00LDQutGC0LjRgNGD0LXQvNGD0Y4g0Y/Rh9C10LnQutGDXG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICBkZXRhaWxzOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0LPRgNC40LRcbiAgICAgICAgcmVsYXRpb25zOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0YHQstGP0LfQsNC90L3Ri9C1INC00L7QutGD0LzQtdC90YLRi1xuICAgICAgICBncmlkQ29uZmlnOiBbXSwgLy8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINCz0YDQuNC00LBcbiAgICAgICAgZ3JpZE5hbWU6ICcnLFxuICAgICAgICBkb2NJZDogMCxcbiAgICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICAgIGVkaXRlZDogZmFsc2UsXG4gICAgICAgIHNhdmVkOiB0cnVlLFxuICAgICAgICBncmlkUm93SWQ6IDAsXG4gICAgICAgIGxpYnM6IFt7XG4gICAgICAgICAgICBpZDogJ2FzdXR1c2VkJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTpbe2lkOjEsIG5hbWU6XCJBc3V0dXMgMVwifSx7aWQ6MiwgbmFtZTpcIkFzdXR1cyAyXCJ9LHtpZDozLCBuYW1lOlwiQXN1dHVzIDNcIn0gXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ25vbWVuY2xhdHVyZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdrb250b2QnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAncHJvamVjdCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0dW5udXMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYWEnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAna2Fzc2EnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYXJ2ZWRTaXNzZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2FzdXR1c2lkJywgJ2FydmlkJ10gLy8g0LjQtCDQutC+0L3RgtGALdCw0LPQtdC90YLQsCDQuCDQvdC+0LzQtdGAINGB0YfQtdGC0LBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhcnZlZFZhbGphJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnYXN1dHVzaWQnLCAnYXJ2aWQnXSAvLyDQuNC0INC60L7QvdGC0YAt0LDQs9C10L3RgtCwINC4INC90L7QvNC10YAg0YHRh9C10YLQsFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3VzZXJzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2Rva1Byb3BzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnZG9jX3R5cGVfaWQnLCAncmVrdmlkJ10gLy8g0YLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuCDQuNC0INGD0YfRgNC10LbQtNC10L3QuNGPXG4gICAgICAgIH1dLFxuICAgICAgICBicG06IFtdLCAvLyDQtNCw0L3QvdGL0LUg0JHQnyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgdGFzazoge30sIC8vINGC0LXQutGD0YnQsNGPINC30LDQtNCw0YfQsFxuICAgICAgICBiYWNrdXA6IHt9IC8vINGF0YDQsNC90LjRgiDQvdC10LjQt9C80LXQvdC10L3QvdC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1INC00L7QutGD0LzQtdC90YLQsFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIGJhY2t1cENoYW5nZTogZnVuY3Rpb24gYmFja3VwQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDRhdGA0LDQvdC40YIg0L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvRhSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgYmFja3VwOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMaWJzRmlsdGVyOiBmdW5jdGlvbiBzZXRMaWJzRmlsdGVyKHVwZGF0ZXIsIGxpYk5hbWUsIGZpbHRlcikge1xuXG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDRgdC/0YDQsNCy0L7Rh9C90LjQulxuICAgICAgICAgICAgdmFyIGxpYnMgPSB0aGlzLmxpYnM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaWJzW2ldLmlkID09IGxpYk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlic1tpXS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsIGxpYk5hbWUpOyAvL9C90L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBncmlkUm93SWRDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRSb3dJZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkUm93SWRDaGFuZ2UgY2FsbGVkOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRSb3dJZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRMaWJzOiBmdW5jdGlvbiBsb2FkTGlicyh1cGRhdGVyLCBsaWJzVG9VcGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpYnNUb1VwZGF0ZSB8fCBpdGVtLmlkID09IGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQvtCx0L3QvtCy0LvQtdC90LjQtSDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGBINGB0LXRgNCy0LXRgNCwXG4gICAgICAgICAgICBsaWJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbGliUGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpYlBhcmFtcyA9IGl0ZW0ucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQt9Cw0L/RgNC+0YHQsFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYlBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zW2ldID0gX3RoaXMuZGF0YVtpdGVtLmZpZWxkc1tpXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2xvYWRMaWJzKGl0ZW0uaWQsIGxpYlBhcmFtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2F2ZURhdGE6IGZ1bmN0aW9uIHNhdmVEYXRhKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHNhdmVEb2MoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhlY3V0ZVRhc2s6IGZ1bmN0aW9uIGV4ZWN1dGVUYXNrKHVwZGF0ZXIsIHRhc2spIHtcbiAgICAgICAgICAgIF9leGVjdXRlVGFzayh0YXNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlRG9jOiBmdW5jdGlvbiBkZWxldGVEb2ModXBkYXRlcikge1xuICAgICAgICAgICAgX2RlbGV0ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBncmlkQ2VsbEVkaXRlZENoYW5nZTogZnVuY3Rpb24gZ3JpZENlbGxFZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGVkIGdyaWRDZWxsRWRpdGVkQ2hhbmdlOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRDZWxsRWRpdGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jSWRDaGFuZ2U6IGZ1bmN0aW9uIGRvY0lkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vINGH0LjRgdGC0LjQvCDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2NJZENoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY0lkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkb2NJZENoYW5nZSB2aWdhJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmFydmlkICE9PSAndW5kZWZpbml0ZScpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQutC+0L3RgtGA0LDQs9C10L3RgiDQvtGC0YHRg9GC0YHQstGD0LXRgiwg0YLQviDQuCDQv9Cw0YDQsNC80LXRgtGAINC60L7QvdGC0YDQsNCz0LXQvdGC0LAg0YLQsNC60LbQtSDQvtCx0L3Rg9C70LjQvFxuICAgICAgICAgICAgICAgIHZhbHVlLmFydmlkID0gdmFsdWUuYXN1dHVzaWQgPyB2YWx1ZS5hcnZpZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDQtNC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGB0YfQtdGC0L7QslxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NldExpYnNGaWx0ZXInLCAnYXJ2ZWRTaXNzZScsIFt2YWx1ZS5hc3V0dXNpZCwgdmFsdWUuYXJ2aWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnBtQ2hhbmdlOiBmdW5jdGlvbiBicG1DaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCX0LDQs9GA0YPQt9C60LAg0JHQn1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnYnBtQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBicG06IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxhdGlvbnNDaGFuZ2U6IGZ1bmN0aW9uIHJlbGF0aW9uc0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC10Lkg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHJlbGF0aW9uczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbHNDaGFuZ2U6IGZ1bmN0aW9uIGRldGFpbHNDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LPRgNC40LTQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGV0YWlsczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRDb25maWdDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRDb25maWdDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQutC+0L3RhNC40LPRg9GA0LDRhtC40Lgg0LPRgNC40LTQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkQ29uZmlnOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlZENoYW5nZTogZnVuY3Rpb24gZGVsZXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0LHRi9C70LAg0LLRi9C30LLQsNC90LAg0LrQvdC+0L/QutCwIERlbGV0ZVxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZWxldGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiBlZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXRgtGB0Y8g0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBlZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlZENoYW5nZTogZnVuY3Rpb24gc2F2ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNGPINCyINC00LDQvdC90YvRhSDQuCDQuNC3INGB0L7RhdGA0LDQvdC10L3QuNC1XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNhdmVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGlic0NoYW5nZTogZnVuY3Rpb24gbGlic0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQsNGFXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaWJzQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbGliczogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWROYW1lQ2hhbmdlOiBmdW5jdGlvbiBncmlkTmFtZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkTmFtZTogdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gX2RlbGV0ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAvLyDQstC10YDQvdC10LzRgdGPINCyINGA0LXQs9C40YHRgtGAXG4gICAgLy9yZXF1ZXJ5KCdkZWxldGUnLCBudWxsKTtcbiAgICBkb2N1bWVudC5sb2NhdGlvbiA9ICcvZG9jdW1lbnRzJztcbn07XG5cbmZ1bmN0aW9uIF9leGVjdXRlVGFzayh0YXNrKSB7XG4gICAgLypcclxuICAgICAgICDQktGL0L/QvtC70L3QuNGCINC30LDQv9GA0L7RgSDQvdCwINC40YHQv9C+0LvQvdC10L3QuNC1INC30LDQtNCw0YfQuFxyXG4gICAgICovXG5cbiAgICB2YXIgdGFza3NQYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jU3RvcmUuZGF0YS5pZCxcbiAgICAgICAgdGFza3M6IHRhc2ssXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkXG4gICAgfTtcblxuICAgIC8vICAgY29uc29sZS5sb2coJ2V4ZWN1dGVUYXNrOicsIHRhc2ssIHRhc2tzUGFyYW1ldGVycyk7XG5cbiAgICByZXF1ZXJ5KCdleGVjdXRlJywgSlNPTi5zdHJpbmdpZnkodGFza3NQYXJhbWV0ZXJzKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyIHx8IGRhdGEucmVzdWx0ID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhlY3V0ZVRhc2sgYXJyaXZlZCBkb2NTdG9yZS5kYXRhLmlkLCBkb2NTdG9yZS5kb2NJZCwgZGF0YScsZG9jU3RvcmUuZGF0YS5pZCxkb2NTdG9yZS5kb2NJZCwgIGRhdGEpO1xuXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0YPRgdC/0LXRiNC90L7QvCDQstGL0L/QvtC70L3QtdC90LjQuCDQt9Cw0LTQsNGH0LgsINCy0YvQv9C+0LvQvdC40YLRjCDQv9C10YDQtdCz0YDRg9C30LrRgyDQtNC+0LrRg9C80LXQvdGC0LAgKNCy0YDQtdC80LXQvdC90L4pXG4gICAgICAgICAgICAvL0B0b2RvINC/0L7QtNGC0Y/QvdGD0YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LHQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgICAgIHJlbG9hZERvY3VtZW50KGRvY1N0b3JlLmRhdGEuaWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZXF1ZXJ5LCByZWxvYWREb2N1bWVudCcsIGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzYXZlRG9jKCkge1xuICAgIC8vINCy0YvQt9GL0LLQsNC10YIg0LzQtdGC0L7QtCDRgdC+0YXRgNCw0L3QtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICB2YXIgc2F2ZURhdGEgPSB7XG4gICAgICAgIGlkOiBkb2NTdG9yZS5kYXRhLmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jU3RvcmUuZGF0YS5kb2NfdHlwZV9pZCwgLy8g0LLRi9C90LXRgdC10L3QviDQtNC70Y8g0L/QvtC00LPRgNGD0LfQutC4INC80L7QtNC10LvQuFxuICAgICAgICBkYXRhOiBkb2NTdG9yZS5kYXRhLFxuICAgICAgICBkZXRhaWxzOiBkb2NTdG9yZS5kZXRhaWxzXG4gICAgfTtcblxuICAgIHJlcXVlcnkoJ3NhdmUnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGVycjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG5ld0lkID0gZGF0YVswXS5pZDtcbiAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcbiAgICAgICAgICAgIHNhdmVEYXRhLmRhdGEuaWQgPSBuZXdJZDtcblxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEpOyAvL9C90L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIG5ld0lkKTsgLy8g0L3QvtCy0L7QtSDQuNC0XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIHRydWUpOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XG5cblxuICAgICAgICAgICAgLy8gcmVsb2FkIGRvY3VtZW50XG4gICAgICAgICAgICByZWxvYWREb2N1bWVudChuZXdJZCk7IC8vQHRvZG8g0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQv9C10YDQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigndGVra2lzIHZpZ2EnLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcclxuICAgIFxyXG4gICAgICAgIHJlcXVlcnkoJ3NhdmVBbmRTZWxlY3QnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCAhPT0gc2F2ZURhdGEuZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcclxuICAgICAgICAgICAgICAgICAgICBzYXZlRGF0YS5kYXRhLmlkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEgKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCApOyAvLyDQvdC+0LLQvtC1INC40LRcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIHRydWUgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgZmFsc2UgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAqL1xufTtcblxuZnVuY3Rpb24gcmVsb2FkRG9jdW1lbnQoZG9jSWQpIHtcbiAgICAvLyByZWxvYWQgZG9jdW1lbnRcblxuICAgIGlmIChkb2NJZCkge1xuICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkICsgZG9jSWQ7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfbG9hZExpYnMobGlicmFyeU5hbWUsIGxpYlBhcmFtcykge1xuICAgIHRyeSB7XG5cbiAgICAgICAgcmVxdWVyeSgnc2VsZWN0JywgSlNPTi5zdHJpbmdpZnkoeyBkb2NfdHlwZV9pZDogbGlicmFyeU5hbWUsIGlkOiAwLCBwYXJhbXM6IGxpYlBhcmFtcyB9KSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGlicyA9IGRvY1N0b3JlLmxpYnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8g0LjRidC10Lwg0LTQsNC90L3Ri9C1INGB0L/RgNCw0LLQvtC70YfQvdC40LrQsCwg0LrQvtGC0L7RgNGL0LUg0L7QsdC90L7QstC40LvQuFxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5EYXRhID0gaXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IGxpYnJhcnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkRhdGEuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdMaWJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdsaWJzQ2hhbmdlJywgbmV3TGlicyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Rla2tpcyB2aWdhJywgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXF1ZXJ5KGFjdGlvbiwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQv9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC+0YIg0YHQtdGA0LLQtdGA0LBcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBkYXRhOiBwYXJhbWV0ZXJzXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vINC00L7Qu9C20L3RiyDQv9C+0LvRg9GH0LjRgtGMINC+0LHRitC10LrRglxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZXF1ZXJ5IGVycm9yOicsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG9jU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jX3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=
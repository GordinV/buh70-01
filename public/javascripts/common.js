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
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    Button = __webpack_require__(30),
	    buttonStyles = __webpack_require__(31),
	    styles = __webpack_require__(32);

	var ____Class3=React.PureComponent;for(var ____Class3____Key in ____Class3){if(____Class3.hasOwnProperty(____Class3____Key)){ModalPage[____Class3____Key]=____Class3[____Class3____Key];}}var ____SuperProtoOf____Class3=____Class3===null?null:____Class3.prototype;ModalPage.prototype=Object.create(____SuperProtoOf____Class3);ModalPage.prototype.constructor=ModalPage;ModalPage.__superConstructor__=____Class3;
	    function ModalPage(props) {
	        ____Class3.call(this,props);
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31);


	var ____Classn=React.PureComponent;for(var ____Classn____Key in ____Classn){if(____Classn.hasOwnProperty(____Classn____Key)){Button[____Classn____Key]=____Classn[____Classn____Key];}}var ____SuperProtoOf____Classn=____Classn===null?null:____Classn.prototype;Button.prototype=Object.create(____SuperProtoOf____Classn);Button.prototype.constructor=Button;Button.__superConstructor__=____Classn;
	// кнопка создания документа в регистрах
	    function Button(props) {
	        ____Classn.call(this,props);
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
/* 31 */
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
/* 32 */
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
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const styles = __webpack_require__(39),
	    React = __webpack_require__(4);

	var ____Class8=React.Component;for(var ____Class8____Key in ____Class8){if(____Class8.hasOwnProperty(____Class8____Key)){ToolBarContainer[____Class8____Key]=____Class8[____Class8____Key];}}var ____SuperProtoOf____Class8=____Class8===null?null:____Class8.prototype;ToolBarContainer.prototype=Object.create(____SuperProtoOf____Class8);ToolBarContainer.prototype.constructor=ToolBarContainer;ToolBarContainer.__superConstructor__=____Class8;
	    function ToolBarContainer(props) {
	        ____Class8.call(this,props);
	    }

	    Object.defineProperty(ToolBarContainer.prototype,"render",{writable:true,configurable:true,value:function() {
	        return (
	            React.createElement("div", {id: "toolBarContainer", style: styles.toolBarContainerStyle}, 
	                    this.props.children
	            )
	        );
	    }});


	module.exports = ToolBarContainer;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black',
	        justifyContent: 'flex-end',
	        marginRight: '5px'
	    }
	};

/***/ },
/* 40 */,
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31),
	    Button = __webpack_require__(30),
	    ICON = 'add';


	var ____Class9=React.PureComponent;for(var ____Class9____Key in ____Class9){if(____Class9.hasOwnProperty(____Class9____Key)){ButtonRegisterAdd[____Class9____Key]=____Class9[____Class9____Key];}}var ____SuperProtoOf____Class9=____Class9===null?null:____Class9.prototype;ButtonRegisterAdd.prototype=Object.create(____SuperProtoOf____Class9);ButtonRegisterAdd.prototype.constructor=ButtonRegisterAdd;ButtonRegisterAdd.__superConstructor__=____Class9;
	// кнопка создания документа в регистрах
	    function ButtonRegisterAdd(props) {
	        ____Class9.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterAdd.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31),
	    Button = __webpack_require__(30),
	    ICON = 'edit';


	var ____Classc=React.PureComponent;for(var ____Classc____Key in ____Classc){if(____Classc.hasOwnProperty(____Classc____Key)){ButtonRegisterEdit[____Classc____Key]=____Classc[____Classc____Key];}}var ____SuperProtoOf____Classc=____Classc===null?null:____Classc.prototype;ButtonRegisterEdit.prototype=Object.create(____SuperProtoOf____Classc);ButtonRegisterEdit.prototype.constructor=ButtonRegisterEdit;ButtonRegisterEdit.__superConstructor__=____Classc;
	// кнопка создания документа в регистрах
	    function ButtonRegisterEdit(props) {
	        ____Classc.call(this,props);
	        this.state = {
	            disabled: this.props.disabled
	        }
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterEdit.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
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
/* 43 */,
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31),
	    Button = __webpack_require__(30),
	    ICON = 'print';


	var ____Classe=React.PureComponent;for(var ____Classe____Key in ____Classe){if(____Classe.hasOwnProperty(____Classe____Key)){ButtonRegisterPrint[____Classe____Key]=____Classe[____Classe____Key];}}var ____SuperProtoOf____Classe=____Classe===null?null:____Classe.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classe);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classe;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classe.call(this,props);
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDZjZjI4ZmVlN2I4Y2E2NzExNDc5Iiwid2VicGFjazovLy8uL34vZmx1eGlmeS9mbHV4aWZ5LmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2Utc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWVkaXQvYnV0dG9uLXJlZ2lzdGVyLWVkaXQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1wcmludC9idXR0b24tcmVnaXN0ZXItcHJpbnQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdGlmKG1vcmVNb2R1bGVzWzBdKSB7XG4gXHRcdFx0aW5zdGFsbGVkTW9kdWxlc1swXSA9IDA7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDI6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcblxuIFx0XHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgKHtcIjBcIjpcImRvY1wiLFwiMVwiOlwiZG9jc1wifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2Y2YyOGZlZTdiOGNhNjcxMTQ3OSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9zcmMveERpc3BhdGNoZXInKSxcbiAgICBYU3RvcmUgPSByZXF1aXJlKCcuL3NyYy94U3RvcmUnKTtcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIEZsdXhpZnkgY2xhc3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24uXHJcbiAqIEluaXRpYWxpemVzIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgc3RvcmUuXHJcbiAqIEFsc28gc2V0IHRoZSBQcm9taXNlIG9iamVjdCBpZiBpdCBpcyBnbG9iYWxseSBhdmFpbGFibGUuXHJcbiAqL1xudmFyIEZsdXhpZnkgPSBmdW5jdGlvbiBGbHV4aWZ5KCkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rpc3BhdGNoZXInLCB7XG5cdFx0dmFsdWU6IG5ldyBYRGlzcGF0Y2hlcigpXG5cdH0pO1xuXG5cdHRoaXMuc3RvcmVzID0ge307XG5cblx0aWYgKHR5cGVvZiBQcm9taXNlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0dGhpcy5wcm9taXNpZnkoUHJvbWlzZSk7XG5cdH1cbn07XG5cbkZsdXhpZnkucHJvdG90eXBlID0ge1xuXHQvKipcclxuICAqIENyZWF0ZSBhIG5ldyBzdG9yZS4gSWYgYW4gaWQgaXMgcGFzc2VkIGluIHRoZSBvcHRpb25zLFxyXG4gICogdGhlIHN0b3JlIHdpbGwgYmUgcmVnaXN0ZXJlZCBpbiB0aGUgZGlzcGF0Y2hlciBhbmQgc2F2ZWRcclxuICAqIGluIGZsdXhpZnkuc3RvcmVzW2lkXS5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMge2lkLCBpbml0aWFsU3RhdGUsIGFjdGlvbkNhbGxiYWNrfVxyXG4gICogQHJldHVybiB7WFN0b3JlfVxyXG4gICovXG5cdGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZShvcHRpb25zKSB7XG5cdFx0dmFyIHN0b3JlID0gbmV3IFhTdG9yZShvcHRpb25zKTtcblxuXHRcdC8vIElmIHRoZSBzdG9yZSBoYXMgYW4gaWQsIHJlZ2lzdGVyIGl0IGluIEZsdXhpZnkgYW5kIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0aWYgKHN0b3JlLl9pZCkge1xuXHRcdFx0dGhpcy5zdG9yZXNbc3RvcmUuX2lkXSA9IHN0b3JlO1xuXHRcdFx0dGhpcy5kaXNwYXRjaGVyLnJlZ2lzdGVyU3RvcmUoc3RvcmUuX2lkLCBzdG9yZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRXhlY3V0ZXMgYW4gYWN0aW9uLiBUaGUgYXJndW1lbnRzIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGVcclxuICAqIGZvciB0aGUgYWN0aW9uIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyLlxyXG4gICogQHJldHVybiB7IFByb21pc2UgfSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrc1xyXG4gICogICAgICAgICAgICAgICAgICAgaGF2ZSBmaW5pc2hlZC5cclxuICAqL1xuXHRkb0FjdGlvbjogZnVuY3Rpb24gZG9BY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaC5hcHBseSh0aGlzLmRpc3BhdGNoZXIsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJZiBFUzYgUHJvbWlzZSBvYmplY3QgaXMgbm90IGRlZmluZWQgZ2xvYmFsbHkgb3IgcG9seWZpbGxlZCwgYSBQcm9taXNlIG9iamVjdFxyXG4gICogY2FuIGJlIGdpdmVuIHRvIGZsdXhpZnkgaW4gb3JkZXIgdG8gbWFrZSBpdCB3b3JrLCB1c2luZyB0aGlzIG1ldGhvZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHsgUHJvbWlzZSB9IFByb21pc2UgRVM2IFByb21pc2UgY29tcGF0aWJsZSBvYmplY3RcclxuICAqIEByZXR1cm4geyB1bmRlZmluZWQgfVxyXG4gICovXG5cdHByb21pc2lmeTogZnVuY3Rpb24gcHJvbWlzaWZ5KFByb21pc2UpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0XHR0aGlzLmRpc3BhdGNoZXIuX1Byb21pc2UgPSBQcm9taXNlO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbHV4aWZ5KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvZmx1eGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbi8qKlxyXG4gKiBUaGUgYXN5bmNocm9ub3VzIGRpc3BhdGNoZXIgY29tcGF0aWJsZSB3aXRoIEZhY2Vib29rJ3MgZmx1eCBkaXNwYXRjaGVyXHJcbiAqIGh0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vZmx1eC9kb2NzL2Rpc3BhdGNoZXIuaHRtbFxyXG4gKlxyXG4gKiBEaXNwYXRjaCBhY3Rpb25zIHRvIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrcywgdGhvc2UgYWN0aW9uIGNhbiBiZVxyXG4gKiBhc3luY2hyb25vdXMgaWYgdGhleSByZXR1cm4gYSBQcm9taXNlLlxyXG4gKi9cblxudmFyIFhEaXNwYXRjaGVyID0gZnVuY3Rpb24gWERpc3BhdGNoZXIoKSB7XG5cdHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuXHR0aGlzLl9kaXNwYXRjaFF1ZXVlID0gW107XG5cdHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHR0aGlzLl9JRCA9IDE7XG5cblx0aWYgKHR5cGVvZiBQcm9taXNlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0dGhpcy5fUHJvbWlzZSA9IFByb21pc2U7XG5cdH1cbn07XG5cblhEaXNwYXRjaGVyLnByb3RvdHlwZSA9IHtcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZyB8IEZ1bmN0aW9ufSAgIGlkICBJZiBhIHN0cmluZyBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdGhlIGlkIG9mIHRoZSBjYWxsYmFjay5cclxuICAqICAgICAgICAgICAgICAgICAgSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjaywgYW5kIGlkIGlzIGdlbmVyYXRlZFxyXG4gICogICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5LlxyXG4gICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIElmIGFuIGlkIGlzIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50LCB0aGlzIHdpbGwgYmUgdGhlIGNhbGxiYWNrLlxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIoaWQsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIElEID0gaWQ7XG5cblx0XHQvLyBJZiB0aGUgY2FsbGJhY2sgaXMgdGhlIGZpcnN0IHBhcmFtZXRlclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0SUQgPSAnSURfJyArIHRoaXMuX0lEO1xuXHRcdFx0Y2FsbGJhY2sgPSBpZDtcblx0XHR9XG5cblx0XHR0aGlzLl9jYWxsYmFja3NbSURdID0gY2FsbGJhY2s7XG5cdFx0dGhpcy5fSUQrKztcblxuXHRcdHJldHVybiBJRDtcblx0fSxcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgWFN0b3JlIGluIHRoZSBkaXNwYWNoZXIuIFhTdG9yZXMgaGFzIGEgbWV0aG9kIGNhbGxlZCBjYWxsYmFjay4gVGhlIGRpc3BhdGNoZXJcclxuICAqIHJlZ2lzdGVyIHRoYXQgZnVuY3Rpb24gYXMgYSByZWd1bGFyIGNhbGxiYWNrLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgIFRoZSBpZCBmb3IgdGhlIHN0b3JlIHRvIGJlIHVzZWQgaW4gdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICogQHBhcmFtICB7WFN0b3JlfSB4U3RvcmUgU3RvcmUgdG8gcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcclxuICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlclN0b3JlOiBmdW5jdGlvbiByZWdpc3RlclN0b3JlKGlkLCB4U3RvcmUpIHtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4U3RvcmUsICdfZGlzcGF0Y2hlcicsIHtcblx0XHRcdHZhbHVlOiB0aGlzXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RlcihpZCwgeFN0b3JlLmNhbGxiYWNrKTtcblx0fSxcblxuXHQvKipcclxuICAqIFVucmVnaXN0ZXIgYSBjYWxsYmFjayBnaXZlbiBpdHMgaWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCBDYWxsYmFjay9TdG9yZSBpZFxyXG4gICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICovXG5cdHVucmVnaXN0ZXI6IGZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcblx0XHRkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2lkXTtcblx0fSxcblxuXHQvKipcclxuICAqIENyZWF0ZXMgYSBwcm9taXNlIGFuZCB3YWl0cyBmb3IgdGhlIGNhbGxiYWNrcyBzcGVjaWZpZWQgdG8gY29tcGxldGUgYmVmb3JlIHJlc29sdmUgaXQuXHJcbiAgKiBJZiBpdCBpcyB1c2VkIGJ5IGFuIGFjdGlvbkNhbGxiYWNrLCB0aGUgcHJvbWlzZSBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gbGV0IG90aGVyIGNhbGxiYWNrc1xyXG4gICogd2FpdCBmb3IgaXQgaWYgbmVlZGVkLlxyXG4gICpcclxuICAqIEJlIGNhcmVmdWwgb2Ygbm90IHRvIHdhaXQgYnkgYSBjYWxsYmFjayB0aGF0IGlzIHdhaXRpbmcgYnkgdGhlIGN1cnJlbnQgY2FsbGJhY2ssIG9yIHRoZVxyXG4gICogcHJvbWlzZXMgd2lsbCBuZXZlciBmdWxmaWxsLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZzxBcnJheT58U3RyaW5nfSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FsbGJhY2tzL3N0b3JlcyB0byB3YWl0IGZvci5cclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2tzIGFyZSBjb21wbGV0ZWQuXHJcbiAgKi9cblx0d2FpdEZvcjogZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcblx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHQgICAgaSA9IDA7XG5cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cblx0XHRmb3IgKDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuX3Byb21pc2VzW2lkc1tpXV0pIHByb21pc2VzLnB1c2godGhpcy5fcHJvbWlzZXNbaWRzW2ldXSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFwcm9taXNlcy5sZW5ndGgpIHJldHVybiB0aGlzLl9Qcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9Qcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiB0byBhbGwgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzL3N0b3Jlcy5cclxuICAqXHJcbiAgKiBJZiBhIHNlY29uZCBhY3Rpb24gaXMgZGlzcGF0Y2hlZCB3aGlsZSB0aGVyZSBpcyBhIGRpc3BhdGNoIG9uLCBpdCB3aWxsIGJlXHJcbiAgKiBlbnF1ZXVlZCBhbiBkaXNwYXRjaGVkIGFmdGVyIHRoZSBjdXJyZW50IG9uZS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2UsXG5cdFx0ICAgIGRlcXVldWU7XG5cblx0XHRpZiAoIXRoaXMuX1Byb21pc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIHByb21pc2VzLicpO1xuXG5cdFx0Ly8gSWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBkaXNwYXRjaCwgZW5xdWV1ZSB0aGUgZGlzcGF0Y2hcblx0XHRpZiAodGhpcy5fY3VycmVudERpc3BhdGNoKSB7XG5cblx0XHRcdC8vIERpc3BhdGNoIGFmdGVyIHRoZSBjdXJyZW50IG9uZVxuXHRcdFx0cHJvbWlzZSA9IHRoaXMuX2N1cnJlbnREaXNwYXRjaC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG1lLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEVucXVldWUsIHNldCB0aGUgY2hhaW4gYXMgdGhlIGN1cnJlbnQgcHJvbWlzZSBhbmQgcmV0dXJuXG5cdFx0XHR0aGlzLl9kaXNwYXRjaFF1ZXVlLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gcHJvbWlzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gdGhpcy5fZGlzcGF0Y2guYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIGlubWVkaWF0ZWxseS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQgd2hlbiBhbGwgdGhlIGNhbGxiYWNrcyBoYXZlIGZpbmlzZWQuXHJcbiAgKi9cblx0X2Rpc3BhdGNoOiBmdW5jdGlvbiBfZGlzcGF0Y2goKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2VzID0gW107XG5cblx0XHR0aGlzLl9wcm9taXNlcyA9IFtdO1xuXG5cdFx0Ly8gQSBjbG9zdXJlIGlzIG5lZWRlZCBmb3IgdGhlIGNhbGxiYWNrIGlkXG5cdFx0T2JqZWN0LmtleXModGhpcy5fY2FsbGJhY2tzKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXG5cdFx0XHQvLyBBbGwgdGhlIHByb21pc2VzIG11c3QgYmUgc2V0IGluIG1lLl9wcm9taXNlcyBiZWZvcmUgdHJ5aW5nIHRvIHJlc29sdmVcblx0XHRcdC8vIGluIG9yZGVyIHRvIG1ha2Ugd2FpdEZvciB3b3JrIG9rXG5cdFx0XHRtZS5fcHJvbWlzZXNbaWRdID0gbWUuX1Byb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2NhbGxiYWNrc1tpZF0uYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9taXNlcy5wdXNoKG1lLl9wcm9taXNlc1tpZF0pO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHR2YXIgZGVxdWV1ZSA9IGZ1bmN0aW9uIGRlcXVldWUoKSB7XG5cdFx0XHRtZS5fZGlzcGF0Y2hRdWV1ZS5zaGlmdCgpO1xuXHRcdFx0aWYgKCFtZS5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGgpIG1lLl9jdXJyZW50RGlzcGF0Y2ggPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRlcXVldWUsIGRlcXVldWUpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSXMgdGhpcyBkaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICovXG5cdGlzRGlzcGF0Y2hpbmc6IGZ1bmN0aW9uIGlzRGlzcGF0Y2hpbmcoKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGg7XG5cdH1cblxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRGlzcGF0Y2hlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWEVtaXR0ZXIgPSByZXF1aXJlKCcuL3hFbWl0dGVyJyksXG4gICAgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFN0b3JlID0gWEVtaXR0ZXIuX2V4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUocHJvcHMpIHtcblx0XHRpZiAoIXByb3BzKSByZXR1cm4gdGhpcy5wcm9wcyA9IHt9O1xuXG5cdFx0dGhpcy5wcm9wcyA9IHt9O1xuXHRcdGZvciAodmFyIHAgaW4gcHJvcHMpIHtcblx0XHRcdHRoaXMucHJvcHNbcF0gPSBwcm9wc1twXTtcblx0XHR9XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbiBnZXQocHJvcCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzW3Byb3BdO1xuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gc2V0KHByb3AsIHZhbHVlKSB7XG5cdFx0dmFyIHByb3BzID0gcHJvcCxcblx0XHQgICAgdXBkYXRlcyA9IFtdLFxuXHRcdCAgICBwcmV2aW91c1ZhbHVlLFxuXHRcdCAgICBwO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0cHJvcHMgPSB7fTtcblx0XHRcdHByb3BzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIHByb3BzKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twXSAhPSBwcm9wc1twXSkge1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlID0gdGhpcy5wcm9wc1twXTtcblx0XHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdFx0XHR1cGRhdGVzLnB1c2goe1xuXHRcdFx0XHRcdHByb3A6IHAsXG5cdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZTogcHJvcHNbcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHVwZGF0ZXMubGVuZ3RoKSB0aGlzLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHR9XG59KTtcblxudmFyIFhTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKG9wdGlvbnMpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBvcHRzID0gb3B0aW9ucyB8fCB7fSxcblx0XHQgICAgc3RvcmUgPSBuZXcgU3RvcmUob3B0cy5pbml0aWFsU3RhdGUpLFxuXHRcdCAgICBhY3Rpb25UeXBlLFxuXHRcdCAgICBzdGF0ZVByb3A7XG5cblx0XHQvLyBTdG9yZSBpZFxuXHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19pZCcsIHtcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMuaWRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlZ2lzdGVyIGFjdGlvbiBjYWxsYmFja3MgaW4gdGhlIHN0b3JlXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0X2NhbGxiYWNrczoge1xuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHR2YWx1ZToge31cblx0XHRcdH0sXG5cdFx0XHRhZGRBY3Rpb25DYWxsYmFja3M6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNsYmtzKSB7XG5cdFx0XHRcdFx0Zm9yIChhY3Rpb25UeXBlIGluIGNsYmtzKSB7XG5cdFx0XHRcdFx0XHRtZS5fY2FsbGJhY2tzW2FjdGlvblR5cGVdID0gY2xia3NbYWN0aW9uVHlwZV0uYmluZCh0aGlzLCBzdG9yZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsYmFjayBmb3IgcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRcdGNhbGxiYWNrOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGFjdGlvblR5cGUgPSBhcmd1bWVudHNbMF0sXG5cdFx0XHRcdFx0ICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdKSB7XG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2tzIGFyZSBhbHJlYWR5IGJvdW5kIHRvIHRoaXMgeFN0b3JlIGFuZCB0aGUgbXV0YWJsZSBzdG9yZVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1thY3Rpb25UeXBlXS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZEFjdGlvbkNhbGxiYWNrcyhvcHRzLmFjdGlvbkNhbGxiYWNrcyB8fCB7fSk7XG5cblx0XHQvLyBDcmVhdGUgaW5tbXV0YWJsZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIGFkZFByb3BlcnR5ID0gZnVuY3Rpb24gYWRkUHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsIHByb3BOYW1lLCB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBzdG9yZS5nZXQocHJvcE5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0aWYgKG9wdHMuaW5pdGlhbFN0YXRlKSB7XG5cdFx0XHRmb3IgKHN0YXRlUHJvcCBpbiBvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0XHRhZGRQcm9wZXJ0eShzdGF0ZVByb3AsIG9wdHMuaW5pdGlhbFN0YXRlW3N0YXRlUHJvcF0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEVtaXQgb24gc3RvcmUgY2hhbmdlXG5cdFx0c3RvcmUub24oJ2NoYW5nZScsIGZ1bmN0aW9uICh1cGRhdGVzKSB7XG5cdFx0XHR2YXIgdXBkYXRlc0xlbmd0aCA9IHVwZGF0ZXMubGVuZ3RoLFxuXHRcdFx0ICAgIHVwZGF0ZSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdXBkYXRlc0xlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHVwZGF0ZSA9IHVwZGF0ZXNbaV07XG5cblx0XHRcdFx0Ly8gSWYgdGhlIHByb3BlcnR5IGlzIG5ldywgYWRkIGl0IHRvIHRoZSB4U3RvcmVcblx0XHRcdFx0aWYgKCFtZS5oYXNPd25Qcm9wZXJ0eSh1cGRhdGUucHJvcCkpIGFkZFByb3BlcnR5KHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUpO1xuXG5cdFx0XHRcdG1lLmVtaXQoJ2NoYW5nZTonICsgdXBkYXRlLnByb3AsIHVwZGF0ZS52YWx1ZSwgdXBkYXRlLnByZXZpb3VzVmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRtZS5lbWl0KCdjaGFuZ2UnLCB1cGRhdGVzKTtcblx0XHR9KTtcblx0fSxcblxuXHRnZXRTdGF0ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG5cdFx0Ly8gQ2xvbmUgdGhlIHN0b3JlIHByb3BlcnRpZXNcblx0XHRyZXR1cm4geFV0aWxzLl9leHRlbmQoe30sIHRoaXMpO1xuXHR9LFxuXG5cdHdhaXRGb3I6IGZ1bmN0aW9uIHdhaXRGb3IoaWRzKSB7XG5cdFx0Ly8gVGhlIHhEaXNwYXRjaGVyIGFkZHMgaXRzZWxmIGFzIGEgcHJvcGVydHlcblx0XHQvLyB3aGVuIHRoZSB4U3RvcmUgaXMgcmVnaXN0ZXJlZFxuXHRcdHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLndhaXRGb3IoaWRzKTtcblx0fVxufSk7XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gWFN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFhFbWl0dGVyID0gZnVuY3Rpb24gWEVtaXR0ZXIoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2V2ZW50cycsIHtcblx0XHR2YWx1ZToge31cblx0fSk7XG5cblx0aWYgKHR5cGVvZiB0aGlzLmluaXRpYWxpemUgPT0gJ2Z1bmN0aW9uJykgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBUaGUgcHJvdG90eXBlIG1ldGhvZHMgYXJlIHN0b3JlZCBpbiBhIGRpZmZlcmVudCBvYmplY3Rcbi8vIGFuZCBhcHBsaWVkIGFzIG5vbiBlbnVtZXJhYmxlIHByb3BlcnRpZXMgbGF0ZXJcbnZhciBlbWl0dGVyUHJvdG90eXBlID0ge1xuXHRvbjogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBsaXN0ZW5lciwgb25jZSkge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblxuXHRcdGxpc3RlbmVycy5wdXNoKHsgY2FsbGJhY2s6IGxpc3RlbmVyLCBvbmNlOiBvbmNlIH0pO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b25jZTogZnVuY3Rpb24gb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0dGhpcy5vbihldmVudE5hbWUsIGxpc3RlbmVyLCB0cnVlKTtcblx0fSxcblxuXHRvZmY6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XG5cdFx0aWYgKHR5cGVvZiBldmVudE5hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGxpc3RlbmVyID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnNbaV0uY2FsbGJhY2sgPT09IGxpc3RlbmVyKSBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lKSB7XG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG5cdFx0ICAgIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdLFxuXHRcdCAgICBvbmNlTGlzdGVuZXJzID0gW10sXG5cdFx0ICAgIGksXG5cdFx0ICAgIGxpc3RlbmVyO1xuXG5cdFx0Ly8gQ2FsbCBsaXN0ZW5lcnNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyLmNhbGxiYWNrKSBsaXN0ZW5lci5jYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm90IGEgY2FsbGJhY2ssIHJlbW92ZSFcblx0XHRcdFx0bGlzdGVuZXIub25jZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsaXN0ZW5lci5vbmNlKSBvbmNlTGlzdGVuZXJzLnB1c2goaSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVycyBtYXJrZWQgYXMgb25jZVxuXHRcdGZvciAoaSA9IG9uY2VMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2Uob25jZUxpc3RlbmVyc1tpXSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cbi8vIEV2ZW50RW1pdHRlciBtZXRob2RzXG54VXRpbHMuX2V4dGVuZChlbWl0dGVyUHJvdG90eXBlLCB7XG5cdGFkZExpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9uLFxuXHRyZW1vdmVMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdHJlbW92ZUFsbExpc3RlbmVyczogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdGVtaXQ6IGVtaXR0ZXJQcm90b3R5cGUudHJpZ2dlclxufSk7XG5cbi8vIE1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlIHNvLCB3aGVuIHRoZSBzdG9yZXMgYXJlXG4vLyBleHRlbmRlZCB3aXRoIHRoZSBlbWl0dGVyLCB0aGV5IGNhbiBiZSBpdGVyYXRlZCBhc1xuLy8gaGFzaG1hcHNcblhFbWl0dGVyLnByb3RvdHlwZSA9IHt9O1xuZm9yICh2YXIgbWV0aG9kIGluIGVtaXR0ZXJQcm90b3R5cGUpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kLCB7XG5cdFx0dmFsdWU6IGVtaXR0ZXJQcm90b3R5cGVbbWV0aG9kXVxuXHR9KTtcbn1cblxuLy8gRXh0ZW5kIG1ldGhvZCBmb3IgJ2luaGVyaXRhbmNlJywgbm9kIHRvIGJhY2tib25lLmpzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIsICdfZXh0ZW5kJywge1xuXHR2YWx1ZTogZnVuY3Rpb24gdmFsdWUocHJvdG9Qcm9wcykge1xuXHRcdHZhciBwYXJlbnQgPSB0aGlzLFxuXHRcdCAgICBjaGlsZDtcblxuXHRcdGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuaGFzT3duUHJvcGVydHkoY29uc3RydWN0b3IpKSB7XG5cdFx0XHRjaGlsZCA9IHByb3RvUHJvcHMuY29uc3RydWN0b3I7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkID0gZnVuY3Rpb24gY2hpbGQoKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0eFV0aWxzLl9leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cblx0XHR2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24gU3Vycm9nYXRlKCkge1xuXHRcdFx0Ly8gQWdhaW4gdGhlIGNvbnN0cnVjdG9yIGlzIGFsc28gZGVmaW5lZCBhcyBub3QgZW51bWVyYWJsZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicsIHtcblx0XHRcdFx0dmFsdWU6IGNoaWxkXG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXHRcdGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuXHRcdC8vIEFsbCB0aGUgZXh0ZW5kaW5nIG1ldGhvZHMgbmVlZCB0byBiZSBhbHNvXG5cdFx0Ly8gbm9uIGVudW1lcmFibGUgcHJvcGVydGllc1xuXHRcdGlmIChwcm90b1Byb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHByb3RvUHJvcHMpIHtcblx0XHRcdFx0aWYgKHAgIT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZC5wcm90b3R5cGUsIHAsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm90b1Byb3BzW3BdXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRW1pdHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveEVtaXR0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG52YXIgeFV0aWxzID0ge1xuXHQvLyBPYmplY3QgZXh0ZW5kLCBOb2QgdG8gdW5kZXJzY29yZS5qc1xuXHRfZXh0ZW5kOiBmdW5jdGlvbiBfZXh0ZW5kKG9iaikge1xuXHRcdHZhciBzb3VyY2UsIHByb3A7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0c291cmNlID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0Zm9yIChwcm9wIGluIHNvdXJjZSkge1xuXHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSB4VXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBidXR0b25TdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9tb2RhbHBhZ2Utc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzMz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzM19fX19LZXkgaW4gX19fX0NsYXNzMyl7aWYoX19fX0NsYXNzMy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3MzX19fX0tleSkpe01vZGFsUGFnZVtfX19fQ2xhc3MzX19fX0tleV09X19fX0NsYXNzM1tfX19fQ2xhc3MzX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczM9X19fX0NsYXNzMz09PW51bGw/bnVsbDpfX19fQ2xhc3MzLnByb3RvdHlwZTtNb2RhbFBhZ2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczMpO01vZGFsUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3I9TW9kYWxQYWdlO01vZGFsUGFnZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3MzO1xyXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzMy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxQYWdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2UucHJvdG90eXBlLFwiY2xvc2VNb2RhbFBhZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OmZhbHNlfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZS5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvdzogbmV4dFByb3BzLnNob3d9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcImhhbmRsZUJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrKGJ0bkV2ZW50KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC10YHQu9C4INC/0LXRgNC10LTQsNC9INCw0YLRgNC40LHRgyBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywnYnRuQ2FuY2VsJ11cclxuICAgICAgICBsZXQgaGlkZUJ0bk9rID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuT2snKSA9PSAtMSA/IGZhbHNlIDogdHJ1ZSwgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0Lkg0J7QulxyXG4gICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuQ2FuY2VsJykgPT0gLTEgPyBmYWxzZSA6IHRydWUsIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQvtC5IENhbmNlbFxyXG4gICAgICAgICAgICBkaXNwbGF5TW9kYWwgPSB0aGlzLnN0YXRlLnNob3cgPyAnZmxleCc6ICdub25lJyAsXHJcbiAgICAgICAgICAgIHBhZ2VQb3NpdGlvbiA9ICB0aGlzLnByb3BzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICBjb250YWluZXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5jb250YWluZXIsIHtkaXNwbGF5OiBkaXNwbGF5TW9kYWx9LCB7anVzdGlmeUNvbnRlbnQ6cGFnZVBvc2l0aW9ufSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJjb250YWluZXJcIiwgc3R5bGU6IGNvbnRhaW5lclN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLm1vZGFsUGFnZSwgcmVmOiBcIm1vZGFsUGFnZUNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5oZWFkZXIsIHJlZjogXCJtb2RhbFBhZ2VIZWFkZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7cmVmOiBcImhlYWRlck5hbWVcIiwgc3R5bGU6IHN0eWxlcy5oZWFkZXJOYW1lfSwgXCIgXCIsIHRoaXMucHJvcHMubW9kYWxQYWdlTmFtZSwgXCIgXCIpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtzdHlsZTogc3R5bGVzLmJ1dHRvbkNsb3NlLCByZWY6IFwiYnRuQ2xvc2VcIiwgb25DbGljazogdGhpcy5jbG9zZU1vZGFsUGFnZS5iaW5kKHRoaXMpLCB2YWx1ZTogXCJ4XCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMubW9kYWxQYWdlQ29udGVudCwgcmVmOiBcIm1vZGFsUGFnZUNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMubW9kYWxGb290ZXIsIHJlZjogXCJtb2RhbFBhZ2VCdXR0b25zXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJ0bk9rID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImJ0bk9rXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9rXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICgnd2lkdGgnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMud2lkdGg6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogKCdoZWlnaHQnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMuaGVpZ2h0OiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcywgJ09rJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImJ0bk9rXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IGJ1dHRvblN0eWxlcy5pY29uc1snb2snXX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmJ1dHRvbnNTZXBhcmF0b3J9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5DYW5jZWwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYnRuQ2FuY2VsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkNhbmNlbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogKCd3aWR0aCcgaW4gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMpPyBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucy53aWR0aDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAoJ2hlaWdodCcgaW4gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMpPyBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucy5oZWlnaHQ6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzLCAnQ2FuY2VsJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtb2RhbFBhZ2VCdXR0b25zXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImJ0bkNhbmNlbFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBidXR0b25TdHlsZXMuaWNvbnNbJ2NhbmNlbCddfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcblxyXG5Nb2RhbFBhZ2UucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAnZmxleC1zdGFydCcsICdmbGV4LWVuZCddKSxcclxufVxyXG5cclxuXHJcbk1vZGFsUGFnZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBtb2RhbFBhZ2VOYW1lOiAnZGVmYXVsTmFtZScsXHJcbiAgICBtb2RhbE9iamVjdHM6IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ10sXHJcbiAgICBwb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICBzaG93OiBmYWxzZVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NuPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NuX19fX0tleSBpbiBfX19fQ2xhc3NuKXtpZihfX19fQ2xhc3NuLmhhc093blByb3BlcnR5KF9fX19DbGFzc25fX19fS2V5KSl7QnV0dG9uW19fX19DbGFzc25fX19fS2V5XT1fX19fQ2xhc3NuW19fX19DbGFzc25fX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbj1fX19fQ2xhc3NuPT09bnVsbD9udWxsOl9fX19DbGFzc24ucHJvdG90eXBlO0J1dHRvbi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbik7QnV0dG9uLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b247QnV0dG9uLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc247XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvbihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc24uY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHZpc2liaWxpdHlcclxuICAgICAgICBsZXQgcHJvcFN0eWxlICA9ICgnc3R5bGUnIGluIHRoaXMucHJvcHMpPyB0aGlzLnByb3BzLnN0eWxlOiB7fSxcclxuICAgICAgICAgICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuYnV0dG9uLCB7ZGlzcGxheTogdGhpcy5wcm9wcy5zaG93ID8gJ2lubGluZScgOiAnbm9uZSd9LCBwcm9wU3R5bGUpXHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICByZWY6IFwiYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICBzdHlsZTogc3R5bGUsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrfSwgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sIFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuO1xyXG5cclxuQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYnV0dG9uOiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgIG1hcmdpbjogJzJweCdcbiAgICB9LFxuICAgIGljb25zOiB7XG4gICAgICAgIGFkZDogJy9pbWFnZXMvaWNvbnMvYWRkLnBuZycsXG4gICAgICAgIGVkaXQ6ICcvaW1hZ2VzL2ljb25zL2VkaXQucG5nJyxcbiAgICAgICAgZGVsZXRlOiAnL2ltYWdlcy9pY29ucy9kZWxldGUucG5nJyxcbiAgICAgICAgZmlsdGVyOiAnL2ltYWdlcy9pY29ucy9maWx0ZXIucG5nJyxcbiAgICAgICAgcHJpbnQ6ICcvaW1hZ2VzL2ljb25zL3ByaW50LnBuZycsXG4gICAgICAgIG9rOiAnL2ltYWdlcy9pY29ucy9vay5wbmcnLFxuICAgICAgICBjYW5jZWw6ICcvaW1hZ2VzL2ljb25zL2NhbmNlbC5wbmcnLFxuICAgICAgICBzYXZlOiAnL2ltYWdlcy9pY29ucy9zYXZlLnBuZycsXG4gICAgICAgIGV4ZWN1dGU6ICcvaW1hZ2VzL2ljb25zL2V4ZWN1dGUucG5nJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgIH0sXG4gICAgbW9kYWxQYWdlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICc4cHgnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGFsaWduU2VsZjogJ2NlbnRlcidcbiAgICB9LFxuICAgIG1vZGFsUGFnZUNvbnRlbnQ6IHtcbiAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICBtYXJnaW46ICcxMHB4J1xuICAgIH0sXG4gICAgaGVhZGVyOiB7XG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgZGFya2dyYXknLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnbGlnaHRncmF5JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nXG4gICAgfSxcblxuICAgIGhlYWRlck5hbWU6IHtcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICcxMHB4J1xuICAgIH0sXG5cbiAgICBtb2RhbEZvb3Rlcjoge1xuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIG1hcmdpbkJvdHRvbjogJzEwcHgnXG4gICAgfSxcblxuICAgIG1vZGFsUGFnZUJ1dHRvbnM6IHtcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgICBtYXJnaW5Cb3R0b206ICcxMHB4J1xuICAgIH0sXG5cbiAgICBidXR0b25zU2VwYXJhdG9yOiB7XG4gICAgICAgIHdpZHRoOiAnMTBweCdcbiAgICB9LFxuXG4gICAgYnV0dG9uQ2xvc2U6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmF5JyxcbiAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICc5MDAnXG5cbiAgICB9LFxuXG4gICAgbGVmdDoge1xuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMCdcbiAgICB9LFxuXG4gICAgcmlnaHQ6IHtcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzAnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi90b29sYmFyLWNvbnRhaW5lci1zdHlsZXMnKSxcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBfX19fQ2xhc3M4PVJlYWN0LkNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczhfX19fS2V5IGluIF9fX19DbGFzczgpe2lmKF9fX19DbGFzczguaGFzT3duUHJvcGVydHkoX19fX0NsYXNzOF9fX19LZXkpKXtUb29sQmFyQ29udGFpbmVyW19fX19DbGFzczhfX19fS2V5XT1fX19fQ2xhc3M4W19fX19DbGFzczhfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOD1fX19fQ2xhc3M4PT09bnVsbD9udWxsOl9fX19DbGFzczgucHJvdG90eXBlO1Rvb2xCYXJDb250YWluZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczgpO1Rvb2xCYXJDb250YWluZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPVRvb2xCYXJDb250YWluZXI7VG9vbEJhckNvbnRhaW5lci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3M4O1xyXG4gICAgZnVuY3Rpb24gVG9vbEJhckNvbnRhaW5lcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczguY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVG9vbEJhckNvbnRhaW5lci5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJ0b29sQmFyQ29udGFpbmVyXCIsIHN0eWxlOiBzdHlsZXMudG9vbEJhckNvbnRhaW5lclN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xCYXJDb250YWluZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0b29sQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdhZGQnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3M5PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M5X19fX0tleSBpbiBfX19fQ2xhc3M5KXtpZihfX19fQ2xhc3M5Lmhhc093blByb3BlcnR5KF9fX19DbGFzczlfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJBZGRbX19fX0NsYXNzOV9fX19LZXldPV9fX19DbGFzczlbX19fX0NsYXNzOV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M5PV9fX19DbGFzczk9PT1udWxsP251bGw6X19fX0NsYXNzOS5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczkpO0J1dHRvblJlZ2lzdGVyQWRkLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlckFkZDtCdXR0b25SZWdpc3RlckFkZC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3M5O1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckFkZChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczkuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiQWRkXCIsIFxyXG4gICAgICAgICAgICByZWY6IFwiYnRuQWRkXCIsIFxyXG4gICAgICAgICAgICBzdHlsZTogc3R5bGVzLmJ1dHRvbiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJBZGQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJBZGQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckFkZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3hcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZWRpdCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2M9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2NfX19fS2V5IGluIF9fX19DbGFzc2Mpe2lmKF9fX19DbGFzc2MuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzY19fX19LZXkpKXtCdXR0b25SZWdpc3RlckVkaXRbX19fX0NsYXNzY19fX19LZXldPV9fX19DbGFzc2NbX19fX0NsYXNzY19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NjPV9fX19DbGFzc2M9PT1udWxsP251bGw6X19fX0NsYXNzYy5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NjKTtCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRWRpdDtCdXR0b25SZWdpc3RlckVkaXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzYztcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJFZGl0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzYy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZWQ6IG5leHRQcm9wcy5kaXNhYmxlZH0pXHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkVkaXRcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5FZGl0XCIsIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyRWRpdC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sXHJcbn1cclxuXHJcblxyXG5CdXR0b25SZWdpc3RlckVkaXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckVkaXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAncHJpbnQnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NlPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NlX19fX0tleSBpbiBfX19fQ2xhc3NlKXtpZihfX19fQ2xhc3NlLmhhc093blByb3BlcnR5KF9fX19DbGFzc2VfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJQcmludFtfX19fQ2xhc3NlX19fX0tleV09X19fX0NsYXNzZVtfX19fQ2xhc3NlX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2U9X19fX0NsYXNzZT09PW51bGw/bnVsbDpfX19fQ2xhc3NlLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NlKTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlclByaW50O0J1dHRvblJlZ2lzdGVyUHJpbnQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzZTtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJQcmludChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2UuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5QcmludFwiLCBcclxuICAgICAgICAgICAgdmFsdWU6IFwiUHJpbnRcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlclByaW50LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlclByaW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3hcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9
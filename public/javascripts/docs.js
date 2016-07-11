var docs =
webpackJsonp_name_([1,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// нрузим компоненты

	//var ReactDOM = require('react-dom');
	// создаем окласс - держатель состояний

	const Parent = __webpack_require__(37);

	// данные для хранилища
	localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);
	//console.log('storeData from docs', storeData);
	ReactDOM.render(React.createElement(Parent, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },
/* 1 */,
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
	var Fluxify = function () {
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
		createStore: function (options) {
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
		doAction: function () {
			return this.dispatcher.dispatch.apply(this.dispatcher, arguments);
		},

		/**
	  * If ES6 Promise object is not defined globally or polyfilled, a Promise object
	  * can be given to fluxify in order to make it work, using this method.
	  *
	  * @param  { Promise } Promise ES6 Promise compatible object
	  * @return { undefined }
	  */
		promisify: function (Promise) {
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

	var XDispatcher = function () {
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
		register: function (id, callback) {
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
		registerStore: function (id, xStore) {

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
		unregister: function (id) {
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
		waitFor: function (ids) {
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
		dispatch: function () {
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
		_dispatch: function () {
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
			var dequeue = function () {
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
		isDispatching: function () {
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
		initialize: function (props) {
			if (!props) return this.props = {};

			this.props = {};
			for (var p in props) this.props[p] = props[p];
		},

		get: function (prop) {
			return this.props[prop];
		},

		set: function (prop, value) {
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
		initialize: function (options) {
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
					value: function (clbks) {
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
			var addProperty = function (propName, value) {
				Object.defineProperty(me, propName, {
					enumerable: true,
					configurable: false,
					get: function () {
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

		getState: function () {
			// Clone the store properties
			return xUtils._extend({}, this);
		},

		waitFor: function (ids) {
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

	var XEmitter = function () {
		Object.defineProperty(this, '_events', {
			value: {}
		});

		if (typeof this.initialize == 'function') this.initialize.apply(this, arguments);
	};

	// The prototype methods are stored in a different object
	// and applied as non enumerable properties later
	var emitterPrototype = {
		on: function (eventName, listener, once) {
			var listeners = this._events[eventName] || [];

			listeners.push({ callback: listener, once: once });
			this._events[eventName] = listeners;

			return this;
		},

		once: function (eventName, listener) {
			this.on(eventName, listener, true);
		},

		off: function (eventName, listener) {
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

		trigger: function (eventName) {
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
		value: function (protoProps) {
			var parent = this,
			    child;

			if (protoProps && protoProps.hasOwnProperty(constructor)) {
				child = protoProps.constructor;
			} else {
				child = function () {
					return parent.apply(this, arguments);
				};
			}

			xUtils._extend(child, parent);

			var Surrogate = function () {
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
		_extend: function (obj) {
			var source, prop;

			for (var i = 0; i < arguments.length; i++) {
				source = arguments[i];
				for (prop in source) obj[prop] = source[prop];
			}

			return obj;
		}
	};

	//#build

	module.exports = xUtils;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function() {
	        return {value: this.props.value,
	            readOnly: this.props.readOnly || false,
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },
	    getDefaultProps: function() {
	        return {
	            name: 'defaulName',
	            className: 'doc-input',
	            placeholder: 'defaulName',
	            title: '',
	            width: 'auto',
	            pattern: ''
	        }
	    },
	    componentDidMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

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

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	 //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue ) {
	                    self.setState({readOnly: !newValue});
	            }
	        });

	       flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	            // слушуем изменения данных;
	//          console.log('input-text on change data:', newValue, previousValue);
	            if (newValue !== previousValue) {
	                var data = newValue,
	                    fieldValue = data[self.props.name];
	                if (data[self.props.name]) {
	                    self.setState({value: fieldValue});
	                }
	            }
	        });

	    },

	    componentWillReceiveProps: function(nextProps) {
	        this.setState({value:nextProps.value })
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть

	        var returnValue = true;
	        if (this.state) {
	            returnValue = (nextState.value !== this.state.value ||
	            nextState.readOnly !== this.state.readOnly ||
	            nextState.disabled !== this.state.disabled);
	        }
	        return returnValue;
	    },

	    onChange: function(e) {
	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data,
	            isPatterValid = true;

	  //      console.log('onChange fieldValue', this.props.name, fieldValue);

	        if (this.props.pattern && fieldValue.charAt ( fieldValue.length - 1) !== '.') {

	            // проводим проверку на соответствие шаблону
	            var result = fieldValue.match(this.props.pattern,'');

	            if (!result)  {
	  //              console.log('Pattern vale:' + fieldValue);
	                fieldValue = data[this.props.name];
	            }
	        }
	            // только если соответствует паттерну
	            this.setState({value: fieldValue});
	 //       console.log('onChange fieldValue finish', this.props.name, this.state.value);

	            data[this.props.name] = fieldValue;
	            // задать новое значение поля
	            flux.doAction('dataChange', data);

	/*
	        // отдадим обработчику, если задан
	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }
	*/


	    },

	    render: function() {
	        var inputClassName = this.props.className || '' + 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            myStyle = {width:'auto'};

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }
	        if (this.props.width) {
	            myStyle.width = this.props.width
	        }

	        if (inputDisabled == 'true') {
	            return (
	            React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label" + inputClassName}, React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "text", 
	                           style: myStyle, 
	                          className: inputClassName, 
	                          name: this.props.name, 
	                           id: this.props.name, 
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
	                    React.createElement("label", null, this.props.title, 
	                        React.createElement("input", {type: "text", 
	                               className: inputClassName, 
	                               name: this.props.name, 
	                               value: this.state.value, 
	                               readOnly: inputReadOnly, 
	                               title: this.props.title, 
	                               pattern: this.props.pattern, 
	                               placeholder: inputPlaceHolder, 
	                               onChange: this.onChange}
	                        )
	                    )
	                ))
	        }
	    }
	});

	module.exports = Input;

/***/ },
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	var React = __webpack_require__(4);

	var MyButton = React.createClass({
	    displayName: 'MyButton',

	    render: function render() {
	        return React.createElement('input', {
	            className: this.props.className,
	            type: 'button',
	            value: this.props.buttonValue,
	            disabled: this.props.disabled,
	            onClick: this.handleButtonClick });
	    },

	    handleButtonClick: function handleButtonClick() {
	        // вернем в обработчик состояний событие клик
	        this.props.onClick();
	    }
	});

	module.exports = MyButton;

/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4);
	const InputText = __webpack_require__(12);


	var modalPage = React.createClass({displayName: "modalPage",
	    handleBtnClick: function(btnEvent) {
	        this.props.modalPageBtnClick(btnEvent);
	    },
	    getDefaultProps: function() {
	        return {
	            modalPageName: 'defaulName'
	        }
	    },
	    render: function() {
	        console.log('modalPage this.props', this.props);
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
	                        React.createElement("button", {
	                            onClick: this.handleBtnClick.bind(this,'Ok'), 
	                            className: "modalPageButtons", 
	                            id: "btnOk"}, " Ok"
	                        ), 
	                        React.createElement("button", {
	                            onClick: this.handleBtnClick.bind(this,'Cancel'), 
	                            className: "modalPageButtons", 
	                            id: "btnCancel"}, " Cancel"
	                        )
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = modalPage;

/***/ },
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// нрузим компоненты

	var React = __webpack_require__(4);

	const MyTree = __webpack_require__(38),
	    DataGrid = __webpack_require__(40),
	    ButtonAdd = __webpack_require__(41),
	    ButtonEdit = __webpack_require__(42),
	    ButtonDelete = __webpack_require__(43),
	    ButtonPrint = __webpack_require__(44),
	    InputText = __webpack_require__(12),
	    ModalPage = __webpack_require__(27);

	var flux = __webpack_require__(5),
	    myComponents = [];

	if (!typeof window === 'undefined') {
	    // берем данные с локального хранилища
	    myComponents = JSON.parse(localStorage['docsStore']);
	}

	// Create a store
	var docsStore = __webpack_require__(45);

	// создаем окласс - держатель состояний
	var Parent = React.createClass({
	    displayName: 'Parent',

	    filterData:[], // массив объектов, куда запишем параметры для фильтрации

	    getInitialState: function getInitialState() {
	        return {
	            // у каждого компонента свой объект
	            components: this.props.components,
	            gridLeft: '13%',
	            gridWidth: '90%',
	            getFilter: false
	        };
	    },

	    componentWillMount: function() {
	        var self = this;

	        // создаем обработчик события на изменение даннх
	        docsStore.on('change:data', function(newValue, previousValue) {
	            // данные изменились, меняем состояние
	            self.setState({components:docsStore.data})
	        })

	        // создаем обработчик события на сворачивание панелей
	        docsStore.on('change:tooglePanel', function(newValue, previousValue) {
	            var toogleData = flux.stores.docsStore.tooglePanelData;
	            // данные изменились, меняем состояние
	            self.setState({gridLeft:toogleData.left,gridWidth:toogleData.width })
	        })

	    },

	    componentDidMount: function() {
	        // покажем данные
	//        console.log('parent componentDidMount state components',this.state.components);

	        var lastComponent = localStorage['docsList'];
	        flux.doAction( 'dataChange', this.props.components );
	        if (lastComponent) {
	            flux.doAction('docsListChange',lastComponent);
	        }
	    },
	    /*
	     shouldComponentUpdate: function(nextProps, nextState) {
	     // изменения будут отражаться только в случае если такие есть
	     console.log(JSON.stringify(nextState) + ' VS ' + JSON.stringify(this.state));
	     var returnValue = (JSON.stringify(nextState) !== JSON.stringify(this.state) );
	     return returnValue;
	     },

	     */
	    findComponent: function(componentName) {
	        // вернет данные компонента по его названию
	        var components = this.state.components,
	            componentData = [];

	        if (components.length > 0 ) {
	            componentData = components.filter(function(item) {
	                if (item.name == componentName) {
	                    return item;
	                }
	            });
	        }
	        return componentData;

	    },

	    btnFilterClick: function() {
	        // откроет модальное окно с полями для фильтрации
	        this.setState({getFilter: true})
	    },
	    render: function render() {
	        var  myListValue = '',
	            myListData = this.findComponent('docsList') || [],
	            myGrid = this.findComponent('docsGrid') || [],
	            myGridColums = [],
	            myGridData = [],
	            tooglePaneelData = flux.stores.docsStore.tooglePanelData,
	            gridLeft = '13%';

	        if (myListData.length > 0 ) {
	            myListValue = myListData[0].value;
	        }
	        
	        // проверим наличие данных, если есть пропихнем компонентам
	        if (myGrid.length > 0 && myGrid[0].data.length > 0) {
	            myGridColums = myGrid[0].data[0].columns;
	            myGridData = myGrid[0].data[0].data;
	        }

	        var filterComponent;
	         if (this.state.getFilter)  {
	             filterComponent =  this.getFilterFields();
	         }

	        if (myListData.length > 0 &&  myListData[0].data.length > 0) {
	            myListData =  myListData[0].data;
	        }

	        return (React.createElement("div", {id: "parentDiv"}, 
	                React.createElement(MyTree, {
	                    componentName: "docsList", 
	                    data: myListData, 
	                    value: myListValue, 
	                    onChangeAction: "docsListChange"}), 
	                React.createElement("div", {id: "gridToolBar"}, "Toolbar", 
	                    React.createElement(ButtonAdd, {className: "gridToolbar"}), 
	                    React.createElement(ButtonEdit, {className: "gridToolbar"}), 
	                    React.createElement(ButtonDelete, {className: "gridToolbar"}), 
	                    React.createElement(ButtonPrint, {className: "gridToolbar"}), 
	                    React.createElement("button", {
	                        className: "gridToolbar", 
	                        onClick: this.btnFilterClick
	                    }, " Filter ")
	                ), 
	                React.createElement("div", {id: "gridTable", 
	                     style: {width:tooglePaneelData.grid, left: tooglePaneelData.left}
	                }, 
	                    React.createElement(DataGrid, {
	                        gridData: myGridData, 
	                        gridColumns: myGridColums, 
	                        onChangeAction: "docsGridChange", 
	                        url: "api"}
	                    )
	                ), 
	                this.state.getFilter ?
	                    (React.createElement(ModalPage, {
	                        modalPageBtnClick: this.modalPageBtnClick, 
	                        modalPageName: "Filter", 
	                        modalObjects: this.filterData
	                    }, " ", filterComponent, " "))
	                    : null

	            )
	            
	        )
	    },

	    modalPageBtnClick: function(btnEvent) {
	        var filterString = '';
	        if (btnEvent = 'Ok') {
	                // собирем данные в объект и вернем на форму
	            this.filterData = this.filterData.map(function(row)  {
	                    row.value = this.refs[row.refs].value;

	                    if (row.value) {
	                        filterString = filterString + (filterString.length > 0 ? " and ": " where ");
	                        switch (row.type) {

	                            case 'text':
	                                filterString = filterString + row.refs + " ilike '%" + row.value + "%'";
	                                break;
	                            case 'string':
	                                filterString = filterString + row.refs + " ilike '" + row.value + "%'";
	                                break;
	                            case 'date':
	                                filterString = filterString + row.refs + " = '" + row.value + "'" ;
	                                break;
	                            case 'number':
	                                filterString = filterString + row.refs + " = " + row.value ;
	                                break;
	                            case 'integer':
	                                filterString = filterString + row.refs + " = " + row.value ;
	                                break;
	                        }
	//                        console.log('modalPageBtnClick, filterString ', filterString);

	                    }
	                return row;
	                }.bind(this), this);
	            flux.doAction( 'sqlWhereChange', filterString );
	        }
	        this.setState({getFilter: false})
	    },

	    getFilterFields: function() {
	        // создаст из полкй грида компоненты для формирования условий фильтрации
	        var gridComponents =  docsStore.data,
	            gridData = [],
	            previosFilter = this.filterData,
	            filterFields;

	        for (let i = 0; i < gridComponents.length; i++) {
	            if (gridComponents[i]['name'] == 'docsGrid') {
	                // ищем поле columns
	                for (let field in gridComponents[i].data[0]) {
	                    if (field == 'columns') {
	                        gridData = gridComponents[i].data[0].columns;
	                        break;
	                    }
	                }
	                break;
	            }
	        }


	        if (gridData) {
	            this.filterData = []; // обнулим массив
	            filterFields =
	                gridData.map(function(row, index)  {
	                    var componentType = 'text',
	                        componentObjektValue;

	                    for (let i = 0; i < previosFilter.length; i++ ) {
	                        // ищем "старое" значение фильтра и если есть, то отдаем его value
	                        if (previosFilter[i].refs == row.id) {
	                            componentObjektValue = previosFilter[i].value;
	                            break;
	                        }
	                    }

	                    console.log('componentObjekt:', componentObjektValue);
	                    if (row.type) {
	                        componentType = row.type;
	                    }

	                    // соберем массив объектов
	                    this.filterData.push({name:row.name, value: componentObjektValue || null, type:componentType, refs: row.id});

	                    return React.createElement("li", {key: index}, 
	                        React.createElement("div", {className: "form-widget"}, 
	                            React.createElement("label", {className: "form-widget-label"}, React.createElement("span", null, row.name), 
	                            React.createElement("input", {
	                                type: componentType, 
	                                className: "ui-c2", 
	                                title: row.name, 
	                                name: row.name, 
	                                placeholder: row.name, 
	                                ref: row.id, 
	                                defaultValue: componentObjektValue || null}
	                            )
	                            )
	                           )
	                        )
	            }.bind(this))
	            filterFields = React.createElement("div", {className: "fieldset"}, React.createElement("ul", null, filterFields))
	        }

	        return filterFields;
	    }
	});

	module.exports = Parent;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    MyList = __webpack_require__(39);

	var MyTree = React.createClass({
	    displayName: 'MyTree',

	    render: function render() {
	        console.log('my tree render');
	        return React.createElement('div', { id: 'tree' }, React.createElement(MyList, {
	            sourceArray: this.props.data,
	            value: this.props.value,
	            onChangeAction: this.props.onChangeAction }));
	    }
	});

	module.exports = MyTree;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const TOOGLEPANELOPENED = { tree: '10%', grid: '90%', left: '13%' },
	      TOOGLEPANELCLOSED = { tree: '1%', grid: '100%', left: '0' };

	var MyList = React.createClass({
	    displayName: 'MyList',

	    getInitialState: function getInitialState() {
	        return {
	            sourceArray: this.props.sourceArray,
	            isChecked: false,
	            clicked: 99999999,
	            //            clicked: this.getIndexByComponent(this.props.value),
	            choosenDocTypeId: this.props.value || ''
	        };
	    },

	    getDefaultProps: function () {
	        return {
	            clicked: 99999999,
	            choosenDocTypeId: ''
	        };
	    },

	    getIndexByComponent: function (component) {
	        // вернет индекс компонента по его коду   
	        var index = 0,
	            componentArray = this.props.sourceArray;

	        if (component) {
	            for (let i = 0; i < componentArray.length; i++) {
	                if (componentArray[i]['kood'] == component) {
	                    index = i;
	                    break;
	                }
	            }
	            componentArray.forEach(row => {
	                if (row.kood == 'component') {
	                    index = row.id;
	                    console.log('getIndexByComponent index', index);
	                }
	            });
	        }
	        return index;
	    },

	    componentWillMount: function () {
	        flux.stores.docsStore.on('change:docsList', function (newValue, previousValue) {
	            console.log(' flux.stores.docsStore.on(change:docsList)', newValue, previousValue, localStorage['docsGrid']);
	            if (newValue !== previousValue && previousValue !== '') {
	                // данные изменились, удаляем метку индекса строки грида
	                console.log('документ изменился');
	                localStorage['docsGrid'] = 0;
	            }
	        });
	    },
	    componentDidMount: function () {
	        if (this.state.clicked == 99999999) {
	            // не установлен ещеб отметим последнй выбор
	            var lastComponent = localStorage['docsList'],
	                index = this.getIndexByComponent(lastComponent);

	            this.handleLiClick(index);
	        }
	    },

	    handleLiClick: function handleLiClick(idx) {
	        var myArray = this.props.sourceArray,
	            choosenDocType = this.props.sourceArray[idx]["id"],
	            choosenCode = this.props.sourceArray[idx]["kood"];
	        //ставим метку
	        // сохраняем состояние

	        this.setState({
	            clicked: idx,
	            choosenDocTypeId: choosenDocType
	        });

	        // сохраним в хранилище
	        flux.doAction(this.props.onChangeAction, choosenCode);
	    },

	    handleButtonClick: function handleButtonClick() {
	        var gridToogleWidth = flux.stores.docsStore.tooglePanelData;
	        // при клике показываем или скрывает компонент
	        this.setState({
	            isChecked: !this.state.isChecked
	        });

	        gridToogleWidth = this.state.isChecked ? TOOGLEPANELOPENED : TOOGLEPANELCLOSED;
	        flux.doAction('tooglePanelChange', this.state.isChecked, gridToogleWidth);
	    },

	    render: function render() {
	        var myArray = this.props.sourceArray;
	        var myStyle = this.state.isChecked ? 'none' : 'block'; // прячет список
	        var myGridStyle = 'block';
	        var clickedItem = this.state.clicked;

	        //       console.log('myList render state', this.state, this.props);

	        if (myArray.length == 0) {
	            // добавим пустую строку
	            myArray.push({
	                id: 0,
	                name: '',
	                kood: ''
	            });
	        }

	        myArray = myArray.map(function (item, index) {
	            var myClass = 'liDocLibs';

	            var lib = item;

	            if (clickedItem == index) {
	                myClass = myClass + ' focused'; // подсветим выбранную строку
	            };

	            return React.createElement('li', {
	                key: 'lib-' + index,
	                className: myClass,
	                style: { display: myStyle },
	                onClick: this.handleLiClick.bind(this, index)
	            }, lib.name);
	        }, this);

	        var root = React.createElement('ul', { onEvent: this.onEvent }, myArray);
	        var docLibsDiv = React.createElement('div', { className: 'treeDocs', style: { display: myStyle }, id: 'treeDocs' }, root);
	        var buttonValue = this.state.isChecked ? '+' : '-';
	        return React.createElement('div', null, React.createElement('div', { id: 'treeToolBar' }, React.createElement('input', {
	            type: 'button',
	            value: buttonValue,
	            onClick: this.handleButtonClick
	        })), docLibsDiv);
	    }
	});

	module.exports = MyList;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var DataGrid = React.createClass({
	    displayName: 'DataGrid',
	    getInitialState: function getInitialState() {

	        return {
	            gridColumns: this.props.gridColumns,
	            gridData: this.props.gridData,
	            clicked: 0
	        };
	    },
	    componentWillReceiveProps: function (nextProps) {
	        /*
	         if (nextProps.gridData) {
	         var docId =  localStorage['docsGrid'],
	         index = this.getGridRowIndexById(docId);

	         console.log('componentWillReceiveProps', index, docId);
	         this.handleCellClick(index);
	         }
	         */
	    },

	    /*

	     shouldComponentUpdate: function(nextProps, nextState) {
	     // изменения будут отражаться только в случае если такие есть
	     var returnValue = (JSON.stringify(nextState) !== JSON.stringify(this.state) );
	     return returnValue;
	     },
	     */
	    componentDidMount: function () {

	/*
	         console.log('grid componentDidMount',localStorage['docsGrid'] );

	         // ищем последнюю строку
	         if (this.state.clicked == 0) {
	         // отметим последний отмеченный документ
	         var docId =  localStorage['docsGrid'],
	         index = this.getGridRowIndexById(docId);

	         console.log('grid componentDidMount',docId,index );

	         this.setState({clicked: index});
	         }
	*/

	    },

	    componentWillMount: function () {

	        var self = this;
	        // повесим обработчики


	        flux.stores.docsStore.on('change:data', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            // ищем последнюю строку
	            // отметим последний отмеченный документ

	 //           console.log('my grid on change list ', newValue, previousValue)

	            if (newValue !== []) {
	                var docId = localStorage['docsGrid'],
	                    index = self.getGridRowIndexById(docId);

	                self.setState({clicked: index});
	            }

	        })

	    },

	    getGridRowIndexById: function (docId) {
	        // ищем индех в массиве данных
	        var index = 0,
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
	    },

	    handleCellClick: function handleCellClick(idx) {
	        // отрабатывает событи клика по ячейке
	        this.setState({
	            clicked: idx
	        });

	        if (this.props.gridData.length > 0) {
	            var docId = this.props.gridData[idx].id;
	 //           console.log('myGrid handleCellClick:', idx, docId, this.props.gridData);
	            // сохраним в хранилище
	            flux.doAction(this.props.onChangeAction, docId);
	        }
	    },

	    handleCellDblClick: function () {
	        // вызовет метод редактирования
	        flux.doAction('Edit');
	    },

	    handleGridHeaderClick: function (name) {
	        var sortBy = [{column: name, direction: 'asc'}];
	        flux.doAction('sortByChange', sortBy);
	    },

	    handleKeyDown: function (e) {
	        // реакция на клавиатуру
	        console.log('handleKeyPress ', e);
	        /*
	         if (keyDirection == 'Down') {
	         this.setState({
	         clicked: (this.state.clicked + 1)
	         });
	         }
	         */

	    },
	    render: function render() {
	        console.log('grid render called');
	        var gridRows = this.props.gridData; // статичны и приходят только из верхнего компонента
	        var gridColumns = this.props.gridColumns;
	        var clickedItem = this.state.clicked;

	        var className = 'th',
	            self = this;
	        /*       onKeyDown: this.handleKeyPress('Down'),
	         onDoubleClick: this.handleCellDblClick(),
	         */
	        return (React.createElement("table", {ref: "myGridRef"}, 
	                    React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        
	                            gridColumns.map(function (column, index) {
	                                var gridStyle = {
	                                    width: column.width
	                                };
	                                className = 'th-' + column.id;
	                                return React.createElement("th", {
	                                            style: gridStyle, 
	                                            className: className, 
	                                            key: 'th-' + index, 
	                                            onClick: this.handleGridHeaderClick.bind(this, column.id)
	                                        }, 
	                                            column.name
	                                        )
	                            }, this)

	                    )
	                    ), 
	                    React.createElement("tbody", null, 
	                    
	                        gridRows.map(function (row, index) {
	                            var myClass = 'notFocused';
	                            if (clickedItem == index) {
	                                myClass = 'focused'; // подсветим выбранную строку
	                            }
	                            ;
	                            return (React.createElement("tr", {
	                                onClick: this.handleCellClick.bind(this, index), 
	                                className: myClass, 
	                                key: 'doc-' + index}, 
	                                
	                                    gridColumns.map(function (cell, index) {
	                                           return (React.createElement("td", {key: 'td' + index}, 
	                                                   row[cell.id]
	                                           ))
	                                        })
	                                

	                            ))
	                        }, this)
	                    
	                    )
	                )
	        );

	    }
	});

	module.exports = DataGrid;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var MyButton = __webpack_require__(25),
	    React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var ButtonAdd = React.createClass({
	    displayName: 'ButtonAdd',

	    onClick: function () {
	        // вызовем действия на флаксе
	        flux.doAction('Add');
	    },
	    render: function render() {
	        return React.createElement(MyButton, {
	            className: this.props.className,
	            buttonValue: 'Lisa (+)',
	            onClick: this.onClick });
	    }
	});

	module.exports = ButtonAdd;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var MyButton = __webpack_require__(25),
	    React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var ButtonEdit = React.createClass({
	    displayName: 'ButtonEdit',

	    onClick: function () {
	        // вызовем действия на флаксе
	        flux.doAction('Edit');
	    },

	    render: function render() {
	        return React.createElement(MyButton, {
	            className: this.props.className,
	            buttonValue: 'Muuda',
	            onClick: this.onClick
	        });
	    }
	});

	module.exports = ButtonEdit;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var MyButton = __webpack_require__(25),
	    React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var ButtonDelete = React.createClass({
	    displayName: 'ButtonDelete',

	    onClick: function () {
	        // вызовем действия на флаксе
	        flux.doAction('Delete');
	    },

	    render: function render() {
	        return React.createElement(MyButton, {
	            className: this.props.className,
	            buttonValue: 'Kustuta',
	            onClick: this.onClick
	        });
	    }
	});

	module.exports = ButtonDelete;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var MyButton = __webpack_require__(25),
	    React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var ButtonPrint = React.createClass({
	    displayName: 'ButtonDelete',

	    onClick: function () {
	        // вызовем действия на флаксе
	        flux.doAction('Print');
	    },

	    render: function render() {
	        return React.createElement(MyButton, {
	            className: this.props.className,
	            buttonValue: 'Trükk',
	            onClick: this.onClick
	        });
	    }
	});

	module.exports = ButtonPrint;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var flux = __webpack_require__(5);

	var docsStore = flux.createStore({
	    id: 'docsStore',
	    initialState: {
	        docsGrid: 0,
	        docsList: '',
	        name: 'vlad',
	        data: [],
	        sortBy: [{ column: 'id', direction: 'desc' }],
	        sqlWhere: '',
	        tooglePanel: true, // opened
	        tooglePanelData: { tree: '10%', grid: '90%', left: '13%' } },
	    // opened
	    actionCallbacks: {
	        sqlWhereChange: function (updater, value) {
	            console.log('sqlWhereChange called', value);
	            updater.set({ sqlWhere: value });
	            requery({ name: 'docsGrid', value: this.docsList });
	        },
	        sortByChange: function (updater, value) {
	            updater.set({ sortBy: value });
	            requery({ name: 'docsGrid', value: this.docsList, sortBy: value });
	        },
	        tooglePanelChange: function (updater, value, data) {
	            updater.set({ tooglePanel: value, tooglePanelData: data });
	        },
	        Add: function (updater) {
	            console.log('button Lisa cliked new! ' + this.docsGrid);
	            add(this.docsList);
	        },
	        Edit: function (updater) {
	            console.log('button Muuda cliked!');
	            if (this.docsList && this.docsGrid) {
	                edit(this.docsList, this.docsGrid);
	            } else {
	                console.log('Тип документа или документ не выбран');
	            }
	        },
	        Delete: function (updater) {
	            console.log('button Delete cliked!');
	        },
	        Print: function (updater) {
	            console.log('button Print cliked!');
	        },
	        changeName: function (updater, name) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ name: name });
	        },
	        docsGridChange: function (updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            console.log('store docsGridChange called', value);
	            updater.set({ docsGrid: value });
	            localStorage['docsGrid'] = value;
	        },
	        docsListChange: function (updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ docsList: value });
	            requery({ name: 'docsGrid', value: value });
	            localStorage['docsList'] = value;
	        },
	        dataChange: function (updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            //           console.log('dataChange:', value);
	            updater.set({ data: value });
	        }

	    }
	});

	var edit = function (docTypeId, docId) {
	    var url = "/document/" + docTypeId + docId;
	    document.location.href = url;
	};

	var add = function (docTypeId) {
	    console.log('Add');
	    var url = "/document/" + docTypeId + '0';
	    document.location.href = url;
	};

	var requery = function (component) {
	    // метод обеспечит получение данных от сервера
	    // component = this.state.components[name]
	    // если параметры не заданы, грузим все

	    //    console.log('requery:' + JSON.stringify(component) + 'docsStore.data:' + JSON.stringify(docsStore.data));

	    var components = docsStore.data;

	    // фильтруем список компонентов
	    var componentsForUpdate = components.filter(function (item) {
	        // ищем объект по наименованию. или вернем все если параметр не задан
	        //       console.log('component:' + JSON.stringify(component));
	        if (component.name == '' || item.name == component.name) {
	            return item.name;
	        }
	    });

	    // сортировка
	    var sqlSortBy = '',
	        sqlWhere = docsStore.sqlWhere || '';
	    var sortByArray = docsStore.sortBy,
	        arrType = typeof sortByArray;
	    if (docsStore.sortBy) {
	        for (var i = 0; i < sortByArray.length; i++) {
	            if (i > 0) {
	                sqlSortBy = sqlSortBy + ',';
	            }
	            sqlSortBy = sqlSortBy + sortByArray[i].column + ' ' + sortByArray[i].direction;
	        }
	    }

	    const URL = '/api/docs';
	    $.ajax({
	        url: URL,
	        type: "POST",
	        dataType: 'json',

	        data: {
	            dataType: 'component',
	            docTypeId: 1,
	            components: JSON.stringify(componentsForUpdate), // компоненты для обновления
	            parameter: component.value, // параметры
	            sortBy: sqlSortBy, // сортировка
	            sqlWhere: sqlWhere },
	        // динамический фильтр грида
	        cache: false,
	        success: function (data) {
	            // должны получить объект
	            //           console.log('parent arrived data:' + JSON.stringify(data) + 'тип:' + typeof data);

	            data.forEach(function (item) {
	                // find item
	                //console.log('parent Item:' + JSON.stringify(item) );
	                // обновим данные массива компонентов
	                components = components.map(function (component) {
	                    if (component.name == item.name) {
	                        // found
	                        component.data = item.data;
	                    }
	                    return component;
	                });
	            });
	            //            console.log('store data update:' + JSON.stringify(components));
	            flux.doAction('dataChange', components);
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	        }.bind(this)
	    });
	};

	module.exports = docsStore;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L2ZsdXhpZnkuanM/Y2RmMiIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzP2E5OGIiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanM/NzIwOCIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hFbWl0dGVyLmpzP2M3NzYiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94VXRpbHMuanM/ZDU1MSIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeD85ODNmIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbXlidXR0b24uanM/ZTRhOCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZS5qc3g/NTFhMCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teXRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uYWRkLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbmRlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbnByaW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vINC90YDRg9C30LjQvCDQutC+0LzQv9C+0L3QtdC90YLRi1xuXG4vL3ZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuLy8g0YHQvtC30LTQsNC10Lwg0L7QutC70LDRgdGBIC0g0LTQtdGA0LbQsNGC0LXQu9GMINGB0L7RgdGC0L7Rj9C90LjQuVxuXG5jb25zdCBQYXJlbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3gnKTtcblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG4vL2NvbnNvbGUubG9nKCdzdG9yZURhdGEgZnJvbSBkb2NzJywgc3RvcmVEYXRhKTtcblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFBhcmVudCwgeyBpZDogJ2dyaWQnLCBjb21wb25lbnRzOiBzdG9yZURhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWERpc3BhdGNoZXIgPSByZXF1aXJlKCcuL3NyYy94RGlzcGF0Y2hlcicpLFxuICAgIFhTdG9yZSA9IHJlcXVpcmUoJy4vc3JjL3hTdG9yZScpO1xuXG4vLyNidWlsZFxuXG4vKipcclxuICogRmx1eGlmeSBjbGFzcyB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHNpbmdsZXRvbi5cclxuICogSW5pdGlhbGl6ZXMgdGhlIGRpc3BhdGNoZXIgYW5kIHRoZSBzdG9yZS5cclxuICogQWxzbyBzZXQgdGhlIFByb21pc2Ugb2JqZWN0IGlmIGl0IGlzIGdsb2JhbGx5IGF2YWlsYWJsZS5cclxuICovXG52YXIgRmx1eGlmeSA9IGZ1bmN0aW9uICgpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkaXNwYXRjaGVyJywge1xuXHRcdHZhbHVlOiBuZXcgWERpc3BhdGNoZXIoKVxuXHR9KTtcblxuXHR0aGlzLnN0b3JlcyA9IHt9O1xuXG5cdGlmICh0eXBlb2YgUHJvbWlzZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdHRoaXMucHJvbWlzaWZ5KFByb21pc2UpO1xuXHR9XG59O1xuXG5GbHV4aWZ5LnByb3RvdHlwZSA9IHtcblx0LyoqXHJcbiAgKiBDcmVhdGUgYSBuZXcgc3RvcmUuIElmIGFuIGlkIGlzIHBhc3NlZCBpbiB0aGUgb3B0aW9ucyxcclxuICAqIHRoZSBzdG9yZSB3aWxsIGJlIHJlZ2lzdGVyZWQgaW4gdGhlIGRpc3BhdGNoZXIgYW5kIHNhdmVkXHJcbiAgKiBpbiBmbHV4aWZ5LnN0b3Jlc1tpZF0uXHJcbiAgKlxyXG4gICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHtpZCwgaW5pdGlhbFN0YXRlLCBhY3Rpb25DYWxsYmFja31cclxuICAqIEByZXR1cm4ge1hTdG9yZX1cclxuICAqL1xuXHRjcmVhdGVTdG9yZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHR2YXIgc3RvcmUgPSBuZXcgWFN0b3JlKG9wdGlvbnMpO1xuXG5cdFx0Ly8gSWYgdGhlIHN0b3JlIGhhcyBhbiBpZCwgcmVnaXN0ZXIgaXQgaW4gRmx1eGlmeSBhbmQgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRpZiAoc3RvcmUuX2lkKSB7XG5cdFx0XHR0aGlzLnN0b3Jlc1tzdG9yZS5faWRdID0gc3RvcmU7XG5cdFx0XHR0aGlzLmRpc3BhdGNoZXIucmVnaXN0ZXJTdG9yZShzdG9yZS5faWQsIHN0b3JlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBFeGVjdXRlcyBhbiBhY3Rpb24uIFRoZSBhcmd1bWVudHMgb2YgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGF2YWlsYWJsZVxyXG4gICogZm9yIHRoZSBhY3Rpb24gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgaW4gdGhlIGRpc3BhdGNoZXIuXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBhY3Rpb24gY2FsbGJhY2tzXHJcbiAgKiAgICAgICAgICAgICAgICAgICBoYXZlIGZpbmlzaGVkLlxyXG4gICovXG5cdGRvQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaC5hcHBseSh0aGlzLmRpc3BhdGNoZXIsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJZiBFUzYgUHJvbWlzZSBvYmplY3QgaXMgbm90IGRlZmluZWQgZ2xvYmFsbHkgb3IgcG9seWZpbGxlZCwgYSBQcm9taXNlIG9iamVjdFxyXG4gICogY2FuIGJlIGdpdmVuIHRvIGZsdXhpZnkgaW4gb3JkZXIgdG8gbWFrZSBpdCB3b3JrLCB1c2luZyB0aGlzIG1ldGhvZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHsgUHJvbWlzZSB9IFByb21pc2UgRVM2IFByb21pc2UgY29tcGF0aWJsZSBvYmplY3RcclxuICAqIEByZXR1cm4geyB1bmRlZmluZWQgfVxyXG4gICovXG5cdHByb21pc2lmeTogZnVuY3Rpb24gKFByb21pc2UpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0XHR0aGlzLmRpc3BhdGNoZXIuX1Byb21pc2UgPSBQcm9taXNlO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbHV4aWZ5KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eGlmeS9mbHV4aWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbi8qKlxyXG4gKiBUaGUgYXN5bmNocm9ub3VzIGRpc3BhdGNoZXIgY29tcGF0aWJsZSB3aXRoIEZhY2Vib29rJ3MgZmx1eCBkaXNwYXRjaGVyXHJcbiAqIGh0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vZmx1eC9kb2NzL2Rpc3BhdGNoZXIuaHRtbFxyXG4gKlxyXG4gKiBEaXNwYXRjaCBhY3Rpb25zIHRvIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrcywgdGhvc2UgYWN0aW9uIGNhbiBiZVxyXG4gKiBhc3luY2hyb25vdXMgaWYgdGhleSByZXR1cm4gYSBQcm9taXNlLlxyXG4gKi9cblxudmFyIFhEaXNwYXRjaGVyID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jYWxsYmFja3MgPSB7fTtcblx0dGhpcy5fZGlzcGF0Y2hRdWV1ZSA9IFtdO1xuXHR0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSBmYWxzZTtcblx0dGhpcy5fSUQgPSAxO1xuXG5cdGlmICh0eXBlb2YgUHJvbWlzZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdHRoaXMuX1Byb21pc2UgPSBQcm9taXNlO1xuXHR9XG59O1xuXG5YRGlzcGF0Y2hlci5wcm90b3R5cGUgPSB7XG5cblx0LyoqXHJcbiAgKiBSZWdpc3RlciBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmcgfCBGdW5jdGlvbn0gICBpZCAgSWYgYSBzdHJpbmcgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHRoZSBpZCBvZiB0aGUgY2FsbGJhY2suXHJcbiAgKiAgICAgICAgICAgICAgICAgIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgYXMgY2FsbGJhY2ssIGFuZCBpZCBpcyBnZW5lcmF0ZWRcclxuICAqICAgICAgICAgICAgICAgICAgYXV0b21hdGljYWxseS5cclxuICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBJZiBhbiBpZCBpcyBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudCwgdGhpcyB3aWxsIGJlIHRoZSBjYWxsYmFjay5cclxuICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgICBUaGUgaWQgb2YgdGhlIGNhbGxiYWNrIHRvIGJlIHVzZWQgd2l0aCB0aGUgd2FpdEZvciBtZXRob2QuXHJcbiAgKi9cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2spIHtcblx0XHR2YXIgSUQgPSBpZDtcblxuXHRcdC8vIElmIHRoZSBjYWxsYmFjayBpcyB0aGUgZmlyc3QgcGFyYW1ldGVyXG5cdFx0aWYgKHR5cGVvZiBpZCA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRJRCA9ICdJRF8nICsgdGhpcy5fSUQ7XG5cdFx0XHRjYWxsYmFjayA9IGlkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NhbGxiYWNrc1tJRF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9JRCsrO1xuXG5cdFx0cmV0dXJuIElEO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBYU3RvcmUgaW4gdGhlIGRpc3BhY2hlci4gWFN0b3JlcyBoYXMgYSBtZXRob2QgY2FsbGVkIGNhbGxiYWNrLiBUaGUgZGlzcGF0Y2hlclxyXG4gICogcmVnaXN0ZXIgdGhhdCBmdW5jdGlvbiBhcyBhIHJlZ3VsYXIgY2FsbGJhY2suXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIGlkIGZvciB0aGUgc3RvcmUgdG8gYmUgdXNlZCBpbiB0aGUgd2FpdEZvciBtZXRob2QuXHJcbiAgKiBAcGFyYW0gIHtYU3RvcmV9IHhTdG9yZSBTdG9yZSB0byByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyU3RvcmU6IGZ1bmN0aW9uIChpZCwgeFN0b3JlKSB7XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoeFN0b3JlLCAnX2Rpc3BhdGNoZXInLCB7XG5cdFx0XHR2YWx1ZTogdGhpc1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0ZXIoaWQsIHhTdG9yZS5jYWxsYmFjayk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBVbnJlZ2lzdGVyIGEgY2FsbGJhY2sgZ2l2ZW4gaXRzIGlkLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZ30gaWQgQ2FsbGJhY2svU3RvcmUgaWRcclxuICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAqL1xuXHR1bnJlZ2lzdGVyOiBmdW5jdGlvbiAoaWQpIHtcblx0XHRkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2lkXTtcblx0fSxcblxuXHQvKipcclxuICAqIENyZWF0ZXMgYSBwcm9taXNlIGFuZCB3YWl0cyBmb3IgdGhlIGNhbGxiYWNrcyBzcGVjaWZpZWQgdG8gY29tcGxldGUgYmVmb3JlIHJlc29sdmUgaXQuXHJcbiAgKiBJZiBpdCBpcyB1c2VkIGJ5IGFuIGFjdGlvbkNhbGxiYWNrLCB0aGUgcHJvbWlzZSBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gbGV0IG90aGVyIGNhbGxiYWNrc1xyXG4gICogd2FpdCBmb3IgaXQgaWYgbmVlZGVkLlxyXG4gICpcclxuICAqIEJlIGNhcmVmdWwgb2Ygbm90IHRvIHdhaXQgYnkgYSBjYWxsYmFjayB0aGF0IGlzIHdhaXRpbmcgYnkgdGhlIGN1cnJlbnQgY2FsbGJhY2ssIG9yIHRoZVxyXG4gICogcHJvbWlzZXMgd2lsbCBuZXZlciBmdWxmaWxsLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZzxBcnJheT58U3RyaW5nfSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FsbGJhY2tzL3N0b3JlcyB0byB3YWl0IGZvci5cclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2tzIGFyZSBjb21wbGV0ZWQuXHJcbiAgKi9cblx0d2FpdEZvcjogZnVuY3Rpb24gKGlkcykge1xuXHRcdHZhciBwcm9taXNlcyA9IFtdLFxuXHRcdCAgICBpID0gMDtcblxuXHRcdGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcblxuXHRcdGZvciAoOyBpIDwgaWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fcHJvbWlzZXNbaWRzW2ldXSkgcHJvbWlzZXMucHVzaCh0aGlzLl9wcm9taXNlc1tpZHNbaV1dKTtcblx0XHR9XG5cblx0XHRpZiAoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX1Byb21pc2UucmVzb2x2ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIGFsbCB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3Mvc3RvcmVzLlxyXG4gICpcclxuICAqIElmIGEgc2Vjb25kIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHdoaWxlIHRoZXJlIGlzIGEgZGlzcGF0Y2ggb24sIGl0IHdpbGwgYmVcclxuICAqIGVucXVldWVkIGFuIGRpc3BhdGNoZWQgYWZ0ZXIgdGhlIGN1cnJlbnQgb25lLlxyXG4gICpcclxuICAqIEByZXR1cm4geyBQcm9taXNlIH0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2UsXG5cdFx0ICAgIGRlcXVldWU7XG5cblx0XHRpZiAoIXRoaXMuX1Byb21pc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIHByb21pc2VzLicpO1xuXG5cdFx0Ly8gSWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBkaXNwYXRjaCwgZW5xdWV1ZSB0aGUgZGlzcGF0Y2hcblx0XHRpZiAodGhpcy5fY3VycmVudERpc3BhdGNoKSB7XG5cblx0XHRcdC8vIERpc3BhdGNoIGFmdGVyIHRoZSBjdXJyZW50IG9uZVxuXHRcdFx0cHJvbWlzZSA9IHRoaXMuX2N1cnJlbnREaXNwYXRjaC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG1lLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEVucXVldWUsIHNldCB0aGUgY2hhaW4gYXMgdGhlIGN1cnJlbnQgcHJvbWlzZSBhbmQgcmV0dXJuXG5cdFx0XHR0aGlzLl9kaXNwYXRjaFF1ZXVlLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gcHJvbWlzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudERpc3BhdGNoID0gdGhpcy5fZGlzcGF0Y2guYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIGlubWVkaWF0ZWxseS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQgd2hlbiBhbGwgdGhlIGNhbGxiYWNrcyBoYXZlIGZpbmlzZWQuXHJcbiAgKi9cblx0X2Rpc3BhdGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgZGlzcGF0Y2hBcmd1bWVudHMgPSBhcmd1bWVudHMsXG5cdFx0ICAgIHByb21pc2VzID0gW107XG5cblx0XHR0aGlzLl9wcm9taXNlcyA9IFtdO1xuXG5cdFx0Ly8gQSBjbG9zdXJlIGlzIG5lZWRlZCBmb3IgdGhlIGNhbGxiYWNrIGlkXG5cdFx0T2JqZWN0LmtleXModGhpcy5fY2FsbGJhY2tzKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXG5cdFx0XHQvLyBBbGwgdGhlIHByb21pc2VzIG11c3QgYmUgc2V0IGluIG1lLl9wcm9taXNlcyBiZWZvcmUgdHJ5aW5nIHRvIHJlc29sdmVcblx0XHRcdC8vIGluIG9yZGVyIHRvIG1ha2Ugd2FpdEZvciB3b3JrIG9rXG5cdFx0XHRtZS5fcHJvbWlzZXNbaWRdID0gbWUuX1Byb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2NhbGxiYWNrc1tpZF0uYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9taXNlcy5wdXNoKG1lLl9wcm9taXNlc1tpZF0pO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHR2YXIgZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1lLl9kaXNwYXRjaFF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIW1lLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aCkgbWUuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5fUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGVxdWV1ZSwgZGVxdWV1ZSk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJcyB0aGlzIGRpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxyXG4gICpcclxuICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgKi9cblx0aXNEaXNwYXRjaGluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAhIXRoaXMuX2Rpc3BhdGNoUXVldWUubGVuZ3RoO1xuXHR9XG5cbn07XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gWERpc3BhdGNoZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhFbWl0dGVyID0gcmVxdWlyZSgnLi94RW1pdHRlcicpLFxuICAgIHhVdGlscyA9IHJlcXVpcmUoJy4veFV0aWxzJyk7XG5cbi8vI2J1aWxkXG5cbnZhciBTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAocHJvcHMpIHtcblx0XHRpZiAoIXByb3BzKSByZXR1cm4gdGhpcy5wcm9wcyA9IHt9O1xuXG5cdFx0dGhpcy5wcm9wcyA9IHt9O1xuXHRcdGZvciAodmFyIHAgaW4gcHJvcHMpIHRoaXMucHJvcHNbcF0gPSBwcm9wc1twXTtcblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uIChwcm9wKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHNbcHJvcF07XG5cdH0sXG5cblx0c2V0OiBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcblx0XHR2YXIgcHJvcHMgPSBwcm9wLFxuXHRcdCAgICB1cGRhdGVzID0gW10sXG5cdFx0ICAgIHByZXZpb3VzVmFsdWUsXG5cdFx0ICAgIHA7XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRwcm9wcyA9IHt9O1xuXHRcdFx0cHJvcHNbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gcHJvcHMpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzW3BdICE9IHByb3BzW3BdKSB7XG5cdFx0XHRcdHByZXZpb3VzVmFsdWUgPSB0aGlzLnByb3BzW3BdO1xuXHRcdFx0XHR0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdFx0XHRcdHVwZGF0ZXMucHVzaCh7XG5cdFx0XHRcdFx0cHJvcDogcCxcblx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRcdHZhbHVlOiBwcm9wc1twXVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodXBkYXRlcy5sZW5ndGgpIHRoaXMuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdH1cbn0pO1xuXG52YXIgWFN0b3JlID0gWEVtaXR0ZXIuX2V4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIG1lID0gdGhpcyxcblx0XHQgICAgb3B0cyA9IG9wdGlvbnMgfHwge30sXG5cdFx0ICAgIHN0b3JlID0gbmV3IFN0b3JlKG9wdHMuaW5pdGlhbFN0YXRlKSxcblx0XHQgICAgYWN0aW9uVHlwZSxcblx0XHQgICAgc3RhdGVQcm9wO1xuXG5cdFx0Ly8gU3RvcmUgaWRcblx0XHRpZiAob3B0aW9ucy5pZCkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfaWQnLCB7XG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmlkXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBSZWdpc3RlciBhY3Rpb24gY2FsbGJhY2tzIGluIHRoZSBzdG9yZVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRcdF9jYWxsYmFja3M6IHtcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHt9XG5cdFx0XHR9LFxuXHRcdFx0YWRkQWN0aW9uQ2FsbGJhY2tzOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoY2xia3MpIHtcblx0XHRcdFx0XHRmb3IgKGFjdGlvblR5cGUgaW4gY2xia3MpIHtcblx0XHRcdFx0XHRcdG1lLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0gPSBjbGJrc1thY3Rpb25UeXBlXS5iaW5kKHRoaXMsIHN0b3JlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGxiYWNrIGZvciByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxuXHRcdFx0Y2FsbGJhY2s6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgYWN0aW9uVHlwZSA9IGFyZ3VtZW50c1swXSxcblx0XHRcdFx0XHQgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0pIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBjYWxsYmFja3MgYXJlIGFscmVhZHkgYm91bmQgdG8gdGhpcyB4U3RvcmUgYW5kIHRoZSBtdXRhYmxlIHN0b3JlXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQWN0aW9uQ2FsbGJhY2tzKG9wdHMuYWN0aW9uQ2FsbGJhY2tzIHx8IHt9KTtcblxuXHRcdC8vIENyZWF0ZSBpbm1tdXRhYmxlIHByb3BlcnRpZXNcblx0XHR2YXIgYWRkUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcE5hbWUsIHZhbHVlKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsIHByb3BOYW1lLCB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdG9yZS5nZXQocHJvcE5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0aWYgKG9wdHMuaW5pdGlhbFN0YXRlKSB7XG5cdFx0XHRmb3IgKHN0YXRlUHJvcCBpbiBvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0XHRhZGRQcm9wZXJ0eShzdGF0ZVByb3AsIG9wdHMuaW5pdGlhbFN0YXRlW3N0YXRlUHJvcF0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEVtaXQgb24gc3RvcmUgY2hhbmdlXG5cdFx0c3RvcmUub24oJ2NoYW5nZScsIGZ1bmN0aW9uICh1cGRhdGVzKSB7XG5cdFx0XHR2YXIgdXBkYXRlc0xlbmd0aCA9IHVwZGF0ZXMubGVuZ3RoLFxuXHRcdFx0ICAgIHVwZGF0ZSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdXBkYXRlc0xlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHVwZGF0ZSA9IHVwZGF0ZXNbaV07XG5cblx0XHRcdFx0Ly8gSWYgdGhlIHByb3BlcnR5IGlzIG5ldywgYWRkIGl0IHRvIHRoZSB4U3RvcmVcblx0XHRcdFx0aWYgKCFtZS5oYXNPd25Qcm9wZXJ0eSh1cGRhdGUucHJvcCkpIGFkZFByb3BlcnR5KHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUpO1xuXG5cdFx0XHRcdG1lLmVtaXQoJ2NoYW5nZTonICsgdXBkYXRlLnByb3AsIHVwZGF0ZS52YWx1ZSwgdXBkYXRlLnByZXZpb3VzVmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRtZS5lbWl0KCdjaGFuZ2UnLCB1cGRhdGVzKTtcblx0XHR9KTtcblx0fSxcblxuXHRnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdC8vIENsb25lIHRoZSBzdG9yZSBwcm9wZXJ0aWVzXG5cdFx0cmV0dXJuIHhVdGlscy5fZXh0ZW5kKHt9LCB0aGlzKTtcblx0fSxcblxuXHR3YWl0Rm9yOiBmdW5jdGlvbiAoaWRzKSB7XG5cdFx0Ly8gVGhlIHhEaXNwYXRjaGVyIGFkZHMgaXRzZWxmIGFzIGEgcHJvcGVydHlcblx0XHQvLyB3aGVuIHRoZSB4U3RvcmUgaXMgcmVnaXN0ZXJlZFxuXHRcdHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLndhaXRGb3IoaWRzKTtcblx0fVxufSk7XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gWFN0b3JlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvc3JjL3hTdG9yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgeFV0aWxzID0gcmVxdWlyZSgnLi94VXRpbHMnKTtcblxuLy8jYnVpbGRcblxudmFyIFhFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19ldmVudHMnLCB7XG5cdFx0dmFsdWU6IHt9XG5cdH0pO1xuXG5cdGlmICh0eXBlb2YgdGhpcy5pbml0aWFsaXplID09ICdmdW5jdGlvbicpIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuLy8gVGhlIHByb3RvdHlwZSBtZXRob2RzIGFyZSBzdG9yZWQgaW4gYSBkaWZmZXJlbnQgb2JqZWN0XG4vLyBhbmQgYXBwbGllZCBhcyBub24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGxhdGVyXG52YXIgZW1pdHRlclByb3RvdHlwZSA9IHtcblx0b246IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyLCBvbmNlKSB7XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuXG5cdFx0bGlzdGVuZXJzLnB1c2goeyBjYWxsYmFjazogbGlzdGVuZXIsIG9uY2U6IG9uY2UgfSk7XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnM7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRvbmNlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuXHRcdHRoaXMub24oZXZlbnROYW1lLCBsaXN0ZW5lciwgdHJ1ZSk7XG5cdH0sXG5cblx0b2ZmOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuXHRcdGlmICh0eXBlb2YgZXZlbnROYW1lID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9ldmVudHMgPSB7fTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdLFxuXHRcdFx0ICAgIGk7XG5cblx0XHRcdGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzW2ldLmNhbGxiYWNrID09PSBsaXN0ZW5lcikgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG5cdFx0ICAgIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdLFxuXHRcdCAgICBvbmNlTGlzdGVuZXJzID0gW10sXG5cdFx0ICAgIGksXG5cdFx0ICAgIGxpc3RlbmVyO1xuXG5cdFx0Ly8gQ2FsbCBsaXN0ZW5lcnNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyLmNhbGxiYWNrKSBsaXN0ZW5lci5jYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm90IGEgY2FsbGJhY2ssIHJlbW92ZSFcblx0XHRcdFx0bGlzdGVuZXIub25jZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsaXN0ZW5lci5vbmNlKSBvbmNlTGlzdGVuZXJzLnB1c2goaSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVycyBtYXJrZWQgYXMgb25jZVxuXHRcdGZvciAoaSA9IG9uY2VMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2Uob25jZUxpc3RlbmVyc1tpXSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cbi8vIEV2ZW50RW1pdHRlciBtZXRob2RzXG54VXRpbHMuX2V4dGVuZChlbWl0dGVyUHJvdG90eXBlLCB7XG5cdGFkZExpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9uLFxuXHRyZW1vdmVMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdHJlbW92ZUFsbExpc3RlbmVyczogZW1pdHRlclByb3RvdHlwZS5vZmYsXG5cdGVtaXQ6IGVtaXR0ZXJQcm90b3R5cGUudHJpZ2dlclxufSk7XG5cbi8vIE1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlIHNvLCB3aGVuIHRoZSBzdG9yZXMgYXJlXG4vLyBleHRlbmRlZCB3aXRoIHRoZSBlbWl0dGVyLCB0aGV5IGNhbiBiZSBpdGVyYXRlZCBhc1xuLy8gaGFzaG1hcHNcblhFbWl0dGVyLnByb3RvdHlwZSA9IHt9O1xuZm9yICh2YXIgbWV0aG9kIGluIGVtaXR0ZXJQcm90b3R5cGUpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kLCB7XG5cdFx0dmFsdWU6IGVtaXR0ZXJQcm90b3R5cGVbbWV0aG9kXVxuXHR9KTtcbn1cblxuLy8gRXh0ZW5kIG1ldGhvZCBmb3IgJ2luaGVyaXRhbmNlJywgbm9kIHRvIGJhY2tib25lLmpzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIsICdfZXh0ZW5kJywge1xuXHR2YWx1ZTogZnVuY3Rpb24gKHByb3RvUHJvcHMpIHtcblx0XHR2YXIgcGFyZW50ID0gdGhpcyxcblx0XHQgICAgY2hpbGQ7XG5cblx0XHRpZiAocHJvdG9Qcm9wcyAmJiBwcm90b1Byb3BzLmhhc093blByb3BlcnR5KGNvbnN0cnVjdG9yKSkge1xuXHRcdFx0Y2hpbGQgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGlsZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR4VXRpbHMuX2V4dGVuZChjaGlsZCwgcGFyZW50KTtcblxuXHRcdHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBBZ2FpbiB0aGUgY29uc3RydWN0b3IgaXMgYWxzbyBkZWZpbmVkIGFzIG5vdCBlbnVtZXJhYmxlXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnN0cnVjdG9yJywge1xuXHRcdFx0XHR2YWx1ZTogY2hpbGRcblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0U3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG5cdFx0Y2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG5cdFx0Ly8gQWxsIHRoZSBleHRlbmRpbmcgbWV0aG9kcyBuZWVkIHRvIGJlIGFsc29cblx0XHQvLyBub24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG5cdFx0aWYgKHByb3RvUHJvcHMpIHtcblx0XHRcdGZvciAodmFyIHAgaW4gcHJvdG9Qcm9wcykge1xuXHRcdFx0XHRpZiAocCAhPSAnY29uc3RydWN0b3InKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLnByb3RvdHlwZSwgcCwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHByb3RvUHJvcHNbcF1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhFbWl0dGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvc3JjL3hFbWl0dGVyLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbnZhciB4VXRpbHMgPSB7XG5cdC8vIE9iamVjdCBleHRlbmQsIE5vZCB0byB1bmRlcnNjb3JlLmpzXG5cdF9leHRlbmQ6IGZ1bmN0aW9uIChvYmopIHtcblx0XHR2YXIgc291cmNlLCBwcm9wO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGZvciAocHJvcCBpbiBzb3VyY2UpIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IHhVdGlscztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mbHV4aWZ5L3NyYy94VXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXRcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWUsXHJcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICBwYXR0ZXJuOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4vLyAgICAgICAgICBjb25zb2xlLmxvZygnaW5wdXQtdGV4dCBvbiBjaGFuZ2UgZGF0YTonLCBuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2VsZi5wcm9wcy5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm5leHRQcm9wcy52YWx1ZSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcblxyXG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGlzUGF0dGVyVmFsaWQgPSB0cnVlO1xyXG5cclxuICAvLyAgICAgIGNvbnNvbGUubG9nKCdvbkNoYW5nZSBmaWVsZFZhbHVlJywgdGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGF0dGVybiAmJiBmaWVsZFZhbHVlLmNoYXJBdCAoIGZpZWxkVmFsdWUubGVuZ3RoIC0gMSkgIT09ICcuJykge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQvtC00LjQvCDQv9GA0L7QstC10YDQutGDINC90LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC1INGI0LDQsdC70L7QvdGDXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWVsZFZhbHVlLm1hdGNoKHRoaXMucHJvcHMucGF0dGVybiwnJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkgIHtcclxuICAvLyAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhdHRlcm4gdmFsZTonICsgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0LXRgdC70Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0L/QsNGC0YLQtdGA0L3Rg1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gLy8gICAgICAgY29uc29sZS5sb2coJ29uQ2hhbmdlIGZpZWxkVmFsdWUgZmluaXNoJywgdGhpcy5wcm9wcy5uYW1lLCB0aGlzLnN0YXRlLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG5cclxuLypcclxuICAgICAgICAvLyDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutGDLCDQtdGB0LvQuCDQt9Cw0LTQsNC9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB0aGlzLnByb3BzLm5hbWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgfVxyXG4qL1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJycgKyAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIG15U3R5bGUgPSB7d2lkdGg6J2F1dG8nfTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMud2lkdGgpIHtcclxuICAgICAgICAgICAgbXlTdHlsZS53aWR0aCA9IHRoaXMucHJvcHMud2lkdGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCIgKyBpbnB1dENsYXNzTmFtZX0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBteVN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNeUJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015QnV0dG9uJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5idXR0b25WYWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25DbGljayB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICAvLyDQstC10YDQvdC10Lwg0LIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtGB0YLQvtGP0L3QuNC5INGB0L7QsdGL0YLQuNC1INC60LvQuNC6XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE15QnV0dG9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215YnV0dG9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xyXG5cclxuXHJcbnZhciBtb2RhbFBhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwibW9kYWxQYWdlXCIsXHJcbiAgICBoYW5kbGVCdG5DbGljazogZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrKGJ0bkV2ZW50KTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdkZWZhdWxOYW1lJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbFBhZ2UgdGhpcy5wcm9wcycsIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJoZWFkZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7aWQ6IFwiaGVhZGVyTmFtZVwifSwgXCIgXCIsIHRoaXMucHJvcHMubW9kYWxQYWdlTmFtZSwgXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQ29udGVudFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQnV0dG9uc1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsJ09rJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5Pa1wifSwgXCIgT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtb2RhbFBhZ2VCdXR0b25zXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnRuQ2FuY2VsXCJ9LCBcIiBDYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsUGFnZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4XG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyDQvdGA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG5jb25zdCBNeVRyZWUgPSByZXF1aXJlKCcuL215dHJlZScpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEJ1dHRvbkFkZCA9IHJlcXVpcmUoJy4vYnV0dG9uYWRkJyksXHJcbiAgICBCdXR0b25FZGl0ID0gcmVxdWlyZSgnLi9idXR0b25lZGl0JyksXHJcbiAgICBCdXR0b25EZWxldGUgPSByZXF1aXJlKCcuL2J1dHRvbmRlbGV0ZScpLFxyXG4gICAgQnV0dG9uUHJpbnQgPSByZXF1aXJlKCcuL2J1dHRvbnByaW50JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIG15Q29tcG9uZW50cyA9IFtdO1xyXG5cclxuaWYgKCF0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgLy8g0LHQtdGA0LXQvCDQtNCw0L3QvdGL0LUg0YEg0LvQvtC60LDQu9GM0L3QvtCz0L4g0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICBteUNvbXBvbmVudHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10pO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yZVxyXG52YXIgZG9jc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LrQu9Cw0YHRgSAtINC00LXRgNC20LDRgtC10LvRjCDRgdC+0YHRgtC+0Y/QvdC40LlcclxudmFyIFBhcmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGFyZW50JyxcclxuXHJcbiAgICBmaWx0ZXJEYXRhOltdLCAvLyDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7Qsiwg0LrRg9C00LAg0LfQsNC/0LjRiNC10Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vINGDINC60LDQttC00L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwINGB0LLQvtC5INC+0LHRitC10LrRglxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiB0aGlzLnByb3BzLmNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIGdyaWRMZWZ0OiAnMTMlJyxcclxuICAgICAgICAgICAgZ3JpZFdpZHRoOiAnOTAlJyxcclxuICAgICAgICAgICAgZ2V0RmlsdGVyOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtjb21wb25lbnRzOmRvY3NTdG9yZS5kYXRhfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINGB0LLQvtGA0LDRh9C40LLQsNC90LjQtSDQv9Cw0L3QtdC70LXQuVxyXG4gICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOnRvb2dsZVBhbmVsJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHRvb2dsZURhdGEgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUudG9vZ2xlUGFuZWxEYXRhO1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZExlZnQ6dG9vZ2xlRGF0YS5sZWZ0LGdyaWRXaWR0aDp0b29nbGVEYXRhLndpZHRoIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXQvCDQtNCw0L3QvdGL0LVcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQgY29tcG9uZW50RGlkTW91bnQgc3RhdGUgY29tcG9uZW50cycsdGhpcy5zdGF0ZS5jb21wb25lbnRzKTtcclxuXHJcbiAgICAgICAgdmFyIGxhc3RDb21wb25lbnQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J107XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RhdGFDaGFuZ2UnLCB0aGlzLnByb3BzLmNvbXBvbmVudHMgKTtcclxuICAgICAgICBpZiAobGFzdENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzTGlzdENoYW5nZScsbGFzdENvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG4gICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5leHRTdGF0ZSkgKyAnIFZTICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XHJcbiAgICAgdmFyIHJldHVyblZhbHVlID0gKEpTT04uc3RyaW5naWZ5KG5leHRTdGF0ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpICk7XHJcbiAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgIH0sXHJcblxyXG4gICAgICovXHJcbiAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbihjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC00LDQvdC90YvQtSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQvdCw0LfQstCw0L3QuNGOXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSB0aGlzLnN0YXRlLmNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IGNvbXBvbmVudHMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT0gY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidG5GaWx0ZXJDbGljazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INGBINC/0L7Qu9GP0LzQuCDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXRGaWx0ZXI6IHRydWV9KVxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIHZhciAgbXlMaXN0VmFsdWUgPSAnJyxcclxuICAgICAgICAgICAgbXlMaXN0RGF0YSA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0xpc3QnKSB8fCBbXSxcclxuICAgICAgICAgICAgbXlHcmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBbXSxcclxuICAgICAgICAgICAgbXlHcmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICB0b29nbGVQYW5lZWxEYXRhID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnRvb2dsZVBhbmVsRGF0YSxcclxuICAgICAgICAgICAgZ3JpZExlZnQgPSAnMTMlJztcclxuXHJcbiAgICAgICAgaWYgKG15TGlzdERhdGEubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgbXlMaXN0VmFsdWUgPSBteUxpc3REYXRhWzBdLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuICAgICAgICBpZiAobXlHcmlkLmxlbmd0aCA+IDAgJiYgbXlHcmlkWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBteUdyaWRbMF0uZGF0YVswXS5jb2x1bW5zO1xyXG4gICAgICAgICAgICBteUdyaWREYXRhID0gbXlHcmlkWzBdLmRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmaWx0ZXJDb21wb25lbnQ7XHJcbiAgICAgICAgIGlmICh0aGlzLnN0YXRlLmdldEZpbHRlcikgIHtcclxuICAgICAgICAgICAgIGZpbHRlckNvbXBvbmVudCA9ICB0aGlzLmdldEZpbHRlckZpZWxkcygpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChteUxpc3REYXRhLmxlbmd0aCA+IDAgJiYgIG15TGlzdERhdGFbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15TGlzdERhdGEgPSAgbXlMaXN0RGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJwYXJlbnREaXZcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNeVRyZWUsIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lOiBcImRvY3NMaXN0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG15TGlzdERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBteUxpc3RWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0xpc3RDaGFuZ2VcIn0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImdyaWRUb29sQmFyXCJ9LCBcIlRvb2xiYXJcIiwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uQWRkLCB7Y2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25FZGl0LCB7Y2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25EZWxldGUsIHtjbGFzc05hbWU6IFwiZ3JpZFRvb2xiYXJcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvblByaW50LCB7Y2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJncmlkVG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5idG5GaWx0ZXJDbGlja1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiIEZpbHRlciBcIilcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwiZ3JpZFRhYmxlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOnRvb2dsZVBhbmVlbERhdGEuZ3JpZCwgbGVmdDogdG9vZ2xlUGFuZWVsRGF0YS5sZWZ0fVxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YTogbXlHcmlkRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiBteUdyaWRDb2x1bXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzR3JpZENoYW5nZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImFwaVwifVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5nZXRGaWx0ZXIgP1xyXG4gICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHM6IHRoaXMuZmlsdGVyRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiIFwiLCBmaWx0ZXJDb21wb25lbnQsIFwiIFwiKSlcclxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICB2YXIgZmlsdGVyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID0gJ09rJykge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNC10Lwg0LTQsNC90L3Ri9C1INCyINC+0LHRitC10LrRgiDQuCDQstC10YDQvdC10Lwg0L3QsCDRhNC+0YDQvNGDXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy52YWx1ZSA9IHRoaXMucmVmc1tyb3cucmVmc10udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgKGZpbHRlclN0cmluZy5sZW5ndGggPiAwID8gXCIgYW5kIFwiOiBcIiB3aGVyZSBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICclXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJ1wiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9ICdcIiArIHJvdy52YWx1ZSArIFwiJ1wiIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9IFwiICsgcm93LnZhbHVlIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWxQYWdlQnRuQ2xpY2ssIGZpbHRlclN0cmluZyAnLCBmaWx0ZXJTdHJpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NxbFdoZXJlQ2hhbmdlJywgZmlsdGVyU3RyaW5nICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogZmFsc2V9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRGaWx0ZXJGaWVsZHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgdGCINC40Lcg0L/QvtC70LrQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB2YXIgZ3JpZENvbXBvbmVudHMgPSAgZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZ3JpZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPVxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEubWFwKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3NGaWx0ZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8IFwi0YHRgtCw0YDQvtC1XCIg0LfQvdCw0YfQtdC90LjQtSDRhNC40LvRjNGC0YDQsCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YLQviDQvtGC0LTQsNC10Lwg0LXQs9C+IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW9zRmlsdGVyW2ldLnJlZnMgPT0gcm93LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHByZXZpb3NGaWx0ZXJbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudE9iamVrdDonLCBjb21wb25lbnRPYmpla3RWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgPSByb3cudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QsdC10YDQtdC8INC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLnB1c2goe25hbWU6cm93Lm5hbWUsIHZhbHVlOiBjb21wb25lbnRPYmpla3RWYWx1ZSB8fCBudWxsLCB0eXBlOmNvbXBvbmVudFR5cGUsIHJlZnM6IHJvdy5pZH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtrZXk6IGluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcm93Lm5hbWUpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogY29tcG9uZW50VHlwZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByb3cubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiByb3cubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiByb3cuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogY29tcG9uZW50T2JqZWt0VmFsdWUgfHwgbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgZmlsdGVyRmllbGRzID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgZmlsdGVyRmllbGRzKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmaWx0ZXJGaWVsZHM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJlbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXJlZ2lzdGVyLmpzeFxuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIE15TGlzdCA9IHJlcXVpcmUoJy4vbXlsaXN0LmpzJyk7XG5cbnZhciBNeVRyZWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdNeVRyZWUnLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdteSB0cmVlIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBpZDogJ3RyZWUnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlMaXN0LCB7XG4gICAgICAgICAgICBzb3VyY2VBcnJheTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogdGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiB9KSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlUcmVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215dHJlZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxuY29uc3QgVE9PR0xFUEFORUxPUEVORUQgPSB7IHRyZWU6ICcxMCUnLCBncmlkOiAnOTAlJywgbGVmdDogJzEzJScgfSxcbiAgICAgIFRPT0dMRVBBTkVMQ0xPU0VEID0geyB0cmVlOiAnMSUnLCBncmlkOiAnMTAwJScsIGxlZnQ6ICcwJyB9O1xuXG52YXIgTXlMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTXlMaXN0JyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc291cmNlQXJyYXk6IHRoaXMucHJvcHMuc291cmNlQXJyYXksXG4gICAgICAgICAgICBpc0NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2xpY2tlZDogOTk5OTk5OTksXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNsaWNrZWQ6IHRoaXMuZ2V0SW5kZXhCeUNvbXBvbmVudCh0aGlzLnByb3BzLnZhbHVlKSxcbiAgICAgICAgICAgIGNob29zZW5Eb2NUeXBlSWQ6IHRoaXMucHJvcHMudmFsdWUgfHwgJydcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjbGlja2VkOiA5OTk5OTk5OSxcbiAgICAgICAgICAgIGNob29zZW5Eb2NUeXBlSWQ6ICcnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluZGV4QnlDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC40L3QtNC10LrRgSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQutC+0LTRgyAgIFxuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgY29tcG9uZW50QXJyYXkgPSB0aGlzLnByb3BzLnNvdXJjZUFycmF5O1xuXG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50QXJyYXlbaV1bJ2tvb2QnXSA9PSBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnRBcnJheS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy5rb29kID09ICdjb21wb25lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gcm93LmlkO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0SW5kZXhCeUNvbXBvbmVudCBpbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUub24oJ2NoYW5nZTpkb2NzTGlzdCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUub24oY2hhbmdlOmRvY3NMaXN0KScsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlLCBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICYmIHByZXZpb3VzVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDRg9C00LDQu9GP0LXQvCDQvNC10YLQutGDINC40L3QtNC10LrRgdCwINGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9C00L7QutGD0LzQtdC90YIg0LjQt9C80LXQvdC40LvRgdGPJyk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jbGlja2VkID09IDk5OTk5OTk5KSB7XG4gICAgICAgICAgICAvLyDQvdC1INGD0YHRgtCw0L3QvtCy0LvQtdC9INC10YnQtdCxINC+0YLQvNC10YLQuNC8INC/0L7RgdC70LXQtNC90Lkg0LLRi9Cx0L7RgFxuICAgICAgICAgICAgdmFyIGxhc3RDb21wb25lbnQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J10sXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4QnlDb21wb25lbnQobGFzdENvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTGlDbGljayhpbmRleCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlTGlDbGljazogZnVuY3Rpb24gaGFuZGxlTGlDbGljayhpZHgpIHtcbiAgICAgICAgdmFyIG15QXJyYXkgPSB0aGlzLnByb3BzLnNvdXJjZUFycmF5LFxuICAgICAgICAgICAgY2hvb3NlbkRvY1R5cGUgPSB0aGlzLnByb3BzLnNvdXJjZUFycmF5W2lkeF1bXCJpZFwiXSxcbiAgICAgICAgICAgIGNob29zZW5Db2RlID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheVtpZHhdW1wia29vZFwiXTtcbiAgICAgICAgLy/RgdGC0LDQstC40Lwg0LzQtdGC0LrRg1xuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGlja2VkOiBpZHgsXG4gICAgICAgICAgICBjaG9vc2VuRG9jVHlwZUlkOiBjaG9vc2VuRG9jVHlwZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICBmbHV4LmRvQWN0aW9uKHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24sIGNob29zZW5Db2RlKTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICB2YXIgZ3JpZFRvb2dsZVdpZHRoID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnRvb2dsZVBhbmVsRGF0YTtcbiAgICAgICAgLy8g0L/RgNC4INC60LvQuNC60LUg0L/QvtC60LDQt9GL0LLQsNC10Lwg0LjQu9C4INGB0LrRgNGL0LLQsNC10YIg0LrQvtC80L/QvtC90LXQvdGCXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNDaGVja2VkOiAhdGhpcy5zdGF0ZS5pc0NoZWNrZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3JpZFRvb2dsZVdpZHRoID0gdGhpcy5zdGF0ZS5pc0NoZWNrZWQgPyBUT09HTEVQQU5FTE9QRU5FRCA6IFRPT0dMRVBBTkVMQ0xPU0VEO1xuICAgICAgICBmbHV4LmRvQWN0aW9uKCd0b29nbGVQYW5lbENoYW5nZScsIHRoaXMuc3RhdGUuaXNDaGVja2VkLCBncmlkVG9vZ2xlV2lkdGgpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG15QXJyYXkgPSB0aGlzLnByb3BzLnNvdXJjZUFycmF5O1xuICAgICAgICB2YXIgbXlTdHlsZSA9IHRoaXMuc3RhdGUuaXNDaGVja2VkID8gJ25vbmUnIDogJ2Jsb2NrJzsgLy8g0L/RgNGP0YfQtdGCINGB0L/QuNGB0L7QulxuICAgICAgICB2YXIgbXlHcmlkU3R5bGUgPSAnYmxvY2snO1xuICAgICAgICB2YXIgY2xpY2tlZEl0ZW0gPSB0aGlzLnN0YXRlLmNsaWNrZWQ7XG5cbiAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ215TGlzdCByZW5kZXIgc3RhdGUnLCB0aGlzLnN0YXRlLCB0aGlzLnByb3BzKTtcblxuICAgICAgICBpZiAobXlBcnJheS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC40Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xuICAgICAgICAgICAgbXlBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBrb29kOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBteUFycmF5ID0gbXlBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgbXlDbGFzcyA9ICdsaURvY0xpYnMnO1xuXG4gICAgICAgICAgICB2YXIgbGliID0gaXRlbTtcblxuICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtID09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbXlDbGFzcyA9IG15Q2xhc3MgKyAnIGZvY3VzZWQnOyAvLyDQv9C+0LTRgdCy0LXRgtC40Lwg0LLRi9Cx0YDQsNC90L3Rg9GOINGB0YLRgNC+0LrRg1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xuICAgICAgICAgICAgICAgIGtleTogJ2xpYi0nICsgaW5kZXgsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBteUNsYXNzLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IGRpc3BsYXk6IG15U3R5bGUgfSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUxpQ2xpY2suYmluZCh0aGlzLCBpbmRleClcbiAgICAgICAgICAgIH0sIGxpYi5uYW1lKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdmFyIHJvb3QgPSBSZWFjdC5jcmVhdGVFbGVtZW50KCd1bCcsIHsgb25FdmVudDogdGhpcy5vbkV2ZW50IH0sIG15QXJyYXkpO1xuICAgICAgICB2YXIgZG9jTGlic0RpdiA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAndHJlZURvY3MnLCBzdHlsZTogeyBkaXNwbGF5OiBteVN0eWxlIH0sIGlkOiAndHJlZURvY3MnIH0sIHJvb3QpO1xuICAgICAgICB2YXIgYnV0dG9uVmFsdWUgPSB0aGlzLnN0YXRlLmlzQ2hlY2tlZCA/ICcrJyA6ICctJztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgaWQ6ICd0cmVlVG9vbEJhcicgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBidXR0b25WYWx1ZSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2tcbiAgICAgICAgfSkpLCBkb2NMaWJzRGl2KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNeUxpc3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbXlsaXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxudmFyIERhdGFHcmlkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdEYXRhR3JpZCcsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBjbGlja2VkOiAwXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgaWYgKG5leHRQcm9wcy5ncmlkRGF0YSkge1xyXG4gICAgICAgICB2YXIgZG9jSWQgPSAgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddLFxyXG4gICAgICAgICBpbmRleCA9IHRoaXMuZ2V0R3JpZFJvd0luZGV4QnlJZChkb2NJZCk7XHJcblxyXG4gICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsIGluZGV4LCBkb2NJZCk7XHJcbiAgICAgICAgIHRoaXMuaGFuZGxlQ2VsbENsaWNrKGluZGV4KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICAqL1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG5cclxuICAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgdmFyIHJldHVyblZhbHVlID0gKEpTT04uc3RyaW5naWZ5KG5leHRTdGF0ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpICk7XHJcbiAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4vKlxyXG4gICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCBjb21wb25lbnREaWRNb3VudCcsbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddICk7XHJcblxyXG4gICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0YHQu9C10LTQvdGO0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgIGlmICh0aGlzLnN0YXRlLmNsaWNrZWQgPT0gMCkge1xyXG4gICAgICAgICAvLyDQvtGC0LzQtdGC0LjQvCDQv9C+0YHQu9C10LTQvdC40Lkg0L7RgtC80LXRh9C10L3QvdGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICB2YXIgZG9jSWQgPSAgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddLFxyXG4gICAgICAgICBpbmRleCA9IHRoaXMuZ2V0R3JpZFJvd0luZGV4QnlJZChkb2NJZCk7XHJcblxyXG4gICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCBjb21wb25lbnREaWRNb3VudCcsZG9jSWQsaW5kZXggKTtcclxuXHJcbiAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NsaWNrZWQ6IGluZGV4fSk7XHJcbiAgICAgICAgIH1cclxuKi9cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g0L/QvtCy0LXRgdC40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxyXG5cclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0L/QvtGB0LvQtdC00L3RjtGOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAvLyDQvtGC0LzQtdGC0LjQvCDQv9C+0YHQu9C10LTQvdC40Lkg0L7RgtC80LXRh9C10L3QvdGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG5cclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnbXkgZ3JpZCBvbiBjaGFuZ2UgbGlzdCAnLCBuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gW10pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb2NJZCA9IGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHNlbGYuZ2V0R3JpZFJvd0luZGV4QnlJZChkb2NJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Y2xpY2tlZDogaW5kZXh9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0R3JpZFJvd0luZGV4QnlJZDogZnVuY3Rpb24gKGRvY0lkKSB7XHJcbiAgICAgICAgLy8g0LjRidC10Lwg0LjQvdC00LXRhSDQsiDQvNCw0YHRgdC40LLQtSDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgaW5kZXggPSAwLFxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5wcm9wcy5ncmlkRGF0YTtcclxuICAgICAgICBpZiAoZG9jSWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgZGF0YVtpXVsnaWQnXSA9PSBkb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNlbGxDbGljazogZnVuY3Rpb24gaGFuZGxlQ2VsbENsaWNrKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+0LHRi9GC0Lgg0LrQu9C40LrQsCDQv9C+INGP0YfQtdC50LrQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjbGlja2VkOiBpZHhcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZ3JpZERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgZG9jSWQgPSB0aGlzLnByb3BzLmdyaWREYXRhW2lkeF0uaWQ7XHJcbiAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ215R3JpZCBoYW5kbGVDZWxsQ2xpY2s6JywgaWR4LCBkb2NJZCwgdGhpcy5wcm9wcy5ncmlkRGF0YSk7XHJcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24odGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiwgZG9jSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbERibENsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10YIg0LzQtdGC0L7QtCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignRWRpdCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVHcmlkSGVhZGVyQ2xpY2s6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHNvcnRCeSA9IFt7Y29sdW1uOiBuYW1lLCBkaXJlY3Rpb246ICdhc2MnfV07XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc29ydEJ5Q2hhbmdlJywgc29ydEJ5KTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyDRgNC10LDQutGG0LjRjyDQvdCwINC60LvQsNCy0LjQsNGC0YPRgNGDXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUtleVByZXNzICcsIGUpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGlmIChrZXlEaXJlY3Rpb24gPT0gJ0Rvd24nKSB7XHJcbiAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICBjbGlja2VkOiAodGhpcy5zdGF0ZS5jbGlja2VkICsgMSlcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgKi9cclxuXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgcmVuZGVyIGNhbGxlZCcpO1xyXG4gICAgICAgIHZhciBncmlkUm93cyA9IHRoaXMucHJvcHMuZ3JpZERhdGE7IC8vINGB0YLQsNGC0LjRh9C90Ysg0Lgg0L/RgNC40YXQvtC00Y/RgiDRgtC+0LvRjNC60L4g0LjQtyDQstC10YDRhdC90LXQs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucztcclxuICAgICAgICB2YXIgY2xpY2tlZEl0ZW0gPSB0aGlzLnN0YXRlLmNsaWNrZWQ7XHJcblxyXG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAndGgnLFxyXG4gICAgICAgICAgICBzZWxmID0gdGhpcztcclxuICAgICAgICAvKiAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5UHJlc3MoJ0Rvd24nKSxcclxuICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2soKSxcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCB7cmVmOiBcIm15R3JpZFJlZlwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29sdW1uLndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndGgtJyArIGNvbHVtbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndGgtJyArIGluZGV4LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKHRoaXMsIGNvbHVtbi5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93cy5tYXAoZnVuY3Rpb24gKHJvdywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNsYXNzID0gJ25vdEZvY3VzZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDbGFzcyA9ICdmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNlbGxDbGljay5iaW5kKHRoaXMsIGluZGV4KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBteUNsYXNzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkb2MtJyArIGluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY2VsbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHtrZXk6ICd0ZCcgKyBpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dbY2VsbC5pZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUdyaWQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkLmpzeFxuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgTXlCdXR0b24gPSByZXF1aXJlKCcuL215YnV0dG9uLmpzJyksXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBCdXR0b25BZGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdCdXR0b25BZGQnLFxuXG4gICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0FkZCcpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE15QnV0dG9uLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgYnV0dG9uVmFsdWU6ICdMaXNhICgrKScsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2sgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uQWRkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbmFkZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgTXlCdXR0b24gPSByZXF1aXJlKCcuL215YnV0dG9uLmpzJyksXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBCdXR0b25FZGl0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnQnV0dG9uRWRpdCcsXG5cbiAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcbiAgICAgICAgZmx1eC5kb0FjdGlvbignRWRpdCcpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlCdXR0b24sIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICBidXR0b25WYWx1ZTogJ011dWRhJyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25FZGl0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbmVkaXQuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIE15QnV0dG9uID0gcmVxdWlyZSgnLi9teWJ1dHRvbi5qcycpLFxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgQnV0dG9uRGVsZXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnQnV0dG9uRGVsZXRlJyxcblxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdEZWxldGUnKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE15QnV0dG9uLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgYnV0dG9uVmFsdWU6ICdLdXN0dXRhJyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25EZWxldGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uZGVsZXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBNeUJ1dHRvbiA9IHJlcXVpcmUoJy4vbXlidXR0b24uanMnKSxcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIEJ1dHRvblByaW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnQnV0dG9uRGVsZXRlJyxcblxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlCdXR0b24sIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICBidXR0b25WYWx1ZTogJ1Ryw7xraycsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2tcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUHJpbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9ucHJpbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogW3sgY29sdW1uOiAnaWQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XSxcbiAgICAgICAgc3FsV2hlcmU6ICcnLFxuICAgICAgICB0b29nbGVQYW5lbDogdHJ1ZSwgLy8gb3BlbmVkXG4gICAgICAgIHRvb2dsZVBhbmVsRGF0YTogeyB0cmVlOiAnMTAlJywgZ3JpZDogJzkwJScsIGxlZnQ6ICcxMyUnIH0gfSxcbiAgICAvLyBvcGVuZWRcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgc3FsV2hlcmVDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NxbFdoZXJlQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3FsV2hlcmU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0IH0pO1xuICAgICAgICB9LFxuICAgICAgICBzb3J0QnlDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0LCBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b29nbGVQYW5lbENoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlLCBkYXRhKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHRvb2dsZVBhbmVsOiB2YWx1ZSwgdG9vZ2xlUGFuZWxEYXRhOiBkYXRhIH0pO1xuICAgICAgICB9LFxuICAgICAgICBBZGQ6IGZ1bmN0aW9uICh1cGRhdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIExpc2EgY2xpa2VkIG5ldyEgJyArIHRoaXMuZG9jc0dyaWQpO1xuICAgICAgICAgICAgYWRkKHRoaXMuZG9jc0xpc3QpO1xuICAgICAgICB9LFxuICAgICAgICBFZGl0OiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBNdXVkYSBjbGlrZWQhJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ci0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0LjQu9C4INC00L7QutGD0LzQtdC90YIg0L3QtSDQstGL0LHRgNCw0L0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgRGVsZXRlOiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBEZWxldGUgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBQcmludDogZnVuY3Rpb24gKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gUHJpbnQgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VOYW1lOiBmdW5jdGlvbiAodXBkYXRlciwgbmFtZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3NHcmlkQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRvY3NHcmlkQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0dyaWQ6IHZhbHVlIH0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3NMaXN0Q2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzTGlzdDogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGFDaGFuZ2U6JywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkYXRhOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG5cbnZhciBlZGl0ID0gZnVuY3Rpb24gKGRvY1R5cGVJZCwgZG9jSWQpIHtcbiAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyBkb2NJZDtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xufTtcblxudmFyIGFkZCA9IGZ1bmN0aW9uIChkb2NUeXBlSWQpIHtcbiAgICBjb25zb2xlLmxvZygnQWRkJyk7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgJzAnO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgcmVxdWVyeSA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQv9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC+0YIg0YHQtdGA0LLQtdGA0LBcbiAgICAvLyBjb21wb25lbnQgPSB0aGlzLnN0YXRlLmNvbXBvbmVudHNbbmFtZV1cbiAgICAvLyDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGA0Ysg0L3QtSDQt9Cw0LTQsNC90YssINCz0YDRg9C30LjQvCDQstGB0LVcblxuICAgIC8vICAgIGNvbnNvbGUubG9nKCdyZXF1ZXJ5OicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnQpICsgJ2RvY3NTdG9yZS5kYXRhOicgKyBKU09OLnN0cmluZ2lmeShkb2NzU3RvcmUuZGF0YSkpO1xuXG4gICAgdmFyIGNvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YTtcblxuICAgIC8vINGE0LjQu9GM0YLRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgIHZhciBjb21wb25lbnRzRm9yVXBkYXRlID0gY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgLy8g0LjRidC10Lwg0L7QsdGK0LXQutGCINC/0L4g0L3QsNC40LzQtdC90L7QstCw0L3QuNGOLiDQuNC70Lgg0LLQtdGA0L3QtdC8INCy0YHQtSDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LfQsNC00LDQvVxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50OicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnQpKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09ICcnIHx8IGl0ZW0ubmFtZSA9PSBjb21wb25lbnQubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICB2YXIgc3FsU29ydEJ5ID0gJycsXG4gICAgICAgIHNxbFdoZXJlID0gZG9jc1N0b3JlLnNxbFdoZXJlIHx8ICcnO1xuICAgIHZhciBzb3J0QnlBcnJheSA9IGRvY3NTdG9yZS5zb3J0QnksXG4gICAgICAgIGFyclR5cGUgPSB0eXBlb2Ygc29ydEJ5QXJyYXk7XG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgVVJMID0gJy9hcGkvZG9jcyc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBVUkwsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgIGRvY1R5cGVJZDogMSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHNGb3JVcGRhdGUpLCAvLyDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0L7QsdC90L7QstC70LXQvdC40Y9cbiAgICAgICAgICAgIHBhcmFtZXRlcjogY29tcG9uZW50LnZhbHVlLCAvLyDQv9Cw0YDQsNC80LXRgtGA0YtcbiAgICAgICAgICAgIHNvcnRCeTogc3FsU29ydEJ5LCAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgICAgICAgICAgc3FsV2hlcmU6IHNxbFdoZXJlIH0sXG4gICAgICAgIC8vINC00LjQvdCw0LzQuNGH0LXRgdC60LjQuSDRhNC40LvRjNGC0YAg0LPRgNC40LTQsFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50IGFycml2ZWQgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAn0YLQuNC/OicgKyB0eXBlb2YgZGF0YSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3BhcmVudCBJdGVtOicgKyBKU09OLnN0cmluZ2lmeShpdGVtKSApO1xuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRhdGEgdXBkYXRlOicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgY29tcG9uZW50cyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3NTdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==
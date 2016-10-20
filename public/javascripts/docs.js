var docs =
webpackJsonp_name_([1,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// нрузим компоненты

	//var ReactDOM = require('react-dom');
	// создаем окласс - держатель состояний

	const Parent = __webpack_require__(140);

	// данные для хранилища
	localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);
	//console.log('storeData from docs', storeData);
	ReactDOM.render(React.createElement(Parent, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },

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

/***/ 7:
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

/***/ 8:
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

/***/ 9:
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

/***/ 26:
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

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	const React = __webpack_require__(4),
	    MyTree = __webpack_require__(141),
	    DataGrid = __webpack_require__(143),
	    ButtonRegister = __webpack_require__(153),
	    ModalPage = __webpack_require__(26),
	    ModalPageDelete = __webpack_require__(150),
	    ModalPageInfo = __webpack_require__(151),
	    flux = __webpack_require__(5);

	let  myComponents = [];

	if (!typeof window === 'undefined') {
	    // берем данные с локального хранилища
	    myComponents = JSON.parse(localStorage['docsStore']);
	}

	// Create a store
	var docsStore = __webpack_require__(148);

	// создаем окласс - держатель состояний
	var Parent = React.createClass({
	    displayName: 'Parent',

	    filterData:['btnOk', 'btnCancel'], // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

	    getInitialState: function getInitialState() {
	        return {
	            // у каждого компонента свой объект
	            components: this.props.components, // @todo вынести в отдельный файл компонента
	            gridLeft: '13%',
	            gridWidth: '90%',
	            getFilter: false,
	            getDeleteModalPage: false,
	            showSystemMessage: false

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

	        // создаем обработчик события системный извещение
	        docsStore.on('change:systemMessage', function(newValue, previousValue) {
	            // данные изменились, меняем состояние
	            let systemMessageStatus = newValue ? true : false;
	            self.setState({showSystemMessage:systemMessageStatus });
	        })

	    },

	    componentDidMount: function() {
	        // покажем данные

	        let lastComponent = localStorage['docsList'];
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
	        let components = this.state.components,
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

	    btnDeleteClick:function() {
	        this.setState({getDeleteModalPage: true})
	    },

	    btnAddClick:function() {
	        // обработчик события клик кнопки "Добавить"
	            // вызовем действия на флаксе
	            flux.doAction('Add');
	        },

	    btnEditClick:function() {
	        // обработчик события клик кнопки "Изменить"
	            // вызовем действия на флаксе
	            flux.doAction('Edit');
	        },

	    btnPrintClick:function() {
	        // обработчик события клик кнопки "Изменить"
	        // вызовем действия на флаксе
	        flux.doAction('Print');
	    },

	    render: function render() {
	        let  myListValue = '',
	            myListData = this.findComponent('docsList') || [],
	            myGrid = this.findComponent('docsGrid') || [],
	            myGridColums = [],
	            myGridData = [],
	            tooglePaneelData = flux.stores.docsStore.tooglePanelData,
	            systemMessage = flux.stores.docsStore.systemMessage,
	            gridLeft = '13%'; // @todo вынести в отдельную переменную

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
	                    React.createElement(ButtonRegister, {onClick: this.btnAddClick, value: " Add "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnEditClick, value: " Edit "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnDeleteClick, value: " Delete "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnPrintClick, value: " Print "}), 
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
	                        modalPageName: "Filter"
	                    }, " ", filterComponent, " "))
	                    : null, 
	                this.state.getDeleteModalPage ?
	                    (React.createElement(ModalPageDelete, {
	                        modalPageBtnClick: this.modalPageDelBtnClick}
	                    )) : null, 
	                this.state.showSystemMessage ?
	                    (React.createElement(ModalPageInfo, {
	                        modalPageBtnClick: this.modalPageInfoBtnClick, 
	                        systemMessage: systemMessage}
	                    )) : null

	            )

	        )
	    },

	    modalPageBtnClick: function(btnEvent) {
	        // обработчик для кнопки фильтрации
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

	    modalPageDelBtnClick:function(btnEvent) {
	        // обработчик вызова модального окна удаления
	        this.setState({getDeleteModalPage: false});

	        if (btnEvent == 'Ok') {
	            // вызовем действия на флаксе
	            flux.doAction('Delete');
	        }

	    },

	    modalPageInfoBtnClick:function() {

	        // обработчик вызова модального окна системного сообщения
	        this.setState({showSystemMessage: false});
	        // вызовем действия на флаксе
	        flux.doAction('systemMessageChange', null );

	    },

	    getFilterFields: function() {
	        // @todo вынести в отдельный модуль
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

	//                    console.log('componentObjekt:', componentObjektValue);
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

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    MyList = __webpack_require__(142);

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

/***/ 142:
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

/***/ 143:
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

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const flux = __webpack_require__(5);

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
	        tooglePanelData: { tree: '10%', grid: '90%', left: '13%' }, // opened,
	        systemMessage: null
	    },
	    actionCallbacks: {
	        systemMessageChange: function (updater, value) {
	            console.log('systemMessageChange called', value);
	            updater.set({ systemMessage: value });
	        },
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
	            let docTypeId = this.docsList;
	            requeryForAction('delete', (err, data) => {
	                if (err) {
	                    flux.doAction('systemMessageChange', err); // пишем изменения в хранилище
	                } else {
	                        flux.doAction('systemMessageChange', null); // пишем изменения в хранилище
	                        requery({ name: 'docsGrid', value: docTypeId });
	                    }
	            });
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
	    var url = "/document/" + docTypeId + '0';
	    document.location.href = url;
	};

	var requeryForAction = (action, callback) => {

	    // метод обеспечит запрос на выполнение
	    let parameters = {
	        docId: docsStore.docsGrid,
	        doc_type_id: docsStore.docsList
	    };

	    $.ajax({
	        url: '/api/doc',
	        type: "POST",
	        dataType: 'json',
	        data: {
	            action: action,
	            data: JSON.stringify(parameters)
	        },
	        cache: false,
	        success: function (data) {
	            // должны получить объект - результат
	            let errorMesssage = null;
	            if (data.result == 'Error') {
	                errorMesssage = 'Error, ' + data.message;
	            }
	            callback(errorMesssage, data);
	        },
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	            callback(err, null);
	        }
	    });
	};

	var requery = function (component) {
	    // метод обеспечит получение данных от сервера
	    // component = this.state.components[name]
	    // если параметры не заданы, грузим все

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

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(26);

	const ModalPageDelete  = function(props) {
	    let modalObjects = ['btnOk', 'btnCancel'];

	    return React.createElement(ModalPage, {
	        modalPageBtnClick: props.modalPageBtnClick, 
	        modalPageName: "Delete document"
	    }, 
	        React.createElement("div", {style: {padding:50}}, 
	            React.createElement("span", null, " Удалить документ ? ")
	        )
	        )
	}

	module.exports = ModalPageDelete ;

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(26);

	const ModalPageDelete  = function(props) {
	    let systemMessage = props.systemMessage ? props.systemMessage: '',
	        modalObjects = ['btnOk'];

	    return React.createElement(ModalPage, {
	        modalPageBtnClick: props.modalPageBtnClick, 
	        modalPageName: "Warning!", 
	        modalObjects: modalObjects

	    }, 
	        React.createElement("div", {style: {padding:50}}, 
	            React.createElement("span", null, " ", systemMessage, " ")
	        )
	    )
	}

	module.exports = ModalPageDelete ;


/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4);

	const ButtonRegister = function(props)  {
	// кнопка создания документа в регистрах
	        return React.createElement("input", {type: "button", 
	                      className: "gridToolbar", 
	                      value: props.value, 
	                      onClick: props.onClick})
	};

	ButtonRegister.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired
	}

	module.exports = ButtonRegister;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L2ZsdXhpZnkuanM/Y2RmMiIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzP2E5OGIiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanM/NzIwOCIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hFbWl0dGVyLmpzP2M3NzYiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94VXRpbHMuanM/ZDU1MSIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZS5qc3g/NTFhMCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teXRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlRGVsZXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZUluZm8uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vLyDQvdGA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcblxuLy92YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbi8vINGB0L7Qt9C00LDQtdC8INC+0LrQu9Cw0YHRgSAtINC00LXRgNC20LDRgtC10LvRjCDRgdC+0YHRgtC+0Y/QvdC40LlcblxuY29uc3QgUGFyZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4Jyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG5sb2NhbFN0b3JhZ2VbJ2RvY3NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuLy9jb25zb2xlLmxvZygnc3RvcmVEYXRhIGZyb20gZG9jcycsIHN0b3JlRGF0YSk7XG5SZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChQYXJlbnQsIHsgaWQ6ICdncmlkJywgY29tcG9uZW50czogc3RvcmVEYXRhIH0sICfQotGD0YIg0LHRg9C00YPRgiDQutC+0LzQv9C+0L3QtdC90YLRiycpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZCcpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvZG9jcy5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9zcmMveERpc3BhdGNoZXInKSxcbiAgICBYU3RvcmUgPSByZXF1aXJlKCcuL3NyYy94U3RvcmUnKTtcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIEZsdXhpZnkgY2xhc3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24uXHJcbiAqIEluaXRpYWxpemVzIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgc3RvcmUuXHJcbiAqIEFsc28gc2V0IHRoZSBQcm9taXNlIG9iamVjdCBpZiBpdCBpcyBnbG9iYWxseSBhdmFpbGFibGUuXHJcbiAqL1xudmFyIEZsdXhpZnkgPSBmdW5jdGlvbiAoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGlzcGF0Y2hlcicsIHtcblx0XHR2YWx1ZTogbmV3IFhEaXNwYXRjaGVyKClcblx0fSk7XG5cblx0dGhpcy5zdG9yZXMgPSB7fTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLnByb21pc2lmeShQcm9taXNlKTtcblx0fVxufTtcblxuRmx1eGlmeS5wcm90b3R5cGUgPSB7XG5cdC8qKlxyXG4gICogQ3JlYXRlIGEgbmV3IHN0b3JlLiBJZiBhbiBpZCBpcyBwYXNzZWQgaW4gdGhlIG9wdGlvbnMsXHJcbiAgKiB0aGUgc3RvcmUgd2lsbCBiZSByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyIGFuZCBzYXZlZFxyXG4gICogaW4gZmx1eGlmeS5zdG9yZXNbaWRdLlxyXG4gICpcclxuICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyB7aWQsIGluaXRpYWxTdGF0ZSwgYWN0aW9uQ2FsbGJhY2t9XHJcbiAgKiBAcmV0dXJuIHtYU3RvcmV9XHJcbiAgKi9cblx0Y3JlYXRlU3RvcmU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIHN0b3JlID0gbmV3IFhTdG9yZShvcHRpb25zKTtcblxuXHRcdC8vIElmIHRoZSBzdG9yZSBoYXMgYW4gaWQsIHJlZ2lzdGVyIGl0IGluIEZsdXhpZnkgYW5kIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0aWYgKHN0b3JlLl9pZCkge1xuXHRcdFx0dGhpcy5zdG9yZXNbc3RvcmUuX2lkXSA9IHN0b3JlO1xuXHRcdFx0dGhpcy5kaXNwYXRjaGVyLnJlZ2lzdGVyU3RvcmUoc3RvcmUuX2lkLCBzdG9yZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRXhlY3V0ZXMgYW4gYWN0aW9uLiBUaGUgYXJndW1lbnRzIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGVcclxuICAqIGZvciB0aGUgYWN0aW9uIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyLlxyXG4gICogQHJldHVybiB7IFByb21pc2UgfSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrc1xyXG4gICogICAgICAgICAgICAgICAgICAgaGF2ZSBmaW5pc2hlZC5cclxuICAqL1xuXHRkb0FjdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2guYXBwbHkodGhpcy5kaXNwYXRjaGVyLCBhcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSWYgRVM2IFByb21pc2Ugb2JqZWN0IGlzIG5vdCBkZWZpbmVkIGdsb2JhbGx5IG9yIHBvbHlmaWxsZWQsIGEgUHJvbWlzZSBvYmplY3RcclxuICAqIGNhbiBiZSBnaXZlbiB0byBmbHV4aWZ5IGluIG9yZGVyIHRvIG1ha2UgaXQgd29yaywgdXNpbmcgdGhpcyBtZXRob2QuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7IFByb21pc2UgfSBQcm9taXNlIEVTNiBQcm9taXNlIGNvbXBhdGlibGUgb2JqZWN0XHJcbiAgKiBAcmV0dXJuIHsgdW5kZWZpbmVkIH1cclxuICAqL1xuXHRwcm9taXNpZnk6IGZ1bmN0aW9uIChQcm9taXNlKSB7XG5cdFx0dGhpcy5fUHJvbWlzZSA9IFByb21pc2U7XG5cdFx0dGhpcy5kaXNwYXRjaGVyLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmx1eGlmeSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvZmx1eGlmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG4vKipcclxuICogVGhlIGFzeW5jaHJvbm91cyBkaXNwYXRjaGVyIGNvbXBhdGlibGUgd2l0aCBGYWNlYm9vaydzIGZsdXggZGlzcGF0Y2hlclxyXG4gKiBodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL2ZsdXgvZG9jcy9kaXNwYXRjaGVyLmh0bWxcclxuICpcclxuICogRGlzcGF0Y2ggYWN0aW9ucyB0byB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3MsIHRob3NlIGFjdGlvbiBjYW4gYmVcclxuICogYXN5bmNocm9ub3VzIGlmIHRoZXkgcmV0dXJuIGEgUHJvbWlzZS5cclxuICovXG5cbnZhciBYRGlzcGF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdHRoaXMuX2Rpc3BhdGNoUXVldWUgPSBbXTtcblx0dGhpcy5fY3VycmVudERpc3BhdGNoID0gZmFsc2U7XG5cdHRoaXMuX0lEID0gMTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuWERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nIHwgRnVuY3Rpb259ICAgaWQgIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB0aGUgaWQgb2YgdGhlIGNhbGxiYWNrLlxyXG4gICogICAgICAgICAgICAgICAgICBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrLCBhbmQgaWQgaXMgZ2VuZXJhdGVkXHJcbiAgKiAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHkuXHJcbiAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgSWYgYW4gaWQgaXMgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQsIHRoaXMgd2lsbCBiZSB0aGUgY2FsbGJhY2suXHJcbiAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIElEID0gaWQ7XG5cblx0XHQvLyBJZiB0aGUgY2FsbGJhY2sgaXMgdGhlIGZpcnN0IHBhcmFtZXRlclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0SUQgPSAnSURfJyArIHRoaXMuX0lEO1xuXHRcdFx0Y2FsbGJhY2sgPSBpZDtcblx0XHR9XG5cblx0XHR0aGlzLl9jYWxsYmFja3NbSURdID0gY2FsbGJhY2s7XG5cdFx0dGhpcy5fSUQrKztcblxuXHRcdHJldHVybiBJRDtcblx0fSxcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgWFN0b3JlIGluIHRoZSBkaXNwYWNoZXIuIFhTdG9yZXMgaGFzIGEgbWV0aG9kIGNhbGxlZCBjYWxsYmFjay4gVGhlIGRpc3BhdGNoZXJcclxuICAqIHJlZ2lzdGVyIHRoYXQgZnVuY3Rpb24gYXMgYSByZWd1bGFyIGNhbGxiYWNrLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgIFRoZSBpZCBmb3IgdGhlIHN0b3JlIHRvIGJlIHVzZWQgaW4gdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICogQHBhcmFtICB7WFN0b3JlfSB4U3RvcmUgU3RvcmUgdG8gcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcclxuICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlclN0b3JlOiBmdW5jdGlvbiAoaWQsIHhTdG9yZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHhTdG9yZSwgJ19kaXNwYXRjaGVyJywge1xuXHRcdFx0dmFsdWU6IHRoaXNcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLnJlZ2lzdGVyKGlkLCB4U3RvcmUuY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogVW5yZWdpc3RlciBhIGNhbGxiYWNrIGdpdmVuIGl0cyBpZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIENhbGxiYWNrL1N0b3JlIGlkXHJcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgKi9cblx0dW5yZWdpc3RlcjogZnVuY3Rpb24gKGlkKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tpZF07XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBDcmVhdGVzIGEgcHJvbWlzZSBhbmQgd2FpdHMgZm9yIHRoZSBjYWxsYmFja3Mgc3BlY2lmaWVkIHRvIGNvbXBsZXRlIGJlZm9yZSByZXNvbHZlIGl0LlxyXG4gICogSWYgaXQgaXMgdXNlZCBieSBhbiBhY3Rpb25DYWxsYmFjaywgdGhlIHByb21pc2Ugc2hvdWxkIGJlIHJlc29sdmVkIHRvIGxldCBvdGhlciBjYWxsYmFja3NcclxuICAqIHdhaXQgZm9yIGl0IGlmIG5lZWRlZC5cclxuICAqXHJcbiAgKiBCZSBjYXJlZnVsIG9mIG5vdCB0byB3YWl0IGJ5IGEgY2FsbGJhY2sgdGhhdCBpcyB3YWl0aW5nIGJ5IHRoZSBjdXJyZW50IGNhbGxiYWNrLCBvciB0aGVcclxuICAqIHByb21pc2VzIHdpbGwgbmV2ZXIgZnVsZmlsbC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmc8QXJyYXk+fFN0cmluZ30gaWRzIFRoZSBpZCBvciBpZHMgb2YgdGhlIGNhbGxiYWNrcy9zdG9yZXMgdG8gd2FpdCBmb3IuXHJcbiAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQgd2hlbiB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrcyBhcmUgY29tcGxldGVkLlxyXG4gICovXG5cdHdhaXRGb3I6IGZ1bmN0aW9uIChpZHMpIHtcblx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHQgICAgaSA9IDA7XG5cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cblx0XHRmb3IgKDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuX3Byb21pc2VzW2lkc1tpXV0pIHByb21pc2VzLnB1c2godGhpcy5fcHJvbWlzZXNbaWRzW2ldXSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFwcm9taXNlcy5sZW5ndGgpIHJldHVybiB0aGlzLl9Qcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9Qcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiB0byBhbGwgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzL3N0b3Jlcy5cclxuICAqXHJcbiAgKiBJZiBhIHNlY29uZCBhY3Rpb24gaXMgZGlzcGF0Y2hlZCB3aGlsZSB0aGVyZSBpcyBhIGRpc3BhdGNoIG9uLCBpdCB3aWxsIGJlXHJcbiAgKiBlbnF1ZXVlZCBhbiBkaXNwYXRjaGVkIGFmdGVyIHRoZSBjdXJyZW50IG9uZS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRkaXNwYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIGRpc3BhdGNoQXJndW1lbnRzID0gYXJndW1lbnRzLFxuXHRcdCAgICBwcm9taXNlLFxuXHRcdCAgICBkZXF1ZXVlO1xuXG5cdFx0aWYgKCF0aGlzLl9Qcm9taXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBwcm9taXNlcy4nKTtcblxuXHRcdC8vIElmIHdlIGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2gsIGVucXVldWUgdGhlIGRpc3BhdGNoXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREaXNwYXRjaCkge1xuXG5cdFx0XHQvLyBEaXNwYXRjaCBhZnRlciB0aGUgY3VycmVudCBvbmVcblx0XHRcdHByb21pc2UgPSB0aGlzLl9jdXJyZW50RGlzcGF0Y2gudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBtZS5fZGlzcGF0Y2guYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBFbnF1ZXVlLCBzZXQgdGhlIGNoYWluIGFzIHRoZSBjdXJyZW50IHByb21pc2UgYW5kIHJldHVyblxuXHRcdFx0dGhpcy5fZGlzcGF0Y2hRdWV1ZS5wdXNoKHByb21pc2UpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IHByb21pc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IHRoaXMuX2Rpc3BhdGNoLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiBpbm1lZGlhdGVsbHkuXHJcbiAgKlxyXG4gICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdF9kaXNwYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIGRpc3BhdGNoQXJndW1lbnRzID0gYXJndW1lbnRzLFxuXHRcdCAgICBwcm9taXNlcyA9IFtdO1xuXG5cdFx0dGhpcy5fcHJvbWlzZXMgPSBbXTtcblxuXHRcdC8vIEEgY2xvc3VyZSBpcyBuZWVkZWQgZm9yIHRoZSBjYWxsYmFjayBpZFxuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2NhbGxiYWNrcykuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblxuXHRcdFx0Ly8gQWxsIHRoZSBwcm9taXNlcyBtdXN0IGJlIHNldCBpbiBtZS5fcHJvbWlzZXMgYmVmb3JlIHRyeWluZyB0byByZXNvbHZlXG5cdFx0XHQvLyBpbiBvcmRlciB0byBtYWtlIHdhaXRGb3Igd29yayBva1xuXHRcdFx0bWUuX3Byb21pc2VzW2lkXSA9IG1lLl9Qcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG1lLl9jYWxsYmFja3NbaWRdLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrIHx8IGVycik7XG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvbWlzZXMucHVzaChtZS5fcHJvbWlzZXNbaWRdKTtcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0dmFyIGRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtZS5fZGlzcGF0Y2hRdWV1ZS5zaGlmdCgpO1xuXHRcdFx0aWYgKCFtZS5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGgpIG1lLl9jdXJyZW50RGlzcGF0Y2ggPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRlcXVldWUsIGRlcXVldWUpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSXMgdGhpcyBkaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICovXG5cdGlzRGlzcGF0Y2hpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aDtcblx0fVxuXG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhEaXNwYXRjaGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBYRW1pdHRlciA9IHJlcXVpcmUoJy4veEVtaXR0ZXInKSxcbiAgICB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgU3RvcmUgPSBYRW1pdHRlci5fZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHByb3BzKSB7XG5cdFx0aWYgKCFwcm9wcykgcmV0dXJuIHRoaXMucHJvcHMgPSB7fTtcblxuXHRcdHRoaXMucHJvcHMgPSB7fTtcblx0XHRmb3IgKHZhciBwIGluIHByb3BzKSB0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbiAocHJvcCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzW3Byb3BdO1xuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG5cdFx0dmFyIHByb3BzID0gcHJvcCxcblx0XHQgICAgdXBkYXRlcyA9IFtdLFxuXHRcdCAgICBwcmV2aW91c1ZhbHVlLFxuXHRcdCAgICBwO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0cHJvcHMgPSB7fTtcblx0XHRcdHByb3BzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIHByb3BzKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twXSAhPSBwcm9wc1twXSkge1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlID0gdGhpcy5wcm9wc1twXTtcblx0XHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdFx0XHR1cGRhdGVzLnB1c2goe1xuXHRcdFx0XHRcdHByb3A6IHAsXG5cdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZTogcHJvcHNbcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHVwZGF0ZXMubGVuZ3RoKSB0aGlzLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHR9XG59KTtcblxudmFyIFhTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIG9wdHMgPSBvcHRpb25zIHx8IHt9LFxuXHRcdCAgICBzdG9yZSA9IG5ldyBTdG9yZShvcHRzLmluaXRpYWxTdGF0ZSksXG5cdFx0ICAgIGFjdGlvblR5cGUsXG5cdFx0ICAgIHN0YXRlUHJvcDtcblxuXHRcdC8vIFN0b3JlIGlkXG5cdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2lkJywge1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5pZFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVnaXN0ZXIgYWN0aW9uIGNhbGxiYWNrcyBpbiB0aGUgc3RvcmVcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRfY2FsbGJhY2tzOiB7XG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB7fVxuXHRcdFx0fSxcblx0XHRcdGFkZEFjdGlvbkNhbGxiYWNrczoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGNsYmtzKSB7XG5cdFx0XHRcdFx0Zm9yIChhY3Rpb25UeXBlIGluIGNsYmtzKSB7XG5cdFx0XHRcdFx0XHRtZS5fY2FsbGJhY2tzW2FjdGlvblR5cGVdID0gY2xia3NbYWN0aW9uVHlwZV0uYmluZCh0aGlzLCBzdG9yZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsYmFjayBmb3IgcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRcdGNhbGxiYWNrOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGFjdGlvblR5cGUgPSBhcmd1bWVudHNbMF0sXG5cdFx0XHRcdFx0ICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdKSB7XG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2tzIGFyZSBhbHJlYWR5IGJvdW5kIHRvIHRoaXMgeFN0b3JlIGFuZCB0aGUgbXV0YWJsZSBzdG9yZVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1thY3Rpb25UeXBlXS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZEFjdGlvbkNhbGxiYWNrcyhvcHRzLmFjdGlvbkNhbGxiYWNrcyB8fCB7fSk7XG5cblx0XHQvLyBDcmVhdGUgaW5tbXV0YWJsZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIGFkZFByb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BOYW1lLCB2YWx1ZSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBwcm9wTmFtZSwge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RvcmUuZ2V0KHByb3BOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGlmIChvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0Zm9yIChzdGF0ZVByb3AgaW4gb3B0cy5pbml0aWFsU3RhdGUpIHtcblx0XHRcdFx0YWRkUHJvcGVydHkoc3RhdGVQcm9wLCBvcHRzLmluaXRpYWxTdGF0ZVtzdGF0ZVByb3BdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBFbWl0IG9uIHN0b3JlIGNoYW5nZVxuXHRcdHN0b3JlLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAodXBkYXRlcykge1xuXHRcdFx0dmFyIHVwZGF0ZXNMZW5ndGggPSB1cGRhdGVzLmxlbmd0aCxcblx0XHRcdCAgICB1cGRhdGUsXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHVwZGF0ZXNMZW5ndGg7IGkrKykge1xuXHRcdFx0XHR1cGRhdGUgPSB1cGRhdGVzW2ldO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBuZXcsIGFkZCBpdCB0byB0aGUgeFN0b3JlXG5cdFx0XHRcdGlmICghbWUuaGFzT3duUHJvcGVydHkodXBkYXRlLnByb3ApKSBhZGRQcm9wZXJ0eSh1cGRhdGUucHJvcCwgdXBkYXRlLnZhbHVlKTtcblxuXHRcdFx0XHRtZS5lbWl0KCdjaGFuZ2U6JyArIHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUsIHVwZGF0ZS5wcmV2aW91c1ZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0bWUuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0Z2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBDbG9uZSB0aGUgc3RvcmUgcHJvcGVydGllc1xuXHRcdHJldHVybiB4VXRpbHMuX2V4dGVuZCh7fSwgdGhpcyk7XG5cdH0sXG5cblx0d2FpdEZvcjogZnVuY3Rpb24gKGlkcykge1xuXHRcdC8vIFRoZSB4RGlzcGF0Y2hlciBhZGRzIGl0c2VsZiBhcyBhIHByb3BlcnR5XG5cdFx0Ly8gd2hlbiB0aGUgeFN0b3JlIGlzIHJlZ2lzdGVyZWRcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci53YWl0Rm9yKGlkcyk7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhTdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHhVdGlscyA9IHJlcXVpcmUoJy4veFV0aWxzJyk7XG5cbi8vI2J1aWxkXG5cbnZhciBYRW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZXZlbnRzJywge1xuXHRcdHZhbHVlOiB7fVxuXHR9KTtcblxuXHRpZiAodHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSAnZnVuY3Rpb24nKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbi8vIFRoZSBwcm90b3R5cGUgbWV0aG9kcyBhcmUgc3RvcmVkIGluIGEgZGlmZmVyZW50IG9iamVjdFxuLy8gYW5kIGFwcGxpZWQgYXMgbm9uIGVudW1lcmFibGUgcHJvcGVydGllcyBsYXRlclxudmFyIGVtaXR0ZXJQcm90b3R5cGUgPSB7XG5cdG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lciwgb25jZSkge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblxuXHRcdGxpc3RlbmVycy5wdXNoKHsgY2FsbGJhY2s6IGxpc3RlbmVyLCBvbmNlOiBvbmNlIH0pO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b25jZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHR0aGlzLm9uKGV2ZW50TmFtZSwgbGlzdGVuZXIsIHRydWUpO1xuXHR9LFxuXG5cdG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbGlzdGVuZXIgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gbGlzdGVuZXIpIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuXHRcdCAgICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHQgICAgb25jZUxpc3RlbmVycyA9IFtdLFxuXHRcdCAgICBpLFxuXHRcdCAgICBsaXN0ZW5lcjtcblxuXHRcdC8vIENhbGwgbGlzdGVuZXJzXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG5cblx0XHRcdGlmIChsaXN0ZW5lci5jYWxsYmFjaykgbGlzdGVuZXIuY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncyk7ZWxzZSB7XG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIG5vdCBhIGNhbGxiYWNrLCByZW1vdmUhXG5cdFx0XHRcdGxpc3RlbmVyLm9uY2UgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobGlzdGVuZXIub25jZSkgb25jZUxpc3RlbmVycy5wdXNoKGkpO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBsaXN0ZW5lcnMgbWFya2VkIGFzIG9uY2Vcblx0XHRmb3IgKGkgPSBvbmNlTGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKG9uY2VMaXN0ZW5lcnNbaV0sIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuXG4vLyBFdmVudEVtaXR0ZXIgbWV0aG9kc1xueFV0aWxzLl9leHRlbmQoZW1pdHRlclByb3RvdHlwZSwge1xuXHRhZGRMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vbixcblx0cmVtb3ZlTGlzdGVuZXI6IGVtaXR0ZXJQcm90b3R5cGUub2ZmLFxuXHRyZW1vdmVBbGxMaXN0ZW5lcnM6IGVtaXR0ZXJQcm90b3R5cGUub2ZmLFxuXHRlbWl0OiBlbWl0dGVyUHJvdG90eXBlLnRyaWdnZXJcbn0pO1xuXG4vLyBNZXRob2RzIGFyZSBub3QgZW51bWVyYWJsZSBzbywgd2hlbiB0aGUgc3RvcmVzIGFyZVxuLy8gZXh0ZW5kZWQgd2l0aCB0aGUgZW1pdHRlciwgdGhleSBjYW4gYmUgaXRlcmF0ZWQgYXNcbi8vIGhhc2htYXBzXG5YRW1pdHRlci5wcm90b3R5cGUgPSB7fTtcbmZvciAodmFyIG1ldGhvZCBpbiBlbWl0dGVyUHJvdG90eXBlKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYRW1pdHRlci5wcm90b3R5cGUsIG1ldGhvZCwge1xuXHRcdHZhbHVlOiBlbWl0dGVyUHJvdG90eXBlW21ldGhvZF1cblx0fSk7XG59XG5cbi8vIEV4dGVuZCBtZXRob2QgZm9yICdpbmhlcml0YW5jZScsIG5vZCB0byBiYWNrYm9uZS5qc1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLCAnX2V4dGVuZCcsIHtcblx0dmFsdWU6IGZ1bmN0aW9uIChwcm90b1Byb3BzKSB7XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMsXG5cdFx0ICAgIGNoaWxkO1xuXG5cdFx0aWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eShjb25zdHJ1Y3RvcikpIHtcblx0XHRcdGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3Rvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0eFV0aWxzLl9leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cblx0XHR2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gQWdhaW4gdGhlIGNvbnN0cnVjdG9yIGlzIGFsc28gZGVmaW5lZCBhcyBub3QgZW51bWVyYWJsZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicsIHtcblx0XHRcdFx0dmFsdWU6IGNoaWxkXG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXHRcdGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuXHRcdC8vIEFsbCB0aGUgZXh0ZW5kaW5nIG1ldGhvZHMgbmVlZCB0byBiZSBhbHNvXG5cdFx0Ly8gbm9uIGVudW1lcmFibGUgcHJvcGVydGllc1xuXHRcdGlmIChwcm90b1Byb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHByb3RvUHJvcHMpIHtcblx0XHRcdFx0aWYgKHAgIT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZC5wcm90b3R5cGUsIHAsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm90b1Byb3BzW3BdXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRW1pdHRlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG52YXIgeFV0aWxzID0ge1xuXHQvLyBPYmplY3QgZXh0ZW5kLCBOb2QgdG8gdW5kZXJzY29yZS5qc1xuXHRfZXh0ZW5kOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0dmFyIHNvdXJjZSwgcHJvcDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRmb3IgKHByb3AgaW4gc291cmNlKSBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSB4VXRpbHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eGlmeS9zcmMveFV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IG1vZGFsUGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJtb2RhbFBhZ2VcIixcclxuICAgIGhhbmRsZUJ0bkNsaWNrOiBmdW5jdGlvbihidG5FdmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMubW9kYWxQYWdlQnRuQ2xpY2soYnRuRXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBtb2RhbFBhZ2VOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiAnZGVmYXVsTmFtZScsXHJcbiAgICAgICAgICAgIG1vZGFsT2JqZWN0czogWydidG5PaycsICdidG5DYW5jZWwnXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaGlkZUJ0bk9rID0gIHRoaXMucHJvcHMubW9kYWxPYmplY3RzLmluZGV4T2YoJ2J0bk9rJykgPT0gLTEgPyBmYWxzZTogdHJ1ZSwgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0Lkg0J7QulxyXG4gICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID0gIHRoaXMucHJvcHMubW9kYWxPYmplY3RzLmluZGV4T2YoJ2J0bkNhbmNlbCcpID09IC0xID8gZmFsc2U6IHRydWU7IC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQvtC5IENhbmNlbFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwibW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcIm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwiaGVhZGVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2lkOiBcImhlYWRlck5hbWVcIn0sIFwiIFwiLCB0aGlzLnByb3BzLm1vZGFsUGFnZU5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcIm1vZGFsUGFnZUNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuT2sgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzLCdPaycpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtb2RhbFBhZ2VCdXR0b25zXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnRuT2tcIn0sIFwiIE9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcywnQ2FuY2VsJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5DYW5jZWxcIn0sIFwiIENhbmNlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbFBhZ2U7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlLmpzeFxuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8g0LPRgNGD0LfQuNC8INC60L7QvNC/0L7QvdC10L3RgtGLXHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBNeVRyZWUgPSByZXF1aXJlKCcuL215dHJlZScpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEJ1dHRvblJlZ2lzdGVyID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIE1vZGFsUGFnZURlbGV0ZSA9IHJlcXVpcmUoJy4vbW9kYWxQYWdlRGVsZXRlLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlSW5mbyA9IHJlcXVpcmUoJy4vbW9kYWxQYWdlSW5mby5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5sZXQgIG15Q29tcG9uZW50cyA9IFtdO1xyXG5cclxuaWYgKCF0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgLy8g0LHQtdGA0LXQvCDQtNCw0L3QvdGL0LUg0YEg0LvQvtC60LDQu9GM0L3QvtCz0L4g0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICBteUNvbXBvbmVudHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10pO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yZVxyXG52YXIgZG9jc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LrQu9Cw0YHRgSAtINC00LXRgNC20LDRgtC10LvRjCDRgdC+0YHRgtC+0Y/QvdC40LlcclxudmFyIFBhcmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGFyZW50JyxcclxuXHJcbiAgICBmaWx0ZXJEYXRhOlsnYnRuT2snLCAnYnRuQ2FuY2VsJ10sIC8vINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyLCDQutGD0LTQsCDQt9Cw0L/QuNGI0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4IEB0b2RvINCy0YvQvdC10YHRgtC4INCy0YHQtSDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LrQvtC80L/QvtC90LXRgiDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyDRgyDQutCw0LbQtNC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdCy0L7QuSDQvtCx0YrQtdC60YJcclxuICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5wcm9wcy5jb21wb25lbnRzLCAvLyBAdG9kbyDQstGL0L3QtdGB0YLQuCDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0YTQsNC50Lsg0LrQvtC80L/QvtC90LXQvdGC0LBcclxuICAgICAgICAgICAgZ3JpZExlZnQ6ICcxMyUnLFxyXG4gICAgICAgICAgICBncmlkV2lkdGg6ICc5MCUnLFxyXG4gICAgICAgICAgICBnZXRGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2VcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2NvbXBvbmVudHM6ZG9jc1N0b3JlLmRhdGF9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0YHQstC+0YDQsNGH0LjQstCw0L3QuNC1INC/0LDQvdC10LvQtdC5XHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6dG9vZ2xlUGFuZWwnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgdG9vZ2xlRGF0YSA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS50b29nbGVQYW5lbERhdGE7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkTGVmdDp0b29nbGVEYXRhLmxlZnQsZ3JpZFdpZHRoOnRvb2dsZURhdGEud2lkdGggfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDRgdC40YHRgtC10LzQvdGL0Lkg0LjQt9Cy0LXRidC10L3QuNC1XHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6c3lzdGVtTWVzc2FnZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBsZXQgc3lzdGVtTWVzc2FnZVN0YXR1cyA9IG5ld1ZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtzaG93U3lzdGVtTWVzc2FnZTpzeXN0ZW1NZXNzYWdlU3RhdHVzIH0pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XHJcblxyXG4gICAgICAgIGxldCBsYXN0Q29tcG9uZW50ID0gbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdkYXRhQ2hhbmdlJywgdGhpcy5wcm9wcy5jb21wb25lbnRzICk7XHJcbiAgICAgICAgaWYgKGxhc3RDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0xpc3RDaGFuZ2UnLGxhc3RDb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICsgJyBWUyAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpO1xyXG4gICAgIHZhciByZXR1cm5WYWx1ZSA9IChKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSApO1xyXG4gICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICB9LFxyXG5cclxuICAgICAqL1xyXG4gICAgZmluZENvbXBvbmVudDogZnVuY3Rpb24oY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQtNCw0L3QvdGL0LUg0LrQvtC80L/QvtC90LXQvdGC0LAg0L/QviDQtdCz0L4g0L3QsNC30LLQsNC90LjRjlxyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09IGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnRuRmlsdGVyQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdGCINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDRgSDQv9C+0LvRj9C80Lgg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RmlsdGVyOiB0cnVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgYnRuRGVsZXRlQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RGVsZXRlTW9kYWxQYWdlOiB0cnVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgYnRuQWRkQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JTQvtCx0LDQstC40YLRjFwiXHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignQWRkJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICBidG5FZGl0Q2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRWRpdCcpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgYnRuUHJpbnRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignUHJpbnQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0ICBteUxpc3RWYWx1ZSA9ICcnLFxyXG4gICAgICAgICAgICBteUxpc3REYXRhID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBteUdyaWQgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NHcmlkJykgfHwgW10sXHJcbiAgICAgICAgICAgIG15R3JpZENvbHVtcyA9IFtdLFxyXG4gICAgICAgICAgICBteUdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHRvb2dsZVBhbmVlbERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUudG9vZ2xlUGFuZWxEYXRhLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGdyaWRMZWZ0ID0gJzEzJSc7IC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YPRjiDQv9C10YDQtdC80LXQvdC90YPRjlxyXG5cclxuICAgICAgICBpZiAobXlMaXN0RGF0YS5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBteUxpc3RWYWx1ZSA9IG15TGlzdERhdGFbMF0udmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG4gICAgICAgIGlmIChteUdyaWQubGVuZ3RoID4gMCAmJiBteUdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15R3JpZENvbHVtcyA9IG15R3JpZFswXS5kYXRhWzBdLmNvbHVtbnM7XHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBteUdyaWRbMF0uZGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGZpbHRlckNvbXBvbmVudDtcclxuICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZ2V0RmlsdGVyKSAge1xyXG4gICAgICAgICAgICAgZmlsdGVyQ29tcG9uZW50ID0gIHRoaXMuZ2V0RmlsdGVyRmllbGRzKCk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG15TGlzdERhdGEubGVuZ3RoID4gMCAmJiAgbXlMaXN0RGF0YVswXS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbXlMaXN0RGF0YSA9ICBteUxpc3REYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcInBhcmVudERpdlwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE15VHJlZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IFwiZG9jc0xpc3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbXlMaXN0RGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG15TGlzdFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzTGlzdENoYW5nZVwifSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwiZ3JpZFRvb2xCYXJcIn0sIFwiVG9vbGJhclwiLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25SZWdpc3Rlciwge29uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHZhbHVlOiBcIiBBZGQgXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25SZWdpc3Rlciwge29uQ2xpY2s6IHRoaXMuYnRuRWRpdENsaWNrLCB2YWx1ZTogXCIgRWRpdCBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvblJlZ2lzdGVyLCB7b25DbGljazogdGhpcy5idG5EZWxldGVDbGljaywgdmFsdWU6IFwiIERlbGV0ZSBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvblJlZ2lzdGVyLCB7b25DbGljazogdGhpcy5idG5QcmludENsaWNrLCB2YWx1ZTogXCIgUHJpbnQgXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJncmlkVG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5idG5GaWx0ZXJDbGlja1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiIEZpbHRlciBcIilcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwiZ3JpZFRhYmxlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOnRvb2dsZVBhbmVlbERhdGEuZ3JpZCwgbGVmdDogdG9vZ2xlUGFuZWVsRGF0YS5sZWZ0fVxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YTogbXlHcmlkRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiBteUdyaWRDb2x1bXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzR3JpZENoYW5nZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImFwaVwifVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5nZXRGaWx0ZXIgP1xyXG4gICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRmlsdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICB9LCBcIiBcIiwgZmlsdGVyQ29tcG9uZW50LCBcIiBcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RGVsZXRlTW9kYWxQYWdlID9cclxuICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2VEZWxldGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlRGVsQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgKSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2hvd1N5c3RlbU1lc3NhZ2UgP1xyXG4gICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlSW5mb0J0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtTWVzc2FnZTogc3lzdGVtTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICApKSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdmFyIGZpbHRlclN0cmluZyA9ICcnO1xyXG4gICAgICAgIGlmIChidG5FdmVudCA9ICdPaycpIHtcclxuICAgICAgICAgICAgICAgIC8vINGB0L7QsdC40YDQtdC8INC00LDQvdC90YvQtSDQsiDQvtCx0YrQtdC60YIg0Lgg0LLQtdGA0L3QtdC8INC90LAg0YTQvtGA0LzRg1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEubWFwKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgICAgICByb3cudmFsdWUgPSB0aGlzLnJlZnNbcm93LnJlZnNdLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIjogXCIgd2hlcmUgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnJVwiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICdcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSAnXCIgKyByb3cudmFsdWUgKyBcIidcIiA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gXCIgKyByb3cudmFsdWUgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGFsUGFnZUJ0bkNsaWNrLCBmaWx0ZXJTdHJpbmcgJywgZmlsdGVyU3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzcWxXaGVyZUNoYW5nZScsIGZpbHRlclN0cmluZyApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXRGaWx0ZXI6IGZhbHNlfSlcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlRGVsQnRuQ2xpY2s6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQstGL0LfQvtCy0LAg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAg0YPQtNCw0LvQtdC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldERlbGV0ZU1vZGFsUGFnZTogZmFsc2V9KTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdEZWxldGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VJbmZvQnRuQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRgdC40YHRgtC10LzQvdC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93U3lzdGVtTWVzc2FnZTogZmFsc2V9KTtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwgKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpbHRlckZpZWxkczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LIg0L7RgtC00LXQu9GM0L3Ri9C5INC80L7QtNGD0LvRjFxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgdGCINC40Lcg0L/QvtC70LrQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB2YXIgZ3JpZENvbXBvbmVudHMgPSAgZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZ3JpZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPVxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEubWFwKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3NGaWx0ZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8IFwi0YHRgtCw0YDQvtC1XCIg0LfQvdCw0YfQtdC90LjQtSDRhNC40LvRjNGC0YDQsCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YLQviDQvtGC0LTQsNC10Lwg0LXQs9C+IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW9zRmlsdGVyW2ldLnJlZnMgPT0gcm93LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHByZXZpb3NGaWx0ZXJbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50T2JqZWt0OicsIGNvbXBvbmVudE9iamVrdFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA9IHJvdy50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCx0LXRgNC10Lwg0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEucHVzaCh7bmFtZTpyb3cubmFtZSwgdmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGwsIHR5cGU6Y29tcG9uZW50VHlwZSwgcmVmczogcm93LmlkfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2tleTogaW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCByb3cubmFtZSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb3cubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBjb21wb25lbnRPYmpla3RWYWx1ZSB8fCBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBmaWx0ZXJGaWVsZHMpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlckZpZWxkcztcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4XG4gKiogbW9kdWxlIGlkID0gMTQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIE15TGlzdCA9IHJlcXVpcmUoJy4vbXlsaXN0LmpzJyk7XG5cbnZhciBNeVRyZWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdNeVRyZWUnLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdteSB0cmVlIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBpZDogJ3RyZWUnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlMaXN0LCB7XG4gICAgICAgICAgICBzb3VyY2VBcnJheTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogdGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiB9KSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlUcmVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215dHJlZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbmNvbnN0IFRPT0dMRVBBTkVMT1BFTkVEID0geyB0cmVlOiAnMTAlJywgZ3JpZDogJzkwJScsIGxlZnQ6ICcxMyUnIH0sXG4gICAgICBUT09HTEVQQU5FTENMT1NFRCA9IHsgdHJlZTogJzElJywgZ3JpZDogJzEwMCUnLCBsZWZ0OiAnMCcgfTtcblxudmFyIE15TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015TGlzdCcsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNvdXJjZUFycmF5OiB0aGlzLnByb3BzLnNvdXJjZUFycmF5LFxuICAgICAgICAgICAgaXNDaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaWNrZWQ6IDk5OTk5OTk5LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjbGlja2VkOiB0aGlzLmdldEluZGV4QnlDb21wb25lbnQodGhpcy5wcm9wcy52YWx1ZSksXG4gICAgICAgICAgICBjaG9vc2VuRG9jVHlwZUlkOiB0aGlzLnByb3BzLnZhbHVlIHx8ICcnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xpY2tlZDogOTk5OTk5OTksXG4gICAgICAgICAgICBjaG9vc2VuRG9jVHlwZUlkOiAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRJbmRleEJ5Q29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQuNC90LTQtdC60YEg0LrQvtC80L/QvtC90LXQvdGC0LAg0L/QviDQtdCz0L4g0LrQvtC00YMgICBcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIGNvbXBvbmVudEFycmF5ID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheTtcblxuICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEFycmF5W2ldWydrb29kJ10gPT0gY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50QXJyYXkuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyb3cua29vZCA9PSAnY29tcG9uZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHJvdy5pZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEluZGV4QnlDb21wb25lbnQgaW5kZXgnLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZG9jc0xpc3QnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgZmx1eC5zdG9yZXMuZG9jc1N0b3JlLm9uKGNoYW5nZTpkb2NzTGlzdCknLCBuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSwgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddKTtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSAmJiBwcmV2aW91c1ZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0YPQtNCw0LvRj9C10Lwg0LzQtdGC0LrRgyDQuNC90LTQtdC60YHQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQtNC+0LrRg9C80LXQvdGCINC40LfQvNC10L3QuNC70YHRjycpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY2xpY2tlZCA9PSA5OTk5OTk5OSkge1xuICAgICAgICAgICAgLy8g0L3QtSDRg9GB0YLQsNC90L7QstC70LXQvSDQtdGJ0LXQsSDQvtGC0LzQtdGC0LjQvCDQv9C+0YHQu9C10LTQvdC5INCy0YvQsdC+0YBcbiAgICAgICAgICAgIHZhciBsYXN0Q29tcG9uZW50ID0gbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleEJ5Q29tcG9uZW50KGxhc3RDb21wb25lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUxpQ2xpY2soaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZUxpQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUxpQ2xpY2soaWR4KSB7XG4gICAgICAgIHZhciBteUFycmF5ID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheSxcbiAgICAgICAgICAgIGNob29zZW5Eb2NUeXBlID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheVtpZHhdW1wiaWRcIl0sXG4gICAgICAgICAgICBjaG9vc2VuQ29kZSA9IHRoaXMucHJvcHMuc291cmNlQXJyYXlbaWR4XVtcImtvb2RcIl07XG4gICAgICAgIC8v0YHRgtCw0LLQuNC8INC80LXRgtC60YNcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xpY2tlZDogaWR4LFxuICAgICAgICAgICAgY2hvb3NlbkRvY1R5cGVJZDogY2hvb3NlbkRvY1R5cGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgZmx1eC5kb0FjdGlvbih0aGlzLnByb3BzLm9uQ2hhbmdlQWN0aW9uLCBjaG9vc2VuQ29kZSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUJ1dHRvbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVCdXR0b25DbGljaygpIHtcbiAgICAgICAgdmFyIGdyaWRUb29nbGVXaWR0aCA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS50b29nbGVQYW5lbERhdGE7XG4gICAgICAgIC8vINC/0YDQuCDQutC70LjQutC1INC/0L7QutCw0LfRi9Cy0LDQtdC8INC40LvQuCDRgdC60YDRi9Cy0LDQtdGCINC60L7QvNC/0L7QvdC10L3RglxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogIXRoaXMuc3RhdGUuaXNDaGVja2VkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyaWRUb29nbGVXaWR0aCA9IHRoaXMuc3RhdGUuaXNDaGVja2VkID8gVE9PR0xFUEFORUxPUEVORUQgOiBUT09HTEVQQU5FTENMT1NFRDtcbiAgICAgICAgZmx1eC5kb0FjdGlvbigndG9vZ2xlUGFuZWxDaGFuZ2UnLCB0aGlzLnN0YXRlLmlzQ2hlY2tlZCwgZ3JpZFRvb2dsZVdpZHRoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBteUFycmF5ID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheTtcbiAgICAgICAgdmFyIG15U3R5bGUgPSB0aGlzLnN0YXRlLmlzQ2hlY2tlZCA/ICdub25lJyA6ICdibG9jayc7IC8vINC/0YDRj9GH0LXRgiDRgdC/0LjRgdC+0LpcbiAgICAgICAgdmFyIG15R3JpZFN0eWxlID0gJ2Jsb2NrJztcbiAgICAgICAgdmFyIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5jbGlja2VkO1xuXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdteUxpc3QgcmVuZGVyIHN0YXRlJywgdGhpcy5zdGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKG15QXJyYXkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIG15QXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAga29vZDogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbXlBcnJheSA9IG15QXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIG15Q2xhc3MgPSAnbGlEb2NMaWJzJztcblxuICAgICAgICAgICAgdmFyIGxpYiA9IGl0ZW07XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIG15Q2xhc3MgPSBteUNsYXNzICsgJyBmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdsaScsIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdsaWItJyArIGluZGV4LFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbXlDbGFzcyxcbiAgICAgICAgICAgICAgICBzdHlsZTogeyBkaXNwbGF5OiBteVN0eWxlIH0sXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpXG4gICAgICAgICAgICB9LCBsaWIubmFtZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHZhciByb290ID0gUmVhY3QuY3JlYXRlRWxlbWVudCgndWwnLCB7IG9uRXZlbnQ6IHRoaXMub25FdmVudCB9LCBteUFycmF5KTtcbiAgICAgICAgdmFyIGRvY0xpYnNEaXYgPSBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3RyZWVEb2NzJywgc3R5bGU6IHsgZGlzcGxheTogbXlTdHlsZSB9LCBpZDogJ3RyZWVEb2NzJyB9LCByb290KTtcbiAgICAgICAgdmFyIGJ1dHRvblZhbHVlID0gdGhpcy5zdGF0ZS5pc0NoZWNrZWQgPyAnKycgOiAnLSc7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGlkOiAndHJlZVRvb2xCYXInIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogYnV0dG9uVmFsdWUsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrXG4gICAgICAgIH0pKSwgZG9jTGlic0Rpdik7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlMaXN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215bGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG52YXIgRGF0YUdyaWQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ0RhdGFHcmlkJyxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBncmlkQ29sdW1uczogdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMucHJvcHMuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBpZiAobmV4dFByb3BzLmdyaWREYXRhKSB7XHJcbiAgICAgICAgIHZhciBkb2NJZCA9ICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10sXHJcbiAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRHcmlkUm93SW5kZXhCeUlkKGRvY0lkKTtcclxuXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJywgaW5kZXgsIGRvY0lkKTtcclxuICAgICAgICAgdGhpcy5oYW5kbGVDZWxsQ2xpY2soaW5kZXgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgICovXHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcblxyXG4gICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICB2YXIgcmV0dXJuVmFsdWUgPSAoSlNPTi5zdHJpbmdpZnkobmV4dFN0YXRlKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkgKTtcclxuICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgfSxcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbi8qXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkIGNvbXBvbmVudERpZE1vdW50Jyxsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gKTtcclxuXHJcbiAgICAgICAgIC8vINC40YnQtdC8INC/0L7RgdC70LXQtNC90Y7RjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY2xpY2tlZCA9PSAwKSB7XHJcbiAgICAgICAgIC8vINC+0YLQvNC10YLQuNC8INC/0L7RgdC70LXQtNC90LjQuSDQvtGC0LzQtdGH0LXQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgIHZhciBkb2NJZCA9ICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10sXHJcbiAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRHcmlkUm93SW5kZXhCeUlkKGRvY0lkKTtcclxuXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkIGNvbXBvbmVudERpZE1vdW50Jyxkb2NJZCxpbmRleCApO1xyXG5cclxuICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2xpY2tlZDogaW5kZXh9KTtcclxuICAgICAgICAgfVxyXG4qL1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDQv9C+0LLQtdGB0LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XHJcblxyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0YHQu9C10LTQvdGO0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10YLQuNC8INC/0L7RgdC70LXQtNC90LjQuSDQvtGC0LzQtdGH0LXQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcblxyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdteSBncmlkIG9uIGNoYW5nZSBsaXN0ICcsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKVxyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBbXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2VsZi5nZXRHcmlkUm93SW5kZXhCeUlkKGRvY0lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtjbGlja2VkOiBpbmRleH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRHcmlkUm93SW5kZXhCeUlkOiBmdW5jdGlvbiAoZG9jSWQpIHtcclxuICAgICAgICAvLyDQuNGJ0LXQvCDQuNC90LTQtdGFINCyINC80LDRgdGB0LjQstC1INC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmdyaWREYXRhO1xyXG4gICAgICAgIGlmIChkb2NJZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3cgPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdyAmJiBkYXRhW2ldWydpZCddID09IGRvY0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbENsaWNrOiBmdW5jdGlvbiBoYW5kbGVDZWxsQ2xpY2soaWR4KSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdCw0YLRi9Cy0LDQtdGCINGB0L7QsdGL0YLQuCDQutC70LjQutCwINC/0L4g0Y/Rh9C10LnQutC1XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmlkRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkb2NJZCA9IHRoaXMucHJvcHMuZ3JpZERhdGFbaWR4XS5pZDtcclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnbXlHcmlkIGhhbmRsZUNlbGxDbGljazonLCBpZHgsIGRvY0lkLCB0aGlzLnByb3BzLmdyaWREYXRhKTtcclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbih0aGlzLnByb3BzLm9uQ2hhbmdlQWN0aW9uLCBkb2NJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDZWxsRGJsQ2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXRgiDQvNC10YLQvtC0INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRIZWFkZXJDbGljazogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgc29ydEJ5ID0gW3tjb2x1bW46IG5hbWUsIGRpcmVjdGlvbjogJ2FzYyd9XTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdzb3J0QnlDaGFuZ2UnLCBzb3J0QnkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVLZXlEb3duOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vINGA0LXQsNC60YbQuNGPINC90LAg0LrQu9Cw0LLQuNCw0YLRg9GA0YNcclxuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlS2V5UHJlc3MgJywgZSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgaWYgKGtleURpcmVjdGlvbiA9PSAnRG93bicpIHtcclxuICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgIGNsaWNrZWQ6ICh0aGlzLnN0YXRlLmNsaWNrZWQgKyAxKVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCByZW5kZXIgY2FsbGVkJyk7XHJcbiAgICAgICAgdmFyIGdyaWRSb3dzID0gdGhpcy5wcm9wcy5ncmlkRGF0YTsgLy8g0YHRgtCw0YLQuNGH0L3RiyDQuCDQv9GA0LjRhdC+0LTRj9GCINGC0L7Qu9GM0LrQviDQuNC3INCy0LXRgNGF0L3QtdCz0L4g0LrQvtC80L/QvtC90LXQvdGC0LBcclxuICAgICAgICB2YXIgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zO1xyXG4gICAgICAgIHZhciBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuY2xpY2tlZDtcclxuXHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICd0aCcsXHJcbiAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8qICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlQcmVzcygnRG93bicpLFxyXG4gICAgICAgICBvbkRvdWJsZUNsaWNrOiB0aGlzLmhhbmRsZUNlbGxEYmxDbGljaygpLFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIHtyZWY6IFwibXlHcmlkUmVmXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb2x1bW4ud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICd0aC0nICsgY29sdW1uLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBncmlkU3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICd0aC0nICsgaW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEhlYWRlckNsaWNrLmJpbmQodGhpcywgY29sdW1uLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dzLm1hcChmdW5jdGlvbiAocm93LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q2xhc3MgPSAnbm90Rm9jdXNlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW0gPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNsYXNzID0gJ2ZvY3VzZWQnOyAvLyDQv9C+0LTRgdCy0LXRgtC40Lwg0LLRi9Cx0YDQsNC90L3Rg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbENsaWNrLmJpbmQodGhpcywgaW5kZXgpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG15Q2xhc3MsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2RvYy0nICsgaW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjZWxsLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwge2tleTogJ3RkJyArIGluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1tjZWxsLmlkXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhR3JpZDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQuanN4XG4gKiogbW9kdWxlIGlkID0gMTQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogW3sgY29sdW1uOiAnaWQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XSxcbiAgICAgICAgc3FsV2hlcmU6ICcnLFxuICAgICAgICB0b29nbGVQYW5lbDogdHJ1ZSwgLy8gb3BlbmVkXG4gICAgICAgIHRvb2dsZVBhbmVsRGF0YTogeyB0cmVlOiAnMTAlJywgZ3JpZDogJzkwJScsIGxlZnQ6ICcxMyUnIH0sIC8vIG9wZW5lZCxcbiAgICAgICAgc3lzdGVtTWVzc2FnZTogbnVsbFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHN5c3RlbU1lc3NhZ2VDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UgY2FsbGVkJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzeXN0ZW1NZXNzYWdlOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3FsV2hlcmVDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NxbFdoZXJlQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3FsV2hlcmU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0IH0pO1xuICAgICAgICB9LFxuICAgICAgICBzb3J0QnlDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0LCBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b29nbGVQYW5lbENoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlLCBkYXRhKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHRvb2dsZVBhbmVsOiB2YWx1ZSwgdG9vZ2xlUGFuZWxEYXRhOiBkYXRhIH0pO1xuICAgICAgICB9LFxuICAgICAgICBBZGQ6IGZ1bmN0aW9uICh1cGRhdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIExpc2EgY2xpa2VkIG5ldyEgJyArIHRoaXMuZG9jc0dyaWQpO1xuICAgICAgICAgICAgYWRkKHRoaXMuZG9jc0xpc3QpO1xuICAgICAgICB9LFxuICAgICAgICBFZGl0OiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBNdXVkYSBjbGlrZWQhJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ci0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0LjQu9C4INC00L7QutGD0LzQtdC90YIg0L3QtSDQstGL0LHRgNCw0L0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgRGVsZXRlOiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgbGV0IGRvY1R5cGVJZCA9IHRoaXMuZG9jc0xpc3Q7XG4gICAgICAgICAgICByZXF1ZXJ5Rm9yQWN0aW9uKCdkZWxldGUnLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgZXJyKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBudWxsKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IGRvY1R5cGVJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFByaW50OiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBQcmludCBjbGlrZWQhJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZU5hbWU6IGZ1bmN0aW9uICh1cGRhdGVyLCBuYW1lKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0dyaWRDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY3NHcmlkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzTGlzdENoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkYXRhQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhQ2hhbmdlOicsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGF0YTogdmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG52YXIgZWRpdCA9IGZ1bmN0aW9uIChkb2NUeXBlSWQsIGRvY0lkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgZG9jSWQ7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbn07XG5cbnZhciBhZGQgPSBmdW5jdGlvbiAoZG9jVHlwZUlkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgJzAnO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IChhY3Rpb24sIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIGxldCBwYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jc1N0b3JlLmRvY3NMaXN0XG4gICAgfTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZG9jJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW1ldGVycylcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8g0LTQvtC70LbQvdGLINC/0L7Qu9GD0YfQuNGC0Ywg0L7QsdGK0LXQutGCIC0g0YDQtdC30YPQu9GM0YLQsNGCXG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQgPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc3NhZ2UgPSAnRXJyb3IsICcgKyBkYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvck1lc3NzYWdlLCBkYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIC8vINC80LXRgtC+0LQg0L7QsdC10YHQv9C10YfQuNGCINC/0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0L7RgiDRgdC10YDQstC10YDQsFxuICAgIC8vIGNvbXBvbmVudCA9IHRoaXMuc3RhdGUuY29tcG9uZW50c1tuYW1lXVxuICAgIC8vINC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YDRiyDQvdC1INC30LDQtNCw0L3Riywg0LPRgNGD0LfQuNC8INCy0YHQtVxuXG4gICAgdmFyIGNvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YTtcblxuICAgIC8vINGE0LjQu9GM0YLRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgIHZhciBjb21wb25lbnRzRm9yVXBkYXRlID0gY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgLy8g0LjRidC10Lwg0L7QsdGK0LXQutGCINC/0L4g0L3QsNC40LzQtdC90L7QstCw0L3QuNGOLiDQuNC70Lgg0LLQtdGA0L3QtdC8INCy0YHQtSDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LfQsNC00LDQvVxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50OicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnQpKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09ICcnIHx8IGl0ZW0ubmFtZSA9PSBjb21wb25lbnQubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICB2YXIgc3FsU29ydEJ5ID0gJycsXG4gICAgICAgIHNxbFdoZXJlID0gZG9jc1N0b3JlLnNxbFdoZXJlIHx8ICcnO1xuICAgIHZhciBzb3J0QnlBcnJheSA9IGRvY3NTdG9yZS5zb3J0QnksXG4gICAgICAgIGFyclR5cGUgPSB0eXBlb2Ygc29ydEJ5QXJyYXk7XG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgVVJMID0gJy9hcGkvZG9jcyc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBVUkwsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgIGRvY1R5cGVJZDogMSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHNGb3JVcGRhdGUpLCAvLyDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0L7QsdC90L7QstC70LXQvdC40Y9cbiAgICAgICAgICAgIHBhcmFtZXRlcjogY29tcG9uZW50LnZhbHVlLCAvLyDQv9Cw0YDQsNC80LXRgtGA0YtcbiAgICAgICAgICAgIHNvcnRCeTogc3FsU29ydEJ5LCAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgICAgICAgICAgc3FsV2hlcmU6IHNxbFdoZXJlIH0sXG4gICAgICAgIC8vINC00LjQvdCw0LzQuNGH0LXRgdC60LjQuSDRhNC40LvRjNGC0YAg0LPRgNC40LTQsFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50IGFycml2ZWQgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAn0YLQuNC/OicgKyB0eXBlb2YgZGF0YSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3BhcmVudCBJdGVtOicgKyBKU09OLnN0cmluZ2lmeShpdGVtKSApO1xuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRhdGEgdXBkYXRlOicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgY29tcG9uZW50cyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3NTdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG5jb25zdCBNb2RhbFBhZ2VEZWxldGUgID0gZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgIGxldCBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddO1xyXG5cclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBwcm9wcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJEZWxldGUgZG9jdW1lbnRcIlxyXG4gICAgfSwgXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtwYWRkaW5nOjUwfX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIiDQo9C00LDQu9C40YLRjCDQtNC+0LrRg9C80LXQvdGCID8gXCIpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGUgO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZURlbGV0ZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG5jb25zdCBNb2RhbFBhZ2VEZWxldGUgID0gZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgIGxldCBzeXN0ZW1NZXNzYWdlID0gcHJvcHMuc3lzdGVtTWVzc2FnZSA/IHByb3BzLnN5c3RlbU1lc3NhZ2U6ICcnLFxyXG4gICAgICAgIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snXTtcclxuXHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogcHJvcHMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiV2FybmluZyFcIiwgXHJcbiAgICAgICAgbW9kYWxPYmplY3RzOiBtb2RhbE9iamVjdHNcclxuXHJcbiAgICB9LCBcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge3BhZGRpbmc6NTB9fSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFwiLCBzeXN0ZW1NZXNzYWdlLCBcIiBcIilcclxuICAgICAgICApXHJcbiAgICApXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlRGVsZXRlIDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlSW5mby5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IEJ1dHRvblJlZ2lzdGVyID0gZnVuY3Rpb24ocHJvcHMpICB7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJncmlkVG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNsaWNrfSlcclxufTtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyLmpzeFxuICoqIG1vZHVsZSBpZCA9IDE1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDelVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
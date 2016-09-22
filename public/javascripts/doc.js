var doc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

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


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var ReactDOM = __webpack_require__(1);
	/*
	    React = require('react'),
	    flux = require('fluxify'),
	    docComponent = '';
	*/

	// данные для хранилища
	localStorage['docStore'] = storeData;
	storeData = JSON.parse(storeData);

	// создаем обработчик события на изменение даннх
	/*
	docStore.on('change:data', function(newValue, previousValue) {
	    if (newValue !== previousValue) {
	        // данные изменились, меняем состояние
	        self.setState({docData:docStore.data})
	    }
	})
	*/

	// запросим компонент документа по его типу
	const Doc = __webpack_require__(2)(storeData.docTypeId);
	console.log('storeData: Doc', Doc);

	ReactDOM.render(React.createElement(Doc, { data: storeData.data, bpm: storeData.bpm }), document.getElementById('doc'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'ARV':
	            component = __webpack_require__(3);
	            break;
	        case 'JOURNAL':
	            component = __webpack_require__(30);
	            break;
	        case 'SORDER':
	            component = __webpack_require__(32);
	            break;
	        case 'VORDER':
	            component = __webpack_require__(34);
	            break;
	        case 'PALK':
	            component = __webpack_require__(35);
	            break;
	        default:
	            component = __webpack_require__(3);
	    }
	    return component;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	//    InputNumber = require('../components/doc-input-number.jsx'),
	    Toolbar = __webpack_require__(14),
	    DocCommon = __webpack_require__(18),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(24);

	// Create a store
	var docStore = __webpack_require__(27);

	var relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

	var now = new Date();

	const Arve = React.createClass({displayName: "Arve",
	    pages: [{pageName: 'Arve'}],
	    requiredFields: [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name:'tahtaeg', type:'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name:'asutusid', type:'N'},
	        {name:'summa', type:'N'}
	    ],

	    mixins: [relatedDocuments, validateForm],

	    getInitialState: function () {
	        // установим изначальные данные
	        return {
	            docData: this.props.data.row,
	            edited: false,
	            showMessageBox: 'none',
	            gridData: this.props.data.details,
	            relations: this.props.data.relations,
	            gridConfig: this.props.data.gridConfig,
	            gridRowEdit: false,
	            gridRowEvent:null,
	            gridRowData:null
	        };
	    },
	    
	    componentWillMount: function () {
	        // пишем исходные данные в хранилище, регистрируем обработчики событий
	        var self = this,
	            data = self.props.data.row,
	            details = self.props.data.details,
	            gridConfig = self.props.data.gridConfig;
	        
	        // формируем зависимости
	        this.relatedDocuments();
	        // сохраняем данные в хранилище
	        flux.doAction('dataChange', data );
	 //       flux.doAction('bpmChange', bpm);
	//        flux.doAction('docIdChange', data.id);
	        flux.doAction('detailsChange', details); // данные грида
	        flux.doAction('gridConfigChange', gridConfig); // данные грида
	        flux.doAction('gridName', 'arv-grid-row'); // задаем имя компонента строки грида (для редактирования

	/*
	        // создаем обработчик события на изменение даннх
	        docStore.on('change:docId', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // данные изменились, меняем состояние
	                var data = docStore.data,
	                    isEdited = !self.state.edited;

	            }
	        });
	*/

	        // отслеживаем режим редактирования
	        docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({edited: newValue});
	            }
	        });

	        // отслеживает изменения данных в гриде
	        docStore.on('change:details', function (newValue, previousValue) {
	            if (JSON.stringify(newValue) !== JSON.stringify(previousValue) && typeof newValue == 'array') {
	                // итоги
	                let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма счета
	                    kbm = newValue.reduce(function(sum, row)  {return sum + Number(row.kbm);},0), // сумма налога
	                    docData = self.state.docData;

	                docData.summa = summa;
	                docData.kbm = kbm;

	                self.setState({gridData: newValue, docData: docData});
	            }
	        });
	    },

	    componentDidMount: function () {
	        // грузим справочники
	        flux.doAction('loadLibs', '');

	        // если новый документ (id == 0)
	        var data = this.state.docData;

	        if (data.id == 0) {
	            flux.doAction( 'editedChange', true );
	            flux.doAction( 'savedChange', false );
	        }

	    },

	    render: function () {
	        var data = this.state.docData,
	            isEditeMode = this.state.edited;
	//            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

	        //  pattern='[A-Za-z]{3}'
	        var gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig;

	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validateForm, 
	                         taskList: data.bpm, 
	                         documentStatus: data.doc_status}
	                ), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                            React.createElement(InputText, {className: "ui-c2", title: "Number", name: "number", value: data.number, 
	                                   readOnly: !isEditeMode})
	                                ), 
	                            React.createElement("li", null, 
	                            React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                       placeholder: "Kuupäev", readOnly: !isEditeMode})
	                                ), 
	                            React.createElement("li", null, 
	                            React.createElement(InputDate, {className: "ui-c2", title: "Tähtaeg ", name: "tahtaeg", value: data.tahtaeg, ref: "tahtaeg", 
	                                       placeholder: "Tähtaeg", readOnly: !isEditeMode})
	                                ), 
	                            
	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Asutus", name: "asutusid", libs: "asutused", 
	                                value: data.asutusid, defaultValue: data.asutus, placeholder: "Asutus", ref: "asutusid", 
	                                readOnly: !isEditeMode})
	                            ), 
	                        React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Lisa ", name: "lisa", value: data.lisa, placeholder: "Lisa", 
	                                   ref: "lisa", readOnly: !isEditeMode})
	                        ), 
	                        React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", ref: "muud", 
	                                  value: data.muud, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                  handleGridRow: this.handleGridRow, 
	                                  readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", ref: "summa", 
	                                   value: data.summa, disabled: "true", 
	                                   pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), " ", /* патерн для цифр с 4 знаками после точки*/
	                        React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Käibemaks ", name: "kbm", placeholder: "Käibemaks", ref: "kbm", 
	                                   value: data.kbm, 
	                                   pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), " "/* патерн для цифр с 4 знаками после точки*/
	                        )
	                    ), 

	                        this.state.gridRowEdit ?
	                            React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                     gridEvent: this.state.gridRowEvent, 
	                                     gridRowData: this.state.gridRowData}) : null

	                    )
	            )
	        );
	    },

	    handleGridRow: function(gridEvent, data) {
	        // управление модальным окном
	        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
	    },
	    
	    modalPageClick: function (btnEvent, data) {
	        // отработаем Ok из модального окна
	        var gridData = flux.stores.docStore.details,
	            docData = flux.stores.docStore.data,
	            gridRowId = flux.stores.docStore.gridRowId,
	            gridColumns = flux.stores.docStore.gridConfig;
	            var gridRow = {};

	        if (gridRowId >= 0) {
	            gridRow = gridData[gridRowId];
	        }

	        if (btnEvent == 'Ok') {
	            if (gridRowId < 0) {
	                // новая запись
	                // формируем пустую строку
	                gridRow = {};
	                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {return gridRow[field.name] = field.value;});

	            // заполним поля kood, nimetus
	            var libs = flux.stores.docStore.libs,
	                nomLib = libs.filter(function(data)  {
	                    if (data.id == 'nomenclature') {
	                        return data;
	                    }
	                });

	            // поставим значение код и наменование в грид
	            var   nomRow = nomLib[0].data.filter(function(row) {
	                    if (row.id == Number(gridRow.nomid)) {
	                        return row;
	                    }
	                });
	            if (nomRow) {
	                gridRow['kood'] = nomRow[0].kood;
	                gridRow['nimetus'] = nomRow[0].name;
	            }

	            if (gridRowId > 0) {
	                gridData[gridRowId] = gridRow;
	            } else {
	                gridData.push(gridRow); // добавляем строку
	                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
	            }
	            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
	        }

	        // считаем итоги

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма счета
	            docKbm = gridData.reduce(function(sum, row)  {return sum + Number(row.kbm);},0), // сумма налога
	            docKbmta = docSumma - docKbm;

	        docData.summa = docSumma;
	        docData.kbm = docKbm;
	        docData.kbmta = docKbmta;

	        this.refs['DataGrid'].replaceState({gridData:gridData });
	        this.setState({gridRowEdit: false,docData: docData});

	    }

	});

	module.exports = Arve;


	//             <MessageBox message="Удалить запись?" show={showMessageBox} onClick={this.handleClick} />
	//                 <DocButtonDelete onClick={this.handleClick}> Delete </DocButtonDelete>


/***/ },
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const PageLabel = __webpack_require__(11);

	const Form = React.createClass({
	    displayName: 'Form',

	    getInitialState: function getInitialState() {
	        var pages = [{ pageName: 'Page' }];
	        if (this.props.pages) {
	            pages = this.props.pages;
	        }
	        return {
	            pages: this.props.pages
	        };
	    },

	    render: function render() {
	        var pages = this.state.pages;
	        return React.createElement('div', { className: 'container' }, pages.map(function (page, idx) {
	            return React.createElement(PageLabel, { key: idx, pageIdx: idx }, page);
	        }), React.createElement('div', { className: 'page' }, React.createElement('form', null, this.props.children)));
	    }
	});

	module.exports = Form;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var PageLabel = React.createClass({
	    displayName: 'PageLabel',
	    getInitialState: function () {
	        return {
	            disabled: false
	        };
	    },

	    componentWillMount: function () {
	        var self = this;
	        //      console.log('page label componentWillMount')
	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            self.setState({ disabled: newValue });
	        });
	    },

	    handleClick: function handleClick(page) {
	        // обработчик на событие клик, подгружаем связанный документ
	        //       alert('click:' + pageName);
	        // docTypeId: doc.doc_type, docId:doc.id, pageName:'Lausend id:' + doc.id

	        if (this.state.disabled) {
	            console.log('page disabled');
	            return;
	        }

	        if (page.docId) {
	            console.log('handleClick page.docTypeId %s, page.docId %n');
	            var url = "/document/" + page.docTypeId + page.docId;
	            document.location.href = url;
	        }
	    },

	    render: function () {
	        var className = 'pageLabel';

	        return React.createElement('label', { className: className, onClick: this.handleClick.bind(this, this.props.children), disabled: this.state.disabled }, this.props.children.pageName, ' ');
	    }
	});

	module.exports = PageLabel;

/***/ },
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const InputDate = React.createClass({displayName: "InputDate",
	    getInitialState: function() {
	        return {
	            value: this.props.value, 
	            readOnly: true, 
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },

	    getDefaultProps: function () {

	        var date = new Date(),
	            year = date.getFullYear(),
	            month = date.getMonth(),
	            day = date.getDate(),
	            maxDate = new Date(year + 1, month, day),
	            minDate = new Date(year - 1, month, day);

	        return {
	            bindData: true,
	            min: minDate,
	            max: maxDate
	        };
	    },

	    componentWillReceiveProps: function(nextProps) {
	        this.setState({value:nextProps.value })
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;
	//        console.log('componentWillMount' + this.props.name);
	/*
	        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // отслеживаем создание нового документа
	                /!*
	                var data = flux.stores.docStore.data,
	                    value = data[self.props.name];

	                if (newValue == 0) {
	                    // новый документ
	                    self.setState({value:0});
	                } else {
	                    self.setState({value:value});
	                }
	*!/
	            }
	        });
	*/

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	 //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue});
	            }
	        });

	        /*
	         flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	         console.log('on change:data:' + newValue);
	         if (newValue !== previousValue) {

	         var data = newValue,
	         fieldValue = data[self.props.name];

	         self.setState({value: fieldValue});
	         }
	         });

	         */

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
	 //       console.log('date render states:',this.state);
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
	                    React.createElement("label", {htmlFor: this.props.name}, " ", this.props.title
	                    ), 

	                    React.createElement("input", {type: "date", 
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
	                    React.createElement("label", {htmlFor: this.props.name}, " ", this.props.title, 
	                    React.createElement("input", {type: "date", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           min: this.props.min, 
	                           max: this.props.max, 
	                           onChange: this.onChange}
	                    )
	                    )
	                ))
	        }
	    }
	});

	module.exports = InputDate;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const DOCUMENT_CLOSED_STATUS = 2;

	var React = __webpack_require__(4),
	    DocButtonAdd = __webpack_require__(15),
	    DocButtonEdit = __webpack_require__(16),
	//    DocButtonDelete = require('../components/doc-button-delete.jsx'),
	    DocButtonSave = __webpack_require__(17),
	    flux = __webpack_require__(5);


	//    DocButtonPrint = require('../components/doc-button-print.jsx')

	var Toolbar = React.createClass({displayName: "Toolbar",
	    getInitialState: function() {
	      return {warning: false, warningMessage: '', editMode: false,
	          taskList: this.props.taskList? this.props.taskList: this.getDefaultTask() }
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                self.setState({editMode:!newValue});
	            }
	        });

	/*
	        flux.stores.docStore.on('change:bpm', function(newValue, previousValue) {
	            console.log('change:bpm', newValue);
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                let data = flux.stores.docStore.data;
	                if (data.bpm) {
	                    var tasks = newValue.filter(task => {
	                        console.log('change:bpm filter', task)
	                        if (task.status == 'opened' )  {
	                            return task
	                        }});

	                    self.setState({taskList:tasks});
	                }
	            }
	        });
	*/

	    },

	    handleSelectTask: function(e) {
	        // метод вызывается при выборе задачи
	        var taskValue = e.target.value;
	    },

	    handleButtonTask: function() {
	        // метод вызывается при выборе задачи
	        // найдем актуальную задачу

	        let actualTask = this.state.taskList.filter(function(task) {
	           if (task.actualStep) {
	               return task;
	           }
	        }),
	        task = actualTask.map(function(task)  {return task.action}); // оставим только название процедуры

	        flux.doAction('executeTask', task);
	    },

	    render: function () {
	        var editeMode = this.state.editMode,
	            documentStatus = this.props.documentStatus,
	            isClosedStatus = documentStatus == DOCUMENT_CLOSED_STATUS ? true : false,
	            taskWidget = this.generateTaskWidget(),
	            tasks = this.state.taskList.map(function(task)  {return task.action});

	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {className: "doc-toolbar-warning"}, 
	                    this.state.warning? React.createElement("span", null, this.state.warningMessage): null
	                ), 
	                React.createElement("div", {className: "doc-toolbar"}, 
	                    isClosedStatus ? null : React.createElement(DocButtonAdd, {value: "Add", className: "doc-toolbar"}), 
	                    isClosedStatus ? null : React.createElement(DocButtonEdit, {value: "Edit", className: "doc-toolbar"}, " Edit "), 
	                    isClosedStatus ? null : React.createElement(DocButtonSave, {validator: this.validator, className: "doc-toolbar"}, " Save "), 
	                    editeMode && tasks.length > 0 ? null : taskWidget

	                )
	            )
	        );
	    },

	    getDefaultTask: function () {
	        return   [{step:0, name:'Start', action: 'start', status: 'opened'}]

	    },

	    generateTaskWidget: function() {
	        // вернет виджет задач

	        if (!this.state.taskList) {
	            this.setState({taskList:this.getDefaultTask()});
	        }

	        var tasks = this.state.taskList.filter(function(task)  {

	                if (task.status === 'opened') {
	                    return task;
	                }
	            }),

	        options,
	        taskWidget = null;

	        if (tasks.length > 1) {
	            // формируем список задач
	            options = tasks.map(function(task)  {
	                    return React.createElement("option", {value: 0, key: Math.random()}, " ", task.name, " ")
	            });

	            taskWidget = React.createElement("select", {className: "ui-c2", onChange: this.handleSelectTask}, options, " ")
	        }

	        if (tasks.length == 1)
	        {
	            var taskName = tasks[0].name;
	            // кнопка с задачей
	            taskWidget = React.createElement("input", {type: "button", className: "ui-c2", onClick: this.handleButtonTask, value: taskName})
	        }
	        return taskWidget;
	    },


	    validator: function () {
	        if (this.props.validator) {
	            var warningMessage = this.props.validator(),
	                warning =  warningMessage !== 'Ok';

	            this.setState({ warningMessage:  warningMessage, warning: warning})
	        }
	        return warning;
	    }


	});

	module.exports = Toolbar;




/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const DocButton = React.createClass({displayName: "DocButton",
	    name: 'btnAdd',
	    getInitialState: function() {
	        return {enabled: true}
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                console.log('btnAdd change:edited ' + newValue);
	                self.setState({enabled:!newValue});
	            }
	        });

	        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                console.log('btnAdd change:saved ' + newValue);
	                self.setState({enabled:newValue});
	            }
	        });

	    },

	    onClick: function() {
	        // отправим извещение наверх
	//        this.props.onClick(this.name);
	        console.log('btnAdd clicked');
	        flux.doAction( 'docIdChange', 0 );
	        flux.doAction( 'editedChange', true );
	        flux.doAction( 'savedChange', false );


	    },
	    render: function() {
	        if (this.state.enabled) {
	            return (
	                React.createElement("button", {type: "button", value: " Add ", name: this.props.name, 
	                            onClick: this.onClick}, " Add "))
	        } else {
	            return (React.createElement("button", {type: "button", disabled: true, value: " Add ", name: this.props.name, 
	                            onClick: this.onClick}, " Add "))
	        }
	    }
	});

	module.exports = DocButton


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const DocButton = React.createClass({displayName: "DocButton",
	    name: 'btnEdit',
	    getInitialState: function() {
	        return {enabled:true};
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                self.setState({enabled:!newValue});
	            }
	        });

	        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                self.setState({enabled:newValue});
	            }
	        });

	    },

	    onClick: function() {
	        // переводим документ в режим редактирования, сохранен = false
	        flux.doAction( 'editedChange', true );
	        flux.doAction( 'savedChange', false );
	    },

	    render: function() {
	        if (this.state.enabled) {
	            return (
	                React.createElement("button", {type: "button", 
	                    onClick: this.onClick
	                }, 
	                    this.props.children
	            ))
	        } else {
	            return (React.createElement("button", {disabled: true}, this.props.children))
	        }
	    }
	});

	module.exports = DocButton;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const DocButton = React.createClass({displayName: "DocButton",
	    name: 'btnSalvesta',
	    getInitialState: function() {
	        return {enabled: false, readOnly: false};
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение состояния saved.
	        var self = this;

	        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                console.log('btnSave change:saved ' + newValue);
	                self.setState({enabled:!newValue});
	            }
	        });
	    },

	    onClick: function(e) {
	        // валидатор
	console.log('start validator')
	        var isValid = !this.props.validator();
	        console.log('finsihed validator')

	        if (isValid) {
	            // если прошли валидацию, то сохранеям
	           flux.doAction( 'saveData');
	        }

	        return false;
	    },

	    render: function() {
	        console.log('rendering');
	        if (this.state.enabled) {
	            return (React.createElement("button", {type: "button", 
	                onClick: this.onClick}, 
	                this.props.children
	            ))
	        } else {
	            return (React.createElement("button", {disabled: true}, this.props.children))
	       }
	    }
	});

	module.exports = DocButton;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    InputText = __webpack_require__(12),
	    InputDateTime = __webpack_require__(19);
	//    InputNumber = require('../components/doc-input-number.jsx');

	var DocCommon = React.createClass({displayName: "DocCommon",
	    render: function () {
	        var data = this.props.data;

	        return (
	            React.createElement("div", {className: "fieldset"}, 
	                React.createElement("div", null, 
	                    React.createElement("ul", null, 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Id", 
	                                       name: "id", 
	                                       value: data.id, 
	                                       disabled: "true", 
	                                       width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Created", 
	                                       name: "created", 
	                                       value: data.created, 
	                                       disabled: "true", width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Updated", 
	                                       name: "lastupdate", 
	                                       value: data.lastupdate, 
	                                       disabled: "true", width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Status", 
	                                       name: "status", 
	                                       value: data.status, 
	                                       disabled: "true", 
	                                       width: "75%"})
	                        )
	                    )
	                )
	            )

	        );
	    }
	})

	module.exports = DocCommon;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);
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
	            this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function() {
	        return {value: this.props.value, readOnly: true, disabled: this.props.disabled || true};
	    },

	    componentWillMount: function() {
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
	            //          console.log('input-text on change data:' + JSON.stringify(newValue));
	            if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
	                var data = newValue,
	                    fieldValue = data[self.props.name];
	                if (data[self.props.name]) {
	                    self.setState({value: fieldValue});
	                }
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
	//        console.log('input-text state:' + JSON.stringify(this.state) + 'props:' + JSON.stringify(this.props));
	        var inputClassName =this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            myStyle = {width:'auto'};;

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
	                       className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                ), 
	                React.createElement("textarea", {
	                        style: myStyle, 
	                          className: inputClassName, 
	                          id: this.props.name, 
	                          name: this.props.name, 
	                          value: this.state.value, 
	                          readOnly: inputReadOnly, 
	                          title: this.props.title, 
	                          placeholder: inputPlaceHolder, 
	                          onChange: this.onChange, 
	                          disabled: true}
	            )
	            ))
	        } else {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                    ), 
	                React.createElement("textarea", {
	                    style: myStyle, 
	                    className: inputClassName, 
	                    id: this.props.name, 
	                    name: this.props.name, 
	                    value: this.state.value, 
	                    readOnly: inputReadOnly, 
	                    title: this.props.title, 
	                    placeholder: inputPlaceHolder, 
	                    onChange: this.onChange}
	                )
	                ))
	        }
	    }
	});

	module.exports = Input;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    GridButton = __webpack_require__(23);

	var MyCell = React.createClass({displayName: "MyCell",
	    getInitialState: function () {
	        return {
	            value: this.props.value, editable: false, readOnly: this.props.readOnly, disabled: false
	        }
	    },

	    componentWillReceiveProps: function () {
	        this.setState({value: this.props.value})
	    },

	    componentDidMount: function () {
	        var self = this;

	        flux.stores.docStore.on('change:gridCellEdited', function (newValue, previousValue) {
	            // отслеживает момент перехода на другую ячейку
	            if (newValue !== self.props.id) {
	                var cell = self.refs['cell-' + self.props.id];
	                if (cell) {
	                    self.setState({editable: false}); // убираем режим редактирования
	                }
	            }
	        });

	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            // отслеживает режим редактирования
	            var data = flux.stores.docStore,
	                gridData = eval('data.' + self.props.gridDataSource);
	            if (newValue !== previousValue && gridData.length > 0) {
	                self.setState({readOnly: !newValue});
	            }
	        });


	    },

	    handleClick: function () {
	        var value = !this.state.editable;
	        // отработаем редактирование
	        flux.doAction('gridCellEditedChange', this.props.id); // закроем редактирование в других ячейках
	        this.setState({editable: value});
	        //       console.log('cell click' + value + ' id:' + this.props.id + 'readOnly:' + this.state.readOnly);

	    },

	    onChange: function (e, bindToCell) {
	        // отрабатывает изменение состояния ячейки и пишет в хранилще
	        var value = e.target.value,
	            data = flux.stores.docStore,
	            gridData = eval('data.' + this.props.gridDataSource) || [],
	            cellName = bindToCell ? bindToCell : this.props.source;

	        this.setState({value: value});

	        // пишем состояние в хранилище
	        if (gridData.length > 0) {
	            var cellValue = gridData[this.props.rowId][cellName];

	            gridData[this.props.rowId][cellName] = value;
	            flux.doAction('detailsChange', gridData);
	            flux.doAction('gridCellEditedChange', this.props.id); // закроем редактирование в других ячейках
	        }

	    },

	    handleKeyPress: function (e) {
	        var key = e.which || e.keyCode;
	        if (key == 13) {
	            // выходим из редактирования
	            this.setState({editable: false});
	        }
	    },
	    render: function () {
	        var isEdit = (flux.stores.docStore.edited && !this.state.disabled) ? true : false,
	            cell = this.props.cell, // параметры ячейки
	            isReadOnly = !flux.stores.docStore.edited,
	//            cellType = cell.type || 'span'; // находится ли док в режиме редактирования
	            cellType = 'span'; // находится ли док в режиме редактирования

	        isReadOnly = cell.readOnly ? true : isReadOnly; // поправка на свойство ячейки, доступна ли она редактированию
	//            className = 'form-widget'; //+ t his.state.editable? ' focused': '';
	        isReadOnly = true;
	        var EditElement = React.createElement("span", {onClick: this.handleClick, className: this.props.className}, this.props.value);
	        if (isEdit) {
	            /*
	             switch (cellType) {
	             case 'text':
	             EditElement = <input type='text' readOnly={isReadOnly} value={this.state.value} style={{width:'100%'}}
	             onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
	             break;
	             case 'number':
	             EditElement = <input type='number' readOnly={isReadOnly} value={this.state.value} style={{width:'100%'}}
	             onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
	             break;
	             case 'select':
	             EditElement = <Select  name={cell.valueFieldName} libs={cell.dataSet} value={this.state.value} defaultValue = {this.state.value} collId = {cell.id} onChange={this.onChange}/>
	             break;
	             default:
	             <span>{this.state.value}</span>
	             }
	             */
	        }

	        return (
	            React.createElement("td", {ref: 'cell-' + this.props.id, className: this.props.className, style: {width:cell.width}}, 
	                EditElement
	            )
	        )
	    }
	})

	var DataGrid = React.createClass({displayName: "DataGrid",
	    getInitialState: function () {
	        return {
	            gridColumns: this.props.gridColumns,
	            gridData: this.prepaireGridData(this.props.gridData),
	            edited: false,
	            clicked: 0
	        };
	    },
	    getDefaultProps: function () {
	        return {
	            GridRowEdit: null
	        };
	    },
	    componentDidMount: function () {
	        var self = this;

	        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	            // отслеживает режим создания нового документа

	            var data = flux.stores.docStore,
	                gridData = eval('data.' + self.props.source);
	            if (newValue == 0) {
	                gridData = self.delRow(null);
	                flux.doAction('detailsChange', gridData);
	            }
	        });
	        // Listen gridData changes and then callbacks for row data changes
	        flux.stores.docStore.on('change:details', function (newData, oldData) {
	            if (newData.length > 0 && oldData !== newData) {
	                self.setState({gridData: newData});
	            }
	        });

	    },

	    handleCellClick: function (idx) {
	        flux.doAction('gridRowIdChange', idx); // отметим в хранилище номер строки
	        this.setState({
	            clicked: idx
	        });
	        var rowId = flux.stores.docStore.gridRowId;
	        //       console.log('clicked rowId :' + rowId + 'rowIndex:' + idx);

	    },

	    delRow: function (index) {
	        // удалим строку заданную строку или все, если индекс не задан
	        var gridData = this.state.gridData,
	            start = 1,
	            finish = gridData.length;

	        if (index || index == 0) {
	            start = index;
	            finish = 1;
	        }
	//        gridData.splice(start, finish);
	        gridData = gridData.filter(function (value, index) {
	            if (index < start || index > (start + finish)) {
	                return value;
	            }
	        })
	        this.setState({gridData: gridData});
	        // сохраним изменения
	        flux.doAction('detailsChange', gridData)

	    },

	    newRow: function () {
	        //вернет новую строку для грида, на основе шаблона

	        var gridColumns = this.props.gridColumns,
	            gridData = flux.stores.docStore.details,
	            row = new Object();

	        for (var i = 0; i < gridColumns.length; i++) {
	            var field = gridColumns[i].id;
	            row[field] = '';
	        }
	//        console.log('new row:' + JSON.stringify(gridData));
	//        this.setState({gridData:gridData});
	        return row;
	    },

	    prepaireGridData: function (sourceData) {
	        var gridData = [];
	        gridData = sourceData.map(function (row) {
	            // получаем чистую строку
	            var newRow = this.newRow();
	            // пройдем по новой строке и заполним ее поля значениями из источника
	//            console.log('чистую строку:' + JSON.stringify(row) + ' newRow:' + JSON.stringify(newRow));

	            for (var key in newRow) {
	//                console.log('key:' + JSON.stringify(key));
	                newRow[key] = row[key];
	            }
	            return newRow; // вернем сформированную новую строку
	        }, this);
	//        console.log('gridData:' + JSON.stringify(gridData) );
	        return gridData;
	    },

	    deleteRow: function () {
	        // удаление строки из грида
	        var rowIndex = flux.stores.docStore.gridRowId;
	               console.log('deleteRow:' + rowIndex);
	        this.delRow(rowIndex);
	    },

	    addRow: function () {
	        // добавит в состояние новую строку
	        var newRow = this.newRow(),
	            gridData = this.state.gridData,
	            details = flux.stores.docStore.details;

	        newRow.id = 'NEW' + Math.random(); // генерим новое ид
	//        gridData.push(newRow);
	//        this.setState({edited: true, clicked: gridData.length});

	        // здесь вставить строку в хранилище
	//        details.push(newRow);
	//        flux.doAction('detailsChange', details); // пишем изменения в хранилище
	        flux.doAction('gridRowIdChange', -1); // отметим в хранилище номер строки

	  //      this.setState({gridData: gridData});

	        // откроем модальное окно для редактирования
	        this.props.handleGridRow('ADD', newRow);


	    },

	    editRow: function () {
	        // добавит в состояние новую строку
	        var gridData = this.state.gridData,
	            details = flux.stores.docStore.details,
	            row = details[flux.stores.docStore.gridRowId]

	        this.props.handleGridRow('EDIT',row ); // редактирование строки в модальном окне

	    },

	    render: function () {

	//        console.log('grid render', this.props);
	        var gridStyle = {
	            width: '100px'
	        };
	        var className = 'th';
	        var gridRows = this.state.gridData,
	            gridColumns = this.props.gridColumns,
	            clickedItem = this.state.clicked,
	            isReadOnly = this.props.readOnly,
	            cellId = 0,
	            gridDataSource = this.props.source;

	        return (
	            React.createElement("div", null, 
	                !isReadOnly ?
	                    React.createElement("div", null, 
	                        React.createElement(GridButton, {onClick: this.addRow, buttonValue: "Add row"}), 
	                        React.createElement(GridButton, {onClick: this.editRow, buttonValue: "Edit row"}), 
	                        React.createElement(GridButton, {onClick: this.deleteRow, buttonValue: "Delete row"})
	                    ) : null, 
	                React.createElement("table", null, 
	                    React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        /*заголовок*/
	                        gridColumns.map(function (column, index) {
	                            gridStyle.width = column.width;
	                            className = 'th-' + column.id;
	                            if (column.show) {
	                                // показать ил скрыть колонку
	                                className = 'show';
	                            } else {
	                                className = 'hide';
	                            }
	                            return React.createElement("th", {style: gridStyle, className: className, key: 'th-' + index, 
	                                       scope: "col"}, column.name)
	                        })
	                    ), 
	                    gridRows.map(function (row, index) {
	                        var myClass = 'notFocused',
	                            rowId = index;
	                        if (clickedItem == index) {
	                            myClass = 'focused'; // подсветим выбранную строку
	                        }
	                        ;
	                        return (
	                            React.createElement("tr", {onClick: this.handleCellClick.bind(this,index), className: myClass, key: 'tr-'+index}, 
	                                gridColumns.map(function (cell, index) {
	                                    gridStyle.width = cell.width;
	                                    var className = 'show';
	                                    if (cell.show) {
	                                        // показать ил скрыть колонку? испллдьзуем класс. Должен быть прописан в css
	                                        className = 'show';
	                                    } else {
	                                        className = 'hide';
	                                    }

	                                    return (
	                                        React.createElement(MyCell, {cell: cell, 
	                                                source: cell.id, 
	                                                className: className, 
	                                                rowId: rowId, 
	                                                gridDataSource: gridDataSource, 
	                                                readOnly: isReadOnly, 
	                                                style: gridStyle, 
	                                                value: row[cell.id], 
	                                                key: index, id: cellId++})
	                                    )
	                                })
	                            ));
	                    }, this)
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = DataGrid;


/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);


	var ArvGridRow = React.createClass({displayName: "ArvGridRow",
	    getInitialState: function () {
	        return {
	            row: this.props.gridRowData, checked: false, warning: ''
	        }
	    },

	    modalPageClick: function (btnEvent) {
	        // отработает событие клик
	        var components = ['nomid', 'kogus', 'hind', 'kbm', 'kbmta', 'summa'],
	            data = [];

	        if (btnEvent == 'Ok') {
	            // проверка

	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                data.push({name: component, value: this.refs[component].state.value});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        var value = e.target.value;
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['kogus'].setState({value: 0.000});
	            this.refs['hind'].setState({value: 0.00});
	            this.refs['kbm'].setState({value: 0.00});
	            this.refs['kbmta'].setState({value: 0.00});
	            this.refs['summa'].setState({value: 0.00});
	        }
	        this.recalcRowSumm();

	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    recalcRowSumm: function () {
	        var kogus = Number(this.refs['kogus'].state.value),
	            hind = Number(this.refs['hind'].state.value),
	            kbmta = kogus * hind,
	            kbm = kogus * hind * 0.20, // врменно
	            summa = kbmta + kbm;
	        this.refs['kbm'].setState({value: kbm});
	        this.refs['kbmta'].setState({value: kbmta});
	        this.refs['summa'].setState({value: summa});
	        this.validateForm();
	    },

	    validateForm: function () {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	        if (!this.refs['nomid'].state.value) warning = warning + ' код услуги';
	        if (!this.refs['kogus'].state.value) warning = warning + ' кол-во';
	        if (!this.refs['hind'].state.value) warning = warning + ' цена';

	        if (warning.length > 2) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {
	        // @todo вынести в css
	        var style = {
	            border: '1px solid black',
	            backgroundColor: 'white',
	            position: 'relative',
	            margin: '10% 30% 10% 30%',
	            width: 'auto',
	            opacity: '1',
	            top: '100px'
	        };

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        /*
	         <div style={style}>
	         */

	        return (
	            React.createElement("div", {className: ".modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 
	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {title: "Teenus", 
	                                        name: "nomid", 
	                                        libs: "nomenclature", 
	                                        dok: "ARV", 
	                                        readOnly: false, 
	                                        value: row.nomid, 
	                                        defaultValue: row.kood, 
	                                        ref: "nomid", 
	                                        placeholder: "Teenuse kood", 
	                                        className: "ui-c2", 
	                                        onChange: this.handleChange})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Kogus ", 
	                                             name: "kogus", 
	                                             value: row.kogus, 
	                                             readOnly: false, 
	                                             disabled: "false", 
	                                             bindData: false, 
	                                             ref: "kogus", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Hind ", 
	                                             name: "hind", 
	                                             value: row.hind, 
	                                             readOnly: false, 
	                                             disabled: "false", 
	                                             bindData: false, ref: "hind", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Summa kbm-ta: ", 
	                                             name: "kbmta", 
	                                             value: row.kbmta, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "kbmta", 
	                                             className: "ui-c2", 
	                                             onChange: this.handleChange})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Käibemaks: ", 
	                                             name: "kbm", 
	                                             value: row.kbm, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "kbm", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Summa: ", 
	                                             name: "Summa", 
	                                             value: row.summa, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "summa", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            )
	                        )
	                    ), 
	                    React.createElement("div", null, React.createElement("span", null, validateMessage))
	                )
	            )
	        );
	    }

	});


	/*
	 <div>
	 {buttonOkReadOnly ?
	 <button disabled> Ok </button>:
	 <button onClick={this.modalPageClick.bind(this,'Ok')}> Ok </button>
	 }
	 <button onClick={this.modalPageClick.bind(this,'Cancel')}> Cancel</button>
	 </div>
	 */


	module.exports = ArvGridRow;

	/*
	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></InputText>
	 */


/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function () {
	        return {
	            value: this.props.value, 
	            readOnly: this.props.readOnly || false, 
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },
	    getDefaultProps: function () {
	        return {
	            bindData: true,
	            min:-999999999,
	            max: 999999999
	        };
	    },

	    componentWillMount: function () {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;
	//        console.log('componentWillMount' + this.props.name);
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
	            //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue, disabled: !newValue});
	            }
	        });

	        flux.stores.docStore.on('change:data', function (newValue, previousValue) {
	                       console.log('on change:data:' + newValue);
	            if (newValue !== previousValue) {

	                var data = newValue,
	                    fieldValue = data[self.props.name];

	                self.setState({value: fieldValue});
	            }
	        });
	    },
	   /*
	    componentWillReceiveProps: function(nextProps) {
	        this.setState({value:nextProps.value })
	    },*/

	    shouldComponentUpdate: function (nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть
	        var returnvalue = true;
	        
	        if (this.state) {
	            var returnvalue = (nextState.value !== this.state.value ||
	            nextState.readOnly !== this.state.readOnly ||
	            nextState.disabled !== this.state.disabled);
	        }
	        return returnvalue;

	    },

	    onChange: function (e) {
	        var fieldValue = Number(e.target.value);

	        if (fieldValue >= Number(this.props.min) || fieldValue <= Number(this.props.max)) {
	            // заданное ограничение не работает при ручном вводе сумм, отработаем его
	            this.setState({value: fieldValue});

	            if (this.props.bindData) {
	                // приявязка к данным
	                data = flux.stores.docStore.data;
	                // получить значение
	                data[this.props.name] = fieldValue;
	                // задать новое значение поля
	                flux.doAction('dataChange', data);
	            }

	            if (this.props.onChange) {
	                // смотрим к чему привязан селект и отдаим его наверх
	                this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	            }
	        }
	    },

	    onBlur: function() {
	        // если такой метод передан сверху, то вернет его обратно
	        if (this.props.onBlur) {
	            this.props.onBlur(this.state.value, this.props.name);
	        }
	    },

	    render: function () {
	        var inputClassName = this.props.className || '' + 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled || 'false',
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputMinValue = this.props.min || -999999999,
	            inputMaxValue = this.props.max || 999999999;

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }

	        if (inputDisabled == 'true') {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "number", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           title: this.props.title, 
	                           placeholder: inputPlaceHolder, 
	                           pattern: "\\d+(\\.\\d{2})?", 
	                           disabled: true}
	                    )

	                ))

	        } else {

	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {
	                        htmlFor: this.props.name}, 
	                        React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "number", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           min: inputMinValue, 
	                           max: inputMaxValue, 
	                           step: "0.01", 
	                           pattern: "\\d+(\\.\\d{2})?", 
	                           onChange: this.onChange, 
	                           onBlur: this.onBlur}
	                    )
	                ))
	        }

	    }
	});

	module.exports = Input;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(5);

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
	            id: 'arvedSisse',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }, {
	            id: 'arvedValja',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }],
	        bpm: [], // данные БП документа
	        task: {} // текущая задача
	    },
	    actionCallbacks: {
	        setLibsFilter: function (updater, libName, filter) {
	            console.log('setLibsFilter called', libName, filter);

	            // ищем справочник
	            var libs = this.libs;

	            for (let i = 0; i < libs.length; i++) {
	                if (libs[i].id == libName) {
	                    if (filter) {
	                        libs[i].filter = filter;
	                        flux.doAction('loadLibs', libName); //новые данные
	                    }
	                    break;
	                }
	            }
	        },

	        gridRowIdChange: function (updater, value) {
	            //           console.log('gridRowIdChange called:' + value);
	            updater.set({ gridRowId: value });
	        },
	        loadLibs: function (updater, libsToUpdate) {
	            //console.log('loadLibs called:' + JSON.stringify(libsToUpdate));
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
	                    for (let i = 0; i < libParams.length; i++) {
	                        libParams[i] = this.data[item.fields[i]];
	                    }
	                }
	                console.log('loadLibs params', item);
	                loadLibs(item.id, libParams);
	            }, this);
	        },
	        saveData: function (updater) {
	            saveDoc();
	        },
	        executeTask: function (updater, task) {
	            executeTask(task);
	        },
	        deleteDoc: function (updater) {
	            deleteDoc();
	        },
	        gridCellEditedChange: function (updater, value) {
	            //           console.log('called gridCellEditedChange:' + value);
	            updater.set({ gridCellEdited: value });
	        },
	        docIdChange: function (updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            // чистим данные грида
	            try {
	                //               console.log('docIdChange', value);
	                updater.set({ docId: value });
	            } catch (e) {
	                console.error;
	            }
	        },
	        dataChange: function (updater, value) {
	            // Отслеживает загрузку данных документа
	            //            console.log('dataChange', value, typeof value.arvid);
	            updater.set({ data: value });

	            if (typeof value.arvid !== 'undefinite') {
	                // если контрагент отсутсвует, то и параметр контрагента также обнулим
	                value.arvid = value.asutusid ? value.arvid : null;
	                // зададим параметры для справочника счетов
	                flux.doAction('setLibsFilter', 'arvedSisse', [value.asutusid, value.arvid]);
	            }
	        },
	        bpmChange: function (updater, value) {
	            // Загрузка БП
	            //            console.log('bpmChange', value);
	            updater.set({ bpm: value });
	        },
	        relationsChange: function (updater, value) {
	            // Отслеживает загрузку данных зависимостей документа
	            updater.set({ relations: value });
	        },
	        detailsChange: function (updater, value) {
	            // Отслеживает загрузку данных грида документа
	            updater.set({ details: value });
	        },
	        gridConfigChange: function (updater, value) {
	            // Отслеживает загрузку конфигурации грида
	            updater.set({ gridConfig: value });
	        },
	        deletedChange: function (updater, value) {
	            // была вызвана кнопка Delete
	            updater.set({ deleted: value });
	        },
	        editedChange: function (updater, value) {
	            // Меняется режим редактирования документа
	            updater.set({ edited: value });
	        },
	        savedChange: function (updater, value) {
	            // Отслеживает изменения в данных и из сохранение
	            updater.set({ saved: value });
	        },
	        libsChange: function (updater, value) {
	            // Отслеживает изменения в справочниках
	            //            console.log('libsChange called', value);
	            if (value) {
	                updater.set({ libs: value });
	            }
	        },
	        gridNameChange: function (updater, value) {
	            updater.set({ gridName: value });
	        }
	    }
	});

	function deleteDoc() {
	    // вызывает метод удаления документа
	    // вернемся в регистр
	    //requery('delete', null);
	    document.location = '/documents';
	};

	function executeTask(task) {
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
	            console.error;
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
	            let newId = data[0].id;
	            // обновим ид
	            saveData.data.id = newId;

	            flux.doAction('dataChange', saveData.data); //новые данные
	            flux.doAction('docIdChange', newId); // новое ид
	            flux.doAction('savedChange', true); // устанавливаем режим сохранен
	            flux.doAction('editedChange', false); // устанавливаем режим сохранен

	            // reload document
	            reloadDocument(newId); //@todo выполнить перегрузку данных перез перегрузки страницы
	        } catch (e) {
	            console.error;
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

	function loadLibs(libraryName, libParams) {
	    //    console.log('loadLibs:', libraryName, libParams);
	    try {

	        requery('select', JSON.stringify({ doc_type_id: libraryName, id: 0, params: libParams }), function (err, data) {
	            if (err) throw err;

	            var newLibs = docStore.libs.map(function (item) {
	                // ищем данные справолчника, которые обновили
	                //                 console.log('loadLibs item:' + JSON.stringify(item) + ' data:' + JSON.stringify(data));
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
	        console.error;
	    }
	}

	function requery(action, parameters, callback) {
	    // метод обеспечит получение данных от сервера

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
	            //console.log('require data arrived:' + JSON.stringify(data));
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

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var relatedDocuments = {
	    relatedDocuments: function () {
	        // формируем зависимости
	        let relatedDocuments = this.state.relations;
	        if (relatedDocuments.length > 0 ) {
	            relatedDocuments.forEach(function(doc) {
	                if (doc.id ) {
	                    // проверим на уникальность списка документов
	                    let isExists = this.pages.find(function(page)  {
	                        if (!page.docId) {
	                            return false;
	                        } else {
	                            return page.docId == doc.id && page.docTypeId == doc.doc_type;
	                        }
	                    });

	                    if (!isExists) {
	                        // в массиве нет, добавим ссылку на документ
	                        this.pages.push({docTypeId: doc.doc_type, docId:doc.id, pageName:doc.name + ' id:' + doc.id})
	                    }
	                }
	            }.bind(this));
	        }
	    }
	}

	module.exports = relatedDocuments;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    validateForm: () => {
	        console.log('validateForm this is mixin');
	        // валидация формы
	        let warning = '',
	            now = new Date(),
	            requiredFields = this.requiredFields || [],
	            notRequiredFields = [],
	            notMinMaxRule = [];

	        requiredFields.forEach(field => {
	            let component = this.refs[field.name];

	            let value = component.state.value,
	                props = component.props,
	                title = props.title;

	            if (!value) {
	                notRequiredFields.push(title);
	            }
	            // проверка на мин . макс значения

	            // || value && value > props.max
	            let checkValue = false;

	            switch (field.type) {
	                case 'D':
	                    let controlledValueD = Date.parse(value);
	                    if (field.min && controlledValueD < field.min && field.max && controlledValueD > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	                case 'N':
	                    let controlledValueN = Number(value);
	                    if (controlledValueN === 0 || field.min && controlledValueN < field.min && field.max && controlledValueN > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	                /*
	                 default:
	                 checkValue = true;
	                 break;
	                 */
	            }
	            if (checkValue) {
	                notMinMaxRule.push(title);
	            }
	        });

	        if (notRequiredFields.length > 0) {
	            warning = 'puudub vajalikud andmed (' + notRequiredFields.join(', ') + ') ';
	        }

	        if (notMinMaxRule.length > 0) {
	            warning = warning + ' min/max on vale(' + notMinMaxRule.join(', ') + ') ';
	        }

	        if (warning.length == 0) {
	            warning = 'Ok';
	        }

	        return warning; // вернем извещение об итогах валидации
	    }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(14),
	    DocCommon = __webpack_require__(18),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(31);

	var docStore = __webpack_require__(27),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

	var now = new Date();

	const Journal = React.createClass({displayName: "Journal",
	    pages:  [{pageName: 'Journal'}],
	    requiredFields:  [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name: 'selg', type: 'C'},
	        {name: 'summa', type: 'N'}
	    ],
	    mixins: [relatedDocuments, validateForm],
	    
	    getInitialState: function () {
	        // установим изначальные данные
	        return {
	            docData: this.props.data.row,
	            edited: false,
	            showMessageBox: 'none',
	            gridData: this.props.data.details,
	            relations: this.props.data.relations,
	            gridConfig: this.props.data.gridConfig,
	            gridRowEdit: false,
	            gridRowEvent: null,
	            gridRowData: null
	        };
	    },

	    componentWillMount: function () {
	        // пишем исходные данные в хранилище, регистрируем обработчики событий
	        var self = this,
	            data = self.props.data.row,
	            details = self.props.data.details,
	            gridConfig = self.props.data.gridConfig;
	        
	        // сохраняем данные в хранилище
	        flux.doAction('dataChange', data);
	        flux.doAction('docIdChange', data.id);
	        flux.doAction('detailsChange', details); // данные грида
	        flux.doAction('gridConfigChange', gridConfig); // данные грида
	        flux.doAction('gridName', 'journal-grid-row'); // задаем имя компонента строки грида (для редактирования

	        /*
	         // создаем обработчик события на изменение даннх
	         docStore.on('change:docId', function (newValue, previousValue) {
	         console.log('change:docId', newValue, previousValue);
	         if (newValue !== previousValue) {
	         // данные изменились, меняем состояние
	         var data = docStore.data,
	         isEdited = !self.state.edited;

	         }
	         });
	         */
	        
	        // отслеживаем режим редактирования
	        docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({edited: newValue});
	            }
	        });

	        // отслеживает изменения данных в гриде
	        /*
	         docStore.on('change:details', function (newValue, previousValue) {
	         console.log('event details changed');
	         if (JSON.stringify(newValue) !== JSON.stringify(previousValue) && typeof newValue == 'array') {
	         // итоги
	         let summa = newValue.reduce((sum, row) => sum + Number(row.summa),0), // сумма счета
	         kbm = newValue.reduce((sum, row) => sum + Number(row.kbm),0), // сумма налога
	         docData = self.state.docData;

	         docData.summa = summa;
	         docData.kbm = kbm;

	         self.setState({gridData: newValue, docData: docData});
	         }
	         });
	         */

	        // формируем зависимости
	        this.relatedDocuments();
	    },

	    componentDidMount: function () {
	        // грузим справочники
	        flux.doAction('loadLibs', '');

	        // если новый документ (id == 0)
	        var data = this.state.docData;

	        if (data.id == 0) {
	            console.log('edited mode control', data);
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }

	    },

	    render: function () {
	        var data = this.state.docData,
	            isEditeMode = this.state.edited,
	            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

	        //  pattern='[A-Za-z]{3}'
	//console.log('arve rendering:', data);
	        var gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig;

	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validateForm}), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: data.number, 
	                                           disabled: "true", 
	                                           readOnly: true})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                           placeholder: "Kuupäev", readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Partner", name: "asutusid", libs: "asutused", 
	                                        value: data.asutusid, 
	                                        collId: "id", 
	                                        defaultValue: data.asutus, 
	                                        placeholder: "Partner", 
	                                        ref: "asutusid", 
	                                        readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Dokument ", name: "dok", value: data.dok, 
	                                           placeholder: "Dokument", 
	                                           ref: "dok", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Selgitus", name: "selg", placeholder: "Selgitus", 
	                                          ref: "selg", 
	                                          value: data.selg, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                          ref: "muud", 
	                                          value: data.muud, readOnly: !isEditeMode, width: "85%"}))
	                        )
	                    ), 

	                    this.state.gridRowEdit ?
	                        React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                 gridEvent: this.state.gridRowEvent, 
	                                 gridRowData: this.state.gridRowData}) : null

	                )
	            )
	        );
	    },

	    handleGridRow: function (gridEvent, data) {
	        // управление модальным окном
	        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
	    },

	    modalPageClick: function (btnEvent, data) {
	        // отработаем Ok из модального окна
	        var gridData = flux.stores.docStore.details,
	            docData = flux.stores.docStore.data,
	            gridRowId = flux.stores.docStore.gridRowId,
	            gridColumns = flux.stores.docStore.gridConfig;
	        var gridRow = {};

	        if (gridRowId >= 0) {
	            gridRow = gridData[gridRowId];
	        }
	        console.log('previos state gridData, docData', gridData,  docData);

	        if (btnEvent == 'Ok') {
	            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
	            if (gridRowId < 0) {
	                // новая запись
	                // формируем пустую строку
	//                gridRow ={};
	                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {
	                gridRow[field.name] = field.value
	                console.log('сохраним данные в хранилище, gridRow', gridRow);
	            });

	            // заполним поля kood, nimetus
	            var libs = flux.stores.docStore.libs;
	            /*
	             nomLib = libs.filter((data) => {
	             if (data.id == 'nomenclature') {
	             return data;
	             }
	             });
	             */
	            /*

	             var   nomRow = nomLib[0].data.filter(function(row) {
	             if (row.id == Number(gridRow.nomid)) {
	             return row;
	             }
	             });

	             if (nomRow) {
	             gridRow['kood'] = nomRow[0].kood;
	             gridRow['nimetus'] = nomRow[0].name;
	             }
	             */
	            console.log('after state gridData %s, docData %s', gridData,  docData);

	            if (gridRowId >= 0) {
	                gridData[gridRowId] = gridRow;
	            } else {
	                gridData.push(gridRow); // добавляем строку
	                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
	            }
	            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
	        }

	        // считаем итоги

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0); // сумма счета

	        docData.summa = docSumma;

	        this.refs['DataGrid'].replaceState({gridData: gridData});
	        this.setState({gridRowEdit: false, docData: docData});

	    },
	    
	});

	module.exports = Journal;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);


	var JournalGridRow = React.createClass({displayName: "JournalGridRow",
	    getInitialState: function () {
	//        console.log('ArvGridRow props', this.props);
	        return {
	            row: this.props.gridRowData, checked: false, warning:''
	        }
	    },

	    modalPageClick: function (btnEvent) {
	        var components = ['deebet', 'kreedit', 'summa', 'valuuta', 'kuurs', 'proj', 'tunnus'],
	            data = [];


	        if (btnEvent == 'Ok') {
	            // проверка
	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                console.log('this.refs[component].state', this.refs[component].state);
	                var componentValue = this.refs[component].state.value;
	                if (component == 'deebet' || component == 'kreedit' || component == 'proj' || component == 'tunnus') {
	                    componentValue = this.refs[component].state.fieldValue;
	                }
	                data.push({name: component, value: componentValue});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        var value = e.target.value;
	/*
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['kogus'].setState({value: 0.000});
	            this.refs['hind'].setState({value: 0.00});
	            this.refs['kbm'].setState({value: 0.00});
	            this.refs['kbmta'].setState({value: 0.00});
	            this.refs['summa'].setState({value: 0.00});
	        }
	*/
	        console.log('handleChange', value);
	        this.recalcRowSumm();

	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    recalcRowSumm: function() {

	/*
	        var summa = Number(this.refs['summa'].state.value),
	            kuurs = Number(this.refs['kuurs'].state.value),
	            valsumma = summa * kuurs;
	        this.refs['valsumma'].setState({value: valsumma});
	*/
	 //       console.log('recalcRowSumm');

	//        this.validateForm();
	    },

	    validateForm: function() {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	/*
	        if (!this.refs['nomid'].state.value) warning =  warning + ' код услуги';
	        if (!this.refs['kogus'].state.value) warning =  warning + ' кол-во';
	        if (!this.refs['hind'].state.value) warning =  warning + ' цена';
	*/

	        if (warning.length > 2 ) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	//        console.log('validateForm', warning);
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        if (!row.valuuta) {
	            row.valuuta = 'EUR';
	            row.kuurs = 1;
	        }

	        buttonOkReadOnly = false; // todo костыль
	//        console.log('row render:',validateMessage, buttonOkReadOnly );
	/*
	        <Select title="Teenus" name='nomid' libs="nomenclature" readOnly={false}
	                value={row.nomid} defaultValue={row.kood} ref='nomid' placeholder='Teenuse kood'
	                onChange={this.handleChange}/>
	*/
	        return (
	            React.createElement("div", {className: "modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 

	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, React.createElement(Select, {
	                                    title: "Deebet:", 
	                                    name: "deebet", 
	                                    libs: "kontod", 
	                                    readOnly: false, 
	                                    value: row.deebet, 
	                                    collId: "kood", 
	                                    ref: "deebet", 
	                                    placeholder: "Deebet", 
	                                    onChange: this.handleChange, 
	                                    className: "ui-c2"}
	                            )
	                            ), 
	                            React.createElement("li", null, React.createElement(Select, {
	                                title: "Kreedit:", 
	                                name: "kreedit", 
	                                libs: "kontod", 
	                                readOnly: false, 
	                                value: row.kreedit, 
	                                collId: "kood", 
	                                ref: "kreedit", 
	                                placeholder: "Kreedit", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )), 
	                            React.createElement("li", null, React.createElement(InputNumber, {
	                                title: "Summa: ", 
	                                name: "summa", 
	                                value: row.summa, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "summa", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )), 

	                            React.createElement("li", null, React.createElement(InputText, {
	                                title: "Valuuta: ", 
	                                name: "valuuta", 
	                                value: row.valuuta, 
	                                readOnly: false, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "valuuta", 
	                                className: "ui-c2"}
	                            )), 
	                            React.createElement("li", null, React.createElement(InputNumber, {
	                                title: "Kuurs: ", 
	                                name: "kuurs", 
	                                value: row.kuurs, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "kuurs", 
	                                onBlur: this.handleInput, 
	                                className: "ui-c2"}
	                            )), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {
	                                title: "Projekt:", 
	                                name: "proj", 
	                                libs: "project", 
	                                readOnly: false, 
	                                value: row.proj, 
	                                collId: "kood", 
	                                ref: "proj", 
	                                placeholder: "Projekt", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                            ), 
	                            React.createElement("li", null, React.createElement(Select, {
	                                title: "Tunnus:", 
	                                name: "tunnus", 
	                                libs: "tunnus", 
	                                readOnly: false, 
	                                value: row.tunnus, 
	                                collId: "kood", 
	                                ref: "tunnus", 
	                                placeholder: "Lausendi tunnus", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                            )
	                            )
	                    ), 
	                    React.createElement("div", null, React.createElement("span", null, validateMessage)), ";"
	                )
	            )
	        );
	    }

	});

	/*
	<div>
	    {buttonOkReadOnly ?
	        <button disabled> Ok </button>:
	        <button onClick={this.modalPageClick.bind(this,'Ok')}> Ok </button>
	    }
	    <button onClick={this.modalPageClick.bind(this,'Cancel')}> Cancel</button>
	</div>
	*/

	module.exports = JournalGridRow;

	/*

	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></Input
	 Text>
	 */


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(14),
	    DocCommon = __webpack_require__(18),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(33);

	var docStore = __webpack_require__(27),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

	var now = new Date();

	const Sorder = React.createClass({displayName: "Sorder",
	    pages:  [{pageName: 'Sissetuliku kassaorder'}],
	    requiredFields:  [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name: 'asutusid', type: 'I'},
	        {name: 'nimi', type: 'C'},
	        {name: 'summa', type: 'N'}
	    ],
	    mixins: [relatedDocuments, validateForm],

	    getInitialState: function () {
	        // установим изначальные данные
	        return {
	            docData: this.props.data.row,
	            edited: false,
	            showMessageBox: 'none',
	            gridData: this.props.data.details,
	            relations: this.props.data.relations,
	            gridConfig: this.props.data.gridConfig,
	            gridRowEdit: false,
	            gridRowEvent: null,
	            gridRowData: null
	        };
	    },

	    componentWillMount: function () {
	        // пишем исходные данные в хранилище, регистрируем обработчики событий
	        var self = this,
	            data = self.props.data.row,
	            details = self.props.data.details,
	            gridConfig = self.props.data.gridConfig;

	        // сохраняем данные в хранилище
	        flux.doAction('dataChange', data);
	        flux.doAction('docIdChange', data.id);
	        flux.doAction('detailsChange', details); // данные грида
	        flux.doAction('gridConfigChange', gridConfig); // данные грида
	        flux.doAction('gridName', 'sorder-grid-row'); // задаем имя компонента строки грида (для редактирования

	        // отслеживаем режим редактирования
	        docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({edited: newValue});
	            }
	        });

	        // отслеживает изменения данных в гриде
	         docStore.on('change:details', function (newValue, previousValue) {
	             var isChanged = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	             console.log('event details changed', isChanged, typeof newValue);

	             if (isChanged) {
	                 // итоги
	                 let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма документа
	                 docData = self.state.docData;

	                 docData.summa = summa;
	                     console.log('new summa:', summa);
	                 self.setState({gridData: newValue, docData: docData});
	             }
	         });


	        // формируем зависимости
	        this.relatedDocuments();
	    },

	    componentDidMount: function () {
	        // грузим справочники
	        flux.doAction('loadLibs', '');

	        // если новый документ (id == 0)
	        var data = this.state.docData;

	        if (data.id == 0) {
	            console.log('edited mode control', data);
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }

	    },

	    render: function () {
	        var data = this.state.docData,
	            isEditeMode = this.state.edited,
	            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

	        //  pattern='[A-Za-z]{3}'
	        var gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig;


	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validateForm}), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: data.number, 
	                                           disabled: "false", 
	                                           readOnly: true})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                           placeholder: "Kuupäev", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Kassa", name: "kassa_id", libs: "aa", 
	                                        value: data.kassa_id, 
	                                        collId: "id", 
	                                        defaultValue: data.kassa, 
	                                        placeholder: "Kassa", 
	                                        ref: "kassa_id", 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Partner", name: "asutusid", libs: "asutused", 
	                                        value: data.asutusid, 
	                                        collId: "id", 
	                                        defaultValue: data.asutus, 
	                                        placeholder: "Partner", 
	                                        ref: "asutusid", 
	                                        readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", 
	                                        title: "Arve nr.", 
	                                        name: "arvid", 
	                                        libs: "arvedValja", 
	                                        value: data.arvid, 
	                                        collId: "id", 
	                                        defaultValue: data.arvnr, 
	                                        placeholder: "Arve nr.", 
	                                        ref: "arvid", 
	                                        btnDelete: true, 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Dokument ", name: "dokument", value: data.dokument, 
	                                           placeholder: "Dokument", 
	                                           ref: "dokument", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Nimi", name: "nimi", placeholder: "Nimi", 
	                                          ref: "nimi", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Aadress", name: "aadress", placeholder: "Aadress", 
	                                          ref: "aadress", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Alus", name: "alus", placeholder: "Alus", 
	                                          ref: "alus", 
	                                          value: data.alus, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                          ref: "muud", 
	                                          value: data.muud, readOnly: !isEditeMode, width: "85%"}))
	                        )
	                    ), 

	                    this.state.gridRowEdit ?
	                        React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                 gridEvent: this.state.gridRowEvent, 
	                                 gridRowData: this.state.gridRowData}) : null

	                )
	            )
	        );
	    },

	    handleGridRow: function (gridEvent, data) {
	        // управление модальным окном
	        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
	    },

	    modalPageClick: function (btnEvent, data) {
	        // отработаем Ok из модального окна
	        var gridData = flux.stores.docStore.details,
	            docData = flux.stores.docStore.data,
	            gridRowId = flux.stores.docStore.gridRowId,
	            gridColumns = flux.stores.docStore.gridConfig;
	        var gridRow = {};

	        if (gridRowId >= 0) {
	            gridRow = gridData[gridRowId];
	        }
	        console.log('previos state gridData, docData', gridData,  docData);

	        if (btnEvent == 'Ok') {
	            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
	            if (gridRowId < 0) {
	                // новая запись
	                // формируем пустую строку
	//                gridRow ={};
	                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {
	                gridRow[field.name] = field.value
	                console.log('сохраним данные в хранилище, gridRow', gridRow);
	            });

	            // заполним поля nimetus
	            var libs = flux.stores.docStore.libs,
	             nomLib = libs.filter(function(data)  {
	                 if (data.id == 'nomenclature') {
	                     return data;
	                 }
	             });


	             var   nomRow = nomLib[0].data.filter(function(row) {
	                 if (row.id == Number(gridRow.nomid)) {
	                     return row;
	                 }
	             });

	             if (nomRow) {
	                 gridRow['nimetus'] = nomRow[0].name;
	             }

	            console.log('after state gridData %s, docData %s', gridData,  docData);

	            if (gridRowId >= 0) {
	                gridData[gridRowId] = gridRow;
	            } else {
	                gridData.push(gridRow); // добавляем строку
	                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
	            }
	            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
	        }

	        // считаем итоги

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0); // сумма счета

	        docData.summa = docSumma;

	        this.refs['DataGrid'].replaceState({gridData: gridData});
	        this.setState({gridRowEdit: false, docData: docData});

	    },

	});

	module.exports = Sorder;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);

	var SorderGridRow = React.createClass({displayName: "SorderGridRow",
	    getInitialState: function () {
	//        console.log('ArvGridRow props', this.props);
	        return {
	            row: this.props.gridRowData, checked: false, warning:''
	        }
	    },

	    componentDidMount: function() {
	    // предварительная проверка
	        this.validateForm();
	    },

	    modalPageClick: function (btnEvent) {
	        var components = ['nomid',  'summa', 'proj', 'tunnus'],
	            data = [];

	        if (btnEvent == 'Ok') {
	            // проверка

	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                var componentValue = this.refs[component].state.value;
	                if (component == 'proj' || component == 'tunnus') {
	                    componentValue = this.refs[component].state.fieldValue;
	                }
	                console.log('modalPageClick ',component, componentValue )
	                data.push({name: component, value: componentValue});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        console.log('select changed');
	        var value = e.target.value;
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['summa'].setState({value: 0.00});
	        }
	        this.validateForm();
	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    validateForm: function() {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	        if (!this.refs['nomid'].state.value) warning =  warning + ' кассовая операция';

	        if (warning.length > 2 ) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	        console.log('validated', warning, this.refs['nomid'].state.value);
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;
	//        console.log('row render:',validateMessage, buttonOkReadOnly );
	        return (
	            React.createElement("div", {className: "modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 
	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Operatsioon: ", 
	                                name: "nomid", libs: "nomenclature", 
	                                readOnly: false, 
	                                value: row.nomid, 
	                                defaultValue: row.kood, 
	                                ref: "nomid", 
	                                placeholder: "Kassa operatsiooni kood", 
	                                className: "ui-c2", 
	                                onChange: this.handleChange})
	                            
	                        ), 
	                       React.createElement("li", null, 
	                           React.createElement(InputNumber, {
	                               title: "Summa: ", 
	                               name: "Summa:", value: row.summa, 
	                               disabled: "false", 
	                               bindData: false, ref: "summa", 
	                               className: "ui-c2"}
	                           )
	                       ), 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Projekt:", 
	                                name: "proj", 
	                                libs: "project", 
	                                readOnly: false, 
	                                value: row.proj, 
	                                collId: "kood", 
	                                ref: "proj", 
	                                placeholder: "Projekt", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                        ), 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Tunnus:", 
	                                name: "tunnus", 
	                                libs: "tunnus", 
	                                readOnly: false, 
	                                value: row.tunnus, 
	                                collId: "kood", 
	                                ref: "tunnus", 
	                                placeholder: "Lausendi tunnus", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                        )
	                        )
	                    ), 
	                    React.createElement("div", null, React.createElement("span", null, validateMessage)), ";"
	                )
	            )
	        );
	    }

	});

	/*
	<div>
	    {buttonOkReadOnly ?
	        <button disabled> Ok </button>:
	        <button onClick={this.modalPageClick.bind(this,'Ok')}> Ok </button>
	    }
	    <button onClick={this.modalPageClick.bind(this,'Cancel')}> Cancel</button>
	</div>
	*/


	module.exports = SorderGridRow;

	/*
	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></InputText>
	 */


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(14),
	    DocCommon = __webpack_require__(18),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(33);

	var docStore = __webpack_require__(27),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

	var now = new Date();

	const Vorder = React.createClass({displayName: "Vorder",
	    pages:  [{pageName: 'Väljamakse kassaorder'}],
	    requiredFields:  [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name: 'asutusid', type: 'I'},
	        {name: 'nimi', type: 'C'},
	        {name: 'summa', type: 'N'}
	    ],
	    mixins: [relatedDocuments, validateForm],

	    getInitialState: function () {
	        // установим изначальные данные
	        return {
	            docData: this.props.data.row,
	            edited: false,
	            showMessageBox: 'none',
	            gridData: this.props.data.details,
	            relations: this.props.data.relations,
	            gridConfig: this.props.data.gridConfig,
	            gridRowEdit: false,
	            gridRowEvent: null,
	            gridRowData: null
	        };
	    },

	    componentWillMount: function () {
	        // пишем исходные данные в хранилище, регистрируем обработчики событий
	        var self = this,
	            data = self.props.data.row,
	            details = self.props.data.details,
	            gridConfig = self.props.data.gridConfig;

	        // сохраняем данные в хранилище
	        flux.doAction('dataChange', data);
	        flux.doAction('docIdChange', data.id);
	        flux.doAction('detailsChange', details); // данные грида
	        flux.doAction('gridConfigChange', gridConfig); // данные грида
	        flux.doAction('gridName', 'sorder-grid-row'); // задаем имя компонента строки грида (для редактирования

	        // отслеживаем режим редактирования
	        docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({edited: newValue});
	            }
	        });

	        // отслеживает изменения данных в гриде
	        docStore.on('change:details', function (newValue, previousValue) {
	            var isChanged = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	            console.log('event details changed', isChanged, typeof newValue);

	            if (isChanged) {
	                // итоги
	                let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма документа
	                    docData = self.state.docData;

	                docData.summa = summa;
	                console.log('new summa:', summa);
	                self.setState({gridData: newValue, docData: docData});
	            }
	        });

	        // отслеживаем режим редактирования
	        docStore.on('change:data', function (newValue, previousValue) {
	            console.log('vorder onChange ', newValue);
	            if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
	//                self.setState({edited: newValue});
	                // отслеживаем изменения на поле asutusid и тогда запрос на номера счетов с параметрами ИД учреждения и номера счета
	//                console.log('vorder onChange ', newValue);

	                var data = newValue;
	                
	                if (!newValue.asutusid ) {
	                    // стираем ссылку на счет
	                    data.arvid = null;
	                    flux.doAction('dataChange',data);
	                    this.setState({docData: data});
	                }
	                // установим новый фильтр
	                var arveLibParams = [data.asutusid, data.arvid];
	                flux.doAction('setLibsFilter', 'arved',arveLibParams);

	            }
	        });
	        
	        // формируем зависимости
	        this.relatedDocuments();
	    },

	    componentDidMount: function () {
	        // грузим справочники
	        flux.doAction('loadLibs', '');

	        // если новый документ (id == 0)
	        var data = this.state.docData;

	        if (data.id == 0) {
	            console.log('edited mode control', data);
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }

	    },

	    render: function () {
	        var data = this.state.docData,
	            isEditeMode = this.state.edited,
	            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

	        //  pattern='[A-Za-z]{3}'
	        var gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig;

	        console.log('vorder pages', this.pages);
	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validateForm}), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: data.number, 
	                                           disabled: "false", 
	                                           readOnly: true})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", 
	                                           name: "kpv", 
	                                           value: data.kpv, 
	                                           ref: "kpv", 
	                                           placeholder: "Kuupäev", 
	                                           readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", title: "Kassa", name: "kassa_id", libs: "aa", 
	                                        value: data.kassa_id, 
	                                        collId: "id", 
	                                        defaultValue: data.kassa, 
	                                        placeholder: "Kassa", 
	                                        ref: "kassa_id", 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", title: "Partner", 
	                                        name: "asutusid", 
	                                        libs: "asutused", 
	                                        value: data.asutusid, 
	                                        collId: "id", 
	                                        defaultValue: data.asutus, 
	                                        placeholder: "Partner", 
	                                        ref: "asutusid", 
	                                        readOnly: !isEditeMode})
	                                ), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", 
	                                        title: "Arve nr.", 
	                                        name: "arvid", 
	                                        libs: "arvedSisse", 
	                                        value: data.arvid, 
	                                        collId: "id", 
	                                        defaultValue: data.arvnr, 
	                                        placeholder: "Arve nr.", 
	                                        ref: "arvid", 
	                                        btnDelete: true, 
	                                        readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Dokument ", 
	                                           name: "dokument", 
	                                           value: data.dokument, 
	                                           placeholder: "Dokument", 
	                                           ref: "dokument", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", 
	                                          title: "Nimi", 
	                                          name: "nimi", 
	                                          placeholder: "Nimi", 
	                                          ref: "nimi", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", 
	                                          title: "Aadress", 
	                                          name: "aadress", 
	                                          placeholder: "Aadress", 
	                                          ref: "aadress", 
	                                          key: "textAadress", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", title: "Alus", name: "alus", placeholder: "Alus", 
	                                          ref: "alus", 
	                                          key: "textAlus", 
	                                          value: data.alus, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                          ref: "muud", 
	                                          value: data.muud, readOnly: !isEditeMode, width: "85%"}))
	                        )
	                    ), 

	                    this.state.gridRowEdit ?
	                        React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                 gridEvent: this.state.gridRowEvent, 
	                                 gridRowData: this.state.gridRowData}) : null

	                )
	            )
	        );
	    },

	    handleGridRow: function (gridEvent, data) {
	        // управление модальным окном
	        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
	    },

	    modalPageClick: function (btnEvent, data) {
	        // отработаем Ok из модального окна
	        var gridData = flux.stores.docStore.details,
	            docData = flux.stores.docStore.data,
	            gridRowId = flux.stores.docStore.gridRowId,
	            gridColumns = flux.stores.docStore.gridConfig;
	        var gridRow = {};

	        if (gridRowId >= 0) {
	            gridRow = gridData[gridRowId];
	        }
	//        console.log('previos state gridData, docData', gridData,  docData);

	        if (btnEvent == 'Ok') {
	//            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
	            if (gridRowId < 0) {
	                // новая запись
	                // формируем пустую строку
	//                gridRow ={};
	                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {
	                gridRow[field.name] = field.value
	                console.log('сохраним данные в хранилище, gridRow', gridRow);
	            });

	            // заполним поля nimetus
	            var libs = flux.stores.docStore.libs,
	                nomLib = libs.filter(function(data)  {
	                    if (data.id == 'nomenclature') {
	                        return data;
	                    }
	                });


	            var   nomRow = nomLib[0].data.filter(function(row) {
	                if (row.id == Number(gridRow.nomid)) {
	                    return row;
	                }
	            });

	            if (nomRow) {
	                gridRow['nimetus'] = nomRow[0].name;
	            }

	            console.log('after state gridData %s, docData %s', gridData,  docData);

	            if (gridRowId >= 0) {
	                gridData[gridRowId] = gridRow;
	            } else {
	                gridData.push(gridRow); // добавляем строку
	                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
	            }
	            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
	        }

	        // считаем итоги

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0); // сумма счета

	        docData.summa = docSumma;

	        this.refs['DataGrid'].replaceState({gridData: gridData});
	        this.setState({gridRowEdit: false, docData: docData});

	    },

	});

	module.exports = Vorder;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	const Form = __webpack_require__(10);
	const PageLabel = __webpack_require__(11);

	var pages = ['Page1', 'Page2'];

	const Palk = React.createClass({displayName: "Palk",
	    render: function() {
	        return (
	            React.createElement(Form, {pages: pages}, 
	                React.createElement("span", null, " Palk ")
	            )
	        );
	    }});

	module.exports = Palk;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDA1MTI5ZjNmZWIyNDViODQ4NzJmIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvYy5qcyIsIndlYnBhY2s6Ly8vLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2FydmUuanN4Iiwid2VicGFjazovLy8uL34vZmx1eGlmeS9mbHV4aWZ5LmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveERpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi1hZGQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi1lZGl0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1idXR0b24tc2F2ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL215YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9zdG9yZXMvZG9jX3N0b3JlLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL21peGluL3ZhbGlkYXRlRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2pvdXJuYWwuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvam91cm5hbC1ncmlkLXJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9zb3JkZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL3ZvcmRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDUxMjlmM2ZlYjI0NWI4NDg3MmZcbiAqKi8iLCJcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuLypcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBkb2NDb21wb25lbnQgPSAnJztcclxuKi9cblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jU3RvcmUnXSA9IHN0b3JlRGF0YTtcbnN0b3JlRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhKTtcblxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxuLypcclxuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe2RvY0RhdGE6ZG9jU3RvcmUuZGF0YX0pXHJcbiAgICB9XHJcbn0pXHJcbiovXG5cbi8vINC30LDQv9GA0L7RgdC40Lwg0LrQvtC80L/QvtC90LXQvdGCINC00L7QutGD0LzQtdC90YLQsCDQv9C+INC10LPQviDRgtC40L/Rg1xuY29uc3QgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcbmNvbnNvbGUubG9nKCdzdG9yZURhdGE6IERvYycsIERvYyk7XG5cblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtIH0pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jJykpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2MuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb2NUeXBlSWQpIHtcbiAgICAvLyDQstC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRgtC40L/QsCDQtNC+0LrRg9C80LXQvdGC0LAg0LLQtdGA0L3QtdGCINC60L7QvNC/0L7QvdC10L3RgiDQtNC+0LrRg9C80LXQvdGC0LBcblxuICAgIGNvbnNvbGUubG9nKCdyZXR1cm5Eb2NDb21wb25lbnQ6JyArIGRvY1R5cGVJZCk7XG4gICAgdmFyIGNvbXBvbmVudCA9IHt9O1xuXG4gICAgc3dpdGNoIChkb2NUeXBlSWQpIHtcbiAgICAgICAgY2FzZSAnQVJWJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvYXJ2ZS5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdKT1VSTkFMJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3Mvam91cm5hbC5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdTT1JERVInOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9zb3JkZXIuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVk9SREVSJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3Mvdm9yZGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BBTEsnOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvYXJ2ZS5qc3gnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCcpLFxyXG4vLyAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeCcpO1xyXG5cclxuLy8gQ3JlYXRlIGEgc3RvcmVcclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xyXG5cclxudmFyIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxyXG4gICAgdmFsaWRhdGVGb3JtID0gcmVxdWlyZSgnLi4vbWl4aW4vdmFsaWRhdGVGb3JtJyk7XHJcblxyXG52YXIgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbmNvbnN0IEFydmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQXJ2ZVwiLFxyXG4gICAgcGFnZXM6IFt7cGFnZU5hbWU6ICdBcnZlJ31dLFxyXG4gICAgcmVxdWlyZWRGaWVsZHM6IFtcclxuICAgICAgICB7bmFtZTogJ2twdicsIHR5cGU6ICdEJywgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSwgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKX0sXHJcbiAgICAgICAge25hbWU6J3RhaHRhZWcnLCB0eXBlOidEJywgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSwgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKX0sXHJcbiAgICAgICAge25hbWU6J2FzdXR1c2lkJywgdHlwZTonTid9LFxyXG4gICAgICAgIHtuYW1lOidzdW1tYScsIHR5cGU6J04nfVxyXG4gICAgXSxcclxuXHJcbiAgICBtaXhpbnM6IFtyZWxhdGVkRG9jdW1lbnRzLCB2YWxpZGF0ZUZvcm1dLFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6bnVsbCxcclxuICAgICAgICAgICAgZ3JpZFJvd0RhdGE6bnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gc2VsZi5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcclxuICAgICAgICBcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEgKTtcclxuIC8vICAgICAgIGZsdXguZG9BY3Rpb24oJ2JwbUNoYW5nZScsIGJwbSk7XHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnYXJ2LWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4vKlxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0ZWQgPSAhc2VsZi5zdGF0ZS5lZGl0ZWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkgJiYgdHlwZW9mIG5ld1ZhbHVlID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwwKSwgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcbiAgICAgICAgICAgICAgICAgICAga2JtID0gbmV3VmFsdWUucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LmtibSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQvdCw0LvQvtCz0LBcclxuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgIGRvY0RhdGEua2JtID0ga2JtO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsICcnKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCIChpZCA9PSAwKVxyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdlZGl0ZWRDaGFuZ2UnLCB0cnVlICk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIGZhbHNlICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQ7XHJcbi8vICAgICAgICAgICAgc2hvd01lc3NhZ2VCb3ggPSB0aGlzLnN0YXRlLnNob3dNZXNzYWdlQm94OyAvLyDQsdGD0LTQtdGCINGD0L/RgNCw0LLQu9GP0YLRjCDQvtC60L3QvtC8INGB0L7QvtCx0YnQtdC90LjQuVxyXG5cclxuICAgICAgICAvLyAgcGF0dGVybj0nW0EtWmEtel17M30nXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnN0YXRlLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiB0aGlzLnBhZ2VzLCByZWY6IFwiZm9ybVwiLCBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdCwgc3R5bGU6IHtkaXNwbGF5OiAndGFibGUnfX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyLCB7dmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRlRm9ybSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTGlzdDogZGF0YS5icG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRTdGF0dXM6IGRhdGEuZG9jX3N0YXR1c31cclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJOdW1iZXJcIiwgbmFtZTogXCJudW1iZXJcIiwgdmFsdWU6IGRhdGEubnVtYmVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogZGF0YS5rcHYsIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkt1dXDDpGV2XCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiVMOkaHRhZWcgXCIsIG5hbWU6IFwidGFodGFlZ1wiLCB2YWx1ZTogZGF0YS50YWh0YWVnLCByZWY6IFwidGFodGFlZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVMOkaHRhZWdcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBc3V0dXNcIiwgbmFtZTogXCJhc3V0dXNpZFwiLCBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBkZWZhdWx0VmFsdWU6IGRhdGEuYXN1dHVzLCBwbGFjZWhvbGRlcjogXCJBc3V0dXNcIiwgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJMaXNhIFwiLCBuYW1lOiBcImxpc2FcIiwgdmFsdWU6IGRhdGEubGlzYSwgcGxhY2Vob2xkZXI6IFwiTGlzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibGlzYVwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk3DpHJrdXNlZFwiLCBuYW1lOiBcIm11dWRcIiwgcGxhY2Vob2xkZXI6IFwiTcOkcmt1c2VkXCIsIHJlZjogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubXV1ZCwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlN1bW1hOiBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcIiBcIiwgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLw6RpYmVtYWtzIFwiLCBuYW1lOiBcImtibVwiLCBwbGFjZWhvbGRlcjogXCJLw6RpYmVtYWtzXCIsIHJlZjogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFwiIFwiLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkUm93LCB7bW9kYWxQYWdlQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVHcmlkUm93OiBmdW5jdGlvbihncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWRSb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZCxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkQ29uZmlnO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZFJvd0lkIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L3QvtCy0LDRjyDQt9Cw0L/QuNGB0YxcclxuICAgICAgICAgICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQv9GD0YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBncmlkUm93ID0ge307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtyZXR1cm4gZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlO30pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBrb29kLCBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKGZ1bmN0aW9uKGRhdGEpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQv9C+0YHRgtCw0LLQuNC8INC30L3QsNGH0LXQvdC40LUg0LrQvtC0INC4INC90LDQvNC10L3QvtCy0LDQvdC40LUg0LIg0LPRgNC40LRcclxuICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2tvb2QnXSA9IG5vbVJvd1swXS5rb29kO1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1snbmltZXR1cyddID0gbm9tUm93WzBdLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LDApLCAvLyDRgdGD0LzQvNCwINGB0YfQtdGC0LBcclxuICAgICAgICAgICAgZG9jS2JtID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LmtibSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQvdCw0LvQvtCz0LBcclxuICAgICAgICAgICAgZG9jS2JtdGEgPSBkb2NTdW1tYSAtIGRvY0tibTtcclxuXHJcbiAgICAgICAgZG9jRGF0YS5zdW1tYSA9IGRvY1N1bW1hO1xyXG4gICAgICAgIGRvY0RhdGEua2JtID0gZG9jS2JtO1xyXG4gICAgICAgIGRvY0RhdGEua2JtdGEgPSBkb2NLYm10YTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6Z3JpZERhdGEgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ2ZTtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICA8TWVzc2FnZUJveCBtZXNzYWdlPVwi0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMP1wiIHNob3c9e3Nob3dNZXNzYWdlQm94fSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxyXG4vLyAgICAgICAgICAgICAgICAgPERvY0J1dHRvbkRlbGV0ZSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT4gRGVsZXRlIDwvRG9jQnV0dG9uRGVsZXRlPlxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvZG9jcy9hcnZlLmpzeFxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFhEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9zcmMveERpc3BhdGNoZXInKSxcbiAgICBYU3RvcmUgPSByZXF1aXJlKCcuL3NyYy94U3RvcmUnKTtcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIEZsdXhpZnkgY2xhc3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24uXHJcbiAqIEluaXRpYWxpemVzIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgc3RvcmUuXHJcbiAqIEFsc28gc2V0IHRoZSBQcm9taXNlIG9iamVjdCBpZiBpdCBpcyBnbG9iYWxseSBhdmFpbGFibGUuXHJcbiAqL1xudmFyIEZsdXhpZnkgPSBmdW5jdGlvbiAoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGlzcGF0Y2hlcicsIHtcblx0XHR2YWx1ZTogbmV3IFhEaXNwYXRjaGVyKClcblx0fSk7XG5cblx0dGhpcy5zdG9yZXMgPSB7fTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLnByb21pc2lmeShQcm9taXNlKTtcblx0fVxufTtcblxuRmx1eGlmeS5wcm90b3R5cGUgPSB7XG5cdC8qKlxyXG4gICogQ3JlYXRlIGEgbmV3IHN0b3JlLiBJZiBhbiBpZCBpcyBwYXNzZWQgaW4gdGhlIG9wdGlvbnMsXHJcbiAgKiB0aGUgc3RvcmUgd2lsbCBiZSByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyIGFuZCBzYXZlZFxyXG4gICogaW4gZmx1eGlmeS5zdG9yZXNbaWRdLlxyXG4gICpcclxuICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyB7aWQsIGluaXRpYWxTdGF0ZSwgYWN0aW9uQ2FsbGJhY2t9XHJcbiAgKiBAcmV0dXJuIHtYU3RvcmV9XHJcbiAgKi9cblx0Y3JlYXRlU3RvcmU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIHN0b3JlID0gbmV3IFhTdG9yZShvcHRpb25zKTtcblxuXHRcdC8vIElmIHRoZSBzdG9yZSBoYXMgYW4gaWQsIHJlZ2lzdGVyIGl0IGluIEZsdXhpZnkgYW5kIGluIHRoZSBkaXNwYXRjaGVyXG5cdFx0aWYgKHN0b3JlLl9pZCkge1xuXHRcdFx0dGhpcy5zdG9yZXNbc3RvcmUuX2lkXSA9IHN0b3JlO1xuXHRcdFx0dGhpcy5kaXNwYXRjaGVyLnJlZ2lzdGVyU3RvcmUoc3RvcmUuX2lkLCBzdG9yZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRXhlY3V0ZXMgYW4gYWN0aW9uLiBUaGUgYXJndW1lbnRzIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGVcclxuICAqIGZvciB0aGUgYWN0aW9uIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyLlxyXG4gICogQHJldHVybiB7IFByb21pc2UgfSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrc1xyXG4gICogICAgICAgICAgICAgICAgICAgaGF2ZSBmaW5pc2hlZC5cclxuICAqL1xuXHRkb0FjdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2guYXBwbHkodGhpcy5kaXNwYXRjaGVyLCBhcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSWYgRVM2IFByb21pc2Ugb2JqZWN0IGlzIG5vdCBkZWZpbmVkIGdsb2JhbGx5IG9yIHBvbHlmaWxsZWQsIGEgUHJvbWlzZSBvYmplY3RcclxuICAqIGNhbiBiZSBnaXZlbiB0byBmbHV4aWZ5IGluIG9yZGVyIHRvIG1ha2UgaXQgd29yaywgdXNpbmcgdGhpcyBtZXRob2QuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7IFByb21pc2UgfSBQcm9taXNlIEVTNiBQcm9taXNlIGNvbXBhdGlibGUgb2JqZWN0XHJcbiAgKiBAcmV0dXJuIHsgdW5kZWZpbmVkIH1cclxuICAqL1xuXHRwcm9taXNpZnk6IGZ1bmN0aW9uIChQcm9taXNlKSB7XG5cdFx0dGhpcy5fUHJvbWlzZSA9IFByb21pc2U7XG5cdFx0dGhpcy5kaXNwYXRjaGVyLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmx1eGlmeSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvZmx1eGlmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG4vKipcclxuICogVGhlIGFzeW5jaHJvbm91cyBkaXNwYXRjaGVyIGNvbXBhdGlibGUgd2l0aCBGYWNlYm9vaydzIGZsdXggZGlzcGF0Y2hlclxyXG4gKiBodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL2ZsdXgvZG9jcy9kaXNwYXRjaGVyLmh0bWxcclxuICpcclxuICogRGlzcGF0Y2ggYWN0aW9ucyB0byB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3MsIHRob3NlIGFjdGlvbiBjYW4gYmVcclxuICogYXN5bmNocm9ub3VzIGlmIHRoZXkgcmV0dXJuIGEgUHJvbWlzZS5cclxuICovXG5cbnZhciBYRGlzcGF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdHRoaXMuX2Rpc3BhdGNoUXVldWUgPSBbXTtcblx0dGhpcy5fY3VycmVudERpc3BhdGNoID0gZmFsc2U7XG5cdHRoaXMuX0lEID0gMTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuWERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nIHwgRnVuY3Rpb259ICAgaWQgIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB0aGUgaWQgb2YgdGhlIGNhbGxiYWNrLlxyXG4gICogICAgICAgICAgICAgICAgICBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrLCBhbmQgaWQgaXMgZ2VuZXJhdGVkXHJcbiAgKiAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHkuXHJcbiAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgSWYgYW4gaWQgaXMgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQsIHRoaXMgd2lsbCBiZSB0aGUgY2FsbGJhY2suXHJcbiAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIElEID0gaWQ7XG5cblx0XHQvLyBJZiB0aGUgY2FsbGJhY2sgaXMgdGhlIGZpcnN0IHBhcmFtZXRlclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0SUQgPSAnSURfJyArIHRoaXMuX0lEO1xuXHRcdFx0Y2FsbGJhY2sgPSBpZDtcblx0XHR9XG5cblx0XHR0aGlzLl9jYWxsYmFja3NbSURdID0gY2FsbGJhY2s7XG5cdFx0dGhpcy5fSUQrKztcblxuXHRcdHJldHVybiBJRDtcblx0fSxcblxuXHQvKipcclxuICAqIFJlZ2lzdGVyIGEgWFN0b3JlIGluIHRoZSBkaXNwYWNoZXIuIFhTdG9yZXMgaGFzIGEgbWV0aG9kIGNhbGxlZCBjYWxsYmFjay4gVGhlIGRpc3BhdGNoZXJcclxuICAqIHJlZ2lzdGVyIHRoYXQgZnVuY3Rpb24gYXMgYSByZWd1bGFyIGNhbGxiYWNrLlxyXG4gICpcclxuICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgIFRoZSBpZCBmb3IgdGhlIHN0b3JlIHRvIGJlIHVzZWQgaW4gdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICogQHBhcmFtICB7WFN0b3JlfSB4U3RvcmUgU3RvcmUgdG8gcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcclxuICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFRoZSBpZCBvZiB0aGUgY2FsbGJhY2sgdG8gYmUgdXNlZCB3aXRoIHRoZSB3YWl0Rm9yIG1ldGhvZC5cclxuICAqL1xuXHRyZWdpc3RlclN0b3JlOiBmdW5jdGlvbiAoaWQsIHhTdG9yZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHhTdG9yZSwgJ19kaXNwYXRjaGVyJywge1xuXHRcdFx0dmFsdWU6IHRoaXNcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLnJlZ2lzdGVyKGlkLCB4U3RvcmUuY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogVW5yZWdpc3RlciBhIGNhbGxiYWNrIGdpdmVuIGl0cyBpZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIENhbGxiYWNrL1N0b3JlIGlkXHJcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgKi9cblx0dW5yZWdpc3RlcjogZnVuY3Rpb24gKGlkKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tpZF07XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBDcmVhdGVzIGEgcHJvbWlzZSBhbmQgd2FpdHMgZm9yIHRoZSBjYWxsYmFja3Mgc3BlY2lmaWVkIHRvIGNvbXBsZXRlIGJlZm9yZSByZXNvbHZlIGl0LlxyXG4gICogSWYgaXQgaXMgdXNlZCBieSBhbiBhY3Rpb25DYWxsYmFjaywgdGhlIHByb21pc2Ugc2hvdWxkIGJlIHJlc29sdmVkIHRvIGxldCBvdGhlciBjYWxsYmFja3NcclxuICAqIHdhaXQgZm9yIGl0IGlmIG5lZWRlZC5cclxuICAqXHJcbiAgKiBCZSBjYXJlZnVsIG9mIG5vdCB0byB3YWl0IGJ5IGEgY2FsbGJhY2sgdGhhdCBpcyB3YWl0aW5nIGJ5IHRoZSBjdXJyZW50IGNhbGxiYWNrLCBvciB0aGVcclxuICAqIHByb21pc2VzIHdpbGwgbmV2ZXIgZnVsZmlsbC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmc8QXJyYXk+fFN0cmluZ30gaWRzIFRoZSBpZCBvciBpZHMgb2YgdGhlIGNhbGxiYWNrcy9zdG9yZXMgdG8gd2FpdCBmb3IuXHJcbiAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQgd2hlbiB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrcyBhcmUgY29tcGxldGVkLlxyXG4gICovXG5cdHdhaXRGb3I6IGZ1bmN0aW9uIChpZHMpIHtcblx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHQgICAgaSA9IDA7XG5cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cblx0XHRmb3IgKDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuX3Byb21pc2VzW2lkc1tpXV0pIHByb21pc2VzLnB1c2godGhpcy5fcHJvbWlzZXNbaWRzW2ldXSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFwcm9taXNlcy5sZW5ndGgpIHJldHVybiB0aGlzLl9Qcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9Qcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiB0byBhbGwgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzL3N0b3Jlcy5cclxuICAqXHJcbiAgKiBJZiBhIHNlY29uZCBhY3Rpb24gaXMgZGlzcGF0Y2hlZCB3aGlsZSB0aGVyZSBpcyBhIGRpc3BhdGNoIG9uLCBpdCB3aWxsIGJlXHJcbiAgKiBlbnF1ZXVlZCBhbiBkaXNwYXRjaGVkIGFmdGVyIHRoZSBjdXJyZW50IG9uZS5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRkaXNwYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIGRpc3BhdGNoQXJndW1lbnRzID0gYXJndW1lbnRzLFxuXHRcdCAgICBwcm9taXNlLFxuXHRcdCAgICBkZXF1ZXVlO1xuXG5cdFx0aWYgKCF0aGlzLl9Qcm9taXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBwcm9taXNlcy4nKTtcblxuXHRcdC8vIElmIHdlIGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2gsIGVucXVldWUgdGhlIGRpc3BhdGNoXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREaXNwYXRjaCkge1xuXG5cdFx0XHQvLyBEaXNwYXRjaCBhZnRlciB0aGUgY3VycmVudCBvbmVcblx0XHRcdHByb21pc2UgPSB0aGlzLl9jdXJyZW50RGlzcGF0Y2gudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBtZS5fZGlzcGF0Y2guYXBwbHkobWUsIGRpc3BhdGNoQXJndW1lbnRzKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBFbnF1ZXVlLCBzZXQgdGhlIGNoYWluIGFzIHRoZSBjdXJyZW50IHByb21pc2UgYW5kIHJldHVyblxuXHRcdFx0dGhpcy5fZGlzcGF0Y2hRdWV1ZS5wdXNoKHByb21pc2UpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IHByb21pc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnREaXNwYXRjaCA9IHRoaXMuX2Rpc3BhdGNoLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbiBpbm1lZGlhdGVsbHkuXHJcbiAgKlxyXG4gICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdF9kaXNwYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIGRpc3BhdGNoQXJndW1lbnRzID0gYXJndW1lbnRzLFxuXHRcdCAgICBwcm9taXNlcyA9IFtdO1xuXG5cdFx0dGhpcy5fcHJvbWlzZXMgPSBbXTtcblxuXHRcdC8vIEEgY2xvc3VyZSBpcyBuZWVkZWQgZm9yIHRoZSBjYWxsYmFjayBpZFxuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2NhbGxiYWNrcykuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblxuXHRcdFx0Ly8gQWxsIHRoZSBwcm9taXNlcyBtdXN0IGJlIHNldCBpbiBtZS5fcHJvbWlzZXMgYmVmb3JlIHRyeWluZyB0byByZXNvbHZlXG5cdFx0XHQvLyBpbiBvcmRlciB0byBtYWtlIHdhaXRGb3Igd29yayBva1xuXHRcdFx0bWUuX3Byb21pc2VzW2lkXSA9IG1lLl9Qcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG1lLl9jYWxsYmFja3NbaWRdLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrIHx8IGVycik7XG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvbWlzZXMucHVzaChtZS5fcHJvbWlzZXNbaWRdKTtcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0dmFyIGRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtZS5fZGlzcGF0Y2hRdWV1ZS5zaGlmdCgpO1xuXHRcdFx0aWYgKCFtZS5fZGlzcGF0Y2hRdWV1ZS5sZW5ndGgpIG1lLl9jdXJyZW50RGlzcGF0Y2ggPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRlcXVldWUsIGRlcXVldWUpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogSXMgdGhpcyBkaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICovXG5cdGlzRGlzcGF0Y2hpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aDtcblx0fVxuXG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhEaXNwYXRjaGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBYRW1pdHRlciA9IHJlcXVpcmUoJy4veEVtaXR0ZXInKSxcbiAgICB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgU3RvcmUgPSBYRW1pdHRlci5fZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHByb3BzKSB7XG5cdFx0aWYgKCFwcm9wcykgcmV0dXJuIHRoaXMucHJvcHMgPSB7fTtcblxuXHRcdHRoaXMucHJvcHMgPSB7fTtcblx0XHRmb3IgKHZhciBwIGluIHByb3BzKSB0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbiAocHJvcCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzW3Byb3BdO1xuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG5cdFx0dmFyIHByb3BzID0gcHJvcCxcblx0XHQgICAgdXBkYXRlcyA9IFtdLFxuXHRcdCAgICBwcmV2aW91c1ZhbHVlLFxuXHRcdCAgICBwO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0cHJvcHMgPSB7fTtcblx0XHRcdHByb3BzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIHByb3BzKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twXSAhPSBwcm9wc1twXSkge1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlID0gdGhpcy5wcm9wc1twXTtcblx0XHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdFx0XHR1cGRhdGVzLnB1c2goe1xuXHRcdFx0XHRcdHByb3A6IHAsXG5cdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZTogcHJvcHNbcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHVwZGF0ZXMubGVuZ3RoKSB0aGlzLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHR9XG59KTtcblxudmFyIFhTdG9yZSA9IFhFbWl0dGVyLl9leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIG9wdHMgPSBvcHRpb25zIHx8IHt9LFxuXHRcdCAgICBzdG9yZSA9IG5ldyBTdG9yZShvcHRzLmluaXRpYWxTdGF0ZSksXG5cdFx0ICAgIGFjdGlvblR5cGUsXG5cdFx0ICAgIHN0YXRlUHJvcDtcblxuXHRcdC8vIFN0b3JlIGlkXG5cdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2lkJywge1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5pZFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVnaXN0ZXIgYWN0aW9uIGNhbGxiYWNrcyBpbiB0aGUgc3RvcmVcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRfY2FsbGJhY2tzOiB7XG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB7fVxuXHRcdFx0fSxcblx0XHRcdGFkZEFjdGlvbkNhbGxiYWNrczoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGNsYmtzKSB7XG5cdFx0XHRcdFx0Zm9yIChhY3Rpb25UeXBlIGluIGNsYmtzKSB7XG5cdFx0XHRcdFx0XHRtZS5fY2FsbGJhY2tzW2FjdGlvblR5cGVdID0gY2xia3NbYWN0aW9uVHlwZV0uYmluZCh0aGlzLCBzdG9yZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsYmFjayBmb3IgcmVnaXN0ZXIgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRcdGNhbGxiYWNrOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGFjdGlvblR5cGUgPSBhcmd1bWVudHNbMF0sXG5cdFx0XHRcdFx0ICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdKSB7XG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2tzIGFyZSBhbHJlYWR5IGJvdW5kIHRvIHRoaXMgeFN0b3JlIGFuZCB0aGUgbXV0YWJsZSBzdG9yZVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1thY3Rpb25UeXBlXS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZEFjdGlvbkNhbGxiYWNrcyhvcHRzLmFjdGlvbkNhbGxiYWNrcyB8fCB7fSk7XG5cblx0XHQvLyBDcmVhdGUgaW5tbXV0YWJsZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIGFkZFByb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BOYW1lLCB2YWx1ZSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBwcm9wTmFtZSwge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RvcmUuZ2V0KHByb3BOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGlmIChvcHRzLmluaXRpYWxTdGF0ZSkge1xuXHRcdFx0Zm9yIChzdGF0ZVByb3AgaW4gb3B0cy5pbml0aWFsU3RhdGUpIHtcblx0XHRcdFx0YWRkUHJvcGVydHkoc3RhdGVQcm9wLCBvcHRzLmluaXRpYWxTdGF0ZVtzdGF0ZVByb3BdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBFbWl0IG9uIHN0b3JlIGNoYW5nZVxuXHRcdHN0b3JlLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAodXBkYXRlcykge1xuXHRcdFx0dmFyIHVwZGF0ZXNMZW5ndGggPSB1cGRhdGVzLmxlbmd0aCxcblx0XHRcdCAgICB1cGRhdGUsXG5cdFx0XHQgICAgaTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHVwZGF0ZXNMZW5ndGg7IGkrKykge1xuXHRcdFx0XHR1cGRhdGUgPSB1cGRhdGVzW2ldO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBuZXcsIGFkZCBpdCB0byB0aGUgeFN0b3JlXG5cdFx0XHRcdGlmICghbWUuaGFzT3duUHJvcGVydHkodXBkYXRlLnByb3ApKSBhZGRQcm9wZXJ0eSh1cGRhdGUucHJvcCwgdXBkYXRlLnZhbHVlKTtcblxuXHRcdFx0XHRtZS5lbWl0KCdjaGFuZ2U6JyArIHVwZGF0ZS5wcm9wLCB1cGRhdGUudmFsdWUsIHVwZGF0ZS5wcmV2aW91c1ZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0bWUuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0Z2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBDbG9uZSB0aGUgc3RvcmUgcHJvcGVydGllc1xuXHRcdHJldHVybiB4VXRpbHMuX2V4dGVuZCh7fSwgdGhpcyk7XG5cdH0sXG5cblx0d2FpdEZvcjogZnVuY3Rpb24gKGlkcykge1xuXHRcdC8vIFRoZSB4RGlzcGF0Y2hlciBhZGRzIGl0c2VsZiBhcyBhIHByb3BlcnR5XG5cdFx0Ly8gd2hlbiB0aGUgeFN0b3JlIGlzIHJlZ2lzdGVyZWRcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci53YWl0Rm9yKGlkcyk7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhTdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mbHV4aWZ5L3NyYy94U3RvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHhVdGlscyA9IHJlcXVpcmUoJy4veFV0aWxzJyk7XG5cbi8vI2J1aWxkXG5cbnZhciBYRW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZXZlbnRzJywge1xuXHRcdHZhbHVlOiB7fVxuXHR9KTtcblxuXHRpZiAodHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSAnZnVuY3Rpb24nKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbi8vIFRoZSBwcm90b3R5cGUgbWV0aG9kcyBhcmUgc3RvcmVkIGluIGEgZGlmZmVyZW50IG9iamVjdFxuLy8gYW5kIGFwcGxpZWQgYXMgbm9uIGVudW1lcmFibGUgcHJvcGVydGllcyBsYXRlclxudmFyIGVtaXR0ZXJQcm90b3R5cGUgPSB7XG5cdG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lciwgb25jZSkge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblxuXHRcdGxpc3RlbmVycy5wdXNoKHsgY2FsbGJhY2s6IGxpc3RlbmVyLCBvbmNlOiBvbmNlIH0pO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b25jZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHR0aGlzLm9uKGV2ZW50TmFtZSwgbGlzdGVuZXIsIHRydWUpO1xuXHR9LFxuXG5cdG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbGlzdGVuZXIgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gbGlzdGVuZXIpIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuXHRcdCAgICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHQgICAgb25jZUxpc3RlbmVycyA9IFtdLFxuXHRcdCAgICBpLFxuXHRcdCAgICBsaXN0ZW5lcjtcblxuXHRcdC8vIENhbGwgbGlzdGVuZXJzXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG5cblx0XHRcdGlmIChsaXN0ZW5lci5jYWxsYmFjaykgbGlzdGVuZXIuY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncyk7ZWxzZSB7XG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIG5vdCBhIGNhbGxiYWNrLCByZW1vdmUhXG5cdFx0XHRcdGxpc3RlbmVyLm9uY2UgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobGlzdGVuZXIub25jZSkgb25jZUxpc3RlbmVycy5wdXNoKGkpO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBsaXN0ZW5lcnMgbWFya2VkIGFzIG9uY2Vcblx0XHRmb3IgKGkgPSBvbmNlTGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKG9uY2VMaXN0ZW5lcnNbaV0sIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuXG4vLyBFdmVudEVtaXR0ZXIgbWV0aG9kc1xueFV0aWxzLl9leHRlbmQoZW1pdHRlclByb3RvdHlwZSwge1xuXHRhZGRMaXN0ZW5lcjogZW1pdHRlclByb3RvdHlwZS5vbixcblx0cmVtb3ZlTGlzdGVuZXI6IGVtaXR0ZXJQcm90b3R5cGUub2ZmLFxuXHRyZW1vdmVBbGxMaXN0ZW5lcnM6IGVtaXR0ZXJQcm90b3R5cGUub2ZmLFxuXHRlbWl0OiBlbWl0dGVyUHJvdG90eXBlLnRyaWdnZXJcbn0pO1xuXG4vLyBNZXRob2RzIGFyZSBub3QgZW51bWVyYWJsZSBzbywgd2hlbiB0aGUgc3RvcmVzIGFyZVxuLy8gZXh0ZW5kZWQgd2l0aCB0aGUgZW1pdHRlciwgdGhleSBjYW4gYmUgaXRlcmF0ZWQgYXNcbi8vIGhhc2htYXBzXG5YRW1pdHRlci5wcm90b3R5cGUgPSB7fTtcbmZvciAodmFyIG1ldGhvZCBpbiBlbWl0dGVyUHJvdG90eXBlKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYRW1pdHRlci5wcm90b3R5cGUsIG1ldGhvZCwge1xuXHRcdHZhbHVlOiBlbWl0dGVyUHJvdG90eXBlW21ldGhvZF1cblx0fSk7XG59XG5cbi8vIEV4dGVuZCBtZXRob2QgZm9yICdpbmhlcml0YW5jZScsIG5vZCB0byBiYWNrYm9uZS5qc1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFhFbWl0dGVyLCAnX2V4dGVuZCcsIHtcblx0dmFsdWU6IGZ1bmN0aW9uIChwcm90b1Byb3BzKSB7XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMsXG5cdFx0ICAgIGNoaWxkO1xuXG5cdFx0aWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eShjb25zdHJ1Y3RvcikpIHtcblx0XHRcdGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3Rvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0eFV0aWxzLl9leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cblx0XHR2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gQWdhaW4gdGhlIGNvbnN0cnVjdG9yIGlzIGFsc28gZGVmaW5lZCBhcyBub3QgZW51bWVyYWJsZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicsIHtcblx0XHRcdFx0dmFsdWU6IGNoaWxkXG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXHRcdGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuXHRcdC8vIEFsbCB0aGUgZXh0ZW5kaW5nIG1ldGhvZHMgbmVlZCB0byBiZSBhbHNvXG5cdFx0Ly8gbm9uIGVudW1lcmFibGUgcHJvcGVydGllc1xuXHRcdGlmIChwcm90b1Byb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHByb3RvUHJvcHMpIHtcblx0XHRcdFx0aWYgKHAgIT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZC5wcm90b3R5cGUsIHAsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm90b1Byb3BzW3BdXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYRW1pdHRlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyNidWlsZFxuXG52YXIgeFV0aWxzID0ge1xuXHQvLyBPYmplY3QgZXh0ZW5kLCBOb2QgdG8gdW5kZXJzY29yZS5qc1xuXHRfZXh0ZW5kOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0dmFyIHNvdXJjZSwgcHJvcDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRmb3IgKHByb3AgaW4gc291cmNlKSBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxufTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSB4VXRpbHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eGlmeS9zcmMveFV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbmNvbnN0IFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG5jb25zdCBGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnRm9ybScsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgdmFyIHBhZ2VzID0gW3sgcGFnZU5hbWU6ICdQYWdlJyB9XTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGFnZXMpIHtcbiAgICAgICAgICAgIHBhZ2VzID0gdGhpcy5wcm9wcy5wYWdlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFnZXM6IHRoaXMucHJvcHMucGFnZXNcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IHRoaXMuc3RhdGUucGFnZXM7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lcicgfSwgcGFnZXMubWFwKGZ1bmN0aW9uIChwYWdlLCBpZHgpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2VMYWJlbCwgeyBrZXk6IGlkeCwgcGFnZUlkeDogaWR4IH0sIHBhZ2UpO1xuICAgICAgICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdwYWdlJyB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KCdmb3JtJywgbnVsbCwgdGhpcy5wcm9wcy5jaGlsZHJlbikpKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgUGFnZUxhYmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUGFnZUxhYmVsJyxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGxhYmVsIGNvbXBvbmVudFdpbGxNb3VudCcpXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZGlzYWJsZWQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHBhZ2UpIHtcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDRgdC+0LHRi9GC0LjQtSDQutC70LjQuiwg0L/QvtC00LPRgNGD0LbQsNC10Lwg0YHQstGP0LfQsNC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcbiAgICAgICAgLy8gICAgICAgYWxlcnQoJ2NsaWNrOicgKyBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGRvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDpkb2MuaWQsIHBhZ2VOYW1lOidMYXVzZW5kIGlkOicgKyBkb2MuaWRcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2xpY2sgcGFnZS5kb2NUeXBlSWQgJXMsIHBhZ2UuZG9jSWQgJW4nKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAncGFnZUxhYmVsJztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGhpcy5wcm9wcy5jaGlsZHJlbiksIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4ucGFnZU5hbWUsICcgJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2VfbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBhdHRlcm46ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOjB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6dmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTplZGl0ZWQ6JyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINGB0LvRg9GI0YPQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YU7XHJcbi8vICAgICAgICAgIGNvbnNvbGUubG9nKCdpbnB1dC10ZXh0IG9uIGNoYW5nZSBkYXRhOicsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtzZWxmLnByb3BzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6bmV4dFByb3BzLnZhbHVlIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuXHJcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IChuZXh0U3RhdGUudmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUgfHxcclxuICAgICAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgaXNQYXR0ZXJWYWxpZCA9IHRydWU7XHJcblxyXG4gIC8vICAgICAgY29uc29sZS5sb2coJ29uQ2hhbmdlIGZpZWxkVmFsdWUnLCB0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXR0ZXJuICYmIGZpZWxkVmFsdWUuY2hhckF0ICggZmllbGRWYWx1ZS5sZW5ndGggLSAxKSAhPT0gJy4nKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC+0LTQuNC8INC/0YDQvtCy0LXRgNC60YMg0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40LUg0YjQsNCx0LvQvtC90YNcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpZWxkVmFsdWUubWF0Y2godGhpcy5wcm9wcy5wYXR0ZXJuLCcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSAge1xyXG4gIC8vICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGF0dGVybiB2YWxlOicgKyBmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQv9Cw0YLRgtC10YDQvdGDXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygnb25DaGFuZ2UgZmllbGRWYWx1ZSBmaW5pc2gnLCB0aGlzLnByb3BzLm5hbWUsIHRoaXMuc3RhdGUudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcblxyXG4vKlxyXG4gICAgICAgIC8vINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC60YMsINC10YHQu9C4INC30LDQtNCw0L1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICB9XHJcbiovXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJyArICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgbXlTdHlsZSA9IHt3aWR0aDonYXV0byd9O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS13aWRnZXQtbGFiZWxcIiArIGlucHV0Q2xhc3NOYW1lfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeFxuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgICAgIG1heERhdGUgPSBuZXcgRGF0ZSh5ZWFyICsgMSwgbW9udGgsIGRheSksXHJcbiAgICAgICAgICAgIG1pbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyIC0gMSwgbW9udGgsIGRheSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46IG1pbkRhdGUsXHJcbiAgICAgICAgICAgIG1heDogbWF4RGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm5leHRQcm9wcy52YWx1ZSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsTW91bnQnICsgdGhpcy5wcm9wcy5uYW1lKTtcclxuLypcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgLyEqXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiohL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmRhdGE6JyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcblxyXG4gICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG5cclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcblxyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygnZGF0ZSByZW5kZXIgc3RhdGVzOicsdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgdmFyIGlucHV0Q2xhc3NOYW1lID10aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWU7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXREaXNhYmxlZCA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWV9LCBcIiBcIiwgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXCIgXCIsIHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMucHJvcHMubWluLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLnByb3BzLm1heCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgRE9DVU1FTlRfQ0xPU0VEX1NUQVRVUyA9IDI7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgRG9jQnV0dG9uQWRkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtYnV0dG9uLWFkZC5qc3gnKSxcclxuICAgIERvY0J1dHRvbkVkaXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1idXR0b24tZWRpdC5qc3gnKSxcclxuLy8gICAgRG9jQnV0dG9uRGVsZXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtYnV0dG9uLWRlbGV0ZS5qc3gnKSxcclxuICAgIERvY0J1dHRvblNhdmUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1idXR0b24tc2F2ZS5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5cclxuLy8gICAgRG9jQnV0dG9uUHJpbnQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1idXR0b24tcHJpbnQuanN4JylcclxuXHJcbnZhciBUb29sYmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlRvb2xiYXJcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB7d2FybmluZzogZmFsc2UsIHdhcm5pbmdNZXNzYWdlOiAnJywgZWRpdE1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgdGFza0xpc3Q6IHRoaXMucHJvcHMudGFza0xpc3Q/IHRoaXMucHJvcHMudGFza0xpc3Q6IHRoaXMuZ2V0RGVmYXVsdFRhc2soKSB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOnNhdmVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgNC10LbQuNC8INC40LfQvNC10L3QuNC70YHRjywg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdE1vZGU6IW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbi8qXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpicG0nLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlOmJwbScsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgNC10LbQuNC8INC40LfQvNC10L3QuNC70YHRjywg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYnBtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tzID0gbmV3VmFsdWUuZmlsdGVyKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlOmJwbSBmaWx0ZXInLCB0YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5zdGF0dXMgPT0gJ29wZW5lZCcgKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt0YXNrTGlzdDp0YXNrc30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVTZWxlY3RUYXNrOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIHZhciB0YXNrVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQnV0dG9uVGFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsNC60YLRg9Cw0LvRjNC90YPRjiDQt9Cw0LTQsNGH0YNcclxuXHJcbiAgICAgICAgbGV0IGFjdHVhbFRhc2sgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgaWYgKHRhc2suYWN0dWFsU3RlcCkge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFzayA9IGFjdHVhbFRhc2subWFwKGZ1bmN0aW9uKHRhc2spICB7cmV0dXJuIHRhc2suYWN0aW9ufSk7IC8vINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDQvdCw0LfQstCw0L3QuNC1INC/0YDQvtGG0LXQtNGD0YDRi1xyXG5cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdleGVjdXRlVGFzaycsIHRhc2spO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0TW9kZSxcclxuICAgICAgICAgICAgZG9jdW1lbnRTdGF0dXMgPSB0aGlzLnByb3BzLmRvY3VtZW50U3RhdHVzLFxyXG4gICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA9IGRvY3VtZW50U3RhdHVzID09IERPQ1VNRU5UX0NMT1NFRF9TVEFUVVMgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSB0aGlzLmdlbmVyYXRlVGFza1dpZGdldCgpLFxyXG4gICAgICAgICAgICB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QubWFwKGZ1bmN0aW9uKHRhc2spICB7cmV0dXJuIHRhc2suYWN0aW9ufSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXItd2FybmluZ1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YXJuaW5nPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnN0YXRlLndhcm5pbmdNZXNzYWdlKTogbnVsbFxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uQWRkLCB7dmFsdWU6IFwiQWRkXCIsIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uRWRpdCwge3ZhbHVlOiBcIkVkaXRcIiwgY2xhc3NOYW1lOiBcImRvYy10b29sYmFyXCJ9LCBcIiBFZGl0IFwiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDbG9zZWRTdGF0dXMgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChEb2NCdXR0b25TYXZlLCB7dmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRvciwgY2xhc3NOYW1lOiBcImRvYy10b29sYmFyXCJ9LCBcIiBTYXZlIFwiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGVNb2RlICYmIHRhc2tzLmxlbmd0aCA+IDAgPyBudWxsIDogdGFza1dpZGdldFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRUYXNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICAgW3tzdGVwOjAsIG5hbWU6J1N0YXJ0JywgYWN0aW9uOiAnc3RhcnQnLCBzdGF0dXM6ICdvcGVuZWQnfV1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlVGFza1dpZGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINCy0LjQtNC20LXRgiDQt9Cw0LTQsNGHXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50YXNrTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0YXNrTGlzdDp0aGlzLmdldERlZmF1bHRUYXNrKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSAnb3BlbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICB0YXNrV2lkZ2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB0YXNrcy5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKX0sIFwiIFwiLCB0YXNrLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlU2VsZWN0VGFza30sIG9wdGlvbnMsIFwiIFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhc2tOYW1lID0gdGFza3NbMF0ubmFtZTtcclxuICAgICAgICAgICAgLy8g0LrQvdC+0L/QutCwINGBINC30LDQtNCw0YfQtdC5XHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ1dHRvblRhc2ssIHZhbHVlOiB0YXNrTmFtZX0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXNrV2lkZ2V0O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMudmFsaWRhdG9yKCksXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nID0gIHdhcm5pbmdNZXNzYWdlICE9PSAnT2snO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdhcm5pbmdNZXNzYWdlOiAgd2FybmluZ01lc3NhZ2UsIHdhcm5pbmc6IHdhcm5pbmd9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd2FybmluZztcclxuICAgIH1cclxuXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVG9vbGJhcjtcclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBEb2NCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG9jQnV0dG9uXCIsXHJcbiAgICBuYW1lOiAnYnRuQWRkJyxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtlbmFibGVkOiB0cnVlfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINGA0LXQttC40Lwg0LjQt9C80LXQvdC40LvRgdGPLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYnRuQWRkIGNoYW5nZTplZGl0ZWQgJyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VuYWJsZWQ6IW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpzYXZlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YDQtdC20LjQvCDQuNC30LzQtdC90LjQu9GB0Y8sINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidG5BZGQgY2hhbmdlOnNhdmVkICcgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlbmFibGVkOm5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0YLQv9GA0LDQstC40Lwg0LjQt9Cy0LXRidC10L3QuNC1INC90LDQstC10YDRhVxyXG4vLyAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMubmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2J0bkFkZCBjbGlja2VkJyk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgMCApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdlZGl0ZWRDaGFuZ2UnLCB0cnVlICk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NhdmVkQ2hhbmdlJywgZmFsc2UgKTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7dHlwZTogXCJidXR0b25cIiwgdmFsdWU6IFwiIEFkZCBcIiwgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja30sIFwiIEFkZCBcIikpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHt0eXBlOiBcImJ1dHRvblwiLCBkaXNhYmxlZDogdHJ1ZSwgdmFsdWU6IFwiIEFkZCBcIiwgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja30sIFwiIEFkZCBcIikpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQnV0dG9uXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1idXR0b24tYWRkLmpzeFxuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IERvY0J1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEb2NCdXR0b25cIixcclxuICAgIG5hbWU6ICdidG5FZGl0JyxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtlbmFibGVkOnRydWV9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINGA0LXQttC40Lwg0LjQt9C80LXQvdC40LvRgdGPLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlbmFibGVkOiFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6c2F2ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINGA0LXQttC40Lwg0LjQt9C80LXQvdC40LvRgdGPLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlbmFibGVkOm5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10LLQvtC00LjQvCDQtNC+0LrRg9C80LXQvdGCINCyINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjywg0YHQvtGF0YDQsNC90LXQvSA9IGZhbHNlXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2VkaXRlZENoYW5nZScsIHRydWUgKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCBmYWxzZSApO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge3R5cGU6IFwiYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja1xyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7ZGlzYWJsZWQ6IHRydWV9LCB0aGlzLnByb3BzLmNoaWxkcmVuKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NCdXR0b247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi1lZGl0LmpzeFxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IERvY0J1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEb2NCdXR0b25cIixcclxuICAgIG5hbWU6ICdidG5TYWx2ZXN0YScsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7ZW5hYmxlZDogZmFsc2UsIHJlYWRPbmx5OiBmYWxzZX07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRjyBzYXZlZC5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6c2F2ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINGA0LXQttC40Lwg0LjQt9C80LXQvdC40LvRgdGPLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYnRuU2F2ZSBjaGFuZ2U6c2F2ZWQgJyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VuYWJsZWQ6IW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljazogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINCy0LDQu9C40LTQsNGC0L7RgFxyXG5jb25zb2xlLmxvZygnc3RhcnQgdmFsaWRhdG9yJylcclxuICAgICAgICB2YXIgaXNWYWxpZCA9ICF0aGlzLnByb3BzLnZhbGlkYXRvcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaW5zaWhlZCB2YWxpZGF0b3InKVxyXG5cclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7RiNC70Lgg0LLQsNC70LjQtNCw0YbQuNGOLCDRgtC+INGB0L7RhdGA0LDQvdC10Y/QvFxyXG4gICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlRGF0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2t9LCBcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2Rpc2FibGVkOiB0cnVlfSwgdGhpcy5wcm9wcy5jaGlsZHJlbikpXHJcbiAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NCdXR0b247XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1idXR0b24tc2F2ZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlVGltZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGV0aW1lLmpzeCcpO1xyXG4vLyAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBEb2NDb21tb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG9jQ29tbW9uXCIsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjc1JVwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7c3R5bGU6IHtkaXNwbGF5Oictd2Via2l0LWlubGluZS1ib3gnfX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzIgZm9ybS13aWRnZXQtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5jcmVhdGVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVwZGF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdHVwZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubGFzdHVwZGF0ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdGF0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdGF0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQ29tbW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24uanN4XG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlVGltZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dERhdGVUaW1lXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIHJlYWRPbmx5OiB0cnVlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbE1vdW50JyArIHRoaXMucHJvcHMubmFtZSk7XHJcbi8qXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6MH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcblxyXG4gLy8gICAgICAgY29uc29sZS5sb2coJ3Zhc3R1czonICsgcmV0dXJudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncHJvcHM6JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKTtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPXRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXREaXNhYmxlZCA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZXRpbWUtbG9jYWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRldGltZS1sb2NhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGVUaW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcbi8vICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4Jyk7XHJcblxyXG5jb25zdCBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGliRGF0YSA9IFtdO1xyXG4gICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0LTQsNC90L3Ri9C1INC40Lcg0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICAgICAgICAgIGRhdGEgPSBsaWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMpLFxyXG4gICAgICAgICAgICBpZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTsgLy8g0LTQu9GPINC/0YDQuNCy0Y/Qt9C60Lgg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdLmRhdGEpIHtcclxuICAgICAgICAgICAgbGliRGF0YSA9IGRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUgLyog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqLyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBsaWJEYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8q0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC4INC/0L7Qu9GPIGNvbGxJZCAqLyxcclxuICAgICAgICAgICAgYnJuRGVsZXRlOiB0aGlzLnByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi99O1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kRmllbGRWYWx1ZTogZnVuY3Rpb24gKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIC8vIGtvb2QgLT4gaWRcclxuICAgICAgICB2YXIgaWQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSByb3cuaWQ7XHJcbi8vICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiByb3cuaWQsIGZpZWxkVmFsdWU6IHJvd1tjb2xsSWRdfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFZhbHVlQnlJZDogZnVuY3Rpb24oY29sbElkLCByb3dJZCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQt9C90LDRh9C10L3QuNGPINC/0L7Qu9GPINC/0L4g0LLRi9Cx0YDQsNC90L3QvtC80YMg0JjQlFxyXG5cclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1snaWQnXSA9PSByb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJvd1tjb2xsSWRdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmllbGRWYWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXRgiDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDQstC40LTQttC10YLQsCwg0L/QvtC60LAg0LPRgNGD0LfQuNGC0YHRjyDRgdC/0YDQsNCy0L7Rh9C90LjQulxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgcHJvcFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICBmaWVsZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0L3QsNC50LTQtdC8INC/0L4g0LjQtCDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPINCyIGNvbGxJZFxyXG4gICAgICAgIHRoaXMuZ2V0VmFsdWVCeUlkKHRoaXMucHJvcHMuY29sbElkLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC40LQg0LrQsNC6IHZhbHVlXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6ZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICBpZiAocHJvcFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0L/RgNC40LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB0aGlzLnByb3BzLm5hbWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGFPcHRpb25zID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBPcHRpb25zID0gbnVsbCxcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTsgLy8g0JTQsNC00LjQvCDQtNC10YTQvtC70YLQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8g0LLQuNC00LbQtdGC0LAsINGH0YLQvtCxINC/0L7QutCw0YLRjCDQtdCz0L4g0YHRgNCw0LfRgywg0LTQviDQv9C+0LTQs9GA0YPQt9C60Lgg0LHQuNCx0LvQuNC+0YLQtdC60LhcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZG9rKSB7XHJcbiAgICAgICAgICAgIC8vINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDQt9Cw0LTQsNC90YvQuSBcItGB0L/RgNCw0LLQvtGH0L3QuNC6XCJcclxuICAgICAgICAgICAgZGF0YU9wdGlvbnMgPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRvayA9PT0gdGhpcy5wcm9wcy5kb2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlKSB7IC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YMg0LIg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0L/Rg9GB0YLQvtC5INGB0YLRgNC+0LrQuCDQsiDQvNCw0YHRgdC40LLQtVxyXG5cclxuICAgICAgICAgICAgbGV0IGVtcHR5T2JqID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9iaikgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZW1wdHlPYmogfHwgZW1wdHlPYmoubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zLnNwbGljZSgwLCAwLCB7aWQ6IDAsIGtvb2Q6ICcnLCBuYW1lOiAnJ30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YU9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBkYXRhT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBpdGVtLmlkLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IGRhdGFWYWx1ZS5sZW5ndGggPiAwID8gZGF0YVZhbHVlWzBdLm5hbWUgOiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPcHRpb25zID0gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKX0sIFwiIEVtcHR5IFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHdpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwge3ZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt3aWR0aDonMTAwJScsIGhlaWdodDonMTAwJSd9fSwgT3B0aW9ucyk7IC8vINC10YHQu9C4INC00LvRjyDQs9GA0LjQtNCwLCDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0YHQtdC70LXQutGCXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudGl0bGUpIHtcclxuICAgICAgICAgICAgd2lkZ2V0ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2Rpc3BsYXk6J2lubGluZS1ibG9jayd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIGNsYXNzTmFtZTogXCJ1aS1jMSBkb2MtaW5wdXQtcmVhZG9ubHlcIiwgdmFsdWU6IGlucHV0RGVmYXVsdFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBcInRydWVcIn0pIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/IG51bGwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX0sIE9wdGlvbnMpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYnRuRGVsZXRlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJ1aS1jMS1idXR0b25cIiwgb25DbGljazogdGhpcy5idG5EZWxDbGlja30sIFwiIERlbGV0ZSBcIikgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHdpZGdldClcclxuICAgIH0sXHJcblxyXG4gICAgYnRuRGVsQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L/QviDQstGL0LfQvtCy0YMg0LrQvdC+0L/QutGDINGD0LTQsNC70LjRgtGMLCDQvtCx0L3Rg9C70Y/QtdGCINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpudWxsfSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4XG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXRcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgcmVhZE9ubHk6IHRydWUsIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWV9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6MH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZygnaW5wdXQtdGV4dCBvbiBjaGFuZ2UgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NlbGYucHJvcHMubmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCd2YXN0dXM6JyArIHJldHVybnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdpbnB1dC10ZXh0IHN0YXRlOicgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSArICdwcm9wczonICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpO1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBteVN0eWxlID0ge3dpZHRoOidhdXRvJ307O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBHcmlkQnV0dG9uID0gcmVxdWlyZSgnLi9teWJ1dHRvbicpO1xyXG5cclxudmFyIE15Q2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJNeUNlbGxcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCBlZGl0YWJsZTogZmFsc2UsIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmdyaWRDZWxsRWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10YIg0LzQvtC80LXQvdGCINC/0LXRgNC10YXQvtC00LAg0L3QsCDQtNGA0YPQs9GD0Y4g0Y/Rh9C10LnQutGDXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gc2VsZi5wcm9wcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBzZWxmLnJlZnNbJ2NlbGwtJyArIHNlbGYucHJvcHMuaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTsgLy8g0YPQsdC40YDQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZXZhbCgnZGF0YS4nICsgc2VsZi5wcm9wcy5ncmlkRGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSAmJiBncmlkRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICF0aGlzLnN0YXRlLmVkaXRhYmxlO1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRhYmxlOiB2YWx1ZX0pO1xyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjZWxsIGNsaWNrJyArIHZhbHVlICsgJyBpZDonICsgdGhpcy5wcm9wcy5pZCArICdyZWFkT25seTonICsgdGhpcy5zdGF0ZS5yZWFkT25seSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUsIGJpbmRUb0NlbGwpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRjyDRj9GH0LXQudC60Lgg0Lgg0L/QuNGI0LXRgiDQsiDRhdGA0LDQvdC40LvRidC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyB0aGlzLnByb3BzLmdyaWREYXRhU291cmNlKSB8fCBbXSxcclxuICAgICAgICAgICAgY2VsbE5hbWUgPSBiaW5kVG9DZWxsID8gYmluZFRvQ2VsbCA6IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuXHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgaWYgKGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxWYWx1ZSA9IGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcclxuICAgICAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvRhdC+0LTQuNC8INC40Lcg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzRWRpdCA9IChmbHV4LnN0b3Jlcy5kb2NTdG9yZS5lZGl0ZWQgJiYgIXRoaXMuc3RhdGUuZGlzYWJsZWQpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjZWxsID0gdGhpcy5wcm9wcy5jZWxsLCAvLyDQv9Cw0YDQsNC80LXRgtGA0Ysg0Y/Rh9C10LnQutC4XHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSAhZmx1eC5zdG9yZXMuZG9jU3RvcmUuZWRpdGVkLFxyXG4vLyAgICAgICAgICAgIGNlbGxUeXBlID0gY2VsbC50eXBlIHx8ICdzcGFuJzsgLy8g0L3QsNGF0L7QtNC40YLRgdGPINC70Lgg0LTQvtC6INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgIGNlbGxUeXBlID0gJ3NwYW4nOyAvLyDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDQtNC+0Log0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgaXNSZWFkT25seSA9IGNlbGwucmVhZE9ubHkgPyB0cnVlIDogaXNSZWFkT25seTsgLy8g0L/QvtC/0YDQsNCy0LrQsCDQvdCwINGB0LLQvtC50YHRgtCy0L4g0Y/Rh9C10LnQutC4LCDQtNC+0YHRgtGD0L/QvdCwINC70Lgg0L7QvdCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y5cclxuLy8gICAgICAgICAgICBjbGFzc05hbWUgPSAnZm9ybS13aWRnZXQnOyAvLysgdCBoaXMuc3RhdGUuZWRpdGFibGU/ICcgZm9jdXNlZCc6ICcnO1xyXG4gICAgICAgIGlzUmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHZhciBFZGl0RWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lfSwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgc3dpdGNoIChjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSd0ZXh0JyByZWFkT25seT17aXNSZWFkT25seX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0eWxlPXt7d2lkdGg6JzEwMCUnfX1cclxuICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfS8+XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSdudW1iZXInIHJlYWRPbmx5PXtpc1JlYWRPbmx5fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gc3R5bGU9e3t3aWR0aDonMTAwJSd9fVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9Lz5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPFNlbGVjdCAgbmFtZT17Y2VsbC52YWx1ZUZpZWxkTmFtZX0gbGlicz17Y2VsbC5kYXRhU2V0fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gZGVmYXVsdFZhbHVlID0ge3RoaXMuc3RhdGUudmFsdWV9IGNvbGxJZCA9IHtjZWxsLmlkfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0vPlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUudmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7cmVmOiAnY2VsbC0nICsgdGhpcy5wcm9wcy5pZCwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHt3aWR0aDpjZWxsLndpZHRofX0sIFxyXG4gICAgICAgICAgICAgICAgRWRpdEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEYXRhR3JpZFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByZXBhaXJlR3JpZERhdGEodGhpcy5wcm9wcy5ncmlkRGF0YSksXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEdyaWRSb3dFZGl0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHNlbGYuZGVsUm93KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIExpc3RlbiBncmlkRGF0YSBjaGFuZ2VzIGFuZCB0aGVuIGNhbGxiYWNrcyBmb3Igcm93IGRhdGEgY2hhbmdlc1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdEYXRhLCBvbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdEYXRhLmxlbmd0aCA+IDAgJiYgb2xkRGF0YSAhPT0gbmV3RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbENsaWNrOiBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgaWR4KTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZDtcclxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCByb3dJZCA6JyArIHJvd0lkICsgJ3Jvd0luZGV4OicgKyBpZHgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZGVsUm93OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C40Lwg0YHRgtGA0L7QutGDINC30LDQtNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDINC40LvQuCDQstGB0LUsINC10YHQu9C4INC40L3QtNC10LrRgSDQvdC1INC30LDQtNCw0L1cclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBzdGFydCA9IDEsXHJcbiAgICAgICAgICAgIGZpbmlzaCA9IGdyaWREYXRhLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4IHx8IGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBpbmRleDtcclxuICAgICAgICAgICAgZmluaXNoID0gMTtcclxuICAgICAgICB9XHJcbi8vICAgICAgICBncmlkRGF0YS5zcGxpY2Uoc3RhcnQsIGZpbmlzaCk7XHJcbiAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFydCB8fCBpbmRleCA+IChzdGFydCArIGZpbmlzaCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBuZXdSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL9Cy0LXRgNC90LXRgiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0LPRgNC40LTQsCwg0L3QsCDQvtGB0L3QvtCy0LUg0YjQsNCx0LvQvtC90LBcclxuXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XHJcbiAgICAgICAgICAgIHJvd1tmaWVsZF0gPSAnJztcclxuICAgICAgICB9XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnbmV3IHJvdzonICsgSlNPTi5zdHJpbmdpZnkoZ3JpZERhdGEpKTtcclxuLy8gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWREYXRhOmdyaWREYXRhfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdztcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFpcmVHcmlkRGF0YTogZnVuY3Rpb24gKHNvdXJjZURhdGEpIHtcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBbXTtcclxuICAgICAgICBncmlkRGF0YSA9IHNvdXJjZURhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9Cw0LXQvCDRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QudC00LXQvCDQv9C+INC90L7QstC+0Lkg0YHRgtGA0L7QutC1INC4INC30LDQv9C+0LvQvdC40Lwg0LXQtSDQv9C+0LvRjyDQt9C90LDRh9C10L3QuNGP0LzQuCDQuNC3INC40YHRgtC+0YfQvdC40LrQsFxyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCfRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDOicgKyBKU09OLnN0cmluZ2lmeShyb3cpICsgJyBuZXdSb3c6JyArIEpTT04uc3RyaW5naWZ5KG5ld1JvdykpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvdykge1xyXG4vLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5OicgKyBKU09OLnN0cmluZ2lmeShrZXkpKTtcclxuICAgICAgICAgICAgICAgIG5ld1Jvd1trZXldID0gcm93W2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ld1JvdzsgLy8g0LLQtdGA0L3QtdC8INGB0YTQvtGA0LzQuNGA0L7QstCw0L3QvdGD0Y4g0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICB9LCB0aGlzKTtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdncmlkRGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZ3JpZERhdGEpICk7XHJcbiAgICAgICAgcmV0dXJuIGdyaWREYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C10L3QuNC1INGB0YLRgNC+0LrQuCDQuNC3INCz0YDQuNC00LBcclxuICAgICAgICB2YXIgcm93SW5kZXggPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQ7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVSb3c6JyArIHJvd0luZGV4KTtcclxuICAgICAgICB0aGlzLmRlbFJvdyhyb3dJbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzO1xyXG5cclxuICAgICAgICBuZXdSb3cuaWQgPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7IC8vINCz0LXQvdC10YDQuNC8INC90L7QstC+0LUg0LjQtFxyXG4vLyAgICAgICAgZ3JpZERhdGEucHVzaChuZXdSb3cpO1xyXG4vLyAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGVkOiB0cnVlLCBjbGlja2VkOiBncmlkRGF0YS5sZW5ndGh9KTtcclxuXHJcbiAgICAgICAgLy8g0LfQtNC10YHRjCDQstGB0YLQsNCy0LjRgtGMINGB0YLRgNC+0LrRgyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuLy8gICAgICAgIGRldGFpbHMucHVzaChuZXdSb3cpO1xyXG4vLyAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCAtMSk7IC8vINC+0YLQvNC10YLQuNC8INCyINGF0YDQsNC90LjQu9C40YnQtSDQvdC+0LzQtdGAINGB0YLRgNC+0LrQuFxyXG5cclxuICAvLyAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUdyaWRSb3coJ0FERCcsIG5ld1Jvdyk7XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZWRpdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBkZXRhaWxzW2ZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZF1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVHcmlkUm93KCdFRElUJyxyb3cgKTsgLy8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LzQvtC00LDQu9GM0L3QvtC8INC+0LrQvdC1XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCByZW5kZXInLCB0aGlzLnByb3BzKTtcclxuICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMHB4J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICd0aCc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3dzID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuY2xpY2tlZCxcclxuICAgICAgICAgICAgaXNSZWFkT25seSA9IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGNlbGxJZCA9IDAsXHJcbiAgICAgICAgICAgIGdyaWREYXRhU291cmNlID0gdGhpcy5wcm9wcy5zb3VyY2U7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAhaXNSZWFkT25seSA/XHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uLCB7b25DbGljazogdGhpcy5hZGRSb3csIGJ1dHRvblZhbHVlOiBcIkFkZCByb3dcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uLCB7b25DbGljazogdGhpcy5lZGl0Um93LCBidXR0b25WYWx1ZTogXCJFZGl0IHJvd1wifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b24sIHtvbkNsaWNrOiB0aGlzLmRlbGV0ZVJvdywgYnV0dG9uVmFsdWU6IFwiRGVsZXRlIHJvd1wifSlcclxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyrQt9Cw0LPQvtC70L7QstC+0LoqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRTdHlsZS53aWR0aCA9IGNvbHVtbi53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICd0aC0nICsgY29sdW1uLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5zaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/QvtC60LDQt9Cw0YLRjCDQuNC7INGB0LrRgNGL0YLRjCDQutC+0LvQvtC90LrRg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2hpZGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCB7c3R5bGU6IGdyaWRTdHlsZSwgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGtleTogJ3RoLScgKyBpbmRleCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBcImNvbFwifSwgY29sdW1uLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd3MubWFwKGZ1bmN0aW9uIChyb3csIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNsYXNzID0gJ25vdEZvY3VzZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SWQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNsYXNzID0gJ2ZvY3VzZWQnOyAvLyDQv9C+0LTRgdCy0LXRgtC40Lwg0LLRi9Cx0YDQsNC90L3Rg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7b25DbGljazogdGhpcy5oYW5kbGVDZWxsQ2xpY2suYmluZCh0aGlzLGluZGV4KSwgY2xhc3NOYW1lOiBteUNsYXNzLCBrZXk6ICd0ci0nK2luZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjZWxsLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkU3R5bGUud2lkdGggPSBjZWxsLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5zaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9C+0LrQsNC30LDRgtGMINC40Lsg0YHQutGA0YvRgtGMINC60L7Qu9C+0L3QutGDPyDQuNGB0L/Qu9C70LTRjNC30YPQtdC8INC60LvQsNGB0YEuINCU0L7Qu9C20LXQvSDQsdGL0YLRjCDQv9GA0L7Qv9C40YHQsNC9INCyIGNzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2hpZGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNeUNlbGwsIHtjZWxsOiBjZWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBjZWxsLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJZDogcm93SWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YVNvdXJjZTogZ3JpZERhdGFTb3VyY2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaXNSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBncmlkU3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93W2NlbGwuaWRdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpbmRleCwgaWQ6IGNlbGxJZCsrfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFHcmlkO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeFxuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNeUJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015QnV0dG9uJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5idXR0b25WYWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25DbGljayB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICAvLyDQstC10YDQvdC10Lwg0LIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtGB0YLQvtGP0L3QuNC5INGB0L7QsdGL0YLQuNC1INC60LvQuNC6XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE15QnV0dG9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215YnV0dG9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpO1xyXG5cclxuXHJcbnZhciBBcnZHcmlkUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFydkdyaWRSb3dcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvdzogdGhpcy5wcm9wcy5ncmlkUm93RGF0YSwgY2hlY2tlZDogZmFsc2UsIHdhcm5pbmc6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10YIg0YHQvtCx0YvRgtC40LUg0LrQu9C40LpcclxuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFsnbm9taWQnLCAna29ndXMnLCAnaGluZCcsICdrYm0nLCAna2JtdGEnLCAnc3VtbWEnXSxcclxuICAgICAgICAgICAgZGF0YSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwXHJcblxyXG4gICAgICAgICAgICAvLyDRgdC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuCDQvdCwINC+0LHRgNCw0LHQvtGC0LrRg1xyXG4gICAgICAgICAgICBjb21wb25lbnRzLm1hcChmdW5jdGlvbihjb21wb25lbnQpICB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLnZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydrb2d1cyddLnNldFN0YXRlKHt2YWx1ZTogMC4wMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydoaW5kJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtdGEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY2FsY1Jvd1N1bW0oKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUlucHV0OiBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGB0YfQtdGCINGB0YPQvNC8XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZWNhbGNSb3dTdW1tOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGtvZ3VzID0gTnVtYmVyKHRoaXMucmVmc1sna29ndXMnXS5zdGF0ZS52YWx1ZSksXHJcbiAgICAgICAgICAgIGhpbmQgPSBOdW1iZXIodGhpcy5yZWZzWydoaW5kJ10uc3RhdGUudmFsdWUpLFxyXG4gICAgICAgICAgICBrYm10YSA9IGtvZ3VzICogaGluZCxcclxuICAgICAgICAgICAga2JtID0ga29ndXMgKiBoaW5kICogMC4yMCwgLy8g0LLRgNC80LXQvdC90L5cclxuICAgICAgICAgICAgc3VtbWEgPSBrYm10YSArIGtibTtcclxuICAgICAgICB0aGlzLnJlZnNbJ2tibSddLnNldFN0YXRlKHt2YWx1ZToga2JtfSk7XHJcbiAgICAgICAgdGhpcy5yZWZzWydrYm10YSddLnNldFN0YXRlKHt2YWx1ZToga2JtdGF9KTtcclxuICAgICAgICB0aGlzLnJlZnNbJ3N1bW1hJ10uc2V0U3RhdGUoe3ZhbHVlOiBzdW1tYX0pO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgIHZhciB3YXJuaW5nID0gJyc7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7QtCDRg9GB0LvRg9Cz0LgnO1xyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydrb2d1cyddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gd2FybmluZyArICcg0LrQvtC7LdCy0L4nO1xyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydoaW5kJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDRhtC10L3QsCc7XHJcblxyXG4gICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyIGNzc1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHtcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgbWFyZ2luOiAnMTAlIDMwJSAxMCUgMzAlJyxcclxuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgb3BhY2l0eTogJzEnLFxyXG4gICAgICAgICAgICB0b3A6ICcxMDBweCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIi5tb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7dGl0bGU6IFwiVGVlbnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwibm9tZW5jbGF0dXJlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rOiBcIkFSVlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93Lm5vbWlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5vbWlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVGVlbnVzZSBrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLb2d1cyBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29ndXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua29ndXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtvZ3VzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiSGluZCBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaGluZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5oaW5kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgcmVmOiBcImhpbmRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJTdW1tYSBrYm0tdGE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm10YVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rYm10YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYm10YVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIkvDpGliZW1ha3M6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuc3VtbWEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGVNZXNzYWdlKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gPGRpdj5cclxuIHtidXR0b25Pa1JlYWRPbmx5ID9cclxuIDxidXR0b24gZGlzYWJsZWQ+IE9rIDwvYnV0dG9uPjpcclxuIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ09rJyl9PiBPayA8L2J1dHRvbj5cclxuIH1cclxuIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpfT4gQ2FuY2VsPC9idXR0b24+XHJcbiA8L2Rpdj5cclxuICovXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnZHcmlkUm93O1xyXG5cclxuLypcclxuIDxJbnB1dFRleHQgdGl0bGU9J0tvb2QgJyBuYW1lPSdrb29kJyB2YWx1ZT17cm93Lmtvb2R9IHJlYWRPbmx5PXtmYWxzZX1cclxuIGRpc2FibGVkPVwiZmFsc2VcIiByZWY9J2tvb2QnID48L0lucHV0VGV4dD5cclxuICovXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2Fydi1ncmlkLXJvdy5qc3hcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xyXG5cclxuXHJcbnZhciBtb2RhbFBhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwibW9kYWxQYWdlXCIsXHJcbiAgICBoYW5kbGVCdG5DbGljazogZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrKGJ0bkV2ZW50KTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdkZWZhdWxOYW1lJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbFBhZ2UgdGhpcy5wcm9wcycsIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJoZWFkZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7aWQ6IFwiaGVhZGVyTmFtZVwifSwgXCIgXCIsIHRoaXMucHJvcHMubW9kYWxQYWdlTmFtZSwgXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQ29udGVudFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibW9kYWxQYWdlQnV0dG9uc1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsJ09rJyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5Pa1wifSwgXCIgT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtb2RhbFBhZ2VCdXR0b25zXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnRuQ2FuY2VsXCJ9LCBcIiBDYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsUGFnZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4XG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIFxyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSB8fCBmYWxzZSwgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWUsXHJcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiaW5kRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOi05OTk5OTk5OTksXHJcbiAgICAgICAgICAgIG1heDogOTk5OTk5OTk5XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxNb3VudCcgKyB0aGlzLnByb3BzLm5hbWUpO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiAwfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmRhdGE6JyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgIC8qXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpuZXh0UHJvcHMudmFsdWUgfSlcclxuICAgIH0sKi9cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG4gICAgICAgIHZhciByZXR1cm52YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUucmVhZE9ubHkgIT09IHRoaXMuc3RhdGUucmVhZE9ubHkgfHxcclxuICAgICAgICAgICAgbmV4dFN0YXRlLmRpc2FibGVkICE9PSB0aGlzLnN0YXRlLmRpc2FibGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA+PSBOdW1iZXIodGhpcy5wcm9wcy5taW4pIHx8IGZpZWxkVmFsdWUgPD0gTnVtYmVyKHRoaXMucHJvcHMubWF4KSkge1xyXG4gICAgICAgICAgICAvLyDQt9Cw0LTQsNC90L3QvtC1INC+0LPRgNCw0L3QuNGH0LXQvdC40LUg0L3QtSDRgNCw0LHQvtGC0LDQtdGCINC/0YDQuCDRgNGD0YfQvdC+0Lwg0LLQstC+0LTQtSDRgdGD0LzQvCwg0L7RgtGA0LDQsdC+0YLQsNC10Lwg0LXQs9C+XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5iaW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC40Y/QstGP0LfQutCwINC6INC00LDQvdC90YvQvFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB0aGlzLnByb3BzLm5hbWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmx1cjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YLQsNC60L7QuSDQvNC10YLQvtC0INC/0LXRgNC10LTQsNC9INGB0LLQtdGA0YXRgywg0YLQviDQstC10YDQvdC10YIg0LXQs9C+INC+0LHRgNCw0YLQvdC+XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMucHJvcHMubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJyArICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQgfHwgJ2ZhbHNlJyxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dE1pblZhbHVlID0gdGhpcy5wcm9wcy5taW4gfHwgLTk5OTk5OTk5OSxcclxuICAgICAgICAgICAgaW5wdXRNYXhWYWx1ZSA9IHRoaXMucHJvcHMubWF4IHx8IDk5OTk5OTk5OTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2h0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJcXFxcZCsoXFxcXC5cXFxcZHsyfSk/XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgKSlcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I6IHRoaXMucHJvcHMubmFtZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogaW5wdXRNaW5WYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogaW5wdXRNYXhWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IFwiMC4wMVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJcXFxcZCsoXFxcXC5cXFxcZHsyfSk/XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY1N0b3JlID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgaWQ6ICdkb2NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGdyaWRDZWxsRWRpdGVkOiAwLCAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INCyINCz0YDQuNC00LUg0YDQtdC00LDQutGC0LjRgNGD0LXQvNGD0Y4g0Y/Rh9C10LnQutGDXG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICBkZXRhaWxzOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0LPRgNC40LRcbiAgICAgICAgcmVsYXRpb25zOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0YHQstGP0LfQsNC90L3Ri9C1INC00L7QutGD0LzQtdC90YLRi1xuICAgICAgICBncmlkQ29uZmlnOiBbXSwgLy8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINCz0YDQuNC00LBcbiAgICAgICAgZ3JpZE5hbWU6ICcnLFxuICAgICAgICBkb2NJZDogMCxcbiAgICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICAgIGVkaXRlZDogZmFsc2UsXG4gICAgICAgIHNhdmVkOiB0cnVlLFxuICAgICAgICBncmlkUm93SWQ6IDAsXG4gICAgICAgIGxpYnM6IFt7XG4gICAgICAgICAgICBpZDogJ2FzdXR1c2VkJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTpbe2lkOjEsIG5hbWU6XCJBc3V0dXMgMVwifSx7aWQ6MiwgbmFtZTpcIkFzdXR1cyAyXCJ9LHtpZDozLCBuYW1lOlwiQXN1dHVzIDNcIn0gXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ25vbWVuY2xhdHVyZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdrb250b2QnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAncHJvamVjdCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0dW5udXMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYWEnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYXJ2ZWRTaXNzZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2FzdXR1c2lkJywgJ2FydmlkJ10gLy8g0LjQtCDQutC+0L3RgtGALdCw0LPQtdC90YLQsCDQuCDQvdC+0LzQtdGAINGB0YfQtdGC0LBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhcnZlZFZhbGphJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnYXN1dHVzaWQnLCAnYXJ2aWQnXSAvLyDQuNC0INC60L7QvdGC0YAt0LDQs9C10L3RgtCwINC4INC90L7QvNC10YAg0YHRh9C10YLQsFxuICAgICAgICB9XSxcbiAgICAgICAgYnBtOiBbXSwgLy8g0LTQsNC90L3Ri9C1INCR0J8g0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgIHRhc2s6IHt9IC8vINGC0LXQutGD0YnQsNGPINC30LDQtNCw0YfQsFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHNldExpYnNGaWx0ZXI6IGZ1bmN0aW9uICh1cGRhdGVyLCBsaWJOYW1lLCBmaWx0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXRMaWJzRmlsdGVyIGNhbGxlZCcsIGxpYk5hbWUsIGZpbHRlcik7XG5cbiAgICAgICAgICAgIC8vINC40YnQtdC8INGB0L/RgNCw0LLQvtGH0L3QuNC6XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicztcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpYnNbaV0uaWQgPT0gbGliTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzW2ldLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgbGliTmFtZSk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JpZFJvd0lkQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JpZFJvd0lkQ2hhbmdlIGNhbGxlZDonICsgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkUm93SWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkTGliczogZnVuY3Rpb24gKHVwZGF0ZXIsIGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbG9hZExpYnMgY2FsbGVkOicgKyBKU09OLnN0cmluZ2lmeShsaWJzVG9VcGRhdGUpKTtcbiAgICAgICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpYnNUb1VwZGF0ZSB8fCBpdGVtLmlkID09IGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vINCy0YvQt9GL0LLQsNC10Lwg0L7QsdC90L7QstC70LXQvdC40LUg0YHQv9GA0LDQstC+0YfQvdC40LrQsCDRgSDRgdC10YDQstC10YDQsFxuICAgICAgICAgICAgbGlicy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGliUGFyYW1zID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zID0gaXRlbS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC30LDQv9GA0L7RgdCwXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGliUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJQYXJhbXNbaV0gPSB0aGlzLmRhdGFbaXRlbS5maWVsZHNbaV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkTGlicyBwYXJhbXMnLCBpdGVtKTtcbiAgICAgICAgICAgICAgICBsb2FkTGlicyhpdGVtLmlkLCBsaWJQYXJhbXMpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdmVEYXRhOiBmdW5jdGlvbiAodXBkYXRlcikge1xuICAgICAgICAgICAgc2F2ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBleGVjdXRlVGFzazogZnVuY3Rpb24gKHVwZGF0ZXIsIHRhc2spIHtcbiAgICAgICAgICAgIGV4ZWN1dGVUYXNrKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVEb2M6IGZ1bmN0aW9uICh1cGRhdGVyKSB7XG4gICAgICAgICAgICBkZWxldGVEb2MoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZENlbGxFZGl0ZWRDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsZWQgZ3JpZENlbGxFZGl0ZWRDaGFuZ2U6JyArIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZENlbGxFZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NJZENoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vINGH0LjRgdGC0LjQvCDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2NJZENoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY0lkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkYXRhQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhQ2hhbmdlJywgdmFsdWUsIHR5cGVvZiB2YWx1ZS5hcnZpZCk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmFydmlkICE9PSAndW5kZWZpbml0ZScpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQutC+0L3RgtGA0LDQs9C10L3RgiDQvtGC0YHRg9GC0YHQstGD0LXRgiwg0YLQviDQuCDQv9Cw0YDQsNC80LXRgtGAINC60L7QvdGC0YDQsNCz0LXQvdGC0LAg0YLQsNC60LbQtSDQvtCx0L3Rg9C70LjQvFxuICAgICAgICAgICAgICAgIHZhbHVlLmFydmlkID0gdmFsdWUuYXN1dHVzaWQgPyB2YWx1ZS5hcnZpZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDQtNC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGB0YfQtdGC0L7QslxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NldExpYnNGaWx0ZXInLCAnYXJ2ZWRTaXNzZScsIFt2YWx1ZS5hc3V0dXNpZCwgdmFsdWUuYXJ2aWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnBtQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCX0LDQs9GA0YPQt9C60LAg0JHQn1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnYnBtQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBicG06IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxhdGlvbnNDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC10Lkg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHJlbGF0aW9uczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbHNDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQs9GA0LjQtNCwINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZXRhaWxzOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZENvbmZpZ0NoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC30LDQs9GA0YPQt9C60YMg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNC4INCz0YDQuNC00LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZENvbmZpZzogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZWRDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0LHRi9C70LAg0LLRi9C30LLQsNC90LAg0LrQvdC+0L/QutCwIERlbGV0ZVxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZWxldGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXRgtGB0Y8g0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBlZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlZENoYW5nZTogZnVuY3Rpb24gKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQsiDQtNCw0L3QvdGL0YUg0Lgg0LjQtyDRgdC+0YXRgNCw0L3QtdC90LjQtVxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzYXZlZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpYnNDaGFuZ2U6IGZ1bmN0aW9uICh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQsNGFXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaWJzQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbGliczogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWROYW1lQ2hhbmdlOiBmdW5jdGlvbiAodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZE5hbWU6IHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGRlbGV0ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAvLyDQstC10YDQvdC10LzRgdGPINCyINGA0LXQs9C40YHRgtGAXG4gICAgLy9yZXF1ZXJ5KCdkZWxldGUnLCBudWxsKTtcbiAgICBkb2N1bWVudC5sb2NhdGlvbiA9ICcvZG9jdW1lbnRzJztcbn07XG5cbmZ1bmN0aW9uIGV4ZWN1dGVUYXNrKHRhc2spIHtcbiAgICAvKlxyXG4gICAgICAgINCS0YvQv9C+0LvQvdC40YIg0LfQsNC/0YDQvtGBINC90LAg0LjRgdC/0L7Qu9C90LXQvdC40LUg0LfQsNC00LDRh9C4XHJcbiAgICAgKi9cblxuICAgIHZhciB0YXNrc1BhcmFtZXRlcnMgPSB7XG4gICAgICAgIGRvY0lkOiBkb2NTdG9yZS5kYXRhLmlkLFxuICAgICAgICB0YXNrczogdGFzayxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1N0b3JlLmRhdGEuZG9jX3R5cGVfaWRcbiAgICB9O1xuXG4gICAgLy8gICBjb25zb2xlLmxvZygnZXhlY3V0ZVRhc2s6JywgdGFzaywgdGFza3NQYXJhbWV0ZXJzKTtcblxuICAgIHJlcXVlcnkoJ2V4ZWN1dGUnLCBKU09OLnN0cmluZ2lmeSh0YXNrc1BhcmFtZXRlcnMpLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIgfHwgZGF0YS5yZXN1bHQgPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdleGVjdXRlVGFzayBhcnJpdmVkIGRvY1N0b3JlLmRhdGEuaWQsIGRvY1N0b3JlLmRvY0lkLCBkYXRhJyxkb2NTdG9yZS5kYXRhLmlkLGRvY1N0b3JlLmRvY0lkLCAgZGF0YSk7XG5cbiAgICAgICAgICAgIC8vINC/0YDQuCDRg9GB0L/QtdGI0L3QvtC8INCy0YvQv9C+0LvQvdC10L3QuNC4INC30LDQtNCw0YfQuCwg0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00L7QutGD0LzQtdC90YLQsCAo0LLRgNC10LzQtdC90L3QvilcbiAgICAgICAgICAgIC8vQHRvZG8g0L/QvtC00YLRj9C90YPRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsdC10Lcg0L/QtdGA0LXQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICAgICAgcmVsb2FkRG9jdW1lbnQoZG9jU3RvcmUuZGF0YS5pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3I7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNhdmVEb2MoKSB7XG4gICAgLy8g0LLRi9C30YvQstCw0LXRgiDQvNC10YLQvtC0INGB0L7RhdGA0LDQvdC10L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgIHZhciBzYXZlRGF0YSA9IHtcbiAgICAgICAgaWQ6IGRvY1N0b3JlLmRhdGEuaWQsXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkLCAvLyDQstGL0L3QtdGB0LXQvdC+INC00LvRjyDQv9C+0LTQs9GA0YPQt9C60Lgg0LzQvtC00LXQu9C4XG4gICAgICAgIGRhdGE6IGRvY1N0b3JlLmRhdGEsXG4gICAgICAgIGRldGFpbHM6IGRvY1N0b3JlLmRldGFpbHNcbiAgICB9O1xuXG4gICAgcmVxdWVyeSgnc2F2ZScsIEpTT04uc3RyaW5naWZ5KHNhdmVEYXRhKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbmV3SWQgPSBkYXRhWzBdLmlkO1xuICAgICAgICAgICAgLy8g0L7QsdC90L7QstC40Lwg0LjQtFxuICAgICAgICAgICAgc2F2ZURhdGEuZGF0YS5pZCA9IG5ld0lkO1xuXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgc2F2ZURhdGEuZGF0YSk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgbmV3SWQpOyAvLyDQvdC+0LLQvtC1INC40LRcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgdHJ1ZSk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgZmFsc2UpOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cblxuICAgICAgICAgICAgLy8gcmVsb2FkIGRvY3VtZW50XG4gICAgICAgICAgICByZWxvYWREb2N1bWVudChuZXdJZCk7IC8vQHRvZG8g0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQv9C10YDQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcclxuICAgIFxyXG4gICAgICAgIHJlcXVlcnkoJ3NhdmVBbmRTZWxlY3QnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCAhPT0gc2F2ZURhdGEuZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcclxuICAgICAgICAgICAgICAgICAgICBzYXZlRGF0YS5kYXRhLmlkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEgKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCApOyAvLyDQvdC+0LLQvtC1INC40LRcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIHRydWUgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgZmFsc2UgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAqL1xufTtcblxuZnVuY3Rpb24gcmVsb2FkRG9jdW1lbnQoZG9jSWQpIHtcbiAgICAvLyByZWxvYWQgZG9jdW1lbnRcblxuICAgIGlmIChkb2NJZCkge1xuICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkICsgZG9jSWQ7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkTGlicyhsaWJyYXJ5TmFtZSwgbGliUGFyYW1zKSB7XG4gICAgLy8gICAgY29uc29sZS5sb2coJ2xvYWRMaWJzOicsIGxpYnJhcnlOYW1lLCBsaWJQYXJhbXMpO1xuICAgIHRyeSB7XG5cbiAgICAgICAgcmVxdWVyeSgnc2VsZWN0JywgSlNPTi5zdHJpbmdpZnkoeyBkb2NfdHlwZV9pZDogbGlicmFyeU5hbWUsIGlkOiAwLCBwYXJhbXM6IGxpYlBhcmFtcyB9KSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGlicyA9IGRvY1N0b3JlLmxpYnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8g0LjRidC10Lwg0LTQsNC90L3Ri9C1INGB0L/RgNCw0LLQvtC70YfQvdC40LrQsCwg0LrQvtGC0L7RgNGL0LUg0L7QsdC90L7QstC40LvQuFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZExpYnMgaXRlbTonICsgSlNPTi5zdHJpbmdpZnkoaXRlbSkgKyAnIGRhdGE6JyArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuRGF0YSA9IGl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSBsaWJyYXJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5EYXRhLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmV3TGlicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignbGlic0NoYW5nZScsIG5ld0xpYnMpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVxdWVyeShhY3Rpb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG5cbiAgICB2YXIgVVJMID0gJy9hcGkvZG9jJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1ldGVyc1xuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlcXVpcmUgZGF0YSBhcnJpdmVkOicgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlcXVlcnkgZXJyb3I6JywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NTdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvc3RvcmVzL2RvY19zdG9yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgcmVsYXRlZERvY3VtZW50cyA9IHtcclxuICAgIHJlbGF0ZWREb2N1bWVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIGxldCByZWxhdGVkRG9jdW1lbnRzID0gdGhpcy5zdGF0ZS5yZWxhdGlvbnM7XHJcbiAgICAgICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgcmVsYXRlZERvY3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGRvYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy5pZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC8INC90LAg0YPQvdC40LrQsNC70YzQvdC+0YHRgtGMINGB0L/QuNGB0LrQsCDQtNC+0LrRg9C80LXQvdGC0L7QslxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0V4aXN0cyA9IHRoaXMucGFnZXMuZmluZChmdW5jdGlvbihwYWdlKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhZ2UuZG9jSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLmRvY0lkID09IGRvYy5pZCAmJiBwYWdlLmRvY1R5cGVJZCA9PSBkb2MuZG9jX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQsiDQvNCw0YHRgdC40LLQtSDQvdC10YIsINC00L7QsdCw0LLQuNC8INGB0YHRi9C70LrRgyDQvdCwINC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHtkb2NUeXBlSWQ6IGRvYy5kb2NfdHlwZSwgZG9jSWQ6ZG9jLmlkLCBwYWdlTmFtZTpkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWxhdGVkRG9jdW1lbnRzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeFxuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHZhbGlkYXRlRm9ybTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGVGb3JtIHRoaXMgaXMgbWl4aW4nKTtcbiAgICAgICAgLy8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcbiAgICAgICAgbGV0IHdhcm5pbmcgPSAnJyxcbiAgICAgICAgICAgIG5vdyA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IHRoaXMucmVxdWlyZWRGaWVsZHMgfHwgW10sXG4gICAgICAgICAgICBub3RSZXF1aXJlZEZpZWxkcyA9IFtdLFxuICAgICAgICAgICAgbm90TWluTWF4UnVsZSA9IFtdO1xuXG4gICAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMucmVmc1tmaWVsZC5uYW1lXTtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gY29tcG9uZW50LnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHByb3BzID0gY29tcG9uZW50LnByb3BzLFxuICAgICAgICAgICAgICAgIHRpdGxlID0gcHJvcHMudGl0bGU7XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub3RSZXF1aXJlZEZpZWxkcy5wdXNoKHRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCDQvNC40L0gLiDQvNCw0LrRgSDQt9C90LDRh9C10L3QuNGPXG5cbiAgICAgICAgICAgIC8vIHx8IHZhbHVlICYmIHZhbHVlID4gcHJvcHMubWF4XG4gICAgICAgICAgICBsZXQgY2hlY2tWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xsZWRWYWx1ZUQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVEIDwgZmllbGQubWluICYmIGZpZWxkLm1heCAmJiBjb250cm9sbGVkVmFsdWVEID4gZmllbGQubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xsZWRWYWx1ZU4gPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlZFZhbHVlTiA9PT0gMCB8fCBmaWVsZC5taW4gJiYgY29udHJvbGxlZFZhbHVlTiA8IGZpZWxkLm1pbiAmJiBmaWVsZC5tYXggJiYgY29udHJvbGxlZFZhbHVlTiA+IGZpZWxkLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2tWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vdE1pbk1heFJ1bGUucHVzaCh0aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChub3RSZXF1aXJlZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3YXJuaW5nID0gJ3B1dWR1YiB2YWphbGlrdWQgYW5kbWVkICgnICsgbm90UmVxdWlyZWRGaWVsZHMuam9pbignLCAnKSArICcpICc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90TWluTWF4UnVsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3YXJuaW5nID0gd2FybmluZyArICcgbWluL21heCBvbiB2YWxlKCcgKyBub3RNaW5NYXhSdWxlLmpvaW4oJywgJykgKyAnKSAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHdhcm5pbmcgPSAnT2snO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7IC8vINCy0LXRgNC90LXQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L7QsSDQuNGC0L7Qs9Cw0YUg0LLQsNC70LjQtNCw0YbQuNC4XG4gICAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb3JtLmpzJyksXHJcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4JyksXHJcbiAgICBUb29sYmFyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHRBcmVhID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRSb3cgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2pvdXJuYWwtZ3JpZC1yb3cuanN4Jyk7XHJcblxyXG52YXIgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIHZhbGlkYXRlRm9ybSA9IHJlcXVpcmUoJy4uL21peGluL3ZhbGlkYXRlRm9ybScpO1xyXG5cclxudmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG5jb25zdCBKb3VybmFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkpvdXJuYWxcIixcclxuICAgIHBhZ2VzOiAgW3twYWdlTmFtZTogJ0pvdXJuYWwnfV0sXHJcbiAgICByZXF1aXJlZEZpZWxkczogIFtcclxuICAgICAgICB7bmFtZTogJ2twdicsIHR5cGU6ICdEJywgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSwgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKX0sXHJcbiAgICAgICAge25hbWU6ICdzZWxnJywgdHlwZTogJ0MnfSxcclxuICAgICAgICB7bmFtZTogJ3N1bW1hJywgdHlwZTogJ04nfVxyXG4gICAgXSxcclxuICAgIG1peGluczogW3JlbGF0ZWREb2N1bWVudHMsIHZhbGlkYXRlRm9ybV0sXHJcbiAgICBcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jSWRDaGFuZ2UnLCBkYXRhLmlkKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZENvbmZpZ0NoYW5nZScsIGdyaWRDb25maWcpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWROYW1lJywgJ2pvdXJuYWwtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxyXG4gICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2U6ZG9jSWQnLCBuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgdmFyIGRhdGEgPSBkb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICBpc0VkaXRlZCA9ICFzZWxmLnN0YXRlLmVkaXRlZDtcclxuXHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQgZGV0YWlscyBjaGFuZ2VkJyk7XHJcbiAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpICYmIHR5cGVvZiBuZXdWYWx1ZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgbGV0IHN1bW1hID0gbmV3VmFsdWUucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSksMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICBrYm0gPSBuZXdWYWx1ZS5yZWR1Y2UoKHN1bSwgcm93KSA9PiBzdW0gKyBOdW1iZXIocm93LmtibSksMCksIC8vINGB0YPQvNC80LAg0L3QsNC70L7Qs9CwXHJcbiAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgIGRvY0RhdGEua2JtID0ga2JtO1xyXG5cclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsICcnKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCIChpZCA9PSAwKVxyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlZGl0ZWQgbW9kZSBjb250cm9sJywgZGF0YSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgc2hvd01lc3NhZ2VCb3ggPSB0aGlzLnN0YXRlLnNob3dNZXNzYWdlQm94OyAvLyDQsdGD0LTQtdGCINGD0L/RgNCw0LLQu9GP0YLRjCDQvtC60L3QvtC8INGB0L7QvtCx0YnQtdC90LjQuVxyXG5cclxuICAgICAgICAvLyAgcGF0dGVybj0nW0EtWmEtel17M30nXHJcbi8vY29uc29sZS5sb2coJ2FydmUgcmVuZGVyaW5nOicsIGRhdGEpO1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgcmVmOiBcImZvcm1cIiwgb25TdWJtaXQ6IHRoaXMub25TdWJtaXQsIHN0eWxlOiB7ZGlzcGxheTogJ3RhYmxlJ319LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhciwge3ZhbGlkYXRvcjogdGhpcy52YWxpZGF0ZUZvcm19KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZGl2LWRvY1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NDb21tb24sIHtkYXRhOiBkYXRhfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubnVtYmVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLdXVww6RldiBcIiwgbmFtZTogXCJrcHZcIiwgdmFsdWU6IGRhdGEua3B2LCByZWY6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3V1cMOkZXZcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiUGFydG5lclwiLCBuYW1lOiBcImFzdXR1c2lkXCIsIGxpYnM6IFwiYXN1dHVzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hc3V0dXNpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXN1dHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlBhcnRuZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkRva3VtZW50IFwiLCBuYW1lOiBcImRva1wiLCB2YWx1ZTogZGF0YS5kb2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rXCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJTZWxnaXR1c1wiLCBuYW1lOiBcInNlbGdcIiwgcGxhY2Vob2xkZXI6IFwiU2VsZ2l0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWxnXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zZWxnLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3NvdXJjZTogXCJkZXRhaWxzXCIsIGdyaWREYXRhOiBncmlkRGF0YSwgZ3JpZENvbHVtbnM6IGdyaWRDb2x1bW5zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlN1bW1hOiBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTcOkcmt1c2VkXCIsIG5hbWU6IFwibXV1ZFwiLCBwbGFjZWhvbGRlcjogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5tdXVkLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRSb3csIHttb2RhbFBhZ2VDbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRFdmVudDogdGhpcy5zdGF0ZS5ncmlkUm93RXZlbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRSb3c6IGZ1bmN0aW9uIChncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZFJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRDb25maWc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3cgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkUm93SWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygncHJldmlvcyBzdGF0ZSBncmlkRGF0YSwgZG9jRGF0YScsIGdyaWREYXRhLCAgZG9jRGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBrb29kLCBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicztcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICBpZiAoZGF0YS5pZCA9PSAnbm9tZW5jbGF0dXJlJykge1xyXG4gICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIC8qXHJcblxyXG4gICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICBncmlkUm93Wydrb29kJ10gPSBub21Sb3dbMF0ua29vZDtcclxuICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHN0YXRlIGdyaWREYXRhICVzLCBkb2NEYXRhICVzJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGFbZ3JpZFJvd0lkXSA9IGdyaWRSb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5wdXNoKGdyaWRSb3cpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBncmlkRGF0YS5sZW5ndGgpOyAvLyDQv9C+0LzQtdGH0LDQtdC8INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRgdGH0LjRgtCw0LXQvCDQuNGC0L7Qs9C4XHJcblxyXG4gICAgICAgIHZhciBkb2NTdW1tYSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCk7IC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpvdXJuYWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzL2pvdXJuYWwuanN4XG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1udW1iZXIuanN4Jyk7XHJcblxyXG5cclxudmFyIEpvdXJuYWxHcmlkUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkpvdXJuYWxHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdBcnZHcmlkUm93IHByb3BzJywgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLnByb3BzLmdyaWRSb3dEYXRhLCBjaGVja2VkOiBmYWxzZSwgd2FybmluZzonJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCkge1xyXG4gICAgICAgIHZhciBjb21wb25lbnRzID0gWydkZWViZXQnLCAna3JlZWRpdCcsICdzdW1tYScsICd2YWx1dXRhJywgJ2t1dXJzJywgJ3Byb2onLCAndHVubnVzJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LBcclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlJywgdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFZhbHVlID0gdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50ID09ICdkZWViZXQnIHx8IGNvbXBvbmVudCA9PSAna3JlZWRpdCcgfHwgY29tcG9uZW50ID09ICdwcm9qJyB8fCBjb21wb25lbnQgPT0gJ3R1bm51cycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLmZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IGNvbXBvbmVudFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbi8qXHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydrb2d1cyddLnNldFN0YXRlKHt2YWx1ZTogMC4wMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydoaW5kJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtdGEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuKi9cclxuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2hhbmdlJywgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlSW5wdXQ6IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YHRh9C10YIg0YHRg9C80LxcclxuICAgICAgICB0aGlzLnJlY2FsY1Jvd1N1bW0oKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlY2FsY1Jvd1N1bW06IGZ1bmN0aW9uKCkge1xyXG5cclxuLypcclxuICAgICAgICB2YXIgc3VtbWEgPSBOdW1iZXIodGhpcy5yZWZzWydzdW1tYSddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAga3V1cnMgPSBOdW1iZXIodGhpcy5yZWZzWydrdXVycyddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAgdmFsc3VtbWEgPSBzdW1tYSAqIGt1dXJzO1xyXG4gICAgICAgIHRoaXMucmVmc1sndmFsc3VtbWEnXS5zZXRTdGF0ZSh7dmFsdWU6IHZhbHN1bW1hfSk7XHJcbiovXHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygncmVjYWxjUm93U3VtbScpO1xyXG5cclxuLy8gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gd2lsbCBjaGVjayB2YWx1ZXMgb24gdGhlIGZvcm0gYW5kIHJldHVybiBzdHJpbmcgd2l0aCB3YXJuaW5nXHJcbiAgICAgICAgdmFyIHdhcm5pbmcgPSAnJztcclxuICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDQv9GA0L7QstC10YDQutC4INGE0L7RgNC80Ysg0L3QsCDQstCw0LvQuNC00L3QvtGB0YLRjFxyXG4vKlxyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydub21pZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINC60L7QtCDRg9GB0LvRg9Cz0LgnO1xyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydrb2d1cyddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINGG0LXQvdCwJztcclxuKi9cclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGVGb3JtJywgd2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIGlmICghcm93LnZhbHV1dGEpIHtcclxuICAgICAgICAgICAgcm93LnZhbHV1dGEgPSAnRVVSJztcclxuICAgICAgICAgICAgcm93Lmt1dXJzID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSBmYWxzZTsgLy8gdG9kbyDQutC+0YHRgtGL0LvRjFxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3JvdyByZW5kZXI6Jyx2YWxpZGF0ZU1lc3NhZ2UsIGJ1dHRvbk9rUmVhZE9ubHkgKTtcclxuLypcclxuICAgICAgICA8U2VsZWN0IHRpdGxlPVwiVGVlbnVzXCIgbmFtZT0nbm9taWQnIGxpYnM9XCJub21lbmNsYXR1cmVcIiByZWFkT25seT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cm93Lm5vbWlkfSBkZWZhdWx0VmFsdWU9e3Jvdy5rb29kfSByZWY9J25vbWlkJyBwbGFjZWhvbGRlcj0nVGVlbnVzZSBrb29kJ1xyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XHJcbiovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlJlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lXCJ9LCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlZWJldDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVlYmV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImtvbnRvZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5kZWViZXQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRlZWJldFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRGVlYmV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiS3JlZWRpdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrcmVlZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwia29udG9kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rcmVlZGl0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia3JlZWRpdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLcmVlZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZhbHV1dGE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHV1dGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy52YWx1dXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInZhbHV1dGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkt1dXJzOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdXVyc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93Lmt1dXJzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrdXVyc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVrdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwicHJvamVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cucHJvaiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInByb2pcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUHJvamVrdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUdW5udXM6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy50dW5udXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0dW5udXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGF1c2VuZGkgdHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0ZU1lc3NhZ2UpKSwgXCI7XCJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vKlxyXG48ZGl2PlxyXG4gICAge2J1dHRvbk9rUmVhZE9ubHkgP1xyXG4gICAgICAgIDxidXR0b24gZGlzYWJsZWQ+IE9rIDwvYnV0dG9uPjpcclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdPaycpfT4gT2sgPC9idXR0b24+XHJcbiAgICB9XHJcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdDYW5jZWwnKX0+IENhbmNlbDwvYnV0dG9uPlxyXG48L2Rpdj5cclxuKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSm91cm5hbEdyaWRSb3c7XHJcblxyXG4vKlxyXG5cclxuIDxJbnB1dFRleHQgdGl0bGU9J0tvb2QgJyBuYW1lPSdrb29kJyB2YWx1ZT17cm93Lmtvb2R9IHJlYWRPbmx5PXtmYWxzZX1cclxuIGRpc2FibGVkPVwiZmFsc2VcIiByZWY9J2tvb2QnID48L0lucHV0XHJcbiBUZXh0PlxyXG4gKi9cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL2NvbXBvbmVudHMvam91cm5hbC1ncmlkLXJvdy5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgU29yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnU2lzc2V0dWxpa3Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnc29yZGVyLWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkZXRhaWxzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICB2YXIgaXNDaGFuZ2VkID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCBkZXRhaWxzIGNoYW5nZWQnLCBpc0NoYW5nZWQsIHR5cGVvZiBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sMCksIC8vINGB0YPQvNC80LAg0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICAgZG9jRGF0YSA9IHNlbGYuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHN1bW1hOicsIHN1bW1hKTtcclxuICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkRGF0YTogbmV3VmFsdWUsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdGVkIG1vZGUgY29udHJvbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGVGb3JtfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogZGF0YS5rcHYsIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkthc3NhXCIsIG5hbWU6IFwia2Fzc2FfaWRcIiwgbGliczogXCJhYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmthc3NhX2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5rYXNzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYXNzYV9pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlBhcnRuZXJcIiwgbmFtZTogXCJhc3V0dXNpZFwiLCBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFydmUgbnIuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhcnZpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwiYXJ2ZWRWYWxqYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFydmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hcnZuciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhcnZpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJEb2t1bWVudCBcIiwgbmFtZTogXCJkb2t1bWVudFwiLCB2YWx1ZTogZGF0YS5kb2t1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2t1bWVudFwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTmltaVwiLCBuYW1lOiBcIm5pbWlcIiwgcGxhY2Vob2xkZXI6IFwiTmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFhZHJlc3NcIiwgbmFtZTogXCJhYWRyZXNzXCIsIHBsYWNlaG9sZGVyOiBcIkFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBbHVzXCIsIG5hbWU6IFwiYWx1c1wiLCBwbGFjZWhvbGRlcjogXCJBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWx1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYWx1cywgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHJlZjogXCJEYXRhR3JpZFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJTdW1tYTogXCIsIG5hbWU6IFwic3VtbWFcIiwgcGxhY2Vob2xkZXI6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdW1tYSwgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiDQv9Cw0YLQtdGA0L0g0LTQu9GPINGG0LjRhNGAINGBIDQg0LfQvdCw0LrQsNC80Lgg0L/QvtGB0LvQtSDRgtC+0YfQutC4Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk3DpHJrdXNlZFwiLCBuYW1lOiBcIm11dWRcIiwgcGxhY2Vob2xkZXI6IFwiTcOkcmt1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubXV1ZCwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkUm93LCB7bW9kYWxQYWdlQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRXZlbnQ6IHRoaXMuc3RhdGUuZ3JpZFJvd0V2ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd0RhdGE6IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGF9KSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVHcmlkUm93OiBmdW5jdGlvbiAoZ3JpZEV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LzQvtC00LDQu9GM0L3Ri9C8INC+0LrQvdC+0LxcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiBncmlkRXZlbnQsIGdyaWRSb3dEYXRhOiBkYXRhfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWRSb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZCxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkQ29uZmlnO1xyXG4gICAgICAgIHZhciBncmlkUm93ID0ge307XHJcblxyXG4gICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZFJvd0lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIG1vZGFsUGFnZUNsaWNrIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdycsIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuLy8gICAgICAgICAgICAgICAgZ3JpZFJvdyA9e307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9GB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwgZ3JpZFJvdycsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8gbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcihmdW5jdGlvbihkYXRhKSAge1xyXG4gICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkID09ICdub21lbmNsYXR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICB2YXIgICBub21Sb3cgPSBub21MaWJbMF0uZGF0YS5maWx0ZXIoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgZ3JpZFJvd1snbmltZXR1cyddID0gbm9tUm93WzBdLm5hbWU7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUgZ3JpZERhdGEgJXMsIGRvY0RhdGEgJXMnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3JkZXI7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzL3NvcmRlci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBTb3JkZXJHcmlkUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNvcmRlckdyaWRSb3dcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ0FydkdyaWRSb3cgcHJvcHMnLCB0aGlzLnByb3BzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3c6IHRoaXMucHJvcHMuZ3JpZFJvd0RhdGEsIGNoZWNrZWQ6IGZhbHNlLCB3YXJuaW5nOicnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyDQv9GA0LXQtNCy0LDRgNC40YLQtdC70YzQvdCw0Y8g0L/RgNC+0LLQtdGA0LrQsFxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQpIHtcclxuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFsnbm9taWQnLCAgJ3N1bW1hJywgJ3Byb2onLCAndHVubnVzJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsFxyXG5cclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFZhbHVlID0gdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50ID09ICdwcm9qJyB8fCBjb21wb25lbnQgPT0gJ3R1bm51cycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLmZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWxQYWdlQ2xpY2sgJyxjb21wb25lbnQsIGNvbXBvbmVudFZhbHVlIClcclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7bmFtZTogY29tcG9uZW50LCB2YWx1ZTogY29tcG9uZW50VmFsdWV9KTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUNsaWNrKGJ0bkV2ZW50LCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbiAoZSwgbmFtZSkge1xyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQvdCwINGE0L7RgNC80LVcclxuICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0IGNoYW5nZWQnKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuc3RhdGUucm93W25hbWVdICYmIG5hbWUgPT0gJ25vbWlkJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ3N1bW1hJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUlucHV0OiBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGB0YfQtdGCINGB0YPQvNC8XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgIHZhciB3YXJuaW5nID0gJyc7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9ICB3YXJuaW5nICsgJyDQutCw0YHRgdC+0LLQsNGPINC+0L/QtdGA0LDRhtC40Y8nO1xyXG5cclxuICAgICAgICBpZiAod2FybmluZy5sZW5ndGggPiAyICkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9GA0L7QsdC70LXQvNGLXHJcbiAgICAgICAgICAgIHdhcm5pbmcgPSAn0J7RgtGB0YPRgtGB0LLRg9GO0YIg0LTQsNC90L3Ri9C1OicgKyB3YXJuaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGVkJywgd2FybmluZywgdGhpcy5yZWZzWydub21pZCddLnN0YXRlLnZhbHVlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGVja2VkOiB0cnVlLCB3YXJuaW5nOiB3YXJuaW5nfSk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciByb3cgPSB0aGlzLnN0YXRlLnJvdyxcclxuICAgICAgICAgICAgdmFsaWRhdGVNZXNzYWdlID0gdGhpcy5zdGF0ZS53YXJuaW5nLFxyXG4gICAgICAgICAgICBidXR0b25Pa1JlYWRPbmx5ID0gdmFsaWRhdGVNZXNzYWdlLmxlbmd0aCA+IDAgfHwgIXRoaXMuc3RhdGUuY2hlY2tlZDtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdyb3cgcmVuZGVyOicsdmFsaWRhdGVNZXNzYWdlLCBidXR0b25Pa1JlYWRPbmx5ICk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlJlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiT3BlcmF0c2lvb246IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5vbWlkXCIsIGxpYnM6IFwibm9tZW5jbGF0dXJlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiByb3cua29vZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5vbWlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhIG9wZXJhdHNpb29uaSBrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3VtbWE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU3VtbWE6XCIsIHZhbHVlOiByb3cuc3VtbWEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVrdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwicHJvamVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cucHJvaiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInByb2pcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUHJvamVrdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUdW5udXM6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy50dW5udXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0dW5udXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGF1c2VuZGkgdHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGVNZXNzYWdlKSksIFwiO1wiXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLypcclxuPGRpdj5cclxuICAgIHtidXR0b25Pa1JlYWRPbmx5ID9cclxuICAgICAgICA8YnV0dG9uIGRpc2FibGVkPiBPayA8L2J1dHRvbj46XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnT2snKX0+IE9rIDwvYnV0dG9uPlxyXG4gICAgfVxyXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnQ2FuY2VsJyl9PiBDYW5jZWw8L2J1dHRvbj5cclxuPC9kaXY+XHJcbiovXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3JkZXJHcmlkUm93O1xyXG5cclxuLypcclxuIDxJbnB1dFRleHQgdGl0bGU9J0tvb2QgJyBuYW1lPSdrb29kJyB2YWx1ZT17cm93Lmtvb2R9IHJlYWRPbmx5PXtmYWxzZX1cclxuIGRpc2FibGVkPVwiZmFsc2VcIiByZWY9J2tvb2QnID48L0lucHV0VGV4dD5cclxuICovXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL3NvcmRlci1ncmlkLXJvdy5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgVm9yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlZvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnVsOkbGphbWFrc2Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnc29yZGVyLWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGlzQ2hhbmdlZCA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCBkZXRhaWxzIGNoYW5nZWQnLCBpc0NoYW5nZWQsIHR5cGVvZiBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGC0L7Qs9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sMCksIC8vINGB0YPQvNC80LAg0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jRGF0YSA9IHNlbGYuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHN1bW1hOicsIHN1bW1hKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2b3JkZXIgb25DaGFuZ2UgJywgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSkge1xyXG4vLyAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQvdCwINC/0L7Qu9C1IGFzdXR1c2lkINC4INGC0L7Qs9C00LAg0LfQsNC/0YDQvtGBINC90LAg0L3QvtC80LXRgNCwINGB0YfQtdGC0L7QsiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4INCY0JQg0YPRh9GA0LXQttC00LXQvdC40Y8g0Lgg0L3QvtC80LXRgNCwINGB0YfQtdGC0LBcclxuLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBvbkNoYW5nZSAnLCBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZS5hc3V0dXNpZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdGC0LjRgNCw0LXQvCDRgdGB0YvQu9C60YMg0L3QsCDRgdGH0LXRglxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXJ2aWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RvY0RhdGE6IGRhdGF9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQvdC+0LLRi9C5INGE0LjQu9GM0YLRgFxyXG4gICAgICAgICAgICAgICAgdmFyIGFydmVMaWJQYXJhbXMgPSBbZGF0YS5hc3V0dXNpZCwgZGF0YS5hcnZpZF07XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzZXRMaWJzRmlsdGVyJywgJ2FydmVkJyxhcnZlTGliUGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdGVkIG1vZGUgY29udHJvbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIHBhZ2VzJywgdGhpcy5wYWdlcyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGVGb3JtfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua3B2LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS2Fzc2FcIiwgbmFtZTogXCJrYXNzYV9pZFwiLCBsaWJzOiBcImFhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2Fzc2FfaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmthc3NhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImthc3NhX2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFydmVkU2lzc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hcnZpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXJ2bnIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRva3VtZW50IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5kb2t1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2t1bWVudFwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFsdXNcIiwgbmFtZTogXCJhbHVzXCIsIHBsYWNlaG9sZGVyOiBcIkFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFsdXMsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgZ3JpZERhdGE6IGdyaWREYXRhLCBncmlkQ29sdW1uczogZ3JpZENvbHVtbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCByZWY6IFwiRGF0YUdyaWRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU3VtbWE6IFwiLCBuYW1lOiBcInN1bW1hXCIsIHBsYWNlaG9sZGVyOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJNw6Rya3VzZWRcIiwgbmFtZTogXCJtdXVkXCIsIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZFJvdywge21vZGFsUGFnZUNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dEYXRhOiB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhfSkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZFJvdzogZnVuY3Rpb24gKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBncmlkUm93SWQgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZENvbmZpZztcclxuICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKGZ1bmN0aW9uKGRhdGEpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUgZ3JpZERhdGEgJXMsIGRvY0RhdGEgJXMnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWb3JkZXI7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzL3ZvcmRlci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xyXG5jb25zdCBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcclxuXHJcbnZhciBwYWdlcyA9IFsnUGFnZTEnLCAnUGFnZTInXTtcclxuXHJcbmNvbnN0IFBhbGsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiUGFsa1wiLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogcGFnZXN9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFBhbGsgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3ZLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
App.loadBundle('app-login', ['exports', './chunk-3e396618.js', './chunk-0d315693.js', './chunk-59532e16.js'], function (exports, __chunk_1, __chunk_2, __chunk_5) {
    var h = window.App.h;
    var appLogin = /** @class */ (function () {
        function appLogin() {
            this.rememberMe = false;
        }
        appLogin.prototype.componentWillLoad = function () {
            this.store.mapStateToProps(this, function (state) {
                var loggedIn = state.app.loggedIn;
                return {
                    loggedIn: loggedIn
                };
            });
            this.store.mapDispatchToProps(this, {
                appSetLogin: __chunk_1.appSetLogin
            });
        };
        appLogin.prototype.forgetPassword = function () {
            fetch(window['apiBase'] + "api/user/auth/forgetpassword", {
                body: JSON.stringify({ username: this.email, password: this.password }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 500) {
                    swal('Böyle bir kullanıcı yok', 'Maalesef belirtmiş olduğunuz kullanıcı sistemde bulunamadı. Girmiş olduğunuz bilgileri kontrol edip tekrar deneyebilirsiniz.', 'error');
                }
                swal('Başarılı', 'Belirtmiş olduğunuz kullanıcının şifresi sıfırlanmış ve yeni şifre mailine iletilmiştir.', 'success');
            });
        };
        appLogin.prototype.login = function () {
            var _this = this;
            fetch(window['apiBase'] + "api/user/auth/login", {
                body: JSON.stringify({ username: this.email, password: this.password }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 401) {
                    swal('Kullanıcı Adı veya Şifre Yanlış', 'Maalesef belirtmiş olduğunuz bilgilerle giriş yapılamadı. Yardım için sistem yöneticinizle iletişime geçebilirsiniz', 'error');
                }
                if (response.status === 200) {
                    response.json().then(function (data) {
                        if (_this.rememberMe) {
                            localStorage.setItem("rememberme", 'true');
                        }
                        else {
                            localStorage.setItem("rememberme", 'false');
                        }
                        localStorage.setItem("password", _this.password);
                        localStorage.setItem("username", _this.email);
                        localStorage.setItem("userid", data._id);
                        localStorage.setItem("userrole", data.role);
                        _this.appSetLogin(true);
                    });
                }
            });
        };
        appLogin.prototype.rememberChecked = function (e) {
            this.rememberMe = e.target.checked;
        };
        appLogin.prototype.render = function () {
            var _this = this;
            return (h("div", { class: "app-login" }, h("div", { class: "modal fade", id: "forgotPasswordModal", tabindex: "-1", role: "dialog", "aria-labelledby": "forgotPasswordModalLabel", "aria-hidden": "true" }, h("div", { class: "modal-dialog", role: "document" }, h("div", { class: "modal-content" }, h("div", { class: "modal-header" }, h("h3", { class: "modal-title" }, "\u015Eifreni mi unuttun?"), h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close" }, h("span", { "aria-hidden": "true" }, "\u00D7"))), h("div", { class: "modal-body" }, h("div", null, h("p", { class: "text-muted" }, "Olsun, hangimiz unutmuyoruz ki... Yeni bir \u015Fifre olu\u015Fturmak i\u00E7in e-posta adresini girmen yeterli.")), h("div", null, h("div", { class: "form-group" }, h("label", null, "Eposta"), h("input", { onInput: function (e) { e.preventDefault(); _this.email = e.target.value; }, value: this.email, type: "email", class: "form-control", id: "loginEmailModal", placeholder: "Eposta adresinizi yaz\u0131n" })))), h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"), h("button", { onClick: this.forgetPassword.bind(this), type: "button", class: "btn btn-primary" }, "\u015Eifremi S\u0131f\u0131rla"))))), h("div", { class: "login" }, h("div", { class: "login-container" }, h("div", { class: "login-header" }, h("img", { class: "login-brand", src: "/assets/content/images/base/anamorfix-logo-color.svg", alt: "Anamorfix" }), h("h1", null, "Ho\u015Fgeldin!"), h("p", null, "Anamorfix'e giri\u015F yaparak web siteni g\u00FCncellemeye hemen ba\u015Flayabilirsin.")), h("div", { class: "login-body" }, h("form", { id: "loginForm", class: "login-form", action: "dashboard.html" }, h("div", { class: "form-group" }, h("label", null, "Eposta"), h("input", { onInput: function (e) { return _this.email = e.target.value; }, value: this.email, type: "email", class: "form-control", id: "loginEmail", "aria-describedby": "loginEmailHelp", placeholder: "Eposta adresinizi yaz\u0131n" })), h("div", { class: "form-group" }, h("label", null, "\u015Eifre"), h("input", { onInput: function (e) { return _this.password = e.target.value; }, value: this.password, type: "password", class: "form-control", id: "loginPassword", placeholder: "\u015Eifrenizi yaz\u0131n" })), h("div", { class: "custom-control custom-checkbox" }, h("input", { onInput: this.rememberChecked.bind(this), type: "checkbox", class: "", id: "rememberMeCheck" }), h("label", { class: "" }, "Beni hat\u0131rla")))), h("div", { class: "login-footer" }, h("button", { class: "btn  btn-custom-light btn-sm", "data-toggle": "modal", "data-target": "#forgotPasswordModal" }, "\u015Eifremi unuttum"), h("button", { onClick: this.login.bind(this), class: "btn btn-primary", form: "loginForm" }, "Giri\u015F yap"))), h("div", { class: "login-version" }, h("span", null, "Anamorfix v1.0")))));
        };
        Object.defineProperty(appLogin, "is", {
            get: function () { return "app-login"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appLogin, "properties", {
            get: function () {
                return {
                    "store": {
                        "context": "store"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appLogin, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appLogin;
    }());
    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();
    /** Built-in value references. */
    var Symbol$1 = root.Symbol;
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;
    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = undefined;
            var unmasked = true;
        }
        catch (e) { }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            }
            else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;
    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
        return nativeObjectToString$1.call(value);
    }
    /** `Object#toString` result references. */
    var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
        }
        return (symToStringTag$1 && symToStringTag$1 in Object(value))
            ? getRawTag(value)
            : objectToString(value);
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
        return function (arg) {
            return func(transform(arg));
        };
    }
    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
        return value != null && typeof value == 'object';
    }
    /** `Object#toString` result references. */
    var objectTag = '[object Object]';
    /** Used for built-in method references. */
    var funcProto = Function.prototype, objectProto$2 = Object.prototype;
    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);
    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
            return true;
        }
        var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor == 'function' && Ctor instanceof Ctor &&
            funcToString.call(Ctor) == objectCtorString;
    }
    function symbolObservablePonyfill(root) {
        var result;
        var Symbol = root.Symbol;
        if (typeof Symbol === 'function') {
            if (Symbol.observable) {
                result = Symbol.observable;
            }
            else {
                result = Symbol('observable');
                Symbol.observable = result;
            }
        }
        else {
            result = '@@observable';
        }
        return result;
    }
    /* global window */
    var root$1;
    if (typeof self !== 'undefined') {
        root$1 = self;
    }
    else if (typeof window !== 'undefined') {
        root$1 = window;
    }
    else if (typeof global !== 'undefined') {
        root$1 = global;
    }
    else if (typeof module !== 'undefined') {
        root$1 = module;
    }
    else {
        root$1 = Function('return this')();
    }
    var result = symbolObservablePonyfill(root$1);
    /**
     * These are private action types reserved by Redux.
     * For any unknown actions, you must return the current state.
     * If the current state is undefined, you must return the initial state.
     * Do not reference these action types directly in your code.
     */
    var ActionTypes = {
        INIT: '@@redux/INIT'
        /**
         * Creates a Redux store that holds the state tree.
         * The only way to change the data in the store is to call `dispatch()` on it.
         *
         * There should only be a single store in your app. To specify how different
         * parts of the state tree respond to actions, you may combine several reducers
         * into a single reducer function by using `combineReducers`.
         *
         * @param {Function} reducer A function that returns the next state tree, given
         * the current state tree and the action to handle.
         *
         * @param {any} [preloadedState] The initial state. You may optionally specify it
         * to hydrate the state from the server in universal apps, or to restore a
         * previously serialized user session.
         * If you use `combineReducers` to produce the root reducer function, this must be
         * an object with the same shape as `combineReducers` keys.
         *
         * @param {Function} [enhancer] The store enhancer. You may optionally specify it
         * to enhance the store with third-party capabilities such as middleware,
         * time travel, persistence, etc. The only store enhancer that ships with Redux
         * is `applyMiddleware()`.
         *
         * @returns {Store} A Redux store that lets you read the state, dispatch actions
         * and subscribe to changes.
         */
    };
    function createStore(reducer, preloadedState, enhancer) {
        var _ref2;
        if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
            enhancer = preloadedState;
            preloadedState = undefined;
        }
        if (typeof enhancer !== 'undefined') {
            if (typeof enhancer !== 'function') {
                throw new Error('Expected the enhancer to be a function.');
            }
            return enhancer(createStore)(reducer, preloadedState);
        }
        if (typeof reducer !== 'function') {
            throw new Error('Expected the reducer to be a function.');
        }
        var currentReducer = reducer;
        var currentState = preloadedState;
        var currentListeners = [];
        var nextListeners = currentListeners;
        var isDispatching = false;
        function ensureCanMutateNextListeners() {
            if (nextListeners === currentListeners) {
                nextListeners = currentListeners.slice();
            }
        }
        /**
         * Reads the state tree managed by the store.
         *
         * @returns {any} The current state tree of your application.
         */
        function getState() {
            return currentState;
        }
        /**
         * Adds a change listener. It will be called any time an action is dispatched,
         * and some part of the state tree may potentially have changed. You may then
         * call `getState()` to read the current state tree inside the callback.
         *
         * You may call `dispatch()` from a change listener, with the following
         * caveats:
         *
         * 1. The subscriptions are snapshotted just before every `dispatch()` call.
         * If you subscribe or unsubscribe while the listeners are being invoked, this
         * will not have any effect on the `dispatch()` that is currently in progress.
         * However, the next `dispatch()` call, whether nested or not, will use a more
         * recent snapshot of the subscription list.
         *
         * 2. The listener should not expect to see all state changes, as the state
         * might have been updated multiple times during a nested `dispatch()` before
         * the listener is called. It is, however, guaranteed that all subscribers
         * registered before the `dispatch()` started will be called with the latest
         * state by the time it exits.
         *
         * @param {Function} listener A callback to be invoked on every dispatch.
         * @returns {Function} A function to remove this change listener.
         */
        function subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('Expected listener to be a function.');
            }
            var isSubscribed = true;
            ensureCanMutateNextListeners();
            nextListeners.push(listener);
            return function unsubscribe() {
                if (!isSubscribed) {
                    return;
                }
                isSubscribed = false;
                ensureCanMutateNextListeners();
                var index = nextListeners.indexOf(listener);
                nextListeners.splice(index, 1);
            };
        }
        /**
         * Dispatches an action. It is the only way to trigger a state change.
         *
         * The `reducer` function, used to create the store, will be called with the
         * current state tree and the given `action`. Its return value will
         * be considered the **next** state of the tree, and the change listeners
         * will be notified.
         *
         * The base implementation only supports plain object actions. If you want to
         * dispatch a Promise, an Observable, a thunk, or something else, you need to
         * wrap your store creating function into the corresponding middleware. For
         * example, see the documentation for the `redux-thunk` package. Even the
         * middleware will eventually dispatch plain object actions using this method.
         *
         * @param {Object} action A plain object representing “what changed”. It is
         * a good idea to keep actions serializable so you can record and replay user
         * sessions, or use the time travelling `redux-devtools`. An action must have
         * a `type` property which may not be `undefined`. It is a good idea to use
         * string constants for action types.
         *
         * @returns {Object} For convenience, the same action object you dispatched.
         *
         * Note that, if you use a custom middleware, it may wrap `dispatch()` to
         * return something else (for example, a Promise you can await).
         */
        function dispatch(action) {
            if (!isPlainObject(action)) {
                throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
            }
            if (typeof action.type === 'undefined') {
                throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
            }
            if (isDispatching) {
                throw new Error('Reducers may not dispatch actions.');
            }
            try {
                isDispatching = true;
                currentState = currentReducer(currentState, action);
            }
            finally {
                isDispatching = false;
            }
            var listeners = currentListeners = nextListeners;
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener();
            }
            return action;
        }
        /**
         * Replaces the reducer currently used by the store to calculate the state.
         *
         * You might need this if your app implements code splitting and you want to
         * load some of the reducers dynamically. You might also need this if you
         * implement a hot reloading mechanism for Redux.
         *
         * @param {Function} nextReducer The reducer for the store to use instead.
         * @returns {void}
         */
        function replaceReducer(nextReducer) {
            if (typeof nextReducer !== 'function') {
                throw new Error('Expected the nextReducer to be a function.');
            }
            currentReducer = nextReducer;
            dispatch({ type: ActionTypes.INIT });
        }
        /**
         * Interoperability point for observable/reactive libraries.
         * @returns {observable} A minimal observable of state changes.
         * For more information, see the observable proposal:
         * https://github.com/tc39/proposal-observable
         */
        function observable() {
            var _ref;
            var outerSubscribe = subscribe;
            return _ref = {
                /**
                 * The minimal observable subscription method.
                 * @param {Object} observer Any object that can be used as an observer.
                 * The observer object should have a `next` method.
                 * @returns {subscription} An object with an `unsubscribe` method that can
                 * be used to unsubscribe the observable from the store, and prevent further
                 * emission of values from the observable.
                 */
                subscribe: function subscribe(observer) {
                    if (typeof observer !== 'object') {
                        throw new TypeError('Expected the observer to be an object.');
                    }
                    function observeState() {
                        if (observer.next) {
                            observer.next(getState());
                        }
                    }
                    observeState();
                    var unsubscribe = outerSubscribe(observeState);
                    return { unsubscribe: unsubscribe };
                }
            }, _ref[result] = function () {
                return this;
            }, _ref;
        }
        // When a store is created, an "INIT" action is dispatched so that every
        // reducer returns their initial state. This effectively populates
        // the initial state tree.
        dispatch({ type: ActionTypes.INIT });
        return _ref2 = {
            dispatch: dispatch,
            subscribe: subscribe,
            getState: getState,
            replaceReducer: replaceReducer
        }, _ref2[result] = observable, _ref2;
    }
    /**
     * Prints a warning in the console if it exists.
     *
     * @param {String} message The warning message.
     * @returns {void}
     */
    function warning(message) {
        /* eslint-disable no-console */
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(message);
        }
        /* eslint-enable no-console */
        try {
            // This error was thrown as a convenience so that if you enable
            // "break on all exceptions" in your console,
            // it would pause the execution at this line.
            throw new Error(message);
            /* eslint-disable no-empty */
        }
        catch (e) { }
        /* eslint-enable no-empty */
    }
    function getUndefinedStateErrorMessage(key, action) {
        var actionType = action && action.type;
        var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
        return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
    }
    function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
        var reducerKeys = Object.keys(reducers);
        var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
        if (reducerKeys.length === 0) {
            return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
        }
        if (!isPlainObject(inputState)) {
            return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
        }
        var unexpectedKeys = Object.keys(inputState).filter(function (key) {
            return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
        });
        unexpectedKeys.forEach(function (key) {
            unexpectedKeyCache[key] = true;
        });
        if (unexpectedKeys.length > 0) {
            return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
        }
    }
    function assertReducerShape(reducers) {
        Object.keys(reducers).forEach(function (key) {
            var reducer = reducers[key];
            var initialState = reducer(undefined, { type: ActionTypes.INIT });
            if (typeof initialState === 'undefined') {
                throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
            }
            var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
            if (typeof reducer(undefined, { type: type }) === 'undefined') {
                throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
            }
        });
    }
    /**
     * Turns an object whose values are different reducer functions, into a single
     * reducer function. It will call every child reducer, and gather their results
     * into a single state object, whose keys correspond to the keys of the passed
     * reducer functions.
     *
     * @param {Object} reducers An object whose values correspond to different
     * reducer functions that need to be combined into one. One handy way to obtain
     * it is to use ES6 `import * as reducers` syntax. The reducers may never return
     * undefined for any action. Instead, they should return their initial state
     * if the state passed to them was undefined, and the current state for any
     * unrecognized action.
     *
     * @returns {Function} A reducer function that invokes every reducer inside the
     * passed object, and builds a state object with the same shape.
     */
    function combineReducers(reducers) {
        var reducerKeys = Object.keys(reducers);
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            if ("development" !== 'production') {
                if (typeof reducers[key] === 'undefined') {
                    warning('No reducer provided for key "' + key + '"');
                }
            }
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key];
            }
        }
        var finalReducerKeys = Object.keys(finalReducers);
        var unexpectedKeyCache = void 0;
        if ("development" !== 'production') {
            unexpectedKeyCache = {};
        }
        var shapeAssertionError = void 0;
        try {
            assertReducerShape(finalReducers);
        }
        catch (e) {
            shapeAssertionError = e;
        }
        return function combination() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var action = arguments[1];
            if (shapeAssertionError) {
                throw shapeAssertionError;
            }
            if ("development" !== 'production') {
                var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
                if (warningMessage) {
                    warning(warningMessage);
                }
            }
            var hasChanged = false;
            var nextState = {};
            for (var _i = 0; _i < finalReducerKeys.length; _i++) {
                var _key = finalReducerKeys[_i];
                var reducer = finalReducers[_key];
                var previousStateForKey = state[_key];
                var nextStateForKey = reducer(previousStateForKey, action);
                if (typeof nextStateForKey === 'undefined') {
                    var errorMessage = getUndefinedStateErrorMessage(_key, action);
                    throw new Error(errorMessage);
                }
                nextState[_key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }
            return hasChanged ? nextState : state;
        };
    }
    function bindActionCreator(actionCreator, dispatch) {
        return function () {
            return dispatch(actionCreator.apply(undefined, arguments));
        };
    }
    /**
     * Turns an object whose values are action creators, into an object with the
     * same keys, but with every function wrapped into a `dispatch` call so they
     * may be invoked directly. This is just a convenience method, as you can call
     * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
     *
     * For convenience, you can also pass a single function as the first argument,
     * and get a function in return.
     *
     * @param {Function|Object} actionCreators An object whose values are action
     * creator functions. One handy way to obtain it is to use ES6 `import * as`
     * syntax. You may also pass a single function.
     *
     * @param {Function} dispatch The `dispatch` function available on your Redux
     * store.
     *
     * @returns {Function|Object} The object mimicking the original object, but with
     * every action creator wrapped into the `dispatch` call. If you passed a
     * function as `actionCreators`, the return value will also be a single
     * function.
     */
    function bindActionCreators(actionCreators, dispatch) {
        if (typeof actionCreators === 'function') {
            return bindActionCreator(actionCreators, dispatch);
        }
        if (typeof actionCreators !== 'object' || actionCreators === null) {
            throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        }
        var keys = Object.keys(actionCreators);
        var boundActionCreators = {};
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var actionCreator = actionCreators[key];
            if (typeof actionCreator === 'function') {
                boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
            }
        }
        return boundActionCreators;
    }
    /**
     * Composes single-argument functions from right to left. The rightmost
     * function can take multiple arguments as it provides the signature for
     * the resulting composite function.
     *
     * @param {...Function} funcs The functions to compose.
     * @returns {Function} A function obtained by composing the argument functions
     * from right to left. For example, compose(f, g, h) is identical to doing
     * (...args) => f(g(h(...args))).
     */
    function compose() {
        for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
            funcs[_key] = arguments[_key];
        }
        if (funcs.length === 0) {
            return function (arg) {
                return arg;
            };
        }
        if (funcs.length === 1) {
            return funcs[0];
        }
        return funcs.reduce(function (a, b) {
            return function () {
                return a(b.apply(undefined, arguments));
            };
        });
    }
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    } return target; };
    /**
     * Creates a store enhancer that applies middleware to the dispatch method
     * of the Redux store. This is handy for a variety of tasks, such as expressing
     * asynchronous actions in a concise manner, or logging every action payload.
     *
     * See `redux-thunk` package as an example of the Redux middleware.
     *
     * Because middleware is potentially asynchronous, this should be the first
     * store enhancer in the composition chain.
     *
     * Note that each middleware will be given the `dispatch` and `getState` functions
     * as named arguments.
     *
     * @param {...Function} middlewares The middleware chain to be applied.
     * @returns {Function} A store enhancer applying the middleware.
     */
    function applyMiddleware() {
        for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
            middlewares[_key] = arguments[_key];
        }
        return function (createStore) {
            return function (reducer, preloadedState, enhancer) {
                var store = createStore(reducer, preloadedState, enhancer);
                var _dispatch = store.dispatch;
                var chain = [];
                var middlewareAPI = {
                    getState: store.getState,
                    dispatch: function dispatch(action) {
                        return _dispatch(action);
                    }
                };
                chain = middlewares.map(function (middleware) {
                    return middleware(middlewareAPI);
                });
                _dispatch = compose.apply(undefined, chain)(store.dispatch);
                return _extends({}, store, {
                    dispatch: _dispatch
                });
            };
        };
    }
    /*
    * This is a dummy function to check if the function name has been altered by minification.
    * If the function has been minified and NODE_ENV !== 'production', warn the user.
    */
    function isCrushed() { }
    if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
        warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
    }
    function createThunkMiddleware(extraArgument) {
        return function (_ref) {
            var dispatch = _ref.dispatch, getState = _ref.getState;
            return function (next) {
                return function (action) {
                    if (typeof action === 'function') {
                        return action(dispatch, getState, extraArgument);
                    }
                    return next(action);
                };
            };
        };
    }
    var thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;
    var reduxLogger = __chunk_2.createCommonjsModule(function (module, exports) {
        !function (e, t) { "object" == 'object' && "undefined" != 'object' ? t(exports) : "function" == typeof undefined && undefined.amd ? undefined(["exports"], t) : t(e.reduxLogger = e.reduxLogger || {}); }(__chunk_2.commonjsGlobal, function (e) {
            "use strict";
            function t(e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }); }
            function r(e, t) { Object.defineProperty(this, "kind", { value: e, enumerable: !0 }), t && t.length && Object.defineProperty(this, "path", { value: t, enumerable: !0 }); }
            function n(e, t, r) { n.super_.call(this, "E", e), Object.defineProperty(this, "lhs", { value: t, enumerable: !0 }), Object.defineProperty(this, "rhs", { value: r, enumerable: !0 }); }
            function o(e, t) { o.super_.call(this, "N", e), Object.defineProperty(this, "rhs", { value: t, enumerable: !0 }); }
            function i(e, t) { i.super_.call(this, "D", e), Object.defineProperty(this, "lhs", { value: t, enumerable: !0 }); }
            function a(e, t, r) { a.super_.call(this, "A", e), Object.defineProperty(this, "index", { value: t, enumerable: !0 }), Object.defineProperty(this, "item", { value: r, enumerable: !0 }); }
            function f(e, t, r) { var n = e.slice((r || t) + 1 || e.length); return e.length = t < 0 ? e.length + t : t, e.push.apply(e, n), e; }
            function u(e) { var t = "undefined" == typeof e ? "undefined" : N(e); return "object" !== t ? t : e === Math ? "math" : null === e ? "null" : Array.isArray(e) ? "array" : "[object Date]" === Object.prototype.toString.call(e) ? "date" : "function" == typeof e.toString && /^\/.*\//.test(e.toString()) ? "regexp" : "object"; }
            function l(e, t, r, c, s, d, p) { s = s || [], p = p || []; var g = s.slice(0); if ("undefined" != typeof d) {
                if (c) {
                    if ("function" == typeof c && c(g, d))
                        return;
                    if ("object" === ("undefined" == typeof c ? "undefined" : N(c))) {
                        if (c.prefilter && c.prefilter(g, d))
                            return;
                        if (c.normalize) {
                            var h = c.normalize(g, d, e, t);
                            h && (e = h[0], t = h[1]);
                        }
                    }
                }
                g.push(d);
            } "regexp" === u(e) && "regexp" === u(t) && (e = e.toString(), t = t.toString()); var y = "undefined" == typeof e ? "undefined" : N(e), v = "undefined" == typeof t ? "undefined" : N(t), b = "undefined" !== y || p && p[p.length - 1].lhs && p[p.length - 1].lhs.hasOwnProperty(d), m = "undefined" !== v || p && p[p.length - 1].rhs && p[p.length - 1].rhs.hasOwnProperty(d); if (!b && m)
                r(new o(g, t));
            else if (!m && b)
                r(new i(g, e));
            else if (u(e) !== u(t))
                r(new n(g, e, t));
            else if ("date" === u(e) && e - t !== 0)
                r(new n(g, e, t));
            else if ("object" === y && null !== e && null !== t)
                if (p.filter(function (t) { return t.lhs === e; }).length)
                    e !== t && r(new n(g, e, t));
                else {
                    if (p.push({ lhs: e, rhs: t }), Array.isArray(e)) {
                        var w;
                        e.length;
                        for (w = 0; w < e.length; w++)
                            w >= t.length ? r(new a(g, w, new i(void 0, e[w]))) : l(e[w], t[w], r, c, g, w, p);
                        for (; w < t.length;)
                            r(new a(g, w, new o(void 0, t[w++])));
                    }
                    else {
                        var x = Object.keys(e), S = Object.keys(t);
                        x.forEach(function (n, o) { var i = S.indexOf(n); i >= 0 ? (l(e[n], t[n], r, c, g, n, p), S = f(S, i)) : l(e[n], void 0, r, c, g, n, p); }), S.forEach(function (e) { l(void 0, t[e], r, c, g, e, p); });
                    }
                    p.length = p.length - 1;
                }
            else
                e !== t && ("number" === y && isNaN(e) && isNaN(t) || r(new n(g, e, t))); }
            function c(e, t, r, n) { return n = n || [], l(e, t, function (e) { e && n.push(e); }, r), n.length ? n : void 0; }
            function s(e, t, r) { if (r.path && r.path.length) {
                var n, o = e[t], i = r.path.length - 1;
                for (n = 0; n < i; n++)
                    o = o[r.path[n]];
                switch (r.kind) {
                    case "A":
                        s(o[r.path[n]], r.index, r.item);
                        break;
                    case "D":
                        delete o[r.path[n]];
                        break;
                    case "E":
                    case "N": o[r.path[n]] = r.rhs;
                }
            }
            else
                switch (r.kind) {
                    case "A":
                        s(e[t], r.index, r.item);
                        break;
                    case "D":
                        e = f(e, t);
                        break;
                    case "E":
                    case "N": e[t] = r.rhs;
                } return e; }
            function d(e, t, r) { if (e && t && r && r.kind) {
                for (var n = e, o = -1, i = r.path ? r.path.length - 1 : 0; ++o < i;)
                    "undefined" == typeof n[r.path[o]] && (n[r.path[o]] = "number" == typeof r.path[o] ? [] : {}), n = n[r.path[o]];
                switch (r.kind) {
                    case "A":
                        s(r.path ? n[r.path[o]] : n, r.index, r.item);
                        break;
                    case "D":
                        delete n[r.path[o]];
                        break;
                    case "E":
                    case "N": n[r.path[o]] = r.rhs;
                }
            } }
            function p(e, t, r) { if (r.path && r.path.length) {
                var n, o = e[t], i = r.path.length - 1;
                for (n = 0; n < i; n++)
                    o = o[r.path[n]];
                switch (r.kind) {
                    case "A":
                        p(o[r.path[n]], r.index, r.item);
                        break;
                    case "D":
                        o[r.path[n]] = r.lhs;
                        break;
                    case "E":
                        o[r.path[n]] = r.lhs;
                        break;
                    case "N": delete o[r.path[n]];
                }
            }
            else
                switch (r.kind) {
                    case "A":
                        p(e[t], r.index, r.item);
                        break;
                    case "D":
                        e[t] = r.lhs;
                        break;
                    case "E":
                        e[t] = r.lhs;
                        break;
                    case "N": e = f(e, t);
                } return e; }
            function g(e, t, r) { if (e && t && r && r.kind) {
                var n, o, i = e;
                for (o = r.path.length - 1, n = 0; n < o; n++)
                    "undefined" == typeof i[r.path[n]] && (i[r.path[n]] = {}), i = i[r.path[n]];
                switch (r.kind) {
                    case "A":
                        p(i[r.path[n]], r.index, r.item);
                        break;
                    case "D":
                        i[r.path[n]] = r.lhs;
                        break;
                    case "E":
                        i[r.path[n]] = r.lhs;
                        break;
                    case "N": delete i[r.path[n]];
                }
            } }
            function h(e, t, r) { if (e && t) {
                var n = function (n) { r && !r(e, t, n) || d(e, t, n); };
                l(e, t, n);
            } }
            function y(e) { return "color: " + F[e].color + "; font-weight: bold"; }
            function v(e) { var t = e.kind, r = e.path, n = e.lhs, o = e.rhs, i = e.index, a = e.item; switch (t) {
                case "E": return [r.join("."), n, "→", o];
                case "N": return [r.join("."), o];
                case "D": return [r.join(".")];
                case "A": return [r.join(".") + "[" + i + "]", a];
                default: return [];
            } }
            function b(e, t, r, n) { var o = c(e, t); try {
                n ? r.groupCollapsed("diff") : r.group("diff");
            }
            catch (e) {
                r.log("diff");
            } o ? o.forEach(function (e) { var t = e.kind, n = v(e); r.log.apply(r, ["%c " + F[t].text, y(t)].concat(P(n))); }) : r.log("—— no diff ——"); try {
                r.groupEnd();
            }
            catch (e) {
                r.log("—— diff end —— ");
            } }
            function m(e, t, r, n) { switch ("undefined" == typeof e ? "undefined" : N(e)) {
                case "object": return "function" == typeof e[n] ? e[n].apply(e, P(r)) : e[n];
                case "function": return e(t);
                default: return e;
            } }
            function w(e) { var t = e.timestamp, r = e.duration; return function (e, n, o) { var i = ["action"]; return i.push("%c" + String(e.type)), t && i.push("%c@ " + n), r && i.push("%c(in " + o.toFixed(2) + " ms)"), i.join(" "); }; }
            function x(e, t) { var r = t.logger, n = t.actionTransformer, o = t.titleFormatter, i = void 0 === o ? w(t) : o, a = t.collapsed, f = t.colors, u = t.level, l = t.diff, c = "undefined" == typeof t.titleFormatter; e.forEach(function (o, s) { var d = o.started, p = o.startedTime, g = o.action, h = o.prevState, y = o.error, v = o.took, w = o.nextState, x = e[s + 1]; x && (w = x.prevState, v = x.started - d); var S = n(g), k = "function" == typeof a ? a(function () { return w; }, g, o) : a, j = D(p), E = f.title ? "color: " + f.title(S) + ";" : "", A = ["color: gray; font-weight: lighter;"]; A.push(E), t.timestamp && A.push("color: gray; font-weight: lighter;"), t.duration && A.push("color: gray; font-weight: lighter;"); var O = i(S, j, v); try {
                k ? f.title && c ? r.groupCollapsed.apply(r, ["%c " + O].concat(A)) : r.groupCollapsed(O) : f.title && c ? r.group.apply(r, ["%c " + O].concat(A)) : r.group(O);
            }
            catch (e) {
                r.log(O);
            } var N = m(u, S, [h], "prevState"), P = m(u, S, [S], "action"), C = m(u, S, [y, h], "error"), F = m(u, S, [w], "nextState"); if (N)
                if (f.prevState) {
                    var L = "color: " + f.prevState(h) + "; font-weight: bold";
                    r[N]("%c prev state", L, h);
                }
                else
                    r[N]("prev state", h); if (P)
                if (f.action) {
                    var T = "color: " + f.action(S) + "; font-weight: bold";
                    r[P]("%c action    ", T, S);
                }
                else
                    r[P]("action    ", S); if (y && C)
                if (f.error) {
                    var M = "color: " + f.error(y, h) + "; font-weight: bold;";
                    r[C]("%c error     ", M, y);
                }
                else
                    r[C]("error     ", y); if (F)
                if (f.nextState) {
                    var _ = "color: " + f.nextState(w) + "; font-weight: bold";
                    r[F]("%c next state", _, w);
                }
                else
                    r[F]("next state", w); l && b(h, w, r, k); try {
                r.groupEnd();
            }
            catch (e) {
                r.log("—— log end ——");
            } }); }
            function S() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, L, e), r = t.logger, n = t.stateTransformer, o = t.errorTransformer, i = t.predicate, a = t.logErrors, f = t.diffPredicate; if ("undefined" == typeof r)
                return function () { return function (e) { return function (t) { return e(t); }; }; }; if (e.getState && e.dispatch)
                return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function () { return function (e) { return function (t) { return e(t); }; }; }; var u = []; return function (e) { var r = e.getState; return function (e) { return function (l) { if ("function" == typeof i && !i(r, l))
                return e(l); var c = {}; u.push(c), c.started = O.now(), c.startedTime = new Date, c.prevState = n(r()), c.action = l; var s = void 0; if (a)
                try {
                    s = e(l);
                }
                catch (e) {
                    c.error = o(e);
                }
            else
                s = e(l); c.took = O.now() - c.started, c.nextState = n(r()); var d = t.diff && "function" == typeof f ? f(r, l) : t.diff; if (x(u, Object.assign({}, t, { diff: d })), u.length = 0, c.error)
                throw c.error; return s; }; }; }; }
            var k, j, E = function (e, t) { return new Array(t + 1).join(e); }, A = function (e, t) { return E("0", t - e.toString().length) + e; }, D = function (e) { return A(e.getHours(), 2) + ":" + A(e.getMinutes(), 2) + ":" + A(e.getSeconds(), 2) + "." + A(e.getMilliseconds(), 3); }, O = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, P = function (e) { if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++)
                    r[t] = e[t];
                return r;
            } return Array.from(e); }, C = [];
            k = "object" === ("undefined" == typeof __chunk_2.commonjsGlobal ? "undefined" : N(__chunk_2.commonjsGlobal)) && __chunk_2.commonjsGlobal ? __chunk_2.commonjsGlobal : "undefined" != typeof window ? window : {}, j = k.DeepDiff, j && C.push(function () { "undefined" != typeof j && k.DeepDiff === c && (k.DeepDiff = j, j = void 0); }), t(n, r), t(o, r), t(i, r), t(a, r), Object.defineProperties(c, { diff: { value: c, enumerable: !0 }, observableDiff: { value: l, enumerable: !0 }, applyDiff: { value: h, enumerable: !0 }, applyChange: { value: d, enumerable: !0 }, revertChange: { value: g, enumerable: !0 }, isConflict: { value: function () { return "undefined" != typeof j; }, enumerable: !0 }, noConflict: { value: function () { return C && (C.forEach(function (e) { e(); }), C = null), c; }, enumerable: !0 } });
            var F = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L = { level: "log", logger: console, logErrors: !0, collapsed: void 0, predicate: void 0, duration: !1, timestamp: !0, stateTransformer: function (e) { return e; }, actionTransformer: function (e) { return e; }, errorTransformer: function (e) { return e; }, colors: { title: function () { return "inherit"; }, prevState: function () { return "#9E9E9E"; }, action: function () { return "#03A9F4"; }, nextState: function () { return "#4CAF50"; }, error: function () { return "#F20404"; } }, diff: !1, diffPredicate: void 0, transformer: void 0 }, T = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.dispatch, r = e.getState; return "function" == typeof t || "function" == typeof r ? S()({ dispatch: t, getState: r }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n"); };
            e.defaults = L, e.createLogger = S, e.logger = T, e.default = T, Object.defineProperty(e, "__esModule", { value: !0 });
        });
    });
    var logger = __chunk_2.unwrapExports(reduxLogger);
    var getInitialState = function () {
        return {
            name: 'Anamorfix Redux',
            pageData: null,
            currentLanguage: 'tr',
            loggedIn: false,
        };
    };
    var app = function (state, action) {
        if (state === void 0) { state = getInitialState(); }
        switch (action.type) {
            case __chunk_1.TypeKeys.APP_SET_LOGIN_STATUS: {
                return Object.assign({}, state, { loggedIn: action.loggedIn });
            }
            case __chunk_1.TypeKeys.SET_PAGE_DATA: {
                return Object.assign({}, state, { pageData: action.pageData });
            }
        }
        return state;
    };
    var rootReducer = combineReducers({
        app: app
    });
    var configureStore = function (preloadedState) { return createStore(rootReducer, preloadedState, applyMiddleware(logger, thunk)); };
    var MyApp = /** @class */ (function () {
        function MyApp() {
        }
        MyApp.prototype.componentWillLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                var currentUsername, currentPassword, rememberme;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentUsername = localStorage.getItem('username');
                            currentPassword = localStorage.getItem('password');
                            rememberme = localStorage.getItem('rememberme');
                            // Only do this once, in the root component
                            this.store.setStore(configureStore({}));
                            this.store.mapStateToProps(this, function (state) {
                                var loggedIn = state.app.loggedIn;
                                return {
                                    loggedIn: loggedIn
                                };
                            });
                            this.store.mapDispatchToProps(this, {
                                appSetLogin: __chunk_1.appSetLogin
                            });
                            if (!(currentUsername && currentPassword && rememberme === 'true')) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetch(window['apiBase'] + "api/user/auth/login", {
                                    body: JSON.stringify({ username: currentUsername, password: currentPassword }),
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                }).then(function (response) {
                                    console.log('Response Geldi', response);
                                    if (response.status === 401) {
                                        _this.appSetLogin(false);
                                    }
                                    if (response.status === 200) {
                                        _this.appSetLogin(true);
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.appSetLogin(false);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MyApp.prototype.render = function () {
            if (!this.loggedIn) {
                return h("app-login", null);
            }
            else {
                return (h("div", null, h("main", { class: "app-main" }, h("div", { class: "app-main-wrapper" }, h("div", { class: "page" }, h("shared-header", null), h("shared-aside", null), h("stencil-router", { id: "router" }, h("stencil-route", { url: '/', component: 'app-dashboard', exact: true }), h("stencil-route", { url: '/navigation', component: 'app-navigation', exact: true }), h("stencil-route", { url: '/news', component: 'app-news', exact: true }), h("stencil-route", { url: '/languages', component: 'app-static-languages', exact: true }), h("stencil-route", { url: '/add-news', component: 'app-add-news', exact: true }), h("stencil-route", { url: '/news/:id', component: 'app-news-detail', exact: true }), h("stencil-route", { url: '/menu', component: 'app-top-menu', exact: true }), h("stencil-route", { url: '/menu-edit/:lang/:id', component: 'app-top-menu-edit', exact: true }), h("stencil-route", { url: '/categories-new', component: 'new-category-component', exact: true }), h("stencil-route", { url: '/pages', component: 'app-pages', exact: true }), h("stencil-route", { url: '/pages/:id', component: 'app-page-detail', exact: true }), h("stencil-route", { url: '/page-components/:id/:index', component: 'app-page-component-edit', exact: true }), h("stencil-route", { url: '/add-product', component: 'app-add-product', exact: true }), h("stencil-route", { url: '/products', component: 'app-products', exact: true }), h("stencil-route", { url: '/products/:id', component: 'app-product-detail', exact: true }), h("stencil-route", { url: '/projects', component: 'app-projects', exact: true }), h("stencil-route", { url: '/projects/:id', component: 'app-project-detail', exact: true }), h("stencil-route", { url: '/add-project', component: 'app-add-project', exact: true }), h("stencil-route", { url: '/events', component: 'app-events', exact: true }), h("stencil-route", { url: '/add-event', component: 'app-add-event', exact: true }), h("stencil-route", { url: '/events/:id', component: 'app-event-detail', exact: true }), h("stencil-route", { url: '/locations', component: 'app-locations', exact: true }), h("stencil-route", { url: '/locations/:id', component: 'app-location-detail', exact: true }), h("stencil-route", { url: '/add-location', component: 'app-add-location', exact: true })))))));
            }
        };
        Object.defineProperty(MyApp, "is", {
            get: function () { return "my-app"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyApp, "properties", {
            get: function () {
                return {
                    "loggedIn": {
                        "state": true
                    },
                    "name": {
                        "state": true
                    },
                    "store": {
                        "context": "store"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyApp, "style", {
            get: function () { return "/*\ninput {\n  margin-bottom: 0 !important;\n}\n*/\ninput.form-control {\n  margin-bottom: 0 !important; }\n\n.btn {\n  margin-right: 5px; }"; },
            enumerable: true,
            configurable: true
        });
        return MyApp;
    }());
    var sharedAside = /** @class */ (function () {
        function sharedAside() {
        }
        sharedAside.prototype.render = function () {
            return (h("aside", { class: "app-aside" }, h("div", { class: "app-aside-content" }, h("header", { class: "aside-header" }), h("section", { class: "aside-menu" }, h("nav", { class: "stacked-menu" }, h("div", { class: "menu" }, h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/", exact: true }, h("span", { class: "fix-dashboard icon" }), h("span", { class: "name" }, "Ba\u015Flang\u0131\u00E7"))), h("div", { class: "menu-item-group" }, h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/pages" }, h("span", { class: "fix-file-stack icon" }), h("span", { class: "name" }, "Sayfalar"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/menu" }, h("span", { class: "fix-bullet-list icon" }), h("span", { class: "name" }, "Men\u00FC")), h("stencil-route-link", { class: "menu-link", url: "/languages" }, h("span", { class: "fix-translation icon" }), h("span", { class: "name" }, "\u00C7eviri")))), h("div", { class: "menu-item-group" }, h("div", { class: "title" }, h("h3", null, "TABLOLAR")), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/products" }, h("span", { class: "fix-barcode icon" }), h("span", { class: "name" }, "\u00DCr\u00FCnler"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/categories-new" }, h("span", { class: "fix-news icon" }), h("span", { class: "name" }, "Kategoriler"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/projects" }, h("span", { class: "fix-layers icon" }), h("span", { class: "name" }, "Projeler"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/news" }, h("span", { class: "fix-news icon" }), h("span", { class: "name" }, "Haberler"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/events" }, h("span", { class: "fix-calendar icon" }), h("span", { class: "name" }, "Etkinlikler"))), h("div", { class: "menu-item" }, h("stencil-route-link", { class: "menu-link", url: "/locations" }, h("span", { class: "fix-pin icon" }), h("span", { class: "name" }, "Lokasyonlar"))))))))));
        };
        Object.defineProperty(sharedAside, "is", {
            get: function () { return "shared-aside"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(sharedAside, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return sharedAside;
    }());
    var sharedHeader = /** @class */ (function () {
        function sharedHeader() {
            this.isAdmin = false;
            this.users = [];
        }
        sharedHeader.prototype.componentWillLoad = function () {
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
            }
            this.store.mapStateToProps(this, function (state) {
                var loggedIn = state.app.loggedIn;
                return {
                    loggedIn: loggedIn
                };
            });
            this.store.mapDispatchToProps(this, {
                appSetLogin: __chunk_1.appSetLogin
            });
        };
        sharedHeader.prototype.getUsers = function () {
            var _this = this;
            fetch(window['apiBase'] + "api/user")
                .then(function (res) { return res.json(); })
                .then(function (users) {
                _this.users = users;
            });
        };
        sharedHeader.prototype.logout = function () {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            this.appSetLogin(false);
        };
        sharedHeader.prototype.changePassword = function () {
            var _this = this;
            var oldPass = localStorage.getItem('password');
            if (oldPass !== this.oldPassword) {
                return swal('Eski Şifre Yanlış', 'Maalesef belirtmiş olduğunuz şifreniz sistemde kayıtlı olan şifrenizle uyuşmamaktadır. Lütfen tekrar deneyiniz', 'error');
            }
            fetch(window['apiBase'] + "api/user/auth/changepassword", {
                body: JSON.stringify({ username: localStorage.getItem('username'), password: this.newPassword }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 401) {
                    swal('Kullanıcı Adı veya Şifre Yanlış', 'Maalesef belirtmiş olduğunuz bilgilerle giriş yapılamadı. Yardım için sistem yöneticinizle iletişime geçebilirsiniz', 'error');
                }
                if (response.status === 200) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('userid');
                    siiimpleToast.success('Şifreniz başarıyla güncellendi! Güvenlik sebebiyle sisteme tekrar giriş yapmanız gerekmektedir...');
                    document.querySelector('.modal-backdrop').remove();
                    _this.appSetLogin(false);
                }
            });
        };
        sharedHeader.prototype.createUser = function () {
            fetch(window['apiBase'] + "api/user/auth/createuser", {
                body: JSON.stringify({ username: this.newUserEmail, creator: localStorage.getItem('username') }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 401) {
                    swal('Kullanıcı Adı veya Şifre Yanlış', 'Maalesef belirtmiş olduğunuz bilgilerle giriş yapılamadı. Yardım için sistem yöneticinizle iletişime geçebilirsiniz', 'error');
                }
                if (response.status === 200) {
                    siiimpleToast.success('Belirttiğiniz kullanıcı oluşturuldu. Mail adresine gönderilen şifre ile sisteme giriş yapabilir...');
                }
            });
        };
        sharedHeader.prototype.forgetPassword = function (mail) {
            fetch(window['apiBase'] + "api/user/auth/forgetpassword", {
                body: JSON.stringify({ username: mail }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 500) {
                    swal('Böyle bir kullanıcı yok', 'Maalesef belirtmiş olduğunuz kullanıcı sistemde bulunamadı. Girmiş olduğunuz bilgileri kontrol edip tekrar deneyebilirsiniz.', 'error');
                }
                swal('Başarılı', 'Belirtmiş olduğunuz kullanıcının şifresi sıfırlanmış ve yeni şifre mailine iletilmiştir.', 'success');
            });
        };
        sharedHeader.prototype.makeAdmin = function (user) {
            var _this = this;
            var newdata = user;
            newdata.role = 'admin';
            fetch(window['apiBase'] + "api/user/" + user._id, {
                body: JSON.stringify(newdata),
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 500) {
                    swal('Böyle bir kullanıcı yok', 'Maalesef belirtmiş olduğunuz kullanıcı sistemde bulunamadı. Girmiş olduğunuz bilgileri kontrol edip tekrar deneyebilirsiniz.', 'error');
                }
                _this.getUsers();
                swal('Başarılı', 'Belirtmiş olduğunuz kullanıcı yönetici yapılmıştır.', 'success');
            });
        };
        sharedHeader.prototype.makeBasic = function (user) {
            var _this = this;
            var newdata = user;
            newdata.role = 'basic';
            fetch(window['apiBase'] + "api/user/" + user._id, {
                body: JSON.stringify(newdata),
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(function (response) {
                if (response.status === 500) {
                    swal('Böyle bir kullanıcı yok', 'Maalesef belirtmiş olduğunuz kullanıcı sistemde bulunamadı. Girmiş olduğunuz bilgileri kontrol edip tekrar deneyebilirsiniz.', 'error');
                }
                _this.getUsers();
                swal('Başarılı', 'Belirtmiş olduğunuz kullanıcı yöneticilikten çıkarılmıştır.', 'success');
            });
        };
        sharedHeader.prototype.deleteUser = function (id) {
            var _this = this;
            swal({
                title: "Silmek istediğinize emin misiniz?",
                text: "Eğer bu kullanıcıyı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(function (willDelete) {
                if (willDelete) {
                    __chunk_1.deleteFromPath("user/" + id)
                        .then(function () {
                        __chunk_1.getFromPath('datasource/events')
                            .then(function () {
                            _this.getUsers();
                            swal("Kayıt başarıyla silindi", {
                                icon: "success",
                            });
                        });
                    })
                        .catch(function () {
                        swal("Kayıt silinirken bir hata oluştu", {
                            icon: "error",
                        });
                    });
                }
                else {
                    console.warn('Canceled');
                }
            });
        };
        sharedHeader.prototype.render = function () {
            var _this = this;
            return (h("header", { class: "app-header" }, h("div", { class: "modal fade", id: "userManagement", tabindex: "-1", role: "dialog", "aria-labelledby": "userManagement", "aria-hidden": "true" }, h("div", { class: "modal-dialog user-management", role: "document" }, h("div", { class: "modal-content" }, h("div", { class: "modal-header" }, h("h3", { class: "modal-title" }, "Kullan\u0131c\u0131 y\u00F6netimi"), h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close" }, h("span", { "aria-hidden": "true" }, "\u00D7"))), h("div", { class: "modal-body" }, h("table", { class: "table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, "#"), h("th", { scope: "col" }, "Email"), h("th", { scope: "col" }, "Yetki Seviyesi"), h("th", { scope: "col" }, "Aksiyon"))), h("tbody", null, this.users.map(function (user, index) {
                var role = user.role === 'admin' ? 'Yönetici' : 'Görüntüleme';
                if (user.username !== localStorage.getItem('username')) {
                    return (h("tr", null, h("th", { scope: "row" }, index + 1), h("td", null, user.username), h("td", null, role), h("td", null, user.role !== 'admin' ? (h("button", { class: "btn btn-info", onClick: function () { return _this.makeAdmin(user); } }, "Y\u00F6netici Yap")) : (h("button", { class: "btn btn-info", onClick: function () { return _this.makeBasic(user); } }, "Y\u00F6neticilikten \u00C7\u0131kar")), h("button", { class: "btn btn-warning", onClick: function () {
                            _this.forgetPassword(user.username);
                        } }, "\u015Eifre S\u0131f\u0131rla"), h("button", { onClick: function () { return _this.deleteUser(user._id); }, class: "btn btn-danger" }, "Sil"))));
                }
            })))), h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"))))), h("div", { class: "modal fade", id: "accountInfoModal", tabindex: "-1", role: "dialog", "aria-labelledby": "accountInfoModal", "aria-hidden": "true" }, h("div", { class: "modal-dialog", role: "document" }, h("div", { class: "modal-content" }, h("div", { class: "modal-header" }, h("h3", { class: "modal-title" }, "Hesap Bilgileri"), h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close" }, h("span", { "aria-hidden": "true" }, "\u00D7"))), h("div", { class: "modal-body" }, h("div", null, h("p", { class: "text-muted" }, "Giri\u015F Yapm\u0131\u015F olan kullan\u0131c\u0131 : ", localStorage.getItem('username'))), h("h4", null, "\u015Eifre De\u011Fi\u015Ftirme"), h("hr", null), h("form", null, h("div", { class: "form-group" }, h("label", null, "Eski \u015Eifre"), h("input", { onInput: function (e) { return _this.oldPassword = e.target.value; }, value: this.oldPassword, type: "password", class: "form-control", placeholder: "Eposta adresinizi yaz\u0131n" })), h("div", { class: "form-group" }, h("label", null, "Yeni \u015Eifre"), h("input", { onInput: function (e) { return _this.newPassword = e.target.value; }, value: this.newPassword, type: "password", class: "form-control", placeholder: "Eposta adresinizi yaz\u0131n" })))), h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"), h("button", { onClick: this.changePassword.bind(this), type: "button", class: "btn btn-primary" }, "\u015Eifremi De\u011Fi\u015Ftir"))))), h("div", { class: "modal fade", id: "newUserModal", tabindex: "-1", role: "dialog", "aria-labelledby": "newUserModal", "aria-hidden": "true" }, h("div", { class: "modal-dialog", role: "document" }, h("div", { class: "modal-content" }, h("div", { class: "modal-header" }, h("h3", { class: "modal-title" }, "Yeni Kullan\u0131c\u0131 Olu\u015Ftur"), h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close" }, h("span", { "aria-hidden": "true" }, "\u00D7"))), h("div", { class: "modal-body" }, h("div", null, h("p", { class: "text-muted" }, "Bu ekrandan sisteme yeni bir kullan\u0131c\u0131 ekleyebilirsiniz...")), h("form", null, h("div", { class: "form-group" }, h("label", null, "Eposta"), h("input", { onInput: function (e) { return _this.newUserEmail = e.target.value; }, value: this.newUserEmail, type: "email", class: "form-control", id: "loginEmail", "aria-describedby": "loginEmailHelp", placeholder: "Eposta adresinizi yaz\u0131n" })))), h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"), h("button", { onClick: this.createUser.bind(this), type: "button", class: "btn btn-primary" }, "Kullan\u0131c\u0131 Olu\u015Ftur"))))), h("div", { class: "top-bar" }, h("div", { class: "top-bar-brand" }, h("a", { href: "index.html", title: "Anamorfix" }, h("img", { src: "/assets/content/images/base/anamorfix-logo-white.svg", alt: "Anamorfix Logo" }))), h("nav", { class: "page-flow-container" }), h("div", { class: "top-bar-options" }, h("div", { class: "top-bar-options-item profile dropdown" }, h("a", { onClick: this.getUsers.bind(this), class: "top-bar-options-link dropdown-toggle", href: "javascript:void(0);", role: "button", id: "profileDropdown", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, h("img", { src: "/assets/content/images/base/ersincelik.png" })), h("div", { class: "dropdown-menu", "aria-labelledby": "profileDropdown" }, h("a", { class: "dropdown-item", "data-toggle": "modal", "data-target": "#accountInfoModal", href: "javascript:void(0);" }, "Hesap Bilgileri"), this.isAdmin ? (h("a", { class: "dropdown-item", "data-toggle": "modal", "data-target": "#newUserModal", href: "javascript:void(0);" }, "Yeni Kullan\u0131c\u0131 Olu\u015Ftur")) : '', this.isAdmin ? (h("a", { class: "dropdown-item", "data-toggle": "modal", "data-target": "#userManagement", href: "javascript:void(0);" }, "Kullan\u0131c\u0131 Y\u00F6netimi")) : '', h("div", { class: "dropdown-divider" }), h("a", { class: "dropdown-item", onClick: this.logout.bind(this), href: '' }, "G\u00FCvenli \u00C7\u0131k\u0131\u015F")))))));
        };
        Object.defineProperty(sharedHeader, "is", {
            get: function () { return "shared-header"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(sharedHeader, "properties", {
            get: function () {
                return {
                    "store": {
                        "context": "store"
                    },
                    "users": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(sharedHeader, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return sharedHeader;
    }());
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Route = /** @class */ (function () {
        function Route() {
            this.group = null;
            this.match = null;
            this.componentProps = {};
            this.exact = false;
            this.scrollOnNextRender = false;
            this.previousMatch = null;
        }
        Route.prototype.computeMatch = function (newLocation) {
            var isGrouped = this.group != null || (this.el.parentElement != null && this.el.parentElement.tagName.toLowerCase() === "stencil-route-switch");
            if (!newLocation || isGrouped) {
                return;
            }
            this.previousMatch = this.match;
            return this.match = __chunk_5.matchPath(newLocation.pathname, {
                path: this.url,
                exact: this.exact,
                strict: true
            });
        };
        Route.prototype.loadCompleted = function () {
            return __awaiter(this, void 0, void 0, function () {
                var routeViewOptions;
                return __generator(this, function (_a) {
                    routeViewOptions = {};
                    if (this.history && this.history.location.hash) {
                        routeViewOptions = {
                            scrollToId: this.history.location.hash.substr(1)
                        };
                    }
                    else if (this.scrollTopOffset) {
                        routeViewOptions = {
                            scrollTopOffset: this.scrollTopOffset
                        };
                    }
                    if (typeof this.componentUpdated === "function") {
                        this.componentUpdated(routeViewOptions);
                    }
                    else if (this.match && !__chunk_5.matchesAreEqual(this.match, this.previousMatch) && this.routeViewsUpdated) {
                        this.routeViewsUpdated(routeViewOptions);
                    }
                    return [2 /*return*/];
                });
            });
        };
        Route.prototype.componentDidUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadCompleted()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Route.prototype.componentDidLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadCompleted()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Route.prototype.render = function () {
            if (!this.match || !this.history) {
                return null;
            }
            var childProps = Object.assign({}, this.componentProps, { history: this.history, match: this.match });
            if (this.routeRender) {
                return this.routeRender(Object.assign({}, childProps, { component: this.component }));
            }
            if (this.component) {
                var ChildComponent = this.component;
                return (h(ChildComponent, Object.assign({}, childProps)));
            }
        };
        Object.defineProperty(Route, "is", {
            get: function () { return "stencil-route"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "properties", {
            get: function () {
                return {
                    "component": {
                        "type": String,
                        "attr": "component"
                    },
                    "componentProps": {
                        "type": "Any",
                        "attr": "component-props"
                    },
                    "componentUpdated": {
                        "type": "Any",
                        "attr": "component-updated"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "group": {
                        "type": String,
                        "attr": "group",
                        "reflectToAttr": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "location": {
                        "type": "Any",
                        "attr": "location",
                        "watchCallbacks": ["computeMatch"]
                    },
                    "match": {
                        "type": "Any",
                        "attr": "match",
                        "mutable": true
                    },
                    "routeRender": {
                        "type": "Any",
                        "attr": "route-render"
                    },
                    "routeViewsUpdated": {
                        "type": "Any",
                        "attr": "route-views-updated"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    },
                    "url": {
                        "type": String,
                        "attr": "url"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "style", {
            get: function () { return "stencil-route.inactive {\n  display: none;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Route;
    }());
    __chunk_5.ActiveRouter.injectProps(Route, [
        "location",
        "history",
        "historyType",
        "routeViewsUpdated"
    ]);
    function invariant(value) {
        var args = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            args[_a - 1] = arguments[_a];
        }
        if (!value) {
            console.error.apply(console, args);
        }
    }
    function warning$1(value) {
        var args = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            args[_a - 1] = arguments[_a];
        }
        if (!value) {
            console.warn.apply(console, args);
        }
    }
    var createTransitionManager = function () {
        var prompt;
        var setPrompt = function (nextPrompt) {
            warning$1(prompt == null, 'A history supports only one prompt at a time');
            prompt = nextPrompt;
            return function () {
                if (prompt === nextPrompt) {
                    prompt = null;
                }
            };
        };
        var confirmTransitionTo = function (location, action, getUserConfirmation, callback) {
            if (prompt != null) {
                var result_1 = typeof prompt === 'function' ? prompt(location, action) : prompt;
                if (typeof result_1 === 'string') {
                    if (typeof getUserConfirmation === 'function') {
                        getUserConfirmation(result_1, callback);
                    }
                    else {
                        warning$1(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
                        callback(true);
                    }
                }
                else {
                    callback(result_1 !== false);
                }
            }
            else {
                callback(true);
            }
        };
        var listeners = [];
        var appendListener = function (fn) {
            var isActive = true;
            var listener = function () {
                var args = [];
                for (var _a = 0; _a < arguments.length; _a++) {
                    args[_a] = arguments[_a];
                }
                if (isActive) {
                    fn.apply(void 0, args);
                }
            };
            listeners.push(listener);
            return function () {
                isActive = false;
                listeners = listeners.filter(function (item) { return item !== listener; });
            };
        };
        var notifyListeners = function () {
            var args = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                args[_a] = arguments[_a];
            }
            listeners.forEach(function (listener) { return listener.apply(void 0, args); });
        };
        return {
            setPrompt: setPrompt,
            confirmTransitionTo: confirmTransitionTo,
            appendListener: appendListener,
            notifyListeners: notifyListeners
        };
    };
    var createScrollHistory = function (applicationScrollKey) {
        if (applicationScrollKey === void 0) { applicationScrollKey = 'scrollPositions'; }
        var scrollPositions = new Map();
        if (__chunk_5.storageAvailable('sessionStorage')) {
            var scrollData = window.sessionStorage.getItem(applicationScrollKey);
            scrollPositions = scrollData ?
                new Map(JSON.parse(scrollData)) :
                scrollPositions;
        }
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        function set(key, value) {
            scrollPositions.set(key, value);
            if (__chunk_5.storageAvailable('sessionStorage')) {
                var arrayData_1 = [];
                scrollPositions.forEach(function (value, key) {
                    arrayData_1.push([key, value]);
                });
                window.sessionStorage.setItem('scrollPositions', JSON.stringify(arrayData_1));
            }
        }
        function get(key) {
            return scrollPositions.get(key);
        }
        function has(key) {
            return scrollPositions.has(key);
        }
        function capture(key) {
            set(key, [window.scrollX, window.scrollY]);
        }
        return {
            set: set,
            get: get,
            has: has,
            capture: capture
        };
    };
    var PopStateEvent = 'popstate';
    var HashChangeEvent = 'hashchange';
    var getHistoryState = function () {
        try {
            return window.history.state || {};
        }
        catch (e) {
            return {};
        }
    };
    var createBrowserHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_5.canUseDOM, 'Browser history needs a DOM');
        var globalHistory = window.history;
        var canUseHistory = __chunk_5.supportsHistory();
        var needsHashChangeListener = !__chunk_5.supportsPopStateOnHashChange();
        var scrollHistory = createScrollHistory();
        var forceRefresh = (props.forceRefresh != null) ? props.forceRefresh : false;
        var getUserConfirmation = (props.getUserConfirmation != null) ? props.getUserConfirmation : __chunk_5.getConfirmation;
        var keyLength = (props.keyLength != null) ? props.keyLength : 6;
        var basename = props.basename ? __chunk_5.stripTrailingSlash(__chunk_5.addLeadingSlash(props.basename)) : '';
        var getDOMLocation = function (historyState) {
            historyState = historyState || {};
            var key = historyState.key, state = historyState.state;
            var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var path = pathname + search + hash;
            warning$1((!basename || __chunk_5.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_5.stripBasename(path, basename);
            }
            return __chunk_5.createLocation(path, state, key || __chunk_5.createKey(keyLength));
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            scrollHistory.capture(history.location.key);
            Object.assign(history, nextState);
            history.location.scrollPosition = scrollHistory.get(history.location.key);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var handlePopState = function (event) {
            if (__chunk_5.isExtraneousPopstateEvent(event)) {
                return;
            }
            handlePop(getDOMLocation(event.state));
        };
        var handleHashChange = function () {
            handlePop(getDOMLocation(getHistoryState()));
        };
        var forceNextPop = false;
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_1 = 'POP';
                transitionManager.confirmTransitionTo(location, action_1, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_1, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            var toIndex = allKeys.indexOf(toLocation.key);
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allKeys.indexOf(fromLocation.key);
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var initialLocation = getDOMLocation(getHistoryState());
        var allKeys = [initialLocation.key];
        var createHref = function (location) {
            return basename + __chunk_5.createPath(location);
        };
        var push = function (path, state) {
            warning$1(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_5.createLocation(path, state, __chunk_5.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.pushState({ key: key, state: state }, undefined, href);
                    if (forceRefresh) {
                        window.location.href = href;
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                        nextKeys.push(location.key);
                        allKeys = nextKeys;
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning$1(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                    window.location.href = href;
                }
            });
        };
        var replace = function (path, state) {
            warning$1(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_5.createLocation(path, state, __chunk_5.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.replaceState({ key: key, state: state }, undefined, href);
                    if (forceRefresh) {
                        window.location.replace(href);
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        if (prevIndex !== -1) {
                            allKeys[prevIndex] = location.key;
                        }
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning$1(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                    window.location.replace(href);
                }
            });
        };
        var go = function (n) {
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_5.addEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_5.addEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
            else if (listenerCount === 0) {
                __chunk_5.removeEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_5.removeEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var HashChangeEvent$1 = 'hashchange';
    var HashPathCoders = {
        hashbang: {
            encodePath: function (path) { return path.charAt(0) === '!' ? path : '!/' + __chunk_5.stripLeadingSlash(path); },
            decodePath: function (path) { return path.charAt(0) === '!' ? path.substr(1) : path; }
        },
        noslash: {
            encodePath: __chunk_5.stripLeadingSlash,
            decodePath: __chunk_5.addLeadingSlash
        },
        slash: {
            encodePath: __chunk_5.addLeadingSlash,
            decodePath: __chunk_5.addLeadingSlash
        }
    };
    var getHashPath = function () {
        var href = window.location.href;
        var hashIndex = href.indexOf('#');
        return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
    };
    var pushHashPath = function (path) { return (window.location.hash = path); };
    var replaceHashPath = function (path) {
        var hashIndex = window.location.href.indexOf('#');
        window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
    };
    var createHashHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_5.canUseDOM, 'Hash history needs a DOM');
        var globalHistory = window.history;
        var canGoWithoutReload = __chunk_5.supportsGoWithoutReloadUsingHash();
        var keyLength = (props.keyLength != null) ? props.keyLength : 6;
        var _a = props.getUserConfirmation, getUserConfirmation = _a === void 0 ? __chunk_5.getConfirmation : _a, _b = props.hashType, hashType = _b === void 0 ? 'slash' : _b;
        var basename = props.basename ? __chunk_5.stripTrailingSlash(__chunk_5.addLeadingSlash(props.basename)) : '';
        var _c = HashPathCoders[hashType], encodePath = _c.encodePath, decodePath = _c.decodePath;
        var getDOMLocation = function () {
            var path = decodePath(getHashPath());
            warning$1((!basename || __chunk_5.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_5.stripBasename(path, basename);
            }
            return __chunk_5.createLocation(path, undefined, __chunk_5.createKey(keyLength));
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            Object.assign(history, nextState);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var forceNextPop = false;
        var ignorePath = null;
        var handleHashChange = function () {
            var path = getHashPath();
            var encodedPath = encodePath(path);
            if (path !== encodedPath) {
                replaceHashPath(encodedPath);
            }
            else {
                var location = getDOMLocation();
                var prevLocation = history.location;
                if (!forceNextPop && __chunk_5.locationsAreEqual(prevLocation, location)) {
                    return;
                }
                if (ignorePath === __chunk_5.createPath(location)) {
                    return;
                }
                ignorePath = null;
                handlePop(location);
            }
        };
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_2 = 'POP';
                transitionManager.confirmTransitionTo(location, action_2, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_2, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            var toIndex = allPaths.lastIndexOf(__chunk_5.createPath(toLocation));
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allPaths.lastIndexOf(__chunk_5.createPath(fromLocation));
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        var initialLocation = getDOMLocation();
        var allPaths = [__chunk_5.createPath(initialLocation)];
        var createHref = function (location) { return ('#' + encodePath(basename + __chunk_5.createPath(location))); };
        var push = function (path, state) {
            warning$1(state === undefined, 'Hash history cannot push state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_5.createLocation(path, undefined, __chunk_5.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_5.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(__chunk_5.createPath(history.location));
                    var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextPaths.push(path);
                    allPaths = nextPaths;
                    setState({ action: action, location: location });
                }
                else {
                    warning$1(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                    setState();
                }
            });
        };
        var replace = function (path, state) {
            warning$1(state === undefined, 'Hash history cannot replace state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_5.createLocation(path, undefined, __chunk_5.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_5.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                }
                var prevIndex = allPaths.indexOf(__chunk_5.createPath(history.location));
                if (prevIndex !== -1) {
                    allPaths[prevIndex] = path;
                }
                setState({ action: action, location: location });
            });
        };
        var go = function (n) {
            warning$1(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_5.addEventListener(window, HashChangeEvent$1, handleHashChange);
            }
            else if (listenerCount === 0) {
                __chunk_5.removeEventListener(window, HashChangeEvent$1, handleHashChange);
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function getLocation(location, root) {
        var pathname = location.pathname.indexOf(root) == 0 ?
            "/" + location.pathname.slice(root.length) :
            location.pathname;
        return Object.assign({}, location, { pathname: pathname });
    }
    var HISTORIES = {
        "browser": createBrowserHistory,
        "hash": createHashHistory
    };
    var Router = /** @class */ (function () {
        function Router() {
            var _this = this;
            this.root = "/";
            this.historyType = "browser";
            this.titleSuffix = "";
            this.routeViewsUpdated = function (options) {
                if (options === void 0) { options = {}; }
                if (options.scrollToId && _this.historyType === "browser") {
                    var element = document.getElementById(options.scrollToId);
                    if (element) {
                        return element.scrollIntoView();
                    }
                }
                _this.scrollTo(options.scrollTopOffset || _this.scrollTopOffset);
            };
        }
        Router.prototype.componentWillLoad = function () {
            var _this = this;
            this.history = HISTORIES[this.historyType]();
            this.history.listen(function (location) { return __awaiter$1(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    location = getLocation(location, this.root);
                    this.location = location;
                    return [2 /*return*/];
                });
            }); });
            this.location = getLocation(this.history.location, this.root);
        };
        Router.prototype.scrollTo = function (scrollToLocation) {
            var _this = this;
            if (scrollToLocation == null || this.isServer || !this.history) {
                return;
            }
            if (this.history.action === "POP" && Array.isArray(this.history.location.scrollPosition)) {
                return this.queue.write(function () {
                    if (_this.history && _this.history.location && Array.isArray(_this.history.location.scrollPosition)) {
                        window.scrollTo(_this.history.location.scrollPosition[0], _this.history.location.scrollPosition[1]);
                    }
                });
            }
            return this.queue.write(function () {
                window.scrollTo(0, scrollToLocation);
            });
        };
        Router.prototype.render = function () {
            if (!this.location || !this.history) {
                return;
            }
            var state = {
                historyType: this.historyType,
                location: this.location,
                titleSuffix: this.titleSuffix,
                root: this.root,
                history: this.history,
                routeViewsUpdated: this.routeViewsUpdated
            };
            return (h(__chunk_5.ActiveRouter.Provider, { state: state }, h("slot", null)));
        };
        Object.defineProperty(Router, "is", {
            get: function () { return "stencil-router"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Router, "properties", {
            get: function () {
                return {
                    "history": {
                        "state": true
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "isServer": {
                        "context": "isServer"
                    },
                    "location": {
                        "state": true
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "root": {
                        "type": String,
                        "attr": "root"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    },
                    "titleSuffix": {
                        "type": String,
                        "attr": "title-suffix"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Router;
    }());
    exports.AppLogin = appLogin;
    exports.MyApp = MyApp;
    exports.SharedAside = sharedAside;
    exports.SharedHeader = sharedHeader;
    exports.StencilRoute = Route;
    exports.StencilRouter = Router;
    Object.defineProperty(exports, '__esModule', { value: true });
});

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
App.loadBundle('chunk-f83566b1.js', ['exports'], function (exports) {
    var _this = this;
    var h = window.App.h;
    (function (TypeKeys) {
        // Won't match anything
        TypeKeys["NULL"] = "NULL";
        TypeKeys["ERROR"] = "ERROR";
        TypeKeys["APP_SET_NAME"] = "APP_SET_NAME";
        TypeKeys["APP_SET_LOGIN_STATUS"] = "APP_SET_LOGIN_STATUS";
        TypeKeys["SET_PAGE_DATA"] = "SET_PAGE_DATA";
    })(exports.TypeKeys || (exports.TypeKeys = {}));
    var apiUrl = 'http://demo.duratek.com.tr/api/';
    window['apiBase'] = 'http://demo.duratek.com.tr/';
    var appSetLogin = function (status) { return function (dispatch, _getState) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, dispatch({
                    type: exports.TypeKeys.APP_SET_LOGIN_STATUS,
                    loggedIn: status
                })];
        });
    }); }; };
    var getFromPath = function (path) { return __awaiter(_this, void 0, void 0, function () {
        var request, responseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("" + apiUrl + path)];
                case 1:
                    request = _a.sent();
                    if (!(request.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, request.json()];
                case 2:
                    responseData = _a.sent();
                    return [2 /*return*/, responseData];
                case 3: return [2 /*return*/, null];
            }
        });
    }); };
    var deleteFromPath = function (path) { return __awaiter(_this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("" + apiUrl + path, {
                        method: 'DELETE',
                    })];
                case 1:
                    request = _a.sent();
                    if (!request.ok) {
                        throw new Error('error');
                    }
                    return [2 /*return*/, request];
            }
        });
    }); };
    var updateFromPath = function (path, data) { return __awaiter(_this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("" + apiUrl + path, {
                        body: JSON.stringify(data),
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                    })];
                case 1:
                    request = _a.sent();
                    return [2 /*return*/, request];
            }
        });
    }); };
    var postDataFromPath = function (path, data) { return __awaiter(_this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("" + apiUrl + path, {
                        body: JSON.stringify(data),
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                    })];
                case 1:
                    request = _a.sent();
                    return [2 /*return*/, request];
            }
        });
    }); };
    exports.postDataFromPath = postDataFromPath;
    exports.getFromPath = getFromPath;
    exports.updateFromPath = updateFromPath;
    exports.deleteFromPath = deleteFromPath;
    exports.appSetLogin = appSetLogin;
});

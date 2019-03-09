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
App.loadBundle('app-locations', ['exports', './chunk-3e396618.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var appLocations = /** @class */ (function () {
        function appLocations() {
            this.isAdmin = false;
        }
        appLocations.prototype.componentWillLoad = function () {
            var _this = this;
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
            }
            //window['scrollTo'](0, 0)
            this.store.mapStateToProps(this, function (state) {
                var currentLanguage = state.app.currentLanguage;
                return {
                    currentLanguage: currentLanguage
                };
            });
            __chunk_1.getFromPath('datasource/locations')
                .then(function (resp) {
                _this.pageData = resp;
            });
        };
        appLocations.prototype.componentDidUpdate = function () {
            var _this = this;
            var el = document.querySelector('.card-list');
            this.sortable = new Sortable(el, {
                handle: '.holder',
                onEnd: function (ev) {
                    console.log('On End', ev, _this);
                    var newSorts = _this.sortable.toArray();
                    newSorts.forEach(function (id, index) {
                        var item = _this.pageData.find(function (data) { return data._id === id; });
                        item.order = index;
                        console.log('Item', item, index);
                    });
                    _this.updateOrders();
                }
            });
            console.log('Updated', this);
        };
        appLocations.prototype.updateOrders = function () {
            return __awaiter(this, void 0, void 0, function () {
                function asyncForEach(array, callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var index;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    index = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index < array.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, callback(array[index], index, array)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    index++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            siiimpleToast.message('Sıra güncelleniyor...');
                            return [4 /*yield*/, asyncForEach(this.pageData, function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, __chunk_1.updateFromPath("datasource/locations/" + item._id, item)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            __chunk_1.getFromPath('datasource/locations')
                                .then(function (resp) {
                                _this.pageData = resp;
                                _this.changeTrigger = !_this.changeTrigger;
                                siiimpleToast.success('Sıra başarıyla güncellendi');
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        appLocations.prototype.deleteItem = function (id) {
            var _this = this;
            swal({
                title: "Silmek istediğinize emin misiniz?",
                text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(function (willDelete) {
                if (willDelete) {
                    __chunk_1.deleteFromPath("datasource/projects/" + id)
                        .then(function () {
                        __chunk_1.getFromPath('datasource/projects')
                            .then(function (resp) {
                            _this.pageData = resp;
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
        appLocations.prototype.renderList = function () {
            var _this = this;
            return this.pageData.map(function (item, index) {
                var locationItem = item.languages[_this.currentLanguage];
                return (h("li", { class: "card-list-item", key: Date.now() + "-" + index, "data-id": item._id }, h("div", { class: "card-list-item-image" }, _this.isAdmin ? (h("div", { class: "card-list-item-overlay" }, h("button", { onClick: function () { return _this.deleteItem(item._id); }, class: "btn btn-danger btn-sm", type: "button" }, "Sil"), h("button", { onClick: function () { return _this.history.push("/locations/" + item._id); }, class: "btn btn-primary btn-sm", type: "button" }, "D\u00FCzenle"), h("button", { class: "btn btn-light btn-sm holder", type: "button" }, h("span", { class: "fix-hamburger-md" })))) : '', h("img", { width: 300, height: 400, src: locationItem.image })), h("div", { class: "card-list-item-body" }, h("h3", null, index + 1, ". ", locationItem.name))));
            });
        };
        appLocations.prototype.render = function () {
            var _this = this;
            if (this.pageData) {
                return (h("div", { class: "app-locations" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Lokasyonlar"), h("p", null, "Her sayfada buraya bir a\u00E7\u0131klama yaz\u0131s\u0131 yazabiliriz.")), h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: function () { return _this.history.push("/add-location"); }, class: "btn btn-secondary" }, "Yeni Lokasyon Ekle")) : ''))), h("main", { class: "page-body" }, h("ul", { class: "card-list" }, this.renderList())), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appLocations, "is", {
            get: function () { return "app-locations"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appLocations, "properties", {
            get: function () {
                return {
                    "changeTrigger": {
                        "state": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "pageData": {
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
        Object.defineProperty(appLocations, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appLocations;
    }());
    exports.AppLocations = appLocations;
    Object.defineProperty(exports, '__esModule', { value: true });
});

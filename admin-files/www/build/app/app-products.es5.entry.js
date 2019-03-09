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
App.loadBundle('app-products', ['exports', './chunk-3e396618.js', './chunk-0d315693.js', './chunk-aa48cfa8.js'], function (exports, __chunk_1, __chunk_2, __chunk_4) {
    var h = window.App.h;
    var appProducts = /** @class */ (function () {
        function appProducts() {
            this.isReady = false;
            this.selectedLanguage = 'tr';
            this.selectedFirstLevel = 0;
            this.productSectors = [];
            this.productCategories = [];
            this.productSystems = [];
            this.allCategories = [];
            this.renderedCategoryType = '';
            this.changeTrigger = false;
            this.productIdObject = {};
            this.mainCategory = [];
            this.isAdmin = false;
        }
        appProducts.prototype.componentWillLoad = function () {
            var _this = this;
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
            }
            __chunk_1.getFromPath("product-categories")
                .then(function (resp) {
                __chunk_1.getFromPath("products").then(function (products) {
                    _this.allCategories = resp;
                    _this.products = products;
                    //console.log('All Categories Arrived', this.allCategories);
                    // console.log('All Products Arrived', this.products);
                    resp.forEach(function (item) {
                        _this.productIdObject[item._id] = item;
                        if (item.languages['tr'].path === 'hierarchy') {
                            _this.mainCategory = item;
                        }
                    });
                    _this.renderCategoryId = _this.mainCategory.childs[0].id;
                    _this.isReady = true;
                });
            });
        };
        appProducts.prototype.calculateProductSectors = function () {
            return this.allCategories.filter(function (category) { return !category.parents.length; });
        };
        appProducts.prototype.calculateProductCategories = function () {
            return this.allCategories.filter(function (category) { return category.parents.length === 1; });
        };
        appProducts.prototype.calculateProductSystems = function () {
            return this.allCategories.filter(function (category) { return category.parents.length === 2; });
        };
        appProducts.prototype.mapProductsToCategories = function () {
            /*    this.allCategories.forEach((category) => {
                  category.products = [];
                  this.products.forEach((product) => {
                    if (product.categories.includes(category._id)) {
                      category.products.push(product)
                    }
                  })
                })*/
        };
        appProducts.prototype.getProductsForSelected = function () {
            var _this = this;
            var findedThing = this.allCategories.find(function (item) { return item._id === _this.renderCategoryId; });
            return findedThing;
        };
        appProducts.prototype.getRenderedType = function () {
            switch (this.renderedCategoryType) {
                case 'category':
                    return 'KATEGORİ';
                case 'sector':
                    return 'SEKTÖR';
            }
        };
        appProducts.prototype.componentDidUpdate = function () {
            var _this = this;
            $('.dd').nestable({ /* config options */});
            var sortableEl = document.querySelector('.sortable-category-wrapper');
            if (sortableEl) {
                this.sortable = new Sortable(sortableEl, {
                    draggable: '.sortable-item-product',
                    holder: '.sortable-holder',
                    onEnd: function () {
                        var newSorts = _this.sortable.toArray();
                        var currentCategory = _this.getProductsForSelected();
                        newSorts.forEach(function (cat, catIndex) {
                            currentCategory.products[catIndex] = cat;
                        });
                        siiimpleToast.message('Kategori Ürün Hiyerarşisi Güncelleniyor Lütfen Bekleyiniz...');
                        __chunk_1.updateFromPath("product-categories/" + currentCategory._id, currentCategory)
                            .then(function () {
                            siiimpleToast.success('Kategori Ürün Hiyerarşisi Başarıyla Güncellendi...');
                            _this.changeTrigger = !_this.changeTrigger;
                        });
                    }
                });
            }
        };
        appProducts.prototype.getCategoryProducts = function () {
            var _this = this;
            var detailCategory = this.getProductsForSelected();
            var detailProducts = [];
            var _loop_1 = function (index) {
                detailProducts = __chunk_4.cloneDeep(detailProducts);
                var b = this_1.products.find(function (arrayItem) {
                    if (arrayItem._id === index) {
                        return arrayItem;
                    }
                });
                if (b) {
                    detailProducts.push(__chunk_4.cloneDeep(b));
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = detailCategory.products; _i < _a.length; _i++) {
                var index = _a[_i];
                _loop_1(index);
            }
            if (detailProducts.length) {
                return (h("div", { class: "section-products-body" }, h("div", { class: "fix-list-group-wrapper" }, h("div", { class: "fix-list-group-header" }, h("h3", null, this.getRenderedType(), " -> ", detailCategory.languages[this.selectedLanguage].title)), h("ul", { class: "list-group fix-list-group fix-list-group-sortable sortable-category-wrapper" }, h("div", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col" }, "\u00DCr\u00FCn \u0130smi"), h("div", { class: "col-3" }, "\u00DCr\u00FCn Kodu"), h("div", { class: "col-3 settings" }, "Ayarlar"))), detailProducts.map(function (item, index) {
                    return (h("li", { class: "list-group-item fix-list-group-item sortable-item-product", "data-id": item._id, key: Date.now() + "-" + index }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1), h("div", { class: "col" }, item.languages[_this.selectedLanguage].title), h("div", { class: "col-3" }, item.productCode || 'Girilmemiş'), _this.isAdmin ? (h("div", { class: "col-3 settings" }, h("a", { onClick: function () { return _this.deleteItem(item._id); }, title: "Sil", class: "btn btn-sm btn-outline-danger", "data-toggle": "tooltip" }, h("span", { class: "fix-trash" })), h("a", { onClick: function () { return _this.history.push("/products/" + item._id); }, title: "D\u00FCzenle", class: "btn btn-sm btn-primary", "data-toggle": "tooltip" }, h("span", { class: "fix-settings-2" })), h("a", { href: "javascript:void(0)", class: "btn btn-sm btn-dark sortable-holder", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" })))) : (h("div", { class: "col-3 settings" })))));
                })))));
            }
            else {
                return (h("div", { class: "section-products-body" }, h("div", { class: "fix-list-group-wrapper" }, h("div", { class: "fix-list-group-header" }, h("h3", null, this.getRenderedType(), " -> ", detailCategory.languages[this.selectedLanguage].title)), h("ul", { class: "list-group fix-list-group fix-list-group-sortable" }, h("div", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col" }, "\u00DCr\u00FCn \u0130smi"), h("div", { class: "col-3" }, "\u00DCr\u00FCn Kodu"), h("div", { class: "col-3 settings" }, "Ayarlar"))), h("li", { class: "list-group-item fix-list-group-item" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }), h("div", { class: "col" }, "Se\u00E7mi\u015F oldu\u011Funuz kategoride \u00FCr\u00FCn bulunmamaktad\u0131r")))))));
            }
        };
        appProducts.prototype.renderCategoryList = function (cat) {
            var _this = this;
            var category = this.productIdObject[cat.id];
            if (category && category.languages.tr) {
                return (h("li", { class: "dd-item dd3-item", "data-id": category._id }, h("div", { class: "dd3-content", onClick: function () { _this.renderCategoryId = category._id; } }, category.languages['tr'].title), cat.children ? (h("ol", { class: "dd-list" }, cat.children.map(function (x) { return _this.renderCategoryList(x); }))) : ''));
            }
        };
        appProducts.prototype.renderAsideMenu = function () {
            var _this = this;
            return (h("div", { class: "dd", id: "nestable3" }, h("ol", { class: "dd-list" }, this.mainCategory && this.mainCategory.childs && this.mainCategory.childs.length ? this.mainCategory.childs.map(function (category) { return _this.renderCategoryList(category); }) : '')));
        };
        appProducts.prototype.deleteItem = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    swal({
                        title: "Silmek istediğinize emin misiniz?",
                        text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then(function (willDelete) {
                        if (willDelete) {
                            _this.isReady = false;
                            _this.completeDelete(id);
                        }
                        else {
                            console.warn('Canceled');
                        }
                    });
                    return [2 /*return*/];
                });
            });
        };
        appProducts.prototype.completeDelete = function (id) {
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
                var relatedCategories;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relatedCategories = this.allCategories.filter(function (a) { return a.products.includes(id); });
                            if (!(relatedCategories && relatedCategories.length)) return [3 /*break*/, 2];
                            return [4 /*yield*/, asyncForEach(relatedCategories, function (category) { return __awaiter(_this, void 0, void 0, function () {
                                    var indexOf;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                indexOf = category.products.indexOf(id);
                                                category.products.splice(indexOf, 1);
                                                return [4 /*yield*/, __chunk_1.updateFromPath("product-categories/" + category._id, category)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            __chunk_1.deleteFromPath("products/" + id)
                                .then(function () {
                                __chunk_1.getFromPath("product-categories")
                                    .then(function (resp) {
                                    __chunk_1.getFromPath("products").then(function (products) {
                                        _this.productCategories = resp;
                                        _this.products = products;
                                        swal("Kayıt başarıyla silindi", {
                                            icon: "success",
                                        });
                                    });
                                });
                            })
                                .catch(function () {
                                swal("Kayıt silinirken bir hata oluştu", {
                                    icon: "error",
                                });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        appProducts.prototype.synchronizeCategories = function () {
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
                var temporaryCategories;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            temporaryCategories = __chunk_4.cloneDeep(this.allCategories);
                            temporaryCategories.map(function (x) { return x.products = []; });
                            this.products.forEach(function (a) {
                                if (a.categories && a.categories.length) {
                                    a.categories.forEach(function (b) {
                                        var category = temporaryCategories.find(function (a) { return a._id === b; });
                                        if (category && !category.products.includes(a._id)) {
                                            category.products.push(a._id);
                                        }
                                    });
                                }
                            });
                            return [4 /*yield*/, asyncForEach(temporaryCategories, function (category) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, __chunk_1.updateFromPath('product-categories/' + category._id, category).catch(function () { return siiimpleToast.alert('Bir Sorun Oluştu'); })];
                                            case 1:
                                                _a.sent();
                                                siiimpleToast.success('Kategori Ürün Hiyerarşisi Başarıyla Güncellendi...');
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            location.reload();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ;
        appProducts.prototype.render = function () {
            var _this = this;
            if (this.isReady) {
                return (h("div", { class: "app-products-x" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "\u00DCr\u00FCnler"), h("p", null, "\u00DCr\u00FCnlerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")), h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: function () { return _this.history.push('/add-product'); }, class: "btn btn-secondary" }, "Yeni \u00DCr\u00FCn Ekle")) : '', this.isAdmin ? (h("button", { onClick: function () { return _this.synchronizeCategories(); }, class: "btn btn-danger" }, "KATEGOR\u0130LER\u0130 E\u015E\u0130TLE")) : ''))), h("main", { class: "page-body" }, h("section", { class: "section-products" }, this.renderAsideMenu(), this.getCategoryProducts())), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appProducts, "is", {
            get: function () { return "app-products"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appProducts, "properties", {
            get: function () {
                return {
                    "changeTrigger": {
                        "state": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "isReady": {
                        "state": true
                    },
                    "mainCategory": {
                        "state": true
                    },
                    "renderCategoryId": {
                        "state": true
                    },
                    "selectedFirstLevel": {
                        "state": true
                    },
                    "selectedLanguage": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appProducts, "style", {
            get: function () { return "\@charset \"UTF-8\";\n.app-products-x {\n  /**\n   * Nestable\n   */\n  /**\n   * Nestable Extras\n   */\n  /**\n   * Nestable Draggable Handles\n   */\n  /**\n   * Socialite\n   */ }\n  .app-products-x .cf:after {\n    visibility: hidden;\n    display: block;\n    font-size: 0;\n    content: \" \";\n    clear: both;\n    height: 0; }\n  .app-products-x * html .cf {\n    zoom: 1; }\n  .app-products-x *:first-child + html .cf {\n    zoom: 1; }\n  .app-products-x html {\n    margin: 0;\n    padding: 0; }\n  .app-products-x body {\n    font-size: 100%;\n    margin: 0;\n    padding: 1.75em;\n    font-family: 'Helvetica Neue', Arial, sans-serif; }\n  .app-products-x h1 {\n    font-size: 1.75em;\n    margin: 0 0 0.6em 0; }\n  .app-products-x a {\n    color: #2996cc; }\n  .app-products-x a:hover {\n    text-decoration: none; }\n  .app-products-x p {\n    line-height: 1.5em; }\n  .app-products-x .small {\n    color: #666;\n    font-size: 0.875em; }\n  .app-products-x .large {\n    font-size: 1.25em; }\n  .app-products-x .dd {\n    position: relative;\n    display: block;\n    margin: 0;\n    padding: 0;\n    max-width: 600px;\n    list-style: none;\n    font-size: 13px;\n    line-height: 20px; }\n  .app-products-x .dd-list {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n  .app-products-x .dd-list .dd-list {\n    padding-left: 30px; }\n  .app-products-x .dd-collapsed .dd-list {\n    display: none; }\n  .app-products-x .dd-item,\n  .app-products-x .dd-empty,\n  .app-products-x .dd-placeholder {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    min-height: 20px;\n    font-size: 13px;\n    line-height: 20px; }\n  .app-products-x .dd-handle {\n    display: block;\n    height: 30px;\n    margin: 5px 0;\n    padding: 5px 10px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd-handle:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .app-products-x .dd-item > button {\n    display: block;\n    position: relative;\n    cursor: pointer;\n    float: left;\n    width: 25px;\n    height: 20px;\n    margin: 5px 0;\n    padding: 0;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 0;\n    background: transparent;\n    font-size: 12px;\n    line-height: 1;\n    text-align: center;\n    font-weight: bold; }\n  .app-products-x .dd-item > button:before {\n    content: '+';\n    display: block;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    text-indent: 0; }\n  .app-products-x .dd-item > button[data-action=\"collapse\"]:before {\n    content: '-'; }\n  .app-products-x .dd-placeholder,\n  .app-products-x .dd-empty {\n    margin: 5px 0;\n    padding: 0;\n    min-height: 30px;\n    background: #f2fbff;\n    border: 1px dashed #b6bcbf;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd-empty {\n    border: 1px dashed #bbb;\n    min-height: 100px;\n    background-color: #e5e5e5;\n    background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-size: 60px 60px;\n    background-position: 0 0, 30px 30px; }\n  .app-products-x .dd-dragel {\n    position: absolute;\n    pointer-events: none;\n    z-index: 9999; }\n  .app-products-x .dd-dragel > .dd-item .dd-handle {\n    margin-top: 0; }\n  .app-products-x .dd-dragel .dd-handle {\n    -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1); }\n  .app-products-x .nestable-lists {\n    display: block;\n    clear: both;\n    padding: 30px 0;\n    width: 100%;\n    border: 0;\n    border-top: 2px solid #ddd;\n    border-bottom: 2px solid #ddd; }\n  .app-products-x #nestable-menu {\n    padding: 0;\n    margin: 20px 0; }\n  .app-products-x #nestable-output,\n  .app-products-x #nestable2-output {\n    width: 100%;\n    height: 7em;\n    font-size: 0.75em;\n    line-height: 1.333333em;\n    font-family: Consolas, monospace;\n    padding: 5px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x #nestable2 .dd-handle {\n    color: #fff;\n    border: 1px solid #999;\n    background: #bbb;\n    background: -webkit-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -moz-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#bbb), to(#999));\n    background: linear-gradient(top, #bbb 0%, #999 100%); }\n  .app-products-x #nestable2 .dd-handle:hover {\n    background: #bbb; }\n  .app-products-x #nestable2 .dd-item > button:before {\n    color: #fff; }\n  \@media only screen and (min-width: 700px) {\n    .app-products-x .dd {\n      float: left;\n      width: 100%; }\n    .app-products-x .dd + .dd {\n      margin-left: 2%; } }\n  .app-products-x .dd-hover > .dd-handle {\n    background: #2ea8e5 !important; }\n  .app-products-x .dd3-content {\n    display: block;\n    margin: 5px 0;\n    padding: 5px 10px 5px 40px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd3-content:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .app-products-x .dd-dragel > .dd3-item > .dd3-content {\n    margin: 0; }\n  .app-products-x .dd3-item > button {\n    margin-left: 30px; }\n  .app-products-x .dd3-handle {\n    position: absolute;\n    margin: 0;\n    left: 0;\n    top: 0;\n    cursor: pointer;\n    width: 30px;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 1px solid #aaa;\n    background: #ddd;\n    background: -webkit-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -moz-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#ddd), to(#bbb));\n    background: linear-gradient(top, #ddd 0%, #bbb 100%);\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .app-products-x .dd3-handle:before {\n    content: '≡';\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 3px;\n    width: 100%;\n    text-align: center;\n    text-indent: 0;\n    color: #fff;\n    font-size: 20px;\n    font-weight: normal; }\n  .app-products-x .dd3-handle:hover {\n    background: #ddd; }\n  .app-products-x .socialite {\n    display: block;\n    float: left;\n    height: 35px; }"; },
            enumerable: true,
            configurable: true
        });
        return appProducts;
    }());
    exports.AppProducts = appProducts;
    Object.defineProperty(exports, '__esModule', { value: true });
});

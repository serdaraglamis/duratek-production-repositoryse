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
App.loadBundle('app-add-product', ['exports', './chunk-f83566b1.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    function flat(array) {
        var result = [];
        array.forEach(function (a) {
            result.push(a);
            if (Array.isArray(a.children)) {
                result = result.concat(flat(a.children));
            }
        });
        return result;
    }
    // import cloneDeep from 'lodash.clonedeep';
    var appAddProduct = /** @class */ (function () {
        function appAddProduct() {
            this.changeTrigger = false;
            this.isReady = false;
            this.selectedLanguage = 'tr';
            this.selectedFirstLevel = 0;
            this.selectedSecondLevel = 0;
            this.selectedSecondLevelCategoryTitle = 0;
            this.productIdObject = {};
            this.allCategories = [];
            this.choices = [];
        }
        appAddProduct.prototype.componentWillLoad = function () {
            var _this = this;
            this.productDetail = {
                title: 'Title Here',
                isPublished: true,
                categories: [],
                languages: {
                    tr: {
                        meta: {},
                        title: '',
                        path: '',
                        description: '',
                    },
                    en: {
                        meta: {},
                        title: '',
                        path: '',
                        description: ''
                    }
                }
            };
            __chunk_1.getFromPath("product-categories")
                .then(function (resp) {
                __chunk_1.getFromPath("products").then(function (products) {
                    _this.productCategories = resp;
                    _this.products = products;
                    _this.allCategories = resp;
                    _this.products = products;
                    //console.log('All Categories Arrived', this.allCategories);
                    // console.log('All Products Arrived', this.products);
                    resp.forEach(function (item) {
                        _this.productIdObject[item._id] = item;
                        if (item.languages['tr'].path === 'hierarchy') {
                            _this.mainCategory = item;
                            _this.isReady = true;
                        }
                    });
                });
            });
        };
        appAddProduct.prototype.componentDidUpdate = function () {
            this.initExternalLibraries();
            this.initSelectors();
        };
        appAddProduct.prototype.inputChoosed = function (index, e) {
            this.productDetail.categories[index] = e.target.value;
            this.changeTrigger = !this.changeTrigger;
        };
        appAddProduct.prototype.initSelectors = function () {
            var _this = this;
            var items = document.querySelectorAll('.custom-select');
            if (items && this.choices.length) {
                this.choices.forEach(function (item) { return item.destroy(); });
                this.choices = [];
            }
            var __this = this;
            items.forEach(function (item) {
                _this.choices.push(new Choices(item, {
                    shouldSort: false,
                    callbackOnCreateTemplates: function (strToEl) {
                        var classNames = this.config.classNames;
                        var itemSelectText = this.config.itemSelectText;
                        return {
                            item: function (data) {
                                return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.active ? 'aria-selected="true"' : '') + '\
                  ' + String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:10px;">' + __this.getParentsName(data.value) + '</span> ' + String(data.label) + '\
                </div>\
              ');
                            },
                            choice: function (data) {
                                return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="' + String(itemSelectText) + '"\
                  data-choice \
                  ' + String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:10px;">' + __this.getParentsName(data.value) + '</span> ' + String(data.label) + '\
                </div>\
              ');
                            },
                        };
                    }
                }));
            });
        };
        /*  getParentsName(id) {
            let string = '';
            const item = this.productIdObject[id];
            if(item && item.parents && item.parents.length) {
              item.parents.forEach(id => string = `${string} ${this.productIdObject[id].languages[this.selectedLanguage].title} ->`)
            }
            return string;
          }*/
        appAddProduct.prototype.getParentsName = function (id) {
            window['ssdas'] = id;
            return '';
            /*let string = '';
            const item = this.productIdObject[id];
            if (item && item.parents && item.parents.length) {
              const ahoy = cloneDeep(item.parents);
              ahoy.reverse().forEach((parent, parIn) => {
                const parentItem = this.productIdObject[parent];
                if (parentItem && parentItem.languages) {
                  if (parIn > 0) {
                    string = `${parentItem.languages.tr.title} -> ${string}`
                  } else {
                    string = `${parentItem.languages.tr.title} ->`
                  }
                }
              })
            }
            return string;*/
        };
        appAddProduct.prototype.initExternalLibraries = function () {
            var arr = document.querySelectorAll('input[type="date"]');
            arr.forEach(function (el) {
                window['flatpickr'](el, {
                    dateFormat: "d-m-Y",
                    "locale": 'tr'
                });
            });
            this.initMediumEditor();
        };
        appAddProduct.prototype.initMediumEditor = function () {
            var _this = this;
            if (document.querySelector('.mediumeditor')) {
                var mediumEditorElements = document.querySelectorAll('.mediumeditor');
                var editor = new MediumEditor(mediumEditorElements, {
                    toolbar: {
                        buttons: ['bold', 'italic', 'underline', 'anchor', 'subscript', 'superscript', 'h2', 'h3', 'unorderedlist'],
                        align: 'left',
                        paste: {
                            cleanPastedHTML: true,
                            cleanAttrs: ['style', 'dir'],
                            cleanTags: ['label', 'meta'],
                            unwrapTags: ['sub', 'sup']
                        },
                        placeholder: {
                            text: 'İçerik girişi yapmak için tıklayınız',
                            hideOnClick: true
                        },
                        anchorPreview: true,
                        autoLink: true
                    }
                });
                editor.subscribe('editableInput', function (event, editable) {
                    // Do some work
                    event.stopImmediatePropagation();
                    _this.productDetail.languages[_this.selectedLanguage].description = editable.innerHTML;
                });
            }
        };
        appAddProduct.prototype.inputHandler = function (field, e) {
            if (field === 'productCode') {
                this.productDetail.productCode = e.target.value;
            }
            else {
                this.productDetail.languages[this.selectedLanguage][field] = e.target.value;
            }
            if (field === 'title' || field === 'productCode') {
                var string = this.productDetail.languages[this.selectedLanguage].title;
                var trMap = {
                    'çÇ': 'c',
                    'ğĞ': 'g',
                    'şŞ': 's',
                    'üÜ': 'u',
                    'ıİ': 'i',
                    'öÖ': 'o'
                };
                for (var key in trMap) {
                    string = string.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
                }
                var productCode = this.productDetail.productCode || '';
                for (var key in trMap) {
                    productCode = productCode.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
                }
                this.productDetail.languages[this.selectedLanguage].path = string.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-') + '-' + productCode.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                this.changeTrigger = !this.changeTrigger;
            }
        };
        appAddProduct.prototype.isPublishedHandler = function (event) {
            this.productDetail.isPublished = event.target.checked;
        };
        appAddProduct.prototype.removeCategory = function (index, e) {
            e.preventDefault();
            this.productDetail.categories.splice(index, 1);
            this.changeTrigger = !this.changeTrigger;
        };
        appAddProduct.prototype.addCategory = function () {
            this.productDetail.categories.push(this.productCategories[0]._id);
            this.changeTrigger = !this.changeTrigger;
        };
        appAddProduct.prototype.updateDetails = function () {
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
                var addedProduct, response, newProductId_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.productDetail.categories.length) return [3 /*break*/, 4];
                            siiimpleToast.message("\u00DCr\u00FCn Olu\u015Fturuluyor l\u00FCtfen bekleyiniz...");
                            return [4 /*yield*/, __chunk_1.postDataFromPath("products", this.productDetail)];
                        case 1:
                            addedProduct = _a.sent();
                            return [4 /*yield*/, addedProduct.json()];
                        case 2:
                            response = _a.sent();
                            siiimpleToast.message("\u00DCr\u00FCn ba\u015Far\u0131yla olu\u015Fturuldu. Kategori e\u015Fleme i\u015Flemlerine ba\u015Flan\u0131yor...");
                            newProductId_1 = response._id;
                            return [4 /*yield*/, asyncForEach(this.productDetail.categories, function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    var cateItem;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                cateItem = this.productCategories.find(function (a) { return a._id === item; });
                                                if (!cateItem) return [3 /*break*/, 2];
                                                siiimpleToast.message("\u00DCr\u00FCn " + cateItem.languages.tr.title + " kategorisine ekleniyor l\u00FCtfen bekleyin...");
                                                cateItem.products.push(newProductId_1);
                                                return [4 /*yield*/, __chunk_1.updateFromPath("product-categories/" + cateItem._id, cateItem)];
                                            case 1:
                                                _a.sent();
                                                siiimpleToast.message("\u00DCr\u00FCn " + cateItem.languages.tr.title + " kategorisine ba\u015Far\u0131yla eklendi.");
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 3:
                            _a.sent();
                            siiimpleToast.message("Kayd\u0131 tamamlan\u0131yor. L\u00FCtfen Bekleyiniz!!!");
                            swal('Başarılı', 'Ürün detayı başarıyla güncellendi!', 'success').then(function () {
                                _this.history.goBack();
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            swal('Hata', 'En az bir kategori seçmeniz gerekmektedir', 'error');
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        appAddProduct.prototype.renderOptions = function (it, product) {
            if (!this.productIdObject || !this.productIdObject[it.id]) {
                return null;
            }
            var item = this.productIdObject[it.id];
            if (item === null || item == 'undefined') {
                return null;
            }
            else {
                return (h("option", { key: Math.random() + "-" + item._id, selected: product === item._id, value: item._id }, item.languages.tr.title, " ", it.children ? '>>>' : ''));
            }
        };
        appAddProduct.prototype._renderForm = function () {
            var _this = this;
            if (this.productDetail) {
                return (h("div", { class: "section-detail-body" }, h("div", { class: "section-detail-item" }, h("form", null, h("div", { class: "section-detail-item-group" }, h("div", { class: "custom-control custom-checkbox" }, h("input", { onChange: this.isPublishedHandler.bind(this), type: "checkbox", id: "productPublicationCheck", checked: this.productDetail.isPublished }), h("label", { class: "custom-control-label" }, "\u00DCr\u00FCn\u00FC Yay\u0131nla"), h("small", { class: "form-text text-muted" }, "Yay\u0131nlanmas\u0131n\u0131 istedi\u011Finiz \u00FCr\u00FCn i\u00E7in bu kutucu\u011Fu i\u015Faretleyiniz. Ayn\u0131 i\u015Flemi di\u011Fer dil se\u00E7enekleri i\u00E7in de yapmal\u0131s\u0131n\u0131z."))), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "\u00DCr\u00FCn \u0130smi"), h("input", { type: "text", class: "form-control", id: "productName", placeholder: "\u00DCr\u00FCn ismini yaz\u0131n\u0131z", value: this.productDetail.languages[this.selectedLanguage].title, onInput: function (e) { return _this.inputHandler('title', e); } }), h("small", { class: "form-text text-muted" }, "\u00DCr\u00FCn ismini yaz\u0131n\u0131z. Bu isim web sitenizde \u00FCr\u00FCn listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")), h("div", { class: "form-group" }, h("label", null, "\u00DCr\u00FCn Kodu"), h("input", { type: "text", class: "form-control", id: "productCode", placeholder: "\u00DCr\u00FCn kodunu yaz\u0131n\u0131z", value: this.productDetail.productCode, onInput: function (e) { return _this.inputHandler('productCode', e); } }), h("small", { class: "form-text text-muted" }, "\u00DCr\u00FCn ismini yaz\u0131n\u0131z. Bu isim web sitenizde \u00FCr\u00FCn listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")), h("div", { class: "form-group" }, h("label", null, "\u00DCr\u00FCn URL"), h("input", { type: "text", class: "form-control", id: "productSlug", placeholder: "\u00DCr\u00FCn URL'si otomatik olu\u015Fur", value: this.productDetail.languages[this.selectedLanguage].path, readonly: true }), h("small", { class: "form-text text-muted" }, "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z \u00FCr\u00FCn ismi ve \u00FCr\u00FCn koduna g\u00F6re otomatik olu\u015Fur.")), this.productDetail.categories.map(function (product, index) {
                    return (h("div", { key: "" + Date.now() + Math.random(), class: "form-group row" }, h("div", { class: "col-10" }, h("select", { onChange: function (e) { return _this.inputChoosed(index, e); }, class: "form-control custom-select", name: "choices-single-custom-templates" }, flat(_this.mainCategory.childs).map(function (item) {
                        return _this.renderOptions(item, product);
                    }))), h("div", { class: "col-2" }, h("a", { class: "btn btn-danger text-white", onClick: function (e) { return _this.removeCategory(index, e); } }, " Sil "))));
                }), h("a", { class: "btn btn-success", onClick: function () { return _this.addCategory(); } }, "Kategori Ekle")), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "\u00DCr\u00FCn A\u00E7\u0131klamas\u0131"), h("div", { innerHTML: this.productDetail.languages[this.selectedLanguage].description, class: "form-control mediumeditor", id: "productDescription" })))))));
            }
        };
        appAddProduct.prototype.render = function () {
            var _this = this;
            if (this.isReady) {
                return (h("div", { class: "app-product-detail" }, h("main", { class: "page-body" }, h("section", { class: "section-detail" }, h("div", { class: "section-detail-header" }, h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, h("button", { onClick: function () { return _this.selectedLanguage = 'tr'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'tr' ? 'active' : '') }, "T\u00FCrk\u00E7e"), h("button", { onClick: function () { return _this.selectedLanguage = 'en'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'en' ? 'active' : '') }, "English"))), this._renderForm(), h("div", { class: "section-detail-footer" }, h("a", { onClick: function () { return history.back(); }, role: "button", class: "btn btn-secondary" }, "\u0130ptal"), h("a", { onClick: this.updateDetails.bind(this), role: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appAddProduct, "is", {
            get: function () { return "app-add-product"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appAddProduct, "properties", {
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
                    "match": {
                        "type": "Any",
                        "attr": "match"
                    },
                    "selectedFirstLevel": {
                        "state": true
                    },
                    "selectedLanguage": {
                        "state": true
                    },
                    "selectedSecondLevel": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appAddProduct, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appAddProduct;
    }());
    exports.AppAddProduct = appAddProduct;
    Object.defineProperty(exports, '__esModule', { value: true });
});

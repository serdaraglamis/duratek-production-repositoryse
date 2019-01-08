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
/*! Built with http://stenciljs.com */
App.loadBundle('new-category-component', ['exports', './chunk-721f944e.js', './chunk-ac6932ea.js'], function (exports, __chunk_4, __chunk_1) {
    var h = window.App.h;
    var mockRenderForm = {
        languages: {
            tr: {
                title: 'Yeni Kategori İsmi',
                path: '',
                description: ''
            },
            en: {
                title: 'New Category Name',
                path: '',
                description: ''
            }
        },
        title: 'Yeni Kategori',
        order: 0,
        parents: [],
        products: [],
        childs: [],
    };
    var NewCategoryComponent = /** @class */ (function () {
        function NewCategoryComponent() {
            this.isAdmin = false;
            this.allCategories = [];
            this.categorySortable = {};
            this.systemSortable = {};
            this.choices = [];
            this.productIdObject = {};
            this.categoriesSorted = [];
            this.mainCategory = [];
            this.mockRenderForm = mockRenderForm;
            this.formLanguage = 'tr';
            this.changeTrigger = false;
        }
        NewCategoryComponent.prototype.componentWillLoad = function () {
            var _this = this;
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('Kategori bolumu için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
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
                            console.log('Yes Hierarchy Found', item);
                            _this.mainCategory = item;
                        }
                    });
                    // console.log('Product Id Object Arrived', this.productIdObject)
                });
            });
        };
        NewCategoryComponent.prototype.componentDidUpdate = function () {
            var _this = this;
            this.initMediumEditor();
            $('.dd').nestable({ /* config options */});
            $('.dd').on('change', function () {
                /* on change event */
                // console.log('Change Happened', e);
                var json = $('.dd').nestable('serialize');
                // console.log('Serialized JSON', json);
                _this.mainCategory.childs = json;
                /*    json.forEach(item => {
                      let data = this.productIdObject[item.id];
                      if (item.children) {
                        data.childs = item.children;
                        item.children.forEach(a => {
                          if (a.children) {
                            const u = this.productIdObject[a.id];
                            u.childs = a.children;
                            updateFromPath(`product-categories/${a.id}`, u)
                              .then(() => {
                                console.log('Data Updated Sub*************************************************************')
                              })
                          }
                        });
                        updateFromPath(`product-categories/${item.id}`, data)
                          .then(() => {
                            console.log('Data Updated *************************************************************')
                          })
                      }
              
                    });*/
                __chunk_1.updateFromPath("product-categories/" + _this.mainCategory._id, _this.mainCategory)
                    .then(function () {
                    // console.log('Data Updated *************************************************************')
                });
            });
        };
        NewCategoryComponent.prototype.initMediumEditor = function () {
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
                    _this.detailRenderForm.languages[_this.formLanguage].description = editable.innerHTML;
                });
            }
        };
        NewCategoryComponent.prototype.renderSubCatNames = function (category) {
            var _this = this;
            var namestr = '';
            if (category.parents.length) {
                category.parents.forEach(function (x) {
                    var cat = _this.allCategories.find(function (a) { return a._id === x; });
                    if (cat && cat.languages) {
                        namestr = namestr + ' -- ' + cat.languages['tr'].title;
                    }
                });
            }
            return namestr;
        };
        NewCategoryComponent.prototype.renderParentsName = function (_a) {
            var parents = _a.parents;
            var str = '';
            if (parents && parents !== null && parents.length && parents.length > 1) {
                var data = this.productIdObject[parents[1]];
                if (data && data.languages) {
                    str = " --->> " + data.languages.tr.title;
                }
            }
            if (parents && parents !== null && parents.length && parents.length) {
                var datax = this.productIdObject[parents[0]];
                if (datax && datax.languages) {
                    str = str + " ---|| " + datax.languages.tr.title;
                }
            }
            return str;
        };
        NewCategoryComponent.prototype.renderCategoryList = function (cat) {
            var _this = this;
            var category = this.productIdObject[cat.id];
            if (category && category.languages.tr) {
                return (h("li", { class: "dd-item dd3-item", "data-id": category._id }, h("div", { class: "dd-handle dd3-handle" }, "Drag"), h("div", { class: "dd3-content", onClick: function () { _this.renderCategoryId = category._id; _this.detailRenderForm = category; } }, category.languages['tr'].title), cat.children ? (h("ol", { class: "dd-list" }, cat.children.map(function (x) { return _this.renderCategoryList(x); }))) : ''));
            }
        };
        NewCategoryComponent.prototype.inputHandler = function (field, e) {
            if (field === 'productCode') {
                this.detailRenderForm.productCode = e.target.value;
            }
            else {
                this.detailRenderForm.languages[this.formLanguage][field] = e.target.value;
            }
            if (field === 'title') {
                var string = this.detailRenderForm.languages[this.formLanguage].title;
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
                this.detailRenderForm.languages[this.formLanguage].path = string.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                this.changeTrigger = !this.changeTrigger;
            }
        };
        NewCategoryComponent.prototype.deleteItem = function () {
            var _this = this;
            // console.log('Detail Render Form', this.detailRenderForm)
            if (this.detailRenderForm.products.length) {
                swal('Hata', 'İçerisinde ürün olan kategorileri silemezsiniz. Bu işlemi yapmadan önce ilgili ürünleri başka kategoriye taşıyabilir ya da silebilirsiniz.', 'error');
                return;
            }
            var catObj = this.mainCategory.childs.find(function (a) { return a.id === _this.detailRenderForm._id; });
            if (!catObj) {
                swal('Hata', 'Herhangi bir kategorinin alt kirilimi olan bir kategoriyi silemezsiniz bu islemi gerceklestirmek icin lutfen ilgili kategoriyi ana kategori konumuna surukleyiniz.', 'error');
                return;
            }
            if (catObj && catObj.children) {
                swal('Hata', 'Alt kiriliminda baska kategori olan kategorileri silemezsiniz, bu islemi yapmak icin altindaki kategorileri baska bir seviyeye tasimalisiniz', 'error');
                return;
            }
            swal({
                title: "Silmek istediğinize emin misiniz?",
                text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(function (willDelete) {
                if (willDelete) {
                    __chunk_1.deleteFromPath("product-categories/" + _this.detailRenderForm._id)
                        .then(function () {
                        for (var i = 0; i < _this.mainCategory.childs.length - 1; i++) {
                            if (_this.mainCategory.childs[i].id === _this.detailRenderForm._id) {
                                _this.mainCategory.childs.splice(i, 1);
                            }
                        }
                        __chunk_1.updateFromPath("product-categories/" + _this.mainCategory._id, _this.mainCategory)
                            .then(function () {
                            swal("Kayıt başarıyla silindi", 'Kategori düzeninin aktif olabilmesi için sayfa yeniden yüklenecektir', 'success').then(function () { return location.reload(); });
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
        NewCategoryComponent.prototype.updateDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    __chunk_1.updateFromPath("product-categories/" + this.detailRenderForm._id, this.detailRenderForm)
                        .then(function () {
                        swal('Başarılı', 'Kategori detayı başarıyla güncellendi. Değişikliklerin efektif olması için sayfa yeniden yüklenecektir.', 'success').then(function () { return location.reload(); });
                    });
                    return [2 /*return*/];
                });
            });
        };
        NewCategoryComponent.prototype.addDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    __chunk_1.postDataFromPath("product-categories", this.detailRenderForm)
                        .then(function (res) {
                        // console.log('Category Added', res);
                        var jsonprom = res.json();
                        jsonprom.then(function (value) {
                            _this.mainCategory.childs.unshift({ id: value._id });
                            // console.log('New cate added');
                            __chunk_1.updateFromPath("product-categories/" + _this.mainCategory._id, _this.mainCategory)
                                .then(function () {
                                // console.log('Data Updated *************************************************************')
                                _this.changeTrigger = !_this.changeTrigger;
                                location.reload();
                            });
                        });
                    });
                    return [2 /*return*/];
                });
            });
        };
        NewCategoryComponent.prototype.getProductsForSelected = function () {
            var _this = this;
            return this.allCategories.find(function (item) { return item._id === _this.renderCategoryId; });
        };
        NewCategoryComponent.prototype.renderAddBlock = function () {
            var _this = this;
            if (typeof this.renderCategoryId !== undefined && this.detailRenderForm && this.isAdmin) {
                if (this.renderCategoryId !== null) {
                    this.detailRenderForm = this.getProductsForSelected();
                }
                else {
                    this.detailRenderForm = this.mockRenderForm;
                }
                if (!this.detailRenderForm.languages.en) {
                    this.detailRenderForm.languages.en = __chunk_4.cloneDeep(this.detailRenderForm.languages.tr);
                }
                return (h("div", { class: "section-products-body" }, h("main", { class: "page-body" }, h("section", { class: "section-detail" }, h("div", { class: "section-detail-header" }, h("h3", null, this.detailRenderForm.languages[this.formLanguage].title), h("br", null), h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, h("button", { onClick: function () { return _this.formLanguage = 'tr'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.formLanguage === 'tr' ? 'active' : '') }, "T\u00FCrk\u00E7e"), h("button", { onClick: function () { return _this.formLanguage = 'en'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.formLanguage === 'en' ? 'active' : '') }, "English"))), h("div", { class: "section-detail-body" }, h("div", { class: "section-detail-item" }, h("form", null, h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "Kategori \u0130smi"), h("input", { type: "text", class: "form-control", id: "categoryName", placeholder: "Kategori ismini yaz\u0131n\u0131z", value: this.detailRenderForm.languages[this.formLanguage].title, onInput: function (e) { return _this.inputHandler('title', e); } }), h("small", { class: "form-text text-muted" }, "Kategori ismini yaz\u0131n\u0131z. Bu isim web sitenizde kategori listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")), h("div", { class: "form-group" }, h("label", null, "Kategori URL"), h("input", { type: "text", class: "form-control", id: "categorySlug", placeholder: "Kategori URL'si otomatik olu\u015Fur", value: this.detailRenderForm.languages[this.formLanguage].path, readonly: true }), h("small", { class: "form-text text-muted" }, "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z kategori ismine g\u00F6re otomatik olu\u015Fur.")), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "Kategori A\u00E7\u0131klamas\u0131"), h("div", { innerHTML: this.detailRenderForm.languages[this.formLanguage].description, class: "form-control mediumeditor", id: "categoryDesc" }))))))), h("div", { class: "section-detail-footer" }, this.renderCategoryId === null
                    ? ''
                    : (h("a", { onClick: this.deleteItem.bind(this), class: "btn btn-danger" }, "Kategoriyi Sil")), this.renderCategoryId === null
                    ? (h("a", { onClick: this.addDetails.bind(this), class: "btn btn-primary" }, "Yeni Kategori Olu\u015Ftur"))
                    : (h("a", { onClick: this.updateDetails.bind(this), class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet"))))), h("footer", { class: "page-footer" })));
            }
        };
        NewCategoryComponent.prototype.render = function () {
            var _this = this;
            // console.log('Render Triggered');
            return (h("div", { class: "new-category-component" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Kategoriler"), h("p", null, "Kategorilerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")), h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: function () { _this.renderCategoryId = null; _this.detailRenderForm = mockRenderForm; }, class: "btn btn-secondary" }, "Yeni Kategori Ekle")) : ''))), h("main", { class: "page-body" }, this.renderAddBlock(), h("menu", { id: "nestable-menu" }, h("button", { type: "button", onClick: function () { return $('.dd').nestable('expandAll'); }, "data-action": "expand-all" }, "T\u00FCm\u00FCn\u00FC Geni\u015Flet"), h("button", { type: "button", onClick: function () { return $('.dd').nestable('collapseAll'); }, "data-action": "collapse-all" }, "T\u00FCm\u00FCn\u00FC  Daralt")), h("section", { class: "" }, h("div", { class: "dd", id: "nestable3" }, h("ol", { class: "dd-list" }, this.mainCategory && this.mainCategory.childs && this.mainCategory.childs.length ? this.mainCategory.childs.map(function (category) { return _this.renderCategoryList(category); }) : ''))))));
        };
        Object.defineProperty(NewCategoryComponent, "is", {
            get: function () { return "new-category-component"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NewCategoryComponent, "properties", {
            get: function () {
                return {
                    "allCategories": {
                        "state": true
                    },
                    "changeTrigger": {
                        "state": true
                    },
                    "formLanguage": {
                        "state": true
                    },
                    "products": {
                        "state": true
                    },
                    "renderCategoryId": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NewCategoryComponent, "style", {
            get: function () { return "\@charset \"UTF-8\";\n.new-category-component {\n  /**\n   * Nestable\n   */\n  /**\n   * Nestable Extras\n   */\n  /**\n   * Nestable Draggable Handles\n   */\n  /**\n   * Socialite\n   */ }\n  .new-category-component .cf:after {\n    visibility: hidden;\n    display: block;\n    font-size: 0;\n    content: \" \";\n    clear: both;\n    height: 0; }\n  .new-category-component * html .cf {\n    zoom: 1; }\n  .new-category-component *:first-child + html .cf {\n    zoom: 1; }\n  .new-category-component html {\n    margin: 0;\n    padding: 0; }\n  .new-category-component body {\n    font-size: 100%;\n    margin: 0;\n    padding: 1.75em;\n    font-family: 'Helvetica Neue', Arial, sans-serif; }\n  .new-category-component h1 {\n    font-size: 1.75em;\n    margin: 0 0 0.6em 0; }\n  .new-category-component a {\n    color: #2996cc; }\n  .new-category-component a:hover {\n    text-decoration: none; }\n  .new-category-component p {\n    line-height: 1.5em; }\n  .new-category-component .small {\n    color: #666;\n    font-size: 0.875em; }\n  .new-category-component .large {\n    font-size: 1.25em; }\n  .new-category-component .dd {\n    position: relative;\n    display: block;\n    margin: 0;\n    padding: 0;\n    max-width: 600px;\n    list-style: none;\n    font-size: 13px;\n    line-height: 20px; }\n  .new-category-component .dd-list {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n  .new-category-component .dd-list .dd-list {\n    padding-left: 30px; }\n  .new-category-component .dd-collapsed .dd-list {\n    display: none; }\n  .new-category-component .dd-item,\n  .new-category-component .dd-empty,\n  .new-category-component .dd-placeholder {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    min-height: 20px;\n    font-size: 13px;\n    line-height: 20px; }\n  .new-category-component .dd-handle {\n    display: block;\n    height: 30px;\n    margin: 5px 0;\n    padding: 5px 10px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .new-category-component .dd-handle:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .new-category-component .dd-item > button {\n    display: block;\n    position: relative;\n    cursor: pointer;\n    float: left;\n    width: 25px;\n    height: 20px;\n    margin: 5px 0;\n    padding: 0;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 0;\n    background: transparent;\n    font-size: 12px;\n    line-height: 1;\n    text-align: center;\n    font-weight: bold; }\n  .new-category-component .dd-item > button:before {\n    content: '+';\n    display: block;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    text-indent: 0; }\n  .new-category-component .dd-item > button[data-action=\"collapse\"]:before {\n    content: '-'; }\n  .new-category-component .dd-placeholder,\n  .new-category-component .dd-empty {\n    margin: 5px 0;\n    padding: 0;\n    min-height: 30px;\n    background: #f2fbff;\n    border: 1px dashed #b6bcbf;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .new-category-component .dd-empty {\n    border: 1px dashed #bbb;\n    min-height: 100px;\n    background-color: #e5e5e5;\n    background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-size: 60px 60px;\n    background-position: 0 0, 30px 30px; }\n  .new-category-component .dd-dragel {\n    position: absolute;\n    pointer-events: none;\n    z-index: 9999; }\n  .new-category-component .dd-dragel > .dd-item .dd-handle {\n    margin-top: 0; }\n  .new-category-component .dd-dragel .dd-handle {\n    -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1); }\n  .new-category-component .nestable-lists {\n    display: block;\n    clear: both;\n    padding: 30px 0;\n    width: 100%;\n    border: 0;\n    border-top: 2px solid #ddd;\n    border-bottom: 2px solid #ddd; }\n  .new-category-component #nestable-menu {\n    padding: 0;\n    margin: 20px 0; }\n  .new-category-component #nestable-output,\n  .new-category-component #nestable2-output {\n    width: 100%;\n    height: 7em;\n    font-size: 0.75em;\n    line-height: 1.333333em;\n    font-family: Consolas, monospace;\n    padding: 5px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .new-category-component #nestable2 .dd-handle {\n    color: #fff;\n    border: 1px solid #999;\n    background: #bbb;\n    background: -webkit-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -moz-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#bbb), to(#999));\n    background: linear-gradient(top, #bbb 0%, #999 100%); }\n  .new-category-component #nestable2 .dd-handle:hover {\n    background: #bbb; }\n  .new-category-component #nestable2 .dd-item > button:before {\n    color: #fff; }\n  \@media only screen and (min-width: 700px) {\n    .new-category-component .dd {\n      float: left;\n      width: 100%; }\n    .new-category-component .dd + .dd {\n      margin-left: 2%; } }\n  .new-category-component .dd-hover > .dd-handle {\n    background: #2ea8e5 !important; }\n  .new-category-component .dd3-content {\n    display: block;\n    height: 30px;\n    margin: 5px 0;\n    padding: 5px 10px 5px 40px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .new-category-component .dd3-content:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .new-category-component .dd-dragel > .dd3-item > .dd3-content {\n    margin: 0; }\n  .new-category-component .dd3-item > button {\n    margin-left: 30px; }\n  .new-category-component .dd3-handle {\n    position: absolute;\n    margin: 0;\n    left: 0;\n    top: 0;\n    cursor: pointer;\n    width: 30px;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 1px solid #aaa;\n    background: #ddd;\n    background: -webkit-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -moz-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#ddd), to(#bbb));\n    background: linear-gradient(top, #ddd 0%, #bbb 100%);\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .new-category-component .dd3-handle:before {\n    content: '≡';\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 3px;\n    width: 100%;\n    text-align: center;\n    text-indent: 0;\n    color: #fff;\n    font-size: 20px;\n    font-weight: normal; }\n  .new-category-component .dd3-handle:hover {\n    background: #ddd; }\n  .new-category-component .socialite {\n    display: block;\n    float: left;\n    height: 35px; }"; },
            enumerable: true,
            configurable: true
        });
        return NewCategoryComponent;
    }());
    exports.NewCategoryComponent = NewCategoryComponent;
    Object.defineProperty(exports, '__esModule', { value: true });
});

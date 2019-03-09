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
App.loadBundle('app-categories', ['exports', './chunk-3e396618.js', './chunk-0d315693.js', './chunk-aa48cfa8.js'], function (exports, __chunk_1, __chunk_2, __chunk_4) {
    var h = window.App.h;
    var appCategories = /** @class */ (function () {
        function appCategories() {
            this.isReady = false;
            this.selectedLanguage = 'tr';
            this.formLanguage = 'tr';
            this.selectedFirstLevel = 0;
            this.productSectors = [];
            this.productCategories = [];
            this.productSystems = [];
            this.allCategories = [];
            this.renderedCategoryType = '';
            this.changeTrigger = false;
            this.categorySortable = {};
            this.systemSortable = {};
            this.choices = [];
            this.productIdObject = {};
            this.isAdmin = false;
        }
        appCategories.prototype.componentWillLoad = function () {
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
                    resp.forEach(function (item) { return _this.productIdObject[item._id] = item; });
                    _this.calculateCategoryLevels();
                });
            });
        };
        appCategories.prototype.componentDidUpdate = function () {
            var _this = this;
            if (this.sectorSortable)
                this.sectorSortable.destroy();
            var sectorEl = document.querySelector('.sector-wrapper');
            this.sectorSortable = new Sortable(sectorEl, {
                draggable: '.sector-draggable',
                holder: '.sector-draggable',
                onEnd: function () {
                    var newSorts = _this.sectorSortable.toArray();
                    _this.updateSortable(newSorts, 'sector');
                }
            });
            var categoryEls = document.querySelectorAll('.category-wrapper');
            if (categoryEls.length) {
                categoryEls.forEach(function (item, index) {
                    if (_this.categorySortable[index])
                        _this.categorySortable[index].destroy();
                    _this.categorySortable[index] = new Sortable(item, {
                        draggable: '.category-draggable',
                        holder: '.category-draggable',
                        onEnd: function (ev) {
                            var newSorts = _this.categorySortable[ev.target.dataset.order].toArray();
                            _this.updateSortable(newSorts, 'category');
                        }
                    });
                });
            }
            var systemEls = document.querySelectorAll('.system-wrapper');
            if (systemEls.length) {
                systemEls.forEach(function (item) {
                    if (_this.systemSortable[item.dataset.order])
                        _this.systemSortable[item.dataset.order].destroy();
                    _this.systemSortable[item.dataset.order] = new Sortable(item, {
                        draggable: '.system-draggable',
                        holder: '.system-draggable',
                        onEnd: function (ev) {
                            var newSorts = _this.systemSortable[ev.target.dataset.order].toArray();
                            _this.updateSortable(newSorts, 'system');
                        }
                    });
                });
            }
            this.initMediumEditor();
            this.initSelectors();
        };
        appCategories.prototype.initMediumEditor = function () {
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
        appCategories.prototype.updateSortable = function (newArray, type) {
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
                var counterType;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            siiimpleToast.message('Sıra Güncelleniyor Lütfen Bekleyiniz...');
                            counterType = 0;
                            switch (type) {
                                case 'sector':
                                    counterType = 1;
                                    break;
                                case 'category':
                                    counterType = 2;
                                    break;
                                case 'system':
                                    counterType = 3;
                                    break;
                            }
                            return [4 /*yield*/, asyncForEach(newArray, function (item, order) { return __awaiter(_this, void 0, void 0, function () {
                                    var categoryItem;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                categoryItem = this.allCategories.find(function (cat) { return cat._id === item; });
                                                categoryItem.order = Number("" + counterType + order);
                                                return [4 /*yield*/, __chunk_1.updateFromPath("product-categories/" + item, categoryItem)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            siiimpleToast.success('Sıra başarıyla güncellendi');
                            this.changeTrigger = !this.changeTrigger;
                            return [2 /*return*/];
                    }
                });
            });
        };
        appCategories.prototype.calculateCategoryLevels = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, x;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.mapProductsToCategories();
                            _a = this;
                            return [4 /*yield*/, this.calculateProductSectors()];
                        case 1:
                            _a.productSectors = _d.sent();
                            this.mockRenderForm = {
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
                            _b = this;
                            return [4 /*yield*/, this.calculateProductCategories()];
                        case 2:
                            _b.productCategories = _d.sent();
                            _c = this;
                            return [4 /*yield*/, this.calculateProductSystems()];
                        case 3:
                            _c.productSystems = _d.sent();
                            x = this.calculateSectorCategories(this.productSectors[0]._id);
                            if (x && x.length) {
                                this.selectedCategoryId = this.calculateSectorCategories(this.productSectors[0]._id)[0]._id;
                            }
                            else {
                                this.selectedCategoryId = null;
                            }
                            if (this.calculateCategorySystems(this.selectedCategoryId).length) {
                                this.renderedCategoryType = 'sector';
                                this.renderCategoryId = this.calculateCategorySystems(this.selectedCategoryId)[0]._id;
                            }
                            else {
                                this.renderedCategoryType = 'category';
                                this.renderCategoryId = this.selectedCategoryId;
                            }
                            this.isReady = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        appCategories.prototype.calculateProductSectors = function () {
            return this.allCategories.filter(function (category) { return !category.parents.length; });
        };
        appCategories.prototype.calculateProductCategories = function () {
            return this.allCategories.filter(function (category) { return category.parents.length === 1; });
        };
        appCategories.prototype.calculateProductSystems = function () {
            return this.allCategories.filter(function (category) { return category.parents.length === 2; });
        };
        appCategories.prototype.mapProductsToCategories = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    /*    this.allCategories.forEach((category) => {
                          category.products = [];
                          this.products.forEach((product) => {
                            if (product.categories.includes(category._id)) {
                              category.products.push(product._id)
                            }
                          })
                        })
                        async function asyncForEach(array, callback) {
                          for (let index = 0; index < array.length; index++) {
                            await callback(array[index], index, array)
                          }
                        }
                
                        await asyncForEach(this.allCategories, async (item) => {
                          siiimpleToast.message(`Kategori güncelleniyor ${item.languages.tr.title}`);
                          await updateFromPath(`product-categories/${item._id}`, item);
                          siiimpleToast.success(`Kategori güncellendi!!!! ${item.languages.tr.title}`);
                        });*/
                    console.log('Mapping Bitti', this.allCategories);
                    return [2 /*return*/];
                });
            });
        };
        appCategories.prototype.firstLevelClicked = function (sector, index) {
            this.selectedFirstLevel = index;
            this.detailRenderForm = sector;
            this.selectedCategoryId = this.calculateSectorCategories(sector._id)[0]._id;
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.sortByKey = function (array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };
        appCategories.prototype.subLevelClicked = function (event, categoryInfo) {
            event.preventDefault();
            this.detailRenderForm = categoryInfo;
            this.selectedCategoryId = categoryInfo._id;
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.sectorClicked = function (event, sectorInfo) {
            event.preventDefault();
            this.detailRenderForm = sectorInfo;
            this.renderCategoryId = sectorInfo._id;
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.getProductsForSelected = function () {
            var _this = this;
            return this.allCategories.find(function (item) { return item._id === _this.renderCategoryId; });
        };
        appCategories.prototype.getRenderedType = function () {
            switch (this.renderedCategoryType) {
                case 'category':
                    return 'KATEGORİ';
                case 'sector':
                    return 'SEKTÖR';
            }
        };
        appCategories.prototype.initSelectors = function () {
            var _this = this;
            var items = document.querySelectorAll('.custom-select');
            if (items && this.choices.length) {
                this.choices.forEach(function (item) { return item.destroy(); });
                this.choices = [];
            }
            var __this = this;
            items.forEach(function (item) {
                _this.choices.push(new Choices(item, {
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
        appCategories.prototype.getParentsName = function (id) {
            var _this = this;
            var string = '';
            var item = this.productIdObject[id];
            if (item && item.parents && item.parents.length) {
                var ahoy = __chunk_4.cloneDeep(item.parents);
                ahoy.reverse().forEach(function (parent, parIn) {
                    var parentItem = _this.productIdObject[parent];
                    if (parentItem && parentItem.languages) {
                        if (parIn > 0) {
                            string = parentItem.languages.tr.title + " -> " + string;
                        }
                        else {
                            string = parentItem.languages.tr.title + " ->";
                        }
                    }
                });
            }
            return string;
        };
        appCategories.prototype.inputHandler = function (field, e) {
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
        appCategories.prototype.inputChoosed = function (index, e) {
            this.detailRenderForm.parents[index] = e.target.value;
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.removeCategory = function (index, e) {
            e.preventDefault();
            this.detailRenderForm.parents.splice(index, 1);
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.addCategory = function () {
            this.detailRenderForm.parents.push(this.detailRenderForm.parents[this.detailRenderForm.parents.length - 1]);
            this.changeTrigger = !this.changeTrigger;
        };
        appCategories.prototype.updateDetails = function () {
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
        appCategories.prototype.addDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    __chunk_1.postDataFromPath("product-categories", this.detailRenderForm)
                        .then(function () {
                        swal('Başarılı', 'Kategori başarıyla eklendi. Değişikliklerin efektif olması için sayfa yeniden yüklenecektir.', 'success').then(function () { return location.reload(); });
                    });
                    return [2 /*return*/];
                });
            });
        };
        appCategories.prototype.renderCategoryDetails = function () {
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
                return (h("div", { class: "section-products-body" }, h("main", { class: "page-body" }, h("section", { class: "section-detail" }, h("div", { class: "section-detail-header" }, h("h3", null, this.detailRenderForm.languages[this.formLanguage].title), h("br", null), h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, h("button", { onClick: function () { return _this.formLanguage = 'tr'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.formLanguage === 'tr' ? 'active' : '') }, "T\u00FCrk\u00E7e"), h("button", { onClick: function () { return _this.formLanguage = 'en'; }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.formLanguage === 'en' ? 'active' : '') }, "English"))), h("div", { class: "section-detail-body" }, h("div", { class: "section-detail-item" }, h("form", null, h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "Kategori \u0130smi"), h("input", { type: "text", class: "form-control", id: "categoryName", placeholder: "Kategori ismini yaz\u0131n\u0131z", value: this.detailRenderForm.languages[this.formLanguage].title, onInput: function (e) { return _this.inputHandler('title', e); } }), h("small", { class: "form-text text-muted" }, "Kategori ismini yaz\u0131n\u0131z. Bu isim web sitenizde kategori listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")), h("div", { class: "form-group" }, h("label", null, "Kategori URL"), h("input", { type: "text", class: "form-control", id: "categorySlug", placeholder: "Kategori URL'si otomatik olu\u015Fur", value: this.detailRenderForm.languages[this.formLanguage].path, readonly: true }), h("small", { class: "form-text text-muted" }, "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z kategori ismine g\u00F6re otomatik olu\u015Fur.")), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, "Kategori A\u00E7\u0131klamas\u0131"), h("div", { innerHTML: this.detailRenderForm.languages[this.formLanguage].description, class: "form-control mediumeditor", id: "categoryDesc" }))), h("div", { class: "form-group" }, h("label", null, "Kategori Hiyerar\u015Fisi"), h("small", { class: "form-text text-muted", id: "categoryTree" }, h("b", null, "\u00D6NEML\u0130!"), " Kategorinin bulunmas\u0131n\u0131 istedi\u011Finiz t\u00FCm derinlikleri s\u0131ra ile eksiksiz girmeniz gerekmektedir."), h("br", null), this.detailRenderForm.parents.map(function (parent, index) {
                    return (h("div", { key: "" + Date.now() + Math.random(), class: "form-group row" }, h("div", { class: "col-10" }, h("select", { onChange: function (e) { return _this.inputChoosed(index, e); }, class: "form-control custom-select", name: "choices-single-custom-templates" }, _this.allCategories.map(function (item) {
                        if (item && item._id) {
                            return (h("option", { selected: parent === item._id, value: item._id }, item.languages[_this.selectedLanguage].title));
                        }
                    }))), h("div", { class: "col-2" }, h("a", { class: "btn btn-danger text-white", onClick: function (e) { return _this.removeCategory(index, e); } }, " Sil "))));
                })), h("a", { class: "btn btn-success", onClick: function () { return _this.addCategory(); } }, "Kategori \u0130li\u015Fkisi Ekle"))))), h("div", { class: "section-detail-footer" }, this.renderCategoryId === null
                    ? ''
                    : (h("a", { onClick: this.deleteItem.bind(this), class: "btn btn-danger" }, "Kategoriyi Sil")), this.renderCategoryId === null
                    ? (h("a", { onClick: this.addDetails.bind(this), class: "btn btn-primary" }, "Yeni Kategori Olu\u015Ftur"))
                    : (h("a", { onClick: this.updateDetails.bind(this), class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet"))))), h("footer", { class: "page-footer" })));
            }
        };
        appCategories.prototype.calculateSectorCategories = function (id) {
            return this.productCategories.filter(function (category) { return category.parents.includes(id); });
        };
        appCategories.prototype.calculateCategorySystems = function (id) {
            return this.productSystems.filter(function (system) { return system.parents.includes(id); });
        };
        appCategories.prototype.renderAsideMenu = function () {
            var _this = this;
            return (h("aside", { class: "section-products-aside" }, h("div", { class: "fix-list-group-wrapper" }, h("ul", { class: "list-group fix-list-group sector-wrapper" }, this.sortByKey(this.productSectors, 'order').map(function (sector, index) {
                return (h("li", { class: "list-group-item fix-list-group-item sector-draggable", key: Date.now() + "-" + index, "data-id": sector._id }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1), h("div", { class: "col" }, h("a", { class: "", "data-toggle": "collapse", href: '#sectorCollapse' + index, role: "button", onClick: function (e) {
                        _this.renderCategoryId = sector._id;
                        _this.firstLevelClicked(sector, index);
                        e.preventDefault();
                    }, "aria-expanded": "false", "aria-controls": "sectorCollapse1" }, sector.languages[_this.selectedLanguage].title))), h("div", { class: "collapse fix-list-group-collapse " + (_this.selectedFirstLevel === index ? 'show' : ''), id: "sectorCollapse" + index }, h("ul", { class: "list-group fix-list-group category-wrapper", "data-order": index }, _this.sortByKey(_this.calculateSectorCategories(sector._id), 'order').map(function (subcategory, subIndex) {
                    return (h("li", { class: "list-group-item category-draggable fix-list-group-item " + (_this.selectedCategoryId === subcategory._id ? 'active' : ''), "data-id": subcategory._id }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1, ".", subIndex + 1), h("div", { class: "col" }, h("a", { onClick: function (e) {
                            _this.renderCategoryId = subcategory._id;
                            _this.subLevelClicked(e, subcategory);
                            e.preventDefault();
                        }, class: "", href: "" }, subcategory.languages[_this.selectedLanguage].title))), _this.calculateCategorySystems(subcategory._id).length
                        ? (h("div", { class: "fix-list-group-collapse collapse " + (_this.selectedCategoryId === subcategory._id ? 'show' : ''), id: "sectorCollapse" + index + subIndex }, h("ul", { class: "list-group fix-list-group system-wrapper", "data-order": "" + index + subIndex }, _this.sortByKey(_this.calculateCategorySystems(subcategory._id), 'order').map(function (system, systemIndex) {
                            return (h("li", { class: "list-group-item fix-list-group-item  system-draggable", "data-id": system._id }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1, ".", subIndex + 1, ".", systemIndex + 1), h("div", { class: "col" }, h("a", { onClick: function (e) {
                                    _this.sectorClicked(e, system);
                                    e.preventDefault();
                                }, href: '' }, system.languages[_this.selectedLanguage].title)))));
                        }))))
                        : ''));
                })))));
            })))));
        };
        appCategories.prototype.deleteItem = function () {
            var _this = this;
            if (this.detailRenderForm.products.length) {
                swal('Hata', 'İçerisinde ürün olan kategorileri silemezsiniz. Bu işlemi yapmadan önce ilgili ürünleri başka kategoriye taşıyabilir ya da silebilirsiniz.', 'error');
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
                        swal("Kayıt başarıyla silindi", 'Kategori düzeninin aktif olabilmesi için sayfa yeniden yüklenecektir', 'success').then(function () { return location.reload(); });
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
        appCategories.prototype.render = function () {
            var _this = this;
            if (this.isReady) {
                return (h("div", { class: "app-products" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Kategoriler"), h("p", null, "Kategorilerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")), h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: function () { return _this.renderCategoryId = null; }, class: "btn btn-secondary" }, "Yeni Kategori Ekle")) : ''))), h("main", { class: "page-body" }, h("section", { class: "section-products" }, this.renderAsideMenu(), this.renderCategoryDetails())), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appCategories, "is", {
            get: function () { return "app-categories"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appCategories, "properties", {
            get: function () {
                return {
                    "changeTrigger": {
                        "state": true
                    },
                    "formLanguage": {
                        "state": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "isReady": {
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
        Object.defineProperty(appCategories, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appCategories;
    }());
    exports.AppCategories = appCategories;
    Object.defineProperty(exports, '__esModule', { value: true });
});

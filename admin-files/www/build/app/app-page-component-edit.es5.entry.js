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
App.loadBundle('app-page-component-edit', ['exports', './chunk-f83566b1.js', './chunk-0d315693.js', './chunk-aa48cfa8.js'], function (exports, __chunk_1, __chunk_2, __chunk_4) {
    var h = window.App.h;
    var vdom = __chunk_2.createCommonjsModule(function (module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        /**
         * Production h() function based on Preact by
         * Jason Miller (@developit)
         * Licensed under the MIT License
         * https://github.com/developit/preact/blob/master/LICENSE
         *
         * Modified for Stencil's compiler and vdom
         */
        var stack = [];
        function h(nodeName, vnodeData) {
            var children = null;
            var lastSimple = false;
            var simple = false;
            var i = arguments.length;
            var vkey;
            var vname;
            for (; i-- > 2;) {
                stack.push(arguments[i]);
            }
            while (stack.length > 0) {
                var child = stack.pop();
                if (child && child.pop !== undefined) {
                    for (i = child.length; i--;) {
                        stack.push(child[i]);
                    }
                }
                else {
                    if (typeof child === 'boolean') {
                        child = null;
                    }
                    if ((simple = typeof nodeName !== 'function')) {
                        if (child == null) {
                            child = '';
                        }
                        else if (typeof child === 'number') {
                            child = String(child);
                        }
                        else if (typeof child !== 'string') {
                            simple = false;
                        }
                    }
                    if (simple && lastSimple) {
                        children[children.length - 1].vtext += child;
                    }
                    else if (children === null) {
                        children = [simple ? { vtext: child } : child];
                    }
                    else {
                        children.push(simple ? { vtext: child } : child);
                    }
                    lastSimple = simple;
                }
            }
            if (vnodeData != null) {
                // normalize class / classname attributes
                if (vnodeData['className']) {
                    vnodeData['class'] = vnodeData['className'];
                }
                if (typeof vnodeData['class'] === 'object') {
                    for (i in vnodeData['class']) {
                        if (vnodeData['class'][i]) {
                            stack.push(i);
                        }
                    }
                    vnodeData['class'] = stack.join(' ');
                    stack.length = 0;
                }
                if (vnodeData.key != null) {
                    vkey = vnodeData.key;
                }
                if (vnodeData.name != null) {
                    vname = vnodeData.name;
                }
            }
            if (typeof nodeName === 'function') {
                // nodeName is a functional component
                return nodeName(vnodeData, children || [], utils);
            }
            return {
                vtag: nodeName,
                vchildren: children,
                vtext: undefined,
                vattrs: vnodeData,
                vkey: vkey,
                vname: vname,
                elm: undefined,
                ishost: false
            };
        }
        var utils = {
            'forEach': function (children, cb) { return children.forEach(cb); },
            'map': function (children, cb) { return children.map(cb); }
        };
        exports.h = h;
    });
    __chunk_2.unwrapExports(vdom);
    var vdom_1 = vdom.h;
    var appPageComponentEdit = /** @class */ (function () {
        function appPageComponentEdit() {
            this.selectedLanguage = 'tr';
            this.isReady = false;
            this.changeTrigger = false;
            this.formName = 'Komponent';
            this.updateMode = false;
            this.updateIndex = 0;
            this.pageData = {
                components: [],
            };
            this.slimArrays = [];
            this.fillData = {
                tr: {
                    array: {}
                },
                en: {
                    array: {}
                }
            };
            this.mocker = {};
        }
        appPageComponentEdit.prototype.componentWillLoad = function () {
            var _this = this;
            this.pageId = this.match.params.id;
            this.componentIndex = this.match.params.index;
            __chunk_1.getFromPath("pages/" + this.pageId)
                .then(function (res) {
                _this.pageData = res;
                __chunk_1.getFromPath("components/" + _this.pageData.components[_this.componentIndex]._id)
                    .then(function (componentSrc) {
                    _this.schemas = componentSrc.Schema;
                    _this.prepareFillData();
                });
            });
        };
        appPageComponentEdit.prototype.prepareFillData = function () {
            var _this = this;
            this.fillData[this.selectedLanguage] = {};
            this.fillData.en = {};
            this.schemas.forEach(function (item) {
                switch (item.type) {
                    case 'string':
                    case 'select':
                    case 'textarea':
                        _this.fillData[_this.selectedLanguage][item.standsFor] = '';
                        _this.fillData.en[item.standsFor] = '';
                        break;
                    case 'array':
                        _this.fillData[_this.selectedLanguage][item.standsFor] = [];
                        _this.fillData.en[item.standsFor] = [];
                        break;
                    default:
                        _this.fillData[_this.selectedLanguage][item.standsFor] = {};
                        _this.fillData.en[item.standsFor] = {};
                        break;
                }
            });
            if (this.pageData.components[this.componentIndex].data) {
                this.fillData = this.pageData.components[this.componentIndex].data;
                if (!this.fillData.en) {
                    this.fillData.en = this.fillData.tr;
                }
            }
            this.setMockSchema();
            this.isReady = true;
        };
        appPageComponentEdit.prototype.setMockSchema = function () {
            var _this = this;
            this.mocker[this.selectedLanguage] = {};
            this.mocker.en = {};
            this.schemas.forEach(function (item) {
                switch (item.type) {
                    case 'string':
                    case 'select':
                    case 'textarea':
                        _this.mocker[_this.selectedLanguage][item.standsFor] = '';
                        _this.mocker.en[item.standsFor] = '';
                        break;
                    case 'array':
                        _this.mocker[_this.selectedLanguage][item.standsFor] = {};
                        _this.mocker.en[item.standsFor] = {};
                        break;
                    default:
                        _this.mocker.en[item.standsFor] = {};
                        _this.mocker.tr[item.standsFor] = {};
                        break;
                }
            });
        };
        appPageComponentEdit.prototype.changeLanguage = function (language) {
            this.selectedLanguage = language;
        };
        appPageComponentEdit.prototype.inputHandler = function (target, event) {
            this.fillData[this.selectedLanguage][target] = event.target.value;
        };
        appPageComponentEdit.prototype.inputChoosed = function (target, e) {
            this.fillData[this.selectedLanguage][target] = e.target.value;
        };
        appPageComponentEdit.prototype.imageUploaderPromise = function (scope) {
            return new Promise(function (success) {
                scope.upload(function (error, data, response) {
                    console.warn(error, data);
                    // Done uploading!
                    success(response);
                });
            });
        };
        appPageComponentEdit.prototype.mockInputChoosed = function (schema, target, e) {
            this.mocker[this.selectedLanguage][schema][target] = e.target.value;
        };
        appPageComponentEdit.prototype.mockInpuHandler = function (schema, target, e) {
            this.mocker[this.selectedLanguage][schema][target] = e.target.value;
        };
        appPageComponentEdit.prototype.componentWillUpdate = function () {
            this.slimArrays.forEach(function (item) { return item.destroy(); });
            this.slimArrays = [];
        };
        appPageComponentEdit.prototype.addMockToData = function (e, mockData, dataPath) {
            return __awaiter(this, void 0, void 0, function () {
                function asyncForEach(array, callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var index$$1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    index$$1 = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index$$1 < array.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, callback(array[index$$1], index$$1, array)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    index$$1++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                var currents;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            siiimpleToast.message('Resim Yükleniyor, lütfen bekleyin...');
                            e.preventDefault();
                            return [4 /*yield*/, asyncForEach(this.slimArrays, function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(item._originalElement.dataset.objlevel === 'sub' && !item._state.includes('empty'))) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.imageUploaderPromise(item)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            currents = __chunk_4.cloneDeep(this.fillData[this.selectedLanguage][dataPath]);
                            currents.push(__chunk_4.cloneDeep(mockData));
                            this.fillData[this.selectedLanguage][dataPath] = currents;
                            this.changeTrigger = !this.changeTrigger;
                            siiimpleToast.success('İçerik başarıyla eklendi...');
                            this.setMockSchema();
                            return [2 /*return*/];
                    }
                });
            });
        };
        appPageComponentEdit.prototype.updateMockToData = function (e, mockData, dataPath, update) {
            if (update === void 0) { update = false; }
            return __awaiter(this, void 0, void 0, function () {
                function asyncForEach(array, callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var index$$1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    index$$1 = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index$$1 < array.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, callback(array[index$$1], index$$1, array)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    index$$1++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                var currents;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            siiimpleToast.message('lütfen bekleyin...');
                            e.preventDefault();
                            return [4 /*yield*/, asyncForEach(this.slimArrays, function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(item._originalElement.dataset.objlevel === 'sub' && !item._state.includes('empty'))) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.imageUploaderPromise(item)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            currents = __chunk_4.cloneDeep(this.fillData[this.selectedLanguage][dataPath]);
                            currents[this.updateIndex] = __chunk_4.cloneDeep(mockData);
                            this.fillData[this.selectedLanguage][dataPath] = currents;
                            this.changeTrigger = !this.changeTrigger;
                            siiimpleToast.success('İçerik başarıyla eklendi...');
                            this.updateMode = false;
                            this.updateIndex = 0;
                            this.setMockSchema();
                            if (update) {
                                this.updateDetails();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        appPageComponentEdit.prototype.updateDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                function asyncForEach(array, callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var index$$1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    index$$1 = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index$$1 < array.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, callback(array[index$$1], index$$1, array)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    index$$1++;
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
                            siiimpleToast.message('Resim Yükleniyor, lütfen bekleyin...');
                            return [4 /*yield*/, asyncForEach(this.slimArrays, function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(item._originalElement.dataset.objlevel === 'main' && !item._state.includes('empty'))) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.imageUploaderPromise(item)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            this.pageData.components[this.componentIndex].data = this.fillData;
                            __chunk_1.updateFromPath("pages/" + this.match.params.id, this.pageData)
                                .then(function () {
                                swal('Başarılı', _this.formName + ' detayı başarıyla güncellendi!', 'success').then(function () { return _this.history.goBack(); });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        appPageComponentEdit.prototype.componentDidUpdate = function () {
            var _this = this;
            if (this.sortableSchema) {
                var sortableEl = document.querySelector('.sortable-wrapper');
                if (sortableEl) {
                    this.sortable = new Sortable(sortableEl, {
                        draggable: '.sortable-item',
                        onEnd: function () {
                            var newSorts = _this.sortable.toArray();
                            var currentItems = __chunk_4.cloneDeep(_this.fillData[_this.selectedLanguage][_this.sortableSchema]);
                            var newArray = [];
                            newSorts.forEach(function (id) { return newArray.push(currentItems[Number(id)]); });
                            _this.fillData[_this.selectedLanguage][_this.sortableSchema] = __chunk_4.cloneDeep(newArray);
                            _this.changeTrigger = !_this.changeTrigger;
                            siiimpleToast.message('Sıra değiştirildi...');
                        }
                    });
                }
            }
            window['currentScope'] = this;
            this.initSlimCroppers();
            this.initMediumEditors();
        };
        appPageComponentEdit.prototype.initMediumEditors = function () {
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
                    var path = event.target.dataset.object;
                    var language = event.target.dataset.language;
                    var pathArray = path.split('/');
                    if (pathArray.length === 3) {
                        window['currentScope'][pathArray[0]][language][pathArray[1]][pathArray[2]] = editable.innerHTML;
                    }
                    if (pathArray.length === 2) {
                        window['currentScope'][pathArray[0]][language][pathArray[1]] = editable.innerHTML;
                    }
                });
            }
        };
        appPageComponentEdit.prototype.initSlimCroppers = function () {
            var _this = this;
            var cropperElements = document.querySelectorAll('.slim-initter');
            cropperElements.forEach(function (item) {
                var currentSrc = item.dataset.current;
                var widthS = item.dataset.x;
                var heightS = item.dataset.y;
                var croptype = item.dataset.croptype;
                var config = {
                    crop: {
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100
                    },
                    defaultInputName: 'image',
                    service: window['apiBase'] + "api/upload",
                    download: false,
                    willSave: function (data, ready) {
                        ready(data);
                    },
                    didUpload: function (res1, res2, result) {
                        console.log('Did Upload', res1, res2, result);
                        var path = this._originalElement.dataset.object;
                        var pathArray = path.split('/');
                        if (pathArray.length === 3) {
                            window['currentScope'][pathArray[0]][window['currentScope'].selectedLanguage][pathArray[1]][pathArray[2]] = "" + window['apiBase'] + result.path;
                        }
                        if (pathArray.length === 2) {
                            window['currentScope'][pathArray[0]][window['currentScope'].selectedLanguage][pathArray[1]] = "" + window['apiBase'] + result.path;
                        }
                    },
                    label: 'Resminizi buraya tıklayarak ya da sürükleyip bırakarak yukleyebilirsiniz.',
                    buttonConfirmLabel: 'Tamam',
                    buttonCancelLabel: 'İptal'
                };
                if (croptype === 'size') {
                    config.size = widthS + "," + heightS;
                }
                else if (croptype === 'aspectratio') {
                    config.ratio = widthS + ":" + heightS;
                }
                _this.slimArrays.push(new Slim(item, config));
                if (currentSrc) {
                    _this.slimArrays[_this.slimArrays.length - 1].load(currentSrc);
                }
                window['slimArrays'] = _this.slimArrays;
            });
        };
        appPageComponentEdit.prototype.renderFormData = function () {
            var _this = this;
            return (vdom_1("main", { class: "page-body" }, vdom_1("section", { class: "section-detail" }, vdom_1("div", { class: "section-detail-header" }, vdom_1("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, vdom_1("button", { onClick: function () { return _this.changeLanguage('tr'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'tr' ? 'active' : '') + " " }, "T\u00FCrk\u00E7e"), vdom_1("button", { onClick: function () { return _this.changeLanguage('en'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'en' ? 'active' : '') + " " }, "English"))), vdom_1("div", { class: "section-detail-body" }, vdom_1("div", { class: "section-detail-item" }, vdom_1("form", null, vdom_1("div", { class: "section-detail-item-group" }, this.schemas.map(function (schema) {
                switch (schema.type) {
                    case 'string':
                        return (vdom_1("div", { class: "form-group", key: Date.now() + "-" + Math.random() }, vdom_1("label", null, schema.name), vdom_1("input", { value: _this.fillData[_this.selectedLanguage][schema.standsFor], onInput: function (e) { return _this.inputHandler(schema.standsFor, e); }, type: "text", class: "form-control", id: "modalEventName", placeholder: schema.standsFor })));
                    case 'image':
                        return (vdom_1("div", { class: "section-detail-item-group" }, vdom_1("div", { class: "form-group" }, vdom_1("label", null, schema.name), vdom_1("div", { class: "section-detail-item-group-image" }, vdom_1("input", { "data-croptype": schema.croptype, "data-x": schema.sizeX, "data-y": schema.sizeY, name: "image", type: "file", class: "slim-initter", "data-objlevel": "main", "data-object": "fillData/" + schema.standsFor, "data-id": "image-sub-" + schema.standsFor, "data-current": _this.fillData[_this.selectedLanguage][schema.standsFor] })), vdom_1("div", { class: "custom-file" }, vdom_1("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir.")))));
                    case 'textarea':
                        return (vdom_1("div", { class: "form-group", key: Date.now() + "-" + Math.random() }, vdom_1("label", null, schema.name), vdom_1("div", { innerHTML: _this.fillData[_this.selectedLanguage][schema.standsFor], "data-object": "fillData/" + schema.standsFor, "data-language": _this.selectedLanguage, class: "form-control mediumeditor" })));
                    case 'select':
                        return (vdom_1("div", { class: "form-group" }, vdom_1("label", null, schema.name), vdom_1("select", { onChange: function (e) { return _this.inputChoosed(schema.standsFor, e); }, class: "form-control custom-select", name: "choices-single-custom-templates" }, vdom_1("option", { value: "" }, "L\u00FCtfen Se\u00E7iniz"), schema.options.map(function (item) {
                            return (vdom_1("option", { selected: _this.fillData[_this.selectedLanguage][schema.standsFor] === item.value, value: item.value }, item.name));
                        }))));
                    case 'array':
                        return (vdom_1("div", { class: "form-group" }, vdom_1("label", null, schema.name), schema.subFields.map(function (sub) {
                            switch (sub.type) {
                                case 'string':
                                    return (vdom_1("div", { class: "form-group" }, vdom_1("label", null, sub.name), vdom_1("input", { onInput: function (e) { return _this.mockInpuHandler(schema.standsFor, sub.standsFor, e); }, class: "form-control", placeholder: sub.standsFor, value: _this.mocker[_this.selectedLanguage][schema.standsFor][sub.standsFor] }), vdom_1("hr", null)));
                                case 'textarea':
                                    return (vdom_1("div", { class: "form-group", key: Date.now() + "-" + Math.random() }, vdom_1("label", null, sub.name), vdom_1("div", { innerHTML: _this.mocker[_this.selectedLanguage][schema.standsFor][sub.standsFor], "data-object": "mocker/" + schema.standsFor + "/" + sub.standsFor, "data-language": _this.selectedLanguage, class: "form-control mediumeditor" })));
                                case 'image':
                                    return (vdom_1("div", { class: "section-detail-item-group" }, vdom_1("div", { class: "form-group" }, vdom_1("label", null, sub.name), vdom_1("div", { class: "section-detail-item-group-image" }, vdom_1("input", { "data-croptype": schema.croptype, "data-x": sub.sizeX, "data-y": sub.sizeY, name: "image", type: "file", class: "slim-initter", "data-objlevel": "sub", "data-object": "mocker/" + schema.standsFor + "/" + sub.standsFor, "data-id": "image-sub-" + schema.standsFor + "-" + sub.standsFor, "data-current": _this.mocker[_this.selectedLanguage][schema.standsFor][sub.standsFor] })), vdom_1("div", { class: "custom-file" }, vdom_1("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir.")))));
                                case 'select':
                                    _this.sortableSchema = schema.standsFor;
                                    return (vdom_1("div", { class: "form-group", key: Date.now() + "-" + Math.random() }, vdom_1("label", null, sub.name), vdom_1("select", { onChange: function (e) { return _this.mockInputChoosed(schema.standsFor, sub.standsFor, e); }, class: "form-control custom-select", name: "choices-single-custom-templates" }, vdom_1("option", { value: "" }, "L\u00FCtfen Se\u00E7iniz"), sub.options.map(function (item) {
                                        return (vdom_1("option", { selected: _this.mocker[_this.selectedLanguage][schema.standsFor][sub.standsFor] === item.value, value: item.value }, item.name));
                                    }))));
                            }
                        }), vdom_1("button", { class: "btn btn-success", onClick: function (e) { return _this.addMockToData(e, _this.mocker[_this.selectedLanguage][schema.standsFor], schema.standsFor); } }, "BUNU EKLE"), _this.updateMode ? (vdom_1("button", { class: "btn btn-success", onClick: function (e) { return _this.updateMockToData(e, _this.mocker[_this.selectedLanguage][schema.standsFor], schema.standsFor, true); } }, "SECILENI GUNCELLE")) : '', vdom_1("div", { class: "row" }, vdom_1("div", { class: "col-sm-3" }, vdom_1("div", { class: "panel panel-success" }, vdom_1("div", { class: "panel-heading" }), vdom_1("div", { class: "panel-body" }, vdom_1("ul", { class: "list-group sortable-wrapper", key: Date.now() + "-" + Math.random() }, _this.fillData[_this.selectedLanguage][schema.standsFor].map(function (item, itIndex) {
                            return (vdom_1("li", { class: "list-group-item sortable-item", "data-id": itIndex }, vdom_1("div", null, schema.showType === 'innerHTML'
                                ? (vdom_1("a", { onClick: function () {
                                        _this.mocker[_this.selectedLanguage][schema.standsFor] = __chunk_4.cloneDeep(item);
                                        _this.updateMode = true;
                                        _this.updateIndex = itIndex;
                                        _this.changeTrigger = !_this.changeTrigger;
                                    } }, itIndex + 1, " -) ", vdom_1("div", { innerHTML: item[schema.showKey] })))
                                : (vdom_1("a", { onClick: function () {
                                        _this.mocker[_this.selectedLanguage][schema.standsFor] = __chunk_4.cloneDeep(item);
                                        _this.updateMode = true;
                                        _this.updateIndex = itIndex;
                                        _this.changeTrigger = !_this.changeTrigger;
                                    } }, itIndex + 1, " -) ", item[schema.showKey])), vdom_1("span", { onClick: function () {
                                    _this.fillData[_this.selectedLanguage][schema.standsFor].splice(itIndex, 1);
                                    _this.changeTrigger = !_this.changeTrigger;
                                }, style: { color: 'red' }, class: "badge pull-right" }, "Sil"))));
                        }))))))));
                }
            }))))), vdom_1("div", { class: "section-detail-footer" }, vdom_1("a", { onClick: function () { return history.back(); }, role: "button", class: "btn btn-secondary" }, "\u0130ptal"), vdom_1("a", { onClick: this.updateDetails.bind(this), role: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))));
        };
        appPageComponentEdit.prototype.render = function () {
            if (this.isReady) {
                return (vdom_1("div", { class: "app-page-component-edit" }, this.renderFormData()));
            }
        };
        Object.defineProperty(appPageComponentEdit, "is", {
            get: function () { return "app-page-component-edit"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPageComponentEdit, "properties", {
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
                    "selectedLanguage": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPageComponentEdit, "style", {
            get: function () { return ".app-page-component-edit .list-group-item {\n  width: 100%;\n  min-width: 600px;\n  display: block; }\n\n.app-page-component-edit .list-group {\n  margin-top: 50px; }"; },
            enumerable: true,
            configurable: true
        });
        return appPageComponentEdit;
    }());
    exports.AppPageComponentEdit = appPageComponentEdit;
    Object.defineProperty(exports, '__esModule', { value: true });
});

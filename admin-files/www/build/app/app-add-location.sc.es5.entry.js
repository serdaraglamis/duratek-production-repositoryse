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
App.loadBundle('app-add-location', ['exports', './chunk-ac6932ea.js', './chunk-ebfe9714.js', './chunk-721f944e.js'], function (exports, __chunk_1, __chunk_3, __chunk_4) {
    var h = window.App.h;
    var appAddLocation = /** @class */ (function () {
        function appAddLocation() {
            var _this = this;
            this.selectedLanguage = 'tr';
            this.contentChanged = false;
            this.galleryEnabled = false;
            this.imageCropped = 0;
            this.formName = 'Lokasyon';
            this.galleryItemTitle = "Fotoğraf hakkında kısa bilgi yazınız";
            this.blockTypes = {
                'text': {
                    name: 'Yazı',
                    type: 'Editor'
                },
                'image': {
                    name: 'Fotoğraf',
                    type: 'Image'
                },
                'gallery': {
                    name: 'Galeri',
                    type: 'gallery'
                }
            };
            this.listSortableOptions = {
                sort: true,
                animation: 150,
                handle: ".holder",
                onUpdate: function (event) {
                    var newItem = _this.formDetail.languages[_this.selectedLanguage].content[event.oldIndex];
                    var oldOriginalItem = _this.formDetail.languages[_this.selectedLanguage].content[event.newIndex];
                    _this.formDetail.languages[_this.selectedLanguage].content[event.newIndex] = newItem;
                    _this.formDetail.languages[_this.selectedLanguage].content[event.oldIndex] = oldOriginalItem;
                    _this.contentChanged = !_this.contentChanged;
                }
            };
            this.gallerySortableOptions = {
                sort: true,
                animation: 150,
                handle: ".holder",
                onUpdate: function (event) {
                    var newItem = _this.formDetail.languages[_this.selectedLanguage].gallery[event.oldIndex];
                    var oldOriginalItem = _this.formDetail.languages[_this.selectedLanguage].gallery[event.newIndex];
                    _this.formDetail.languages[_this.selectedLanguage].gallery[event.newIndex] = newItem;
                    _this.formDetail.languages[_this.selectedLanguage].gallery[event.oldIndex] = oldOriginalItem;
                    _this.contentChanged = !_this.contentChanged;
                }
            };
        }
        appAddLocation.prototype.addBlock = function (type) {
            if (type === 'gallery') {
                this.galleryEnabled = true;
                return;
            }
            var array = this.formDetail.languages[this.selectedLanguage].content;
            array.push(this.blockTypes[type]);
            this.formDetail.languages[this.selectedLanguage].content = __chunk_4.cloneDeep(array);
            this.contentChanged = !this.contentChanged;
        };
        appAddLocation.prototype.addGalleryItem = function () {
            var _this = this;
            var imageSelector = document.querySelector('#galleryFileSelector');
            imageSelector.click();
            imageSelector.addEventListener("change", function (ev) {
                var formData = new FormData();
                formData.append("image", ev.target.files[0]);
                fetch(window['apiBase'] + "api/uploadgallery", {
                    method: 'POST',
                    body: formData
                }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            _this.formDetail.languages[_this.selectedLanguage].gallery.push({
                                title: _this.galleryItemTitle,
                                url: window['apiBase'] + data.path,
                                thumbnail: window['apiBase'] + data.resized
                            });
                            _this.galleryItemTitle = "Fotoğraf hakkında kısa bilgi yazınız";
                            _this.contentChanged = !_this.contentChanged;
                        });
                    }
                });
            }, true);
            /*  this.formDetail.languages[this.selectedLanguage].gallery.push({
                title: this.galleryItemTitle,
                url: "http://via.placeholder.com/400x280"
              })
              this.galleryItemTitle = "Fotoğraf hakkında kısa bilgi yazınız";
              this.contentChanged = !this.contentChanged;*/
        };
        appAddLocation.prototype.componentWillLoad = function () {
            this.formDetail = {
                title: 'Title Here',
                isPublished: true,
                languages: {
                    tr: {
                        meta: {}
                    },
                    en: {
                        meta: {}
                    }
                }
            };
            this.initExternalLibraries();
        };
        appAddLocation.prototype.componentDidLoad = function () {
            this.initExternalLibraries();
        };
        appAddLocation.prototype.componentDidUpdate = function () {
            this.initExternalLibraries();
        };
        appAddLocation.prototype.changeLanguage = function (language) {
            this.selectedLanguage = language;
        };
        appAddLocation.prototype.imageSelected = function (e) {
            var _this = this;
            var file = e.target.files[0];
            this.formDetail.languages[this.selectedLanguage].image = URL.createObjectURL(file);
            this.contentChanged = !this.contentChanged;
            var ref = firebase.storage().ref();
            var name = (+new Date()) + '-' + file.name;
            var metadata = { contentType: file.type };
            var task = ref.child(name).put(file, metadata);
            task.then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (val) {
                    _this.formDetail.languages[_this.selectedLanguage].image = val;
                    _this.contentChanged = !_this.contentChanged;
                });
            });
        };
        appAddLocation.prototype.initExternalLibraries = function () {
            var el = document.querySelector('.form-group-list');
            if (el) {
                new __chunk_3.Sortable.create(el, this.listSortableOptions);
            }
            var galleryEls = document.querySelector('.gallery-list');
            if (galleryEls) {
                new __chunk_3.Sortable.create(galleryEls, this.gallerySortableOptions);
            }
            var arr = document.querySelectorAll('input[type="date"]');
            arr.forEach(function (el) {
                window['flatpickr'](el, {
                    dateFormat: "d-m-Y",
                    "locale": 'tr'
                });
            });
            this.initMediumEditor();
            this.initImageCropper();
        };
        appAddLocation.prototype.initImageCropper = function () {
            var _this = this;
            // if(this.mainImagecropper) this.mainImagecropper.destroy()
            if (this.mainImagecropper)
                return;
            this.mainImagecropper = new Slim(document.getElementById('myCropper'), {
                ratio: '188:251',
                minSize: {
                    width: 188,
                    height: 251,
                },
                crop: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },
                didTransform: function () {
                    _this.imageCropped++;
                },
                defaultInputName: 'image',
                service: window['apiBase'] + "api/upload",
                download: false,
                saveInitialImage: false,
                willSave: function (data, ready) {
                    ready(data);
                },
                label: 'Drop your image here.',
                buttonConfirmLabel: 'Ok',
                meta: {
                    userId: '1234'
                }
            });
            /*   this.mainImagecropper.load(this.formDetail.languages[this.selectedLanguage].image, () => {
        
                 // Done loading the image!
        
                 // Upload a selected image to the server
               });*/
        };
        appAddLocation.prototype.initMediumEditor = function () {
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
                    _this.formDetail.languages[_this.selectedLanguage].content[event.target.dataset.id].data = editable.innerHTML;
                });
            }
        };
        appAddLocation.prototype.inputHandler = function (field, e) {
            this.formDetail.languages[this.selectedLanguage][field] = e.target.value;
            if (field === 'title') {
                var string = e.target.value;
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
                this.formDetail.languages[this.selectedLanguage].path = string.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                this.contentChanged = !this.contentChanged;
            }
        };
        appAddLocation.prototype.galleryRenderer = function () {
            var _this = this;
            if (!this.galleryEnabled)
                return false;
            return (h("li", { class: "form-group-list-item" }, h("label", null, "Galeri"), h("div", { class: "gallery-list-wrapper" }, h("ul", { class: "gallery-list" }, this.formDetail.languages[this.selectedLanguage].gallery.map(function (item, index) {
                return (h("li", { class: "gallery-list-item", key: Date.now() + Math.random() }, h("div", { class: "gallery-list-item-image" }, h("div", { class: "gallery-list-item-options" }, h("a", { class: "btn btn-sm btn-danger delete", onClick: function () { return _this.removeItemFromGalleryArray(index); }, title: "", "data-toggle": "tooltip" }, "Sil"), h("a", { class: "btn btn-sm btn-light holder", href: "javascript:void(0)", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" }))), h("img", { src: item.thumbnail, alt: "" })), h("div", { class: "gallery-list-item-caption" }, h("input", { type: "email", class: "form-control", id: "", placeholder: "Foto\u011Fraf hakk\u0131nda k\u0131sa bilgi yaz\u0131n\u0131z", onInput: function (e) { return item.title = e.target.value; }, value: item.title })), h("div", { class: "custom-file gallery-list-item-file-selector" }, h("input", { type: "file", class: "custom-file-input", id: "" }))));
            }), h("li", { class: "gallery-list-item empty" }, h("div", { class: "gallery-list-item-image" }, h("div", { class: "gallery-list-item-options" }, h("a", { class: "btn btn-sm btn-primary add", onClick: this.addGalleryItem.bind(this), title: "", "data-toggle": "tooltip" }, "Foto\u011Fraf Y\u00FCkle"), h("a", { class: "btn btn-sm btn-light holder", href: "javascript:void(0)", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" }))), h("img", { src: "http://via.placeholder.com/300x300", alt: "" })), h("div", { class: "gallery-list-item-caption" }, h("input", { type: "email", class: "form-control", onInput: function (e) { return _this.galleryItemTitle = e.target.value; }, id: "", placeholder: "Foto\u011Fraf hakk\u0131nda k\u0131sa bilgi yaz\u0131n\u0131z", value: this.galleryItemTitle })), h("div", { class: "custom-file-input gallery-list-item-file-selector" }, h("input", { id: "galleryFileSelector", type: "file", name: "image", class: "custom-file-input" })))))));
        };
        appAddLocation.prototype.updateHandler = function () {
            var _this = this;
            __chunk_1.postDataFromPath("datasource/locations", this.formDetail)
                .then(function () {
                swal('Başarılı', _this.formName + ' detayı başarıyla güncellendi!', 'success');
                _this.history.goBack();
            });
        };
        appAddLocation.prototype.removeItemFromArray = function (index, e) {
            e.preventDefault();
            this.formDetail.languages[this.selectedLanguage].content.splice(index, 1);
            this.contentChanged = !this.contentChanged;
        };
        appAddLocation.prototype.photoSelected = function (index, e) {
            var _this = this;
            var formData = new FormData();
            formData.append("image", e.target.files[0]);
            fetch(window['apiBase'] + "api/uploadgallery", {
                method: 'POST',
                body: formData
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        _this.formDetail.languages[_this.selectedLanguage].content[index].url = window['apiBase'] + data.path;
                        _this.contentChanged = !_this.contentChanged;
                    });
                }
            });
        };
        appAddLocation.prototype.renderContentsBlock = function () {
            var _this = this;
            return this.formDetail.languages[this.selectedLanguage].content.map(function (item, index) {
                switch (item.type) {
                    case 'Editor':
                        return (h("li", { class: "form-group-list-item sortable-item", "data-id": index, key: "" + Date.now() + index }, h("label", null, index + 1, ". Yaz\u0131"), h("button", { class: "btn btn-sm btn-outline-dark holder", role: "button", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" })), h("button", { onClick: function (e) { return _this.removeItemFromArray(index, e); }, class: "btn btn-sm btn-outline-danger delete", title: "Sil" }, "Sil"), h("div", { innerHTML: item.data, class: "form-control mediumeditor", "data-id": index })));
                    case 'Image':
                        return (h("li", { class: "form-group-list-item sortable-item", "data-id": index, key: "" + Date.now() + index }, h("label", null, index + 1, ". Foto\u011Fraf"), h("button", { class: "btn btn-sm btn-outline-dark holder", role: "button", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" })), h("button", { onClick: function (e) { return _this.removeItemFromArray(index, e); }, class: "btn btn-sm btn-outline-danger delete", title: "Sil" }, "Sil"), h("div", { class: "section-detail-item-group-image" }, h("img", { src: item.url })), h("div", { class: "custom-file" }, h("input", { onChange: function (e) { return _this.photoSelected(index, e); }, type: "file", class: "custom-file-input", id: "customFile" }), h("label", { class: "custom-file-label" }, "Foto\u011Fraf Se\u00E7"), h("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir."))));
                }
            });
        };
        appAddLocation.prototype.removeItemFromGalleryArray = function (index) {
            this.formDetail.languages[this.selectedLanguage].gallery.splice(index, 1);
            this.contentChanged = !this.contentChanged;
        };
        appAddLocation.prototype.updateDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.imageCropped) {
                        this.mainImagecropper.upload(function (error, data, response) {
                            console.warn(error, data);
                            // Done uploading!
                            _this.formDetail.languages[_this.selectedLanguage].image = "" + window['apiBase'] + response.path;
                            _this.updateHandler();
                        });
                    }
                    else {
                        this.updateHandler();
                    }
                    return [2 /*return*/];
                });
            });
        };
        appAddLocation.prototype.isPublishedHandler = function (event) {
            this.formDetail.isPublished = event.target.checked;
        };
        // doing this ugly approach because of current bug of CORE package (stencil)
        appAddLocation.prototype._renderForm = function () {
            var _this = this;
            return (h("div", null, h("main", { class: "page-body" }, h("section", { class: "section-detail" }, h("div", { class: "section-detail-header" }, h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, h("button", { onClick: function () { return _this.changeLanguage('tr'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'tr' ? 'active' : '') + " " }, "T\u00FCrk\u00E7e"), h("button", { onClick: function () { return _this.changeLanguage('en'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'en' ? 'active' : '') + " " }, "English"))), h("div", { class: "section-detail-body" }, h("div", { class: "section-detail-item" }, h("form", null, h("div", { class: "section-detail-item-group" }, h("div", { class: "custom-control custom-checkbox" }, h("input", { checked: this.formDetail.isPublished, type: "checkbox", onChange: this.isPublishedHandler.bind(this) }), h("label", { class: "custom-control-label" }, "Lokasyonu Yay\u0131nla"), h("small", { class: "form-text text-muted" }, "Yay\u0131nlanmas\u0131n\u0131 istedi\u011Finiz ", this.formName, " i\u00E7in bu kutucu\u011Fu i\u015Faretleyiniz. Ayn\u0131 i\u015Flemi di\u011Fer dil se\u00E7enekleri i\u00E7in de yapmal\u0131s\u0131n\u0131z."))), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, this.formName, " Ba\u015Fl\u0131\u011F\u0131"), h("input", { value: this.formDetail.languages[this.selectedLanguage].position, onInput: function (e) { return _this.inputHandler('position', e); }, type: "text", class: "form-control", id: "modalEventName", placeholder: "Lokasyon ba\u015Fl\u0131\u011F\u0131" }), h("small", { class: "form-text text-muted" }, "\u00D6rn.: B\u00D6LGE M\u00DCD\u00DCRL\u00DC\u011E\u00DC")), h("div", { class: "form-group" }, h("label", null, this.formName, " \u0130smi"), h("input", { value: this.formDetail.languages[this.selectedLanguage].name, onInput: function (e) { return _this.inputHandler('name', e); }, type: "text", class: "form-control", id: "modalEventName", placeholder: "Lokasyon ismi" }), h("small", { class: "form-text text-muted" }, "Lokasyonun ismini yaz\u0131n\u0131z.")), h("div", { class: "form-group" }, h("label", null, "Lokasyon Koordinatlar\u0131"), h("div", { class: "input-group" }, h("div", { class: "input-group-prepend" }, h("span", { class: "input-group-text", id: "" }, "Kuzey / Bat\u0131")), h("input", { value: this.formDetail.languages[this.selectedLanguage].coordY, onInput: function (e) { return _this.inputHandler('coordY', e); }, type: "text", class: "form-control" }), h("input", { value: this.formDetail.languages[this.selectedLanguage].coordX, onInput: function (e) { return _this.inputHandler('coordX', e); }, type: "text", class: "form-control" })), h("small", { class: "form-text text-muted" }, "\u00D6rn.: 40.152534 / 16.245678")), h("div", { class: "form-group" }, h("label", null, "Lokasyon Adresi"), h("input", { value: this.formDetail.languages[this.selectedLanguage].address, onInput: function (e) { return _this.inputHandler('address', e); }, type: "text", class: "form-control", id: "locationAddress", placeholder: "Lokasyon adresi" })), h("div", { class: "form-group" }, h("label", null, "Lokasyon Telefon Numaras\u0131"), h("input", { value: this.formDetail.languages[this.selectedLanguage].phone, onInput: function (e) { return _this.inputHandler('phone', e); }, type: "tel", class: "form-control", id: "locationPhone", placeholder: "Lokasyon telefonu" }), h("small", { class: "form-text text-muted" }, "E\u011Fer telefon numaras\u0131 belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz.")), h("div", { class: "form-group" }, h("label", null, "Lokasyon Fax Numaras\u0131"), h("input", { value: this.formDetail.languages[this.selectedLanguage].fax, onInput: function (e) { return _this.inputHandler('fax', e); }, type: "tel", class: "form-control", id: "locationFax", placeholder: "Lokasyon fax numaras\u0131" }), h("small", { class: "form-text text-muted" }, "E\u011Fer fax numaras\u0131 belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz.")), h("div", { class: "form-group" }, h("label", null, "Lokasyon EPosta Adresi"), h("input", { value: this.formDetail.languages[this.selectedLanguage].email, onInput: function (e) { return _this.inputHandler('email', e); }, type: "email", class: "form-control", id: "locationEmail", placeholder: "location@duratek.com.tr" }), h("small", { class: "form-text text-muted" }, "E\u011Fer eposta adresi belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz."))), h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, this.formName, " Foto\u011Fraf\u0131"), h("div", { class: "section-detail-item-group-image" }, h("input", { name: "image", type: "file", id: "myCropper" })), h("div", { class: "custom-file" }, h("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir."))))))), h("div", { class: "section-detail-footer" }, h("button", { onClick: function () { return history.back(); }, type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"), h("button", { onClick: this.updateDetails.bind(this), type: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))), h("footer", { class: "page-footer" })));
        };
        appAddLocation.prototype.render = function () {
            if (this.formDetail) {
                return (h("div", { class: "app-event-detail" }, this._renderForm()));
            }
        };
        Object.defineProperty(appAddLocation, "is", {
            get: function () { return "app-add-location"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appAddLocation, "properties", {
            get: function () {
                return {
                    "contentChanged": {
                        "state": true
                    },
                    "formDetail": {
                        "state": true
                    },
                    "galleryEnabled": {
                        "state": true
                    },
                    "generatedPath": {
                        "state": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
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
        Object.defineProperty(appAddLocation, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appAddLocation;
    }());
    exports.AppAddLocation = appAddLocation;
    Object.defineProperty(exports, '__esModule', { value: true });
});

const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-cc9391f5.js';
import './chunk-84ac4f31.js';
import { a as Sortable$1 } from './chunk-a096565e.js';
import { a as cloneDeep } from './chunk-597c4635.js';

class appNewsDetail {
    constructor() {
        this.selectedLanguage = 'tr';
        this.contentChanged = false;
        this.galleryEnabled = false;
        this.imageCropped = 0;
        this.formName = 'Haber';
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
            onUpdate: (event) => {
                const newItem = this.formDetail.languages[this.selectedLanguage].content[event.oldIndex];
                const oldOriginalItem = this.formDetail.languages[this.selectedLanguage].content[event.newIndex];
                this.formDetail.languages[this.selectedLanguage].content[event.newIndex] = newItem;
                this.formDetail.languages[this.selectedLanguage].content[event.oldIndex] = oldOriginalItem;
                this.contentChanged = !this.contentChanged;
            }
        };
        this.gallerySortableOptions = {
            sort: true,
            animation: 150,
            handle: ".holder",
            onUpdate: (event) => {
                const newItem = this.formDetail.languages[this.selectedLanguage].gallery[event.oldIndex];
                const oldOriginalItem = this.formDetail.languages[this.selectedLanguage].gallery[event.newIndex];
                this.formDetail.languages[this.selectedLanguage].gallery[event.newIndex] = newItem;
                this.formDetail.languages[this.selectedLanguage].gallery[event.oldIndex] = oldOriginalItem;
                this.contentChanged = !this.contentChanged;
            }
        };
    }
    addBlock(type) {
        if (type === 'gallery') {
            this.galleryEnabled = true;
            return;
        }
        const array = this.formDetail.languages[this.selectedLanguage].content;
        array.push(this.blockTypes[type]);
        this.formDetail.languages[this.selectedLanguage].content = cloneDeep(array);
        this.contentChanged = !this.contentChanged;
    }
    addGalleryItem(elid) {
        const imageSelector = document.querySelector(`#galleryFileSelector${elid}`);
        imageSelector.click();
        imageSelector.addEventListener("change", (ev) => {
            let formData = new FormData();
            formData.append("image", ev.target.files[0]);
            fetch(`${window['apiBase']}api/uploadgallery`, {
                method: 'POST',
                body: formData
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        this.formDetail.languages[this.selectedLanguage].gallery.push({
                            title: this.galleryItemTitle,
                            url: window['apiBase'] + data.path,
                            thumbnail: window['apiBase'] + data.resized
                        });
                        this.galleryItemTitle = "Fotoğraf hakkında kısa bilgi yazınız";
                        this.contentChanged = !this.contentChanged;
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
    }
    componentWillLoad() {
        getFromPath(`datasource/news/${this.match.params.id}`)
            .then((resp) => {
            this.formDetail = resp;
            if (resp.languages[this.selectedLanguage].gallery.length) {
                this.galleryEnabled = true;
            }
        });
        this.initExternalLibraries();
    }
    componentDidLoad() {
        this.initExternalLibraries();
    }
    componentDidUpdate() {
        this.initExternalLibraries();
    }
    changeLanguage(language) {
        this.selectedLanguage = language;
    }
    imageSelected(e) {
        const file = e.target.files[0];
        this.formDetail.languages[this.selectedLanguage].image = URL.createObjectURL(file);
        this.contentChanged = !this.contentChanged;
        const ref = firebase.storage().ref();
        const name = (+new Date()) + '-' + file.name;
        const metadata = { contentType: file.type };
        const task = ref.child(name).put(file, metadata);
        task.then((snapshot) => {
            snapshot.ref.getDownloadURL().then((val) => {
                this.formDetail.languages[this.selectedLanguage].image = val;
                this.contentChanged = !this.contentChanged;
            });
        });
    }
    initExternalLibraries() {
        const el = document.querySelector('.form-group-list');
        if (el) {
            new Sortable$1.create(el, this.listSortableOptions);
        }
        const galleryEls = document.querySelector('.gallery-list');
        if (galleryEls) {
            new Sortable$1.create(galleryEls, this.gallerySortableOptions);
        }
        const arr = document.querySelectorAll('input[type="date"]');
        arr.forEach((el) => {
            window['flatpickr'](el, {
                dateFormat: "d-m-Y",
                "locale": 'tr'
            });
        });
        this.initMediumEditor();
        this.initImageCropper();
    }
    initImageCropper() {
        // if(this.mainImagecropper) this.mainImagecropper.destroy()
        if (this.mainImagecropper)
            return;
        this.mainImagecropper = new Slim(document.getElementById('myCropper'), {
            ratio: '640:340',
            minSize: {
                width: 640,
                height: 340,
            },
            crop: {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            },
            didTransform: () => {
                this.imageCropped++;
            },
            defaultInputName: 'image',
            service: `${window['apiBase']}api/upload`,
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
        this.mainImagecropper.load(this.formDetail.languages[this.selectedLanguage].image, () => {
            // Done loading the image!
            // Upload a selected image to the server
        });
    }
    initMediumEditor() {
        if (document.querySelector('.mediumeditor')) {
            const mediumEditorElements = document.querySelectorAll('.mediumeditor');
            const editor = new MediumEditor(mediumEditorElements, {
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
            editor.subscribe('editableInput', (event, editable) => {
                // Do some work
                if (event && event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                }
                this.formDetail.languages[this.selectedLanguage].content[editable.dataset.id].data = editable.innerHTML;
            });
        }
    }
    inputHandler(field, e) {
        this.formDetail.languages[this.selectedLanguage][field] = e.target.value;
        if (field === 'title') {
            let string = e.target.value;
            const trMap = {
                'çÇ': 'c',
                'ğĞ': 'g',
                'şŞ': 's',
                'üÜ': 'u',
                'ıİ': 'i',
                'öÖ': 'o'
            };
            for (let key in trMap) {
                string = string.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
            }
            this.formDetail.languages[this.selectedLanguage].path = string.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            this.contentChanged = !this.contentChanged;
        }
    }
    galleryRenderer() {
        if (!this.galleryEnabled)
            return false;
        console.log('GALLERY', this.formDetail.languages[this.selectedLanguage]);
        const thisTimeId = `${Math.ceil(Math.random() * 100)}${Date.now()}`;
        return (h("li", { class: "form-group-list-item", key: `${Math.random()}-${Date.now()}` },
            h("label", null, "Galeri"),
            h("div", { class: "gallery-list-wrapper" },
                h("ul", { class: "gallery-list" },
                    this.formDetail.languages[this.selectedLanguage].gallery.map((item, index) => {
                        return (h("li", { class: "gallery-list-item", key: Date.now() + Math.random() },
                            h("div", { class: "gallery-list-item-image" },
                                h("div", { class: "gallery-list-item-options" },
                                    h("a", { class: "btn btn-sm btn-danger delete", onClick: () => this.removeItemFromGalleryArray(index), title: "", "data-toggle": "tooltip" }, "Sil"),
                                    h("a", { class: "btn btn-sm btn-light holder", href: "javascript:void(0)", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                                        h("span", { class: "fix-hamburger-md" }))),
                                h("img", { src: item.url, alt: "" })),
                            h("div", { class: "gallery-list-item-caption" },
                                h("input", { type: "email", class: "form-control", id: "", placeholder: "Foto\u011Fraf hakk\u0131nda k\u0131sa bilgi yaz\u0131n\u0131z", onInput: (e) => item.title = e.target.value, value: item.title })),
                            h("div", { class: "custom-file gallery-list-item-file-selector" },
                                h("input", { type: "file", class: "custom-file-input", id: "" }))));
                    }),
                    h("li", { class: "gallery-list-item empty" },
                        h("div", { class: "gallery-list-item-image" },
                            h("div", { class: "gallery-list-item-options" },
                                h("a", { class: "btn btn-sm btn-primary add", onClick: () => this.addGalleryItem(thisTimeId), title: "", "data-toggle": "tooltip" }, "Foto\u011Fraf Y\u00FCkle"),
                                h("a", { class: "btn btn-sm btn-light holder", href: "javascript:void(0)", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                                    h("span", { class: "fix-hamburger-md" }))),
                            h("img", { src: "http://via.placeholder.com/300x300", alt: "" })),
                        h("div", { class: "gallery-list-item-caption" },
                            h("input", { type: "email", class: "form-control", onInput: (e) => this.galleryItemTitle = e.target.value, id: "", placeholder: "Foto\u011Fraf hakk\u0131nda k\u0131sa bilgi yaz\u0131n\u0131z", value: this.galleryItemTitle })),
                        h("div", { class: "custom-file-input gallery-list-item-file-selector" },
                            h("input", { id: `galleryFileSelector${thisTimeId}`, type: "file", name: "image", class: "custom-file-input" })))))));
    }
    updateHandler() {
        updateFromPath(`datasource/news/${this.match.params.id}`, this.formDetail)
            .then(() => {
            swal('Başarılı', this.formName + ' detayı başarıyla güncellendi!', 'success');
            this.history.goBack();
        });
    }
    removeItemFromArray(index, e) {
        e.preventDefault();
        this.formDetail.languages[this.selectedLanguage].content.splice(index, 1);
        this.contentChanged = !this.contentChanged;
    }
    photoSelected(index, e) {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        fetch(`${window['apiBase']}api/uploadgallery`, {
            method: 'POST',
            body: formData
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.formDetail.languages[this.selectedLanguage].content[index].url = window['apiBase'] + data.path;
                    this.contentChanged = !this.contentChanged;
                });
            }
        });
    }
    renderContentsBlock() {
        return this.formDetail.languages[this.selectedLanguage].content.map((item, index) => {
            switch (item.type) {
                case 'Editor':
                    return (h("li", { class: "form-group-list-item sortable-item", "data-id": index, key: `${Date.now()}${index}` },
                        h("label", null,
                            index + 1,
                            ". Yaz\u0131"),
                        h("button", { class: "btn btn-sm btn-outline-dark holder", role: "button", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                            h("span", { class: "fix-hamburger-md" })),
                        h("button", { onClick: (e) => this.removeItemFromArray(index, e), class: "btn btn-sm btn-outline-danger delete", title: "Sil" }, "Sil"),
                        h("div", { innerHTML: item.data, class: "form-control mediumeditor", "data-id": index })));
                case 'Image':
                    return (h("li", { class: "form-group-list-item sortable-item", "data-id": index, key: `${Date.now()}${index}` },
                        h("label", null,
                            index + 1,
                            ". Foto\u011Fraf"),
                        h("button", { class: "btn btn-sm btn-outline-dark holder", role: "button", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                            h("span", { class: "fix-hamburger-md" })),
                        h("button", { onClick: (e) => this.removeItemFromArray(index, e), class: "btn btn-sm btn-outline-danger delete", title: "Sil" }, "Sil"),
                        h("div", { class: "section-detail-item-group-image" },
                            h("img", { src: item.url })),
                        h("div", { class: "custom-file" },
                            h("input", { onChange: (e) => this.photoSelected(index, e), type: "file", class: "custom-file-input", id: "customFile" }),
                            h("label", { class: "custom-file-label" }, "Foto\u011Fraf Se\u00E7"),
                            h("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir."))));
            }
        });
    }
    removeItemFromGalleryArray(index) {
        this.formDetail.languages[this.selectedLanguage].gallery.splice(index, 1);
        this.contentChanged = !this.contentChanged;
    }
    async updateDetails() {
        if (this.imageCropped) {
            this.mainImagecropper.upload((error, data, response) => {
                console.warn(error, data);
                // Done uploading!
                this.formDetail.languages[this.selectedLanguage].image = `${window['apiBase']}${response.path}`;
                this.formDetail.languages[this.selectedLanguage].imageThumbnail = `${window['apiBase']}${response.resized}`;
                this.updateHandler();
            });
        }
        else {
            this.updateHandler();
        }
    }
    isPublishedHandler(event) {
        this.formDetail.languages[this.selectedLanguage].isEnabled = event.target.checked;
    }
    uploadFileHandler(ev) {
        console.log('file change event arrived', ev);
        var formData = new FormData();
        formData.append("upload", ev.target.files[0]);
        var request = new XMLHttpRequest();
        request.open("POST", `${window['apiBase']}api/fileupload`, true);
        request.onload = (oEvent) => {
            if (request.status == 200) {
                console.log('uploaded Success', oEvent, request);
                console.log('This', this);
                const file = JSON.parse(request.response).file.name;
                this.formDetail.languages[this.selectedLanguage].file = file;
            }
            else {
                console.log('error arrived', oEvent);
            }
        };
        request.send(formData);
        ev.preventDefault();
    }
    // doing this ugly approach because of current bug of CORE package (stencil)
    _renderForm() {
        return (h("div", null,
            h("main", { class: "page-body" },
                h("section", { class: "section-detail" },
                    h("div", { class: "section-detail-header" },
                        h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
                            h("button", { onClick: () => this.changeLanguage('tr'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'tr' ? 'active' : ''} ` }, "T\u00FCrk\u00E7e"),
                            h("button", { onClick: () => this.changeLanguage('en'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'en' ? 'active' : ''} ` }, "English"))),
                    h("div", { class: "section-detail-body" },
                        h("div", { class: "section-detail-item" },
                            h("form", null,
                                h("div", { class: "section-detail-item-group" },
                                    h("div", { class: "custom-control custom-checkbox" },
                                        h("input", { checked: this.formDetail.languages[this.selectedLanguage].isEnabled, type: "checkbox", onChange: this.isPublishedHandler.bind(this) }),
                                        h("label", { class: "custom-control-label" }, "Haberi Yay\u0131nla"),
                                        h("small", { class: "form-text text-muted" },
                                            "Yay\u0131nlanmas\u0131n\u0131 istedi\u011Finiz ",
                                            this.formName,
                                            " i\u00E7in bu kutucu\u011Fu i\u015Faretleyiniz. Ayn\u0131 i\u015Flemi di\u011Fer dil se\u00E7enekleri i\u00E7in de yapmal\u0131s\u0131n\u0131z."))),
                                h("div", { class: "section-detail-item-group" },
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " \u0130smi / Ba\u015Fl\u0131\u011F\u0131"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].title, onInput: (e) => this.inputHandler('title', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Haberin ismini yaz\u0131n\u0131z..." }),
                                        h("small", { class: "form-text text-muted" },
                                            this.formName,
                                            " ismini yaz\u0131n\u0131z. Bu isim web sitenizde ",
                                            this.formName,
                                            " ismi ve ba\u015Fl\u0131\u011F\u0131 alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")),
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " URL"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].path, type: "text", class: "form-control", id: "modalEventSlug", placeholder: `${this.formName} URL'si otomatik oluşur`, readonly: true }),
                                        h("small", { class: "form-text text-muted" },
                                            "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z ",
                                            this.formName,
                                            "ismi/ba\u015Fl\u0131\u011F\u0131'na g\u00F6re otomatik olu\u015Fur.")),
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " Tarihi"),
                                        h("input", { onInput: (e) => this.inputHandler('startDate', e), type: "date", class: "form-control", id: "modalEventDate", value: this.formDetail.languages[this.selectedLanguage].startDate, placeholder: this.formDetail.languages[this.selectedLanguage].startDate }),
                                        h("small", { class: "form-text text-muted" },
                                            this.formName,
                                            " ba\u015Flang\u0131\u00E7 tarihini se\u00E7iniz.")),
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " K\u0131sa A\u00E7\u0131klamas\u0131"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].shortDescription, onInput: (e) => this.inputHandler('shortDescription', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Haber i\u00E7in k\u0131sa bir a\u00E7\u0131klama yaz\u0131s\u0131 yaz\u0131n\u0131z..." }),
                                        h("small", { class: "form-text text-muted" },
                                            this.formName,
                                            " k\u0131sa a\u00E7\u0131klamas\u0131 Haberler sayfas\u0131nda haber ba\u015Fl\u0131\u011F\u0131n\u0131n hemen alt\u0131nda g\u00F6r\u00FCnecektir.")),
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " Dosyas\u0131"),
                                        h("input", { type: "file", onChange: this.uploadFileHandler.bind(this), class: "form-control", name: "upload", multiple: true }),
                                        h("small", { class: "form-text text-muted" },
                                            "\u015Eu andaki mevcut dosya => ",
                                            this.formDetail.languages[this.selectedLanguage].file),
                                        " ",
                                        h("div", { style: { color: 'red' }, onClick: () => { this.formDetail.languages[this.selectedLanguage].file = ''; this.contentChanged = !this.contentChanged; } }, "Sil"))),
                                h("div", { class: "section-detail-item-group" },
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " Foto\u011Fraf\u0131"),
                                        h("div", { class: "section-detail-item-group-image" },
                                            h("input", { name: "image", type: "file", id: "myCropper" })),
                                        h("div", { class: "custom-file" },
                                            h("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir.")))),
                                h("div", { class: "section-detail-item-group" },
                                    h("h3", null,
                                        this.formName,
                                        " A\u00E7\u0131klamas\u0131"),
                                    h("div", { class: "section-detail-item-group-header" },
                                        h("button", { class: "btn btn-outline-dark", type: "button", "data-toggle": "collapse", "data-target": "#addContentCallapse", "aria-expanded": "false", "aria-controls": "addContentCallapse" }, "+ Yeni \u0130\u00E7erik Ekle"),
                                        h("div", { class: "collapse", id: "addContentCallapse" },
                                            h("ul", { class: "content-list" },
                                                h("li", { class: "content-list-item" },
                                                    h("a", { onClick: () => this.addBlock('text'), title: "", class: "" },
                                                        h("span", { class: "" }, "Yaz\u0131"))),
                                                h("li", { class: "content-list-item" },
                                                    h("a", { onClick: () => this.addBlock('image'), title: "", class: "" },
                                                        h("span", { class: "" }, "Foto\u011Fraf"))),
                                                h("li", { class: "content-list-item" },
                                                    h("a", { onClick: () => this.addBlock('gallery'), title: "", class: "" },
                                                        h("span", { class: "" }, "Galeris")))))),
                                    h("ul", { class: "form-group form-group-list" }, this.renderContentsBlock()),
                                    this.galleryRenderer())))),
                    h("div", { class: "section-detail-footer" },
                        h("button", { onClick: () => history.back(), type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"),
                        h("button", { onClick: this.updateDetails.bind(this), type: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))),
            h("footer", { class: "page-footer" })));
    }
    render() {
        if (this.formDetail) {
            return (h("div", { class: "app-event-detail" }, this._renderForm()));
        }
    }
    static get is() { return "app-news-detail"; }
    static get properties() { return {
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
    }; }
    static get style() { return ""; }
}

export { appNewsDetail as AppNewsDetail };

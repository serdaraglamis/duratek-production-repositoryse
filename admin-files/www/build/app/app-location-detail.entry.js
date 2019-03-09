const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-89a24860.js';
import './chunk-84ac4f31.js';
import { a as Sortable$1 } from './chunk-70a5aa93.js';
import { a as cloneDeep } from './chunk-597c4635.js';

class appLocationDetail {
    constructor() {
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
    addGalleryItem() {
        const imageSelector = document.querySelector('#galleryFileSelector');
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
        getFromPath(`datasource/locations/${this.match.params.id}`)
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
                event.stopImmediatePropagation();
                this.formDetail.languages[this.selectedLanguage].content[event.target.dataset.id].data = editable.innerHTML;
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
    updateHandler() {
        updateFromPath(`datasource/locations/${this.match.params.id}`, this.formDetail)
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
        this.formDetail.isPublished = event.target.checked;
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
                                        h("input", { checked: this.formDetail.isPublished, type: "checkbox", onChange: this.isPublishedHandler.bind(this) }),
                                        h("label", { class: "custom-control-label" }, "Lokasyonu Yay\u0131nla"),
                                        h("small", { class: "form-text text-muted" },
                                            "Yay\u0131nlanmas\u0131n\u0131 istedi\u011Finiz ",
                                            this.formName,
                                            " i\u00E7in bu kutucu\u011Fu i\u015Faretleyiniz. Ayn\u0131 i\u015Flemi di\u011Fer dil se\u00E7enekleri i\u00E7in de yapmal\u0131s\u0131n\u0131z."))),
                                h("div", { class: "section-detail-item-group" },
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " Ba\u015Fl\u0131\u011F\u0131"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].position, onInput: (e) => this.inputHandler('position', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Lokasyon ba\u015Fl\u0131\u011F\u0131" }),
                                        h("small", { class: "form-text text-muted" }, "\u00D6rn.: B\u00D6LGE M\u00DCD\u00DCRL\u00DC\u011E\u00DC")),
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " \u0130smi"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].name, onInput: (e) => this.inputHandler('name', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Lokasyon ismi" }),
                                        h("small", { class: "form-text text-muted" }, "Lokasyonun ismini yaz\u0131n\u0131z.")),
                                    h("div", { class: "form-group" },
                                        h("label", null, "Lokasyon Koordinatlar\u0131"),
                                        h("div", { class: "input-group" },
                                            h("div", { class: "input-group-prepend" },
                                                h("span", { class: "input-group-text", id: "" }, "Kuzey / Bat\u0131")),
                                            h("input", { value: this.formDetail.languages[this.selectedLanguage].coordY, onInput: (e) => this.inputHandler('coordY', e), type: "text", class: "form-control" }),
                                            h("input", { value: this.formDetail.languages[this.selectedLanguage].coordX, onInput: (e) => this.inputHandler('coordX', e), type: "text", class: "form-control" })),
                                        h("small", { class: "form-text text-muted" }, "\u00D6rn.: 40\u00B0 15' 25\" / 40\u00B0 15' 25\"")),
                                    h("div", { class: "form-group" },
                                        h("label", null, "Lokasyon Adresi"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].address, onInput: (e) => this.inputHandler('address', e), type: "text", class: "form-control", id: "locationAddress", placeholder: "Lokasyon adresi" })),
                                    h("div", { class: "form-group" },
                                        h("label", null, "Lokasyon Telefon Numaras\u0131"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].phone, onInput: (e) => this.inputHandler('phone', e), type: "tel", class: "form-control", id: "locationPhone", placeholder: "Lokasyon telefonu" }),
                                        h("small", { class: "form-text text-muted" }, "E\u011Fer telefon numaras\u0131 belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz.")),
                                    h("div", { class: "form-group" },
                                        h("label", null, "Lokasyon Fax Numaras\u0131"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].fax, onInput: (e) => this.inputHandler('fax', e), type: "tel", class: "form-control", id: "locationFax", placeholder: "Lokasyon fax numaras\u0131" }),
                                        h("small", { class: "form-text text-muted" }, "E\u011Fer fax numaras\u0131 belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz.")),
                                    h("div", { class: "form-group" },
                                        h("label", null, "Lokasyon EPosta Adresi"),
                                        h("input", { value: this.formDetail.languages[this.selectedLanguage].email, onInput: (e) => this.inputHandler('email', e), type: "email", class: "form-control", id: "locationEmail", placeholder: "location@duratek.com.tr" }),
                                        h("small", { class: "form-text text-muted" }, "E\u011Fer eposta adresi belirtmek istemezseniz bo\u015F b\u0131rakabilirsiniz."))),
                                h("div", { class: "section-detail-item-group" },
                                    h("div", { class: "form-group" },
                                        h("label", null,
                                            this.formName,
                                            " Foto\u011Fraf\u0131"),
                                        h("div", { class: "section-detail-item-group-image" },
                                            h("input", { name: "image", type: "file", id: "myCropper" })),
                                        h("div", { class: "custom-file" },
                                            h("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir."))))))),
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
    static get is() { return "app-location-detail"; }
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

export { appLocationDetail as AppLocationDetail };

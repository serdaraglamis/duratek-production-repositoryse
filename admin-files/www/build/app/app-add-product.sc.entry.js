const h = window.App.h;

import { b as getFromPath, a as postDataFromPath, c as updateFromPath } from './chunk-cc9391f5.js';

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
class appAddProduct {
    constructor() {
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
    componentWillLoad() {
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
        getFromPath(`product-categories`)
            .then((resp) => {
            getFromPath(`products`).then((products) => {
                this.productCategories = resp;
                this.products = products;
                this.allCategories = resp;
                this.products = products;
                //console.log('All Categories Arrived', this.allCategories);
                // console.log('All Products Arrived', this.products);
                resp.forEach((item) => {
                    this.productIdObject[item._id] = item;
                    if (item.languages['tr'].path === 'hierarchy') {
                        this.mainCategory = item;
                        this.isReady = true;
                    }
                });
            });
        });
    }
    componentDidUpdate() {
        this.initExternalLibraries();
        this.initSelectors();
    }
    inputChoosed(index, e) {
        this.productDetail.categories[index] = e.target.value;
        this.changeTrigger = !this.changeTrigger;
    }
    initSelectors() {
        const items = document.querySelectorAll('.custom-select');
        if (items && this.choices.length) {
            this.choices.forEach(item => item.destroy());
            this.choices = [];
        }
        const __this = this;
        items.forEach(item => {
            this.choices.push(new Choices(item, {
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
    }
    /*  getParentsName(id) {
        let string = '';
        const item = this.productIdObject[id];
        if(item && item.parents && item.parents.length) {
          item.parents.forEach(id => string = `${string} ${this.productIdObject[id].languages[this.selectedLanguage].title} ->`)
        }
        return string;
      }*/
    getParentsName(id) {
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
    }
    initExternalLibraries() {
        const arr = document.querySelectorAll('input[type="date"]');
        arr.forEach((el) => {
            window['flatpickr'](el, {
                dateFormat: "d-m-Y",
                "locale": 'tr'
            });
        });
        this.initMediumEditor();
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
                this.productDetail.languages[this.selectedLanguage].description = editable.innerHTML;
            });
        }
    }
    inputHandler(field, e) {
        if (field === 'productCode') {
            this.productDetail.productCode = e.target.value;
        }
        else {
            this.productDetail.languages[this.selectedLanguage][field] = e.target.value;
        }
        if (field === 'title' || field === 'productCode') {
            let string = this.productDetail.languages[this.selectedLanguage].title;
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
            let productCode = this.productDetail.productCode || '';
            for (let key in trMap) {
                productCode = productCode.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
            }
            this.productDetail.languages[this.selectedLanguage].path = string.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-') + '-' + productCode.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            this.changeTrigger = !this.changeTrigger;
        }
    }
    isPublishedHandler(event) {
        this.productDetail.isPublished = event.target.checked;
    }
    removeCategory(index, e) {
        e.preventDefault();
        this.productDetail.categories.splice(index, 1);
        this.changeTrigger = !this.changeTrigger;
    }
    addCategory() {
        this.productDetail.categories.push(this.productCategories[0]._id);
        this.changeTrigger = !this.changeTrigger;
    }
    async updateDetails() {
        if (this.productDetail.categories.length) {
            siiimpleToast.message(`Ürün Oluşturuluyor lütfen bekleyiniz...`);
            const addedProduct = await postDataFromPath(`products`, this.productDetail);
            const response = await addedProduct.json();
            siiimpleToast.message(`Ürün başarıyla oluşturuldu. Kategori eşleme işlemlerine başlanıyor...`);
            const newProductId = response._id;
            async function asyncForEach(array, callback) {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                }
            }
            await asyncForEach(this.productDetail.categories, async (item) => {
                let cateItem = this.productCategories.find(a => a._id === item);
                if (cateItem) {
                    siiimpleToast.message(`Ürün ${cateItem.languages.tr.title} kategorisine ekleniyor lütfen bekleyin...`);
                    cateItem.products.push(newProductId);
                    await updateFromPath(`product-categories/${cateItem._id}`, cateItem);
                    siiimpleToast.message(`Ürün ${cateItem.languages.tr.title} kategorisine başarıyla eklendi.`);
                }
            });
            siiimpleToast.message(`Kaydı tamamlanıyor. Lütfen Bekleyiniz!!!`);
            swal('Başarılı', 'Ürün detayı başarıyla güncellendi!', 'success').then(() => {
                this.history.goBack();
            });
        }
        else {
            swal('Hata', 'En az bir kategori seçmeniz gerekmektedir', 'error');
        }
    }
    renderOptions(it, product) {
        if (!this.productIdObject || !this.productIdObject[it.id]) {
            return null;
        }
        const item = this.productIdObject[it.id];
        if (item === null || item == 'undefined') {
            return null;
        }
        else {
            return (h("option", { key: `${Math.random()}-${item._id}`, selected: product === item._id, value: item._id },
                item.languages.tr.title,
                " ",
                it.children ? '>>>' : ''));
        }
        
    }
    _renderForm() {
        if (this.productDetail) {
            return (h("div", { class: "section-detail-body" },
                h("div", { class: "section-detail-item" },
                    h("form", null,
                        h("div", { class: "section-detail-item-group" },
                            h("div", { class: "custom-control custom-checkbox" },
                                h("input", { onChange: this.isPublishedHandler.bind(this), type: "checkbox", id: "productPublicationCheck", checked: this.productDetail.isPublished }),
                                h("label", { class: "custom-control-label" }, "\u00DCr\u00FCn\u00FC Yay\u0131nla"),
                                h("small", { class: "form-text text-muted" }, "Yay\u0131nlanmas\u0131n\u0131 istedi\u011Finiz \u00FCr\u00FCn i\u00E7in bu kutucu\u011Fu i\u015Faretleyiniz. Ayn\u0131 i\u015Flemi di\u011Fer dil se\u00E7enekleri i\u00E7in de yapmal\u0131s\u0131n\u0131z."))),
                        h("div", { class: "section-detail-item-group" },
                            h("div", { class: "form-group" },
                                h("label", null, "\u00DCr\u00FCn \u0130smi"),
                                h("input", { type: "text", class: "form-control", id: "productName", placeholder: "\u00DCr\u00FCn ismini yaz\u0131n\u0131z", value: this.productDetail.languages[this.selectedLanguage].title, onInput: (e) => this.inputHandler('title', e) }),
                                h("small", { class: "form-text text-muted" }, "\u00DCr\u00FCn ismini yaz\u0131n\u0131z. Bu isim web sitenizde \u00FCr\u00FCn listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")),
                            h("div", { class: "form-group" },
                                h("label", null, "\u00DCr\u00FCn Kodu"),
                                h("input", { type: "text", class: "form-control", id: "productCode", placeholder: "\u00DCr\u00FCn kodunu yaz\u0131n\u0131z", value: this.productDetail.productCode, onInput: (e) => this.inputHandler('productCode', e) }),
                                h("small", { class: "form-text text-muted" }, "\u00DCr\u00FCn ismini yaz\u0131n\u0131z. Bu isim web sitenizde \u00FCr\u00FCn listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")),
                            h("div", { class: "form-group" },
                                h("label", null, "\u00DCr\u00FCn URL"),
                                h("input", { type: "text", class: "form-control", id: "productSlug", placeholder: "\u00DCr\u00FCn URL'si otomatik olu\u015Fur", value: this.productDetail.languages[this.selectedLanguage].path, readonly: true }),
                                h("small", { class: "form-text text-muted" }, "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z \u00FCr\u00FCn ismi ve \u00FCr\u00FCn koduna g\u00F6re otomatik olu\u015Fur.")),
                            this.productDetail.categories.map((product, index) => {
                                return (h("div", { key: `${Date.now()}${Math.random()}`, class: "form-group row" },
                                    h("div", { class: "col-10" },
                                        h("select", { onChange: (e) => this.inputChoosed(index, e), class: "form-control custom-select", name: "choices-single-custom-templates" }, flat(this.mainCategory.childs).map((item) => {
                                            return this.renderOptions(item, product);
                                        }))),
                                    h("div", { class: "col-2" },
                                        h("a", { class: "btn btn-danger text-white", onClick: (e) => this.removeCategory(index, e) }, " Sil "))));
                            }),
                            h("a", { class: "btn btn-success", onClick: () => this.addCategory() }, "Kategori Ekle")),
                        h("div", { class: "section-detail-item-group" },
                            h("div", { class: "form-group" },
                                h("label", null, "\u00DCr\u00FCn A\u00E7\u0131klamas\u0131"),
                                h("div", { innerHTML: this.productDetail.languages[this.selectedLanguage].description, class: "form-control mediumeditor", id: "productDescription" })))))));
        }
    }
    render() {
        if (this.isReady) {
            return (h("div", { class: "app-product-detail" },
                h("main", { class: "page-body" },
                    h("section", { class: "section-detail" },
                        h("div", { class: "section-detail-header" },
                            h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
                                h("button", { onClick: () => this.selectedLanguage = 'tr', type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'tr' ? 'active' : ''}` }, "T\u00FCrk\u00E7e"),
                                h("button", { onClick: () => this.selectedLanguage = 'en', type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'en' ? 'active' : ''}` }, "English"))),
                        this._renderForm(),
                        h("div", { class: "section-detail-footer" },
                            h("a", { onClick: () => history.back(), role: "button", class: "btn btn-secondary" }, "\u0130ptal"),
                            h("a", { onClick: this.updateDetails.bind(this), role: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-add-product"; }
    static get properties() { return {
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
    }; }
    static get style() { return ""; }
}

export { appAddProduct as AppAddProduct };

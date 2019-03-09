const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-89a24860.js';
import './chunk-84ac4f31.js';
import { a as cloneDeep } from './chunk-597c4635.js';

class appStaticLanguages {
    constructor() {
        this.contentChanged = false;
        this.currentLanguage = 'tr';
        this.editableIndex = null;
        this.languageArray = [];
        this.isAdmin = false;
    }
    componentWillLoad() {
        const userRole = localStorage.getItem('userrole');
        if (userRole === 'admin') {
            this.isAdmin = true;
        }
        else {
            siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
        }
        //window['scrollTo'](0, 0)
        getFromPath('languages/5b1ec1efc105d239a083350a')
            .then((resp) => {
            console.log('LANGUAGE GELDİ', resp);
            this.languageArray = resp.options;
            this.pageData = resp;
        });
    }
    updateData(mode) {
        const currentKey = this.languageArray[this.editableIndex].key;
        let filteredArray = cloneDeep(this.languageArray);
        filteredArray.splice(this.editableIndex, 1);
        const isExist = filteredArray.find(key => key.key === currentKey);
        if (isExist) {
            siiimpleToast.alert('Aynı Anahtar Değerine Sahip Başka Bir Değişken Ekleyemezsiniz!');
        }
        else {
            siiimpleToast.message(`Bilgi: Değişken ${currentKey} güncellendi`);
            this.editableIndex = null;
        }
        console.log('Update Data Geldi', mode);
        /* updateFromPath(`datasource/menu/5b1d012c93b558297ceb8e43`, this.pageData)
           .then(() => {
             console.log('Güncellendi');
             this.editableIndex = null;
             if(mode === 'drag') {
               siiimpleToast.success('Sıra başarıyla güncellendi');
             }
             this.contentChanged = !this.contentChanged;
           })*/
    }
    renderList() {
        console.log('PAGE DATA', this.pageData);
        return this.languageArray.map((item, index) => {
            return (h("li", { class: "list-group-item fix-list-group-item sortable", key: `${Date.now()}-${index}`, "data-id": index },
                h("div", { class: "row fix-list-group-row" },
                    this.editableIndex === index
                        ? (h("div", { class: "col-2" },
                            h("input", { type: "text", class: "form-control", id: "", placeholder: "Dil Anahtar\u0131", onInput: (e) => item.key = e.target.value, value: item.key })))
                        : (h("div", { class: "col-2" }, item.key)),
                    this.editableIndex === index
                        ? (h("div", { class: "col-4" },
                            h("input", { type: "text", class: "form-control", id: "", placeholder: "Menu Yolu", onInput: (e) => item.tr = e.target.value, value: item.tr })))
                        : (h("div", { class: "col-4" }, item.tr)),
                    this.editableIndex === index
                        ? (h("div", { class: "col-4" },
                            h("input", { type: "text", class: "form-control", id: "", placeholder: "Menu \u0130smi", onInput: (e) => item.en = e.target.value, value: item.en })))
                        : (h("div", { class: "col-4" }, item.en)),
                    this.editableIndex === index
                        ? (h("div", { class: "col-2" },
                            h("a", { onClick: this.updateData.bind(this), title: "", class: "btn btn-sm btn-success" }, "Sakla"),
                            h("a", { onClick: () => this.editableIndex = null, title: "", class: "btn btn-sm btn-danger" }, "\u0130ptal")))
                        : this.isAdmin ? (h("div", { class: "col-2 settings" },
                            h("a", { onClick: () => this.editableIndex = index, title: "", class: "btn btn-sm btn-primary" },
                                h("span", { class: "fix-settings-2" })),
                            h("a", { onClick: () => {
                                    this.languageArray.splice(index, 1);
                                    this.contentChanged = !this.contentChanged;
                                }, class: "btn btn-sm btn-outline-danger holder", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, "Sil"))) : '')));
        });
    }
    addLanguageItem() {
        this.languageArray.push({
            key: 'key',
            tr: 'türkçe karşılığı',
            en: 'ingilizce karşılığı'
        });
        this.editableIndex = this.languageArray.length - 1;
        this.contentChanged = !this.contentChanged;
    }
    updateLanguageString() {
        siiimpleToast.message('Dil değişikliği işleme alındı lütfen bekleyiniz...');
        let rendered = {};
        this.languageArray.forEach((item) => {
            rendered[item.key] = {
                tr: item.tr,
                en: item.en
            };
        });
        this.pageData.rendered = rendered;
        this.pageData.options = this.languageArray;
        console.log('Gönderilecek Data', this.pageData);
        updateFromPath(`languages/5b1ec1efc105d239a083350a`, this.pageData)
            .then(() => {
            siiimpleToast.success('Değişiklikler başarıyla güncellendi ve yayınlandı!');
        });
    }
    render() {
        return (h("div", { class: "app-static-languages" },
            h("header", { class: "page-header" },
                h("div", { class: "page-header-body" },
                    h("div", { class: "page-header-title" },
                        h("h1", null, "Statik Dil De\u011Fi\u015Fkenleri"),
                        h("p", null, "Sitede yay\u0131nlanan dil de\u011Fi\u015Fkenlerini burada d\u00FCzenleyebilirsiniz. De\u011Fiklikleri yapt\u0131ktan sonra De\u011Fi\u015Fikleri Kaydet ve Yay\u0131nla butonuna basmay\u0131 unutmay\u0131n!"))),
                this.isAdmin ? (h("div", { class: "page-header-options" },
                    h("button", { class: "btn btn-warning", onClick: this.addLanguageItem.bind(this) }, "Yeni Ekle"),
                    h("button", { class: "btn btn-success", onClick: this.updateLanguageString.bind(this) }, "De\u011Fi\u015Fiklikleri Kaydet & Yay\u0131nla"))) : ''),
            h("main", { class: "page-body" },
                h("section", null,
                    h("ul", { class: "list-group fix-list-group" },
                        h("li", { class: "list-group-item fix-list-group-item-header" },
                            h("div", { class: "row fix-list-group-row" },
                                h("div", { class: "col-2" }, "De\u011Fi\u015Fken Anahtar\u0131"),
                                h("div", { class: "col-4" }, "T\u00FCrk\u00E7e De\u011Feri"),
                                h("div", { class: "col-4" }, "\u0130ngilizce De\u011Feri"),
                                h("div", { class: "col-2 settings" }, "Ayarlar"))),
                        this.renderList()))),
            h("footer", { class: "page-footer" })));
    }
    static get is() { return "app-static-languages"; }
    static get properties() { return {
        "contentChanged": {
            "state": true
        },
        "currentLanguage": {
            "state": true
        },
        "editableIndex": {
            "state": true
        },
        "history": {
            "type": "Any",
            "attr": "history"
        },
        "languageArray": {
            "state": true
        },
        "pageData": {
            "state": true
        },
        "store": {
            "context": "store"
        }
    }; }
    static get style() { return ""; }
}

export { appStaticLanguages as AppStaticLanguages };

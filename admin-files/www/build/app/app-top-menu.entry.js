const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-89a24860.js';

class appTopMenu {
    constructor() {
        this.contentChanged = false;
        this.currentLanguage = 'tr';
        this.editableIndex = null;
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
        getFromPath('datasource/menu/5b1d012c93b558297ceb8e43')
            .then((resp) => {
            console.log('MENÜ GELDİ', resp);
            this.pageData = resp;
        });
    }
    componentDidUpdate() {
        const el = document.querySelector('.list-group');
        this.sortable = new Sortable(el, {
            handle: '.holder',
            draggable: '.sortable',
            onEnd: (ev) => {
                console.log('On End', ev, this);
                let newArray = [];
                const newSorts = this.sortable.toArray();
                for (let i = 0; i < this.pageData.languages[this.currentLanguage].length; i++) {
                    newArray.push(this.pageData.languages[this.currentLanguage][Number(newSorts[i])]);
                    console.log('Item Geldi', newArray, this.pageData.languages[this.currentLanguage]);
                }
                this.pageData.languages[this.currentLanguage] = newArray;
                this.updateData('drag');
            }
        });
        console.log('Updated', this);
    }
    updateData(mode) {
        console.log('Update Data Geldi');
        updateFromPath(`datasource/menu/5b1d012c93b558297ceb8e43`, this.pageData)
            .then(() => {
            console.log('Güncellendi');
            this.editableIndex = null;
            if (mode === 'drag') {
                siiimpleToast.success('Sıra başarıyla güncellendi');
            }
            this.contentChanged = !this.contentChanged;
        });
    }
    renderList() {
        console.log('PAGE DATA', this.pageData);
        return this.pageData.languages[this.currentLanguage].map((item, index) => {
            return (h("li", { class: "list-group-item fix-list-group-item sortable", key: `${Date.now()}-${index}`, "data-id": index },
                h("div", { class: "row fix-list-group-row" },
                    h("div", { class: "col-md-auto row-number" }, index + 1),
                    this.editableIndex === index
                        ? (h("div", { class: "col-2" },
                            h("input", { type: "email", class: "form-control", id: "", placeholder: "Menu Yolu", onInput: (e) => item.path = e.target.value, value: item.path })))
                        : (h("div", { class: "col-2" }, item.path)),
                    this.editableIndex === index
                        ? (h("div", { class: "col" },
                            h("input", { type: "email", class: "form-control", id: "", placeholder: "Menu \u0130smi", onInput: (e) => item.name = e.target.value, value: item.name })))
                        : (h("div", { class: "col" }, item.name)),
                    this.editableIndex === index
                        ? (h("div", { class: "col-4 settings" },
                            h("a", { onClick: this.updateData.bind(this), title: "", class: "btn btn-sm btn-success" }, "Sakla"),
                            h("a", { onClick: () => this.editableIndex = null, title: "", class: "btn btn-sm btn-danger" }, "\u0130ptal")))
                        : (h("div", { class: "col-4 settings" },
                            this.isAdmin ? (h("a", { onClick: () => this.editableIndex = index, title: "", class: "btn btn-sm btn-primary" },
                                h("span", { class: "fix-settings-2" }))) : '',
                            h("a", { href: "javascript:void(0)", class: "btn btn-sm btn-dark holder", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                                h("span", { class: "fix-hamburger-md" })))))));
        });
    }
    render() {
        if (this.pageData) {
            return (h("div", { class: "app-events" },
                h("header", { class: "page-header" },
                    h("div", { class: "page-header-body" },
                        h("div", { class: "page-header-title" },
                            h("h1", null, "Men\u00FC"),
                            h("p", null, "Men\u00FCy\u00FC g\u00F6r\u00FCnt\u00FCleyebilir ve d\u00FCzenleyebilirsiniz."))),
                    h("div", { class: "page-header-options" }, this.currentLanguage === 'tr'
                        ? (h("button", { class: "btn btn-secondary", onClick: () => this.currentLanguage = 'en' }, "\u0130ngilizceye \u00C7evir"))
                        : (h("button", { class: "btn btn-secondary", onClick: () => this.currentLanguage = 'tr' }, "T\u00FCrk\u00E7eye \u00C7evir")))),
                h("main", { class: "page-body" },
                    h("section", null,
                        h("ul", { class: "list-group fix-list-group" },
                            h("li", { class: "list-group-item fix-list-group-item-header" },
                                h("div", { class: "row fix-list-group-row" },
                                    h("div", { class: "col-md-auto row-number" }, "#"),
                                    h("div", { class: "col-2" }, "Sayfa Yolu"),
                                    h("div", { class: "col" }, "Sayfa \u0130smi"),
                                    h("div", { class: "col-2 settings" }, "Ayarlar"))),
                            this.renderList()))),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-top-menu"; }
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
        "pageData": {
            "state": true
        },
        "store": {
            "context": "store"
        }
    }; }
    static get style() { return ""; }
}

export { appTopMenu as AppTopMenu };

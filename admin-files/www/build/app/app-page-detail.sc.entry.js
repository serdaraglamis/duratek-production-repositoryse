const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-cc9391f5.js';

class appPageDetail {
    constructor() {
        this.selectedLanguage = 'tr';
        this.formName = 'Sayfa';
    }
    componentWillLoad() {
        getFromPath(`components`)
            .then(components => {
            this.components = components;
            getFromPath(`pages/${this.match.params.id}`)
                .then((data) => {
                this.formDetail = data;
            });
        });
    }
    changeLanguage(language) {
        this.selectedLanguage = language;
    }
    inputHandler(target, event) {
        this.formDetail.languages[this.selectedLanguage][target] = event.target.value;
    }
    renderComponentsList() {
        return this.formDetail.components.map((cmp, index) => {
            const component = this.components.find(comp => comp._id === cmp._id);
            return (h("li", { class: "list-group-item fix-list-group-item" },
                h("div", { class: "row fix-list-group-row" },
                    h("div", { class: "col-md-auto row-number" }, index + 1),
                    h("div", { class: "col" }, component.name),
                    component.isEditable
                        ? (h("div", { class: "col-2 settings" },
                            h("a", { onClick: () => this.history.push(`/page-components/${this.match.params.id}/${index}`), title: "", class: "btn btn-sm btn-primary" },
                                h("span", { class: "fix-settings-2" }))))
                        : '')));
        });
    }
    async updateDetails() {
        updateFromPath(`pages/${this.match.params.id}`, this.formDetail)
            .then(() => {
            swal('Başarılı', this.formName + ' detayı başarıyla güncellendi!', 'success');
            this.history.goBack();
        });
    }
    renderFormData() {
        return (h("main", { class: "page-body" },
            h("section", { class: "section-detail" },
                h("div", { class: "section-detail-header" },
                    h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
                        h("button", { onClick: () => this.changeLanguage('tr'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'tr' ? 'active' : ''} ` }, "T\u00FCrk\u00E7e"),
                        h("button", { onClick: () => this.changeLanguage('en'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'en' ? 'active' : ''} ` }, "English"))),
                h("div", { class: "section-detail-body" },
                    h("div", { class: "section-detail-item" },
                        h("form", null,
                            h("div", { class: "section-detail-item-group" },
                                h("div", { class: "form-group" },
                                    h("label", null,
                                        this.formName,
                                        " \u0130smi / Ba\u015Fl\u0131\u011F\u0131"),
                                    h("input", { value: this.formDetail.languages[this.selectedLanguage].name, onInput: (e) => this.inputHandler('name', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Sayfa ismi" }),
                                    h("small", { class: "form-text text-muted" }, "Sayfa ismini yaz\u0131n\u0131z. Bu isim web sitenizde ba\u015Fl\u0131k olarak g\u00F6r\u00FCnt\u00FClenecektir.")),
                                h("div", { class: "form-group" },
                                    h("label", null,
                                        this.formName,
                                        " Yolu (Url)"),
                                    h("input", { value: this.formDetail.languages[this.selectedLanguage].path, onInput: (e) => this.inputHandler('path', e), type: "text", class: "form-control", id: "modalEventName", placeholder: "Sayfa ismi" }),
                                    h("small", { class: "form-text text-muted" }, "Sayfa url 'ini yaz\u0131n\u0131z. Bu alan sitenizdeki /sayfa-adi \u015Feklindeki k\u0131r\u0131l\u0131mlar\u0131 etkileyecektir. L\u00FCtfen ilk k\u0131r\u0131l\u0131mlar i\u00E7in ba\u015Fta / kullanmay\u0131n")),
                                h("div", { class: "form-group" },
                                    h("label", null,
                                        this.formName,
                                        " Komponentleri"),
                                    h("small", { class: "form-text text-muted" }, "Sayfan\u0131z\u0131 \u015Fekillendiren komponentler a\u015Fa\u011F\u0131da listelenmi\u015Ftir. D\u00FCzenlemek istedi\u011Finiz komponente t\u0131klayabilirsiniz."),
                                    h("br", null),
                                    h("ul", { class: "list-group fix-list-group" },
                                        h("li", { class: "list-group-item fix-list-group-item-header" },
                                            h("div", { class: "row fix-list-group-row" },
                                                h("div", { class: "col-md-auto row-number" }, "#"),
                                                h("div", { class: "col" }, "Komponent \u0130smi"),
                                                h("div", { class: "col-2 settings" }, "Ayarlar"))),
                                        this.renderComponentsList()))),
                            h("div", { class: "section-detail-footer" },
                                h("button", { onClick: () => history.back(), type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"),
                                h("button", { onClick: this.updateDetails.bind(this), type: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet"))))))));
    }
    render() {
        if (this.formDetail) {
            return (h("div", { class: "app-page-detail" }, this.renderFormData()));
        }
    }
    static get is() { return "app-page-detail"; }
    static get properties() { return {
        "formDetail": {
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

export { appPageDetail as AppPageDetail };

const h = window.App.h;

import { b as getFromPath, d as deleteFromPath } from './chunk-cc9391f5.js';

class appEvents {
    constructor() {
        this.contentChanged = false;
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
        this.store.mapStateToProps(this, (state) => {
            const { app: { currentLanguage } } = state;
            return {
                currentLanguage
            };
        });
        getFromPath('datasource/events')
            .then((resp) => {
            this.pageData = resp;
        });
    }
    deleteItem(id) {
        swal({
            title: "Silmek istediğinize emin misiniz?",
            text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
            if (willDelete) {
                deleteFromPath(`datasource/events/${id}`)
                    .then(() => {
                    getFromPath('datasource/events')
                        .then((resp) => {
                        this.pageData = resp;
                        swal("Kayıt başarıyla silindi", {
                            icon: "success",
                        });
                    });
                })
                    .catch(() => {
                    swal("Kayıt silinirken bir hata oluştu", {
                        icon: "error",
                    });
                });
            }
            else {
                console.warn('Canceled');
            }
        });
    }
    renderList() {
        return this.pageData.map((item) => {
            const event = item.languages[this.currentLanguage];
            return (h("li", { class: "list-group-item fix-list-group-item" },
                h("div", { class: "row fix-list-group-row" },
                    h("div", { class: "col-md-auto row-number" }, "1"),
                    h("div", { class: "col-2" }, event.startDate),
                    h("div", { class: "col" }, event.title),
                    this.isAdmin ? (h("div", { class: "col-2 settings" },
                        h("a", { onClick: () => this.deleteItem(item._id), title: "", class: "btn btn-sm btn-outline-danger" },
                            h("span", { class: "fix-trash" })),
                        h("a", { onClick: () => this.history.push(`/events/${item._id}`), title: "", class: "btn btn-sm btn-primary" },
                            h("span", { class: "fix-settings-2" })))) : (h("div", { class: "col-2 settings" })))));
        });
    }
    render() {
        if (this.pageData) {
            return (h("div", { class: "app-events" },
                h("header", { class: "page-header" },
                    h("div", { class: "page-header-body" },
                        h("div", { class: "page-header-title" },
                            h("h1", null, "Etkinlikler"),
                            h("p", null, "Etkinliklerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")),
                        h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { class: "btn btn-secondary", onClick: () => this.history.push(`/add-event`) }, "Yeni Etkinlik Ekle")) : ''))),
                h("main", { class: "page-body" },
                    h("section", null,
                        h("ul", { class: "list-group fix-list-group" },
                            h("li", { class: "list-group-item fix-list-group-item-header" },
                                h("div", { class: "row fix-list-group-row" },
                                    h("div", { class: "col-md-auto row-number" }, "#"),
                                    h("div", { class: "col-2" }, "Etkinlik Tarihi"),
                                    h("div", { class: "col" }, "Etkinlik \u0130smi"),
                                    h("div", { class: "col-2 settings" }, "Ayarlar"))),
                            this.renderList()))),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-events"; }
    static get properties() { return {
        "contentChanged": {
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

export { appEvents as AppEvents };

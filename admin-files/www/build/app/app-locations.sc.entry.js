const h = window.App.h;

import { b as getFromPath, c as updateFromPath, d as deleteFromPath } from './chunk-cc9391f5.js';

class appLocations {
    constructor() {
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
        getFromPath('datasource/locations')
            .then((resp) => {
            this.pageData = resp;
        });
    }
    componentDidUpdate() {
        const el = document.querySelector('.card-list');
        this.sortable = new Sortable(el, {
            handle: '.holder',
            onEnd: (ev) => {
                console.log('On End', ev, this);
                const newSorts = this.sortable.toArray();
                newSorts.forEach((id, index) => {
                    const item = this.pageData.find(data => data._id === id);
                    item.order = index;
                    console.log('Item', item, index);
                });
                this.updateOrders();
            }
        });
        console.log('Updated', this);
    }
    async updateOrders() {
        siiimpleToast.message('Sıra güncelleniyor...');
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        await asyncForEach(this.pageData, async (item) => {
            await updateFromPath(`datasource/locations/${item._id}`, item);
        });
        getFromPath('datasource/locations')
            .then((resp) => {
            this.pageData = resp;
            this.changeTrigger = !this.changeTrigger;
            siiimpleToast.success('Sıra başarıyla güncellendi');
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
                deleteFromPath(`datasource/projects/${id}`)
                    .then(() => {
                    getFromPath('datasource/projects')
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
        return this.pageData.map((item, index) => {
            const locationItem = item.languages[this.currentLanguage];
            return (h("li", { class: "card-list-item", key: `${Date.now()}-${index}`, "data-id": item._id },
                h("div", { class: "card-list-item-image" },
                    this.isAdmin ? (h("div", { class: "card-list-item-overlay" },
                        h("button", { onClick: () => this.deleteItem(item._id), class: "btn btn-danger btn-sm", type: "button" }, "Sil"),
                        h("button", { onClick: () => this.history.push(`/locations/${item._id}`), class: "btn btn-primary btn-sm", type: "button" }, "D\u00FCzenle"),
                        h("button", { class: "btn btn-light btn-sm holder", type: "button" },
                            h("span", { class: "fix-hamburger-md" })))) : '',
                    h("img", { width: 300, height: 400, src: locationItem.image })),
                h("div", { class: "card-list-item-body" },
                    h("h3", null,
                        index + 1,
                        ". ",
                        locationItem.name))));
        });
    }
    render() {
        if (this.pageData) {
            return (h("div", { class: "app-locations" },
                h("header", { class: "page-header" },
                    h("div", { class: "page-header-body" },
                        h("div", { class: "page-header-title" },
                            h("h1", null, "Lokasyonlar"),
                            h("p", null, "Her sayfada buraya bir a\u00E7\u0131klama yaz\u0131s\u0131 yazabiliriz.")),
                        h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: () => this.history.push(`/add-location`), class: "btn btn-secondary" }, "Yeni Lokasyon Ekle")) : ''))),
                h("main", { class: "page-body" },
                    h("ul", { class: "card-list" }, this.renderList())),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-locations"; }
    static get properties() { return {
        "changeTrigger": {
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

export { appLocations as AppLocations };

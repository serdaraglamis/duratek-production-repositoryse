const h = window.App.h;

import { b as getFromPath, c as updateFromPath, d as deleteFromPath } from './chunk-89a24860.js';
import './chunk-84ac4f31.js';
import { a as cloneDeep } from './chunk-597c4635.js';

class appProducts {
    constructor() {
        this.isReady = false;
        this.selectedLanguage = 'tr';
        this.selectedFirstLevel = 0;
        this.productSectors = [];
        this.productCategories = [];
        this.productSystems = [];
        this.allCategories = [];
        this.renderedCategoryType = '';
        this.changeTrigger = false;
        this.productIdObject = {};
        this.mainCategory = [];
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
        getFromPath(`product-categories`)
            .then((resp) => {
            getFromPath(`products`).then((products) => {
                this.allCategories = resp;
                this.products = products;
                //console.log('All Categories Arrived', this.allCategories);
                // console.log('All Products Arrived', this.products);
                resp.forEach((item) => {
                    this.productIdObject[item._id] = item;
                    if (item.languages['tr'].path === 'hierarchy') {
                        this.mainCategory = item;
                    }
                });
                this.renderCategoryId = this.mainCategory.childs[0].id;
                this.isReady = true;
            });
        });
    }
    calculateProductSectors() {
        return this.allCategories.filter(category => !category.parents.length);
    }
    calculateProductCategories() {
        return this.allCategories.filter(category => category.parents.length === 1);
    }
    calculateProductSystems() {
        return this.allCategories.filter(category => category.parents.length === 2);
    }
    mapProductsToCategories() {
        /*    this.allCategories.forEach((category) => {
              category.products = [];
              this.products.forEach((product) => {
                if (product.categories.includes(category._id)) {
                  category.products.push(product)
                }
              })
            })*/
    }
    getProductsForSelected() {
        const findedThing = this.allCategories.find(item => item._id === this.renderCategoryId);
        return findedThing;
    }
    getRenderedType() {
        switch (this.renderedCategoryType) {
            case 'category':
                return 'KATEGORİ';
            case 'sector':
                return 'SEKTÖR';
        }
    }
    componentDidUpdate() {
        $('.dd').nestable({ /* config options */});
        const sortableEl = document.querySelector('.sortable-category-wrapper');
        if (sortableEl) {
            this.sortable = new Sortable(sortableEl, {
                draggable: '.sortable-item-product',
                holder: '.sortable-holder',
                onEnd: () => {
                    const newSorts = this.sortable.toArray();
                    let currentCategory = this.getProductsForSelected();
                    newSorts.forEach((cat, catIndex) => {
                        currentCategory.products[catIndex] = cat;
                    });
                    siiimpleToast.message('Kategori Ürün Hiyerarşisi Güncelleniyor Lütfen Bekleyiniz...');
                    updateFromPath(`product-categories/${currentCategory._id}`, currentCategory)
                        .then(() => {
                        siiimpleToast.success('Kategori Ürün Hiyerarşisi Başarıyla Güncellendi...');
                        this.changeTrigger = !this.changeTrigger;
                    });
                }
            });
        }
    }
    getCategoryProducts() {
        const detailCategory = this.getProductsForSelected();
        let detailProducts = [];
        for (let index of detailCategory.products) {
            detailProducts = cloneDeep(detailProducts);
            const b = this.products.find((arrayItem) => {
                if (arrayItem._id === index) {
                    return arrayItem;
                }
            });
            if (b) {
                detailProducts.push(cloneDeep(b));
            }
        }
        if (detailProducts.length) {
            return (h("div", { class: "section-products-body" },
                h("div", { class: "fix-list-group-wrapper" },
                    h("div", { class: "fix-list-group-header" },
                        h("h3", null,
                            this.getRenderedType(),
                            " -> ",
                            detailCategory.languages[this.selectedLanguage].title)),
                    h("ul", { class: "list-group fix-list-group fix-list-group-sortable sortable-category-wrapper" },
                        h("div", { class: "list-group-item fix-list-group-item-header" },
                            h("div", { class: "row fix-list-group-row" },
                                h("div", { class: "col-md-auto row-number" }, "#"),
                                h("div", { class: "col" }, "\u00DCr\u00FCn \u0130smi"),
                                h("div", { class: "col-3" }, "\u00DCr\u00FCn Kodu"),
                                h("div", { class: "col-3 settings" }, "Ayarlar"))),
                        detailProducts.map((item, index) => {
                            return (h("li", { class: "list-group-item fix-list-group-item sortable-item-product", "data-id": item._id, key: `${Date.now()}-${index}` },
                                h("div", { class: "row fix-list-group-row" },
                                    h("div", { class: "col-md-auto row-number" }, index + 1),
                                    h("div", { class: "col" }, item.languages[this.selectedLanguage].title),
                                    h("div", { class: "col-3" }, item.productCode || 'Girilmemiş'),
                                    this.isAdmin ? (h("div", { class: "col-3 settings" },
                                        h("a", { onClick: () => this.deleteItem(item._id), title: "Sil", class: "btn btn-sm btn-outline-danger", "data-toggle": "tooltip" },
                                            h("span", { class: "fix-trash" })),
                                        h("a", { onClick: () => this.history.push(`/products/${item._id}`), title: "D\u00FCzenle", class: "btn btn-sm btn-primary", "data-toggle": "tooltip" },
                                            h("span", { class: "fix-settings-2" })),
                                        h("a", { href: "javascript:void(0)", class: "btn btn-sm btn-dark sortable-holder", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" },
                                            h("span", { class: "fix-hamburger-md" })))) : (h("div", { class: "col-3 settings" })))));
                        })))));
        }
        else {
            return (h("div", { class: "section-products-body" },
                h("div", { class: "fix-list-group-wrapper" },
                    h("div", { class: "fix-list-group-header" },
                        h("h3", null,
                            this.getRenderedType(),
                            " -> ",
                            detailCategory.languages[this.selectedLanguage].title)),
                    h("ul", { class: "list-group fix-list-group fix-list-group-sortable" },
                        h("div", { class: "list-group-item fix-list-group-item-header" },
                            h("div", { class: "row fix-list-group-row" },
                                h("div", { class: "col-md-auto row-number" }, "#"),
                                h("div", { class: "col" }, "\u00DCr\u00FCn \u0130smi"),
                                h("div", { class: "col-3" }, "\u00DCr\u00FCn Kodu"),
                                h("div", { class: "col-3 settings" }, "Ayarlar"))),
                        h("li", { class: "list-group-item fix-list-group-item" },
                            h("div", { class: "row fix-list-group-row" },
                                h("div", { class: "col-md-auto row-number" }),
                                h("div", { class: "col" }, "Se\u00E7mi\u015F oldu\u011Funuz kategoride \u00FCr\u00FCn bulunmamaktad\u0131r")))))));
        }
    }
    renderCategoryList(cat) {
        const category = this.productIdObject[cat.id];
        if (category && category.languages.tr) {
            return (h("li", { class: "dd-item dd3-item", "data-id": category._id },
                h("div", { class: "dd3-content", onClick: () => { this.renderCategoryId = category._id; } }, category.languages['tr'].title),
                cat.children ? (h("ol", { class: "dd-list" }, cat.children.map(x => this.renderCategoryList(x)))) : ''));
        }
    }
    renderAsideMenu() {
        return (h("div", { class: "dd", id: "nestable3" },
            h("ol", { class: "dd-list" }, this.mainCategory && this.mainCategory.childs && this.mainCategory.childs.length ? this.mainCategory.childs.map(category => this.renderCategoryList(category)) : '')));
    }
    async deleteItem(id) {
        swal({
            title: "Silmek istediğinize emin misiniz?",
            text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
            if (willDelete) {
                this.isReady = false;
                this.completeDelete(id);
            }
            else {
                console.warn('Canceled');
            }
        });
    }
    async completeDelete(id) {
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        const relatedCategories = this.allCategories.filter(a => a.products.includes(id));
        if (relatedCategories && relatedCategories.length) {
            await asyncForEach(relatedCategories, async (category) => {
                const indexOf = category.products.indexOf(id);
                category.products.splice(indexOf, 1);
                await updateFromPath(`product-categories/${category._id}`, category);
            });
        }
        deleteFromPath(`products/${id}`)
            .then(() => {
            getFromPath(`product-categories`)
                .then((resp) => {
                getFromPath(`products`).then((products) => {
                    this.productCategories = resp;
                    this.products = products;
                    swal("Kayıt başarıyla silindi", {
                        icon: "success",
                    });
                });
            });
        })
            .catch(() => {
            swal("Kayıt silinirken bir hata oluştu", {
                icon: "error",
            });
        });
    }
    async synchronizeCategories() {
        let temporaryCategories = cloneDeep(this.allCategories);
        temporaryCategories.map(x => x.products = []);
        this.products.forEach(a => {
            if (a.categories && a.categories.length) {
                a.categories.forEach(b => {
                    let category = temporaryCategories.find(a => a._id === b);
                    if (category && !category.products.includes(a._id)) {
                        category.products.push(a._id);
                    }
                });
            }
        });
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        await asyncForEach(temporaryCategories, async (category) => {
            await updateFromPath('product-categories/' + category._id, category).catch(() => siiimpleToast.alert('Bir Sorun Oluştu'));
            siiimpleToast.success('Kategori Ürün Hiyerarşisi Başarıyla Güncellendi...');
        });
        location.reload();
    }
    ;
    render() {
        if (this.isReady) {
            return (h("div", { class: "app-products-x" },
                h("header", { class: "page-header" },
                    h("div", { class: "page-header-body" },
                        h("div", { class: "page-header-title" },
                            h("h1", null, "\u00DCr\u00FCnler"),
                            h("p", null, "\u00DCr\u00FCnlerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")),
                        h("div", { class: "page-header-options" },
                            this.isAdmin ? (h("button", { onClick: () => this.history.push('/add-product'), class: "btn btn-secondary" }, "Yeni \u00DCr\u00FCn Ekle")) : '',
                            this.isAdmin ? (h("button", { onClick: () => this.synchronizeCategories(), class: "btn btn-danger" }, "KATEGOR\u0130LER\u0130 E\u015E\u0130TLE")) : ''))),
                h("main", { class: "page-body" },
                    h("section", { class: "section-products" },
                        this.renderAsideMenu(),
                        this.getCategoryProducts())),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-products"; }
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
        "mainCategory": {
            "state": true
        },
        "renderCategoryId": {
            "state": true
        },
        "selectedFirstLevel": {
            "state": true
        },
        "selectedLanguage": {
            "state": true
        }
    }; }
    static get style() { return "\@charset \"UTF-8\";\n.app-products-x {\n  /**\n   * Nestable\n   */\n  /**\n   * Nestable Extras\n   */\n  /**\n   * Nestable Draggable Handles\n   */\n  /**\n   * Socialite\n   */ }\n  .app-products-x .cf:after {\n    visibility: hidden;\n    display: block;\n    font-size: 0;\n    content: \" \";\n    clear: both;\n    height: 0; }\n  .app-products-x * html .cf {\n    zoom: 1; }\n  .app-products-x *:first-child + html .cf {\n    zoom: 1; }\n  .app-products-x html {\n    margin: 0;\n    padding: 0; }\n  .app-products-x body {\n    font-size: 100%;\n    margin: 0;\n    padding: 1.75em;\n    font-family: 'Helvetica Neue', Arial, sans-serif; }\n  .app-products-x h1 {\n    font-size: 1.75em;\n    margin: 0 0 0.6em 0; }\n  .app-products-x a {\n    color: #2996cc; }\n  .app-products-x a:hover {\n    text-decoration: none; }\n  .app-products-x p {\n    line-height: 1.5em; }\n  .app-products-x .small {\n    color: #666;\n    font-size: 0.875em; }\n  .app-products-x .large {\n    font-size: 1.25em; }\n  .app-products-x .dd {\n    position: relative;\n    display: block;\n    margin: 0;\n    padding: 0;\n    max-width: 600px;\n    list-style: none;\n    font-size: 13px;\n    line-height: 20px; }\n  .app-products-x .dd-list {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n  .app-products-x .dd-list .dd-list {\n    padding-left: 30px; }\n  .app-products-x .dd-collapsed .dd-list {\n    display: none; }\n  .app-products-x .dd-item,\n  .app-products-x .dd-empty,\n  .app-products-x .dd-placeholder {\n    display: block;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    min-height: 20px;\n    font-size: 13px;\n    line-height: 20px; }\n  .app-products-x .dd-handle {\n    display: block;\n    height: 30px;\n    margin: 5px 0;\n    padding: 5px 10px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd-handle:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .app-products-x .dd-item > button {\n    display: block;\n    position: relative;\n    cursor: pointer;\n    float: left;\n    width: 25px;\n    height: 20px;\n    margin: 5px 0;\n    padding: 0;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 0;\n    background: transparent;\n    font-size: 12px;\n    line-height: 1;\n    text-align: center;\n    font-weight: bold; }\n  .app-products-x .dd-item > button:before {\n    content: '+';\n    display: block;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    text-indent: 0; }\n  .app-products-x .dd-item > button[data-action=\"collapse\"]:before {\n    content: '-'; }\n  .app-products-x .dd-placeholder,\n  .app-products-x .dd-empty {\n    margin: 5px 0;\n    padding: 0;\n    min-height: 30px;\n    background: #f2fbff;\n    border: 1px dashed #b6bcbf;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd-empty {\n    border: 1px dashed #bbb;\n    min-height: 100px;\n    background-color: #e5e5e5;\n    background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);\n    background-size: 60px 60px;\n    background-position: 0 0, 30px 30px; }\n  .app-products-x .dd-dragel {\n    position: absolute;\n    pointer-events: none;\n    z-index: 9999; }\n  .app-products-x .dd-dragel > .dd-item .dd-handle {\n    margin-top: 0; }\n  .app-products-x .dd-dragel .dd-handle {\n    -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1); }\n  .app-products-x .nestable-lists {\n    display: block;\n    clear: both;\n    padding: 30px 0;\n    width: 100%;\n    border: 0;\n    border-top: 2px solid #ddd;\n    border-bottom: 2px solid #ddd; }\n  .app-products-x #nestable-menu {\n    padding: 0;\n    margin: 20px 0; }\n  .app-products-x #nestable-output,\n  .app-products-x #nestable2-output {\n    width: 100%;\n    height: 7em;\n    font-size: 0.75em;\n    line-height: 1.333333em;\n    font-family: Consolas, monospace;\n    padding: 5px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x #nestable2 .dd-handle {\n    color: #fff;\n    border: 1px solid #999;\n    background: #bbb;\n    background: -webkit-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -moz-linear-gradient(top, #bbb 0%, #999 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#bbb), to(#999));\n    background: linear-gradient(top, #bbb 0%, #999 100%); }\n  .app-products-x #nestable2 .dd-handle:hover {\n    background: #bbb; }\n  .app-products-x #nestable2 .dd-item > button:before {\n    color: #fff; }\n  \@media only screen and (min-width: 700px) {\n    .app-products-x .dd {\n      float: left;\n      width: 100%; }\n    .app-products-x .dd + .dd {\n      margin-left: 2%; } }\n  .app-products-x .dd-hover > .dd-handle {\n    background: #2ea8e5 !important; }\n  .app-products-x .dd3-content {\n    display: block;\n    margin: 5px 0;\n    padding: 5px 10px 5px 40px;\n    color: #333;\n    text-decoration: none;\n    font-weight: bold;\n    border: 1px solid #ccc;\n    background: #fafafa;\n    background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#eee));\n    background: linear-gradient(top, #fafafa 0%, #eee 100%);\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .app-products-x .dd3-content:hover {\n    color: #2ea8e5;\n    background: #fff; }\n  .app-products-x .dd-dragel > .dd3-item > .dd3-content {\n    margin: 0; }\n  .app-products-x .dd3-item > button {\n    margin-left: 30px; }\n  .app-products-x .dd3-handle {\n    position: absolute;\n    margin: 0;\n    left: 0;\n    top: 0;\n    cursor: pointer;\n    width: 30px;\n    text-indent: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    border: 1px solid #aaa;\n    background: #ddd;\n    background: -webkit-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -moz-linear-gradient(top, #ddd 0%, #bbb 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(#ddd), to(#bbb));\n    background: linear-gradient(top, #ddd 0%, #bbb 100%);\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .app-products-x .dd3-handle:before {\n    content: '≡';\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 3px;\n    width: 100%;\n    text-align: center;\n    text-indent: 0;\n    color: #fff;\n    font-size: 20px;\n    font-weight: normal; }\n  .app-products-x .dd3-handle:hover {\n    background: #ddd; }\n  .app-products-x .socialite {\n    display: block;\n    float: left;\n    height: 35px; }"; }
}

export { appProducts as AppProducts };

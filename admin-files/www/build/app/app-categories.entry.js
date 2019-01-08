/*! Built with http://stenciljs.com */
const { h } = window.App;

import { d as deleteFromPath, b as getFromPath, a as postDataFromPath, c as updateFromPath } from './chunk-1931ffef.js';
import { a as cloneDeep } from './chunk-b1f9a1ed.js';

class appCategories {
    constructor() {
        this.isReady = false;
        this.selectedLanguage = 'tr';
        this.formLanguage = 'tr';
        this.selectedFirstLevel = 0;
        this.productSectors = [];
        this.productCategories = [];
        this.productSystems = [];
        this.allCategories = [];
        this.renderedCategoryType = '';
        this.changeTrigger = false;
        this.categorySortable = {};
        this.systemSortable = {};
        this.choices = [];
        this.productIdObject = {};
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
                resp.forEach((item) => this.productIdObject[item._id] = item);
                this.calculateCategoryLevels();
            });
        });
    }
    componentDidUpdate() {
        if (this.sectorSortable)
            this.sectorSortable.destroy();
        const sectorEl = document.querySelector('.sector-wrapper');
        this.sectorSortable = new Sortable(sectorEl, {
            draggable: '.sector-draggable',
            holder: '.sector-draggable',
            onEnd: () => {
                const newSorts = this.sectorSortable.toArray();
                this.updateSortable(newSorts, 'sector');
            }
        });
        const categoryEls = document.querySelectorAll('.category-wrapper');
        if (categoryEls.length) {
            categoryEls.forEach((item, index) => {
                if (this.categorySortable[index])
                    this.categorySortable[index].destroy();
                this.categorySortable[index] = new Sortable(item, {
                    draggable: '.category-draggable',
                    holder: '.category-draggable',
                    onEnd: (ev) => {
                        const newSorts = this.categorySortable[ev.target.dataset.order].toArray();
                        this.updateSortable(newSorts, 'category');
                    }
                });
            });
        }
        const systemEls = document.querySelectorAll('.system-wrapper');
        if (systemEls.length) {
            systemEls.forEach((item) => {
                if (this.systemSortable[item.dataset.order])
                    this.systemSortable[item.dataset.order].destroy();
                this.systemSortable[item.dataset.order] = new Sortable(item, {
                    draggable: '.system-draggable',
                    holder: '.system-draggable',
                    onEnd: (ev) => {
                        const newSorts = this.systemSortable[ev.target.dataset.order].toArray();
                        this.updateSortable(newSorts, 'system');
                    }
                });
            });
        }
        this.initMediumEditor();
        this.initSelectors();
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
                this.detailRenderForm.languages[this.formLanguage].description = editable.innerHTML;
            });
        }
    }
    async updateSortable(newArray, type) {
        siiimpleToast.message('Sıra Güncelleniyor Lütfen Bekleyiniz...');
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        let counterType = 0;
        switch (type) {
            case 'sector':
                counterType = 1;
                break;
            case 'category':
                counterType = 2;
                break;
            case 'system':
                counterType = 3;
                break;
        }
        await asyncForEach(newArray, async (item, order) => {
            const categoryItem = this.allCategories.find(cat => cat._id === item);
            categoryItem.order = Number(`${counterType}${order}`);
            await updateFromPath(`product-categories/${item}`, categoryItem);
        });
        siiimpleToast.success('Sıra başarıyla güncellendi');
        this.changeTrigger = !this.changeTrigger;
    }
    async calculateCategoryLevels() {
        this.mapProductsToCategories();
        this.productSectors = await this.calculateProductSectors();
        this.mockRenderForm = {
            languages: {
                tr: {
                    title: 'Yeni Kategori İsmi',
                    path: '',
                    description: ''
                },
                en: {
                    title: 'New Category Name',
                    path: '',
                    description: ''
                }
            },
            title: 'Yeni Kategori',
            order: 0,
            parents: [],
            products: [],
            childs: [],
        };
        this.productCategories = await this.calculateProductCategories();
        this.productSystems = await this.calculateProductSystems();
        const x = this.calculateSectorCategories(this.productSectors[0]._id);
        if (x && x.length) {
            this.selectedCategoryId = this.calculateSectorCategories(this.productSectors[0]._id)[0]._id;
        }
        else {
            this.selectedCategoryId = null;
        }
        if (this.calculateCategorySystems(this.selectedCategoryId).length) {
            this.renderedCategoryType = 'sector';
            this.renderCategoryId = this.calculateCategorySystems(this.selectedCategoryId)[0]._id;
        }
        else {
            this.renderedCategoryType = 'category';
            this.renderCategoryId = this.selectedCategoryId;
        }
        this.isReady = true;
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
    async mapProductsToCategories() {
        /*    this.allCategories.forEach((category) => {
              category.products = [];
              this.products.forEach((product) => {
                if (product.categories.includes(category._id)) {
                  category.products.push(product._id)
                }
              })
            })
            async function asyncForEach(array, callback) {
              for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array)
              }
            }
    
            await asyncForEach(this.allCategories, async (item) => {
              siiimpleToast.message(`Kategori güncelleniyor ${item.languages.tr.title}`);
              await updateFromPath(`product-categories/${item._id}`, item);
              siiimpleToast.success(`Kategori güncellendi!!!! ${item.languages.tr.title}`);
            });*/
        console.log('Mapping Bitti', this.allCategories);
    }
    firstLevelClicked(sector, index) {
        this.selectedFirstLevel = index;
        this.detailRenderForm = sector;
        this.selectedCategoryId = this.calculateSectorCategories(sector._id)[0]._id;
        this.changeTrigger = !this.changeTrigger;
    }
    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    subLevelClicked(event, categoryInfo) {
        event.preventDefault();
        this.detailRenderForm = categoryInfo;
        this.selectedCategoryId = categoryInfo._id;
        this.changeTrigger = !this.changeTrigger;
    }
    sectorClicked(event, sectorInfo) {
        event.preventDefault();
        this.detailRenderForm = sectorInfo;
        this.renderCategoryId = sectorInfo._id;
        this.changeTrigger = !this.changeTrigger;
    }
    getProductsForSelected() {
        return this.allCategories.find(item => item._id === this.renderCategoryId);
    }
    getRenderedType() {
        switch (this.renderedCategoryType) {
            case 'category':
                return 'KATEGORİ';
            case 'sector':
                return 'SEKTÖR';
        }
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
    getParentsName(id) {
        let string = '';
        const item = this.productIdObject[id];
        if (item && item.parents && item.parents.length) {
            const ahoy = cloneDeep(item.parents);
            ahoy.reverse().forEach((parent, parIn) => {
                const parentItem = this.productIdObject[parent];
                if (parentItem && parentItem.languages) {
                    if (parIn > 0) {
                        string = `${parentItem.languages.tr.title} -> ${string}`;
                    }
                    else {
                        string = `${parentItem.languages.tr.title} ->`;
                    }
                }
            });
        }
        return string;
    }
    inputHandler(field, e) {
        if (field === 'productCode') {
            this.detailRenderForm.productCode = e.target.value;
        }
        else {
            this.detailRenderForm.languages[this.formLanguage][field] = e.target.value;
        }
        if (field === 'title') {
            let string = this.detailRenderForm.languages[this.formLanguage].title;
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
            this.detailRenderForm.languages[this.formLanguage].path = string.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            this.changeTrigger = !this.changeTrigger;
        }
    }
    inputChoosed(index, e) {
        this.detailRenderForm.parents[index] = e.target.value;
        this.changeTrigger = !this.changeTrigger;
    }
    removeCategory(index, e) {
        e.preventDefault();
        this.detailRenderForm.parents.splice(index, 1);
        this.changeTrigger = !this.changeTrigger;
    }
    addCategory() {
        this.detailRenderForm.parents.push(this.detailRenderForm.parents[this.detailRenderForm.parents.length - 1]);
        this.changeTrigger = !this.changeTrigger;
    }
    async updateDetails() {
        updateFromPath(`product-categories/${this.detailRenderForm._id}`, this.detailRenderForm)
            .then(() => {
            swal('Başarılı', 'Kategori detayı başarıyla güncellendi. Değişikliklerin efektif olması için sayfa yeniden yüklenecektir.', 'success').then(() => location.reload());
        });
    }
    async addDetails() {
        postDataFromPath(`product-categories`, this.detailRenderForm)
            .then(() => {
            swal('Başarılı', 'Kategori başarıyla eklendi. Değişikliklerin efektif olması için sayfa yeniden yüklenecektir.', 'success').then(() => location.reload());
        });
    }
    renderCategoryDetails() {
        if (typeof this.renderCategoryId !== undefined && this.detailRenderForm && this.isAdmin) {
            if (this.renderCategoryId !== null) {
                this.detailRenderForm = this.getProductsForSelected();
            }
            else {
                this.detailRenderForm = this.mockRenderForm;
            }
            if (!this.detailRenderForm.languages.en) {
                this.detailRenderForm.languages.en = cloneDeep(this.detailRenderForm.languages.tr);
            }
            return (h("div", { class: "section-products-body" },
                h("main", { class: "page-body" },
                    h("section", { class: "section-detail" },
                        h("div", { class: "section-detail-header" },
                            h("h3", null, this.detailRenderForm.languages[this.formLanguage].title),
                            h("br", null),
                            h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
                                h("button", { onClick: () => this.formLanguage = 'tr', type: "button", class: `btn btn-sm btn-outline-secondary ${this.formLanguage === 'tr' ? 'active' : ''}` }, "T\u00FCrk\u00E7e"),
                                h("button", { onClick: () => this.formLanguage = 'en', type: "button", class: `btn btn-sm btn-outline-secondary ${this.formLanguage === 'en' ? 'active' : ''}` }, "English"))),
                        h("div", { class: "section-detail-body" },
                            h("div", { class: "section-detail-item" },
                                h("form", null,
                                    h("div", { class: "section-detail-item-group" },
                                        h("div", { class: "form-group" },
                                            h("label", null, "Kategori \u0130smi"),
                                            h("input", { type: "text", class: "form-control", id: "categoryName", placeholder: "Kategori ismini yaz\u0131n\u0131z", value: this.detailRenderForm.languages[this.formLanguage].title, onInput: (e) => this.inputHandler('title', e) }),
                                            h("small", { class: "form-text text-muted" }, "Kategori ismini yaz\u0131n\u0131z. Bu isim web sitenizde kategori listesi alanlar\u0131nda g\u00F6r\u00FCnt\u00FClenecektir.")),
                                        h("div", { class: "form-group" },
                                            h("label", null, "Kategori URL"),
                                            h("input", { type: "text", class: "form-control", id: "categorySlug", placeholder: "Kategori URL'si otomatik olu\u015Fur", value: this.detailRenderForm.languages[this.formLanguage].path, readonly: true }),
                                            h("small", { class: "form-text text-muted" }, "Bu alan\u0131 siz de\u011Fi\u015Ftiremezsiniz, yazd\u0131\u011F\u0131n\u0131z kategori ismine g\u00F6re otomatik olu\u015Fur.")),
                                        h("div", { class: "section-detail-item-group" },
                                            h("div", { class: "form-group" },
                                                h("label", null, "Kategori A\u00E7\u0131klamas\u0131"),
                                                h("div", { innerHTML: this.detailRenderForm.languages[this.formLanguage].description, class: "form-control mediumeditor", id: "categoryDesc" }))),
                                        h("div", { class: "form-group" },
                                            h("label", null, "Kategori Hiyerar\u015Fisi"),
                                            h("small", { class: "form-text text-muted", id: "categoryTree" },
                                                h("b", null, "\u00D6NEML\u0130!"),
                                                " Kategorinin bulunmas\u0131n\u0131 istedi\u011Finiz t\u00FCm derinlikleri s\u0131ra ile eksiksiz girmeniz gerekmektedir."),
                                            h("br", null),
                                            this.detailRenderForm.parents.map((parent, index) => {
                                                return (h("div", { key: `${Date.now()}${Math.random()}`, class: "form-group row" },
                                                    h("div", { class: "col-10" },
                                                        h("select", { onChange: (e) => this.inputChoosed(index, e), class: "form-control custom-select", name: "choices-single-custom-templates" }, this.allCategories.map((item) => {
                                                            if (item && item._id) {
                                                                return (h("option", { selected: parent === item._id, value: item._id }, item.languages[this.selectedLanguage].title));
                                                            }
                                                        }))),
                                                    h("div", { class: "col-2" },
                                                        h("a", { class: "btn btn-danger text-white", onClick: (e) => this.removeCategory(index, e) }, " Sil "))));
                                            })),
                                        h("a", { class: "btn btn-success", onClick: () => this.addCategory() }, "Kategori \u0130li\u015Fkisi Ekle"))))),
                        h("div", { class: "section-detail-footer" },
                            this.renderCategoryId === null
                                ? ''
                                : (h("a", { onClick: this.deleteItem.bind(this), class: "btn btn-danger" }, "Kategoriyi Sil")),
                            this.renderCategoryId === null
                                ? (h("a", { onClick: this.addDetails.bind(this), class: "btn btn-primary" }, "Yeni Kategori Olu\u015Ftur"))
                                : (h("a", { onClick: this.updateDetails.bind(this), class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet"))))),
                h("footer", { class: "page-footer" })));
        }
    }
    calculateSectorCategories(id) {
        return this.productCategories.filter(category => category.parents.includes(id));
    }
    calculateCategorySystems(id) {
        return this.productSystems.filter(system => system.parents.includes(id));
    }
    renderAsideMenu() {
        return (h("aside", { class: "section-products-aside" },
            h("div", { class: "fix-list-group-wrapper" },
                h("ul", { class: "list-group fix-list-group sector-wrapper" }, this.sortByKey(this.productSectors, 'order').map((sector, index) => {
                    return (h("li", { class: "list-group-item fix-list-group-item sector-draggable", key: `${Date.now()}-${index}`, "data-id": sector._id },
                        h("div", { class: "row fix-list-group-row" },
                            h("div", { class: "col-md-auto row-number" }, index + 1),
                            h("div", { class: "col" },
                                h("a", { class: "", "data-toggle": "collapse", href: '#sectorCollapse' + index, role: "button", onClick: (e) => {
                                        this.renderCategoryId = sector._id;
                                        this.firstLevelClicked(sector, index);
                                        e.preventDefault();
                                    }, "aria-expanded": "false", "aria-controls": "sectorCollapse1" }, sector.languages[this.selectedLanguage].title))),
                        h("div", { class: `collapse fix-list-group-collapse ${this.selectedFirstLevel === index ? 'show' : ''}`, id: "sectorCollapse" + index },
                            h("ul", { class: `list-group fix-list-group category-wrapper`, "data-order": index }, this.sortByKey(this.calculateSectorCategories(sector._id), 'order').map((subcategory, subIndex) => {
                                return (h("li", { class: `list-group-item category-draggable fix-list-group-item ${this.selectedCategoryId === subcategory._id ? 'active' : ''}`, "data-id": subcategory._id },
                                    h("div", { class: "row fix-list-group-row" },
                                        h("div", { class: "col-md-auto row-number" },
                                            index + 1,
                                            ".",
                                            subIndex + 1),
                                        h("div", { class: "col" },
                                            h("a", { onClick: (e) => {
                                                    this.renderCategoryId = subcategory._id;
                                                    this.subLevelClicked(e, subcategory);
                                                    e.preventDefault();
                                                }, class: "", href: "" }, subcategory.languages[this.selectedLanguage].title))),
                                    this.calculateCategorySystems(subcategory._id).length
                                        ? (h("div", { class: `fix-list-group-collapse collapse ${this.selectedCategoryId === subcategory._id ? 'show' : ''}`, id: `sectorCollapse${index}${subIndex}` },
                                            h("ul", { class: "list-group fix-list-group system-wrapper", "data-order": `${index}${subIndex}` }, this.sortByKey(this.calculateCategorySystems(subcategory._id), 'order').map((system, systemIndex) => {
                                                return (h("li", { class: `list-group-item fix-list-group-item  system-draggable`, "data-id": system._id },
                                                    h("div", { class: "row fix-list-group-row" },
                                                        h("div", { class: "col-md-auto row-number" },
                                                            index + 1,
                                                            ".",
                                                            subIndex + 1,
                                                            ".",
                                                            systemIndex + 1),
                                                        h("div", { class: "col" },
                                                            h("a", { onClick: (e) => {
                                                                    this.sectorClicked(e, system);
                                                                    e.preventDefault();
                                                                }, href: '' }, system.languages[this.selectedLanguage].title)))));
                                            }))))
                                        : ''));
                            })))));
                })))));
    }
    deleteItem() {
        if (this.detailRenderForm.products.length) {
            swal('Hata', 'İçerisinde ürün olan kategorileri silemezsiniz. Bu işlemi yapmadan önce ilgili ürünleri başka kategoriye taşıyabilir ya da silebilirsiniz.', 'error');
            return;
        }
        swal({
            title: "Silmek istediğinize emin misiniz?",
            text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
            if (willDelete) {
                deleteFromPath(`product-categories/${this.detailRenderForm._id}`)
                    .then(() => {
                    swal("Kayıt başarıyla silindi", 'Kategori düzeninin aktif olabilmesi için sayfa yeniden yüklenecektir', 'success').then(() => location.reload());
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
    render() {
        if (this.isReady) {
            return (h("div", { class: "app-products" },
                h("header", { class: "page-header" },
                    h("div", { class: "page-header-body" },
                        h("div", { class: "page-header-title" },
                            h("h1", null, "Kategoriler"),
                            h("p", null, "Kategorilerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")),
                        h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { onClick: () => this.renderCategoryId = null, class: "btn btn-secondary" }, "Yeni Kategori Ekle")) : ''))),
                h("main", { class: "page-body" },
                    h("section", { class: "section-products" },
                        this.renderAsideMenu(),
                        this.renderCategoryDetails())),
                h("footer", { class: "page-footer" })));
        }
    }
    static get is() { return "app-categories"; }
    static get properties() { return {
        "changeTrigger": {
            "state": true
        },
        "formLanguage": {
            "state": true
        },
        "history": {
            "type": "Any",
            "attr": "history"
        },
        "isReady": {
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
    static get style() { return ""; }
}

export { appCategories as AppCategories };

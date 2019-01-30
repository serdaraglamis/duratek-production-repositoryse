const h = window.App.h;

import { b as getFromPath, c as updateFromPath } from './chunk-cc9391f5.js';
import { a as createCommonjsModule, c as unwrapExports } from './chunk-84ac4f31.js';
import { a as cloneDeep } from './chunk-597c4635.js';

var vdom = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const stack = [];
function h(nodeName, vnodeData) {
    let children = null;
    let lastSimple = false;
    let simple = false;
    let i = arguments.length;
    let vkey;
    let vname;
    for (; i-- > 2;) {
        stack.push(arguments[i]);
    }
    while (stack.length > 0) {
        let child = stack.pop();
        if (child && child.pop !== undefined) {
            for (i = child.length; i--;) {
                stack.push(child[i]);
            }
        }
        else {
            if (typeof child === 'boolean') {
                child = null;
            }
            if ((simple = typeof nodeName !== 'function')) {
                if (child == null) {
                    child = '';
                }
                else if (typeof child === 'number') {
                    child = String(child);
                }
                else if (typeof child !== 'string') {
                    simple = false;
                }
            }
            if (simple && lastSimple) {
                children[children.length - 1].vtext += child;
            }
            else if (children === null) {
                children = [simple ? { vtext: child } : child];
            }
            else {
                children.push(simple ? { vtext: child } : child);
            }
            lastSimple = simple;
        }
    }
    if (vnodeData != null) {
        // normalize class / classname attributes
        if (vnodeData['className']) {
            vnodeData['class'] = vnodeData['className'];
        }
        if (typeof vnodeData['class'] === 'object') {
            for (i in vnodeData['class']) {
                if (vnodeData['class'][i]) {
                    stack.push(i);
                }
            }
            vnodeData['class'] = stack.join(' ');
            stack.length = 0;
        }
        if (vnodeData.key != null) {
            vkey = vnodeData.key;
        }
        if (vnodeData.name != null) {
            vname = vnodeData.name;
        }
    }
    if (typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData, children || [], utils);
    }
    return {
        vtag: nodeName,
        vchildren: children,
        vtext: undefined,
        vattrs: vnodeData,
        vkey: vkey,
        vname: vname,
        elm: undefined,
        ishost: false
    };
}
const utils = {
    'forEach': (children, cb) => children.forEach(cb),
    'map': (children, cb) => children.map(cb)
};

exports.h = h;
});

unwrapExports(vdom);
var vdom_1 = vdom.h;

class appPageComponentEdit {
    constructor() {
        this.selectedLanguage = 'tr';
        this.isReady = false;
        this.changeTrigger = false;
        this.formName = 'Komponent';
        this.updateMode = false;
        this.updateIndex = 0;
        this.pageData = {
            components: [],
        };
        this.slimArrays = [];
        this.fillData = {
            tr: {
                array: {}
            },
            en: {
                array: {}
            }
        };
        this.mocker = {};
    }
    componentWillLoad() {
        this.pageId = this.match.params.id;
        this.componentIndex = this.match.params.index;
        getFromPath(`pages/${this.pageId}`)
            .then(res => {
            this.pageData = res;
            getFromPath(`components/${this.pageData.components[this.componentIndex]._id}`)
                .then(componentSrc => {
                this.schemas = componentSrc.Schema;
                this.prepareFillData();
            });
        });
    }
    prepareFillData() {
        this.fillData[this.selectedLanguage] = {};
        this.fillData.en = {};
        this.schemas.forEach((item) => {
            switch (item.type) {
                case 'string':
                case 'select':
                case 'textarea':
                    this.fillData[this.selectedLanguage][item.standsFor] = '';
                    this.fillData.en[item.standsFor] = '';
                    break;
                case 'array':
                    this.fillData[this.selectedLanguage][item.standsFor] = [];
                    this.fillData.en[item.standsFor] = [];
                    break;
                default:
                    this.fillData[this.selectedLanguage][item.standsFor] = {};
                    this.fillData.en[item.standsFor] = {};
                    break;
            }
        });
        if (this.pageData.components[this.componentIndex].data) {
            this.fillData = this.pageData.components[this.componentIndex].data;
            if (!this.fillData.en) {
                this.fillData.en = this.fillData.tr;
            }
        }
        this.setMockSchema();
        this.isReady = true;
    }
    setMockSchema() {
        this.mocker[this.selectedLanguage] = {};
        this.mocker.en = {};
        this.schemas.forEach((item) => {
            switch (item.type) {
                case 'string':
                case 'select':
                case 'textarea':
                    this.mocker[this.selectedLanguage][item.standsFor] = '';
                    this.mocker.en[item.standsFor] = '';
                    break;
                case 'array':
                    this.mocker[this.selectedLanguage][item.standsFor] = {};
                    this.mocker.en[item.standsFor] = {};
                    break;
                default:
                    this.mocker.en[item.standsFor] = {};
                    this.mocker.tr[item.standsFor] = {};
                    break;
            }
        });
    }
    changeLanguage(language) {
        this.selectedLanguage = language;
    }
    inputHandler(target, event) {
        this.fillData[this.selectedLanguage][target] = event.target.value;
    }
    inputChoosed(target, e) {
        this.fillData[this.selectedLanguage][target] = e.target.value;
    }
    imageUploaderPromise(scope) {
        return new Promise((success) => {
            scope.upload((error, data, response) => {
                console.warn(error, data);
                // Done uploading!
                success(response);
            });
        });
    }
    mockInputChoosed(schema, target, e) {
        this.mocker[this.selectedLanguage][schema][target] = e.target.value;
    }
    mockInpuHandler(schema, target, e) {
        this.mocker[this.selectedLanguage][schema][target] = e.target.value;
    }
    componentWillUpdate() {
        this.slimArrays.forEach(item => item.destroy());
        this.slimArrays = [];
    }
    async addMockToData(e, mockData, dataPath) {
        siiimpleToast.message('Resim Yükleniyor, lütfen bekleyin...');
        e.preventDefault();
        async function asyncForEach(array, callback) {
            for (let index$$1 = 0; index$$1 < array.length; index$$1++) {
                await callback(array[index$$1], index$$1, array);
            }
        }
        await asyncForEach(this.slimArrays, async (item) => {
            if (item._originalElement.dataset.objlevel === 'sub' && !item._state.includes('empty')) {
                await this.imageUploaderPromise(item);
            }
        });
        let currents = cloneDeep(this.fillData[this.selectedLanguage][dataPath]);
        currents.push(cloneDeep(mockData));
        this.fillData[this.selectedLanguage][dataPath] = currents;
        this.changeTrigger = !this.changeTrigger;
        siiimpleToast.success('İçerik başarıyla eklendi...');
        this.setMockSchema();
        //dataPath.push[mockPath];
    }
    async updateMockToData(e, mockData, dataPath, update = false) {
        siiimpleToast.message('lütfen bekleyin...');
        e.preventDefault();
        async function asyncForEach(array, callback) {
            for (let index$$1 = 0; index$$1 < array.length; index$$1++) {
                await callback(array[index$$1], index$$1, array);
            }
        }
        await asyncForEach(this.slimArrays, async (item) => {
            if (item._originalElement.dataset.objlevel === 'sub' && !item._state.includes('empty')) {
                await this.imageUploaderPromise(item);
            }
        });
        let currents = cloneDeep(this.fillData[this.selectedLanguage][dataPath]);
        currents[this.updateIndex] = cloneDeep(mockData);
        this.fillData[this.selectedLanguage][dataPath] = currents;
        this.changeTrigger = !this.changeTrigger;
        siiimpleToast.success('İçerik başarıyla eklendi...');
        this.updateMode = false;
        this.updateIndex = 0;
        this.setMockSchema();
        if (update) {
            this.updateDetails();
        }
        //dataPath.push[mockPath];
    }
    async updateDetails() {
        siiimpleToast.message('Resim Yükleniyor, lütfen bekleyin...');
        async function asyncForEach(array, callback) {
            for (let index$$1 = 0; index$$1 < array.length; index$$1++) {
                await callback(array[index$$1], index$$1, array);
            }
        }
        await asyncForEach(this.slimArrays, async (item) => {
            if (item._originalElement.dataset.objlevel === 'main' && !item._state.includes('empty')) {
                await this.imageUploaderPromise(item);
            }
        });
        this.pageData.components[this.componentIndex].data = this.fillData;
        updateFromPath(`pages/${this.match.params.id}`, this.pageData)
            .then(() => {
            swal('Başarılı', this.formName + ' detayı başarıyla güncellendi!', 'success').then(() => this.history.goBack());
        });
    }
    componentDidUpdate() {
        if (this.sortableSchema) {
            const sortableEl = document.querySelector('.sortable-wrapper');
            if (sortableEl) {
                this.sortable = new Sortable(sortableEl, {
                    draggable: '.sortable-item',
                    onEnd: () => {
                        const newSorts = this.sortable.toArray();
                        const currentItems = cloneDeep(this.fillData[this.selectedLanguage][this.sortableSchema]);
                        let newArray = [];
                        newSorts.forEach(id => newArray.push(currentItems[Number(id)]));
                        this.fillData[this.selectedLanguage][this.sortableSchema] = cloneDeep(newArray);
                        this.changeTrigger = !this.changeTrigger;
                        siiimpleToast.message('Sıra değiştirildi...');
                    }
                });
            }
        }
        window['currentScope'] = this;
        this.initSlimCroppers();
        this.initMediumEditors();
    }
    initMediumEditors() {
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
                const path = event.target.dataset.object;
                const language = event.target.dataset.language;
                const pathArray = path.split('/');
                if (pathArray.length === 3) {
                    window['currentScope'][pathArray[0]][language][pathArray[1]][pathArray[2]] = editable.innerHTML;
                }
                if (pathArray.length === 2) {
                    window['currentScope'][pathArray[0]][language][pathArray[1]] = editable.innerHTML;
                }
            });
        }
    }
    initSlimCroppers() {
        const cropperElements = document.querySelectorAll('.slim-initter');
        cropperElements.forEach(item => {
            const currentSrc = item.dataset.current;
            const widthS = item.dataset.x;
            const heightS = item.dataset.y;
            const croptype = item.dataset.croptype;
            let config = {
                crop: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },
                defaultInputName: 'image',
                service: `${window['apiBase']}api/upload`,
                download: false,
                willSave: function (data, ready) {
                    ready(data);
                },
                didUpload: function (res1, res2, result) {
                    console.log('Did Upload', res1, res2, result);
                    const path = this._originalElement.dataset.object;
                    const pathArray = path.split('/');
                    if (pathArray.length === 3) {
                        window['currentScope'][pathArray[0]][window['currentScope'].selectedLanguage][pathArray[1]][pathArray[2]] = `${window['apiBase']}${result.path}`;
                    }
                    if (pathArray.length === 2) {
                        window['currentScope'][pathArray[0]][window['currentScope'].selectedLanguage][pathArray[1]] = `${window['apiBase']}${result.path}`;
                    }
                },
                label: 'Resminizi buraya tıklayarak ya da sürükleyip bırakarak yukleyebilirsiniz.',
                buttonConfirmLabel: 'Tamam',
                buttonCancelLabel: 'İptal'
            };
            if (croptype === 'size') {
                config.size = `${widthS},${heightS}`;
            }
            else if (croptype === 'aspectratio') {
                config.ratio = `${widthS}:${heightS}`;
            }
            this.slimArrays.push(new Slim(item, config));
            if (currentSrc) {
                this.slimArrays[this.slimArrays.length - 1].load(currentSrc);
            }
            window['slimArrays'] = this.slimArrays;
        });
    }
    renderFormData() {
        return (vdom_1("main", { class: "page-body" },
            vdom_1("section", { class: "section-detail" },
                vdom_1("div", { class: "section-detail-header" },
                    vdom_1("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
                        vdom_1("button", { onClick: () => this.changeLanguage('tr'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'tr' ? 'active' : ''} ` }, "T\u00FCrk\u00E7e"),
                        vdom_1("button", { onClick: () => this.changeLanguage('en'), type: "button", class: `btn btn-sm btn-outline-secondary ${this.selectedLanguage === 'en' ? 'active' : ''} ` }, "English"))),
                vdom_1("div", { class: "section-detail-body" },
                    vdom_1("div", { class: "section-detail-item" },
                        vdom_1("form", null,
                            vdom_1("div", { class: "section-detail-item-group" }, this.schemas.map((schema) => {
                                switch (schema.type) {
                                    case 'string':
                                        return (vdom_1("div", { class: "form-group", key: `${Date.now()}-${Math.random()}` },
                                            vdom_1("label", null, schema.name),
                                            vdom_1("input", { value: this.fillData[this.selectedLanguage][schema.standsFor], onInput: (e) => this.inputHandler(schema.standsFor, e), type: "text", class: "form-control", id: "modalEventName", placeholder: schema.standsFor })));
                                    case 'image':
                                        return (vdom_1("div", { class: "section-detail-item-group" },
                                            vdom_1("div", { class: "form-group" },
                                                vdom_1("label", null, schema.name),
                                                vdom_1("div", { class: "section-detail-item-group-image" },
                                                    vdom_1("input", { "data-croptype": schema.croptype, "data-x": schema.sizeX, "data-y": schema.sizeY, name: "image", type: "file", class: "slim-initter", "data-objlevel": "main", "data-object": `fillData/${schema.standsFor}`, "data-id": `image-sub-${schema.standsFor}`, "data-current": this.fillData[this.selectedLanguage][schema.standsFor] })),
                                                vdom_1("div", { class: "custom-file" },
                                                    vdom_1("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir.")))));
                                    case 'textarea':
                                        return (vdom_1("div", { class: "form-group", key: `${Date.now()}-${Math.random()}` },
                                            vdom_1("label", null, schema.name),
                                            vdom_1("div", { innerHTML: this.fillData[this.selectedLanguage][schema.standsFor], "data-object": `fillData/${schema.standsFor}`, "data-language": this.selectedLanguage, class: "form-control mediumeditor" })));
                                    case 'select':
                                        return (vdom_1("div", { class: "form-group" },
                                            vdom_1("label", null, schema.name),
                                            vdom_1("select", { onChange: (e) => this.inputChoosed(schema.standsFor, e), class: "form-control custom-select", name: "choices-single-custom-templates" },
                                                vdom_1("option", { value: "" }, "L\u00FCtfen Se\u00E7iniz"),
                                                schema.options.map((item) => {
                                                    return (vdom_1("option", { selected: this.fillData[this.selectedLanguage][schema.standsFor] === item.value, value: item.value }, item.name));
                                                }))));
                                    case 'array':
                                        return (vdom_1("div", { class: "form-group" },
                                            vdom_1("label", null, schema.name),
                                            schema.subFields.map((sub) => {
                                                switch (sub.type) {
                                                    case 'string':
                                                        return (vdom_1("div", { class: "form-group" },
                                                            vdom_1("label", null, sub.name),
                                                            vdom_1("input", { onInput: (e) => this.mockInpuHandler(schema.standsFor, sub.standsFor, e), class: "form-control", placeholder: sub.standsFor, value: this.mocker[this.selectedLanguage][schema.standsFor][sub.standsFor] }),
                                                            vdom_1("hr", null)));
                                                    case 'textarea':
                                                        return (vdom_1("div", { class: "form-group", key: `${Date.now()}-${Math.random()}` },
                                                            vdom_1("label", null, sub.name),
                                                            vdom_1("div", { innerHTML: this.mocker[this.selectedLanguage][schema.standsFor][sub.standsFor], "data-object": `mocker/${schema.standsFor}/${sub.standsFor}`, "data-language": this.selectedLanguage, class: "form-control mediumeditor" })));
                                                    case 'image':
                                                        return (vdom_1("div", { class: "section-detail-item-group" },
                                                            vdom_1("div", { class: "form-group" },
                                                                vdom_1("label", null, sub.name),
                                                                vdom_1("div", { class: "section-detail-item-group-image" },
                                                                    vdom_1("input", { "data-croptype": schema.croptype, "data-x": sub.sizeX, "data-y": sub.sizeY, name: "image", type: "file", class: "slim-initter", "data-objlevel": "sub", "data-object": `mocker/${schema.standsFor}/${sub.standsFor}`, "data-id": `image-sub-${schema.standsFor}-${sub.standsFor}`, "data-current": this.mocker[this.selectedLanguage][schema.standsFor][sub.standsFor] })),
                                                                vdom_1("div", { class: "custom-file" },
                                                                    vdom_1("small", { class: "form-text text-muted" }, "Tavsiye edilen foto\u011Fraf ebad\u0131: ...x...px, kabul edilen dosya formatlar\u0131 .jpg, .jpeg ve .png'dir.")))));
                                                    case 'select':
                                                        this.sortableSchema = schema.standsFor;
                                                        return (vdom_1("div", { class: "form-group", key: `${Date.now()}-${Math.random()}` },
                                                            vdom_1("label", null, sub.name),
                                                            vdom_1("select", { onChange: (e) => this.mockInputChoosed(schema.standsFor, sub.standsFor, e), class: "form-control custom-select", name: "choices-single-custom-templates" },
                                                                vdom_1("option", { value: "" }, "L\u00FCtfen Se\u00E7iniz"),
                                                                sub.options.map((item) => {
                                                                    return (vdom_1("option", { selected: this.mocker[this.selectedLanguage][schema.standsFor][sub.standsFor] === item.value, value: item.value }, item.name));
                                                                }))));
                                                }
                                            }),
                                            vdom_1("button", { class: "btn btn-success", onClick: (e) => this.addMockToData(e, this.mocker[this.selectedLanguage][schema.standsFor], schema.standsFor) }, "BUNU EKLE"),
                                            this.updateMode ? (vdom_1("button", { class: "btn btn-success", onClick: (e) => this.updateMockToData(e, this.mocker[this.selectedLanguage][schema.standsFor], schema.standsFor, true) }, "SECILENI GUNCELLE")) : '',
                                            vdom_1("div", { class: "row" },
                                                vdom_1("div", { class: "col-sm-3" },
                                                    vdom_1("div", { class: "panel panel-success" },
                                                        vdom_1("div", { class: "panel-heading" }),
                                                        vdom_1("div", { class: "panel-body" },
                                                            vdom_1("ul", { class: "list-group sortable-wrapper", key: `${Date.now()}-${Math.random()}` }, this.fillData[this.selectedLanguage][schema.standsFor].map((item, itIndex) => {
                                                                return (vdom_1("li", { class: "list-group-item sortable-item", "data-id": itIndex },
                                                                    vdom_1("div", null,
                                                                        schema.showType === 'innerHTML'
                                                                            ? (vdom_1("a", { onClick: () => {
                                                                                    this.mocker[this.selectedLanguage][schema.standsFor] = cloneDeep(item);
                                                                                    this.updateMode = true;
                                                                                    this.updateIndex = itIndex;
                                                                                    this.changeTrigger = !this.changeTrigger;
                                                                                } },
                                                                                itIndex + 1,
                                                                                " -) ",
                                                                                vdom_1("div", { innerHTML: item[schema.showKey] })))
                                                                            : (vdom_1("a", { onClick: () => {
                                                                                    this.mocker[this.selectedLanguage][schema.standsFor] = cloneDeep(item);
                                                                                    this.updateMode = true;
                                                                                    this.updateIndex = itIndex;
                                                                                    this.changeTrigger = !this.changeTrigger;
                                                                                } },
                                                                                itIndex + 1,
                                                                                " -) ",
                                                                                item[schema.showKey])),
                                                                        vdom_1("span", { onClick: () => {
                                                                                this.fillData[this.selectedLanguage][schema.standsFor].splice(itIndex, 1);
                                                                                this.changeTrigger = !this.changeTrigger;
                                                                            }, style: { color: 'red' }, class: "badge pull-right" }, "Sil"))));
                                                            }))))))));
                                }
                            }))))),
                vdom_1("div", { class: "section-detail-footer" },
                    vdom_1("a", { onClick: () => history.back(), role: "button", class: "btn btn-secondary" }, "\u0130ptal"),
                    vdom_1("a", { onClick: this.updateDetails.bind(this), role: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet")))));
    }
    render() {
        if (this.isReady) {
            return (vdom_1("div", { class: "app-page-component-edit" }, this.renderFormData()));
        }
    }
    static get is() { return "app-page-component-edit"; }
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
        "selectedLanguage": {
            "state": true
        }
    }; }
    static get style() { return ".app-page-component-edit .list-group-item {\n  width: 100%;\n  min-width: 600px;\n  display: block; }\n\n.app-page-component-edit .list-group {\n  margin-top: 50px; }"; }
}

export { appPageComponentEdit as AppPageComponentEdit };

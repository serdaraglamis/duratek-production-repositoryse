App.loadBundle('app-top-menu', ['exports', './chunk-f83566b1.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var appTopMenu = /** @class */ (function () {
        function appTopMenu() {
            this.contentChanged = false;
            this.currentLanguage = 'tr';
            this.editableIndex = null;
            this.isAdmin = false;
        }
        appTopMenu.prototype.componentWillLoad = function () {
            var _this = this;
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
            }
            //window['scrollTo'](0, 0)
            __chunk_1.getFromPath('datasource/menu/5b1d012c93b558297ceb8e43')
                .then(function (resp) {
                console.log('MENÜ GELDİ', resp);
                _this.pageData = resp;
            });
        };
        appTopMenu.prototype.componentDidUpdate = function () {
            var _this = this;
            var el = document.querySelector('.list-group');
            this.sortable = new Sortable(el, {
                handle: '.holder',
                draggable: '.sortable',
                onEnd: function (ev) {
                    console.log('On End', ev, _this);
                    var newArray = [];
                    var newSorts = _this.sortable.toArray();
                    for (var i = 0; i < _this.pageData.languages[_this.currentLanguage].length; i++) {
                        newArray.push(_this.pageData.languages[_this.currentLanguage][Number(newSorts[i])]);
                        console.log('Item Geldi', newArray, _this.pageData.languages[_this.currentLanguage]);
                    }
                    _this.pageData.languages[_this.currentLanguage] = newArray;
                    _this.updateData('drag');
                }
            });
            console.log('Updated', this);
        };
        appTopMenu.prototype.updateData = function (mode) {
            var _this = this;
            console.log('Update Data Geldi');
            __chunk_1.updateFromPath("datasource/menu/5b1d012c93b558297ceb8e43", this.pageData)
                .then(function () {
                console.log('Güncellendi');
                _this.editableIndex = null;
                if (mode === 'drag') {
                    siiimpleToast.success('Sıra başarıyla güncellendi');
                }
                _this.contentChanged = !_this.contentChanged;
            });
        };
        appTopMenu.prototype.renderList = function () {
            var _this = this;
            console.log('PAGE DATA', this.pageData);
            return this.pageData.languages[this.currentLanguage].map(function (item, index) {
                return (h("li", { class: "list-group-item fix-list-group-item sortable", key: Date.now() + "-" + index, "data-id": index }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1), _this.editableIndex === index
                    ? (h("div", { class: "col-2" }, h("input", { type: "email", class: "form-control", id: "", placeholder: "Menu Yolu", onInput: function (e) { return item.path = e.target.value; }, value: item.path })))
                    : (h("div", { class: "col-2" }, item.path)), _this.editableIndex === index
                    ? (h("div", { class: "col" }, h("input", { type: "email", class: "form-control", id: "", placeholder: "Menu \u0130smi", onInput: function (e) { return item.name = e.target.value; }, value: item.name })))
                    : (h("div", { class: "col" }, item.name)), _this.editableIndex === index
                    ? (h("div", { class: "col-4 settings" }, h("a", { onClick: _this.updateData.bind(_this), title: "", class: "btn btn-sm btn-success" }, "Sakla"), h("a", { onClick: function () { return _this.editableIndex = null; }, title: "", class: "btn btn-sm btn-danger" }, "\u0130ptal")))
                    : (h("div", { class: "col-4 settings" }, _this.isAdmin ? (h("a", { onClick: function () { return _this.editableIndex = index; }, title: "", class: "btn btn-sm btn-primary" }, h("span", { class: "fix-settings-2" }))) : '', h("a", { href: "javascript:void(0)", class: "btn btn-sm btn-dark holder", title: "S\u0131ras\u0131n\u0131 De\u011Fi\u015Ftir", "data-toggle": "tooltip" }, h("span", { class: "fix-hamburger-md" })))))));
            });
        };
        appTopMenu.prototype.render = function () {
            var _this = this;
            if (this.pageData) {
                return (h("div", { class: "app-events" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Men\u00FC"), h("p", null, "Men\u00FCy\u00FC g\u00F6r\u00FCnt\u00FCleyebilir ve d\u00FCzenleyebilirsiniz."))), h("div", { class: "page-header-options" }, this.currentLanguage === 'tr'
                    ? (h("button", { class: "btn btn-secondary", onClick: function () { return _this.currentLanguage = 'en'; } }, "\u0130ngilizceye \u00C7evir"))
                    : (h("button", { class: "btn btn-secondary", onClick: function () { return _this.currentLanguage = 'tr'; } }, "T\u00FCrk\u00E7eye \u00C7evir")))), h("main", { class: "page-body" }, h("section", null, h("ul", { class: "list-group fix-list-group" }, h("li", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col-2" }, "Sayfa Yolu"), h("div", { class: "col" }, "Sayfa \u0130smi"), h("div", { class: "col-2 settings" }, "Ayarlar"))), this.renderList()))), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appTopMenu, "is", {
            get: function () { return "app-top-menu"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appTopMenu, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appTopMenu, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appTopMenu;
    }());
    exports.AppTopMenu = appTopMenu;
    Object.defineProperty(exports, '__esModule', { value: true });
});

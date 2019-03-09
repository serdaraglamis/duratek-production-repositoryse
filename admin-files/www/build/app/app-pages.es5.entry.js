App.loadBundle('app-pages', ['exports', './chunk-3e396618.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var appPages = /** @class */ (function () {
        function appPages() {
            this.contentChanged = false;
            this.isAdmin = false;
        }
        appPages.prototype.componentWillLoad = function () {
            var _this = this;
            var userRole = localStorage.getItem('userrole');
            if (userRole === 'admin') {
                this.isAdmin = true;
            }
            else {
                siiimpleToast.alert('İçerikleri düzenleme için yetkiniz yoktur. Salt görüntülenme modu etkinleştirildi');
            }
            //window['scrollTo'](0, 0)
            this.store.mapStateToProps(this, function (state) {
                var currentLanguage = state.app.currentLanguage;
                return {
                    currentLanguage: currentLanguage
                };
            });
            __chunk_1.getFromPath('pages')
                .then(function (resp) {
                _this.pageData = resp;
            });
        };
        appPages.prototype.deleteItem = function (id) {
            var _this = this;
            swal({
                title: "Silmek istediğinize emin misiniz?",
                text: "Eğer bu kaydı silerseniz, bir daha geri dönmeniz mümkün olmayacaktır",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(function (willDelete) {
                if (willDelete) {
                    __chunk_1.deleteFromPath("datasource/events/" + id)
                        .then(function () {
                        __chunk_1.getFromPath('datasource/events')
                            .then(function (resp) {
                            _this.pageData = resp;
                            swal("Kayıt başarıyla silindi", {
                                icon: "success",
                            });
                        });
                    })
                        .catch(function () {
                        swal("Kayıt silinirken bir hata oluştu", {
                            icon: "error",
                        });
                    });
                }
                else {
                    console.warn('Canceled');
                }
            });
        };
        appPages.prototype.renderList = function () {
            var _this = this;
            return this.pageData.map(function (item, index) {
                var page = item.languages[_this.currentLanguage];
                return (h("li", { class: "list-group-item fix-list-group-item" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1), h("div", { class: "col-2" }, page.path), h("div", { class: "col" }, page.name), h("div", { class: "col-2 settings" }, _this.isAdmin
                    ? (h("a", { onClick: function () { return _this.history.push("/pages/" + item._id); }, title: "", class: "btn btn-sm btn-primary" }, h("span", { class: "fix-settings-2" })))
                    : ''))));
            });
        };
        appPages.prototype.render = function () {
            if (this.pageData) {
                return (h("div", { class: "app-events" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Sayfalar"), h("p", null, "Sayfalar\u0131n\u0131z\u0131 g\u00F6r\u00FCnt\u00FCleyebilir ve d\u00FCzenleyebilirsiniz.")))), h("main", { class: "page-body" }, h("section", null, h("ul", { class: "list-group fix-list-group" }, h("li", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col-2" }, "Sayfa Yolu"), h("div", { class: "col" }, "Sayfa \u0130smi"), h("div", { class: "col-2 settings" }, "Ayarlar"))), this.renderList()))), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appPages, "is", {
            get: function () { return "app-pages"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPages, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPages, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appPages;
    }());
    exports.AppPages = appPages;
    Object.defineProperty(exports, '__esModule', { value: true });
});

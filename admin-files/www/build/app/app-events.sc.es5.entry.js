/*! Built with http://stenciljs.com */
App.loadBundle('app-events', ['exports', './chunk-ac6932ea.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var appEvents = /** @class */ (function () {
        function appEvents() {
            this.contentChanged = false;
            this.isAdmin = false;
        }
        appEvents.prototype.componentWillLoad = function () {
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
            __chunk_1.getFromPath('datasource/events')
                .then(function (resp) {
                _this.pageData = resp;
            });
        };
        appEvents.prototype.deleteItem = function (id) {
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
        appEvents.prototype.renderList = function () {
            var _this = this;
            return this.pageData.map(function (item) {
                var event = item.languages[_this.currentLanguage];
                return (h("li", { class: "list-group-item fix-list-group-item" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "1"), h("div", { class: "col-2" }, event.startDate), h("div", { class: "col" }, event.title), _this.isAdmin ? (h("div", { class: "col-2 settings" }, h("a", { onClick: function () { return _this.deleteItem(item._id); }, title: "", class: "btn btn-sm btn-outline-danger" }, h("span", { class: "fix-trash" })), h("a", { onClick: function () { return _this.history.push("/events/" + item._id); }, title: "", class: "btn btn-sm btn-primary" }, h("span", { class: "fix-settings-2" })))) : (h("div", { class: "col-2 settings" })))));
            });
        };
        appEvents.prototype.render = function () {
            var _this = this;
            if (this.pageData) {
                return (h("div", { class: "app-events" }, h("header", { class: "page-header" }, h("div", { class: "page-header-body" }, h("div", { class: "page-header-title" }, h("h1", null, "Etkinlikler"), h("p", null, "Etkinliklerinizi d\u00FCzenleyebilir veya yenisini ekleyebilirisiniz.")), h("div", { class: "page-header-options" }, this.isAdmin ? (h("button", { class: "btn btn-secondary", onClick: function () { return _this.history.push("/add-event"); } }, "Yeni Etkinlik Ekle")) : ''))), h("main", { class: "page-body" }, h("section", null, h("ul", { class: "list-group fix-list-group" }, h("li", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col-2" }, "Etkinlik Tarihi"), h("div", { class: "col" }, "Etkinlik \u0130smi"), h("div", { class: "col-2 settings" }, "Ayarlar"))), this.renderList()))), h("footer", { class: "page-footer" })));
            }
        };
        Object.defineProperty(appEvents, "is", {
            get: function () { return "app-events"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appEvents, "properties", {
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
        Object.defineProperty(appEvents, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appEvents;
    }());
    exports.AppEvents = appEvents;
    Object.defineProperty(exports, '__esModule', { value: true });
});

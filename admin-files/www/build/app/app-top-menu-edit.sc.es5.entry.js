/*! Built with http://stenciljs.com */
App.loadBundle('app-top-menu-edit', ['exports'], function (exports) {
    var h = window.App.h;
    var appTopMenuEdit = /** @class */ (function () {
        function appTopMenuEdit() {
        }
        appTopMenuEdit.prototype.render = function () {
            return (h("div", { class: "app-top-menu-edit" }, "app-top-menu-edit"));
        };
        Object.defineProperty(appTopMenuEdit, "is", {
            get: function () { return "app-top-menu-edit"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appTopMenuEdit, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appTopMenuEdit;
    }());
    exports.AppTopMenuEdit = appTopMenuEdit;
    Object.defineProperty(exports, '__esModule', { value: true });
});

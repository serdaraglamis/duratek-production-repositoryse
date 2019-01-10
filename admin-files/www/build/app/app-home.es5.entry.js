App.loadBundle('app-home', ['exports'], function (exports) {
    var h = window.App.h;
    var AppHome = /** @class */ (function () {
        function AppHome() {
        }
        AppHome.prototype.render = function () {
            return (h("div", { class: 'app-home' }, h("p", null, "Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on ", h("a", { href: 'https://stenciljs.com' }, "stenciljs.com"), " to get started."), h("stencil-route-link", { url: '/profile/stencil' }, h("button", null, "Profile page"))));
        };
        Object.defineProperty(AppHome, "is", {
            get: function () { return "app-home"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppHome, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return AppHome;
    }());
    exports.AppHome = AppHome;
    Object.defineProperty(exports, '__esModule', { value: true });
});

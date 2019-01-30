App.loadBundle('chunk-0d315693.js', ['exports'], function (exports) {
    var h = window.App.h;
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    function commonjsRequire() {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }
    function unwrapExports(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }
    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }
    function getCjsExportFromNamespace(n) {
        return n && n.default || n;
    }
    exports.createCommonjsModule = createCommonjsModule;
    exports.commonjsGlobal = commonjsGlobal;
    exports.unwrapExports = unwrapExports;
});

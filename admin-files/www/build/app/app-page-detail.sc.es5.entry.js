var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
App.loadBundle('app-page-detail', ['exports', './chunk-ac6932ea.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var appPageDetail = /** @class */ (function () {
        function appPageDetail() {
            this.selectedLanguage = 'tr';
            this.formName = 'Sayfa';
        }
        appPageDetail.prototype.componentWillLoad = function () {
            var _this = this;
            __chunk_1.getFromPath("components")
                .then(function (components) {
                _this.components = components;
                __chunk_1.getFromPath("pages/" + _this.match.params.id)
                    .then(function (data) {
                    _this.formDetail = data;
                });
            });
        };
        appPageDetail.prototype.changeLanguage = function (language) {
            this.selectedLanguage = language;
        };
        appPageDetail.prototype.inputHandler = function (target, event) {
            this.formDetail.languages[this.selectedLanguage][target] = event.target.value;
        };
        appPageDetail.prototype.renderComponentsList = function () {
            var _this = this;
            return this.formDetail.components.map(function (cmp, index) {
                var component = _this.components.find(function (comp) { return comp._id === cmp._id; });
                return (h("li", { class: "list-group-item fix-list-group-item" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, index + 1), h("div", { class: "col" }, component.name), component.isEditable
                    ? (h("div", { class: "col-2 settings" }, h("a", { onClick: function () { return _this.history.push("/page-components/" + _this.match.params.id + "/" + index); }, title: "", class: "btn btn-sm btn-primary" }, h("span", { class: "fix-settings-2" }))))
                    : '')));
            });
        };
        appPageDetail.prototype.updateDetails = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    __chunk_1.updateFromPath("pages/" + this.match.params.id, this.formDetail)
                        .then(function () {
                        swal('Başarılı', _this.formName + ' detayı başarıyla güncellendi!', 'success');
                        _this.history.goBack();
                    });
                    return [2 /*return*/];
                });
            });
        };
        appPageDetail.prototype.renderFormData = function () {
            var _this = this;
            return (h("main", { class: "page-body" }, h("section", { class: "section-detail" }, h("div", { class: "section-detail-header" }, h("div", { class: "btn-group", role: "group", "aria-label": "Basic example" }, h("button", { onClick: function () { return _this.changeLanguage('tr'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'tr' ? 'active' : '') + " " }, "T\u00FCrk\u00E7e"), h("button", { onClick: function () { return _this.changeLanguage('en'); }, type: "button", class: "btn btn-sm btn-outline-secondary " + (this.selectedLanguage === 'en' ? 'active' : '') + " " }, "English"))), h("div", { class: "section-detail-body" }, h("div", { class: "section-detail-item" }, h("form", null, h("div", { class: "section-detail-item-group" }, h("div", { class: "form-group" }, h("label", null, this.formName, " \u0130smi / Ba\u015Fl\u0131\u011F\u0131"), h("input", { value: this.formDetail.languages[this.selectedLanguage].name, onInput: function (e) { return _this.inputHandler('name', e); }, type: "text", class: "form-control", id: "modalEventName", placeholder: "Sayfa ismi" }), h("small", { class: "form-text text-muted" }, "Sayfa ismini yaz\u0131n\u0131z. Bu isim web sitenizde ba\u015Fl\u0131k olarak g\u00F6r\u00FCnt\u00FClenecektir.")), h("div", { class: "form-group" }, h("label", null, this.formName, " Yolu (Url)"), h("input", { value: this.formDetail.languages[this.selectedLanguage].path, onInput: function (e) { return _this.inputHandler('path', e); }, type: "text", class: "form-control", id: "modalEventName", placeholder: "Sayfa ismi" }), h("small", { class: "form-text text-muted" }, "Sayfa url 'ini yaz\u0131n\u0131z. Bu alan sitenizdeki /sayfa-adi \u015Feklindeki k\u0131r\u0131l\u0131mlar\u0131 etkileyecektir. L\u00FCtfen ilk k\u0131r\u0131l\u0131mlar i\u00E7in ba\u015Fta / kullanmay\u0131n")), h("div", { class: "form-group" }, h("label", null, this.formName, " Komponentleri"), h("small", { class: "form-text text-muted" }, "Sayfan\u0131z\u0131 \u015Fekillendiren komponentler a\u015Fa\u011F\u0131da listelenmi\u015Ftir. D\u00FCzenlemek istedi\u011Finiz komponente t\u0131klayabilirsiniz."), h("br", null), h("ul", { class: "list-group fix-list-group" }, h("li", { class: "list-group-item fix-list-group-item-header" }, h("div", { class: "row fix-list-group-row" }, h("div", { class: "col-md-auto row-number" }, "#"), h("div", { class: "col" }, "Komponent \u0130smi"), h("div", { class: "col-2 settings" }, "Ayarlar"))), this.renderComponentsList()))), h("div", { class: "section-detail-footer" }, h("button", { onClick: function () { return history.back(); }, type: "button", class: "btn btn-secondary", "data-dismiss": "modal" }, "Kapat"), h("button", { onClick: this.updateDetails.bind(this), type: "button", class: "btn btn-primary" }, "De\u011Fi\u015Fiklikleri Kaydet"))))))));
        };
        appPageDetail.prototype.render = function () {
            if (this.formDetail) {
                return (h("div", { class: "app-page-detail" }, this.renderFormData()));
            }
        };
        Object.defineProperty(appPageDetail, "is", {
            get: function () { return "app-page-detail"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPageDetail, "properties", {
            get: function () {
                return {
                    "formDetail": {
                        "state": true
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "match": {
                        "type": "Any",
                        "attr": "match"
                    },
                    "selectedLanguage": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appPageDetail, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return appPageDetail;
    }());
    exports.AppPageDetail = appPageDetail;
    Object.defineProperty(exports, '__esModule', { value: true });
});

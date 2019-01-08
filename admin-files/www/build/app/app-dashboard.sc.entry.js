/*! Built with http://stenciljs.com */
const { h } = window.App;

class appDashboard {
    render() {
        return (h("div", { class: "app-dashboard" },
            h("header", { class: "page-header" },
                h("div", { class: "page-header-body" },
                    h("div", { class: "page-header-title" },
                        h("h1", null,
                            "Ho\u015Fgeldin, ",
                            h("span", null, localStorage.getItem('username'))),
                        h("p", null, "Web sitene h\u0131zl\u0131 bir bak\u0131\u015F atarak, g\u00FCncellemelerine ba\u015Flayabilirsin.")),
                    h("div", { class: "page-header-options" }))),
            h("main", { class: "page-body" },
                h("section", { class: "section-overview" },
                    h("div", { class: "overview-item" }))),
            h("footer", { class: "page-footer" })));
    }
    static get is() { return "app-dashboard"; }
    static get style() { return ""; }
}

export { appDashboard as AppDashboard };

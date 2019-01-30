const h = window.App.h;

class appTopMenuEdit {
    render() {
        return (h("div", { class: "app-top-menu-edit" }, "app-top-menu-edit"));
    }
    static get is() { return "app-top-menu-edit"; }
    static get style() { return ""; }
}

export { appTopMenuEdit as AppTopMenuEdit };

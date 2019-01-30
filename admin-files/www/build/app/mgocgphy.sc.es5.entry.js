App.loadBundle("mgocgphy",["exports"],function(e){var t=window.App.h,n=function(){function e(){this.available=!1}return e.prototype.componentWillLoad=function(){window.localStorage.getItem("cerez")||(this.available=!0)},e.prototype.getStaticText=function(e){return window.staticTexts[e][this.language]},e.prototype.render=function(){var e=this;if(this.available)return t("div",{id:"module-50",class:"module-50 opened","data-aos":"fade-up"},t("div",{class:"container module-50-container"},t("div",{onClick:function(){return location.href="/"+e.language+"/"+e.getStaticText("gizlilikBildirimiLink")},class:"module-50-body"},t("h5",null,this.getStaticText("cerezBaslik")),t("p",null,this.getStaticText("cerezAciklama1")),t("p",null,this.getStaticText("cerezAciklama2"))),t("button",{class:"module-50-close",title:"Kapat",onClick:function(){window.localStorage.setItem("cerez","true"),e.available=!1}},t("span",{class:"d-cross"}))))},Object.defineProperty(e,"is",{get:function(){return"cerez-component"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{available:{state:!0},language:{type:"Any",attr:"language"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".module-50-body{cursor:pointer}"},enumerable:!0,configurable:!0}),e}(),a=function(){function e(){this.duyuruavailable=!1}return e.prototype.componentWillLoad=function(){this.duyurudata=this.duyuru.components[0].data[this.language],window.localStorage.getItem("duyuru")?"true"===this.duyurudata.isPublished&&(window.localStorage.getItem("duyurubaslik")!==this.duyurudata.title&&(this.duyuruavailable=!0),window.localStorage.getItem("duyuruaciklama")!==this.duyurudata.description&&(this.duyuruavailable=!0)):"true"===this.duyurudata.isPublished&&(this.duyuruavailable=!0)},e.prototype.cancelClicked=function(){this.duyuruavailable=!1,window.localStorage.setItem("duyuru","true"),window.localStorage.setItem("duyurubaslik",this.duyurudata.title),window.localStorage.setItem("duyuruaciklama",this.duyurudata.description)},e.prototype.render=function(){if(this.duyuruavailable)return t("div",{id:"announcementModule",class:"module-10","aria-hidden":"false"},t("div",{class:"container module-10-container"},t("div",{class:"module-10-header","data-aos":"fade-down"},t("div",{class:"module-10-header-title"},this.duyurudata.title),t("a",{class:"module-10-close close",href:"#!",onClick:this.cancelClicked.bind(this),title:""},t("span",{class:"d-cross-light"}))),t("div",{class:"module-10-body"},t("div",{class:"module-11"},t("div",{class:"module-11-content","data-aos":"fade-up"},t("div",{innerHTML:this.duyurudata.description}),t("a",{onClick:this.cancelClicked.bind(this),href:"/"+this.language+"/"+this.duyurudata.buttonLink,class:"a-btn ghost skin with-triangle close",title:"",target:""},this.duyurudata.buttonTitle)),t("figure",{class:"module-11-image","data-aos":"fade-up"},t("img",{src:this.duyurudata.image,alt:""})))),t("div",{class:"module-10-footer"})))},Object.defineProperty(e,"is",{get:function(){return"duyuru-component"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{duyuru:{type:"Any",attr:"duyuru"},duyuruavailable:{state:!0},language:{type:"Any",attr:"language"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}(),i=function(){function e(){this.isLoaded=!1,this.components=[]}return e.prototype.componentWillLoad=function(){var e=this;return window.projectsPath={tr:"proje-detay",en:"project-detail"},window.projectsPathMain={tr:"projeler",en:"projects"},window.newsPath={tr:"haber-detay",en:"news-detail"},window.newsPathMain={tr:"haberler",en:"news"},window.productsPath={tr:"urunler",en:"products"},window.eventDetailPath={tr:"etkinlik-detay",en:"event-detail"},window.contactPath={tr:"iletisim",en:"contact"},window.eventsPath={tr:"etkinlikler",en:"events"},window.apiBase="http://demo.duratek.com.tr/api",window.cdnBase="http://demo.duratek.com.tr/cdn",window.selectedLanguage="tr",this.paths=window.location.pathname.split("/"),this.preparePageReturner().then(function(t){return e.determinePage(t)})},e.prototype.preparePageReturner=function(){return new Promise(function(e,t){fetch("http://demo.duratek.com.tr/api/languages/5b1ec1efc105d239a083350a").then(function(e){return e.json()}).then(function(n){window.staticTexts=n.rendered,fetch("http://demo.duratek.com.tr/api/pages/").then(function(e){return e.json()}).then(function(t){e(t)}).catch(function(e){return t(e)})})})},e.prototype.determinePage=function(e){var t=this;this.duyuru=e.find(function(e){return"duyuru"===e.path}),this.paths.length>2&&""===this.paths[this.paths.length-1]&&this.paths.splice(-1,1);var n=1;"en"===this.paths[1]?(n=2,window.selectedLanguage="en"):"tr"===this.paths[1]?(n=2,window.selectedLanguage="tr"):(""===this.paths[1]||this.paths[1]&&this.paths[1].length>2)&&(n=1,window.selectedLanguage="tr"),window.rootLevel=n;var a=this.paths.length;if(""===this.paths[n]||2===a&&"tr"===this.paths[1]||2===a&&"en"===this.paths[1]){var i=e.find(function(e){return"/"===e.languages[window.selectedLanguage].path});return this.components=i.components,document.title=i.languages[window.selectedLanguage].name+" | Duratek",void(this.isLoaded=!0)}if(a>n){var o=e.find(function(e){if(e.languages[window.selectedLanguage].path.split("/")[0]===t.paths[n])return e});if(o)return this.components=o.components,document.title=o.languages[window.selectedLanguage].name+" | Duratek",window.pageName=o.languages[window.selectedLanguage].name,void(this.isLoaded=!0);alert("404 RENDER")}},e.prototype.componentDidLoad=function(){},e.prototype.renderComponent=function(e){return t(e.code,{componentData:e.data,language:window.selectedLanguage,rootlevel:window.rootLevel,paths:this.paths})},e.prototype.render=function(){var e=this;return t("div",null,this.components.map(function(n){return t(n.code,{componentData:n.data,language:window.selectedLanguage,rootlevel:window.rootLevel,paths:e.paths})}),this.duyuru?t("duyuru-component",{duyuru:this.duyuru,language:window.selectedLanguage}," "):"",t("cerez-component",{language:window.selectedLanguage}))},Object.defineProperty(e,"is",{get:function(){return"my-app"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{isLoaded:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();e.CerezComponent=n,e.DuyuruComponent=a,e.MyApp=i,Object.defineProperty(e,"__esModule",{value:!0})});
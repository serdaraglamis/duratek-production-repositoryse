App.loadBundle("ttqnibqu",["exports"],function(e){var t=window.App.h,a=function(){function e(){this.viewLimit=6}return e.prototype.componentWillLoad=function(){var e=this;this.componentData&&this.language&&(this.data=this.componentData[this.language],fetch(window.apiBase+"/datasource/events").then(function(e){return e.json()}).then(function(t){var a,n,i=t;i=(i=i.filter(function(t){return t.languages[e.language].startDate&&t.languages[e.language].startDate.length})).map(function(t){var a=t.languages[e.language].startDate.split("-"),n=new Date(a[2],a[1]-1,a[0]);return t.tarihx=n.getTime(),t}),e.events=i.sort((n=1,"-"===(a="-tarihx")[0]&&(n=-1,a=a.substr(1)),function(e,t){return(e[a]<t[a]?-1:e[a]>t[a]?1:0)*n}))}))},e.prototype.loadMore=function(){this.viewLimit+=3},e.prototype.render=function(){var e=this;if(this.data)return t("section",{class:"module-450"},t("div",{class:"container module-450-container"},t("div",{class:"module-450-body"},this.events?this.events.slice(0,this.viewLimit).map(function(a){return t("a",{class:"module-450-body-item",href:"etkinlik-detay/"+a.languages[e.language].path,title:a.languages[e.language].title,"data-aos":"fade-up"},t("div",{class:"image"},t("img",{src:a.languages[e.language].image,alt:a.languages[e.language].title})),t("div",{class:"content"},t("span",{class:"date"},a.languages[e.language].startDate),t("h3",null,a.languages[e.language].title)))}):""),t("div",{class:"module-450-footer","data-aos":"zoom-in"},this.events&&this.events.length<=this.viewLimit?"":t("a",{class:"a-btn white w-icon",title:"",onClick:this.loadMore.bind(this)},"Daha fazla görüntüle ",t("span",{class:"d-refresh"})))))},Object.defineProperty(e,"is",{get:function(){return"module-450"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{componentData:{type:"Any",attr:"component-data"},events:{state:!0},language:{type:String,attr:"language"},viewLimit:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();e.Module450=a,Object.defineProperty(e,"__esModule",{value:!0})});
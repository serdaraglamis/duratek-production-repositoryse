App.loadBundle("iul2lgpk",["exports"],function(e){var a=window.App.h,t=function(){function e(){this.viewLimit=10}return e.prototype.componentWillLoad=function(){var e=this;this.componentData&&this.language&&(this.data=this.componentData[this.language],fetch(window.apiBase+"/datasource/news").then(function(e){return e.json()}).then(function(a){var t=a.filter(function(a){return a.languages[e.language].isEnabled});e.news=t}),fetch(window.apiBase+"/datasource/events").then(function(e){return e.json()}).then(function(a){var t,n,s=a;s=(s=s.filter(function(a){return a.languages[e.language].startDate&&a.languages[e.language].startDate.length})).map(function(a){var t=a.languages[e.language].startDate.split("-"),n=new Date(t[2],t[1]-1,t[0]);return a.tarihx=n.getTime(),a}),e.events=s.sort((n=1,"-"===(t="-tarihx")[0]&&(n=-1,t=t.substr(1)),function(e,a){return(e[t]<a[t]?-1:e[t]>a[t]?1:0)*n}))}))},e.prototype.loadMore=function(){this.viewLimit+=10},e.prototype.getStaticText=function(e){return window.staticTexts[e][this.language]},e.prototype.calculateCalendar=function(e){if(!e.languages[this.language].startDate)return console.log("event",e.languages[this.language]),null;var t=e.languages[this.language].startDate.split("-"),n=new Date(t[2]+"-"+t[1]+"-"+t[0]);return a("div",{class:"calendar"},a("span",{class:"day"},n.getDate()),a("span",{class:"month"},["Ocak","Şubat","Mart","Nisan","Mayıs","Hzrn","Tem","Ağu","Eyl","Ekim","Kasım","Arlk"][n.getMonth()]))},e.prototype.render=function(){var e=this;if(this.data)return a("section",{class:"module-460"},a("div",{class:"container module-460-container"},a("div",{class:"module-460-news"},a("div",{class:"module-461"},this.news?this.news.slice(0,this.viewLimit).map(function(t){return a("div",{class:"module-461-item","data-aos":"fade-up"},a("a",{href:"/"+e.language+"/"+window.newsPath[e.language]+"/"+t.languages[e.language].path,title:t.languages[e.language].title},a("div",{class:"module-461-item-image"},a("img",{src:t.languages[e.language].image,alt:t.languages[e.language].title})),a("div",{class:"module-461-item-text"},a("h3",null,t.languages[e.language].title),a("p",null,t.languages[e.language].shortDescription))))}):"",a("div",{class:"module-461-footer","data-aos":"zoom-in"},this.news&&this.news.length<=this.viewLimit?"":a("a",{class:"a-btn white w-icon",href:"javascript:void(0);",onClick:this.loadMore.bind(this),title:""},"Daha fazla görüntüle ",a("span",{class:"d-refresh"}))))),a("div",{class:"module-460-events"},a("section",{class:"module-410 aside","data-aos":"fade-up"},a("div",{class:"module-410-header","data-aos":"fade-up"},a("span",{class:"title"},this.data.eventText)),a("div",{class:"module-410-body"},this.events?this.events.slice(0,9).map(function(t){return a("a",{href:"/"+e.language+"/"+window.eventDetailPath[e.language]+"/"+t.languages[e.language].path,class:"module-410-body-item",title:t.languages[e.language].title,"data-aos":"fade-up"},e.calculateCalendar(t),a("div",{class:"text"},a("span",{class:"name"},t.languages[e.language].title),a("span",{class:"location"},t.languages[e.language].location)))}):""),a("div",{class:"module-410-footer","data-aos":"fade-up"},a("a",{href:"/"+this.language+"/"+window.eventsPath[this.language],title:this.getStaticText("tumEtkinlikler"),class:"link link-primary with-triangle"},this.getStaticText("tumEtkinlikler")))))))},Object.defineProperty(e,"is",{get:function(){return"module-460"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{componentData:{type:"Any",attr:"component-data"},events:{state:!0},language:{type:String,attr:"language"},news:{state:!0},viewLimit:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();e.Module460=t,Object.defineProperty(e,"__esModule",{value:!0})});
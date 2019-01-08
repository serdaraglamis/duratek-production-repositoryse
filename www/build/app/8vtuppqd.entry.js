const t=window.App.h;class e{constructor(){this.loaded=!1}componentWillLoad(){this.componentData&&this.language&&fetch(`${window.apiBase}/datasource/news`).then(t=>t.json()).then(t=>{const e=t;let s=0;const a=e.find((t,e)=>(s=e,t.languages[this.language].path.includes(this.paths[this.paths.length-1])));if(a){if(e.length>2){const t=e;t.splice(s,1),this.otherNews=t;const a=Math.floor(Math.random()*t.length);this.prevNews=t[a],t.splice(a,1),this.nextNews=t[Math.floor(Math.random()*t.length)]}this.newsDetail=a.languages[this.language]}fetch(`${window.apiBase}/datasource/events`).then(t=>t.json()).then(t=>{this.allEvents=t,this.loaded=!0})})}getStaticText(t){return window.staticTexts[t][this.language]}calculateCalendar(e){const s=e.languages[this.language].startDate.split("-"),a=new Date(s[2]+"-"+s[1]+"-"+s[0]);return t("div",{class:"calendar"},t("span",{class:"day"},a.getDate()),t("span",{class:"month"},["Ocak","Şubat","Mart","Nisan","Mayıs","Hzrn","Tem","Ağu","Eyl","Ekim","Kasım","Arlk"][a.getMonth()]))}facebookClicked(t){t.preventDefault();var e=window.open("https://www.facebook.com/sharer/sharer.php?u="+document.URL,"facebook-popup","height=350,width=600");return e.focus&&e.focus(),!1}twitterClicked(t){t.preventDefault();var e=window.open("https://twitter.com/share?url="+document.URL,"twitter-popup","height=350,width=600");return e.focus&&e.focus(),!1}linkedInClicked(t){t.preventDefault(),window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(document.URL),"","left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0")}googlePlusClicked(t){t.preventDefault(),window.open("https://plus.google.com/share?url="+encodeURIComponent(document.URL),"","left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0")}render(){if(this.newsDetail&&this.allEvents)return t("section",{class:"module-440"},t("div",{class:"container module-440-container"},t("article",{class:"module-440-body"},t("h1",{"data-aos":"fade-up"},this.newsDetail.title),t("figure",{class:"module-440-hero","data-aos":"fade-up"},t("img",{src:this.newsDetail.image,alt:this.newsDetail.title}),t("figcaption",null,t("a",{title:"",target:"_blank"},this.newsDetail.imageCaption))),this.newsDetail.content.map(e=>{if("Editor"===e.type)return t("p",{innerHTML:e.data,"data-aos":"fade-up"})}),t("div",{class:"ps-gallery"},t("link",{href:"/assets/css/photoswipe/photoswipe.css",rel:"stylesheet"}),t("link",{href:"/assets/css/photoswipe/default-skin/custom-skin.css",rel:"stylesheet"}),t("div",{class:"module-60",itemscope:!0,itemtype:"http://schema.org/ImageGallery"},this.newsDetail.gallery.map(e=>t("figure",{class:"module-60-item",itemprop:"associatedMedia",itemscope:!0,itemtype:"http://schema.org/ImageObject","data-wow-delay":"","data-aos":"fade-up"},t("a",{title:"Fig. 01",href:e.url,itemprop:"contentUrl","data-size":"600x600"},t("img",{src:e.url,itemprop:"thumbnail",alt:""})),t("figcaption",{itemprop:"caption description"},e.title)))),t("div",{class:"pswp",tabindex:"-1",role:"dialog","aria-hidden":"true"},t("div",{class:"pswp__bg"}),t("div",{class:"pswp__scroll-wrap"},t("div",{class:"pswp__container"},t("div",{class:"pswp__item"}),t("div",{class:"pswp__item"}),t("div",{class:"pswp__item"})),t("div",{class:"pswp__ui pswp__ui--hidden"},t("div",{class:"pswp__top-bar"},t("div",{class:"pswp__counter"}),t("button",{class:"pswp__button pswp__button--close",title:"Galeriyi Kapat (Esc)"}),t("button",{class:"pswp__button pswp__button--fs",title:"Tam Ekrana Geç"}),t("button",{class:"pswp__button pswp__button--zoom",title:"Yaklaş / Uzaklaş"}),t("div",{class:"pswp__preloader"},t("div",{class:"pswp__preloader__icn"},t("div",{class:"pswp__preloader__cut"},t("div",{class:"pswp__preloader__donut"}))))),t("div",{class:"pswp__share-modal pswp__share-modal--hidden pswp__single-tap"},t("div",{class:"pswp__share-tooltip"})),t("button",{class:"pswp__button pswp__button--arrow--left",title:"Önceki Proje"}),t("button",{class:"pswp__button pswp__button--arrow--right",title:"Sonraki Proje"}),t("div",{class:"pswp__caption"},t("div",{class:"pswp__caption__center"}))))),t("script",{src:"/assets/js/photoswipe/photoswipe.min.js",type:"text/javascript",charset:"utf-8"}),t("script",{src:"/assets/js/photoswipe/photoswipe-ui-default.min.js",type:"text/javascript",charset:"utf-8"}),t("script",{src:"/assets/js/photoswipe/photoswipe-initializer.js",type:"text/javascript",charset:"utf-8"})),this.newsDetail.file?t("div",{class:"module-30","data-aos":"fade-up"},t("div",{class:"module-30-text"},"tr"===this.language?t("p",null,"Ilgili dosyayı indirmek için ",t("a",{href:`${window.cdnBase}/${this.newsDetail.file}`},"tıklayınız")):t("p",null,t("a",{href:`${window.cdnBase}/${this.newsDetail.file}`},"Click")," to save the file to your computer.")),t("div",{class:"module-30-links"})):"",t("div",{class:"module-30","data-aos":"fade-up"},t("div",{class:"module-30-text"},t("h5",null,this.getStaticText("share"))),t("div",{class:"module-30-links"},t("a",{onClick:this.facebookClicked.bind(this),href:"",title:"",class:"facebook"},t("span",{class:"d-facebook"})),t("a",{onClick:this.twitterClicked.bind(this),href:"",title:"",class:"twitter"},t("span",{class:"d-twitter"})),t("a",{onClick:this.linkedInClicked.bind(this),href:"",title:"",class:"linkedin"},t("span",{class:"d-linkedin"})),t("a",{onClick:this.googlePlusClicked.bind(this),href:"",title:"",class:"googleplus"},t("span",{class:"d-googleplus"}))))),t("aside",{class:"module-440-aside"},t("section",{class:"module-410 aside","data-aos":"fade-up"},t("div",{class:"module-410-header","data-aos":"fade-up"},t("span",{class:"title"},this.getStaticText("newsSideEventTitle"))),t("div",{class:"module-410-body"},this.allEvents?this.allEvents.slice(0,9).map(e=>t("a",{href:`/${this.language}/${window.eventDetailPath[this.language]}/${e.languages[this.language].path}`,class:"module-410-body-item",title:e.languages[this.language].title,"data-aos":"fade-up"},this.calculateCalendar(e),t("div",{class:"text"},t("span",{class:"name"},e.languages[this.language].title),t("span",{class:"location"},e.languages[this.language].location)))):""),t("div",{class:"module-410-footer","data-aos":"fade-up"},t("a",{href:`/${this.language}/${window.eventsPath[this.language]}`,title:this.getStaticText("tumEtkinlikler"),class:"link link-primary with-triangle"},this.getStaticText("tumEtkinlikler"))))),this.prevNews&&this.prevNews.languages&&this.nextNews&&this.nextNews.languages?t("footer",{class:"module-440-footer","data-aos":"fade-up"},t("div",{class:"module-32"},t("a",{class:"previous",href:`/${this.language}/${window.newsPath[this.language]}/${this.prevNews.languages[this.language].path}`,title:this.prevNews.languages[this.language].title},t("span",{class:"title"},this.getStaticText("haberDetayOnceki")),t("h4",null,this.prevNews.languages[this.language].title)),t("a",{class:"all",href:`/${this.language}/${window.newsPathMain[this.language]}`,title:this.getStaticText("newsSideEventCta")},t("span",{class:"d-grid9"})),t("a",{class:"next",href:`/${this.language}/${window.newsPath[this.language]}/${this.nextNews.languages[this.language].path}`,title:this.nextNews.languages[this.language].title},t("span",{class:"title"},this.getStaticText("haberDetaySonraki")),t("h4",null,this.nextNews.languages[this.language].title)))):""))}static get is(){return"module-440"}static get properties(){return{allEvents:{state:!0},componentData:{type:"Any",attr:"component-data"},language:{type:String,attr:"language"},loaded:{state:!0},newsDetail:{state:!0},paths:{type:String,attr:"paths"}}}static get style(){return".module-440 .module-60-item a img{width:200px;height:200px}"}}export{e as Module440};
var __awaiter=this&&this.__awaiter||function(e,t,a,i){return new(a||(a=Promise))(function(r,n){function s(e){try{l(i.next(e))}catch(e){n(e)}}function o(e){try{l(i.throw(e))}catch(e){n(e)}}function l(e){e.done?r(e.value):new a(function(t){t(e.value)}).then(s,o)}l((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var a,i,r,n,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return n={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function o(n){return function(o){return function(n){if(a)throw new TypeError("Generator is already executing.");for(;s;)try{if(a=1,i&&(r=2&n[0]?i.return:n[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,n[1])).done)return r;switch(i=0,r&&(n=[2&n[0],r.value]),n[0]){case 0:case 1:r=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,i=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){s.label=n[1];break}if(6===n[0]&&s.label<r[1]){s.label=r[1],r=n;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(n);break}r[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(e){n=[6,e],i=0}finally{a=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,o])}}};App.loadBundle("u6vtachp",["exports"],function(e){var t=window.App.h,a=function(){function e(){this.isReady=!1,this.selectedFirstLevel=0,this.changeTrigger=!1,this.openedProductIndex=null,this.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""},this.productSectors=[],this.productCategories=[],this.productSystems=[],this.allCategories=[],this.renderedCategoryType="",this.systemDirectRendered=!1}return e.prototype.componentWillLoad=function(){var e=this;fetch(window.apiBase+"/product-categories").then(function(e){return e.json()}).then(function(t){fetch(window.apiBase+"/products").then(function(a){a.json().then(function(a){e.allCategories=t,e.products=a,e.calculateCategoryLevels()})})}),window.addEventListener("popstate",function(t){if(t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),"system"!==e.renderType||e.systemDirectRendered)history.back();else{e.renderType="category";var a=window.location.pathname,i={Title:e.currentCategory.languages[e.language].title,Url:document.location.origin+a};history.replaceState(i,i.Title,i.Url),e.changeTrigger=!e.changeTrigger}},!1)},e.prototype.calculateCategoryLevels=function(){return __awaiter(this,void 0,void 0,function(){var e,t,a;return __generator(this,function(i){switch(i.label){case 0:return e=this,[4,this.calculateProductSectors()];case 1:return e.productSectors=i.sent(),t=this,[4,this.calculateProductCategories()];case 2:return t.productCategories=i.sent(),a=this,[4,this.calculateProductSystems()];case 3:return a.productSystems=i.sent(),this.selectedCategoryId=this.calculateSectorCategories(this.productSectors[0]._id)[0]._id,this.calculateCategorySystems(this.selectedCategoryId).length?(this.renderedCategoryType="sector",this.renderCategoryId=this.calculateCategorySystems(this.selectedCategoryId)[0]._id):(this.renderedCategoryType="category",this.renderCategoryId=this.selectedCategoryId),this.calculateCurrentDetail(),this.isReady=!0,[2]}})})},e.prototype.calculateProductSectors=function(){return this.allCategories.filter(function(e){return!e.parents.length})},e.prototype.calculateProductCategories=function(){return this.allCategories.filter(function(e){return 1===e.parents.length})},e.prototype.calculateProductSystems=function(){return this.allCategories.filter(function(e){return 2===e.parents.length})},e.prototype.mapProductsToCategories=function(){var e=this;this.allCategories.forEach(function(t){e.products.forEach(function(e){e.categories.includes(t._id)&&t.products.push(e)})})},e.prototype.firstLevelClicked=function(e,t){this.selectedFirstLevel=t,this.selectedCategoryId=this.calculateSectorCategories(e._id)[0]._id,this.calculateCategorySystems(this.selectedCategoryId).length?(this.renderedCategoryType="sector",this.renderCategoryId=this.calculateCategorySystems(this.selectedCategoryId)[0]._id):(this.renderedCategoryType="category",this.renderCategoryId=this.selectedCategoryId)},e.prototype.subLevelClicked=function(e,t){e.preventDefault(),this.selectedCategoryId=t._id,this.calculateCategorySystems(this.selectedCategoryId).length?(this.renderedCategoryType="sector",this.renderCategoryId=this.calculateCategorySystems(this.selectedCategoryId)[0]._id):(this.renderedCategoryType="category",this.renderCategoryId=this.selectedCategoryId)},e.prototype.sectorClicked=function(e,t){e.preventDefault(),this.renderCategoryId=t._id},e.prototype.getProductsForSelected=function(){var e=this;return this.allCategories.find(function(t){return t._id===e.renderCategoryId})},e.prototype.getRenderedType=function(){switch(this.renderedCategoryType){case"category":return"KATEGORİ";case"sector":return"SEKTÖR"}},e.prototype.calculateSectorCategories=function(e){return this.productCategories.filter(function(t){return t.parents.includes(e)})},e.prototype.calculateCategorySystems=function(e){return this.productSystems.filter(function(t){return t.parents.includes(e)})},e.prototype.calculateCurrentDetail=function(){for(var e=this,t=function(t){switch(t){case 1:a.renderType="sector",a.sectorPath=a.paths[window.rootLevel+t];break;case 2:a.renderType="category",a.categoryPath=a.paths[window.rootLevel+t];break;case 3:a.categoryPath=a.paths[window.rootLevel+2];var i=a.allCategories.find(function(t){return t.languages[e.language].path.includes(e.categoryPath)});console.log("Current Categ Found",i),a.systemPath=a.paths[window.rootLevel+t],a.renderedSystem=a.allCategories.find(function(t){return t.languages[e.language].path.includes(e.systemPath)&&t.parents.includes(i._id)}),document.title=a.renderedSystem.languages[a.language].title+" | "+window.pageName+" | Duratek",a.renderType="system",a.systemDirectRendered=!0}},a=this,i=1;i<this.paths.length-window.rootLevel;i++)t(i);this.currentSector=this.productSectors.find(function(t){return t.languages[e.language].path.includes(e.sectorPath)}),this.categoryPath&&(this.currentCategory=this.productCategories.find(function(t){return t.languages[e.language].path.includes(e.categoryPath)}),document.title=this.currentCategory.languages[this.language].title+" | "+window.pageName+" | Duratek")},e.prototype.categoryClicked=function(e){if(void 0!==history.pushState){var t={Title:e.languages[this.language].title,Url:e.languages[this.language].path};history.pushState(t,t.Title,t.Url)}this.currentCategory=e,document.title=this.currentCategory.languages[this.language].title+" | "+window.pageName+" | Duratek",this.changeTrigger=!this.changeTrigger},e.prototype.systemClicked=function(e){if(void 0!==history.pushState){var t={Title:e.languages[this.language].title,Url:this.currentCategory.languages[this.language].path+"/"+e.languages[this.language].path};history.pushState(t,t.Title,t.Url)}this.renderedSystem=e,document.title=this.renderedSystem.languages[this.language].title+" | "+window.pageName+" | Duratek",this.renderType="system",this.changeTrigger=!this.changeTrigger},e.prototype.renderAsideBlock=function(){var e=this;if(this.currentSector)return t("aside",{class:"module-720-aside"},t("div",{class:"module-722"},t("div",{class:"module-722-title","data-aos":"fade-up"},this.currentSector.languages[this.language].title),t("ul",{class:"module-722-list"},this.calculateSectorCategories(this.currentSector._id).map(function(a){var i=e.calculateCategorySystems(a._id);return t("li",{class:"module-722-list-item "+(i.length?"has-subnav":"")+" accordion-item "+(e.currentCategory._id===a._id?"active":""),"data-aos":"fade-up"},t("a",{onClick:function(){return e.categoryClicked(a)},href:"javascript:void(0);",title:"",class:"accordion-link"},a.languages[e.language].title),i.length?t("div",{class:"module-722-sublist accordion-content"},i.map(function(a){return t("div",{class:"module-722-sublist-item"},t("a",{onClick:function(){return e.systemClicked(a)},href:"javascript:void(0);",title:"",class:"","data-modal":"modal","data-target":"#productDetail"},a.languages[e.language].title))})):"")}))))},e.prototype.systemModalCancelClicked=function(){var e=window.location.pathname;(e=e.split("/")).pop(),e=e.join("/");var t={Title:this.currentCategory.languages[this.language].title,Url:document.location.origin+e};history.replaceState(t,t.Title,t.Url),this.renderType="category",this.changeTrigger=!this.changeTrigger},e.prototype.sendMail=function(e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(a){switch(a.label){case 0:return e.preventDefault(),this.mailData.currentCategory=this.currentCategory,this.mailData.currenctSystem=this.renderedSystem,[4,fetch(window.apiBase+"/sendmail",{body:JSON.stringify(this.mailData),method:"POST",headers:{"content-type":"application/json"}}).then(function(){siiimpleToast.success(t.getStaticText("formGonderildi")),t.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}})];case 1:return a.sent(),[2]}})})},e.prototype.getStaticText=function(e){return window.staticTexts[e][this.language]},e.prototype.renderMailTemplate=function(){var e=this;return t("div",{class:"module-730-body-item"},t("div",{class:"title"},"Detaylı Ürün Bilgi Talebi ",t("span",{class:"info"},"Ürün hakkında detaylı bilgi almak için iletişim formunu doldurmanız gerekmektedir.")),t("div",{class:"content"},t("form",{class:"module-70 validated"},t("div",{class:"module-70-body"},t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.name=t.target.value},value:this.mailData.name,id:"fname",type:"text",placeholder:this.getStaticText("formIsminiz")}),t("label",{htmlFor:"fname"},this.getStaticText("formIsim")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.surname=t.target.value},value:this.mailData.surname,id:"lname",type:"text",placeholder:this.getStaticText("formSoyIsminiz")}),t("label",{htmlFor:"lname"},this.getStaticText("formSoyIsim")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.email=t.target.value},value:this.mailData.email,id:"eposta",type:"text",placeholder:this.getStaticText("formEpostaAdresi")}),t("label",{htmlFor:"eposta"},this.getStaticText("formEposta")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.phone=t.target.value},value:this.mailData.phone,id:"pnumber",type:"tel",placeholder:this.getStaticText("formTelefonNumarasi")}),t("label",{htmlFor:"pnumber"},this.getStaticText("formTelefon")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.company=t.target.value},value:this.mailData.company,id:"companyname",type:"text",placeholder:this.getStaticText("formSirketIsminiz")}),t("label",{htmlFor:"companyname"},this.getStaticText("formSirket")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:function(t){return e.mailData.position=t.target.value},value:this.mailData.position,id:"jobtitle",type:"text",placeholder:this.getStaticText("formGorevYaziniz")}),t("label",{htmlFor:"jobtitle"},this.getStaticText("formGorev")))),t("div",{class:"module-70-item col-full","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("textarea",{onInput:function(t){return e.mailData.message=t.target.value},value:this.mailData.message,id:"message",placeholder:this.getStaticText("formMesajiniziYaziniz")}),t("label",{htmlFor:"message"},this.getStaticText("formMesaj"))))),t("div",{class:"module-70-footer"},t("a",{onClick:this.sendMail.bind(this),class:"a-btn white with-triangle",href:"",title:""},this.getStaticText("formGonder"))))))},e.prototype.module724Clicked=function(e,t){console.warn(t),this.openedProductIndex=this.openedProductIndex===e?null:e;var a=document.querySelector(".module-724-item-content.content-"+e),i=document.querySelectorAll(".module-724-item-content");i&&(i.forEach(function(e){return e.style.maxHeight=null}),null===this.openedProductIndex||(a.style.maxHeight=a.scrollHeight+96+"px")),this.changeTrigger=!this.changeTrigger},e.prototype.renderSystemDetail=function(){var e=this;if(this.renderedSystem)return console.log("Rendering Here",this.renderedSystem),t("div",{id:"productDetail",class:"modal","aria-hidden":"system"!==this.renderType},t("div",{class:"modal-backdrop"}),"system"===this.renderType?t("div",{class:"container modal-container"},t("div",{class:"modal-header"},t("div",{class:"title"}),t("a",{class:"modal-close close",onClick:this.systemModalCancelClicked.bind(this),title:""},t("span",{class:"d-cross-light"}))),t("div",{class:"modal-body"},t("div",{class:"module-730"},t("div",{class:"module-730-header"},t("h1",null,this.renderedSystem.languages[this.language].title," Sistemleri")),t("div",{class:"module-730-body"},t("div",{class:"module-730-body-item",innerHTML:this.renderedSystem.languages[this.language].description}),t("div",{class:"module-730-body-item"},t("div",{class:"title"},this.renderedSystem.languages[this.language].title," ",this.getStaticText("urunler")),t("div",{class:"content"},this.renderedSystem.products.length?t("div",{class:"module-724"},t("div",{class:"module-724-section body"},this.renderedSystem.products.map(function(a,i){var r=e.getProductDetailById(a);if(console.log("PProduct Arrived",r),r.isPublished)return t("div",{class:"module-724-item accordion-item "+(e.openedProductIndex===i?"active":""),onClick:function(t){return e.module724Clicked(i,t)}},t("a",{class:"module-724-item-link accordion-link",href:"javascript:void(0);",title:""},t("span",{class:"d-arrow-right arrow"}),t("span",{class:"name"},r.languages[e.language].title),t("span",{class:"code"},r.productCode)),t("div",{class:"module-724-item-content content-"+i+" accordion-content",innerHTML:r.languages[e.language].description}))}))):t("div",null,this.getStaticText("urunYok")))),this.renderMailTemplate()),t("div",{class:"module-730-footer"})))):"")},e.prototype.getProductDetailById=function(e){return this.products.find(function(t){return t._id===e})||null},e.prototype.getProductsArrayByIds=function(e){var t=this,a=[];return e.forEach(function(e){var i=t.products.find(function(t){return t._id===e});i&&a.push(i)}),a},e.prototype.renderMainBlock=function(){var e=this;if(this.currentCategory){var a=this.calculateCategorySystems(this.currentCategory._id);return a.length?t("div",{class:"module-720-body"},t("h2",{"data-aos":"fade-up"},this.currentCategory.languages[this.language].title),t("p",{innerHTML:this.currentCategory.languages[this.language].description,"data-aos":"fade-up"}),t("div",{class:"module-723","data-aos":"fade-up"},t("div",{class:"module-723-header","data-aos":"fade-up"},t("h3",null,this.currentCategory.languages[this.language].title," Sistemleri")),t("div",{class:"module-723-body","data-aos":"fade-up"},a.map(function(a){return t("div",{class:"module-723-item","data-aos":"fade-up"},t("a",{onClick:function(){return e.systemClicked(a)},class:"module-723-item-link",href:"javascript:void(0);",title:"","data-modal":"modal","data-target":"#productDetail"},a.languages[e.language].title))})),t("div",{class:"module-723-footer"}))):t("div",{class:"module-720-body"},t("div",{class:"module-730"},t("div",{class:"module-730-header"},t("h1",null,this.currentCategory.languages[this.language].title," Sistemleri")),t("div",{class:"module-730-body"},t("div",{class:"module-730-body-item"}),t("div",{class:"module-730-body-item"},t("div",{class:"title"},this.currentCategory.languages[this.language].title," Ürünleri"),t("div",{class:"content"},this.getProductsArrayByIds(this.currentCategory.products).length?t("div",{class:"module-724"},t("div",{class:"module-724-section body"},this.getProductsArrayByIds(this.currentCategory.products).map(function(a,i){if(a.isPublished)return t("div",{class:"module-724-item accordion-item "+(e.openedProductIndex===i?"active":""),onClick:function(t){return e.module724Clicked(i,t)}},t("a",{class:"module-724-item-link accordion-link",href:"javascript:void(0);",title:""},t("span",{class:"d-arrow-right arrow"}),t("span",{class:"name"},a.languages[e.language].title),t("span",{class:"code"},a.productCode)),t("div",{class:"module-724-item-content content-"+i+" accordion-content",innerHTML:a.languages[e.language].description}))}))):t("div",null,this.getStaticText("urunYok")))),this.renderMailTemplate()),t("div",{class:"module-730-footer"})))}},e.prototype.render=function(){return t("section",{class:"module-720"},t("div",{class:"container module-720-container"},this.renderAsideBlock(),this.renderMainBlock(),this.renderSystemDetail()))},Object.defineProperty(e,"is",{get:function(){return"urunler-page"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{changeTrigger:{state:!0},componentData:{type:"Any",attr:"component-data"},isReady:{state:!0},language:{type:String,attr:"language"},paths:{type:String,attr:"paths"},renderCategoryId:{state:!0},selectedFirstLevel:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".accordion-item.active .module-722-sublist{max-height:259px!important}.module-724-item.accordion-item.active .module-724-item-content.accordion-content{max-height:202px}"},enumerable:!0,configurable:!0}),e}();e.UrunlerPage=a,Object.defineProperty(e,"__esModule",{value:!0})});
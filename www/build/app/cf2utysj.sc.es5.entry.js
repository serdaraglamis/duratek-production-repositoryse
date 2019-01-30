var __awaiter=this&&this.__awaiter||function(t,e,a,n){return new(a||(a=Promise))(function(i,o){function r(t){try{s(n.next(t))}catch(t){o(t)}}function l(t){try{s(n.throw(t))}catch(t){o(t)}}function s(t){t.done?i(t.value):new a(function(e){e(t.value)}).then(r,l)}s((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){var a,n,i,o,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r;)try{if(a=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,n=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(i=(i=r.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){r=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){r.label=o[1];break}if(6===o[0]&&r.label<i[1]){r.label=i[1],i=o;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(o);break}i[2]&&r.ops.pop(),r.trys.pop();continue}o=e.call(t,r)}catch(t){o=[6,t],n=0}finally{a=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}};App.loadBundle("cf2utysj",["exports"],function(t){var e=window.App.h,a=function(){function t(){this.productIdObject={},this.productPathObject={},this.error=!1,this.openedProductIndex=null,this.changeTrigger=!1,this.menuInited=!1,this.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}}return t.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,function(){var t,e,a,n,i,o,r,l=this;return __generator(this,function(s){switch(s.label){case 0:return console.log("Component Data",this.componentData),console.log("Language",this.language),console.log("paths",this.paths),[4,new Promise(function(t){fetch(window.apiBase+"/product-categories").then(function(t){return t.json()}).then(function(e){fetch(window.apiBase+"/products").then(function(a){a.json().then(function(a){t({categories:e,products:a})})})})})];case 1:return t=s.sent(),e=t.products,this.allCategories=t.categories,this.products=e,console.log("Products",e),a=this.paths.filter(function(t){if(""!==t&&t!==window.selectedLanguage&&t!==window.productsPath[window.selectedLanguage])return t}),this.allCategories.forEach(function(t){l.productIdObject[t._id]=t,"hierarchy"===t.languages.tr.path&&(console.log("Yes Hierarchy Found",t),l.mainCategory=t)}),console.log("paths Calculated",a),n=this.allCategories.filter(function(t){return t.languages[window.selectedLanguage].path===a[a.length-1]}),console.log("filtered Categories",n),1===n.length?(this.currentCategory=n[0],[2]):(i=this.allCategories.find(function(t){return t.languages[window.selectedLanguage].path===a[0]}),r=this.mainCategory.childs,i?(a.forEach(function(t,e){0===e?(console.log("first",i),r=r.find(function(t){if(t.id===i._id)return console.log("A Bulundu",t),t})):(console.log("Level Object",r),r.children&&r.children.forEach(function(e){l.productIdObject[e.id].languages[window.selectedLanguage].path===t&&(r=e,o=l.productIdObject[e.id])}))}),o?this.currentCategory=o:this.error=!0,[2]):(this.error=!0,[2,!0]))}})})},t.prototype.componentDidLoad=function(){this.initMenu()},t.prototype.componentDidUpdate=function(){this.initMenu()},t.prototype.initMenu=function(){this.menuInited||($("#demo_menu").easytree(),this.menuInited=!0)},t.prototype.linkClicked=function(t){console.log("path arrived",t)},t.prototype.listRenderer=function(t,a){var n=this;if(void 0===a&&(a=""),!this.productIdObject[t.id]||!this.productIdObject[t.id].languages)return console.log("This Category is Problematic",t),null;var i=this.productIdObject[t.id].languages[window.selectedLanguage];return e("li",null,e("a",{"data-path":i.path,href:"/"+window.selectedLanguage+"/"+window.productsPath[window.selectedLanguage]+(a.length?a+"/":"/")+i.path},i.title),t.children?e("ul",null,t.children.map(function(t){return n.listRenderer(t,a+"/"+i.path)})):"")},t.prototype.getProductsArrayByIds=function(t){var e,a,n=this,i=[];return t.forEach(function(t){var e=n.products.find(function(e){return e._id===t});e&&i.push(e)}),i=(i=i.map(function(t){return t.title=t.languages[n.language].title,t})).sort((a=1,"-"===(e="title")[0]&&(a=-1,e=e.substr(1)),function(t,n){return(t[e]<n[e]?-1:t[e]>n[e]?1:0)*a})),console.log("Result Array Arrived",i),i},t.prototype.module724Clicked=function(t,e){console.warn(e),this.openedProductIndex=this.openedProductIndex===t?null:t;var a=document.querySelector(".module-724-item-content.content-"+t),n=document.querySelectorAll(".module-724-item-content");n&&(n.forEach(function(t){return t.style.maxHeight=null}),null===this.openedProductIndex||(a.style.maxHeight=a.scrollHeight+96+"px")),this.changeTrigger=!this.changeTrigger},t.prototype.sendMail=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(a){switch(a.label){case 0:return t.preventDefault(),this.mailData.currentCategory=this.currentCategory,this.mailData.currenctSystem="",[4,fetch(window.apiBase+"/sendmail",{body:JSON.stringify(this.mailData),method:"POST",headers:{"content-type":"application/json"}}).then(function(){siiimpleToast.success(e.getStaticText("formGonderildi")),e.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}})];case 1:return a.sent(),[2]}})})},t.prototype.renderMailTemplate=function(){var t=this;return e("div",{class:"module-730-body-item"},e("div",{class:"title"},this.getStaticText("urunMailAlanBasligi")," ",e("span",{class:"info"},this.getStaticText("urunMailAlanAciklamasi"))),e("div",{class:"content"},e("form",{class:"module-70 validated"},e("div",{class:"module-70-body"},e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.name=e.target.value},value:this.mailData.name,id:"fname",type:"text",placeholder:this.getStaticText("formIsminiz")}),e("label",{htmlFor:"fname"},this.getStaticText("formIsim")))),e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.surname=e.target.value},value:this.mailData.surname,id:"lname",type:"text",placeholder:this.getStaticText("formSoyIsminiz")}),e("label",{htmlFor:"lname"},this.getStaticText("formSoyIsim")))),e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.email=e.target.value},value:this.mailData.email,id:"eposta",type:"text",placeholder:this.getStaticText("formEpostaAdresi")}),e("label",{htmlFor:"eposta"},this.getStaticText("formEposta")))),e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.phone=e.target.value},value:this.mailData.phone,id:"pnumber",type:"tel",placeholder:this.getStaticText("formTelefonNumarasi")}),e("label",{htmlFor:"pnumber"},this.getStaticText("formTelefon")))),e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.company=e.target.value},value:this.mailData.company,id:"companyname",type:"text",placeholder:this.getStaticText("formSirketIsminiz")}),e("label",{htmlFor:"companyname"},this.getStaticText("formSirket")))),e("div",{class:"module-70-item","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("input",{onInput:function(e){return t.mailData.position=e.target.value},value:this.mailData.position,id:"jobtitle",type:"text",placeholder:this.getStaticText("formGorevYaziniz")}),e("label",{htmlFor:"jobtitle"},this.getStaticText("formGorev")))),e("div",{class:"module-70-item col-full","data-aos":"fade-up"},e("div",{class:"has-float-label"},e("textarea",{onInput:function(e){return t.mailData.message=e.target.value},value:this.mailData.message,id:"message",placeholder:this.getStaticText("formMesajiniziYaziniz")}),e("label",{htmlFor:"message"},this.getStaticText("formMesaj"))))),e("div",{class:"module-70-footer"},e("a",{onClick:this.sendMail.bind(this),class:"a-btn white with-triangle",href:"",title:""},this.getStaticText("formGonder"))))))},t.prototype.bodyRenderer=function(){var t=this;if(!this.currentCategory)return null;if(this.error)return e("h1",null,"Bulunamadı");var a=this.currentCategory.languages[window.selectedLanguage];return console.log("THİS İS CATEGORY",a),e("div",{class:"module-720-body"},e("div",{class:"module-730-header"},e("h1",null,this.currentCategory.languages[this.language].title," ",this.getStaticText("urunSistemYazisi"))),e("div",{class:"module-730-body-item"},e("div",{class:"title"},this.currentCategory.languages[this.language].title," ",this.getStaticText("urunUrunleriYazisi")),e("div",{class:"content"},this.getProductsArrayByIds(this.currentCategory.products).length?e("div",{class:"module-724"},e("div",{class:"module-724-section body"},this.getProductsArrayByIds(this.currentCategory.products).map(function(a,n){if(a.languages[t.language].isEnabled)return e("div",{class:"module-724-item accordion-item "+(t.openedProductIndex===n?"active":""),onClick:function(e){return t.module724Clicked(n,e)}},e("a",{class:"module-724-item-link accordion-link",href:"javascript:void(0);",title:""},e("span",{class:"d-arrow-right arrow"}),e("span",{class:"name"},a.languages[t.language].title),e("span",{class:"code"},a.productCode)),e("div",{class:"module-724-item-content content-"+n+" accordion-content",innerHTML:a.languages[t.language].description}))}))):e("div",null,this.getStaticText("urunYok"))),this.renderMailTemplate()))},t.prototype.getStaticText=function(t){return window.staticTexts[t][this.language]},t.prototype.render=function(){var t=this;return e("section",{class:"module-720 urunler-page-new"},e("div",{class:"container module-720-container"},e("aside",{class:"module-720-aside"},e("div",{class:"module-722"},e("div",{class:"module-722-title","data-aos":"fade-up"},this.getStaticText("kategoriler"),e("hr",null)),e("div",{id:"demo_menu"},e("ul",{class:"module-722-list"},this.mainCategory.childs.map(function(e){return t.listRenderer(e)}))))),this.bodyRenderer()))},Object.defineProperty(t,"is",{get:function(){return"urunler-page-new"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{changeTrigger:{state:!0},componentData:{type:"Any",attr:"component-data"},currentCategory:{state:!0},error:{state:!0},language:{type:String,attr:"language"},paths:{type:"Any",attr:"paths"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".urunler-page-new .easytree-container{font-family:inherit!important;font-size:10pt;white-space:nowrap;padding:3px;margin:0;background-color:transparent!important;border:none!important;overflow:auto;height:100%}"},enumerable:!0,configurable:!0}),t}();t.UrunlerPageNew=a,Object.defineProperty(t,"__esModule",{value:!0})});
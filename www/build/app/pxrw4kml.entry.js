const t=window.App.h,e=()=>new Promise(t=>{fetch(`${window.apiBase}/product-categories`).then(t=>t.json()).then(e=>{fetch(`${window.apiBase}/products`).then(a=>{a.json().then(a=>{t({categories:e,products:a})})})})});class a{constructor(){this.productIdObject={},this.productPathObject={},this.error=!1,this.openedProductIndex=null,this.changeTrigger=!1,this.menuInited=!1,this.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}}async componentWillLoad(){console.log("Component Data",this.componentData),console.log("Language",this.language),console.log("paths",this.paths);const{categories:t,products:a}=await e();this.allCategories=t,this.products=a,console.log("Products",a);const i=this.paths.filter(t=>{if(""!==t&&t!==window.selectedLanguage&&t!==window.productsPath[window.selectedLanguage])return t});this.allCategories.forEach(t=>{this.productIdObject[t._id]=t,"hierarchy"===t.languages.tr.path&&(console.log("Yes Hierarchy Found",t),this.mainCategory=t)}),console.log("paths Calculated",i);const s=this.allCategories.filter(t=>t.languages[window.selectedLanguage].path===i[i.length-1]);if(console.log("filtered Categories",s),1===s.length)return void(this.currentCategory=s[0]);const l=this.allCategories.find(t=>t.languages[window.selectedLanguage].path===i[0]);let o,n=this.mainCategory.childs;if(!l)return this.error=!0,!0;i.forEach((t,e)=>{0===e?(console.log("first",l),n=n.find(t=>{if(t.id===l._id)return console.log("A Bulundu",t),t})):(console.log("Level Object",n),n.children&&n.children.forEach(e=>{this.productIdObject[e.id].languages[window.selectedLanguage].path===t&&(n=e,o=this.productIdObject[e.id])}))}),o?this.currentCategory=o:this.error=!0}componentDidLoad(){this.initMenu()}componentDidUpdate(){this.initMenu()}initMenu(){this.menuInited||($("#demo_menu").easytree(),this.menuInited=!0)}linkClicked(t){console.log("path arrived",t)}listRenderer(e,a=""){if(!this.productIdObject[e.id]||!this.productIdObject[e.id].languages)return console.log("This Category is Problematic",e),null;const i=this.productIdObject[e.id].languages[window.selectedLanguage];return t("li",null,t("a",{"data-path":i.path,href:`/${window.selectedLanguage}/${window.productsPath[window.selectedLanguage]}${a.length?a+"/":"/"}${i.path}`},i.title),e.children?t("ul",null,e.children.map(t=>this.listRenderer(t,`${a}/${i.path}`))):"")}getProductsArrayByIds(t){let e=[];var a,i;return t.forEach(t=>{const a=this.products.find(e=>e._id===t);a&&e.push(a)}),e=(e=e.map(t=>(t.title=t.languages[this.language].title,t))).sort((i=1,"-"===(a="productCode")[0]&&(i=-1,a=a.substr(1)),function(t,e){return(t[a]<e[a]?-1:t[a]>e[a]?1:0)*i})),console.log("Result Array Arrived",e),e}module724Clicked(t,e){console.warn(e),this.openedProductIndex=this.openedProductIndex===t?null:t;const a=document.querySelector(`.module-724-item-content.content-${t}`),i=document.querySelectorAll(".module-724-item-content");i&&(i.forEach(t=>t.style.maxHeight=null),null===this.openedProductIndex||(a.style.maxHeight=a.scrollHeight+96+"px")),this.changeTrigger=!this.changeTrigger}async sendMail(t){t.preventDefault(),this.mailData.currentCategory=this.currentCategory,this.mailData.currenctSystem="",await fetch(`${window.apiBase}/sendmail`,{body:JSON.stringify(this.mailData),method:"POST",headers:{"content-type":"application/json"}}).then(()=>{siiimpleToast.success(this.getStaticText("formGonderildi")),this.mailData={source:"product",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}})}renderMailTemplate(){return t("div",{class:"module-730-body-item"},t("div",{class:"title"},this.getStaticText("urunMailAlanBasligi")," ",t("span",{class:"info"},this.getStaticText("urunMailAlanAciklamasi"))),t("div",{class:"content"},t("form",{class:"module-70 validated"},t("div",{class:"module-70-body"},t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.name=t.target.value,value:this.mailData.name,id:"fname",type:"text",placeholder:this.getStaticText("formIsminiz")}),t("label",{htmlFor:"fname"},this.getStaticText("formIsim")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.surname=t.target.value,value:this.mailData.surname,id:"lname",type:"text",placeholder:this.getStaticText("formSoyIsminiz")}),t("label",{htmlFor:"lname"},this.getStaticText("formSoyIsim")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.email=t.target.value,value:this.mailData.email,id:"eposta",type:"text",placeholder:this.getStaticText("formEpostaAdresi")}),t("label",{htmlFor:"eposta"},this.getStaticText("formEposta")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.phone=t.target.value,value:this.mailData.phone,id:"pnumber",type:"tel",placeholder:this.getStaticText("formTelefonNumarasi")}),t("label",{htmlFor:"pnumber"},this.getStaticText("formTelefon")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.company=t.target.value,value:this.mailData.company,id:"companyname",type:"text",placeholder:this.getStaticText("formSirketIsminiz")}),t("label",{htmlFor:"companyname"},this.getStaticText("formSirket")))),t("div",{class:"module-70-item","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("input",{onInput:t=>this.mailData.position=t.target.value,value:this.mailData.position,id:"jobtitle",type:"text",placeholder:this.getStaticText("formGorevYaziniz")}),t("label",{htmlFor:"jobtitle"},this.getStaticText("formGorev")))),t("div",{class:"module-70-item col-full","data-aos":"fade-up"},t("div",{class:"has-float-label"},t("textarea",{onInput:t=>this.mailData.message=t.target.value,value:this.mailData.message,id:"message",placeholder:this.getStaticText("formMesajiniziYaziniz")}),t("label",{htmlFor:"message"},this.getStaticText("formMesaj"))))),t("div",{class:"module-70-footer"},t("a",{onClick:this.sendMail.bind(this),class:"a-btn white with-triangle",href:"",title:""},this.getStaticText("formGonder"))))))}bodyRenderer(){if(!this.currentCategory)return null;if(this.error)return t("h1",null,"Bulunamadı");const e=this.currentCategory.languages[window.selectedLanguage];return console.log("THİS İS CATEGORY",e),t("div",{class:"module-720-body"},t("div",{class:"module-730-header"},t("h1",null,this.currentCategory.languages[this.language].title," ",this.getStaticText("urunSistemYazisi"))),t("div",{class:"module-730-body-item"},t("div",{class:"content"},this.getProductsArrayByIds(this.currentCategory.products).length?t("div",{class:"module-724"},t("div",{class:"module-724-section body"},this.getProductsArrayByIds(this.currentCategory.products).map((e,a)=>{if(e.languages[this.language].isEnabled)return t("div",{class:`module-724-item accordion-item ${this.openedProductIndex===a?"active":""}`,onClick:t=>this.module724Clicked(a,t)},t("a",{class:"module-724-item-link accordion-link",href:"javascript:void(0);",title:""},t("span",{class:"d-arrow-right arrow"}),t("span",{class:"name"},e.languages[this.language].title),t("span",{class:"code"},e.productCode)),t("div",{class:`module-724-item-content content-${a} accordion-content`,innerHTML:e.languages[this.language].description}))}))):t("div",null,this.getStaticText("urunYok"))),this.renderMailTemplate()))}getStaticText(t){return window.staticTexts[t][this.language]}render(){return t("section",{class:"module-720 urunler-page-new"},t("div",{class:"container module-720-container"},t("aside",{class:"module-720-aside"},t("div",{class:"module-722"},t("div",{class:"module-722-title","data-aos":"fade-up"},this.getStaticText("kategoriler"),t("hr",null)),t("div",{id:"demo_menu"},t("ul",{class:"module-722-list"},this.mainCategory.childs.map(t=>this.listRenderer(t)))))),this.bodyRenderer()))}static get is(){return"urunler-page-new"}static get properties(){return{changeTrigger:{state:!0},componentData:{type:"Any",attr:"component-data"},currentCategory:{state:!0},error:{state:!0},language:{type:String,attr:"language"},paths:{type:"Any",attr:"paths"}}}static get style(){return".urunler-page-new .easytree-container{font-family:inherit!important;font-size:10pt;white-space:nowrap;padding:3px;margin:0;background-color:transparent!important;border:none!important;overflow:auto;height:100%}"}}export{a as UrunlerPageNew};
var __awaiter=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))(function(n,o){function l(e){try{s(r.next(e))}catch(e){o(e)}}function i(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){e.done?n(e.value):new a(function(t){t(e.value)}).then(l,i)}s((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var a,r,n,o,l={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;l;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(n=(n=l.trys).length>0&&n[n.length-1])&&(6===o[0]||2===o[0])){l=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){l.label=o[1];break}if(6===o[0]&&l.label<n[1]){l.label=n[1],n=o;break}if(n&&l.label<n[2]){l.label=n[2],l.ops.push(o);break}n[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};App.loadBundle("t74shu4b",["exports"],function(e){var t,a=window.App.h,r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(function(e,t){var a=9007199254740991,n="[object Arguments]",o="[object Boolean]",l="[object Date]",i="[object Function]",s="[object GeneratorFunction]",c="[object Map]",u="[object Number]",p="[object Object]",f="[object RegExp]",d="[object Set]",y="[object String]",m="[object Symbol]",h="[object ArrayBuffer]",g="[object DataView]",v="[object Float32Array]",b="[object Float64Array]",_="[object Int8Array]",T="[object Int16Array]",w="[object Int32Array]",x="[object Uint8Array]",j="[object Uint8ClampedArray]",k="[object Uint16Array]",S="[object Uint32Array]",I=/\w*$/,O=/^\[object .+?Constructor\]$/,A=/^(?:0|[1-9]\d*)$/,D={};D[n]=D["[object Array]"]=D[h]=D[g]=D[o]=D[l]=D[v]=D[b]=D[_]=D[T]=D[w]=D[c]=D[u]=D[p]=D[f]=D[d]=D[y]=D[m]=D[x]=D[j]=D[k]=D[S]=!0,D["[object Error]"]=D[i]=D["[object WeakMap]"]=!1;var M="object"==typeof r&&r&&r.Object===Object&&r,F="object"==typeof self&&self&&self.Object===Object&&self,E=M||F||Function("return this")(),P=t&&!t.nodeType&&t,z=P&&e&&!e.nodeType&&e,C=z&&z.exports===P;function $(e,t){return e.set(t[0],t[1]),e}function B(e,t){return e.add(t),e}function L(e,t,a,r){var n=-1,o=e?e.length:0;for(r&&o&&(a=e[++n]);++n<o;)a=t(a,e[n],n,e);return a}function N(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}function G(e){var t=-1,a=Array(e.size);return e.forEach(function(e,r){a[++t]=[r,e]}),a}function U(e,t){return function(a){return e(t(a))}}function W(e){var t=-1,a=Array(e.size);return e.forEach(function(e){a[++t]=e}),a}var R,Y=Array.prototype,V=Function.prototype,X=Object.prototype,q=E["__core-js_shared__"],J=(R=/[^.]+$/.exec(q&&q.keys&&q.keys.IE_PROTO||""))?"Symbol(src)_1."+R:"",K=V.toString,H=X.hasOwnProperty,Q=X.toString,Z=RegExp("^"+K.call(H).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ee=C?E.Buffer:void 0,te=E.Symbol,ae=E.Uint8Array,re=U(Object.getPrototypeOf,Object),ne=Object.create,oe=X.propertyIsEnumerable,le=Y.splice,ie=Object.getOwnPropertySymbols,se=ee?ee.isBuffer:void 0,ce=U(Object.keys,Object),ue=Ee(E,"DataView"),pe=Ee(E,"Map"),fe=Ee(E,"Promise"),de=Ee(E,"Set"),ye=Ee(E,"WeakMap"),me=Ee(Object,"create"),he=Be(ue),ge=Be(pe),ve=Be(fe),be=Be(de),_e=Be(ye),Te=te?te.prototype:void 0,we=Te?Te.valueOf:void 0;function xe(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}function je(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}function ke(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}function Se(e){this.__data__=new je(e)}function Ie(e,t,a){var r=e[t];H.call(e,t)&&Le(r,a)&&(void 0!==a||t in e)||(e[t]=a)}function Oe(e,t){for(var a=e.length;a--;)if(Le(e[a][0],t))return a;return-1}function Ae(e,t,a,r,O,A,M){var F;if(r&&(F=A?r(e,O,A,M):r(e)),void 0!==F)return F;if(!Re(e))return e;var E=Ne(e);if(E){if(F=function(e){var t=e.length,a=e.constructor(t);return t&&"string"==typeof e[0]&&H.call(e,"index")&&(a.index=e.index,a.input=e.input),a}(e),!t)return function(e,t){var a=-1,r=e.length;for(t||(t=Array(r));++a<r;)t[a]=e[a];return t}(e,F)}else{var P=ze(e),z=P==i||P==s;if(Ue(e))return function(e,t){if(t)return e.slice();var a=new e.constructor(e.length);return e.copy(a),a}(e,t);if(P==p||P==n||z&&!A){if(N(e))return A?e:{};if(F=function(e){return"function"!=typeof e.constructor||$e(e)?{}:Re(t=re(e))?ne(t):{};var t}(z?{}:e),!t)return function(e,t){return Me(e,Pe(e),t)}(e,function(t,a){return t&&Me(e,Ye(e),t)}(F))}else{if(!D[P])return A?e:{};F=function(e,t,a,r){var n,i,s=e.constructor;switch(t){case h:return De(e);case o:case l:return new s(+e);case g:return function(e,t){var a=t?De(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.byteLength)}(e,r);case v:case b:case _:case T:case w:case x:case j:case k:case S:return function(e,t){var a=t?De(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.length)}(e,r);case c:return function(e,t,a){return L(t?a(G(e),!0):G(e),$,new e.constructor)}(e,r,a);case u:case y:return new s(e);case f:return(i=new(n=e).constructor(n.source,I.exec(n))).lastIndex=n.lastIndex,i;case d:return function(e,t,a){return L(t?a(W(e),!0):W(e),B,new e.constructor)}(e,r,a);case m:return we?Object(we.call(e)):{}}}(e,P,Ae,t)}}M||(M=new Se);var C=M.get(e);if(C)return C;if(M.set(e,F),!E)var U=a?function(e,t,a){var r=Ye(e);return Ne(e)?r:function(e,t){for(var a=-1,r=t.length,n=e.length;++a<r;)e[n+a]=t[a];return e}(r,a(e))}(e,0,Pe):Ye(e);return function(n,o){for(var l=-1,i=n?n.length:0;++l<i&&!1!==(s=n[l],c=l,U&&(s=e[c=s]),void Ie(F,c,Ae(s,t,a,r,c,e,M))););var s,c}(U||e),F}function De(e){var t=new e.constructor(e.byteLength);return new ae(t).set(new ae(e)),t}function Me(e,t,a,r){a||(a={});for(var n=-1,o=t.length;++n<o;){var l=t[n],i=r?r(a[l],e[l],l,a,e):void 0;Ie(a,l,void 0===i?e[l]:i)}return a}function Fe(e,t){var a,r,n=e.__data__;return("string"==(r=typeof(a=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==a:null===a)?n["string"==typeof t?"string":"hash"]:n.map}function Ee(e,t){var a=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return!(!Re(e)||(t=e,J&&J in t))&&(We(e)||N(e)?Z:O).test(Be(e));var t}(a)?a:void 0}xe.prototype.clear=function(){this.__data__=me?me(null):{}},xe.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},xe.prototype.get=function(e){var t=this.__data__;if(me){var a=t[e];return"__lodash_hash_undefined__"===a?void 0:a}return H.call(t,e)?t[e]:void 0},xe.prototype.has=function(e){var t=this.__data__;return me?void 0!==t[e]:H.call(t,e)},xe.prototype.set=function(e,t){return this.__data__[e]=me&&void 0===t?"__lodash_hash_undefined__":t,this},je.prototype.clear=function(){this.__data__=[]},je.prototype.delete=function(e){var t=this.__data__,a=Oe(t,e);return!(a<0||(a==t.length-1?t.pop():le.call(t,a,1),0))},je.prototype.get=function(e){var t=this.__data__,a=Oe(t,e);return a<0?void 0:t[a][1]},je.prototype.has=function(e){return Oe(this.__data__,e)>-1},je.prototype.set=function(e,t){var a=this.__data__,r=Oe(a,e);return r<0?a.push([e,t]):a[r][1]=t,this},ke.prototype.clear=function(){this.__data__={hash:new xe,map:new(pe||je),string:new xe}},ke.prototype.delete=function(e){return Fe(this,e).delete(e)},ke.prototype.get=function(e){return Fe(this,e).get(e)},ke.prototype.has=function(e){return Fe(this,e).has(e)},ke.prototype.set=function(e,t){return Fe(this,e).set(e,t),this},Se.prototype.clear=function(){this.__data__=new je},Se.prototype.delete=function(e){return this.__data__.delete(e)},Se.prototype.get=function(e){return this.__data__.get(e)},Se.prototype.has=function(e){return this.__data__.has(e)},Se.prototype.set=function(e,t){var a=this.__data__;if(a instanceof je){var r=a.__data__;if(!pe||r.length<199)return r.push([e,t]),this;a=this.__data__=new ke(r)}return a.set(e,t),this};var Pe=ie?U(ie,Object):function(){return[]},ze=function(e){return Q.call(e)};function Ce(e,t){return!!(t=null==t?a:t)&&("number"==typeof e||A.test(e))&&e>-1&&e%1==0&&e<t}function $e(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||X)}function Be(e){if(null!=e){try{return K.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function Le(e,t){return e===t||e!=e&&t!=t}(ue&&ze(new ue(new ArrayBuffer(1)))!=g||pe&&ze(new pe)!=c||fe&&"[object Promise]"!=ze(fe.resolve())||de&&ze(new de)!=d||ye&&"[object WeakMap]"!=ze(new ye))&&(ze=function(e){var t=Q.call(e),a=t==p?e.constructor:void 0,r=a?Be(a):void 0;if(r)switch(r){case he:return g;case ge:return c;case ve:return"[object Promise]";case be:return d;case _e:return"[object WeakMap]"}return t});var Ne=Array.isArray;function Ge(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=a}(e.length)&&!We(e)}var Ue=se||function(){return!1};function We(e){var t=Re(e)?Q.call(e):"";return t==i||t==s}function Re(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function Ye(e){return Ge(e)?function(e,t){var a=Ne(e)||function(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&Ge(e)}(e)&&H.call(e,"callee")&&(!oe.call(e,"callee")||Q.call(e)==n)}(e)?function(e,t){for(var a=-1,r=Array(e);++a<e;)r[a]=t(a);return r}(e.length,String):[],r=a.length,o=!!r;for(var l in e)!t&&!H.call(e,l)||o&&("length"==l||Ce(l,r))||a.push(l);return a}(e):function(e){if(!$e(e))return ce(e);var t=[];for(var a in Object(e))H.call(e,a)&&"constructor"!=a&&t.push(a);return t}(e)}e.exports=function(e){return Ae(e,!0,!0)}}(t={exports:{}},t.exports),t.exports),o=function(){function e(){this.locations=[],this.renderTrigger=!1,this.activeIndex=0,this.isActiveIndexCheck=!1,this.scrolled=!1,this.mailData={source:"contact",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}}return e.prototype.componentWillLoad=function(){var e=this;if(location){console.log("Location Var",location);var t=function(e,t){void 0===t&&(t=window.location.href),t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}("city");t&&(this.activeIndex=Number(t))}fetch("http://demo.duratek.com.tr/api/datasource/locations").then(function(e){return e.json()}).then(function(t){e.locations=t,e.renderTrigger=!e.renderTrigger})},e.prototype.componentDidUpdate=function(){this.initMaps();var e=document.querySelector(".list-520-container");!this.scrolled&&e&&e.scrollIntoView()},e.prototype.initMaps=function(){var e=this,t=[];this.locations.forEach(function(a,r){(t=n(t)).push(['<div class="info-window">\n<span class="title">'+a.languages[e.language].position+'\n</span>\n<span class="name">'+a.languages[e.language].name+'</span>\n<a href="https://www.google.com/maps/?q='+a.languages[e.language].coordX+","+a.languages[e.language].coordY+'" title="" target="_blank">Google Maps</a></div>',a.languages[e.language].coordX,a.languages[e.language].coordY,r])});var a=new google.maps.StyledMapType([{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}],{name:"Duratek"}),r=new google.maps.StyledMapType([{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}],{name:"Night Mode"}),o={lat:38.963745,lng:35.243322};this.isActiveIndexCheck&&(o={lat:Number(t[this.activeIndex][1]),lng:Number(t[this.activeIndex][2])});var l=new google.maps.Map(document.getElementById("map"),{center:o,zoom:6,scrollwheel:!1,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","default_map_style","night_mode"]}});l.mapTypes.set("default_map_style",a),l.mapTypes.set("night_mode",r),l.setMapTypeId("default_map_style");var i,s,c=new google.maps.InfoWindow;for(s=0;s<t.length;s++)i=new google.maps.Marker({position:new google.maps.LatLng(t[s][1],t[s][2]),map:l}),this.isActiveIndexCheck=!0,google.maps.event.addListener(i,"click",function(e,a){return function(){c.setContent(t[a][0]),c.open(l,e)}}(i,s))},e.prototype.getStaticText=function(e){return window.staticTexts[e][this.language]},e.prototype.sendMail=function(e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(a){switch(a.label){case 0:return e.preventDefault(),[4,fetch(window.apiBase+"/sendmail",{body:JSON.stringify(this.mailData),method:"POST",headers:{"content-type":"application/json"}}).then(function(){siiimpleToast.success(t.getStaticText("formGonderildi")),t.mailData={source:"contact",name:"",surname:"",email:"",phone:"",company:"",position:"",message:""}})];case 1:return a.sent(),[2]}})})},e.prototype.render=function(){var e=this;return a("div",{class:"iletisim-statik"},a("section",{class:"module-510"},a("div",{class:"container module-510-container"},a("div",{class:"module-510-body"},a("div",{class:"module-510-body-text"},a("h3",{"data-aos":"fade-up"},this.getStaticText("iletisimFormBaslik")),a("p",{"data-aos":"fade-up"},this.getStaticText("iletisimFormAciklama"))),a("div",{class:"module-510-body-form","data-aos":"fade-up"},a("form",{class:"module-70 validated"},a("div",{class:"module-70-body"},a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.name=t.target.value},value:this.mailData.name,id:"fname",type:"text",placeholder:this.getStaticText("formIsminiz")}),a("label",{htmlFor:"fname"},this.getStaticText("formIsim")))),a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.surname=t.target.value},value:this.mailData.surname,id:"lname",type:"text",placeholder:this.getStaticText("formSoyIsminiz")}),a("label",{htmlFor:"lname"},this.getStaticText("formSoyIsim")))),a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.email=t.target.value},value:this.mailData.email,id:"eposta",type:"text",placeholder:this.getStaticText("formEpostaAdresi")}),a("label",{htmlFor:"eposta"},this.getStaticText("formEposta")))),a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.phone=t.target.value},value:this.mailData.phone,id:"pnumber",type:"tel",placeholder:this.getStaticText("formTelefonNumarasi")}),a("label",{htmlFor:"pnumber"},this.getStaticText("formTelefon")))),a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.company=t.target.value},value:this.mailData.company,id:"companyname",type:"text",placeholder:this.getStaticText("formSirketIsminiz")}),a("label",{htmlFor:"companyname"},this.getStaticText("formSirket")))),a("div",{class:"module-70-item","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("input",{onInput:function(t){return e.mailData.position=t.target.value},value:this.mailData.position,id:"jobtitle",type:"text",placeholder:this.getStaticText("formGorevYaziniz")}),a("label",{htmlFor:"jobtitle"},this.getStaticText("formGorev")))),a("div",{class:"module-70-item col-full","data-aos":"fade-up"},a("div",{class:"has-float-label"},a("textarea",{onInput:function(t){return e.mailData.message=t.target.value},value:this.mailData.message,id:"message",placeholder:this.getStaticText("formMesajiniziYaziniz")}),a("label",{htmlFor:"message"},this.getStaticText("formMesaj"))))),a("div",{class:"module-70-footer","data-aos":"fade-up"},a("a",{onClick:this.sendMail.bind(this),class:"a-btn white with-triangle",href:"",title:""},this.getStaticText("formGonder")))))))),a("section",{class:"module-520"},a("div",{class:"module-520-container"},a("div",{class:"module-520-locations","data-aos":"fade-up"},a("header",{class:"module-520-locations-header"},this.getStaticText("iletisimLokasyonlar")),a("div",{class:"list-520"},a("div",{class:"list-520-container"},this.locations.map(function(t,r){return a("div",{class:"list-520-item a"+r+" "+(e.activeIndex===r?"active":""),onClick:function(){return e.activeIndex=r}},a("div",{class:"list-520-item-header"},a("a",{href:"#!",class:"",title:""},a("span",{class:"title"},t.languages[e.language].position),a("span",{class:"name"},t.languages[e.language].name))),a("div",{class:"list-520-item-body"},a("div",{class:"coordinates",title:"Merkez / Fabrika Koordinatları"},a("div",{class:"north"},a("span",null,"N")," ",t.languages[e.language].coordX),a("div",{class:"west"},a("span",null,"W")," ",t.languages[e.language].coordY)),a("div",{class:"address"},t.languages[e.language].address),a("div",{class:"info"},a("span",{class:"title"},"Tel."),a("span",{class:"value"},t.languages[e.language].phone)),a("div",{class:"info"},a("span",{class:"title"},"Faks."),a("span",{class:"value"},t.languages[e.language].fax)),a("div",{class:"info"},a("span",{class:"title"},"Eposta."),a("a",{class:"value",href:"mailto:"+t.languages[e.language].email,title:""},t.languages[e.language].email))))})))),a("div",{id:"map",class:"module-520-map","data-aos":"fade-up","data-aos-delay":"600"}))))},Object.defineProperty(e,"is",{get:function(){return"iletisim-statik"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activeIndex:{state:!0},language:{type:"Any",attr:"language"},paths:{type:"Any",attr:"paths"},renderTrigger:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();e.IletisimStatik=o,Object.defineProperty(e,"__esModule",{value:!0})});
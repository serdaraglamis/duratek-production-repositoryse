const t=window.App.h;class a{componentWillLoad(){this.componentData&&this.language&&(this.data=this.componentData[this.language])}render(){if(this.data)return t("section",{class:"module-20"},t("div",{class:"module-20-container"},t("div",{class:"module-20-item","data-aos":"fade-right"},t("div",{class:"module-20-item-container"},t("div",{class:"module-20-item-icon"},t("div",{class:"icon-bg"},t("span",{class:"d-square-curved"})),t("span",{class:"d-layers"})),t("div",{class:"module-20-item-text"},t("h4",null,this.data.leftTitle),t("p",null,this.data.leftDescription),t("a",{class:"link link-primary with-triangle",href:`/${this.language}/${this.data.leftLink}`,title:this.data.leftButton},this.data.leftButton)))),t("div",{class:"module-20-item","data-aos":"fade-left"},t("div",{class:"module-20-item-container"},t("div",{class:"module-20-item-icon"},t("div",{class:"icon-bg"},t("span",{class:"d-square-curved"})),t("span",{class:"d-question-mark-circle"})),t("div",{class:"module-20-item-text"},t("h4",null,this.data.rightTitle),t("p",null,this.data.rightDescription),t("a",{class:"link link-primary with-triangle",href:`/${this.language}/${this.data.rightLink}`,title:this.data.rightButton},this.data.rightButton))))))}static get is(){return"module-20"}static get properties(){return{componentData:{type:"Any",attr:"component-data"},language:{type:String,attr:"language"}}}static get style(){return""}}export{a as Module20};
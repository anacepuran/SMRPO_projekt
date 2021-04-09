(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"1ebb":function(t,e,a){},aae1:function(t,e,a){"use strict";a("1ebb")},bb76:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-ma-lg window-width"},[a("q-btn",{staticClass:"q-ma-xs",attrs:{"text-color":"primary",flat:"",icon:"arrow_back_ios",label:"All sprints"},on:{click:function(e){return t.$router.back()}}}),a("q-card",{staticClass:"q-ma-lg",attrs:{flat:"",bordered:""}},[a("q-card-section",{attrs:{horizontal:""}},[a("q-card-section",{staticClass:"q-ma-md bg-primary"},[a("div",{staticClass:"text-overline text-white",staticStyle:{transform:"rotate(-90deg)","margin-top":"225%"}},[t._v("Sprint")])]),a("q-card-section",{staticClass:"q-ma-sm",staticStyle:{width:"30%"}},[a("div",{staticClass:"text-h5 q-ma-md"},[t._v(t._s(t.sprints.name))]),a("div",{staticClass:"text-overline q-ma-md"},[t._v("StartDate: "+t._s(t.sprints.start_date))]),a("div",{staticClass:"text-overline q-ma-md"},[t._v("EndDate: "+t._s(t.sprints.end_date))]),a("div",{staticClass:"text-overline q-ma-md"},[t._v("Expected Time: "+t._s(t.sprints.expected_time)+" days")])]),a("q-separator",{attrs:{vertical:""}}),a("q-card-section",{staticClass:"full-width"},[a("div",{staticClass:"row"},[a("q-space"),a("div",{staticClass:"q-ma-sm"},["Admin"===t.user.permissions?a("q-btn",{attrs:{size:"md",color:"primary",label:"Add Card",icon:"create_new_folder"},on:{click:function(e){t.addCard=!0}}}):t._e()],1)],1)])],1)],1),a("draggable",t._b({staticClass:"row q-mt-xs",attrs:{group:"columns"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}}},"draggable",t.dragOptions,!1),t._l(t.sections,(function(e,s){return a("div",{key:s,staticClass:"col-3 q-px-xs"},[a("div",{staticClass:"q-pa-xs column-background"},[a("q-item",{staticClass:"q-pa-none text-white q-pa-sm",class:e.theme,staticStyle:{cursor:"move"}},[a("q-item-section",{staticStyle:{"min-width":"25px"},attrs:{avatar:""}},[a("q-icon",{staticClass:"q-pa-none q-ma-none",attrs:{name:"list"}})],1),a("q-item-section",{staticClass:"text-h6 text-weight-bolder"},[t._v(t._s(e.name))])],1),a("draggable",t._b({staticClass:"list-group",attrs:{list:t.cards,group:"tasks"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}}},"draggable",t.dragOptions,!1),t._l(t.allCards,(function(s,r){return a("div",{key:r},[s.round.toLowerCase().trim()==e.name.toLowerCase().trim()?a("q-card",{staticClass:"box-shadow cursor-move bg-white q-mt-xs list-group-item",class:e.border,attrs:{square:"",flat:"",bordered:""}},[a("span",{staticClass:"text-caption text-grey-9 q-ml-xs"},[t._v("\n                "+t._s(s.card_name)+"\n              ")]),a("q-card-section",{staticClass:"q-pt-sm"},[a("div",{staticClass:"row items-center no-wrap"},[a("div",{staticClass:"col"},[a("div",[t._v(t._s(s.description))])])])])],1):t._e()],1)})),0)],1)])})),0),a("q-dialog",{model:{value:t.addCard,callback:function(e){t.addCard=e},expression:"addCard"}},[a("q-card",{staticClass:"q-pa-md",staticStyle:{width:"80vh"}},[a("q-card-section",{staticClass:"row items-center"},[a("div",{staticClass:"text-h6 q-ma-md"},[t._v("Add new card")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:t.onReset}})],1),a("CardsForm",{on:{submitCard:t.showCards}})],1)],1)],1)},r=[],i=a("7053"),n=a.n(i),d=a("2f62"),l=a("2b0e"),o=a("b76a"),c=a.n(o),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-form",{staticClass:"q-gutter-md",on:{submit:t.onSubmit,reset:t.onReset}},[a("q-input",{attrs:{filled:"",label:"Card name","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newCard.card_name,callback:function(e){t.$set(t.newCard,"card_name",e)},expression:"newCard.card_name"}}),a("q-input",{attrs:{filled:"",label:"Card description","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newCard.description,callback:function(e){t.$set(t.newCard,"description",e)},expression:"newCard.description"}}),a("q-select",{staticStyle:{width:"250px"},attrs:{filled:"",options:t.priority_options,label:"Priority"},model:{value:t.newCard.priority,callback:function(e){t.$set(t.newCard,"priority",e)},expression:"newCard.priority"}}),a("q-input",{attrs:{filled:"",label:"Acceptance test","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newCard.acceptance_test,callback:function(e){t.$set(t.newCard,"acceptance_test",e)},expression:"newCard.acceptance_test"}}),a("q-card-actions",{attrs:{horizontal:"",align:"right"}},[a("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1)],1)},p=[],u={name:"CardForm",data(){return{newCard:{sprint_id:"",card_name:"",description:"",acceptance_test:"",priority:"",value:"",subtasks:"",round:""},priority_options:["Must have","Could have","Should have","Won't have this time"]}}},b=u,C=a("2877"),h=a("0378"),f=a("27f9"),g=a("ddd8"),_=a("4b7e"),q=a("9c40"),v=a("eebe"),w=a.n(v),x=Object(C["a"])(b,m,p,!1,null,null,null),y=x.exports;w()(x,"components",{QForm:h["a"],QInput:f["a"],QSelect:g["a"],QCardActions:_["a"],QBtn:q["a"]}),l["a"].component("draggable",c.a);var k={name:"Zgodbe",components:{CardsForm:y},data(){return{addCard:!1,sections:{1:{name:"To do",theme:"to-do-title",border:"border-todo"},2:{name:"In progress",theme:"in-progress-title",border:"border-in-progress"},3:{name:"Test",theme:"test-title",border:"border-test"},4:{name:"Done",theme:"done-title",border:"border-done"}},sprints:[],user:{},pagination:{rowsPerPage:0},allCards:[],newCard:{sprint_id:"",card_name:"",description:"",acceptance_test:"",priority:"",value:"",subtasks:"",round:""},sprintId:"",add_new:!1,drag:!1}},mounted(){this.fetchCards(),this.user=this.getCurrentUser(),this.sprintId=this.$route.params.id,this.sprints=this.sprint(),this.showCards()},methods:n()(n()(n()(n()(n()({},Object(d["c"])("user",["getCurrentUser"])),Object(d["c"])("card",["getCards"])),Object(d["c"])("sprint",["getSprints"])),Object(d["b"])("card",["fetchCards","postCard","updateCard"])),{},{sprint(){var t=this.getSprints();for(var e in t)if(t[e]._id===this.sprintId)return t[e];return"No sprint found."},showCards(){setTimeout((()=>{var t=this.getCards();this.allCards=this.cardsToArray(t)}),1e3)},cardsToArray(t){var e=[];for(var a in t)t[a].sprint_id===this.sprintId&&e.push(t[a]);return e},columns(){return"Admin"===this.user.permissions?[{name:"name",required:!0,label:"Name",align:"left",field:t=>t.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"startdate",align:"left",label:"StartDate",field:"startdate",sortable:!0},{name:"enddate",align:"left",label:"EndDate",field:"enddate",sortable:!0},{name:"expectedtime",align:"left",label:"expectedtime",field:"expectedtime",sortable:!0},{name:"delete",align:"center",label:"Delete project",field:"delete"}]:[{name:"name",required:!0,label:"Name",align:"left",field:t=>t.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"startdate",align:"left",label:"StartDate",field:"startdate",sortable:!0},{name:"enddate",align:"left",label:"EndDate",field:"enddate",sortable:!0},{name:"expectedtime",align:"left",label:"expectedtime",field:"expectedtime",sortable:!0}]},dragOptions(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},addNewTask(){const t=Math.max.apply(Math,this.task_to_do.map((function(t){return t.id})));this.task_item.id=t+1,this.task_to_do.push(this.task_item),this.add_new=!1,this.postCard(this.task_item),this.onReset(),this.$q.notify({type:"positive",message:"The new task is added successfully."})},deleteTask(t,e){this[t].splice(e,1)}})},S=k,Q=(a("aae1"),a("9989")),A=a("f09f"),D=a("a370"),I=a("eb85"),O=a("2c91"),T=a("66e5"),$=a("4074"),P=a("0016"),j=a("24e8"),z=a("7f67"),E=Object(C["a"])(S,s,r,!1,null,"58c3515a",null);e["default"]=E.exports;w()(E,"components",{QPage:Q["a"],QBtn:q["a"],QCard:A["a"],QCardSection:D["a"],QSeparator:I["a"],QSpace:O["a"],QItem:T["a"],QItemSection:$["a"],QIcon:P["a"],QDialog:j["a"]}),w()(E,"directives",{ClosePopup:z["a"]})}}]);
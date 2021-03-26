(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"1da1":function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[s("q-input",{attrs:{filled:"",label:"Project name","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushProject.name,callback:function(t){e.$set(e.pushProject,"name",t)},expression:"pushProject.name"}}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-8"},[s("q-select",{attrs:{filled:"",multiple:"",options:e.allUsers,label:"Users",color:"secondary","use-chips":"","stack-label":""},model:{value:e.pushProject.users,callback:function(t){e.$set(e.pushProject,"users",t)},expression:"pushProject.users"}})],1),s("q-space"),s("div",{staticClass:"col q-ma-md"},[s("q-btn",{attrs:{size:"md",label:"Set user roles",color:"secondary"},on:{click:function(t){e.setRoles=!e.setRoles}}})],1)],1),e.setRoles?s("q-list",{attrs:{separator:""}},e._l(e.pushProject.users,(function(t){return s("q-item",{key:t.label},[s("q-item-section",[e._v(e._s(t.label))]),s("q-space"),s("q-select",{staticStyle:{width:"250px"},attrs:{filled:"",options:e.roleOptions,label:"Users"},model:{value:t.role,callback:function(s){e.$set(t,"role",s)},expression:"user.role"}})],1)})),1):e._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col q-ma-sm"},[s("q-btn",{attrs:{label:"Select deadline",icon:"event",color:"secondary"},on:{click:function(t){e.datePicker=!0}}})],1),s("div",{staticClass:"col q-ma-md"},[s("q-badge",{attrs:{color:"secondary"}},[e._v("\n                Deadline: "+e._s(e.selectDeadline)+"\n            ")])],1)]),s("q-dialog",{model:{value:e.datePicker,callback:function(t){e.datePicker=t},expression:"datePicker"}},[s("q-card",{staticClass:"q-ma-md"},[s("div",{staticClass:"row"},[s("q-date",{attrs:{mask:"DD/MM/YYYY",minimal:""},model:{value:e.selectDeadline,callback:function(t){e.selectDeadline=t},expression:"selectDeadline"}})],1),s("div",{staticClass:"row q-ma-md flex flex-center"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Save",color:"primary"},on:{click:function(t){e.pushProject.deadline=e.selectDeadline}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Reset",flat:"",color:"primary"},on:{click:function(t){e.selectDeadline=""}}})],1)])],1),s("q-card-actions",{attrs:{horizontal:"",align:"right"}},[s("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),s("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1),s("div",{staticClass:"q-ma-md text-center"},[""!=e.error?s("p",{staticStyle:{color:"red"}},[e._v(e._s(e.error))]):e._e()])],1)},a=[],o=s("7053"),c=s.n(o),i=(s("4d90"),s("2f62")),n={name:"ProjectForm",data(){return{error:"",roleOptions:["Product Manager","Development Team Member","Methodology Admin"],allProjects:[],setRoles:!1,datePicker:!1,selectDeadline:"",pushProject:{name:"",users:[],deadline:""},today:""}},props:{editProject:{type:Boolean},newProject:{type:Object}},computed:{allUsers(){var e=[],t=this.getUsers();for(var s in t){var r={label:t[s].username,value:t[s].username,role:""};e.push(r)}return console.log(e),e}},mounted(){this.fetchProjects(),this.fetchUsers();var e=this.getProjects();this.allProjects=this.projectsToArray(e),this.onReset(),this.today=this.getDate(),this.selectDeadline=this.pushProject.deadline},methods:c()(c()(c()(c()(c()({},Object(i["c"])("project",["getProjects"])),Object(i["c"])("user",["getUsers"])),Object(i["b"])("project",["fetchProjects","postProject","updateProject"])),Object(i["b"])("user",["fetchUsers"])),{},{projectsToArray(e){var t=[];for(var s in e)t.push(e[s]);return t},usersPushData(e){var t=[],s=this.getUsers();for(var r in e)for(var a in s)if(e[r].label===s[a].username){var o={user_name:s[a].username,user_id:s[a]._id,user_role:e[r].role};t.push(o)}return t},getDate(){var e=new Date,t=`${e.getDate().toString().padStart(2,"0")}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getFullYear()}`;return t},checkProjectName(){var e=!1;if(this.pushProject.name!==this.newProject.name)for(var t in this.allProjects)this.pushProject.name===this.allProjects[t].name&&(e=!0,this.error='Project with the name "'+this.pushProject.name+'" already exists.');else e=!0;return e},setPushUser(){this.pushProject.users=this.usersPushData(this.pushProject.users),""!==this.selectDeadline&&this.today!==this.selectDeadline?this.pushProject.deadline=this.selectDeadline:this.pushProject.deadline="No deadline"},onSubmit(){var e="";this.checkProjectName()||(this.setPushUser(),this.$props.editProject?(e="Project updated.",this.updateProject(this.pushProject),this.onReset()):(e="Project added.",this.postProject(this.pushProject),this.onReset()),this.$q.notify({color:"green",textColor:"white",icon:"cloud_done",message:e,position:"top-right",timeout:1e3}),this.error="",this.$emit("submitProject"))},onReset(){this.pushProject.name=this.$props.newProject.name,this.pushProject.users=this.$props.newProject.users,this.pushProject.deadline=this.$props.newProject.deadline,this.pushProject._id=this.$props.newProject._id,this.selectDeadline=this.$props.newProject.deadline,this.error=""}})},l=n,d=s("2877"),u=s("0378"),p=s("27f9"),m=s("ddd8"),h=s("2c91"),j=s("9c40"),f=s("1c1c"),P=s("66e5"),b=s("4074"),v=s("58a81"),q=s("24e8"),g=s("f09f"),w=s("52ee"),y=s("4b7e"),C=s("7f67"),_=s("eebe"),k=s.n(_),D=Object(d["a"])(l,r,a,!1,null,null,null);t["a"]=D.exports;k()(D,"components",{QForm:u["a"],QInput:p["a"],QSelect:m["a"],QSpace:h["a"],QBtn:j["a"],QList:f["a"],QItem:P["a"],QItemSection:b["a"],QBadge:v["a"],QDialog:q["a"],QCard:g["a"],QDate:w["a"],QCardActions:y["a"]}),k()(D,"directives",{ClosePopup:C["a"]})},bc13:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"q-ma-lg window-width"},[s("div",{staticClass:"text-h4 q-ma-md"},[e._v("Projects")]),s("div",{staticClass:"row q-ma-md"},[s("div",{staticClass:"col-3"},[s("q-input",{attrs:{dense:"",outlined:"","bottom-slots":"",label:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[""!==e.search?s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(t){e.search=""}}}):e._e(),s("q-icon",{attrs:{name:"search"}})]},proxy:!0},{key:"hint",fn:function(){return[e._v("\n          Search project by name\n        ")]},proxy:!0}]),model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),s("q-space"),s("div",{staticClass:"q-ma-sm col-2"},["Admin"===e.currentUser.permissions?s("q-btn",{attrs:{size:"md",color:"primary",label:"Add project",icon:"create_new_folder"},on:{click:function(t){e.addProject=!0}}}):e._e()],1)],1),s("div",{staticClass:"row q-ma-md"},[s("q-table",{staticClass:"full-width",attrs:{data:e.filteredProjects,columns:e.columns,"row-key":"name","virtual-scroll":"",pagination:e.pagination,"rows-per-page-options":[0],loading:e.loading},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"loading",fn:function(){return[s("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"body-cell-name",fn:function(t){return[s("q-td",{attrs:{props:t},on:{click:function(s){return e.openProject(t.row._id)}}},[s("div",[s("q-icon",{staticClass:"q-ma-sm",attrs:{size:"sm",color:"secondary",name:"folder_open"}}),s("span",{staticClass:"q-ma-sm",staticStyle:{"font-size":"2vh"}},[e._v(e._s(t.row.name))])],1)])]}},{key:"body-cell-users",fn:function(t){return[s("q-td",{attrs:{props:t}},e._l(t.row.users,(function(t){return s("div",{key:t.user_name,staticClass:"row"},[s("div",{attrs:{clasS:" col-1"}},[s("q-avatar",{staticClass:"q-ma-xs",attrs:{size:"20px","font-size":"15px",color:"secondary","text-color":"white",icon:"person"}})],1),s("span",{staticClass:"col-2 q-ma-xs"},[e._v(e._s(t.user_name))]),s("span",{staticClass:"col text-caption text-grey q-ma-xs"},[e._v(" "+e._s(t.user_role))])])})),0)]}},"Admin"===e.currentUser.permissions?{key:"body-cell-delete",fn:function(t){return[s("q-td",{attrs:{props:t}},[s("div",[s("q-btn",{attrs:{size:"sm",round:"",color:"negative",icon:"delete"},on:{click:function(s){e.confirmDelete=!0,e.deleteProjectId=t.row._id}}})],1)])]}}:null],null,!0)})],1),s("q-dialog",{model:{value:e.confirmDelete,callback:function(t){e.confirmDelete=t},expression:"confirmDelete"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("q-avatar",{attrs:{icon:"delete",color:"primary","text-color":"white"}}),s("span",{staticClass:"q-ml-sm"},[e._v("Are you sure you want to delete this project?")])],1),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"},on:{click:function(t){e.deleteProjectId=""}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"DELETE",color:"negative"},on:{click:function(t){return e.deleteFunction(e.deleteProjectId)}}})],1)],1)],1),s("q-dialog",{model:{value:e.addProject,callback:function(t){e.addProject=t},expression:"addProject"}},[s("q-card",{staticClass:"q-pa-md",staticStyle:{width:"80vh"}},[s("q-card-section",{staticClass:"row items-center"},[s("div",{staticClass:"text-h6 q-ma-md"},[e._v("Create new project")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:e.onReset}})],1),s("ProjectForm",{attrs:{newProject:e.newProject,editProject:!1},on:{submitProject:e.showProjects}})],1)],1)],1)},a=[],o=s("7053"),c=s.n(o),i=s("2f62"),n=s("1da1"),l={name:"Home",components:{ProjectForm:n["a"]},data(){return{currentUser:{},pagination:{rowsPerPage:0},loading:!1,search:"",addProject:!1,deleteProjectId:"",confirmDelete:!1,projects:[],newProject:{name:"",users:[],deadline:""}}},computed:{filteredProjects(){return this.getSearchFiltered(this.search)},columns(){return"Admin"===this.currentUser.permissions?[{name:"name",required:!0,label:"Name",align:"left",field:e=>e.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"deadline",align:"left",label:"Deadline",field:"deadline",sortable:!0},{name:"delete",align:"center",label:"Delete project",field:"delete"}]:[{name:"name",required:!0,label:"Name",align:"left",field:e=>e.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"deadline",align:"left",label:"Deadline",field:"deadline",sortable:!0}]}},methods:c()(c()(c()(c()({},Object(i["c"])("user",["getCurrentUser"])),Object(i["c"])("project",["getProjects"])),Object(i["b"])("project",["fetchProjects","editProject","deleteProject"])),{},{openProject(e){console.log(e),this.$router.push("/project/"+e)},deleteFunction(e){this.deleteProject(e),this.showProjects()},showProjects(){this.addProject=!1,this.loading=!0,setTimeout((()=>{var e=this.getProjects();this.projects=this.projectsToArray(e),this.loading=!1}),1e3)},projectsToArray(e){var t=[];for(var s in e)t.push(e[s]);return t},onReset(){this.newProject.name="",this.newProject.users=[],this.newProject.deadline=""},getSearchFiltered(e){if(""!==this.search){var t=[];for(var s in this.projects){const r=this.projects[s].name.toLowerCase();r.startsWith(e.toLowerCase())&&t.push(this.projects[s])}return t}return this.projects}}),mounted(){this.currentUser=this.getCurrentUser(),this.fetchProjects(),this.showProjects()}},d=l,u=s("2877"),p=s("9989"),m=s("27f9"),h=s("0016"),j=s("2c91"),f=s("9c40"),P=s("eaac"),b=s("74f7"),v=s("db86"),q=s("cb32"),g=s("24e8"),w=s("f09f"),y=s("a370"),C=s("4b7e"),_=s("7f67"),k=s("eebe"),D=s.n(k),x=Object(u["a"])(d,r,a,!1,null,null,null);t["default"]=x.exports;D()(x,"components",{QPage:p["a"],QInput:m["a"],QIcon:h["a"],QSpace:j["a"],QBtn:f["a"],QTable:P["a"],QInnerLoading:b["a"],QTd:v["a"],QAvatar:q["a"],QDialog:g["a"],QCard:w["a"],QCardSection:y["a"],QCardActions:C["a"]}),D()(x,"directives",{ClosePopup:_["a"]})}}]);
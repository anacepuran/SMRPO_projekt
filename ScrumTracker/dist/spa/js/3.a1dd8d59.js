(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"1da1":function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[s("q-input",{attrs:{filled:"",label:"Project name","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushProject.name,callback:function(t){e.$set(e.pushProject,"name",t)},expression:"pushProject.name"}}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-8"},[s("q-select",{attrs:{filled:"",multiple:"",options:e.allUsers,label:"Users",color:"secondary","use-chips":"","stack-label":""},model:{value:e.pushProject.users,callback:function(t){e.$set(e.pushProject,"users",t)},expression:"pushProject.users"}})],1),s("q-space"),s("div",{staticClass:"col q-ma-md"},[s("q-btn",{attrs:{size:"md",label:"Set user roles",color:"secondary"},on:{click:function(t){e.setRoles=!e.setRoles}}})],1)],1),e.setRoles?s("q-list",{attrs:{separator:""}},e._l(e.pushProject.users,(function(t){return s("q-item",{key:t.label},[s("q-item-section",[e._v(e._s(t.label))]),s("q-space"),s("q-select",{staticStyle:{width:"250px"},attrs:{filled:"",options:e.roleOptions,label:"Users"},model:{value:t.role,callback:function(s){e.$set(t,"role",s)},expression:"user.role"}})],1)})),1):e._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col q-ma-sm"},[s("q-btn",{attrs:{label:"Select deadline",icon:"event",color:"secondary"},on:{click:function(t){e.datePicker=!0}}})],1),s("div",{staticClass:"col q-ma-md"},[s("q-badge",{attrs:{color:"secondary"}},[e._v("\n                Deadline: "+e._s(e.selectDeadline)+"\n            ")])],1)]),s("q-dialog",{model:{value:e.datePicker,callback:function(t){e.datePicker=t},expression:"datePicker"}},[s("q-card",{staticClass:"q-ma-md"},[s("div",{staticClass:"row"},[s("q-date",{attrs:{mask:"DD/MM/YYYY",minimal:""},model:{value:e.selectDeadline,callback:function(t){e.selectDeadline=t},expression:"selectDeadline"}})],1),s("div",{staticClass:"row q-ma-md flex flex-center"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Save",color:"primary"},on:{click:function(t){e.pushProject.deadline=e.selectDeadline}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Reset",flat:"",color:"primary"},on:{click:function(t){e.selectDeadline=""}}})],1)])],1),s("q-card-actions",{attrs:{horizontal:"",align:"right"}},[s("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),s("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1),s("div",{staticClass:"q-ma-md text-center"},[""!=e.error?s("p",{staticStyle:{color:"red"}},[e._v(e._s(e.error))]):e._e()])],1)},a=[],i=s("7053"),o=s.n(i),n=(s("4d90"),s("2f62")),c={name:"ProjectForm",data(){return{error:"",roleOptions:["Product Manager","Development Team Member","Methodology Admin"],allProjects:[],setRoles:!1,datePicker:!1,selectDeadline:"",pushProject:{name:"",users:[],deadline:""},today:""}},props:{editProject:{type:Boolean},newProject:{type:Object}},computed:{allUsers(){var e=[],t=this.getUsers();for(var s in t){var r={label:t[s].username,value:t[s].username,role:""};e.push(r)}return console.log(e),e}},mounted(){this.fetchProjects(),this.fetchUsers();var e=this.getProjects();this.allProjects=this.projectsToArray(e),this.onReset(),this.today=this.getDate(),this.selectDeadline=this.pushProject.deadline},methods:o()(o()(o()(o()(o()({},Object(n["c"])("project",["getProjects"])),Object(n["c"])("user",["getUsers"])),Object(n["b"])("project",["fetchProjects","postProject","updateProject"])),Object(n["b"])("user",["fetchUsers"])),{},{projectsToArray(e){var t=[];for(var s in e)t.push(e[s]);return t},usersPushData(e){var t=[],s=this.getUsers();for(var r in e)for(var a in s)if(e[r].label===s[a].username){var i={user_name:s[a].username,user_id:s[a]._id,user_role:e[r].role};t.push(i)}return t},getDate(){var e=new Date,t=`${e.getDate().toString().padStart(2,"0")}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getFullYear()}`;return t},checkProjectName(){var e=!1;if(this.pushProject.name!==this.newProject.name)for(var t in this.allProjects)this.pushProject.name===this.allProjects[t].name&&(e=!0,this.error='Project with the name "'+this.pushProject.name+'" already exists.');else e=!0;return e},setPushUser(){this.pushProject.users=this.usersPushData(this.pushProject.users),""!==this.selectDeadline&&this.today!==this.selectDeadline?this.pushProject.deadline=this.selectDeadline:this.pushProject.deadline="No deadline"},onSubmit(){var e="";this.checkProjectName()||(this.setPushUser(),this.$props.editProject?(e="Project updated.",this.updateProject(this.pushProject),this.onReset()):(e="Project added.",this.postProject(this.pushProject),this.onReset()),this.$q.notify({color:"green",textColor:"white",icon:"cloud_done",message:e,position:"top-right",timeout:1e3}),this.error="",this.$emit("submitProject"))},onReset(){this.pushProject.name=this.$props.newProject.name,this.pushProject.users=this.$props.newProject.users,this.pushProject.deadline=this.$props.newProject.deadline,this.pushProject._id=this.$props.newProject._id,this.selectDeadline=this.$props.newProject.deadline,this.error=""}})},l=c,d=s("2877"),p=s("0378"),u=s("27f9"),h=s("ddd8"),m=s("2c91"),j=s("9c40"),P=s("1c1c"),f=s("66e5"),v=s("4074"),b=s("58a81"),q=s("24e8"),g=s("f09f"),w=s("52ee"),y=s("4b7e"),_=s("7f67"),C=s("eebe"),S=s.n(C),D=Object(d["a"])(l,r,a,!1,null,null,null);t["a"]=D.exports;S()(D,"components",{QForm:p["a"],QInput:u["a"],QSelect:h["a"],QSpace:m["a"],QBtn:j["a"],QList:P["a"],QItem:f["a"],QItemSection:v["a"],QBadge:b["a"],QDialog:q["a"],QCard:g["a"],QDate:w["a"],QCardActions:y["a"]}),S()(D,"directives",{ClosePopup:_["a"]})},"27e4":function(e,t,s){},"3ea8":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"q-ma-lg window-width"},[s("q-btn",{staticClass:"q-ma-xs",attrs:{"text-color":"primary",flat:"",icon:"arrow_back_ios",label:"All projects"},on:{click:function(t){return e.$router.push("/home")}}}),s("q-card",{staticClass:"q-ma-lg",attrs:{flat:"",bordered:""}},[s("q-card-section",{attrs:{horizontal:""}},[s("q-card-section",{staticClass:"q-ma-md bg-primary"},[s("div",{staticClass:"text-overline text-white",staticStyle:{transform:"rotate(-90deg)","margin-top":"150%"}},[e._v("Project")])]),s("q-card-section",{staticClass:"q-ma-md"},[s("div",{staticClass:"text-h5 q-ma-md"},[e._v(e._s(e.project.name))]),s("div",{staticClass:"text-overline q-ma-md"},[e._v("Deadline: "+e._s(e.project.deadline))])]),s("q-separator",{attrs:{vertical:""}}),s("q-card-section",{staticStyle:{width:"50%"}},e._l(e.project.users,(function(t){return s("div",{key:t.user_name,staticClass:"row q-ma-md"},[s("q-avatar",{staticClass:"q-ma-xs",attrs:{size:"20px","font-size":"15px",color:"secondary","text-color":"white",icon:"person"}}),s("span",{staticClass:"q-ma-xs",staticStyle:{"font-weight":"bold"}},[e._v(e._s(t.user_name))]),s("span",{staticClass:"text-caption text-dark-grey q-ma-xs"},[e._v(" "+e._s(t.user_role))])],1)})),0),s("q-card-section",{staticClass:"full-width"},[s("div",{staticClass:"row"},[s("q-space"),e.checkRole()?s("q-btn",{staticClass:"q-ma-md",attrs:{size:"md",icon:"edit",color:"primary",label:"Edit project"},on:{click:e.editFunction}}):e._e()],1)])],1)],1),s("q-dialog",{model:{value:e.editProjectData,callback:function(t){e.editProjectData=t},expression:"editProjectData"}},[s("q-card",{staticClass:"q-pa-md",staticStyle:{width:"80vh"}},[s("q-card-section",{staticClass:"row items-center"},[s("div",{staticClass:"text-h6"},[e._v(e._s(e.dialogTitle))]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),s("ProjectForm",{attrs:{newProject:e.editProject,editProject:e.editProjectData},on:{submitProject:function(t){return e.updateProjectInfo()}}})],1)],1),s("q-card",{staticClass:"q-ma-md"},[s("q-card-section",{staticClass:"bg-secondary"},[s("div",{staticClass:"text-white text-h6"},[e._v("Sprints")]),s("div",{staticClass:"q-ma-sm col-2"},["Admin"===e.user.permissions?s("q-btn",{attrs:{size:"md",color:"primary",label:"Add Sprint",icon:"create_new_folder"},on:{click:function(t){e.addProject=!0}}}):e._e()],1)]),s("div",{staticClass:"row q-ma-md"},[s("q-table",{staticClass:"full-width",attrs:{data:e.filteredProjects,columns:e.columns,"row-key":"name","virtual-scroll":"",pagination:e.pagination,"rows-per-page-options":[0],loading:e.loading},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"loading",fn:function(){return[s("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"body-cell-name",fn:function(t){return[s("q-td",{attrs:{props:t},on:{click:function(s){return e.openSprint(t.row._id)}}},[s("div",[s("q-icon",{staticClass:"q-ma-sm",attrs:{size:"sm",color:"secondary",name:"folder_open"}}),s("span",{staticClass:"q-ma-sm",staticStyle:{"font-size":"2vh"}},[e._v(e._s(t.row.name))])],1)])]}},{key:"body-cell-users",fn:function(t){return[s("q-td",{attrs:{props:t}},e._l(t.row.users,(function(t){return s("div",{key:t.user_name,staticClass:"row"},[s("div",{attrs:{clasS:" col-1"}},[s("q-avatar",{staticClass:"q-ma-xs",attrs:{size:"20px","font-size":"15px",color:"secondary","text-color":"white",icon:"person"}})],1),s("span",{staticClass:"col-2 q-ma-xs"},[e._v(e._s(t.user_name))]),s("span",{staticClass:"col text-caption text-grey q-ma-xs"},[e._v(" "+e._s(t.user_role))])])})),0)]}},"Admin"===e.user.permissions?{key:"body-cell-delete",fn:function(t){return[s("q-td",{attrs:{props:t}},[s("div",[s("q-btn",{attrs:{size:"sm",round:"",color:"negative",icon:"delete"},on:{click:function(s){e.confirmDelete=!0,e.deleteProjectId=t.row._id}}})],1)])]}}:null],null,!0)})],1),s("q-dialog",{model:{value:e.confirmDelete,callback:function(t){e.confirmDelete=t},expression:"confirmDelete"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("q-avatar",{attrs:{icon:"delete",color:"primary","text-color":"white"}}),s("span",{staticClass:"q-ml-sm"},[e._v("Are you sure you want to delete this project?")])],1),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"},on:{click:function(t){e.deleteProjectId=""}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"DELETE",color:"negative"},on:{click:function(t){return e.deleteFunction(e.deleteProjectId)}}})],1)],1)],1),s("q-dialog",{model:{value:e.addProject,callback:function(t){e.addProject=t},expression:"addProject"}},[s("q-card",{staticClass:"q-pa-md",staticStyle:{width:"80vh"}},[s("q-card-section",{staticClass:"row items-center"},[s("div",{staticClass:"text-h6 q-ma-md"},[e._v("Create new Sprint")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:e.onReset}})],1),s("SprintForm",{attrs:{newProject:e.newSprint,editProject:!1},on:{submitProject:e.showSprints}})],1)],1)],1)],1)},a=[],i=s("7053"),o=s.n(i),n=s("2f62"),c=s("1da1"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[s("q-input",{attrs:{filled:"",label:"Project name","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushProject.name,callback:function(t){e.$set(e.pushProject,"name",t)},expression:"pushProject.name"}}),s("div",{staticClass:"col q-ma-sm"},[s("q-btn",{attrs:{label:"Select deadline",icon:"event",color:"secondary"},on:{click:function(t){e.datePicker=!0}}})],1),s("div",{staticClass:"col q-ma-md"},[s("q-badge",{attrs:{color:"secondary"}},[e._v("\n                Deadline: "+e._s(e.selectDeadline)+"\n            ")])],1),s("q-dialog",{model:{value:e.datePicker,callback:function(t){e.datePicker=t},expression:"datePicker"}},[s("q-card",{staticClass:"q-ma-md"},[s("div",{staticClass:"row"},[s("q-date",{attrs:{mask:"DD/MM/YYYY",minimal:"",range:""},model:{value:e.selectDeadline,callback:function(t){e.selectDeadline=t},expression:"selectDeadline"}})],1),s("div",{staticClass:"row q-ma-md flex flex-center"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Save",color:"primary"},on:{click:function(t){return e.setdates()}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Reset",flat:"",color:"primary"},on:{click:function(t){e.selectDeadline=""}}})],1)])],1),s("q-input",{attrs:{type:"number",name:"Expected Time",min:"1",max:"50"},model:{value:e.pushProject.expectedtime,callback:function(t){e.$set(e.pushProject,"expectedtime",t)},expression:"pushProject.expectedtime"}}),s("q-card-actions",{attrs:{horizontal:"",align:"right"}},[s("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),s("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1),s("div",{staticClass:"q-ma-md text-center"},[""!=e.error?s("p",{staticStyle:{color:"red"}},[e._v(e._s(e.error))]):e._e()])],1)},d=[],p=(s("4d90"),{name:"SprintForm",data(){return{error:"",roleOptions:["Product Manager","Development Team Member","Methodology Admin"],allProjects:[],setRoles:!1,datePicker:!1,selectDeadline:"",pushProject:{name:"",_id:"",startdate:"",enddate:"",expectedtime:""},today:""}},props:{editProject:{type:Boolean},newProject:{type:Object}},computed:{allUsers(){var e=[],t=this.getUsers();for(var s in t){var r={label:t[s].username,value:t[s].username,role:""};e.push(r)}return console.log(e),e}},mounted(){this.fetchSprint(),this.fetchUsers();var e=this.getSprints();this.allProjects=this.projectsToArray(e),this.onReset(),this.today=this.getDate(),this.selectDeadline=this.pushProject.deadline},methods:o()(o()(o()(o()(o()({},Object(n["c"])("sprint",["getSprints"])),Object(n["c"])("user",["getUsers"])),Object(n["b"])("sprint",["fetchSprint","postSprint","updateSprint"])),Object(n["b"])("user",["fetchUsers"])),{},{projectsToArray(e){var t=[];for(var s in e)t.push(e[s]);return t},setdates(){this.pushProject.startdate=this.selectDeadline.from,this.pushProject.enddate=this.selectDeadline.to},usersPushData(e){var t=[],s=this.getUsers();for(var r in e)for(var a in s)if(e[r].label===s[a].username){var i={user_name:s[a].username,user_id:s[a]._id,user_role:e[r].role};t.push(i)}return t},getDate(){var e=new Date,t=`${e.getDate().toString().padStart(2,"0")}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getFullYear()}`;return t},checkProjectName(){var e=!1;if(this.pushProject.name!==this.newProject.name)for(var t in this.allProjects)this.pushProject.name===this.allProjects[t].name&&(e=!0,this.error='Project with the name "'+this.pushProject.name+'" already exists.');else e=!0;return e},setPushUser(){this.pushProject.users=this.usersPushData(this.pushProject.users),""!==this.selectDeadline&&this.today!==this.selectDeadline?this.pushProject.deadline=this.selectDeadline:this.pushProject.deadline="No deadline"},onSubmit(){var e="";this.checkProjectName()||(this.setPushUser(),this.$props.editProject?(e="Project updated.",this.updateSprint(this.pushProject),this.onReset()):(e="Project added.",this.postSprint(this.pushProject),this.onReset()),this.$q.notify({color:"green",textColor:"white",icon:"cloud_done",message:e,position:"top-right",timeout:1e3}),this.error="",this.$emit("submitProject"))},onReset(){this.pushProject.name=this.$props.newProject.name,this.pushProject.id=this.$props.newProject.id,this.pushProject.startdate=this.$props.newProject.startdate,this.pushProject.enddate=this.$props.newProject.enddate,this.pushProject.expectedtime=this.$props.newProject.expectedtime,this.error=""}})}),u=p,h=s("2877"),m=s("0378"),j=s("27f9"),P=s("9c40"),f=s("58a81"),v=s("24e8"),b=s("f09f"),q=s("52ee"),g=s("4b7e"),w=s("7f67"),y=s("eebe"),_=s.n(y),C=Object(h["a"])(u,l,d,!1,null,null,null),S=C.exports;_()(C,"components",{QForm:m["a"],QInput:j["a"],QBtn:P["a"],QBadge:f["a"],QDialog:v["a"],QCard:b["a"],QDate:q["a"],QCardActions:g["a"]}),_()(C,"directives",{ClosePopup:w["a"]});var D={name:"Project",components:{ProjectForm:c["a"],SprintForm:S},data(){return{user:{},pagination:{rowsPerPage:0},loading:!1,search:"",addProject:!1,deleteProjectId:"",confirmDelete:!1,sprints:[],projectId:"",editProjectData:!1,dialogTitle:"Edit project",editProject:{name:"",users:[],deadline:"",_id:""},newSprint:{name:"",id:"",startdate:"",enddate:"",expectedtime:""}}},computed:{filteredProjects(){return this.getSearchFilteredSprints(this.search)},project(){var e=this.getProjects();for(var t in e)if(e[t]._id===this.projectId)return e[t];return"No project found."},columns(){return"Admin"===this.user.permissions?[{name:"name",required:!0,label:"Name",align:"left",field:e=>e.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"deadline",align:"left",label:"Deadline",field:"deadline",sortable:!0},{name:"delete",align:"center",label:"Delete project",field:"delete"}]:[{name:"name",required:!0,label:"Name",align:"left",field:e=>e.name,sortable:!0},{name:"users",align:"left",label:"Users",field:"users"},{name:"deadline",align:"left",label:"Deadline",field:"deadline",sortable:!0}]}},methods:o()(o()(o()(o()(o()({},Object(n["c"])("user",["getCurrentUser"])),Object(n["c"])("sprint",["getSprints"])),Object(n["b"])("sprint",["fetchSprint","deleteSprint"])),Object(n["c"])("project",["getProjects"])),{},{openSprint(e){console.log(e),this.$router.push("/sprints/"+e)},updateProjectInfo(){this.editProjectData=!1},deleteFunction(e){this.deleteSprint(e),this.showSprints()},showSprints(){this.addProject=!1,this.loading=!0,setTimeout((()=>{var e=this.getSprints();this.sprints=this.projectsToArray(e),this.loading=!1}),1e3)},projectsToArray(e){var t=[];for(var s in e)t.push(e[s]);return t},checkRole(){if(this.user!=={}){if("Admin"===this.user.permissions)return!0;for(var e in this.project.users)if("Methodology Admin"===this.project.users[e].user_role)return!0}return!1},editFunction(){this.editProject.name=this.project.name,this.editProject.deadline=this.project.deadline,this.editProject._id=this.projectId;var e=[];for(var t in this.project.users){var s={label:this.project.users[t].user_name,value:this.project.users[t].user_name,role:this.project.users[t].user_role};e.push(s)}this.editProject.users=e,this.editProjectData=!0},onReset(){this.newProject.name="",this.newProject.users=[],this.newProject.deadline=""},getSearchFilteredSprints(e){if(""!==this.search){var t=[];for(var s in this.newSprint){const r=this.sprints[s].name.toLowerCase();r.startsWith(e.toLowerCase())&&t.push(this.sprints[s])}return t}return this.sprints}}),mounted(){this.user=this.getCurrentUser(),this.fetchSprint(),this.projectId=this.$route.params.id,this.newSprint.id=this.projectId,this.showSprints()}},x=D,k=(s("f04a"),s("9989")),Q=s("a370"),$=s("eb85"),R=s("cb32"),U=s("2c91"),A=s("eaac"),I=s("74f7"),O=s("db86"),N=s("0016"),F=s("1c1c"),z=s("66e5"),T=s("4074"),M=s("0170"),Y=s("714f"),E=Object(h["a"])(x,r,a,!1,null,null,null);t["default"]=E.exports;_()(E,"components",{QPage:k["a"],QBtn:P["a"],QCard:b["a"],QCardSection:Q["a"],QSeparator:$["a"],QAvatar:R["a"],QSpace:U["a"],QDialog:v["a"],QTable:A["a"],QInnerLoading:I["a"],QTd:O["a"],QIcon:N["a"],QCardActions:g["a"],QList:F["a"],QItem:z["a"],QItemSection:T["a"],QItemLabel:M["a"]}),_()(E,"directives",{ClosePopup:w["a"],Ripple:Y["a"]})},f04a:function(e,t,s){"use strict";s("27e4")}}]);
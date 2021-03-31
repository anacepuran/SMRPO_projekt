(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"051b":function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("q-page",{staticClass:"q-ma-lg window-width"},[t("div",{staticClass:"q-pa-md"},[t("q-table",{staticClass:"q-pa-lg",attrs:{title:"Users",data:e.allUsers,columns:e.columns,"row-key":"username","virtual-scroll":"",pagination:e.pagination,"rows-per-page-options":[0],loading:e.loading},on:{"update:pagination":function(s){e.pagination=s}},scopedSlots:e._u([{key:"loading",fn:function(){return[t("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"body-cell-edit",fn:function(s){return[t("q-td",{attrs:{props:s}},[t("div",[t("q-btn",{attrs:{size:"sm",round:"",color:"secondary",icon:"create"},on:{click:function(t){return e.editFunction(s.row)}}})],1)])]}},{key:"body-cell-delete",fn:function(s){return[t("q-td",{attrs:{props:s}},[t("div",[t("q-btn",{attrs:{size:"sm",round:"",color:"negative",icon:"delete"},on:{click:function(t){e.deleteUserId=s.row._id,e.confirmDelete=!0}}})],1)])]}}])}),t("div",{staticClass:"row q-ma-md"},[t("q-space"),t("q-btn",{attrs:{color:"primary",size:"md",label:"ADD NEW USER"},on:{click:function(s){e.dialogTitle="Add user",e.addUser=!0}}})],1)],1),t("q-dialog",{attrs:{persistent:""},model:{value:e.confirmDelete,callback:function(s){e.confirmDelete=s},expression:"confirmDelete"}},[t("q-card",[t("q-card-section",{staticClass:"row items-center"},[t("q-avatar",{attrs:{icon:"delete",color:"primary","text-color":"white"}}),t("span",{staticClass:"q-ml-sm"},[e._v("Are you sure you want to delete this user?")])],1),t("q-card-actions",{attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"},on:{click:function(s){e.deleteUserId=""}}}),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"DELETE",color:"negative"},on:{click:function(s){return e.deleteFunction(e.deleteUserId)}}})],1)],1)],1),t("q-dialog",{model:{value:e.addUser,callback:function(s){e.addUser=s},expression:"addUser"}},[t("q-card",{staticClass:"q-pa-md",staticStyle:{width:"80vh"}},[t("q-card-section",{staticClass:"row items-center"},[t("div",{staticClass:"text-h6"},[e._v(e._s(e.dialogTitle))]),t("q-space"),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:e.onReset}})],1),t("UserForm",{attrs:{newUser:e.newUser,editUser:e.editUser},on:{submitUser:e.showUsers}})],1)],1)],1)},a=[],i=t("7053"),n=t.n(i),o=t("2f62"),l=t("aa74"),u={name:"Users",components:{UserForm:l["a"]},data(){return{pagination:{rowsPerPage:0},newUser:{name:"",surname:"",email:"",username:"",password:"",permissions:null,_id:"",last_login:""},dialogTitle:"",loading:!1,allUsers:[],addUser:!1,deleteUserId:"",confirmDelete:!1,editUser:!1,columns:[{name:"username",required:!0,label:"Username",align:"center",field:e=>e.username,sortable:!0},{name:"name",align:"center",label:"Name",field:"name"},{name:"surname",align:"center",label:"Surname",field:"surname",sortable:!0},{name:"email",align:"center",label:"Email",field:"email"},{name:"permissions",align:"center",label:"Permissions",field:"permissions"},{name:"last_login",align:"center",label:"Last login",field:"last_login"},{name:"edit",align:"center",label:"Edit user",field:"edit"},{name:"delete",align:"center",label:"Delete user",field:"delete"}]}},mounted(){this.fetchUsers(),this.loading=!0,this.showUsers()},methods:n()(n()(n()({},Object(o["c"])("user",["getUsers"])),Object(o["b"])("user",["fetchUsers","deleteUser"])),{},{deleteFunction(e){this.deleteUser(e),this.loading=!0,this.showUsers(),this.$q.notify({color:"red",textColor:"white",icon:"delete",message:"User deleted.",position:"top-right",timeout:1e3})},editFunction(e){this.dialogTitle="Edit user",this.editUser=!0,this.newUser.name=e.name,this.newUser.surname=e.surname,this.newUser.email=e.email,this.newUser.username=e.username,this.newUser.password="",this.newUser.permissions=e.permissions,this.newUser._id=e._id,this.newUser.last_login=e.last_login,this.newUser.this_login=e.this_login,this.addUser=!0},showUsers(){this.addUser=!1,this.loading=!0,setTimeout((()=>{var e=this.getUsers();this.allUsers=this.usersToArray(e),this.loading=!1}),1e3)},usersToArray(e){var s=[];for(var t in e)s.push(e[t]);return s},onReset(){this.newUser.name="",this.newUser.surname="",this.newUser.email="",this.newUser.username="",this.newUser.password="",this.newUser.permissions=null,this.newUser._id="",this.newUser.last_login="",this.newUser.this_login="",this.editUser=!1}})},c=u,d=t("2877"),p=t("9989"),h=t("eaac"),m=t("74f7"),U=t("db86"),w=t("9c40"),g=t("2c91"),f=t("24e8"),b=t("f09f"),q=t("a370"),v=t("cb32"),y=t("4b7e"),_=t("7f67"),C=t("eebe"),k=t.n(C),$=Object(d["a"])(c,r,a,!1,null,null,null);s["default"]=$.exports;k()($,"components",{QPage:p["a"],QTable:h["a"],QInnerLoading:m["a"],QTd:U["a"],QBtn:w["a"],QSpace:g["a"],QDialog:f["a"],QCard:b["a"],QCardSection:q["a"],QAvatar:v["a"],QCardActions:y["a"]}),k()($,"directives",{ClosePopup:_["a"]})},aa74:function(e,s,t){"use strict";var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[t("q-input",{attrs:{filled:"",label:"Name","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushUser.name,callback:function(s){e.$set(e.pushUser,"name",s)},expression:"pushUser.name"}}),t("q-input",{attrs:{filled:"",label:"Surname","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushUser.surname,callback:function(s){e.$set(e.pushUser,"surname",s)},expression:"pushUser.surname"}}),t("q-input",{attrs:{filled:"",label:"Email",type:"email","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushUser.email,callback:function(s){e.$set(e.pushUser,"email",s)},expression:"pushUser.email"}}),t("q-input",{attrs:{filled:"",label:"Username","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushUser.username,callback:function(s){e.$set(e.pushUser,"username",s)},expression:"pushUser.username"}}),e.changePassword?t("q-input",{attrs:{filled:"",label:"Password","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.pushUser.password,callback:function(s){e.$set(e.pushUser,"password",s)},expression:"pushUser.password"}}):e._e(),!e.changePassword&&e.$props.editUser?t("q-btn",{staticClass:"q-ma-md",attrs:{size:"sm",label:"Change password"},on:{click:function(s){e.changePassword=!0}}}):e._e(),e.changePassword&&e.$props.editUser?t("q-btn",{staticStyle:{"margin-top":"-10px"},attrs:{size:"sm",label:"Leave the old password"},on:{click:function(s){e.changePassword=!1,e.pushUser.password=""}}}):e._e(),"/users"===this.$router.currentRoute.path?t("div",[t("q-select",{attrs:{filled:"",options:e.permissionOptions,label:"Permissions",width:"100%"},model:{value:e.pushUser.permissions,callback:function(s){e.$set(e.pushUser,"permissions",s)},expression:"pushUser.permissions"}})],1):e._e(),t("q-card-actions",{attrs:{horizontal:"",align:"right"}},[t("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),t("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1),t("div",{staticClass:"q-ma-md text-center"},[""!=e.error?t("p",{staticStyle:{color:"red"}},[e._v(e._s(e.error))]):e._e()])],1)},a=[],i=t("7053"),n=t.n(i),o=t("2f62"),l={name:"UserForm",data(){return{error:"",permissionOptions:["Admin","User"],changePassword:!1,allUsers:[],pushUser:{name:"",surname:"",email:"",username:"",password:"",permissions:"",last_login:"",this_login:""}}},props:{editUser:{type:Boolean},newUser:{type:Object}},mounted(){var e=this.getUsers();this.allUsers=this.usersToArray(e),this.onReset(),this.$props.editUser||(this.changePassword=!0)},methods:n()(n()(n()({},Object(o["c"])("user",["getUsers"])),Object(o["b"])("user",["postUser","updateUser"])),{},{usersToArray(e){var s=[];for(var t in e)s.push(e[t]);return s},checkUserData(){var e=!1;if(this.pushUser.username.toLowerCase()!==this.newUser.username.toLowerCase())for(var s in this.allUsers)this.pushUser.username.toLowerCase()===this.allUsers[s].username.toLowerCase()&&(e=!0,this.error='User with the username "'+this.pushUser.username+'" already exists.');if(this.pushUser.email.toLowerCase()!==this.newUser.email.toLowerCase())for(var t in this.allUsers)this.pushUser.email.toLowerCase()===this.allUsers[t].email.toLowerCase()&&(e=!0,this.error='User with the email "'+this.pushUser.email+'" already exists.');return e},onSubmit(){var e="";this.checkUserData()||(this.$props.editUser?(e="User updated.",this.updateUser(this.pushUser),this.onReset()):(e="User added.",this.postUser(this.pushUser),this.onReset()),this.$q.notify({color:"green",textColor:"white",icon:"cloud_done",message:e,position:"top-right",timeout:1e3}),this.error="",this.$emit("submitUser"))},onReset(){this.pushUser.name=this.$props.newUser.name,this.pushUser.surname=this.$props.newUser.surname,this.pushUser.email=this.$props.newUser.email,this.pushUser.username=this.$props.newUser.username,this.pushUser.password="",this.pushUser.permissions=this.$props.newUser.permissions,this.pushUser._id=this.$props.newUser._id,this.pushUser.last_login=this.$props.newUser.last_login,this.pushUser.this_login=this.$props.newUser.this_login,this.error=""}})},u=l,c=t("2877"),d=t("0378"),p=t("27f9"),h=t("9c40"),m=t("ddd8"),U=t("4b7e"),w=t("eebe"),g=t.n(w),f=Object(c["a"])(u,r,a,!1,null,null,null);s["a"]=f.exports;g()(f,"components",{QForm:d["a"],QInput:p["a"],QBtn:h["a"],QSelect:m["a"],QCardActions:U["a"]})}}]);
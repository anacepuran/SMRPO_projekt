(function(e){function t(t){for(var r,o,s=t[0],c=t[1],u=t[2],d=0,l=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={2:0},a={2:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{1:"ff79809b",3:"a1dd8d59",4:"6239d4a8",5:"617872cf",6:"42f3132e",7:"538af875",8:"1cd18008",9:"c1b353f0"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={1:1,3:1,4:1,5:1,6:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{1:"da8aba16",3:"2325951e",4:"2325951e",5:"dabc97aa",6:"9db19509",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===a))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],d=u.getAttribute("data-href");if(d===r||d===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],p.parentNode.removeChild(p),n(i)},p.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(p);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var p=d;i.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"2f39":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"getCurrentUser",(function(){return N})),n.d(r,"getUsers",(function(){return O}));var o={};n.r(o),n.d(o,"SET_CURRENT_USER",(function(){return $})),n.d(o,"SET_LOGGED_OUT",(function(){return q})),n.d(o,"SET_USERS",(function(){return L})),n.d(o,"PUSH_NEW_USER",(function(){return D})),n.d(o,"DELETE_USER",(function(){return k}));var a={};n.r(a),n.d(a,"Login",(function(){return H})),n.d(a,"Logout",(function(){return W})),n.d(a,"fetchUsers",(function(){return I})),n.d(a,"postUser",(function(){return J})),n.d(a,"updateUser",(function(){return M})),n.d(a,"deleteUser",(function(){return B})),n.d(a,"updateCurrentUser",(function(){return G}));var i={};n.r(i),n.d(i,"getProjects",(function(){return F}));var s={};n.r(s),n.d(s,"SET_PROJECTS",(function(){return K})),n.d(s,"PUSH_NEW_PROJECT",(function(){return Q})),n.d(s,"DELETE_PROJECT",(function(){return Y}));var c={};n.r(c),n.d(c,"fetchProjects",(function(){return X})),n.d(c,"postProject",(function(){return Z})),n.d(c,"updateProject",(function(){return ee})),n.d(c,"deleteProject",(function(){return te}));var u={};n.r(u),n.d(u,"getSprints",(function(){return oe}));var d={};n.r(d),n.d(d,"SET_SPRINT",(function(){return ae})),n.d(d,"PUSH_NEW_SPRINT",(function(){return ie})),n.d(d,"DELETE_SPRINT",(function(){return se}));var l={};n.r(l),n.d(l,"fetchSprint",(function(){return ce})),n.d(l,"postSprint",(function(){return ue})),n.d(l,"updateSprint",(function(){return de})),n.d(l,"deleteSprint",(function(){return le}));var p={};n.r(p),n.d(p,"getCards",(function(){return me}));var f={};n.r(f),n.d(f,"SET_CARD",(function(){return he})),n.d(f,"PUSH_NEW_CARD",(function(){return _e})),n.d(f,"DELETE_CARD",(function(){return Ee}));var m={};n.r(m),n.d(m,"fetchCard",(function(){return ge})),n.d(m,"postCard",(function(){return ve})),n.d(m,"updateCard",(function(){return Se})),n.d(m,"deleteCard",(function(){return be}));n("e6cf"),n("5319"),n("7d6e"),n("e54f"),n("985d"),n("31cd");var h=n("2b0e"),_=n("1f91"),E=n("42d2"),g=n("b05d"),v=n("2a19"),S=n("9c64"),b=n("18d6"),P=n("a639");h["a"].use(g["a"],{config:{notify:{}},lang:_["a"],iconSet:E["a"],plugins:{Notify:v["a"],Meta:S["a"],LocalStorage:b["a"],SessionStorage:P["a"]}});var T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},U=[],y={name:"App"},w=y,R=n("2877"),x=Object(R["a"])(w,T,U,!1,null,null,null),C=x.exports,j=n("2f62"),A=function(){return{users:[],currentUser:null}};function N(e){return e.currentUser}function O(e){return e.users}function $(e,t){e.currentUser=t}function q(e,t){e.currentUser=null}function L(e,t){e.users=t}function D(e,t){var n={_id:t._id,name:t.name,surname:t.surname,email:t.email,username:t.username,permissions:t.permissions,this_login:t.this_login,last_login:t.last_login};e.users[t._id]=n,e.currentUser._id===t._id&&(e.currentUser=t)}function k(e,t){delete e.users[t]}function H({commit:e},t){return new Promise(((n,r)=>{this.$axios.post("/users/authenticate",{username:t.username,password:t.password}).then((t=>{console.log(t),e("SET_CURRENT_USER",t.data),n()})).catch((e=>{throw r(),new Error(`API ${e}`)}))}))}function W({commit:e}){e("SET_LOGGED_OUT"),this.$router.push({path:"/"})}function I({commit:e}){this.$axios.get("users/get").then((t=>{e("SET_USERS",t.data)})).catch((e=>{console.error(e)}))}function J({commit:e},t){this.$axios.post("users/add",{name:t.name,surname:t.surname,email:t.email,username:t.username,password:t.password,permissions:t.permissions,last_login:"User has not yet logged in.",this_login:"User has not yet logged in."}).then((t=>{e("PUSH_NEW_USER",t.data)})).catch((e=>{console.error(e)}))}function M({commit:e},t){this.$axios.post("/users/update",{name:t.name,surname:t.surname,email:t.email,username:t.username,password:t.password,permissions:t.permissions,last_login:t.last_login,_id:t._id}).then((t=>{e("PUSH_NEW_USER",t.data)})).catch((e=>{console.error(e)}))}function B({commit:e},t){e("DELETE_USER",t),this.$axios.delete("users/delete",{data:{_id:t}}).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))}function G({commit:e},t){console.log("update current user"),e("SET_CURRENT_USER",t)}var V={namespaced:!0,getters:r,mutations:o,actions:a,state:A},z=function(){return{projects:[]}};function F(e){return e.projects}function K(e,t){e.projects=t}function Q(e,t){var n={_id:t._id,name:t.name,users:t.users,deadline:t.deadline};e.projects[t._id]=n}function Y(e,t){delete e.projects[t]}function X({commit:e}){this.$axios.get("projects/get").then((t=>{e("SET_PROJECTS",t.data)})).catch((e=>{console.error(e)}))}function Z({commit:e},t){this.$axios.post("projects/add",{name:t.name,users:t.users,deadline:t.deadline}).then((t=>{e("PUSH_NEW_PROJECT",t.data)})).catch((e=>{console.error(e)}))}function ee({commit:e},t){this.$axios.put("projects/update",{name:t.name,users:t.users,deadline:t.deadline,_id:t._id}).then((t=>{e("PUSH_NEW_PROJECT",t.data)})).catch((e=>{console.error(e)}))}function te({commit:e},t){e("DELETE_PROJECT",t),this.$axios.delete("projects/delete",{data:{_id:t}}).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))}var ne={namespaced:!0,getters:i,mutations:s,actions:c,state:z},re=function(){return{sprints:[]}};function oe(e){return e.sprints}function ae(e,t){e.sprints=t}function ie(e,t){var n={name:t.name,project_id:t.id,start_date:t.startdate,end_date:t.enddate,expected_time:t.expectedtime};e.sprints[t._id]=n}function se(e,t){delete e.sprints[t]}function ce({commit:e}){this.$axios.get("sprints/get").then((t=>{e("SET_SPRINT",t.data)})).catch((e=>{console.error(e)}))}function ue({commit:e},t){this.$axios.post("sprints/add",{name:t.name,project_id:t.id,start_date:t.startdate,end_date:t.enddate,expected_time:t.expectedtime}).then((t=>{e("PUSH_NEW_SPRINT",t.data)})).catch((e=>{console.error(e)}))}function de({commit:e},t){this.$axios.put("sprints/update",{name:t.name,users:t.users,deadline:t.deadline,_id:t._id}).then((t=>{e("PUSH_NEW_SPRINT",t.data)})).catch((e=>{console.error(e)}))}function le({commit:e},t){e("DELETE_SPRINT",t),this.$axios.delete("sprints/delete",{data:{_id:t}}).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))}var pe={namespaced:!0,getters:u,mutations:d,actions:l,state:re},fe=function(){return{cards:[]}};function me(e){return e.cards}n("e01a");function he(e,t){e.cards=t}function _e(e,t){var n={sprint_id:t.sprintid,card_name:t.card_name,description:t.description,acceptance_test:t.acceptance_test,priority:t.priority,subtasks:t.subtasks,value:t.value};e.cards[t._id]=n}function Ee(e,t){delete e.cards[t]}function ge({commit:e}){this.$axios.get("cards/get").then((t=>{e("SET_CARD",t.data)})).catch((e=>{console.error(e)}))}function ve({commit:e},t){this.$axios.post("cards/add",{sprint_id:t.sprintid,card_name:t.cardname,description:t.description,acceptance_test:t.acceptancetest,priority:t.priority,subtasks:t.subtasks,value:t.value}).then((t=>{e("PUSH_NEW_CARD",t.data)})).catch((e=>{console.error(e)}))}function Se({commit:e},t){this.$axios.put("cards/update",{sprint_id:t.sprintid,card_name:t.card_name,description:t.description,acceptance_test:t.acceptance_test,priority:t.priority,subtasks:t.subtasks,value:t.value}).then((t=>{e("PUSH_NEW_CARD",t.data)})).catch((e=>{console.error(e)}))}function be({commit:e},t){e("DELETE_CARD",t),this.$axios.delete("cards/delete",{data:{_id:t}}).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))}var Pe={namespaced:!0,getters:p,mutations:f,actions:m,state:fe},Te=n("0e44");h["a"].use(j["a"]);var Ue=function(){const e=new j["a"].Store({modules:{user:V,project:ne,sprint:pe,card:Pe},plugins:[Object(Te["a"])({storage:window.sessionStorage})],strict:!1});return e},ye=n("8c4f");n("ddb0");const we=[{path:"/home",component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"bc13")),meta:{requiresAuth:!0,requiresAdmin:!1}},{path:"/profile",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"2ff9")),meta:{requiresAuth:!0,requiresAdmin:!1}},{path:"/users",component:()=>Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"051b")),meta:{requiresAuth:!0,requiresAdmin:!0}},{path:"/project/:id",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"3ea8")),meta:{requiresAuth:!0,requiresAdmin:!1}},{path:"/sprints/:id",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"bb76")),meta:{requiresAuth:!0,requiresAdmin:!1}},{path:"/cards/:id",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"bb76")),meta:{requiresAuth:!0,requiresAdmin:!1}}]},{path:"/",name:"Login",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"74db")),meta:{requiresAuth:!1,requiresAdmin:!1}},{path:"*",component:()=>Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"e51e"))}];var Re=we;h["a"].use(ye["a"]);var xe=function({store:e,ssrContext:t}){const n=new ye["a"]({scrollBehavior:()=>({x:0,y:0}),routes:Re,mode:"hash",base:""});return n.beforeEach(((t,n,r)=>{t.meta.requiresAuth?e.state.user.currentUser?t.meta.requiresAdmin?e.state.user.currentUser.permissions&&"Admin"===e.state.user.currentUser.permissions?r():(v["a"].create({message:"Your account is not authorized to see this page.",color:"negative"}),r("/home")):"/"===t.path?r("/home"):(t.path,r()):"/"!==t.path?r("/"):r():r()})),n},Ce=async function(){const e="function"===typeof Ue?await Ue({Vue:h["a"]}):Ue,t="function"===typeof xe?await xe({Vue:h["a"],store:e}):xe;e.$router=t;const n={router:t,store:e,render:e=>e(C),el:"#q-app"};return{app:n,store:e,router:t}},je=n("bc3a"),Ae=n.n(je),Ne=({app:e,store:t})=>{const n=Ae.a.create({baseURL:"",withCredentials:!1});h["a"].prototype.$axios=n,e.axios=n,t.$axios=n};const Oe="";async function $e(){const{app:e,store:t,router:n}=await Ce();let r=!1;const o=e=>{r=!0;const t=Object(e)===e?n.resolve(e).route.fullPath:e;window.location.href=t},a=window.location.href.replace(window.location.origin,""),i=[Ne];for(let c=0;!1===r&&c<i.length;c++)if("function"===typeof i[c])try{await i[c]({app:e,router:n,store:t,Vue:h["a"],ssrContext:null,redirect:o,urlPath:a,publicPath:Oe})}catch(s){return s&&s.url?void(window.location.href=s.url):void console.error("[Quasar] boot error:",s)}!0!==r&&new h["a"](e)}$e()},"31cd":function(e,t,n){}});
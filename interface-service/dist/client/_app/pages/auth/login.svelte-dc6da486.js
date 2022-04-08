import{S as te,i as ae,s as re,e as i,t as P,k as b,c as u,a as h,h as A,d as p,m as E,b as a,f as G,g as se,G as t,Q as F,J,j as le,H as ee,R as ne,F as oe}from"../../chunks/vendor-9f39b42c.js";import{h as ie,g as ue}from"../../chunks/http-7001acd5.js";import"../../chunks/singletons-d1fb5791.js";function ce(o){let l,n,e,c,U,I,v,N,T,s,m,L,S,q,d,B,C,D,H,_,O,V,g,k,R,y,Y,j,M;return{c(){l=i("div"),n=i("div"),e=i("form"),c=i("h1"),U=P("Login"),I=b(),v=i("label"),N=P("Username\u30FBEmail"),T=b(),s=i("input"),m=b(),L=i("label"),S=P("Password"),q=b(),d=i("input"),B=b(),C=i("div"),D=P(o[1]),H=b(),_=i("a"),O=P("Forgotten Your Password"),V=b(),g=i("button"),k=P("Login"),R=b(),y=i("a"),Y=P("Create a New Account"),this.h()},l(f){l=u(f,"DIV",{class:!0});var w=h(l);n=u(w,"DIV",{class:!0});var Q=h(n);e=u(Q,"FORM",{class:!0});var r=h(e);c=u(r,"H1",{class:!0});var z=h(c);U=A(z,"Login"),z.forEach(p),I=E(r),v=u(r,"LABEL",{for:!0,class:!0});var K=h(v);N=A(K,"Username\u30FBEmail"),K.forEach(p),T=E(r),s=u(r,"INPUT",{placeholder:!0,type:!0,class:!0}),m=E(r),L=u(r,"LABEL",{for:!0,class:!0});var W=h(L);S=A(W,"Password"),W.forEach(p),q=E(r),d=u(r,"INPUT",{type:!0,placeholder:!0,class:!0}),B=E(r),C=u(r,"DIV",{class:!0});var X=h(C);D=A(X,o[1]),X.forEach(p),H=E(r),_=u(r,"A",{style:!0,href:!0,class:!0});var Z=h(_);O=A(Z,"Forgotten Your Password"),Z.forEach(p),V=E(r),g=u(r,"BUTTON",{type:!0,style:!0,class:!0});var x=h(g);k=A(x,"Login"),x.forEach(p),R=E(r),y=u(r,"A",{style:!0,href:!0,class:!0});var $=h(y);Y=A($,"Create a New Account"),$.forEach(p),r.forEach(p),Q.forEach(p),w.forEach(p),this.h()},h(){a(c,"class","svelte-10ltlt5"),a(v,"for","username"),a(v,"class","svelte-10ltlt5"),a(s,"placeholder","Username\u30FBEmail"),a(s,"type","text"),s.required=!0,a(s,"class","input input--normal input--white"),a(L,"for","username"),a(L,"class","svelte-10ltlt5"),a(d,"type","password"),d.required=!0,a(d,"placeholder","*********"),a(d,"class","input input--normal input--white"),a(C,"class","error error--center"),G(_,"margin","2rem 0"),a(_,"href","/auth/forgotten"),a(_,"class","svelte-10ltlt5"),a(g,"type","submit"),G(g,"width","100%"),a(g,"class","button button--normal button--primary button--very-round"),G(y,"margin","2rem 0"),a(y,"href","/auth/register"),a(y,"class","svelte-10ltlt5"),a(e,"class","login-page__card svelte-10ltlt5"),a(n,"class","login-page__container container"),a(l,"class","login-page page svelte-10ltlt5")},m(f,w){se(f,l,w),t(l,n),t(n,e),t(e,c),t(c,U),t(e,I),t(e,v),t(v,N),t(e,T),t(e,s),F(s,o[0].credential),t(e,m),t(e,L),t(L,S),t(e,q),t(e,d),F(d,o[0].password),t(e,B),t(e,C),t(C,D),t(e,H),t(e,_),t(_,O),t(e,V),t(e,g),t(g,k),t(e,R),t(e,y),t(y,Y),j||(M=[J(s,"input",o[4]),J(d,"input",o[5]),J(e,"submit",o[2])],j=!0)},p(f,[w]){w&1&&s.value!==f[0].credential&&F(s,f[0].credential),w&1&&d.value!==f[0].password&&F(d,f[0].password),w&2&&le(D,f[1])},i:ee,o:ee,d(f){f&&p(l),j=!1,ne(M)}}}const ve=async({session:o,url:l,fetch:n})=>{if(o.authenticated)return{redirect:"/",status:302};if(l.searchParams.get("verify")){let e;try{await ie(n)("/user/verifyEmail","POST",{token:l.searchParams.get("verify")})?e="Account has been verified, please log in":e="Cannot verify account"}catch{e="Something went wrong"}return{props:{verified:e}}}return{}};function de(o,l,n){let e={credential:"",password:""},c="",{verified:U=""}=l;const I=oe("store");async function v(s){s.preventDefault();let m=await I.loginUser(e);if(m!=null&&m.error){n(1,c=m.error);return}ue("/")}function N(){e.credential=this.value,n(0,e)}function T(){e.password=this.value,n(0,e)}return o.$$set=s=>{"verified"in s&&n(3,U=s.verified)},[e,c,v,U,N,T]}class me extends te{constructor(l){super();ae(this,l,de,ce,re,{verified:3})}}export{me as default,ve as load};

var app=function(){"use strict";function t(){}function n(t){return t()}function a(){return Object.create(null)}function e(t){t.forEach(n)}function s(t){return"function"==typeof t}function o(t,n){return t!=t?n==n:t!==n}function i(n){return n&&s(n.destroy)?n.destroy:t}function p(t,n){t.appendChild(n)}function r(t,n,a){t.insertBefore(n,a||null)}function l(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function m(t,n,a){null==a?t.removeAttribute(n):t.getAttribute(n)!==a&&t.setAttribute(n,a)}let f;function h(t){f=t}function g(t){(function(){if(!f)throw new Error("Function called outside component initialization");return f})().$$.on_mount.push(t)}const k=[],$=[],v=[],y=[],M=Promise.resolve();let T=!1;function b(t){v.push(t)}let w=!1;const D=new Set;function S(){if(!w){w=!0;do{for(let t=0;t<k.length;t+=1){const n=k[t];h(n),Y(n.$$)}for(h(null),k.length=0;$.length;)$.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];D.has(n)||(D.add(n),n())}v.length=0}while(k.length);for(;y.length;)y.pop()();T=!1,w=!1,D.clear()}}function Y(t){if(null!==t.fragment){t.update(),e(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(b)}}const x=new Set;function L(t,n){t&&t.i&&(x.delete(t),t.i(n))}function H(t,n,a,e){if(t&&t.o){if(x.has(t))return;x.add(t),undefined.c.push((()=>{x.delete(t),e&&(a&&t.d(1),e())})),t.o(n)}}function _(t){t&&t.c()}function O(t,a,o,i){const{fragment:p,on_mount:r,on_destroy:l,after_update:c}=t.$$;p&&p.m(a,o),i||b((()=>{const a=r.map(n).filter(s);l?l.push(...a):e(a),t.$$.on_mount=[]})),c.forEach(b)}function j(t,n){const a=t.$$;null!==a.fragment&&(e(a.on_destroy),a.fragment&&a.fragment.d(n),a.on_destroy=a.fragment=null,a.ctx=[])}function C(t,n){-1===t.$$.dirty[0]&&(k.push(t),T||(T=!0,M.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function A(n,s,o,i,p,r,c=[-1]){const u=f;h(n);const d=n.$$={fragment:null,ctx:null,props:r,update:t,not_equal:p,bound:a(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:a(),dirty:c,skip_bound:!1};let m=!1;if(d.ctx=o?o(n,s.props||{},((t,a,...e)=>{const s=e.length?e[0]:a;return d.ctx&&p(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),m&&C(n,t)),a})):[],d.update(),m=!0,e(d.before_update),d.fragment=!!i&&i(d.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(l)}else d.fragment&&d.fragment.c();s.intro&&L(n.$$.fragment),O(n,s.target,s.anchor,s.customElement),S()}h(u)}class I{$destroy(){j(this,1),this.$destroy=t}$on(t,n){const a=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return a.push(n),()=>{const t=a.indexOf(n);-1!==t&&a.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var N=1e3,E=6e4,U=36e5,q="millisecond",P="second",W="minute",z="hour",F="day",G="week",R="month",B="quarter",J="year",V="date",Z="Invalid Date",Q=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,K=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,X={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},tt=function(t,n,a){var e=String(t);return!e||e.length>=n?t:""+Array(n+1-e.length).join(a)+t},nt={s:tt,z:function(t){var n=-t.utcOffset(),a=Math.abs(n),e=Math.floor(a/60),s=a%60;return(n<=0?"+":"-")+tt(e,2,"0")+":"+tt(s,2,"0")},m:function t(n,a){if(n.date()<a.date())return-t(a,n);var e=12*(a.year()-n.year())+(a.month()-n.month()),s=n.clone().add(e,R),o=a-s<0,i=n.clone().add(e+(o?-1:1),R);return+(-(e+(a-s)/(o?s-i:i-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:R,y:J,w:G,d:F,D:V,h:z,m:W,s:P,ms:q,Q:B}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},at="en",et={};et[at]=X;var st=function(t){return t instanceof rt},ot=function(t,n,a){var e;if(!t)return at;if("string"==typeof t)et[t]&&(e=t),n&&(et[t]=n,e=t);else{var s=t.name;et[s]=t,e=s}return!a&&e&&(at=e),e||!a&&at},it=function(t,n){if(st(t))return t.clone();var a="object"==typeof n?n:{};return a.date=t,a.args=arguments,new rt(a)},pt=nt;pt.l=ot,pt.i=st,pt.w=function(t,n){return it(t,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var rt=function(){function t(t){this.$L=ot(t.locale,null,!0),this.parse(t)}var n=t.prototype;return n.parse=function(t){this.$d=function(t){var n=t.date,a=t.utc;if(null===n)return new Date(NaN);if(pt.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var e=n.match(Q);if(e){var s=e[2]-1||0,o=(e[7]||"0").substring(0,3);return a?new Date(Date.UTC(e[1],s,e[3]||1,e[4]||0,e[5]||0,e[6]||0,o)):new Date(e[1],s,e[3]||1,e[4]||0,e[5]||0,e[6]||0,o)}}return new Date(n)}(t),this.$x=t.x||{},this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return pt},n.isValid=function(){return!(this.$d.toString()===Z)},n.isSame=function(t,n){var a=it(t);return this.startOf(n)<=a&&a<=this.endOf(n)},n.isAfter=function(t,n){return it(t)<this.startOf(n)},n.isBefore=function(t,n){return this.endOf(n)<it(t)},n.$g=function(t,n,a){return pt.u(t)?this[n]:this.set(a,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,n){var a=this,e=!!pt.u(n)||n,s=pt.p(t),o=function(t,n){var s=pt.w(a.$u?Date.UTC(a.$y,n,t):new Date(a.$y,n,t),a);return e?s:s.endOf(F)},i=function(t,n){return pt.w(a.toDate()[t].apply(a.toDate("s"),(e?[0,0,0,0]:[23,59,59,999]).slice(n)),a)},p=this.$W,r=this.$M,l=this.$D,c="set"+(this.$u?"UTC":"");switch(s){case J:return e?o(1,0):o(31,11);case R:return e?o(1,r):o(0,r+1);case G:var u=this.$locale().weekStart||0,d=(p<u?p+7:p)-u;return o(e?l-d:l+(6-d),r);case F:case V:return i(c+"Hours",0);case z:return i(c+"Minutes",1);case W:return i(c+"Seconds",2);case P:return i(c+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,n){var a,e=pt.p(t),s="set"+(this.$u?"UTC":""),o=(a={},a[F]=s+"Date",a[V]=s+"Date",a[R]=s+"Month",a[J]=s+"FullYear",a[z]=s+"Hours",a[W]=s+"Minutes",a[P]=s+"Seconds",a[q]=s+"Milliseconds",a)[e],i=e===F?this.$D+(n-this.$W):n;if(e===R||e===J){var p=this.clone().set(V,1);p.$d[o](i),p.init(),this.$d=p.set(V,Math.min(this.$D,p.daysInMonth())).$d}else o&&this.$d[o](i);return this.init(),this},n.set=function(t,n){return this.clone().$set(t,n)},n.get=function(t){return this[pt.p(t)]()},n.add=function(t,n){var a,e=this;t=Number(t);var s=pt.p(n),o=function(n){var a=it(e);return pt.w(a.date(a.date()+Math.round(n*t)),e)};if(s===R)return this.set(R,this.$M+t);if(s===J)return this.set(J,this.$y+t);if(s===F)return o(1);if(s===G)return o(7);var i=(a={},a[W]=E,a[z]=U,a[P]=N,a)[s]||1,p=this.$d.getTime()+t*i;return pt.w(p,this)},n.subtract=function(t,n){return this.add(-1*t,n)},n.format=function(t){var n=this;if(!this.isValid())return Z;var a=t||"YYYY-MM-DDTHH:mm:ssZ",e=pt.z(this),s=this.$locale(),o=this.$H,i=this.$m,p=this.$M,r=s.weekdays,l=s.months,c=function(t,e,s,o){return t&&(t[e]||t(n,a))||s[e].substr(0,o)},u=function(t){return pt.s(o%12||12,t,"0")},d=s.meridiem||function(t,n,a){var e=t<12?"AM":"PM";return a?e.toLowerCase():e},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:p+1,MM:pt.s(p+1,2,"0"),MMM:c(s.monthsShort,p,l,3),MMMM:c(l,p),D:this.$D,DD:pt.s(this.$D,2,"0"),d:String(this.$W),dd:c(s.weekdaysMin,this.$W,r,2),ddd:c(s.weekdaysShort,this.$W,r,3),dddd:r[this.$W],H:String(o),HH:pt.s(o,2,"0"),h:u(1),hh:u(2),a:d(o,i,!0),A:d(o,i,!1),m:String(i),mm:pt.s(i,2,"0"),s:String(this.$s),ss:pt.s(this.$s,2,"0"),SSS:pt.s(this.$ms,3,"0"),Z:e};return a.replace(K,(function(t,n){return n||m[t]||e.replace(":","")}))},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,n,a){var e,s=pt.p(n),o=it(t),i=(o.utcOffset()-this.utcOffset())*E,p=this-o,r=pt.m(this,o);return r=(e={},e[J]=r/12,e[R]=r,e[B]=r/3,e[G]=(p-i)/6048e5,e[F]=(p-i)/864e5,e[z]=p/U,e[W]=p/E,e[P]=p/N,e)[s]||p,a?r:pt.a(r)},n.daysInMonth=function(){return this.endOf(R).$D},n.$locale=function(){return et[this.$L]},n.locale=function(t,n){if(!t)return this.$L;var a=this.clone(),e=ot(t,n,!0);return e&&(a.$L=e),a},n.clone=function(){return pt.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},t}(),lt=rt.prototype;it.prototype=lt,[["$ms",q],["$s",P],["$m",W],["$H",z],["$W",F],["$M",R],["$y",J],["$D",V]].forEach((function(t){lt[t[1]]=function(n){return this.$g(n,t[0],t[1])}})),it.extend=function(t,n){return t.$i||(t(n,rt,it),t.$i=!0),it},it.locale=ot,it.isDayjs=st,it.unix=function(t){return it(1e3*t)},it.en=et[at],it.Ls=et,it.p={};function ct(n){let a,e;return{c(){a=c("time"),e=u(n[0]),m(a,"title",n[2]),m(a,"datetime",n[1])},m(t,n){r(t,a,n),p(a,e)},p(t,[n]){1&n&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(e,t[0]),4&n&&m(a,"title",t[2]),2&n&&m(a,"datetime",t[1])},i:t,o:t,d(t){t&&l(a)}}}function ut(t,n,a){let e,s,{timestamp:o=(new Date).toISOString()}=n,{format:i="MMM DD, YYYY"}=n,{relative:p=!1}=n,{live:r=!1}=n,{formatted:l=""}=n;return g((()=>(p&&!1!==r&&(s=setInterval((()=>{a(0,l=it(o).from())}),Math.abs("number"==typeof r?r:6e4))),()=>{"number"==typeof s&&clearInterval(s)}))),t.$$set=t=>{"timestamp"in t&&a(1,o=t.timestamp),"format"in t&&a(3,i=t.format),"relative"in t&&a(4,p=t.relative),"live"in t&&a(5,r=t.live),"formatted"in t&&a(0,l=t.formatted)},t.$$.update=()=>{26&t.$$.dirty&&a(0,l=p?it(o).from():it(o).format(i)),18&t.$$.dirty&&a(2,e=p?o:void 0)},[l,o,e,i,p,r]}it.extend((function(t,n,a){t=t||{};var e=n.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(t,n,a,s){return e.fromToBase(t,n,a,s)}a.en.relativeTime=s,e.fromToBase=function(n,e,o,i,p){for(var r,l,c,u=o.$locale().relativeTime||s,d=t.thresholds||[{l:"s",r:44,d:P},{l:"m",r:89},{l:"mm",r:44,d:W},{l:"h",r:89},{l:"hh",r:21,d:z},{l:"d",r:35},{l:"dd",r:25,d:F},{l:"M",r:45},{l:"MM",r:10,d:R},{l:"y",r:17},{l:"yy",d:J}],m=d.length,f=0;f<m;f+=1){var h=d[f];h.d&&(r=i?a(n).diff(o,h.d,!0):o.diff(n,h.d,!0));var g=(t.rounding||Math.round)(Math.abs(r));if(c=r>0,g<=h.r||!h.r){g<=1&&f>0&&(h=d[f-1]);var k=u[h.l];p&&(g=p(""+g)),l="string"==typeof k?k.replace("%d",g):k(g,e,h.l,c);break}}if(e)return l;var $=c?u.future:u.past;return"function"==typeof $?$(l):$.replace("%s",l)},e.to=function(t,n){return o(t,n,this,!0)},e.from=function(t,n){return o(t,n,this)};var i=function(t){return t.$u?a.utc():a()};e.toNow=function(t){return this.to(i(this),t)},e.fromNow=function(t){return this.from(i(this),t)}}));class dt extends I{constructor(t){super(),A(this,t,ut,ct,o,{timestamp:1,format:3,relative:4,live:5,formatted:0})}}function mt(t,n={}){let a;function e(t,n={}){const e=n.timestamp||(new Date).toISOString(),s=n.format||"MMM DD, YYYY",o=!0===n.relative,i=!0===n.live,p=o?it(e).from():it(e).format(s);o&&(t.setAttribute("title",e),!1!==i&&(a=setInterval((()=>{t.innerText=it(e).from()}),Math.abs("number"==typeof i?i:6e4)))),t.innerText=p}return e(t,n),{update(n={}){e(t,n)},destroy(){"number"==typeof a&&clearInterval(a)}}}function ft(n){let a,s,o,u,f,h,g,k,$,v,y,M,T,b,w,D,S,Y,x,C,A,I,N,E,U,q,P,W,z,F,G,R,B,J,V,Z,Q,K,X,tt,nt,at,et,st,ot,it,pt,rt,lt,ct,ut,ft,ht,gt,kt,$t,vt,yt,Mt,Tt,bt,wt,Dt,St,Yt,xt,Lt,Ht,_t,Ot,jt,Ct,At,It,Nt,Et,Ut,qt,Pt,Wt,zt,Ft,Gt,Rt,Bt,Jt,Vt,Zt,Qt,Kt,Xt,tn,nn,an,en,sn,on,pn,rn,ln,cn,un,dn,mn,fn,hn,gn,kn,$n,vn,yn,Mn,Tn,bn,wn,Dn,Sn,Yn,xn,Ln;return J=new dt({}),tt=new dt({props:{timestamp:"2020-02-01"}}),at=new dt({props:{timestamp:new Date}}),st=new dt({props:{timestamp:1e10}}),ct=new dt({props:{timestamp:"2020-02-01",format:"dddd @ h:mm A · MMMM D, YYYY"}}),ft=new dt({props:{timestamp:new Date,format:"YYYY/MM/DD"}}),gt=new dt({props:{timestamp:1e10,format:"ddd"}}),wt=new dt({props:{relative:!0}}),St=new dt({props:{relative:!0,timestamp:"2021-02-02"}}),xt=new dt({props:{relative:!0,timestamp:1e10}}),It=new dt({props:{live:!0,relative:!0}}),Wt=new dt({props:{live:6e5,relative:!0}}),{c(){a=c("main"),s=c("h1"),s.textContent="svelte-time",o=d(),u=c("p"),u.innerHTML='<a href="https://npmjs.com/package/svelte-time"><img src="https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&amp;color=%23ff3e00" alt="NPM"/></a>',f=d(),h=c("p"),h.innerHTML='<a href="https://github.com/metonym/svelte-time">GitHub repo</a>',g=d(),k=c("blockquote"),k.innerHTML='<p>Svelte component and action to format a timestamp using <a href="https://github.com/iamkun/dayjs">day.js</a></p>',$=d(),v=c("p"),v.innerHTML='This utility wraps the date-time library <a href="https://github.com/iamkun/dayjs">day.js</a> in a declarative Svelte component and action.',y=d(),M=c("p"),M.innerHTML="<strong>Use cases</strong>",T=d(),b=c("ul"),b.innerHTML="<li>display a formatted timestamp within the semantic <code>time</code> element</li> \n<li>display the relative time in a human-readable format (e.g., “4 days ago”)</li>",w=d(),D=c("p"),D.innerHTML='<strong>Try it in the <a href="https://svelte.dev/repl/00b3877edb80425b96bb41fb18059882?version=3.34.0">Svelte REPL</a></strong>',S=d(),Y=c("hr"),x=d(),C=c("p"),C.innerHTML="<strong>Table of Contents</strong>",A=c("ul"),A.innerHTML='<li><a href="#install">Install</a></li> \n<li><a href="#usage">Usage</a></li> \n<ul><li><a href="#time-component">Time component</a></li> \n<li><a href="#relative-time">Relative time</a></li> \n<li><a href="#live-updates">Live updates</a></li> \n<li><a href="#sveltetime-action">svelteTime action</a></li> \n</ul><li><a href="#api">API</a></li> \n<ul><li><a href="#props">Props</a></li> \n</ul><li><a href="#typescript">TypeScript</a></li> \n<li><a href="#changelog">Changelog</a></li> \n<li><a href="#license">License</a></li>',I=d(),N=c("h2"),N.textContent="Install",E=d(),U=c("pre"),q=d(),P=c("h2"),P.textContent="Usage",W=d(),z=c("h3"),z.textContent="Time component",F=d(),G=c("p"),G.innerHTML="The displayed time defaults to <code>new Date().toISOString()</code> and is formatted as <code>&quot;MMM DD, YYYY&quot;</code>.",R=d(),B=c("div"),_(J.$$.fragment),V=c("pre"),Z=d(),Q=c("p"),Q.innerHTML="The <code>timestamp</code> prop can be any of the following <code>dayjs</code> values: <code>string | number | Date | Dayjs</code>.",K=d(),X=c("div"),_(tt.$$.fragment),nt=d(),_(at.$$.fragment),et=d(),_(st.$$.fragment),ot=c("pre"),it=d(),pt=c("p"),pt.innerHTML='Use the <code>format</code> prop to format the timestamp. Refer to the <a href="https://day.js.org/docs/en/display/format">dayjs format documentation</a> for a list of available formats.',rt=d(),lt=c("div"),_(ct.$$.fragment),ut=d(),_(ft.$$.fragment),ht=d(),_(gt.$$.fragment),kt=c("pre"),$t=d(),vt=c("h3"),vt.textContent="Relative time",yt=d(),Mt=c("p"),Mt.innerHTML="Set the <code>relative</code> prop value to <code>true</code> for the relative time displayed in a human-readable format.",Tt=d(),bt=c("div"),_(wt.$$.fragment),Dt=d(),_(St.$$.fragment),Yt=d(),_(xt.$$.fragment),Lt=c("pre"),Ht=d(),_t=c("h3"),_t.textContent="Live updates",Ot=d(),jt=c("p"),jt.innerHTML="Set <code>live</code> to <code>true</code> for a live updating relative timestamp. The default refresh interval is 60 seconds.",Ct=d(),At=c("div"),_(It.$$.fragment),Nt=c("pre"),Et=d(),Ut=c("p"),Ut.innerHTML="To customize the interval, pass in a value (milliseconds) to <code>live</code>.",qt=d(),Pt=c("div"),_(Wt.$$.fragment),zt=c("pre"),Ft=d(),Gt=c("h3"),Gt.textContent="svelteTime action",Rt=d(),Bt=c("p"),Bt.innerHTML="Use the <code>svelteTime</code> action to format a timestamp in a raw HTML element.",Jt=d(),Vt=c("div"),Zt=c("time"),Qt=d(),Kt=c("time"),Xt=d(),tn=c("time"),nn=c("pre"),an=d(),en=c("p"),en.innerHTML="Similar to the <code>Time</code> component, the <code>live</code> prop only works with relative time.",sn=d(),on=c("div"),pn=c("time"),rn=c("pre"),ln=d(),cn=c("h2"),cn.textContent="API",un=d(),dn=c("h3"),dn.textContent="Props",mn=d(),fn=c("table"),fn.innerHTML='<thead><tr><th style="text-align:left">Prop name</th> \n<th style="text-align:left">Value</th></tr></thead> \n<tbody><tr><td style="text-align:left">timestamp</td> \n<td style="text-align:left"><code>string</code> | <code>number</code> | <code>Date</code> | <code>Dayjs</code> (default: <code>new Date().toISOString()</code>)</td></tr> \n<tr><td style="text-align:left">format</td> \n<td style="text-align:left"><code>string</code> (default <code>&quot;MMM DD, YYYY&quot;</code>) See <a href="https://day.js.org/docs/en/display/format">dayjs format documentation</a></td></tr> \n<tr><td style="text-align:left">relative</td> \n<td style="text-align:left"><code>boolean</code> (default: <code>false</code>)</td></tr> \n<tr><td style="text-align:left">live</td> \n<td style="text-align:left"><code>boolean</code> | <code>number</code> (default: <code>false</code>)</td></tr> \n<tr><td style="text-align:left">formatted</td> \n<td style="text-align:left"><code>string</code> (default <code>&quot;&quot;</code>)</td></tr></tbody>',hn=d(),gn=c("h2"),gn.textContent="TypeScript",kn=d(),$n=c("p"),$n.textContent="Svelte version 3.31 or greater is required to use this component with TypeScript.",vn=d(),yn=c("h2"),yn.textContent="Changelog",Mn=d(),Tn=c("p"),Tn.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/CHANGELOG.md">CHANGELOG.md</a>',bn=d(),wn=c("h2"),wn.textContent="License",Dn=d(),Sn=c("p"),Sn.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/LICENSE">MIT</a>',m(s,"id","svelte-time"),m(N,"id","install"),m(U,"class","language-bash"),m(P,"id","usage"),m(z,"id","time-component"),m(B,"class","code-fence"),m(V,"class","language-svelte"),m(V,"data-svelte",""),m(X,"class","code-fence"),m(ot,"class","language-svelte"),m(ot,"data-svelte",""),m(lt,"class","code-fence"),m(kt,"class","language-svelte"),m(kt,"data-svelte",""),m(vt,"id","relative-time"),m(bt,"class","code-fence"),m(Lt,"class","language-svelte"),m(Lt,"data-svelte",""),m(_t,"id","live-updates"),m(At,"class","code-fence"),m(Nt,"class","language-svelte"),m(Nt,"data-svelte",""),m(Pt,"class","code-fence"),m(zt,"class","language-svelte"),m(zt,"data-svelte",""),m(Gt,"id","sveltetime-action"),m(Vt,"class","code-fence"),m(nn,"class","language-svelte"),m(nn,"data-svelte",""),m(on,"class","code-fence"),m(rn,"class","language-svelte"),m(rn,"data-svelte",""),m(cn,"id","api"),m(dn,"id","props"),m(gn,"id","typescript"),m(yn,"id","changelog"),m(wn,"id","license"),m(a,"class","markdown-body")},m(t,n){r(t,a,n),p(a,s),p(a,o),p(a,u),p(a,f),p(a,h),p(a,g),p(a,k),p(a,$),p(a,v),p(a,y),p(a,M),p(a,T),p(a,b),p(a,w),p(a,D),p(a,S),p(a,Y),p(a,x),p(a,C),p(a,A),p(a,I),p(a,N),p(a,E),p(a,U),U.innerHTML='<span class="token function">yarn</span> <span class="token function">add</span> -D svelte-time\n<span class="token comment"># OR</span>\n<span class="token function">npm</span> i -D svelte-time\n',p(a,q),p(a,P),p(a,W),p(a,z),p(a,F),p(a,G),p(a,R),p(a,B),O(J,B,null),p(a,V),V.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> Time <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token punctuation">/></span></span>\n',p(a,Z),p(a,Q),p(a,K),p(a,X),O(tt,X,null),p(X,nt),O(at,X,null),p(X,et),O(st,X,null),p(a,ot),ot.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',p(a,it),p(a,pt),p(a,rt),p(a,lt),O(ct,lt,null),p(lt,ut),O(ft,lt,null),p(lt,ht),O(gt,lt,null),p(a,kt),kt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dddd @ h:mm A · MMMM D, YYYY<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>YYYY/MM/DD<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ddd<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n',p(a,$t),p(a,vt),p(a,yt),p(a,Mt),p(a,Tt),p(a,bt),O(wt,bt,null),p(bt,Dt),O(St,bt,null),p(bt,Yt),O(xt,bt,null),p(a,Lt),Lt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2021-02-02<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',p(a,Ht),p(a,_t),p(a,Ot),p(a,jt),p(a,Ct),p(a,At),O(It,At,null),p(a,Nt),Nt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',p(a,Et),p(a,Ut),p(a,qt),p(a,Pt),O(Wt,Pt,null),p(a,zt),zt.innerHTML='<span class="token comment">&lt;!-- Update every 10 minutes --\x3e</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">}</span></span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',p(a,Ft),p(a,Gt),p(a,Rt),p(a,Bt),p(a,Jt),p(a,Vt),p(Vt,Zt),p(Vt,Qt),p(Vt,Kt),p(Vt,Xt),p(Vt,tn),p(a,nn),nn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token punctuation">{</span> svelteTime <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span> <span class="token attr-name"><span class="token namespace">use:</span>svelteTime</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">"dddd @ h:mm A · MMMM D, YYYY"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',p(a,an),p(a,en),p(a,sn),p(a,on),p(on,pn),p(a,rn),rn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    live<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',p(a,ln),p(a,cn),p(a,un),p(a,dn),p(a,mn),p(a,fn),p(a,hn),p(a,gn),p(a,kn),p(a,$n),p(a,vn),p(a,yn),p(a,Mn),p(a,Tn),p(a,bn),p(a,wn),p(a,Dn),p(a,Sn),Yn=!0,xn||(Ln=[i(mt.call(null,Zt)),i(mt.call(null,Kt,{timestamp:"2021-02-02",format:"dddd @ h:mm A · MMMM D, YYYY"})),i(mt.call(null,tn,{relative:!0,timestamp:"2021-02-02"})),i(mt.call(null,pn,{live:!0,relative:!0}))],xn=!0)},p:t,i(t){Yn||(L(J.$$.fragment,t),L(tt.$$.fragment,t),L(at.$$.fragment,t),L(st.$$.fragment,t),L(ct.$$.fragment,t),L(ft.$$.fragment,t),L(gt.$$.fragment,t),L(wt.$$.fragment,t),L(St.$$.fragment,t),L(xt.$$.fragment,t),L(It.$$.fragment,t),L(Wt.$$.fragment,t),Yn=!0)},o(t){H(J.$$.fragment,t),H(tt.$$.fragment,t),H(at.$$.fragment,t),H(st.$$.fragment,t),H(ct.$$.fragment,t),H(ft.$$.fragment,t),H(gt.$$.fragment,t),H(wt.$$.fragment,t),H(St.$$.fragment,t),H(xt.$$.fragment,t),H(It.$$.fragment,t),H(Wt.$$.fragment,t),Yn=!1},d(t){t&&l(a),j(J),j(tt),j(at),j(st),j(ct),j(ft),j(gt),j(wt),j(St),j(xt),j(It),j(Wt),xn=!1,e(Ln)}}}return new class extends I{constructor(t){super(),A(this,t,null,ft,o,{})}}({target:document.body})}();
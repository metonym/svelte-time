var app=function(){"use strict";function n(){}function t(n,t){for(const a in t)n[a]=t[a];return n}function a(n){return n()}function s(){return Object.create(null)}function e(n){n.forEach(a)}function o(n){return"function"==typeof n}function p(n,t){return n!=n?t==t:n!==t}function i(n,t){const a={};t=new Set(t);for(const s in n)t.has(s)||"$"===s[0]||(a[s]=n[s]);return a}function c(t){return t&&o(t.destroy)?t.destroy:n}function l(n,t){n.appendChild(t)}function r(n,t,a){n.insertBefore(t,a||null)}function u(n){n.parentNode.removeChild(n)}function d(n){return document.createElement(n)}function m(n){return document.createTextNode(n)}function f(){return m(" ")}function k(n,t,a){null==a?n.removeAttribute(t):n.getAttribute(t)!==a&&n.setAttribute(t,a)}function g(n,t){const a=Object.getOwnPropertyDescriptors(n.__proto__);for(const s in t)null==t[s]?n.removeAttribute(s):"style"===s?n.style.cssText=t[s]:"__value"===s?n.value=n[s]=t[s]:a[s]&&a[s].set?n[s]=t[s]:k(n,s,t[s])}let h;function v(n){h=n}function $(n){(function(){if(!h)throw new Error("Function called outside component initialization");return h})().$$.on_mount.push(n)}const y=[],M=[],T=[],b=[],w=Promise.resolve();let D=!1;function x(n){T.push(n)}let Y=!1;const S=new Set;function L(){if(!Y){Y=!0;do{for(let n=0;n<y.length;n+=1){const t=y[n];v(t),H(t.$$)}for(v(null),y.length=0;M.length;)M.pop()();for(let n=0;n<T.length;n+=1){const t=T[n];S.has(t)||(S.add(t),t())}T.length=0}while(y.length);for(;b.length;)b.pop()();D=!1,Y=!1,S.clear()}}function H(n){if(null!==n.fragment){n.update(),e(n.before_update);const t=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,t),n.after_update.forEach(x)}}const j=new Set;function _(n,t){n&&n.i&&(j.delete(n),n.i(t))}function C(n,t,a,s){if(n&&n.o){if(j.has(n))return;j.add(n),undefined.c.push((()=>{j.delete(n),s&&(a&&n.d(1),s())})),n.o(t)}}function O(n){n&&n.c()}function A(n,t,s,p){const{fragment:i,on_mount:c,on_destroy:l,after_update:r}=n.$$;i&&i.m(t,s),p||x((()=>{const t=c.map(a).filter(o);l?l.push(...t):e(t),n.$$.on_mount=[]})),r.forEach(x)}function I(n,t){const a=n.$$;null!==a.fragment&&(e(a.on_destroy),a.fragment&&a.fragment.d(t),a.on_destroy=a.fragment=null,a.ctx=[])}function E(n,t){-1===n.$$.dirty[0]&&(y.push(n),D||(D=!0,w.then(L)),n.$$.dirty.fill(0)),n.$$.dirty[t/31|0]|=1<<t%31}function N(t,a,o,p,i,c,l,r=[-1]){const d=h;v(t);const m=t.$$={fragment:null,ctx:null,props:c,update:n,not_equal:i,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:a.context||[]),callbacks:s(),dirty:r,skip_bound:!1,root:a.target||d.$$.root};l&&l(m.root);let f=!1;if(m.ctx=o?o(t,a.props||{},((n,a,...s)=>{const e=s.length?s[0]:a;return m.ctx&&i(m.ctx[n],m.ctx[n]=e)&&(!m.skip_bound&&m.bound[n]&&m.bound[n](e),f&&E(t,n)),a})):[],m.update(),f=!0,e(m.before_update),m.fragment=!!p&&p(m.ctx),a.target){if(a.hydrate){const n=function(n){return Array.from(n.childNodes)}(a.target);m.fragment&&m.fragment.l(n),n.forEach(u)}else m.fragment&&m.fragment.c();a.intro&&_(t.$$.fragment),A(t,a.target,a.anchor,a.customElement),L()}v(d)}class P{$destroy(){I(this,1),this.$destroy=n}$on(n,t){const a=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return a.push(t),()=>{const n=a.indexOf(t);-1!==n&&a.splice(n,1)}}$set(n){var t;this.$$set&&(t=n,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}var q=1e3,U=6e4,W=36e5,G="millisecond",z="second",F="minute",B="hour",J="day",R="week",V="month",Z="quarter",Q="year",K="date",X="Invalid Date",nn=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,tn=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,an={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},sn=function(n,t,a){var s=String(n);return!s||s.length>=t?n:""+Array(t+1-s.length).join(a)+n},en={s:sn,z:function(n){var t=-n.utcOffset(),a=Math.abs(t),s=Math.floor(a/60),e=a%60;return(t<=0?"+":"-")+sn(s,2,"0")+":"+sn(e,2,"0")},m:function n(t,a){if(t.date()<a.date())return-n(a,t);var s=12*(a.year()-t.year())+(a.month()-t.month()),e=t.clone().add(s,V),o=a-e<0,p=t.clone().add(s+(o?-1:1),V);return+(-(s+(a-e)/(o?e-p:p-e))||0)},a:function(n){return n<0?Math.ceil(n)||0:Math.floor(n)},p:function(n){return{M:V,y:Q,w:R,d:J,D:K,h:B,m:F,s:z,ms:G,Q:Z}[n]||String(n||"").toLowerCase().replace(/s$/,"")},u:function(n){return void 0===n}},on="en",pn={};pn[on]=an;var cn=function(n){return n instanceof dn},ln=function(n,t,a){var s;if(!n)return on;if("string"==typeof n)pn[n]&&(s=n),t&&(pn[n]=t,s=n);else{var e=n.name;pn[e]=n,s=e}return!a&&s&&(on=s),s||!a&&on},rn=function(n,t){if(cn(n))return n.clone();var a="object"==typeof t?t:{};return a.date=n,a.args=arguments,new dn(a)},un=en;un.l=ln,un.i=cn,un.w=function(n,t){return rn(n,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var dn=function(){function n(n){this.$L=ln(n.locale,null,!0),this.parse(n)}var t=n.prototype;return t.parse=function(n){this.$d=function(n){var t=n.date,a=n.utc;if(null===t)return new Date(NaN);if(un.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(nn);if(s){var e=s[2]-1||0,o=(s[7]||"0").substring(0,3);return a?new Date(Date.UTC(s[1],e,s[3]||1,s[4]||0,s[5]||0,s[6]||0,o)):new Date(s[1],e,s[3]||1,s[4]||0,s[5]||0,s[6]||0,o)}}return new Date(t)}(n),this.$x=n.x||{},this.init()},t.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},t.$utils=function(){return un},t.isValid=function(){return!(this.$d.toString()===X)},t.isSame=function(n,t){var a=rn(n);return this.startOf(t)<=a&&a<=this.endOf(t)},t.isAfter=function(n,t){return rn(n)<this.startOf(t)},t.isBefore=function(n,t){return this.endOf(t)<rn(n)},t.$g=function(n,t,a){return un.u(n)?this[t]:this.set(a,n)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(n,t){var a=this,s=!!un.u(t)||t,e=un.p(n),o=function(n,t){var e=un.w(a.$u?Date.UTC(a.$y,t,n):new Date(a.$y,t,n),a);return s?e:e.endOf(J)},p=function(n,t){return un.w(a.toDate()[n].apply(a.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(t)),a)},i=this.$W,c=this.$M,l=this.$D,r="set"+(this.$u?"UTC":"");switch(e){case Q:return s?o(1,0):o(31,11);case V:return s?o(1,c):o(0,c+1);case R:var u=this.$locale().weekStart||0,d=(i<u?i+7:i)-u;return o(s?l-d:l+(6-d),c);case J:case K:return p(r+"Hours",0);case B:return p(r+"Minutes",1);case F:return p(r+"Seconds",2);case z:return p(r+"Milliseconds",3);default:return this.clone()}},t.endOf=function(n){return this.startOf(n,!1)},t.$set=function(n,t){var a,s=un.p(n),e="set"+(this.$u?"UTC":""),o=(a={},a[J]=e+"Date",a[K]=e+"Date",a[V]=e+"Month",a[Q]=e+"FullYear",a[B]=e+"Hours",a[F]=e+"Minutes",a[z]=e+"Seconds",a[G]=e+"Milliseconds",a)[s],p=s===J?this.$D+(t-this.$W):t;if(s===V||s===Q){var i=this.clone().set(K,1);i.$d[o](p),i.init(),this.$d=i.set(K,Math.min(this.$D,i.daysInMonth())).$d}else o&&this.$d[o](p);return this.init(),this},t.set=function(n,t){return this.clone().$set(n,t)},t.get=function(n){return this[un.p(n)]()},t.add=function(n,t){var a,s=this;n=Number(n);var e=un.p(t),o=function(t){var a=rn(s);return un.w(a.date(a.date()+Math.round(t*n)),s)};if(e===V)return this.set(V,this.$M+n);if(e===Q)return this.set(Q,this.$y+n);if(e===J)return o(1);if(e===R)return o(7);var p=(a={},a[F]=U,a[B]=W,a[z]=q,a)[e]||1,i=this.$d.getTime()+n*p;return un.w(i,this)},t.subtract=function(n,t){return this.add(-1*n,t)},t.format=function(n){var t=this,a=this.$locale();if(!this.isValid())return a.invalidDate||X;var s=n||"YYYY-MM-DDTHH:mm:ssZ",e=un.z(this),o=this.$H,p=this.$m,i=this.$M,c=a.weekdays,l=a.months,r=function(n,a,e,o){return n&&(n[a]||n(t,s))||e[a].substr(0,o)},u=function(n){return un.s(o%12||12,n,"0")},d=a.meridiem||function(n,t,a){var s=n<12?"AM":"PM";return a?s.toLowerCase():s},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:i+1,MM:un.s(i+1,2,"0"),MMM:r(a.monthsShort,i,l,3),MMMM:r(l,i),D:this.$D,DD:un.s(this.$D,2,"0"),d:String(this.$W),dd:r(a.weekdaysMin,this.$W,c,2),ddd:r(a.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(o),HH:un.s(o,2,"0"),h:u(1),hh:u(2),a:d(o,p,!0),A:d(o,p,!1),m:String(p),mm:un.s(p,2,"0"),s:String(this.$s),ss:un.s(this.$s,2,"0"),SSS:un.s(this.$ms,3,"0"),Z:e};return s.replace(tn,(function(n,t){return t||m[n]||e.replace(":","")}))},t.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},t.diff=function(n,t,a){var s,e=un.p(t),o=rn(n),p=(o.utcOffset()-this.utcOffset())*U,i=this-o,c=un.m(this,o);return c=(s={},s[Q]=c/12,s[V]=c,s[Z]=c/3,s[R]=(i-p)/6048e5,s[J]=(i-p)/864e5,s[B]=i/W,s[F]=i/U,s[z]=i/q,s)[e]||i,a?c:un.a(c)},t.daysInMonth=function(){return this.endOf(V).$D},t.$locale=function(){return pn[this.$L]},t.locale=function(n,t){if(!n)return this.$L;var a=this.clone(),s=ln(n,t,!0);return s&&(a.$L=s),a},t.clone=function(){return un.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},n}(),mn=dn.prototype;rn.prototype=mn,[["$ms",G],["$s",z],["$m",F],["$H",B],["$W",J],["$M",V],["$y",Q],["$D",K]].forEach((function(n){mn[n[1]]=function(t){return this.$g(t,n[0],n[1])}})),rn.extend=function(n,t){return n.$i||(n(t,dn,rn),n.$i=!0),rn},rn.locale=ln,rn.isDayjs=cn,rn.unix=function(n){return rn(1e3*n)},rn.en=pn[on],rn.Ls=pn,rn.p={};function fn(a){let s,e,o=[a[3],{title:a[2]},{datetime:a[1]}],p={};for(let n=0;n<o.length;n+=1)p=t(p,o[n]);return{c(){s=d("time"),e=m(a[0]),g(s,p)},m(n,t){r(n,s,t),l(s,e)},p(n,[t]){1&t&&function(n,t){t=""+t,n.wholeText!==t&&(n.data=t)}(e,n[0]),g(s,p=function(n,t){const a={},s={},e={$$scope:1};let o=n.length;for(;o--;){const p=n[o],i=t[o];if(i){for(const n in p)n in i||(s[n]=1);for(const n in i)e[n]||(a[n]=i[n],e[n]=1);n[o]=i}else for(const n in p)e[n]=1}for(const n in s)n in a||(a[n]=void 0);return a}(o,[8&t&&n[3],4&t&&{title:n[2]},2&t&&{datetime:n[1]}]))},i:n,o:n,d(n){n&&u(s)}}}function kn(n,a,s){let e;const o=["timestamp","format","relative","live","formatted"];let p,c=i(a,o),{timestamp:l=(new Date).toISOString()}=a,{format:r="MMM DD, YYYY"}=a,{relative:u=!1}=a,{live:d=!1}=a,{formatted:m=""}=a;return $((()=>(u&&!1!==d&&(p=setInterval((()=>{s(0,m=rn(l).from())}),Math.abs("number"==typeof d?d:6e4))),()=>{"number"==typeof p&&clearInterval(p)}))),n.$$set=n=>{a=t(t({},a),function(n){const t={};for(const a in n)"$"!==a[0]&&(t[a]=n[a]);return t}(n)),s(3,c=i(a,o)),"timestamp"in n&&s(1,l=n.timestamp),"format"in n&&s(4,r=n.format),"relative"in n&&s(5,u=n.relative),"live"in n&&s(6,d=n.live),"formatted"in n&&s(0,m=n.formatted)},n.$$.update=()=>{50&n.$$.dirty&&s(0,m=u?rn(l).from():rn(l).format(r)),34&n.$$.dirty&&s(2,e=u?l:void 0)},[m,l,e,c,r,u,d]}rn.extend((function(n,t,a){n=n||{};var s=t.prototype,e={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(n,t,a,e){return s.fromToBase(n,t,a,e)}a.en.relativeTime=e,s.fromToBase=function(t,s,o,p,i){for(var c,l,r,u=o.$locale().relativeTime||e,d=n.thresholds||[{l:"s",r:44,d:z},{l:"m",r:89},{l:"mm",r:44,d:F},{l:"h",r:89},{l:"hh",r:21,d:B},{l:"d",r:35},{l:"dd",r:25,d:J},{l:"M",r:45},{l:"MM",r:10,d:V},{l:"y",r:17},{l:"yy",d:Q}],m=d.length,f=0;f<m;f+=1){var k=d[f];k.d&&(c=p?a(t).diff(o,k.d,!0):o.diff(t,k.d,!0));var g=(n.rounding||Math.round)(Math.abs(c));if(r=c>0,g<=k.r||!k.r){g<=1&&f>0&&(k=d[f-1]);var h=u[k.l];i&&(g=i(""+g)),l="string"==typeof h?h.replace("%d",g):h(g,s,k.l,r);break}}if(s)return l;var v=r?u.future:u.past;return"function"==typeof v?v(l):v.replace("%s",l)},s.to=function(n,t){return o(n,t,this,!0)},s.from=function(n,t){return o(n,t,this)};var p=function(n){return n.$u?a.utc():a()};s.toNow=function(n){return this.to(p(this),n)},s.fromNow=function(n){return this.from(p(this),n)}}));class gn extends P{constructor(n){super(),N(this,n,kn,fn,p,{timestamp:1,format:4,relative:5,live:6,formatted:0})}}function hn(n,t={}){let a;function s(n,t={}){const s=t.timestamp||(new Date).toISOString(),e=t.format||"MMM DD, YYYY",o=!0===t.relative,p=!0===t.live,i=o?rn(s).from():rn(s).format(e);o&&(n.setAttribute("title",s),!1!==p&&(a=setInterval((()=>{n.innerText=rn(s).from()}),Math.abs("number"==typeof p?p:6e4)))),n.innerText=i}return s(n,t),{update(t={}){s(n,t)},destroy(){"number"==typeof a&&clearInterval(a)}}}function vn(t){let a,s,o,p,i,m,g,h,v,$,y,M,T,b,w,D,x,Y,S,L,H,j,E,N,P,q,U,W,G,z,F,B,J,R,V,Z,Q,K,X,nn,tn,an,sn,en,on,pn,cn,ln,rn,un,dn,mn,fn,kn,vn,$n,yn,Mn,Tn,bn,wn,Dn,xn,Yn,Sn,Ln,Hn,jn,_n,Cn,On,An,In,En,Nn,Pn,qn,Un,Wn,Gn,zn,Fn,Bn,Jn,Rn,Vn,Zn,Qn,Kn,Xn,nt,tt,at,st,et,ot,pt,it,ct,lt,rt,ut,dt,mt,ft,kt,gt,ht,vt,$t,yt,Mt,Tt,bt,wt,Dt,xt,Yt,St,Lt,Ht,jt,_t,Ct,Ot,At,It,Et,Nt,Pt,qt,Ut,Wt,Gt,zt,Ft,Bt,Jt,Rt,Vt,Zt,Qt,Kt,Xt;return nn=new gn({}),pn=new gn({props:{timestamp:"2020-02-01"}}),ln=new gn({props:{timestamp:new Date}}),un=new gn({props:{timestamp:1e10}}),$n=new gn({props:{timestamp:"2020-02-01",format:"dddd @ h:mm A · MMMM D, YYYY"}}),Mn=new gn({props:{timestamp:new Date,format:"YYYY/MM/DD"}}),bn=new gn({props:{timestamp:1e10,format:"ddd"}}),jn=new gn({props:{relative:!0}}),Cn=new gn({props:{relative:!0,timestamp:"2021-02-02"}}),An=new gn({props:{relative:!0,timestamp:1e10}}),Gn=new gn({props:{live:!0,relative:!0}}),Vn=new gn({props:{live:6e5,relative:!0}}),{c(){a=d("main"),s=d("h1"),s.textContent="svelte-time",o=f(),p=d("p"),p.innerHTML='<a href="https://npmjs.com/package/svelte-time"><img src="https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&amp;color=%23ff3e00" alt="NPM"/></a>',i=f(),m=d("p"),m.innerHTML='<a href="https://github.com/metonym/svelte-time">GitHub repo</a>',g=f(),h=d("blockquote"),h.innerHTML='<p>Svelte component and action to format a timestamp using <a href="https://github.com/iamkun/dayjs">day.js</a></p>',v=f(),$=d("p"),$.innerHTML='This utility wraps the date-time library <a href="https://github.com/iamkun/dayjs">day.js</a> in a declarative Svelte component and action.',y=f(),M=d("p"),M.innerHTML="<strong>Use cases</strong>",T=f(),b=d("ul"),b.innerHTML="<li>format a timestamp with the semantic <code>time</code> element</li> \n<li>display a human-readable, relative time (e.g., “4 days ago”)</li>",w=f(),D=d("p"),D.innerHTML='Try it in the <a href="https://svelte.dev/repl/00b3877edb80425b96bb41fb18059882">Svelte REPL</a>.',x=f(),Y=d("hr"),S=f(),L=d("p"),L.innerHTML="<strong>Table of Contents</strong>",H=d("ul"),H.innerHTML='<li><a href="#installation">Installation</a></li> \n<li><a href="#usage">Usage</a></li> \n<ul><li><a href="#time-component">Time component</a></li> \n<li><a href="#relative-time">Relative time</a></li> \n<li><a href="#live-updates">Live updates</a></li> \n<li><a href="#sveltetime-action">svelteTime action</a></li> \n<li><a href="#custom-locale">Custom locale</a></li> \n<li><a href="#dayjs-export">dayjs export</a></li> \n</ul><li><a href="#api">API</a></li> \n<ul><li><a href="#props">Props</a></li> \n</ul><li><a href="#typescript">TypeScript</a></li> \n<li><a href="#changelog">Changelog</a></li> \n<li><a href="#license">License</a></li>',j=f(),E=d("h2"),E.textContent="Installation",N=f(),P=d("p"),P.innerHTML="<strong>Yarn</strong>",q=f(),U=d("pre"),W=f(),G=d("p"),G.innerHTML="<strong>NPM</strong>",z=f(),F=d("pre"),B=f(),J=d("h2"),J.textContent="Usage",R=f(),V=d("h3"),V.textContent="Time component",Z=f(),Q=d("p"),Q.innerHTML="The displayed time defaults to <code>new Date().toISOString()</code> and is formatted as <code>&quot;MMM DD, YYYY&quot;</code>.",K=f(),X=d("div"),O(nn.$$.fragment),tn=d("pre"),an=f(),sn=d("p"),sn.innerHTML="The <code>timestamp</code> prop can be any of the following <code>dayjs</code> values: <code>string | number | Date | Dayjs</code>.",en=f(),on=d("div"),O(pn.$$.fragment),cn=f(),O(ln.$$.fragment),rn=f(),O(un.$$.fragment),dn=d("pre"),mn=f(),fn=d("p"),fn.innerHTML='Use the <code>format</code> prop to format the timestamp. Refer to the <a href="https://day.js.org/docs/en/display/format">dayjs format documentation</a> for a list of available formats.',kn=f(),vn=d("div"),O($n.$$.fragment),yn=f(),O(Mn.$$.fragment),Tn=f(),O(bn.$$.fragment),wn=d("pre"),Dn=f(),xn=d("h3"),xn.textContent="Relative time",Yn=f(),Sn=d("p"),Sn.innerHTML="Set the <code>relative</code> prop value to <code>true</code> for the relative time displayed in a human-readable format.",Ln=f(),Hn=d("div"),O(jn.$$.fragment),_n=f(),O(Cn.$$.fragment),On=f(),O(An.$$.fragment),In=d("pre"),En=f(),Nn=d("h3"),Nn.textContent="Live updates",Pn=f(),qn=d("p"),qn.innerHTML="Set <code>live</code> to <code>true</code> for a live updating relative timestamp. The default refresh interval is 60 seconds.",Un=f(),Wn=d("div"),O(Gn.$$.fragment),zn=d("pre"),Fn=f(),Bn=d("p"),Bn.innerHTML="To customize the interval, pass in a value (milliseconds) to <code>live</code>.",Jn=f(),Rn=d("div"),O(Vn.$$.fragment),Zn=d("pre"),Qn=f(),Kn=d("h3"),Kn.textContent="svelteTime action",Xn=f(),nt=d("p"),nt.innerHTML="Use the <code>svelteTime</code> action to format a timestamp in a raw HTML element.",tt=f(),at=d("div"),st=d("time"),et=f(),ot=d("time"),pt=f(),it=d("time"),ct=d("pre"),lt=f(),rt=d("p"),rt.innerHTML="Similar to the <code>Time</code> component, the <code>live</code> prop only works with relative time.",ut=f(),dt=d("div"),mt=d("time"),ft=d("pre"),kt=f(),gt=d("h3"),gt.textContent="Custom locale",ht=f(),vt=d("p"),vt.innerHTML='Load a custom locale and set it as the default locale using the <a href="https://day.js.org/docs/en/i18n/changing-locale">dayjs.locale API</a>.',$t=f(),yt=d("pre"),Mt=f(),Tt=d("h3"),Tt.textContent="dayjs export",bt=f(),wt=d("p"),wt.innerHTML="<code>dayjs</code> is re-exported for your convenience. This is useful for cases where the component and action would not work, like setting the document title.",Dt=f(),xt=d("p"),xt.innerHTML='The <code>dayjs</code> function extends the <a href="https://day.js.org/docs/en/plugin/relative-time">relativeTime plugin</a>.',Yt=f(),St=d("div"),Lt=d("button"),Lt.textContent="Set title\n",Ht=d("pre"),jt=f(),_t=d("h2"),_t.textContent="API",Ct=f(),Ot=d("h3"),Ot.textContent="Props",At=f(),It=d("table"),It.innerHTML='<thead><tr><th style="text-align:left">Prop name</th> \n<th style="text-align:left">Value</th> \n<th style="text-align:left">Default</th></tr></thead> \n<tbody><tr><td style="text-align:left"><code>timestamp</code></td> \n<td style="text-align:left"><code>string</code> | <code>number</code> | <code>Date</code> | <code>Dayjs</code></td> \n<td style="text-align:left"><code>new Date().toISOString()</code></td></tr> \n<tr><td style="text-align:left"><code>format</code></td> \n<td style="text-align:left"><code>string</code></td> \n<td style="text-align:left"><code>&quot;MMM DD, YYYY&quot;</code> (See <a href="https://day.js.org/docs/en/display/format">dayjs display format</a>)</td></tr> \n<tr><td style="text-align:left"><code>relative</code></td> \n<td style="text-align:left"><code>boolean</code></td> \n<td style="text-align:left"><code>false</code></td></tr> \n<tr><td style="text-align:left"><code>live</code></td> \n<td style="text-align:left"><code>boolean</code></td> \n<td style="text-align:left"><code>false</code></td></tr> \n<tr><td style="text-align:left"><code>formatted</code></td> \n<td style="text-align:left"><code>string</code></td> \n<td style="text-align:left"><code>&quot;&quot;</code></td></tr></tbody>',Et=f(),Nt=d("h2"),Nt.textContent="TypeScript",Pt=f(),qt=d("p"),qt.textContent="Svelte version 3.31 or greater is required to use this component with TypeScript.",Ut=f(),Wt=d("p"),Wt.innerHTML='TypeScript definitions are located in the <a href="https://github.com/metonym/svelte-time/tree/master/types">types folder</a>.',Gt=f(),zt=d("h2"),zt.textContent="Changelog",Ft=f(),Bt=d("p"),Bt.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/CHANGELOG.md">CHANGELOG.md</a>',Jt=f(),Rt=d("h2"),Rt.textContent="License",Vt=f(),Zt=d("p"),Zt.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/LICENSE">MIT</a>',k(s,"id","svelte-time"),k(E,"id","installation"),k(U,"class","language-bash"),k(F,"class","language-bash"),k(J,"id","usage"),k(V,"id","time-component"),k(X,"class","code-fence"),k(tn,"class","language-svelte"),k(tn,"data-svelte",""),k(on,"class","code-fence"),k(dn,"class","language-svelte"),k(dn,"data-svelte",""),k(vn,"class","code-fence"),k(wn,"class","language-svelte"),k(wn,"data-svelte",""),k(xn,"id","relative-time"),k(Hn,"class","code-fence"),k(In,"class","language-svelte"),k(In,"data-svelte",""),k(Nn,"id","live-updates"),k(Wn,"class","code-fence"),k(zn,"class","language-svelte"),k(zn,"data-svelte",""),k(Rn,"class","code-fence"),k(Zn,"class","language-svelte"),k(Zn,"data-svelte",""),k(Kn,"id","sveltetime-action"),k(at,"class","code-fence"),k(ct,"class","language-svelte"),k(ct,"data-svelte",""),k(dt,"class","code-fence"),k(ft,"class","language-svelte"),k(ft,"data-svelte",""),k(gt,"id","custom-locale"),k(yt,"class","language-html"),k(Tt,"id","dayjs-export"),k(St,"class","code-fence"),k(Ht,"class","language-svelte"),k(Ht,"data-svelte",""),k(_t,"id","api"),k(Ot,"id","props"),k(Nt,"id","typescript"),k(zt,"id","changelog"),k(Rt,"id","license"),k(a,"class","markdown-body")},m(n,e){var u,d,f,k;r(n,a,e),l(a,s),l(a,o),l(a,p),l(a,i),l(a,m),l(a,g),l(a,h),l(a,v),l(a,$),l(a,y),l(a,M),l(a,T),l(a,b),l(a,w),l(a,D),l(a,x),l(a,Y),l(a,S),l(a,L),l(a,H),l(a,j),l(a,E),l(a,N),l(a,P),l(a,q),l(a,U),U.innerHTML='<span class="token function">yarn</span> <span class="token function">add</span> -D svelte-time\n',l(a,W),l(a,G),l(a,z),l(a,F),F.innerHTML='<span class="token function">npm</span> i -D svelte-time\n',l(a,B),l(a,J),l(a,R),l(a,V),l(a,Z),l(a,Q),l(a,K),l(a,X),A(nn,X,null),l(a,tn),tn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> Time <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token punctuation">/></span></span>\n',l(a,an),l(a,sn),l(a,en),l(a,on),A(pn,on,null),l(on,cn),A(ln,on,null),l(on,rn),A(un,on,null),l(a,dn),dn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',l(a,mn),l(a,fn),l(a,kn),l(a,vn),A($n,vn,null),l(vn,yn),A(Mn,vn,null),l(vn,Tn),A(bn,vn,null),l(a,wn),wn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dddd @ h:mm A · MMMM D, YYYY<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>YYYY/MM/DD<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ddd<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n',l(a,Dn),l(a,xn),l(a,Yn),l(a,Sn),l(a,Ln),l(a,Hn),A(jn,Hn,null),l(Hn,_n),A(Cn,Hn,null),l(Hn,On),A(An,Hn,null),l(a,In),In.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2021-02-02<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',l(a,En),l(a,Nn),l(a,Pn),l(a,qn),l(a,Un),l(a,Wn),A(Gn,Wn,null),l(a,zn),zn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',l(a,Fn),l(a,Bn),l(a,Jn),l(a,Rn),A(Vn,Rn,null),l(a,Zn),Zn.innerHTML='<span class="token comment">&lt;!-- Update every 10 minutes --\x3e</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">}</span></span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',l(a,Qn),l(a,Kn),l(a,Xn),l(a,nt),l(a,tt),l(a,at),l(at,st),l(at,et),l(at,ot),l(at,pt),l(at,it),l(a,ct),ct.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token punctuation">{</span> svelteTime <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span> <span class="token attr-name"><span class="token namespace">use:</span>svelteTime</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">"dddd @ h:mm A · MMMM D, YYYY"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',l(a,lt),l(a,rt),l(a,ut),l(a,dt),l(dt,mt),l(a,ft),ft.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    live<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',l(a,kt),l(a,gt),l(a,ht),l(a,vt),l(a,$t),l(a,yt),yt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token string">"dayjs/esm/locale/de"</span><span class="token punctuation">;</span>\n  <span class="token keyword">import</span> dayjs <span class="token keyword">from</span> <span class="token string">"dayjs/esm"</span><span class="token punctuation">;</span>\n\n  dayjs<span class="token punctuation">.</span><span class="token function">locale</span><span class="token punctuation">(</span><span class="token string">"de"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// German locale</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> Time <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token punctuation">/></span></span>\n',l(a,Mt),l(a,Tt),l(a,bt),l(a,wt),l(a,Dt),l(a,xt),l(a,Yt),l(a,St),l(St,Lt),l(a,Ht),Ht.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token punctuation">{</span> dayjs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"MMM DD, YYYY"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n  Set title\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n',l(a,jt),l(a,_t),l(a,Ct),l(a,Ot),l(a,At),l(a,It),l(a,Et),l(a,Nt),l(a,Pt),l(a,qt),l(a,Ut),l(a,Wt),l(a,Gt),l(a,zt),l(a,Ft),l(a,Bt),l(a,Jt),l(a,Rt),l(a,Vt),l(a,Zt),Qt=!0,Kt||(Xt=[c(hn.call(null,st)),c(hn.call(null,ot,{timestamp:"2021-02-02",format:"dddd @ h:mm A · MMMM D, YYYY"})),c(hn.call(null,it,{relative:!0,timestamp:"2021-02-02"})),c(hn.call(null,mt,{live:!0,relative:!0})),(u=Lt,d="click",f=t[0],u.addEventListener(d,f,k),()=>u.removeEventListener(d,f,k))],Kt=!0)},p:n,i(n){Qt||(_(nn.$$.fragment,n),_(pn.$$.fragment,n),_(ln.$$.fragment,n),_(un.$$.fragment,n),_($n.$$.fragment,n),_(Mn.$$.fragment,n),_(bn.$$.fragment,n),_(jn.$$.fragment,n),_(Cn.$$.fragment,n),_(An.$$.fragment,n),_(Gn.$$.fragment,n),_(Vn.$$.fragment,n),Qt=!0)},o(n){C(nn.$$.fragment,n),C(pn.$$.fragment,n),C(ln.$$.fragment,n),C(un.$$.fragment,n),C($n.$$.fragment,n),C(Mn.$$.fragment,n),C(bn.$$.fragment,n),C(jn.$$.fragment,n),C(Cn.$$.fragment,n),C(An.$$.fragment,n),C(Gn.$$.fragment,n),C(Vn.$$.fragment,n),Qt=!1},d(n){n&&u(a),I(nn),I(pn),I(ln),I(un),I($n),I(Mn),I(bn),I(jn),I(Cn),I(An),I(Gn),I(Vn),Kt=!1,e(Xt)}}}function $n(n){return[()=>document.title=rn().format("MMM DD, YYYY")]}return new class extends P{constructor(n){super(),N(this,n,$n,vn,p,{})}}({target:document.body})}();

var app=function(){"use strict";function n(){}function t(n,t){for(const a in t)n[a]=t[a];return n}function a(n){return n()}function s(){return Object.create(null)}function e(n){n.forEach(a)}function o(n){return"function"==typeof n}function p(n,t){return n!=n?t==t:n!==t}function i(n,t){const a={};t=new Set(t);for(const s in n)t.has(s)||"$"===s[0]||(a[s]=n[s]);return a}function l(t){return t&&o(t.destroy)?t.destroy:n}function c(n,t){n.appendChild(t)}function r(n,t,a){n.insertBefore(t,a||null)}function u(n){n.parentNode.removeChild(n)}function m(n){return document.createElement(n)}function d(n){return document.createTextNode(n)}function f(){return d(" ")}function k(n,t,a){null==a?n.removeAttribute(t):n.getAttribute(t)!==a&&n.setAttribute(t,a)}function h(n,t){const a=Object.getOwnPropertyDescriptors(n.__proto__);for(const s in t)null==t[s]?n.removeAttribute(s):"style"===s?n.style.cssText=t[s]:"__value"===s?n.value=n[s]=t[s]:a[s]&&a[s].set?n[s]=t[s]:k(n,s,t[s])}let g;function v(n){g=n}function $(n){(function(){if(!g)throw new Error("Function called outside component initialization");return g})().$$.on_mount.push(n)}const y=[],M=[],T=[],b=[],x=Promise.resolve();let w=!1;function D(n){T.push(n)}let Y=!1;const L=new Set;function S(){if(!Y){Y=!0;do{for(let n=0;n<y.length;n+=1){const t=y[n];v(t),H(t.$$)}for(v(null),y.length=0;M.length;)M.pop()();for(let n=0;n<T.length;n+=1){const t=T[n];L.has(t)||(L.add(t),t())}T.length=0}while(y.length);for(;b.length;)b.pop()();w=!1,Y=!1,L.clear()}}function H(n){if(null!==n.fragment){n.update(),e(n.before_update);const t=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,t),n.after_update.forEach(D)}}const j=new Set;function _(n,t){n&&n.i&&(j.delete(n),n.i(t))}function C(n,t,a,s){if(n&&n.o){if(j.has(n))return;j.add(n),undefined.c.push((()=>{j.delete(n),s&&(a&&n.d(1),s())})),n.o(t)}}function O(n){n&&n.c()}function A(n,t,s,p){const{fragment:i,on_mount:l,on_destroy:c,after_update:r}=n.$$;i&&i.m(t,s),p||D((()=>{const t=l.map(a).filter(o);c?c.push(...t):e(t),n.$$.on_mount=[]})),r.forEach(D)}function I(n,t){const a=n.$$;null!==a.fragment&&(e(a.on_destroy),a.fragment&&a.fragment.d(t),a.on_destroy=a.fragment=null,a.ctx=[])}function E(n,t){-1===n.$$.dirty[0]&&(y.push(n),w||(w=!0,x.then(S)),n.$$.dirty.fill(0)),n.$$.dirty[t/31|0]|=1<<t%31}function N(t,a,o,p,i,l,c,r=[-1]){const m=g;v(t);const d=t.$$={fragment:null,ctx:null,props:l,update:n,not_equal:i,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:a.context||[]),callbacks:s(),dirty:r,skip_bound:!1,root:a.target||m.$$.root};c&&c(d.root);let f=!1;if(d.ctx=o?o(t,a.props||{},((n,a,...s)=>{const e=s.length?s[0]:a;return d.ctx&&i(d.ctx[n],d.ctx[n]=e)&&(!d.skip_bound&&d.bound[n]&&d.bound[n](e),f&&E(t,n)),a})):[],d.update(),f=!0,e(d.before_update),d.fragment=!!p&&p(d.ctx),a.target){if(a.hydrate){const n=function(n){return Array.from(n.childNodes)}(a.target);d.fragment&&d.fragment.l(n),n.forEach(u)}else d.fragment&&d.fragment.c();a.intro&&_(t.$$.fragment),A(t,a.target,a.anchor,a.customElement),S()}v(m)}class P{$destroy(){I(this,1),this.$destroy=n}$on(n,t){const a=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return a.push(t),()=>{const n=a.indexOf(t);-1!==n&&a.splice(n,1)}}$set(n){var t;this.$$set&&(t=n,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}var q=1e3,U=6e4,W=36e5,G="millisecond",z="second",F="minute",B="hour",J="day",R="week",Z="month",V="quarter",Q="year",K="date",X="Invalid Date",nn=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,tn=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,an={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},sn=function(n,t,a){var s=String(n);return!s||s.length>=t?n:""+Array(t+1-s.length).join(a)+n},en={s:sn,z:function(n){var t=-n.utcOffset(),a=Math.abs(t),s=Math.floor(a/60),e=a%60;return(t<=0?"+":"-")+sn(s,2,"0")+":"+sn(e,2,"0")},m:function n(t,a){if(t.date()<a.date())return-n(a,t);var s=12*(a.year()-t.year())+(a.month()-t.month()),e=t.clone().add(s,Z),o=a-e<0,p=t.clone().add(s+(o?-1:1),Z);return+(-(s+(a-e)/(o?e-p:p-e))||0)},a:function(n){return n<0?Math.ceil(n)||0:Math.floor(n)},p:function(n){return{M:Z,y:Q,w:R,d:J,D:K,h:B,m:F,s:z,ms:G,Q:V}[n]||String(n||"").toLowerCase().replace(/s$/,"")},u:function(n){return void 0===n}},on="en",pn={};pn[on]=an;var ln=function(n){return n instanceof mn},cn=function(n,t,a){var s;if(!n)return on;if("string"==typeof n)pn[n]&&(s=n),t&&(pn[n]=t,s=n);else{var e=n.name;pn[e]=n,s=e}return!a&&s&&(on=s),s||!a&&on},rn=function(n,t){if(ln(n))return n.clone();var a="object"==typeof t?t:{};return a.date=n,a.args=arguments,new mn(a)},un=en;un.l=cn,un.i=ln,un.w=function(n,t){return rn(n,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var mn=function(){function n(n){this.$L=cn(n.locale,null,!0),this.parse(n)}var t=n.prototype;return t.parse=function(n){this.$d=function(n){var t=n.date,a=n.utc;if(null===t)return new Date(NaN);if(un.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(nn);if(s){var e=s[2]-1||0,o=(s[7]||"0").substring(0,3);return a?new Date(Date.UTC(s[1],e,s[3]||1,s[4]||0,s[5]||0,s[6]||0,o)):new Date(s[1],e,s[3]||1,s[4]||0,s[5]||0,s[6]||0,o)}}return new Date(t)}(n),this.$x=n.x||{},this.init()},t.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},t.$utils=function(){return un},t.isValid=function(){return!(this.$d.toString()===X)},t.isSame=function(n,t){var a=rn(n);return this.startOf(t)<=a&&a<=this.endOf(t)},t.isAfter=function(n,t){return rn(n)<this.startOf(t)},t.isBefore=function(n,t){return this.endOf(t)<rn(n)},t.$g=function(n,t,a){return un.u(n)?this[t]:this.set(a,n)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(n,t){var a=this,s=!!un.u(t)||t,e=un.p(n),o=function(n,t){var e=un.w(a.$u?Date.UTC(a.$y,t,n):new Date(a.$y,t,n),a);return s?e:e.endOf(J)},p=function(n,t){return un.w(a.toDate()[n].apply(a.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(t)),a)},i=this.$W,l=this.$M,c=this.$D,r="set"+(this.$u?"UTC":"");switch(e){case Q:return s?o(1,0):o(31,11);case Z:return s?o(1,l):o(0,l+1);case R:var u=this.$locale().weekStart||0,m=(i<u?i+7:i)-u;return o(s?c-m:c+(6-m),l);case J:case K:return p(r+"Hours",0);case B:return p(r+"Minutes",1);case F:return p(r+"Seconds",2);case z:return p(r+"Milliseconds",3);default:return this.clone()}},t.endOf=function(n){return this.startOf(n,!1)},t.$set=function(n,t){var a,s=un.p(n),e="set"+(this.$u?"UTC":""),o=(a={},a[J]=e+"Date",a[K]=e+"Date",a[Z]=e+"Month",a[Q]=e+"FullYear",a[B]=e+"Hours",a[F]=e+"Minutes",a[z]=e+"Seconds",a[G]=e+"Milliseconds",a)[s],p=s===J?this.$D+(t-this.$W):t;if(s===Z||s===Q){var i=this.clone().set(K,1);i.$d[o](p),i.init(),this.$d=i.set(K,Math.min(this.$D,i.daysInMonth())).$d}else o&&this.$d[o](p);return this.init(),this},t.set=function(n,t){return this.clone().$set(n,t)},t.get=function(n){return this[un.p(n)]()},t.add=function(n,t){var a,s=this;n=Number(n);var e=un.p(t),o=function(t){var a=rn(s);return un.w(a.date(a.date()+Math.round(t*n)),s)};if(e===Z)return this.set(Z,this.$M+n);if(e===Q)return this.set(Q,this.$y+n);if(e===J)return o(1);if(e===R)return o(7);var p=(a={},a[F]=U,a[B]=W,a[z]=q,a)[e]||1,i=this.$d.getTime()+n*p;return un.w(i,this)},t.subtract=function(n,t){return this.add(-1*n,t)},t.format=function(n){var t=this,a=this.$locale();if(!this.isValid())return a.invalidDate||X;var s=n||"YYYY-MM-DDTHH:mm:ssZ",e=un.z(this),o=this.$H,p=this.$m,i=this.$M,l=a.weekdays,c=a.months,r=function(n,a,e,o){return n&&(n[a]||n(t,s))||e[a].substr(0,o)},u=function(n){return un.s(o%12||12,n,"0")},m=a.meridiem||function(n,t,a){var s=n<12?"AM":"PM";return a?s.toLowerCase():s},d={YY:String(this.$y).slice(-2),YYYY:this.$y,M:i+1,MM:un.s(i+1,2,"0"),MMM:r(a.monthsShort,i,c,3),MMMM:r(c,i),D:this.$D,DD:un.s(this.$D,2,"0"),d:String(this.$W),dd:r(a.weekdaysMin,this.$W,l,2),ddd:r(a.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(o),HH:un.s(o,2,"0"),h:u(1),hh:u(2),a:m(o,p,!0),A:m(o,p,!1),m:String(p),mm:un.s(p,2,"0"),s:String(this.$s),ss:un.s(this.$s,2,"0"),SSS:un.s(this.$ms,3,"0"),Z:e};return s.replace(tn,(function(n,t){return t||d[n]||e.replace(":","")}))},t.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},t.diff=function(n,t,a){var s,e=un.p(t),o=rn(n),p=(o.utcOffset()-this.utcOffset())*U,i=this-o,l=un.m(this,o);return l=(s={},s[Q]=l/12,s[Z]=l,s[V]=l/3,s[R]=(i-p)/6048e5,s[J]=(i-p)/864e5,s[B]=i/W,s[F]=i/U,s[z]=i/q,s)[e]||i,a?l:un.a(l)},t.daysInMonth=function(){return this.endOf(Z).$D},t.$locale=function(){return pn[this.$L]},t.locale=function(n,t){if(!n)return this.$L;var a=this.clone(),s=cn(n,t,!0);return s&&(a.$L=s),a},t.clone=function(){return un.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},n}(),dn=mn.prototype;rn.prototype=dn,[["$ms",G],["$s",z],["$m",F],["$H",B],["$W",J],["$M",Z],["$y",Q],["$D",K]].forEach((function(n){dn[n[1]]=function(t){return this.$g(t,n[0],n[1])}})),rn.extend=function(n,t){return n.$i||(n(t,mn,rn),n.$i=!0),rn},rn.locale=cn,rn.isDayjs=ln,rn.unix=function(n){return rn(1e3*n)},rn.en=pn[on],rn.Ls=pn,rn.p={};function fn(a){let s,e,o=[a[3],{title:a[2]},{datetime:a[1]}],p={};for(let n=0;n<o.length;n+=1)p=t(p,o[n]);return{c(){s=m("time"),e=d(a[0]),h(s,p)},m(n,t){r(n,s,t),c(s,e)},p(n,[t]){1&t&&function(n,t){t=""+t,n.wholeText!==t&&(n.data=t)}(e,n[0]),h(s,p=function(n,t){const a={},s={},e={$$scope:1};let o=n.length;for(;o--;){const p=n[o],i=t[o];if(i){for(const n in p)n in i||(s[n]=1);for(const n in i)e[n]||(a[n]=i[n],e[n]=1);n[o]=i}else for(const n in p)e[n]=1}for(const n in s)n in a||(a[n]=void 0);return a}(o,[8&t&&n[3],4&t&&{title:n[2]},2&t&&{datetime:n[1]}]))},i:n,o:n,d(n){n&&u(s)}}}function kn(n,a,s){let e;const o=["timestamp","format","relative","live","formatted"];let p,l=i(a,o),{timestamp:c=(new Date).toISOString()}=a,{format:r="MMM DD, YYYY"}=a,{relative:u=!1}=a,{live:m=!1}=a,{formatted:d=""}=a;return $((()=>(u&&!1!==m&&(p=setInterval((()=>{s(0,d=rn(c).from())}),Math.abs("number"==typeof m?m:6e4))),()=>{"number"==typeof p&&clearInterval(p)}))),n.$$set=n=>{a=t(t({},a),function(n){const t={};for(const a in n)"$"!==a[0]&&(t[a]=n[a]);return t}(n)),s(3,l=i(a,o)),"timestamp"in n&&s(1,c=n.timestamp),"format"in n&&s(4,r=n.format),"relative"in n&&s(5,u=n.relative),"live"in n&&s(6,m=n.live),"formatted"in n&&s(0,d=n.formatted)},n.$$.update=()=>{50&n.$$.dirty&&s(0,d=u?rn(c).from():rn(c).format(r)),34&n.$$.dirty&&s(2,e=u?c:void 0)},[d,c,e,l,r,u,m]}rn.extend((function(n,t,a){n=n||{};var s=t.prototype,e={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(n,t,a,e){return s.fromToBase(n,t,a,e)}a.en.relativeTime=e,s.fromToBase=function(t,s,o,p,i){for(var l,c,r,u=o.$locale().relativeTime||e,m=n.thresholds||[{l:"s",r:44,d:z},{l:"m",r:89},{l:"mm",r:44,d:F},{l:"h",r:89},{l:"hh",r:21,d:B},{l:"d",r:35},{l:"dd",r:25,d:J},{l:"M",r:45},{l:"MM",r:10,d:Z},{l:"y",r:17},{l:"yy",d:Q}],d=m.length,f=0;f<d;f+=1){var k=m[f];k.d&&(l=p?a(t).diff(o,k.d,!0):o.diff(t,k.d,!0));var h=(n.rounding||Math.round)(Math.abs(l));if(r=l>0,h<=k.r||!k.r){h<=1&&f>0&&(k=m[f-1]);var g=u[k.l];i&&(h=i(""+h)),c="string"==typeof g?g.replace("%d",h):g(h,s,k.l,r);break}}if(s)return c;var v=r?u.future:u.past;return"function"==typeof v?v(c):v.replace("%s",c)},s.to=function(n,t){return o(n,t,this,!0)},s.from=function(n,t){return o(n,t,this)};var p=function(n){return n.$u?a.utc():a()};s.toNow=function(n){return this.to(p(this),n)},s.fromNow=function(n){return this.from(p(this),n)}}));class hn extends P{constructor(n){super(),N(this,n,kn,fn,p,{timestamp:1,format:4,relative:5,live:6,formatted:0})}}function gn(n,t={}){let a;function s(n,t={}){const s=t.timestamp||(new Date).toISOString(),e=t.format||"MMM DD, YYYY",o=!0===t.relative,p=!0===t.live,i=o?rn(s).from():rn(s).format(e);o&&(n.setAttribute("title",s),!1!==p&&(a=setInterval((()=>{n.innerText=rn(s).from()}),Math.abs("number"==typeof p?p:6e4)))),n.innerText=i}return s(n,t),{update(t={}){s(n,t)},destroy(){"number"==typeof a&&clearInterval(a)}}}function vn(t){let a,s,o,p,i,d,h,g,v,$,y,M,T,b,x,w,D,Y,L,S,H,j,E,N,P,q,U,W,G,z,F,B,J,R,Z,V,Q,K,X,nn,tn,an,sn,en,on,pn,ln,cn,rn,un,mn,dn,fn,kn,vn,$n,yn,Mn,Tn,bn,xn,wn,Dn,Yn,Ln,Sn,Hn,jn,_n,Cn,On,An,In,En,Nn,Pn,qn,Un,Wn,Gn,zn,Fn,Bn,Jn,Rn,Zn,Vn,Qn,Kn,Xn,nt,tt,at,st,et,ot,pt,it,lt,ct,rt,ut,mt,dt,ft,kt,ht,gt,vt,$t,yt,Mt,Tt,bt,xt,wt,Dt,Yt,Lt,St,Ht,jt,_t,Ct,Ot,At,It,Et,Nt,Pt,qt,Ut,Wt,Gt,zt,Ft,Bt,Jt,Rt,Zt,Vt,Qt,Kt,Xt,na,ta,aa,sa,ea,oa;return nn=new hn({}),pn=new hn({props:{timestamp:"2020-02-01"}}),cn=new hn({props:{timestamp:new Date}}),un=new hn({props:{timestamp:1e10}}),$n=new hn({props:{timestamp:"2020-02-01",format:"dddd @ h:mm A · MMMM D, YYYY"}}),Mn=new hn({props:{timestamp:new Date,format:"YYYY/MM/DD"}}),bn=new hn({props:{timestamp:1e10,format:"ddd"}}),jn=new hn({props:{relative:!0}}),Cn=new hn({props:{relative:!0,timestamp:"2021-02-02"}}),An=new hn({props:{relative:!0,timestamp:1e10}}),Gn=new hn({props:{live:!0,relative:!0}}),Zn=new hn({props:{live:6e5,relative:!0}}),{c(){a=m("main"),s=m("h1"),s.textContent="svelte-time",o=f(),p=m("p"),p.innerHTML='<a href="https://npmjs.com/package/svelte-time"><img src="https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&amp;color=%23ff3e00" alt="NPM"/></a>',i=f(),d=m("p"),d.innerHTML='<a href="https://github.com/metonym/svelte-time">GitHub repo</a>',h=f(),g=m("blockquote"),g.innerHTML='<p>Svelte component and action to format a timestamp using <a href="https://github.com/iamkun/dayjs">day.js</a></p>',v=f(),$=m("p"),$.innerHTML='This utility wraps the date-time library <a href="https://github.com/iamkun/dayjs">day.js</a> in a declarative Svelte component and action.',y=f(),M=m("p"),M.innerHTML="<strong>Use cases</strong>",T=f(),b=m("ul"),b.innerHTML="<li>format a timestamp with the semantic <code>time</code> element</li> \n<li>display a human-readable, relative time (e.g., “4 days ago”)</li>",x=f(),w=m("p"),w.innerHTML='Try it in the <a href="https://svelte.dev/repl/00b3877edb80425b96bb41fb18059882">Svelte REPL</a>.',D=f(),Y=m("hr"),L=f(),S=m("p"),S.innerHTML="<strong>Table of Contents</strong>",H=m("ul"),H.innerHTML='<li><a href="#installation">Installation</a></li> \n<li><a href="#usage">Usage</a></li> \n<ul><li><a href="#time-component">Time component</a></li> \n<li><a href="#relative-time">Relative time</a></li> \n<li><a href="#live-updates">Live updates</a></li> \n<li><a href="#sveltetime-action">svelteTime action</a></li> \n<li><a href="#custom-locale">Custom locale</a></li> \n<li><a href="#dayjs-export">dayjs export</a></li> \n</ul><li><a href="#api">API</a></li> \n<ul><li><a href="#props">Props</a></li> \n</ul><li><a href="#examples">Examples</a></li> \n<li><a href="#typescript">TypeScript</a></li> \n<li><a href="#changelog">Changelog</a></li> \n<li><a href="#license">License</a></li>',j=f(),E=m("h2"),E.textContent="Installation",N=f(),P=m("p"),P.innerHTML="<strong>Yarn</strong>",q=f(),U=m("pre"),W=f(),G=m("p"),G.innerHTML="<strong>NPM</strong>",z=f(),F=m("pre"),B=f(),J=m("h2"),J.textContent="Usage",R=f(),Z=m("h3"),Z.textContent="Time component",V=f(),Q=m("p"),Q.innerHTML="The displayed time defaults to <code>new Date().toISOString()</code> and is formatted as <code>&quot;MMM DD, YYYY&quot;</code>.",K=f(),X=m("div"),O(nn.$$.fragment),tn=m("pre"),an=f(),sn=m("p"),sn.innerHTML="The <code>timestamp</code> prop can be any of the following <code>dayjs</code> values: <code>string | number | Date | Dayjs</code>.",en=f(),on=m("div"),O(pn.$$.fragment),ln=f(),O(cn.$$.fragment),rn=f(),O(un.$$.fragment),mn=m("pre"),dn=f(),fn=m("p"),fn.innerHTML='Use the <code>format</code> prop to format the timestamp. Refer to the <a href="https://day.js.org/docs/en/display/format">dayjs format documentation</a> for a list of available formats.',kn=f(),vn=m("div"),O($n.$$.fragment),yn=f(),O(Mn.$$.fragment),Tn=f(),O(bn.$$.fragment),xn=m("pre"),wn=f(),Dn=m("h3"),Dn.textContent="Relative time",Yn=f(),Ln=m("p"),Ln.innerHTML="Set the <code>relative</code> prop value to <code>true</code> for the relative time displayed in a human-readable format.",Sn=f(),Hn=m("div"),O(jn.$$.fragment),_n=f(),O(Cn.$$.fragment),On=f(),O(An.$$.fragment),In=m("pre"),En=f(),Nn=m("h3"),Nn.textContent="Live updates",Pn=f(),qn=m("p"),qn.innerHTML="Set <code>live</code> to <code>true</code> for a live updating relative timestamp. The default refresh interval is 60 seconds.",Un=f(),Wn=m("div"),O(Gn.$$.fragment),zn=m("pre"),Fn=f(),Bn=m("p"),Bn.innerHTML="To customize the interval, pass in a value (milliseconds) to <code>live</code>.",Jn=f(),Rn=m("div"),O(Zn.$$.fragment),Vn=m("pre"),Qn=f(),Kn=m("h3"),Kn.textContent="svelteTime action",Xn=f(),nt=m("p"),nt.innerHTML="Use the <code>svelteTime</code> action to format a timestamp in a raw HTML element.",tt=f(),at=m("div"),st=m("time"),et=f(),ot=m("time"),pt=f(),it=m("time"),lt=m("pre"),ct=f(),rt=m("p"),rt.innerHTML="Similar to the <code>Time</code> component, the <code>live</code> prop only works with relative time.",ut=f(),mt=m("div"),dt=m("time"),ft=m("pre"),kt=f(),ht=m("h3"),ht.textContent="Custom locale",gt=f(),vt=m("p"),vt.innerHTML='Load a custom locale and set it as the default locale using the <a href="https://day.js.org/docs/en/i18n/changing-locale">dayjs.locale API</a>.',$t=f(),yt=m("pre"),Mt=f(),Tt=m("h3"),Tt.textContent="dayjs export",bt=f(),xt=m("p"),xt.innerHTML="<code>dayjs</code> is re-exported for your convenience. This is useful for cases where the component and action would not work, like setting the document title.",wt=f(),Dt=m("p"),Dt.innerHTML='The <code>dayjs</code> function extends the <a href="https://day.js.org/docs/en/plugin/relative-time">relativeTime plugin</a>.',Yt=f(),Lt=m("div"),St=m("button"),St.textContent="Set title ",Ht=m("pre"),jt=f(),_t=m("h2"),_t.textContent="API",Ct=f(),Ot=m("h3"),Ot.textContent="Props",At=f(),It=m("table"),It.innerHTML='<thead><tr><th style="text-align:left">Prop name</th> \n<th style="text-align:left">Type</th> \n<th style="text-align:left">Default value</th></tr></thead> \n<tbody><tr><td style="text-align:left">timestamp</td> \n<td style="text-align:left"><code>string</code> | <code>number</code> | <code>Date</code> | <code>Dayjs</code></td> \n<td style="text-align:left"><code>new Date().toISOString()</code></td></tr> \n<tr><td style="text-align:left">format</td> \n<td style="text-align:left"><code>string</code></td> \n<td style="text-align:left"><code>&quot;MMM DD, YYYY&quot;</code> (See <a href="https://day.js.org/docs/en/display/format">dayjs display format</a>)</td></tr> \n<tr><td style="text-align:left">relative</td> \n<td style="text-align:left"><code>boolean</code></td> \n<td style="text-align:left"><code>false</code></td></tr> \n<tr><td style="text-align:left">live</td> \n<td style="text-align:left"><code>boolean</code> | <code>number</code></td> \n<td style="text-align:left"><code>false</code></td></tr> \n<tr><td style="text-align:left">formatted</td> \n<td style="text-align:left"><code>string</code></td> \n<td style="text-align:left"><code>&quot;&quot;</code></td></tr></tbody>',Et=f(),Nt=m("h2"),Nt.textContent="Examples",Pt=f(),qt=m("p"),qt.innerHTML='The <a href="https://github.com/metonym/svelte-time/tree/master/examples/">examples folder</a> contains sample set-ups.',Ut=f(),Wt=m("ul"),Wt.innerHTML='<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/sveltekit">examples/sveltekit</a></li> \n<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/vite">examples/vite</a></li> \n<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/sapper">examples/sapper</a></li> \n<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/snowpack">examples/snowpack</a></li> \n<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/rollup">examples/rollup</a></li> \n<li><a href="https://github.com/metonym/svelte-time/tree/master/examples/webpack">examples/webpack</a></li>',Gt=f(),zt=m("h2"),zt.textContent="TypeScript",Ft=f(),Bt=m("p"),Bt.textContent="Svelte version 3.31 or greater is required to use this component with TypeScript.",Jt=f(),Rt=m("p"),Rt.innerHTML='TypeScript definitions are located in the <a href="https://github.com/metonym/svelte-time/tree/master/types">types folder</a>.',Zt=f(),Vt=m("h2"),Vt.textContent="Changelog",Qt=f(),Kt=m("p"),Kt.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/CHANGELOG.md">CHANGELOG.md</a>',Xt=f(),na=m("h2"),na.textContent="License",ta=f(),aa=m("p"),aa.innerHTML='<a href="https://github.com/metonym/svelte-time/tree/master/LICENSE">MIT</a>',k(s,"id","svelte-time"),k(E,"id","installation"),k(U,"class","language-bash"),k(F,"class","language-bash"),k(J,"id","usage"),k(Z,"id","time-component"),k(X,"class","code-fence"),k(tn,"class","language-svelte"),k(tn,"data-svelte",""),k(on,"class","code-fence"),k(mn,"class","language-svelte"),k(mn,"data-svelte",""),k(vn,"class","code-fence"),k(xn,"class","language-svelte"),k(xn,"data-svelte",""),k(Dn,"id","relative-time"),k(Hn,"class","code-fence"),k(In,"class","language-svelte"),k(In,"data-svelte",""),k(Nn,"id","live-updates"),k(Wn,"class","code-fence"),k(zn,"class","language-svelte"),k(zn,"data-svelte",""),k(Rn,"class","code-fence"),k(Vn,"class","language-svelte"),k(Vn,"data-svelte",""),k(Kn,"id","sveltetime-action"),k(at,"class","code-fence"),k(lt,"class","language-svelte"),k(lt,"data-svelte",""),k(mt,"class","code-fence"),k(ft,"class","language-svelte"),k(ft,"data-svelte",""),k(ht,"id","custom-locale"),k(yt,"class","language-html"),k(Tt,"id","dayjs-export"),k(Lt,"class","code-fence"),k(Ht,"class","language-svelte"),k(Ht,"data-svelte",""),k(_t,"id","api"),k(Ot,"id","props"),k(Nt,"id","examples"),k(zt,"id","typescript"),k(Vt,"id","changelog"),k(na,"id","license"),k(a,"class","markdown-body")},m(n,e){var u,m,f,k;r(n,a,e),c(a,s),c(a,o),c(a,p),c(a,i),c(a,d),c(a,h),c(a,g),c(a,v),c(a,$),c(a,y),c(a,M),c(a,T),c(a,b),c(a,x),c(a,w),c(a,D),c(a,Y),c(a,L),c(a,S),c(a,H),c(a,j),c(a,E),c(a,N),c(a,P),c(a,q),c(a,U),U.innerHTML='<span class="token function">yarn</span> <span class="token function">add</span> -D svelte-time\n',c(a,W),c(a,G),c(a,z),c(a,F),F.innerHTML='<span class="token function">npm</span> i -D svelte-time\n',c(a,B),c(a,J),c(a,R),c(a,Z),c(a,V),c(a,Q),c(a,K),c(a,X),A(nn,X,null),c(a,tn),tn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> Time <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token punctuation">/></span></span>\n',c(a,an),c(a,sn),c(a,en),c(a,on),A(pn,on,null),c(on,ln),A(cn,on,null),c(on,rn),A(un,on,null),c(a,mn),mn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',c(a,dn),c(a,fn),c(a,kn),c(a,vn),A($n,vn,null),c(vn,yn),A(Mn,vn,null),c(vn,Tn),A(bn,vn,null),c(a,xn),xn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2020-02-01<span class="token punctuation">"</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dddd @ h:mm A · MMMM D, YYYY<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>YYYY/MM/DD<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ddd<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n',c(a,wn),c(a,Dn),c(a,Yn),c(a,Ln),c(a,Sn),c(a,Hn),A(jn,Hn,null),c(Hn,_n),A(Cn,Hn,null),c(Hn,On),A(An,Hn,null),c(a,In),In.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>2021-02-02<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">relative</span> <span class="token attr-name">timestamp=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">1e10</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n',c(a,En),c(a,Nn),c(a,Pn),c(a,qn),c(a,Un),c(a,Wn),A(Gn,Wn,null),c(a,zn),zn.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live</span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',c(a,Fn),c(a,Bn),c(a,Jn),c(a,Rn),A(Zn,Rn,null),c(a,Vn),Vn.innerHTML='<span class="token comment">&lt;!-- Update every 10 minutes --\x3e</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token attr-name">live=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">}</span></span> <span class="token attr-name">relative</span> <span class="token punctuation">/></span></span>\n',c(a,Qn),c(a,Kn),c(a,Xn),c(a,nt),c(a,tt),c(a,at),c(at,st),c(at,et),c(at,ot),c(at,pt),c(at,it),c(a,lt),lt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token punctuation">{</span> svelteTime <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span> <span class="token attr-name"><span class="token namespace">use:</span>svelteTime</span> <span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">"dddd @ h:mm A · MMMM D, YYYY"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    timestamp<span class="token operator">:</span> <span class="token string">"2021-02-02"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',c(a,ct),c(a,rt),c(a,ut),c(a,mt),c(mt,dt),c(a,ft),ft.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>time</span>\n  <span class="token attr-name"><span class="token namespace">use:</span>svelteTime=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">{</span>\n    live<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    relative<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n<span class="token punctuation">/></span></span>\n',c(a,kt),c(a,ht),c(a,gt),c(a,vt),c(a,$t),c(a,yt),yt.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token string">"dayjs/esm/locale/de"</span><span class="token punctuation">;</span>\n  <span class="token keyword">import</span> dayjs <span class="token keyword">from</span> <span class="token string">"dayjs/esm"</span><span class="token punctuation">;</span>\n\n  dayjs<span class="token punctuation">.</span><span class="token function">locale</span><span class="token punctuation">(</span><span class="token string">"de"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// German locale</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> Time <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Time</span> <span class="token punctuation">/></span></span>\n',c(a,Mt),c(a,Tt),c(a,bt),c(a,xt),c(a,wt),c(a,Dt),c(a,Yt),c(a,Lt),c(Lt,St),c(a,Ht),Ht.innerHTML='<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> <span class="token punctuation">{</span> dayjs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte-time"</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"MMM DD, YYYY"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n  Set title\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n',c(a,jt),c(a,_t),c(a,Ct),c(a,Ot),c(a,At),c(a,It),c(a,Et),c(a,Nt),c(a,Pt),c(a,qt),c(a,Ut),c(a,Wt),c(a,Gt),c(a,zt),c(a,Ft),c(a,Bt),c(a,Jt),c(a,Rt),c(a,Zt),c(a,Vt),c(a,Qt),c(a,Kt),c(a,Xt),c(a,na),c(a,ta),c(a,aa),sa=!0,ea||(oa=[l(gn.call(null,st)),l(gn.call(null,ot,{timestamp:"2021-02-02",format:"dddd @ h:mm A · MMMM D, YYYY"})),l(gn.call(null,it,{relative:!0,timestamp:"2021-02-02"})),l(gn.call(null,dt,{live:!0,relative:!0})),(u=St,m="click",f=t[0],u.addEventListener(m,f,k),()=>u.removeEventListener(m,f,k))],ea=!0)},p:n,i(n){sa||(_(nn.$$.fragment,n),_(pn.$$.fragment,n),_(cn.$$.fragment,n),_(un.$$.fragment,n),_($n.$$.fragment,n),_(Mn.$$.fragment,n),_(bn.$$.fragment,n),_(jn.$$.fragment,n),_(Cn.$$.fragment,n),_(An.$$.fragment,n),_(Gn.$$.fragment,n),_(Zn.$$.fragment,n),sa=!0)},o(n){C(nn.$$.fragment,n),C(pn.$$.fragment,n),C(cn.$$.fragment,n),C(un.$$.fragment,n),C($n.$$.fragment,n),C(Mn.$$.fragment,n),C(bn.$$.fragment,n),C(jn.$$.fragment,n),C(Cn.$$.fragment,n),C(An.$$.fragment,n),C(Gn.$$.fragment,n),C(Zn.$$.fragment,n),sa=!1},d(n){n&&u(a),I(nn),I(pn),I(cn),I(un),I($n),I(Mn),I(bn),I(jn),I(Cn),I(An),I(Gn),I(Zn),ea=!1,e(oa)}}}function $n(n){return[()=>document.title=rn().format("MMM DD, YYYY")]}return new class extends P{constructor(n){super(),N(this,n,$n,vn,p,{})}}({target:document.body})}();

const dn=1,hn=4,yn=8,En=16;const wn="[",Tn="]",ct={},mn=Symbol(),at=!1,x=2,vt=4,Z=8,pt=16,N=32,$=64,Y=128,y=256,q=512,E=1024,k=2048,M=4096,B=8192,z=16384,kt=32768,It=65536,Ft=1<<19,dt=1<<20,st=Symbol("$state"),gn=Symbol("legacy props"),xn=Symbol("");var An=Array.isArray,Pt=Array.prototype.indexOf,On=Array.from,Rn=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,Ct=Object.getOwnPropertyDescriptors,Dn=Object.prototype,Nn=Array.prototype,Mt=Object.getPrototypeOf;function Sn(t){for(var n=0;n<t.length;n++)t[n]()}function Lt(t){return t===this.v}function jt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function bn(t){return!jt(t,this.v)}function Yt(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function qt(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Bt(t){throw new Error("https://svelte.dev/e/effect_orphan")}function Ut(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function kn(){throw new Error("https://svelte.dev/e/hydration_failed")}function In(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Fn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Pn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Ht(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function Cn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Gt=!1;function Vt(t){var n=x|k,r=o!==null&&o.f&x?o:null;return u===null||r!==null&&r.f&y?n|=y:u.f|=dt,{ctx:h,deps:null,effects:null,equals:Lt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??u}}function ht(t){var n=t.effects;if(n!==null){t.effects=null;for(var r=0;r<n.length;r+=1)D(n[r])}}function Kt(t){for(var n=t.parent;n!==null;){if(!(n.f&x))return n;n=n.parent}return null}function Wt(t){var n,r=u;V(Kt(t));try{ht(t),n=At(t)}finally{V(r)}return n}function yt(t){var n=Wt(t),r=(g||t.f&y)&&t.deps!==null?M:E;O(t,r),t.equals(n)||(t.v=n,t.wv=$t())}function Et(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let A=!1;function Mn(t){A=t}let w;function P(t){if(t===null)throw Et(),ct;return w=t}function Zt(){return P(L(w))}function Ln(t){if(A){if(L(w)!==null)throw Et(),ct;w=t}}var ut,wt,Tt,mt;function jn(){if(ut===void 0){ut=window,wt=/Firefox/.test(navigator.userAgent);var t=Element.prototype,n=Node.prototype;Tt=ot(n,"firstChild").get,mt=ot(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function tt(t=""){return document.createTextNode(t)}function C(t){return Tt.call(t)}function L(t){return mt.call(t)}function Yn(t,n){if(!A)return C(t);var r=C(w);if(r===null)r=w.appendChild(tt());else if(n&&r.nodeType!==3){var e=tt();return r?.before(e),P(e),e}return P(r),r}function qn(t,n){if(!A){var r=C(t);return r instanceof Comment&&r.data===""?L(r):r}return w}function Bn(t,n=1,r=!1){let e=A?w:t;for(var l;n--;)l=e,e=L(e);if(!A)return e;var a=e?.nodeType;if(r&&a!==3){var s=tt();return e===null?l?.after(s):e.before(s),P(s),s}return P(e),e}function Un(t){t.textContent=""}let j=!1,U=!1,H=null,S=!1,et=!1;function ft(t){S=t}function it(t){et=t}let nt=[],F=0;let o=null,m=!1;function G(t){o=t}let u=null;function V(t){u=t}let b=null;function Hn(t){b=t}let i=null,d=0,R=null;function Gn(t){R=t}let gt=1,K=0,g=!1;function $t(){return++gt}function J(t){var n=t.f;if(n&k)return!0;if(n&M){var r=t.deps,e=(n&y)!==0;if(r!==null){var l,a,s=(n&q)!==0,f=e&&u!==null&&!g,_=r.length;if(s||f){var v=t,c=v.parent;for(l=0;l<_;l++)a=r[l],(s||!a?.reactions?.includes(v))&&(a.reactions??=[]).push(v);s&&(v.f^=q),f&&c!==null&&!(c.f&y)&&(v.f^=y)}for(l=0;l<_;l++)if(a=r[l],J(a)&&yt(a),a.wv>t.wv)return!0}(!e||u!==null&&!g)&&O(t,E)}return!1}function zt(t,n){for(var r=n;r!==null;){if(r.f&Y)try{r.fn(t);return}catch{r.f^=Y}r=r.parent}throw j=!1,t}function Jt(t){return(t.f&z)===0&&(t.parent===null||(t.parent.f&Y)===0)}function Q(t,n,r,e){if(j){if(r===null&&(j=!1),Jt(n))throw t;return}r!==null&&(j=!0);{zt(t,n);return}}function xt(t,n,r=!0){var e=t.reactions;if(e!==null)for(var l=0;l<e.length;l++){var a=e[l];a.f&x?xt(a,n,!1):n===a&&(r?O(a,k):a.f&E&&O(a,M),Ot(a))}}function At(t){var n=i,r=d,e=R,l=o,a=g,s=b,f=h,_=m,v=t.f;i=null,d=0,R=null,o=v&(N|$)?null:t,g=(v&y)!==0&&(!S||l===null||_),b=null,_t(t.ctx),m=!1,K++;try{var c=(0,t.fn)(),T=t.deps;if(i!==null){var p;if(W(t,d),T!==null&&d>0)for(T.length=d+i.length,p=0;p<i.length;p++)T[d+p]=i[p];else t.deps=T=i;if(!g)for(p=d;p<T.length;p++)(T[p].reactions??=[]).push(t)}else T!==null&&d<T.length&&(W(t,d),T.length=d);if(vn()&&R!==null&&!m&&T!==null&&!(t.f&(x|M|k)))for(p=0;p<R.length;p++)xt(R[p],t);return l!==null&&K++,c}finally{i=n,d=r,R=e,o=l,g=a,b=s,_t(f),m=_}}function Qt(t,n){let r=n.reactions;if(r!==null){var e=Pt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&x&&(i===null||!i.includes(n))&&(O(n,M),n.f&(y|q)||(n.f^=q),ht(n),W(n,0))}function W(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Qt(t,r[e])}function lt(t){var n=t.f;if(!(n&z)){O(t,E);var r=u,e=h;u=t;try{n&pt?fn(t):Nt(t),Dt(t);var l=At(t);t.teardown=typeof l=="function"?l:null,t.wv=gt;var a=t.deps,s;at&&Gt&&t.f&k}catch(f){Q(f,t,r,e||t.ctx)}finally{u=r}}}function Xt(){if(F>1e3){F=0;try{Ut()}catch(t){if(H!==null)Q(t,H,null);else throw t}}F++}function tn(t){var n=t.length;if(n!==0){Xt();var r=S;S=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&E||(l.f^=E);var a=en(l);nn(a)}}finally{S=r}}}function nn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(z|B)))try{J(e)&&(lt(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?St(e):e.fn=null))}catch(l){Q(l,e,null,e.ctx)}}}function rn(){if(U=!1,F>1001)return;const t=nt;nt=[],tn(t),U||(F=0,H=null)}function Ot(t){U||(U=!0,queueMicrotask(rn)),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&($|N)){if(!(r&E))return;n.f^=E}}nt.push(n)}function en(t){var n=[],r=t.first;t:for(;r!==null;){var e=r.f,l=(e&N)!==0,a=l&&(e&E)!==0,s=r.next;if(!a&&!(e&B)){if(e&vt)n.push(r);else if(l)r.f^=E;else{var f=o;try{o=r,J(r)&&lt(r)}catch(c){Q(c,r,null,r.ctx)}finally{o=f}}var _=r.first;if(_!==null){r=_;continue}}if(s===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var v=c.next;if(v!==null){r=v;continue t}c=c.parent}}r=s}return n}function ln(t){var n=t.f,r=(n&x)!==0;if(o!==null&&!m){b!==null&&b.includes(t)&&Ht();var e=o.deps;t.rv<K&&(t.rv=K,i===null&&e!==null&&e[d]===t?d++:i===null?i=[t]:(!g||!i.includes(t))&&i.push(t))}else if(r&&t.deps===null&&t.effects===null){var l=t,a=l.parent;a!==null&&!(a.f&y)&&(l.f^=y)}return r&&(l=t,J(l)&&yt(l)),t.v}function Vn(t){var n=m;try{return m=!0,t()}finally{m=n}}const an=-7169;function O(t,n){t.f=t.f&an|n}function Kn(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(st in t)rt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&st in r&&rt(r)}}}function rt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{rt(t[e],n)}catch{}const r=Mt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Ct(r);for(let l in e){const a=e[l].get;if(a)try{a.call(t)}catch{}}}}}function sn(t){u===null&&o===null&&Bt(),o!==null&&o.f&y&&u===null&&qt(),et&&Yt()}function on(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function I(t,n,r,e=!0){var l=(t&$)!==0,a=u,s={ctx:h,deps:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:l?null:a,prev:null,teardown:null,transitions:null,wv:0};if(r){var f=S;try{ft(!0),lt(s),s.f|=kt}catch(c){throw D(s),c}finally{ft(f)}}else n!==null&&Ot(s);var _=r&&s.deps===null&&s.first===null&&s.nodes_start===null&&s.teardown===null&&(s.f&(dt|Y))===0;if(!_&&!l&&e&&(a!==null&&on(s,a),o!==null&&o.f&x)){var v=o;(v.effects??=[]).push(s)}return s}function Wn(t){const n=I(Z,null,!1);return O(n,E),n.teardown=t,n}function Zn(t){sn();var n=u!==null&&(u.f&N)!==0&&h!==null&&!h.m;if(n){var r=h;(r.e??=[]).push({fn:t,effect:u,reaction:o})}else{var e=Rt(t);return e}}function $n(t){const n=I($,t,!0);return(r={})=>new Promise(e=>{r.outro?_n(n,()=>{D(n),e(void 0)}):(D(n),e(void 0))})}function Rt(t){return I(vt,t,!1)}function zn(t){return I(Z,t,!0)}function Jn(t,n=[],r=Vt){const e=n.map(r);return un(()=>t(...e.map(ln)))}function un(t,n=0){return I(Z|pt|n,t,!0)}function Qn(t,n=!0){return I(Z|N,t,!0,n)}function Dt(t){var n=t.teardown;if(n!==null){const r=et,e=o;it(!0),G(null);try{n.call(null)}finally{it(r),G(e)}}}function Nt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;D(r,n),r=e}}function fn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&N||D(n),n=r}}function D(t,n=!0){var r=!1;if((n||t.f&Ft)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var a=e===l?null:L(e);e.remove(),e=a}r=!0}Nt(t,n&&!r),W(t,0),O(t,z);var s=t.transitions;if(s!==null)for(const _ of s)_.stop();Dt(t);var f=t.parent;f!==null&&f.first!==null&&St(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function St(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function _n(t,n){var r=[];bt(t,r,!0),cn(r,()=>{D(t),n()})}function cn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function bt(t,n,r){if(!(t.f&B)){if(t.f^=B,t.transitions!==null)for(const s of t.transitions)(s.is_global||r)&&n.push(s);for(var e=t.first;e!==null;){var l=e.next,a=(e.f&It)!==0||(e.f&N)!==0;bt(e,n,a?r:!1),e=l}}}let h=null;function _t(t){h=t}function Xn(t,n=!1,r){h={p:h,c:null,e:null,m:!1,s:t,x:null,l:null}}function tr(t){const n=h;if(n!==null){const s=n.e;if(s!==null){var r=u,e=o;n.e=null;try{for(var l=0;l<s.length;l++){var a=s[l];V(a.effect),G(a.reaction),Rt(a.fn)}}finally{V(r),G(e)}}h=n.p,n.m=!0}return{}}function vn(){return!0}function pn(t){var n=document.createElement("template");return n.innerHTML=t,n.content}function X(t,n){var r=u;r.nodes_start===null&&(r.nodes_start=t,r.nodes_end=n)}function nr(t,n){var r=(n&1)!==0,e=(n&2)!==0,l,a=!t.startsWith("<!>");return()=>{if(A)return X(w,null),w;l===void 0&&(l=pn(a?t:"<!>"+t),r||(l=C(l)));var s=e||wt?document.importNode(l,!0):l.cloneNode(!0);if(r){var f=C(s),_=s.lastChild;X(f,_)}else X(s,s);return s}}function rr(t,n){if(A){u.nodes_end=w,Zt();return}t!==null&&t.before(n)}export{Lt as $,gn as A,En as B,pn as C,X as D,Wn as E,C as F,w as G,Zt as H,Sn as I,o as J,x as K,xn as L,vn as M,pt as N,b as O,hn as P,Cn as Q,$t as R,st as S,u as T,E as U,N as V,$ as W,k as X,O as Y,y as Z,Ot as _,rr as a,m as a0,Hn as a1,R as a2,Gn as a3,M as a4,Dn as a5,Nn as a6,Fn as a7,mn as a8,Pn as a9,An as aa,G as ab,V as ac,Rn as ad,jn as ae,wn as af,L as ag,ct as ah,P as ai,Tn as aj,Et as ak,kn as al,Un as am,On as an,$n as ao,tt as ap,Qn as aq,h as ar,Xn as b,Yn as c,zn as d,Rt as e,qn as f,Kn as g,jt as h,Zn as i,Jn as j,ln as k,Vt as l,Mn as m,Mt as n,A as o,tr as p,Ct as q,Ln as r,Bn as s,nr as t,Vn as u,ot as v,In as w,bn as x,dn as y,yn as z};

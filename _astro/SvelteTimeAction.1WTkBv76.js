import{d}from"./dayjs.Bs4-EQfZ.js";import{e as M,u as Y,d as p,g as b,h as D,i as h,f as y,a as I,t as E,c,r as u,s as L}from"./template.B4__MM-K.js";function o(m,s,r){M(()=>{var a=Y(()=>s(m,r?.())||{});if(r&&a?.update){var i=!1,e={};p(()=>{var t=r();b(t),i&&D(e,t)&&(e=t,a.update(t))}),i=!0}if(a?.destroy)return()=>a.destroy()})}const _=(m,s={})=>{let a;const i=(e,t={})=>{const f=t.timestamp||new Date().toISOString(),A=t.format||"MMM DD, YYYY",n=t.relative===!0,l=t.live??!1;let T=d(f).from(),v=d(f).format(A);n&&("title"in t?t.title!==void 0&&e.setAttribute("title",t.title):e.setAttribute("title",v),l!==!1&&(a=setInterval(()=>{e.innerText=d(f).from()},Math.abs(typeof l=="number"?l:6e4)))),e.setAttribute("datetime",f),e.innerText=n?T:v};h(()=>(i(m,s),()=>{clearInterval(a)}))};var x=E("<div><time></time></div> <div><time></time></div>",1);function F(m){var s=x(),r=y(s),a=c(r);o(a,t=>_?.(t)),u(r);var i=L(r,2),e=c(i);o(e,(t,f)=>_?.(t,f),()=>({timestamp:"2021-02-02",format:"dddd @ h:mm A · MMMM D, YYYY"})),u(i),I(m,s)}export{F as default};

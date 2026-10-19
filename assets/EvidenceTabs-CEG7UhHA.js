import{c as a,r as l,j as e,A as d}from"./index-DqoNbKGh.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],u=a("chart-column",x);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],f=a("database",y);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],w=a("file-spreadsheet",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],v=a("layout-dashboard",p);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],j=a("target",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]],_=a("workflow",g);function M({items:c,label:h}){const[r,i]=l.useState(0),s=l.useId(),t=c[r];return e.jsxs("div",{"data-reveal":!0,children:[e.jsx("div",{role:"tablist","aria-label":h,className:"flex flex-wrap gap-2 mb-4",children:c.map((n,o)=>e.jsx("button",{type:"button",role:"tab",id:`${s}-tab-${o}`,"aria-selected":o===r,"aria-controls":`${s}-panel`,onClick:()=>i(o),className:`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${o===r?"bg-orange-500 border-orange-500 text-black":"border-white/70 text-white hover:bg-white hover:text-black"}`,children:n.label},n.label))}),e.jsxs("figure",{id:`${s}-panel`,role:"tabpanel","aria-labelledby":`${s}-tab-${r}`,children:[e.jsx("a",{href:t.src,target:"_blank",rel:"noreferrer",className:"flex justify-center rounded-2xl",children:e.jsx("img",{loading:"lazy",decoding:"async",src:t.src,alt:t.alt,width:t.width,height:t.height,className:"w-auto h-auto max-w-full max-h-[70vh] rounded-2xl border border-white/10 hover:border-orange-500/60 transition-colors"})}),e.jsxs("figcaption",{className:"mt-3 flex items-start justify-between gap-4 text-sm text-white/50",children:[e.jsx("span",{children:t.caption}),e.jsxs("a",{href:t.src,target:"_blank",rel:"noreferrer",className:"shrink-0 inline-flex items-center gap-1 text-orange-500 hover:text-orange-400",children:["Full size ",e.jsx(d,{size:14})]})]})]})]})}export{u as C,f as D,M as E,w as F,v as L,j as T,_ as W};

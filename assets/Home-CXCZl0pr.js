import{r as s,j as t,u as N,L,d as m}from"./index-BLa0kxBv.js";import{d as R}from"./db-CpqW60bI.js";import{M as W,i as q,u as A,P as B,a as U,b as _,L as G,m as I}from"./proxy-Bg37ztZW.js";class K extends s.Component{getSnapshotBeforeUpdate(d){const r=this.props.childRef.current;if(r&&d.isPresent&&!this.props.isPresent){const a=r.offsetParent,h=q(a)&&a.offsetWidth||0,n=this.props.sizeRef.current;n.height=r.offsetHeight||0,n.width=r.offsetWidth||0,n.top=r.offsetTop,n.left=r.offsetLeft,n.right=h-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function O({children:i,isPresent:d,anchorX:r,root:a}){const h=s.useId(),n=s.useRef(null),c=s.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:C}=s.useContext(W);return s.useInsertionEffect(()=>{const{width:x,height:l,top:y,left:e,right:o}=c.current;if(d||!n.current||!x||!l)return;const f=r==="left"?`left: ${e}`:`right: ${o}`;n.current.dataset.motionPopId=h;const u=document.createElement("style");C&&(u.nonce=C);const g=a??document.head;return g.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${l}px !important;
            ${f}px !important;
            top: ${y}px !important;
          }
        `),()=>{g.contains(u)&&g.removeChild(u)}},[d]),t.jsx(K,{isPresent:d,childRef:n,sizeRef:c,children:s.cloneElement(i,{ref:n})})}const Q=({children:i,initial:d,isPresent:r,onExitComplete:a,custom:h,presenceAffectsLayout:n,mode:c,anchorX:C,root:x})=>{const l=A(V),y=s.useId();let e=!0,o=s.useMemo(()=>(e=!1,{id:y,initial:d,isPresent:r,custom:h,onExitComplete:f=>{l.set(f,!0);for(const u of l.values())if(!u)return;a&&a()},register:f=>(l.set(f,!1),()=>l.delete(f))}),[r,l,a]);return n&&e&&(o={...o}),s.useMemo(()=>{l.forEach((f,u)=>l.set(u,!1))},[r]),s.useEffect(()=>{!r&&!l.size&&a&&a()},[r]),c==="popLayout"&&(i=t.jsx(O,{isPresent:r,anchorX:C,root:x,children:i})),t.jsx(B.Provider,{value:o,children:i})};function V(){return new Map}const v=i=>i.key||"";function $(i){const d=[];return s.Children.forEach(i,r=>{s.isValidElement(r)&&d.push(r)}),d}const X=({children:i,custom:d,initial:r=!0,onExitComplete:a,presenceAffectsLayout:h=!0,mode:n="sync",propagate:c=!1,anchorX:C="left",root:x})=>{const[l,y]=U(c),e=s.useMemo(()=>$(i),[i]),o=c&&!l?[]:e.map(v),f=s.useRef(!0),u=s.useRef(e),g=A(()=>new Map),[T,D]=s.useState(e),[b,S]=s.useState(e);_(()=>{f.current=!1,u.current=e;for(let j=0;j<b.length;j++){const p=v(b[j]);o.includes(p)?g.delete(p):g.get(p)!==!0&&g.set(p,!1)}},[b,o.length,o.join("-")]);const M=[];if(e!==T){let j=[...e];for(let p=0;p<b.length;p++){const w=b[p],k=v(w);o.includes(k)||(j.splice(p,0,w),M.push(w))}return n==="wait"&&M.length&&(j=M),S($(j)),D(e),null}const{forceRender:H}=s.useContext(G);return t.jsx(t.Fragment,{children:b.map(j=>{const p=v(j),w=c&&!l?!1:e===b||o.includes(p),k=()=>{if(g.has(p))g.set(p,!0);else return;let E=!0;g.forEach(F=>{F||(E=!1)}),E&&(H?.(),S(u.current),c&&y?.(),a&&a())};return t.jsx(Q,{isPresent:w,initial:!f.current||r?void 0:!1,custom:d,presenceAffectsLayout:h,mode:n,root:x,onExitComplete:w?void 0:k,anchorX:C,children:j},p)})})},J=m.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,Y=m.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`,z=m.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: ${i=>i.active?"#2c5282":"white"};
  color: ${i=>i.active?"white":"#2d3748"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${i=>i.active?"#2a4365":"#f7fafc"};
  }
`,Z=m.section`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`,ee=m.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`,te=m.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`,re=m.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`,ne=m(I.div)`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`,se=m.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }

  .price {
    color: #2c5282;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .match-score {
    font-size: 0.875rem;
    color: #718096;
  }
`,ie=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`,oe=m(I.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 450px; /* Set minimum height */

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    flex-shrink: 0; /* Prevent image from shrinking */
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  p {
    color: #666;
    margin: 0.5rem 0;
  }

  p:not(.price) {
    flex-grow: 1; /* Make description take up remaining space */
  }

  .price {
    font-weight: bold;
    color: #2c5282;
    margin: 1rem 0 0;
  }
`,ce=m.button`
  width: 100%;
  padding: 0.75rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a4365;
  }
`,ae=m(L)`
  text-decoration: none;
  color: inherit;
  display: block;
`;function P(i,d){const r=i.toLowerCase(),a=d.toLowerCase();if(a.length===0)return{isMatch:!1,score:0};if(r.includes(a))return{isMatch:!0,score:1};let h=0,n=0,c=0;for(let x=0;x<r.length&&n<a.length;x++)r[x]===a[n]?(h+=(c+1)*2,c++,n++):c=0;const C=n===a.length;return{isMatch:C,score:C?h/(r.length*a.length):0}}const ue=()=>{const[i,d]=s.useState([]),[r,a]=s.useState([]),[h,n]=s.useState("all"),[c,C]=s.useState(""),{dispatch:x}=N();s.useEffect(()=>{d(R.products);const e=Array.from(new Set(R.products.map(o=>o.category)));a(e)},[]);const l=s.useMemo(()=>c?R.products.map(e=>{const o=P(e.name,c),f=P(e.description,c),u=P(e.category,c),g=Math.max(o.score*3,f.score*2,u.score);return{product:e,score:g,isMatch:o.isMatch||f.isMatch||u.isMatch}}).filter(e=>e.isMatch).sort((e,o)=>o.score-e.score):[],[c]),y=(e,o)=>{e.preventDefault(),x({type:"ADD_TO_CART",payload:{product:o,quantity:1}})};return t.jsxs(J,{children:[t.jsxs(Z,{children:[t.jsx("h1",{children:"Welcome to LeafyCart"}),t.jsx("p",{children:"Discover our curated collection of modern essentials"})]}),t.jsx(ee,{children:t.jsx(te,{type:"text",placeholder:"Search products...",value:c,onChange:e=>C(e.target.value)})}),t.jsx(X,{children:c&&t.jsxs(re,{children:[l.map(({product:e,score:o})=>t.jsx(L,{to:`/product/${e.id}`,style:{textDecoration:"none",color:"inherit"},children:t.jsxs(ne,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},whileHover:{scale:1.02},children:[t.jsx("img",{src:e.images[0],alt:e.name}),t.jsxs(se,{children:[t.jsx("h3",{children:e.name}),t.jsx("p",{children:e.description}),t.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]}),t.jsxs("p",{className:"match-score",children:["Match score: ",Math.round(o*100),"%"]})]})]})},e.id)),c&&l.length===0&&t.jsxs("p",{children:['No products found matching "',c,'"']})]})}),t.jsxs("section",{children:[t.jsxs(Y,{children:[t.jsx(z,{active:h==="all",onClick:()=>n("all"),children:"All"}),r.map(e=>t.jsx(z,{active:h===e,onClick:()=>n(e),children:e.charAt(0).toUpperCase()+e.slice(1)},e))]}),t.jsx(ie,{children:(h==="all"?i:i.filter(e=>e.category===h)).map(e=>t.jsx(ae,{to:`/product/${e.id}`,children:t.jsxs(oe,{whileHover:{y:-5},transition:{duration:.2},children:[t.jsx("img",{src:e.images[0],alt:e.name}),t.jsxs("div",{className:"content",children:[t.jsx("h3",{children:e.name}),t.jsx("p",{children:e.description}),t.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]})]}),t.jsx(ce,{onClick:o=>y(o,e),children:"Add to Cart"})]})},e.id))})]})]})};export{ue as default};

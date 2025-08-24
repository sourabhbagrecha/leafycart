import{b as m,u as p,j as e,d as i}from"./index-B4Djqj5h.js";import{P as h}from"./PageWrapper-CaP6JYSj.js";import{m as s}from"./proxy-DN39KLzX.js";const g=i.div`
  display: grid;
  gap: 1rem;
`,x=i(s.div)`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`,u=i.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`,b=i.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,j=i.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #e53e3e;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c53030;
  }
`,f=i.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #f7fafc;
    }
  }
`,k=i.div`
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }
`,v=i(s.button)`
  padding: 1rem 2rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a4365;
  }
`;function T(){const d=m(),{state:o,dispatch:n}=p(),a=(r,t)=>{t<1||n({type:"UPDATE_QUANTITY",payload:{productId:r,quantity:t}})},c=r=>{n({type:"REMOVE_FROM_CART",payload:r})},l=()=>{d("/checkout")};return e.jsxs(h,{title:"Shopping Cart",children:[e.jsx(g,{children:o.items.map(({product:r,quantity:t})=>e.jsxs(x,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsx("img",{src:r.images[0],alt:r.name}),e.jsxs(u,{children:[e.jsx("h3",{children:r.name}),e.jsxs("p",{children:["$",r.price.toFixed(2)]})]}),e.jsxs(b,{children:[e.jsxs(f,{children:[e.jsx("button",{onClick:()=>a(r.id,t-1),children:"-"}),e.jsx("span",{children:t}),e.jsx("button",{onClick:()=>a(r.id,t+1),children:"+"})]}),e.jsx(j,{onClick:()=>c(r.id),children:"Remove"})]})]},r.id))}),o.items.length>0?e.jsxs(k,{children:[e.jsxs("h3",{children:["Total: $",o.total.toFixed(2)]}),e.jsx(v,{onClick:l,whileHover:{scale:1.05},whileTap:{scale:.95},children:"Proceed to Checkout"})]}):e.jsx("p",{children:"Your cart is empty"})]})}export{T as default};

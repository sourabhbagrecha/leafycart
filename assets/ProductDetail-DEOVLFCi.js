import{a as u,r as i,u as x,j as t,d as e}from"./index-B4Djqj5h.js";import{P as s}from"./PageWrapper-CaP6JYSj.js";import{d as g}from"./db-CpqW60bI.js";import{m as h}from"./proxy-DN39KLzX.js";const f=e.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=e.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,b=e.div`
  h2 {
    margin: 0 0 1rem;
    font-size: 2rem;
  }

  .price {
    font-size: 1.5rem;
    color: #2c5282;
    margin: 1rem 0;
  }

  .description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`,y=e.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
`,k=e.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
`,C=e(h.button)`
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`,v=e.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;function T(){const{id:n}=u(),[r,d]=i.useState(null),[a,c]=i.useState(1),{dispatch:l}=x();if(i.useEffect(()=>{const o=g.products.find(p=>p.id===n);d(o||null)},[n]),!r)return t.jsx(s,{title:"Product Not Found",children:t.jsx("p",{children:"Sorry, we couldn't find the product you're looking for."})});const m=()=>{l({type:"ADD_TO_CART",payload:{product:r,quantity:a}})};return t.jsx(s,{title:r.name,children:t.jsxs(f,{children:[t.jsx(j,{children:t.jsx("img",{src:r.images[0],alt:r.name})}),t.jsxs(b,{children:[t.jsx("h2",{children:r.name}),t.jsxs(v,{children:[t.jsxs("div",{children:["Rating: ",r.rating,"⭐"]}),t.jsxs("div",{children:["Stock: ",r.stock]})]}),t.jsx("p",{className:"description",children:r.description}),t.jsxs("p",{className:"price",children:["$",r.price.toFixed(2)]}),t.jsxs(y,{children:[t.jsx(k,{type:"number",min:"1",max:r.stock,value:a,onChange:o=>c(Math.min(r.stock,Math.max(1,parseInt(o.target.value))))}),t.jsx(C,{whileTap:{scale:.95},disabled:r.stock===0,onClick:m,children:r.stock===0?"Out of Stock":"Add to Cart"})]})]})]})})}export{T as default};

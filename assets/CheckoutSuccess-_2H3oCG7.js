import{e as n,r as s,j as e,d as r}from"./index-C-KV5cg7.js";import{P as a}from"./PageWrapper-mmXw9a0f.js";import{m as o}from"./proxy-BCaqwnqM.js";const c=r.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`,d=r(o.div)`
  width: 80px;
  height: 80px;
  background: #48bb78;
  border-radius: 50%;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`,l=r.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin: 1rem 0 2rem;
`,u=r(o.button)`
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;function x(){const t=n();return s.useEffect(()=>{const i=setTimeout(()=>{t("/")},5e3);return()=>clearTimeout(i)},[t]),e.jsx(a,{title:"Order Confirmed",children:e.jsxs(c,{children:[e.jsx(d,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",duration:.5},children:"✓"}),e.jsx("h2",{children:"Thank you for your order!"}),e.jsx(l,{children:"Your order has been confirmed and will be shipped shortly. You'll receive an email with your order details."}),e.jsx(u,{onClick:()=>t("/"),whileHover:{scale:1.05},whileTap:{scale:.95},children:"Continue Shopping"})]})})}export{x as default};

import{r as n,j as e,d as r}from"./index-BLa0kxBv.js";import{P as a}from"./PageWrapper-D3vWYtXS.js";import{d as l}from"./db-CpqW60bI.js";import{m}from"./proxy-Bg37ztZW.js";const x=r.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,h=r(m.div)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,u=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`,f=r.span`
  font-size: 0.875rem;
  color: #718096;
`,g=r.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({status:i})=>{switch(i){case"delivered":return"#C6F6D5";case"processing":return"#FEF3C7";case"shipped":return"#DBEAFE";default:return"#E2E8F0"}}};
  color: ${({status:i})=>{switch(i){case"delivered":return"#2F855A";case"processing":return"#92400E";case"shipped":return"#1E40AF";default:return"#4A5568"}}};
`,j=r.div`
  margin-top: 1rem;
`,b=r.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,y=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`,O=r.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`,D=r.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;function C(){const[i,d]=n.useState([]),[o,c]=n.useState(!0);return n.useEffect(()=>{(async()=>{try{const t=l.orders;d(t)}catch(t){console.error("Error fetching orders:",t)}finally{c(!1)}})()},[]),o?e.jsx(a,{title:"Orders",children:"Loading..."}):i.length===0?e.jsx(a,{title:"Orders",children:e.jsx("p",{children:"No orders found."})}):e.jsx(a,{title:"Orders",children:e.jsx(x,{children:i.map(s=>e.jsxs(h,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e.jsxs(u,{children:[e.jsxs(f,{children:["Order #",s.id]}),e.jsx(g,{status:s.status,children:s.status.charAt(0).toUpperCase()+s.status.slice(1)})]}),e.jsxs(j,{children:[e.jsx(b,{children:s.items.map((t,p)=>e.jsxs(y,{children:[e.jsxs("span",{children:[t.quantity,"x Product #",t.productId]}),e.jsxs("span",{children:["$",(t.quantity*t.price).toFixed(2)]})]},p))}),s.shippingDetails&&e.jsxs(O,{children:[e.jsx("h4",{children:"Shipping Details"}),e.jsxs("p",{children:[s.shippingDetails.firstName," ",s.shippingDetails.lastName,e.jsx("br",{}),s.shippingDetails.address,e.jsx("br",{}),s.shippingDetails.city,","," ",s.shippingDetails.postalCode,e.jsx("br",{}),s.shippingDetails.country]})]}),e.jsxs(D,{children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["$",s.total.toFixed(2)]})]})]})]},s.id))})})}export{C as default};

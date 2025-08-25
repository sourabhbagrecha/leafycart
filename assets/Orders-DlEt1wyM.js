import{u as c,b as p,j as e,L as l,d as s}from"./index-Dio7GKzt.js";import{P as n}from"./PageWrapper-ClBiIYSY.js";import{m as u}from"./proxy-CYE6sKoy.js";const x=s.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,m=s(u.div)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,h=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`,g=s.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,f=s.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`,j=s.div`
  position: relative;
`,b=s.div`
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-bottom-left-radius: 4px;
  padding: 0.1rem 0.3rem;
  font-size: 0.7rem;
`,y=s.span`
  font-size: 0.875rem;
  color: #718096;
`,v=s.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({status:i})=>{switch(i){case"delivered":return"#C6F6D5";case"processing":return"#FEF3C7";case"shipped":return"#DBEAFE";default:return"#E2E8F0"}}};
  color: ${({status:i})=>{switch(i){case"delivered":return"#2F855A";case"processing":return"#92400E";case"shipped":return"#1E40AF";default:return"#4A5568"}}};
`,w=s.div`
  margin-top: 1rem;
`,A=s.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,O=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`,F=s.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`,E=s.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;function k(){const i=c(),{data:d,isLoading:o,error:a}=p({queryKey:["orders"],queryFn:async()=>{const{data:r,status:t}=await i.get("/api/order");if(t!==200)throw new Error("Failed to fetch orders");return r}});return a?e.jsxs(n,{title:"Orders",children:["Error fetching orders: ",a.message]}):o?e.jsx(n,{title:"Orders",children:"Loading..."}):d.length===0?e.jsx(n,{title:"Orders",children:e.jsx("p",{children:"No orders found."})}):e.jsx(n,{title:"Orders",children:e.jsx(x,{children:d.map(r=>e.jsxs(m,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e.jsxs(h,{children:[e.jsxs(y,{children:["Order #",r._id]}),e.jsx(v,{status:r.status,children:r.status.charAt(0).toUpperCase()+r.status.slice(1)})]}),e.jsx(g,{children:r.items.slice(0,4).map(t=>e.jsx(l,{to:`/product/${t.product._id}`,children:e.jsxs(j,{children:[e.jsx(f,{src:t.product.image,alt:t.product.name}),e.jsx(b,{children:t.quantity})]})},t.product._id))}),e.jsxs(w,{children:[e.jsx(A,{children:r.items.map(t=>e.jsxs(O,{children:[e.jsxs("span",{children:[t.quantity,"x ",t.product.name]}),e.jsxs("span",{children:["$",(t.quantity*t.product.price).toFixed(2)]})]},t.product._id))}),r.shippingAddress&&e.jsxs(F,{children:[e.jsx("h4",{children:"Shipping Address"}),e.jsxs("p",{children:[r.shippingAddress.firstName," ",r.shippingAddress.lastName,e.jsx("br",{}),r.shippingAddress.address,e.jsx("br",{}),r.shippingAddress.city,","," ",r.shippingAddress.postalCode,e.jsx("br",{}),r.shippingAddress.country]})]}),e.jsxs(E,{children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["$",r.total.toFixed(2)]})]})]})]},r._id))})})}export{k as default};

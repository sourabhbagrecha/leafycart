import{g as v,u as k,b as w,c as u,j as e,d as a,m as C}from"./index-RQbKfA1K.js";import{P as F}from"./PageWrapper-DkAYSP1q.js";const I=a.div`
  display: grid;
  gap: 1rem;
`,E=a.div`
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
`,P=a.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`,_=a.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,Q=a.button`
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
`,$=a.div`
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
`,K=a.div`
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }
`,M=a(C.button)`
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
`;function z(){const p=v(),o=k(),h=async r=>{try{await j.mutate(r)}catch(t){console.error("Error removing item:",t)}},g=()=>{p("/checkout")},{data:d,isLoading:x,error:b,refetch:l}=w({queryKey:["cart"],queryFn:async()=>{const{data:r,status:t}=await o.get("/api/cart");if(t!==200)throw new Error("Failed to fetch");return r}}),j=u({mutationKey:["cart","removeItem"],mutationFn:async r=>{await o.delete(`/api/cart/item/${r}`),l()}}),y=({product:r,quantity:t})=>{const i=u({mutationKey:["cart","updateQuantity"],mutationFn:async({productId:s,quantity:n})=>{const c=await o.patch(`/api/cart/item/${s}`,{quantity:n});return l(),c.data}}),m=async(s,n)=>{if(!(n<1))try{await i.mutate({productId:s,quantity:n})}catch(c){console.error("Error removing item:",c)}};return e.jsxs(E,{children:[e.jsx("img",{src:r.image,alt:r.name}),e.jsxs(P,{children:[e.jsx("h3",{children:r.name}),e.jsxs("p",{children:["$",r.price.toFixed(2)]})]}),e.jsxs(_,{children:[e.jsxs($,{children:[e.jsx("button",{onClick:()=>m(r._id,t-1),disabled:t===1,style:{cursor:t===1?"not-allowed":"pointer"},children:"-"}),e.jsx("span",{children:i.isPending?"↻":t}),e.jsx("button",{onClick:()=>m(r._id,t+1),children:"+"})]}),e.jsx(Q,{onClick:()=>h(r._id),children:"Remove"})]})]},r._id)},f=({cart:r})=>e.jsxs(F,{title:"Shopping Cart",children:[e.jsx(I,{children:r?.items?.map(({product:t,quantity:i})=>e.jsx(y,{product:t,quantity:i},t._id))||e.jsx("p",{children:"Your cart is empty"})}),r?.items?.length??!1?e.jsxs(K,{children:[e.jsxs("h3",{children:["Total: $",r?.total?.toFixed(2)]}),e.jsx(M,{onClick:g,whileHover:{scale:1.05},whileTap:{scale:.95},children:"Proceed to Checkout"})]}):e.jsx("p",{children:"Your cart is empty"})]});return e.jsxs(e.Fragment,{children:[d&&e.jsx(f,{cart:d||{}}),x&&e.jsx("p",{children:"Loading cart..."}),b&&e.jsx("p",{children:"Error loading cart"})]})}export{z as default};

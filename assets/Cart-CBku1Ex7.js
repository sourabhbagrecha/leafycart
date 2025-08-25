import{e as v,u as k,b as w,j as e,d as i}from"./index-Dio7GKzt.js";import{P as C}from"./PageWrapper-ClBiIYSY.js";import{u}from"./useMutation-DOHl85Kj.js";import{m as F}from"./proxy-CYE6sKoy.js";const I=i.div`
  display: grid;
  gap: 1rem;
`,E=i.div`
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
`,P=i.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`,_=i.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,Q=i.button`
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
`,$=i.div`
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
`,K=i.div`
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }
`,M=i(F.button)`
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
`;function D(){const p=v(),n=k(),h=async r=>{try{await j.mutate(r)}catch(t){console.error("Error removing item:",t)}},g=()=>{p("/checkout")},{data:d,isLoading:x,error:b,refetch:m}=w({queryKey:["cart"],queryFn:async()=>{const{data:r,status:t}=await n.get("/api/cart");if(t!==200)throw new Error("Failed to fetch");return r}}),j=u({mutationKey:["cart","removeItem"],mutationFn:async r=>{await n.delete(`/api/cart/item/${r}`),m()}}),y=({product:r,quantity:t})=>{const a=u({mutationKey:["cart","updateQuantity"],mutationFn:async({productId:s,quantity:o})=>{const c=await n.patch(`/api/cart/item/${s}`,{quantity:o});return m(),c.data}}),l=async(s,o)=>{if(!(o<1))try{await a.mutate({productId:s,quantity:o})}catch(c){console.error("Error removing item:",c)}};return e.jsxs(E,{children:[e.jsx("img",{src:r.image,alt:r.name}),e.jsxs(P,{children:[e.jsx("h3",{children:r.name}),e.jsxs("p",{children:["$",r.price.toFixed(2)]})]}),e.jsxs(_,{children:[e.jsxs($,{children:[e.jsx("button",{onClick:()=>l(r._id,t-1),disabled:t===1,style:{cursor:t===1?"not-allowed":"pointer"},children:"-"}),e.jsx("span",{children:a.isPending?"↻":t}),e.jsx("button",{onClick:()=>l(r._id,t+1),children:"+"})]}),e.jsx(Q,{onClick:()=>h(r._id),children:"Remove"})]})]},r._id)},f=({cart:r})=>e.jsxs(C,{title:"Shopping Cart",children:[e.jsx(I,{children:r?.items?.map(({product:t,quantity:a})=>e.jsx(y,{product:t,quantity:a},t._id))||e.jsx("p",{children:"Your cart is empty"})}),r?.items?.length??!1?e.jsxs(K,{children:[e.jsxs("h3",{children:["Total: $",r?.total?.toFixed(2)]}),e.jsx(M,{onClick:g,whileHover:{scale:1.05},whileTap:{scale:.95},children:"Proceed to Checkout"})]}):e.jsx("p",{children:"Your cart is empty"})]});return e.jsxs(e.Fragment,{children:[d&&e.jsx(f,{cart:d||{}}),x&&e.jsx("p",{children:"Loading cart..."}),b&&e.jsx("p",{children:"Error loading cart"})]})}export{D as default};

import{c as x,r as g,u as h,a as f,b as y,j as t,d as i}from"./index-C-KV5cg7.js";import{P as a}from"./PageWrapper-mmXw9a0f.js";import{u as j}from"./useMutation-p8EyVU5X.js";import{m as b}from"./proxy-BCaqwnqM.js";const k=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,v=i.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,C=i.div`
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
`,w=i.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
`,q=i.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
`,A=i(b.button)`
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
`,S=i.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;function z(){const{id:o}=x(),[s,d]=g.useState(1),n=h(),c=f(),{data:e,error:m,isLoading:l}=y({queryKey:["product",o],queryFn:async()=>{const{data:r}=await n.get(`/api/products/${o}`);return r}}),u=j({mutationKey:["cart"],mutationFn:async r=>(await n.post("/api/cart",{product:{_id:r._id,name:r.name,price:r.price,image:r.images[0]},quantity:1})).data,onSuccess:()=>{c.invalidateQueries({queryKey:["cart"]})}}),p=r=>{r.preventDefault(),console.log("Add to cart clicked for product:",e),u.mutate(e)};return l?t.jsx(a,{title:"Loading...",children:t.jsx("p",{children:"Loading product details..."})}):!e||m?t.jsx(a,{title:"Product Not Found",children:t.jsx("p",{children:"Sorry, we couldn't find the product you're looking for."})}):t.jsx(a,{title:e.name,children:t.jsxs(k,{children:[t.jsx(v,{children:t.jsx("img",{src:e.images[0],alt:e.name})}),t.jsxs(C,{children:[t.jsx("h2",{children:e.name}),t.jsxs(S,{children:[t.jsxs("div",{children:["Rating: ",e.rating,"⭐"]}),t.jsxs("div",{children:["Stock: ",e.stock]})]}),t.jsx("p",{className:"description",children:e.description}),t.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]}),t.jsxs(w,{children:[t.jsx(q,{type:"number",min:"1",max:e.stock,value:s,onChange:r=>d(Math.min(e.stock,Math.max(1,parseInt(r.target.value))))}),t.jsx(A,{whileTap:{scale:.95},disabled:e.stock===0,onClick:p,children:e.stock===0?"Out of Stock":"Add to Cart"})]})]})]})})}export{z as default};

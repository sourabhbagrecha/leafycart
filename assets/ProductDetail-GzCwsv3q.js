import{c as x,r as g,u as h,a as f,b as y,j as t,d as i}from"./index-uOv3fffV.js";import{P as a}from"./PageWrapper-DzuVBoVJ.js";import{u as j}from"./useMutation-DUhU1EvS.js";import{m as b}from"./proxy-DQ9R4Xlz.js";const v=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,C=i.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,k=i.div`
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
`,S=i(b.button)`
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
`,A=i.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;function z(){const{id:n}=x(),[s,d]=g.useState(1),o=h(),c=f(),{data:e,error:m,isLoading:u}=y({queryKey:["product",n],queryFn:async()=>{const{data:r}=await o.get(`/api/products/${n}`);return r}}),l=j({mutationKey:["cart"],mutationFn:async r=>(await o.post("/api/cart",{product:{_id:r._id,name:r.name,price:r.price,image:r.images[0]},quantity:1})).data,onSuccess:()=>{c.invalidateQueries({queryKey:["cart"]})}}),p=r=>{r.preventDefault(),l.mutate(e)};return u?t.jsx(a,{title:"Loading...",children:t.jsx("p",{children:"Loading product details..."})}):!e||m?t.jsx(a,{title:"Product Not Found",children:t.jsx("p",{children:"Sorry, we couldn't find the product you're looking for."})}):t.jsx(a,{title:e.name,children:t.jsxs(v,{children:[t.jsx(C,{children:t.jsx("img",{src:e.images[0],alt:e.name})}),t.jsxs(k,{children:[t.jsx("h2",{children:e.name}),t.jsxs(A,{children:[t.jsxs("div",{children:["Rating: ",e.rating,"⭐"]}),t.jsxs("div",{children:["Stock: ",e.stock]})]}),t.jsx("p",{className:"description",children:e.description}),t.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]}),t.jsxs(w,{children:[t.jsx(q,{type:"number",min:"1",max:e.stock,value:s,onChange:r=>d(Math.min(e.stock,Math.max(1,parseInt(r.target.value))))}),t.jsx(S,{whileTap:{scale:.95},disabled:e.stock===0,onClick:p,children:e.stock===0?"Out of Stock":"Add to Cart"})]})]})]})})}export{z as default};

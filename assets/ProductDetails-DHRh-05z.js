import{r as y,u as k,a as S,c as b,j as e,d as r,m as u,e as $,f as D,b as E}from"./index-RQbKfA1K.js";import{P as w}from"./PageWrapper-DkAYSP1q.js";import{A as K}from"./index-LcUGTJ4n.js";const Q=r.div`
  margin-top: 2rem;
  max-height: 600px;
  overflow-y: auto;
`,T=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #2d3748;
  }
`,B=r(u.button)`
  padding: 0.5rem 1rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`,L=r(u.form)`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`,j=r.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
`,_=r.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100px;
  font-size: 1rem;
`,M=r.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }
`,H=r.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`,R=r(u.button)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid
    ${n=>n.variant==="primary"?"#2c5282":"#e2e8f0"};
  background: ${n=>n.variant==="primary"?"#2c5282":"white"};
  color: ${n=>n.variant==="primary"?"white":"#4a5568"};
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,U=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,W=r(u.div)`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,G=r.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`,O=r.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
  }

  .date {
    font-size: 0.8rem;
    color: #718096;
    margin-top: 0.25rem;
  }
`,I=r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .stars {
    color: #f6ad55;
    font-size: 1.1rem;
  }

  .rating-text {
    font-size: 0.9rem;
    color: #4a5568;
  }
`,J=r.div`
  color: #4a5568;
  line-height: 1.6;
`,V=r.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`,C=r(u.button)`
  padding: 0.25rem 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: #f7fafc;
  }

  &.delete {
    color: #e53e3e;
    border-color: #feb2b2;

    &:hover {
      background: #fed7d7;
    }
  }
`,X=r.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #718096;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`,Y=r.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
`;function Z({productId:n,reviews:l,currentUserId:v}){const[p,i]=y.useState(!1),[g,h]=y.useState(null),[o,s]=y.useState({rating:5,comment:""}),a=k(),d=S(),m=b({mutationFn:async t=>{const{data:f}=await a.post(`/api/review/${n}`,t);return f},onSuccess:()=>{d.invalidateQueries({queryKey:["reviews",n]}),d.invalidateQueries({queryKey:["product",n]}),i(!1),s({rating:5,comment:""})}}),c=b({mutationFn:async({reviewId:t,...f})=>{const{data:N}=await a.patch(`/api/review/${n}/${t}`,f);return N},onSuccess:()=>{d.invalidateQueries({queryKey:["reviews",n]}),d.invalidateQueries({queryKey:["product",n]}),h(null),s({rating:5,comment:""})}}),x=b({mutationFn:async t=>{const{data:f}=await a.delete(`/api/review/${n}/${t}`);return f},onSuccess:()=>{d.invalidateQueries({queryKey:["reviews",n]}),d.invalidateQueries({queryKey:["product",n]})}}),F=t=>{t.preventDefault(),g?c.mutate({reviewId:g._id,rating:o.rating,comment:o.comment}):m.mutate(o)},z=t=>{h(t),s({rating:t.rating,comment:t.comment}),i(!0)},P=()=>{h(null),s({rating:5,comment:""}),i(!1)},q=t=>{window.confirm("Are you sure you want to delete this review?")&&x.mutate(t)},A=t=>"★".repeat(t)+"☆".repeat(5-t);return e.jsxs(Q,{children:[e.jsxs(T,{children:[e.jsxs("h3",{children:["Reviews (",l.length||0,")"]}),e.jsx(B,{whileTap:{scale:.95},onClick:()=>i(!p),disabled:m.isPending,children:p?"Cancel":"Write Review"})]}),e.jsx(K,{children:p&&e.jsxs(L,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},onSubmit:F,children:[e.jsxs(j,{children:[e.jsx("label",{htmlFor:"rating",children:"Rating"}),e.jsx(_,{id:"rating",value:o.rating,onChange:t=>s({...o,rating:parseInt(t.target.value)}),children:[5,4,3,2,1].map(t=>e.jsxs("option",{value:t,children:[t," Star",t!==1?"s":""]},t))})]}),e.jsxs(j,{children:[e.jsx("label",{htmlFor:"comment",children:"Review"}),e.jsx(M,{id:"comment",placeholder:"Share your experience with this product...",value:o.comment,onChange:t=>s({...o,comment:t.target.value}),required:!0,minLength:10})]}),e.jsxs(H,{children:[e.jsx(R,{type:"button",onClick:P,disabled:m.isPending||c.isPending,children:"Cancel"}),e.jsx(R,{type:"submit",variant:"primary",disabled:m.isPending||c.isPending||!o.comment.trim(),children:g?"Update Review":"Submit Review"})]})]})}),(m.error||c.error||x.error)&&e.jsxs(Y,{children:["Error:"," ",m.error?.response?.data?.message||c.error?.response?.data?.message||x.error?.response?.data?.message||"Something went wrong"]}),l.length?e.jsx(U,{children:l.map(t=>e.jsxs(W,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e.jsxs(G,{children:[e.jsxs(O,{children:[e.jsx("h4",{children:t.userName}),e.jsx("div",{className:"date",children:new Date(t.createdAt).toLocaleDateString()})]}),e.jsxs(I,{children:[e.jsx("span",{className:"stars",children:A(t.rating)}),e.jsxs("span",{className:"rating-text",children:["(",t.rating,"/5)"]})]})]}),e.jsx(J,{children:t.comment}),v===t.userId&&e.jsxs(V,{children:[e.jsx(C,{whileTap:{scale:.95},onClick:()=>z(t),disabled:c.isPending||x.isPending,children:"Edit"}),e.jsx(C,{className:"delete",whileTap:{scale:.95},onClick:()=>q(t._id),disabled:c.isPending||x.isPending,children:"Delete"})]})]},t._id))}):e.jsx(X,{children:e.jsx("p",{children:"No reviews yet. Be the first to review this product!"})})]})}const ee=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,te=r.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,re=r.div`
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
  }
`,ie=r.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`,ne=r(u.button)`
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
`,ae=r.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;function ce(){const{id:n}=$(),l=k(),v=S(),{user:p}=D(),{data:i,error:g,isLoading:h}=E({queryKey:["product",n],queryFn:async()=>{const{data:a}=await l.get(`/api/product/${n}`);return a}}),o=b({mutationKey:["cart"],mutationFn:async a=>(await l.post("/api/cart",{product:{_id:a._id,name:a.name,price:a.price,image:a.images[0]},quantity:1})).data,onSuccess:()=>{v.invalidateQueries({queryKey:["cart"]})}}),s=a=>{a.preventDefault(),o.mutate(i)};return h?e.jsx(w,{title:"Loading...",children:e.jsx("p",{children:"Loading product details..."})}):!i||g?e.jsx(w,{title:"Product Not Found",children:e.jsx("p",{children:"Sorry, we couldn't find the product you're looking for."})}):e.jsx(w,{title:i.name,children:e.jsxs(ee,{children:[e.jsx(te,{children:e.jsx("img",{src:i.images[0],alt:i.name})}),e.jsxs(re,{children:[e.jsx("h2",{children:i.name}),e.jsxs(ae,{children:[e.jsxs("div",{children:["Rating:"," ",i.avgRating?i.avgRating.toFixed(1):"No ratings","⭐ (",i.numReviews," reviews)"]}),e.jsxs("div",{children:["Stock: ",i.stock]})]}),e.jsx("p",{className:"description",children:i.description}),e.jsxs(ie,{children:[e.jsxs("p",{className:"price",children:["$",i.price.toFixed(2)]}),e.jsx(ne,{whileTap:{scale:.95},disabled:i.stock===0,onClick:s,children:i.stock===0?"Out of Stock":"Add to Cart"})]}),e.jsx(Z,{productId:i._id,currentUserId:p?.id,reviews:i.reviews})]})]})})}export{ce as default};

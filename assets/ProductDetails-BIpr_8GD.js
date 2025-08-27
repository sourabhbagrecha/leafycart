import{r as d,M as _,j as e,i as I,e as T,P as W,f as H,g as U,h as G,u as N,a as Q,c as S,d as s,m as k,k as O,l as V,b as X}from"./index-BVgEscoc.js";import{P as M}from"./PageWrapper-pcXjDeZw.js";class J extends d.Component{getSnapshotBeforeUpdate(l){const o=this.props.childRef.current;if(o&&l.isPresent&&!this.props.isPresent){const u=o.offsetParent,r=I(u)&&u.offsetWidth||0,a=this.props.sizeRef.current;a.height=o.offsetHeight||0,a.width=o.offsetWidth||0,a.top=o.offsetTop,a.left=o.offsetLeft,a.right=r-a.width-a.left}return null}componentDidUpdate(){}render(){return this.props.children}}function Y({children:n,isPresent:l,anchorX:o,root:u}){const r=d.useId(),a=d.useRef(null),f=d.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:p}=d.useContext(_);return d.useInsertionEffect(()=>{const{width:g,height:i,top:v,left:c,right:m}=f.current;if(l||!a.current||!g||!i)return;const h=o==="left"?`left: ${c}`:`right: ${m}`;a.current.dataset.motionPopId=r;const x=document.createElement("style");p&&(x.nonce=p);const b=u??document.head;return b.appendChild(x),x.sheet&&x.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${g}px !important;
            height: ${i}px !important;
            ${h}px !important;
            top: ${v}px !important;
          }
        `),()=>{b.contains(x)&&b.removeChild(x)}},[l]),e.jsx(J,{isPresent:l,childRef:a,sizeRef:f,children:d.cloneElement(n,{ref:a})})}const Z=({children:n,initial:l,isPresent:o,onExitComplete:u,custom:r,presenceAffectsLayout:a,mode:f,anchorX:p,root:g})=>{const i=T(ee),v=d.useId();let c=!0,m=d.useMemo(()=>(c=!1,{id:v,initial:l,isPresent:o,custom:r,onExitComplete:h=>{i.set(h,!0);for(const x of i.values())if(!x)return;u&&u()},register:h=>(i.set(h,!1),()=>i.delete(h))}),[o,i,u]);return a&&c&&(m={...m}),d.useMemo(()=>{i.forEach((h,x)=>i.set(x,!1))},[o]),d.useEffect(()=>{!o&&!i.size&&u&&u()},[o]),f==="popLayout"&&(n=e.jsx(Y,{isPresent:o,anchorX:p,root:g,children:n})),e.jsx(W.Provider,{value:m,children:n})};function ee(){return new Map}const P=n=>n.key||"";function A(n){const l=[];return d.Children.forEach(n,o=>{d.isValidElement(o)&&l.push(o)}),l}const te=({children:n,custom:l,initial:o=!0,onExitComplete:u,presenceAffectsLayout:r=!0,mode:a="sync",propagate:f=!1,anchorX:p="left",root:g})=>{const[i,v]=H(f),c=d.useMemo(()=>A(n),[n]),m=f&&!i?[]:c.map(P),h=d.useRef(!0),x=d.useRef(c),b=T(()=>new Map),[z,E]=d.useState(c),[j,t]=d.useState(c);U(()=>{h.current=!1,x.current=c;for(let w=0;w<j.length;w++){const y=P(j[w]);m.includes(y)?b.delete(y):b.get(y)!==!0&&b.set(y,!1)}},[j,m.length,m.join("-")]);const C=[];if(c!==z){let w=[...c];for(let y=0;y<j.length;y++){const R=j[y],$=P(R);m.includes($)||(w.splice(y,0,R),C.push(R))}return a==="wait"&&C.length&&(w=C),t(A(w)),E(c),null}const{forceRender:F}=d.useContext(G);return e.jsx(e.Fragment,{children:j.map(w=>{const y=P(w),R=f&&!i?!1:c===j||m.includes(y),$=()=>{if(b.has(y))b.set(y,!0);else return;let q=!0;b.forEach(B=>{B||(q=!1)}),q&&(F?.(),t(x.current),f&&v?.(),u&&u())};return e.jsx(Z,{isPresent:R,initial:!h.current||o?void 0:!1,custom:l,presenceAffectsLayout:r,mode:a,root:g,onExitComplete:R?void 0:$,anchorX:p,children:w},y)})})},ne=s.div`
  margin-top: 2rem;
  max-height: 600px;
  overflow-y: auto;
`,re=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #2d3748;
  }
`,ie=s(k.button)`
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
`,se=s(k.form)`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`,D=s.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
`,oe=s.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100px;
  font-size: 1rem;
`,ae=s.textarea`
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
`,de=s.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`,K=s(k.button)`
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
`,ce=s.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,le=s(k.div)`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,ue=s.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`,me=s.div`
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
`,pe=s.div`
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
`,he=s.div`
  color: #4a5568;
  line-height: 1.6;
`,fe=s.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`,L=s(k.button)`
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
`,ge=s.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #718096;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`,xe=s.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
`;function ye({productId:n,reviews:l,currentUserId:o}){const[u,r]=d.useState(!1),[a,f]=d.useState(null),[p,g]=d.useState({rating:5,comment:""}),i=N(),v=Q(),c=S({mutationFn:async t=>{const{data:C}=await i.post(`/api/review/${n}`,t);return C},onSuccess:()=>{v.invalidateQueries({queryKey:["reviews",n]}),v.invalidateQueries({queryKey:["product",n]}),r(!1),g({rating:5,comment:""})}}),m=S({mutationFn:async({reviewId:t,...C})=>{const{data:F}=await i.patch(`/api/review/${n}/${t}`,C);return F},onSuccess:()=>{v.invalidateQueries({queryKey:["reviews",n]}),v.invalidateQueries({queryKey:["product",n]}),f(null),g({rating:5,comment:""})}}),h=S({mutationFn:async t=>{const{data:C}=await i.delete(`/api/review/${n}/${t}`);return C},onSuccess:()=>{v.invalidateQueries({queryKey:["reviews",n]}),v.invalidateQueries({queryKey:["product",n]})}}),x=t=>{t.preventDefault(),a?m.mutate({reviewId:a._id,rating:p.rating,comment:p.comment}):c.mutate(p)},b=t=>{f(t),g({rating:t.rating,comment:t.comment}),r(!0)},z=()=>{f(null),g({rating:5,comment:""}),r(!1)},E=t=>{window.confirm("Are you sure you want to delete this review?")&&h.mutate(t)},j=t=>"★".repeat(t)+"☆".repeat(5-t);return e.jsxs(ne,{children:[e.jsxs(re,{children:[e.jsxs("h3",{children:["Reviews (",l.length||0,")"]}),e.jsx(ie,{whileTap:{scale:.95},onClick:()=>r(!u),disabled:c.isPending,children:u?"Cancel":"Write Review"})]}),e.jsx(te,{children:u&&e.jsxs(se,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},onSubmit:x,children:[e.jsxs(D,{children:[e.jsx("label",{htmlFor:"rating",children:"Rating"}),e.jsx(oe,{id:"rating",value:p.rating,onChange:t=>g({...p,rating:parseInt(t.target.value)}),children:[5,4,3,2,1].map(t=>e.jsxs("option",{value:t,children:[t," Star",t!==1?"s":""]},t))})]}),e.jsxs(D,{children:[e.jsx("label",{htmlFor:"comment",children:"Review"}),e.jsx(ae,{id:"comment",placeholder:"Share your experience with this product...",value:p.comment,onChange:t=>g({...p,comment:t.target.value}),required:!0,minLength:10})]}),e.jsxs(de,{children:[e.jsx(K,{type:"button",onClick:z,disabled:c.isPending||m.isPending,children:"Cancel"}),e.jsx(K,{type:"submit",variant:"primary",disabled:c.isPending||m.isPending||!p.comment.trim(),children:a?"Update Review":"Submit Review"})]})]})}),(c.error||m.error||h.error)&&e.jsxs(xe,{children:["Error:"," ",c.error?.response?.data?.message||m.error?.response?.data?.message||h.error?.response?.data?.message||"Something went wrong"]}),l.length?e.jsx(ce,{children:l.map(t=>e.jsxs(le,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e.jsxs(ue,{children:[e.jsxs(me,{children:[e.jsx("h4",{children:t.userName}),e.jsx("div",{className:"date",children:new Date(t.createdAt).toLocaleDateString()})]}),e.jsxs(pe,{children:[e.jsx("span",{className:"stars",children:j(t.rating)}),e.jsxs("span",{className:"rating-text",children:["(",t.rating,"/5)"]})]})]}),e.jsx(he,{children:t.comment}),o===t.userId&&e.jsxs(fe,{children:[e.jsx(L,{whileTap:{scale:.95},onClick:()=>b(t),disabled:m.isPending||h.isPending,children:"Edit"}),e.jsx(L,{className:"delete",whileTap:{scale:.95},onClick:()=>E(t._id),disabled:m.isPending||h.isPending,children:"Delete"})]})]},t._id))}):e.jsx(ge,{children:e.jsx("p",{children:"No reviews yet. Be the first to review this product!"})})]})}const ve=s.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,be=s.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,we=s.div`
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
`,je=s.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`,Ce=s(k.button)`
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
`,Re=s.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;function Se(){const{id:n}=O(),l=N(),o=Q(),{user:u}=V(),{data:r,error:a,isLoading:f}=X({queryKey:["product",n],queryFn:async()=>{const{data:i}=await l.get(`/api/product/${n}`);return i}}),p=S({mutationKey:["cart"],mutationFn:async i=>(await l.post("/api/cart",{product:{_id:i._id,name:i.name,price:i.price,image:i.images[0]},quantity:1})).data,onSuccess:()=>{o.invalidateQueries({queryKey:["cart"]})}}),g=i=>{i.preventDefault(),p.mutate(r)};return f?e.jsx(M,{title:"Loading...",children:e.jsx("p",{children:"Loading product details..."})}):!r||a?e.jsx(M,{title:"Product Not Found",children:e.jsx("p",{children:"Sorry, we couldn't find the product you're looking for."})}):e.jsx(M,{title:r.name,children:e.jsxs(ve,{children:[e.jsx(be,{children:e.jsx("img",{src:r.images[0],alt:r.name})}),e.jsxs(we,{children:[e.jsx("h2",{children:r.name}),e.jsxs(Re,{children:[e.jsxs("div",{children:["Rating:"," ",r.avgRating?r.avgRating.toFixed(1):"No ratings","⭐ (",r.numReviews," reviews)"]}),e.jsxs("div",{children:["Stock: ",r.stock]})]}),e.jsx("p",{className:"description",children:r.description}),e.jsxs(je,{children:[e.jsxs("p",{className:"price",children:["$",r.price.toFixed(2)]}),e.jsx(Ce,{whileTap:{scale:.95},disabled:r.stock===0,onClick:g,children:r.stock===0?"Out of Stock":"Add to Cart"})]}),e.jsx(ye,{productId:r._id,currentUserId:u?.id,reviews:r.reviews})]})]})})}export{Se as default};

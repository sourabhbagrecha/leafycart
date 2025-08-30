import{r as j,u as y,a as v,b as w,c as b,j as r,d as i,m as k,L as C}from"./index-RQbKfA1K.js";const S=i.div`
  max-width: 1200px;
  margin: 0 auto;
`,F=i.section`
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`,R=i.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`,q=i.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`,z=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`,L=i(k.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 470px; /* Increased minimum height for rating */

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    flex-shrink: 0; /* Prevent image from shrinking */
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  p {
    color: #666;
    margin: 0.5rem 0;
  }

  p:not(.price) {
    flex-grow: 1; /* Make description take up remaining space */
  }

  .price {
    font-weight: bold;
    color: #2c5282;
    margin: 1rem 0 0;
  }
`,o=i.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;

  .stars {
    color: #f6ad55;
    font-size: 1rem;
  }

  .rating-text {
    color: #4a5568;
  }

  .no-reviews {
    color: #718096;
    font-style: italic;
  }
`,N=i.button`
  width: 100%;
  padding: 0.75rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a4365;
  }
`,H=i(C)`
  text-decoration: none;
  color: inherit;
  display: block;
`,D=()=>{const[c,d]=j.useState(""),n=y(),l=v(),{data:s,isLoading:m,error:p}=w({queryKey:["products"],queryFn:async()=>{const{data:e,status:t}=await n.get("/api/product");if(t!==200)throw new Error("Failed to fetch");return e}}),x=b({mutationKey:["cart"],mutationFn:async e=>(await n.post("/api/cart",{product:{_id:e._id,name:e.name,price:e.price,image:e.images[0]},quantity:1})).data,onSuccess:()=>{l.invalidateQueries({queryKey:["cart"]})}}),u=(e,t)=>{e.preventDefault(),x.mutate(t)},h=e=>{const t=Math.floor(e),a=e%1!==0,f=5-t-(a?1:0);return r.jsxs(r.Fragment,{children:["★".repeat(t),a?"☆":"","☆".repeat(f)]})},g=r.jsx(z,{children:s?.products?.map(e=>r.jsx(H,{to:`/product/${e._id}`,children:r.jsxs(L,{whileHover:{y:-5},transition:{duration:.2},children:[r.jsx("img",{src:e?.images[0],alt:e.name}),r.jsxs("div",{className:"content",children:[r.jsx("h3",{children:e.name}),e.numReviews>0?r.jsxs(o,{children:[r.jsx("span",{className:"stars",children:h(e.avgRating)}),r.jsxs("span",{className:"rating-text",children:[e.avgRating.toFixed(1)," (",e.numReviews," review",e.numReviews!==1?"s":"",")"]})]}):r.jsx(o,{children:r.jsx("span",{className:"no-reviews",children:"No reviews yet"})}),r.jsx("p",{children:e.description}),r.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]})]}),r.jsx(N,{onClick:t=>u(t,e),children:"Add to Cart"})]})},e._id))});return r.jsxs(S,{children:[r.jsxs(F,{children:[r.jsx("h1",{children:"Welcome to LeafyCart"}),r.jsx("p",{children:"Discover our curated collection of modern essentials"})]}),r.jsx(R,{children:r.jsx(q,{type:"text",placeholder:"Search products...",value:c,onChange:e=>d(e.target.value)})}),r.jsxs("section",{children:[m&&r.jsx("p",{children:"Loading products..."}),p&&r.jsx("p",{children:"Error loading products..."}),s?.products&&g]})]})};export{D as default};

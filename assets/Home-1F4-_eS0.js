import{r as x,u as h,a as g,b as f,j as r,d as t,L as y}from"./index-uOv3fffV.js";import{u as b}from"./useMutation-DUhU1EvS.js";import{m as j}from"./proxy-DQ9R4Xlz.js";const v=t.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,w=t.section`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`,k=t.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`,C=t.input`
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
`,q=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`,L=t(j.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 450px; /* Set minimum height */

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
`,S=t.button`
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
`,F=t(y)`
  text-decoration: none;
  color: inherit;
  display: block;
`,H=()=>{const[a,s]=x.useState(""),o=h(),c=g(),{data:n,isLoading:d,error:m}=f({queryKey:["products"],queryFn:async()=>{const{data:e,status:i}=await o.get("/api/products");if(i!==200)throw new Error("Failed to fetch");return e}}),l=b({mutationKey:["cart"],mutationFn:async e=>(await o.post("/api/cart",{product:{_id:e._id,name:e.name,price:e.price,image:e.images[0]},quantity:1})).data,onSuccess:()=>{c.invalidateQueries({queryKey:["cart"]})}}),p=(e,i)=>{e.preventDefault(),l.mutate(i)},u=r.jsx(q,{children:n?.products?.map(e=>r.jsx(F,{to:`/product/${e._id}`,children:r.jsxs(L,{whileHover:{y:-5},transition:{duration:.2},children:[r.jsx("img",{src:e?.images[0],alt:e.name}),r.jsxs("div",{className:"content",children:[r.jsx("h3",{children:e.name}),r.jsx("p",{children:e.description}),r.jsxs("p",{className:"price",children:["$",e.price.toFixed(2)]})]}),r.jsx(S,{onClick:i=>p(i,e),children:"Add to Cart"})]})},e._id))});return r.jsxs(v,{children:[r.jsxs(w,{children:[r.jsx("h1",{children:"Welcome to LeafyCart"}),r.jsx("p",{children:"Discover our curated collection of modern essentials"})]}),r.jsx(k,{children:r.jsx(C,{type:"text",placeholder:"Search products...",value:a,onChange:e=>s(e.target.value)})}),r.jsxs("section",{children:[d&&r.jsx("p",{children:"Loading products..."}),m&&r.jsx("p",{children:"Error loading products..."}),n?.products&&u]})]})};export{H as default};

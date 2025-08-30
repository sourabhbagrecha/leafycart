import{u as H,a as U,r as u,c as k,j as e,d as o,m as p}from"./index-RQbKfA1K.js";const $=o.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`,G=o.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`,C=o(p.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  padding: 2rem;
  margin-bottom: 2rem;
`,E=o.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`,B=o.form`
  display: grid;
  gap: 1.5rem;
`,a=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,c=o.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
`,m=o.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`,I=o.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`,Q=o.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`,M=o(p.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  justify-self: start;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,T=o(p.div)`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #155724;
  font-weight: 500;
`,A=o(p.div)`
  background: #f8d7da;
  border: 1px solid #f1aeb5;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #721c24;
  font-weight: 500;
`;function N(){const v=H(),q=U(),[t,g]=u.useState({name:"",description:"",price:0,category:"",stock:0,images:[""]}),[w,h]=u.useState(""),[z,x]=u.useState(""),[P,b]=u.useState(""),[F,y]=u.useState(""),f=k({mutationFn:async r=>(await v.post("/api/admin/products",r)).data,onSuccess:()=>{h("Product added successfully!"),x(""),g({name:"",description:"",price:0,category:"",stock:0,images:[""]}),q.invalidateQueries({queryKey:["products"]}),setTimeout(()=>h(""),3e3)},onError:r=>{x(r.response?.data?.message||"Failed to add product"),h("")}}),d=k({mutationFn:async()=>(await v.post("/api/product/vectorize")).data,onSuccess:r=>{const{processed:i,total:s,duration:l,errors:j}=r;let S=`Vectorization completed! Processed ${i}/${s} products in ${(l/1e3).toFixed(2)}s.`;j&&j.length>0&&(S+=` ${j.length} errors occurred.`),b(S),y(""),setTimeout(()=>b(""),1e4)},onError:r=>{y(r.response?.data?.message||"Failed to vectorize products"),b(""),setTimeout(()=>y(""),1e4)}}),n=r=>{const{name:i,value:s}=r.target;g(i==="imageUrl"?l=>({...l,images:[s]}):l=>({...l,[i]:i==="price"||i==="stock"?parseFloat(s)||0:s}))},D=r=>{if(r.preventDefault(),!t.name||!t.description||!t.category||t.price<=0){x("Please fill in all required fields with valid values");return}const i={...t,images:t.images.filter(s=>s.trim()!=="")};f.mutate(i)},V=()=>{d.mutate()};return e.jsxs($,{children:[e.jsx(G,{children:"Admin Dashboard"}),e.jsxs(C,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx(E,{children:"Add New Product"}),w&&e.jsx(T,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:w}),z&&e.jsx(A,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:z}),e.jsxs(B,{onSubmit:D,children:[e.jsxs(a,{children:[e.jsx(c,{htmlFor:"name",children:"Product Name *"}),e.jsx(m,{type:"text",id:"name",name:"name",value:t.name,onChange:n,placeholder:"Enter product name",required:!0})]}),e.jsxs(a,{children:[e.jsx(c,{htmlFor:"description",children:"Description *"}),e.jsx(I,{id:"description",name:"description",value:t.description,onChange:n,placeholder:"Enter product description",required:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"},children:[e.jsxs(a,{children:[e.jsx(c,{htmlFor:"price",children:"Price ($) *"}),e.jsx(m,{type:"number",id:"price",name:"price",value:t.price,onChange:n,placeholder:"0.00",step:"0.01",min:"0",required:!0})]}),e.jsxs(a,{children:[e.jsx(c,{htmlFor:"stock",children:"Stock Quantity"}),e.jsx(m,{type:"number",id:"stock",name:"stock",value:t.stock,onChange:n,placeholder:"0",min:"0"})]})]}),e.jsxs(a,{children:[e.jsx(c,{htmlFor:"category",children:"Category *"}),e.jsxs(Q,{id:"category",name:"category",value:t.category,onChange:n,required:!0,children:[e.jsx("option",{value:"",children:"Select a category"}),e.jsx("option",{value:"electronics",children:"Electronics"}),e.jsx("option",{value:"clothing",children:"Clothing"}),e.jsx("option",{value:"home",children:"Home & Garden"}),e.jsx("option",{value:"books",children:"Books"}),e.jsx("option",{value:"sports",children:"Sports & Outdoors"}),e.jsx("option",{value:"beauty",children:"Beauty & Health"}),e.jsx("option",{value:"toys",children:"Toys & Games"}),e.jsx("option",{value:"automotive",children:"Automotive"})]})]}),e.jsxs(a,{children:[e.jsx(c,{htmlFor:"imageUrl",children:"Image URL"}),e.jsx(m,{type:"url",id:"imageUrl",name:"imageUrl",value:t.images[0]||"",onChange:n,placeholder:"https://example.com/image.jpg"})]}),e.jsx(M,{type:"submit",disabled:f.isPending,whileHover:{scale:1.02},whileTap:{scale:.98},children:f.isPending?"Adding Product...":"Add Product"})]})]}),e.jsxs(C,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:[e.jsx(E,{children:"Product Vectorization"}),P&&e.jsx(T,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:P}),F&&e.jsx(A,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:F}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("p",{style:{color:"#4a5568",fontSize:"0.9rem",lineHeight:"1.5"},children:"Generate vector embeddings for all products to enable semantic search and recommendations. This process will analyze product names, descriptions, and categories to create searchable embeddings."}),e.jsx(M,{type:"button",onClick:V,disabled:d.isPending,whileHover:{scale:d.isPending?1:1.02},whileTap:{scale:d.isPending?1:.98},children:d.isPending?"Vectorizing Products...":"Vectorize All Products"})]})]})]})}export{N as default};

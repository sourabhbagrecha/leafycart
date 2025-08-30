import{j as e,d as r,m as s,L as f,u as b,r as p,c as w}from"./index-RQbKfA1K.js";import{A as y}from"./index-LcUGTJ4n.js";const j=r(s.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=r.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f7fafc;
`,S=r.div`
  padding: 1.5rem;
`,k=r.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,z=r.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,P=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`,R=r.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c5282;
`,C=r.span`
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
`,E=r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,F=r.div`
  color: #fbbf24;
`,Q=r(f)`
  display: block;
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #2a4d82, #2c7db8);
    transform: translateY(-1px);
  }
`,q=r.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(44, 82, 130, 0.9);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
`,A=r.div`
  position: relative;
`;function D({product:i}){const a=c=>{const o=[],l=Math.floor(c),d=c%1!==0;for(let m=0;m<l;m++)o.push("★");for(d&&o.push("☆");o.length<5;)o.push("☆");return o.join("")};return e.jsx(A,{children:e.jsxs(j,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{scale:1.02},transition:{duration:.3},children:[i.score&&e.jsxs(q,{children:[(i.score*100).toFixed(0),"% match"]}),e.jsx(v,{src:i.images[0]||"/api/placeholder/300/200",alt:i.name}),e.jsxs(S,{children:[e.jsx(k,{children:i.name}),e.jsx(z,{children:i.description}),e.jsxs(P,{children:[e.jsxs(R,{children:["$",i.price.toFixed(2)]}),e.jsx(C,{children:i.category})]}),i.avgRating>0&&e.jsxs(E,{children:[e.jsx(F,{children:a(i.avgRating)}),e.jsxs("span",{children:[i.avgRating.toFixed(1)," (",i.numReviews,")"]})]}),e.jsx(Q,{to:`/product/${i._id}`,children:"View Details"})]})]})})}const T=r(s.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,H=r.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  padding: 2rem;
  margin-bottom: 2rem;
`,I=r.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
`,M=r.p`
  color: #4a5568;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`,B=r.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,N=r.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`,$=r(s.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,L=r(s.div)`
  margin-top: 2rem;
`,V=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`,Y=r.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
`,_=r.span`
  color: #4a5568;
  font-size: 0.9rem;
`,G=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`,O=r(s.div)`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 1rem;
  color: #c53030;
  font-weight: 500;
  text-align: center;
`,W=r(s.div)`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #4a5568;
`,J=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`,K=r.button`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
`;function U(){const i=b(),[a,c]=p.useState(""),[o,l]=p.useState([]),[d,m]=p.useState(""),n=w({mutationFn:async t=>(await i.post("/api/product/suggest",{query:t,limit:12})).data,onSuccess:t=>{l(t.suggestions),m(t.query)},onError:t=>{console.error("Search failed:",t),l([])}}),u=t=>{t.preventDefault(),a.trim()&&n.mutate(a.trim())},g=t=>{c(t),n.mutate(t)},x=["red purse","wireless headphones","cozy sweater","smartphone under $500","running shoes","coffee maker","laptop for gaming"];return e.jsxs(T,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsxs(H,{children:[e.jsx(I,{children:"AI Product Search"}),e.jsx(M,{children:'Find products using natural language. Try queries like "red purse", "wireless headphones for exercise", or "affordable laptop for students". Our AI understands context and finds the best matches.'}),e.jsxs(B,{onSubmit:u,children:[e.jsx(N,{type:"text",value:a,onChange:t=>c(t.target.value),placeholder:"e.g., 'red purse', 'wireless headphones', 'cozy sweater'..."}),e.jsx($,{type:"submit",disabled:n.isPending||!a.trim(),whileHover:{scale:n.isPending?1:1.02},whileTap:{scale:n.isPending?1:.98},children:n.isPending?"Searching...":"Search"})]}),e.jsx(J,{children:x.map((t,h)=>e.jsx(K,{onClick:()=>g(t),disabled:n.isPending,children:t},h))})]}),e.jsxs(y,{children:[n.error&&e.jsx(O,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},children:"Search failed. Please try again with a different query."}),!n.isPending&&o.length===0&&d&&e.jsxs(W,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},children:[e.jsxs("h3",{children:['No results found for "',d,'"']}),e.jsx("p",{children:"Try adjusting your search terms or browse our categories."})]}),o.length>0&&e.jsxs(L,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsxs(V,{children:[e.jsxs(Y,{children:['Search Results for "',d,'"']}),e.jsxs(_,{children:[o.length," products found"]})]}),e.jsx(G,{children:o.map(t=>e.jsx(D,{product:t},t._id))})]})]})]})}function ee(){return e.jsx(U,{})}export{ee as default};

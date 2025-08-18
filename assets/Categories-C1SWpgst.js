import{r,j as e,L as a,d as i}from"./index-CcnV_Zkb.js";import{P as n}from"./PageWrapper--Gv4gYqW.js";import{d}from"./db-CpqW60bI.js";import{m}from"./proxy-B5Y9BLt2.js";const c=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`,l=i(m.div)`
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,p=i.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;function u(){const[o,s]=r.useState([]);return r.useEffect(()=>{s(d.categories)},[]),e.jsx(n,{title:"Browse Categories",children:e.jsx(c,{children:o.map(t=>e.jsx(a,{to:`/products?category=${t.name.toLowerCase()}`,style:{textDecoration:"none"},children:e.jsxs(l,{whileHover:{scale:1.03},transition:{duration:.2},children:[e.jsx("img",{src:t.image,alt:t.name}),e.jsxs(p,{children:[e.jsx("h3",{children:t.name}),e.jsx("p",{children:t.description})]})]})},t.id))})})}export{u as default};

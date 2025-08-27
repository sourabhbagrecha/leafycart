import{n as q,r as h,u as P,a as M,b as Y,c as I,j as e,d as o,m as v}from"./index-BVgEscoc.js";import{P as u}from"./PageWrapper-pcXjDeZw.js";const L=o.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,z=o(v.button)`
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #2d3748;
  }
`,A=o.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,T=o.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;

  h3 {
    margin: 0 0 1rem;
  }
`,n=o.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #2c5282;
      box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
    }
  }
`,p=o.h3`
  margin: 2rem 0 1rem;
  color: #2d3748;
  font-size: 1.2rem;
`,U=o.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #4a5568;
`,$=o.div`
  border-top: 2px solid #e2e8f0;
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
`,O=o(v.button)`
  width: 100%;
  padding: 1rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`,s=o.div`
  color: #e53e3e;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;function Q(){const N=q(),[x,y]=h.useState(!1),[t,g]=h.useState({email:"",firstName:"",lastName:"",street:"",city:"",country:"",postalCode:"",cardNumber:"",cardExpiry:"",cardCvc:""}),[a,j]=h.useState({}),b=P(),w=M(),{data:l,isLoading:F,error:C}=Y({queryKey:["cart"],queryFn:async()=>{const{data:r,status:d}=await b.get("/api/cart");if(d!==200)throw new Error("Failed to fetch");return r}}),E=I({mutationFn:async r=>{const d={shippingAddress:{email:r.email,firstName:r.firstName,lastName:r.lastName,street:r.street,city:r.city,country:r.country,postalCode:r.postalCode},paymentInfo:{cardNumber:r.cardNumber,cardExpiry:r.cardExpiry,cardCvc:r.cardCvc},items:l?.items,total:l?.total},{data:m,status:c}=await b.post("/api/order",d);if(c!==201)throw new Error("Failed to create order");return m},onSuccess:()=>{w.invalidateQueries({queryKey:["cart"]})}}),i=r=>{const{name:d,value:m}=r.target;g(c=>({...c,[d]:m})),a[d]&&j(c=>({...c,[d]:void 0}))},k=()=>{const r={};return t.email.includes("@")||(r.email="Please enter a valid email street"),t.firstName.length<2&&(r.firstName="First name is required"),t.lastName.length<2&&(r.lastName="Last name is required"),t.street.length<5&&(r.street="Please enter a valid address"),t.city.length<2&&(r.city="City is required"),t.country.length<2&&(r.country="Country is required"),t.postalCode.length<3&&(r.postalCode="Please enter a valid postal code"),t.cardNumber.replace(/\s/g,"").length!==16&&(r.cardNumber="Please enter a valid 16-digit card number"),t.cardExpiry.match(/^\d{2}\/\d{2}$/)||(r.cardExpiry="Please enter expiry in MM/YY format"),t.cardCvc.length!==3&&(r.cardCvc="Please enter a valid CVC"),j(r),Object.keys(r).length===0},f=async r=>{if(r.preventDefault(),!!k()){y(!0);try{E.mutate(t,{onSuccess:()=>{N("/")}})}catch(d){console.error("Error creating order:",d)}finally{y(!1)}}},S=()=>{g({email:"john.doe@example.com",firstName:"John",lastName:"Doe",street:"123 Main Street",city:"New York",country:"US",postalCode:"10001",cardNumber:"4242424242424242",cardExpiry:"12/25",cardCvc:"123"})};return F?e.jsx(u,{title:"Checkout",children:e.jsx("p",{children:"Loading cart..."})}):C?e.jsx(u,{title:"Checkout",children:e.jsxs("p",{children:["Error loading cart: ",C.message]})}):l?.items.length===0?e.jsx(u,{title:"Checkout",children:e.jsx("p",{children:"Your cart is empty. Please add some items before checking out."})}):e.jsx(u,{title:"Checkout",children:e.jsxs(L,{children:[e.jsxs(A,{onSubmit:f,children:[e.jsx(z,{type:"button",onClick:S,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Fill with Mock Data"}),e.jsx(p,{children:"Contact Information"}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:t.email,onChange:i,required:!0}),a.email&&e.jsx(s,{children:a.email})]}),e.jsx(p,{children:"Shipping Information"}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"firstName",children:"First Name"}),e.jsx("input",{type:"text",id:"firstName",name:"firstName",value:t.firstName,onChange:i,required:!0}),a.firstName&&e.jsx(s,{children:a.firstName})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"lastName",children:"Last Name"}),e.jsx("input",{type:"text",id:"lastName",name:"lastName",value:t.lastName,onChange:i,required:!0}),a.lastName&&e.jsx(s,{children:a.lastName})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"address",children:"Street"}),e.jsx("input",{type:"text",id:"street",name:"street",value:t.street,onChange:i,required:!0}),a.street&&e.jsx(s,{children:a.street})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"city",children:"City"}),e.jsx("input",{type:"text",id:"city",name:"city",value:t.city,onChange:i,required:!0}),a.city&&e.jsx(s,{children:a.city})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"country",children:"Country"}),e.jsxs("select",{id:"country",name:"country",value:t.country,onChange:i,required:!0,children:[e.jsx("option",{value:"",children:"Select a country"}),e.jsx("option",{value:"US",children:"United States"}),e.jsx("option",{value:"CA",children:"Canada"}),e.jsx("option",{value:"GB",children:"United Kingdom"}),e.jsx("option",{value:"AU",children:"Australia"})]}),a.country&&e.jsx(s,{children:a.country})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"postalCode",children:"Postal Code"}),e.jsx("input",{type:"text",id:"postalCode",name:"postalCode",value:t.postalCode,onChange:i,required:!0}),a.postalCode&&e.jsx(s,{children:a.postalCode})]}),e.jsx(p,{children:"Payment Information"}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"cardNumber",children:"Card Number"}),e.jsx("input",{type:"text",id:"cardNumber",name:"cardNumber",value:t.cardNumber,onChange:i,placeholder:"1234 5678 9012 3456",maxLength:19,required:!0}),a.cardNumber&&e.jsx(s,{children:a.cardNumber})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"cardExpiry",children:"Expiry (MM/YY)"}),e.jsx("input",{type:"text",id:"cardExpiry",name:"cardExpiry",value:t.cardExpiry,onChange:i,placeholder:"MM/YY",maxLength:5,required:!0}),a.cardExpiry&&e.jsx(s,{children:a.cardExpiry})]}),e.jsxs(n,{children:[e.jsx("label",{htmlFor:"cardCvc",children:"CVC"}),e.jsx("input",{type:"text",id:"cardCvc",name:"cardCvc",value:t.cardCvc,onChange:i,maxLength:3,required:!0}),a.cardCvc&&e.jsx(s,{children:a.cardCvc})]})]}),e.jsxs(T,{children:[e.jsx("h3",{children:"Order Summary"}),l?.items.map(r=>e.jsxs(U,{children:[e.jsxs("span",{children:[r.quantity,"x ",r.product.name]}),e.jsxs("span",{children:["$",(r.quantity*r.product.price).toFixed(2)]})]},r.product._id)),e.jsxs($,{children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["$",l?.total.toFixed(2)]})]}),e.jsx(O,{type:"submit",disabled:x,whileTap:{scale:.95},onClick:f,children:x?"Processing...":`Pay $${l?.total.toFixed(2)}`})]})]})})}export{Q as default};

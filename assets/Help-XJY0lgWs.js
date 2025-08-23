import{j as t,d as o}from"./index-BLa0kxBv.js";import{P as i}from"./PageWrapper-D3vWYtXS.js";import{m as a}from"./proxy-Bg37ztZW.js";const n=o.div`
  max-width: 800px;
  margin: 0 auto;
`,s=o(a.div)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 1rem;
    color: #2d3748;
  }

  p {
    margin: 0;
    color: #4a5568;
    line-height: 1.6;
  }
`,c=o.section`
  margin-top: 3rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
  }

  a {
    color: #2c5282;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`,d=[{question:"How do I place an order?",answer:"Browse our products, add items to your cart, and proceed to checkout. Follow the simple steps to enter your shipping and payment information."},{question:"What payment methods do you accept?",answer:"We accept all major credit cards, PayPal, and other digital payment methods. Your payment information is always secure and encrypted."},{question:"How can I track my order?",answer:"Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard."},{question:"What is your return policy?",answer:"We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Contact our support team to initiate a return."},{question:"How do I contact customer support?",answer:"You can reach our customer support team via email at support@LeafyCart.com or through our contact form. We typically respond within 24 hours."}],p={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1}}},m={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5}}};function y(){return t.jsx(i,{title:"Help & FAQ",children:t.jsxs(n,{as:a.div,variants:p,initial:"hidden",animate:"visible",children:[d.map((r,e)=>t.jsxs(s,{variants:m,children:[t.jsx("h3",{children:r.question}),t.jsx("p",{children:r.answer})]},e)),t.jsxs(c,{children:[t.jsx("h2",{children:"Still need help?"}),t.jsxs("p",{children:["Our customer support team is available Monday through Friday, 9am-5pm EST.",t.jsx("br",{}),"Email us at"," "]})]})]})})}export{y as default};

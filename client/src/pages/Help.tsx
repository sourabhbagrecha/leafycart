import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";

const FaqContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled(motion.div)`
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
`;

const ContactSection = styled.section`
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
`;

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. Follow the simple steps to enter your shipping and payment information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and other digital payment methods. Your payment information is always secure and encrypted.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Contact our support team to initiate a return.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@LeafyCart.com or through our contact form. We typically respond within 24 hours.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Help() {
  return (
    <PageWrapper title="Help & FAQ">
      <FaqContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqs.map((faq, index) => (
          <FaqItem key={index} variants={itemVariants}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </FaqItem>
        ))}

        <ContactSection>
          <h2>Still need help?</h2>
          <p>
            Our customer support team is available Monday through Friday,
            9am-5pm EST.
            <br />
            Email us at{" "}
            <a href="mailto:support@ecoshop.com">support@ecoshop.com</a>
          </p>
        </ContactSection>
      </FaqContainer>
    </PageWrapper>
  );
}

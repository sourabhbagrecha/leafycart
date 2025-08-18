import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { useCart } from "../hooks/useCart";

const CartGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ItemInfo = styled.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

const ItemControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #e53e3e;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c53030;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #f7fafc;
    }
  }
`;

const Total = styled.div`
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }
`;

const CheckoutButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a4365;
  }
`;

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity: newQuantity },
    });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <PageWrapper title="Shopping Cart">
      <CartGrid>
        {state.items.map(({ product, quantity }) => (
          <CartItem
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={product.images[0]} alt={product.name} />
            <ItemInfo>
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </ItemInfo>
            <ItemControls>
              <Quantity>
                <button
                  onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                >
                  +
                </button>
              </Quantity>
              <Button onClick={() => handleRemoveItem(product.id)}>
                Remove
              </Button>
            </ItemControls>
          </CartItem>
        ))}
      </CartGrid>
      {state.items.length > 0 ? (
        <Total>
          <h3>Total: ${state.total.toFixed(2)}</h3>
          <CheckoutButton
            onClick={handleCheckout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Checkout
          </CheckoutButton>
        </Total>
      ) : (
        <p>Your cart is empty</p>
      )}
    </PageWrapper>
  );
}

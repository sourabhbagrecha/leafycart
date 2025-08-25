import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Cart, CartItem, CartProductInfo } from "../types";
import { useAxios } from "../hooks/useAxios";

const CartGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const CartItem = styled.div`
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
  const axiosClient = useAxios();

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeProductMutation.mutate(productId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const { data, isLoading, error, refetch } = useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data, status } = await axiosClient.get("/api/cart");
      if (status !== 200) throw new Error("Failed to fetch");
      return data;
    },
  });

  const removeProductMutation = useMutation<unknown, Error, string>({
    mutationKey: ["cart", "removeItem"],
    mutationFn: async (productId: string) => {
      await axiosClient.delete(`/api/cart/item/${productId}`);
      refetch();
      return;
    },
  });

  const CartItemDisplay = ({
    product,
    quantity,
  }: {
    product: CartProductInfo;
    quantity: number;
  }) => {
    const updateQuantityMutation = useMutation<
      unknown,
      Error,
      { productId: string; quantity: number }
    >({
      mutationKey: ["cart", "updateQuantity"],
      mutationFn: async ({ productId, quantity }) => {
        const response = await axiosClient.patch(
          `/api/cart/item/${productId}`,
          { quantity }
        );
        refetch();
        return response.data;
      },
    });

    const handleUpdateQuantity = async (
      productId: string,
      newQuantity: number
    ) => {
      if (newQuantity < 1) return;
      try {
        await updateQuantityMutation.mutate({
          productId,
          quantity: newQuantity,
        });
      } catch (error) {
        console.error("Error removing item:", error);
      }
    };
    return (
      <CartItem key={product._id}>
        <img src={product.image} alt={product.name} />
        <ItemInfo>
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
        </ItemInfo>
        <ItemControls>
          <Quantity>
            <button
              onClick={() => {
                if (quantity === 1) {
                  handleRemoveItem(product._id); // remove item from cart
                } else {
                  handleUpdateQuantity(product._id, quantity - 1); // just decrease qty
                }
              }}
              style={{ cursor: "pointer" }}
            >
              -
            </button>
            <span>{updateQuantityMutation.isPending ? "↻" : quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
            >
              +
            </button>
          </Quantity>
          <Button onClick={() => handleRemoveItem(product._id)}>Remove</Button>
        </ItemControls>
      </CartItem>
    );
  };

  const CartDisplay = ({ cart }: { cart: Cart }) => (
    <PageWrapper title="Shopping Cart">
      <CartGrid>
        {cart?.items?.map(({ product, quantity }) => (
          <CartItemDisplay
            key={product._id}
            product={product}
            quantity={quantity}
          />
        )) || <p>Your cart is empty</p>}
      </CartGrid>
      {cart?.items?.length ?? 0 > 0 ? (
        <Total>
          <h3>Total: ${cart?.total?.toFixed(2)}</h3>
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

  return (
    <>
      {data && <CartDisplay cart={data || ({} as Cart)} />}
      {isLoading && <p>Loading cart...</p>}
      {error && <p>Error loading cart</p>}
    </>
  );
}

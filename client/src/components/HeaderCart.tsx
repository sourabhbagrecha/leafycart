import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import type { Cart } from "../types";

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .item-count {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #2c5282;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

const HeaderCart = () => {
  const axiosClient = useAxios();

  const { data, isLoading, error } = useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data, status } = await axiosClient.get("/api/cart");
      if (status !== 200) throw new Error("Failed to fetch");
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading cart</p>;

  const cartItemsCount =
    data?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartIcon>
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartItemsCount > 0 && (
        <span className="item-count">{cartItemsCount}</span>
      )}
    </CartIcon>
  );
};

export default HeaderCart;

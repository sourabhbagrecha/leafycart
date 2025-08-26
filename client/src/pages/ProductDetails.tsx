import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";
import { Reviews } from "../components/Reviews";
import type { Product } from "../types";
import { useAxios } from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ProductInfo = styled.div`
  h2 {
    margin: 0 0 1rem;
    font-size: 2rem;
  }

  .price {
    font-size: 1.5rem;
    color: #2c5282;
    margin: 1rem 0;
  }

  .description {
    color: #4a5568;
    line-height: 1.6;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const AddToCartButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const ProductStats = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #4a5568;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const axiosClient = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/api/product/${id}`);
      return data;
    },
  });

  const mutation = useMutation<{ products: Product[] }, Error, Product>({
    mutationKey: ["cart"],
    mutationFn: async (newProduct: Product) => {
      const response = await axiosClient.post("/api/cart", {
        product: {
          _id: newProduct._id,
          name: newProduct.name,
          price: newProduct.price,
          image: newProduct.images[0],
        },
        quantity: 1,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    mutation.mutate(product!);
  };

  if (isLoading) {
    return (
      <PageWrapper title="Loading...">
        <p>Loading product details...</p>
      </PageWrapper>
    );
  }

  if (!product || error) {
    return (
      <PageWrapper title="Product Not Found">
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={product.name}>
      <ProductContainer>
        <ImageContainer>
          <img src={product.images[0]} alt={product.name} />
        </ImageContainer>
        <ProductInfo>
          <h2>{product.name}</h2>
          <ProductStats>
            <div>
              Rating:{" "}
              {product.avgRating ? product.avgRating.toFixed(1) : "No ratings"}
              ⭐ ({product.numReviews} reviews)
            </div>
            <div>Stock: {product.stock}</div>
          </ProductStats>
          <p className="description">{product.description}</p>
          <AddToCartContainer>
            <p className="price">${product.price.toFixed(2)}</p>
            <AddToCartButton
              whileTap={{ scale: 0.95 }}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </AddToCartButton>
          </AddToCartContainer>

          <Reviews
            productId={product._id}
            currentUserId={user?.id}
            reviews={product.reviews}
          />
        </ProductInfo>
      </ProductContainer>
    </PageWrapper>
  );
}

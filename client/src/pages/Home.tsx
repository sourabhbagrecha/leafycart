import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 450px; /* Set minimum height */

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    flex-shrink: 0; /* Prevent image from shrinking */
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  p {
    color: #666;
    margin: 0.5rem 0;
  }

  p:not(.price) {
    flex-grow: 1; /* Make description take up remaining space */
  }

  .price {
    font-weight: bold;
    color: #2c5282;
    margin: 1rem 0 0;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a4365;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Home = () => {
  const [query, setQuery] = useState("");
  const { token } = useAuth();
  const axiosClient = useAxios();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<{ products: Product[] }, Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, status } = await axiosClient.get("/api/products");
      if (status !== 200) throw new Error("Failed to fetch");
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

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    console.log("Add to cart clicked for product:", product);
    mutation.mutate(product);
  };

  const ProductsDisplay = (
    <FeaturedGrid>
      {data?.products?.map((product) => (
        <ProductLink key={product._id} to={`/product/${product._id}`}>
          <ProductCard whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <img src={product?.images[0]} alt={product.name} />
            <div className="content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
            <AddToCartButton onClick={(e) => handleAddToCart(e, product)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        </ProductLink>
      ))}
    </FeaturedGrid>
  );

  return (
    <HomeContainer>
      <Hero>
        <h1>Welcome to LeafyCart</h1>
        <p>Discover our curated collection of modern essentials</p>
      </Hero>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchContainer>

      <section>
        {isLoading && <p>Loading products...</p>}
        {error && <p>Error loading products...</p>}
        {data?.products && ProductsDisplay}
      </section>
    </HomeContainer>
  );
};

export default Home;

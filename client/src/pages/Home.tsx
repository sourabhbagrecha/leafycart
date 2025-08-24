import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import db from "../data/db.json";

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? "#2c5282" : "white")};
  color: ${(props) => (props.disabled ? "white" : "#2d3748")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "#2a4365" : "#f7fafc")};
  }
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

const SearchResults = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchResultCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ResultInfo = styled.div`
  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }

  .price {
    color: #2c5282;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .match-score {
    font-size: 0.875rem;
    color: #718096;
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

// Simple fuzzy search implementation
function fuzzySearch(
  text: string,
  pattern: string
): { isMatch: boolean; score: number } {
  const lowercaseText = text.toLowerCase();
  const lowercasePattern = pattern.toLowerCase();

  if (lowercasePattern.length === 0) return { isMatch: false, score: 0 };
  if (lowercaseText.includes(lowercasePattern))
    return { isMatch: true, score: 1 };

  let score = 0;
  let patternIdx = 0;
  let consecutiveMatches = 0;

  for (
    let i = 0;
    i < lowercaseText.length && patternIdx < lowercasePattern.length;
    i++
  ) {
    if (lowercaseText[i] === lowercasePattern[patternIdx]) {
      score += (consecutiveMatches + 1) * 2;
      consecutiveMatches++;
      patternIdx++;
    } else {
      consecutiveMatches = 0;
    }
  }

  const isMatch = patternIdx === lowercasePattern.length;
  return {
    isMatch,
    score: isMatch
      ? score / (lowercaseText.length * lowercasePattern.length)
      : 0,
  };
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(db.products);
    const uniqueCategories = Array.from(
      new Set(db.products.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  const searchResults = useMemo(() => {
    if (!query) return [];

    return db.products
      .map((product) => {
        const nameMatch = fuzzySearch(product.name, query);
        const descMatch = fuzzySearch(product.description, query);
        const categoryMatch = fuzzySearch(product.category, query);

        const score = Math.max(
          nameMatch.score * 3, // Name matches are most important
          descMatch.score * 2, // Description matches are second
          categoryMatch.score // Category matches are third
        );

        return {
          product,
          score,
          isMatch:
            nameMatch.isMatch || descMatch.isMatch || categoryMatch.isMatch,
        };
      })
      .filter((result) => result.isMatch)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  };

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

      <AnimatePresence>
        {query && (
          <SearchResults>
            {searchResults.map(({ product, score }) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <SearchResultCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={product.images[0]} alt={product.name} />
                  <ResultInfo>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="match-score">
                      Match score: {Math.round(score * 100)}%
                    </p>
                  </ResultInfo>
                </SearchResultCard>
              </Link>
            ))}
            {query && searchResults.length === 0 && (
              <p>No products found matching "{query}"</p>
            )}
          </SearchResults>
        )}
      </AnimatePresence>

      <section>
        <FiltersContainer>
          <FilterButton
            disabled={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </FilterButton>
          {categories.map((category) => (
            <FilterButton
              key={category}
              disabled={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FiltersContainer>

        <FeaturedGrid>
          {(selectedCategory === "all"
            ? products
            : products.filter(
                (product) => product.category === selectedCategory
              )
          ).map((product) => (
            <ProductLink key={product.id} to={`/product/${product.id}`}>
              <ProductCard
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <img src={product.images[0]} alt={product.name} />
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
      </section>
    </HomeContainer>
  );
};

export default Home;

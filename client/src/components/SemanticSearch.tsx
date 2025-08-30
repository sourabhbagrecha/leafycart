import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../hooks/useAxios";
import ProductCard from "./ProductCard";

const SearchContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
`;

const SearchDescription = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SearchButton = styled(motion.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultsSection = styled(motion.div)`
  margin-top: 2rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const ResultsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
`;

const ResultsCount = styled.span`
  color: #4a5568;
  font-size: 0.9rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 1rem;
  color: #c53030;
  font-weight: 500;
  text-align: center;
`;

const NoResults = styled(motion.div)`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #4a5568;
`;

const ExampleQueries = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ExampleQuery = styled.button`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
`;

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  avgRating: number;
  numReviews: number;
  stock: number;
  score?: number;
}

interface SuggestionResponse {
  success: boolean;
  query: string;
  suggestions: Product[];
  count: number;
}

export default function SemanticSearch() {
  const axiosClient = useAxios();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (searchQuery: string): Promise<SuggestionResponse> => {
      const response = await axiosClient.post("/api/product/suggest", {
        query: searchQuery,
        limit: 12
      });
      return response.data;
    },
    onSuccess: (data) => {
      setResults(data.suggestions);
      setSearchQuery(data.query);
    },
    onError: (error) => {
      console.error("Search failed:", error);
      setResults([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchMutation.mutate(query.trim());
    }
  };

  const handleExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery);
    searchMutation.mutate(exampleQuery);
  };

  const exampleQueries = [
    "red purse",
    "wireless headphones",
    "cozy sweater",
    "smartphone under $500",
    "running shoes",
    "coffee maker",
    "laptop for gaming"
  ];

  return (
    <SearchContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchSection>
        <SearchTitle>AI Product Search</SearchTitle>
        <SearchDescription>
          Find products using natural language. Try queries like "red purse", "wireless headphones for exercise", 
          or "affordable laptop for students". Our AI understands context and finds the best matches.
        </SearchDescription>
        
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'red purse', 'wireless headphones', 'cozy sweater'..."
          />
          <SearchButton
            type="submit"
            disabled={searchMutation.isPending || !query.trim()}
            whileHover={{ scale: searchMutation.isPending ? 1 : 1.02 }}
            whileTap={{ scale: searchMutation.isPending ? 1 : 0.98 }}
          >
            {searchMutation.isPending ? "Searching..." : "Search"}
          </SearchButton>
        </SearchForm>

        <ExampleQueries>
          {exampleQueries.map((example, index) => (
            <ExampleQuery
              key={index}
              onClick={() => handleExampleQuery(example)}
              disabled={searchMutation.isPending}
            >
              {example}
            </ExampleQuery>
          ))}
        </ExampleQueries>
      </SearchSection>

      <AnimatePresence>
        {searchMutation.error && (
          <ErrorMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            Search failed. Please try again with a different query.
          </ErrorMessage>
        )}

        {!searchMutation.isPending && results.length === 0 && searchQuery && (
          <NoResults
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3>No results found for "{searchQuery}"</h3>
            <p>Try adjusting your search terms or browse our categories.</p>
          </NoResults>
        )}

        {results.length > 0 && (
          <ResultsSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsHeader>
              <ResultsTitle>Search Results for "{searchQuery}"</ResultsTitle>
              <ResultsCount>{results.length} products found</ResultsCount>
            </ResultsHeader>
            
            <ProductGrid>
              {results.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ProductGrid>
          </ResultsSection>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
}
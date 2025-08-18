import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";
import type { Category } from "../types";
import db from "../data/db.json";

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setCategories(db.categories);
  }, []);

  return (
    <PageWrapper title="Browse Categories">
      <CategoriesGrid>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.name.toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <CategoryCard
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img src={category.image} alt={category.name} />
              <CategoryOverlay>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </CategoryOverlay>
            </CategoryCard>
          </Link>
        ))}
      </CategoriesGrid>
    </PageWrapper>
  );
}

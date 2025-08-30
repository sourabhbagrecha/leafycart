import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f7fafc;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c5282;
`;

const Category = styled.span`
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  color: #fbbf24;
`;

const ViewButton = styled(Link)`
  display: block;
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #2a4d82, #2c7db8);
    transform: translateY(-1px);
  }
`;

const ScoreBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(44, 82, 130, 0.9);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardWrapper = styled.div`
  position: relative;
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    
    if (hasHalfStar) {
      stars.push("☆");
    }
    
    while (stars.length < 5) {
      stars.push("☆");
    }
    
    return stars.join("");
  };

  return (
    <CardWrapper>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {product.score && (
          <ScoreBadge>
            {(product.score * 100).toFixed(0)}% match
          </ScoreBadge>
        )}
        
        <ProductImage
          src={product.images[0] || "/api/placeholder/300/200"}
          alt={product.name}
        />
        
        <CardContent>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
          
          <ProductDetails>
            <Price>${product.price.toFixed(2)}</Price>
            <Category>{product.category}</Category>
          </ProductDetails>
          
          {product.avgRating > 0 && (
            <Rating>
              <Stars>{renderStars(product.avgRating)}</Stars>
              <span>{product.avgRating.toFixed(1)} ({product.numReviews})</span>
            </Rating>
          )}
          
          <ViewButton to={`/product/${product._id}`}>
            View Details
          </ViewButton>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
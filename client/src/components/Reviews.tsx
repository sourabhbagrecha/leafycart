import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import type { Review } from "../types";
import { useAxios } from "../hooks/useAxios";

const ReviewsContainer = styled.div`
  margin-top: 2rem;
  max-height: 600px;
  overflow-y: auto;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #2d3748;
  }
`;

const AddReviewButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const ReviewForm = styled(motion.form)`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
`;

const RatingSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100px;
  font-size: 1rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled(motion.button)<{ variant?: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "#2c5282" : "#e2e8f0")};
  background: ${(props) => (props.variant === "primary" ? "#2c5282" : "white")};
  color: ${(props) => (props.variant === "primary" ? "white" : "#4a5568")};
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ReviewerInfo = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
  }

  .date {
    font-size: 0.8rem;
    color: #718096;
    margin-top: 0.25rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .stars {
    color: #f6ad55;
    font-size: 1.1rem;
  }

  .rating-text {
    font-size: 0.9rem;
    color: #4a5568;
  }
`;

const ReviewContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled(motion.button)`
  padding: 0.25rem 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: #f7fafc;
  }

  &.delete {
    color: #e53e3e;
    border-color: #feb2b2;

    &:hover {
      background: #fed7d7;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #718096;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
`;

interface ReviewsProps {
  productId: string;
  currentUserId?: string;
  reviews: Review[];
}

export function Reviews({ productId, reviews, currentUserId }: ReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const axiosClient = useAxios();
  const queryClient = useQueryClient();

  const addReviewMutation = useMutation({
    mutationFn: async (reviewData: { rating: number; comment: string }) => {
      const { data } = await axiosClient.post(
        `/api/review/${productId}`,
        reviewData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      setShowForm(false);
      setFormData({ rating: 5, comment: "" });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({
      reviewId,
      ...reviewData
    }: {
      reviewId: string;
      rating?: number;
      comment?: string;
    }) => {
      const { data } = await axiosClient.patch(
        `/api/review/${productId}/${reviewId}`,
        reviewData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      setEditingReview(null);
      setFormData({ rating: 5, comment: "" });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await axiosClient.delete(
        `/api/review/${productId}/${reviewId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      updateReviewMutation.mutate({
        reviewId: editingReview._id!,
        rating: formData.rating,
        comment: formData.comment,
      });
    } else {
      addReviewMutation.mutate(formData);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      rating: review.rating,
      comment: review.comment,
    });
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setFormData({ rating: 5, comment: "" });
    setShowForm(false);
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const canUserReview = true;
  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <h3>Reviews ({reviews.length || 0})</h3>
        {canUserReview && (
          <AddReviewButton
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            disabled={addReviewMutation.isPending}
          >
            {showForm ? "Cancel" : "Write Review"}
          </AddReviewButton>
        )}
      </ReviewsHeader>

      <AnimatePresence>
        {showForm && (
          <ReviewForm
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <label htmlFor="rating">Rating</label>
              <RatingSelect
                id="rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? "s" : ""}
                  </option>
                ))}
              </RatingSelect>
            </FormGroup>

            <FormGroup>
              <label htmlFor="comment">Review</label>
              <CommentTextarea
                id="comment"
                placeholder="Share your experience with this product..."
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                required
                minLength={10}
              />
            </FormGroup>

            <FormButtons>
              <Button
                type="button"
                onClick={handleCancelEdit}
                disabled={
                  addReviewMutation.isPending || updateReviewMutation.isPending
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={
                  addReviewMutation.isPending ||
                  updateReviewMutation.isPending ||
                  !formData.comment.trim()
                }
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </Button>
            </FormButtons>
          </ReviewForm>
        )}
      </AnimatePresence>

      {(addReviewMutation.error ||
        updateReviewMutation.error ||
        deleteReviewMutation.error) && (
        <ErrorMessage>
          Error:{" "}
          {(addReviewMutation.error as any)?.response?.data?.message ||
            (updateReviewMutation.error as any)?.response?.data?.message ||
            (deleteReviewMutation.error as any)?.response?.data?.message ||
            "Something went wrong"}
        </ErrorMessage>
      )}

      {!reviews.length ? (
        <EmptyState>
          <p>No reviews yet. Be the first to review this product!</p>
        </EmptyState>
      ) : (
        <ReviewsList>
          {reviews.map((review: Review) => (
            <ReviewCard
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewHeader>
                <ReviewerInfo>
                  <h4>{review.userName}</h4>
                  <div className="date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </ReviewerInfo>
                <Rating>
                  <span className="stars">{renderStars(review.rating)}</span>
                  <span className="rating-text">({review.rating}/5)</span>
                </Rating>
              </ReviewHeader>

              <ReviewContent>{review.comment}</ReviewContent>

              {currentUserId === review.userId && (
                <ReviewActions>
                  <ActionButton
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(review)}
                    disabled={
                      updateReviewMutation.isPending ||
                      deleteReviewMutation.isPending
                    }
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(review._id!)}
                    disabled={
                      updateReviewMutation.isPending ||
                      deleteReviewMutation.isPending
                    }
                  >
                    Delete
                  </ActionButton>
                </ReviewActions>
              )}
            </ReviewCard>
          ))}
        </ReviewsList>
      )}
    </ReviewsContainer>
  );
}
